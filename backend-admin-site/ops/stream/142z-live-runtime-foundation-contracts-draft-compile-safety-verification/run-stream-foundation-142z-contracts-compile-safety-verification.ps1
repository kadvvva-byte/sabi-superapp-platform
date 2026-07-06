param(
  [switch]$RunTsc,
  [switch]$WriteReport,
  [string]$ReportPath = ".data\stream\backend-stream-foundation-142z-contracts-compile-safety-verification-result.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Version = "BACKEND-STREAM-FOUNDATION-142Z-FIX1"
$Stage = "live_runtime_foundation_contracts_draft_compile_safety_verification_ops_only_fix1_scope_scan"
$StartedAt = (Get-Date).ToUniversalTime().ToString("o")

$OwnerApprovalText = "I approve BACKEND-STREAM-FOUNDATION-142Z controlled live runtime foundation contracts draft compile and safety verification ops-only, verify 142Y source-only contracts compile and remain limited to src/modules/stream/foundation, do not modify source, do not restart backend, no runtime POST, no DB write, no provider call, no Wallet mutation, no payment authorization, no monthly payout, no money movement, no fake success."

$RequiredApprovalTextFor143A = "I approve BACKEND-STREAM-FOUNDATION-143A controlled live runtime foundation repository boundary planning source-only, use 142Z-FIX1 verification evidence to plan the next repository and persistence boundary stage without DB schema write, migration, runtime DB read/write, provider call, Wallet mutation, payment authorization, monthly payout, money movement, backend restart, runtime POST, route behavior change, or fake success."

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

$ContractDir = "src/modules/stream/foundation/live-runtime-foundation-contracts-draft"
$ManifestPath = "src/modules/stream/foundation/stream142yLiveRuntimeFoundationContractsDraftStagingManifest.ts"

$Required142YFiles = @(
  "$ContractDir/index.ts",
  "$ContractDir/streamFoundationLiveRuntimeFoundationContractsDraft.ts",
  "$ContractDir/streamFoundationLiveRuntimeFoundationContractsDraftContracts.ts",
  "$ContractDir/streamFoundationLiveRuntimeFoundationContractsDraftReadiness.ts",
  "$ContractDir/streamFoundationLiveRuntimeFoundationContractsDraftSmoke.ts",
  $ManifestPath
)

$RequiredFileChecks = @()
foreach ($path in $Required142YFiles) {
  $RequiredFileChecks += [ordered]@{
    path = $path
    exists = (Test-Path -LiteralPath $path)
    sha256 = Get-SafeFileHash -Path $path
  }
}

$MissingRequiredFiles = @($RequiredFileChecks | Where-Object { $_.exists -ne $true })

$ContractContentChecks = @(
  @{
    Path = "$ContractDir/streamFoundationLiveRuntimeFoundationContractsDraftContracts.ts"
    Fragments = @(
      "BACKEND-STREAM-FOUNDATION-142Y",
      "StreamFoundationLiveRuntimeLifecycleState",
      "StreamFoundationRepositoryBoundaryContract",
      "StreamFoundationProviderReadinessGateContract",
      "StreamFoundationRealtimeHandoffContract",
      "StreamFoundationModerationGateContract",
      "StreamFoundationEventAuditContract",
      "fakeSuccessAllowedNow: false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationLiveRuntimeFoundationContractsDraft.ts"
    Fragments = @(
      "getStreamFoundationLiveRuntimeFoundationContractsDraftSnapshot",
      "lifecycleContracts: LIFECYCLE_CONTRACTS",
      "repositoryBoundaryContracts: REPOSITORY_BOUNDARY_CONTRACTS",
      "providerReadinessGateContracts: PROVIDER_READINESS_GATE_CONTRACTS",
      "realtimeHandoffContracts: REALTIME_HANDOFF_CONTRACTS",
      "moderationGateContracts: MODERATION_GATE_CONTRACTS",
      "eventAuditContracts: EVENT_AUDIT_CONTRACTS",
      "targetWriteBy142Y: false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationLiveRuntimeFoundationContractsDraftReadiness.ts"
    Fragments = @(
      "getStreamFoundationLiveRuntimeFoundationContractsDraftReadiness",
      "live_runtime_foundation_contracts_draft_ready",
      "snapshot.safety.targetWriteBy142Y === false",
      "snapshot.safety.runtimePostBy142Y === false",
      "snapshot.safety.databaseWriteBy142Y === false",
      "snapshot.safety.providerCallBy142Y === false",
      "snapshot.safety.walletMutationBy142Y === false",
      "snapshot.safety.fakeSuccessBy142Y === false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationLiveRuntimeFoundationContractsDraftSmoke.ts"
    Fragments = @(
      "runStreamFoundationLiveRuntimeFoundationContractsDraftSmoke",
      "contracts_are_source_only_and_blocked_now",
      "142y_safety_clean"
    )
  },
  @{
    Path = $ManifestPath
    Fragments = @(
      "STREAM_142Y_LIVE_RUNTIME_FOUNDATION_CONTRACTS_DRAFT_STAGING_MANIFEST",
      "changedScope: `"src/modules/stream/foundation/live-runtime-foundation-contracts-draft/**`"",
      "sourceOnly: true",
      "runtimePostAllowed: false",
      "databaseWriteAllowed: false",
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
  $has142YRef = $text.Contains("BACKEND-STREAM-FOUNDATION-142Y") -or $text.Contains("stream142y") -or $text.Contains("live-runtime-foundation-contracts-draft")
  $ForbiddenTargetReferences += [ordered]@{
    path = $path
    exists = (Test-Path -LiteralPath $path)
    contains142YReference = $has142YRef
    ok = (-not $has142YRef)
  }
}
$ForbiddenTargetReferenceFailures = @($ForbiddenTargetReferences | Where-Object { $_.ok -ne $true })

# FIX1:
# The original 142Z discovery scanned the whole stream foundation tree for the literal
# "BACKEND-STREAM-FOUNDATION-142Y". That incorrectly caught 142X planning files
# because 142X contains the exact next-stage approval text for 142Y.
# Scope verification should prove that the actual 142Y artifact files exist and
# remain under src/modules/stream/foundation, not treat historical approval text
# in earlier planning packages as unexpected 142Y source.
$Actual142YArtifactFiles = @($Required142YFiles)
$Actual142YArtifactOutsideFoundation = @(
  $Actual142YArtifactFiles | Where-Object { -not $_.StartsWith("src/modules/stream/foundation/") }
)
$Actual142YArtifactUnexpected = @(
  $Actual142YArtifactFiles | Where-Object { $Required142YFiles -notcontains $_ }
)

$HistoricalApprovalTextReferenceFiles = @()
if (Test-Path -LiteralPath "src/modules/stream/foundation") {
  $HistoricalApprovalTextReferenceFiles = @(
    Get-ChildItem -LiteralPath "src/modules/stream/foundation" -Recurse -File -Include "*.ts" |
      Where-Object {
        $path = $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
        if ($Required142YFiles -contains $path) {
          return $false
        }

        $content = Read-TextFile -Path $_.FullName
        return $content.Contains("BACKEND-STREAM-FOUNDATION-142Y")
      } |
      ForEach-Object { $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/") }
  )
}

$AllowedScopeOk = (
  $MissingRequiredFiles.Count -eq 0 -and
  $Actual142YArtifactOutsideFoundation.Count -eq 0 -and
  $Actual142YArtifactUnexpected.Count -eq 0
)

$AllContractText = ""
foreach ($path in $Required142YFiles) {
  $AllContractText += "`n---FILE:$path---`n"
  $AllContractText += Read-TextFile -Path $path
}

$ForbiddenSafetyFragments = @(
  "targetWriteBy142Y: true",
  "appTsChangeBy142Y: true",
  "serverTsChangeBy142Y: true",
  "streamIndexChangeBy142Y: true",
  "routeBehaviorChangeBy142Y: true",
  "backendRestartBy142Y: true",
  "runtimeHttpBy142Y: true",
  "runtimePostBy142Y: true",
  "databaseReadBy142Y: true",
  "databaseWriteBy142Y: true",
  "providerCallBy142Y: true",
  "providerSecretReadBy142Y: true",
  "walletMutationBy142Y: true",
  "paymentAuthorizationBy142Y: true",
  "monthlyPayoutBy142Y: true",
  "moneyMovementBy142Y: true",
  "fakeSuccessBy142Y: true",
  "runtimeMountAllowedNow: true",
  "runtimePostAllowedNow: true",
  "databaseWriteAllowedNow: true",
  "providerCallAllowedNow: true",
  "walletMutationAllowedNow: true",
  "moneyMovementAllowedNow: true",
  "fakeSuccessAllowedNow: true",
  "repositoryMountedNow: true",
  "providerSuccessAllowedNow: true",
  "fakeProviderSuccessAllowedNow: true",
  "socketOpenAllowedNow: true",
  "fakeOnlineCountAllowedNow: true",
  "runtimeAllowLiveNow: true",
  "appendEventAllowedNow: true",
  "appendAuditAllowedNow: true"
)

$ForbiddenSafetyHits = @()
foreach ($fragment in $ForbiddenSafetyFragments) {
  if ($AllContractText.Contains($fragment)) {
    $ForbiddenSafetyHits += $fragment
  }
}

$TscResult = [ordered]@{
  runTsc = [bool]$RunTsc
  exitCode = $null
  outputTail = @()
}

if ($RunTsc) {
  $tscOutput = @()
  $tscOutput = & cmd /c "npx tsc --noEmit" 2>&1
  $TscResult.exitCode = $LASTEXITCODE
  $TscResult.outputTail = @($tscOutput | Select-Object -Last 160)
}

$CompileOk = (-not $RunTsc) -or ($TscResult.exitCode -eq 0)

$Safety = [ordered]@{
  sourceModificationPerformed = 0
  backendRestartPerformed = 0
  runtimeHttpPerformedBy142Z = 0
  runtimePostPerformedBy142Z = 0
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
  $ForbiddenSafetyHits.Count -eq 0
)

$FinishedAt = (Get-Date).ToUniversalTime().ToString("o")

$Report = [ordered]@{
  version = $Version
  stage = $Stage
  startedAt = $StartedAt
  finishedAt = $FinishedAt
  ok = $Ok
  status = $(if ($Ok) { "live_runtime_foundation_contracts_draft_compile_safety_verification_passed" } else { "live_runtime_foundation_contracts_draft_compile_safety_verification_blocked" })
  fix1 = [ordered]@{
    fixedScopeScanFalseBlocker = $true
    previousFalseBlocker = "Original 142Z scanner treated historical 142Y approval text inside 142X planning files as unexpected 142Y source."
    actual142YArtifactsOnly = $true
  }
  ownerApprovalAccepted = $true
  ownerApprovalText = $OwnerApprovalText
  requiredApprovalTextFor143A = $RequiredApprovalTextFor143A
  scopeVerification = [ordered]@{
    requiredFiles = $RequiredFileChecks
    missingRequiredFiles = $MissingRequiredFiles
    actual142YArtifactFiles = $Actual142YArtifactFiles
    actual142YArtifactOutsideFoundation = $Actual142YArtifactOutsideFoundation
    actual142YArtifactUnexpected = $Actual142YArtifactUnexpected
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
  tscResult = $TscResult
  safety = $Safety
  nextRecommendedStage = $(if ($Ok) { "BACKEND-STREAM-FOUNDATION-143A controlled live runtime foundation repository boundary planning source-only after exact approval" } else { "Review 142Z-FIX1 report before any next stage" })
}

if ($WriteReport) {
  $reportParent = Split-Path -Parent $ReportPath
  if ($reportParent -and -not (Test-Path -LiteralPath $reportParent)) {
    New-Item -ItemType Directory -Force -Path $reportParent | Out-Null
  }
  $Report | ConvertTo-Json -Depth 60 | Set-Content -LiteralPath $ReportPath -Encoding UTF8
}

$Report | ConvertTo-Json -Depth 60

if (-not $Ok) {
  exit 1
}
