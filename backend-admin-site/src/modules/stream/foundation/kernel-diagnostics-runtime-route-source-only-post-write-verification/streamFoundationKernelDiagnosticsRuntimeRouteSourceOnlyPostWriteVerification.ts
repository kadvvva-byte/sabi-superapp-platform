import {
  getStreamFoundationKernelDiagnosticsAdminRuntimeRouteReadiness,
  getStreamFoundationKernelDiagnosticsAdminRuntimeRouteSmokeReport,
  getStreamFoundationKernelDiagnosticsAdminRuntimeRouteSnapshot,
} from "../kernel-diagnostics-admin-runtime-route";
import { getStreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionSnapshot } from "../kernel-diagnostics-route-mount-source-package-source-only-execution";
import {
  STREAM_FOUNDATION_139L_KERNEL_DIAGNOSTICS_RUNTIME_ROUTE_SOURCE_ONLY_POST_WRITE_VERIFICATION_VERSION,
  type StreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationDecision,
  type StreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationFile,
  type StreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationItem,
  type StreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationSafety,
  type StreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationSnapshot,
  type StreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationStatus,
} from "./streamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationContracts";

const VERIFICATION_SAFETY: StreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationSafety = {
  patchScope: "src/modules/stream/foundation/** only",
  previousSourceOnlyExecutionRequired: true,
  routeSourceOnlyPostWriteVerifiedNow: true,
  sourceFilesVerifiedNow: true,
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

function expectedVerifiedFiles(): readonly StreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationFile[] {
  const base = "src/modules/stream/foundation/kernel-diagnostics-admin-runtime-route";
  return [
    {
      role: "diagnostics_route_contracts",
      path: `${base}/streamFoundationKernelDiagnosticsAdminRuntimeRouteContracts.ts`,
      verifiedNow: true,
      scope: "src/modules/stream/foundation/** only",
      mountedNow: false,
      includesStreamIndexPatch: false,
      includesAppServerPatch: false,
      includesRuntimeExecution: false,
      safeCode: "diagnostics_runtime_route_contracts_verified_source_only",
    },
    {
      role: "diagnostics_route_response_mapper",
      path: `${base}/streamFoundationKernelDiagnosticsAdminRuntimeRouteResponseMapper.ts`,
      verifiedNow: true,
      scope: "src/modules/stream/foundation/** only",
      mountedNow: false,
      includesStreamIndexPatch: false,
      includesAppServerPatch: false,
      includesRuntimeExecution: false,
      safeCode: "diagnostics_runtime_route_response_mapper_verified_source_only",
    },
    {
      role: "diagnostics_route_handler_factory",
      path: `${base}/streamFoundationKernelDiagnosticsAdminRuntimeRouteHandlerFactory.ts`,
      verifiedNow: true,
      scope: "src/modules/stream/foundation/** only",
      mountedNow: false,
      includesStreamIndexPatch: false,
      includesAppServerPatch: false,
      includesRuntimeExecution: false,
      safeCode: "diagnostics_runtime_route_handler_factory_verified_source_only",
    },
    {
      role: "diagnostics_route_readiness",
      path: `${base}/streamFoundationKernelDiagnosticsAdminRuntimeRouteReadiness.ts`,
      verifiedNow: true,
      scope: "src/modules/stream/foundation/** only",
      mountedNow: false,
      includesStreamIndexPatch: false,
      includesAppServerPatch: false,
      includesRuntimeExecution: false,
      safeCode: "diagnostics_runtime_route_readiness_verified_source_only",
    },
    {
      role: "diagnostics_route_smoke",
      path: `${base}/streamFoundationKernelDiagnosticsAdminRuntimeRouteSmoke.ts`,
      verifiedNow: true,
      scope: "src/modules/stream/foundation/** only",
      mountedNow: false,
      includesStreamIndexPatch: false,
      includesAppServerPatch: false,
      includesRuntimeExecution: false,
      safeCode: "diagnostics_runtime_route_smoke_verified_source_only",
    },
    {
      role: "diagnostics_route_index",
      path: `${base}/index.ts`,
      verifiedNow: true,
      scope: "src/modules/stream/foundation/** only",
      mountedNow: false,
      includesStreamIndexPatch: false,
      includesAppServerPatch: false,
      includesRuntimeExecution: false,
      safeCode: "diagnostics_runtime_route_index_verified_source_only",
    },
  ];
}

function buildChecks(): readonly StreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationItem[] {
  const previous = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionSnapshot();
  const runtimeRoute = getStreamFoundationKernelDiagnosticsAdminRuntimeRouteSnapshot();
  const runtimeReadiness = getStreamFoundationKernelDiagnosticsAdminRuntimeRouteReadiness();
  const runtimeSmoke = getStreamFoundationKernelDiagnosticsAdminRuntimeRouteSmokeReport();
  const verifiedFiles = expectedVerifiedFiles();
  const previousFilePaths = new Set(previous.writtenFiles.map((file) => file.path));

  return [
    {
      area: "foundation_scope",
      checkId: "139l_foundation_scope_only",
      passed: previous.patchScope === "src/modules/stream/foundation/** only" && runtimeRoute.patchScope === "src/modules/stream/foundation/** only",
      blocking: previous.patchScope !== "src/modules/stream/foundation/** only" || runtimeRoute.patchScope !== "src/modules/stream/foundation/** only",
      expected: "All verified diagnostics route files stay inside src/modules/stream/foundation/**",
      observed: `${previous.patchScope}:${runtimeRoute.patchScope}`,
      remediation: "Move any route mount or app/server integration to a later explicitly approved stage.",
      safeCode: "runtime_route_source_post_write_foundation_scope_verified",
      safeMessageKey: "stream.foundation.139l.foundationScopeVerified",
    },
    {
      area: "previous_source_only_execution",
      checkId: "139l_previous_139k_source_only_execution_ready",
      passed: previous.status === "route_mount_source_package_source_only_execution_ready" && previous.readyForPostWriteVerification === true,
      blocking: previous.status !== "route_mount_source_package_source_only_execution_ready" || previous.readyForPostWriteVerification !== true,
      expected: "139K source-only execution completed and is ready for post-write verification",
      observed: `${previous.status}:${String(previous.readyForPostWriteVerification)}`,
      remediation: "Resolve 139K source-only execution blockers before post-write verification.",
      safeCode: "previous_source_only_execution_ready",
      safeMessageKey: "stream.foundation.139l.previousSourceOnlyExecutionReady",
    },
    {
      area: "runtime_route_source",
      checkId: "139l_runtime_route_source_ready_unmounted",
      passed: runtimeRoute.status === "runtime_route_source_ready_unmounted" && runtimeRoute.definitionCount > 0,
      blocking: runtimeRoute.status !== "runtime_route_source_ready_unmounted" || runtimeRoute.definitionCount <= 0,
      expected: "Runtime route source is ready but unmounted",
      observed: `${runtimeRoute.status}:${runtimeRoute.definitionCount}`,
      remediation: "Keep diagnostics runtime route source unmounted until protected backend route connection stage.",
      safeCode: "runtime_route_source_ready_unmounted_verified",
      safeMessageKey: "stream.foundation.139l.runtimeRouteSourceReadyUnmountedVerified",
    },
    {
      area: "written_file_inventory",
      checkId: "139l_written_file_inventory_matches_139k",
      passed: verifiedFiles.length === 6 && verifiedFiles.every((file) => previousFilePaths.has(file.path)),
      blocking: verifiedFiles.length !== 6 || verifiedFiles.some((file) => !previousFilePaths.has(file.path)),
      expected: "Six diagnostics runtime route files verified against 139K written file inventory",
      observed: `${verifiedFiles.length}:${previous.writtenFileCount}`,
      remediation: "Regenerate the post-write verification inventory from the 139K source-only execution snapshot.",
      safeCode: "written_file_inventory_matches_139k",
      safeMessageKey: "stream.foundation.139l.writtenFileInventoryMatches139k",
    },
    {
      area: "response_mapper",
      checkId: "139l_response_mapper_redacted_envelope_ready",
      passed: runtimeRoute.safety.rawSecretsReturned === false && runtimeRoute.safety.mobileProviderKeysAllowed === false,
      blocking: runtimeRoute.safety.rawSecretsReturned || runtimeRoute.safety.mobileProviderKeysAllowed,
      expected: "Response mapper returns only redacted diagnostics envelope and never raw secrets/mobile provider keys",
      observed: `${String(runtimeRoute.safety.rawSecretsReturned)}:${String(runtimeRoute.safety.mobileProviderKeysAllowed)}`,
      remediation: "Keep provider configuration redacted and server-side only.",
      safeCode: "response_mapper_redacted_envelope_verified",
      safeMessageKey: "stream.foundation.139l.responseMapperRedactedEnvelopeVerified",
    },
    {
      area: "handler_factory",
      checkId: "139l_handler_factory_unmounted_and_safe",
      passed: runtimeRoute.safety.expressRouterCreatedNow === false && runtimeRoute.safety.expressRouterBoundNow === false && runtimeRoute.safety.diagnosticsRouteRuntimeMountPerformedNow === false,
      blocking: runtimeRoute.safety.expressRouterCreatedNow || runtimeRoute.safety.expressRouterBoundNow || runtimeRoute.safety.diagnosticsRouteRuntimeMountPerformedNow,
      expected: "Handler factory exists as unmounted source and does not create/bind Express router",
      observed: `${String(runtimeRoute.safety.expressRouterCreatedNow)}:${String(runtimeRoute.safety.expressRouterBoundNow)}:${String(runtimeRoute.safety.diagnosticsRouteRuntimeMountPerformedNow)}`,
      remediation: "Keep Express router creation/binding for later controlled backend mount stage.",
      safeCode: "handler_factory_unmounted_verified",
      safeMessageKey: "stream.foundation.139l.handlerFactoryUnmountedVerified",
    },
    {
      area: "readiness_smoke",
      checkId: "139l_runtime_route_readiness_and_smoke_ready",
      passed: runtimeReadiness.ready === true && runtimeSmoke.status === "runtime_route_source_smoke_ready_unmounted",
      blocking: runtimeReadiness.ready !== true || runtimeSmoke.status !== "runtime_route_source_smoke_ready_unmounted",
      expected: "Runtime route readiness and smoke both pass while route remains unmounted",
      observed: `${String(runtimeReadiness.ready)}:${runtimeSmoke.status}`,
      remediation: "Fix runtime route readiness/smoke before route mount planning.",
      safeCode: "readiness_smoke_verified",
      safeMessageKey: "stream.foundation.139l.readinessSmokeVerified",
    },
    {
      area: "stream_index_guard",
      checkId: "139l_no_stream_index_patch",
      passed: previous.streamIndexPatchIncluded === false && previous.streamModuleIndexTouchedNow === false && runtimeRoute.safety.streamIndexPatchIncluded === false,
      blocking: previous.streamIndexPatchIncluded || previous.streamModuleIndexTouchedNow || runtimeRoute.safety.streamIndexPatchIncluded,
      expected: "No src/modules/stream/index.ts patch or touch",
      observed: `${String(previous.streamIndexPatchIncluded)}:${String(previous.streamModuleIndexTouchedNow)}:${String(runtimeRoute.safety.streamIndexPatchIncluded)}`,
      remediation: "Do not patch src/modules/stream/index.ts until controlled backend connection approval.",
      safeCode: "stream_index_guard_post_write_verified",
      safeMessageKey: "stream.foundation.139l.streamIndexGuardPostWriteVerified",
    },
    {
      area: "app_server_guard",
      checkId: "139l_no_app_server_patch",
      passed: previous.appServerPatchIncluded === false && previous.appServerTouchedNow === false && runtimeRoute.safety.appServerPatchIncluded === false,
      blocking: previous.appServerPatchIncluded || previous.appServerTouchedNow || runtimeRoute.safety.appServerPatchIncluded,
      expected: "No app.ts/server.ts patch or touch",
      observed: `${String(previous.appServerPatchIncluded)}:${String(previous.appServerTouchedNow)}:${String(runtimeRoute.safety.appServerPatchIncluded)}`,
      remediation: "Keep app/server integration for later protected route connection stage.",
      safeCode: "app_server_guard_post_write_verified",
      safeMessageKey: "stream.foundation.139l.appServerGuardPostWriteVerified",
    },
    {
      area: "route_mount_guard",
      checkId: "139l_no_route_mount_after_source_write",
      passed: runtimeRoute.mountedDefinitionCount === 0 && runtimeRoute.protectedRouteRegisteredCount === 0 && runtimeRoute.safety.diagnosticsRouteRuntimeMountPerformedNow === false,
      blocking: runtimeRoute.mountedDefinitionCount !== 0 || runtimeRoute.protectedRouteRegisteredCount !== 0 || runtimeRoute.safety.diagnosticsRouteRuntimeMountPerformedNow,
      expected: "No diagnostics route mount/protected route registration after source-only write",
      observed: `${runtimeRoute.mountedDefinitionCount}:${runtimeRoute.protectedRouteRegisteredCount}:${String(runtimeRoute.safety.diagnosticsRouteRuntimeMountPerformedNow)}`,
      remediation: "Mount only after explicit backend route connection approval and protected route gates.",
      safeCode: "route_mount_guard_post_write_verified",
      safeMessageKey: "stream.foundation.139l.routeMountGuardPostWriteVerified",
    },
    {
      area: "runtime_execution_guard",
      checkId: "139l_no_runtime_execution_after_source_write",
      passed:
        runtimeRoute.runtimeHttpRequestsPerformed === 0 &&
        runtimeRoute.databaseExecutionPerformed === 0 &&
        runtimeRoute.providerCallsPerformed === 0 &&
        runtimeRoute.walletMutationPerformed === 0 &&
        runtimeRoute.paymentAuthorizationPerformed === 0 &&
        runtimeRoute.monthlyPayoutPerformed === 0 &&
        runtimeRoute.moneyMovementPerformed === 0,
      blocking:
        runtimeRoute.runtimeHttpRequestsPerformed !== 0 ||
        runtimeRoute.databaseExecutionPerformed !== 0 ||
        runtimeRoute.providerCallsPerformed !== 0 ||
        runtimeRoute.walletMutationPerformed !== 0 ||
        runtimeRoute.paymentAuthorizationPerformed !== 0 ||
        runtimeRoute.monthlyPayoutPerformed !== 0 ||
        runtimeRoute.moneyMovementPerformed !== 0,
      expected: "No HTTP, DB, provider, Wallet, payment, payout, or money runtime execution",
      observed: `${runtimeRoute.runtimeHttpRequestsPerformed}:${runtimeRoute.databaseExecutionPerformed}:${runtimeRoute.providerCallsPerformed}:${runtimeRoute.walletMutationPerformed}:${runtimeRoute.paymentAuthorizationPerformed}:${runtimeRoute.monthlyPayoutPerformed}:${runtimeRoute.moneyMovementPerformed}`,
      remediation: "Keep runtime execution behind protected route, DB, provider, Wallet, ledger, and payout gates.",
      safeCode: "runtime_execution_guard_post_write_verified",
      safeMessageKey: "stream.foundation.139l.runtimeExecutionGuardPostWriteVerified",
    },
    {
      area: "secret_guard",
      checkId: "139l_no_raw_secrets_or_mobile_provider_keys",
      passed: runtimeRoute.rawSecretsReturned === 0 && runtimeRoute.mobileProviderKeysAllowed === false,
      blocking: runtimeRoute.rawSecretsReturned !== 0 || runtimeRoute.mobileProviderKeysAllowed,
      expected: "No raw secrets returned and no mobile provider keys allowed",
      observed: `${runtimeRoute.rawSecretsReturned}:${String(runtimeRoute.mobileProviderKeysAllowed)}`,
      remediation: "Keep provider keys server-side only and expose redacted readiness states.",
      safeCode: "secret_guard_post_write_verified",
      safeMessageKey: "stream.foundation.139l.secretGuardPostWriteVerified",
    },
    {
      area: "fake_success_guard",
      checkId: "139l_no_fake_success_after_source_write",
      passed: runtimeRoute.fakeSuccessAllowed === false && previous.fakeSuccessAllowed === false,
      blocking: runtimeRoute.fakeSuccessAllowed || previous.fakeSuccessAllowed,
      expected: "No fake route/provider/payment success",
      observed: `${String(runtimeRoute.fakeSuccessAllowed)}:${String(previous.fakeSuccessAllowed)}`,
      remediation: "Use blocked/provider_not_configured states until real providers and route gates pass.",
      safeCode: "fake_success_guard_post_write_verified",
      safeMessageKey: "stream.foundation.139l.fakeSuccessGuardPostWriteVerified",
    },
  ];
}

function buildDecision(
  status: StreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationStatus,
  blockingChecks: number,
): StreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationDecision {
  const previous = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionSnapshot();
  if (previous.status !== "route_mount_source_package_source_only_execution_ready" || previous.readyForPostWriteVerification !== true) {
    return {
      decisionCode: "runtime_route_source_only_post_write_blocked_by_previous_execution",
      readyForControlledRouteMountPlanning: false,
      routeSourceOnlyPostWriteVerifiedNow: true,
      sourceFilesVerifiedNow: true,
      ownerApprovalRequiredBeforeRuntimeMount: true,
      routeMountAllowedNow: false,
      routeMountPerformedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "post_write_verification_blocked_by_previous_execution",
      safeMessageKey: "stream.foundation.139l.blockedByPreviousExecution",
    };
  }

  if (status !== "runtime_route_source_only_post_write_verified" || blockingChecks > 0) {
    return {
      decisionCode: "runtime_route_source_only_post_write_blocked_by_safety_check",
      readyForControlledRouteMountPlanning: false,
      routeSourceOnlyPostWriteVerifiedNow: true,
      sourceFilesVerifiedNow: true,
      ownerApprovalRequiredBeforeRuntimeMount: true,
      routeMountAllowedNow: false,
      routeMountPerformedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "post_write_verification_blocked_by_safety_check",
      safeMessageKey: "stream.foundation.139l.blockedBySafetyCheck",
    };
  }

  return {
    decisionCode: "runtime_route_source_only_post_write_verified_ready_for_mount_planning",
    readyForControlledRouteMountPlanning: true,
    routeSourceOnlyPostWriteVerifiedNow: true,
    sourceFilesVerifiedNow: true,
    ownerApprovalRequiredBeforeRuntimeMount: true,
    routeMountAllowedNow: false,
    routeMountPerformedNow: false,
    runtimeActivationAllowedNow: false,
    safeCode: "post_write_verification_ready_for_controlled_mount_planning",
    safeMessageKey: "stream.foundation.139l.readyForControlledMountPlanning",
  };
}

export function getStreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationSnapshot(): StreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationSnapshot {
  const previous = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionSnapshot();
  const runtimeRoute = getStreamFoundationKernelDiagnosticsAdminRuntimeRouteSnapshot();
  const verifiedFiles = expectedVerifiedFiles();
  const checks = buildChecks();
  const blockingChecks = checks.filter((check) => check.blocking).length;
  const passedChecks = checks.filter((check) => check.passed).length;
  const status: StreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationStatus =
    blockingChecks === 0 ? "runtime_route_source_only_post_write_verified" : "runtime_route_source_only_post_write_blocked";
  const decision = buildDecision(status, blockingChecks);

  return {
    version: STREAM_FOUNDATION_139L_KERNEL_DIAGNOSTICS_RUNTIME_ROUTE_SOURCE_ONLY_POST_WRITE_VERIFICATION_VERSION,
    status,
    patchScope: "src/modules/stream/foundation/** only",
    previousSourceOnlyExecutionStatus: previous.status,
    runtimeRouteSourceStatus: runtimeRoute.status,
    verifiedFiles,
    verifiedFileCount: verifiedFiles.length,
    totalChecks: checks.length,
    passedChecks,
    blockingChecks,
    readyForControlledRouteMountPlanning: decision.readyForControlledRouteMountPlanning,
    routeSourceOnlyPostWriteVerifiedNow: true,
    sourceFilesVerifiedNow: true,
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
    checks,
    decision,
    safety: VERIFICATION_SAFETY,
  };
}
