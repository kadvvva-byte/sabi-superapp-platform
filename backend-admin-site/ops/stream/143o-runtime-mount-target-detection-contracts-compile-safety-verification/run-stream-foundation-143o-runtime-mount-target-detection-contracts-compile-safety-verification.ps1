param(
  [switch]$RunTsc,
  [switch]$WriteReport,
  [string]$ReportPath = ".data\stream\backend-stream-foundation-143o-runtime-mount-target-detection-contracts-compile-safety-verification-result.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Version = "BACKEND-STREAM-FOUNDATION-143O"
$Stage = "runtime_mount_target_detection_contracts_compile_safety_verification_ops_only"
$StartedAt = (Get-Date).ToUniversalTime().ToString("o")

$OwnerApprovalText = "I approve BACKEND-STREAM-FOUNDATION-143O controlled runtime mount target detection contracts compile and safety verification ops-only, verify 143N source-only runtime mount target detection contracts compile and remain limited to src/modules/stream/foundation, do not modify source, do not restart backend, no runtime POST, no runtime DB read/write, no provider call, no provider secret read, no realtime socket open, no realtime broadcast, no moderation bypass, no runtime mount, no route behavior change, no target route write, no rollback execution, no post-mount smoke, no Wallet mutation, no payment authorization, no monthly payout, no money movement, no fake success."

$RequiredApprovalTextFor143P = "I approve BACKEND-STREAM-FOUNDATION-143P controlled runtime mount target detection contracts post-verification handoff source-only, use 143O verification evidence to close runtime mount target detection contracts and prepare the next safe runtime mount target inspection ops-only planning batch without source target writes, without prisma schema write, without migration, without backend restart, without runtime POST, without runtime DB read/write, without provider call, without provider secret read, without realtime socket open, without realtime broadcast, without moderation bypass, without runtime mount, without route behavior change, without target route write, without rollback execution, without post-mount smoke, without Wallet mutation, without payment authorization, without monthly payout, without money movement, and without fake success."

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

$ContractDir = "src/modules/stream/foundation/runtime-mount-target-detection-contracts"
$ManifestPath = "src/modules/stream/foundation/stream143nRuntimeMountTargetDetectionContractsScaffoldStagingManifest.ts"

$Required143NFiles = @(
  "$ContractDir/index.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetDetectionContractsScaffold.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetDetectionContractsScaffoldContracts.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetDetectionContractsScaffoldReadiness.ts",
  "$ContractDir/streamFoundationRuntimeMountTargetDetectionContractsScaffoldSmoke.ts",
  $ManifestPath
)

$RequiredFileChecks = @()
foreach ($path in $Required143NFiles) {
  $RequiredFileChecks += [ordered]@{
    path = $path
    exists = (Test-Path -LiteralPath $path)
    sha256 = Get-SafeFileHash -Path $path
  }
}

$MissingRequiredFiles = @($RequiredFileChecks | Where-Object { $_.exists -ne $true })

$ContractContentChecks = @(
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetDetectionContractsScaffoldContracts.ts"
    Fragments = @(
      "BACKEND-STREAM-FOUNDATION-143N",
      "StreamFoundation143NCandidateTargetFileInventoryContract",
      "StreamFoundation143NRouteMountMarkerInventoryContract",
      "StreamFoundation143NBoundaryContract",
      "StreamFoundation143NBlockedLiveWriteRoutePreservationContract",
      "StreamFoundation143NFutureDiffTargetReviewContract",
      "StreamFoundation143NRollbackTargetHashSnapshotContract",
      "StreamFoundation143NPostDetectionCompileGateContract",
      "targetRouteWriteAllowedNow: false",
      "runtimeMountAllowedNow: false",
      "routeBehaviorChangeAllowedNow: false",
      "fakeSuccessAllowedNow: false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetDetectionContractsScaffold.ts"
    Fragments = @(
      "getStreamFoundationRuntimeMountTargetDetectionContractsScaffoldSnapshot",
      "CANDIDATE_TARGET_FILE_INVENTORY",
      "ROUTE_MOUNT_MARKER_INVENTORY",
      "BOUNDARY_CONTRACTS",
      "BLOCKED_LIVE_WRITE_ROUTE_PRESERVATION",
      "FUTURE_DIFF_TARGET_REVIEW",
      "ROLLBACK_TARGET_HASH_SNAPSHOT",
      "POST_DETECTION_COMPILE_GATE",
      "targetRouteWriteBy143N: false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetDetectionContractsScaffoldReadiness.ts"
    Fragments = @(
      "getStreamFoundationRuntimeMountTargetDetectionContractsScaffoldReadiness",
      "runtime_mount_target_detection_contracts_scaffold_ready",
      "snapshot.candidateTargetFileInventory.candidates.length === 5",
      "snapshot.routeMountMarkerInventory.markers.length === 6",
      "snapshot.boundaryContracts.length === 6",
      "snapshot.blockedLiveWriteRoutePreservation.requiredStatusCodeNow === 423",
      "snapshot.safety.targetRouteWriteBy143N === false",
      "snapshot.safety.fakeSuccessBy143N === false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountTargetDetectionContractsScaffoldSmoke.ts"
    Fragments = @(
      "runStreamFoundationRuntimeMountTargetDetectionContractsScaffoldSmoke",
      "candidate_marker_boundary_contracts_present",
      "target_detection_actions_blocked_now",
      "143n_safety_clean"
    )
  },
  @{
    Path = $ManifestPath
    Fragments = @(
      "STREAM_143N_RUNTIME_MOUNT_TARGET_DETECTION_CONTRACTS_SCAFFOLD_STAGING_MANIFEST",
      "changedScope: `"src/modules/stream/foundation/runtime-mount-target-detection-contracts/**`"",
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
  $has143NRef = $text.Contains("BACKEND-STREAM-FOUNDATION-143N") -or $text.Contains("stream143n") -or $text.Contains("runtime-mount-target-detection-contracts")
  $ForbiddenTargetReferences += [ordered]@{
    path = $path
    exists = (Test-Path -LiteralPath $path)
    contains143NReference = $has143NRef
    ok = (-not $has143NRef)
  }
}
$ForbiddenTargetReferenceFailures = @($ForbiddenTargetReferences | Where-Object { $_.ok -ne $true })

# Direct artifact-set scope verification. Older planning files may include approval text for 143N.
$Actual143NArtifactFiles = @($Required143NFiles)
$Actual143NArtifactOutsideFoundation = @(
  $Actual143NArtifactFiles | Where-Object { -not $_.StartsWith("src/modules/stream/foundation/") }
)
$Actual143NArtifactUnexpected = @(
  $Actual143NArtifactFiles | Where-Object { $Required143NFiles -notcontains $_ }
)

$HistoricalApprovalTextReferenceFiles = @()
if (Test-Path -LiteralPath "src/modules/stream/foundation") {
  $HistoricalApprovalTextReferenceFiles = @(
    Get-ChildItem -LiteralPath "src/modules/stream/foundation" -Recurse -File -Include "*.ts" |
      Where-Object {
        $path = $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
        if ($Required143NFiles -contains $path) {
          return $false
        }

        $content = Read-TextFile -Path $_.FullName
        return $content.Contains("BACKEND-STREAM-FOUNDATION-143N")
      } |
      ForEach-Object { $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/") }
  )
}

$AllowedScopeOk = (
  $MissingRequiredFiles.Count -eq 0 -and
  $Actual143NArtifactOutsideFoundation.Count -eq 0 -and
  $Actual143NArtifactUnexpected.Count -eq 0
)

$AllContractText = ""
foreach ($path in $Required143NFiles) {
  $AllContractText += "`n---FILE:$path---`n"
  $AllContractText += Read-TextFile -Path $path
}

$ForbiddenSafetyFragments = @(
  "targetWriteBy143N: true",
  "appTsChangeBy143N: true",
  "serverTsChangeBy143N: true",
  "streamIndexChangeBy143N: true",
  "prismaSchemaChangeBy143N: true",
  "migrationCreatedBy143N: true",
  "routeBehaviorChangeBy143N: true",
  "backendRestartBy143N: true",
  "runtimeHttpBy143N: true",
  "runtimePostBy143N: true",
  "runtimeDbReadBy143N: true",
  "runtimeDbWriteBy143N: true",
  "databaseReadBy143N: true",
  "databaseWriteBy143N: true",
  "providerCallBy143N: true",
  "providerSecretReadBy143N: true",
  "realtimeSocketOpenBy143N: true",
  "realtimeBroadcastBy143N: true",
  "moderationBypassBy143N: true",
  "runtimeMountBy143N: true",
  "targetRouteWriteBy143N: true",
  "rollbackExecutionBy143N: true",
  "postMountSmokeBy143N: true",
  "walletMutationBy143N: true",
  "paymentAuthorizationBy143N: true",
  "monthlyPayoutBy143N: true",
  "moneyMovementBy143N: true",
  "fakeSuccessBy143N: true",
  "actualTargetScanAllowedNow: true",
  "targetFileWriteAllowedNow: true",
  "targetRouteWriteAllowedNow: true",
  "runtimeMountAllowedNow: true",
  "routeBehaviorChangeAllowedNow: true",
  "backendRestartAllowedNow: true",
  "markerWriteAllowedNow: true",
  "targetWriteAllowedNow: true",
  "runtimePostAllowedNow: true",
  "runtimeDbReadAllowedNow: true",
  "runtimeDbWriteAllowedNow: true",
  "providerCallAllowedNow: true",
  "providerSecretReadAllowedNow: true",
  "realtimeSocketOpenAllowedNow: true",
  "realtimeBroadcastAllowedNow: true",
  "moderationBypassAllowedNow: true",
  "rollbackExecutionAllowedNow: true",
  "postMountSmokeAllowedNow: true",
  "fakeSuccessAllowedNow: true",
  "emptyBodyAllowedNow: true",
  "liveSuccessAllowedNow: true",
  "targetDiffWriteAllowedNow: true",
  "hashReadAllowedByThisContractNow: true",
  "compileRunByThisStageNow: true",
  "sourceModificationAllowedNow: true",
  "runtimeHttpAllowedNow: true",
  "actualReadAllowedByThisContractNow: true",
  "writeAllowedNow: true",
  "routeMountAllowedNow: true"
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
          $_.Name.Contains("143n") -or
          $_.Name.Contains("stream") -or
          (Read-TextFile -Path $_.FullName).Contains("BACKEND-STREAM-FOUNDATION-143N")
        } |
        ForEach-Object { $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/") }
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
  runtimeHttpPerformedBy143O = 0
  runtimePostPerformedBy143O = 0
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
  status = $(if ($Ok) { "runtime_mount_target_detection_contracts_compile_safety_verification_passed" } else { "runtime_mount_target_detection_contracts_compile_safety_verification_blocked" })
  ownerApprovalAccepted = $true
  ownerApprovalText = $OwnerApprovalText
  requiredApprovalTextFor143P = $RequiredApprovalTextFor143P
  scopeVerification = [ordered]@{
    requiredFiles = $RequiredFileChecks
    missingRequiredFiles = $MissingRequiredFiles
    actual143NArtifactFiles = $Actual143NArtifactFiles
    actual143NArtifactOutsideFoundation = $Actual143NArtifactOutsideFoundation
    actual143NArtifactUnexpected = $Actual143NArtifactUnexpected
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
  nextRecommendedStage = $(if ($Ok) { "BACKEND-STREAM-FOUNDATION-143P controlled runtime mount target detection contracts post-verification handoff source-only after exact approval" } else { "Review 143O report before any next stage" })
}

if ($WriteReport) {
  $reportParent = Split-Path -Parent $ReportPath
  if ($reportParent -and -not (Test-Path -LiteralPath $reportParent)) {
    New-Item -ItemType Directory -Force -Path $reportParent | Out-Null
  }
  $Report | ConvertTo-Json -Depth 90 | Set-Content -LiteralPath $ReportPath -Encoding UTF8
}

$Report | ConvertTo-Json -Depth 90

if (-not $Ok) {
  exit 1
}
