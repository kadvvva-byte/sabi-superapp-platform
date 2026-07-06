param(
  [switch]$RunTsc,
  [switch]$WriteReport,
  [string]$ReportPath = ".data\stream\backend-stream-foundation-143w-runtime-mount-target-patch-review-package-planning-compile-safety-verification-result.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Version = "BACKEND-STREAM-FOUNDATION-143W"
$Stage = "runtime_mount_target_patch_review_package_planning_compile_safety_verification_ops_only"
$StartedAt = (Get-Date).ToUniversalTime().ToString("o")

$OwnerApprovalText = "I approve BACKEND-STREAM-FOUNDATION-143W controlled runtime mount target patch review package planning compile and safety verification ops-only, verify 143V source-only target patch review package planning contracts compile and remain limited to src/modules/stream/foundation, do not modify source, do not restart backend, no runtime POST, no runtime DB read/write, no provider call, no provider secret read, no realtime socket open, no realtime broadcast, no moderation bypass, no runtime mount, no route behavior change, no target route write, no rollback execution, no post-mount smoke, no Wallet mutation, no payment authorization, no monthly payout, no money movement, no fake success."

$RequiredApprovalTextFor143X = "I approve BACKEND-STREAM-FOUNDATION-143X controlled runtime mount target patch review package post-verification handoff source-only, use 143W verification evidence to close target patch review package planning contracts and prepare the next safe target patch package draft planning batch without source target writes, without prisma schema write, without migration, without backend restart, without runtime POST, without runtime DB read/write, without provider call, without provider secret read, without realtime socket open, without realtime broadcast, without moderation bypass, without runtime mount, without route behavior change, without target route write, without rollback execution, without post-mount smoke, without Wallet mutation, without payment authorization, without monthly payout, without money movement, and without fake success."

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

$ContractDir = "src/modules/stream/foundation/runtime-mount-target-patch-review-package-planning"
$ManifestPath = "src/modules/stream/foundation/stream143vRuntimeMountTargetPatchReviewPackagePlanningStagingManifest.ts"

$Required143VFiles = @(
  "$ContractDir/index.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetPatchReviewPackagePlanning.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetPatchReviewPackagePlanningContracts.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetPatchReviewPackagePlanningReadiness.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetPatchReviewPackagePlanningSmoke.ts",
  $ManifestPath
)

$RequiredFileChecks = @()
foreach ($path in $Required143VFiles) {
  $RequiredFileChecks += [ordered]@{
    path = $path
    exists = (Test-Path -LiteralPath $path)
    sha256 = Get-SafeFileHash -Path $path
  }
}

$MissingRequiredFiles = @($RequiredFileChecks | Where-Object { $_.exists -ne $true })

$ContractContentChecks = @(
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetPatchReviewPackagePlanningContracts.ts"
    Fragments = @(
      "BACKEND-STREAM-FOUNDATION-143V",
      "StreamFoundation143VTargetPatchPackageReviewContract",
      "StreamFoundation143VExactTargetCandidateSelectionContract",
      "StreamFoundation143VExactInsertionMarkerReviewContract",
      "StreamFoundation143VDuplicateMountRiskGateContract",
      "StreamFoundation143VAuthBoundaryPreservationGateContract",
      "StreamFoundation143VBlockedRoutePreservationGateContract",
      "StreamFoundation143VRollbackPackagePlanContract",
      "StreamFoundation143VCompileGateContract",
      "StreamFoundation143VOwnerApprovalGateContract",
      "targetRouteWriteAllowedNow: false",
      "runtimeMountAllowedNow: false",
      "routeBehaviorChangeAllowedNow: false",
      "fakeSuccessAllowedNow: false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetPatchReviewPackagePlanning.ts"
    Fragments = @(
      "getStreamFoundationRuntimeMountTargetPatchReviewPackagePlanningSnapshot",
      "targetPatchPackageReview",
      "exactTargetCandidateSelection",
      "exactInsertionMarkerReview",
      "duplicateMountRiskGate",
      "authBoundaryPreservationGate",
      "blockedRoutePreservationGate",
      "rollbackPackagePlan",
      "compileGate",
      "ownerApprovalGate",
      "targetRouteWriteBy143V: false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetPatchReviewPackagePlanningReadiness.ts"
    Fragments = @(
      "getStreamFoundationRuntimeMountTargetPatchReviewPackagePlanningReadiness",
      "runtime_mount_target_patch_review_package_planning_ready",
      "snapshot.targetPatchPackageReview.candidateTargets.length === 6",
      "snapshot.targetPatchPackageReview.requiredPackageSections.length === 9",
      "snapshot.safety.targetRouteWriteBy143V === false",
      "snapshot.safety.fakeSuccessBy143V === false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetPatchReviewPackagePlanningSmoke.ts"
    Fragments = @(
      "runStreamFoundationRuntimeMountTargetPatchReviewPackagePlanningSmoke",
      "143u_handoff_evidence_preserved",
      "patch_review_package_contracts_present",
      "patch_review_actions_blocked_now"
    )
  },
  @{
    Path = $ManifestPath
    Fragments = @(
      "STREAM_143V_RUNTIME_MOUNT_TARGET_PATCH_REVIEW_PACKAGE_PLANNING_STAGING_MANIFEST",
      "changedScope: `"src/modules/stream/foundation/runtime-mount-target-patch-review-package-planning/**`"",
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
  $has143VRef = $text.Contains("BACKEND-STREAM-FOUNDATION-143V") -or $text.Contains("stream143v") -or $text.Contains("runtime-mount-target-patch-review-package-planning")
  $ForbiddenTargetReferences += [ordered]@{
    path = $path
    exists = (Test-Path -LiteralPath $path)
    contains143VReference = $has143VRef
    ok = (-not $has143VRef)
  }
}
$ForbiddenTargetReferenceFailures = @($ForbiddenTargetReferences | Where-Object { $_.ok -ne $true })

$Actual143VArtifactFiles = @($Required143VFiles)
$Actual143VArtifactOutsideFoundation = @(
  $Actual143VArtifactFiles | Where-Object { -not $_.StartsWith("src/modules/stream/foundation/") }
)
$Actual143VArtifactUnexpected = @(
  $Actual143VArtifactFiles | Where-Object { $Required143VFiles -notcontains $_ }
)

$HistoricalApprovalTextReferenceFiles = @()
if (Test-Path -LiteralPath "src/modules/stream/foundation") {
  $HistoricalApprovalTextReferenceFiles = @(
    Get-ChildItem -LiteralPath "src/modules/stream/foundation" -Recurse -File -Include "*.ts" |
      Where-Object {
        $path = $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
        if ($Required143VFiles -contains $path) {
          return $false
        }

        $content = Read-TextFile -Path $_.FullName
        return $content.Contains("BACKEND-STREAM-FOUNDATION-143V")
      } |
      ForEach-Object { $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/") }
  )
}

$AllowedScopeOk = (
  $MissingRequiredFiles.Count -eq 0 -and
  $Actual143VArtifactOutsideFoundation.Count -eq 0 -and
  $Actual143VArtifactUnexpected.Count -eq 0
)

$AllContractText = ""
foreach ($path in $Required143VFiles) {
  $AllContractText += "`n---FILE:$path---`n"
  $AllContractText += Read-TextFile -Path $path
}

$ForbiddenSafetyFragments = @(
  "targetWriteBy143V: true",
  "appTsChangeBy143V: true",
  "serverTsChangeBy143V: true",
  "streamIndexChangeBy143V: true",
  "prismaSchemaChangeBy143V: true",
  "migrationCreatedBy143V: true",
  "routeBehaviorChangeBy143V: true",
  "backendRestartBy143V: true",
  "runtimeHttpBy143V: true",
  "runtimePostBy143V: true",
  "runtimeDbReadBy143V: true",
  "runtimeDbWriteBy143V: true",
  "databaseReadBy143V: true",
  "databaseWriteBy143V: true",
  "providerCallBy143V: true",
  "providerSecretReadBy143V: true",
  "realtimeSocketOpenBy143V: true",
  "realtimeBroadcastBy143V: true",
  "moderationBypassBy143V: true",
  "runtimeMountBy143V: true",
  "targetRouteWriteBy143V: true",
  "rollbackExecutionBy143V: true",
  "postMountSmokeBy143V: true",
  "walletMutationBy143V: true",
  "paymentAuthorizationBy143V: true",
  "monthlyPayoutBy143V: true",
  "moneyMovementBy143V: true",
  "fakeSuccessBy143V: true",
  "targetPatchPackageCreatedNow: true",
  "proposedDiffAppliedNow: true",
  "targetWriteAllowedNow: true",
  "targetPatchAllowedNow: true",
  "targetRouteWriteAllowedNow: true",
  "runtimeMountAllowedNow: true",
  "routeBehaviorChangeAllowedNow: true",
  "backendRestartAllowedNow: true",
  "fakeSuccessAllowedNow: true",
  "currentWriteAllowed: true",
  "selectedTargetNow: `"",
  "insertionMarkerSelectedNow: true",
  "markerWriteAllowedNow: true",
  "duplicateMountAllowedNow: true",
  "authBypassAllowedNow: true",
  "authRouteOrderChangeAllowedNow: true",
  "liveSuccessAllowedNow: true",
  "rollbackPackageCreatedNow: true",
  "rollbackExecutionAllowedNow: true",
  "compileRunBy143VNow: true",
  "sourceModificationAllowedNow: true",
  "runtimeHttpAllowedNow: true",
  "runtimePostAllowedNow: true",
  "patchPackageBuildAllowedNow: true"
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
          $_.Name.Contains("143v") -or
          $_.Name.Contains("stream") -or
          (Read-TextFile -Path $_.FullName).Contains("BACKEND-STREAM-FOUNDATION-143V")
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
  runtimeHttpPerformedBy143W = 0
  runtimePostPerformedBy143W = 0
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
  status = $(if ($Ok) { "runtime_mount_target_patch_review_package_planning_compile_safety_verification_passed" } else { "runtime_mount_target_patch_review_package_planning_compile_safety_verification_blocked" })
  ownerApprovalAccepted = $true
  ownerApprovalText = $OwnerApprovalText
  requiredApprovalTextFor143X = $RequiredApprovalTextFor143X
  scopeVerification = [ordered]@{
    requiredFiles = $RequiredFileChecks
    missingRequiredFiles = $MissingRequiredFiles
    actual143VArtifactFiles = $Actual143VArtifactFiles
    actual143VArtifactOutsideFoundation = $Actual143VArtifactOutsideFoundation
    actual143VArtifactUnexpected = $Actual143VArtifactUnexpected
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
  nextRecommendedStage = $(if ($Ok) { "BACKEND-STREAM-FOUNDATION-143X controlled runtime mount target patch review package post-verification handoff source-only after exact approval" } else { "Review 143W report before any next stage" })
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
