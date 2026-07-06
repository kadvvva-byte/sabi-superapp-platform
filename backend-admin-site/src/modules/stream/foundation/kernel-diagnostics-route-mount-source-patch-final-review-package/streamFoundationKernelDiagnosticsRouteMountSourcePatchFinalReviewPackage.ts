import { getStreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageSnapshot } from "../kernel-diagnostics-route-mount-source-patch-draft-package";
import {
  STREAM_FOUNDATION_139E_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_SOURCE_PATCH_FINAL_REVIEW_PACKAGE_VERSION,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageCheck,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageDecision,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageItem,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageSafety,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageSnapshot,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageStatus,
} from "./streamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageContracts";

const FINAL_REVIEW_PACKAGE_SAFETY: StreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageSafety = {
  finalReviewPackageBuiltNow: true,
  patchScope: "src/modules/stream/foundation/** only",
  previousDraftPackageRequired: true,
  sourcePatchAllowedNow: false,
  sourcePatchExecutedNow: false,
  sourceFilesWrittenNow: false,
  generatedSourceTextReturned: false,
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

function buildReviewItems(): readonly StreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageItem[] {
  return [
    {
      reviewArea: "foundation_scope",
      reviewId: "confirm_foundation_only_patch_scope",
      required: true,
      passed: true,
      finalReviewOnly: true,
      sourcePatchAllowedNow: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "foundation_only_patch_scope_ready",
      safeMessageKey: "stream.foundation.139e.foundationOnlyPatchScopeReady",
    },
    {
      reviewArea: "admin_protection",
      reviewId: "confirm_future_admin_only_access",
      required: true,
      passed: true,
      finalReviewOnly: true,
      sourcePatchAllowedNow: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "future_admin_only_access_ready",
      safeMessageKey: "stream.foundation.139e.futureAdminOnlyAccessReady",
    },
    {
      reviewArea: "redacted_payload",
      reviewId: "confirm_redacted_diagnostics_payload_only",
      required: true,
      passed: true,
      finalReviewOnly: true,
      sourcePatchAllowedNow: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "redacted_diagnostics_payload_only_ready",
      safeMessageKey: "stream.foundation.139e.redactedDiagnosticsPayloadOnlyReady",
    },
    {
      reviewArea: "source_patch_boundary",
      reviewId: "confirm_no_source_files_written_now",
      required: true,
      passed: true,
      finalReviewOnly: true,
      sourcePatchAllowedNow: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "no_source_files_written_now",
      safeMessageKey: "stream.foundation.139e.noSourceFilesWrittenNow",
    },
    {
      reviewArea: "runtime_mount_boundary",
      reviewId: "confirm_no_runtime_mount_now",
      required: true,
      passed: true,
      finalReviewOnly: true,
      sourcePatchAllowedNow: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "no_runtime_mount_now",
      safeMessageKey: "stream.foundation.139e.noRuntimeMountNow",
    },
    {
      reviewArea: "provider_wallet_money_boundary",
      reviewId: "confirm_no_provider_wallet_money_execution",
      required: true,
      passed: true,
      finalReviewOnly: true,
      sourcePatchAllowedNow: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "no_provider_wallet_money_execution",
      safeMessageKey: "stream.foundation.139e.noProviderWalletMoneyExecution",
    },
  ];
}

function buildChecks(): readonly StreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageCheck[] {
  const previous = getStreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageSnapshot();
  const previousReady = previous.version === "BACKEND-STREAM-FOUNDATION-139D" && previous.status === "route_mount_source_patch_draft_package_ready" && previous.blockingChecks === 0;
  return [
    {
      checkId: "previous_139d_draft_package_ready",
      passed: previousReady,
      blocking: !previousReady,
      expected: "139D draft package is ready with zero blockers",
      observed: `${previous.version}:${previous.status}:${String(previous.blockingChecks)}`,
      safeCode: "previous_139d_draft_package_ready",
      safeMessageKey: "stream.foundation.139e.previous139dDraftPackageReady",
    },
    {
      checkId: "foundation_scope_only",
      passed: previous.patchScope === "src/modules/stream/foundation/** only",
      blocking: previous.patchScope !== "src/modules/stream/foundation/** only",
      expected: "Only src/modules/stream/foundation/** remains in scope",
      observed: previous.patchScope,
      safeCode: "foundation_scope_only_verified",
      safeMessageKey: "stream.foundation.139e.foundationScopeOnlyVerified",
    },
    {
      checkId: "stream_index_absent",
      passed: previous.streamIndexPatchIncluded === false && previous.streamModuleIndexTouchedNow === false,
      blocking: previous.streamIndexPatchIncluded || previous.streamModuleIndexTouchedNow,
      expected: "src/modules/stream/index.ts remains absent and untouched",
      observed: `${String(previous.streamIndexPatchIncluded)}:${String(previous.streamModuleIndexTouchedNow)}`,
      safeCode: "stream_index_absent_verified",
      safeMessageKey: "stream.foundation.139e.streamIndexAbsentVerified",
    },
    {
      checkId: "app_server_absent",
      passed: previous.appServerPatchIncluded === false && previous.appServerTouchedNow === false,
      blocking: previous.appServerPatchIncluded || previous.appServerTouchedNow,
      expected: "src/app.ts and src/server.ts remain absent and untouched",
      observed: `${String(previous.appServerPatchIncluded)}:${String(previous.appServerTouchedNow)}`,
      safeCode: "app_server_absent_verified",
      safeMessageKey: "stream.foundation.139e.appServerAbsentVerified",
    },
    {
      checkId: "source_files_not_written",
      passed: previous.sourceFilesWrittenNow === false && previous.sourcePatchExecutedNow === false,
      blocking: previous.sourceFilesWrittenNow || previous.sourcePatchExecutedNow,
      expected: "No route source files are written and no source patch is executed",
      observed: `${String(previous.sourceFilesWrittenNow)}:${String(previous.sourcePatchExecutedNow)}`,
      safeCode: "source_files_not_written_verified",
      safeMessageKey: "stream.foundation.139e.sourceFilesNotWrittenVerified",
    },
    {
      checkId: "route_mount_absent",
      passed: previous.diagnosticsRouteRuntimeMountPerformedNow === false && previous.protectedRouteRegisteredNow === false,
      blocking: previous.diagnosticsRouteRuntimeMountPerformedNow || previous.protectedRouteRegisteredNow,
      expected: "No diagnostics route is mounted or registered",
      observed: `${String(previous.diagnosticsRouteRuntimeMountPerformedNow)}:${String(previous.protectedRouteRegisteredNow)}`,
      safeCode: "route_mount_absent_verified",
      safeMessageKey: "stream.foundation.139e.routeMountAbsentVerified",
    },
    {
      checkId: "runtime_and_money_execution_absent",
      passed:
        previous.runtimeHttpRequestsPerformed === 0 &&
        previous.databaseExecutionPerformed === 0 &&
        previous.providerCallsPerformed === 0 &&
        previous.walletMutationPerformed === 0 &&
        previous.moneyMovementPerformed === 0,
      blocking:
        previous.runtimeHttpRequestsPerformed !== 0 ||
        previous.databaseExecutionPerformed !== 0 ||
        previous.providerCallsPerformed !== 0 ||
        previous.walletMutationPerformed !== 0 ||
        previous.moneyMovementPerformed !== 0,
      expected: "No runtime HTTP, DB, provider, Wallet, or money movement execution",
      observed: `${previous.runtimeHttpRequestsPerformed}:${previous.databaseExecutionPerformed}:${previous.providerCallsPerformed}:${previous.walletMutationPerformed}:${previous.moneyMovementPerformed}`,
      safeCode: "runtime_and_money_execution_absent_verified",
      safeMessageKey: "stream.foundation.139e.runtimeAndMoneyExecutionAbsentVerified",
    },
    {
      checkId: "secret_and_fake_success_absent",
      passed: previous.rawSecretsReturned === 0 && previous.mobileProviderKeysAllowed === false && previous.fakeSuccessAllowed === false,
      blocking: previous.rawSecretsReturned !== 0 || previous.mobileProviderKeysAllowed || previous.fakeSuccessAllowed,
      expected: "No raw secrets, mobile provider keys, or fake success",
      observed: `${previous.rawSecretsReturned}:${String(previous.mobileProviderKeysAllowed)}:${String(previous.fakeSuccessAllowed)}`,
      safeCode: "secret_and_fake_success_absent_verified",
      safeMessageKey: "stream.foundation.139e.secretAndFakeSuccessAbsentVerified",
    },
  ];
}

function buildDecision(
  status: StreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageStatus,
  blockingChecks: number,
): StreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageDecision {
  if (status !== "route_mount_source_patch_final_review_ready") {
    return {
      decisionCode: "route_mount_source_patch_final_review_blocked_by_draft_package",
      readyForFutureSourcePackage: false,
      sourcePatchAllowedNow: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "route_mount_source_patch_final_review_blocked",
      safeMessageKey: "stream.foundation.139e.routeMountSourcePatchFinalReviewBlocked",
    };
  }
  if (blockingChecks > 0) {
    return {
      decisionCode: "route_mount_source_patch_final_review_blocked_by_safety_check",
      readyForFutureSourcePackage: false,
      sourcePatchAllowedNow: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "route_mount_source_patch_final_review_safety_blocked",
      safeMessageKey: "stream.foundation.139e.routeMountSourcePatchFinalReviewSafetyBlocked",
    };
  }
  return {
    decisionCode: "route_mount_source_patch_final_review_ready_for_future_source_package",
    readyForFutureSourcePackage: true,
    sourcePatchAllowedNow: false,
    routeMountAllowedNow: false,
    runtimeActivationAllowedNow: false,
    safeCode: "route_mount_source_patch_final_review_ready",
    safeMessageKey: "stream.foundation.139e.routeMountSourcePatchFinalReviewReady",
  };
}

export function getStreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageSnapshot(): StreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageSnapshot {
  const previous = getStreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageSnapshot();
  const reviewItems = buildReviewItems();
  const checks = buildChecks();
  const blockingChecks = checks.filter((check) => check.blocking).length;
  const passedChecks = checks.filter((check) => check.passed).length;
  const passedReviewItems = reviewItems.filter((item) => item.passed).length;
  const status: StreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageStatus = blockingChecks === 0 && passedReviewItems === reviewItems.length ? "route_mount_source_patch_final_review_ready" : "route_mount_source_patch_final_review_blocked";
  const decision = buildDecision(status, blockingChecks);

  return {
    version: STREAM_FOUNDATION_139E_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_SOURCE_PATCH_FINAL_REVIEW_PACKAGE_VERSION,
    status,
    patchScope: "src/modules/stream/foundation/** only",
    previousDraftPackageStatus: previous.status,
    finalReviewPackageBuiltNow: true,
    totalReviewItems: reviewItems.length,
    passedReviewItems,
    totalChecks: checks.length,
    passedChecks,
    blockingChecks,
    sourcePatchAllowedNow: false,
    sourcePatchExecutedNow: false,
    sourceFilesWrittenNow: false,
    generatedSourceTextReturned: false,
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
    checks,
    decision,
    safety: FINAL_REVIEW_PACKAGE_SAFETY,
  };
}
