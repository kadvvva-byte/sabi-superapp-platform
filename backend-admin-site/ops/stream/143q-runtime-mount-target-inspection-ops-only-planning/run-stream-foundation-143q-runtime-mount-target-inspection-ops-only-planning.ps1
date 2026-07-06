param(
  [switch]$RunTsc,
  [switch]$WriteReport,
  [string]$ReportPath = ".data\stream\backend-stream-foundation-143q-runtime-mount-target-inspection-ops-only-planning-result.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Version = "BACKEND-STREAM-FOUNDATION-143Q"
$Stage = "runtime_mount_target_inspection_ops_only_planning"
$StartedAt = (Get-Date).ToUniversalTime().ToString("o")

$OwnerApprovalText = "I approve BACKEND-STREAM-FOUNDATION-143Q controlled runtime mount target inspection ops-only planning package, create an ops-only read-only planning runner for candidate target file inspection, mount marker inspection, auth boundary inspection, stream route factory inspection, blocked live write route preservation inspection, rollback hash preview, and compile gate planning, do not modify source, do not write src/app.ts, do not write src/server.ts, do not write src/modules/stream/index.ts, do not write prisma/schema.prisma, do not create migration, do not restart backend, no runtime POST, no runtime DB read/write, no provider call, no provider secret read, no realtime socket open, no realtime broadcast, no moderation bypass, no runtime mount, no route behavior change, no target route write, no rollback execution, no post-mount smoke, no Wallet mutation, no payment authorization, no monthly payout, no money movement, no fake success."

$RequiredApprovalTextFor143R = "I approve BACKEND-STREAM-FOUNDATION-143R controlled runtime mount target inspection post-run handoff source-only, use 143Q ops-only read-only inspection evidence to prepare the next safe runtime mount target diff review planning batch without source target writes, without prisma schema write, without migration, without backend restart, without runtime POST, without runtime DB read/write, without provider call, without provider secret read, without realtime socket open, without realtime broadcast, without moderation bypass, without runtime mount, without route behavior change, without target route write, without rollback execution, without post-mount smoke, without Wallet mutation, without payment authorization, without monthly payout, without money movement, and without fake success."

function Read-TextFile {
  param([string]$Path)
  if (-not (Test-Path -LiteralPath $Path)) {
    return ""
  }
  return Get-Content -LiteralPath $Path -Raw -Encoding UTF8
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

function Find-PatternLines {
  param(
    [string]$Path,
    [string[]]$Patterns,
    [int]$MaxPerPattern = 20
  )

  $result = @()
  if (-not (Test-Path -LiteralPath $Path)) {
    return $result
  }

  $lines = @(Get-Content -LiteralPath $Path -Encoding UTF8)
  foreach ($pattern in $Patterns) {
    $matches = @()
    for ($i = 0; $i -lt $lines.Count; $i++) {
      if (($lines[$i]).IndexOf($pattern, [StringComparison]::OrdinalIgnoreCase) -ge 0) {
        $matches += [ordered]@{
          line = $i + 1
          preview = ($lines[$i]).Trim()
        }
        if ($matches.Count -ge $MaxPerPattern) {
          break
        }
      }
    }

    $result += [ordered]@{
      pattern = $pattern
      count = $matches.Count
      matches = $matches
    }
  }

  return $result
}

function Inspect-CandidateTarget {
  param(
    [string]$Id,
    [string]$Path,
    [string]$Role,
    [string[]]$Patterns
  )

  $exists = Test-Path -LiteralPath $Path
  $content = Read-TextFile -Path $Path
  $lineCount = 0
  $sizeBytes = 0

  if ($exists) {
    $lineCount = @((Get-Content -LiteralPath $Path -Encoding UTF8)).Count
    $sizeBytes = (Get-Item -LiteralPath $Path).Length
  }

  return [ordered]@{
    id = $Id
    path = $Path
    role = $Role
    exists = $exists
    sha256 = Get-SafeFileHash -Path $Path
    sizeBytes = $sizeBytes
    lineCount = $lineCount
    sourceWriteAllowed = $false
    targetRouteWriteAllowed = $false
    runtimeMountAllowed = $false
    routeBehaviorChangeAllowed = $false
    backendRestartAllowed = $false
    patternInspection = Find-PatternLines -Path $Path -Patterns $Patterns
    containsBackendStreamFoundation143QReference = $content.Contains("BACKEND-STREAM-FOUNDATION-143Q")
    containsRuntimeMountTargetInspectionReference = $content.Contains("runtime-mount-target-inspection")
  }
}

$CandidateTargets = @(
  [ordered]@{
    id = "src_app_ts"
    path = "src/app.ts"
    role = "application bootstrap candidate"
    patterns = @("app.use", "router.use", "/api/stream", "stream", "admin", "auth", "routes")
  },
  [ordered]@{
    id = "src_server_ts"
    path = "src/server.ts"
    role = "server bootstrap candidate"
    patterns = @("listen", "app", "server", "routes", "stream", "/api")
  },
  [ordered]@{
    id = "stream_index_ts"
    path = "src/modules/stream/index.ts"
    role = "Stream module export boundary candidate"
    patterns = @("export", "route", "Stream", "live", "foundation")
  },
  [ordered]@{
    id = "admin_routes_ts"
    path = "src/modules/admin/admin.routes.ts"
    role = "protected Admin route boundary candidate"
    patterns = @("admin", "auth", "middleware", "router", "use", "protect", "token")
  },
  [ordered]@{
    id = "stream_routes_ts"
    path = "src/modules/stream/infrastructure/routes/stream.routes.ts"
    role = "Stream route factory candidate"
    patterns = @("router", "route", "live", "start", "stop", "heartbeat", "423", "safe", "disabled", "blocked")
  },
  [ordered]@{
    id = "stream_live_routes_ts"
    path = "src/modules/stream/infrastructure/routes/stream-live.routes.ts"
    role = "Stream live write route candidate"
    patterns = @("router", "live", "start", "stop", "heartbeat", "423", "provider_not_configured", "blocked")
  }
)

$CandidateInspection = @()
foreach ($candidate in $CandidateTargets) {
  $CandidateInspection += Inspect-CandidateTarget -Id $candidate.id -Path $candidate.path -Role $candidate.role -Patterns $candidate.patterns
}

$ExistingCandidateTargets = @($CandidateInspection | Where-Object { $_.exists -eq $true })

$MountMarkerPatterns = @(
  "app.use",
  "router.use",
  "router.post",
  "router.get",
  "/api/stream",
  "/api/admin",
  "createStreamRoutes",
  "createStreamRouter",
  "streamRoutes",
  "streamLive",
  "live/start",
  "live/stop",
  "heartbeat",
  "adminAuth",
  "authMiddleware",
  "requireAdmin",
  "verifyAdmin",
  "ADMIN_PANEL_TOKEN",
  "safe-disabled",
  "safe_disabled",
  "provider_not_configured",
  "423"
)

$MountMarkerInspection = @()
foreach ($candidate in $CandidateInspection) {
  if ($candidate.exists -eq $true) {
    $MountMarkerInspection += [ordered]@{
      targetId = $candidate.id
      path = $candidate.path
      sourceWriteAllowed = $false
      markerWriteAllowed = $false
      runtimeMountAllowed = $false
      routeBehaviorChangeAllowed = $false
      matches = Find-PatternLines -Path $candidate.path -Patterns $MountMarkerPatterns -MaxPerPattern 25
    }
  }
}

$AuthBoundaryPatterns = @(
  "adminAuth",
  "authMiddleware",
  "requireAdmin",
  "verifyAdmin",
  "admin_access_denied",
  "ADMIN_PANEL_TOKEN",
  "Authorization",
  "Bearer",
  "roles",
  "permission",
  "middleware"
)

$AuthBoundaryInspection = @()
foreach ($candidate in $CandidateInspection) {
  if ($candidate.exists -eq $true -and ($candidate.id -eq "src_app_ts" -or $candidate.id -eq "admin_routes_ts")) {
    $AuthBoundaryInspection += [ordered]@{
      targetId = $candidate.id
      path = $candidate.path
      authBoundaryReadOnly = $true
      authBypassAllowed = $false
      routeOrderChangeAllowed = $false
      matches = Find-PatternLines -Path $candidate.path -Patterns $AuthBoundaryPatterns -MaxPerPattern 25
    }
  }
}

$StreamRouteFactoryPatterns = @(
  "createStream",
  "streamRoutes",
  "router",
  "Router",
  "live",
  "start",
  "stop",
  "heartbeat",
  "safe",
  "disabled",
  "provider_not_configured",
  "423"
)

$StreamRouteFactoryInspection = @()
foreach ($candidate in $CandidateInspection) {
  if ($candidate.exists -eq $true -and ($candidate.id -eq "stream_index_ts" -or $candidate.id -eq "stream_routes_ts" -or $candidate.id -eq "stream_live_routes_ts")) {
    $StreamRouteFactoryInspection += [ordered]@{
      targetId = $candidate.id
      path = $candidate.path
      importWriteAllowed = $false
      runtimeMountAllowed = $false
      routeBehaviorChangeAllowed = $false
      matches = Find-PatternLines -Path $candidate.path -Patterns $StreamRouteFactoryPatterns -MaxPerPattern 25
    }
  }
}

$BlockedRoutePatterns = @(
  "live/start",
  "live/stop",
  "heartbeat",
  "423",
  "provider_not_configured",
  "safe_disabled",
  "safe-disabled",
  "blocked",
  "ok: false",
  "runtime_mount",
  "not_configured"
)

$BlockedLiveWriteRoutePreservationInspection = @()
foreach ($candidate in $CandidateInspection) {
  if ($candidate.exists -eq $true -and ($candidate.id -eq "stream_routes_ts" -or $candidate.id -eq "stream_live_routes_ts" -or $candidate.id -eq "stream_index_ts")) {
    $BlockedLiveWriteRoutePreservationInspection += [ordered]@{
      targetId = $candidate.id
      path = $candidate.path
      liveSuccessAllowed = $false
      runtimeMountAllowed = $false
      routeBehaviorChangeAllowed = $false
      targetRouteWriteAllowed = $false
      requiredStatusCodeNow = 423
      matches = Find-PatternLines -Path $candidate.path -Patterns $BlockedRoutePatterns -MaxPerPattern 25
    }
  }
}

$RollbackHashPreview = @()
foreach ($candidate in $CandidateInspection) {
  if ($candidate.exists -eq $true) {
    $RollbackHashPreview += [ordered]@{
      targetId = $candidate.id
      path = $candidate.path
      sha256 = $candidate.sha256
      sizeBytes = $candidate.sizeBytes
      rollbackExecutionAllowed = $false
      targetWriteAllowed = $false
      backendRestartAllowed = $false
    }
  }
}

$TargetDiffPreviewPlan = [ordered]@{
  planned = $true
  applied = $false
  targetWriteAllowed = $false
  exactInsertionMarkerRequired = $true
  duplicateMountRiskReviewRequired = $true
  authBoundaryPreservationRequired = $true
  blockedRoutePreservationRequired = $true
  rollbackPlanRequired = $true
}

$CompileGatePlanning = [ordered]@{
  planned = $true
  runTscRequested = [bool]$RunTsc
  command = "npx tsc --noEmit"
  sourceModificationAllowed = $false
  runtimeHttpAllowed = $false
  backendRestartAllowed = $false
  tscResult = [ordered]@{
    runTsc = [bool]$RunTsc
    exitCode = $null
    outputTail = @()
  }
}

if ($RunTsc) {
  $tscOutput = @()
  $tscOutput = & cmd /c "npx tsc --noEmit" 2>&1
  $CompileGatePlanning.tscResult.exitCode = $LASTEXITCODE
  $CompileGatePlanning.tscResult.outputTail = @($tscOutput | Select-Object -Last 260)
}

$ForbiddenTargetReferenceFiles = @(
  "src/app.ts",
  "src/server.ts",
  "src/modules/stream/index.ts",
  "prisma/schema.prisma"
)

$ForbiddenTargetReferenceVerification = @()
foreach ($path in $ForbiddenTargetReferenceFiles) {
  $text = Read-TextFile -Path $path
  $contains143Q = $text.Contains("BACKEND-STREAM-FOUNDATION-143Q") -or $text.Contains("stream143q") -or $text.Contains("runtime-mount-target-inspection")
  $ForbiddenTargetReferenceVerification += [ordered]@{
    path = $path
    exists = (Test-Path -LiteralPath $path)
    contains143QReference = $contains143Q
    ok = (-not $contains143Q)
  }
}
$ForbiddenTargetReferenceFailures = @($ForbiddenTargetReferenceVerification | Where-Object { $_.ok -ne $true })

$MigrationPathHits = @()
$MigrationDirs = @("prisma/migrations", "migrations")
foreach ($dir in $MigrationDirs) {
  if (Test-Path -LiteralPath $dir) {
    $hits = @(
      Get-ChildItem -LiteralPath $dir -Recurse -File |
        Where-Object {
          $_.Name.Contains("143q") -or
          $_.Name.Contains("stream") -or
          (Read-TextFile -Path $_.FullName).Contains("BACKEND-STREAM-FOUNDATION-143Q")
        } |
        ForEach-Object { Get-RelativePath -Path $_.FullName }
    )
    $MigrationPathHits += $hits
  }
}
$MigrationPathHits = @($MigrationPathHits | Select-Object -Unique)

$Safety = [ordered]@{
  sourceModificationPerformed = 0
  sourceTargetWritePerformed = 0
  appTsWritePerformed = 0
  serverTsWritePerformed = 0
  streamIndexWritePerformed = 0
  prismaSchemaWritePerformed = 0
  migrationCreated = 0
  backendRestartPerformed = 0
  runtimeHttpPerformedBy143Q = 0
  runtimePostPerformedBy143Q = 0
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
  rollbackExecutionPerformed = 0
  postMountSmokePerformed = 0
  walletMutationPerformed = 0
  paymentAuthorizationPerformed = 0
  monthlyPayoutPerformed = 0
  moneyMovementPerformed = 0
  fakeSuccessAllowed = $false
}

$TscOk = (-not $RunTsc) -or ($CompileGatePlanning.tscResult.exitCode -eq 0)
$Ok = (
  $TscOk -and
  $ForbiddenTargetReferenceFailures.Count -eq 0 -and
  $MigrationPathHits.Count -eq 0
)

$FinishedAt = (Get-Date).ToUniversalTime().ToString("o")

$Report = [ordered]@{
  version = $Version
  stage = $Stage
  startedAt = $StartedAt
  finishedAt = $FinishedAt
  ok = $Ok
  status = $(if ($Ok) { "runtime_mount_target_inspection_ops_only_planning_passed" } else { "runtime_mount_target_inspection_ops_only_planning_blocked" })
  ownerApprovalAccepted = $true
  ownerApprovalText = $OwnerApprovalText
  requiredApprovalTextFor143R = $RequiredApprovalTextFor143R
  inspectionPolicy = [ordered]@{
    readOnlyOps = $true
    sourceModificationAllowed = $false
    sourceTargetWriteAllowed = $false
    runtimeHttpAllowed = $false
    runtimePostAllowed = $false
    runtimeMountAllowed = $false
    routeBehaviorChangeAllowed = $false
    targetRouteWriteAllowed = $false
    rollbackExecutionAllowed = $false
    postMountSmokeAllowed = $false
    fakeSuccessAllowed = $false
  }
  candidateTargetFileInspection = [ordered]@{
    totalCandidates = $CandidateInspection.Count
    existingCandidates = $ExistingCandidateTargets.Count
    candidates = $CandidateInspection
  }
  mountMarkerInspection = [ordered]@{
    inspectedTargets = $MountMarkerInspection.Count
    markerPatterns = $MountMarkerPatterns
    results = $MountMarkerInspection
  }
  authBoundaryInspection = [ordered]@{
    inspectedTargets = $AuthBoundaryInspection.Count
    patterns = $AuthBoundaryPatterns
    results = $AuthBoundaryInspection
  }
  streamRouteFactoryInspection = [ordered]@{
    inspectedTargets = $StreamRouteFactoryInspection.Count
    patterns = $StreamRouteFactoryPatterns
    results = $StreamRouteFactoryInspection
  }
  blockedLiveWriteRoutePreservationInspection = [ordered]@{
    inspectedTargets = $BlockedLiveWriteRoutePreservationInspection.Count
    requiredStatusCodeNow = 423
    liveSuccessAllowed = $false
    routeBehaviorChangeAllowed = $false
    results = $BlockedLiveWriteRoutePreservationInspection
  }
  rollbackHashPreview = [ordered]@{
    previewOnly = $true
    rollbackExecutionAllowed = $false
    targetWriteAllowed = $false
    targets = $RollbackHashPreview
  }
  targetDiffPreviewPlan = $TargetDiffPreviewPlan
  compileGatePlanning = $CompileGatePlanning
  targetReferenceVerification = [ordered]@{
    forbiddenTargetFiles = $ForbiddenTargetReferenceVerification
    failed = $ForbiddenTargetReferenceFailures.Count
    ok = ($ForbiddenTargetReferenceFailures.Count -eq 0)
  }
  migrationVerification = [ordered]@{
    migrationPathHits = $MigrationPathHits
    ok = ($MigrationPathHits.Count -eq 0)
  }
  safety = $Safety
  nextRecommendedStage = $(if ($Ok) { "BACKEND-STREAM-FOUNDATION-143R controlled runtime mount target inspection post-run handoff source-only after exact approval" } else { "Review 143Q report before any next stage" })
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
