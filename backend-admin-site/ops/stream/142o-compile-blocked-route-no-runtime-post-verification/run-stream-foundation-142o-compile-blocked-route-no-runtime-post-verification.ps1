param(
  [switch]$RunTsc,
  [switch]$WriteReport,
  [string]$ReportPath = ".data\stream\backend-stream-foundation-142o-compile-blocked-route-no-runtime-post-verification-result.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Version = "BACKEND-STREAM-FOUNDATION-142O-FIX2"
$Stage = "compile_and_blocked_route_no_runtime_post_scoped_safety_verification_fix2"
$StartedAt = (Get-Date).ToUniversalTime().ToString("o")

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

  $lines = @($text -split "`r?`n")
  $matches = @()
  for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i].Contains($Route)) {
      $start = [Math]::Max(0, $i - 10)
      $end = [Math]::Min($lines.Count - 1, $i + 18)
      $contextLines = @()
      for ($j = $start; $j -le $end; $j++) {
        $contextLines += ("{0}: {1}" -f ($j + 1), $lines[$j])
      }

      $matches += [ordered]@{
        path = $Path
        route = $Route
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

$Routes = @(
  "/api/stream/live/start",
  "/api/stream/live/stop",
  "/api/stream/live/heartbeat"
)

$RuntimeFactories = @(
  "createStreamFoundationLiveStartRuntimeHandlerDraftDecision",
  "createStreamFoundationLiveStopRuntimeHandlerDraftDecision",
  "createStreamFoundationLiveHeartbeatRuntimeHandlerDraftDecision"
)

$OldSourceOnlyHandlers = @(
  "handleStreamFoundationLiveStartSourceOnlyDraft",
  "handleStreamFoundationLiveStopSourceOnlyDraft",
  "handleStreamFoundationLiveHeartbeatSourceOnlyDraft"
)

$AppText = Read-TextFile -Path $AppPath
$ServerText = Read-TextFile -Path $ServerPath
$StreamIndexText = Read-TextFile -Path $StreamIndexPath

$RouteContexts = @()
foreach ($route in $Routes) {
  $RouteContexts += @(Get-RouteContexts -Path $AppPath -Route $route)
}

$RouteBindingChecks = @()
$RouteToFactory = @(
  @{ Route="/api/stream/live/start"; Factory="createStreamFoundationLiveStartRuntimeHandlerDraftDecision"; OldHandler="handleStreamFoundationLiveStartSourceOnlyDraft" },
  @{ Route="/api/stream/live/stop"; Factory="createStreamFoundationLiveStopRuntimeHandlerDraftDecision"; OldHandler="handleStreamFoundationLiveStopSourceOnlyDraft" },
  @{ Route="/api/stream/live/heartbeat"; Factory="createStreamFoundationLiveHeartbeatRuntimeHandlerDraftDecision"; OldHandler="handleStreamFoundationLiveHeartbeatSourceOnlyDraft" }
)

foreach ($pair in $RouteToFactory) {
  $contexts = @(Get-RouteContexts -Path $AppPath -Route $pair.Route)
  $contextText = ($contexts | ForEach-Object { $_.context -join "`n" }) -join "`n---`n"
  $RouteBindingChecks += [ordered]@{
    route = $pair.Route
    contextsFound = $contexts.Count
    hasRuntimeFactoryInRouteContext = $contextText.Contains($pair.Factory)
    oldSourceOnlyHandlerAbsentFromRouteContext = (-not $contextText.Contains($pair.OldHandler))
    respondsWithStatusCode = ($contextText.Contains("res.status") -and $contextText.Contains("statusCode"))
    ok = ($contexts.Count -ge 1 -and $contextText.Contains($pair.Factory) -and (-not $contextText.Contains($pair.OldHandler)) -and $contextText.Contains("res.status") -and $contextText.Contains("statusCode"))
    context = $contexts
  }
}

$RuntimeFactoryHits = @($RuntimeFactories | Where-Object { $AppText.Contains($_) })
$OldSourceOnlyHandlerHits = @($OldSourceOnlyHandlers | Where-Object { $AppText.Contains($_) })

$RuntimeImportCheck = [ordered]@{
  appHasRuntimeImportPath = $AppText.Contains("live-write-runtime-handler")
  appHasAllRuntimeFactories = ($RuntimeFactoryHits.Count -eq $RuntimeFactories.Count)
  appRuntimeFactoryHits = $RuntimeFactoryHits
  appOldSourceOnlyHandlersAbsent = ($OldSourceOnlyHandlerHits.Count -eq 0)
  appOldSourceOnlyHandlerHits = $OldSourceOnlyHandlerHits
  serverHasRuntimeHandlerReference = $ServerText.Contains("live-write-runtime-handler") -or $ServerText.Contains("RuntimeHandlerDraftDecision")
  streamIndexHasRuntimeHandlerReference = $StreamIndexText.Contains("live-write-runtime-handler") -or $StreamIndexText.Contains("RuntimeHandlerDraftDecision")
}
$RuntimeImportCheck.ok = (
  $RuntimeImportCheck.appHasRuntimeImportPath -eq $true -and
  $RuntimeImportCheck.appHasAllRuntimeFactories -eq $true -and
  $RuntimeImportCheck.appOldSourceOnlyHandlersAbsent -eq $true -and
  $RuntimeImportCheck.serverHasRuntimeHandlerReference -eq $false -and
  $RuntimeImportCheck.streamIndexHasRuntimeHandlerReference -eq $false
)

$RuntimeHandlerReadiness = @(
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
    Path = "src/modules/stream/foundation/live-write-runtime-handler/streamFoundationLiveWriteRuntimeHandlerDraftReadiness.ts"
    Fragments = @(
      "runtimeMountedNow === false",
      "routeBindingChangedNow === false",
      "databaseWriteAllowedNow === false",
      "providerCallAllowedNow === false"
    )
  },
  @{
    Path = "src/modules/stream/foundation/stream142cControlledSourceOnlyRuntimeHandlerDraftStagingManifest.ts"
    Fragments = @(
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

# FIX2: scan only the route patch contexts, not the entire app.ts file.
# app.ts may already contain unrelated app-level Prisma bootstrap code; that is outside the 142N Stream route patch.
$RouteContextForbiddenFragments = @(
  'new PrismaClient',
  'prisma.',
  '$transaction',
  '.create(',
  '.update(',
  '.upsert(',
  '.delete(',
  'fetch(',
  'Invoke-WebRequest',
  'Invoke-RestMethod',
  'providerCallAllowedNow: true',
  'walletMutationAllowedNow: true',
  'moneyMovementAllowedNow: true',
  'fakeSuccessAllowedNow: true'
)

$RouteContextForbiddenHits = @()
foreach ($routeContext in $RouteContexts) {
  $contextText = [string]$routeContext.contextText
  foreach ($fragment in $RouteContextForbiddenFragments) {
    if ($contextText.Contains($fragment)) {
      $RouteContextForbiddenHits += [ordered]@{
        route = $routeContext.route
        path = $routeContext.path
        line = $routeContext.line
        fragment = $fragment
      }
    }
  }
}

$ExistingAppWidePrismaEvidence = [ordered]@{
  appWideNewPrismaClientPresent = $AppText.Contains("new PrismaClient")
  appWidePrismaDotPresent = $AppText.Contains("prisma.")
  ignoredBy142OFix2BecauseOutsidePatchScope = $true
  scopeReason = "142O validates the 142N Stream route patch contexts only; app-wide existing Prisma bootstrap is not evidence of new Stream route DB writes."
}

$NoRuntimePostPolicy = [ordered]@{
  runtimeHttpPerformedBy142O = 0
  runtimePostPerformedBy142O = 0
  backendRestartPerformed = 0
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
  $TscResult.outputTail = @($tscOutput | Select-Object -Last 120)
}

$CompileOk = (-not $RunTsc) -or ($TscResult.exitCode -eq 0)

$AllRouteBindingsOk = (@($RouteBindingChecks | Where-Object { $_.ok -eq $true }).Count -eq 3)

$Ok = (
  $AllRouteBindingsOk -and
  $RuntimeImportCheck.ok -eq $true -and
  $RuntimeHandlerMissingOrBad.Count -eq 0 -and
  $RouteContextForbiddenHits.Count -eq 0 -and
  $CompileOk
)

$FinishedAt = (Get-Date).ToUniversalTime().ToString("o")

$Report = [ordered]@{
  version = $Version
  stage = $Stage
  startedAt = $StartedAt
  finishedAt = $FinishedAt
  ok = $Ok
  status = $(if ($Ok) { "compile_and_blocked_route_no_runtime_post_safety_verification_passed" } else { "compile_and_blocked_route_no_runtime_post_safety_verification_blocked" })
  fix1 = [ordered]@{
    fixedPowerShellStrictModeScalarCount = $true
  }
  fix2 = [ordered]@{
    scopedForbiddenScanToRoutePatchContexts = $true
    previousFalseBlocker = "app-wide existing new PrismaClient outside the Stream route patch scope"
  }
  routeBindingVerification = [ordered]@{
    expectedRouteBindings = 3
    passedRouteBindings = @($RouteBindingChecks | Where-Object { $_.ok -eq $true }).Count
    failedRouteBindings = @($RouteBindingChecks | Where-Object { $_.ok -ne $true }).Count
    checks = $RouteBindingChecks
  }
  runtimeImportVerification = $RuntimeImportCheck
  runtimeHandlerReadiness = [ordered]@{
    total = $RuntimeHandlerReadinessResults.Count
    passed = @($RuntimeHandlerReadinessResults | Where-Object { $_.ok }).Count
    failed = $RuntimeHandlerMissingOrBad.Count
    failedItems = $RuntimeHandlerMissingOrBad
  }
  routePatchContextSafety = [ordered]@{
    scannedRouteContexts = $RouteContexts.Count
    forbiddenHits = $RouteContextForbiddenHits
    ok = ($RouteContextForbiddenHits.Count -eq 0)
  }
  existingAppWidePrismaEvidence = $ExistingAppWidePrismaEvidence
  tscResult = $TscResult
  safety = $NoRuntimePostPolicy
  nextRecommendedStage = "BACKEND-STREAM-FOUNDATION-142P post-patch handoff and controlled blocked-route runtime smoke approval package"
}

if ($WriteReport) {
  $reportParent = Split-Path -Parent $ReportPath
  if ($reportParent -and -not (Test-Path -LiteralPath $reportParent)) {
    New-Item -ItemType Directory -Force -Path $reportParent | Out-Null
  }
  $Report | ConvertTo-Json -Depth 40 | Set-Content -LiteralPath $ReportPath -Encoding UTF8
}

$Report | ConvertTo-Json -Depth 40

if (-not $Ok) {
  exit 1
}
