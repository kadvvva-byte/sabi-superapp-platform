<#
AI-37 Provider Gateway Smoke Check
Runs local verification for Sabi SuperApp AI provider gateway without adding fake provider data.

Usage from backend root:
  powershell -ExecutionPolicy Bypass -File .\scripts\ai37-provider-gateway-smoke-check.ps1

Optional:
  powershell -ExecutionPolicy Bypass -File .\scripts\ai37-provider-gateway-smoke-check.ps1 -BackendRoot "C:\Users\User\Desktop\superapp" -MobileRoot "C:\Users\User\Desktop\superapp-mobile" -BackendUrl "http://localhost:4001"
#>

param(
  [string]$BackendRoot = (Get-Location).Path,
  [string]$MobileRoot = (Join-Path (Split-Path (Get-Location).Path -Parent) "superapp-mobile"),
  [string]$BackendUrl = "http://localhost:4001",
  [switch]$SkipTypeScript
)

$ErrorActionPreference = "Stop"

function Write-Step([string]$Message) {
  Write-Host "`n==> $Message" -ForegroundColor Cyan
}

function Write-Ok([string]$Message) {
  Write-Host "OK: $Message" -ForegroundColor Green
}

function Write-Warn([string]$Message) {
  Write-Host "WARN: $Message" -ForegroundColor Yellow
}

function Fail([string]$Message) {
  Write-Host "FAIL: $Message" -ForegroundColor Red
  exit 1
}

function Test-PathOrFail([string]$Path, [string]$Label) {
  if (-not (Test-Path $Path)) {
    Fail "$Label not found: $Path"
  }
  Write-Ok "$Label found: $Path"
}

function Invoke-Tsc([string]$Root, [string]$Label) {
  if ($SkipTypeScript) {
    Write-Warn "Skipping TypeScript check for $Label"
    return
  }

  Write-Step "TypeScript check: $Label"
  Push-Location $Root
  try {
    npx tsc --noEmit
    if ($LASTEXITCODE -ne 0) {
      Fail "$Label TypeScript check failed"
    }
    Write-Ok "$Label TypeScript check passed"
  } finally {
    Pop-Location
  }
}

function Invoke-JsonGet([string]$Url) {
  try {
    $response = curl.exe -s $Url
    if (-not $response) {
      Fail "Empty response from $Url"
    }
    return $response | ConvertFrom-Json
  } catch {
    Fail "Request failed: $Url. $($_.Exception.Message)"
  }
}

function Invoke-JsonPost([string]$Url, [string]$Body) {
  try {
    $response = curl.exe -s -X POST $Url -H "Content-Type: application/json" -d $Body
    if (-not $response) {
      Fail "Empty response from $Url"
    }
    return $response | ConvertFrom-Json
  } catch {
    Fail "POST failed: $Url. $($_.Exception.Message)"
  }
}

Write-Step "AI-37 Sabi AI provider gateway smoke-check"
Write-Host "BackendRoot: $BackendRoot"
Write-Host "MobileRoot : $MobileRoot"
Write-Host "BackendUrl : $BackendUrl"

Test-PathOrFail $BackendRoot "Backend root"
Test-PathOrFail (Join-Path $BackendRoot "src\modules\ai\infrastructure\routes\ai-provider-gateway.routes.ts") "AI provider gateway route file"
Test-PathOrFail (Join-Path $BackendRoot "src\modules\ai\infrastructure\routes\ai.routes.ts") "AI routes file"

if (Test-Path $MobileRoot) {
  Test-PathOrFail (Join-Path $MobileRoot "src\modules\ai\mobile\aiMobileApi.ts") "Mobile AI API file"
} else {
  Write-Warn "Mobile root not found. Mobile TypeScript check will be skipped: $MobileRoot"
}

Write-Step "Checking backend route wiring"
$routesFile = Join-Path $BackendRoot "src\modules\ai\infrastructure\routes\ai.routes.ts"
$gatewayFile = Join-Path $BackendRoot "src\modules\ai\infrastructure\routes\ai-provider-gateway.routes.ts"

$routeWiring = Select-String -Path $routesFile -Pattern "createAiProviderGatewayRouter" -Quiet
if (-not $routeWiring) {
  Fail "createAiProviderGatewayRouter is not wired in ai.routes.ts"
}
Write-Ok "createAiProviderGatewayRouter is wired"

$manifestRoute = Select-String -Path $gatewayFile -Pattern '"/manifest"' -Quiet
$healthRoute = Select-String -Path $gatewayFile -Pattern '"/health"' -Quiet
$textRoute = Select-String -Path $gatewayFile -Pattern '"/translation/text"' -Quiet
$imageRoute = Select-String -Path $gatewayFile -Pattern '"/translation/image"' -Quiet

if (-not $manifestRoute) { Fail "Provider gateway manifest route is missing" }
if (-not $healthRoute) { Fail "Provider gateway health route is missing" }
if (-not $textRoute) { Fail "Provider gateway text translation route is missing" }
if (-not $imageRoute) { Fail "Provider gateway image translation route is missing" }
Write-Ok "Provider gateway routes exist"

Write-Step "Checking .env for fake AI gateway values"
$envPath = Join-Path $BackendRoot ".env"
if (Test-Path $envPath) {
  $fakeMatches = Select-String -Path $envPath -Pattern "AI_.*GATEWAY.*(fake|dummy|mock|test_key|YOUR_REAL|YOUR_|example)" -CaseSensitive:$false
  if ($fakeMatches) {
    $fakeMatches | ForEach-Object { Write-Host $_.Line -ForegroundColor Red }
    Fail "Fake/example AI gateway value found in backend .env"
  }
  Write-Ok "No fake/example AI gateway values detected in .env"
} else {
  Write-Warn ".env not found. This is OK for local check if provider keys are not configured yet."
}

Invoke-Tsc $BackendRoot "backend"
if (Test-Path $MobileRoot) {
  Invoke-Tsc $MobileRoot "mobile"
}

Write-Step "Checking provider gateway manifest"
$manifest = Invoke-JsonGet "$BackendUrl/api/ai/provider-gateway/manifest"
if (-not $manifest.ok) {
  Fail "Manifest returned ok=false"
}

$gateway = $manifest.data.gateway
if (-not $gateway) {
  Fail "Manifest missing data.gateway"
}

if ($gateway.localFakeFallback -ne $false) {
  Fail "localFakeFallback must be false"
}

if ($gateway.fallbackPolicy -ne "disabled") {
  Fail "fallbackPolicy must be disabled"
}

Write-Ok "Manifest ok. Version=$($gateway.version), Status=$($gateway.status), fallbackPolicy=$($gateway.fallbackPolicy), localFakeFallback=$($gateway.localFakeFallback)"

Write-Step "Checking provider gateway health"
$health = Invoke-JsonGet "$BackendUrl/api/ai/provider-gateway/health"
if (-not $health.ok) {
  Fail "Health returned ok=false"
}
Write-Ok "Health ok. Status=$($health.data.status)"

Write-Step "Checking text translation behavior"
$body = '{"text":"hello","sourceLanguage":"en","targetLanguage":"ru"}'
$textResponse = Invoke-JsonPost "$BackendUrl/api/ai/provider-gateway/translation/text" $body

if ($gateway.status -eq "translation_provider_not_configured") {
  if ($textResponse.ok -eq $true) {
    Fail "Text translation unexpectedly succeeded while provider is not configured"
  }
  Write-Ok "Text translation correctly fails while provider is not configured"
} else {
  if ($textResponse.ok -ne $true) {
    Write-Warn "Provider appears configured, but translation request did not return ok=true. Check provider keys/gateway URL."
  } else {
    Write-Ok "Text translation request succeeded"
  }
}

Write-Step "AI-37 smoke-check completed"
Write-Ok "Backend/mobile contracts are ready for provider-not-configured mode. Real API keys must be connected only on server before launch."
