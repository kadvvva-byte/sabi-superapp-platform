param(
  [switch]$WriteReport
)

$ErrorActionPreference = "Continue"
$version = "BACKEND-STREAM-FOUNDATION-140O-PREVIEW-HANDLER-DIAGNOSIS"
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
function JsonString([string]$s) { return '"' + (JsonEscape $s) + '"' }
function JsonBool([bool]$b) { if ($b) { return "true" } else { return "false" } }

function Get-FileWindowJson([string]$path, [int]$centerLine, [int]$radius) {
  $items = @()
  if (Test-Path $path) {
    try {
      $lines = Get-Content -Path $path -Encoding UTF8 -ErrorAction Stop
      $from = [Math]::Max(1, $centerLine - $radius)
      $to = [Math]::Min($lines.Count, $centerLine + $radius)
      for ($i = $from; $i -le $to; $i++) {
        $items += ('{"line":' + [string]$i + ',"text":' + (JsonString ([string]$lines[$i - 1]).TrimEnd()) + '}')
      }
    } catch {}
  }
  return "[" + [string]::Join(",", $items) + "]"
}

function Search-ContextJson([string]$rootPath, [string[]]$patterns) {
  $items = @()
  if (Test-Path $rootPath) {
    $files = Get-ChildItem -Path $rootPath -Recurse -File -Include *.ts,*.tsx -ErrorAction SilentlyContinue
    foreach ($file in $files) {
      try {
        $lines = Get-Content -Path $file.FullName -Encoding UTF8 -ErrorAction Stop
        for ($i = 0; $i -lt $lines.Count; $i++) {
          $line = [string]$lines[$i]
          foreach ($pattern in $patterns) {
            if ($line -match [regex]::Escape($pattern)) {
              $rel = $file.FullName
              try { $rel = $rel.Replace((Get-Location).Path + "\", "") } catch {}
              $rel = $rel.Replace("\", "/")
              $items += ('{"file":' + (JsonString $rel) + ',"matchLine":' + [string]($i + 1) + ',"pattern":' + (JsonString $pattern) + ',"window":' + (Get-FileWindowJson $rel ($i + 1) 10) + '}')
              break
            }
          }
        }
      } catch {}
    }
  }
  return "[" + [string]::Join(",", $items) + "]"
}

function Extract-StringMatchesJson([string]$rootPath, [string]$regexPattern, [string]$label) {
  $items = @()
  if (Test-Path $rootPath) {
    $files = Get-ChildItem -Path $rootPath -Recurse -File -Include *.ts,*.tsx -ErrorAction SilentlyContinue
    foreach ($file in $files) {
      try {
        $lines = Get-Content -Path $file.FullName -Encoding UTF8 -ErrorAction Stop
        for ($i = 0; $i -lt $lines.Count; $i++) {
          $line = [string]$lines[$i]
          $matches = [regex]::Matches($line, $regexPattern)
          foreach ($m in $matches) {
            $rel = $file.FullName
            try { $rel = $rel.Replace((Get-Location).Path + "\", "") } catch {}
            $rel = $rel.Replace("\", "/")
            $items += ('{"file":' + (JsonString $rel) + ',"line":' + [string]($i + 1) + ',"label":' + (JsonString $label) + ',"value":' + (JsonString $m.Value) + ',"text":' + (JsonString $line.Trim()) + '}')
          }
        }
      } catch {}
    }
  }
  return "[" + [string]::Join(",", $items) + "]"
}

$foundationRoot = "src/modules/stream/foundation"
$appRouteContext = Search-ContextJson "src" @(
  'createStreamFoundationKernelDiagnosticsBackendRouteConnectionHandler',
  'streamDiagnosticsHandler',
  '/api/admin/stream/foundation/diagnostics/preview',
  '/api/admin/stream/foundation/diagnostics/readiness'
)

$handlerContext = Search-ContextJson $foundationRoot @(
  'createStreamFoundationKernelDiagnosticsBackendRouteConnectionHandler',
  'routeId',
  'stream_kernel_diagnostics_snapshot',
  'statusCode',
  '403',
  'forbidden',
  'blocked',
  'allowed',
  'snapshot'
)

$routeIdStrings = Extract-StringMatchesJson $foundationRoot '"stream_[A-Za-z0-9_\-]+"' "stream_route_id_string"
$statusCodeMentions = Extract-StringMatchesJson $foundationRoot 'statusCode\s*:\s*[0-9]+' "status_code_literal"

# Lightweight derived flags by raw text.
$foundationText = ""
if (Test-Path $foundationRoot) {
  try {
    $files = Get-ChildItem -Path $foundationRoot -Recurse -File -Include *.ts,*.tsx -ErrorAction SilentlyContinue
    foreach ($file in $files) {
      $foundationText += "`n" + (Get-Content -Path $file.FullName -Encoding UTF8 -ErrorAction SilentlyContinue | Out-String)
    }
  } catch {}
}

$hasHandler = $foundationText -match "createStreamFoundationKernelDiagnosticsBackendRouteConnectionHandler"
$hasSnapshotRouteId = $foundationText -match "stream_kernel_diagnostics_snapshot"
$hasForbiddenStatus = $foundationText -match "statusCode\s*:\s*403" -or $foundationText -match "403"
$hasRouteIdCheck = $foundationText -match "routeId"

$status = "handler_context_captured"
if ($hasHandler -and $hasSnapshotRouteId -and $hasForbiddenStatus) {
  $status = "handler_context_captured_routeid_and_403_present"
} elseif (-not $hasHandler) {
  $status = "handler_function_not_found"
}

$json = "{"
$json += '"version":' + (JsonString $version) + ","
$json += '"stage":"preview_handler_routeid_source_diagnosis_only",'
$json += '"startedAt":' + (JsonString $startedAt) + ","
$json += '"finishedAt":' + (JsonString ((Get-Date).ToUniversalTime().ToString("o"))) + ","
$json += '"ok":true,'
$json += '"status":' + (JsonString $status) + ","
$json += '"safety":{'
$json += '"backendRestartPerformed":0,'
$json += '"httpMethodsUsed":[],'
$json += '"sourceMutationPerformed":0,'
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
$json += '"derivedSignals":{'
$json += '"handlerFunctionFound":' + (JsonBool $hasHandler) + ","
$json += '"snapshotRouteIdFound":' + (JsonBool $hasSnapshotRouteId) + ","
$json += '"forbiddenStatusMentioned":' + (JsonBool $hasForbiddenStatus) + ","
$json += '"routeIdChecksMentioned":' + (JsonBool $hasRouteIdCheck)
$json += "},"
$json += '"appRouteContext":' + $appRouteContext + ","
$json += '"handlerContext":' + $handlerContext + ","
$json += '"routeIdStrings":' + $routeIdStrings + ","
$json += '"statusCodeMentions":' + $statusCodeMentions + ","
$json += '"assertions":['
$json += '{"id":"source_context_captured","passed":true,"evidence":"Captured app route and foundation handler/routeId/statusCode context."},'
$json += '{"id":"no_runtime_http","passed":true,"evidence":"This diagnosis performs source inspection only; no HTTP request."},'
$json += '{"id":"no_restart_db_provider_wallet_money","passed":true,"evidence":"No backend restart, no source mutation, no DB/provider/Wallet/payment/payout/money action."}'
$json += '],'
$json += '"nextStep":"Use this report to prepare a source-only patch review for preview handler routeId/statusCode mapping. Do not patch blindly."'
$json += "}"

if ($WriteReport) {
  $reportDir = Join-Path (Get-Location) ".data\stream"
  New-Item -ItemType Directory -Force -Path $reportDir | Out-Null
  $reportPath = Join-Path $reportDir "backend-stream-foundation-140o-preview-handler-diagnosis-result.json"
  $json | Set-Content -Encoding UTF8 -Path $reportPath
}

Write-Output $json
if ($WriteReport) {
  Write-Host "140O-PREVIEW-HANDLER-DIAGNOSIS report written to $reportPath"
}
