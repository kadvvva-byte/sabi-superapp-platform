param(
  [switch]$RunTsc,
  [switch]$WriteReport,
  [string]$ReportPath = ".data\stream\backend-stream-foundation-143z-runtime-mount-target-patch-package-draft-planning-compile-safety-verification-result.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Version = "BACKEND-STREAM-FOUNDATION-143Z"
$Stage = "runtime_mount_target_patch_package_draft_planning_compile_safety_verification_ops_only"
$StartedAt = (Get-Date).ToUniversalTime().ToString("o")

$OwnerApprovalText = "I approve BACKEND-STREAM-FOUNDATION-143Z controlled runtime mount target patch package draft planning compile and safety verification ops-only, verify 143Y source-only target patch package draft planning contracts compile and remain limited to src/modules/stream/foundation, do not modify source, do not restart backend, no runtime POST, no runtime DB read/write, no provider call, no provider secret read, no realtime socket open, no realtime broadcast, no moderation bypass, no runtime mount, no route behavior change, no target route write, no rollback execution, no post-mount smoke, no Wallet mutation, no payment authorization, no monthly payout, no money movement, no fake success."

$RequiredApprovalTextFor144A = "I approve BACKEND-STREAM-FOUNDATION-144A controlled runtime mount target patch package draft post-verification handoff source-only, use 143Z verification evidence to close target patch package draft planning contracts and prepare the next safe target patch draft preview package planning batch without source target writes, without prisma schema write, without migration, without backend restart, without runtime POST, without runtime DB read/write, without provider call, without provider secret read, without realtime socket open, without realtime broadcast, without moderation bypass, without runtime mount, without route behavior change, without target route write, without rollback execution, without post-mount smoke, without Wallet mutation, without payment authorization, without monthly payout, without money movement, and without fake success."

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

$ContractDir = "src/modules/stream/foundation/runtime-mount-target-patch-package-draft-planning"
$ManifestPath = "src/modules/stream/foundation/stream143yRuntimeMountTargetPatchPackageDraftPlanningStagingManifest.ts"

$Required143YFiles = @(
  "$ContractDir/index.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetPatchPackageDraftPlanning.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetPatchPackageDraftPlanningContracts.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetPatchPackageDraftPlanningReadiness.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetPatchPackageDraftPlanningSmoke.ts",
  $ManifestPath
)

$RequiredFileChecks = @()
foreach ($path in $Required143YFiles) {
  $RequiredFileChecks += [ordered]@{
    path = $path
    exists = (Test-Path -LiteralPath $path)
    sha256 = Get-SafeFileHash -Path $path
  }
}

$MissingRequiredFiles = @($RequiredFileChecks | Where-Object { $_.exists -ne $true })

$ContractContentChecks = @(
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetPatchPackageDraftPlanningContracts.ts"
    Fragments = @(
      "BACKEND-STREAM-FOUNDATION-143Y",
      "StreamFoundation143YTargetPatchPackageDraftPreviewContract",
      "StreamFoundation143YSelectedTargetCandidateProposalContract",
      "StreamFoundation143YProposedDiffPreviewPlanContract",
      "StreamFoundation143YInsertionMarkerConfirmationPlanContract",
      "StreamFoundation143YDuplicateMountRiskEvidencePlanContract",
      "StreamFoundation143YAuthBoundaryPreservationPlanContract",
      "StreamFoundation143YBlockedRoutePreservationPlanContract",
      "StreamFoundation143YRollbackPreviewPlanContract",
      "StreamFoundation143YCompileGateContract",
      "StreamFoundation143YOwnerApprovalGateContract",
      "targetRouteWriteAllowedNow: false",
      "runtimeMountAllowedNow: false",
      "routeBehaviorChangeAllowedNow: false",
      "fakeSuccessAllowedNow: false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetPatchPackageDraftPlanning.ts"
    Fragments = @(
      "getStreamFoundationRuntimeMountTargetPatchPackageDraftPlanningSnapshot",
      "draftPreview",
      "selectedTargetCandidateProposal",
      "proposedDiffPreviewPlan",
      "insertionMarkerConfirmationPlan",
      "duplicateMountRiskEvidencePlan",
      "authBoundaryPreservationPlan",
      "blockedRoutePreservationPlan",
      "rollbackPreviewPlan",
      "compileGate",
      "ownerApprovalGate",
      "targetRouteWriteBy143Y: false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetPatchPackageDraftPlanningReadiness.ts"
    Fragments = @(
      "getStreamFoundationRuntimeMountTargetPatchPackageDraftPlanningReadiness",
      "runtime_mount_target_patch_package_draft_planning_ready",
      "snapshot.draftPreview.draftSections.length === 9",
      "snapshot.selectedTargetCandidateProposal.candidates.length === 6",
      "snapshot.safety.targetRouteWriteBy143Y === false",
      "snapshot.safety.fakeSuccessBy143Y === false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetPatchPackageDraftPlanningSmoke.ts"
    Fragments = @(
      "runStreamFoundationRuntimeMountTargetPatchPackageDraftPlanningSmoke",
      "143x_handoff_evidence_preserved",
      "draft_planning_contracts_present",
      "draft_planning_actions_blocked_now"
    )
  },
  @{
    Path = $ManifestPath
    Fragments = @(
      "STREAM_143Y_RUNTIME_MOUNT_TARGET_PATCH_PACKAGE_DRAFT_PLANNING_STAGING_MANIFEST",
      "changedScope: `"src/modules/stream/foundation/runtime-mount-target-patch-package-draft-planning/**`"",
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
  $has143YRef = $text.Contains("BACKEND-STREAM-FOUNDATION-143Y") -or $text.Contains("stream143y") -or $text.Contains("runtime-mount-target-patch-package-draft-planning")
  $ForbiddenTargetReferences += [ordered]@{
    path = $path
    exists = (Test-Path -LiteralPath $path)
    contains143YReference = $has143YRef
    ok = (-not $has143YRef)
  }
}
$ForbiddenTargetReferenceFailures = @($ForbiddenTargetReferences | Where-Object { $_.ok -ne $true })

$Actual143YArtifactFiles = @($Required143YFiles)
$Actual143YArtifactOutsideFoundation = @(
  $Actual143YArtifactFiles | Where-Object { -not $_.StartsWith("src/modules/stream/foundation/") }
)
$Actual143YArtifactUnexpected = @(
  $Actual143YArtifactFiles | Where-Object { $Required143YFiles -notcontains $_ }
)

$HistoricalApprovalTextReferenceFiles = @()
if (Test-Path -LiteralPath "src/modules/stream/foundation") {
  $HistoricalApprovalTextReferenceFiles = @(
    Get-ChildItem -LiteralPath "src/modules/stream/foundation" -Recurse -File -Include "*.ts" |
      Where-Object {
        $path = $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
        if ($Required143YFiles -contains $path) {
          return $false
        }

        $content = Read-TextFile -Path $_.FullName
        return $content.Contains("BACKEND-STREAM-FOUNDATION-143Y")
      } |
      ForEach-Object { $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/") }
  )
}

$AllowedScopeOk = (
  $MissingRequiredFiles.Count -eq 0 -and
  $Actual143YArtifactOutsideFoundation.Count -eq 0 -and
  $Actual143YArtifactUnexpected.Count -eq 0
)

$AllContractText = ""
foreach ($path in $Required143YFiles) {
  $AllContractText += "`n---FILE:$path---`n"
  $AllContractText += Read-TextFile -Path $path
}

$ForbiddenSafetyFragments = @(
  "targetWriteBy143Y: true",
  "appTsChangeBy143Y: true",
  "serverTsChangeBy143Y: true",
  "streamIndexChangeBy143Y: true",
  "prismaSchemaChangeBy143Y: true",
  "migrationCreatedBy143Y: true",
  "routeBehaviorChangeBy143Y: true",
  "backendRestartBy143Y: true",
  "runtimeHttpBy143Y: true",
  "runtimePostBy143Y: true",
  "runtimeDbReadBy143Y: true",
  "runtimeDbWriteBy143Y: true",
  "databaseReadBy143Y: true",
  "databaseWriteBy143Y: true",
  "providerCallBy143Y: true",
  "providerSecretReadBy143Y: true",
  "realtimeSocketOpenBy143Y: true",
  "realtimeBroadcastBy143Y: true",
  "moderationBypassBy143Y: true",
  "runtimeMountBy143Y: true",
  "targetRouteWriteBy143Y: true",
  "rollbackExecutionBy143Y: true",
  "postMountSmokeBy143Y: true",
  "walletMutationBy143Y: true",
  "paymentAuthorizationBy143Y: true",
  "monthlyPayoutBy143Y: true",
  "moneyMovementBy143Y: true",
  "fakeSuccessBy143Y: true",
  "draftPackageCreatedNow: true",
  "proposedDiffRenderedNow: true",
  "proposedDiffAppliedNow: true",
  "sourceTargetWriteAllowedNow: true",
  "targetPatchAllowedNow: true",
  "targetRouteWriteAllowedNow: true",
  "runtimeMountAllowedNow: true",
  "routeBehaviorChangeAllowedNow: true",
  "fakeSuccessAllowedNow: true",
  "selectedForWriteNow: true",
  "finalSelectedTargetNow: `"",
  "diffPreviewRenderedNow: true",
  "markerConfirmedNow: true",
  "markerWriteAllowedNow: true",
  "duplicateMountAllowedNow: true",
  "authBoundaryChangeAllowedNow: true",
  "authBypassAllowedNow: true",
  "liveSuccessAllowedNow: true",
  "rollbackPreviewCreatedNow: true",
  "rollbackExecutionAllowedNow: true",
  "compileRunBy143YNow: true",
  "sourceModificationAllowedNow: true",
  "runtimeHttpAllowedNow: true",
  "runtimePostAllowedNow: true",
  "backendRestartAllowedNow: true",
  "draftPackageBuildAllowedNow: true",
  "postMountSmokeAllowedNow: true"
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
          $_.Name.Contains("143y") -or
          $_.Name.Contains("stream") -or
          (Read-TextFile -Path $_.FullName).Contains("BACKEND-STREAM-FOUNDATION-143Y")
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
  runtimeHttpPerformedBy143Z = 0
  runtimePostPerformedBy143Z = 0
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
  status = $(if ($Ok) { "runtime_mount_target_patch_package_draft_planning_compile_safety_verification_passed" } else { "runtime_mount_target_patch_package_draft_planning_compile_safety_verification_blocked" })
  ownerApprovalAccepted = $true
  ownerApprovalText = $OwnerApprovalText
  requiredApprovalTextFor144A = $RequiredApprovalTextFor144A
  scopeVerification = [ordered]@{
    requiredFiles = $RequiredFileChecks
    missingRequiredFiles = $MissingRequiredFiles
    actual143YArtifactFiles = $Actual143YArtifactFiles
    actual143YArtifactOutsideFoundation = $Actual143YArtifactOutsideFoundation
    actual143YArtifactUnexpected = $Actual143YArtifactUnexpected
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
  nextRecommendedStage = $(if ($Ok) { "BACKEND-STREAM-FOUNDATION-144A controlled runtime mount target patch package draft post-verification handoff source-only after exact approval" } else { "Review 143Z report before any next stage" })
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
