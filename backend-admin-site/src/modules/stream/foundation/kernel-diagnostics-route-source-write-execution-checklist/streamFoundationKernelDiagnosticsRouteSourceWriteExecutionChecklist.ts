import {
  getStreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageSnapshot,
  STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_APPROVAL_COMMAND_PACKAGE_SAFETY,
} from "../kernel-diagnostics-route-source-write-approval-command-package";
import {
  STREAM_FOUNDATION_138W_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_EXECUTION_CHECKLIST_VERSION,
  type StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistDecision,
  type StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistItem,
  type StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistItemId,
  type StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistPhase,
  type StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistPhaseId,
  type StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistSafety,
  type StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistSnapshot,
  type StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistStatus,
} from "./streamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistContracts";

export const STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_EXECUTION_CHECKLIST_SAFETY: StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistSafety = {
  ...STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_APPROVAL_COMMAND_PACKAGE_SAFETY,
  writeExecutionChecklistOnly: true,
  writeExecutionChecklistBuiltNow: true,
  exactOwnerExecutionApprovalCapturedNow: false,
  exactOwnerExecutionApprovalPersistedNow: false,
  freshForbiddenPathScanPerformedNow: false,
  commandExecutionApprovedNow: false,
  commandExecutionPerformedNow: false,
  routeSourceWriteCommandExecutedNow: false,
  routeSourceFilesWrittenNow: false,
  implementationSourceFilesGeneratedNow: false,
  implementationSourceTextReturnedNow: false,
  executableCommandTextReturnedNow: false,
  postWriteTypecheckExecutedNow: false,
  postWriteSmokeExecutedNow: false,
  routeMountApprovedNow: false,
  routeMountPerformedNow: false,
  protectedRouteRegisteredNow: false,
  expressRouterCreatedNow: false,
  runtimeHttpRequestPerformedNow: false,
  databaseReadAllowedNow: false,
  databaseWriteAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentAuthorizationAllowedNow: false,
  monthlyPayoutAllowedNow: false,
  moneyMovementAllowedNow: false,
  rawSecretsReturned: false,
  mobileProviderKeysAllowed: false,
  fakeSuccessAllowed: false,
};

type CommandPackageSnapshot = ReturnType<typeof getStreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageSnapshot>;

const DIAGNOSTICS_ROUTE_SOURCE_TARGET_PATHS = [
  "src/modules/stream/foundation/kernel-diagnostics-admin-route-source/streamFoundationKernelDiagnosticsAdminRouteSourceContracts.ts",
  "src/modules/stream/foundation/kernel-diagnostics-admin-route-source/streamFoundationKernelDiagnosticsAdminRouteSource.ts",
  "src/modules/stream/foundation/kernel-diagnostics-admin-route-source/streamFoundationKernelDiagnosticsAdminRouteSourceReadiness.ts",
  "src/modules/stream/foundation/kernel-diagnostics-admin-route-source/streamFoundationKernelDiagnosticsAdminRouteSourceSmoke.ts",
  "src/modules/stream/foundation/kernel-diagnostics-admin-route-source/index.ts",
] as const;

function checklistItem(
  itemId: StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistItemId,
  phaseId: StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistPhaseId,
  passed: boolean,
  blocking: boolean,
  requiredBeforeSourceWrite: boolean,
  requiredBeforeRouteMount: boolean,
  evidence: readonly string[],
  blockedAction: readonly string[],
): StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistItem {
  return {
    itemId,
    phaseId,
    passed,
    blocking,
    requiredBeforeSourceWrite,
    requiredBeforeRouteMount,
    evidence,
    blockedAction,
    safeCode: `stream_kernel_diagnostics_route_source_write_execution_checklist_${itemId}_${passed ? "passed" : "blocked"}`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceWriteExecutionChecklist.${itemId}.${passed ? "passed" : "blocked"}`,
  };
}

function buildChecklistItems(commandPackage: CommandPackageSnapshot): readonly StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistItem[] {
  const commandPackageReady = commandPackage.readyForOwnerWriteApproval && commandPackage.blockingCommandItemCount === 0;
  const foundationOnlyTargets = DIAGNOSTICS_ROUTE_SOURCE_TARGET_PATHS.every((targetPath) => targetPath.startsWith("src/modules/stream/foundation/"));
  const runtimeSafe =
    commandPackage.runtimeHttpRequestsPerformed === 0 &&
    commandPackage.providerCallsPerformed === 0 &&
    commandPackage.databaseExecutionPerformed === 0 &&
    commandPackage.walletMutationPerformed === 0 &&
    commandPackage.paymentAuthorizationPerformed === 0 &&
    commandPackage.monthlyPayoutPerformed === 0 &&
    commandPackage.moneyMovementPerformed === 0 &&
    commandPackage.fakeSuccessAllowed === false;

  return [
    checklistItem(
      "command_package_ready_verified",
      "pre_execution_owner_approval_phase",
      commandPackageReady,
      !commandPackageReady,
      true,
      true,
      [`commandPackageStatus=${commandPackage.status}`, `blockingCommandItemCount=${commandPackage.blockingCommandItemCount}`],
      ["route source write execution"],
    ),
    checklistItem(
      "exact_owner_execution_approval_required_verified",
      "pre_execution_owner_approval_phase",
      commandPackage.commandExecutionApprovedNow === false && commandPackage.commandExecutionPerformedNow === false,
      false,
      true,
      true,
      ["future write execution must require a new exact owner approval message naming diagnostics route source write only"],
      ["automatic write execution", "implicit approval reuse"],
    ),
    checklistItem(
      "fresh_forbidden_path_scan_required_verified",
      "fresh_forbidden_path_scan_phase",
      commandPackage.commandPreviews.some((preview) => preview.commandKind === "forbidden_path_rescan_command_preview"),
      false,
      true,
      true,
      ["fresh forbidden path scan is required immediately before any future route source write"],
      ["write without fresh path scan"],
    ),
    checklistItem(
      "foundation_only_target_paths_verified",
      "source_write_boundary_phase",
      foundationOnlyTargets,
      !foundationOnlyTargets,
      true,
      true,
      [...DIAGNOSTICS_ROUTE_SOURCE_TARGET_PATHS],
      ["non-foundation file write"],
    ),
    checklistItem(
      "stream_index_exclusion_verified",
      "source_write_boundary_phase",
      commandPackage.streamIndexPatchIncluded === false && (DIAGNOSTICS_ROUTE_SOURCE_TARGET_PATHS as readonly string[]).every((path) => path !== "src/modules/stream/index.ts"),
      commandPackage.streamIndexPatchIncluded !== false,
      true,
      true,
      ["src/modules/stream/index.ts remains excluded from this patch and from proposed target paths"],
      ["stream module entrypoint patch"],
    ),
    checklistItem(
      "app_server_exclusion_verified",
      "source_write_boundary_phase",
      commandPackage.appServerPatchIncluded === false && commandPackage.streamModulePatchIncluded === false,
      !(commandPackage.appServerPatchIncluded === false && commandPackage.streamModulePatchIncluded === false),
      true,
      true,
      ["src/app.ts, src/server.ts and stream module entrypoint remain excluded"],
      ["app/server mount patch"],
    ),
    checklistItem(
      "route_mount_separate_step_verified",
      "route_mount_deferred_phase",
      commandPackage.routeMountApprovedNow === false && commandPackage.routeMountPerformed === false && commandPackage.protectedRouteRegisteredNow === false,
      !(commandPackage.routeMountApprovedNow === false && commandPackage.routeMountPerformed === false && commandPackage.protectedRouteRegisteredNow === false),
      false,
      true,
      ["route source write is not route mount; mount requires a later separate approval and gate"],
      ["protected route registration", "Express router mount"],
    ),
    checklistItem(
      "runtime_http_disabled_verified",
      "post_write_compile_and_smoke_phase",
      commandPackage.runtimeHttpRequestsPerformed === 0,
      commandPackage.runtimeHttpRequestsPerformed !== 0,
      true,
      true,
      ["runtime HTTP requests performed now = 0"],
      ["runtime HTTP request"],
    ),
    checklistItem(
      "provider_wallet_money_disabled_verified",
      "post_write_compile_and_smoke_phase",
      runtimeSafe,
      !runtimeSafe,
      true,
      true,
      ["provider calls, Wallet mutation, payment authorization, monthly payout and money movement remain zero"],
      ["provider call", "Wallet mutation", "money movement"],
    ),
    checklistItem(
      "raw_secret_and_mobile_key_blocked_verified",
      "post_write_compile_and_smoke_phase",
      commandPackage.rawSecretsReturned === 0 && commandPackage.mobileProviderKeysAllowed === false,
      !(commandPackage.rawSecretsReturned === 0 && commandPackage.mobileProviderKeysAllowed === false),
      true,
      true,
      ["raw secrets returned = 0", "mobile provider keys allowed = false"],
      ["raw secret exposure", "mobile provider key exposure"],
    ),
  ];
}

function phase(
  phaseId: StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistPhaseId,
  title: string,
  purpose: string,
  ownerApprovalRequiredLater: boolean,
  requiredItemIds: readonly StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistItemId[],
  proposedTargetPaths: readonly string[] = [],
): StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistPhase {
  return {
    phaseId,
    title,
    purpose,
    allowedToExecuteNow: false,
    ownerApprovalRequiredLater,
    separateRouteMountApprovalRequiredLater: true,
    writesRouteSourceNow: false,
    mountsRouteNow: false,
    touchesStreamIndex: false,
    touchesAppServer: false,
    touchesWalletMessengerAdmin: false,
    touchesPrismaOrEnv: false,
    requiredItemIds,
    proposedTargetPaths,
    safeCode: `stream_kernel_diagnostics_route_source_write_execution_checklist_phase_${phaseId}_blocked`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceWriteExecutionChecklist.phase.${phaseId}.blocked`,
  };
}

function buildPhases(): readonly StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistPhase[] {
  return [
    phase(
      "pre_execution_owner_approval_phase",
      "Capture exact owner approval later",
      "The future write execution must be approved as source-only diagnostics route source creation; this checklist captures no approval now.",
      true,
      ["command_package_ready_verified", "exact_owner_execution_approval_required_verified"],
    ),
    phase(
      "fresh_forbidden_path_scan_phase",
      "Run fresh forbidden path scan later",
      "A new scan must run immediately before any later write so the patch still excludes stream index, app/server, Wallet, Messenger, Admin, Prisma and env files.",
      true,
      ["fresh_forbidden_path_scan_required_verified"],
    ),
    phase(
      "source_write_boundary_phase",
      "Keep the later source write foundation-only",
      "The proposed diagnostics route source files are limited to src/modules/stream/foundation/** and remain unmounted.",
      true,
      ["foundation_only_target_paths_verified", "stream_index_exclusion_verified", "app_server_exclusion_verified"],
      DIAGNOSTICS_ROUTE_SOURCE_TARGET_PATHS,
    ),
    phase(
      "post_write_compile_and_smoke_phase",
      "Require TypeScript and safety smoke after later write",
      "After any future approved source write, compile and smoke must confirm no runtime HTTP, provider, Wallet, payout, money movement, secrets or fake success were introduced.",
      true,
      ["runtime_http_disabled_verified", "provider_wallet_money_disabled_verified", "raw_secret_and_mobile_key_blocked_verified"],
    ),
    phase(
      "route_mount_deferred_phase",
      "Defer route mount to a separate later approval",
      "Diagnostics route source creation does not register a protected route; mount remains blocked until a separate route mount gate and owner approval.",
      true,
      ["route_mount_separate_step_verified"],
    ),
  ];
}

function buildDecision(
  commandPackage: CommandPackageSnapshot,
  checklistItems: readonly StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistItem[],
): StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistDecision {
  const blockingItemIds = checklistItems.filter((item) => item.blocking).map((item) => item.itemId);
  const runtimeBlocked = checklistItems.some((item) => item.phaseId === "post_write_compile_and_smoke_phase" && item.blocking);
  const readyForOwnerExecutionReview = blockingItemIds.length === 0 && commandPackage.readyForOwnerWriteApproval;
  const decisionCode = !commandPackage.readyForOwnerWriteApproval
    ? "write_execution_checklist_blocked_by_command_package"
    : runtimeBlocked
      ? "write_execution_checklist_blocked_by_runtime_safety"
      : commandPackage.routeMountApprovedNow === false
        ? "write_execution_checklist_blocked_until_route_mount_separation"
        : "write_execution_checklist_blocked_until_owner_execution_approval";

  return {
    decisionCode,
    readyForOwnerExecutionReview,
    routeSourceWriteAllowedNow: false,
    routeSourceFilesWrittenNow: false,
    commandExecutionApprovedNow: false,
    commandExecutionPerformedNow: false,
    routeMountAllowedNow: false,
    routeMountPerformedNow: false,
    blockingItemIds,
    safeCode: `stream_kernel_diagnostics_route_source_write_execution_checklist_decision_${decisionCode}`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceWriteExecutionChecklist.decision.${decisionCode}`,
  };
}

function deriveStatus(
  commandPackage: CommandPackageSnapshot,
  checklistItems: readonly StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistItem[],
  decision: StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistDecision,
): StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistStatus {
  if (!commandPackage.readyForOwnerWriteApproval) return "write_execution_checklist_blocked_by_command_package";
  if (checklistItems.some((item) => item.phaseId === "post_write_compile_and_smoke_phase" && item.blocking)) return "write_execution_checklist_blocked_by_safety_boundary";
  if (decision.decisionCode === "write_execution_checklist_blocked_until_route_mount_separation") return "write_execution_checklist_blocked_until_mount_stays_separate";
  if (decision.decisionCode === "write_execution_checklist_blocked_until_fresh_forbidden_scan") return "write_execution_checklist_blocked_until_fresh_forbidden_scan";
  if (decision.decisionCode === "write_execution_checklist_blocked_until_owner_execution_approval") return "write_execution_checklist_blocked_until_exact_owner_execution_approval";
  return "write_execution_checklist_ready_for_later_owner_execution_review";
}

export function getStreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistSnapshot(): StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistSnapshot {
  const commandPackage = getStreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageSnapshot();
  const phases = buildPhases();
  const checklistItems = buildChecklistItems(commandPackage);
  const decision = buildDecision(commandPackage, checklistItems);
  const blockingChecklistItemCount = checklistItems.filter((item) => item.blocking).length;

  return {
    version: STREAM_FOUNDATION_138W_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_EXECUTION_CHECKLIST_VERSION,
    checklistId: "stream_kernel_diagnostics_route_source_write_execution_checklist",
    status: deriveStatus(commandPackage, checklistItems, decision),
    patchScope: "src/modules/stream/foundation/** only",
    commandPackageVersion: commandPackage.version,
    commandPackageStatus: commandPackage.status,
    writeExecutionChecklistOnly: true,
    writeExecutionChecklistBuiltNow: true,
    readyForOwnerExecutionReview: decision.readyForOwnerExecutionReview,
    readyForRouteSourceWriteNow: false,
    exactOwnerExecutionApprovalCapturedNow: false,
    exactOwnerExecutionApprovalPersistedNow: false,
    freshForbiddenPathScanPerformedNow: false,
    commandExecutionApprovedNow: false,
    commandExecutionPerformedNow: false,
    routeSourceWriteCommandExecutedNow: false,
    routeSourceFilesWrittenNow: false,
    implementationSourceFilesGeneratedNow: false,
    implementationSourceTextReturnedNow: false,
    executableCommandTextReturnedNow: false,
    postWriteTypecheckExecutedNow: false,
    postWriteSmokeExecutedNow: false,
    routeMountApprovedNow: false,
    routeMountPerformed: false,
    protectedRouteRegisteredNow: false,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    streamModulePatchIncluded: false,
    phases,
    phaseCount: phases.length,
    checklistItems,
    checklistItemCount: checklistItems.length,
    blockingChecklistItemCount,
    executablePhaseCount: 0,
    executedPhaseCount: 0,
    decision,
    runtimeHttpRequestsPerformed: 0,
    providerCallsPerformed: 0,
    databaseExecutionPerformed: 0,
    walletMutationPerformed: 0,
    paymentAuthorizationPerformed: 0,
    monthlyPayoutPerformed: 0,
    moneyMovementPerformed: 0,
    rawSecretsReturned: 0,
    mobileProviderKeysAllowed: false,
    fakeSuccessAllowed: false,
    safety: STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_EXECUTION_CHECKLIST_SAFETY,
  };
}
