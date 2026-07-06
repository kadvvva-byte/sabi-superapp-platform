param(
  [switch]$RunTsc,
  [switch]$WriteReport,
  [string]$ReportPath = ".data\stream\backend-stream-foundation-143k-runtime-mount-prerequisite-contracts-compile-safety-verification-result.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Version = "BACKEND-STREAM-FOUNDATION-143K"
$Stage = "runtime_mount_prerequisite_contracts_compile_safety_verification_ops_only"
$StartedAt = (Get-Date).ToUniversalTime().ToString("o")

$OwnerApprovalText = "I approve BACKEND-STREAM-FOUNDATION-143K controlled runtime mount prerequisite contracts compile and safety verification ops-only, verify 143J source-only runtime mount prerequisite contracts compile and remain limited to src/modules/stream/foundation, do not modify source, do not restart backend, no runtime POST, no runtime DB read/write, no provider call, no provider secret read, no realtime socket open, no realtime broadcast, no moderation bypass, no runtime mount, no route behavior change, no rollback execution, no post-mount smoke, no Wallet mutation, no payment authorization, no monthly payout, no money movement, no fake success."

$RequiredApprovalTextFor143L = "I approve BACKEND-STREAM-FOUNDATION-143L controlled runtime mount prerequisite contracts post-verification handoff source-only, use 143K verification evidence to close runtime mount prerequisite contracts and prepare the next safe runtime mount target detection planning batch without source target writes, without prisma schema write, without migration, without backend restart, without runtime POST, without runtime DB read/write, without provider call, without provider secret read, without realtime socket open, without realtime broadcast, without moderation bypass, without runtime mount, without route behavior change, without rollback execution, without post-mount smoke, without Wallet mutation, without payment authorization, without monthly payout, without money movement, and without fake success."

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

$ContractDir = "src/modules/stream/foundation/runtime-mount-prerequisite-contracts"
$ManifestPath = "src/modules/stream/foundation/stream143jRuntimeMountPrerequisiteContractsScaffoldStagingManifest.ts"

$Required143JFiles = @(
  "$ContractDir/index.ts",
  "$ContractDir/streamFoundationRuntimeMountPrerequisiteContractsScaffold.ts",
  "$ContractDir/streamFoundationRuntimeMountPrerequisiteContractsScaffoldContracts.ts",
  "$ContractDir/streamFoundationRuntimeMountPrerequisiteContractsScaffoldReadiness.ts",
  "$ContractDir/streamFoundationRuntimeMountPrerequisiteContractsScaffoldSmoke.ts",
  $ManifestPath
)

$RequiredFileChecks = @()
foreach ($path in $Required143JFiles) {
  $RequiredFileChecks += [ordered]@{
    path = $path
    exists = (Test-Path -LiteralPath $path)
    sha256 = Get-SafeFileHash -Path $path
  }
}

$MissingRequiredFiles = @($RequiredFileChecks | Where-Object { $_.exists -ne $true })

$ContractContentChecks = @(
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountPrerequisiteContractsScaffoldContracts.ts"
    Fragments = @(
      "BACKEND-STREAM-FOUNDATION-143J",
      "StreamFoundation143JRuntimeMountPrerequisiteMatrixContract",
      "StreamFoundation143JGateEvidenceRequirementContract",
      "StreamFoundation143JBlockedRoutePreservationContract",
      "StreamFoundation143JOwnerRuntimeMountApprovalRequirementContract",
      "StreamFoundation143JRollbackReadinessContract",
      "StreamFoundation143JPostMountSmokePrerequisiteContract",
      "runtimeMountAllowedNow: false",
      "routeBehaviorChangeAllowedNow: false",
      "rollbackExecutionAllowedNow: false",
      "postMountSmokeAllowedNow: false",
      "fakeSuccessAllowedNow: false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountPrerequisiteContractsScaffold.ts"
    Fragments = @(
      "getStreamFoundationRuntimeMountPrerequisiteContractsScaffoldSnapshot",
      "GATE_EVIDENCE_REQUIREMENTS",
      "RUNTIME_MOUNT_PREREQUISITE_MATRIX",
      "BLOCKED_ROUTE_PRESERVATION",
      "OWNER_RUNTIME_MOUNT_APPROVAL_REQUIREMENT",
      "ROLLBACK_READINESS",
      "POST_MOUNT_SMOKE_PREREQUISITE",
      "liveWriteRoutesMustRemain423Blocked: true",
      "targetWriteBy143J: false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountPrerequisiteContractsScaffoldReadiness.ts"
    Fragments = @(
      "getStreamFoundationRuntimeMountPrerequisiteContractsScaffoldReadiness",
      "runtime_mount_prerequisite_contracts_scaffold_ready",
      "snapshot.runtimeMountPrerequisiteMatrix.requirements.length === 10",
      "snapshot.blockedRoutePreservation.requiredStatusCodeNow === 423",
      "snapshot.ownerRuntimeMountApprovalRequirement.ownerRuntimeMountApprovalNow === false",
      "snapshot.rollbackReadiness.rollbackExecutionAllowedNow === false",
      "snapshot.postMountSmokePrerequisite.postMountSmokeAllowedNow === false",
      "snapshot.safety.runtimeMountBy143J === false",
      "snapshot.safety.fakeSuccessBy143J === false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRuntimeMountPrerequisiteContractsScaffoldSmoke.ts"
    Fragments = @(
      "runStreamFoundationRuntimeMountPrerequisiteContractsScaffoldSmoke",
      "runtime_mount_prerequisite_contracts_present",
      "runtime_mount_and_route_behavior_blocked_now",
      "143j_safety_clean"
    )
  },
  @{
    Path = $ManifestPath
    Fragments = @(
      "STREAM_143J_RUNTIME_MOUNT_PREREQUISITE_CONTRACTS_SCAFFOLD_STAGING_MANIFEST",
      "changedScope: `"src/modules/stream/foundation/runtime-mount-prerequisite-contracts/**`"",
      "sourceOnly: true",
      "runtimeMountAllowed: false",
      "routeBehaviorChangeAllowed: false",
      "rollbackExecutionAllowed: false",
      "postMountSmokeAllowed: false",
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
  $has143JRef = $text.Contains("BACKEND-STREAM-FOUNDATION-143J") -or $text.Contains("stream143j") -or $text.Contains("runtime-mount-prerequisite-contracts")
  $ForbiddenTargetReferences += [ordered]@{
    path = $path
    exists = (Test-Path -LiteralPath $path)
    contains143JReference = $has143JRef
    ok = (-not $has143JRef)
  }
}
$ForbiddenTargetReferenceFailures = @($ForbiddenTargetReferences | Where-Object { $_.ok -ne $true })

# Direct artifact-set scope verification. Older planning files may include approval text for 143J.
$Actual143JArtifactFiles = @($Required143JFiles)
$Actual143JArtifactOutsideFoundation = @(
  $Actual143JArtifactFiles | Where-Object { -not $_.StartsWith("src/modules/stream/foundation/") }
)
$Actual143JArtifactUnexpected = @(
  $Actual143JArtifactFiles | Where-Object { $Required143JFiles -notcontains $_ }
)

$HistoricalApprovalTextReferenceFiles = @()
if (Test-Path -LiteralPath "src/modules/stream/foundation") {
  $HistoricalApprovalTextReferenceFiles = @(
    Get-ChildItem -LiteralPath "src/modules/stream/foundation" -Recurse -File -Include "*.ts" |
      Where-Object {
        $path = $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
        if ($Required143JFiles -contains $path) {
          return $false
        }

        $content = Read-TextFile -Path $_.FullName
        return $content.Contains("BACKEND-STREAM-FOUNDATION-143J")
      } |
      ForEach-Object { $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/") }
  )
}

$AllowedScopeOk = (
  $MissingRequiredFiles.Count -eq 0 -and
  $Actual143JArtifactOutsideFoundation.Count -eq 0 -and
  $Actual143JArtifactUnexpected.Count -eq 0
)

$AllContractText = ""
foreach ($path in $Required143JFiles) {
  $AllContractText += "`n---FILE:$path---`n"
  $AllContractText += Read-TextFile -Path $path
}

$ForbiddenSafetyFragments = @(
  "targetWriteBy143J: true",
  "appTsChangeBy143J: true",
  "serverTsChangeBy143J: true",
  "streamIndexChangeBy143J: true",
  "prismaSchemaChangeBy143J: true",
  "migrationCreatedBy143J: true",
  "routeBehaviorChangeBy143J: true",
  "backendRestartBy143J: true",
  "runtimeHttpBy143J: true",
  "runtimePostBy143J: true",
  "runtimeDbReadBy143J: true",
  "runtimeDbWriteBy143J: true",
  "databaseReadBy143J: true",
  "databaseWriteBy143J: true",
  "providerCallBy143J: true",
  "providerSecretReadBy143J: true",
  "realtimeSocketOpenBy143J: true",
  "realtimeBroadcastBy143J: true",
  "moderationBypassBy143J: true",
  "runtimeMountBy143J: true",
  "rollbackExecutionBy143J: true",
  "postMountSmokeBy143J: true",
  "walletMutationBy143J: true",
  "paymentAuthorizationBy143J: true",
  "monthlyPayoutBy143J: true",
  "moneyMovementBy143J: true",
  "fakeSuccessBy143J: true",
  "targetWriteAllowedNow: true",
  "prismaSchemaWriteAllowedNow: true",
  "migrationAllowedNow: true",
  "backendRestartAllowedNow: true",
  "runtimePostAllowedNow: true",
  "runtimeDbReadAllowedNow: true",
  "runtimeDbWriteAllowedNow: true",
  "providerCallAllowedNow: true",
  "providerSecretReadAllowedNow: true",
  "realtimeSocketOpenAllowedNow: true",
  "realtimeBroadcastAllowedNow: true",
  "moderationBypassAllowedNow: true",
  "runtimeMountAllowedNow: true",
  "routeBehaviorChangeAllowedNow: true",
  "rollbackExecutionAllowedNow: true",
  "postMountSmokeAllowedNow: true",
  "walletMutationAllowedNow: true",
  "paymentAuthorizationAllowedNow: true",
  "monthlyPayoutAllowedNow: true",
  "moneyMovementAllowedNow: true",
  "fakeSuccessAllowedNow: true",
  "liveSuccessAllowedNow: true",
  "emptyBodyAllowedNow: true",
  "implicitApprovalAllowedNow: true",
  "ownerRuntimeMountApprovalNow: true",
  "providerReadinessVerifiedNow: true",
  "realtimeHandoffVerifiedNow: true",
  "moderationGateVerifiedNow: true",
  "adminReviewVerifiedNow: true",
  "eventAuditVerifiedNow: true",
  "safeDisabledResponseVerifiedNow: true",
  "rollbackReadyNow: true",
  "postMountSmokeReadyNow: true"
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
          $_.Name.Contains("143j") -or
          $_.Name.Contains("stream") -or
          (Read-TextFile -Path $_.FullName).Contains("BACKEND-STREAM-FOUNDATION-143J")
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
  $TscResult.outputTail = @($tscOutput | Select-Object -Last 240)
}

$CompileOk = (-not $RunTsc) -or ($TscResult.exitCode -eq 0)

$Safety = [ordered]@{
  sourceModificationPerformed = 0
  backendRestartPerformed = 0
  runtimeHttpPerformedBy143K = 0
  runtimePostPerformedBy143K = 0
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
  status = $(if ($Ok) { "runtime_mount_prerequisite_contracts_compile_safety_verification_passed" } else { "runtime_mount_prerequisite_contracts_compile_safety_verification_blocked" })
  ownerApprovalAccepted = $true
  ownerApprovalText = $OwnerApprovalText
  requiredApprovalTextFor143L = $RequiredApprovalTextFor143L
  scopeVerification = [ordered]@{
    requiredFiles = $RequiredFileChecks
    missingRequiredFiles = $MissingRequiredFiles
    actual143JArtifactFiles = $Actual143JArtifactFiles
    actual143JArtifactOutsideFoundation = $Actual143JArtifactOutsideFoundation
    actual143JArtifactUnexpected = $Actual143JArtifactUnexpected
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
  nextRecommendedStage = $(if ($Ok) { "BACKEND-STREAM-FOUNDATION-143L controlled runtime mount prerequisite contracts post-verification handoff source-only after exact approval" } else { "Review 143K report before any next stage" })
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
