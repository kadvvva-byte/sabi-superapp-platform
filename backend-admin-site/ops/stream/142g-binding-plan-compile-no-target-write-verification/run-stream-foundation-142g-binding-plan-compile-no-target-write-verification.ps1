param(
  [switch]$RunTsc,
  [switch]$WriteReport,
  [string]$ReportPath = ".data\stream\backend-stream-foundation-142g-binding-plan-compile-no-target-write-verification-result.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Version = "BACKEND-STREAM-FOUNDATION-142G"
$Stage = "controlled_binding_plan_compile_and_no_target_write_verification"
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
    Path = "src/modules/stream/foundation/controlled-binding-plan-source-only/index.ts"
    Fragments = @(
      "streamFoundationControlledBindingPlanSourceOnlyContracts",
      "streamFoundationControlledBindingPlanSourceOnly",
      "streamFoundationControlledBindingPlanSourceOnlyReadiness",
      "streamFoundationControlledBindingPlanSourceOnlySmoke"
    )
  },
  @{
    Path = "src/modules/stream/foundation/controlled-binding-plan-source-only/streamFoundationControlledBindingPlanSourceOnlyContracts.ts"
    Fragments = @(
      "BACKEND-STREAM-FOUNDATION-142F",
      "controlled_binding_plan_source_only",
      "stream_live_start",
      "stream_live_stop",
      "stream_live_heartbeat",
      "targetFileWriteAllowedNow: false",
      "routeBehaviorChangeAllowedNow: false",
      "databaseWriteAllowedNow: false",
      "providerCallAllowedNow: false",
      "walletMutationAllowedNow: false"
    )
  },
  @{
    Path = "src/modules/stream/foundation/controlled-binding-plan-source-only/streamFoundationControlledBindingPlanSourceOnly.ts"
    Fragments = @(
      "STREAM_FOUNDATION_142F_OWNER_APPROVAL_TEXT",
      "/api/stream/live/start",
      "/api/stream/live/stop",
      "/api/stream/live/heartbeat",
      "live_start_runtime_handler_draft",
      "live_stop_runtime_handler_draft",
      "live_heartbeat_runtime_handler_draft",
      "currentRoutesRemainBoundToBlockedHandlersNow: true",
      "futureBindingPlanOnly: true",
      "expectedCurrentStatusCode: 423"
    )
  },
  @{
    Path = "src/modules/stream/foundation/controlled-binding-plan-source-only/streamFoundationControlledBindingPlanSourceOnlyReadiness.ts"
    Fragments = @(
      "getStreamFoundationControlledBindingPlanSourceOnlyReadiness",
      "BACKEND-STREAM-FOUNDATION-142E",
      "ownerApprovalAccepted === true",
      "futureBindingPlanOnly === true",
      "expectedCurrentStatusCode === 423",
      "routeBehaviorChangeAllowedNow === false",
      "databaseWriteAllowedNow === false",
      "providerCallAllowedNow === false",
      "walletMutationAllowedNow === false"
    )
  },
  @{
    Path = "src/modules/stream/foundation/controlled-binding-plan-source-only/streamFoundationControlledBindingPlanSourceOnlySmoke.ts"
    Fragments = @(
      "runStreamFoundationControlledBindingPlanSourceOnlySmoke",
      "owner_approval_accepted_for_142f",
      "three_live_write_routes_planned",
      "no_target_write_or_route_behavior_change",
      "routes_remain_blocked_423",
      "no_runtime_db_provider_wallet_money"
    )
  },
  @{
    Path = "src/modules/stream/foundation/stream142fControlledBindingPlanSourceOnlyStagingManifest.ts"
    Fragments = @(
      "STREAM_142F_CONTROLLED_BINDING_PLAN_SOURCE_ONLY_STAGING_MANIFEST",
      "BACKEND-STREAM-FOUNDATION-142F",
      "ownerApprovalAccepted: true",
      "routeBehaviorChangeAllowedNow: false",
      "runtimePostBy142F: false",
      "databaseWriteBy142F: false",
      "providerCallBy142F: false",
      "walletMutationBy142F: false",
      "fakeSuccessBy142F: false"
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
  "controlled-binding-plan-source-only",
  "streamFoundationControlledBindingPlanSourceOnly",
  "getStreamFoundationControlledBindingPlanSourceOnlySnapshot",
  "STREAM_FOUNDATION_142F_CONTROLLED_BINDING_PLAN_VERSION",
  "STREAM_142F_CONTROLLED_BINDING_PLAN_SOURCE_ONLY_STAGING_MANIFEST",
  "live_start_runtime_handler_draft",
  "live_stop_runtime_handler_draft",
  "live_heartbeat_runtime_handler_draft"
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

$BindingPlanFiles = @()
if (Test-Path -LiteralPath "src/modules/stream/foundation/controlled-binding-plan-source-only") {
  $BindingPlanFiles += Get-ChildItem -LiteralPath "src/modules/stream/foundation/controlled-binding-plan-source-only" -Recurse -File -Filter "*.ts" |
    ForEach-Object { $_.FullName }
}

$BindingPlanForbiddenFragments = @(
  'targetFileWriteAllowedNow: true',
  'appTsWriteAllowedNow: true',
  'serverTsWriteAllowedNow: true',
  'streamIndexWriteAllowedNow: true',
  'routeBehaviorChangeAllowedNow: true',
  'runtimePostAllowedNow: true',
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
  'targetFileWriteAllowedNow: 1',
  'routeBehaviorChangeAllowedNow: 1',
  'runtimePostAllowedNow: 1',
  'runtimeSuccessAllowedNow: 1',
  'databaseWriteAllowedNow: 1',
  'providerCallAllowedNow: 1',
  'walletMutationAllowedNow: 1',
  'moneyMovementAllowedNow: 1',
  'fakeSuccessAllowedNow: 1',
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

$BindingPlanForbiddenHits = @()
foreach ($bindingPlanFile in $BindingPlanFiles) {
  $relative = Resolve-Path -LiteralPath $bindingPlanFile -Relative
  $text = Read-TextFile -Path $bindingPlanFile
  foreach ($fragment in $BindingPlanForbiddenFragments) {
    if ($text.Contains($fragment)) {
      $BindingPlanForbiddenHits += [ordered]@{
        path = $relative
        fragment = $fragment
      }
    }
  }
}

$ManifestSafety = Test-ContainsAll -Path "src/modules/stream/foundation/stream142fControlledBindingPlanSourceOnlyStagingManifest.ts" -Fragments @(
  "appTsChangeBy142F: false",
  "serverTsChangeBy142F: false",
  "streamIndexChangeBy142F: false",
  "liveWriteHandlerChangeBy142F: false",
  "backendRestartBy142F: false",
  "runtimeHttpBy142F: false",
  "runtimePostBy142F: false",
  "databaseWriteBy142F: false",
  "providerCallBy142F: false",
  "walletMutationBy142F: false",
  "moneyMovementBy142F: false",
  "fakeSuccessBy142F: false"
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
  runtimeHttpPerformedBy142G = 0
  runtimePostPerformedBy142G = 0
  targetFileWritePerformed = 0
  routeBindingChanged = 0
  routeBehaviorChanged = 0
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
  $BindingPlanForbiddenHits.Count -eq 0 -and
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
  status = $(if ($Ok) { "controlled_binding_plan_compile_and_no_target_write_verification_passed" } else { "controlled_binding_plan_compile_and_no_target_write_verification_blocked" })
  expectedChecks = [ordered]@{
    total = $ExpectedResults.Count
    passed = @($ExpectedResults | Where-Object { $_.ok }).Count
    failed = $MissingOrBadExpected.Count
    failedItems = $MissingOrBadExpected
  }
  targetWriteSafety = [ordered]@{
    checkedFiles = $TargetFiles
    unexpectedBindingPlanHits = $TargetUnexpectedHits
    ok = ($TargetUnexpectedHits.Count -eq 0)
  }
  bindingPlanSourceSafety = [ordered]@{
    scannedFiles = $BindingPlanFiles.Count
    forbiddenHits = $BindingPlanForbiddenHits
    ok = ($BindingPlanForbiddenHits.Count -eq 0)
  }
  manifestSafety = $ManifestSafety
  tscResult = $TscResult
  safety = $Safety
  nextRecommendedStage = "BACKEND-STREAM-FOUNDATION-142H binding plan handoff and controlled target patch approval package"
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
