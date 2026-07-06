import { getStreamFoundationKernelDiagnosticsRouteSourcePatchPlanSnapshot } from "../kernel-diagnostics-route-source-patch-plan";
import { STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_PATCH_PLAN_SAFETY } from "../kernel-diagnostics-route-source-patch-plan/streamFoundationKernelDiagnosticsRouteSourcePatchPlan";
import {
  STREAM_FOUNDATION_138O_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_APPROVAL_PACKAGE_VERSION,
  type StreamFoundationKernelDiagnosticsRouteSourceApprovalChecklistItem,
  type StreamFoundationKernelDiagnosticsRouteSourceApprovalChecklistItemId,
  type StreamFoundationKernelDiagnosticsRouteSourceApprovalPackageSafety,
  type StreamFoundationKernelDiagnosticsRouteSourceApprovalPackageSnapshot,
  type StreamFoundationKernelDiagnosticsRouteSourceApprovalPackageStatus,
  type StreamFoundationKernelDiagnosticsRouteSourceApprovalRouteReview,
  type StreamFoundationKernelDiagnosticsRouteSourceApprovalTargetReview,
} from "./streamFoundationKernelDiagnosticsRouteSourceApprovalPackageContracts";

export const STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_APPROVAL_PACKAGE_SAFETY: StreamFoundationKernelDiagnosticsRouteSourceApprovalPackageSafety = {
  ...STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_PATCH_PLAN_SAFETY,
  approvalPackageOnly: true,
  ownerApprovalCapturedNow: false,
  routeSourcePatchAuthorizedNow: false,
  routeSourcePatchGeneratedNow: false,
  protectedRouteSourceCreatedNow: false,
  protectedRouteMountedNow: false,
  streamIndexPatchIncluded: false,
  appServerPatchIncluded: false,
  adminUiPatchIncluded: false,
  runtimeHandlerBoundNow: false,
  routeFactoryExecutedAtRuntimeNow: false,
  separateOwnerApprovalRequiredForSourcePatch: true,
  separateOwnerApprovalRequiredForMountPatch: true,
};

function checklistItem(
  itemId: StreamFoundationKernelDiagnosticsRouteSourceApprovalChecklistItemId,
  ordered: number,
  satisfiedByCurrentFoundationContracts: boolean,
): StreamFoundationKernelDiagnosticsRouteSourceApprovalChecklistItem {
  return {
    itemId,
    ordered,
    required: true,
    satisfiedByCurrentFoundationContracts,
    approvedNow: false,
    approvalStatus: "owner_review_required_later",
    safeCode: `stream_kernel_diagnostics_route_source_approval_${itemId}_review_required_later`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceApproval.${itemId}.reviewRequiredLater`,
  };
}

function buildChecklist(): readonly StreamFoundationKernelDiagnosticsRouteSourceApprovalChecklistItem[] {
  return [
    checklistItem("owner_route_source_approval_required", 1, true),
    checklistItem("protected_admin_scope_required", 2, true),
    checklistItem("redacted_response_envelope_required", 3, true),
    checklistItem("no_stream_index_patch_required", 4, true),
    checklistItem("no_app_server_patch_required", 5, true),
    checklistItem("no_provider_wallet_money_required", 6, true),
    checklistItem("no_raw_secret_return_required", 7, true),
    checklistItem("future_route_mount_separate_approval_required", 8, true),
  ];
}

function buildTargetReviews(): readonly StreamFoundationKernelDiagnosticsRouteSourceApprovalTargetReview[] {
  const plan = getStreamFoundationKernelDiagnosticsRouteSourcePatchPlanSnapshot();
  return plan.targets.map((target) => ({
    targetPath: target.targetPath,
    allowedForFutureReview: target.requiresSeparateApprovalLater || target.allowedInThisPatch,
    includedInThisPatch: target.includedInThisPatch,
    approvedNow: false,
    approvalStatus: target.includedInThisPatch ? "not_requested_in_this_patch" : "separate_source_patch_approval_required_later",
    safeCode: `stream_kernel_diagnostics_route_source_approval_target_${String(target.targetPath).replace(/[^a-zA-Z0-9]+/g, "_")}`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceApproval.target.${String(target.targetPath).replace(/[^a-zA-Z0-9]+/g, ".")}`,
  }));
}

function buildRouteReviews(): readonly StreamFoundationKernelDiagnosticsRouteSourceApprovalRouteReview[] {
  const plan = getStreamFoundationKernelDiagnosticsRouteSourcePatchPlanSnapshot();
  return plan.routeItems.map((routeItem) => ({
    routeItem,
    routeSourceApprovedNow: false,
    routeMountApprovedNow: false,
    readyForOwnerReview: plan.futureSourcePatchReviewReady,
    approvalStatus: "separate_source_patch_approval_required_later",
    futureSourceHandlerName: routeItem.futureSourceHandlerName,
    mountedNow: false,
    sourceCreatedNow: false,
    safeCode: `stream_kernel_diagnostics_route_source_approval_route_${routeItem.routeId}_review_required_later`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceApproval.route.${routeItem.routeId}.reviewRequiredLater`,
  }));
}

function deriveStatus(
  readyForOwnerApprovalReview: boolean,
  forbiddenTargetsIncluded: number,
  safety: StreamFoundationKernelDiagnosticsRouteSourceApprovalPackageSafety,
): StreamFoundationKernelDiagnosticsRouteSourceApprovalPackageStatus {
  if (!readyForOwnerApprovalReview) return "approval_package_blocked_by_source_patch_plan";
  if (forbiddenTargetsIncluded > 0) return "approval_package_blocked_by_forbidden_scope";
  if (
    safety.ownerApprovalCapturedNow ||
    safety.routeSourcePatchAuthorizedNow ||
    safety.routeSourcePatchGeneratedNow ||
    safety.protectedRouteMountedNow ||
    safety.routeMountExecutedNow ||
    safety.providerCallAllowedNow ||
    safety.walletMutationAllowedNow ||
    safety.moneyMovementAllowedNow
  ) {
    return "approval_package_blocked_by_safety_boundary";
  }
  return "approval_package_ready_for_owner_review";
}

export function getStreamFoundationKernelDiagnosticsRouteSourceApprovalPackageSnapshot(): StreamFoundationKernelDiagnosticsRouteSourceApprovalPackageSnapshot {
  const plan = getStreamFoundationKernelDiagnosticsRouteSourcePatchPlanSnapshot();
  const checklist = buildChecklist();
  const targetReviews = buildTargetReviews();
  const routeReviews = buildRouteReviews();
  const safety = STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_APPROVAL_PACKAGE_SAFETY;
  const forbiddenTargetsIncluded = targetReviews.filter((target) => target.includedInThisPatch && !target.allowedForFutureReview).length;
  const readyForOwnerApprovalReview =
    plan.futureSourcePatchReviewReady &&
    plan.forbiddenTargetsIncluded === 0 &&
    forbiddenTargetsIncluded === 0 &&
    plan.streamIndexPatchIncluded === false &&
    plan.routeMountPerformed === false &&
    plan.protectedRouteRegisteredNow === false;

  return {
    version: STREAM_FOUNDATION_138O_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_APPROVAL_PACKAGE_VERSION,
    packageId: "stream_kernel_diagnostics_route_source_approval_package",
    status: deriveStatus(readyForOwnerApprovalReview, forbiddenTargetsIncluded, safety),
    patchScope: "src/modules/stream/foundation/** only",
    sourcePlanVersion: plan.version,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    approvalPackageOnly: true,
    ownerApprovalCapturedNow: false,
    routeSourcePatchAuthorizedNow: false,
    routeSourcePatchGeneratedNow: false,
    routeSourcePatchCreatedNow: false,
    routeMountAuthorizedNow: false,
    routeMountPerformed: false,
    protectedRouteRegisteredNow: false,
    readyForOwnerApprovalReview,
    readyForRouteSourcePatchNow: false,
    requiresSeparateRouteSourceApproval: true,
    requiresSeparateRouteMountApproval: true,
    checklist,
    checklistItemCount: checklist.length,
    checklistSatisfiedCount: checklist.filter((item) => item.satisfiedByCurrentFoundationContracts).length,
    targetReviews,
    forbiddenTargetsIncluded: 0,
    routeReviews,
    routeReviewCount: routeReviews.length,
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
