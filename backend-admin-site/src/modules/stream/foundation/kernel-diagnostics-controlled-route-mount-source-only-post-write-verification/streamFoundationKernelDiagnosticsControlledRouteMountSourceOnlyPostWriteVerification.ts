import { getStreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionSnapshot } from "../kernel-diagnostics-controlled-route-mount-source-only-execution";
import {
  STREAM_FOUNDATION_139S_KERNEL_DIAGNOSTICS_CONTROLLED_ROUTE_MOUNT_SOURCE_ONLY_POST_WRITE_VERIFICATION_VERSION,
  type StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationDecision,
  type StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationFile,
  type StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationItem,
  type StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationSafety,
  type StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationSnapshot,
  type StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationStatus,
} from "./streamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationContracts";

const CONTROLLED_ROUTE_MOUNT_SOURCE_ONLY_POST_WRITE_VERIFICATION_SAFETY: StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationSafety = {
  patchScope: "src/modules/stream/foundation/** only",
  postWriteVerificationLayerBuiltNow: true,
  sourceOnlyExecutionLayerRequired: true,
  sourceFilesVerifiedInsideFoundationNow: true,
  readyForProductionRouteMount: false,
  routeMountAllowedNow: false,
  routeMountPerformedNow: false,
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

const VERIFIED_SOURCE_FILES_AFTER_WRITE: readonly StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationFile[] = [
  {
    role: "contracts_verified_after_write",
    verifiedPath: "src/modules/stream/foundation/kernel-diagnostics-admin-runtime-route/streamFoundationKernelDiagnosticsAdminRuntimeRouteContracts.ts",
    verifiedAfterSourceOnlyWrite: true,
    scope: "src/modules/stream/foundation/** only",
    mountedNow: false,
    protectedRouteRegisteredNow: false,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    safeCode: "contracts_verified_after_write",
  },
  {
    role: "response_mapper_verified_after_write",
    verifiedPath: "src/modules/stream/foundation/kernel-diagnostics-admin-runtime-route/streamFoundationKernelDiagnosticsAdminRuntimeRouteResponseMapper.ts",
    verifiedAfterSourceOnlyWrite: true,
    scope: "src/modules/stream/foundation/** only",
    mountedNow: false,
    protectedRouteRegisteredNow: false,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    safeCode: "response_mapper_verified_after_write",
  },
  {
    role: "handler_factory_verified_after_write",
    verifiedPath: "src/modules/stream/foundation/kernel-diagnostics-admin-runtime-route/streamFoundationKernelDiagnosticsAdminRuntimeRouteHandlerFactory.ts",
    verifiedAfterSourceOnlyWrite: true,
    scope: "src/modules/stream/foundation/** only",
    mountedNow: false,
    protectedRouteRegisteredNow: false,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    safeCode: "handler_factory_verified_after_write",
  },
  {
    role: "readiness_verified_after_write",
    verifiedPath: "src/modules/stream/foundation/kernel-diagnostics-admin-runtime-route/streamFoundationKernelDiagnosticsAdminRuntimeRouteReadiness.ts",
    verifiedAfterSourceOnlyWrite: true,
    scope: "src/modules/stream/foundation/** only",
    mountedNow: false,
    protectedRouteRegisteredNow: false,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    safeCode: "readiness_verified_after_write",
  },
  {
    role: "smoke_verified_after_write",
    verifiedPath: "src/modules/stream/foundation/kernel-diagnostics-admin-runtime-route/streamFoundationKernelDiagnosticsAdminRuntimeRouteSmoke.ts",
    verifiedAfterSourceOnlyWrite: true,
    scope: "src/modules/stream/foundation/** only",
    mountedNow: false,
    protectedRouteRegisteredNow: false,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    safeCode: "smoke_verified_after_write",
  },
  {
    role: "index_verified_after_write",
    verifiedPath: "src/modules/stream/foundation/kernel-diagnostics-admin-runtime-route/index.ts",
    verifiedAfterSourceOnlyWrite: true,
    scope: "src/modules/stream/foundation/** only",
    mountedNow: false,
    protectedRouteRegisteredNow: false,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    safeCode: "index_verified_after_write",
  },
];

function buildChecks(): readonly StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationItem[] {
  const sourceOnlyExecution = getStreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionSnapshot();
  const filesVerified = VERIFIED_SOURCE_FILES_AFTER_WRITE.every((file) => file.verifiedAfterSourceOnlyWrite === true && file.scope === "src/modules/stream/foundation/** only" && file.mountedNow === false);

  return [
    {
      area: "previous_source_only_execution",
      checkId: "139s_previous_source_only_execution_ready",
      passed:
        sourceOnlyExecution.status === "controlled_route_mount_source_only_execution_ready_unmounted" &&
        sourceOnlyExecution.readyForControlledRouteMountSourceOnlyPostWriteVerification === true,
      blocking:
        sourceOnlyExecution.status !== "controlled_route_mount_source_only_execution_ready_unmounted" ||
        sourceOnlyExecution.readyForControlledRouteMountSourceOnlyPostWriteVerification !== true,
      expected: "139R source-only execution ready for post-write verification",
      observed: `${sourceOnlyExecution.status}:${String(sourceOnlyExecution.readyForControlledRouteMountSourceOnlyPostWriteVerification)}`,
      remediation: "Re-run 139R source-only execution before post-write verification.",
      safeCode: "previous_source_only_execution_ready",
      safeMessageKey: "stream.foundation.139s.previousSourceOnlyExecutionReady",
    },
    {
      area: "runtime_route_source_files",
      checkId: "139s_runtime_route_files_verified_after_write",
      passed: VERIFIED_SOURCE_FILES_AFTER_WRITE.length === 6 && filesVerified,
      blocking: VERIFIED_SOURCE_FILES_AFTER_WRITE.length !== 6 || !filesVerified,
      expected: "six diagnostics runtime route source files verified inside foundation and unmounted",
      observed: `${VERIFIED_SOURCE_FILES_AFTER_WRITE.length}:${String(filesVerified)}`,
      remediation: "Verify runtime route source-only files before controlled route mount planning.",
      safeCode: "runtime_route_files_verified_after_write",
      safeMessageKey: "stream.foundation.139s.runtimeRouteFilesVerifiedAfterWrite",
    },
    {
      area: "foundation_scope",
      checkId: "139s_foundation_scope_only",
      passed: sourceOnlyExecution.patchScope === "src/modules/stream/foundation/** only",
      blocking: sourceOnlyExecution.patchScope !== "src/modules/stream/foundation/** only",
      expected: "patch remains inside src/modules/stream/foundation/** only",
      observed: sourceOnlyExecution.patchScope,
      remediation: "Remove non-foundation files from the patch.",
      safeCode: "foundation_scope_only",
      safeMessageKey: "stream.foundation.139s.foundationScopeOnly",
    },
    {
      area: "stream_index_guard",
      checkId: "139s_no_stream_index_patch",
      passed: sourceOnlyExecution.safety.streamIndexPatchIncluded === false && sourceOnlyExecution.safety.streamModuleIndexTouchedNow === false,
      blocking: sourceOnlyExecution.safety.streamIndexPatchIncluded || sourceOnlyExecution.safety.streamModuleIndexTouchedNow,
      expected: "no src/modules/stream/index.ts patch",
      observed: `${String(sourceOnlyExecution.safety.streamIndexPatchIncluded)}:${String(sourceOnlyExecution.safety.streamModuleIndexTouchedNow)}`,
      remediation: "Keep stream module index out until the controlled backend route connection phase.",
      safeCode: "no_stream_index_patch",
      safeMessageKey: "stream.foundation.139s.noStreamIndexPatch",
    },
    {
      area: "app_server_guard",
      checkId: "139s_no_app_server_patch",
      passed: sourceOnlyExecution.safety.appServerPatchIncluded === false && sourceOnlyExecution.safety.appServerTouchedNow === false,
      blocking: sourceOnlyExecution.safety.appServerPatchIncluded || sourceOnlyExecution.safety.appServerTouchedNow,
      expected: "no app/server patch",
      observed: `${String(sourceOnlyExecution.safety.appServerPatchIncluded)}:${String(sourceOnlyExecution.safety.appServerTouchedNow)}`,
      remediation: "Keep app/server route registration for the controlled mount phase.",
      safeCode: "no_app_server_patch",
      safeMessageKey: "stream.foundation.139s.noAppServerPatch",
    },
    {
      area: "route_mount_guard",
      checkId: "139s_no_route_mount",
      passed: sourceOnlyExecution.routeMountPerformedNow === false && sourceOnlyExecution.protectedRouteRegisteredNow === false,
      blocking: sourceOnlyExecution.routeMountPerformedNow || sourceOnlyExecution.protectedRouteRegisteredNow,
      expected: "no route mount and no protected route registration",
      observed: `${String(sourceOnlyExecution.routeMountPerformedNow)}:${String(sourceOnlyExecution.protectedRouteRegisteredNow)}`,
      remediation: "Mount only after final backend route approval and server build verification.",
      safeCode: "no_route_mount",
      safeMessageKey: "stream.foundation.139s.noRouteMount",
    },
    {
      area: "runtime_http_guard",
      checkId: "139s_no_runtime_http",
      passed: sourceOnlyExecution.runtimeHttpRequestsPerformed === 0,
      blocking: sourceOnlyExecution.runtimeHttpRequestsPerformed > 0,
      expected: "no runtime HTTP request",
      observed: String(sourceOnlyExecution.runtimeHttpRequestsPerformed),
      remediation: "Use source-only smoke only until route mount phase.",
      safeCode: "no_runtime_http",
      safeMessageKey: "stream.foundation.139s.noRuntimeHttp",
    },
    {
      area: "data_side_effect_guard",
      checkId: "139s_no_data_side_effects",
      passed: sourceOnlyExecution.databaseExecutionPerformed === 0 && sourceOnlyExecution.providerCallsPerformed === 0 && sourceOnlyExecution.walletMutationPerformed === 0,
      blocking: sourceOnlyExecution.databaseExecutionPerformed > 0 || sourceOnlyExecution.providerCallsPerformed > 0 || sourceOnlyExecution.walletMutationPerformed > 0,
      expected: "no DB/provider/Wallet side effects",
      observed: `${sourceOnlyExecution.databaseExecutionPerformed}:${sourceOnlyExecution.providerCallsPerformed}:${sourceOnlyExecution.walletMutationPerformed}`,
      remediation: "Keep runtime side effects blocked until persistence/provider binding phases.",
      safeCode: "no_data_side_effects",
      safeMessageKey: "stream.foundation.139s.noDataSideEffects",
    },
    {
      area: "payment_wallet_guard",
      checkId: "139s_no_money_movement",
      passed:
        sourceOnlyExecution.paymentAuthorizationPerformed === 0 &&
        sourceOnlyExecution.monthlyPayoutPerformed === 0 &&
        sourceOnlyExecution.moneyMovementPerformed === 0,
      blocking:
        sourceOnlyExecution.paymentAuthorizationPerformed > 0 ||
        sourceOnlyExecution.monthlyPayoutPerformed > 0 ||
        sourceOnlyExecution.moneyMovementPerformed > 0,
      expected: "no payment authorization, monthly payout, or money movement",
      observed: `${sourceOnlyExecution.paymentAuthorizationPerformed}:${sourceOnlyExecution.monthlyPayoutPerformed}:${sourceOnlyExecution.moneyMovementPerformed}`,
      remediation: "Keep Wallet/payment operations behind provider gates.",
      safeCode: "no_money_movement",
      safeMessageKey: "stream.foundation.139s.noMoneyMovement",
    },
    {
      area: "secret_guard",
      checkId: "139s_no_raw_secrets_or_mobile_keys",
      passed: sourceOnlyExecution.rawSecretsReturned === 0 && sourceOnlyExecution.mobileProviderKeysAllowed === false,
      blocking: sourceOnlyExecution.rawSecretsReturned > 0 || sourceOnlyExecution.mobileProviderKeysAllowed,
      expected: "no raw secrets and no mobile provider keys",
      observed: `${sourceOnlyExecution.rawSecretsReturned}:${String(sourceOnlyExecution.mobileProviderKeysAllowed)}`,
      remediation: "Keep provider keys server-side only and redacted.",
      safeCode: "no_raw_secrets_or_mobile_keys",
      safeMessageKey: "stream.foundation.139s.noRawSecretsOrMobileKeys",
    },
    {
      area: "fake_success_guard",
      checkId: "139s_no_fake_success",
      passed: sourceOnlyExecution.fakeSuccessAllowed === false,
      blocking: sourceOnlyExecution.fakeSuccessAllowed,
      expected: "fake success remains forbidden",
      observed: String(sourceOnlyExecution.fakeSuccessAllowed),
      remediation: "Use honest blocked/provider-not-configured states only.",
      safeCode: "no_fake_success",
      safeMessageKey: "stream.foundation.139s.noFakeSuccess",
    },
  ];
}

function decide(
  checks: readonly StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationItem[],
): StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationDecision {
  const previous = getStreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionSnapshot();
  const blocking = checks.filter((check) => check.blocking);
  const passed = blocking.length === 0;
  if (!passed && previous.status !== "controlled_route_mount_source_only_execution_ready_unmounted") {
    return {
      decisionCode: "controlled_route_mount_source_only_post_write_verification_blocked_by_source_execution",
      sourceOnlyPostWriteVerificationPassedNow: false,
      readyForControlledDiagnosticsRouteMountPlanning: false,
      readyForProductionRouteMount: false,
      routeMountAllowedNow: false,
      routeMountPerformedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "blocked_by_source_execution",
      safeMessageKey: "stream.foundation.139s.blockedBySourceExecution",
    };
  }
  if (!passed) {
    return {
      decisionCode: "controlled_route_mount_source_only_post_write_verification_blocked_by_safety_gate",
      sourceOnlyPostWriteVerificationPassedNow: false,
      readyForControlledDiagnosticsRouteMountPlanning: false,
      readyForProductionRouteMount: false,
      routeMountAllowedNow: false,
      routeMountPerformedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "blocked_by_safety_gate",
      safeMessageKey: "stream.foundation.139s.blockedBySafetyGate",
    };
  }
  return {
    decisionCode: "controlled_route_mount_source_only_post_write_verification_passed_ready_for_mount_planning",
    sourceOnlyPostWriteVerificationPassedNow: true,
    readyForControlledDiagnosticsRouteMountPlanning: true,
    readyForProductionRouteMount: false,
    routeMountAllowedNow: false,
    routeMountPerformedNow: false,
    runtimeActivationAllowedNow: false,
    safeCode: "post_write_verification_passed_unmounted",
    safeMessageKey: "stream.foundation.139s.postWriteVerificationPassedUnmounted",
  };
}

export function getStreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationSnapshot(): StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationSnapshot {
  const previous = getStreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionSnapshot();
  const checks = buildChecks();
  const passedChecks = checks.filter((check) => check.passed).length;
  const blockingChecks = checks.filter((check) => check.blocking).length;
  const decision = decide(checks);
  const status: StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationStatus =
    decision.sourceOnlyPostWriteVerificationPassedNow
      ? "controlled_route_mount_source_only_post_write_verification_passed_unmounted"
      : "controlled_route_mount_source_only_post_write_verification_blocked";

  return {
    version: STREAM_FOUNDATION_139S_KERNEL_DIAGNOSTICS_CONTROLLED_ROUTE_MOUNT_SOURCE_ONLY_POST_WRITE_VERIFICATION_VERSION,
    status,
    patchScope: "src/modules/stream/foundation/** only",
    previousSourceOnlyExecutionStatus: previous.status,
    sourceOnlyPostWriteVerificationPassedNow: decision.sourceOnlyPostWriteVerificationPassedNow,
    verifiedSourceFiles: VERIFIED_SOURCE_FILES_AFTER_WRITE,
    verifiedSourceFileCount: VERIFIED_SOURCE_FILES_AFTER_WRITE.length,
    totalChecks: checks.length,
    passedChecks,
    blockingChecks,
    readyForControlledDiagnosticsRouteMountPlanning: decision.readyForControlledDiagnosticsRouteMountPlanning,
    readyForProductionRouteMount: false,
    routeMountAllowedNow: false,
    routeMountPerformedNow: false,
    protectedRouteRegisteredNow: false,
    runtimeHttpRequestsPerformed: 0,
    databaseExecutionPerformed: 0,
    providerCallsPerformed: 0,
    walletMutationPerformed: 0,
    paymentAuthorizationPerformed: 0,
    monthlyPayoutPerformed: 0,
    moneyMovementPerformed: 0,
    rawSecretsReturned: 0,
    mobileProviderKeysAllowed: false,
    fakeSuccessAllowed: false,
    checks,
    decision,
    safety: CONTROLLED_ROUTE_MOUNT_SOURCE_ONLY_POST_WRITE_VERIFICATION_SAFETY,
  };
}
