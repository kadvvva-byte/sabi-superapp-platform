import { getStreamFoundationKernelDiagnosticsControlledRouteMountSourcePatchPackageSnapshot } from "../kernel-diagnostics-controlled-route-mount-source-patch-package";
import {
  STREAM_FOUNDATION_139O_KERNEL_DIAGNOSTICS_CONTROLLED_ROUTE_MOUNT_SOURCE_PACKAGE_WRITE_REVIEW_VERSION,
  type StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewDecision,
  type StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewItem,
  type StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewSafety,
  type StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewSnapshot,
  type StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewStatus,
} from "./streamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewContracts";

const CONTROLLED_WRITE_REVIEW_SAFETY: StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewSafety = {
  writeReviewBuiltNow: true,
  patchScope: "src/modules/stream/foundation/** only",
  previousControlledSourcePackageRequired: true,
  controlledReviewMetadataOnly: true,
  ownerApprovalRequiredBeforeMount: true,
  readyForProductionRouteMount: false,
  sourcePackageWriteAllowedNow: false,
  sourcePackageWriteExecutedNow: false,
  sourceFilesWrittenNow: false,
  sourceTextReturned: false,
  diagnosticsRouteRuntimeMountAllowedNow: false,
  diagnosticsRouteRuntimeMountPerformedNow: false,
  protectedRouteRegisteredNow: false,
  expressRouterCreatedNow: false,
  expressRouterImportedNow: false,
  expressRouterBoundNow: false,
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

function buildReviewItems(): readonly StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewItem[] {
  const previous = getStreamFoundationKernelDiagnosticsControlledRouteMountSourcePatchPackageSnapshot();

  return [
    {
      area: "previous_controlled_source_package",
      reviewId: "139o_previous_controlled_source_package_ready",
      passed: previous.status === "controlled_route_mount_source_patch_package_ready" && previous.decision.readyForControlledRouteMountSourceWriteReview === true,
      blocking: previous.status !== "controlled_route_mount_source_patch_package_ready" || previous.decision.readyForControlledRouteMountSourceWriteReview !== true,
      expected: "139N controlled source package is ready for write review",
      observed: `${previous.status}:${String(previous.decision.readyForControlledRouteMountSourceWriteReview)}`,
      remediation: "Complete 139N controlled source package before reviewing route mount source write readiness.",
      safeCode: "previous_controlled_source_package_ready",
      safeMessageKey: "stream.foundation.139o.previousControlledSourcePackageReady",
    },
    {
      area: "foundation_scope",
      reviewId: "139o_foundation_scope_only",
      passed: previous.patchScope === "src/modules/stream/foundation/** only",
      blocking: previous.patchScope !== "src/modules/stream/foundation/** only",
      expected: "Only src/modules/stream/foundation/** is in scope",
      observed: previous.patchScope,
      remediation: "Remove any non-foundation files from the controlled route mount source package.",
      safeCode: "foundation_scope_only",
      safeMessageKey: "stream.foundation.139o.foundationScopeOnly",
    },
    {
      area: "stream_index_guard",
      reviewId: "139o_stream_index_not_included",
      passed: previous.streamIndexPatchIncluded === false && previous.streamModuleIndexTouchedNow === false,
      blocking: previous.streamIndexPatchIncluded || previous.streamModuleIndexTouchedNow,
      expected: "src/modules/stream/index.ts is not included or touched",
      observed: `${String(previous.streamIndexPatchIncluded)}:${String(previous.streamModuleIndexTouchedNow)}`,
      remediation: "Keep stream module index changes for the explicitly approved backend connection stage only.",
      safeCode: "stream_index_not_included",
      safeMessageKey: "stream.foundation.139o.streamIndexNotIncluded",
    },
    {
      area: "app_server_guard",
      reviewId: "139o_app_server_not_touched",
      passed: previous.appServerPatchIncluded === false && previous.appServerTouchedNow === false,
      blocking: previous.appServerPatchIncluded || previous.appServerTouchedNow,
      expected: "No app.ts/server.ts/backend entrypoint patch",
      observed: `${String(previous.appServerPatchIncluded)}:${String(previous.appServerTouchedNow)}`,
      remediation: "Defer backend app/server route mount to a controlled connection stage.",
      safeCode: "app_server_not_touched",
      safeMessageKey: "stream.foundation.139o.appServerNotTouched",
    },
    {
      area: "source_write_guard",
      reviewId: "139o_source_write_not_executed",
      passed: previous.sourceFilesCreatedNow === false && previous.filesCreatedNow === 0 && previous.filesOverwrittenNow === 0,
      blocking: previous.sourceFilesCreatedNow || previous.filesCreatedNow !== 0 || previous.filesOverwrittenNow !== 0,
      expected: "No source write is executed in controlled write review",
      observed: `${String(previous.sourceFilesCreatedNow)}:${previous.filesCreatedNow}:${previous.filesOverwrittenNow}`,
      remediation: "Require a later owner-approved source-only execution stage before writing route source files.",
      safeCode: "source_write_not_executed",
      safeMessageKey: "stream.foundation.139o.sourceWriteNotExecuted",
    },
    {
      area: "route_mount_guard",
      reviewId: "139o_route_mount_not_performed",
      passed: previous.routeMountAllowedNow === false && previous.routeMountPerformedNow === false && previous.protectedRouteRegisteredNow === false,
      blocking: previous.routeMountAllowedNow || previous.routeMountPerformedNow || previous.protectedRouteRegisteredNow,
      expected: "No route mount or protected route registration is allowed now",
      observed: `${String(previous.routeMountAllowedNow)}:${String(previous.routeMountPerformedNow)}:${String(previous.protectedRouteRegisteredNow)}`,
      remediation: "Mount only after source, auth, envelope, server build, and runtime smoke gates pass.",
      safeCode: "route_mount_not_performed",
      safeMessageKey: "stream.foundation.139o.routeMountNotPerformed",
    },
    {
      area: "runtime_execution_guard",
      reviewId: "139o_no_runtime_execution",
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
      remediation: "Keep runtime execution behind protected route, DB, realtime/media, Wallet/payment, and ledger provider gates.",
      safeCode: "no_runtime_execution",
      safeMessageKey: "stream.foundation.139o.noRuntimeExecution",
    },
    {
      area: "secret_guard",
      reviewId: "139o_no_raw_secrets_or_mobile_keys",
      passed: previous.rawSecretsReturned === 0 && previous.mobileProviderKeysAllowed === false,
      blocking: previous.rawSecretsReturned !== 0 || previous.mobileProviderKeysAllowed,
      expected: "No raw secrets and no mobile provider keys",
      observed: `${previous.rawSecretsReturned}:${String(previous.mobileProviderKeysAllowed)}`,
      remediation: "Keep provider keys server-side only and return redacted provider_not_configured states.",
      safeCode: "no_raw_secrets_or_mobile_keys",
      safeMessageKey: "stream.foundation.139o.noRawSecretsOrMobileKeys",
    },
    {
      area: "fake_success_guard",
      reviewId: "139o_no_fake_success",
      passed: previous.fakeSuccessAllowed === false,
      blocking: previous.fakeSuccessAllowed,
      expected: "No fake provider/payment/Wallet/route success",
      observed: String(previous.fakeSuccessAllowed),
      remediation: "Use blocked/provider_not_configured responses until real providers and server gates are configured.",
      safeCode: "no_fake_success",
      safeMessageKey: "stream.foundation.139o.noFakeSuccess",
    },
    {
      area: "production_gate_guard",
      reviewId: "139o_not_production_route_mount_ready",
      passed: previous.readyForProductionRouteMount === false && previous.decision.readyForProductionRouteMount === false,
      blocking: previous.readyForProductionRouteMount !== false || previous.decision.readyForProductionRouteMount !== false,
      expected: "Controlled write review is not production route mount readiness",
      observed: `${String(previous.readyForProductionRouteMount)}:${String(previous.decision.readyForProductionRouteMount)}`,
      remediation: "Require backend connection, server build, auth, DB/provider adapter, and runtime smoke stages before production readiness.",
      safeCode: "not_production_route_mount_ready",
      safeMessageKey: "stream.foundation.139o.notProductionRouteMountReady",
    },
  ];
}

function buildDecision(
  status: StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewStatus,
  blockingReviewItems: number,
): StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewDecision {
  const previous = getStreamFoundationKernelDiagnosticsControlledRouteMountSourcePatchPackageSnapshot();

  if (previous.status !== "controlled_route_mount_source_patch_package_ready" || previous.decision.readyForControlledRouteMountSourceWriteReview !== true) {
    return {
      decisionCode: "controlled_route_mount_source_package_write_review_blocked_by_previous_package",
      readyForControlledRouteMountSourcePackageFinalGate: false,
      readyForProductionRouteMount: false,
      ownerApprovalRequiredBeforeMount: true,
      sourcePackageWriteAllowedNow: false,
      sourcePackageWriteExecutedNow: false,
      sourceFilesWrittenNow: false,
      sourceTextReturned: false,
      streamIndexPatchIncluded: false,
      appServerPatchIncluded: false,
      routeMountAllowedNow: false,
      routeMountPerformedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "controlled_write_review_blocked_by_previous_package",
      safeMessageKey: "stream.foundation.139o.controlledWriteReviewBlockedByPreviousPackage",
    };
  }

  if (status !== "controlled_route_mount_source_package_write_review_ready" || blockingReviewItems > 0) {
    return {
      decisionCode: "controlled_route_mount_source_package_write_review_blocked_by_safety_review",
      readyForControlledRouteMountSourcePackageFinalGate: false,
      readyForProductionRouteMount: false,
      ownerApprovalRequiredBeforeMount: true,
      sourcePackageWriteAllowedNow: false,
      sourcePackageWriteExecutedNow: false,
      sourceFilesWrittenNow: false,
      sourceTextReturned: false,
      streamIndexPatchIncluded: false,
      appServerPatchIncluded: false,
      routeMountAllowedNow: false,
      routeMountPerformedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "controlled_write_review_blocked_by_safety_review",
      safeMessageKey: "stream.foundation.139o.controlledWriteReviewBlockedBySafetyReview",
    };
  }

  return {
    decisionCode: "controlled_route_mount_source_package_write_review_ready_for_final_gate",
    readyForControlledRouteMountSourcePackageFinalGate: true,
    readyForProductionRouteMount: false,
    ownerApprovalRequiredBeforeMount: true,
    sourcePackageWriteAllowedNow: false,
    sourcePackageWriteExecutedNow: false,
    sourceFilesWrittenNow: false,
    sourceTextReturned: false,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    routeMountAllowedNow: false,
    routeMountPerformedNow: false,
    runtimeActivationAllowedNow: false,
    safeCode: "controlled_write_review_ready_for_final_gate",
    safeMessageKey: "stream.foundation.139o.controlledWriteReviewReadyForFinalGate",
  };
}

export function getStreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewSnapshot(): StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewSnapshot {
  const previous = getStreamFoundationKernelDiagnosticsControlledRouteMountSourcePatchPackageSnapshot();
  const reviewItems = buildReviewItems();
  const passedReviewItems = reviewItems.filter((item) => item.passed).length;
  const blockingReviewItems = reviewItems.filter((item) => item.blocking).length;
  const status: StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewStatus =
    previous.status === "controlled_route_mount_source_patch_package_ready" &&
    previous.decision.readyForControlledRouteMountSourceWriteReview === true &&
    blockingReviewItems === 0
      ? "controlled_route_mount_source_package_write_review_ready"
      : "controlled_route_mount_source_package_write_review_blocked";
  const decision = buildDecision(status, blockingReviewItems);

  return {
    version: STREAM_FOUNDATION_139O_KERNEL_DIAGNOSTICS_CONTROLLED_ROUTE_MOUNT_SOURCE_PACKAGE_WRITE_REVIEW_VERSION,
    status,
    patchScope: "src/modules/stream/foundation/** only",
    previousControlledSourcePackageStatus: previous.status,
    writeReviewBuiltNow: true,
    totalReviewItems: reviewItems.length,
    passedReviewItems,
    blockingReviewItems,
    readyForControlledRouteMountSourcePackageFinalGate: decision.readyForControlledRouteMountSourcePackageFinalGate,
    readyForProductionRouteMount: false,
    ownerApprovalRequiredBeforeMount: true,
    sourcePackageWriteAllowedNow: false,
    sourcePackageWriteExecutedNow: false,
    sourceFilesWrittenNow: false,
    sourceTextReturned: false,
    diagnosticsRouteRuntimeMountAllowedNow: false,
    diagnosticsRouteRuntimeMountPerformedNow: false,
    protectedRouteRegisteredNow: false,
    expressRouterCreatedNow: false,
    expressRouterImportedNow: false,
    expressRouterBoundNow: false,
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
    safety: CONTROLLED_WRITE_REVIEW_SAFETY,
  };
}
