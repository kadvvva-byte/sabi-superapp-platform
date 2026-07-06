param(
  [string]$BaseUrl = "http://127.0.0.1:3000",
  [switch]$WriteReport
)

$ErrorActionPreference = "Continue"

function ConvertTo-SafeJson($value) {
  return $value | ConvertTo-Json -Depth 20
}

function Get-BaseEndpoint([string]$url) {
  try {
    $uri = [System.Uri]::new($url)
    $port = $uri.Port
    if ($port -lt 0) {
      if ($uri.Scheme -eq "https") { $port = 443 } else { $port = 80 }
    }
    return [pscustomobject]@{ scheme = $uri.Scheme; host = $uri.Host; port = $port; parseOk = $true; error = $null }
  } catch {
    return [pscustomobject]@{ scheme = $null; host = $null; port = $null; parseOk = $false; error = $_.Exception.Message }
  }
}

function Get-ListenersForPorts([int[]]$ports) {
  $items = @()
  foreach ($port in $ports) {
    try {
      $connections = @(Get-NetTCPConnection -State Listen -LocalPort $port -ErrorAction SilentlyContinue)
      foreach ($connection in $connections) {
        $processName = $null
        try {
          $processName = (Get-Process -Id $connection.OwningProcess -ErrorAction SilentlyContinue).ProcessName
        } catch {}
        $items += [pscustomobject]@{
          localAddress = $connection.LocalAddress
          localPort = $connection.LocalPort
          owningProcessId = $connection.OwningProcess
          processName = $processName
        }
      }
    } catch {
      $items += [pscustomobject]@{
        localAddress = $null
        localPort = $port
        owningProcessId = $null
        processName = $null
        error = $_.Exception.Message
      }
    }
  }
  return @($items)
}

function Test-TcpPort([string]$hostName, [int]$port) {
  try {
    $client = [System.Net.Sockets.TcpClient]::new()
    $async = $client.BeginConnect($hostName, $port, $null, $null)
    $success = $async.AsyncWaitHandle.WaitOne(1500, $false)
    if (-not $success) {
      $client.Close()
      return [pscustomobject]@{ host = $hostName; port = $port; reachable = $false; error = "tcp_connect_timeout" }
    }
    $client.EndConnect($async)
    $client.Close()
    return [pscustomobject]@{ host = $hostName; port = $port; reachable = $true; error = $null }
  } catch {
    return [pscustomobject]@{ host = $hostName; port = $port; reachable = $false; error = $_.Exception.Message }
  }
}

function Get-NodeProcesses() {
  try {
    return @(Get-Process -Name node -ErrorAction SilentlyContinue | Select-Object Id, ProcessName, StartTime)
  } catch {
    return @()
  }
}

function Get-PackageSummary() {
  $packagePath = Join-Path (Get-Location) "package.json"
  if (-not (Test-Path $packagePath)) {
    return [pscustomobject]@{ packageJsonPresent = $false; scriptNames = @(); error = "package.json_not_found" }
  }
  try {
    $pkg = Get-Content $packagePath -Raw | ConvertFrom-Json
    $scriptNames = @()
    if ($pkg.scripts) {
      $scriptNames = @($pkg.scripts.PSObject.Properties.Name | Sort-Object)
    }
    return [pscustomobject]@{ packageJsonPresent = $true; scriptNames = $scriptNames; error = $null }
  } catch {
    return [pscustomobject]@{ packageJsonPresent = $true; scriptNames = @(); error = $_.Exception.Message }
  }
}

$startedAt = (Get-Date).ToUniversalTime().ToString("o")
$endpoint = Get-BaseEndpoint $BaseUrl
$portsToCheck = @(3000, 4001, 8081)
if ($endpoint.parseOk -and ($portsToCheck -notcontains [int]$endpoint.port)) { $portsToCheck += [int]$endpoint.port }
$portsToCheck = @($portsToCheck | Sort-Object -Unique)

$listeners = Get-ListenersForPorts $portsToCheck
$tcp = if ($endpoint.parseOk) { Test-TcpPort $endpoint.host ([int]$endpoint.port) } else { [pscustomobject]@{ host = $null; port = $null; reachable = $false; error = $endpoint.error } }
$nodes = Get-NodeProcesses
$packageSummary = Get-PackageSummary
$tsconfigPresent = Test-Path (Join-Path (Get-Location) "tsconfig.json")
$streamIndexPresent = Test-Path (Join-Path (Get-Location) "src/modules/stream/index.ts")
$appTsPresent = Test-Path (Join-Path (Get-Location) "src/app.ts")

$basePortListening = @($listeners | Where-Object { $_.localPort -eq [int]$endpoint.port }).Count -gt 0

$assertions = @(
  [pscustomobject]@{ id = "base_url_parse_ok"; passed = [bool]$endpoint.parseOk; evidence = if ($endpoint.parseOk) { "BaseUrl parsed host=$($endpoint.host) port=$($endpoint.port)" } else { "BaseUrl parse error: $($endpoint.error)" } },
  [pscustomobject]@{ id = "base_port_listening"; passed = [bool]$basePortListening; evidence = if ($basePortListening) { "Port $($endpoint.port) has a listener." } else { "No listener found on port $($endpoint.port)." } },
  [pscustomobject]@{ id = "tcp_connect_base_port"; passed = [bool]$tcp.reachable; evidence = if ($tcp.reachable) { "TCP connect to $($endpoint.host):$($endpoint.port) passed." } else { "TCP connect to $($endpoint.host):$($endpoint.port) failed: $($tcp.error)" } },
  [pscustomobject]@{ id = "node_process_detected"; passed = (@($nodes).Count -gt 0); evidence = "node process count=$(@($nodes).Count)" },
  [pscustomobject]@{ id = "package_json_present"; passed = [bool]$packageSummary.packageJsonPresent; evidence = if ($packageSummary.packageJsonPresent) { "package.json present; script names only collected." } else { "package.json not found." } },
  [pscustomobject]@{ id = "tsconfig_present"; passed = [bool]$tsconfigPresent; evidence = "tsconfig.json present=$tsconfigPresent" },
  [pscustomobject]@{ id = "stream_index_present"; passed = [bool]$streamIndexPresent; evidence = "src/modules/stream/index.ts present=$streamIndexPresent" },
  [pscustomobject]@{ id = "app_ts_present"; passed = [bool]$appTsPresent; evidence = "src/app.ts present=$appTsPresent" },
  [pscustomobject]@{ id = "no_restart_db_provider_wallet_money"; passed = $true; evidence = "This diagnosis contains no restart command, no POST/PUT/PATCH/DELETE, no DB/provider/Wallet/payment/payout/money action." }
)

$failed = @($assertions | Where-Object { -not $_.passed })
$status = if ($basePortListening -and $tcp.reachable) {
  "backend_port_reachable_ready_for_140k_http_smoke_rerun"
} elseif (-not $basePortListening) {
  "backend_not_listening_on_base_port"
} else {
  "backend_listener_found_but_tcp_probe_failed"
}

$report = [pscustomobject]@{
  version = "BACKEND-STREAM-FOUNDATION-140K-BLOCKED-DIAGNOSIS"
  stage = "no_restart_backend_port_process_diagnosis_only"
  baseUrl = $BaseUrl
  startedAt = $startedAt
  finishedAt = (Get-Date).ToUniversalTime().ToString("o")
  ok = ($failed.Count -eq 0)
  status = $status
  safety = [pscustomobject]@{
    backendRestartPerformed = 0
    runtimeHttpSmokePerformed = 0
    httpMethodsUsed = @()
    databaseWritePerformed = 0
    providerCallPerformed = 0
    walletMutationPerformed = 0
    paymentAuthorizationPerformed = 0
    monthlyPayoutPerformed = 0
    moneyMovementPerformed = 0
    rawSecretsReturned = 0
    fakeSuccessAllowed = $false
  }
  endpoint = $endpoint
  tcpProbe = $tcp
  listeners = $listeners
  nodeProcesses = $nodes
  packageSummary = $packageSummary
  sourcePresence = [pscustomobject]@{
    tsconfigJson = $tsconfigPresent
    appTs = $appTsPresent
    streamIndexTs = $streamIndexPresent
  }
  assertions = $assertions
  failedAssertions = $failed
  nextStepIfPortReachable = "Rerun 140K runtime HTTP smoke without restart."
  nextStepIfBackendNotListening = "Owner may approve controlled backend start/restart only; do not perform automatically."
}

if ($WriteReport) {
  $reportDir = Join-Path (Get-Location) ".data/stream"
  New-Item -ItemType Directory -Force -Path $reportDir | Out-Null
  $reportPath = Join-Path $reportDir "backend-stream-foundation-140k-blocked-backend-diagnosis-result.json"
  $report | ConvertTo-Json -Depth 20 | Set-Content -Path $reportPath -Encoding UTF8
}

$report | ConvertTo-Json -Depth 20
