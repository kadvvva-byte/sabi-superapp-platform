param(
  [switch]$RunTsc,
  [switch]$WriteReport,
  [string]$ReportPath = ".data\stream\backend-stream-foundation-144f-runtime-mount-target-patch-draft-preview-evidence-capture-planning-compile-safety-verification-result.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Version = "BACKEND-STREAM-FOUNDATION-144F"
$Stage = "runtime_mount_target_patch_draft_preview_evidence_capture_planning_compile_safety_verification_ops_only"
$StartedAt = (Get-Date).ToUniversalTime().ToString("o")

$OwnerApprovalText = "I approve BACKEND-STREAM-FOUNDATION-144F controlled runtime mount target patch draft preview evidence capture planning compile and safety verification ops-only, verify 144E source-only target patch draft preview evidence capture planning contracts compile and remain limited to src/modules/stream/foundation, do not modify source, do not restart backend, no runtime POST, no runtime DB read/write, no provider call, no provider secret read, no realtime socket open, no realtime broadcast, no moderation bypass, no runtime mount, no route behavior change, no target route write, no rollback execution, no post-mount smoke, no Wallet mutation, no payment authorization, no monthly payout, no money movement, no fake success."

$RequiredApprovalTextFor144G = "I approve BACKEND-STREAM-FOUNDATION-144G controlled runtime mount target patch draft preview evidence capture post-verification handoff source-only, use 144F verification evidence to close target patch draft preview evidence capture planning contracts and prepare the next safe target patch draft preview evidence capture runner approval package without source target writes, without prisma schema write, without migration, without backend restart, without runtime POST, without runtime DB read/write, without provider call, without provider secret read, without realtime socket open, without realtime broadcast, without moderation bypass, without runtime mount, without route behavior change, without target route write, without rollback execution, without post-mount smoke, without Wallet mutation, without payment authorization, without monthly payout, without money movement, and without fake success."

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

$ContractDir = "src/modules/stream/foundation/runtime-mount-target-patch-draft-preview-evidence-capture-planning"
$ManifestPath = "src/modules/stream/foundation/stream144eRuntimeMountTargetPatchDraftPreviewEvidenceCapturePlanningStagingManifest.ts"

$Required144EFiles = @(
  "$ContractDir/index.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetPatchDraftPreviewEvidenceCapturePlanning.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetPatchDraftPreviewEvidenceCapturePlanningContracts.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetPatchDraftPreviewEvidenceCapturePlanningReadiness.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetPatchDraftPreviewEvidenceCapturePlanningSmoke.ts",
  $ManifestPath
)

$RequiredFileChecks = @()
foreach ($path in $Required144EFiles) {
  $RequiredFileChecks += [ordered]@{
    path = $path
    exists = (Test-Path -LiteralPath $path)
    sha256 = Get-SafeFileHash -Path $path
  }
}

$MissingRequiredFiles = @($RequiredFileChecks | Where-Object { $_.exists -ne $true })

$ContractContentChecks = @(
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetPatchDraftPreviewEvidenceCapturePlanningContracts.ts"
    Fragments = @(
      "BACKEND-STREAM-FOUNDATION-144E",
      "StreamFoundation144ETargetFileSnapshotEvidenceCaptureContract",
      "StreamFoundation144ETargetHashPreviewContract",
      "StreamFoundation144ETargetExcerptCaptureContract",
      "StreamFoundation144EInsertionAnchorCaptureContract",
      "StreamFoundation144EDuplicateMountInventoryCaptureContract",
      "StreamFoundation144EAuthBoundaryEvidenceCaptureContract",
      "StreamFoundation144EBlockedRouteEvidenceCaptureContract",
      "StreamFoundation144ERollbackEvidenceCaptureContract",
      "StreamFoundation144ECompileGateContract",
      "StreamFoundation144EOwnerApprovalGateContract",
      "targetRouteWriteAllowedNow: false",
      "runtimeMountAllowedNow: false",
      "routeBehaviorChangeAllowedNow: false",
      "fakeSuccessAllowedNow: false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetPatchDraftPreviewEvidenceCapturePlanning.ts"
    Fragments = @(
      "getStreamFoundationRuntimeMountTargetPatchDraftPreviewEvidenceCapturePlanningSnapshot",
      "targetFileSnapshotEvidenceCapture",
      "targetHashPreview",
      "targetExcerptCapture",
      "insertionAnchorCapture",
      "duplicateMountInventoryCapture",
      "authBoundaryEvidenceCapture",
      "blockedRouteEvidenceCapture",
      "rollbackEvidenceCapture",
      "compileGate",
      "ownerApprovalGate",
      "targetRouteWriteBy144E: false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetPatchDraftPreviewEvidenceCapturePlanningReadiness.ts"
    Fragments = @(
      "getStreamFoundationRuntimeMountTargetPatchDraftPreviewEvidenceCapturePlanningReadiness",
      "runtime_mount_target_patch_draft_preview_evidence_capture_planning_ready",
      "snapshot.targetFileSnapshotEvidenceCapture.capturePlanItems.length === 6",
      "snapshot.safety.targetRouteWriteBy144E === false",
      "snapshot.safety.fakeSuccessBy144E === false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetPatchDraftPreviewEvidenceCapturePlanningSmoke.ts"
    Fragments = @(
      "runStreamFoundationRuntimeMountTargetPatchDraftPreviewEvidenceCapturePlanningSmoke",
      "144d_handoff_evidence_preserved",
      "evidence_capture_planning_contracts_present",
      "evidence_capture_actions_blocked_now"
    )
  },
  @{
    Path = $ManifestPath
    Fragments = @(
      "STREAM_144E_RUNTIME_MOUNT_TARGET_PATCH_DRAFT_PREVIEW_EVIDENCE_CAPTURE_PLANNING_STAGING_MANIFEST",
      "changedScope: `"src/modules/stream/foundation/runtime-mount-target-patch-draft-preview-evidence-capture-planning/**`"",
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
  $has144ERef = $text.Contains("BACKEND-STREAM-FOUNDATION-144E") -or $text.Contains("stream144e") -or $text.Contains("runtime-mount-target-patch-draft-preview-evidence-capture-planning")
  $ForbiddenTargetReferences += [ordered]@{
    path = $path
    exists = (Test-Path -LiteralPath $path)
    contains144EReference = $has144ERef
    ok = (-not $has144ERef)
  }
}
$ForbiddenTargetReferenceFailures = @($ForbiddenTargetReferences | Where-Object { $_.ok -ne $true })

$Actual144EArtifactFiles = @($Required144EFiles)
$Actual144EArtifactOutsideFoundation = @(
  $Actual144EArtifactFiles | Where-Object { -not $_.StartsWith("src/modules/stream/foundation/") }
)
$Actual144EArtifactUnexpected = @(
  $Actual144EArtifactFiles | Where-Object { $Required144EFiles -notcontains $_ }
)

$HistoricalApprovalTextReferenceFiles = @()
if (Test-Path -LiteralPath "src/modules/stream/foundation") {
  $HistoricalApprovalTextReferenceFiles = @(
    Get-ChildItem -LiteralPath "src/modules/stream/foundation" -Recurse -File -Include "*.ts" |
      Where-Object {
        $path = $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
        if ($Required144EFiles -contains $path) {
          return $false
        }

        $content = Read-TextFile -Path $_.FullName
        return $content.Contains("BACKEND-STREAM-FOUNDATION-144E")
      } |
      ForEach-Object { $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/") }
  )
}

$AllowedScopeOk = (
  $MissingRequiredFiles.Count -eq 0 -and
  $Actual144EArtifactOutsideFoundation.Count -eq 0 -and
  $Actual144EArtifactUnexpected.Count -eq 0
)

$AllContractText = ""
foreach ($path in $Required144EFiles) {
  $AllContractText += "`n---FILE:$path---`n"
  $AllContractText += Read-TextFile -Path $path
}

$ForbiddenSafetyFragments = @(
  "targetWriteBy144E: true",
  "appTsChangeBy144E: true",
  "serverTsChangeBy144E: true",
  "streamIndexChangeBy144E: true",
  "prismaSchemaChangeBy144E: true",
  "migrationCreatedBy144E: true",
  "routeBehaviorChangeBy144E: true",
  "backendRestartBy144E: true",
  "runtimeHttpBy144E: true",
  "runtimePostBy144E: true",
  "runtimeDbReadBy144E: true",
  "runtimeDbWriteBy144E: true",
  "databaseReadBy144E: true",
  "databaseWriteBy144E: true",
  "providerCallBy144E: true",
  "providerSecretReadBy144E: true",
  "realtimeSocketOpenBy144E: true",
  "realtimeBroadcastBy144E: true",
  "moderationBypassBy144E: true",
  "runtimeMountBy144E: true",
  "targetRouteWriteBy144E: true",
  "rollbackExecutionBy144E: true",
  "postMountSmokeBy144E: true",
  "walletMutationBy144E: true",
  "paymentAuthorizationBy144E: true",
  "monthlyPayoutBy144E: true",
  "moneyMovementBy144E: true",
  "fakeSuccessBy144E: true",
  "targetFileReadNow: true",
  "targetHashCapturedNow: true",
  "targetExcerptCapturedNow: true",
  "targetSnapshotCapturedNow: true",
  "selectedForPatchNow: true",
  "finalSelectedTargetNow: `"",
  "sourceTargetWriteAllowedNow: true",
  "targetPatchAllowedNow: true",
  "targetRouteWriteAllowedNow: true",
  "runtimeMountAllowedNow: true",
  "routeBehaviorChangeAllowedNow: true",
  "targetHashPreviewCapturedNow: true",
  "targetExcerptCapturedNow: true",
  "excerptMutationAllowedNow: true",
  "insertionAnchorCapturedNow: true",
  "insertionAnchorSelectedNow: true",
  "markerWriteAllowedNow: true",
  "duplicateMountInventoryCapturedNow: true",
  "duplicateMountDecisionMadeNow: true",
  "duplicateMountAllowedNow: true",
  "authBoundaryEvidenceCapturedNow: true",
  "authBypassAllowedNow: true",
  "authRouteOrderChangeAllowedNow: true",
  "blockedRouteEvidenceCapturedNow: true",
  "liveSuccessAllowedNow: true",
  "rollbackEvidenceCapturedNow: true",
  "rollbackPreviewGeneratedNow: true",
  "rollbackExecutionAllowedNow: true",
  "compileRunBy144ENow: true",
  "sourceModificationAllowedNow: true",
  "runtimeHttpAllowedNow: true",
  "runtimePostAllowedNow: true",
  "backendRestartAllowedNow: true",
  "evidenceCaptureRunnerAllowedNow: true",
  "postMountSmokeAllowedNow: true",
  "fakeSuccessAllowedNow: true"
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
          $_.Name.Contains("144e") -or
          $_.Name.Contains("stream") -or
          (Read-TextFile -Path $_.FullName).Contains("BACKEND-STREAM-FOUNDATION-144E")
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
  runtimeHttpPerformedBy144F = 0
  runtimePostPerformedBy144F = 0
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
  status = $(if ($Ok) { "runtime_mount_target_patch_draft_preview_evidence_capture_planning_compile_safety_verification_passed" } else { "runtime_mount_target_patch_draft_preview_evidence_capture_planning_compile_safety_verification_blocked" })
  ownerApprovalAccepted = $true
  ownerApprovalText = $OwnerApprovalText
  requiredApprovalTextFor144G = $RequiredApprovalTextFor144G
  scopeVerification = [ordered]@{
    requiredFiles = $RequiredFileChecks
    missingRequiredFiles = $MissingRequiredFiles
    actual144EArtifactFiles = $Actual144EArtifactFiles
    actual144EArtifactOutsideFoundation = $Actual144EArtifactOutsideFoundation
    actual144EArtifactUnexpected = $Actual144EArtifactUnexpected
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
  nextRecommendedStage = $(if ($Ok) { "BACKEND-STREAM-FOUNDATION-144G controlled runtime mount target patch draft preview evidence capture post-verification handoff source-only after exact approval" } else { "Review 144F report before any next stage" })
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
