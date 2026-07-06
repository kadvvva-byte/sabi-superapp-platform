param(
  [switch]$RunTsc,
  [switch]$WriteReport,
  [string]$ReportPath = ".data\stream\backend-stream-foundation-142j-target-patch-draft-review-compile-target-untouched-verification-result.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Version = "BACKEND-STREAM-FOUNDATION-142J"
$Stage = "target_patch_draft_review_compile_and_target_untouched_verification"
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
    Path = "src/modules/stream/foundation/controlled-target-patch-draft-review-source-only/index.ts"
    Fragments = @(
      "streamFoundationControlledTargetPatchDraftReviewSourceOnlyContracts",
      "streamFoundationControlledTargetPatchDraftReviewSourceOnly",
      "streamFoundationControlledTargetPatchDraftReviewSourceOnlyReadiness",
      "streamFoundationControlledTargetPatchDraftReviewSourceOnlySmoke"
    )
  },
  @{
    Path = "src/modules/stream/foundation/controlled-target-patch-draft-review-source-only/streamFoundationControlledTargetPatchDraftReviewSourceOnlyContracts.ts"
    Fragments = @(
      "BACKEND-STREAM-FOUNDATION-142I",
      "controlled_target_patch_draft_review_source_only",
      "src/app.ts",
      "src/server.ts",
      "src/modules/stream/index.ts",
      "targetWriteAllowedNow: false",
      "routeBindingAllowedNow: false",
      "routeBehaviorChangeAllowedNow: false",
      "databaseWriteAllowedNow: false",
      "providerCallAllowedNow: false",
      "walletMutationAllowedNow: false"
    )
  },
  @{
    Path = "src/modules/stream/foundation/controlled-target-patch-draft-review-source-only/streamFoundationControlledTargetPatchDraftReviewSourceOnly.ts"
    Fragments = @(
      "STREAM_FOUNDATION_142I_OWNER_APPROVAL_TEXT",
      "route_import_review",
      "route_handler_reference_review",
      "route_binding_preservation_review",
      "stream_index_export_review",
      "blocked_423_response_preservation_review",
      "post_patch_compile_review",
      "draftReviewOnly: true",
      "futureTargetPatchRequiresNewExactApproval: true",
      "expectedCurrentStatusCode: 423"
    )
  },
  @{
    Path = "src/modules/stream/foundation/controlled-target-patch-draft-review-source-only/streamFoundationControlledTargetPatchDraftReviewSourceOnlyReadiness.ts"
    Fragments = @(
      "getStreamFoundationControlledTargetPatchDraftReviewSourceOnlyReadiness",
      "BACKEND-STREAM-FOUNDATION-142H",
      "ownerApprovalAccepted === true",
      "draftReviewOnly === true",
      "futureTargetPatchRequiresNewExactApproval === true",
      "expectedCurrentStatusCode === 423",
      "targetWriteAllowedNow === 0",
      "routeBindingAllowedNow === 0",
      "databaseWriteAllowedNow === 0",
      "providerCallAllowedNow === 0"
    )
  },
  @{
    Path = "src/modules/stream/foundation/controlled-target-patch-draft-review-source-only/streamFoundationControlledTargetPatchDraftReviewSourceOnlySmoke.ts"
    Fragments = @(
      "runStreamFoundationControlledTargetPatchDraftReviewSourceOnlySmoke",
      "owner_approval_accepted_for_142i",
      "future_patch_review_items_ready",
      "no_target_write_or_route_binding_now",
      "routes_remain_blocked_423",
      "no_runtime_db_provider_wallet_money"
    )
  },
  @{
    Path = "src/modules/stream/foundation/stream142iControlledTargetPatchDraftReviewSourceOnlyStagingManifest.ts"
    Fragments = @(
      "STREAM_142I_CONTROLLED_TARGET_PATCH_DRAFT_REVIEW_SOURCE_ONLY_STAGING_MANIFEST",
      "BACKEND-STREAM-FOUNDATION-142I",
      "ownerApprovalAccepted: true",
      "targetWriteAllowedNow: false",
      "routeBindingAllowedNow: false",
      "routeBehaviorChangeAllowedNow: false",
      "runtimePostBy142I: false",
      "databaseWriteBy142I: false",
      "providerCallBy142I: false",
      "walletMutationBy142I: false",
      "fakeSuccessBy142I: false"
    )
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
  "controlled-target-patch-draft-review-source-only",
  "streamFoundationControlledTargetPatchDraftReviewSourceOnly",
  "getStreamFoundationControlledTargetPatchDraftReviewSourceOnlySnapshot",
  "STREAM_FOUNDATION_142I_CONTROLLED_TARGET_PATCH_DRAFT_REVIEW_VERSION",
  "STREAM_142I_CONTROLLED_TARGET_PATCH_DRAFT_REVIEW_SOURCE_ONLY_STAGING_MANIFEST",
  "route_import_review",
  "route_handler_reference_review",
  "route_binding_preservation_review",
  "blocked_423_response_preservation_review"
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

$ReviewFiles = @()
if (Test-Path -LiteralPath "src/modules/stream/foundation/controlled-target-patch-draft-review-source-only") {
  $ReviewFiles += Get-ChildItem -LiteralPath "src/modules/stream/foundation/controlled-target-patch-draft-review-source-only" -Recurse -File -Filter "*.ts" |
    ForEach-Object { $_.FullName }
}

$ReviewForbiddenFragments = @(
  'targetWriteAllowedNow: true',
  'appTsWriteAllowedNow: true',
  'serverTsWriteAllowedNow: true',
  'streamIndexWriteAllowedNow: true',
  'liveWriteHandlerChangeAllowedNow: true',
  'routeBindingAllowedNow: true',
  'routeBehaviorChangeAllowedNow: true',
  'runtimePostAllowedNow: true',
  'runtimeSuccessAllowedNow: true',
  'fakeSuccessAllowedNow: true',
  'databaseReadAllowedNow: true',
  'databaseWriteAllowedNow: true',
  'providerCallAllowedNow: true',
  'providerSecretReadAllowedNow: true',
  'walletMutationAllowedNow: true',
  'paymentAuthorizationAllowedNow: true',
  'monthlyPayoutAllowedNow: true',
  'moneyMovementAllowedNow: true',
  'targetWriteAllowedNow: 1',
  'routeBindingAllowedNow: 1',
  'routeBehaviorChangeAllowedNow: 1',
  'runtimePostAllowedNow: 1',
  'runtimeSuccessAllowedNow: 1',
  'databaseWriteAllowedNow: 1',
  'providerCallAllowedNow: 1',
  'walletMutationAllowedNow: 1',
  'moneyMovementAllowedNow: 1',
  'fakeSuccessAllowedNow: 1',
  'app.post(',
  'app.use(',
  'listen(',
  'fetch(',
  'Invoke-WebRequest',
  'Invoke-RestMethod',
  'new PrismaClient',
  'prisma.',
  '$transaction',
  '.create(',
  '.update(',
  '.upsert(',
  '.delete('
)

$ReviewForbiddenHits = @()
foreach ($reviewFile in $ReviewFiles) {
  $relative = Resolve-Path -LiteralPath $reviewFile -Relative
  $text = Read-TextFile -Path $reviewFile
  foreach ($fragment in $ReviewForbiddenFragments) {
    if ($text.Contains($fragment)) {
      $ReviewForbiddenHits += [ordered]@{
        path = $relative
        fragment = $fragment
      }
    }
  }
}

$ManifestSafety = Test-ContainsAll -Path "src/modules/stream/foundation/stream142iControlledTargetPatchDraftReviewSourceOnlyStagingManifest.ts" -Fragments @(
  "appTsChangeBy142I: false",
  "serverTsChangeBy142I: false",
  "streamIndexChangeBy142I: false",
  "liveWriteHandlerChangeBy142I: false",
  "backendRestartBy142I: false",
  "runtimeHttpBy142I: false",
  "runtimePostBy142I: false",
  "databaseWriteBy142I: false",
  "providerCallBy142I: false",
  "walletMutationBy142I: false",
  "moneyMovementBy142I: false",
  "fakeSuccessBy142I: false"
)

$TscResult = [ordered]@{
  runTsc = [bool]$RunTsc
  exitCode = $null
  outputTail = @()
}

if ($RunTsc) {
  $tscOutput = @()
  $tscOutput = & cmd /c "npx tsc --noEmit" 2>&1
  $TscResult.exitCode = $LASTEXITCODE
  $TscResult.outputTail = @($tscOutput | Select-Object -Last 100)
}

$CompileOk = (-not $RunTsc) -or ($TscResult.exitCode -eq 0)

$Safety = [ordered]@{
  sourceMutationPerformed = 0
  backendRestartPerformed = 0
  runtimeHttpPerformedBy142J = 0
  runtimePostPerformedBy142J = 0
  targetFileWritePerformed = 0
  routeBindingChanged = 0
  routeBehaviorChanged = 0
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
  $ReviewForbiddenHits.Count -eq 0 -and
  $ManifestSafety.ok -eq $true -and
  $CompileOk
)

$FinishedAt = (Get-Date).ToUniversalTime().ToString("o")

$Report = [ordered]@{
  version = $Version
  stage = $Stage
  startedAt = $StartedAt
  finishedAt = $FinishedAt
  ok = $Ok
  status = $(if ($Ok) { "target_patch_draft_review_compile_and_target_untouched_verification_passed" } else { "target_patch_draft_review_compile_and_target_untouched_verification_blocked" })
  expectedChecks = [ordered]@{
    total = $ExpectedResults.Count
    passed = @($ExpectedResults | Where-Object { $_.ok }).Count
    failed = $MissingOrBadExpected.Count
    failedItems = $MissingOrBadExpected
  }
  targetUntouchedSafety = [ordered]@{
    checkedFiles = $TargetFiles
    unexpectedPatchReviewHits = $TargetUnexpectedHits
    ok = ($TargetUnexpectedHits.Count -eq 0)
  }
  patchReviewSourceSafety = [ordered]@{
    scannedFiles = $ReviewFiles.Count
    forbiddenHits = $ReviewForbiddenHits
    ok = ($ReviewForbiddenHits.Count -eq 0)
  }
  manifestSafety = $ManifestSafety
  tscResult = $TscResult
  safety = $Safety
  nextRecommendedStage = "BACKEND-STREAM-FOUNDATION-142K target patch review handoff and controlled target write approval package"
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
