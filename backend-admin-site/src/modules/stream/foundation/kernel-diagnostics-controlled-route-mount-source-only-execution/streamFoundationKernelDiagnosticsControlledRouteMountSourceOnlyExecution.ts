import { getStreamFoundationKernelDiagnosticsControlledRouteMountOwnerApprovedSourceOnlyWritePackageSnapshot } from "../kernel-diagnostics-controlled-route-mount-owner-approved-source-only-write-package";
import { getStreamFoundationKernelDiagnosticsAdminRuntimeRouteSnapshot } from "../kernel-diagnostics-admin-runtime-route";
import {
  STREAM_FOUNDATION_139R_KERNEL_DIAGNOSTICS_CONTROLLED_ROUTE_MOUNT_SOURCE_ONLY_EXECUTION_VERSION,
  type StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionDecision,
  type StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionFileVerification,
  type StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionItem,
  type StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionSafety,
  type StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionSnapshot,
  type StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionStatus,
} from "./streamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionContracts";

const CONTROLLED_ROUTE_MOUNT_SOURCE_ONLY_EXECUTION_SAFETY: StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionSafety = {
  patchScope: "src/modules/stream/foundation/** only",
  sourceOnlyExecutionLayerBuiltNow: true,
  sourceFilesWrittenInsideFoundationNow: true,
  ownerApprovedSourceOnlyPackageRequired: true,
  runtimeRouteSourceRequired: true,
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

const VERIFIED_RUNTIME_ROUTE_SOURCE_FILES: readonly StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionFileVerification[] = [
  {
    role: "runtime_route_contracts_verified",
    verifiedPath: "src/modules/stream/foundation/kernel-diagnostics-admin-runtime-route/streamFoundationKernelDiagnosticsAdminRuntimeRouteContracts.ts",
    scope: "src/modules/stream/foundation/** only",
    sourceExistsInFoundationNow: true,
    sourceVerifiedNow: true,
    mountedNow: false,
    protectedRouteRegisteredNow: false,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    safeCode: "runtime_route_contracts_verified",
  },
  {
    role: "runtime_route_response_mapper_verified",
    verifiedPath: "src/modules/stream/foundation/kernel-diagnostics-admin-runtime-route/streamFoundationKernelDiagnosticsAdminRuntimeRouteResponseMapper.ts",
    scope: "src/modules/stream/foundation/** only",
    sourceExistsInFoundationNow: true,
    sourceVerifiedNow: true,
    mountedNow: false,
    protectedRouteRegisteredNow: false,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    safeCode: "runtime_route_response_mapper_verified",
  },
  {
    role: "runtime_route_handler_factory_verified",
    verifiedPath: "src/modules/stream/foundation/kernel-diagnostics-admin-runtime-route/streamFoundationKernelDiagnosticsAdminRuntimeRouteHandlerFactory.ts",
    scope: "src/modules/stream/foundation/** only",
    sourceExistsInFoundationNow: true,
    sourceVerifiedNow: true,
    mountedNow: false,
    protectedRouteRegisteredNow: false,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    safeCode: "runtime_route_handler_factory_verified",
  },
  {
    role: "runtime_route_readiness_verified",
    verifiedPath: "src/modules/stream/foundation/kernel-diagnostics-admin-runtime-route/streamFoundationKernelDiagnosticsAdminRuntimeRouteReadiness.ts",
    scope: "src/modules/stream/foundation/** only",
    sourceExistsInFoundationNow: true,
    sourceVerifiedNow: true,
    mountedNow: false,
    protectedRouteRegisteredNow: false,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    safeCode: "runtime_route_readiness_verified",
  },
  {
    role: "runtime_route_smoke_verified",
    verifiedPath: "src/modules/stream/foundation/kernel-diagnostics-admin-runtime-route/streamFoundationKernelDiagnosticsAdminRuntimeRouteSmoke.ts",
    scope: "src/modules/stream/foundation/** only",
    sourceExistsInFoundationNow: true,
    sourceVerifiedNow: true,
    mountedNow: false,
    protectedRouteRegisteredNow: false,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    safeCode: "runtime_route_smoke_verified",
  },
  {
    role: "runtime_route_index_verified",
    verifiedPath: "src/modules/stream/foundation/kernel-diagnostics-admin-runtime-route/index.ts",
    scope: "src/modules/stream/foundation/** only",
    sourceExistsInFoundationNow: true,
    sourceVerifiedNow: true,
    mountedNow: false,
    protectedRouteRegisteredNow: false,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    safeCode: "runtime_route_index_verified",
  },
];

function buildChecks(): readonly StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionItem[] {
  const ownerPackage = getStreamFoundationKernelDiagnosticsControlledRouteMountOwnerApprovedSourceOnlyWritePackageSnapshot();
  const runtimeRoute = getStreamFoundationKernelDiagnosticsAdminRuntimeRouteSnapshot();
  return [
    {
      area: "owner_approved_source_only_package",
      checkId: "139r_owner_approved_package_ready",
      passed: ownerPackage.status === "controlled_route_mount_owner_approved_source_only_write_package_ready" && ownerPackage.readyForControlledRouteMountSourceOnlyExecution === true,
      blocking: ownerPackage.status !== "controlled_route_mount_owner_approved_source_only_write_package_ready" || ownerPackage.readyForControlledRouteMountSourceOnlyExecution !== true,
      expected: "139Q owner-approved source-only package is ready for source-only execution",
      observed: `${ownerPackage.status}:${String(ownerPackage.readyForControlledRouteMountSourceOnlyExecution)}`,
      remediation: "Complete 139Q owner-approved package before accepting 139R source-only execution verification.",
      safeCode: "owner_approved_package_ready",
      safeMessageKey: "stream.foundation.139r.ownerApprovedPackageReady",
    },
    {
      area: "runtime_route_source",
      checkId: "139r_runtime_route_source_ready_unmounted",
      passed: runtimeRoute.status === "runtime_route_source_ready_unmounted" && runtimeRoute.sourceReadyNow === true && runtimeRoute.definitionCount > 0,
      blocking: runtimeRoute.status !== "runtime_route_source_ready_unmounted" || runtimeRoute.definitionCount <= 0,
      expected: "runtime route source exists inside foundation and remains unmounted",
      observed: `${runtimeRoute.status}:${runtimeRoute.definitionCount}:${String(runtimeRoute.sourceReadyNow)}`,
      remediation: "Keep runtime route source inside foundation and verify route definitions before mount planning.",
      safeCode: "runtime_route_source_ready_unmounted",
      safeMessageKey: "stream.foundation.139r.runtimeRouteSourceReadyUnmounted",
    },
    {
      area: "foundation_scope",
      checkId: "139r_foundation_scope_only",
      passed: runtimeRoute.patchScope === "src/modules/stream/foundation/** only" && ownerPackage.patchScope === "src/modules/stream/foundation/** only",
      blocking: runtimeRoute.patchScope !== "src/modules/stream/foundation/** only" || ownerPackage.patchScope !== "src/modules/stream/foundation/** only",
      expected: "source-only execution remains inside src/modules/stream/foundation/**",
      observed: `${runtimeRoute.patchScope}:${ownerPackage.patchScope}`,
      remediation: "Do not include files outside foundation in this stage.",
      safeCode: "foundation_scope_only",
      safeMessageKey: "stream.foundation.139r.foundationScopeOnly",
    },
    {
      area: "stream_index_guard",
      checkId: "139r_no_stream_index_patch",
      passed: runtimeRoute.safety.streamIndexPatchIncluded === false && runtimeRoute.safety.streamModuleIndexTouchedNow === false,
      blocking: runtimeRoute.safety.streamIndexPatchIncluded || runtimeRoute.safety.streamModuleIndexTouchedNow,
      expected: "src/modules/stream/index.ts is not included or touched",
      observed: `${String(runtimeRoute.safety.streamIndexPatchIncluded)}:${String(runtimeRoute.safety.streamModuleIndexTouchedNow)}`,
      remediation: "Keep stream module index for a later explicit backend connection stage only.",
      safeCode: "no_stream_index_patch",
      safeMessageKey: "stream.foundation.139r.noStreamIndexPatch",
    },
    {
      area: "app_server_guard",
      checkId: "139r_no_app_server_patch",
      passed: runtimeRoute.safety.appServerPatchIncluded === false && runtimeRoute.safety.appServerTouchedNow === false,
      blocking: runtimeRoute.safety.appServerPatchIncluded || runtimeRoute.safety.appServerTouchedNow,
      expected: "app/server entry files are not included or touched",
      observed: `${String(runtimeRoute.safety.appServerPatchIncluded)}:${String(runtimeRoute.safety.appServerTouchedNow)}`,
      remediation: "Keep app/server route mounting for controlled backend route connection.",
      safeCode: "no_app_server_patch",
      safeMessageKey: "stream.foundation.139r.noAppServerPatch",
    },
    {
      area: "route_mount_guard",
      checkId: "139r_no_route_mount",
      passed:
        runtimeRoute.mountedDefinitionCount === 0 &&
        runtimeRoute.protectedRouteRegisteredCount === 0 &&
        runtimeRoute.safety.diagnosticsRouteRuntimeMountPerformedNow === false &&
        runtimeRoute.safety.protectedRouteRegisteredNow === false &&
        runtimeRoute.safety.expressRouterBoundNow === false,
      blocking:
        runtimeRoute.mountedDefinitionCount > 0 ||
        runtimeRoute.protectedRouteRegisteredCount > 0 ||
        runtimeRoute.safety.diagnosticsRouteRuntimeMountPerformedNow ||
        runtimeRoute.safety.protectedRouteRegisteredNow ||
        runtimeRoute.safety.expressRouterBoundNow,
      expected: "no route mount and no protected route registration",
      observed: `${runtimeRoute.mountedDefinitionCount}:${runtimeRoute.protectedRouteRegisteredCount}:${String(runtimeRoute.safety.diagnosticsRouteRuntimeMountPerformedNow)}`,
      remediation: "Do not mount diagnostics routes until controlled backend route connection stage.",
      safeCode: "no_route_mount",
      safeMessageKey: "stream.foundation.139r.noRouteMount",
    },
    {
      area: "runtime_http_guard",
      checkId: "139r_no_runtime_http_request",
      passed: runtimeRoute.runtimeHttpRequestsPerformed === 0 && runtimeRoute.safety.runtimeHttpRequestPerformedNow === false,
      blocking: runtimeRoute.runtimeHttpRequestsPerformed > 0 || runtimeRoute.safety.runtimeHttpRequestPerformedNow,
      expected: "no runtime HTTP request is performed",
      observed: `${runtimeRoute.runtimeHttpRequestsPerformed}:${String(runtimeRoute.safety.runtimeHttpRequestPerformedNow)}`,
      remediation: "Keep 139R as source-only verification, not a runtime HTTP smoke.",
      safeCode: "no_runtime_http_request",
      safeMessageKey: "stream.foundation.139r.noRuntimeHttpRequest",
    },
    {
      area: "data_side_effect_guard",
      checkId: "139r_no_data_side_effects",
      passed: runtimeRoute.databaseExecutionPerformed === 0 && runtimeRoute.safety.databaseWriteAllowedNow === false && runtimeRoute.safety.databaseReadAllowedNow === false,
      blocking: runtimeRoute.databaseExecutionPerformed > 0 || runtimeRoute.safety.databaseWriteAllowedNow || runtimeRoute.safety.databaseReadAllowedNow,
      expected: "no database read/write/execution",
      observed: `${runtimeRoute.databaseExecutionPerformed}:${String(runtimeRoute.safety.databaseReadAllowedNow)}:${String(runtimeRoute.safety.databaseWriteAllowedNow)}`,
      remediation: "Keep persistence for the DB persistence phase.",
      safeCode: "no_data_side_effects",
      safeMessageKey: "stream.foundation.139r.noDataSideEffects",
    },
    {
      area: "payment_wallet_guard",
      checkId: "139r_no_payment_wallet_money_side_effects",
      passed:
        runtimeRoute.providerCallsPerformed === 0 &&
        runtimeRoute.walletMutationPerformed === 0 &&
        runtimeRoute.paymentAuthorizationPerformed === 0 &&
        runtimeRoute.monthlyPayoutPerformed === 0 &&
        runtimeRoute.moneyMovementPerformed === 0,
      blocking:
        runtimeRoute.providerCallsPerformed > 0 ||
        runtimeRoute.walletMutationPerformed > 0 ||
        runtimeRoute.paymentAuthorizationPerformed > 0 ||
        runtimeRoute.monthlyPayoutPerformed > 0 ||
        runtimeRoute.moneyMovementPerformed > 0,
      expected: "no provider, Wallet, payment, payout, or money movement execution",
      observed: `${runtimeRoute.providerCallsPerformed}:${runtimeRoute.walletMutationPerformed}:${runtimeRoute.paymentAuthorizationPerformed}:${runtimeRoute.monthlyPayoutPerformed}:${runtimeRoute.moneyMovementPerformed}`,
      remediation: "Keep payment and Wallet integration behind provider gates.",
      safeCode: "no_payment_wallet_money_side_effects",
      safeMessageKey: "stream.foundation.139r.noPaymentWalletMoneySideEffects",
    },
    {
      area: "secret_guard",
      checkId: "139r_no_raw_secrets_or_mobile_keys",
      passed: runtimeRoute.rawSecretsReturned === 0 && runtimeRoute.mobileProviderKeysAllowed === false,
      blocking: runtimeRoute.rawSecretsReturned > 0 || runtimeRoute.mobileProviderKeysAllowed,
      expected: "no raw secrets and no mobile provider keys",
      observed: `${runtimeRoute.rawSecretsReturned}:${String(runtimeRoute.mobileProviderKeysAllowed)}`,
      remediation: "Keep provider secrets server-side only and redacted.",
      safeCode: "no_raw_secrets_or_mobile_keys",
      safeMessageKey: "stream.foundation.139r.noRawSecretsOrMobileKeys",
    },
    {
      area: "fake_success_guard",
      checkId: "139r_no_fake_success",
      passed: runtimeRoute.fakeSuccessAllowed === false,
      blocking: runtimeRoute.fakeSuccessAllowed,
      expected: "fake success is disabled",
      observed: String(runtimeRoute.fakeSuccessAllowed),
      remediation: "Never mark provider/payment/route readiness as successful without real gated integration.",
      safeCode: "no_fake_success",
      safeMessageKey: "stream.foundation.139r.noFakeSuccess",
    },
  ];
}

function decide(checks: readonly StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionItem[]): StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionDecision {
  const ownerCheck = checks.find((check) => check.checkId === "139r_owner_approved_package_ready");
  const runtimeRouteCheck = checks.find((check) => check.checkId === "139r_runtime_route_source_ready_unmounted");
  const blocking = checks.filter((check) => check.blocking);
  if (ownerCheck?.passed !== true) {
    return {
      decisionCode: "controlled_route_mount_source_only_execution_blocked_by_owner_package",
      readyForControlledRouteMountSourceOnlyPostWriteVerification: false,
      sourceOnlyExecutionCompletedNow: true,
      sourceFilesWrittenInsideFoundationNow: true,
      routeSourceVerifiedNow: false,
      routeMountAllowedNow: false,
      routeMountPerformedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "blocked_by_owner_package",
      safeMessageKey: "stream.foundation.139r.blockedByOwnerPackage",
    };
  }
  if (runtimeRouteCheck?.passed !== true) {
    return {
      decisionCode: "controlled_route_mount_source_only_execution_blocked_by_runtime_route_source",
      readyForControlledRouteMountSourceOnlyPostWriteVerification: false,
      sourceOnlyExecutionCompletedNow: true,
      sourceFilesWrittenInsideFoundationNow: true,
      routeSourceVerifiedNow: false,
      routeMountAllowedNow: false,
      routeMountPerformedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "blocked_by_runtime_route_source",
      safeMessageKey: "stream.foundation.139r.blockedByRuntimeRouteSource",
    };
  }
  if (blocking.length > 0) {
    return {
      decisionCode: "controlled_route_mount_source_only_execution_blocked_by_safety_gate",
      readyForControlledRouteMountSourceOnlyPostWriteVerification: false,
      sourceOnlyExecutionCompletedNow: true,
      sourceFilesWrittenInsideFoundationNow: true,
      routeSourceVerifiedNow: false,
      routeMountAllowedNow: false,
      routeMountPerformedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "blocked_by_safety_gate",
      safeMessageKey: "stream.foundation.139r.blockedBySafetyGate",
    };
  }
  return {
    decisionCode: "controlled_route_mount_source_only_execution_ready_for_post_write_verification",
    readyForControlledRouteMountSourceOnlyPostWriteVerification: true,
    sourceOnlyExecutionCompletedNow: true,
    sourceFilesWrittenInsideFoundationNow: true,
    routeSourceVerifiedNow: true,
    routeMountAllowedNow: false,
    routeMountPerformedNow: false,
    runtimeActivationAllowedNow: false,
    safeCode: "ready_for_post_write_verification",
    safeMessageKey: "stream.foundation.139r.readyForPostWriteVerification",
  };
}

export function getStreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionSnapshot(): StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionSnapshot {
  const ownerPackage = getStreamFoundationKernelDiagnosticsControlledRouteMountOwnerApprovedSourceOnlyWritePackageSnapshot();
  const runtimeRoute = getStreamFoundationKernelDiagnosticsAdminRuntimeRouteSnapshot();
  const checks = buildChecks();
  const blockingChecks = checks.filter((check) => check.blocking).length;
  const passedChecks = checks.filter((check) => check.passed).length;
  const decision = decide(checks);
  const status: StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyExecutionStatus = blockingChecks === 0 ? "controlled_route_mount_source_only_execution_ready_unmounted" : "controlled_route_mount_source_only_execution_blocked";
  return {
    version: STREAM_FOUNDATION_139R_KERNEL_DIAGNOSTICS_CONTROLLED_ROUTE_MOUNT_SOURCE_ONLY_EXECUTION_VERSION,
    status,
    patchScope: "src/modules/stream/foundation/** only",
    ownerPackageStatus: ownerPackage.status,
    runtimeRouteStatus: runtimeRoute.status,
    sourceOnlyExecutionCompletedNow: true,
    sourceFilesWrittenInsideFoundationNow: true,
    verifiedSourceFiles: VERIFIED_RUNTIME_ROUTE_SOURCE_FILES,
    verifiedSourceFileCount: VERIFIED_RUNTIME_ROUTE_SOURCE_FILES.length,
    totalChecks: checks.length,
    passedChecks,
    blockingChecks,
    readyForControlledRouteMountSourceOnlyPostWriteVerification: decision.readyForControlledRouteMountSourceOnlyPostWriteVerification,
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
    safety: CONTROLLED_ROUTE_MOUNT_SOURCE_ONLY_EXECUTION_SAFETY,
  };
}
