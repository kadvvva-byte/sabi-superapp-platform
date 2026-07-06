param(
  [switch]$RunTsc,
  [switch]$WriteReport,
  [string]$ReportPath = ".data\stream\backend-stream-foundation-142d-runtime-handler-draft-compile-no-binding-verification-result.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Version = "BACKEND-STREAM-FOUNDATION-142D-FIX1"
$Stage = "runtime_handler_draft_compile_and_no_binding_safety_verification_fix1"
$StartedAt = (Get-Date).ToUniversalTime().ToString("o")

function Read-TextFile {
  param([string]$Path)
  if (-not (Test-Path -LiteralPath $Path)) {
    return ""
  }
  return Get-Content -LiteralPath $Path -Raw -Encoding UTF8
}

function Test-ContainsAll {
  param(
    [string]$Path,
    [string[]]$Fragments
  )

  $text = Read-TextFile -Path $Path
  $missing = @()
  foreach ($fragment in $Fragments) {
    if (-not $text.Contains($fragment)) {
      $missing += $fragment
    }
  }

  return [ordered]@{
    path = $Path
    exists = (Test-Path -LiteralPath $Path)
    missingFragments = $missing
    ok = ((Test-Path -LiteralPath $Path) -and $missing.Count -eq 0)
  }
}

$ExpectedChecks = @(
  @{
    Path = "src/modules/stream/foundation/live-write-runtime-handler/index.ts"
    Fragments = @(
      "streamFoundationLiveWriteRuntimeHandlerDraftContracts",
      "streamFoundationLiveWriteRuntimeHandlerDraft",
      "streamFoundationLiveWriteRuntimeHandlerDraftReadiness",
      "streamFoundationLiveWriteRuntimeHandlerDraftSmoke"
    )
  },
  @{
    Path = "src/modules/stream/foundation/live-write-runtime-handler/streamFoundationLiveWriteRuntimeHandlerDraftContracts.ts"
    Fragments = @(
      "BACKEND-STREAM-FOUNDATION-142C",
      "controlled_source_only_runtime_handler_draft",
      "statusCode: 423",
      "runtimeMountedNow: false",
      "routeBindingChangedNow: false",
      "databaseWriteAllowedNow: false",
      "providerCallAllowedNow: false",
      "walletMutationAllowedNow: false"
    )
  },
  @{
    Path = "src/modules/stream/foundation/live-write-runtime-handler/streamFoundationLiveWriteRuntimeHandlerDraft.ts"
    Fragments = @(
      "createStreamFoundationLiveStartRuntimeHandlerDraftDecision",
      "createStreamFoundationLiveStopRuntimeHandlerDraftDecision",
      "createStreamFoundationLiveHeartbeatRuntimeHandlerDraftDecision",
      "createStreamFoundationLiveStartSourceOnlyAdapterDecision",
      "createStreamFoundationLiveStopSourceOnlyAdapterDecision",
      "createStreamFoundationLiveHeartbeatSourceOnlyAdapterDecision",
      "statusCode: 423",
      "runtimeMountedNow: false",
      "routeBindingChangedNow: false",
      "nextRequiredStage: `"BACKEND-STREAM-FOUNDATION-142D`""
    )
  },
  @{
    Path = "src/modules/stream/foundation/live-write-runtime-handler/streamFoundationLiveWriteRuntimeHandlerDraftReadiness.ts"
    Fragments = @(
      "getStreamFoundationLiveWriteRuntimeHandlerDraftReadiness",
      "BACKEND-STREAM-FOUNDATION-142C",
      "BACKEND-STREAM-FOUNDATION-141Y",
      "runtimeMountedNow === false",
      "routeBindingChangedNow === false",
      "databaseWriteAllowedNow === false",
      "providerCallAllowedNow === false"
    )
  },
  @{
    Path = "src/modules/stream/foundation/live-write-runtime-handler/streamFoundationLiveWriteRuntimeHandlerDraftSmoke.ts"
    Fragments = @(
      "runStreamFoundationLiveWriteRuntimeHandlerDraftSmoke",
      "all_runtime_handler_drafts_return_423_blocked",
      "adapter_chain_remains_blocked",
      "no_route_binding_or_runtime_success",
      "no_db_provider_wallet_money"
    )
  },
  @{
    Path = "src/modules/stream/foundation/stream142cControlledSourceOnlyRuntimeHandlerDraftStagingManifest.ts"
    Fragments = @(
      "STREAM_142C_CONTROLLED_SOURCE_ONLY_RUNTIME_HANDLER_DRAFT_STAGING_MANIFEST",
      "BACKEND-STREAM-FOUNDATION-142C",
      "runtimeMountedNow: false",
      "routeBindingChangedNow: false",
      "runtimePostBy142C: false",
      "databaseWriteBy142C: false",
      "providerCallBy142C: false",
      "walletMutationBy142C: false",
      "fakeSuccessBy142C: false"
    )
  }
)

$ExpectedResults = @()
foreach ($check in $ExpectedChecks) {
  $ExpectedResults += Test-ContainsAll -Path $check.Path -Fragments $check.Fragments
}

$MissingOrBadExpected = @($ExpectedResults | Where-Object { -not $_.ok })

$TargetFiles = @(
  "src/app.ts",
  "src/server.ts",
  "src/modules/stream/index.ts"
)

$TargetForbiddenFragments = @(
  "live-write-runtime-handler",
  "streamFoundationLiveWriteRuntimeHandlerDraft",
  "createStreamFoundationLiveStartRuntimeHandlerDraftDecision",
  "createStreamFoundationLiveStopRuntimeHandlerDraftDecision",
  "createStreamFoundationLiveHeartbeatRuntimeHandlerDraftDecision",
  "STREAM_FOUNDATION_142C_LIVE_WRITE_RUNTIME_HANDLER_DRAFT_VERSION",
  "STREAM_142C_CONTROLLED_SOURCE_ONLY_RUNTIME_HANDLER_DRAFT_STAGING_MANIFEST"
)

$TargetUnexpectedHits = @()
foreach ($targetFile in $TargetFiles) {
  $text = Read-TextFile -Path $targetFile
  foreach ($fragment in $TargetForbiddenFragments) {
    if ($text.Contains($fragment)) {
      $TargetUnexpectedHits += [ordered]@{
        path = $targetFile
        fragment = $fragment
      }
    }
  }
}

$HandlerFiles = @()
if (Test-Path -LiteralPath "src/modules/stream/foundation/live-write-runtime-handler") {
  $HandlerFiles += Get-ChildItem -LiteralPath "src/modules/stream/foundation/live-write-runtime-handler" -Recurse -File -Filter "*.ts" |
    ForEach-Object { $_.FullName }
}

# FIX1: all literal scan fragments are single-quoted where PowerShell could otherwise expand a variable.
$HandlerForbiddenFragments = @(
  'runtimeMountedNow: true',
  'routeBindingChangedNow: true',
  'runtimeSuccessAllowedNow: true',
  'fakeSuccessAllowedNow: true',
  'databaseReadAllowedNow: true',
  'databaseWriteAllowedNow: true',
  'providerCallAllowedNow: true',
  'providerSecretReadAllowedNow: true',
  'walletMutationAllowedNow: true',
  'paymentAuthorizationAllowedNow: true',
  'monthlyPayoutAllowedNow: true',
  'moneyMovementAllowedNow: true',
  'app.post(',
  'app.use(',
  'listen(',
  'fetch(',
  'Invoke-WebRequest',
  'Invoke-RestMethod',
  'new PrismaClient',
  'prisma.',
  '$transaction',
  '.create(',
  '.update(',
  '.upsert(',
  '.delete('
)

$HandlerForbiddenHits = @()
foreach ($handlerFile in $HandlerFiles) {
  $relative = Resolve-Path -LiteralPath $handlerFile -Relative
  $text = Read-TextFile -Path $handlerFile
  foreach ($fragment in $HandlerForbiddenFragments) {
    if ($text.Contains($fragment)) {
      $HandlerForbiddenHits += [ordered]@{
        path = $relative
        fragment = $fragment
      }
    }
  }
}

$ManifestSafety = Test-ContainsAll -Path "src/modules/stream/foundation/stream142cControlledSourceOnlyRuntimeHandlerDraftStagingManifest.ts" -Fragments @(
  "appTsChangeBy142C: false",
  "serverTsChangeBy142C: false",
  "streamIndexChangeBy142C: false",
  "backendRestartBy142C: false",
  "runtimeHttpBy142C: false",
  "runtimePostBy142C: false",
  "databaseWriteBy142C: false",
  "providerCallBy142C: false",
  "walletMutationBy142C: false",
  "moneyMovementBy142C: false",
  "fakeSuccessBy142C: false"
)

$TscResult = [ordered]@{
  runTsc = [bool]$RunTsc
  exitCode = $null
  outputTail = @()
}

if ($RunTsc) {
  $tscOutput = @()
  $tscOutput = & cmd /c "npx tsc --noEmit" 2>&1
  $TscResult.exitCode = $LASTEXITCODE
  $TscResult.outputTail = @($tscOutput | Select-Object -Last 100)
}

$CompileOk = (-not $RunTsc) -or ($TscResult.exitCode -eq 0)

$Safety = [ordered]@{
  sourceMutationPerformed = 0
  backendRestartPerformed = 0
  runtimeHttpPerformedBy142D = 0
  runtimePostPerformedBy142D = 0
  routeBindingChanged = 0
  databaseReadPerformed = 0
  databaseWritePerformed = 0
  providerCallPerformed = 0
  providerSecretReadPerformed = 0
  walletMutationPerformed = 0
  paymentAuthorizationPerformed = 0
  monthlyPayoutPerformed = 0
  moneyMovementPerformed = 0
  fakeSuccessAllowed = $false
}

$Ok = (
  $MissingOrBadExpected.Count -eq 0 -and
  $TargetUnexpectedHits.Count -eq 0 -and
  $HandlerForbiddenHits.Count -eq 0 -and
  $ManifestSafety.ok -eq $true -and
  $CompileOk
)

$FinishedAt = (Get-Date).ToUniversalTime().ToString("o")

$Report = [ordered]@{
  version = $Version
  stage = $Stage
  startedAt = $StartedAt
  finishedAt = $FinishedAt
  ok = $Ok
  status = $(if ($Ok) { "runtime_handler_draft_compile_and_no_binding_safety_verification_passed" } else { "runtime_handler_draft_compile_and_no_binding_safety_verification_blocked" })
  fix1 = [ordered]@{
    fixedPowerShellStrictModeTransactionLiteral = $true
    previousError = "PowerShell expanded `$transaction inside a double-quoted scan fragment"
  }
  expectedChecks = [ordered]@{
    total = $ExpectedResults.Count
    passed = @($ExpectedResults | Where-Object { $_.ok }).Count
    failed = $MissingOrBadExpected.Count
    failedItems = $MissingOrBadExpected
  }
  targetBindingSafety = [ordered]@{
    checkedFiles = $TargetFiles
    unexpectedRuntimeHandlerBindingHits = $TargetUnexpectedHits
    ok = ($TargetUnexpectedHits.Count -eq 0)
  }
  handlerSourceSafety = [ordered]@{
    scannedFiles = $HandlerFiles.Count
    forbiddenHits = $HandlerForbiddenHits
    ok = ($HandlerForbiddenHits.Count -eq 0)
  }
  manifestSafety = $ManifestSafety
  tscResult = $TscResult
  safety = $Safety
  nextRecommendedStage = "BACKEND-STREAM-FOUNDATION-142E runtime handler draft handoff and controlled binding approval package"
}

if ($WriteReport) {
  $reportParent = Split-Path -Parent $ReportPath
  if ($reportParent -and -not (Test-Path -LiteralPath $reportParent)) {
    New-Item -ItemType Directory -Force -Path $reportParent | Out-Null
  }
  $Report | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath $ReportPath -Encoding UTF8
}

$Report | ConvertTo-Json -Depth 20

if (-not $Ok) {
  exit 1
}
