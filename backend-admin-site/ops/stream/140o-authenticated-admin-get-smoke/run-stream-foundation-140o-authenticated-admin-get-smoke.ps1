param(
  [string]$BaseUrl = "http://127.0.0.1:4001",
  [string]$AdminToken = "",
  [string]$AdminTokenEnvName = "",
  [switch]$WriteReport
)

$ErrorActionPreference = "Continue"
$version = "BACKEND-STREAM-FOUNDATION-140O"
$startedAt = (Get-Date).ToUniversalTime().ToString("o")

function Normalize-BaseUrl([string]$value) {
  if ([string]::IsNullOrWhiteSpace($value)) { return "http://127.0.0.1:4001" }
  return $value.TrimEnd("/")
}

function Get-RuntimeAdminToken([string]$directToken, [string]$envName) {
  if (-not [string]::IsNullOrWhiteSpace($directToken)) {
    return $directToken
  }

  if (-not [string]::IsNullOrWhiteSpace($envName)) {
    try {
      $value = [Environment]::GetEnvironmentVariable($envName, "Process")
      if (-not [string]::IsNullOrWhiteSpace($value)) {
        return $value
      }
    } catch {}
  }

  return ""
}

function Redact-Text([string]$text, [string]$token) {
  if ([string]::IsNullOrEmpty($text)) { return $text }
  $redacted = $text
  if (-not [string]::IsNullOrWhiteSpace($token)) {
    $redacted = $redacted.Replace($token, "[REDACTED_ADMIN_TOKEN]")
  }
  $redacted = [regex]::Replace($redacted, "Bearer\s+[A-Za-z0-9_\-\.=]+", "Bearer [REDACTED_ADMIN_TOKEN]")
  $redacted = [regex]::Replace($redacted, "eyJ[A-Za-z0-9_\-\.=]+", "[REDACTED_JWT_LIKE_TOKEN]")
  return $redacted
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
    $content = Redact-Text ([string]$response.Content) $token
    $result.bodyPreview = if ($content.Length -gt 1200) { $content.Substring(0, 1200) } else { $content }
    try {
      $result.json = $content | ConvertFrom-Json -ErrorAction Stop
      $result.jsonParsed = $true
    } catch {
      $result.jsonParsed = $false
    }
  } catch {
    $ex = $_.Exception
    $result.error = Redact-Text $ex.Message $token
    if ($ex.Response -ne $null) {
      try {
        $result.statusCode = [int]$ex.Response.StatusCode
      } catch {}
      try {
        $stream = $ex.Response.GetResponseStream()
        if ($stream -ne $null) {
          $reader = New-Object System.IO.StreamReader($stream)
          $content = Redact-Text $reader.ReadToEnd() $token
          $result.bodyPreview = if ($content.Length -gt 1200) { $content.Substring(0, 1200) } else { $content }
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

function Body-LooksLikeDiagnostics($result) {
  if ($null -eq $result) { return $false }
  if (-not $result.jsonParsed) {
    return ($result.bodyPreview -match "stream" -or $result.bodyPreview -match "foundation" -or $result.bodyPreview -match "diagnostics")
  }

  $jsonText = ($result.json | ConvertTo-Json -Depth 30 -Compress)
  return ($jsonText -match "stream" -or $jsonText -match "foundation" -or $jsonText -match "diagnostics" -or $jsonText -match "provider_not_configured")
}

$baseUrlNorm = Normalize-BaseUrl $BaseUrl
$runtimeToken = Get-RuntimeAdminToken $AdminToken $AdminTokenEnvName
$tokenProvided = -not [string]::IsNullOrWhiteSpace($runtimeToken)

$readiness = Invoke-ReadOnlyGet $baseUrlNorm "/api/admin/stream/foundation/diagnostics/readiness" $runtimeToken
$preview = Invoke-ReadOnlyGet $baseUrlNorm "/api/admin/stream/foundation/diagnostics/preview" $runtimeToken

$readinessDiagnostics = Body-LooksLikeDiagnostics $readiness
$previewDiagnostics = Body-LooksLikeDiagnostics $preview

$assertions = @(
  [ordered]@{
    id = "admin_token_runtime_input_present"
    passed = $tokenProvided
    evidence = if ($tokenProvided) { "Admin token was supplied at runtime and is redacted from report." } else { "Admin token was not supplied. Use -AdminToken or -AdminTokenEnvName." }
  },
  [ordered]@{
    id = "readiness_authenticated_get_200"
    passed = ($readiness.statusCode -eq 200 -and $readiness.okHttp)
    evidence = "GET diagnostics/readiness status=$($readiness.statusCode)"
  },
  [ordered]@{
    id = "readiness_payload_diagnostics"
    passed = $readinessDiagnostics
    evidence = "Readiness body must look like read-only Stream foundation diagnostics."
  },
  [ordered]@{
    id = "preview_authenticated_get_200"
    passed = ($preview.statusCode -eq 200 -and $preview.okHttp)
    evidence = "GET diagnostics/preview status=$($preview.statusCode)"
  },
  [ordered]@{
    id = "preview_payload_diagnostics"
    passed = $previewDiagnostics
    evidence = "Preview body must look like read-only Stream foundation diagnostics."
  },
  [ordered]@{
    id = "only_get_requests_used"
    passed = $true
    evidence = "140O runner uses only GET requests."
  },
  [ordered]@{
    id = "token_redacted_and_not_stored"
    passed = $true
    evidence = "Report records only tokenProvided boolean; raw token value is not written."
  },
  [ordered]@{
    id = "no_restart_db_provider_wallet_money"
    passed = $true
    evidence = "Runner contains no restart command, no POST/PUT/PATCH/DELETE, no DB/provider/Wallet/payment/payout/money action."
  }
)

$failedAssertions = @($assertions | Where-Object { -not $_.passed })
$ok = ($failedAssertions.Count -eq 0)

$status = if ($ok) {
  "controlled_authenticated_admin_get_smoke_passed"
} elseif (-not $tokenProvided) {
  "controlled_authenticated_admin_get_smoke_blocked_missing_runtime_token"
} else {
  "controlled_authenticated_admin_get_smoke_blocked_or_token_not_authorized"
}

$report = [ordered]@{
  version = $version
  stage = "controlled_authenticated_admin_get_smoke_only"
  baseUrl = $baseUrlNorm
  adminTokenProvided = $tokenProvided
  adminTokenEnvNameProvided = (-not [string]::IsNullOrWhiteSpace($AdminTokenEnvName))
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
    rawTokenStored = 0
    fakeSuccessAllowed = $false
  }
  targets = @(
    "/api/admin/stream/foundation/diagnostics/readiness",
    "/api/admin/stream/foundation/diagnostics/preview"
  )
  assertions = $assertions
  failedAssertions = $failedAssertions
  results = @($readiness, $preview)
  nextStepIfPassed = "BACKEND-STREAM-FOUNDATION-140P authenticated admin GET post-smoke verification/source-only handoff"
  nextStepIfBlocked = "Verify that the supplied runtime token is a valid admin token. Do not store token in files or chat."
}

$json = $report | ConvertTo-Json -Depth 40

# Final defense: redact any accidental bearer/JWT-like fragments before writing/displaying.
$json = Redact-Text $json $runtimeToken

if ($WriteReport) {
  $reportDir = Join-Path (Get-Location) ".data\stream"
  New-Item -ItemType Directory -Force -Path $reportDir | Out-Null
  $reportPath = Join-Path $reportDir "backend-stream-foundation-140o-authenticated-admin-get-smoke-result.json"
  $json | Set-Content -Encoding UTF8 -Path $reportPath
}

Write-Output $json
if ($WriteReport) {
  Write-Host "140O report written to $reportPath"
}
