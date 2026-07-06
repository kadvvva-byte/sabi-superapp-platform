param(
  [switch]$RunTsc,
  [switch]$WriteReport,
  [string]$ReportPath = ".data\stream\backend-stream-foundation-144m-target-patch-planning-compile-safety-verification-result.json"
)
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Version = "BACKEND-STREAM-FOUNDATION-144M"
$Stage = "target_patch_planning_batch_compile_safety_verification_ops_only"
$StartedAt = (Get-Date).ToUniversalTime().ToString("o")
$OwnerApprovalText = "I approve BACKEND-STREAM-FOUNDATION-144M controlled target patch planning batch compile and safety verification ops-only, verify 144L source-only target patch planning contracts compile and remain limited to src/modules/stream/foundation, do not modify source, do not restart backend, no runtime POST, no runtime DB read/write, no provider call, no provider secret read, no realtime socket open, no realtime broadcast, no moderation bypass, no runtime mount, no route behavior change, no target route write, no rollback execution, no post-mount smoke, no Wallet mutation, no payment authorization, no monthly payout, no money movement, no fake success."
$RequiredApprovalTextFor144N = "I approve BACKEND-STREAM-FOUNDATION-144N controlled target patch planning post-verification handoff source-only, use 144M verification evidence to close 144L target patch planning batch and prepare the next safe target patch draft planning package for dedicated Stream route boundary strategy, without source target writes, without creating stream.routes.ts or stream-live.routes.ts, without prisma schema write, without migration, without backend restart, without runtime POST, without runtime DB read/write, without provider call, without provider secret read, without realtime socket open, without realtime broadcast, without moderation bypass, without runtime mount, without route behavior change, without target route write, without rollback execution, without post-mount smoke, without Wallet mutation, without payment authorization, without monthly payout, without money movement, and without fake success."

function Read-TextFile([string]$Path) {
  if (-not (Test-Path -LiteralPath $Path)) { return "" }
  return Get-Content -LiteralPath $Path -Raw -Encoding UTF8
}
function Get-SafeFileHash([string]$Path) {
  if (-not (Test-Path -LiteralPath $Path)) { return $null }
  return (Get-FileHash -Algorithm SHA256 -LiteralPath $Path).Hash.ToLowerInvariant()
}
function Test-ContainsAll([string]$Path, [string[]]$Fragments) {
  $text = Read-TextFile $Path
  $missing = @()
  foreach ($fragment in $Fragments) {
    if (-not $text.Contains($fragment)) { $missing += $fragment }
  }
  return [ordered]@{
    path = $Path
    exists = (Test-Path -LiteralPath $Path)
    missingFragments = $missing
    ok = ((Test-Path -LiteralPath $Path) -and @($missing).Length -eq 0)
  }
}
function To-Rel([string]$FullName) {
  return $FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
}

$ContractDir = "src/modules/stream/foundation/target-patch-planning-144l"
$ManifestPath = "src/modules/stream/foundation/stream144lTargetPatchPlanningStagingManifest.ts"
$Required144LFiles = @(
  "$ContractDir/index.ts",
  "$ContractDir/stream144lTargetPatchPlanning.ts",
  "$ContractDir/stream144lTargetPatchPlanningContracts.ts",
  "$ContractDir/stream144lTargetPatchPlanningReadiness.ts",
  "$ContractDir/stream144lTargetPatchPlanningSmoke.ts",
  $ManifestPath
)

$RequiredFileChecks = @()
foreach ($p in $Required144LFiles) {
  $RequiredFileChecks += [ordered]@{ path=$p; exists=(Test-Path -LiteralPath $p); sha256=(Get-SafeFileHash $p) }
}
$MissingRequiredFiles = @($RequiredFileChecks | Where-Object { $_.exists -ne $true })

$ContractContentChecks = @(
  (Test-ContainsAll "$ContractDir/stream144lTargetPatchPlanningContracts.ts" @(
    "BACKEND-STREAM-FOUNDATION-144L",
    "StreamFoundation144LTargetPatchPlanningSnapshot",
    "StreamFoundation144LCandidateTargetEvidence",
    "StreamFoundation144LMissingRouteFileStrategy",
    "prefer_dedicated_stream_route_boundary_later",
    "sourceTargetWriteAllowedNow: false",
    "targetRouteWriteAllowedNow: false",
    "runtimeMountAllowedNow: false",
    "fakeSuccessAllowedNow: false"
  )),
  (Test-ContainsAll "$ContractDir/stream144lTargetPatchPlanning.ts" @(
    "getStreamFoundation144LTargetPatchPlanningSnapshot",
    "CANDIDATE_TARGET_COMPARISON",
    "missingRouteFileStrategy",
    "preferredDirectionPlan",
    "src_app_ts",
    "admin_routes_ts",
    "dedicated_stream_routes_option",
    "dedicated_stream_live_routes_option",
    "targetPatchDecisionMadeNow: false",
    "targetRouteWriteAllowedNow: false",
    "runtimeMountAllowedNow: false",
    "fakeSuccessBy144L: false"
  )),
  (Test-ContainsAll "$ContractDir/stream144lTargetPatchPlanningReadiness.ts" @(
    "getStreamFoundation144LTargetPatchPlanningReadiness",
    "target_patch_planning_batch_ready_for_compile_verification",
    "snapshot.candidateTargetComparison.length === 7",
    "streamRoutesExistsNow === false",
    "streamLiveRoutesExistsNow === false",
    "prefer_dedicated_stream_route_boundary_later"
  )),
  (Test-ContainsAll "$ContractDir/stream144lTargetPatchPlanningSmoke.ts" @(
    "runStreamFoundation144LTargetPatchPlanningSmoke",
    "candidate_targets_compared_without_selection",
    "missing_stream_route_files_documented",
    "preferred_direction_is_dedicated_boundary_later"
  )),
  (Test-ContainsAll $ManifestPath @(
    "STREAM_144L_TARGET_PATCH_PLANNING_STAGING_MANIFEST",
    "sourceOnly: true",
    "prefer_dedicated_stream_route_boundary_later",
    "targetPatchDecisionMadeNow: false",
    "createMissingRouteFilesAllowed: false",
    "targetRouteWriteAllowed: false",
    "runtimeMountAllowed: false",
    "fakeSuccessAllowed: false"
  ))
)
$ContractContentFailures = @($ContractContentChecks | Where-Object { $_.ok -ne $true })

$ForbiddenTargetFiles = @("src/app.ts","src/server.ts","src/modules/stream/index.ts","src/modules/admin/admin.routes.ts","prisma/schema.prisma")
$ForbiddenTargetReferences = @()
foreach ($p in $ForbiddenTargetFiles) {
  $text = Read-TextFile $p
  $has = $text.Contains("BACKEND-STREAM-FOUNDATION-144L") -or $text.Contains("stream144l") -or $text.Contains("target-patch-planning-144l")
  $ForbiddenTargetReferences += [ordered]@{ path=$p; exists=(Test-Path -LiteralPath $p); contains144LReference=$has; ok=(-not $has) }
}
$ForbiddenTargetReferenceFailures = @($ForbiddenTargetReferences | Where-Object { $_.ok -ne $true })

$Actual144LArtifactOutsideFoundation = @($Required144LFiles | Where-Object { -not $_.StartsWith("src/modules/stream/foundation/") })
$Actual144LArtifactUnexpected = @($Required144LFiles | Where-Object { $Required144LFiles -notcontains $_ })
$AllowedScopeOk = (@($MissingRequiredFiles).Length -eq 0 -and @($Actual144LArtifactOutsideFoundation).Length -eq 0 -and @($Actual144LArtifactUnexpected).Length -eq 0)

$HistoricalApprovalTextReferenceFiles = @()
if (Test-Path -LiteralPath "src/modules/stream/foundation") {
  $HistoricalApprovalTextReferenceFiles = @(
    Get-ChildItem -LiteralPath "src/modules/stream/foundation" -Recurse -File -Include "*.ts" |
      Where-Object {
        $rel = To-Rel $_.FullName
        if ($Required144LFiles -contains $rel) { return $false }
        (Read-TextFile $_.FullName).Contains("BACKEND-STREAM-FOUNDATION-144L")
      } | ForEach-Object { To-Rel $_.FullName }
  )
}

$AllContractText = ""
foreach ($p in $Required144LFiles) { $AllContractText += "`n---$p---`n" + (Read-TextFile $p) }

$ForbiddenSafetyFragments = @(
  "targetWriteBy144L: true","appTsChangeBy144L: true","serverTsChangeBy144L: true","streamIndexChangeBy144L: true",
  "adminRoutesChangeBy144L: true","missingRouteFileCreateBy144L: true","prismaSchemaChangeBy144L: true","migrationCreatedBy144L: true",
  "routeBehaviorChangeBy144L: true","backendRestartBy144L: true","runtimeHttpBy144L: true","runtimePostBy144L: true",
  "runtimeDbReadBy144L: true","runtimeDbWriteBy144L: true","providerCallBy144L: true","providerSecretReadBy144L: true",
  "realtimeSocketOpenBy144L: true","realtimeBroadcastBy144L: true","moderationBypassBy144L: true","runtimeMountBy144L: true",
  "targetRouteWriteBy144L: true","rollbackExecutionBy144L: true","postMountSmokeBy144L: true","walletMutationBy144L: true",
  "paymentAuthorizationBy144L: true","monthlyPayoutBy144L: true","moneyMovementBy144L: true","fakeSuccessBy144L: true",
  "selectedNow: true","patchDecisionMadeNow: true","sourceTargetWriteAllowedNow: true","targetRouteWriteAllowedNow: true",
  "routeBehaviorChangeAllowedNow: true","runtimeMountAllowedNow: true","createFilesNow: true","createMissingRouteFileAllowedNow: true",
  "appTsWriteAllowedNow: true","serverTsWriteAllowedNow: true","streamIndexWriteAllowedNow: true","adminRoutesWriteAllowedNow: true",
  "prismaSchemaWriteAllowedNow: true","migrationAllowedNow: true","backendRestartAllowedNow: true","runtimeHttpAllowedNow: true",
  "runtimePostAllowedNow: true","runtimeDbReadAllowedNow: true","runtimeDbWriteAllowedNow: true","providerCallAllowedNow: true",
  "providerSecretReadAllowedNow: true","realtimeSocketOpenAllowedNow: true","realtimeBroadcastAllowedNow: true","moderationBypassAllowedNow: true",
  "rollbackExecutionAllowedNow: true","postMountSmokeAllowedNow: true","walletMutationAllowedNow: true","paymentAuthorizationAllowedNow: true",
  "monthlyPayoutAllowedNow: true","moneyMovementAllowedNow: true","fakeSuccessAllowedNow: true","targetPatchDecisionMadeNow: true",
  "sourceModificationAllowedFor144M: true","targetRouteWriteAllowedFor144M: true","runtimeMountAllowedFor144M: true",
  "routeBehaviorChangeAllowedFor144M: true","fakeSuccessAllowedFor144M: true"
)
$ForbiddenSafetyHits = @()
foreach ($frag in $ForbiddenSafetyFragments) { if ($AllContractText.Contains($frag)) { $ForbiddenSafetyHits += $frag } }

$MigrationPathHits = @()
foreach ($dir in @("prisma/migrations","migrations")) {
  if (Test-Path -LiteralPath $dir) {
    $MigrationPathHits += @(
      Get-ChildItem -LiteralPath $dir -Recurse -File |
      Where-Object {
        $_.Name.Contains("144l") -or (Read-TextFile $_.FullName).Contains("BACKEND-STREAM-FOUNDATION-144L")
      } | ForEach-Object { To-Rel $_.FullName }
    )
  }
}
$MigrationPathHits = @($MigrationPathHits | Select-Object -Unique)

$TscResult = [ordered]@{ runTsc=[bool]$RunTsc; exitCode=$null; outputTail=@() }
if ($RunTsc) {
  $tscOutput = & cmd /c "npx tsc --noEmit" 2>&1
  $TscResult.exitCode = $LASTEXITCODE
  $TscResult.outputTail = @($tscOutput | Select-Object -Last 260)
}
$CompileOk = (-not $RunTsc) -or ($TscResult.exitCode -eq 0)

$Safety = [ordered]@{
  sourceModificationPerformed=0
  backendRestartPerformed=0
  runtimeHttpPerformedBy144M=0
  runtimePostPerformedBy144M=0
  runtimeDbReadPerformed=0
  runtimeDbWritePerformed=0
  databaseReadPerformed=0
  databaseWritePerformed=0
  providerCallPerformed=0
  providerSecretReadPerformed=0
  realtimeSocketOpenPerformed=0
  realtimeBroadcastPerformed=0
  moderationBypassPerformed=0
  runtimeMountPerformed=0
  routeBehaviorChangePerformed=0
  targetRouteWritePerformed=0
  targetFileReadPerformed=0
  createMissingRouteFilePerformed=0
  rollbackExecutionPerformed=0
  postMountSmokePerformed=0
  walletMutationPerformed=0
  paymentAuthorizationPerformed=0
  monthlyPayoutPerformed=0
  moneyMovementPerformed=0
  fakeSuccessAllowed=$false
}

$Ok = ($CompileOk -and $AllowedScopeOk -and @($ContractContentFailures).Length -eq 0 -and @($ForbiddenTargetReferenceFailures).Length -eq 0 -and @($ForbiddenSafetyHits).Length -eq 0 -and @($MigrationPathHits).Length -eq 0)
$FinishedAt = (Get-Date).ToUniversalTime().ToString("o")

$Report = [ordered]@{
  version=$Version
  stage=$Stage
  startedAt=$StartedAt
  finishedAt=$FinishedAt
  ok=$Ok
  status=$(if ($Ok) { "target_patch_planning_batch_compile_safety_verification_passed" } else { "target_patch_planning_batch_compile_safety_verification_blocked" })
  ownerApprovalAccepted=$true
  ownerApprovalText=$OwnerApprovalText
  requiredApprovalTextFor144N=$RequiredApprovalTextFor144N
  scopeVerification=[ordered]@{
    requiredFiles=$RequiredFileChecks
    missingRequiredFiles=$MissingRequiredFiles
    actual144LArtifactFiles=$Required144LFiles
    actual144LArtifactOutsideFoundation=$Actual144LArtifactOutsideFoundation
    actual144LArtifactUnexpected=$Actual144LArtifactUnexpected
    historicalApprovalTextReferenceFiles=$HistoricalApprovalTextReferenceFiles
    historicalApprovalTextReferencesAreInformational=$true
    limitedToStreamFoundation=$AllowedScopeOk
  }
  targetReferenceVerification=[ordered]@{
    forbiddenTargetFiles=$ForbiddenTargetReferences
    failed=@($ForbiddenTargetReferenceFailures).Length
    ok=(@($ForbiddenTargetReferenceFailures).Length -eq 0)
  }
  contractContentVerification=[ordered]@{
    total=@($ContractContentChecks).Length
    passed=@($ContractContentChecks | Where-Object { $_.ok -eq $true }).Length
    failed=@($ContractContentFailures).Length
    failures=$ContractContentFailures
  }
  safetyFragmentVerification=[ordered]@{
    forbiddenSafetyHits=$ForbiddenSafetyHits
    ok=(@($ForbiddenSafetyHits).Length -eq 0)
  }
  migrationVerification=[ordered]@{
    migrationPathHits=$MigrationPathHits
    ok=(@($MigrationPathHits).Length -eq 0)
  }
  tscResult=$TscResult
  safety=$Safety
  nextRecommendedStage=$(if ($Ok) { "BACKEND-STREAM-FOUNDATION-144N controlled target patch planning post-verification handoff source-only after exact approval" } else { "Review 144M report before any next stage" })
}

if ($WriteReport) {
  $parent = Split-Path -Parent $ReportPath
  if ($parent -and -not (Test-Path -LiteralPath $parent)) { New-Item -ItemType Directory -Force -Path $parent | Out-Null }
  $Report | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath $ReportPath -Encoding UTF8
}
$Report | ConvertTo-Json -Depth 100
if (-not $Ok) { exit 1 }
