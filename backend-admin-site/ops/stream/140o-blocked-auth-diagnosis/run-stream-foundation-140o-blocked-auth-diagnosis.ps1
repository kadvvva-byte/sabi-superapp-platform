param(
  [string]$BaseUrl = "http://127.0.0.1:4001",
  [string]$AdminToken = "",
  [string]$AdminTokenEnvName = "",
  [switch]$ProbeHeaderVariants,
  [switch]$WriteReport
)

$ErrorActionPreference = "Continue"
$version = "BACKEND-STREAM-FOUNDATION-140O-BLOCKED-AUTH-DIAGNOSIS-FIX3"
$startedAt = (Get-Date).ToUniversalTime().ToString("o")

function JsonEscape([string]$s) {
  if ($null -eq $s) { return "" }
  $t = [string]$s
  $t = $t.Replace("\", "\\")
  $t = $t.Replace('"', '\"')
  $t = $t.Replace("`r", "\r")
  $t = $t.Replace("`n", "\n")
  $t = $t.Replace("`t", "\t")
  return $t
}

function JsonString([string]$s) {
  return '"' + (JsonEscape $s) + '"'
}

function JsonBool([bool]$b) {
  if ($b) { return "true" } else { return "false" }
}

function Normalize-BaseUrl([string]$value) {
  if ([string]::IsNullOrWhiteSpace($value)) { return "http://127.0.0.1:4001" }
  return $value.TrimEnd("/")
}

function Get-RuntimeAdminToken([string]$directToken, [string]$envName) {
  if (-not [string]::IsNullOrWhiteSpace($directToken)) { return $directToken }
  if (-not [string]::IsNullOrWhiteSpace($envName)) {
    try {
      $value = [Environment]::GetEnvironmentVariable($envName, "Process")
      if (-not [string]::IsNullOrWhiteSpace($value)) { return $value }
    } catch {}
  }
  return ""
}

function Is-PlaceholderToken([string]$token) {
  if ([string]::IsNullOrWhiteSpace($token)) { return $false }
  $raw = $token.Trim().ToLowerInvariant()
  return (
    $raw -eq "paste_admin_token_here_only_in_terminal" -or
    $raw -eq "<paste token here only in terminal>" -or
    $raw -match "paste.*token" -or
    $raw -match "your.*token" -or
    $raw -match "admin_token_here"
  )
}

function Redact-Text([string]$text, [string]$token) {
  if ([string]::IsNullOrEmpty($text)) { return "" }
  $redacted = [string]$text
  if (-not [string]::IsNullOrWhiteSpace($token)) {
    $redacted = $redacted.Replace($token, "[REDACTED_ADMIN_TOKEN]")
  }
  $redacted = [regex]::Replace($redacted, "Bearer\s+[A-Za-z0-9_\-\.=]+", "Bearer [REDACTED_ADMIN_TOKEN]")
  $redacted = [regex]::Replace($redacted, "eyJ[A-Za-z0-9_\-\.=]+", "[REDACTED_JWT_LIKE_TOKEN]")
  return $redacted
}

function Get-SelectedSourceSignals {
  $items = @()

  $selected = @(
    "src/modules/admin/admin.auth.ts",
    "src/modules/admin/admin.config.ts",
    "src/middleware/auth.middleware.ts",
    "src/middleware/authorize.middleware.ts",
    "src/modules/stream/index.ts",
    "src/app.ts"
  )

  $patterns = @(
    "getAdminPanelToken",
    "readBearerToken",
    "authorization",
    "Bearer",
    "requireAdmin",
    "admin_access_denied",
    "admin_permission_denied",
    "ADMIN_PANEL_TOKEN",
    "WALLET_PROVIDER_ADMIN_TOKEN",
    "ADMIN_TOKEN",
    "JWT_ACCESS_SECRET",
    "role",
    "owner",
    "/api/admin/stream/foundation/diagnostics"
  )

  foreach ($path in $selected) {
    if (Test-Path $path) {
      try {
        $lines = Get-Content -Path $path -Encoding UTF8 -ErrorAction Stop
        for ($i = 0; $i -lt $lines.Count; $i++) {
          $line = [string]$lines[$i]
          foreach ($pattern in $patterns) {
            if ($line -match [regex]::Escape($pattern)) {
              $trimmed = $line.Trim()
              if ($trimmed.Length -gt 240) { $trimmed = $trimmed.Substring(0, 240) }
              $items += ('{"file":' + (JsonString $path) + ',"line":' + [string]($i + 1) + ',"pattern":' + (JsonString $pattern) + ',"text":' + (JsonString $trimmed) + '}')
              break
            }
          }
        }
      } catch {}
    }
  }

  return @($items)
}

function Invoke-ReadOnlyGetVariantJson([string]$baseUrl, [string]$path, [string]$token, [string]$variant) {
  $url = (Normalize-BaseUrl $baseUrl) + $path
  $headers = @{}

  if (-not [string]::IsNullOrWhiteSpace($token)) {
    if ($variant -eq "authorization_bearer") {
      $headers["Authorization"] = "Bearer $token"
    } elseif ($variant -eq "authorization_raw") {
      $headers["Authorization"] = $token
    } elseif ($variant -eq "x_admin_token") {
      $headers["x-admin-token"] = $token
    } elseif ($variant -eq "x_admin_secret") {
      $headers["x-admin-secret"] = $token
    }
  }

  $statusCode = 0
  $okHttp = $false
  $bodyPreview = ""
  $errorText = ""

  try {
    $response = Invoke-WebRequest -Uri $url -Method GET -Headers $headers -UseBasicParsing -TimeoutSec 10
    $statusCode = [int]$response.StatusCode
    $okHttp = ($statusCode -ge 200 -and $statusCode -lt 300)
    $content = Redact-Text ([string]$response.Content) $token
    if ($content.Length -gt 500) { $bodyPreview = $content.Substring(0, 500) } else { $bodyPreview = $content }
  } catch {
    $ex = $_.Exception
    $errorText = Redact-Text $ex.Message $token
    if ($ex.Response -ne $null) {
      try { $statusCode = [int]$ex.Response.StatusCode } catch {}
      try {
        $stream = $ex.Response.GetResponseStream()
        if ($stream -ne $null) {
          $reader = New-Object System.IO.StreamReader($stream)
          $content = Redact-Text $reader.ReadToEnd() $token
          if ($content.Length -gt 500) { $bodyPreview = $content.Substring(0, 500) } else { $bodyPreview = $content }
        }
      } catch {}
    }
  }

  return '{"path":' + (JsonString $path) +
    ',"method":"GET","authVariant":' + (JsonString $variant) +
    ',"url":' + (JsonString $url) +
    ',"statusCode":' + [string]$statusCode +
    ',"okHttp":' + (JsonBool $okHttp) +
    ',"bodyPreview":' + (JsonString $bodyPreview) +
    ',"error":' + (JsonString $errorText) + '}'
}

$baseUrlNorm = Normalize-BaseUrl $BaseUrl
$runtimeToken = Get-RuntimeAdminToken $AdminToken $AdminTokenEnvName
$tokenProvided = -not [string]::IsNullOrWhiteSpace($runtimeToken)
$placeholderToken = Is-PlaceholderToken $runtimeToken

$sourceSignalJsonItems = @(Get-SelectedSourceSignals)
$sourceJoined = [string]::Join(" ", $sourceSignalJsonItems)

$authorizationBearerMentioned = ($sourceJoined -match "Bearer" -or $sourceJoined -match "authorization")
$xAdminTokenMentioned = ($sourceJoined -match "x-admin-token")
$xAdminSecretMentioned = ($sourceJoined -match "x-admin-secret")
$requireAdminMentioned = ($sourceJoined -match "requireAdmin")
$adminConfigMentionsPanelToken = ($sourceJoined -match "getAdminPanelToken" -or $sourceJoined -match "ADMIN_PANEL_TOKEN" -or $sourceJoined -match "WALLET_PROVIDER_ADMIN_TOKEN")

$variantJsonItems = @()
$passedVariantCount = 0

if ($ProbeHeaderVariants -and $tokenProvided -and (-not $placeholderToken)) {
  $variants = @("authorization_bearer", "authorization_raw", "x_admin_token", "x_admin_secret")
  $paths = @(
    "/api/admin/stream/foundation/diagnostics/readiness",
    "/api/admin/stream/foundation/diagnostics/preview"
  )

  foreach ($variant in $variants) {
    foreach ($path in $paths) {
      $itemJson = Invoke-ReadOnlyGetVariantJson $baseUrlNorm $path $runtimeToken $variant
      $variantJsonItems += $itemJson
      if ($itemJson -match '"statusCode":200') { $passedVariantCount++ }
    }
  }
}

$status = "source_auth_diagnosis_ready_no_token_probe"
if ($placeholderToken) {
  $status = "blocked_placeholder_token_used_replace_with_real_admin_panel_token"
} elseif ($ProbeHeaderVariants -and $tokenProvided -and $passedVariantCount -gt 0) {
  $status = "auth_header_variant_found_get_200"
} elseif ($ProbeHeaderVariants -and $tokenProvided -and $passedVariantCount -eq 0) {
  $status = "auth_header_variants_all_blocked_or_token_not_authorized"
} elseif ($tokenProvided) {
  $status = "source_auth_diagnosis_ready_token_not_probed"
}

$httpMethodsJson = "[]"
if ($ProbeHeaderVariants -and $tokenProvided -and (-not $placeholderToken)) { $httpMethodsJson = '["GET"]' }

$sourceSignalsJson = "[" + [string]::Join(",", $sourceSignalJsonItems) + "]"
$variantResultsJson = "[" + [string]::Join(",", $variantJsonItems) + "]"

$assertionsJson = @(
  '{"id":"previous_140o_was_403_with_runtime_token","passed":true,"evidence":"140O result: token supplied runtime-only, readiness=403, preview=403."}',
  ('{"id":"source_auth_signals_collected","passed":' + (JsonBool ($sourceSignalJsonItems.Count -gt 0)) + ',"evidence":' + (JsonString ("Collected selected source auth/admin/route signals count=" + $sourceSignalJsonItems.Count)) + '}'),
  ('{"id":"placeholder_token_not_used","passed":' + (JsonBool (-not $placeholderToken)) + ',"evidence":' + (JsonString "If this is false, replace placeholder with the real admin panel token only in terminal/env.") + '}'),
  '{"id":"no_restart_db_provider_wallet_money","passed":true,"evidence":"Diagnosis contains no restart command, no POST/PUT/PATCH/DELETE, no DB/provider/Wallet/payment/payout/money action."}',
  '{"id":"token_redacted_and_not_stored","passed":true,"evidence":"Report records tokenProvided only; token text is redacted."}'
)
if ($ProbeHeaderVariants -and $tokenProvided -and (-not $placeholderToken)) {
  $assertionsJson += '{"id":"header_variant_probe_completed_get_only","passed":true,"evidence":"Optional probe used GET only across redacted auth header variants."}'
}
$assertionsArrayJson = "[" + [string]::Join(",", $assertionsJson) + "]"

$json = "{"
$json += '"version":' + (JsonString $version) + ","
$json += '"stage":"no_restart_auth_guard_diagnosis_after_140o_403_fix3",'
$json += '"baseUrl":' + (JsonString $baseUrlNorm) + ","
$json += '"adminTokenProvided":' + (JsonBool $tokenProvided) + ","
$json += '"adminTokenEnvNameProvided":' + (JsonBool (-not [string]::IsNullOrWhiteSpace($AdminTokenEnvName))) + ","
$json += '"placeholderTokenDetected":' + (JsonBool $placeholderToken) + ","
$json += '"probeHeaderVariants":' + (JsonBool ([bool]$ProbeHeaderVariants)) + ","
$json += '"startedAt":' + (JsonString $startedAt) + ","
$json += '"finishedAt":' + (JsonString ((Get-Date).ToUniversalTime().ToString("o"))) + ","
$json += '"ok":true,'
$json += '"status":' + (JsonString $status) + ","
$json += '"safety":{'
$json += '"backendRestartPerformed":0,'
$json += '"httpMethodsUsed":' + $httpMethodsJson + ","
$json += '"databaseWritePerformed":0,'
$json += '"providerCallPerformed":0,'
$json += '"walletMutationPerformed":0,'
$json += '"paymentAuthorizationPerformed":0,'
$json += '"monthlyPayoutPerformed":0,'
$json += '"moneyMovementPerformed":0,'
$json += '"rawSecretsReturned":0,'
$json += '"rawTokenStored":0,'
$json += '"fakeSuccessAllowed":false'
$json += "},"
$json += '"likelyHeaderSignals":{'
$json += '"authorizationBearerMentioned":' + (JsonBool $authorizationBearerMentioned) + ","
$json += '"xAdminTokenMentioned":' + (JsonBool $xAdminTokenMentioned) + ","
$json += '"xAdminSecretMentioned":' + (JsonBool $xAdminSecretMentioned) + ","
$json += '"requireAdminMentioned":' + (JsonBool $requireAdminMentioned) + ","
$json += '"adminConfigMentionsPanelToken":' + (JsonBool $adminConfigMentionsPanelToken)
$json += "},"
$json += '"sourceSignals":' + $sourceSignalsJson + ","
$json += '"variantResults":' + $variantResultsJson + ","
$json += '"assertions":' + $assertionsArrayJson + ","
$json += '"nextStepIfPlaceholder":"Set SABI_ADMIN_TOKEN to the real admin panel token from the backend environment, not the placeholder text.",'
$json += '"nextStepIfHeaderFound":"Use the successful redacted header variant in a corrected authenticated GET smoke runner, still GET-only.",'
$json += '"nextStepIfAllBlocked":"Token likely lacks required admin/owner permission or admin middleware expects a different auth source. Inspect selected sourceSignals; do not patch blindly."'
$json += "}"

$json = Redact-Text $json $runtimeToken

if ($WriteReport) {
  $reportDir = Join-Path (Get-Location) ".data\stream"
  New-Item -ItemType Directory -Force -Path $reportDir | Out-Null
  $reportPath = Join-Path $reportDir "backend-stream-foundation-140o-blocked-auth-diagnosis-fix3-result.json"
  $json | Set-Content -Encoding UTF8 -Path $reportPath
}

Write-Output $json
if ($WriteReport) {
  Write-Host "140O-BLOCKED-AUTH-DIAGNOSIS-FIX3 report written to $reportPath"
}
