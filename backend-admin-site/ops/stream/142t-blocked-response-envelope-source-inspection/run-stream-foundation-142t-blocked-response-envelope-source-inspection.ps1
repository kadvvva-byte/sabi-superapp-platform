param(
  [switch]$RunTsc,
  [switch]$WriteReport,
  [string]$ReportPath = ".data\stream\backend-stream-foundation-142t-blocked-response-envelope-source-inspection-result.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Version = "BACKEND-STREAM-FOUNDATION-142T-FIX2"
$Stage = "blocked_response_envelope_source_inspection_ops_only_fix2_delegate_aware"
$StartedAt = (Get-Date).ToUniversalTime().ToString("o")

$OwnerApprovalText = "I approve BACKEND-STREAM-FOUNDATION-142T controlled blocked-response envelope source inspection ops-only, inspect src/app.ts and the 142C runtime handler draft source to determine why runtime POST returns HTTP 423 with empty response bodies, prepare a report only, do not write src/app.ts, do not write src/server.ts, do not write src/modules/stream/index.ts, do not restart backend, no runtime POST, no DB write, no provider call, no Wallet mutation, no payment authorization, no monthly payout, no money movement, no fake success."

function Read-TextFile {
  param([string]$Path)
  if (-not (Test-Path -LiteralPath $Path)) {
    return ""
  }
  return Get-Content -LiteralPath $Path -Raw -Encoding UTF8
}

function Get-LineContextsForFragment {
  param(
    [string]$Path,
    [string]$Fragment,
    [int]$Before = 8,
    [int]$After = 18
  )

  $text = Read-TextFile -Path $Path
  if (-not $text) {
    return @()
  }

  $lines = @($text -split "`r?`n")
  $matches = @()

  for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i].Contains($Fragment)) {
      $start = [Math]::Max(0, $i - $Before)
      $end = [Math]::Min($lines.Count - 1, $i + $After)
      $contextLines = @()
      for ($j = $start; $j -le $end; $j++) {
        $contextLines += ("{0}: {1}" -f ($j + 1), $lines[$j])
      }

      $matches += [ordered]@{
        path = $Path
        fragment = $Fragment
        line = ($i + 1)
        context = $contextLines
        contextText = ($contextLines -join "`n")
      }
    }
  }

  return @($matches)
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

$AppPath = "src/app.ts"
$ServerPath = "src/server.ts"
$StreamIndexPath = "src/modules/stream/index.ts"
$RuntimeHandlerPath = "src/modules/stream/foundation/live-write-runtime-handler/streamFoundationLiveWriteRuntimeHandlerDraft.ts"
$RuntimeHandlerContractsPath = "src/modules/stream/foundation/live-write-runtime-handler/streamFoundationLiveWriteRuntimeHandlerDraftContracts.ts"
$RuntimeHandlerReadinessPath = "src/modules/stream/foundation/live-write-runtime-handler/streamFoundationLiveWriteRuntimeHandlerDraftReadiness.ts"
$SmokeRunner142QPath = "ops/stream/142q-controlled-blocked-route-runtime-post-smoke/run-stream-foundation-142q-controlled-blocked-route-runtime-post-smoke.ps1"

$AppText = Read-TextFile -Path $AppPath
$ServerText = Read-TextFile -Path $ServerPath
$StreamIndexText = Read-TextFile -Path $StreamIndexPath
$RuntimeHandlerText = Read-TextFile -Path $RuntimeHandlerPath
$RuntimeHandlerContractsText = Read-TextFile -Path $RuntimeHandlerContractsPath
$RuntimeHandlerReadinessText = Read-TextFile -Path $RuntimeHandlerReadinessPath
$SmokeRunner142QText = Read-TextFile -Path $SmokeRunner142QPath

$RouteMap = @(
  [ordered]@{
    id = "stream_live_start"
    path = "/api/stream/live/start"
    factory = "createStreamFoundationLiveStartRuntimeHandlerDraftDecision"
    handlerId = "live_start_runtime_handler_draft"
    routeId = "stream_live_start"
  },
  [ordered]@{
    id = "stream_live_stop"
    path = "/api/stream/live/stop"
    factory = "createStreamFoundationLiveStopRuntimeHandlerDraftDecision"
    handlerId = "live_stop_runtime_handler_draft"
    routeId = "stream_live_stop"
  },
  [ordered]@{
    id = "stream_live_heartbeat"
    path = "/api/stream/live/heartbeat"
    factory = "createStreamFoundationLiveHeartbeatRuntimeHandlerDraftDecision"
    handlerId = "live_heartbeat_runtime_handler_draft"
    routeId = "stream_live_heartbeat"
  }
)

$RouteInspection = @()
foreach ($route in $RouteMap) {
  $contexts = @(Get-LineContextsForFragment -Path $AppPath -Fragment $route.path -Before 8 -After 22)
  $contextText = ($contexts | ForEach-Object { $_.contextText }) -join "`n---`n"

  $RouteInspection += [ordered]@{
    id = $route.id
    path = $route.path
    factory = $route.factory
    contextsFound = $contexts.Count
    hasFactoryCallInContext = $contextText.Contains($route.factory)
    hasStatusJsonInContext = ($contextText.Contains("res.status") -and $contextText.Contains(".json("))
    usesEnvelopeStatusCode = $contextText.Contains("envelope.statusCode")
    routeContext = $contexts
    ok = ($contexts.Count -ge 1 -and $contextText.Contains($route.factory) -and $contextText.Contains("res.status") -and $contextText.Contains(".json(") -and $contextText.Contains("envelope.statusCode"))
  }
}

$SharedBlockedDecisionContexts = @(Get-LineContextsForFragment -Path $RuntimeHandlerPath -Fragment "function createBlockedRuntimeHandlerDecision" -Before 4 -After 55)
$SharedBlockedDecisionText = ($SharedBlockedDecisionContexts | ForEach-Object { $_.contextText }) -join "`n---`n"

$SharedBlockedDecisionInspection = [ordered]@{
  contextsFound = $SharedBlockedDecisionContexts.Count
  hasStatusCode423 = $SharedBlockedDecisionText.Contains("statusCode: 423")
  hasReturnObject = ($SharedBlockedDecisionText.Contains("return {") -or $SharedBlockedDecisionText.Contains("return{"))
  hasBlockedOrSourceOnly = ($SharedBlockedDecisionText.ToLowerInvariant().Contains("blocked") -or $SharedBlockedDecisionText.ToLowerInvariant().Contains("source_only") -or $SharedBlockedDecisionText.ToLowerInvariant().Contains("provider_not_configured"))
  hasFalseSafetyFlags = (
    $SharedBlockedDecisionText.Contains("databaseWriteAllowedNow: false") -and
    $SharedBlockedDecisionText.Contains("providerCallAllowedNow: false") -and
    $SharedBlockedDecisionText.Contains("walletMutationAllowedNow: false") -and
    $SharedBlockedDecisionText.Contains("fakeSuccessAllowedNow: false")
  )
  context = $SharedBlockedDecisionContexts
}
$SharedBlockedDecisionInspection.ok = (
  $SharedBlockedDecisionInspection.contextsFound -ge 1 -and
  $SharedBlockedDecisionInspection.hasStatusCode423 -eq $true -and
  $SharedBlockedDecisionInspection.hasReturnObject -eq $true -and
  $SharedBlockedDecisionInspection.hasFalseSafetyFlags -eq $true
)

$RuntimeHandlerFunctionInspection = @()
foreach ($route in $RouteMap) {
  $factoryContexts = @(Get-LineContextsForFragment -Path $RuntimeHandlerPath -Fragment $route.factory -Before 12 -After 35)
  $factoryText = ($factoryContexts | ForEach-Object { $_.contextText }) -join "`n---`n"

  $delegatesToSharedBlockedDecision = (
    $factoryText.Contains("return createBlockedRuntimeHandlerDecision") -and
    $factoryText.Contains($route.handlerId) -and
    $factoryText.Contains($route.routeId)
  )

  $localHasStatusCode423 = $factoryText.Contains("statusCode: 423")
  $delegateAwareStatusCode423 = ($localHasStatusCode423 -or ($delegatesToSharedBlockedDecision -and $SharedBlockedDecisionInspection.hasStatusCode423))

  $delegateAwareSafetyFlags = (
    $factoryText.Contains("databaseWriteAllowedNow: false") -or
    $factoryText.Contains("providerCallAllowedNow: false") -or
    $factoryText.Contains("walletMutationAllowedNow: false") -or
    $factoryText.Contains("fakeSuccessAllowedNow: false") -or
    ($delegatesToSharedBlockedDecision -and $SharedBlockedDecisionInspection.hasFalseSafetyFlags)
  )

  $RuntimeHandlerFunctionInspection += [ordered]@{
    id = $route.id
    factory = $route.factory
    contextsFound = $factoryContexts.Count
    delegatesToSharedBlockedDecision = $delegatesToSharedBlockedDecision
    hasStatusCode423NearFactory = $localHasStatusCode423
    hasStatusCode423ViaSharedDelegate = ($delegatesToSharedBlockedDecision -and $SharedBlockedDecisionInspection.hasStatusCode423)
    hasReturnNearFactory = $factoryText.Contains("return")
    hasBlockedOrSourceOnlyNearFactory = ($factoryText.ToLowerInvariant().Contains("blocked") -or $factoryText.ToLowerInvariant().Contains("source_only") -or $factoryText.ToLowerInvariant().Contains("provider_not_configured") -or ($delegatesToSharedBlockedDecision -and $SharedBlockedDecisionInspection.hasBlockedOrSourceOnly))
    hasFalseSafetyFlagsNearFactoryOrDelegate = $delegateAwareSafetyFlags
    contexts = $factoryContexts
    ok = ($factoryContexts.Count -ge 1 -and $factoryText.Contains("return") -and $delegatesToSharedBlockedDecision -and $delegateAwareStatusCode423 -and $delegateAwareSafetyFlags)
  }
}

# All pipeline count checks are wrapped in @(...).Count for PowerShell StrictMode scalar safety.
$RuntimeHandlerFactoryHits = @($RouteMap | Where-Object { $RuntimeHandlerText.Contains($_.factory) })

$RuntimeHandlerGlobalInspection = [ordered]@{
  exists = (Test-Path -LiteralPath $RuntimeHandlerPath)
  hasAllFactories = ($RuntimeHandlerFactoryHits.Count -eq 3)
  factoryHits = @($RuntimeHandlerFactoryHits | ForEach-Object { $_.factory })
  hasStatusCode423 = $RuntimeHandlerText.Contains("statusCode: 423")
  hasJsonLikeFields = (
    $RuntimeHandlerText.Contains("status") -or
    $RuntimeHandlerText.Contains("reason") -or
    $RuntimeHandlerText.Contains("message") -or
    $RuntimeHandlerText.Contains("code")
  )
  hasExplicitUndefinedReturn = $RuntimeHandlerText.Contains("return undefined")
  hasVoidReturnType = $RuntimeHandlerText.Contains(": void") -or $RuntimeHandlerText.Contains("Promise<void>")
  hasSerializableObjectHints = ($RuntimeHandlerText.Contains("{") -and $RuntimeHandlerText.Contains("}"))
  hasSafetyFalseFlags = (
    $RuntimeHandlerText.Contains("databaseWriteAllowedNow: false") -and
    $RuntimeHandlerText.Contains("providerCallAllowedNow: false") -and
    $RuntimeHandlerText.Contains("walletMutationAllowedNow: false") -and
    $RuntimeHandlerText.Contains("fakeSuccessAllowedNow: false")
  )
}

$RuntimeHandlerGlobalInspection.ok = (
  $RuntimeHandlerGlobalInspection.exists -eq $true -and
  $RuntimeHandlerGlobalInspection.hasAllFactories -eq $true -and
  $RuntimeHandlerGlobalInspection.hasStatusCode423 -eq $true -and
  $RuntimeHandlerGlobalInspection.hasExplicitUndefinedReturn -eq $false -and
  $RuntimeHandlerGlobalInspection.hasVoidReturnType -eq $false -and
  $SharedBlockedDecisionInspection.ok -eq $true
)

$ContractsInspection = [ordered]@{
  path = $RuntimeHandlerContractsPath
  exists = (Test-Path -LiteralPath $RuntimeHandlerContractsPath)
  hasStatusCodeType = $RuntimeHandlerContractsText.Contains("statusCode")
  has423LiteralOrNumber = $RuntimeHandlerContractsText.Contains("423")
  hasBlockedStatusOrReasonType = (
    $RuntimeHandlerContractsText.ToLowerInvariant().Contains("blocked") -or
    $RuntimeHandlerContractsText.ToLowerInvariant().Contains("reason") -or
    $RuntimeHandlerContractsText.ToLowerInvariant().Contains("status")
  )
  hasSafetyFlags = (
    $RuntimeHandlerContractsText.Contains("databaseWriteAllowedNow") -or
    $RuntimeHandlerContractsText.Contains("providerCallAllowedNow") -or
    $RuntimeHandlerContractsText.Contains("walletMutationAllowedNow") -or
    $RuntimeHandlerContractsText.Contains("fakeSuccessAllowedNow")
  )
}
$ContractsInspection.ok = (
  $ContractsInspection.exists -eq $true -and
  $ContractsInspection.hasStatusCodeType -eq $true
)

$ReadinessInspection = Test-ContainsAll -Path $RuntimeHandlerReadinessPath -Fragments @(
  "runtimeMountedNow === false",
  "routeBindingChangedNow === false",
  "databaseWriteAllowedNow === false",
  "providerCallAllowedNow === false"
)

$SmokeRunnerInspection = [ordered]@{
  path = $SmokeRunner142QPath
  exists = (Test-Path -LiteralPath $SmokeRunner142QPath)
  capturesExceptionResponse = (
    $SmokeRunner142QText.Contains("Exception.Response") -or
    $SmokeRunner142QText.Contains("GetResponseStream")
  )
  readsResponseStream = $SmokeRunner142QText.Contains("GetResponseStream")
  usesRawBody = $SmokeRunner142QText.Contains("rawBody")
  treats423AsOkByStatus = ($SmokeRunner142QText.Contains("expectedStatusCode") -and $SmokeRunner142QText.Contains("statusCode"))
  requiresBlockedBodyEvidenceForOk = ($SmokeRunner142QText.Contains("blockedEvidencePresent") -and $SmokeRunner142QText.Contains("blockedEvidence") -and $SmokeRunner142QText.Contains("ok ="))
}
$SmokeRunnerInspection.ok = (
  $SmokeRunnerInspection.exists -eq $true -and
  $SmokeRunnerInspection.capturesExceptionResponse -eq $true -and
  $SmokeRunnerInspection.usesRawBody -eq $true -and
  $SmokeRunnerInspection.treats423AsOkByStatus -eq $true
)

$TargetWriteSafety = [ordered]@{
  appTsModifiedBy142T = 0
  serverTsModifiedBy142T = 0
  streamIndexModifiedBy142T = 0
  sourceMutationPerformed = 0
  backendRestartPerformed = 0
  runtimeHttpPerformedBy142T = 0
  runtimePostPerformedBy142T = 0
}

$RuntimeSafety = [ordered]@{
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

$RouteInspectionFailed = @($RouteInspection | Where-Object { $_.ok -ne $true })
$RouteInspectionPassed = @($RouteInspection | Where-Object { $_.ok -eq $true })
$RuntimeHandlerFunctionFailed = @($RuntimeHandlerFunctionInspection | Where-Object { $_.ok -ne $true })
$RuntimeHandlerFunctionPassed = @($RuntimeHandlerFunctionInspection | Where-Object { $_.ok -eq $true })

$Findings = @()

if ($RouteInspectionFailed.Count -eq 0) {
  $Findings += [ordered]@{
    id = "app_routes_use_status_json_envelope"
    severity = "passed"
    summary = "src/app.ts route contexts call the 142C draft factories and respond with status plus JSON envelope."
    target = "src/app.ts"
  }
} else {
  $Findings += [ordered]@{
    id = "app_routes_need_response_shape_review"
    severity = "blocked"
    summary = "One or more src/app.ts route contexts does not clearly show status plus JSON envelope response shape."
    target = "src/app.ts"
  }
}

if ($RuntimeHandlerGlobalInspection.ok -eq $true -and $RuntimeHandlerFunctionFailed.Count -eq 0) {
  $Findings += [ordered]@{
    id = "runtime_handler_delegated_423_envelope_verified"
    severity = "passed"
    summary = "142C route-specific factories delegate to a shared blocked decision builder that returns statusCode 423 and false safety flags."
    target = $RuntimeHandlerPath
  }
} else {
  $Findings += [ordered]@{
    id = "runtime_handler_envelope_needs_review"
    severity = "blocked"
    summary = "142C runtime handler draft does not clearly satisfy delegate-aware envelope checks."
    target = $RuntimeHandlerPath
  }
}

if ($SmokeRunnerInspection.readsResponseStream -eq $true) {
  $Findings += [ordered]@{
    id = "142q_runner_attempts_response_stream_capture"
    severity = "info"
    summary = "142Q runner includes response-stream capture, so empty body may be backend envelope serialization or runtime error path, not only client capture."
    target = $SmokeRunner142QPath
  }
} else {
  $Findings += [ordered]@{
    id = "142q_runner_capture_may_need_fix"
    severity = "review_required"
    summary = "142Q runner does not clearly read the non-2xx response stream, so client capture may explain empty body."
    target = $SmokeRunner142QPath
  }
}

$EnvelopeNormalizationRecommendation = [ordered]@{
  preserveStatusCode423 = $true
  emptyBodyIsNotSuccess = $true
  sourceInspectionConclusion = $(if ($RouteInspectionFailed.Count -eq 0 -and $RuntimeHandlerFunctionFailed.Count -eq 0 -and $SharedBlockedDecisionInspection.ok -eq $true) { "source_shape_appears_correct_delegate_aware" } else { "source_shape_needs_review" })
  recommendedNextAction = "Prepare 142U approval package. Since delegate-aware source inspection can pass while 142Q runtime still saw empty body, the next safe step is an approval package for either improved response body capture or minimal blocked-envelope normalization, still preserving 423."
  requiredBlockedEnvelopeFields = @(
    "ok: false",
    "statusCode: 423",
    "status or reason showing blocked/source-only/provider_not_configured",
    "providerCallAllowedNow: false",
    "walletMutationAllowedNow: false",
    "moneyMovementAllowedNow: false",
    "fakeSuccessAllowedNow: false"
  )
  targetWriteAllowedNow = $false
  runtimePostAllowedNow = $false
  databaseWriteAllowedNow = $false
  providerCallAllowedNow = $false
  walletMutationAllowedNow = $false
  moneyMovementAllowedNow = $false
  fakeSuccessAllowedNow = $false
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
  $TscResult.outputTail = @($tscOutput | Select-Object -Last 120)
}

$CompileOk = (-not $RunTsc) -or ($TscResult.exitCode -eq 0)

$RoutesOk = ($RouteInspectionPassed.Count -eq 3)
$FactoriesOk = ($RuntimeHandlerFunctionPassed.Count -eq 3)

$Ok = (
  $RoutesOk -and
  $FactoriesOk -and
  $RuntimeHandlerGlobalInspection.ok -eq $true -and
  $ContractsInspection.ok -eq $true -and
  $ReadinessInspection.ok -eq $true -and
  $SmokeRunnerInspection.ok -eq $true -and
  $CompileOk
)

$FinishedAt = (Get-Date).ToUniversalTime().ToString("o")

$Report = [ordered]@{
  version = $Version
  stage = $Stage
  startedAt = $StartedAt
  finishedAt = $FinishedAt
  ok = $Ok
  status = $(if ($Ok) { "blocked_response_envelope_source_inspection_passed" } else { "blocked_response_envelope_source_inspection_needs_review" })
  fix1 = [ordered]@{
    fixedPowerShellStrictModePipelineCount = $true
  }
  fix2 = [ordered]@{
    delegateAwareFactoryCheck = $true
    previousFalseBlocker = "Route-specific wrapper factories delegate to createBlockedRuntimeHandlerDecision, so statusCode 423 is in the shared builder rather than near each wrapper."
  }
  ownerApprovalAccepted = $true
  ownerApprovalText = $OwnerApprovalText
  routeInspection = [ordered]@{
    expectedRoutes = 3
    passedRoutes = $RouteInspectionPassed.Count
    failedRoutes = $RouteInspectionFailed.Count
    checks = $RouteInspection
  }
  runtimeHandlerInspection = [ordered]@{
    expectedFactories = 3
    passedFactories = $RuntimeHandlerFunctionPassed.Count
    failedFactories = $RuntimeHandlerFunctionFailed.Count
    sharedBlockedDecision = $SharedBlockedDecisionInspection
    global = $RuntimeHandlerGlobalInspection
    factoryChecks = $RuntimeHandlerFunctionInspection
    contracts = $ContractsInspection
    readiness = $ReadinessInspection
  }
  smokeRunner142QInspection = $SmokeRunnerInspection
  findings = $Findings
  envelopeNormalizationRecommendation = $EnvelopeNormalizationRecommendation
  tscResult = $TscResult
  safety = [ordered]@{
    targetWriteSafety = $TargetWriteSafety
    runtimeSafety = $RuntimeSafety
  }
  nextRecommendedStage = $(if ($Ok) { "BACKEND-STREAM-FOUNDATION-142U blocked-response envelope follow-up approval package based on 142T-FIX2 findings" } else { "Review 142T-FIX2 report before any source patch approval" })
}

if ($WriteReport) {
  $reportParent = Split-Path -Parent $ReportPath
  if ($reportParent -and -not (Test-Path -LiteralPath $reportParent)) {
    New-Item -ItemType Directory -Force -Path $reportParent | Out-Null
  }
  $Report | ConvertTo-Json -Depth 50 | Set-Content -LiteralPath $ReportPath -Encoding UTF8
}

$Report | ConvertTo-Json -Depth 50

if (-not $Ok) {
  exit 1
}
