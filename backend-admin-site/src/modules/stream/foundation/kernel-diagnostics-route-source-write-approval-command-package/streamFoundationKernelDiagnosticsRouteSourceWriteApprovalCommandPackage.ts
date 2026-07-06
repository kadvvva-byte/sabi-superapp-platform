import {
  getStreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageSnapshot,
  STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_FINAL_REVIEW_PACKAGE_SAFETY,
} from "../kernel-diagnostics-route-source-generation-final-review-package";
import {
  STREAM_FOUNDATION_138V_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_APPROVAL_COMMAND_PACKAGE_VERSION,
  type StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandDecision,
  type StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandItem,
  type StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandItemId,
  type StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageSafety,
  type StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageSnapshot,
  type StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageStatus,
  type StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPreview,
} from "./streamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageContracts";

export const STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_APPROVAL_COMMAND_PACKAGE_SAFETY: StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageSafety = {
  ...STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_FINAL_REVIEW_PACKAGE_SAFETY,
  writeApprovalCommandPackageOnly: true,
  writeApprovalCommandBuiltNow: true,
  writeApprovalCommandPreviewBuiltNow: true,
  ownerWriteApprovalCapturedNow: false,
  ownerWriteApprovalPersistedNow: false,
  commandExecutionApprovedNow: false,
  commandExecutionPerformedNow: false,
  routeSourceWriteCommandExecutedNow: false,
  executableCommandTextReturnedNow: false,
  routeSourceFilesWrittenNow: false,
  implementationSourceFilesGeneratedNow: false,
  implementationSourceTextReturnedNow: false,
  generatedSourceTextPersistedNow: false,
  generatedSourceTextPrintedNow: false,
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

type FinalReviewSnapshot = ReturnType<typeof getStreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageSnapshot>;

function commandItem(
  itemId: StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandItemId,
  passed: boolean,
  blocking: boolean,
  source: StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandItem["source"],
  evidence: readonly string[],
  requiredBeforeWrite: boolean,
  requiredBeforeMount: boolean,
): StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandItem {
  return {
    itemId,
    passed,
    blocking,
    source,
    evidence,
    requiredBeforeWrite,
    requiredBeforeMount,
    safeCode: `stream_kernel_diagnostics_route_source_write_approval_command_${itemId}_${passed ? "passed" : "blocked"}`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceWriteApprovalCommand.${itemId}.${passed ? "passed" : "blocked"}`,
  };
}

function buildCommandItems(finalReview: FinalReviewSnapshot): readonly StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandItem[] {
  const providerWalletMoneyDisabled =
    finalReview.providerCallsPerformed === 0 &&
    finalReview.walletMutationPerformed === 0 &&
    finalReview.paymentAuthorizationPerformed === 0 &&
    finalReview.monthlyPayoutPerformed === 0 &&
    finalReview.moneyMovementPerformed === 0 &&
    finalReview.fakeSuccessAllowed === false;
  const finalReviewReady = finalReview.readyForOwnerDecision && finalReview.blockingReviewItemCount === 0;

  return [
    commandItem(
      "final_review_ready_verified",
      finalReviewReady,
      !finalReviewReady,
      "final_review_snapshot",
      [`finalReviewStatus=${finalReview.status}`, `blockingReviewItemCount=${finalReview.blockingReviewItemCount}`],
      true,
      true,
    ),
    commandItem(
      "owner_write_approval_required_verified",
      finalReview.routeSourceGenerationApprovedNow === false && finalReview.routeSourceFilesWrittenNow === false,
      false,
      "owner_approval_boundary",
      ["owner write approval remains required before any diagnostics route source write"],
      true,
      true,
    ),
    commandItem(
      "route_source_write_blocked_now_verified",
      finalReview.routeSourceFilesWrittenNow === false && finalReview.implementationSourceFilesGeneratedNow === false,
      !(finalReview.routeSourceFilesWrittenNow === false && finalReview.implementationSourceFilesGeneratedNow === false),
      "owner_approval_boundary",
      ["this package builds approval command previews only and performs no file write"],
      true,
      true,
    ),
    commandItem(
      "route_mount_separate_approval_verified",
      finalReview.routeMountApprovedNow === false && finalReview.routeMountPerformed === false && finalReview.protectedRouteRegisteredNow === false,
      !(finalReview.routeMountApprovedNow === false && finalReview.routeMountPerformed === false && finalReview.protectedRouteRegisteredNow === false),
      "owner_approval_boundary",
      ["route mount remains a separate later approval after source write review"],
      false,
      true,
    ),
    commandItem(
      "forbidden_path_rescan_required_verified",
      finalReview.virtualFileReviews.every((item) => item.forbiddenPathScanRequiredAgainBeforeWrite),
      false,
      "forbidden_path_boundary",
      ["forbidden path scan must run again immediately before any future write command"],
      true,
      true,
    ),
    commandItem(
      "stream_index_excluded_verified",
      finalReview.streamIndexPatchIncluded === false,
      finalReview.streamIndexPatchIncluded !== false,
      "forbidden_path_boundary",
      ["src/modules/stream/index.ts remains excluded"],
      true,
      true,
    ),
    commandItem(
      "app_server_excluded_verified",
      finalReview.appServerPatchIncluded === false && finalReview.streamModulePatchIncluded === false,
      !(finalReview.appServerPatchIncluded === false && finalReview.streamModulePatchIncluded === false),
      "forbidden_path_boundary",
      ["src/app.ts, src/server.ts and stream module entrypoint remain excluded"],
      true,
      true,
    ),
    commandItem(
      "provider_wallet_money_disabled_verified",
      providerWalletMoneyDisabled,
      !providerWalletMoneyDisabled,
      "runtime_safety_boundary",
      ["provider calls, Wallet mutation, payment authorization, monthly payout and money movement remain zero"],
      true,
      true,
    ),
    commandItem(
      "raw_secrets_blocked_verified",
      finalReview.rawSecretsReturned === 0 && finalReview.mobileProviderKeysAllowed === false,
      !(finalReview.rawSecretsReturned === 0 && finalReview.mobileProviderKeysAllowed === false),
      "runtime_safety_boundary",
      ["raw secrets are not returned and mobile provider keys remain blocked"],
      true,
      true,
    ),
  ];
}

const DIAGNOSTICS_ROUTE_SOURCE_TARGET_PATHS = [
  "src/modules/stream/foundation/kernel-diagnostics-admin-route-source/streamFoundationKernelDiagnosticsAdminRouteSourceContracts.ts",
  "src/modules/stream/foundation/kernel-diagnostics-admin-route-source/streamFoundationKernelDiagnosticsAdminRouteSource.ts",
  "src/modules/stream/foundation/kernel-diagnostics-admin-route-source/streamFoundationKernelDiagnosticsAdminRouteSourceReadiness.ts",
  "src/modules/stream/foundation/kernel-diagnostics-admin-route-source/streamFoundationKernelDiagnosticsAdminRouteSourceSmoke.ts",
  "src/modules/stream/foundation/kernel-diagnostics-admin-route-source/index.ts",
] as const;

function commandPreview(
  commandKind: StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPreview["commandKind"],
  title: string,
  purpose: string,
  proposedTargetPaths: readonly string[],
  requiredPreflightChecks: readonly string[],
  blockedUntil: readonly string[],
): StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPreview {
  return {
    commandKind,
    title,
    purpose,
    previewOnly: true,
    allowedToExecuteNow: false,
    ownerApprovalRequiredLater: true,
    separateRouteMountApprovalRequiredLater: true,
    executableCommandTextReturnedNow: false,
    routeSourceFilesWrittenNow: false,
    routeMountPerformedNow: false,
    touchesStreamIndex: false,
    touchesAppServer: false,
    touchesWalletMessengerAdmin: false,
    touchesPrismaOrEnv: false,
    proposedTargetPaths,
    requiredPreflightChecks,
    blockedUntil,
    safeCode: `stream_kernel_diagnostics_route_source_write_approval_command_preview_${commandKind}_blocked`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceWriteApprovalCommand.preview.${commandKind}.blocked`,
  };
}

function buildCommandPreviews(): readonly StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPreview[] {
  return [
    commandPreview(
      "forbidden_path_rescan_command_preview",
      "Rescan forbidden paths before any future source write",
      "Require a fresh scan proving the future patch still touches only src/modules/stream/foundation/** and excludes stream index plus app server files.",
      [],
      ["final review passed", "owner write approval recorded", "forbidden path scan executed immediately before write"],
      ["explicit owner approval for route source write"],
    ),
    commandPreview(
      "owner_write_approval_capture_command_preview",
      "Capture owner approval for diagnostics route source write",
      "Record that the owner approved source-file creation only, while route mount and runtime execution stay separately blocked.",
      [],
      ["approval text must name diagnostics route source write only", "approval must exclude route mount and provider activation"],
      ["exact owner approval message"],
    ),
    commandPreview(
      "route_source_write_command_preview",
      "Create diagnostics route source files in a later approved step",
      "Prepare the future source-only write boundary for diagnostics route source files without mounting a route or connecting runtime adapters.",
      DIAGNOSTICS_ROUTE_SOURCE_TARGET_PATHS,
      ["owner approval captured", "forbidden path scan clean", "final review package still ready", "route mount approval absent by design"],
      ["separate source write execution approval"],
    ),
    commandPreview(
      "post_write_typecheck_command_preview",
      "Run TypeScript after the future source write",
      "Require compile verification after source files are created in a later step, before any route mount is considered.",
      [],
      ["future source write completed", "no forbidden paths included", "no runtime provider or Wallet calls added"],
      ["future source write completion"],
    ),
    commandPreview(
      "route_mount_deferred_notice_command_preview",
      "Keep diagnostics route mount deferred",
      "Document that route source creation is not route mount; protected route registration requires a separate later owner approval and mount gate.",
      [],
      ["source write reviewed", "unmounted smoke passed", "protected route gate passed"],
      ["separate route mount approval"],
    ),
  ];
}

function buildDecision(
  finalReview: FinalReviewSnapshot,
  commandItems: readonly StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandItem[],
): StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandDecision {
  const blockingItemIds = commandItems.filter((item) => item.blocking).map((item) => item.itemId);
  const runtimeBlocked = commandItems.some((item) => item.source === "runtime_safety_boundary" && item.blocking);
  const readyForOwnerWriteApproval = blockingItemIds.length === 0 && finalReview.readyForOwnerDecision;
  const decisionCode = !finalReview.readyForOwnerDecision
    ? "write_command_package_blocked_by_final_review"
    : runtimeBlocked
      ? "write_command_package_blocked_by_runtime_safety"
      : finalReview.routeMountApprovedNow === false
        ? "write_command_package_blocked_until_separate_mount_approval"
        : finalReview.routeSourceGenerationApprovedNow === false
          ? "write_command_package_blocked_until_owner_write_approval"
          : "write_command_package_ready_but_execution_blocked";

  return {
    decisionCode,
    writeApprovalCommandBuiltNow: true,
    readyForOwnerWriteApproval,
    routeSourceWriteAllowedNow: false,
    routeSourceFilesWrittenNow: false,
    implementationSourceFilesGeneratedNow: false,
    implementationSourceTextReturnedNow: false,
    commandExecutionApprovedNow: false,
    commandExecutionPerformedNow: false,
    routeMountAllowedNow: false,
    routeMountPerformedNow: false,
    blockingItemIds,
    safeCode: `stream_kernel_diagnostics_route_source_write_approval_command_decision_${decisionCode}`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceWriteApprovalCommand.decision.${decisionCode}`,
  };
}

function deriveStatus(
  finalReview: FinalReviewSnapshot,
  commandItems: readonly StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandItem[],
  decision: StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandDecision,
): StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageStatus {
  if (!finalReview.readyForOwnerDecision) return "write_approval_command_package_blocked_by_final_review";
  if (commandItems.some((item) => item.source === "runtime_safety_boundary" && item.blocking)) return "write_approval_command_package_blocked_by_safety_boundary";
  if (decision.decisionCode === "write_command_package_blocked_until_separate_mount_approval") return "write_approval_command_package_blocked_until_separate_mount_approval";
  if (decision.decisionCode === "write_command_package_blocked_until_owner_write_approval") return "write_approval_command_package_blocked_until_owner_write_approval";
  return "write_approval_command_package_ready";
}

export function getStreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageSnapshot(): StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageSnapshot {
  const finalReview = getStreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageSnapshot();
  const commandItems = buildCommandItems(finalReview);
  const commandPreviews = buildCommandPreviews();
  const decision = buildDecision(finalReview, commandItems);
  const blockingCommandItemCount = commandItems.filter((item) => item.blocking).length;

  return {
    version: STREAM_FOUNDATION_138V_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_APPROVAL_COMMAND_PACKAGE_VERSION,
    packageId: "stream_kernel_diagnostics_route_source_write_approval_command_package",
    status: deriveStatus(finalReview, commandItems, decision),
    patchScope: "src/modules/stream/foundation/** only",
    finalReviewVersion: finalReview.version,
    finalReviewStatus: finalReview.status,
    writeApprovalCommandPackageOnly: true,
    writeApprovalCommandBuiltNow: true,
    writeApprovalCommandPreviewBuiltNow: true,
    readyForOwnerWriteApproval: decision.readyForOwnerWriteApproval,
    readyForRouteSourceWriteNow: false,
    ownerWriteApprovalCapturedNow: false,
    ownerWriteApprovalPersistedNow: false,
    commandExecutionApprovedNow: false,
    commandExecutionPerformedNow: false,
    routeSourceWriteCommandExecutedNow: false,
    executableCommandTextReturnedNow: false,
    routeSourceFilesWrittenNow: false,
    implementationSourceFilesGeneratedNow: false,
    implementationSourceTextReturnedNow: false,
    generatedSourceTextPersistedNow: false,
    generatedSourceTextPrintedNow: false,
    routeMountApprovedNow: false,
    routeMountPerformed: false,
    protectedRouteRegisteredNow: false,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    streamModulePatchIncluded: false,
    commandItems,
    commandItemCount: commandItems.length,
    blockingCommandItemCount,
    commandPreviews,
    commandPreviewCount: commandPreviews.length,
    executableCommandPreviewCount: 0,
    executedCommandCount: 0,
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
    safety: STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_APPROVAL_COMMAND_PACKAGE_SAFETY,
  };
}
