param(
  [string]$BaseUrl = "http://127.0.0.1:4001",
  [switch]$RunTsc,
  [switch]$WriteReport,
  [int]$TimeoutSeconds = 15,
  [string]$ReportPath = ".data\stream\backend-stream-foundation-142v-blocked-response-body-capture-diagnosis-runtime-smoke-result.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Version = "BACKEND-STREAM-FOUNDATION-142V-FIX2"
$Stage = "controlled_blocked_response_body_capture_diagnosis_runtime_smoke_ops_only_fix2_httpwebrequest"
$StartedAt = (Get-Date).ToUniversalTime().ToString("o")

$OwnerApprovalText = "I approve BACKEND-STREAM-FOUNDATION-142V controlled blocked-response body capture diagnosis runtime smoke ops-only, send POST requests only to /api/stream/live/start, /api/stream/live/stop, and /api/stream/live/heartbeat against local backend using improved body-capture diagnostics to verify whether HTTP 423 responses include JSON blocked envelopes or truly empty bodies, do not restart backend, do not write src/app.ts, do not write src/server.ts, do not write src/modules/stream/index.ts, no DB write, no provider call, no Wallet mutation, no payment authorization, no monthly payout, no money movement, no fake success."

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

function Convert-HeadersToObject {
  param([object]$Headers)

  $map = @{}
  if ($null -eq $Headers) {
    return $map
  }

  foreach ($key in $Headers.AllKeys) {
    if ($null -ne $key) {
      $map[$key] = [string]$Headers[$key]
    }
  }

  return $map
}

function Read-ResponseBodySafely {
  param([object]$Response)

  if ($null -eq $Response) {
    return ""
  }

  $stream = $null
  $reader = $null
  try {
    $stream = $Response.GetResponseStream()
    if ($null -eq $stream) {
      return ""
    }

    $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8)
    return $reader.ReadToEnd()
  } catch {
    return ""
  } finally {
    if ($null -ne $reader) {
      $reader.Close()
    }
    if ($null -ne $stream) {
      $stream.Close()
    }
  }
}

function Invoke-HttpWebRequestPostJson {
  param(
    [string]$Url,
    [hashtable]$Body,
    [int]$TimeoutSeconds
  )

  $jsonBody = $Body | ConvertTo-Json -Depth 8 -Compress
  $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($jsonBody)

  $request = [System.Net.WebRequest]::Create($Url)
  $request.Method = "POST"
  $request.ContentType = "application/json; charset=utf-8"
  $request.Accept = "application/json"
  $request.Timeout = $TimeoutSeconds * 1000
  $request.ReadWriteTimeout = $TimeoutSeconds * 1000
  $request.ContentLength = $bodyBytes.Length

  $requestStream = $null
  $statusCode = $null
  $statusDescription = $null
  $rawBody = ""
  $headers = @{}
  $threw = $false
  $errorMessage = $null

  try {
    $requestStream = $request.GetRequestStream()
    $requestStream.Write($bodyBytes, 0, $bodyBytes.Length)
    $requestStream.Close()
    $requestStream = $null

    $response = $request.GetResponse()
    try {
      $statusCode = [int]$response.StatusCode
      $statusDescription = [string]$response.StatusDescription
      $headers = Convert-HeadersToObject -Headers $response.Headers
      $rawBody = Read-ResponseBodySafely -Response $response
    } finally {
      if ($null -ne $response) {
        $response.Close()
      }
    }
  } catch [System.Net.WebException] {
    $threw = $true
    $errorMessage = $_.Exception.Message
    $response = $_.Exception.Response
    if ($null -ne $response) {
      try {
        $statusCode = [int]$response.StatusCode
        $statusDescription = [string]$response.StatusDescription
        $headers = Convert-HeadersToObject -Headers $response.Headers
        $rawBody = Read-ResponseBodySafely -Response $response
      } finally {
        if ($null -ne $response) {
          $response.Close()
        }
      }
    }
  } catch {
    $threw = $true
    $errorMessage = $_.Exception.Message
  } finally {
    if ($null -ne $requestStream) {
      $requestStream.Close()
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
    captureMethod = "System.Net.WebRequest.GetResponse/WebException.Response.ReadToEnd"
    url = $Url
    requestBody = $Body
    statusCode = $statusCode
    statusDescription = $statusDescription
    threw = $threw
    errorMessage = $errorMessage
    rawBody = $rawBody
    rawBodyLength = $(if ($null -eq $rawBody) { 0 } else { $rawBody.Length })
    rawBodyTrimmedLength = $(if ($null -eq $rawBody) { 0 } else { $rawBody.Trim().Length })
    headers = $headers
    contentType = $(if ($headers.ContainsKey("Content-Type")) { $headers["Content-Type"] } else { $null })
    contentLengthHeader = $(if ($headers.ContainsKey("Content-Length")) { $headers["Content-Length"] } else { $null })
    jsonParseOk = $jsonParseOk
    parsedBody = $parsedBody
  }
}

function Get-JsonPropertyValue {
  param(
    [object]$Object,
    [string]$PropertyName
  )

  if ($null -eq $Object) {
    return $null
  }

  $property = $Object.PSObject.Properties[$PropertyName]
  if ($null -eq $property) {
    return $null
  }

  return $property.Value
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

$ForbiddenRoutePrefixes = @(
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

$SourceReadiness = @(
  @{
    Path = "src/app.ts"
    Fragments = @(
      "/api/stream/live/start",
      "/api/stream/live/stop",
      "/api/stream/live/heartbeat",
      "res.status(envelope.statusCode).json(envelope)"
    )
  },
  @{
    Path = "src/modules/stream/foundation/live-write-runtime-handler/streamFoundationLiveWriteRuntimeHandlerDraft.ts"
    Fragments = @(
      "return {",
      "ok: false",
      "statusCode: 423",
      'handlerStatus: "source_only_blocked"',
      "runtimeSuccessAllowedNow: false",
      "fakeSuccessAllowedNow: false",
      "databaseWriteAllowedNow: false",
      "providerCallAllowedNow: false",
      "walletMutationAllowedNow: false",
      "moneyMovementAllowedNow: false"
    )
  }
)

$SourceReadinessResults = @()
foreach ($check in $SourceReadiness) {
  $SourceReadinessResults += Test-ContainsAll -Path $check.Path -Fragments $check.Fragments
}
$SourceReadinessFailed = @($SourceReadinessResults | Where-Object { -not $_.ok })

$BaseUrl = $BaseUrl.TrimEnd("/")
$SmokeResults = @()
$RuntimePostPerformed = 0

foreach ($route in $AllowedRoutes) {
  $safeBody = @{
    actorUserId = "stream-142v-safe-actor"
    roomId = "stream-142v-safe-room"
    clientRequestId = ("stream-142v-" + $route.id)
    deviceSessionId = "stream-142v-safe-device"
    locale = "ru"
  }

  $url = $BaseUrl + $route.path
  $capture = Invoke-HttpWebRequestPostJson -Url $url -Body $safeBody -TimeoutSeconds $TimeoutSeconds
  $RuntimePostPerformed += 1

  $bodyText = [string]$capture.rawBody
  $trimmedBody = $bodyText.Trim()
  $bodyIsEmpty = ($trimmedBody.Length -eq 0)

  $okValue = Get-JsonPropertyValue -Object $capture.parsedBody -PropertyName "ok"
  $statusCodeValue = Get-JsonPropertyValue -Object $capture.parsedBody -PropertyName "statusCode"
  $handlerStatusValue = Get-JsonPropertyValue -Object $capture.parsedBody -PropertyName "handlerStatus"
  $runtimeSuccessAllowedNowValue = Get-JsonPropertyValue -Object $capture.parsedBody -PropertyName "runtimeSuccessAllowedNow"
  $fakeSuccessAllowedNowValue = Get-JsonPropertyValue -Object $capture.parsedBody -PropertyName "fakeSuccessAllowedNow"
  $databaseWriteAllowedNowValue = Get-JsonPropertyValue -Object $capture.parsedBody -PropertyName "databaseWriteAllowedNow"
  $providerCallAllowedNowValue = Get-JsonPropertyValue -Object $capture.parsedBody -PropertyName "providerCallAllowedNow"
  $walletMutationAllowedNowValue = Get-JsonPropertyValue -Object $capture.parsedBody -PropertyName "walletMutationAllowedNow"
  $moneyMovementAllowedNowValue = Get-JsonPropertyValue -Object $capture.parsedBody -PropertyName "moneyMovementAllowedNow"

  $parsedStatusCodeMatches = $false
  if ($null -ne $statusCodeValue) {
    try {
      $parsedStatusCodeMatches = ([int]$statusCodeValue -eq 423)
    } catch {
      $parsedStatusCodeMatches = $false
    }
  }

  $jsonBlockedEnvelopePresent = (
    $capture.jsonParseOk -eq $true -and
    $okValue -eq $false -and
    $parsedStatusCodeMatches -eq $true -and
    ([string]$handlerStatusValue).Length -gt 0
  )

  $jsonSafetyFlagsOk = (
    $capture.jsonParseOk -eq $true -and
    $runtimeSuccessAllowedNowValue -eq $false -and
    $fakeSuccessAllowedNowValue -eq $false -and
    $databaseWriteAllowedNowValue -eq $false -and
    $providerCallAllowedNowValue -eq $false -and
    $walletMutationAllowedNowValue -eq $false -and
    $moneyMovementAllowedNowValue -eq $false
  )

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

  $compactBody = $bodyText.Replace(" ", "").Replace("`r", "").Replace("`n", "")
  $forbiddenHits = @()
  foreach ($fragment in $forbiddenSuccessFragments) {
    if ($compactBody.Contains($fragment.Replace(" ", ""))) {
      $forbiddenHits += $fragment
    }
  }

  $diagnosis = if ($jsonBlockedEnvelopePresent -and $jsonSafetyFlagsOk) {
    "json_blocked_envelope_present"
  } elseif ($bodyIsEmpty) {
    "http_423_body_truly_empty"
  } elseif ($capture.jsonParseOk -eq $false) {
    "http_423_body_present_but_not_json"
  } else {
    "http_423_json_present_but_missing_expected_blocked_fields"
  }

  $SmokeResults += [ordered]@{
    id = $route.id
    path = $route.path
    url = $url
    captureMethod = $capture.captureMethod
    expectedStatusCode = $route.expectedStatusCode
    actualStatusCode = $capture.statusCode
    statusDescription = $capture.statusDescription
    statusCodeOk = ($capture.statusCode -eq $route.expectedStatusCode)
    requestThrew = $capture.threw
    requestErrorMessage = $capture.errorMessage
    contentType = $capture.contentType
    contentLengthHeader = $capture.contentLengthHeader
    rawBodyLength = $capture.rawBodyLength
    rawBodyTrimmedLength = $capture.rawBodyTrimmedLength
    bodyIsEmpty = $bodyIsEmpty
    jsonParseOk = $capture.jsonParseOk
    jsonBlockedEnvelopePresent = $jsonBlockedEnvelopePresent
    jsonSafetyFlagsOk = $jsonSafetyFlagsOk
    parsedKeyValues = [ordered]@{
      ok = $okValue
      statusCode = $statusCodeValue
      handlerStatus = $handlerStatusValue
      runtimeSuccessAllowedNow = $runtimeSuccessAllowedNowValue
      fakeSuccessAllowedNow = $fakeSuccessAllowedNowValue
      databaseWriteAllowedNow = $databaseWriteAllowedNowValue
      providerCallAllowedNow = $providerCallAllowedNowValue
      walletMutationAllowedNow = $walletMutationAllowedNowValue
      moneyMovementAllowedNow = $moneyMovementAllowedNowValue
    }
    forbiddenSuccessFragments = $forbiddenHits
    forbiddenSuccessFragmentsOk = ($forbiddenHits.Count -eq 0)
    diagnosis = $diagnosis
    ok = (($capture.statusCode -eq $route.expectedStatusCode) -and ($forbiddenHits.Count -eq 0))
    responseBodyPreview = $(if ($bodyText.Length -gt 1600) { $bodyText.Substring(0, 1600) } else { $bodyText })
  }
}

$UnexpectedRouteHits = @()
foreach ($forbiddenPrefix in $ForbiddenRoutePrefixes) {
  foreach ($route in $AllowedRoutes) {
    if ($route.path.StartsWith($forbiddenPrefix)) {
      $UnexpectedRouteHits += $route.path
    }
  }
}

$JsonEnvelopeRoutes = @($SmokeResults | Where-Object { $_.diagnosis -eq "json_blocked_envelope_present" })
$EmptyBodyRoutes = @($SmokeResults | Where-Object { $_.diagnosis -eq "http_423_body_truly_empty" })
$NonJsonBodyRoutes = @($SmokeResults | Where-Object { $_.diagnosis -eq "http_423_body_present_but_not_json" })
$JsonMissingFieldsRoutes = @($SmokeResults | Where-Object { $_.diagnosis -eq "http_423_json_present_but_missing_expected_blocked_fields" })

$BodyCaptureDiagnosisSummary = [ordered]@{
  jsonBlockedEnvelopeRoutes = $JsonEnvelopeRoutes.Count
  emptyBodyRoutes = $EmptyBodyRoutes.Count
  nonJsonBodyRoutes = $NonJsonBodyRoutes.Count
  jsonMissingExpectedBlockedFieldsRoutes = $JsonMissingFieldsRoutes.Count
  allRoutesReturned423 = (@($SmokeResults | Where-Object { $_.statusCodeOk -eq $true }).Count -eq 3)
  allRoutesNoFakeSuccess = (@($SmokeResults | Where-Object { $_.forbiddenSuccessFragmentsOk -eq $true }).Count -eq 3)
  conclusion = $(if ($JsonEnvelopeRoutes.Count -eq 3) {
    "all_routes_return_json_blocked_envelopes"
  } elseif ($EmptyBodyRoutes.Count -eq 3) {
    "all_routes_return_423_with_truly_empty_bodies"
  } elseif ($JsonEnvelopeRoutes.Count -gt 0 -or $EmptyBodyRoutes.Count -gt 0 -or $NonJsonBodyRoutes.Count -gt 0 -or $JsonMissingFieldsRoutes.Count -gt 0) {
    "mixed_or_incomplete_blocked_envelope_bodies"
  } else {
    "body_capture_inconclusive"
  })
  recommendedNextStage = $(if ($JsonEnvelopeRoutes.Count -eq 3) {
    "BACKEND-STREAM-FOUNDATION-142W post-body-capture handoff; no target patch needed for envelope body"
  } else {
    "BACKEND-STREAM-FOUNDATION-142W approval package for minimal blocked-envelope normalization while preserving 423"
  })
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
  runtimeHttpPerformedBy142V = $RuntimePostPerformed
  runtimePostPerformedBy142V = $RuntimePostPerformed
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
  $SourceReadinessFailed.Count -eq 0 -and
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
  status = $(if ($Ok) { "controlled_blocked_response_body_capture_diagnosis_runtime_smoke_passed" } else { "controlled_blocked_response_body_capture_diagnosis_runtime_smoke_blocked" })
  fix1 = [ordered]@{
    fixedPowerShellStringEscaping = $true
  }
  fix2 = [ordered]@{
    replacedHttpClientStringContent = $true
    captureMethod = "System.Net.WebRequest + WebException.Response stream"
    previousError = "StringContent constructor overload with three arguments was unavailable in this PowerShell/.NET runtime."
  }
  ownerApprovalAccepted = $true
  ownerApprovalText = $OwnerApprovalText
  baseUrl = $BaseUrl
  sourceReadiness = [ordered]@{
    total = $SourceReadinessResults.Count
    passed = @($SourceReadinessResults | Where-Object { $_.ok }).Count
    failed = $SourceReadinessFailed.Count
    failedItems = $SourceReadinessFailed
  }
  smoke = [ordered]@{
    expectedRoutes = 3
    attemptedRoutes = $SmokeResults.Count
    passedRoutes = @($SmokeResults | Where-Object { $_.ok -eq $true }).Count
    failedRoutes = @($SmokeResults | Where-Object { $_.ok -ne $true }).Count
    results = $SmokeResults
  }
  bodyCaptureDiagnosisSummary = $BodyCaptureDiagnosisSummary
  tscResult = $TscResult
  safety = $Safety
  nextRecommendedStage = $BodyCaptureDiagnosisSummary.recommendedNextStage
}

if ($WriteReport) {
  $reportParent = Split-Path -Parent $ReportPath
  if ($reportParent -and -not (Test-Path -LiteralPath $reportParent)) {
    New-Item -ItemType Directory -Force -Path $reportParent | Out-Null
  }
  $Report | ConvertTo-Json -Depth 55 | Set-Content -LiteralPath $ReportPath -Encoding UTF8
}

$Report | ConvertTo-Json -Depth 55

if (-not $Ok) {
  exit 1
}
