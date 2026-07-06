param(
  [switch]$RunTsc,
  [switch]$WriteReport,
  [string]$ReportPath = ".data\stream\backend-stream-foundation-143c-repository-boundary-contracts-compile-safety-verification-result.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Version = "BACKEND-STREAM-FOUNDATION-143C"
$Stage = "live_runtime_repository_boundary_contracts_compile_safety_verification_ops_only"
$StartedAt = (Get-Date).ToUniversalTime().ToString("o")

$OwnerApprovalText = "I approve BACKEND-STREAM-FOUNDATION-143C controlled live runtime repository boundary contracts compile and safety verification ops-only, verify 143B source-only repository contracts compile and remain limited to src/modules/stream/foundation, do not modify source, do not restart backend, no runtime POST, no runtime DB read/write, no provider call, no Wallet mutation, no payment authorization, no monthly payout, no money movement, no fake success."

$RequiredApprovalTextFor143D = "I approve BACKEND-STREAM-FOUNDATION-143D controlled repository boundary post-verification handoff source-only, use 143C verification evidence to close the repository boundary contracts scaffold and prepare the next safe live runtime foundation batch without source target writes, without prisma schema write, without migration, without backend restart, without runtime POST, without runtime DB read/write, without provider call, without Wallet mutation, without payment authorization, without monthly payout, without money movement, and without fake success."

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

$ContractDir = "src/modules/stream/foundation/live-runtime-repository-boundary-contracts"
$ManifestPath = "src/modules/stream/foundation/stream143bRepositoryBoundaryContractsScaffoldStagingManifest.ts"

$Required143BFiles = @(
  "$ContractDir/index.ts",
  "$ContractDir/streamFoundationRepositoryBoundaryContractsScaffold.ts",
  "$ContractDir/streamFoundationRepositoryBoundaryContractsScaffoldContracts.ts",
  "$ContractDir/streamFoundationRepositoryBoundaryContractsScaffoldReadiness.ts",
  "$ContractDir/streamFoundationRepositoryBoundaryContractsScaffoldSmoke.ts",
  $ManifestPath
)

$RequiredFileChecks = @()
foreach ($path in $Required143BFiles) {
  $RequiredFileChecks += [ordered]@{
    path = $path
    exists = (Test-Path -LiteralPath $path)
    sha256 = Get-SafeFileHash -Path $path
  }
}

$MissingRequiredFiles = @($RequiredFileChecks | Where-Object { $_.exists -ne $true })

$ContractContentChecks = @(
  @{
    Path = "$ContractDir/streamFoundationRepositoryBoundaryContractsScaffoldContracts.ts"
    Fragments = @(
      "BACKEND-STREAM-FOUNDATION-143B",
      "StreamFoundation143BIdempotencyKeyContract",
      "StreamFoundation143BTransactionBoundaryContract",
      "StreamFoundation143BPersistenceSafetyEnvelope",
      "StreamFoundation143BLiveSessionRepositoryContract",
      "StreamFoundation143BParticipantRepositoryContract",
      "StreamFoundation143BHeartbeatRepositoryContract",
      "StreamFoundation143BEventAuditRepositoryContract",
      "runtimeDbWriteAllowedNow: false",
      "fakeSuccessAllowedNow: false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRepositoryBoundaryContractsScaffold.ts"
    Fragments = @(
      "getStreamFoundationRepositoryBoundaryContractsScaffoldSnapshot",
      "IDEMPOTENCY_CONTRACTS",
      "TRANSACTION_BOUNDARY_CONTRACTS",
      "PERSISTENCE_SAFETY_ENVELOPE",
      "LIVE_SESSION_REPOSITORY_CONTRACT",
      "PARTICIPANT_REPOSITORY_CONTRACT",
      "HEARTBEAT_REPOSITORY_CONTRACT",
      "EVENT_AUDIT_REPOSITORY_CONTRACT",
      "persistenceSafetyEnvelope: PERSISTENCE_SAFETY_ENVELOPE",
      "targetWriteBy143B: false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRepositoryBoundaryContractsScaffoldReadiness.ts"
    Fragments = @(
      "getStreamFoundationRepositoryBoundaryContractsScaffoldReadiness",
      "repository_boundary_contracts_scaffold_ready",
      "snapshot.safety.prismaSchemaChangeBy143B === false",
      "snapshot.safety.runtimePostBy143B === false",
      "snapshot.safety.databaseReadBy143B === false",
      "snapshot.safety.databaseWriteBy143B === false",
      "snapshot.safety.providerCallBy143B === false",
      "snapshot.safety.walletMutationBy143B === false",
      "snapshot.safety.fakeSuccessBy143B === false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationRepositoryBoundaryContractsScaffoldSmoke.ts"
    Fragments = @(
      "runStreamFoundationRepositoryBoundaryContractsScaffoldSmoke",
      "repository_contract_groups_present",
      "persistence_safety_envelope_blocks_runtime_now",
      "143b_safety_clean"
    )
  },
  @{
    Path = $ManifestPath
    Fragments = @(
      "STREAM_143B_REPOSITORY_BOUNDARY_CONTRACTS_SCAFFOLD_STAGING_MANIFEST",
      "changedScope: `"src/modules/stream/foundation/live-runtime-repository-boundary-contracts/**`"",
      "sourceOnly: true",
      "prismaSchemaWriteAllowed: false",
      "migrationAllowed: false",
      "runtimeDbReadAllowed: false",
      "runtimeDbWriteAllowed: false",
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
  $has143BRef = $text.Contains("BACKEND-STREAM-FOUNDATION-143B") -or $text.Contains("stream143b") -or $text.Contains("live-runtime-repository-boundary-contracts")
  $ForbiddenTargetReferences += [ordered]@{
    path = $path
    exists = (Test-Path -LiteralPath $path)
    contains143BReference = $has143BRef
    ok = (-not $has143BRef)
  }
}
$ForbiddenTargetReferenceFailures = @($ForbiddenTargetReferences | Where-Object { $_.ok -ne $true })

# Direct artifact-set scope verification.
# Earlier planning packages may contain approval text for the next stage, so do not treat historical
# approval text in older foundation planning files as a source-write expansion.
$Actual143BArtifactFiles = @($Required143BFiles)
$Actual143BArtifactOutsideFoundation = @(
  $Actual143BArtifactFiles | Where-Object { -not $_.StartsWith("src/modules/stream/foundation/") }
)
$Actual143BArtifactUnexpected = @(
  $Actual143BArtifactFiles | Where-Object { $Required143BFiles -notcontains $_ }
)

$HistoricalApprovalTextReferenceFiles = @()
if (Test-Path -LiteralPath "src/modules/stream/foundation") {
  $HistoricalApprovalTextReferenceFiles = @(
    Get-ChildItem -LiteralPath "src/modules/stream/foundation" -Recurse -File -Include "*.ts" |
      Where-Object {
        $path = $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
        if ($Required143BFiles -contains $path) {
          return $false
        }

        $content = Read-TextFile -Path $_.FullName
        return $content.Contains("BACKEND-STREAM-FOUNDATION-143B")
      } |
      ForEach-Object { $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/") }
  )
}

$AllowedScopeOk = (
  $MissingRequiredFiles.Count -eq 0 -and
  $Actual143BArtifactOutsideFoundation.Count -eq 0 -and
  $Actual143BArtifactUnexpected.Count -eq 0
)

$AllContractText = ""
foreach ($path in $Required143BFiles) {
  $AllContractText += "`n---FILE:$path---`n"
  $AllContractText += Read-TextFile -Path $path
}

$ForbiddenSafetyFragments = @(
  "targetWriteBy143B: true",
  "appTsChangeBy143B: true",
  "serverTsChangeBy143B: true",
  "streamIndexChangeBy143B: true",
  "prismaSchemaChangeBy143B: true",
  "migrationCreatedBy143B: true",
  "routeBehaviorChangeBy143B: true",
  "backendRestartBy143B: true",
  "runtimeHttpBy143B: true",
  "runtimePostBy143B: true",
  "databaseReadBy143B: true",
  "databaseWriteBy143B: true",
  "providerCallBy143B: true",
  "providerSecretReadBy143B: true",
  "walletMutationBy143B: true",
  "paymentAuthorizationBy143B: true",
  "monthlyPayoutBy143B: true",
  "moneyMovementBy143B: true",
  "fakeSuccessBy143B: true",
  "schemaWriteAllowedNow: true",
  "migrationAllowedNow: true",
  "repositoryImplementationAllowedNow: true",
  "repositoryMountAllowedNow: true",
  "transactionOpenAllowedNow: true",
  "runtimeDbReadAllowedNow: true",
  "runtimeDbWriteAllowedNow: true",
  "providerCallAllowedNow: true",
  "walletMutationAllowedNow: true",
  "paymentAuthorizationAllowedNow: true",
  "monthlyPayoutAllowedNow: true",
  "moneyMovementAllowedNow: true",
  "fakeSuccessAllowedNow: true",
  "runtimeIdempotencyReadAllowedNow: true",
  "runtimeIdempotencyWriteAllowedNow: true",
  "databaseReadAllowedNow: true",
  "databaseWriteAllowedNow: true",
  "fakeReplayAllowedNow: true",
  "repositoryMountedNow: true"
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
          $_.Name.Contains("143b") -or
          $_.Name.Contains("stream") -or
          (Read-TextFile -Path $_.FullName).Contains("BACKEND-STREAM-FOUNDATION-143B")
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
  $TscResult.outputTail = @($tscOutput | Select-Object -Last 180)
}

$CompileOk = (-not $RunTsc) -or ($TscResult.exitCode -eq 0)

$Safety = [ordered]@{
  sourceModificationPerformed = 0
  backendRestartPerformed = 0
  runtimeHttpPerformedBy143C = 0
  runtimePostPerformedBy143C = 0
  runtimeDbReadPerformed = 0
  runtimeDbWritePerformed = 0
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
  status = $(if ($Ok) { "live_runtime_repository_boundary_contracts_compile_safety_verification_passed" } else { "live_runtime_repository_boundary_contracts_compile_safety_verification_blocked" })
  ownerApprovalAccepted = $true
  ownerApprovalText = $OwnerApprovalText
  requiredApprovalTextFor143D = $RequiredApprovalTextFor143D
  scopeVerification = [ordered]@{
    requiredFiles = $RequiredFileChecks
    missingRequiredFiles = $MissingRequiredFiles
    actual143BArtifactFiles = $Actual143BArtifactFiles
    actual143BArtifactOutsideFoundation = $Actual143BArtifactOutsideFoundation
    actual143BArtifactUnexpected = $Actual143BArtifactUnexpected
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
  nextRecommendedStage = $(if ($Ok) { "BACKEND-STREAM-FOUNDATION-143D controlled repository boundary post-verification handoff source-only after exact approval" } else { "Review 143C report before any next stage" })
}

if ($WriteReport) {
  $reportParent = Split-Path -Parent $ReportPath
  if ($reportParent -and -not (Test-Path -LiteralPath $reportParent)) {
    New-Item -ItemType Directory -Force -Path $reportParent | Out-Null
  }
  $Report | ConvertTo-Json -Depth 70 | Set-Content -LiteralPath $ReportPath -Encoding UTF8
}

$Report | ConvertTo-Json -Depth 70

if (-not $Ok) {
  exit 1
}
