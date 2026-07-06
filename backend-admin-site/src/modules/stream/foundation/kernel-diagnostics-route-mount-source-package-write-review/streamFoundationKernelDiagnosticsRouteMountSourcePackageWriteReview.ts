import { getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanSnapshot } from "../kernel-diagnostics-route-mount-source-package-write-plan";
import {
  STREAM_FOUNDATION_139H_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_SOURCE_PACKAGE_WRITE_REVIEW_VERSION,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewDecision,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewItem,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewSafety,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewSnapshot,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewStatus,
} from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewContracts";

const WRITE_REVIEW_SAFETY: StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewSafety = {
  writeReviewBuiltNow: true,
  patchScope: "src/modules/stream/foundation/** only",
  previousWritePlanRequired: true,
  ownerApprovalRequiredBeforeWrite: true,
  reviewMetadataOnly: true,
  sourcePackageWriteAllowedNow: false,
  sourcePackageWriteExecutedNow: false,
  sourceFilesWrittenNow: false,
  sourceTextReturned: false,
  diagnosticsRouteRuntimeMountAllowedNow: false,
  diagnosticsRouteRuntimeMountPerformedNow: false,
  protectedRouteRegisteredNow: false,
  streamIndexPatchIncluded: false,
  streamModuleIndexTouchedNow: false,
  appServerPatchIncluded: false,
  appServerTouchedNow: false,
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

function buildReviewItems(): readonly StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewItem[] {
  const previous = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanSnapshot();
  return [
    {
      area: "foundation_scope",
      reviewId: "review_foundation_scope_only",
      passed: previous.patchScope === "src/modules/stream/foundation/** only",
      blocking: previous.patchScope !== "src/modules/stream/foundation/** only",
      expected: "Only src/modules/stream/foundation/** is in scope for 139H",
      observed: previous.patchScope,
      remediation: "Keep route mount source preparation inside foundation-only planning until real backend mount approval.",
      safeCode: "foundation_scope_only_reviewed",
      safeMessageKey: "stream.foundation.139h.foundationScopeOnlyReviewed",
    },
    {
      area: "stream_index_guard",
      reviewId: "review_no_stream_module_index_patch",
      passed: previous.streamIndexPatchIncluded === false && previous.streamModuleIndexTouchedNow === false,
      blocking: previous.streamIndexPatchIncluded || previous.streamModuleIndexTouchedNow,
      expected: "No src/modules/stream/index.ts patch or touch",
      observed: `${String(previous.streamIndexPatchIncluded)}:${String(previous.streamModuleIndexTouchedNow)}`,
      remediation: "Do not include src/modules/stream/index.ts until the explicitly approved backend connection stage.",
      safeCode: "stream_index_guard_reviewed",
      safeMessageKey: "stream.foundation.139h.streamIndexGuardReviewed",
    },
    {
      area: "app_server_guard",
      reviewId: "review_no_app_server_patch",
      passed: previous.appServerPatchIncluded === false && previous.appServerTouchedNow === false,
      blocking: previous.appServerPatchIncluded || previous.appServerTouchedNow,
      expected: "No app.ts/server.ts patch or touch",
      observed: `${String(previous.appServerPatchIncluded)}:${String(previous.appServerTouchedNow)}`,
      remediation: "Keep app/server route mounting for a later controlled backend connection stage.",
      safeCode: "app_server_guard_reviewed",
      safeMessageKey: "stream.foundation.139h.appServerGuardReviewed",
    },
    {
      area: "source_write_guard",
      reviewId: "review_no_source_write_executed",
      passed: previous.sourcePackageWriteAllowedNow === false && previous.sourcePackageWriteExecutedNow === false && previous.sourceFilesWrittenNow === false,
      blocking: previous.sourcePackageWriteAllowedNow || previous.sourcePackageWriteExecutedNow || previous.sourceFilesWrittenNow,
      expected: "No source package write is allowed or executed in 139H",
      observed: `${String(previous.sourcePackageWriteAllowedNow)}:${String(previous.sourcePackageWriteExecutedNow)}:${String(previous.sourceFilesWrittenNow)}`,
      remediation: "Require owner approval and a separate source-only execution stage before writing route source files.",
      safeCode: "source_write_guard_reviewed",
      safeMessageKey: "stream.foundation.139h.sourceWriteGuardReviewed",
    },
    {
      area: "route_mount_guard",
      reviewId: "review_no_route_mount_performed",
      passed: previous.diagnosticsRouteRuntimeMountAllowedNow === false && previous.diagnosticsRouteRuntimeMountPerformedNow === false && previous.protectedRouteRegisteredNow === false,
      blocking: previous.diagnosticsRouteRuntimeMountAllowedNow || previous.diagnosticsRouteRuntimeMountPerformedNow || previous.protectedRouteRegisteredNow,
      expected: "No diagnostics route mount or protected route registration",
      observed: `${String(previous.diagnosticsRouteRuntimeMountAllowedNow)}:${String(previous.diagnosticsRouteRuntimeMountPerformedNow)}:${String(previous.protectedRouteRegisteredNow)}`,
      remediation: "Route mount must stay blocked until source, server auth, and runtime smoke gates are approved.",
      safeCode: "route_mount_guard_reviewed",
      safeMessageKey: "stream.foundation.139h.routeMountGuardReviewed",
    },
    {
      area: "runtime_execution_guard",
      reviewId: "review_no_runtime_execution",
      passed:
        previous.runtimeHttpRequestsPerformed === 0 &&
        previous.databaseExecutionPerformed === 0 &&
        previous.providerCallsPerformed === 0 &&
        previous.walletMutationPerformed === 0 &&
        previous.paymentAuthorizationPerformed === 0 &&
        previous.monthlyPayoutPerformed === 0 &&
        previous.moneyMovementPerformed === 0,
      blocking:
        previous.runtimeHttpRequestsPerformed !== 0 ||
        previous.databaseExecutionPerformed !== 0 ||
        previous.providerCallsPerformed !== 0 ||
        previous.walletMutationPerformed !== 0 ||
        previous.paymentAuthorizationPerformed !== 0 ||
        previous.monthlyPayoutPerformed !== 0 ||
        previous.moneyMovementPerformed !== 0,
      expected: "No HTTP, DB, provider, Wallet, payment, payout, or money runtime execution",
      observed: `${previous.runtimeHttpRequestsPerformed}:${previous.databaseExecutionPerformed}:${previous.providerCallsPerformed}:${previous.walletMutationPerformed}:${previous.paymentAuthorizationPerformed}:${previous.monthlyPayoutPerformed}:${previous.moneyMovementPerformed}`,
      remediation: "Keep runtime execution behind later protected route, DB, provider, Wallet, and ledger gates.",
      safeCode: "runtime_execution_guard_reviewed",
      safeMessageKey: "stream.foundation.139h.runtimeExecutionGuardReviewed",
    },
    {
      area: "secret_guard",
      reviewId: "review_no_raw_secrets_or_mobile_provider_keys",
      passed: previous.rawSecretsReturned === 0 && previous.mobileProviderKeysAllowed === false,
      blocking: previous.rawSecretsReturned !== 0 || previous.mobileProviderKeysAllowed,
      expected: "No raw secrets returned and no mobile provider keys allowed",
      observed: `${previous.rawSecretsReturned}:${String(previous.mobileProviderKeysAllowed)}`,
      remediation: "Keep provider keys server-side only and return only redacted readiness states.",
      safeCode: "secret_guard_reviewed",
      safeMessageKey: "stream.foundation.139h.secretGuardReviewed",
    },
    {
      area: "fake_success_guard",
      reviewId: "review_no_fake_success",
      passed: previous.fakeSuccessAllowed === false,
      blocking: previous.fakeSuccessAllowed,
      expected: "No fake provider/payment/route success",
      observed: String(previous.fakeSuccessAllowed),
      remediation: "Use blocked/provider_not_configured states until real providers and server gates pass.",
      safeCode: "fake_success_guard_reviewed",
      safeMessageKey: "stream.foundation.139h.fakeSuccessGuardReviewed",
    },
    {
      area: "owner_approval_required",
      reviewId: "review_owner_approval_required_before_future_write",
      passed: previous.decision.readyForFutureOwnerReview === true && previous.decision.sourcePackageWriteAllowedNow === false,
      blocking: previous.decision.readyForFutureOwnerReview !== true || previous.decision.sourcePackageWriteAllowedNow !== false,
      expected: "Future write is only ready for owner review, not execution",
      observed: `${String(previous.decision.readyForFutureOwnerReview)}:${String(previous.decision.sourcePackageWriteAllowedNow)}`,
      remediation: "Collect explicit owner approval before any source-only route write package.",
      safeCode: "owner_approval_required_reviewed",
      safeMessageKey: "stream.foundation.139h.ownerApprovalRequiredReviewed",
    },
  ];
}

function buildDecision(
  status: StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewStatus,
  blockingReviewItems: number,
): StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewDecision {
  const previous = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanSnapshot();
  if (previous.status !== "route_mount_source_package_write_plan_ready" || previous.decision.readyForFutureOwnerReview !== true) {
    return {
      decisionCode: "route_mount_source_package_write_review_blocked_by_write_plan",
      readyForFutureSourceWriteGate: false,
      ownerApprovalRequiredBeforeWrite: true,
      sourcePackageWriteAllowedNow: false,
      sourcePackageWriteExecutedNow: false,
      sourceFilesWrittenNow: false,
      sourceTextReturned: false,
      routeMountAllowedNow: false,
      routeMountPerformedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "route_mount_source_package_write_review_blocked_by_write_plan",
      safeMessageKey: "stream.foundation.139h.routeMountSourcePackageWriteReviewBlockedByWritePlan",
    };
  }
  if (status !== "route_mount_source_package_write_review_ready" || blockingReviewItems > 0) {
    return {
      decisionCode: "route_mount_source_package_write_review_blocked_by_safety_review",
      readyForFutureSourceWriteGate: false,
      ownerApprovalRequiredBeforeWrite: true,
      sourcePackageWriteAllowedNow: false,
      sourcePackageWriteExecutedNow: false,
      sourceFilesWrittenNow: false,
      sourceTextReturned: false,
      routeMountAllowedNow: false,
      routeMountPerformedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "route_mount_source_package_write_review_blocked_by_safety_review",
      safeMessageKey: "stream.foundation.139h.routeMountSourcePackageWriteReviewBlockedBySafetyReview",
    };
  }
  return {
    decisionCode: "route_mount_source_package_write_review_ready_for_future_source_write_gate",
    readyForFutureSourceWriteGate: true,
    ownerApprovalRequiredBeforeWrite: true,
    sourcePackageWriteAllowedNow: false,
    sourcePackageWriteExecutedNow: false,
    sourceFilesWrittenNow: false,
    sourceTextReturned: false,
    routeMountAllowedNow: false,
    routeMountPerformedNow: false,
    runtimeActivationAllowedNow: false,
    safeCode: "route_mount_source_package_write_review_ready_for_future_source_write_gate",
    safeMessageKey: "stream.foundation.139h.routeMountSourcePackageWriteReviewReadyForFutureSourceWriteGate",
  };
}

export function getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewSnapshot(): StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewSnapshot {
  const previous = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanSnapshot();
  const reviewItems = buildReviewItems();
  const passedReviewItems = reviewItems.filter((item) => item.passed).length;
  const blockingReviewItems = reviewItems.filter((item) => item.blocking).length;
  const status: StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewStatus =
    previous.status === "route_mount_source_package_write_plan_ready" && previous.decision.readyForFutureOwnerReview === true && blockingReviewItems === 0
      ? "route_mount_source_package_write_review_ready"
      : "route_mount_source_package_write_review_blocked";
  const decision = buildDecision(status, blockingReviewItems);

  return {
    version: STREAM_FOUNDATION_139H_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_SOURCE_PACKAGE_WRITE_REVIEW_VERSION,
    status,
    patchScope: "src/modules/stream/foundation/** only",
    previousWritePlanStatus: previous.status,
    writeReviewBuiltNow: true,
    totalReviewItems: reviewItems.length,
    passedReviewItems,
    blockingReviewItems,
    readyForFutureSourceWriteGate: decision.readyForFutureSourceWriteGate,
    ownerApprovalRequiredBeforeWrite: true,
    sourcePackageWriteAllowedNow: false,
    sourcePackageWriteExecutedNow: false,
    sourceFilesWrittenNow: false,
    sourceTextReturned: false,
    diagnosticsRouteRuntimeMountAllowedNow: false,
    diagnosticsRouteRuntimeMountPerformedNow: false,
    protectedRouteRegisteredNow: false,
    streamIndexPatchIncluded: false,
    streamModuleIndexTouchedNow: false,
    appServerPatchIncluded: false,
    appServerTouchedNow: false,
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
    reviewItems,
    decision,
    safety: WRITE_REVIEW_SAFETY,
  };
}
