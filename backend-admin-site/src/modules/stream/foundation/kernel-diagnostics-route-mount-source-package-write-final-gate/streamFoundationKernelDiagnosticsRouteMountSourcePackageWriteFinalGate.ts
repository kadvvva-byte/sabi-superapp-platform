import { getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewSnapshot } from "../kernel-diagnostics-route-mount-source-package-write-review";
import {
  STREAM_FOUNDATION_139I_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_SOURCE_PACKAGE_WRITE_FINAL_GATE_VERSION,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateDecision,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateItem,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateSafety,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateSnapshot,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateStatus,
} from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateContracts";

const FINAL_GATE_SAFETY: StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateSafety = {
  finalGateBuiltNow: true,
  patchScope: "src/modules/stream/foundation/** only",
  previousWriteReviewRequired: true,
  ownerApprovalRequiredBeforeWrite: true,
  ownerApprovalCapturedNow: false,
  gateMetadataOnly: true,
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

function buildGateItems(): readonly StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateItem[] {
  const previous = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewSnapshot();
  return [
    {
      area: "foundation_scope",
      gateId: "final_gate_foundation_scope_only",
      passed: previous.patchScope === "src/modules/stream/foundation/** only",
      blocking: previous.patchScope !== "src/modules/stream/foundation/** only",
      expected: "Only src/modules/stream/foundation/** is in scope for 139I",
      observed: previous.patchScope,
      remediation: "Keep final gate metadata inside foundation-only files until explicit backend route connection stage.",
      safeCode: "foundation_scope_only_final_gate_passed",
      safeMessageKey: "stream.foundation.139i.foundationScopeOnlyFinalGatePassed",
    },
    {
      area: "previous_review_gate",
      gateId: "final_gate_previous_write_review_ready",
      passed: previous.status === "route_mount_source_package_write_review_ready" && previous.readyForFutureSourceWriteGate === true,
      blocking: previous.status !== "route_mount_source_package_write_review_ready" || previous.readyForFutureSourceWriteGate !== true,
      expected: "139H write review is ready for future source write gate",
      observed: `${previous.status}:${String(previous.readyForFutureSourceWriteGate)}`,
      remediation: "Resolve 139H write review blockers before any owner-approved source-only write package.",
      safeCode: "previous_write_review_ready",
      safeMessageKey: "stream.foundation.139i.previousWriteReviewReady",
    },
    {
      area: "owner_approval_gate",
      gateId: "final_gate_owner_approval_still_required",
      passed: previous.ownerApprovalRequiredBeforeWrite === true && previous.sourcePackageWriteAllowedNow === false,
      blocking: previous.ownerApprovalRequiredBeforeWrite !== true || previous.sourcePackageWriteAllowedNow !== false,
      expected: "Owner approval is still required and write is not allowed now",
      observed: `${String(previous.ownerApprovalRequiredBeforeWrite)}:${String(previous.sourcePackageWriteAllowedNow)}`,
      remediation: "Collect explicit owner approval in the next controlled stage before writing route source files.",
      safeCode: "owner_approval_still_required",
      safeMessageKey: "stream.foundation.139i.ownerApprovalStillRequired",
    },
    {
      area: "stream_index_guard",
      gateId: "final_gate_no_stream_module_index_patch",
      passed: previous.streamIndexPatchIncluded === false && previous.streamModuleIndexTouchedNow === false,
      blocking: previous.streamIndexPatchIncluded || previous.streamModuleIndexTouchedNow,
      expected: "No src/modules/stream/index.ts patch or touch",
      observed: `${String(previous.streamIndexPatchIncluded)}:${String(previous.streamModuleIndexTouchedNow)}`,
      remediation: "Do not include src/modules/stream/index.ts until the approved backend connection stage.",
      safeCode: "stream_index_guard_final_gate_passed",
      safeMessageKey: "stream.foundation.139i.streamIndexGuardFinalGatePassed",
    },
    {
      area: "app_server_guard",
      gateId: "final_gate_no_app_server_patch",
      passed: previous.appServerPatchIncluded === false && previous.appServerTouchedNow === false,
      blocking: previous.appServerPatchIncluded || previous.appServerTouchedNow,
      expected: "No app.ts/server.ts patch or touch",
      observed: `${String(previous.appServerPatchIncluded)}:${String(previous.appServerTouchedNow)}`,
      remediation: "Keep app/server mount for the later controlled backend route connection stage.",
      safeCode: "app_server_guard_final_gate_passed",
      safeMessageKey: "stream.foundation.139i.appServerGuardFinalGatePassed",
    },
    {
      area: "source_write_guard",
      gateId: "final_gate_no_source_package_write_now",
      passed: previous.sourcePackageWriteAllowedNow === false && previous.sourcePackageWriteExecutedNow === false && previous.sourceFilesWrittenNow === false,
      blocking: previous.sourcePackageWriteAllowedNow || previous.sourcePackageWriteExecutedNow || previous.sourceFilesWrittenNow,
      expected: "No source package write is allowed or executed in 139I",
      observed: `${String(previous.sourcePackageWriteAllowedNow)}:${String(previous.sourcePackageWriteExecutedNow)}:${String(previous.sourceFilesWrittenNow)}`,
      remediation: "Use a separate owner-approved source-only execution step before writing route source files.",
      safeCode: "source_write_guard_final_gate_passed",
      safeMessageKey: "stream.foundation.139i.sourceWriteGuardFinalGatePassed",
    },
    {
      area: "route_mount_guard",
      gateId: "final_gate_no_route_mount_performed",
      passed: previous.diagnosticsRouteRuntimeMountAllowedNow === false && previous.diagnosticsRouteRuntimeMountPerformedNow === false && previous.protectedRouteRegisteredNow === false,
      blocking: previous.diagnosticsRouteRuntimeMountAllowedNow || previous.diagnosticsRouteRuntimeMountPerformedNow || previous.protectedRouteRegisteredNow,
      expected: "No diagnostics route mount or protected route registration",
      observed: `${String(previous.diagnosticsRouteRuntimeMountAllowedNow)}:${String(previous.diagnosticsRouteRuntimeMountPerformedNow)}:${String(previous.protectedRouteRegisteredNow)}`,
      remediation: "Route mount must remain blocked until route source, app/server integration, auth, and runtime smoke gates pass.",
      safeCode: "route_mount_guard_final_gate_passed",
      safeMessageKey: "stream.foundation.139i.routeMountGuardFinalGatePassed",
    },
    {
      area: "runtime_execution_guard",
      gateId: "final_gate_no_runtime_execution",
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
      safeCode: "runtime_execution_guard_final_gate_passed",
      safeMessageKey: "stream.foundation.139i.runtimeExecutionGuardFinalGatePassed",
    },
    {
      area: "secret_guard",
      gateId: "final_gate_no_raw_secrets_or_mobile_provider_keys",
      passed: previous.rawSecretsReturned === 0 && previous.mobileProviderKeysAllowed === false,
      blocking: previous.rawSecretsReturned !== 0 || previous.mobileProviderKeysAllowed,
      expected: "No raw secrets returned and no mobile provider keys allowed",
      observed: `${previous.rawSecretsReturned}:${String(previous.mobileProviderKeysAllowed)}`,
      remediation: "Keep provider keys server-side only and return only redacted readiness states.",
      safeCode: "secret_guard_final_gate_passed",
      safeMessageKey: "stream.foundation.139i.secretGuardFinalGatePassed",
    },
    {
      area: "fake_success_guard",
      gateId: "final_gate_no_fake_success",
      passed: previous.fakeSuccessAllowed === false,
      blocking: previous.fakeSuccessAllowed,
      expected: "No fake provider/payment/route success",
      observed: String(previous.fakeSuccessAllowed),
      remediation: "Use blocked/provider_not_configured states until real providers and server gates pass.",
      safeCode: "fake_success_guard_final_gate_passed",
      safeMessageKey: "stream.foundation.139i.fakeSuccessGuardFinalGatePassed",
    },
  ];
}

function buildDecision(
  status: StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateStatus,
  blockingGateItems: number,
): StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateDecision {
  const previous = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewSnapshot();
  if (previous.status !== "route_mount_source_package_write_review_ready" || previous.readyForFutureSourceWriteGate !== true) {
    return {
      decisionCode: "route_mount_source_package_write_final_gate_blocked_by_previous_review",
      readyForFutureOwnerApprovedSourceOnlyWrite: false,
      ownerApprovalRequiredBeforeWrite: true,
      ownerApprovalCapturedNow: false,
      sourcePackageWriteAllowedNow: false,
      sourcePackageWriteExecutedNow: false,
      sourceFilesWrittenNow: false,
      sourceTextReturned: false,
      routeMountAllowedNow: false,
      routeMountPerformedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "route_mount_source_package_write_final_gate_blocked_by_previous_review",
      safeMessageKey: "stream.foundation.139i.routeMountSourcePackageWriteFinalGateBlockedByPreviousReview",
    };
  }
  if (status !== "route_mount_source_package_write_final_gate_ready" || blockingGateItems > 0) {
    return {
      decisionCode: "route_mount_source_package_write_final_gate_blocked_by_safety_gate",
      readyForFutureOwnerApprovedSourceOnlyWrite: false,
      ownerApprovalRequiredBeforeWrite: true,
      ownerApprovalCapturedNow: false,
      sourcePackageWriteAllowedNow: false,
      sourcePackageWriteExecutedNow: false,
      sourceFilesWrittenNow: false,
      sourceTextReturned: false,
      routeMountAllowedNow: false,
      routeMountPerformedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "route_mount_source_package_write_final_gate_blocked_by_safety_gate",
      safeMessageKey: "stream.foundation.139i.routeMountSourcePackageWriteFinalGateBlockedBySafetyGate",
    };
  }
  return {
    decisionCode: "route_mount_source_package_write_final_gate_ready_for_future_owner_approved_source_only_write",
    readyForFutureOwnerApprovedSourceOnlyWrite: true,
    ownerApprovalRequiredBeforeWrite: true,
    ownerApprovalCapturedNow: false,
    sourcePackageWriteAllowedNow: false,
    sourcePackageWriteExecutedNow: false,
    sourceFilesWrittenNow: false,
    sourceTextReturned: false,
    routeMountAllowedNow: false,
    routeMountPerformedNow: false,
    runtimeActivationAllowedNow: false,
    safeCode: "route_mount_source_package_write_final_gate_ready_for_future_owner_approved_source_only_write",
    safeMessageKey: "stream.foundation.139i.routeMountSourcePackageWriteFinalGateReadyForFutureOwnerApprovedSourceOnlyWrite",
  };
}

export function getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateSnapshot(): StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateSnapshot {
  const previous = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewSnapshot();
  const gateItems = buildGateItems();
  const passedGateItems = gateItems.filter((item) => item.passed).length;
  const blockingGateItems = gateItems.filter((item) => item.blocking).length;
  const status: StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateStatus =
    previous.status === "route_mount_source_package_write_review_ready" && previous.readyForFutureSourceWriteGate === true && blockingGateItems === 0
      ? "route_mount_source_package_write_final_gate_ready"
      : "route_mount_source_package_write_final_gate_blocked";
  const decision = buildDecision(status, blockingGateItems);

  return {
    version: STREAM_FOUNDATION_139I_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_SOURCE_PACKAGE_WRITE_FINAL_GATE_VERSION,
    status,
    patchScope: "src/modules/stream/foundation/** only",
    previousWriteReviewStatus: previous.status,
    finalGateBuiltNow: true,
    totalGateItems: gateItems.length,
    passedGateItems,
    blockingGateItems,
    readyForFutureOwnerApprovedSourceOnlyWrite: decision.readyForFutureOwnerApprovedSourceOnlyWrite,
    ownerApprovalRequiredBeforeWrite: true,
    ownerApprovalCapturedNow: false,
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
    gateItems,
    decision,
    safety: FINAL_GATE_SAFETY,
  };
}
