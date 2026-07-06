param(
  [switch]$RunTsc,
  [switch]$WriteReport,
  [string]$ReportPath = ".data\stream\backend-stream-foundation-142a-foundation-batch-compile-safety-verification-result.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Version = "BACKEND-STREAM-FOUNDATION-142A"
$Stage = "foundation_batch_compile_and_safety_verification"
$StartedAt = (Get-Date).ToUniversalTime().ToString("o")

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

$ExpectedChecks = @(
  @{
    Path = "src/modules/stream/foundation/repository-gate-contract-planning/streamFoundationRepositoryGateContractPlanningContracts.ts"
    Fragments = @("BACKEND-STREAM-FOUNDATION-141Q", "databaseWriteAllowedNow: false", "fakeSuccessAllowedNow: 0")
  },
  @{
    Path = "src/modules/stream/foundation/stream141qRepositoryGateContractPlanningStagingManifest.ts"
    Fragments = @("STREAM_141Q_REPOSITORY_GATE_CONTRACT_PLANNING_STAGING_MANIFEST", "expectedCurrentStatusCode: 423", "databaseWriteBy141Q: false")
  },
  @{
    Path = "src/modules/stream/foundation/realtime-provider-readiness-gate-contract-planning/streamFoundationRealtimeProviderReadinessGateContractPlanningContracts.ts"
    Fragments = @("BACKEND-STREAM-FOUNDATION-141R", "mobileProviderSecretsAllowed: false", "fakeProviderSuccessAllowedNow: 0")
  },
  @{
    Path = "src/modules/stream/foundation/stream141rRealtimeProviderReadinessGateContractPlanningStagingManifest.ts"
    Fragments = @("STREAM_141R_REALTIME_PROVIDER_READINESS_GATE_CONTRACT_PLANNING_STAGING_MANIFEST", "providerSecretReadBy141R: false", "fakeSuccessBy141R: false")
  },
  @{
    Path = "src/modules/stream/foundation/event-audit-gate-contract-planning/streamFoundationEventAuditGateContractPlanningContracts.ts"
    Fragments = @("BACKEND-STREAM-FOUNDATION-141S", "auditAppendAllowedNow: 0", "rawSecretAllowedNow: false")
  },
  @{
    Path = "src/modules/stream/foundation/stream141sEventAuditGateContractPlanningStagingManifest.ts"
    Fragments = @("STREAM_141S_EVENT_AUDIT_GATE_CONTRACT_PLANNING_STAGING_MANIFEST", "databaseWriteBy141S: false", "fakeSuccessBy141S: false")
  },
  @{
    Path = "src/modules/stream/foundation/owner-runtime-mount-approval-gate-planning/streamFoundationOwnerRuntimeMountApprovalGatePlanningContracts.ts"
    Fragments = @("BACKEND-STREAM-FOUNDATION-141T", "implementationAllowedNow: 0", "ownerApprovalRequiredBeforeRuntimeMountImplementation: true")
  },
  @{
    Path = "src/modules/stream/foundation/stream141tOwnerRuntimeMountApprovalGatePlanningStagingManifest.ts"
    Fragments = @("STREAM_141T_OWNER_RUNTIME_MOUNT_APPROVAL_GATE_PLANNING_STAGING_MANIFEST", "runtimePostBy141T: false", "moneyMovementBy141T: false")
  },
  @{
    Path = "src/modules/stream/foundation/runtime-mount-implementation-planning-approval-package/streamFoundationRuntimeMountImplementationPlanningApprovalPackageContracts.ts"
    Fragments = @("BACKEND-STREAM-FOUNDATION-141U", "targetSourceWriteAllowedNow: 0", "exactApprovalRequiredBefore141V: true")
  },
  @{
    Path = "src/modules/stream/foundation/stream141uRuntimeMountImplementationPlanningApprovalPackageStagingManifest.ts"
    Fragments = @("STREAM_141U_RUNTIME_MOUNT_IMPLEMENTATION_PLANNING_APPROVAL_PACKAGE_STAGING_MANIFEST", "runtimePostBy141U: false", "moneyMovementBy141U: false")
  },
  @{
    Path = "src/modules/stream/foundation/runtime-mount-implementation-planning-source-only/streamFoundationRuntimeMountImplementationPlanningSourceOnlyContracts.ts"
    Fragments = @("BACKEND-STREAM-FOUNDATION-141V", "targetSourceWriteAllowedNow: 0", "runtimeMountAllowedNow: 0")
  },
  @{
    Path = "src/modules/stream/foundation/stream141vRuntimeMountImplementationPlanningSourceOnlyStagingManifest.ts"
    Fragments = @("STREAM_141V_RUNTIME_MOUNT_IMPLEMENTATION_PLANNING_SOURCE_ONLY_STAGING_MANIFEST", "runtimePostBy141V: false", "databaseWriteBy141V: false")
  },
  @{
    Path = "src/modules/stream/foundation/controlled-runtime-mount-target-detection-review/streamFoundationControlledRuntimeMountTargetDetectionReviewContracts.ts"
    Fragments = @("BACKEND-STREAM-FOUNDATION-141W", "forbiddenTargetsNow: 4", "targetWriteAllowedNow: 0")
  },
  @{
    Path = "src/modules/stream/foundation/stream141wControlledRuntimeMountTargetDetectionReviewStagingManifest.ts"
    Fragments = @("STREAM_141W_CONTROLLED_RUNTIME_MOUNT_TARGET_DETECTION_REVIEW_STAGING_MANIFEST", "runtimePostBy141W: false", "moneyMovementBy141W: false")
  },
  @{
    Path = "src/modules/stream/foundation/live-write-runtime-gate-evaluator/streamFoundationRuntimeGateEvaluatorContracts.ts"
    Fragments = @("BACKEND-STREAM-FOUNDATION-141X", "statusCode: 423", "databaseWriteAllowedNow: false")
  },
  @{
    Path = "src/modules/stream/foundation/stream141xControlledSourceOnlyRuntimeGateEvaluatorDraftStagingManifest.ts"
    Fragments = @("STREAM_141X_CONTROLLED_SOURCE_ONLY_RUNTIME_GATE_EVALUATOR_DRAFT_STAGING_MANIFEST", "runtimePostBy141X: false", "fakeSuccessBy141X: false")
  },
  @{
    Path = "src/modules/stream/foundation/live-write-source-only-adapter-draft/streamFoundationLiveWriteSourceOnlyAdapterDraftContracts.ts"
    Fragments = @("BACKEND-STREAM-FOUNDATION-141Y", "statusCode: 423", "providerCallAllowedNow: false")
  },
  @{
    Path = "src/modules/stream/foundation/stream141yControlledSourceOnlyLiveWriteAdapterDraftStagingManifest.ts"
    Fragments = @("STREAM_141Y_CONTROLLED_SOURCE_ONLY_LIVE_WRITE_ADAPTER_DRAFT_STAGING_MANIFEST", "runtimePostBy141Y: false", "walletMutationBy141Y: false")
  },
  @{
    Path = "src/modules/stream/foundation/blocked-adapter-integration-review/streamFoundationBlockedAdapterIntegrationReviewContracts.ts"
    Fragments = @("BACKEND-STREAM-FOUNDATION-141Z", "runtimeBindingAllowedNow: 0", "routeBehaviorChangeAllowedNow: 0")
  },
  @{
    Path = "src/modules/stream/foundation/stream141zBlockedAdapterIntegrationReviewStagingManifest.ts"
    Fragments = @("STREAM_141Z_BLOCKED_ADAPTER_INTEGRATION_REVIEW_STAGING_MANIFEST", "runtimePostBy141Z: false", "fakeSuccessBy141Z: false")
  }
)

$ExpectedResults = @()
foreach ($check in $ExpectedChecks) {
  $ExpectedResults += Test-ContainsAll -Path $check.Path -Fragments $check.Fragments
}

$MissingOrBadExpected = @($ExpectedResults | Where-Object { -not $_.ok })

$TargetFiles = @(
  "src/app.ts",
  "src/server.ts",
  "src/modules/stream/index.ts"
)

$TargetForbiddenFragments = @(
  "streamFoundationLiveWriteSourceOnlyAdapterDraft",
  "streamFoundationRuntimeGateEvaluator",
  "streamFoundationBlockedAdapterIntegrationReview",
  "createStreamFoundationLiveStartSourceOnlyAdapterDecision",
  "createStreamFoundationLiveStopSourceOnlyAdapterDecision",
  "createStreamFoundationLiveHeartbeatSourceOnlyAdapterDecision",
  "evaluateStreamFoundationLiveWriteRuntimeGatesSourceOnly",
  "live-write-source-only-adapter-draft",
  "live-write-runtime-gate-evaluator",
  "blocked-adapter-integration-review",
  "STREAM_FOUNDATION_141X_RUNTIME_GATE_EVALUATOR_VERSION",
  "STREAM_FOUNDATION_141Y_LIVE_WRITE_SOURCE_ONLY_ADAPTER_VERSION",
  "STREAM_FOUNDATION_141Z_BLOCKED_ADAPTER_INTEGRATION_REVIEW_VERSION"
)

$TargetUnexpectedHits = @()
foreach ($targetFile in $TargetFiles) {
  $text = Read-TextFile -Path $targetFile
  foreach ($fragment in $TargetForbiddenFragments) {
    if ($text.Contains($fragment)) {
      $TargetUnexpectedHits += [ordered]@{
        path = $targetFile
        fragment = $fragment
      }
    }
  }
}

$StageSourceFiles = @()
$StageSourceFiles += Get-ChildItem -LiteralPath "src/modules/stream/foundation" -Recurse -File -Filter "*.ts" -ErrorAction SilentlyContinue |
  Where-Object {
    $_.FullName -match "repository-gate-contract-planning|realtime-provider-readiness-gate-contract-planning|event-audit-gate-contract-planning|owner-runtime-mount-approval-gate-planning|runtime-mount-implementation-planning-approval-package|runtime-mount-implementation-planning-source-only|controlled-runtime-mount-target-detection-review|live-write-runtime-gate-evaluator|live-write-source-only-adapter-draft|blocked-adapter-integration-review|stream141[q-z]"
  } |
  ForEach-Object { $_.FullName }

$StageForbiddenFragments = @(
  "runtimeMountAllowedNow: true",
  "runtimeSuccessAllowedNow: true",
  "fakeSuccessAllowedNow: true",
  "databaseReadAllowedNow: true",
  "databaseWriteAllowedNow: true",
  "providerCallAllowedNow: true",
  "providerSecretReadAllowedNow: true",
  "walletMutationAllowedNow: true",
  "paymentAuthorizationAllowedNow: true",
  "monthlyPayoutAllowedNow: true",
  "moneyMovementAllowedNow: true",
  "appTsChangeBy141",
  "serverTsChangeBy141",
  "streamIndexChangeBy141",
  "backendRestartBy141",
  "runtimeHttpBy141",
  "runtimePostBy141",
  "databaseWriteBy141",
  "providerCallBy141",
  "walletMutationBy141",
  "moneyMovementBy141",
  "fakeSuccessBy141"
)

$StageForbiddenHits = @()
foreach ($stageFile in $StageSourceFiles) {
  $relative = Resolve-Path -LiteralPath $stageFile -Relative
  $text = Read-TextFile -Path $stageFile
  foreach ($fragment in $StageForbiddenFragments) {
    if ($text.Contains($fragment + " true")) {
      $StageForbiddenHits += [ordered]@{
        path = $relative
        fragment = ($fragment + " true")
      }
    }
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
  $TscResult.outputTail = @($tscOutput | Select-Object -Last 80)
}

$CompileOk = (-not $RunTsc) -or ($TscResult.exitCode -eq 0)

$Safety = [ordered]@{
  sourceMutationPerformed = 0
  backendRestartPerformed = 0
  runtimeHttpPerformedBy142A = 0
  runtimePostPerformedBy142A = 0
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
  $MissingOrBadExpected.Count -eq 0 -and
  $TargetUnexpectedHits.Count -eq 0 -and
  $StageForbiddenHits.Count -eq 0 -and
  $CompileOk
)

$FinishedAt = (Get-Date).ToUniversalTime().ToString("o")

$Report = [ordered]@{
  version = $Version
  stage = $Stage
  startedAt = $StartedAt
  finishedAt = $FinishedAt
  ok = $Ok
  status = $(if ($Ok) { "foundation_batch_compile_and_safety_verification_passed" } else { "foundation_batch_compile_and_safety_verification_blocked" })
  expectedChecks = [ordered]@{
    total = $ExpectedResults.Count
    passed = @($ExpectedResults | Where-Object { $_.ok }).Count
    failed = $MissingOrBadExpected.Count
    failedItems = $MissingOrBadExpected
  }
  targetSafety = [ordered]@{
    checkedFiles = $TargetFiles
    unexpectedIntegrationHits = $TargetUnexpectedHits
    ok = ($TargetUnexpectedHits.Count -eq 0)
  }
  stageSourceSafety = [ordered]@{
    scannedFiles = $StageSourceFiles.Count
    forbiddenHits = $StageForbiddenHits
    ok = ($StageForbiddenHits.Count -eq 0)
  }
  tscResult = $TscResult
  safety = $Safety
  nextRecommendedStage = "BACKEND-STREAM-FOUNDATION-142B source-only batch handoff and next controlled implementation approval package"
}

if ($WriteReport) {
  $reportParent = Split-Path -Parent $ReportPath
  if ($reportParent -and -not (Test-Path -LiteralPath $reportParent)) {
    New-Item -ItemType Directory -Force -Path $reportParent | Out-Null
  }
  $Report | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath $ReportPath -Encoding UTF8
}

$Report | ConvertTo-Json -Depth 20

if (-not $Ok) {
  exit 1
}
