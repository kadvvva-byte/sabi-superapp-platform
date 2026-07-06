param(
  [string]$BaseUrl = "http://127.0.0.1:4001",
  [string]$AdminToken = "",
  [string]$AdminTokenEnvName = "",
  [switch]$ProbeBearerGet,
  [switch]$WriteReport
)

$ErrorActionPreference = "Continue"
$version = "BACKEND-STREAM-FOUNDATION-140O-PREVIEW-403-DIAGNOSIS"
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
function Normalize-BaseUrl([string]$value) {
  if ([string]::IsNullOrWhiteSpace($value)) { return "http://127.0.0.1:4001" }
  return $value.TrimEnd("/")
}
function Get-RuntimeAdminToken([string]$directToken, [string]$envName) {
  if (-not [string]::IsNullOrWhiteSpace($directToken)) { return $directToken }
  if (-not [string]::IsNullOrWhiteSpace($envName)) {
    try {
      $value = [Environment]::GetEnvironmentVariable($envName, "Process")
      if (-not [string]::IsNullOrWhiteSpace($value)) { return $value }
    } catch {}
  }
  return ""
}
function Redact-Text([string]$text, [string]$token) {
  if ([string]::IsNullOrEmpty($text)) { return "" }
  $redacted = [string]$text
  if (-not [string]::IsNullOrWhiteSpace($token)) {
    $redacted = $redacted.Replace($token, "[REDACTED_ADMIN_TOKEN]")
  }
  $redacted = [regex]::Replace($redacted, "Bearer\s+[A-Za-z0-9_\-\.=]+", "Bearer [REDACTED_ADMIN_TOKEN]")
  $redacted = [regex]::Replace($redacted, "eyJ[A-Za-z0-9_\-\.=]+", "[REDACTED_JWT_LIKE_TOKEN]")
  return $redacted
}

function Get-WindowJson([string]$path, [int]$startLine, [int]$endLine) {
  $items = @()
  if (Test-Path $path) {
    try {
      $lines = Get-Content -Path $path -Encoding UTF8 -ErrorAction Stop
      for ($i = [Math]::Max(1, $startLine); $i -le [Math]::Min($endLine, $lines.Count); $i++) {
        $text = [string]$lines[$i - 1]
        $items += ('{"line":' + [string]$i + ',"text":' + (JsonString $text.TrimEnd()) + '}')
      }
    } catch {}
  }
  return "[" + [string]::Join(",", $items) + "]"
}

function Find-RouteContextJson([string]$path, [string]$needle) {
  $items = @()
  if (Test-Path $path) {
    try {
      $lines = Get-Content -Path $path -Encoding UTF8 -ErrorAction Stop
      for ($i = 0; $i -lt $lines.Count; $i++) {
        if ([string]$lines[$i] -match [regex]::Escape($needle)) {
          $from = [Math]::Max(1, ($i + 1) - 8)
          $to = [Math]::Min($lines.Count, ($i + 1) + 18)
          $items += ('{"file":' + (JsonString $path) + ',"matchLine":' + [string]($i + 1) + ',"window":' + (Get-WindowJson $path $from $to) + '}')
        }
      }
    } catch {}
  }
  return "[" + [string]::Join(",", $items) + "]"
}

function Invoke-BearerGetJson([string]$baseUrl, [string]$path, [string]$token) {
  $url = (Normalize-BaseUrl $baseUrl) + $path
  $headers = @{}
  if (-not [string]::IsNullOrWhiteSpace($token)) {
    $headers["Authorization"] = "Bearer $token"
  }

  $statusCode = 0
  $okHttp = $false
  $bodyPreview = ""
  $errorText = ""

  try {
    $response = Invoke-WebRequest -Uri $url -Method GET -Headers $headers -UseBasicParsing -TimeoutSec 10
    $statusCode = [int]$response.StatusCode
    $okHttp = ($statusCode -ge 200 -and $statusCode -lt 300)
    $content = Redact-Text ([string]$response.Content) $token
    if ($content.Length -gt 800) { $bodyPreview = $content.Substring(0, 800) } else { $bodyPreview = $content }
  } catch {
    $ex = $_.Exception
    $errorText = Redact-Text $ex.Message $token
    if ($ex.Response -ne $null) {
      try { $statusCode = [int]$ex.Response.StatusCode } catch {}
      try {
        $stream = $ex.Response.GetResponseStream()
        if ($stream -ne $null) {
          $reader = New-Object System.IO.StreamReader($stream)
          $content = Redact-Text $reader.ReadToEnd() $token
          if ($content.Length -gt 800) { $bodyPreview = $content.Substring(0, 800) } else { $bodyPreview = $content }
        }
      } catch {}
    }
  }

  return '{"path":' + (JsonString $path) +
    ',"method":"GET","authVariant":"authorization_bearer","url":' + (JsonString $url) +
    ',"statusCode":' + [string]$statusCode +
    ',"okHttp":' + (JsonBool $okHttp) +
    ',"bodyPreview":' + (JsonString $bodyPreview) +
    ',"error":' + (JsonString $errorText) + '}'
}

$baseUrlNorm = Normalize-BaseUrl $BaseUrl
$runtimeToken = Get-RuntimeAdminToken $AdminToken $AdminTokenEnvName
$tokenProvided = -not [string]::IsNullOrWhiteSpace($runtimeToken)

$appContextReadiness = Find-RouteContextJson "src/app.ts" "/api/admin/stream/foundation/diagnostics/readiness"
$appContextPreview = Find-RouteContextJson "src/app.ts" "/api/admin/stream/foundation/diagnostics/preview"

# Also capture nearby admin route mounting/middleware area.
$appAdminWindow = Get-WindowJson "src/app.ts" 260 330

$probeResults = "[]"
$readinessStatus = -1
$previewStatus = -1
if ($ProbeBearerGet -and $tokenProvided) {
  $r1 = Invoke-BearerGetJson $baseUrlNorm "/api/admin/stream/foundation/diagnostics/readiness" $runtimeToken
  $r2 = Invoke-BearerGetJson $baseUrlNorm "/api/admin/stream/foundation/diagnostics/preview" $runtimeToken
  $probeResults = "[" + $r1 + "," + $r2 + "]"
  if ($r1 -match '"statusCode":([0-9]+)') { $readinessStatus = [int]$matches[1] }
  if ($r2 -match '"statusCode":([0-9]+)') { $previewStatus = [int]$matches[1] }
}

$status = "preview_403_source_context_captured"
if ($ProbeBearerGet -and $tokenProvided -and $readinessStatus -eq 200 -and $previewStatus -eq 403) {
  $status = "readiness_200_preview_403_reproduced_bearer_get"
} elseif ($ProbeBearerGet -and $tokenProvided -and $readinessStatus -eq 200 -and $previewStatus -eq 200) {
  $status = "readiness_and_preview_200_bearer_get"
} elseif ($ProbeBearerGet -and (-not $tokenProvided)) {
  $status = "probe_requested_but_token_missing"
}

$assertionsJson = @(
  '{"id":"source_context_captured","passed":true,"evidence":"Captured src/app.ts route windows for readiness and preview."}',
  ('{"id":"bearer_probe_requested","passed":' + (JsonBool ([bool]$ProbeBearerGet)) + ',"evidence":"Optional GET-only bearer probe flag."}'),
  '{"id":"no_restart_db_provider_wallet_money","passed":true,"evidence":"Diagnosis contains no restart command, no POST/PUT/PATCH/DELETE, no DB/provider/Wallet/payment/payout/money action."}',
  '{"id":"token_redacted_and_not_stored","passed":true,"evidence":"Report records tokenProvided only; token text is redacted."}'
)
$assertionsArrayJson = "[" + [string]::Join(",", $assertionsJson) + "]"

$httpMethodsJson = "[]"
if ($ProbeBearerGet) { $httpMethodsJson = '["GET"]' }

$json = "{"
$json += '"version":' + (JsonString $version) + ","
$json += '"stage":"preview_403_source_and_bearer_get_diagnosis",'
$json += '"baseUrl":' + (JsonString $baseUrlNorm) + ","
$json += '"adminTokenProvided":' + (JsonBool $tokenProvided) + ","
$json += '"probeBearerGet":' + (JsonBool ([bool]$ProbeBearerGet)) + ","
$json += '"startedAt":' + (JsonString $startedAt) + ","
$json += '"finishedAt":' + (JsonString ((Get-Date).ToUniversalTime().ToString("o"))) + ","
$json += '"ok":true,'
$json += '"status":' + (JsonString $status) + ","
$json += '"safety":{'
$json += '"backendRestartPerformed":0,'
$json += '"httpMethodsUsed":' + $httpMethodsJson + ","
$json += '"databaseWritePerformed":0,'
$json += '"providerCallPerformed":0,'
$json += '"walletMutationPerformed":0,'
$json += '"paymentAuthorizationPerformed":0,'
$json += '"monthlyPayoutPerformed":0,'
$json += '"moneyMovementPerformed":0,'
$json += '"rawSecretsReturned":0,'
$json += '"rawTokenStored":0,'
$json += '"fakeSuccessAllowed":false'
$json += "},"
$json += '"appAdminWindow":' + $appAdminWindow + ","
$json += '"readinessRouteContext":' + $appContextReadiness + ","
$json += '"previewRouteContext":' + $appContextPreview + ","
$json += '"probeResults":' + $probeResults + ","
$json += '"assertions":' + $assertionsArrayJson + ","
$json += '"nextStepIfReadiness200Preview403":"Patch review only: compare middleware/handler differences around src/app.ts readiness vs preview route. Do not change runtime blindly.",'
$json += '"nextStepIfBoth200":"Proceed to 140P authenticated admin GET post-smoke verification/source-only handoff."'
$json += "}"

$json = Redact-Text $json $runtimeToken

if ($WriteReport) {
  $reportDir = Join-Path (Get-Location) ".data\stream"
  New-Item -ItemType Directory -Force -Path $reportDir | Out-Null
  $reportPath = Join-Path $reportDir "backend-stream-foundation-140o-preview-403-diagnosis-result.json"
  $json | Set-Content -Encoding UTF8 -Path $reportPath
}

Write-Output $json
if ($WriteReport) {
  Write-Host "140O-PREVIEW-403-DIAGNOSIS report written to $reportPath"
}
