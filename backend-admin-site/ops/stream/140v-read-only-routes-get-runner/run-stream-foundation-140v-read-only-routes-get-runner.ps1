param(
  [string]$BaseUrl = "http://127.0.0.1:4001",
  [string]$AdminTokenEnvName = "SABI_ADMIN_TOKEN",
  [switch]$WriteReport
)

$ErrorActionPreference = "Continue"
$version = "BACKEND-STREAM-FOUNDATION-140V"
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

function Invoke-GetJson([string]$baseUrl, [string]$path, [string]$token, [bool]$useAdminBearer, [string]$expectedMode) {
  $url = (Normalize-BaseUrl $baseUrl) + $path
  $headers = @{}
  if ($useAdminBearer -and (-not [string]::IsNullOrWhiteSpace($token))) {
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
    if ($content.Length -gt 900) { $bodyPreview = $content.Substring(0, 900) } else { $bodyPreview = $content }
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
          if ($content.Length -gt 900) { $bodyPreview = $content.Substring(0, 900) } else { $bodyPreview = $content }
        }
      } catch {}
    }
  }

  $expectedOk = $false
  if ($expectedMode -eq "live_200") {
    $expectedOk = ($statusCode -eq 200)
  } elseif ($expectedMode -eq "source_only_unmounted") {
    $expectedOk = ($statusCode -eq 404 -or $statusCode -eq 403 -or $statusCode -eq 503)
  }

  $unsafeLiveForSourceOnly = ($expectedMode -eq "source_only_unmounted" -and $statusCode -ge 200 -and $statusCode -lt 300)

  return '{"path":' + (JsonString $path) +
    ',"method":"GET","authVariant":' + (JsonString ($(if ($useAdminBearer) { "authorization_bearer" } else { "none" }))) +
    ',"expectedMode":' + (JsonString $expectedMode) +
    ',"url":' + (JsonString $url) +
    ',"statusCode":' + [string]$statusCode +
    ',"okHttp":' + (JsonBool $okHttp) +
    ',"expectedOk":' + (JsonBool $expectedOk) +
    ',"unsafeLiveForSourceOnly":' + (JsonBool $unsafeLiveForSourceOnly) +
    ',"bodyPreview":' + (JsonString $bodyPreview) +
    ',"error":' + (JsonString $errorText) + '}'
}

$baseUrlNorm = Normalize-BaseUrl $BaseUrl
$runtimeToken = ""
try { $runtimeToken = [Environment]::GetEnvironmentVariable($AdminTokenEnvName, "Process") } catch {}
$tokenProvided = -not [string]::IsNullOrWhiteSpace($runtimeToken)

$routes = @(
  @{ path="/api/admin/stream/foundation/diagnostics/readiness"; useAdmin=$true; expected="live_200"; id="diagnostics_readiness" },
  @{ path="/api/admin/stream/foundation/diagnostics/preview"; useAdmin=$true; expected="live_200"; id="diagnostics_preview" },
  @{ path="/api/admin/stream/foundation/preview"; useAdmin=$true; expected="source_only_unmounted"; id="admin_foundation_preview" },
  @{ path="/api/stream/live"; useAdmin=$false; expected="source_only_unmounted"; id="mobile_live_list" },
  @{ path="/api/stream/live/140v-smoke-room"; useAdmin=$false; expected="source_only_unmounted"; id="mobile_live_room_snapshot" },
  @{ path="/api/stream/shorts/feed"; useAdmin=$false; expected="source_only_unmounted"; id="mobile_shorts_feed" },
  @{ path="/api/stream/creators/140v-smoke-creator"; useAdmin=$false; expected="source_only_unmounted"; id="mobile_creator_profile" },
  @{ path="/api/stream/business/catalog"; useAdmin=$false; expected="source_only_unmounted"; id="mobile_business_catalog" },
  @{ path="/api/admin/stream/moderation/queue"; useAdmin=$true; expected="source_only_unmounted"; id="admin_moderation_queue" }
)

$results = @()
foreach ($route in $routes) {
  $results += Invoke-GetJson $baseUrlNorm $route.path $runtimeToken ([bool]$route.useAdmin) ([string]$route.expected)
}

$resultsJson = "[" + [string]::Join(",", $results) + "]"
$resultsText = [string]::Join("`n", $results)

$live200Ok = (($resultsText -match '"path":"/api/admin/stream/foundation/diagnostics/readiness".*?"statusCode":200') -and ($resultsText -match '"path":"/api/admin/stream/foundation/diagnostics/preview".*?"statusCode":200'))
$sourceOnlyUnsafe = ($resultsText -match '"unsafeLiveForSourceOnly":true')
$allExpectedOk = -not ($resultsText -match '"expectedOk":false')

$status = "read_only_routes_get_runner_passed"
if (-not $tokenProvided) {
  $status = "admin_token_missing"
} elseif (-not $live200Ok) {
  $status = "diagnostics_live_get_not_200"
} elseif ($sourceOnlyUnsafe) {
  $status = "source_only_route_unexpectedly_live"
} elseif (-not $allExpectedOk) {
  $status = "one_or_more_expected_get_results_failed"
}

$ok = [bool]($tokenProvided -and $live200Ok -and (-not $sourceOnlyUnsafe) -and $allExpectedOk)

$json = "{"
$json += '"version":' + (JsonString $version) + ","
$json += '"stage":"controlled_authenticated_get_runner_for_read_only_routes_ops_only",'
$json += '"baseUrl":' + (JsonString $baseUrlNorm) + ","
$json += '"adminTokenProvided":' + (JsonBool $tokenProvided) + ","
$json += '"startedAt":' + (JsonString $startedAt) + ","
$json += '"finishedAt":' + (JsonString ((Get-Date).ToUniversalTime().ToString("o"))) + ","
$json += '"ok":' + (JsonBool $ok) + ","
$json += '"status":' + (JsonString $status) + ","
$json += '"safety":{'
$json += '"backendRestartPerformed":0,'
$json += '"sourceMutationPerformed":0,'
$json += '"httpMethodsUsed":["GET"],'
$json += '"postPutPatchDeleteUsed":false,'
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
$json += '"summary":{'
$json += '"totalRoutesChecked":' + [string]$routes.Count + ","
$json += '"diagnosticsExpectedLive200":2,'
$json += '"sourceOnlyExpectedUnmounted":7,'
$json += '"liveDiagnosticsOk":' + (JsonBool $live200Ok) + ","
$json += '"sourceOnlyUnsafeLiveFound":' + (JsonBool $sourceOnlyUnsafe) + ","
$json += '"allExpectedOk":' + (JsonBool $allExpectedOk)
$json += "},"
$json += '"results":' + $resultsJson + ","
$json += '"nextStepIfOk":"BACKEND-STREAM-FOUNDATION-140W live/write route approval gate/source-only.",'
$json += '"nextStepIfBlocked":"Keep source-only routes unmounted; inspect status/body preview without changing DB/provider/Wallet/money."'
$json += "}"

$json = Redact-Text $json $runtimeToken

if ($WriteReport) {
  $reportDir = Join-Path (Get-Location) ".data\stream"
  New-Item -ItemType Directory -Force -Path $reportDir | Out-Null
  $reportPath = Join-Path $reportDir "backend-stream-foundation-140v-read-only-routes-get-runner-result.json"
  $json | Set-Content -Encoding UTF8 -Path $reportPath
}

Write-Output $json
if ($WriteReport) {
  Write-Host "140V read-only routes GET runner report written to $reportPath"
}
