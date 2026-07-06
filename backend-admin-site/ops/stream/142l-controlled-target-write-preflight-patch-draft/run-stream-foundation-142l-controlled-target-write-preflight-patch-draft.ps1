param(
  [switch]$RunTsc,
  [switch]$WriteReport,
  [string]$ReportPath = ".data\stream\backend-stream-foundation-142l-controlled-target-write-preflight-patch-draft-result.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Version = "BACKEND-STREAM-FOUNDATION-142L"
$Stage = "controlled_target_write_preflight_and_patch_draft_only"
$StartedAt = (Get-Date).ToUniversalTime().ToString("o")

$OwnerApprovalText = "I approve BACKEND-STREAM-FOUNDATION-142L controlled target write preflight and patch draft only, detect the exact live write route binding target and prepare a minimal controlled patch to bind current live write routes to the 142C runtime handler draft while preserving 423 blocked behavior, do not restart backend, no runtime POST, no DB write, no provider call, no Wallet mutation, no payment authorization, no monthly payout, no money movement, no fake success."

function Read-TextFile {
  param([string]$Path)
  if (-not (Test-Path -LiteralPath $Path)) {
    return ""
  }
  return Get-Content -LiteralPath $Path -Raw -Encoding UTF8
}

function Get-RouteContexts {
  param(
    [string]$Path,
    [string]$Route
  )

  $text = Read-TextFile -Path $Path
  if (-not $text) {
    return @()
  }

  $lines = $text -split "`r?`n"
  $matches = @()
  for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i].Contains($Route)) {
      $start = [Math]::Max(0, $i - 8)
      $end = [Math]::Min($lines.Count - 1, $i + 14)
      $contextLines = @()
      for ($j = $start; $j -le $end; $j++) {
        $contextLines += ("{0}: {1}" -f ($j + 1), $lines[$j])
      }

      $matches += [ordered]@{
        path = $Path
        route = $Route
        line = ($i + 1)
        context = $contextLines
      }
    }
  }

  return $matches
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

$Routes = @(
  "/api/stream/live/start",
  "/api/stream/live/stop",
  "/api/stream/live/heartbeat"
)

$TargetFiles = @(
  "src/app.ts",
  "src/server.ts",
  "src/modules/stream/index.ts"
)

$RuntimeHandlerReadiness = @(
  @{
    Path = "src/modules/stream/foundation/live-write-runtime-handler/index.ts"
    Fragments = @(
      "streamFoundationLiveWriteRuntimeHandlerDraft",
      "streamFoundationLiveWriteRuntimeHandlerDraftContracts"
    )
  },
  @{
    Path = "src/modules/stream/foundation/live-write-runtime-handler/streamFoundationLiveWriteRuntimeHandlerDraft.ts"
    Fragments = @(
      "createStreamFoundationLiveStartRuntimeHandlerDraftDecision",
      "createStreamFoundationLiveStopRuntimeHandlerDraftDecision",
      "createStreamFoundationLiveHeartbeatRuntimeHandlerDraftDecision",
      "statusCode: 423",
      "runtimeMountedNow: false",
      "routeBindingChangedNow: false",
      "databaseWriteAllowedNow: false",
      "providerCallAllowedNow: false",
      "walletMutationAllowedNow: false"
    )
  },
  @{
    Path = "src/modules/stream/foundation/stream142cControlledSourceOnlyRuntimeHandlerDraftStagingManifest.ts"
    Fragments = @(
      "BACKEND-STREAM-FOUNDATION-142C",
      "expectedCurrentStatusCode: 423",
      "runtimePostBy142C: false",
      "databaseWriteBy142C: false",
      "providerCallBy142C: false",
      "walletMutationBy142C: false",
      "fakeSuccessBy142C: false"
    )
  }
)

$RuntimeHandlerReadinessResults = @()
foreach ($check in $RuntimeHandlerReadiness) {
  $RuntimeHandlerReadinessResults += Test-ContainsAll -Path $check.Path -Fragments $check.Fragments
}
$RuntimeHandlerMissingOrBad = @($RuntimeHandlerReadinessResults | Where-Object { -not $_.ok })

$RouteContexts = @()
foreach ($targetFile in $TargetFiles) {
  foreach ($route in $Routes) {
    $RouteContexts += Get-RouteContexts -Path $targetFile -Route $route
  }
}

$RoutesByTarget = @()
foreach ($targetFile in $TargetFiles) {
  $text = Read-TextFile -Path $targetFile
  $presentRoutes = @()
  foreach ($route in $Routes) {
    if ($text.Contains($route)) {
      $presentRoutes += $route
    }
  }

  $RoutesByTarget += [ordered]@{
    path = $targetFile
    exists = (Test-Path -LiteralPath $targetFile)
    routeCount = $presentRoutes.Count
    routes = $presentRoutes
    containsAllLiveWriteRoutes = ($presentRoutes.Count -eq $Routes.Count)
  }
}

$PrimaryTargetCandidates = @($RoutesByTarget | Where-Object { $_.containsAllLiveWriteRoutes -eq $true })
$ExactTargetDetected = ($PrimaryTargetCandidates.Count -ge 1)
$PrimaryTargetFile = $null
if ($ExactTargetDetected) {
  $PrimaryTargetFile = $PrimaryTargetCandidates[0].path
}

$ExistingBlockedHandlerEvidence = @()
$BlockedHandlerFragments = @(
  "live-write-handler-source-only-draft",
  "sourceOnly",
  "statusCode: 423",
  "STREAM",
  "blocked"
)

foreach ($targetFile in $TargetFiles) {
  $text = Read-TextFile -Path $targetFile
  $hits = @()
  foreach ($fragment in $BlockedHandlerFragments) {
    if ($text.Contains($fragment)) {
      $hits += $fragment
    }
  }
  $ExistingBlockedHandlerEvidence += [ordered]@{
    path = $targetFile
    hits = $hits
  }
}

$HandlerImportPathForAppTs = "./modules/stream/foundation/live-write-runtime-handler"
$HandlerImportPathForServerTs = "./modules/stream/foundation/live-write-runtime-handler"
$HandlerImportPathForStreamIndexTs = "./foundation/live-write-runtime-handler"

$PatchDraft = [ordered]@{
  patchDraftOnly = $true
  applyPatchNow = $false
  exactTargetDetected = $ExactTargetDetected
  primaryTargetFile = $PrimaryTargetFile
  targetCandidates = $RoutesByTarget
  routeContexts = $RouteContexts
  requiredPreservation = [ordered]@{
    expectedCurrentStatusCode = 423
    preserveBlockedBehavior = $true
    runtimeSuccessAllowed = $false
    fakeSuccessAllowed = $false
    databaseWriteAllowed = $false
    providerCallAllowed = $false
    walletMutationAllowed = $false
    moneyMovementAllowed = $false
  }
  futureMinimalPatchDraft = [ordered]@{
    targetFile = $PrimaryTargetFile
    importPathSuggestion = $(if ($PrimaryTargetFile -eq "src/modules/stream/index.ts") { $HandlerImportPathForStreamIndexTs } elseif ($PrimaryTargetFile -eq "src/server.ts") { $HandlerImportPathForServerTs } else { $HandlerImportPathForAppTs })
    futureImports = @(
      "createStreamFoundationLiveStartRuntimeHandlerDraftDecision",
      "createStreamFoundationLiveStopRuntimeHandlerDraftDecision",
      "createStreamFoundationLiveHeartbeatRuntimeHandlerDraftDecision"
    )
    routeToDraftHandlerMap = @(
      [ordered]@{
        route = "/api/stream/live/start"
        futureDecisionFactory = "createStreamFoundationLiveStartRuntimeHandlerDraftDecision"
        mustReturnStatusCode = 423
      },
      [ordered]@{
        route = "/api/stream/live/stop"
        futureDecisionFactory = "createStreamFoundationLiveStopRuntimeHandlerDraftDecision"
        mustReturnStatusCode = 423
      },
      [ordered]@{
        route = "/api/stream/live/heartbeat"
        futureDecisionFactory = "createStreamFoundationLiveHeartbeatRuntimeHandlerDraftDecision"
        mustReturnStatusCode = 423
      }
    )
    patchInstructions = @(
      "Add runtime handler draft import only in the exact target file after a separate owner approval.",
      "Route handler must call the draft decision factory and respond with decision.statusCode.",
      "Response body must remain blocked/source-only; do not create room/session/provider success.",
      "After future target patch, run compile first, then controlled blocked-route runtime verification separately.",
      "Do not add DB writes, provider calls, Wallet mutations, payment authorization, payout, money movement, or fake success."
    )
  }
}

$TargetWriteSafety = [ordered]@{
  targetFileWritePerformed = 0
  sourceMutationPerformed = 0
  backendRestartPerformed = 0
  runtimeHttpPerformedBy142L = 0
  runtimePostPerformedBy142L = 0
  routeBindingChanged = 0
  routeBehaviorChanged = 0
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

$Ok = (
  $ExactTargetDetected -and
  $RuntimeHandlerMissingOrBad.Count -eq 0 -and
  $CompileOk
)

$FinishedAt = (Get-Date).ToUniversalTime().ToString("o")

$Report = [ordered]@{
  version = $Version
  stage = $Stage
  startedAt = $StartedAt
  finishedAt = $FinishedAt
  ok = $Ok
  status = $(if ($Ok) { "controlled_target_write_preflight_and_patch_draft_ready" } else { "controlled_target_write_preflight_and_patch_draft_blocked" })
  ownerApprovalAccepted = $true
  ownerApprovalText = $OwnerApprovalText
  runtimeHandlerReadiness = [ordered]@{
    total = $RuntimeHandlerReadinessResults.Count
    passed = @($RuntimeHandlerReadinessResults | Where-Object { $_.ok }).Count
    failed = $RuntimeHandlerMissingOrBad.Count
    failedItems = $RuntimeHandlerMissingOrBad
  }
  exactTargetDetection = [ordered]@{
    ok = $ExactTargetDetected
    primaryTargetFile = $PrimaryTargetFile
    targetCandidates = $RoutesByTarget
    routeContextsFound = $RouteContexts.Count
    routeContexts = $RouteContexts
    existingBlockedHandlerEvidence = $ExistingBlockedHandlerEvidence
  }
  patchDraft = $PatchDraft
  tscResult = $TscResult
  safety = [ordered]@{
    targetWriteSafety = $TargetWriteSafety
    runtimeSafety = $RuntimeSafety
  }
  nextRecommendedStage = "BACKEND-STREAM-FOUNDATION-142M controlled target patch execution approval package"
}

if ($WriteReport) {
  $reportParent = Split-Path -Parent $ReportPath
  if ($reportParent -and -not (Test-Path -LiteralPath $reportParent)) {
    New-Item -ItemType Directory -Force -Path $reportParent | Out-Null
  }
  $Report | ConvertTo-Json -Depth 30 | Set-Content -LiteralPath $ReportPath -Encoding UTF8
}

$Report | ConvertTo-Json -Depth 30

if (-not $Ok) {
  exit 1
}
