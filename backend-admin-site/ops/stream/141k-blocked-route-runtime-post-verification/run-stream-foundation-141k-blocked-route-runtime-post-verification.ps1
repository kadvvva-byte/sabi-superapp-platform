param(
  [string]$BaseUrl = "http://127.0.0.1:4001",
  [switch]$WriteReport
)

$ErrorActionPreference = "Continue"
$version = "BACKEND-STREAM-FOUNDATION-141K"
$startedAt = (Get-Date).ToUniversalTime().ToString("o")

function JsonEscape([string]$s) {
  if ($null -eq $s) { return "" }
  $t = [string]$s
  $t = $t.Replace("\", "\\")
  $t = $t.Replace('"', '\"')
  $t = $t.Replace("`r", "\r")
  $t = $t.Replace("`n", "\n")
  $t = $t.Replace("`t", "\t")
  return $t
}
function JsonString([string]$s) { return '"' + (JsonEscape $s) + '"' }
function JsonBool([bool]$b) { if ($b) { return "true" } else { return "false" } }
function JsonArrayRaw([string[]]$items) { return "[" + [string]::Join(",", $items) + "]" }
function Read-TextSafe([string]$path) {
  if (-not (Test-Path $path)) { return "" }
  try { return [System.IO.File]::ReadAllText((Resolve-Path $path), [System.Text.Encoding]::UTF8) } catch { return "" }
}
function Normalize-BaseUrl([string]$url) {
  if ($null -eq $url -or $url.Trim().Length -eq 0) { return "http://127.0.0.1:4001" }
  return $url.Trim().TrimEnd("/")
}
function Post-JsonCapture([string]$url, [string]$body) {
  $statusCode = -1
  $responseText = ""
  $errorText = ""
  try {
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($body)
    $request = [System.Net.WebRequest]::Create($url)
    $request.Method = "POST"
    $request.ContentType = "application/json; charset=utf-8"
    $request.Accept = "application/json"
    $request.Timeout = 15000
    $request.ReadWriteTimeout = 15000
    $request.ContentLength = $bytes.Length
    $stream = $request.GetRequestStream()
    $stream.Write($bytes, 0, $bytes.Length)
    $stream.Close()

    try {
      $response = $request.GetResponse()
      $statusCode = [int]$response.StatusCode
      $reader = New-Object System.IO.StreamReader($response.GetResponseStream())
      $responseText = $reader.ReadToEnd()
      $reader.Close()
      $response.Close()
    } catch [System.Net.WebException] {
      $webResponse = $_.Exception.Response
      if ($webResponse -ne $null) {
        $statusCode = [int]$webResponse.StatusCode
        $reader = New-Object System.IO.StreamReader($webResponse.GetResponseStream())
        $responseText = $reader.ReadToEnd()
        $reader.Close()
        $webResponse.Close()
      } else {
        $errorText = $_.Exception.Message
      }
    }
  } catch {
    $errorText = $_.Exception.Message
  }

  return @{
    statusCode = $statusCode
    responseText = $responseText
    errorText = $errorText
  }
}

$base = Normalize-BaseUrl $BaseUrl
$approvalReportText = Read-TextSafe ".data\stream\backend-stream-foundation-141j-runtime-verification-approval-package-result.json"
$has141JApprovalReport = ($approvalReportText.Length -gt 0)
$approvalReportLooksOk = ($approvalReportText.Contains('"version":"BACKEND-STREAM-FOUNDATION-141J"') -and $approvalReportText.Contains('"ok":true'))

$routes = @(
  @{ id = "stream_live_start"; path = "/api/stream/live/start" },
  @{ id = "stream_live_stop"; path = "/api/stream/live/stop" },
  @{ id = "stream_live_heartbeat"; path = "/api/stream/live/heartbeat" }
)

$routeJsonItems = @()
$allStatus423 = $true
$allControlledBlocked = $true
$anyFakeSuccess = $false
$anyMoneyOrProviderSignal = $false

foreach ($route in $routes) {
  $url = $base + $route.path
  $payload = @{
    actorUserId = "141k-runtime-smoke-user"
    roomId = "141k-runtime-smoke-room"
    clientRequestId = ("141k-" + $route.id + "-" + [guid]::NewGuid().ToString("N"))
    deviceSessionId = "141k-runtime-smoke-device"
    locale = "ru"
    source = "BACKEND-STREAM-FOUNDATION-141K"
  } | ConvertTo-Json -Compress

  $result = Post-JsonCapture $url $payload
  $text = [string]$result.responseText
  $statusCode = [int]$result.statusCode
  $status423 = ($statusCode -eq 423)

  $controlledBlocked =
    ($text.Contains('"ok":false') -or $text.Contains('"ok": false')) -and
    ($text.Contains('"statusCode":423') -or $text.Contains('"statusCode": 423') -or $status423) -and
    ($text.Contains("source") -or $text.Contains("blocked") -or $text.Contains("runtime") -or $text.Contains("provider"))

  $fakeSuccess =
    $statusCode -ge 200 -and $statusCode -lt 300

  $moneyOrProvider =
    $text.Contains('"paymentAuthorizationPerformed":1') -or
    $text.Contains('"walletMutationPerformed":1') -or
    $text.Contains('"providerCallPerformed":1') -or
    $text.Contains('"moneyMovementPerformed":1') -or
    $text.Contains('"fakeSuccessAllowed":true')

  if (-not $status423) { $allStatus423 = $false }
  if (-not $controlledBlocked) { $allControlledBlocked = $false }
  if ($fakeSuccess) { $anyFakeSuccess = $true }
  if ($moneyOrProvider) { $anyMoneyOrProviderSignal = $true }

  $preview = $text
  if ($preview.Length -gt 1200) { $preview = $preview.Substring(0, 1200) }

  $routeJson = "{"
  $routeJson += '"id":' + (JsonString $route.id) + ","
  $routeJson += '"method":"POST",'
  $routeJson += '"url":' + (JsonString $url) + ","
  $routeJson += '"statusCode":' + [string]$statusCode + ","
  $routeJson += '"status423":' + (JsonBool $status423) + ","
  $routeJson += '"controlledBlockedEnvelopeLooksOk":' + (JsonBool $controlledBlocked) + ","
  $routeJson += '"fakeSuccessDetected":' + (JsonBool $fakeSuccess) + ","
  $routeJson += '"moneyOrProviderSignalDetected":' + (JsonBool $moneyOrProvider) + ","
  $routeJson += '"errorText":' + (JsonString ([string]$result.errorText)) + ","
  $routeJson += '"responsePreview":' + (JsonString $preview)
  $routeJson += "}"
  $routeJsonItems += $routeJson
}

$ok = [bool]($allStatus423 -and $allControlledBlocked -and (-not $anyFakeSuccess) -and (-not $anyMoneyOrProviderSignal))
$status = "controlled_blocked_route_runtime_post_verification_passed"
if (-not $ok) { $status = "controlled_blocked_route_runtime_post_verification_blocked" }

$json = "{"
$json += '"version":' + (JsonString $version) + ","
$json += '"stage":"controlled_blocked_route_runtime_post_verification",'
$json += '"startedAt":' + (JsonString $startedAt) + ","
$json += '"finishedAt":' + (JsonString ((Get-Date).ToUniversalTime().ToString("o"))) + ","
$json += '"baseUrl":' + (JsonString $base) + ","
$json += '"ok":' + (JsonBool $ok) + ","
$json += '"status":' + (JsonString $status) + ","
$json += '"approvalEvidence":{'
$json += '"has141JApprovalReport":' + (JsonBool $has141JApprovalReport) + ","
$json += '"approvalReportLooksOk":' + (JsonBool $approvalReportLooksOk)
$json += "},"
$json += '"results":' + (JsonArrayRaw $routeJsonItems) + ","
$json += '"summary":{'
$json += '"totalRoutesChecked":3,'
$json += '"allStatus423":' + (JsonBool $allStatus423) + ","
$json += '"allControlledBlocked":' + (JsonBool $allControlledBlocked) + ","
$json += '"anyFakeSuccess":' + (JsonBool $anyFakeSuccess) + ","
$json += '"anyMoneyOrProviderSignal":' + (JsonBool $anyMoneyOrProviderSignal)
$json += "},"
$json += '"safety":{'
$json += '"backendRestartPerformed":0,'
$json += '"sourceMutationPerformed":0,'
$json += '"runtimeHttpPerformedBy141K":3,'
$json += '"runtimePostSmokePerformed":3,'
$json += '"postUsed":true,'
$json += '"databaseWriteExpected":0,'
$json += '"providerCallExpected":0,'
$json += '"walletMutationExpected":0,'
$json += '"paymentAuthorizationExpected":0,'
$json += '"monthlyPayoutExpected":0,'
$json += '"moneyMovementExpected":0,'
$json += '"rawSecretsReturnedExpected":0,'
$json += '"rawTokenStoredExpected":0,'
$json += '"fakeSuccessAllowed":false'
$json += "},"
$json += '"nextStepIfOk":"BACKEND-STREAM-FOUNDATION-141L post-runtime verification handoff and source safety freeze.",'
$json += '"nextStepIfBlocked":"Do not proceed; inspect response previews and patch only controlled blocked envelope binding."'
$json += "}"

if ($WriteReport) {
  $reportDir = Join-Path (Get-Location) ".data\stream"
  New-Item -ItemType Directory -Force -Path $reportDir | Out-Null
  $reportPath = Join-Path $reportDir "backend-stream-foundation-141k-blocked-route-runtime-post-verification-result.json"
  $json | Set-Content -Encoding UTF8 -Path $reportPath
}

Write-Output $json
if ($WriteReport) {
  Write-Host "141K blocked-route runtime POST verification report written to $reportPath"
}
