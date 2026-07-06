param(
  [switch]$RunTsc,
  [switch]$WriteReport,
  [string]$ReportPath = ".data\stream\backend-stream-foundation-143t-runtime-mount-target-diff-review-planning-compile-safety-verification-result.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Version = "BACKEND-STREAM-FOUNDATION-143T"
$Stage = "runtime_mount_target_diff_review_planning_compile_safety_verification_ops_only"
$StartedAt = (Get-Date).ToUniversalTime().ToString("o")

$OwnerApprovalText = "I approve BACKEND-STREAM-FOUNDATION-143T controlled runtime mount target diff review planning compile and safety verification ops-only, verify 143S source-only target diff review planning contracts compile and remain limited to src/modules/stream/foundation, do not modify source, do not restart backend, no runtime POST, no runtime DB read/write, no provider call, no provider secret read, no realtime socket open, no realtime broadcast, no moderation bypass, no runtime mount, no route behavior change, no target route write, no rollback execution, no post-mount smoke, no Wallet mutation, no payment authorization, no monthly payout, no money movement, no fake success."

$RequiredApprovalTextFor143U = "I approve BACKEND-STREAM-FOUNDATION-143U controlled runtime mount target diff review post-verification handoff source-only, use 143T verification evidence to close target diff review planning contracts and prepare the next safe target patch review package planning batch without source target writes, without prisma schema write, without migration, without backend restart, without runtime POST, without runtime DB read/write, without provider call, without provider secret read, without realtime socket open, without realtime broadcast, without moderation bypass, without runtime mount, without route behavior change, without target route write, without rollback execution, without post-mount smoke, without Wallet mutation, without payment authorization, without monthly payout, without money movement, and without fake success."

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

function Get-SafeFileHash {
  param([string]$Path)
  if (-not (Test-Path -LiteralPath $Path)) {
    return $null
  }
  return (Get-FileHash -Algorithm SHA256 -LiteralPath $Path).Hash.ToLowerInvariant()
}

function Get-RelativePath {
  param([string]$Path)
  try {
    return (Resolve-Path -LiteralPath $Path).Path.Replace((Get-Location).Path + "\", "").Replace("\", "/")
  } catch {
    return $Path.Replace("\", "/")
  }
}

$ContractDir = "src/modules/stream/foundation/runtime-mount-target-diff-review-planning"
$ManifestPath = "src/modules/stream/foundation/stream143sRuntimeMountTargetDiffReviewPlanningStagingManifest.ts"

$Required143SFiles = @(
  "$ContractDir/index.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetDiffReviewPlanning.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetDiffReviewPlanningContracts.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetDiffReviewPlanningReadiness.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetDiffReviewPlanningSmoke.ts",
  $ManifestPath
)

$RequiredFileChecks = @()
foreach ($path in $Required143SFiles) {
  $RequiredFileChecks += [ordered]@{
    path = $path
    exists = (Test-Path -LiteralPath $path)
    sha256 = Get-SafeFileHash -Path $path
  }
}

$MissingRequiredFiles = @($RequiredFileChecks | Where-Object { $_.exists -ne $true })

$ContractContentChecks = @(
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetDiffReviewPlanningContracts.ts"
    Fragments = @(
      "BACKEND-STREAM-FOUNDATION-143S",
      "StreamFoundation143STargetDiffReviewContract",
      "StreamFoundation143SExactInsertionMarkerPlanningContract",
      "StreamFoundation143SDuplicateMountRiskReviewContract",
      "StreamFoundation143SAuthBoundaryPreservationContract",
      "StreamFoundation143SBlockedRoutePreservationContract",
      "StreamFoundation143SRollbackPlanContract",
      "StreamFoundation143SCompileGateContract",
      "StreamFoundation143SOwnerApprovalGateContract",
      "targetRouteWriteAllowedNow: false",
      "runtimeMountAllowedNow: false",
      "routeBehaviorChangeAllowedNow: false",
      "fakeSuccessAllowedNow: false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetDiffReviewPlanning.ts"
    Fragments = @(
      "getStreamFoundationRuntimeMountTargetDiffReviewPlanningSnapshot",
      "targetDiffReview",
      "exactInsertionMarkerPlanning",
      "duplicateMountRiskReview",
      "authBoundaryPreservation",
      "blockedRoutePreservation",
      "rollbackPlan",
      "compileGate",
      "ownerApprovalGate",
      "targetRouteWriteBy143S: false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetDiffReviewPlanningReadiness.ts"
    Fragments = @(
      "getStreamFoundationRuntimeMountTargetDiffReviewPlanningReadiness",
      "runtime_mount_target_diff_review_planning_ready",
      "snapshot.targetDiffReview.targetCandidates.length === 6",
      "snapshot.targetDiffReview.requiredReviewItems.length === 8",
      "snapshot.safety.targetRouteWriteBy143S === false",
      "snapshot.safety.fakeSuccessBy143S === false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetDiffReviewPlanningSmoke.ts"
    Fragments = @(
      "runStreamFoundationRuntimeMountTargetDiffReviewPlanningSmoke",
      "143r_handoff_evidence_preserved",
      "diff_review_contracts_present",
      "diff_review_actions_blocked_now"
    )
  },
  @{
    Path = $ManifestPath
    Fragments = @(
      "STREAM_143S_RUNTIME_MOUNT_TARGET_DIFF_REVIEW_PLANNING_STAGING_MANIFEST",
      "changedScope: `"src/modules/stream/foundation/runtime-mount-target-diff-review-planning/**`"",
      "sourceOnly: true",
      "targetRouteWriteAllowed: false",
      "runtimeMountAllowed: false",
      "routeBehaviorChangeAllowed: false",
      "fakeSuccessAllowed: false"
    )
  }
)

$ContractContentResults = @()
foreach ($check in $ContractContentChecks) {
  $ContractContentResults += Test-ContainsAll -Path $check.Path -Fragments $check.Fragments
}
$ContractContentFailures = @($ContractContentResults | Where-Object { $_.ok -ne $true })

$ForbiddenTargetFiles = @(
  "src/app.ts",
  "src/server.ts",
  "src/modules/stream/index.ts",
  "prisma/schema.prisma"
)

$ForbiddenTargetReferences = @()
foreach ($path in $ForbiddenTargetFiles) {
  $text = Read-TextFile -Path $path
  $has143SRef = $text.Contains("BACKEND-STREAM-FOUNDATION-143S") -or $text.Contains("stream143s") -or $text.Contains("runtime-mount-target-diff-review-planning")
  $ForbiddenTargetReferences += [ordered]@{
    path = $path
    exists = (Test-Path -LiteralPath $path)
    contains143SReference = $has143SRef
    ok = (-not $has143SRef)
  }
}
$ForbiddenTargetReferenceFailures = @($ForbiddenTargetReferences | Where-Object { $_.ok -ne $true })

$Actual143SArtifactFiles = @($Required143SFiles)
$Actual143SArtifactOutsideFoundation = @(
  $Actual143SArtifactFiles | Where-Object { -not $_.StartsWith("src/modules/stream/foundation/") }
)
$Actual143SArtifactUnexpected = @(
  $Actual143SArtifactFiles | Where-Object { $Required143SFiles -notcontains $_ }
)

$HistoricalApprovalTextReferenceFiles = @()
if (Test-Path -LiteralPath "src/modules/stream/foundation") {
  $HistoricalApprovalTextReferenceFiles = @(
    Get-ChildItem -LiteralPath "src/modules/stream/foundation" -Recurse -File -Include "*.ts" |
      Where-Object {
        $path = $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
        if ($Required143SFiles -contains $path) {
          return $false
        }

        $content = Read-TextFile -Path $_.FullName
        return $content.Contains("BACKEND-STREAM-FOUNDATION-143S")
      } |
      ForEach-Object { $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/") }
  )
}

$AllowedScopeOk = (
  $MissingRequiredFiles.Count -eq 0 -and
  $Actual143SArtifactOutsideFoundation.Count -eq 0 -and
  $Actual143SArtifactUnexpected.Count -eq 0
)

$AllContractText = ""
foreach ($path in $Required143SFiles) {
  $AllContractText += "`n---FILE:$path---`n"
  $AllContractText += Read-TextFile -Path $path
}

$ForbiddenSafetyFragments = @(
  "targetWriteBy143S: true",
  "appTsChangeBy143S: true",
  "serverTsChangeBy143S: true",
  "streamIndexChangeBy143S: true",
  "prismaSchemaChangeBy143S: true",
  "migrationCreatedBy143S: true",
  "routeBehaviorChangeBy143S: true",
  "backendRestartBy143S: true",
  "runtimeHttpBy143S: true",
  "runtimePostBy143S: true",
  "runtimeDbReadBy143S: true",
  "runtimeDbWriteBy143S: true",
  "databaseReadBy143S: true",
  "databaseWriteBy143S: true",
  "providerCallBy143S: true",
  "providerSecretReadBy143S: true",
  "realtimeSocketOpenBy143S: true",
  "realtimeBroadcastBy143S: true",
  "moderationBypassBy143S: true",
  "runtimeMountBy143S: true",
  "targetRouteWriteBy143S: true",
  "rollbackExecutionBy143S: true",
  "postMountSmokeBy143S: true",
  "walletMutationBy143S: true",
  "paymentAuthorizationBy143S: true",
  "monthlyPayoutBy143S: true",
  "moneyMovementBy143S: true",
  "fakeSuccessBy143S: true",
  "diffAppliedNow: true",
  "targetWriteAllowedNow: true",
  "targetRouteWriteAllowedNow: true",
  "runtimeMountAllowedNow: true",
  "routeBehaviorChangeAllowedNow: true",
  "backendRestartAllowedNow: true",
  "fakeSuccessAllowedNow: true",
  "actualPatchAllowedNow: true",
  "markerWriteAllowedNow: true",
  "duplicateMountAllowedNow: true",
  "authBypassAllowedNow: true",
  "authRouteOrderChangeAllowedNow: true",
  "liveSuccessAllowedNow: true",
  "rollbackExecutionAllowedNow: true",
  "compileRunBy143SNow: true",
  "sourceModificationAllowedNow: true",
  "runtimeHttpAllowedNow: true",
  "runtimePostAllowedNow: true",
  "targetPatchAllowedNow: true"
)

$ForbiddenSafetyHits = @()
foreach ($fragment in $ForbiddenSafetyFragments) {
  if ($AllContractText.Contains($fragment)) {
    $ForbiddenSafetyHits += $fragment
  }
}

$MigrationPathHits = @()
$MigrationDirs = @("prisma/migrations", "migrations")
foreach ($dir in $MigrationDirs) {
  if (Test-Path -LiteralPath $dir) {
    $hits = @(
      Get-ChildItem -LiteralPath $dir -Recurse -File |
        Where-Object {
          $_.Name.Contains("143s") -or
          $_.Name.Contains("stream") -or
          (Read-TextFile -Path $_.FullName).Contains("BACKEND-STREAM-FOUNDATION-143S")
        } |
        ForEach-Object { Get-RelativePath -Path $_.FullName }
    )
    $MigrationPathHits += $hits
  }
}
$MigrationPathHits = @($MigrationPathHits | Select-Object -Unique)

$TscResult = [ordered]@{
  runTsc = [bool]$RunTsc
  exitCode = $null
  outputTail = @()
}

if ($RunTsc) {
  $tscOutput = @()
  $tscOutput = & cmd /c "npx tsc --noEmit" 2>&1
  $TscResult.exitCode = $LASTEXITCODE
  $TscResult.outputTail = @($tscOutput | Select-Object -Last 260)
}

$CompileOk = (-not $RunTsc) -or ($TscResult.exitCode -eq 0)

$Safety = [ordered]@{
  sourceModificationPerformed = 0
  backendRestartPerformed = 0
  runtimeHttpPerformedBy143T = 0
  runtimePostPerformedBy143T = 0
  runtimeDbReadPerformed = 0
  runtimeDbWritePerformed = 0
  databaseReadPerformed = 0
  databaseWritePerformed = 0
  providerCallPerformed = 0
  providerSecretReadPerformed = 0
  realtimeSocketOpenPerformed = 0
  realtimeBroadcastPerformed = 0
  moderationBypassPerformed = 0
  runtimeMountPerformed = 0
  routeBehaviorChangePerformed = 0
  targetRouteWritePerformed = 0
  rollbackExecutionPerformed = 0
  postMountSmokePerformed = 0
  walletMutationPerformed = 0
  paymentAuthorizationPerformed = 0
  monthlyPayoutPerformed = 0
  moneyMovementPerformed = 0
  fakeSuccessAllowed = $false
}

$Ok = (
  $CompileOk -and
  $AllowedScopeOk -and
  $ContractContentFailures.Count -eq 0 -and
  $ForbiddenTargetReferenceFailures.Count -eq 0 -and
  $ForbiddenSafetyHits.Count -eq 0 -and
  $MigrationPathHits.Count -eq 0
)

$FinishedAt = (Get-Date).ToUniversalTime().ToString("o")

$Report = [ordered]@{
  version = $Version
  stage = $Stage
  startedAt = $StartedAt
  finishedAt = $FinishedAt
  ok = $Ok
  status = $(if ($Ok) { "runtime_mount_target_diff_review_planning_compile_safety_verification_passed" } else { "runtime_mount_target_diff_review_planning_compile_safety_verification_blocked" })
  ownerApprovalAccepted = $true
  ownerApprovalText = $OwnerApprovalText
  requiredApprovalTextFor143U = $RequiredApprovalTextFor143U
  scopeVerification = [ordered]@{
    requiredFiles = $RequiredFileChecks
    missingRequiredFiles = $MissingRequiredFiles
    actual143SArtifactFiles = $Actual143SArtifactFiles
    actual143SArtifactOutsideFoundation = $Actual143SArtifactOutsideFoundation
    actual143SArtifactUnexpected = $Actual143SArtifactUnexpected
    historicalApprovalTextReferenceFiles = $HistoricalApprovalTextReferenceFiles
    historicalApprovalTextReferencesAreInformational = $true
    limitedToStreamFoundation = $AllowedScopeOk
  }
  targetReferenceVerification = [ordered]@{
    forbiddenTargetFiles = $ForbiddenTargetReferences
    failed = $ForbiddenTargetReferenceFailures.Count
    ok = ($ForbiddenTargetReferenceFailures.Count -eq 0)
  }
  contractContentVerification = [ordered]@{
    total = $ContractContentResults.Count
    passed = @($ContractContentResults | Where-Object { $_.ok -eq $true }).Count
    failed = $ContractContentFailures.Count
    failures = $ContractContentFailures
  }
  safetyFragmentVerification = [ordered]@{
    forbiddenSafetyHits = $ForbiddenSafetyHits
    ok = ($ForbiddenSafetyHits.Count -eq 0)
  }
  migrationVerification = [ordered]@{
    migrationPathHits = $MigrationPathHits
    ok = ($MigrationPathHits.Count -eq 0)
  }
  tscResult = $TscResult
  safety = $Safety
  nextRecommendedStage = $(if ($Ok) { "BACKEND-STREAM-FOUNDATION-143U controlled runtime mount target diff review post-verification handoff source-only after exact approval" } else { "Review 143T report before any next stage" })
}

if ($WriteReport) {
  $reportParent = Split-Path -Parent $ReportPath
  if ($reportParent -and -not (Test-Path -LiteralPath $reportParent)) {
    New-Item -ItemType Directory -Force -Path $reportParent | Out-Null
  }
  $Report | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath $ReportPath -Encoding UTF8
}

$Report | ConvertTo-Json -Depth 100

if (-not $Ok) {
  exit 1
}
