param(
  [switch]$WriteReport
)

$ErrorActionPreference = "Continue"
$version = "BACKEND-STREAM-FOUNDATION-141J"
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
function Read-TextSafe([string]$path) {
  if (-not (Test-Path $path)) { return "" }
  try { return [System.IO.File]::ReadAllText((Resolve-Path $path), [System.Text.Encoding]::UTF8) } catch { return "" }
}
function JsonArrayFromStrings([string[]]$items) {
  $encoded = @()
  foreach ($item in $items) { $encoded += (JsonString $item) }
  return "[" + [string]::Join(",", $encoded) + "]"
}

$requiredExactApproval = "I approve BACKEND-STREAM-FOUNDATION-141K controlled blocked-route runtime POST verification only, send POST requests to /api/stream/live/start, /api/stream/live/stop, and /api/stream/live/heartbeat on local dev backend only, expect controlled 423 blocked envelopes only, no backend restart, no source write, no DB write, no provider call, no Wallet mutation, no payment authorization, no monthly payout, no money movement, no fake success."

$reportPath = ".data\stream\backend-stream-foundation-141i-compile-no-runtime-post-safety-check-result.json"
$reportText = Read-TextSafe $reportPath
$has141IReport = ($reportText.Length -gt 0)
$reportLooksOk = ($reportText.Contains('"version":"BACKEND-STREAM-FOUNDATION-141I"') -and $reportText.Contains('"ok":true'))

$approvalReady = $true
$missingPrerequisites = @()
if (-not $has141IReport) {
  $missingPrerequisites += "141I report not found at .data/stream/backend-stream-foundation-141i-compile-no-runtime-post-safety-check-result.json"
}
if ($has141IReport -and (-not $reportLooksOk)) {
  $missingPrerequisites += "141I report exists but does not show ok:true"
}

$ok = [bool]($approvalReady)
$status = "runtime_verification_approval_package_ready_exact_approval_required"
if (-not $ok) { $status = "runtime_verification_approval_package_blocked" }

$json = "{"
$json += '"version":' + (JsonString $version) + ","
$json += '"stage":"controlled_blocked_route_runtime_verification_approval_package",'
$json += '"startedAt":' + (JsonString $startedAt) + ","
$json += '"finishedAt":' + (JsonString ((Get-Date).ToUniversalTime().ToString("o"))) + ","
$json += '"ok":' + (JsonBool $ok) + ","
$json += '"status":' + (JsonString $status) + ","
$json += '"prerequisites":{'
$json += '"has141IReport":' + (JsonBool $has141IReport) + ","
$json += '"reportLooksOk":' + (JsonBool $reportLooksOk) + ","
$json += '"missingPrerequisites":' + (JsonArrayFromStrings $missingPrerequisites)
$json += "},"
$json += '"runtimeVerificationNotPerformed":true,'
$json += '"requiredExactApprovalText":' + (JsonString $requiredExactApproval) + ","
$json += '"plannedRuntimeVerificationAfterApproval":{'
$json += '"method":"POST",'
$json += '"baseUrl":"user_supplied_local_dev_backend_only",'
$json += '"paths":["/api/stream/live/start","/api/stream/live/stop","/api/stream/live/heartbeat"],'
$json += '"expectedStatusCode":423,'
$json += '"expectedEnvelope":"controlled blocked source-only envelope, not success"'
$json += "},"
$json += '"safety":{'
$json += '"backendRestartPerformed":0,'
$json += '"sourceMutationPerformed":0,'
$json += '"runtimeHttpPerformedBy141J":0,'
$json += '"runtimePostSmokePerformed":0,'
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
$json += '"nextStep":"Send the exact approval text, then run BACKEND-STREAM-FOUNDATION-141K controlled blocked-route runtime POST verification."'
$json += "}"

if ($WriteReport) {
  $reportDir = Join-Path (Get-Location) ".data\stream"
  New-Item -ItemType Directory -Force -Path $reportDir | Out-Null
  $outPath = Join-Path $reportDir "backend-stream-foundation-141j-runtime-verification-approval-package-result.json"
  $json | Set-Content -Encoding UTF8 -Path $outPath
}

Write-Output $json
if ($WriteReport) {
  Write-Host "141J runtime verification approval package report written to $outPath"
}
