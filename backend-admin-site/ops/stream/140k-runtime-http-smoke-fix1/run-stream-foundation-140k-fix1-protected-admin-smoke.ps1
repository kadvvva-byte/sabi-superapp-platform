param(
  [string]$BaseUrl = "http://127.0.0.1:4001",
  [string]$AdminToken = "",
  [switch]$WriteReport
)

$ErrorActionPreference = "Continue"
$version = "BACKEND-STREAM-FOUNDATION-140K-FIX1"
$startedAt = (Get-Date).ToUniversalTime().ToString("o")

function Normalize-BaseUrl([string]$value) {
  if ([string]::IsNullOrWhiteSpace($value)) { return "http://127.0.0.1:4001" }
  return $value.TrimEnd("/")
}

function Invoke-ReadOnlyGet([string]$baseUrl, [string]$path, [string]$token) {
  $url = (Normalize-BaseUrl $baseUrl) + $path
  $headers = @{}
  if (-not [string]::IsNullOrWhiteSpace($token)) {
    $headers["Authorization"] = "Bearer $token"
  }

  $result = [ordered]@{
    path = $path
    method = "GET"
    url = $url
    statusCode = 0
    okHttp = $false
    jsonParsed = $false
    json = $null
    bodyPreview = ""
    error = $null
  }

  try {
    $response = Invoke-WebRequest -Uri $url -Method GET -Headers $headers -UseBasicParsing -TimeoutSec 10
    $result.statusCode = [int]$response.StatusCode
    $result.okHttp = ($response.StatusCode -ge 200 -and $response.StatusCode -lt 300)
    $content = [string]$response.Content
    $result.bodyPreview = if ($content.Length -gt 800) { $content.Substring(0, 800) } else { $content }
    try {
      $result.json = $content | ConvertFrom-Json -ErrorAction Stop
      $result.jsonParsed = $true
    } catch {
      $result.jsonParsed = $false
    }
  } catch {
    $ex = $_.Exception
    $result.error = $ex.Message
    if ($ex.Response -ne $null) {
      try {
        $result.statusCode = [int]$ex.Response.StatusCode
      } catch {}
      try {
        $stream = $ex.Response.GetResponseStream()
        if ($stream -ne $null) {
          $reader = New-Object System.IO.StreamReader($stream)
          $content = $reader.ReadToEnd()
          $result.bodyPreview = if ($content.Length -gt 800) { $content.Substring(0, 800) } else { $content }
          try {
            $result.json = $content | ConvertFrom-Json -ErrorAction Stop
            $result.jsonParsed = $true
          } catch {
            $result.jsonParsed = $false
          }
        }
      } catch {}
    }
  }

  return [pscustomobject]$result
}

function Has-StreamFoundationMarker($healthJson) {
  if ($null -eq $healthJson) { return $false }
  if ($null -eq $healthJson.modules) { return $false }
  $marker = $healthJson.modules.streamFoundation
  if ($null -eq $marker) { return $false }
  $markerText = [string]$marker
  if ($markerText -eq "diagnostics_foundation_ready_provider_not_configured_no_money_movement") { return $true }
  if ($markerText -match "streamFoundation" -or $markerText -match "diagnostics_foundation_ready" -or $markerText -match "no_money_movement") { return $true }
  return $false
}

function Is-ExpectedProtectedAdminResponse($result, [string]$token) {
  if (-not [string]::IsNullOrWhiteSpace($token)) { return $false }
  return ($result.statusCode -eq 401 -or $result.statusCode -eq 403)
}

$baseUrlNorm = Normalize-BaseUrl $BaseUrl
$tokenProvided = -not [string]::IsNullOrWhiteSpace($AdminToken)

$health = Invoke-ReadOnlyGet $baseUrlNorm "/health" ""
$readiness = Invoke-ReadOnlyGet $baseUrlNorm "/api/admin/stream/foundation/diagnostics/readiness" $AdminToken
$preview = Invoke-ReadOnlyGet $baseUrlNorm "/api/admin/stream/foundation/diagnostics/preview" $AdminToken

$healthMarkerOk = Has-StreamFoundationMarker $health.json
$readinessProtectedOk = Is-ExpectedProtectedAdminResponse $readiness $AdminToken
$previewProtectedOk = Is-ExpectedProtectedAdminResponse $preview $AdminToken

$readinessOkAuthenticated = $false
if ($tokenProvided -and $readiness.okHttp -and $readiness.jsonParsed) {
  $readinessOkAuthenticated = ($readiness.json.ok -eq $true -or [string]$readiness.json.stage -match "foundation")
}

$previewOkAuthenticated = $false
if ($tokenProvided -and $preview.okHttp -and $preview.jsonParsed) {
  $previewOkAuthenticated = ($preview.json.ok -eq $true -or [string]$preview.json.stage -match "foundation" -or $preview.bodyPreview -match "stream")
}

$assertions = @(
  [ordered]@{
    id = "backend_reachable_health_get"
    passed = ($health.statusCode -eq 200 -and $health.jsonParsed)
    evidence = "GET /health status=$($health.statusCode), jsonParsed=$($health.jsonParsed)"
  },
  [ordered]@{
    id = "health_contains_stream_foundation_marker"
    passed = $healthMarkerOk
    evidence = "Health modules.streamFoundation marker is accepted as string/object marker."
  },
  [ordered]@{
    id = "admin_readiness_protected_without_token_or_ok_with_token"
    passed = ($readinessProtectedOk -or $readinessOkAuthenticated)
    evidence = if ($readinessProtectedOk) { "GET diagnostics/readiness returned protected status=$($readiness.statusCode) without AdminToken." } else { "GET diagnostics/readiness status=$($readiness.statusCode), tokenProvided=$tokenProvided." }
  },
  [ordered]@{
    id = "admin_preview_protected_without_token_or_ok_with_token"
    passed = ($previewProtectedOk -or $previewOkAuthenticated)
    evidence = if ($previewProtectedOk) { "GET diagnostics/preview returned protected status=$($preview.statusCode) without AdminToken." } else { "GET diagnostics/preview status=$($preview.statusCode), tokenProvided=$tokenProvided." }
  },
  [ordered]@{
    id = "only_get_requests_used"
    passed = $true
    evidence = "140K-FIX1 runner uses only GET /health and Stream diagnostics routes."
  },
  [ordered]@{
    id = "no_restart_db_provider_wallet_money"
    passed = $true
    evidence = "This runner contains no restart command, no POST/PUT/PATCH/DELETE, no DB/provider/Wallet/payment/payout/money action."
  }
)

$failedAssertions = @($assertions | Where-Object { -not $_.passed })
$ok = ($failedAssertions.Count -eq 0)

$status = if ($ok -and -not $tokenProvided) {
  "controlled_runtime_http_smoke_passed_admin_routes_protected_without_token"
} elseif ($ok -and $tokenProvided) {
  "controlled_runtime_http_smoke_passed_authenticated_readonly"
} else {
  "controlled_runtime_http_smoke_blocked"
}

$report = [ordered]@{
  version = $version
  stage = "controlled_runtime_http_smoke_fix1_protected_admin_aware"
  baseUrl = $baseUrlNorm
  adminTokenProvided = $tokenProvided
  startedAt = $startedAt
  finishedAt = (Get-Date).ToUniversalTime().ToString("o")
  ok = $ok
  status = $status
  safety = [ordered]@{
    backendRestartPerformed = 0
    runtimeHttpSmokePerformed = 1
    httpMethodsUsed = @("GET")
    databaseWritePerformed = 0
    providerCallPerformed = 0
    walletMutationPerformed = 0
    paymentAuthorizationPerformed = 0
    monthlyPayoutPerformed = 0
    moneyMovementPerformed = 0
    rawSecretsReturned = 0
    fakeSuccessAllowed = $false
  }
  interpretation = [ordered]@{
    health200MeansBackendLoaded = ($health.statusCode -eq 200)
    streamFoundationMarkerAccepted = $healthMarkerOk
    adminRoutesProtectedWithoutTokenIsExpected = (-not $tokenProvided)
    readinessProtectedWithoutToken = $readinessProtectedOk
    previewProtectedWithoutToken = $previewProtectedOk
  }
  targets = @(
    "/health",
    "/api/admin/stream/foundation/diagnostics/readiness",
    "/api/admin/stream/foundation/diagnostics/preview"
  )
  assertions = $assertions
  failedAssertions = $failedAssertions
  results = @($health, $readiness, $preview)
  nextStepIfPassed = "BACKEND-STREAM-FOUNDATION-140L post-runtime-smoke verification/source-only handoff"
  nextStepIfBlocked = "Share this JSON. Do not restart or patch runtime blindly."
}

if ($WriteReport) {
  $reportDir = Join-Path (Get-Location) ".data\stream"
  New-Item -ItemType Directory -Force -Path $reportDir | Out-Null
  $reportPath = Join-Path $reportDir "backend-stream-foundation-140k-fix1-runtime-http-smoke-result.json"
  $report | ConvertTo-Json -Depth 30 | Set-Content -Encoding UTF8 -Path $reportPath
}

$report | ConvertTo-Json -Depth 30
if ($WriteReport) {
  Write-Host "140K-FIX1 report written to $reportPath"
}
