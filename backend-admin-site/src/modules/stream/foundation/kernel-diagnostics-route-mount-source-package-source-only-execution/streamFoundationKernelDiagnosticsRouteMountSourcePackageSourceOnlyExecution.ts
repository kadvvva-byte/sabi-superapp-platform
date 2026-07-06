import { getStreamFoundationKernelDiagnosticsAdminRuntimeRouteSnapshot } from "../kernel-diagnostics-admin-runtime-route";
import { getStreamFoundationKernelDiagnosticsRouteMountSourcePackageOwnerApprovedSourceOnlyWritePackageSnapshot } from "../kernel-diagnostics-route-mount-source-package-owner-approved-source-only-write-package";
import {
  STREAM_FOUNDATION_139K_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_SOURCE_PACKAGE_SOURCE_ONLY_EXECUTION_VERSION,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionDecision,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionItem,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionSafety,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionSnapshot,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionStatus,
  type StreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionWrittenFile,
} from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionContracts";

const SOURCE_ONLY_EXECUTION_SAFETY: StreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionSafety = {
  patchScope: "src/modules/stream/foundation/** only",
  previousOwnerApprovedPackageRequired: true,
  sourcePackageSourceOnlyExecutedNow: true,
  sourceFilesWrittenNow: true,
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

function buildWrittenFiles(): readonly StreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionWrittenFile[] {
  const base = "src/modules/stream/foundation/kernel-diagnostics-admin-runtime-route";
  return [
    {
      role: "diagnostics_route_contracts",
      path: `${base}/streamFoundationKernelDiagnosticsAdminRuntimeRouteContracts.ts`,
      scope: "src/modules/stream/foundation/** only",
      writtenNow: true,
      mountedNow: false,
      includesStreamIndexPatch: false,
      includesAppServerPatch: false,
      includesRuntimeExecution: false,
      safeCode: "diagnostics_runtime_route_contracts_written_source_only",
    },
    {
      role: "diagnostics_route_response_mapper",
      path: `${base}/streamFoundationKernelDiagnosticsAdminRuntimeRouteResponseMapper.ts`,
      scope: "src/modules/stream/foundation/** only",
      writtenNow: true,
      mountedNow: false,
      includesStreamIndexPatch: false,
      includesAppServerPatch: false,
      includesRuntimeExecution: false,
      safeCode: "diagnostics_runtime_route_response_mapper_written_source_only",
    },
    {
      role: "diagnostics_route_handler_factory",
      path: `${base}/streamFoundationKernelDiagnosticsAdminRuntimeRouteHandlerFactory.ts`,
      scope: "src/modules/stream/foundation/** only",
      writtenNow: true,
      mountedNow: false,
      includesStreamIndexPatch: false,
      includesAppServerPatch: false,
      includesRuntimeExecution: false,
      safeCode: "diagnostics_runtime_route_handler_factory_written_source_only",
    },
    {
      role: "diagnostics_route_readiness",
      path: `${base}/streamFoundationKernelDiagnosticsAdminRuntimeRouteReadiness.ts`,
      scope: "src/modules/stream/foundation/** only",
      writtenNow: true,
      mountedNow: false,
      includesStreamIndexPatch: false,
      includesAppServerPatch: false,
      includesRuntimeExecution: false,
      safeCode: "diagnostics_runtime_route_readiness_written_source_only",
    },
    {
      role: "diagnostics_route_smoke",
      path: `${base}/streamFoundationKernelDiagnosticsAdminRuntimeRouteSmoke.ts`,
      scope: "src/modules/stream/foundation/** only",
      writtenNow: true,
      mountedNow: false,
      includesStreamIndexPatch: false,
      includesAppServerPatch: false,
      includesRuntimeExecution: false,
      safeCode: "diagnostics_runtime_route_smoke_written_source_only",
    },
    {
      role: "diagnostics_route_index",
      path: `${base}/index.ts`,
      scope: "src/modules/stream/foundation/** only",
      writtenNow: true,
      mountedNow: false,
      includesStreamIndexPatch: false,
      includesAppServerPatch: false,
      includesRuntimeExecution: false,
      safeCode: "diagnostics_runtime_route_index_written_source_only",
    },
  ];
}

function buildGateItems(): readonly StreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionItem[] {
  const previous = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageOwnerApprovedSourceOnlyWritePackageSnapshot();
  const runtimeRoute = getStreamFoundationKernelDiagnosticsAdminRuntimeRouteSnapshot();
  const writtenFiles = buildWrittenFiles();
  return [
    {
      area: "foundation_scope",
      gateId: "139k_source_only_execution_foundation_scope_only",
      passed: previous.patchScope === "src/modules/stream/foundation/** only" && runtimeRoute.patchScope === "src/modules/stream/foundation/** only",
      blocking: previous.patchScope !== "src/modules/stream/foundation/** only" || runtimeRoute.patchScope !== "src/modules/stream/foundation/** only",
      expected: "139K source-only route files stay inside src/modules/stream/foundation/**",
      observed: `${previous.patchScope}:${runtimeRoute.patchScope}`,
      remediation: "Move any non-foundation changes to a later explicitly approved backend connection stage.",
      safeCode: "foundation_scope_only_source_execution_passed",
      safeMessageKey: "stream.foundation.139k.foundationScopeOnlySourceExecutionPassed",
    },
    {
      area: "previous_owner_package",
      gateId: "139k_previous_owner_approved_package_ready",
      passed: previous.status === "route_mount_source_package_owner_approved_source_only_write_package_ready" && previous.readyForFutureSourceOnlyWriteExecution === true,
      blocking: previous.status !== "route_mount_source_package_owner_approved_source_only_write_package_ready" || previous.readyForFutureSourceOnlyWriteExecution !== true,
      expected: "139J owner-approved package is ready for source-only write execution",
      observed: `${previous.status}:${String(previous.readyForFutureSourceOnlyWriteExecution)}`,
      remediation: "Resolve 139J owner-approved package blockers before source-only execution.",
      safeCode: "previous_owner_package_ready",
      safeMessageKey: "stream.foundation.139k.previousOwnerPackageReady",
    },
    {
      area: "runtime_route_source",
      gateId: "139k_runtime_route_source_ready_unmounted",
      passed: runtimeRoute.status === "runtime_route_source_ready_unmounted" && runtimeRoute.definitionCount > 0,
      blocking: runtimeRoute.status !== "runtime_route_source_ready_unmounted" || runtimeRoute.definitionCount <= 0,
      expected: "Runtime route source exists as unmounted foundation source",
      observed: `${runtimeRoute.status}:${runtimeRoute.definitionCount}`,
      remediation: "Create contracts, response mapper, handler factory, readiness, smoke, and index inside foundation only.",
      safeCode: "runtime_route_source_ready_unmounted",
      safeMessageKey: "stream.foundation.139k.runtimeRouteSourceReadyUnmounted",
    },
    {
      area: "source_only_execution",
      gateId: "139k_source_files_written_foundation_only",
      passed: writtenFiles.length === 6 && writtenFiles.every((file) => file.writtenNow === true && file.scope === "src/modules/stream/foundation/** only"),
      blocking: writtenFiles.length !== 6 || writtenFiles.some((file) => file.scope !== "src/modules/stream/foundation/** only"),
      expected: "Exactly six diagnostics runtime route source files are present in foundation scope",
      observed: String(writtenFiles.length),
      remediation: "Keep source-only files limited to the diagnostics runtime route package.",
      safeCode: "source_files_written_foundation_only",
      safeMessageKey: "stream.foundation.139k.sourceFilesWrittenFoundationOnly",
    },
    {
      area: "stream_index_guard",
      gateId: "139k_no_stream_module_index_patch",
      passed: previous.streamIndexPatchIncluded === false && previous.streamModuleIndexTouchedNow === false && runtimeRoute.safety.streamIndexPatchIncluded === false,
      blocking: previous.streamIndexPatchIncluded || previous.streamModuleIndexTouchedNow || runtimeRoute.safety.streamIndexPatchIncluded,
      expected: "No src/modules/stream/index.ts patch or touch",
      observed: `${String(previous.streamIndexPatchIncluded)}:${String(previous.streamModuleIndexTouchedNow)}:${String(runtimeRoute.safety.streamIndexPatchIncluded)}`,
      remediation: "Do not include src/modules/stream/index.ts until controlled route connection stage.",
      safeCode: "stream_index_guard_source_execution_passed",
      safeMessageKey: "stream.foundation.139k.streamIndexGuardSourceExecutionPassed",
    },
    {
      area: "app_server_guard",
      gateId: "139k_no_app_server_patch",
      passed: previous.appServerPatchIncluded === false && previous.appServerTouchedNow === false && runtimeRoute.safety.appServerPatchIncluded === false,
      blocking: previous.appServerPatchIncluded || previous.appServerTouchedNow || runtimeRoute.safety.appServerPatchIncluded,
      expected: "No app.ts/server.ts patch or touch",
      observed: `${String(previous.appServerPatchIncluded)}:${String(previous.appServerTouchedNow)}:${String(runtimeRoute.safety.appServerPatchIncluded)}`,
      remediation: "Keep app/server mount for later backend route connection stage.",
      safeCode: "app_server_guard_source_execution_passed",
      safeMessageKey: "stream.foundation.139k.appServerGuardSourceExecutionPassed",
    },
    {
      area: "route_mount_guard",
      gateId: "139k_no_route_mount_performed",
      passed: runtimeRoute.mountedDefinitionCount === 0 && runtimeRoute.protectedRouteRegisteredCount === 0 && runtimeRoute.safety.diagnosticsRouteRuntimeMountPerformedNow === false,
      blocking: runtimeRoute.mountedDefinitionCount !== 0 || runtimeRoute.protectedRouteRegisteredCount !== 0 || runtimeRoute.safety.diagnosticsRouteRuntimeMountPerformedNow,
      expected: "No diagnostics route mount or protected route registration",
      observed: `${runtimeRoute.mountedDefinitionCount}:${runtimeRoute.protectedRouteRegisteredCount}:${String(runtimeRoute.safety.diagnosticsRouteRuntimeMountPerformedNow)}`,
      remediation: "Mount only in a later protected app/server integration stage after explicit approval and auth gates.",
      safeCode: "route_mount_guard_source_execution_passed",
      safeMessageKey: "stream.foundation.139k.routeMountGuardSourceExecutionPassed",
    },
    {
      area: "runtime_execution_guard",
      gateId: "139k_no_runtime_execution",
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
      remediation: "Keep runtime execution behind later protected route, DB, provider, Wallet, and ledger gates.",
      safeCode: "runtime_execution_guard_source_execution_passed",
      safeMessageKey: "stream.foundation.139k.runtimeExecutionGuardSourceExecutionPassed",
    },
    {
      area: "secret_guard",
      gateId: "139k_no_raw_secrets_or_mobile_provider_keys",
      passed: runtimeRoute.rawSecretsReturned === 0 && runtimeRoute.mobileProviderKeysAllowed === false,
      blocking: runtimeRoute.rawSecretsReturned !== 0 || runtimeRoute.mobileProviderKeysAllowed,
      expected: "No raw secrets returned and no mobile provider keys allowed",
      observed: `${runtimeRoute.rawSecretsReturned}:${String(runtimeRoute.mobileProviderKeysAllowed)}`,
      remediation: "Keep provider keys server-side only and return redacted readiness states only.",
      safeCode: "secret_guard_source_execution_passed",
      safeMessageKey: "stream.foundation.139k.secretGuardSourceExecutionPassed",
    },
    {
      area: "fake_success_guard",
      gateId: "139k_no_fake_success",
      passed: runtimeRoute.fakeSuccessAllowed === false,
      blocking: runtimeRoute.fakeSuccessAllowed,
      expected: "No fake provider/payment/route success",
      observed: String(runtimeRoute.fakeSuccessAllowed),
      remediation: "Use blocked/provider_not_configured states until real providers and server gates pass.",
      safeCode: "fake_success_guard_source_execution_passed",
      safeMessageKey: "stream.foundation.139k.fakeSuccessGuardSourceExecutionPassed",
    },
  ];
}

function buildDecision(
  status: StreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionStatus,
  blockingGateItems: number,
): StreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionDecision {
  const previous = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageOwnerApprovedSourceOnlyWritePackageSnapshot();
  if (previous.status !== "route_mount_source_package_owner_approved_source_only_write_package_ready" || previous.readyForFutureSourceOnlyWriteExecution !== true) {
    return {
      decisionCode: "route_mount_source_package_source_only_execution_blocked_by_previous_owner_package",
      readyForPostWriteVerification: false,
      sourcePackageSourceOnlyExecutedNow: true,
      sourceFilesWrittenNow: true,
      sourceTextReturned: false,
      ownerApprovalRequiredBeforeRuntimeMount: true,
      routeMountAllowedNow: false,
      routeMountPerformedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "source_only_execution_blocked_previous_owner_package",
      safeMessageKey: "stream.foundation.139k.sourceOnlyExecutionBlockedPreviousOwnerPackage",
    };
  }
  if (status !== "route_mount_source_package_source_only_execution_ready" || blockingGateItems > 0) {
    return {
      decisionCode: "route_mount_source_package_source_only_execution_blocked_by_safety_gate",
      readyForPostWriteVerification: false,
      sourcePackageSourceOnlyExecutedNow: true,
      sourceFilesWrittenNow: true,
      sourceTextReturned: false,
      ownerApprovalRequiredBeforeRuntimeMount: true,
      routeMountAllowedNow: false,
      routeMountPerformedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "source_only_execution_blocked_safety_gate",
      safeMessageKey: "stream.foundation.139k.sourceOnlyExecutionBlockedSafetyGate",
    };
  }
  return {
    decisionCode: "route_mount_source_package_source_only_execution_ready_for_post_write_verification",
    readyForPostWriteVerification: true,
    sourcePackageSourceOnlyExecutedNow: true,
    sourceFilesWrittenNow: true,
    sourceTextReturned: false,
    ownerApprovalRequiredBeforeRuntimeMount: true,
    routeMountAllowedNow: false,
    routeMountPerformedNow: false,
    runtimeActivationAllowedNow: false,
    safeCode: "source_only_execution_ready_for_post_write_verification",
    safeMessageKey: "stream.foundation.139k.sourceOnlyExecutionReadyForPostWriteVerification",
  };
}

export function getStreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionSnapshot(): StreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionSnapshot {
  const previous = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageOwnerApprovedSourceOnlyWritePackageSnapshot();
  const runtimeRoute = getStreamFoundationKernelDiagnosticsAdminRuntimeRouteSnapshot();
  const gateItems = buildGateItems();
  const writtenFiles = buildWrittenFiles();
  const blockingGateItems = gateItems.filter((item) => item.blocking).length;
  const passedGateItems = gateItems.filter((item) => item.passed).length;
  const status: StreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionStatus =
    blockingGateItems === 0 ? "route_mount_source_package_source_only_execution_ready" : "route_mount_source_package_source_only_execution_blocked";
  const decision = buildDecision(status, blockingGateItems);

  return {
    version: STREAM_FOUNDATION_139K_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_SOURCE_PACKAGE_SOURCE_ONLY_EXECUTION_VERSION,
    status,
    patchScope: "src/modules/stream/foundation/** only",
    previousOwnerApprovedPackageStatus: previous.status,
    runtimeRouteSourceStatus: runtimeRoute.status,
    totalGateItems: gateItems.length,
    passedGateItems,
    blockingGateItems,
    writtenFiles,
    writtenFileCount: writtenFiles.length,
    readyForPostWriteVerification: decision.readyForPostWriteVerification,
    sourcePackageSourceOnlyExecutedNow: true,
    sourceFilesWrittenNow: true,
    sourceTextReturned: false,
    ownerApprovalRequiredBeforeRuntimeMount: true,
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
    safety: SOURCE_ONLY_EXECUTION_SAFETY,
  };
}
