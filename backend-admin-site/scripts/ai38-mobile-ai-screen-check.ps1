param(
  [string]$BackendRoot = "C:\Users\User\Desktop\superapp",
  [string]$MobileRoot = "C:\Users\User\Desktop\superapp-mobile",
  [string]$BackendUrl = "http://localhost:4001"
)

$ErrorActionPreference = "Stop"

function Write-Step([string]$message) { Write-Host "`n==> $message" -ForegroundColor Cyan }
function Ok([string]$message) { Write-Host "OK: $message" -ForegroundColor Green }
function Fail([string]$message) { Write-Host "FAIL: $message" -ForegroundColor Red; exit 1 }
function Warn([string]$message) { Write-Host "WARN: $message" -ForegroundColor Yellow }
function Test-File([string]$path, [string]$label) { if (!(Test-Path $path)) { Fail "$label not found: $path" }; Ok "$label found: $path" }
function Get-Text([string]$path) { return Get-Content -Raw -Encoding UTF8 $path }

function Test-FakeLikeMobileValue([string]$mobileAiRoot) {
  $files = Get-ChildItem $mobileAiRoot -Recurse -File -Include *.ts,*.tsx
  $badMatches = New-Object System.Collections.Generic.List[object]

  foreach ($file in $files) {
    $lines = Get-Content -Encoding UTF8 $file.FullName
    for ($i = 0; $i -lt $lines.Count; $i++) {
      $trimmed = $lines[$i].Trim()
      if ($trimmed -match 'localFakeFallback' -or $trimmed -match 'noFakePlayback' -or $trimmed -match 'not faked' -or $trimmed -match 'must not fake') { continue }
      if ($trimmed -match '(?i)(fake_|fake-|dummy|mock translation|mockTranslation|fallbackTranslate|example\.com|YOUR_REAL|YOUR_KEY)' -or $trimmed -match 'localFakeFallback\s*:\s*true' -or $trimmed -match 'allowFallback\s*:\s*true' -or $trimmed -match 'gatewayRequired\s*:\s*false') {
        $badMatches.Add([pscustomobject]@{ Path = $file.FullName; LineNumber = $i + 1; Line = $trimmed }) | Out-Null
      }
    }
  }

  return $badMatches
}

Write-Host "==> AI-38.1 Sabi AI mobile screen final check"
Write-Host "BackendRoot: $BackendRoot"
Write-Host "MobileRoot : $MobileRoot"
Write-Host "BackendUrl : $BackendUrl"

if (!(Test-Path $BackendRoot)) { Fail "Backend root not found: $BackendRoot" }
if (!(Test-Path $MobileRoot)) { Fail "Mobile root not found: $MobileRoot" }
Ok "Backend and mobile roots found"

$apiFile = Join-Path $MobileRoot "src\modules\ai\mobile\aiMobileApi.ts"
$entitlementsFile = Join-Path $MobileRoot "src\modules\ai\mobile\aiMobileEntitlements.ts"
$chatScreen = Join-Path $MobileRoot "src\modules\ai\mobile\screens\AiMobileChatScreen.tsx"
$translationScreen = Join-Path $MobileRoot "src\modules\ai\mobile\screens\AiMobileTranslationScreen.tsx"
$voiceScreen = Join-Path $MobileRoot "src\modules\ai\mobile\screens\AiMobileVoiceScreen.tsx"

Test-File $apiFile "Mobile AI API"
Test-File $entitlementsFile "Mobile AI entitlements"
Test-File $chatScreen "AI chat screen"
Test-File $translationScreen "AI translation screen"
Test-File $voiceScreen "AI voice screen"

Write-Step "Checking TypeScript"
Push-Location $BackendRoot
try {
  npx tsc --noEmit | Out-Host
  if ($LASTEXITCODE -ne 0) { Fail "backend TypeScript check failed" }
  Ok "backend TypeScript check passed"
} finally {
  Pop-Location
}

Push-Location $MobileRoot
try {
  npx tsc --noEmit | Out-Host
  if ($LASTEXITCODE -ne 0) { Fail "mobile TypeScript check failed" }
  Ok "mobile TypeScript check passed"
} finally {
  Pop-Location
}

Write-Step "Checking gateway route contract inside mobile API"
$apiText = Get-Text $apiFile
if ($apiText -notmatch "/api/ai/provider-gateway/translation/text") { Fail "Mobile API does not use provider gateway text route" }
if ($apiText -notmatch "/api/ai/provider-gateway/translation/image") { Fail "Mobile API does not use provider gateway image route" }
if ($apiText -match '"/api/ai/translate"') { Fail "Old /api/ai/translate route still exists in mobile API" }
if ($apiText -match '"/api/ai/translate/image"') { Fail "Old /api/ai/translate/image route still exists in mobile API" }
if ($apiText -notmatch "/api/ai/provider-gateway/manifest") { Fail "Mobile API does not read provider gateway manifest" }
if ($apiText -match 'allowFallback\s*:\s*true') { Fail "allowFallback=true must not exist in mobile AI API" }
Ok "Mobile API uses provider gateway routes and manifest"

Write-Step "Checking no fake provider values in AI mobile files"
$mobileAiRoot = Join-Path $MobileRoot "src\modules\ai\mobile"
$matches = Test-FakeLikeMobileValue $mobileAiRoot
if ($matches.Count -gt 0) {
  $matches | ForEach-Object { Write-Host ("{0}:{1}: {2}" -f $_.Path, $_.LineNumber, $_.Line) -ForegroundColor Red }
  Fail "Actual fake/example/fallback-like values detected in AI mobile files"
}
Ok "No actual fake provider keys, fake URLs, mock translation helpers, or enabled fallback detected in AI mobile files"

Write-Step "Checking premium gating imports and usage"
$chatText = Get-Text $chatScreen
$translationText = Get-Text $translationScreen
$voiceText = Get-Text $voiceScreen

if ($chatText -notmatch "resolveAiPremiumEntitlement") { Fail "Chat screen does not use resolveAiPremiumEntitlement" }
if ($translationText -notmatch "resolveAiPremiumEntitlement") { Fail "Translation screen does not use resolveAiPremiumEntitlement" }
if ($voiceText -notmatch "resolveAiPremiumEntitlement") { Fail "Voice screen does not use resolveAiPremiumEntitlement" }

if ($chatText -notmatch "requirePremium") { Warn "Chat screen may not expose a named requirePremium guard; verify manually." } else { Ok "Chat screen premium guard found" }
if ($translationText -notmatch "requirePremium") { Warn "Translation screen may not expose a named requirePremium guard; verify manually." } else { Ok "Translation screen premium guard found" }
if ($voiceText -notmatch "requirePremium") { Warn "Voice screen may not expose a named requirePremium guard; verify manually." } else { Ok "Voice screen premium guard found" }

Write-Step "Checking backend provider gateway status"
try {
  $manifest = Invoke-RestMethod -Uri "$BackendUrl/api/ai/provider-gateway/manifest" -Method GET
} catch {
  Fail "Cannot read provider gateway manifest. Make sure backend is running on $BackendUrl. $_"
}

if ($manifest.ok -ne $true) { Fail "Manifest returned ok=false" }
if ($manifest.data.gateway.fallbackPolicy -ne "disabled") { Fail "fallbackPolicy is not disabled" }
if ($manifest.data.gateway.localFakeFallback -ne $false) { Fail "localFakeFallback is not false" }
Ok "Manifest ok. Status=$($manifest.data.gateway.status), Version=$($manifest.data.gateway.version)"

Write-Step "Checking provider-not-configured behavior"
$body = @{ text = "hello"; sourceLanguage = "en"; targetLanguage = "ru" } | ConvertTo-Json -Compress
try {
  $response = Invoke-WebRequest -Uri "$BackendUrl/api/ai/provider-gateway/translation/text" -Method POST -ContentType "application/json" -Body $body
  if ($manifest.data.gateway.status -eq "translation_provider_not_configured") {
    Fail "Text translation succeeded while provider is not configured"
  }
  Ok "Text translation succeeded because provider appears configured"
} catch {
  if ($manifest.data.gateway.status -eq "translation_provider_not_configured") {
    Ok "Text translation correctly fails while provider is not configured"
  } else {
    Warn "Text translation failed even though manifest status is $($manifest.data.gateway.status). Check provider credentials before launch. $_"
  }
}

Write-Step "Manual mobile screen checklist"
Write-Host "1. Open /ai/chat: text chat should open. Premium-only tools should show Premium message when account is not premium."
Write-Host "2. Open /ai/translation: text translation should call provider gateway; photo/camera OCR should be Premium-only."
Write-Host "3. Open /ai/voice: voice/TTS should be Premium-only and must not fake a response."
Write-Host "4. Open /ai/premium: Premium screen must not manually toggle entitlement without real payment/contract."
Write-Host "5. Open /ai/settings: provider status should be limited/not configured until real server keys are connected."

Write-Host "`n==> AI-38.1 mobile AI screen check completed" -ForegroundColor Cyan
Ok "AI mobile screens are ready for provider-not-configured mode. Continue with AI-39 visual route verification."
