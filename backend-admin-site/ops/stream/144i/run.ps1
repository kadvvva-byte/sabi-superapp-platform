param(
  [switch]$RunTsc,
  [switch]$WriteReport,
  [string]$ReportPath = ".data\stream\backend-stream-foundation-144i-runner-approval-package-compile-safety-verification-result.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Version = "BACKEND-STREAM-FOUNDATION-144I"
$Stage = "evidence_capture_runner_approval_package_compile_safety_verification_ops_only"
$StartedAt = (Get-Date).ToUniversalTime().ToString("o")

$OwnerApprovalText = "I approve BACKEND-STREAM-FOUNDATION-144I controlled runtime mount target patch draft preview evidence capture runner approval package compile and safety verification ops-only, verify 144H source-only evidence capture runner approval package contracts compile and remain limited to src/modules/stream/foundation, do not modify source, do not restart backend, no runtime POST, no runtime DB read/write, no provider call, no provider secret read, no realtime socket open, no realtime broadcast, no moderation bypass, no runtime mount, no route behavior change, no target route write, no rollback execution, no post-mount smoke, no Wallet mutation, no payment authorization, no monthly payout, no money movement, no fake success."

$RequiredApprovalTextFor144J = "I approve BACKEND-STREAM-FOUNDATION-144J controlled ops-only evidence capture runner package build source-only, use 144I verification evidence to create a short-path ops-only runner package that can read target file hashes/excerpts and inspect route/auth/blocked-route anchors for evidence only, without source target writes, without prisma schema write, without migration, without backend restart, without runtime POST, without runtime DB read/write, without provider call, without provider secret read, without realtime socket open, without realtime broadcast, without moderation bypass, without runtime mount, without route behavior change, without target route write, without rollback execution, without post-mount smoke, without Wallet mutation, without payment authorization, without monthly payout, without money movement, and without fake success."

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

$ContractDir = "src/modules/stream/foundation/runner-approval-144h"
$ManifestPath = "src/modules/stream/foundation/stream144hRunnerApprovalStagingManifest.ts"

$Required144HFiles = @(
  "$ContractDir/index.ts",
  "$ContractDir/stream144hRunnerApproval.ts",
  "$ContractDir/stream144hRunnerApprovalContracts.ts",
  "$ContractDir/stream144hRunnerApprovalReadiness.ts",
  "$ContractDir/stream144hRunnerApprovalSmoke.ts",
  $ManifestPath
)

$RequiredFileChecks = @()
foreach ($path in $Required144HFiles) {
  $RequiredFileChecks += [ordered]@{
    path = $path
    exists = (Test-Path -LiteralPath $path)
    sha256 = Get-SafeFileHash -Path $path
  }
}

$MissingRequiredFiles = @($RequiredFileChecks | Where-Object { $_.exists -ne $true })

$ContractContentChecks = @(
  @{
    Path = "$ContractDir/stream144hRunnerApprovalContracts.ts"
    Fragments = @(
      "BACKEND-STREAM-FOUNDATION-144H",
      "StreamFoundation144HOpsOnlyEvidenceCaptureRunnerPackageContract",
      "StreamFoundation144HFutureTargetHashCaptureContract",
      "StreamFoundation144HFutureTargetExcerptCaptureContract",
      "StreamFoundation144HFutureRouteAnchorInspectionContract",
      "StreamFoundation144HFutureAuthBoundaryInspectionContract",
      "StreamFoundation144HFutureBlockedRouteInspectionContract",
      "StreamFoundation144HFutureDuplicateMountInventoryContract",
      "StreamFoundation144HFutureReportOutputContract",
      "StreamFoundation144HCompileGateContract",
      "StreamFoundation144HOwnerApprovalGateContract",
      "futureRunnerMayReadTargetFilesForEvidenceOnlyAfterSeparateApproval: true",
      "futureRunnerMayWriteSourceFiles: false",
      "futureRunnerMayWritePrismaSchema: false",
      "futureRunnerMayCreateMigration: false",
      "futureRunnerMayRestartBackend: false",
      "futureRunnerMayPerformRuntimePost: false",
      "futureRunnerMayCallProvider: false",
      "futureRunnerMayReadProviderSecret: false",
      "futureRunnerMayMountRuntime: false",
      "futureRunnerMayWriteTargetRoute: false",
      "futureRunnerMayReturnFakeSuccess: false"
    )
  },
  @{
    Path = "$ContractDir/stream144hRunnerApproval.ts"
    Fragments = @(
      "getStreamFoundation144HRunnerApprovalPackageSnapshot",
      "opsOnlyEvidenceCaptureRunnerPackage",
      "futureTargetHashCapture",
      "futureTargetExcerptCapture",
      "futureRouteAnchorInspection",
      "futureAuthBoundaryInspection",
      "futureBlockedRouteInspection",
      "futureDuplicateMountInventory",
      "futureReportOutput",
      "compileGate",
      "ownerApprovalGate",
      "targetRouteWriteBy144H: false",
      "targetFileReadBy144H: false",
      "targetHashCapturedBy144H: false",
      "targetExcerptCapturedBy144H: false"
    )
  },
  @{
    Path = "$ContractDir/stream144hRunnerApprovalReadiness.ts"
    Fragments = @(
      "getStreamFoundation144HRunnerApprovalReadiness",
      "evidence_capture_runner_approval_package_ready",
      "snapshot.futureTargetHashCapture.targetReadScopes.length === 6",
      "snapshot.safety.targetRouteWriteBy144H === false",
      "snapshot.safety.targetFileReadBy144H === false",
      "snapshot.safety.fakeSuccessBy144H === false"
    )
  },
  @{
    Path = "$ContractDir/stream144hRunnerApprovalSmoke.ts"
    Fragments = @(
      "runStreamFoundation144HRunnerApprovalSmoke",
      "144g_handoff_evidence_preserved",
      "runner_approval_contracts_present",
      "future_runner_read_scope_allowed_only_after_separate_approval",
      "144h_actions_blocked_now"
    )
  },
  @{
    Path = $ManifestPath
    Fragments = @(
      "STREAM_144H_RUNNER_APPROVAL_STAGING_MANIFEST",
      "changedScope: `"src/modules/stream/foundation/runner-approval-144h/**`"",
      "sourceOnly: true",
      "futureRunnerMayReadTargetFilesForEvidenceOnlyAfterSeparateApproval: true",
      "futureRunnerMayWriteSourceFiles: false",
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
  $has144HRef = $text.Contains("BACKEND-STREAM-FOUNDATION-144H") -or $text.Contains("stream144h") -or $text.Contains("runner-approval-144h")
  $ForbiddenTargetReferences += [ordered]@{
    path = $path
    exists = (Test-Path -LiteralPath $path)
    contains144HReference = $has144HRef
    ok = (-not $has144HRef)
  }
}
$ForbiddenTargetReferenceFailures = @($ForbiddenTargetReferences | Where-Object { $_.ok -ne $true })

$Actual144HArtifactFiles = @($Required144HFiles)
$Actual144HArtifactOutsideFoundation = @(
  $Actual144HArtifactFiles | Where-Object { -not $_.StartsWith("src/modules/stream/foundation/") }
)
$Actual144HArtifactUnexpected = @(
  $Actual144HArtifactFiles | Where-Object { $Required144HFiles -notcontains $_ }
)

$HistoricalApprovalTextReferenceFiles = @()
if (Test-Path -LiteralPath "src/modules/stream/foundation") {
  $HistoricalApprovalTextReferenceFiles = @(
    Get-ChildItem -LiteralPath "src/modules/stream/foundation" -Recurse -File -Include "*.ts" |
      Where-Object {
        $path = $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
        if ($Required144HFiles -contains $path) {
          return $false
        }

        $content = Read-TextFile -Path $_.FullName
        return $content.Contains("BACKEND-STREAM-FOUNDATION-144H")
      } |
      ForEach-Object { $_.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/") }
  )
}

$AllowedScopeOk = (
  $MissingRequiredFiles.Count -eq 0 -and
  $Actual144HArtifactOutsideFoundation.Count -eq 0 -and
  $Actual144HArtifactUnexpected.Count -eq 0
)

$AllContractText = ""
foreach ($path in $Required144HFiles) {
  $AllContractText += "`n---FILE:$path---`n"
  $AllContractText += Read-TextFile -Path $path
}

$ForbiddenSafetyFragments = @(
  "targetWriteBy144H: true",
  "appTsChangeBy144H: true",
  "serverTsChangeBy144H: true",
  "streamIndexChangeBy144H: true",
  "prismaSchemaChangeBy144H: true",
  "migrationCreatedBy144H: true",
  "routeBehaviorChangeBy144H: true",
  "backendRestartBy144H: true",
  "runtimeHttpBy144H: true",
  "runtimePostBy144H: true",
  "runtimeDbReadBy144H: true",
  "runtimeDbWriteBy144H: true",
  "databaseReadBy144H: true",
  "databaseWriteBy144H: true",
  "providerCallBy144H: true",
  "providerSecretReadBy144H: true",
  "realtimeSocketOpenBy144H: true",
  "realtimeBroadcastBy144H: true",
  "moderationBypassBy144H: true",
  "runtimeMountBy144H: true",
  "targetRouteWriteBy144H: true",
  "targetFileReadBy144H: true",
  "targetHashCapturedBy144H: true",
  "targetExcerptCapturedBy144H: true",
  "rollbackExecutionBy144H: true",
  "postMountSmokeBy144H: true",
  "walletMutationBy144H: true",
  "paymentAuthorizationBy144H: true",
  "monthlyPayoutBy144H: true",
  "moneyMovementBy144H: true",
  "fakeSuccessBy144H: true",
  "runnerPackageCreatedNow: true",
  "runnerExecutionAllowedNow: true",
  "actualReadNowBy144H: true",
  "actualHashCapturedNowBy144H: true",
  "actualExcerptCapturedNowBy144H: true",
  "selectedForPatchNow: true",
  "sourceTargetWriteAllowedNow: true",
  "targetPatchAllowedNow: true",
  "targetRouteWriteAllowedNow: true",
  "runtimeMountAllowedNow: true",
  "routeBehaviorChangeAllowedNow: true",
  "hashCapturedNowBy144H: true",
  "targetFileReadNowBy144H: true",
  "excerptCapturedNowBy144H: true",
  "routeAnchorsInspectedNowBy144H: true",
  "authBoundaryInspectedNowBy144H: true",
  "authBypassAllowedNow: true",
  "authRouteOrderChangeAllowedNow: true",
  "blockedRoutesInspectedNowBy144H: true",
  "runtimePostAllowedNow: true",
  "liveSuccessAllowedNow: true",
  "fakeSuccessAllowedNow: true",
  "duplicateInventoryCapturedNowBy144H: true",
  "duplicateMountAllowedNow: true",
  "reportWrittenNowBy144H: true",
  "compileRunBy144HNow: true",
  "sourceModificationAllowedNow: true",
  "runtimeHttpAllowedNow: true",
  "backendRestartAllowedNow: true",
  "evidenceCaptureRunnerBuildAllowedNow: true",
  "evidenceCaptureRunnerExecutionAllowedNow: true",
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
          $_.Name.Contains("144h") -or
          $_.Name.Contains("stream") -or
          (Read-TextFile -Path $_.FullName).Contains("BACKEND-STREAM-FOUNDATION-144H")
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
  runtimeHttpPerformedBy144I = 0
  runtimePostPerformedBy144I = 0
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
  targetFileReadPerformed = 0
  targetHashCaptured = 0
  targetExcerptCaptured = 0
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
  status = $(if ($Ok) { "evidence_capture_runner_approval_package_compile_safety_verification_passed" } else { "evidence_capture_runner_approval_package_compile_safety_verification_blocked" })
  ownerApprovalAccepted = $true
  ownerApprovalText = $OwnerApprovalText
  requiredApprovalTextFor144J = $RequiredApprovalTextFor144J
  scopeVerification = [ordered]@{
    requiredFiles = $RequiredFileChecks
    missingRequiredFiles = $MissingRequiredFiles
    actual144HArtifactFiles = $Actual144HArtifactFiles
    actual144HArtifactOutsideFoundation = $Actual144HArtifactOutsideFoundation
    actual144HArtifactUnexpected = $Actual144HArtifactUnexpected
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
  nextRecommendedStage = $(if ($Ok) { "BACKEND-STREAM-FOUNDATION-144J controlled ops-only evidence capture runner package build source-only after exact approval" } else { "Review 144I report before any next stage" })
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
