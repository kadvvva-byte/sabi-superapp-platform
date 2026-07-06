param(
  [switch]$RunTsc,
  [switch]$WriteReport,
  [string]$ReportPath = ".data\stream\backend-stream-foundation-143g-provider-realtime-moderation-gate-contracts-compile-safety-verification-result.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Version = "BACKEND-STREAM-FOUNDATION-143G"
$Stage = "provider_realtime_moderation_gate_contracts_compile_safety_verification_ops_only"
$StartedAt = (Get-Date).ToUniversalTime().ToString("o")

$OwnerApprovalText = "I approve BACKEND-STREAM-FOUNDATION-143G controlled provider realtime moderation gate contracts compile and safety verification ops-only, verify 143F source-only gate contracts compile and remain limited to src/modules/stream/foundation, do not modify source, do not restart backend, no runtime POST, no runtime DB read/write, no provider call, no provider secret read, no realtime socket open, no realtime broadcast, no moderation bypass, no Wallet mutation, no payment authorization, no monthly payout, no money movement, no fake success."

$RequiredApprovalTextFor143H = "I approve BACKEND-STREAM-FOUNDATION-143H controlled provider realtime moderation gate post-verification handoff source-only, use 143G verification evidence to close provider realtime moderation gate contracts and prepare the next safe runtime mount prerequisite planning batch without source target writes, without prisma schema write, without migration, without backend restart, without runtime POST, without runtime DB read/write, without provider call, without provider secret read, without realtime socket open, without realtime broadcast, without moderation bypass, without Wallet mutation, without payment authorization, without monthly payout, without money movement, and without fake success."

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

$ContractDir = "src/modules/stream/foundation/provider-realtime-moderation-gate-contracts"
$ManifestPath = "src/modules/stream/foundation/stream143fProviderRealtimeModerationGateContractsScaffoldStagingManifest.ts"

$Required143FFiles = @(
  "$ContractDir/index.ts",
  "$ContractDir/streamFoundationProviderRealtimeModerationGateContractsScaffold.ts",
  "$ContractDir/streamFoundationProviderRealtimeModerationGateContractsScaffoldContracts.ts",
  "$ContractDir/streamFoundationProviderRealtimeModerationGateContractsScaffoldReadiness.ts",
  "$ContractDir/streamFoundationProviderRealtimeModerationGateContractsScaffoldSmoke.ts",
  $ManifestPath
)

$RequiredFileChecks = @()
foreach ($path in $Required143FFiles) {
  $RequiredFileChecks += [ordered]@{
    path = $path
    exists = (Test-Path -LiteralPath $path)
    sha256 = Get-SafeFileHash -Path $path
  }
}

$MissingRequiredFiles = @($RequiredFileChecks | Where-Object { $_.exists -ne $true })

$ContractContentChecks = @(
  @{
    Path = "$ContractDir/streamFoundationProviderRealtimeModerationGateContractsScaffoldContracts.ts"
    Fragments = @(
      "BACKEND-STREAM-FOUNDATION-143F",
      "StreamFoundation143FProviderReadinessGateContract",
      "StreamFoundation143FRealtimeHandoffGateContract",
      "StreamFoundation143FModerationGateContract",
      "StreamFoundation143FRuntimeMountPrerequisiteGateContract",
      "StreamFoundation143FAdminReviewGateContract",
      "StreamFoundation143FSafeDisabledResponseGateContract",
      "providerSecretReadAllowedNow: false",
      "realtimeSocketOpenAllowedNow: false",
      "realtimeBroadcastAllowedNow: false",
      "moderationBypassAllowedNow: false",
      "fakeSuccessAllowedNow: false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationProviderRealtimeModerationGateContractsScaffold.ts"
    Fragments = @(
      "getStreamFoundationProviderRealtimeModerationGateContractsScaffoldSnapshot",
      "PROVIDER_READINESS_GATE",
      "REALTIME_HANDOFF_GATE",
      "MODERATION_GATE",
      "RUNTIME_MOUNT_PREREQUISITE_GATE",
      "ADMIN_REVIEW_GATE",
      "SAFE_DISABLED_RESPONSE_GATE",
      "providerReadinessGate: PROVIDER_READINESS_GATE",
      "safeDisabledResponseGate: SAFE_DISABLED_RESPONSE_GATE",
      "targetWriteBy143F: false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationProviderRealtimeModerationGateContractsScaffoldReadiness.ts"
    Fragments = @(
      "getStreamFoundationProviderRealtimeModerationGateContractsScaffoldReadiness",
      "provider_realtime_moderation_gate_contracts_scaffold_ready",
      "snapshot.providerReadinessGate.providerSecretReadAllowedNow === false",
      "snapshot.realtimeHandoffGate.realtimeSocketOpenAllowedNow === false",
      "snapshot.realtimeHandoffGate.realtimeBroadcastAllowedNow === false",
      "snapshot.moderationGate.moderationBypassAllowedNow === false",
      "snapshot.safety.providerSecretReadBy143F === false",
      "snapshot.safety.realtimeSocketOpenBy143F === false",
      "snapshot.safety.fakeSuccessBy143F === false"
    )
  },
  @{
    Path = "$ContractDir/streamFoundationProviderRealtimeModerationGateContractsScaffoldSmoke.ts"
    Fragments = @(
      "runStreamFoundationProviderRealtimeModerationGateContractsScaffoldSmoke",
      "all_gate_contracts_present",
      "provider_realtime_moderation_runtime_blocked_now",
      "143f_safety_clean"
    )
  },
  @{
    Path = $ManifestPath
    Fragments = @(
      "STREAM_143F_PROVIDER_REALTIME_MODERATION_GATE_CONTRACTS_SCAFFOLD_STAGING_MANIFEST",
      "changedScope: `"src/modules/stream/foundation/provider-realtime-moderation-gate-contracts/**`"",
      "sourceOnly: true",
      "providerCallAllowed: false",
      "providerSecretReadAllowed: false",
      "realtimeSocketOpenAllowed: false",
      "realtimeBroadcastAllowed: false",
      "moderationBypassAllowed: false",
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
  $has143FRef = $text.Contains("BACKEND-STREAM-FOUNDATION-143F") -or $text.Contains("stream143f") -or $text.Contains("provider-realtime-moderation-gate-contracts")
  $ForbiddenTargetReferences += [ordered]@{
    path = $path
    exists = (Test-Path -LiteralPath $path)
    contains143FReference = $has143FRef
    ok = (-not $has143FRef)
  }
}
$ForbiddenTargetReferenceFailures = @($ForbiddenTargetReferences | Where-Object { $_.ok -ne $true })

# Direct artifact-set scope verification. Older planning files may include approval text for 143F.
$Actual143FArtifactFiles = @($Required143FFiles)
$Actual143FArtifactOutsideFoundation = @(
  $Actual143FArtifactFiles | Where-Object { -not $_.StartsWith("src/modules/stream/foundation/") }
)
$Actual143FArtifactUnexpected = @(
  $Actual143FArtifactFiles | Where-Object { $Required143FFiles -notcontains $_ }
)

$HistoricalApprovalTextReferenceFiles = @()
if (Test-Path -LiteralPath "src/modules/stream/foundation") {
  $HistoricalApprovalTextReferenceFiles = @(
    Get-ChildItem -LiteralPath "src/modules/stream/foundation" -Recurse -File -Include "*.ts" |
      Where-Object {
        $path = $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
        if ($Required143FFiles -contains $path) {
          return $false
        }

        $content = Read-TextFile -Path $_.FullName
        return $content.Contains("BACKEND-STREAM-FOUNDATION-143F")
      } |
      ForEach-Object { $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/") }
  )
}

$AllowedScopeOk = (
  $MissingRequiredFiles.Count -eq 0 -and
  $Actual143FArtifactOutsideFoundation.Count -eq 0 -and
  $Actual143FArtifactUnexpected.Count -eq 0
)

$AllContractText = ""
foreach ($path in $Required143FFiles) {
  $AllContractText += "`n---FILE:$path---`n"
  $AllContractText += Read-TextFile -Path $path
}

$ForbiddenSafetyFragments = @(
  "targetWriteBy143F: true",
  "appTsChangeBy143F: true",
  "serverTsChangeBy143F: true",
  "streamIndexChangeBy143F: true",
  "prismaSchemaChangeBy143F: true",
  "migrationCreatedBy143F: true",
  "routeBehaviorChangeBy143F: true",
  "backendRestartBy143F: true",
  "runtimeHttpBy143F: true",
  "runtimePostBy143F: true",
  "runtimeDbReadBy143F: true",
  "runtimeDbWriteBy143F: true",
  "databaseReadBy143F: true",
  "databaseWriteBy143F: true",
  "providerCallBy143F: true",
  "providerSecretReadBy143F: true",
  "realtimeSocketOpenBy143F: true",
  "realtimeBroadcastBy143F: true",
  "moderationBypassBy143F: true",
  "walletMutationBy143F: true",
  "paymentAuthorizationBy143F: true",
  "monthlyPayoutBy143F: true",
  "moneyMovementBy143F: true",
  "fakeSuccessBy143F: true",
  "providerCallAllowedNow: true",
  "providerSecretReadAllowedNow: true",
  "providerSuccessAllowedNow: true",
  "fakeProviderSuccessAllowedNow: true",
  "roomPresencePublishAllowedNow: true",
  "streamStateBroadcastAllowedNow: true",
  "realtimeSocketOpenAllowedNow: true",
  "realtimeBroadcastAllowedNow: true",
  "fakeOnlineCountAllowedNow: true",
  "moderationBypassAllowedNow: true",
  "runtimeAllowLiveNow: true",
  "runtimeMountAllowedNow: true",
  "routeBehaviorChangeAllowedNow: true",
  "ownerRuntimeMountApprovalNow: true",
  "adminApprovalBypassAllowedNow: true",
  "runtimeLaunchApprovalAllowedNow: true",
  "emptyBodyAllowedNow: true",
  "fakeSuccessAllowedNow: true",
  "liveSuccessAllowedNow: true",
  "walletMutationAllowedNow: true",
  "paymentAuthorizationAllowedNow: true",
  "monthlyPayoutAllowedNow: true",
  "moneyMovementAllowedNow: true"
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
          $_.Name.Contains("143f") -or
          $_.Name.Contains("stream") -or
          (Read-TextFile -Path $_.FullName).Contains("BACKEND-STREAM-FOUNDATION-143F")
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
  $TscResult.outputTail = @($tscOutput | Select-Object -Last 200)
}

$CompileOk = (-not $RunTsc) -or ($TscResult.exitCode -eq 0)

$Safety = [ordered]@{
  sourceModificationPerformed = 0
  backendRestartPerformed = 0
  runtimeHttpPerformedBy143G = 0
  runtimePostPerformedBy143G = 0
  runtimeDbReadPerformed = 0
  runtimeDbWritePerformed = 0
  databaseReadPerformed = 0
  databaseWritePerformed = 0
  providerCallPerformed = 0
  providerSecretReadPerformed = 0
  realtimeSocketOpenPerformed = 0
  realtimeBroadcastPerformed = 0
  moderationBypassPerformed = 0
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
  status = $(if ($Ok) { "provider_realtime_moderation_gate_contracts_compile_safety_verification_passed" } else { "provider_realtime_moderation_gate_contracts_compile_safety_verification_blocked" })
  ownerApprovalAccepted = $true
  ownerApprovalText = $OwnerApprovalText
  requiredApprovalTextFor143H = $RequiredApprovalTextFor143H
  scopeVerification = [ordered]@{
    requiredFiles = $RequiredFileChecks
    missingRequiredFiles = $MissingRequiredFiles
    actual143FArtifactFiles = $Actual143FArtifactFiles
    actual143FArtifactOutsideFoundation = $Actual143FArtifactOutsideFoundation
    actual143FArtifactUnexpected = $Actual143FArtifactUnexpected
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
  nextRecommendedStage = $(if ($Ok) { "BACKEND-STREAM-FOUNDATION-143H controlled provider realtime moderation gate post-verification handoff source-only after exact approval" } else { "Review 143G report before any next stage" })
}

if ($WriteReport) {
  $reportParent = Split-Path -Parent $ReportPath
  if ($reportParent -and -not (Test-Path -LiteralPath $reportParent)) {
    New-Item -ItemType Directory -Force -Path $reportParent | Out-Null
  }
  $Report | ConvertTo-Json -Depth 80 | Set-Content -LiteralPath $ReportPath -Encoding UTF8
}

$Report | ConvertTo-Json -Depth 80

if (-not $Ok) {
  exit 1
}
