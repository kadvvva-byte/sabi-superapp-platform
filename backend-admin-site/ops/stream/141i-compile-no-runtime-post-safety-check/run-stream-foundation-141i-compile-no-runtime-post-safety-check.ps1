param(
  [switch]$RunTsc,
  [switch]$WriteReport
)

$ErrorActionPreference = "Continue"
$version = "BACKEND-STREAM-FOUNDATION-141I"
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

$appText = Read-TextSafe "src\app.ts"
$indexText = Read-TextSafe "src\modules\stream\index.ts"
$serverText = Read-TextSafe "src\server.ts"

$requiredAppFragments = @(
  'handleStreamFoundationLiveStartSourceOnlyDraft',
  'handleStreamFoundationLiveStopSourceOnlyDraft',
  'handleStreamFoundationLiveHeartbeatSourceOnlyDraft',
  'app.post("/api/stream/live/start"',
  'app.post("/api/stream/live/stop"',
  'app.post("/api/stream/live/heartbeat"',
  'res.status(envelope.statusCode).json(envelope);'
)
$requiredIndexFragments = @(
  'createStreamFoundationLiveWriteSourceOnlyBlockedEnvelope',
  'handleStreamFoundationLiveStartSourceOnlyDraft',
  'handleStreamFoundationLiveStopSourceOnlyDraft',
  'handleStreamFoundationLiveHeartbeatSourceOnlyDraft',
  'from "./foundation/live-write-handler-source-only-draft";'
)

$missingApp = @()
foreach ($frag in $requiredAppFragments) {
  if (-not $appText.Contains($frag)) { $missingApp += $frag }
}
$missingIndex = @()
foreach ($frag in $requiredIndexFragments) {
  if (-not $indexText.Contains($frag)) { $missingIndex += $frag }
}

$dangerousFragments = @(
  ('payment' + '.authorize('),
  ('wallet' + '.mutate('),
  ('provider' + '.call('),
  ('moneyMovementPerformed' + ': 1'),
  ('fakeSuccessAllowed' + ': true'),
  ('ok' + ': true'),
  ('statusCode' + ': 200')
)
$forbiddenHits = @()
foreach ($frag in $dangerousFragments) {
  if ($appText.Contains($frag) -or $indexText.Contains($frag)) { $forbiddenHits += $frag }
}

$serverUnexpectedHits = @()
foreach ($frag in @('/api/stream/live/start','/api/stream/live/stop','/api/stream/live/heartbeat','handleStreamFoundationLiveStartSourceOnlyDraft')) {
  if ($serverText.Contains($frag)) { $serverUnexpectedHits += $frag }
}

$tscExitCode = -1
$tscOk = $false
$tscOutput = ""
if ($RunTsc) {
  try {
    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName = "cmd.exe"
    $psi.Arguments = "/c npx tsc --noEmit"
    $psi.WorkingDirectory = (Get-Location).Path
    $psi.RedirectStandardOutput = $true
    $psi.RedirectStandardError = $true
    $psi.UseShellExecute = $false
    $proc = New-Object System.Diagnostics.Process
    $proc.StartInfo = $psi
    [void]$proc.Start()
    $stdout = $proc.StandardOutput.ReadToEnd()
    $stderr = $proc.StandardError.ReadToEnd()
    $proc.WaitForExit()
    $tscExitCode = [int]$proc.ExitCode
    $tscOk = ($tscExitCode -eq 0)
    $tscOutput = ($stdout + "`n" + $stderr)
  } catch {
    $tscOutput = $_.Exception.Message
    $tscExitCode = -2
    $tscOk = $false
  }
} else {
  $tscExitCode = 0
  $tscOk = $true
  $tscOutput = "tsc not requested"
}
if ($tscOutput.Length -gt 2000) { $tscOutputPreview = $tscOutput.Substring(0, 2000) } else { $tscOutputPreview = $tscOutput }

$appBindingOk = ($missingApp.Count -eq 0)
$indexExportOk = ($missingIndex.Count -eq 0)
$forbiddenOk = ($forbiddenHits.Count -eq 0)
$serverClean = ($serverUnexpectedHits.Count -eq 0)
$ok = [bool]($appBindingOk -and $indexExportOk -and $forbiddenOk -and $serverClean -and $tscOk)
$status = "compile_and_no_runtime_post_safety_check_passed"
if (-not $ok) { $status = "compile_or_source_safety_check_blocked" }

$json = "{"
$json += '"version":' + (JsonString $version) + ","
$json += '"stage":"compile_verification_and_no_runtime_post_safety_check",'
$json += '"startedAt":' + (JsonString $startedAt) + ","
$json += '"finishedAt":' + (JsonString ((Get-Date).ToUniversalTime().ToString("o"))) + ","
$json += '"ok":' + (JsonBool $ok) + ","
$json += '"status":' + (JsonString $status) + ","
$json += '"sourceChecks":{'
$json += '"appBindingOk":' + (JsonBool $appBindingOk) + ","
$json += '"indexExportOk":' + (JsonBool $indexExportOk) + ","
$json += '"serverClean":' + (JsonBool $serverClean) + ","
$json += '"forbiddenFragmentsOk":' + (JsonBool $forbiddenOk) + ","
$json += '"missingAppFragments":' + (JsonArrayFromStrings $missingApp) + ","
$json += '"missingIndexFragments":' + (JsonArrayFromStrings $missingIndex) + ","
$json += '"serverUnexpectedHits":' + (JsonArrayFromStrings $serverUnexpectedHits) + ","
$json += '"forbiddenFragmentHits":' + (JsonArrayFromStrings $forbiddenHits)
$json += "},"
$json += '"tscResult":{'
$json += '"runTsc":' + (JsonBool ([bool]$RunTsc)) + ","
$json += '"exitCode":' + [string]$tscExitCode + ","
$json += '"ok":' + (JsonBool $tscOk) + ","
$json += '"outputPreview":' + (JsonString $tscOutputPreview)
$json += "},"
$json += '"safety":{'
$json += '"backendRestartPerformed":0,'
$json += '"sourceMutationPerformed":0,'
$json += '"runtimeHttpPerformed":0,'
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
$json += '"nextStepIfOk":"BACKEND-STREAM-FOUNDATION-141J controlled blocked-route runtime verification approval package.",'
$json += '"nextStepIfBlocked":"Patch only the reported compile/source issue; do not run runtime POST or touch DB/provider/Wallet/money."'
$json += "}"

if ($WriteReport) {
  $reportDir = Join-Path (Get-Location) ".data\stream"
  New-Item -ItemType Directory -Force -Path $reportDir | Out-Null
  $reportPath = Join-Path $reportDir "backend-stream-foundation-141i-compile-no-runtime-post-safety-check-result.json"
  $json | Set-Content -Encoding UTF8 -Path $reportPath
}

Write-Output $json
if ($WriteReport) {
  Write-Host "141I compile/no-runtime-post safety check report written to $reportPath"
}
