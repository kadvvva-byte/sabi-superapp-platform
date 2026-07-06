param(
  [string]$BaseUrl = "http://127.0.0.1:3000",
  [int]$TimeoutSec = 10,
  [switch]$WriteReport
)

$ErrorActionPreference = "Stop"

$Stage = "BACKEND-STREAM-FOUNDATION-140K"
$StartedAt = (Get-Date).ToUniversalTime().ToString("o")
$SafeHeaders = @{
  "X-Sabi-Stream-Smoke" = $Stage
  "X-Sabi-Safety" = "read-only-get-no-db-provider-wallet-money"
}

function Join-Url([string]$Root, [string]$Path) {
  $cleanRoot = $Root.TrimEnd("/")
  if ($Path.StartsWith("/")) {
    return "$cleanRoot$Path"
  }
  return "$cleanRoot/$Path"
}

function Try-Parse-Json([string]$Text) {
  if ([string]::IsNullOrWhiteSpace($Text)) {
    return $null
  }

  try {
    return $Text | ConvertFrom-Json -ErrorAction Stop
  } catch {
    return $null
  }
}

function Invoke-ReadOnlyGet([string]$Path) {
  $Uri = Join-Url $BaseUrl $Path
  $StatusCode = 0
  $BodyText = ""
  $ErrorText = $null

  try {
    $Response = Invoke-WebRequest -UseBasicParsing -Uri $Uri -Method GET -TimeoutSec $TimeoutSec -Headers $SafeHeaders
    $StatusCode = [int]$Response.StatusCode
    $BodyText = [string]$Response.Content
  } catch {
    $ErrorText = $_.Exception.Message

    if ($_.Exception.Response -ne $null) {
      try {
        $StatusCode = [int]$_.Exception.Response.StatusCode
        $Stream = $_.Exception.Response.GetResponseStream()
        if ($Stream -ne $null) {
          $Reader = New-Object System.IO.StreamReader($Stream)
          $BodyText = $Reader.ReadToEnd()
          $Reader.Dispose()
        }
      } catch {
        # Keep the original error text/status when the body cannot be read.
      }
    }
  }

  $Json = Try-Parse-Json $BodyText

  return [ordered]@{
    path = $Path
    method = "GET"
    url = $Uri
    statusCode = $StatusCode
    okHttp = ($StatusCode -ge 200 -and $StatusCode -lt 300)
    jsonParsed = ($Json -ne $null)
    json = $Json
    bodyPreview = if ($BodyText.Length -gt 700) { $BodyText.Substring(0, 700) } else { $BodyText }
    error = $ErrorText
  }
}

$Targets = @(
  "/health",
  "/api/admin/stream/foundation/diagnostics/readiness",
  "/api/admin/stream/foundation/diagnostics/preview"
)

$Results = @()
foreach ($Target in $Targets) {
  $Results += Invoke-ReadOnlyGet $Target
}

$Health = $Results | Where-Object { $_.path -eq "/health" } | Select-Object -First 1
$Readiness = $Results | Where-Object { $_.path -eq "/api/admin/stream/foundation/diagnostics/readiness" } | Select-Object -First 1
$Preview = $Results | Where-Object { $_.path -eq "/api/admin/stream/foundation/diagnostics/preview" } | Select-Object -First 1

$HealthBody = [string]$Health.bodyPreview
$ReadinessBody = [string]$Readiness.bodyPreview
$PreviewBody = [string]$Preview.bodyPreview

$Assertions = @(
  [ordered]@{
    id = "backend_reachable_health_get"
    passed = ($Health.statusCode -eq 200)
    evidence = "GET /health status=$($Health.statusCode)"
  },
  [ordered]@{
    id = "health_contains_stream_foundation_marker"
    passed = ($HealthBody -like "*streamFoundation*" -and $HealthBody -like "*diagnostics_foundation_ready_provider_not_configured_no_money_movement*")
    evidence = "Health response must include modules.streamFoundation diagnostics marker."
  },
  [ordered]@{
    id = "readiness_route_get_only_ok"
    passed = ($Readiness.statusCode -eq 200)
    evidence = "GET diagnostics/readiness status=$($Readiness.statusCode)"
  },
  [ordered]@{
    id = "readiness_payload_ok_true"
    passed = ($Readiness.jsonParsed -and $Readiness.json.ok -eq $true -and $ReadinessBody -like "*foundation_diagnostics_only*")
    evidence = "Readiness payload must be JSON with ok=true and foundation_diagnostics_only stage."
  },
  [ordered]@{
    id = "preview_route_get_only_ok"
    passed = ($Preview.statusCode -eq 200)
    evidence = "GET diagnostics/preview status=$($Preview.statusCode)"
  },
  [ordered]@{
    id = "preview_payload_is_stream_diagnostics_envelope"
    passed = ($Preview.jsonParsed -and $PreviewBody -like "*140A*" -and $PreviewBody -like "*stream_kernel_diagnostics_snapshot*")
    evidence = "Preview payload must be the Stream diagnostics envelope and stay foundation-only."
  },
  [ordered]@{
    id = "only_get_requests_used"
    passed = ($Results | Where-Object { $_.method -ne "GET" }).Count -eq 0
    evidence = "140K runner uses only GET /health and Stream diagnostics routes."
  },
  [ordered]@{
    id = "no_restart_db_provider_wallet_money"
    passed = $true
    evidence = "This runner contains no restart command, no POST/PUT/PATCH/DELETE, no DB/provider/Wallet/payment/payout/money action."
  }
)

$Failed = @($Assertions | Where-Object { $_.passed -ne $true })
$FinishedAt = (Get-Date).ToUniversalTime().ToString("o")

$Report = [ordered]@{
  version = $Stage
  stage = "controlled_runtime_http_smoke_only"
  baseUrl = $BaseUrl
  startedAt = $StartedAt
  finishedAt = $FinishedAt
  ok = ($Failed.Count -eq 0)
  status = if ($Failed.Count -eq 0) { "controlled_runtime_http_smoke_passed" } else { "controlled_runtime_http_smoke_blocked_or_backend_not_loaded" }
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
  targets = $Targets
  assertions = $Assertions
  failedAssertions = $Failed
  results = $Results
  nextStepIfPassed = "BACKEND-STREAM-FOUNDATION-140L post-runtime-smoke verification/source-only handoff"
  nextStepIfBlocked = "Check whether backend is already running from the patched 140H source. Do not restart without the next explicit approval."
}

$JsonReport = $Report | ConvertTo-Json -Depth 20
Write-Output $JsonReport

if ($WriteReport) {
  $ReportDir = Join-Path (Get-Location) ".data\stream"
  New-Item -ItemType Directory -Force -Path $ReportDir | Out-Null
  $ReportPath = Join-Path $ReportDir "backend-stream-foundation-140k-runtime-http-smoke-result.json"
  $JsonReport | Out-File -FilePath $ReportPath -Encoding utf8
  Write-Host "140K report written to $ReportPath"
}

if ($Failed.Count -gt 0) {
  exit 1
}

exit 0
