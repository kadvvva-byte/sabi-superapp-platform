import {
  getStreamFoundationKernelDiagnosticsRouteSourceApprovalPackageSnapshot,
  STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_APPROVAL_PACKAGE_SAFETY,
} from "../kernel-diagnostics-route-source-approval-package";
import {
  STREAM_FOUNDATION_138P_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_DRAFT_PACKAGE_VERSION,
  type StreamFoundationKernelDiagnosticsRouteSourceDraftFileId,
  type StreamFoundationKernelDiagnosticsRouteSourceDraftFileKind,
  type StreamFoundationKernelDiagnosticsRouteSourceDraftFileSpec,
  type StreamFoundationKernelDiagnosticsRouteSourceDraftFileTarget,
  type StreamFoundationKernelDiagnosticsRouteSourceDraftPackageSafety,
  type StreamFoundationKernelDiagnosticsRouteSourceDraftPackageSnapshot,
  type StreamFoundationKernelDiagnosticsRouteSourceDraftPackageStatus,
  type StreamFoundationKernelDiagnosticsRouteSourceDraftRouteBindingPreview,
  type StreamFoundationKernelDiagnosticsRouteSourceDraftTargetReview,
} from "./streamFoundationKernelDiagnosticsRouteSourceDraftPackageContracts";

export const STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_DRAFT_PACKAGE_SAFETY: StreamFoundationKernelDiagnosticsRouteSourceDraftPackageSafety = {
  ...STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_APPROVAL_PACKAGE_SAFETY,
  draftPackageOnly: true,
  draftFilesGeneratedNow: false,
  routeSourceFilesWrittenNow: false,
  routeSourcePatchAppliedNow: false,
  futureProtectedRouteModuleCreatedNow: false,
  futureRouteHandlerCreatedNow: false,
  futureRouteScopeGuardCreatedNow: false,
  futureRouteRedactionCreatedNow: false,
  streamModuleEntrypointCreatedNow: false,
  streamIndexPatchIncluded: false,
  appServerPatchIncluded: false,
  expressRouterCreatedNow: false,
  runtimeHttpRequestPerformedNow: false,
  directAdapterAccessAllowedNow: false,
  databaseReadAllowedNow: false,
  databaseWriteAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentAuthorizationAllowedNow: false,
  monthlyPayoutAllowedNow: false,
  moneyMovementAllowedNow: false,
};

function draftFile(
  fileId: StreamFoundationKernelDiagnosticsRouteSourceDraftFileId,
  targetPath: StreamFoundationKernelDiagnosticsRouteSourceDraftFileTarget,
  fileKind: StreamFoundationKernelDiagnosticsRouteSourceDraftFileKind,
  requiresSeparateMountApprovalLater: boolean,
  wrapsAdminAuth: boolean,
  wrapsScopeGuard: boolean,
  returnsRedactedEnvelope: boolean,
): StreamFoundationKernelDiagnosticsRouteSourceDraftFileSpec {
  return {
    fileId,
    targetPath,
    fileKind,
    includedInThisPatch: false,
    generatedNow: false,
    requiresSeparateOwnerApprovalLater: true,
    requiresSeparateMountApprovalLater,
    wrapsAdminAuth,
    wrapsScopeGuard,
    returnsRedactedEnvelope,
    usesKernelDiagnosticsHandoffOnly: true,
    importsExpressNow: false,
    performsDatabaseExecution: false,
    performsProviderCall: false,
    performsWalletMutation: false,
    performsMoneyMovement: false,
    returnsRawSecrets: false,
    approvalStatus: "drafted_for_review_only_not_generated",
    safeCode: `stream_kernel_diagnostics_route_source_draft_${fileId}_not_generated`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceDraft.${fileId}.notGenerated`,
  };
}

function buildDraftFiles(): readonly StreamFoundationKernelDiagnosticsRouteSourceDraftFileSpec[] {
  return [
    draftFile(
      "admin_kernel_diagnostics_route_module_draft",
      "src/modules/stream/infrastructure/routes/admin-stream-kernel-diagnostics.routes.ts",
      "future_protected_admin_route_source",
      true,
      true,
      true,
      true,
    ),
    draftFile(
      "admin_kernel_diagnostics_route_handler_draft",
      "src/modules/stream/infrastructure/routes/admin-stream-kernel-diagnostics.handlers.ts",
      "future_protected_handler_source",
      true,
      true,
      true,
      true,
    ),
    draftFile(
      "admin_kernel_diagnostics_route_scope_guard_draft",
      "src/modules/stream/infrastructure/routes/admin-stream-kernel-diagnostics.scope.ts",
      "future_admin_scope_guard_source",
      true,
      false,
      true,
      false,
    ),
    draftFile(
      "admin_kernel_diagnostics_route_redaction_envelope_draft",
      "src/modules/stream/infrastructure/routes/admin-stream-kernel-diagnostics.redaction.ts",
      "future_redacted_response_source",
      true,
      false,
      false,
      true,
    ),
    draftFile(
      "stream_module_mount_entrypoint_draft",
      "src/modules/stream/stream.module.ts",
      "future_stream_module_mount_entrypoint",
      true,
      true,
      true,
      true,
    ),
  ];
}

function buildRouteBindingPreviews(): readonly StreamFoundationKernelDiagnosticsRouteSourceDraftRouteBindingPreview[] {
  const approval = getStreamFoundationKernelDiagnosticsRouteSourceApprovalPackageSnapshot();
  return approval.routeReviews.map((routeReview) => ({
    routeReview,
    draftHandlerName: routeReview.futureSourceHandlerName,
    draftTargetPath: "src/modules/stream/infrastructure/routes/admin-stream-kernel-diagnostics.handlers.ts",
    generatedNow: false,
    mountedNow: false,
    protectedByAdminAuthLater: true,
    protectedByScopeGuardLater: true,
    redactedEnvelopeLater: true,
    providerWalletMoneyDisabled: true,
    safeCode: `stream_kernel_diagnostics_route_source_draft_binding_${routeReview.routeItem.routeId}_not_generated`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceDraft.binding.${routeReview.routeItem.routeId}.notGenerated`,
  }));
}

function buildTargetReviews(): readonly StreamFoundationKernelDiagnosticsRouteSourceDraftTargetReview[] {
  const approval = getStreamFoundationKernelDiagnosticsRouteSourceApprovalPackageSnapshot();
  return approval.targetReviews.map((approvalTarget) => ({
    approvalTarget,
    remainsUnchangedInThisPatch: true,
    draftMentionsOnly: true,
    generatedNow: false,
    safeCode: `stream_kernel_diagnostics_route_source_draft_target_${String(approvalTarget.targetPath).replace(/[^a-zA-Z0-9]+/g, "_")}_unchanged`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceDraft.target.${String(approvalTarget.targetPath).replace(/[^a-zA-Z0-9]+/g, ".")}.unchanged`,
  }));
}

function deriveStatus(
  readyForDraftPackageReview: boolean,
  forbiddenTargetsIncluded: number,
  safety: StreamFoundationKernelDiagnosticsRouteSourceDraftPackageSafety,
): StreamFoundationKernelDiagnosticsRouteSourceDraftPackageStatus {
  if (!readyForDraftPackageReview) return "draft_package_blocked_by_approval_package";
  if (forbiddenTargetsIncluded > 0) return "draft_package_blocked_by_forbidden_scope";
  if (
    safety.draftFilesGeneratedNow ||
    safety.routeSourceFilesWrittenNow ||
    safety.routeSourcePatchAppliedNow ||
    safety.protectedRouteMountedNow ||
    safety.expressRouterCreatedNow ||
    safety.providerCallAllowedNow ||
    safety.walletMutationAllowedNow ||
    safety.moneyMovementAllowedNow
  ) {
    return "draft_package_blocked_by_safety_boundary";
  }
  return "draft_package_ready_for_owner_review";
}

export function getStreamFoundationKernelDiagnosticsRouteSourceDraftPackageSnapshot(): StreamFoundationKernelDiagnosticsRouteSourceDraftPackageSnapshot {
  const approval = getStreamFoundationKernelDiagnosticsRouteSourceApprovalPackageSnapshot();
  const draftFiles = buildDraftFiles();
  const routeBindingPreviews = buildRouteBindingPreviews();
  const targetReviews = buildTargetReviews();
  const safety = STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_DRAFT_PACKAGE_SAFETY;
  const forbiddenTargetsIncluded = targetReviews.filter((item) => item.approvalTarget.includedInThisPatch && !item.approvalTarget.allowedForFutureReview).length;
  const readyForDraftPackageReview =
    approval.readyForOwnerApprovalReview &&
    approval.requiresSeparateRouteSourceApproval &&
    approval.requiresSeparateRouteMountApproval &&
    approval.streamIndexPatchIncluded === false &&
    approval.appServerPatchIncluded === false &&
    approval.routeMountPerformed === false &&
    approval.protectedRouteRegisteredNow === false &&
    forbiddenTargetsIncluded === 0;

  return {
    version: STREAM_FOUNDATION_138P_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_DRAFT_PACKAGE_VERSION,
    packageId: "stream_kernel_diagnostics_route_source_draft_package",
    status: deriveStatus(readyForDraftPackageReview, forbiddenTargetsIncluded, safety),
    patchScope: "src/modules/stream/foundation/** only",
    approvalPackageVersion: approval.version,
    draftPackageOnly: true,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    routeSourcePatchCreatedNow: false,
    routeSourceFilesWrittenNow: false,
    draftFilesGeneratedNow: false,
    routeMountAuthorizedNow: false,
    routeMountPerformed: false,
    protectedRouteRegisteredNow: false,
    readyForDraftPackageReview,
    readyForRouteSourcePatchNow: false,
    requiresSeparateRouteSourceApproval: true,
    requiresSeparateRouteMountApproval: true,
    draftFiles,
    draftFileCount: draftFiles.length,
    generatedDraftFileCount: 0,
    routeBindingPreviews,
    routeBindingPreviewCount: routeBindingPreviews.length,
    targetReviews,
    forbiddenTargetsIncluded: 0,
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
    safety,
  };
}
