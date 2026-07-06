param(
  [switch]$WriteReport,
  [string]$ReportPath = ".data\stream\backend-stream-foundation-144j-evidence-capture-result.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Version = "BACKEND-STREAM-FOUNDATION-144J"
$Stage = "ops_only_evidence_capture_runner_read_only"
$StartedAt = (Get-Date).ToUniversalTime().ToString("o")

$OwnerApprovalText = "I approve BACKEND-STREAM-FOUNDATION-144J controlled ops-only evidence capture runner package build source-only, use 144I verification evidence to create a short-path ops-only runner package that can read target file hashes/excerpts and inspect route/auth/blocked-route anchors for evidence only, without source target writes, without prisma schema write, without migration, without backend restart, without runtime POST, without runtime DB read/write, without provider call, without provider secret read, without realtime socket open, without realtime broadcast, without moderation bypass, without runtime mount, without route behavior change, without target route write, without rollback execution, without post-mount smoke, without Wallet mutation, without payment authorization, without monthly payout, without money movement, and without fake success."

$RequiredApprovalTextFor144K = "I approve BACKEND-STREAM-FOUNDATION-144K controlled ops-only evidence capture runner execution, run the 144J short-path evidence capture runner to read target file hashes/excerpts and inspect route/auth/blocked-route anchors for evidence only and write the evidence report under .data/stream, without source target writes, without prisma schema write, without migration, without backend restart, without runtime POST, without runtime DB read/write, without provider call, without provider secret read, without realtime socket open, without realtime broadcast, without moderation bypass, without runtime mount, without route behavior change, without target route write, without rollback execution, without post-mount smoke, without Wallet mutation, without payment authorization, without monthly payout, without money movement, and without fake success."

$TargetFiles = @(
  @{ id = "src_app_ts"; path = "src/app.ts"; role = "application bootstrap" },
  @{ id = "src_server_ts"; path = "src/server.ts"; role = "server bootstrap" },
  @{ id = "stream_index_ts"; path = "src/modules/stream/index.ts"; role = "Stream module export boundary" },
  @{ id = "admin_routes_ts"; path = "src/modules/admin/admin.routes.ts"; role = "Admin protected route boundary" },
  @{ id = "stream_routes_ts"; path = "src/modules/stream/infrastructure/routes/stream.routes.ts"; role = "Stream route factory candidate" },
  @{ id = "stream_live_routes_ts"; path = "src/modules/stream/infrastructure/routes/stream-live.routes.ts"; role = "Stream live route candidate" }
)

$AnchorPatterns = @(
  @{ id = "stream_mount_anchor"; patterns = @("stream", "Stream", "/stream", "streamRoutes", "streamRouter") },
  @{ id = "stream_live_start_anchor"; patterns = @("live/start", "/start", "start", "stream_live_start", "startLive", "liveStart") },
  @{ id = "stream_live_stop_anchor"; patterns = @("live/stop", "/stop", "stop", "stream_live_stop", "stopLive", "liveStop") },
  @{ id = "stream_live_heartbeat_anchor"; patterns = @("heartbeat", "/heartbeat", "stream_live_heartbeat", "liveHeartbeat") },
  @{ id = "route_factory_anchor"; patterns = @("Router", "router", "routes", "create", "mount", "app.use") },
  @{ id = "auth_boundary_anchor"; patterns = @("auth", "Auth", "admin", "Admin", "token", "Token", "guard", "middleware") },
  @{ id = "blocked_route_anchor"; patterns = @("423", "provider_not_configured", "safe_disabled", "blocked", "locked", "NOT_CONFIGURED") }
)

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

function Convert-ToSafeExcerptLine {
  param([string]$Line)

  $secretLike = @(
    "SECRET",
    "TOKEN",
    "PASSWORD",
    "PRIVATE",
    "API_KEY",
    "ACCESS_KEY",
    "AUTHORIZATION",
    "BEARER",
    "CLIENT_SECRET",
    "PROVIDER_SECRET",
    "process.env"
  )

  foreach ($marker in $secretLike) {
    if ($Line.ToUpperInvariant().Contains($marker)) {
      return "[REDACTED_SECRET_OR_ENV_LINE]"
    }
  }

  if ($Line.Length -gt 260) {
    return $Line.Substring(0, 260) + "..."
  }

  return $Line
}

function Get-FirstAnchorEvidence {
  param(
    [string]$Path,
    [string]$Text,
    [array]$AnchorPatternObjects
  )

  if ([string]::IsNullOrWhiteSpace($Text)) {
    return @()
  }

  [string[]]$lines = @($Text -split "`r?`n")
  $lineTotal = @($lines).Length
  $anchors = @()

  foreach ($anchor in $AnchorPatternObjects) {
    $matchIndex = -1
    $matchedPattern = $null

    for ($i = 0; $i -lt $lineTotal; $i++) {
      foreach ($pattern in $anchor.patterns) {
        if ($lines[$i].Contains($pattern)) {
          $matchIndex = $i
          $matchedPattern = $pattern
          break
        }
      }
      if ($matchIndex -ge 0) { break }
    }

    if ($matchIndex -ge 0) {
      $start = [Math]::Max(0, $matchIndex - 4)
      $end = [Math]::Min($lineTotal - 1, $matchIndex + 4)
      $excerpt = @()
      for ($lineNo = $start; $lineNo -le $end; $lineNo++) {
        $excerpt += [ordered]@{
          line = $lineNo + 1
          text = Convert-ToSafeExcerptLine -Line $lines[$lineNo]
        }
      }

      $anchors += [ordered]@{
        anchorId = $anchor.id
        found = $true
        matchedPattern = $matchedPattern
        line = $matchIndex + 1
        excerpt = $excerpt
      }
    } else {
      $anchors += [ordered]@{
        anchorId = $anchor.id
        found = $false
        matchedPattern = $null
        line = $null
        excerpt = @()
      }
    }
  }

  return $anchors
}

function Get-StringCount {
  param(
    [string]$Text,
    [string]$Pattern
  )

  if ([string]::IsNullOrEmpty($Text) -or [string]::IsNullOrEmpty($Pattern)) {
    return 0
  }

  return ([regex]::Matches($Text, [regex]::Escape($Pattern))).Count
}

function Get-FirstAnchorOrEmpty {
  param(
    [object[]]$Anchors,
    [string]$AnchorId
  )

  $matches = @($Anchors | Where-Object { $_.anchorId -eq $AnchorId })
  if (@($matches).Length -gt 0) {
    return $matches[0]
  }

  return [ordered]@{
    anchorId = $AnchorId
    found = $false
    matchedPattern = $null
    line = $null
    excerpt = @()
  }
}

$TargetEvidence = @()
foreach ($target in $TargetFiles) {
  $path = [string]$target.path
  $exists = Test-Path -LiteralPath $path
  $text = Read-TextFile -Path $path
  [string[]]$lines = @()
  if ($text.Length -gt 0) {
    $lines = [string[]]@($text -split "`r?`n")
  }

  $TargetEvidence += [ordered]@{
    id = $target.id
    path = $path
    role = $target.role
    exists = $exists
    sha256 = Get-SafeFileHash -Path $path
    sizeBytes = $(if ($exists) { (Get-Item -LiteralPath $path).Length } else { $null })
    lineCount = @($lines).Length
    anchors = Get-FirstAnchorEvidence -Path $path -Text $text -AnchorPatternObjects $AnchorPatterns
    routeSignatureCounts = [ordered]@{
      appUse = Get-StringCount -Text $text -Pattern "app.use"
      routerUse = Get-StringCount -Text $text -Pattern "router.use"
      appPost = Get-StringCount -Text $text -Pattern "app.post"
      routerPost = Get-StringCount -Text $text -Pattern "router.post"
      dotPost = Get-StringCount -Text $text -Pattern ".post"
      liveStart = (Get-StringCount -Text $text -Pattern "start") + (Get-StringCount -Text $text -Pattern "live/start")
      liveStop = (Get-StringCount -Text $text -Pattern "stop") + (Get-StringCount -Text $text -Pattern "live/stop")
      liveHeartbeat = Get-StringCount -Text $text -Pattern "heartbeat"
      status423 = Get-StringCount -Text $text -Pattern "423"
      providerNotConfigured = (Get-StringCount -Text $text -Pattern "provider_not_configured") + (Get-StringCount -Text $text -Pattern "PROVIDER_NOT_CONFIGURED")
      safeDisabled = (Get-StringCount -Text $text -Pattern "safe_disabled") + (Get-StringCount -Text $text -Pattern "SAFE_DISABLED")
    }
  }
}

$AllTextByTarget = @{}
foreach ($target in $TargetFiles) {
  $AllTextByTarget[[string]$target.path] = Read-TextFile -Path ([string]$target.path)
}

$DuplicateMountInventory = [ordered]@{
  checkedPaths = @($TargetFiles | ForEach-Object { $_.path })
  streamRouteReferences = @(
    $TargetEvidence | ForEach-Object {
      [ordered]@{
        path = $_.path
        streamWordCount = Get-StringCount -Text $AllTextByTarget[$_.path] -Pattern "stream"
        liveWordCount = Get-StringCount -Text $AllTextByTarget[$_.path] -Pattern "live"
        appUseCount = $_.routeSignatureCounts.appUse
        routerUseCount = $_.routeSignatureCounts.routerUse
        appPostCount = $_.routeSignatureCounts.appPost
        routerPostCount = $_.routeSignatureCounts.routerPost
        dotPostCount = $_.routeSignatureCounts.dotPost
      }
    }
  )
  duplicateRiskDecision = "evidence_only_no_patch_decision"
  duplicateMountAllowed = $false
  runtimeMountAllowed = $false
  routeBehaviorChangeAllowed = $false
}

$AuthBoundaryEvidence = [ordered]@{
  evidenceOnly = $true
  targetPaths = @("src/modules/admin/admin.routes.ts", "src/app.ts", "src/server.ts")
  authReferences = @(
    $TargetEvidence |
      Where-Object { @("src/modules/admin/admin.routes.ts", "src/app.ts", "src/server.ts") -contains $_.path } |
      ForEach-Object {
        [ordered]@{
          path = $_.path
          authAnchor = Get-FirstAnchorOrEmpty -Anchors @($_.anchors) -AnchorId "auth_boundary_anchor"
        }
      }
  )
  authBypassAllowed = $false
  authRouteOrderChangeAllowed = $false
}

$BlockedRouteEvidence = [ordered]@{
  evidenceOnly = $true
  routeIds = @("stream_live_start", "stream_live_stop", "stream_live_heartbeat")
  expectedStatusCodeBeforeRuntimeMount = 423
  targetPaths = @("src/modules/stream/infrastructure/routes/stream-live.routes.ts", "src/modules/stream/infrastructure/routes/stream.routes.ts")
  blockedRouteReferences = @(
    $TargetEvidence |
      Where-Object { @("src/modules/stream/infrastructure/routes/stream-live.routes.ts", "src/modules/stream/infrastructure/routes/stream.routes.ts") -contains $_.path } |
      ForEach-Object {
        [ordered]@{
          path = $_.path
          status423Count = $_.routeSignatureCounts.status423
          providerNotConfiguredCount = $_.routeSignatureCounts.providerNotConfigured
          safeDisabledCount = $_.routeSignatureCounts.safeDisabled
          blockedAnchor = Get-FirstAnchorOrEmpty -Anchors @($_.anchors) -AnchorId "blocked_route_anchor"
        }
      }
  )
  liveSuccessAllowed = $false
  fakeSuccessAllowed = $false
  runtimePostPerformed = 0
}

$RollbackPreviewInputs = [ordered]@{
  evidenceOnly = $true
  prePatchHashes = @(
    $TargetEvidence | ForEach-Object {
      [ordered]@{
        path = $_.path
        sha256 = $_.sha256
      }
    }
  )
  rollbackExecutionAllowed = $false
  rollbackExecutionPerformed = 0
}

$Safety = [ordered]@{
  sourceModificationPerformed = 0
  backendRestartPerformed = 0
  runtimeHttpPerformedBy144J = 0
  runtimePostPerformedBy144J = 0
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
  targetFileReadPerformedForEvidenceOnly = 1
  targetHashCapturedForEvidenceOnly = 1
  targetExcerptCapturedForEvidenceOnly = 1
  rollbackExecutionPerformed = 0
  postMountSmokePerformed = 0
  walletMutationPerformed = 0
  paymentAuthorizationPerformed = 0
  monthlyPayoutPerformed = 0
  moneyMovementPerformed = 0
  fakeSuccessAllowed = $false
}

$Ok = (
  @($TargetEvidence | Where-Object { $_.exists -eq $true }).Length -ge 1 -and
  $Safety.sourceModificationPerformed -eq 0 -and
  $Safety.backendRestartPerformed -eq 0 -and
  $Safety.runtimePostPerformedBy144J -eq 0 -and
  $Safety.runtimeDbReadPerformed -eq 0 -and
  $Safety.runtimeDbWritePerformed -eq 0 -and
  $Safety.providerCallPerformed -eq 0 -and
  $Safety.providerSecretReadPerformed -eq 0 -and
  $Safety.realtimeSocketOpenPerformed -eq 0 -and
  $Safety.runtimeMountPerformed -eq 0 -and
  $Safety.routeBehaviorChangePerformed -eq 0 -and
  $Safety.targetRouteWritePerformed -eq 0 -and
  $Safety.rollbackExecutionPerformed -eq 0 -and
  $Safety.walletMutationPerformed -eq 0 -and
  $Safety.moneyMovementPerformed -eq 0 -and
  $Safety.fakeSuccessAllowed -eq $false
)

$FinishedAt = (Get-Date).ToUniversalTime().ToString("o")

$Report = [ordered]@{
  version = $Version
  stage = $Stage
  startedAt = $StartedAt
  finishedAt = $FinishedAt
  ok = $Ok
  status = $(if ($Ok) { "ops_only_evidence_capture_runner_completed" } else { "ops_only_evidence_capture_runner_blocked" })
  ownerApprovalAccepted = $true
  ownerApprovalText = $OwnerApprovalText
  evidenceMode = "read_only_target_hashes_excerpts_and_anchor_inspection"
  targetEvidence = $TargetEvidence
  duplicateMountInventory = $DuplicateMountInventory
  authBoundaryEvidence = $AuthBoundaryEvidence
  blockedRouteEvidence = $BlockedRouteEvidence
  rollbackPreviewInputs = $RollbackPreviewInputs
  safety = $Safety
  nextRecommendedStage = $(if ($Ok) { "BACKEND-STREAM-FOUNDATION-144K post-run evidence handoff / source-only after exact approval" } else { "Review 144J evidence capture report before any next stage" })
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
