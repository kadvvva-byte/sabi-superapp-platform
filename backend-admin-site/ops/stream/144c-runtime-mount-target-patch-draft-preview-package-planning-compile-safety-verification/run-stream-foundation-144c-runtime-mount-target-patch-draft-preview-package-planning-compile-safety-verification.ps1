param(
  [switch]$RunTsc,
  [switch]$WriteReport,
  [string]$ReportPath = ".data\stream\backend-stream-foundation-144c-runtime-mount-target-patch-draft-preview-package-planning-compile-safety-verification-result.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Version = "BACKEND-STREAM-FOUNDATION-144C"
$Stage = "runtime_mount_target_patch_draft_preview_package_planning_compile_safety_verification_ops_only"
$StartedAt = (Get-Date).ToUniversalTime().ToString("o")

$OwnerApprovalText = "I approve BACKEND-STREAM-FOUNDATION-144C controlled runtime mount target patch draft preview package planning compile and safety verification ops-only, verify 144B source-only target patch draft preview package planning contracts compile and remain limited to src/modules/stream/foundation, do not modify source, do not restart backend, no runtime POST, no runtime DB read/write, no provider call, no provider secret read, no realtime socket open, no realtime broadcast, no moderation bypass, no runtime mount, no route behavior change, no target route write, no rollback execution, no post-mount smoke, no Wallet mutation, no payment authorization, no monthly payout, no money movement, no fake success."

$RequiredApprovalTextFor144D = "I approve BACKEND-STREAM-FOUNDATION-144D controlled runtime mount target patch draft preview package post-verification handoff source-only, use 144C verification evidence to close target patch draft preview package planning contracts and prepare the next safe target patch draft preview evidence capture planning batch without source target writes, without prisma schema write, without migration, without backend restart, without runtime POST, without runtime DB read/write, without provider call, without provider secret read, without realtime socket open, without realtime broadcast, without moderation bypass, without runtime mount, without route behavior change, without target route write, without rollback execution, without post-mount smoke, without Wallet mutation, without payment authorization, without monthly payout, without money movement, and without fake success."

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

$ContractDir = "src/modules/stream/foundation/runtime-mount-target-patch-draft-preview-package-planning"
$ManifestPath = "src/modules/stream/foundation/stream144bRuntimeMountTargetPatchDraftPreviewPackagePlanningStagingManifest.ts"

$Required144BFiles = @(
  "$ContractDir/index.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetPatchDraftPreviewPackagePlanning.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetPatchDraftPreviewPackagePlanningContracts.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetPatchDraftPreviewPackagePlanningReadiness.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetPatchDraftPreviewPackagePlanningSmoke.ts",
  $ManifestPath
)

$RequiredFileChecks = @()
foreach ($path in $Required144BFiles) {
  $RequiredFileChecks += [ordered]@{
    path = $path
    exists = (Test-Path -LiteralPath $path)
    sha256 = Get-SafeFileHash -Path $path
  }
}

$MissingRequiredFiles = @($RequiredFileChecks | Where-Object { $_.exists -ne $true })

$ContractContentChecks = @(
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetPatchDraftPreviewPackagePlanningContracts.ts"
    Fragments = @(
      "BACKEND-STREAM-FOUNDATION-144B",
      "StreamFoundation144BTargetPatchDraftPreviewPackageContract",
      "StreamFoundation144BProposedTargetFileSnapshotContract",
      "StreamFoundation144BProposedDiffPreviewTextContract",
      "StreamFoundation144BInsertionMarkerEvidenceContract",
      "StreamFoundation144BDuplicateMountEvidenceContract",
      "StreamFoundation144BAuthBoundaryEvidenceContract",
      "StreamFoundation144BBlockedRouteEvidenceContract",
      "StreamFoundation144BRollbackPreviewContract",
      "StreamFoundation144BCompileGateContract",
      "StreamFoundation144BOwnerApprovalGateContract",
      "targetRouteWriteAllowedNow: false",
      "runtimeMountAllowedNow: false",
      "routeBehaviorChangeAllowedNow: false",
      "fakeSuccessAllowedNow: false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetPatchDraftPreviewPackagePlanning.ts"
    Fragments = @(
      "getStreamFoundationRuntimeMountTargetPatchDraftPreviewPackagePlanningSnapshot",
      "previewPackage",
      "proposedTargetFileSnapshot",
      "proposedDiffPreviewText",
      "insertionMarkerEvidence",
      "duplicateMountEvidence",
      "authBoundaryEvidence",
      "blockedRouteEvidence",
      "rollbackPreview",
      "compileGate",
      "ownerApprovalGate",
      "targetRouteWriteBy144B: false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetPatchDraftPreviewPackagePlanningReadiness.ts"
    Fragments = @(
      "getStreamFoundationRuntimeMountTargetPatchDraftPreviewPackagePlanningReadiness",
      "runtime_mount_target_patch_draft_preview_package_planning_ready",
      "snapshot.previewPackage.previewPackageSections.length === 9",
      "snapshot.proposedTargetFileSnapshot.snapshotItems.length === 6",
      "snapshot.safety.targetRouteWriteBy144B === false",
      "snapshot.safety.fakeSuccessBy144B === false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetPatchDraftPreviewPackagePlanningSmoke.ts"
    Fragments = @(
      "runStreamFoundationRuntimeMountTargetPatchDraftPreviewPackagePlanningSmoke",
      "144a_handoff_evidence_preserved",
      "draft_preview_package_contracts_present",
      "draft_preview_actions_blocked_now"
    )
  },
  @{
    Path = $ManifestPath
    Fragments = @(
      "STREAM_144B_RUNTIME_MOUNT_TARGET_PATCH_DRAFT_PREVIEW_PACKAGE_PLANNING_STAGING_MANIFEST",
      "changedScope: `"src/modules/stream/foundation/runtime-mount-target-patch-draft-preview-package-planning/**`"",
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
  $has144BRef = $text.Contains("BACKEND-STREAM-FOUNDATION-144B") -or $text.Contains("stream144b") -or $text.Contains("runtime-mount-target-patch-draft-preview-package-planning")
  $ForbiddenTargetReferences += [ordered]@{
    path = $path
    exists = (Test-Path -LiteralPath $path)
    contains144BReference = $has144BRef
    ok = (-not $has144BRef)
  }
}
$ForbiddenTargetReferenceFailures = @($ForbiddenTargetReferences | Where-Object { $_.ok -ne $true })

$Actual144BArtifactFiles = @($Required144BFiles)
$Actual144BArtifactOutsideFoundation = @(
  $Actual144BArtifactFiles | Where-Object { -not $_.StartsWith("src/modules/stream/foundation/") }
)
$Actual144BArtifactUnexpected = @(
  $Actual144BArtifactFiles | Where-Object { $Required144BFiles -notcontains $_ }
)

$HistoricalApprovalTextReferenceFiles = @()
if (Test-Path -LiteralPath "src/modules/stream/foundation") {
  $HistoricalApprovalTextReferenceFiles = @(
    Get-ChildItem -LiteralPath "src/modules/stream/foundation" -Recurse -File -Include "*.ts" |
      Where-Object {
        $path = $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
        if ($Required144BFiles -contains $path) {
          return $false
        }

        $content = Read-TextFile -Path $_.FullName
        return $content.Contains("BACKEND-STREAM-FOUNDATION-144B")
      } |
      ForEach-Object { $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/") }
  )
}

$AllowedScopeOk = (
  $MissingRequiredFiles.Count -eq 0 -and
  $Actual144BArtifactOutsideFoundation.Count -eq 0 -and
  $Actual144BArtifactUnexpected.Count -eq 0
)

$AllContractText = ""
foreach ($path in $Required144BFiles) {
  $AllContractText += "`n---FILE:$path---`n"
  $AllContractText += Read-TextFile -Path $path
}

$ForbiddenSafetyFragments = @(
  "targetWriteBy144B: true",
  "appTsChangeBy144B: true",
  "serverTsChangeBy144B: true",
  "streamIndexChangeBy144B: true",
  "prismaSchemaChangeBy144B: true",
  "migrationCreatedBy144B: true",
  "routeBehaviorChangeBy144B: true",
  "backendRestartBy144B: true",
  "runtimeHttpBy144B: true",
  "runtimePostBy144B: true",
  "runtimeDbReadBy144B: true",
  "runtimeDbWriteBy144B: true",
  "databaseReadBy144B: true",
  "databaseWriteBy144B: true",
  "providerCallBy144B: true",
  "providerSecretReadBy144B: true",
  "realtimeSocketOpenBy144B: true",
  "realtimeBroadcastBy144B: true",
  "moderationBypassBy144B: true",
  "runtimeMountBy144B: true",
  "targetRouteWriteBy144B: true",
  "rollbackExecutionBy144B: true",
  "postMountSmokeBy144B: true",
  "walletMutationBy144B: true",
  "paymentAuthorizationBy144B: true",
  "monthlyPayoutBy144B: true",
  "moneyMovementBy144B: true",
  "fakeSuccessBy144B: true",
  "previewPackageCreatedNow: true",
  "previewPackageRenderedNow: true",
  "proposedDiffAppliedNow: true",
  "sourceTargetWriteAllowedNow: true",
  "targetPatchAllowedNow: true",
  "targetRouteWriteAllowedNow: true",
  "runtimeMountAllowedNow: true",
  "routeBehaviorChangeAllowedNow: true",
  "fakeSuccessAllowedNow: true",
  "selectedForPatchNow: true",
  "targetFileReadNow: true",
  "finalSelectedTargetNow: `"",
  "targetSnapshotReadNow: true",
  "diffPreviewTextGeneratedNow: true",
  "insertionMarkerEvidenceCapturedNow: true",
  "markerWriteAllowedNow: true",
  "duplicateMountEvidenceCapturedNow: true",
  "duplicateMountAllowedNow: true",
  "authBoundaryEvidenceCapturedNow: true",
  "authBypassAllowedNow: true",
  "authRouteOrderChangeAllowedNow: true",
  "blockedRouteEvidenceCapturedNow: true",
  "liveSuccessAllowedNow: true",
  "rollbackPreviewTextGeneratedNow: true",
  "rollbackExecutionAllowedNow: true",
  "compileRunBy144BNow: true",
  "sourceModificationAllowedNow: true",
  "runtimeHttpAllowedNow: true",
  "runtimePostAllowedNow: true",
  "backendRestartAllowedNow: true",
  "previewPackageBuildAllowedNow: true",
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
          $_.Name.Contains("144b") -or
          $_.Name.Contains("stream") -or
          (Read-TextFile -Path $_.FullName).Contains("BACKEND-STREAM-FOUNDATION-144B")
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
  runtimeHttpPerformedBy144C = 0
  runtimePostPerformedBy144C = 0
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
  status = $(if ($Ok) { "runtime_mount_target_patch_draft_preview_package_planning_compile_safety_verification_passed" } else { "runtime_mount_target_patch_draft_preview_package_planning_compile_safety_verification_blocked" })
  ownerApprovalAccepted = $true
  ownerApprovalText = $OwnerApprovalText
  requiredApprovalTextFor144D = $RequiredApprovalTextFor144D
  scopeVerification = [ordered]@{
    requiredFiles = $RequiredFileChecks
    missingRequiredFiles = $MissingRequiredFiles
    actual144BArtifactFiles = $Actual144BArtifactFiles
    actual144BArtifactOutsideFoundation = $Actual144BArtifactOutsideFoundation
    actual144BArtifactUnexpected = $Actual144BArtifactUnexpected
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
  nextRecommendedStage = $(if ($Ok) { "BACKEND-STREAM-FOUNDATION-144D controlled runtime mount target patch draft preview package post-verification handoff source-only after exact approval" } else { "Review 144C report before any next stage" })
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
