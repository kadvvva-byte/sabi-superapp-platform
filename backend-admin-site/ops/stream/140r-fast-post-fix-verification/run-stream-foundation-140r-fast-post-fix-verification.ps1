param(
  [string]$BaseUrl = "http://127.0.0.1:4001",
  [string]$AdminTokenEnvName = "SABI_ADMIN_TOKEN",
  [switch]$RunTsc,
  [switch]$RunHttpGet,
  [switch]$WriteReport
)

$ErrorActionPreference = "Continue"
$version = "BACKEND-STREAM-FOUNDATION-140R"
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

function Check-SourceText {
  $appOk = $false
  $mapperOk = $false
  $appLine = ""
  $mapperLine = ""

  if (Test-Path "src/app.ts") {
    try {
      $lines = Get-Content -Path "src/app.ts" -Encoding UTF8
      foreach ($line in $lines) {
        if ($line -match 'streamDiagnosticsHandler\(\{ routeId: "stream_kernel_diagnostics_snapshot" \}\)') {
          $appOk = $true
          $appLine = $line.Trim()
          break
        }
      }
    } catch {}
  }

  $mapperPath = "src/modules/stream/foundation/kernel-diagnostics-admin-runtime-route/streamFoundationKernelDiagnosticsAdminRuntimeRouteResponseMapper.ts"
  if (Test-Path $mapperPath) {
    try {
      $lines = Get-Content -Path $mapperPath -Encoding UTF8
      foreach ($line in $lines) {
        if ($line -match 'admin:stream:read' -and $line -match 'admin:stream:diagnostics:read') {
          $mapperOk = $true
          $mapperLine = $line.Trim()
          break
        }
      }
    } catch {}
  }

  return @{
    appRouteIdOk = $appOk
    appRouteIdLine = $appLine
    mapperScopesOk = $mapperOk
    mapperScopesLine = $mapperLine
  }
}

function Invoke-Tsc {
  $output = ""
  $exitCode = -1
  try {
    $cmdOutput = & npx tsc --noEmit 2>&1
    $exitCode = $LASTEXITCODE
    $output = ($cmdOutput | Out-String)
  } catch {
    $output = $_.Exception.Message
    $exitCode = -1
  }
  if ($output.Length -gt 3000) { $output = $output.Substring(0, 3000) }
  return @{
    exitCode = $exitCode
    ok = ($exitCode -eq 0)
    outputPreview = $output
  }
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
    if ($content.Length -gt 1200) { $bodyPreview = $content.Substring(0, 1200) } else { $bodyPreview = $content }
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
          if ($content.Length -gt 1200) { $bodyPreview = $content.Substring(0, 1200) } else { $bodyPreview = $content }
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
$runtimeToken = ""
try { $runtimeToken = [Environment]::GetEnvironmentVariable($AdminTokenEnvName, "Process") } catch {}
$tokenProvided = -not [string]::IsNullOrWhiteSpace($runtimeToken)

$source = Check-SourceText

$tscJson = "null"
$tscOk = $true
if ($RunTsc) {
  $tsc = Invoke-Tsc
  $tscOk = [bool]$tsc.ok
  $tscJson = '{"exitCode":' + [string]$tsc.exitCode + ',"ok":' + (JsonBool $tsc.ok) + ',"outputPreview":' + (JsonString $tsc.outputPreview) + '}'
}

$httpResultsJson = "[]"
$readiness200 = $false
$preview200 = $false
if ($RunHttpGet -and $tokenProvided) {
  $r1 = Invoke-BearerGetJson $baseUrlNorm "/api/admin/stream/foundation/diagnostics/readiness" $runtimeToken
  $r2 = Invoke-BearerGetJson $baseUrlNorm "/api/admin/stream/foundation/diagnostics/preview" $runtimeToken
  $httpResultsJson = "[" + $r1 + "," + $r2 + "]"
  $readiness200 = ($r1 -match '"statusCode":200')
  $preview200 = ($r2 -match '"statusCode":200')
}

$status = "source_verification_ready"
if ($RunTsc -and (-not $tscOk)) {
  $status = "typescript_blocked"
} elseif ($RunHttpGet -and (-not $tokenProvided)) {
  $status = "http_get_requested_but_admin_token_missing"
} elseif ($RunHttpGet -and $readiness200 -and $preview200) {
  $status = "readiness_and_preview_authenticated_get_200"
} elseif ($RunHttpGet -and $readiness200 -and (-not $preview200)) {
  $status = "readiness_200_preview_not_200_backend_may_need_reload_or_scope_still_blocked"
} elseif ($RunHttpGet) {
  $status = "authenticated_get_not_ready"
}

$sourceOk = [bool]($source.appRouteIdOk -and $source.mapperScopesOk)
$ok = [bool]($sourceOk -and $tscOk -and ((-not $RunHttpGet) -or ($tokenProvided -and $readiness200 -and $preview200)))

$httpMethodsJson = "[]"
if ($RunHttpGet) { $httpMethodsJson = '["GET"]' }

$json = "{"
$json += '"version":' + (JsonString $version) + ","
$json += '"stage":"fast_post_140q_fix1_verification_and_optional_authenticated_get",'
$json += '"baseUrl":' + (JsonString $baseUrlNorm) + ","
$json += '"adminTokenProvided":' + (JsonBool $tokenProvided) + ","
$json += '"runTsc":' + (JsonBool ([bool]$RunTsc)) + ","
$json += '"runHttpGet":' + (JsonBool ([bool]$RunHttpGet)) + ","
$json += '"startedAt":' + (JsonString $startedAt) + ","
$json += '"finishedAt":' + (JsonString ((Get-Date).ToUniversalTime().ToString("o"))) + ","
$json += '"ok":' + (JsonBool $ok) + ","
$json += '"status":' + (JsonString $status) + ","
$json += '"safety":{'
$json += '"backendRestartPerformed":0,'
$json += '"sourceMutationPerformed":0,'
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
$json += '"sourceChecks":{'
$json += '"appRouteIdOk":' + (JsonBool $source.appRouteIdOk) + ","
$json += '"appRouteIdLine":' + (JsonString $source.appRouteIdLine) + ","
$json += '"mapperScopesOk":' + (JsonBool $source.mapperScopesOk) + ","
$json += '"mapperScopesLine":' + (JsonString $source.mapperScopesLine)
$json += "},"
$json += '"tscResult":' + $tscJson + ","
$json += '"httpResults":' + $httpResultsJson + ","
$json += '"nextStepIfOk":"BACKEND-STREAM-FOUNDATION-140S post-smoke handoff and next backend route foundation batch.",'
$json += '"nextStepIfPreviewNot200":"If tsc is clean and source checks pass, reload backend dev process then repeat GET smoke; do not change DB/provider/Wallet/money."'
$json += "}"

$json = Redact-Text $json $runtimeToken

if ($WriteReport) {
  $reportDir = Join-Path (Get-Location) ".data\stream"
  New-Item -ItemType Directory -Force -Path $reportDir | Out-Null
  $reportPath = Join-Path $reportDir "backend-stream-foundation-140r-fast-post-fix-verification-result.json"
  $json | Set-Content -Encoding UTF8 -Path $reportPath
}

Write-Output $json
if ($WriteReport) {
  Write-Host "140R fast verification report written to $reportPath"
}
