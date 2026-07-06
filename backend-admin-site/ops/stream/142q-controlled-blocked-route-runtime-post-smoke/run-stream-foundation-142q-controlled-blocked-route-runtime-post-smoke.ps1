param(
  [string]$BaseUrl = "http://127.0.0.1:4001",
  [switch]$RunTsc,
  [switch]$WriteReport,
  [int]$TimeoutSeconds = 15,
  [string]$ReportPath = ".data\stream\backend-stream-foundation-142q-controlled-blocked-route-runtime-post-smoke-result.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Version = "BACKEND-STREAM-FOUNDATION-142Q"
$Stage = "controlled_blocked_route_runtime_post_smoke_only"
$StartedAt = (Get-Date).ToUniversalTime().ToString("o")

$OwnerApprovalText = "I approve BACKEND-STREAM-FOUNDATION-142Q controlled blocked-route runtime POST smoke only, send POST requests only to /api/stream/live/start, /api/stream/live/stop, and /api/stream/live/heartbeat against local backend to verify all three still return 423 blocked after 142N, do not restart backend, no DB write, no provider call, no Wallet mutation, no payment authorization, no monthly payout, no money movement, no fake success."

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

function Invoke-ControlledPost {
  param(
    [string]$Url,
    [hashtable]$Body,
    [int]$TimeoutSeconds
  )

  $jsonBody = $Body | ConvertTo-Json -Depth 8 -Compress
  $statusCode = $null
  $rawBody = ""
  $threw = $false
  $errorMessage = $null

  try {
    $response = Invoke-WebRequest -Uri $Url -Method POST -Body $jsonBody -ContentType "application/json" -TimeoutSec $TimeoutSeconds -UseBasicParsing
    $statusCode = [int]$response.StatusCode
    $rawBody = [string]$response.Content
  } catch {
    $threw = $true
    $errorMessage = $_.Exception.Message

    if ($_.Exception.Response) {
      try {
        $statusCode = [int]$_.Exception.Response.StatusCode
      } catch {
        $statusCode = $null
      }

      try {
        $stream = $_.Exception.Response.GetResponseStream()
        if ($stream) {
          $reader = New-Object System.IO.StreamReader($stream)
          $rawBody = $reader.ReadToEnd()
          $reader.Close()
        }
      } catch {
        if (-not $rawBody) {
          $rawBody = ""
        }
      }
    }
  }

  $parsedBody = $null
  $jsonParseOk = $false
  if ($rawBody -and $rawBody.Trim().Length -gt 0) {
    try {
      $parsedBody = $rawBody | ConvertFrom-Json -ErrorAction Stop
      $jsonParseOk = $true
    } catch {
      $parsedBody = $null
      $jsonParseOk = $false
    }
  }

  return [ordered]@{
    url = $Url
    requestBody = $Body
    statusCode = $statusCode
    threwForNon2xx = $threw
    errorMessage = $errorMessage
    rawBody = $rawBody
    jsonParseOk = $jsonParseOk
    parsedBody = $parsedBody
  }
}

$AllowedRoutes = @(
  [ordered]@{
    id = "stream_live_start"
    path = "/api/stream/live/start"
    expectedStatusCode = 423
  },
  [ordered]@{
    id = "stream_live_stop"
    path = "/api/stream/live/stop"
    expectedStatusCode = 423
  },
  [ordered]@{
    id = "stream_live_heartbeat"
    path = "/api/stream/live/heartbeat"
    expectedStatusCode = 423
  }
)

$ForbiddenRoutePaths = @(
  "/api/wallet",
  "/api/pay",
  "/api/payment",
  "/api/provider",
  "/api/admin",
  "/api/stream/live/create",
  "/api/stream/live/provider",
  "/api/stream/gifts",
  "/api/stream/payout"
)

$RuntimeHandlerReadiness = @(
  @{
    Path = "src/app.ts"
    Fragments = @(
      "createStreamFoundationLiveStartRuntimeHandlerDraftDecision",
      "createStreamFoundationLiveStopRuntimeHandlerDraftDecision",
      "createStreamFoundationLiveHeartbeatRuntimeHandlerDraftDecision",
      "/api/stream/live/start",
      "/api/stream/live/stop",
      "/api/stream/live/heartbeat"
    )
  },
  @{
    Path = "src/modules/stream/foundation/live-write-runtime-handler/streamFoundationLiveWriteRuntimeHandlerDraft.ts"
    Fragments = @(
      "statusCode: 423",
      "databaseWriteAllowedNow: false",
      "providerCallAllowedNow: false",
      "walletMutationAllowedNow: false",
      "moneyMovementAllowedNow: false",
      "fakeSuccessAllowedNow: false"
    )
  }
)

$RuntimeHandlerReadinessResults = @()
foreach ($check in $RuntimeHandlerReadiness) {
  $RuntimeHandlerReadinessResults += Test-ContainsAll -Path $check.Path -Fragments $check.Fragments
}
$RuntimeHandlerMissingOrBad = @($RuntimeHandlerReadinessResults | Where-Object { -not $_.ok })

$BaseUrl = $BaseUrl.TrimEnd("/")
$SmokeResults = @()
$RuntimePostPerformed = 0

foreach ($route in $AllowedRoutes) {
  $safeBody = @{
    actorUserId = "stream-142q-safe-actor"
    roomId = "stream-142q-safe-room"
    clientRequestId = ("stream-142q-" + $route.id)
    deviceSessionId = "stream-142q-safe-device"
    locale = "ru"
  }

  $url = $BaseUrl + $route.path
  $result = Invoke-ControlledPost -Url $url -Body $safeBody -TimeoutSeconds $TimeoutSeconds
  $RuntimePostPerformed += 1

  $bodyText = [string]$result.rawBody
  $forbiddenSuccessFragments = @(
    '"ok":true',
    '"success":true',
    '"liveLaunchReady":true',
    '"runtimeSuccessAllowedNow":true',
    '"providerCallPerformed":true',
    '"walletMutationPerformed":true',
    '"moneyMovementPerformed":true',
    '"fakeSuccess":true',
    '"fakeSuccessAllowed":true',
    '"status":"live"',
    '"status":"started"',
    '"status":"success"'
  )

  $forbiddenHits = @()
  foreach ($fragment in $forbiddenSuccessFragments) {
    if ($bodyText.Replace(" ", "").Contains($fragment.Replace(" ", ""))) {
      $forbiddenHits += $fragment
    }
  }

  $blockedEvidence = (
    $bodyText.ToLowerInvariant().Contains("blocked") -or
    $bodyText.ToLowerInvariant().Contains("source_only") -or
    $bodyText.ToLowerInvariant().Contains("not_configured") -or
    $bodyText.ToLowerInvariant().Contains("423")
  )

  $SmokeResults += [ordered]@{
    id = $route.id
    path = $route.path
    url = $url
    expectedStatusCode = $route.expectedStatusCode
    actualStatusCode = $result.statusCode
    statusCodeOk = ($result.statusCode -eq $route.expectedStatusCode)
    threwForNon2xx = $result.threwForNon2xx
    jsonParseOk = $result.jsonParseOk
    blockedEvidencePresent = $blockedEvidence
    forbiddenSuccessFragments = $forbiddenHits
    forbiddenSuccessFragmentsOk = ($forbiddenHits.Count -eq 0)
    ok = (($result.statusCode -eq $route.expectedStatusCode) -and ($forbiddenHits.Count -eq 0))
    responseBodyPreview = $(if ($result.rawBody.Length -gt 1200) { $result.rawBody.Substring(0, 1200) } else { $result.rawBody })
  }
}

$UnexpectedRouteHits = @()
foreach ($forbiddenPath in $ForbiddenRoutePaths) {
  foreach ($route in $AllowedRoutes) {
    if ($route.path.StartsWith($forbiddenPath)) {
      $UnexpectedRouteHits += $route.path
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
  $TscResult.outputTail = @($tscOutput | Select-Object -Last 120)
}

$CompileOk = (-not $RunTsc) -or ($TscResult.exitCode -eq 0)

$AllSmokeOk = (@($SmokeResults | Where-Object { $_.ok -eq $true }).Count -eq 3)

$Safety = [ordered]@{
  sourceMutationPerformed = 0
  backendRestartPerformed = 0
  runtimeHttpPerformedBy142Q = $RuntimePostPerformed
  runtimePostPerformedBy142Q = $RuntimePostPerformed
  allowedRuntimePostRoutes = @($AllowedRoutes | ForEach-Object { $_.path })
  unexpectedRouteHits = $UnexpectedRouteHits
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
  $AllSmokeOk -and
  $RuntimeHandlerMissingOrBad.Count -eq 0 -and
  $UnexpectedRouteHits.Count -eq 0 -and
  $CompileOk
)

$FinishedAt = (Get-Date).ToUniversalTime().ToString("o")

$Report = [ordered]@{
  version = $Version
  stage = $Stage
  startedAt = $StartedAt
  finishedAt = $FinishedAt
  ok = $Ok
  status = $(if ($Ok) { "controlled_blocked_route_runtime_post_smoke_passed" } else { "controlled_blocked_route_runtime_post_smoke_blocked" })
  ownerApprovalAccepted = $true
  ownerApprovalText = $OwnerApprovalText
  baseUrl = $BaseUrl
  runtimeHandlerReadiness = [ordered]@{
    total = $RuntimeHandlerReadinessResults.Count
    passed = @($RuntimeHandlerReadinessResults | Where-Object { $_.ok }).Count
    failed = $RuntimeHandlerMissingOrBad.Count
    failedItems = $RuntimeHandlerMissingOrBad
  }
  smoke = [ordered]@{
    expectedRoutes = 3
    attemptedRoutes = $SmokeResults.Count
    passedRoutes = @($SmokeResults | Where-Object { $_.ok -eq $true }).Count
    failedRoutes = @($SmokeResults | Where-Object { $_.ok -ne $true }).Count
    results = $SmokeResults
  }
  tscResult = $TscResult
  safety = $Safety
  nextRecommendedStage = "BACKEND-STREAM-FOUNDATION-142R post-runtime-smoke verification and foundation handoff"
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
