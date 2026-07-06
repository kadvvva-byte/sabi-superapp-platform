$ErrorActionPreference = "Stop"

$root = "C:\Users\User\Desktop\superapp"
$out = "C:\Users\User\Desktop\superapp-messenger-backend-for-fix.zip"
$tmp = Join-Path $env:TEMP ("superapp-messenger-backend-for-fix-" + [Guid]::NewGuid().ToString("N"))

if (!(Test-Path $root)) {
  throw "Backend root not found: $root"
}

New-Item -ItemType Directory -Path $tmp | Out-Null

$items = @(
  "src\modules\messenger",
  "src\modules\user",
  "src\modules\auth",
  "src\modules\shared",
  "src\lib",
  "src\shared",
  "prisma\schema.prisma",
  "package.json",
  "tsconfig.json"
)

foreach ($item in $items) {
  $source = Join-Path $root $item
  if (Test-Path $source) {
    $dest = Join-Path $tmp $item
    $destParent = Split-Path $dest -Parent
    if (!(Test-Path $destParent)) {
      New-Item -ItemType Directory -Path $destParent -Force | Out-Null
    }
    Copy-Item $source $dest -Recurse -Force
  }
}

if (Test-Path $out) {
  Remove-Item $out -Force
}

Compress-Archive -Path (Join-Path $tmp "*") -DestinationPath $out -Force
Remove-Item $tmp -Recurse -Force

Write-Host "Created: $out"
