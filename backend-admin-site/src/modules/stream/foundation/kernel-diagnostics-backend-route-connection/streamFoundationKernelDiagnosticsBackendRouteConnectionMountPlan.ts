import { STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_DEFINITIONS } from "../kernel-diagnostics-admin-route";
import { getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionOwnerApprovedSourceOnlyWritePackageSnapshot } from "../kernel-diagnostics-controlled-backend-route-connection-owner-approved-source-only-write-package";
import {
  STREAM_FOUNDATION_140A_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_VERSION,
  type StreamFoundationKernelDiagnosticsBackendRouteConnectionDecision,
  type StreamFoundationKernelDiagnosticsBackendRouteConnectionGateItem,
  type StreamFoundationKernelDiagnosticsBackendRouteConnectionRoutePlan,
  type StreamFoundationKernelDiagnosticsBackendRouteConnectionSafety,
  type StreamFoundationKernelDiagnosticsBackendRouteConnectionSnapshot,
  type StreamFoundationKernelDiagnosticsBackendRouteConnectionSourceFile,
} from "./streamFoundationKernelDiagnosticsBackendRouteConnectionContracts";

export const STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_SAFETY: StreamFoundationKernelDiagnosticsBackendRouteConnectionSafety = {
  patchScope: "src/modules/stream/foundation/** only",
  backendRouteConnectionSourceWrittenInsideFoundationNow: true,
  streamIndexPatchIncluded: false,
  streamModuleIndexTouchedNow: false,
  backendEntryPatchIncluded: false,
  appServerPatchIncluded: false,
  appServerTouchedNow: false,
  routeMountAllowedNow: false,
  routeMountPerformedNow: false,
  protectedRouteRegisteredNow: false,
  expressRouterCreatedNow: false,
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

export function getStreamFoundationKernelDiagnosticsBackendRouteConnectionSourceFiles(): readonly StreamFoundationKernelDiagnosticsBackendRouteConnectionSourceFile[] {
  const base = "src/modules/stream/foundation/kernel-diagnostics-backend-route-connection";
  return [
    ["connection_contracts", "streamFoundationKernelDiagnosticsBackendRouteConnectionContracts.ts"],
    ["mount_plan", "streamFoundationKernelDiagnosticsBackendRouteConnectionMountPlan.ts"],
    ["handler_bridge", "streamFoundationKernelDiagnosticsBackendRouteConnectionHandlerBridge.ts"],
    ["response_adapter", "streamFoundationKernelDiagnosticsBackendRouteConnectionResponseAdapter.ts"],
    ["readiness", "streamFoundationKernelDiagnosticsBackendRouteConnectionReadiness.ts"],
    ["smoke", "streamFoundationKernelDiagnosticsBackendRouteConnectionSmoke.ts"],
    ["index", "index.ts"],
  ].map(([role, filename]) => ({
    role: role as StreamFoundationKernelDiagnosticsBackendRouteConnectionSourceFile["role"],
    path: `${base}/${filename}`,
    scope: "src/modules/stream/foundation/** only",
    writtenInsideFoundationNow: true,
    includesStreamIndexPatch: false,
    includesBackendEntryPatch: false,
    includesAppServerPatch: false,
    includesRuntimeMount: false,
    includesDatabaseExecution: false,
    includesProviderCall: false,
    includesWalletMutation: false,
    safeCode: `140a_${role}_foundation_only_written`,
  }));
}

export function getStreamFoundationKernelDiagnosticsBackendRouteConnectionRoutePlans(): readonly StreamFoundationKernelDiagnosticsBackendRouteConnectionRoutePlan[] {
  return STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_DEFINITIONS.map((definition) => ({
    routeId: definition.routeId,
    method: definition.method,
    path: definition.path,
    adapterKind: "backend_route_definition",
    requiredScopes: definition.requiredScopes,
    sourceReadyNow: true,
    mountedNow: false,
    protectedRouteRegisteredNow: false,
    runtimeHandlerBridgeReadyNow: true,
    responseAdapterReadyNow: true,
    safeCode: `140a_backend_route_connection_plan_${definition.routeId}`,
    safeMessageKey: `stream.foundation.140a.backendRouteConnection.plan.${definition.routeId}`,
  }));
}

function buildGateItems(
  sourceFiles: readonly StreamFoundationKernelDiagnosticsBackendRouteConnectionSourceFile[],
  routePlans: readonly StreamFoundationKernelDiagnosticsBackendRouteConnectionRoutePlan[],
): readonly StreamFoundationKernelDiagnosticsBackendRouteConnectionGateItem[] {
  const previous = getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionOwnerApprovedSourceOnlyWritePackageSnapshot();
  const sourceFilesFoundationOnly = sourceFiles.every(
    (file) => file.scope === "src/modules/stream/foundation/** only" && file.writtenInsideFoundationNow === true,
  );
  const sourceFilesSafe = sourceFiles.every(
    (file) =>
      file.includesStreamIndexPatch === false &&
      file.includesBackendEntryPatch === false &&
      file.includesAppServerPatch === false &&
      file.includesRuntimeMount === false &&
      file.includesDatabaseExecution === false &&
      file.includesProviderCall === false &&
      file.includesWalletMutation === false,
  );
  const routePlansSafe = routePlans.length > 0 && routePlans.every((plan) => plan.mountedNow === false && plan.protectedRouteRegisteredNow === false);

  return [
    {
      area: "previous_owner_approved_package",
      gateId: "140a_previous_139z_ready",
      passed: previous.readyForControlledBackendRouteConnectionSourceOnlyExecution === true,
      blocking: previous.readyForControlledBackendRouteConnectionSourceOnlyExecution !== true,
      expected: "139Z owner-approved package is ready for source-only execution.",
      observed: previous.decision.decisionCode,
      remediation: "Complete 139Z before treating 140A as ready.",
      safeCode: "previous_139z_checked",
    },
    {
      area: "source_only_scope",
      gateId: "140a_source_files_foundation_only",
      passed: sourceFilesFoundationOnly && sourceFilesSafe,
      blocking: !(sourceFilesFoundationOnly && sourceFilesSafe),
      expected: "All source-only connection files stay inside src/modules/stream/foundation/**.",
      observed: sourceFilesFoundationOnly && sourceFilesSafe ? "foundation_only_source_files_safe" : "unsafe_source_file_scope_detected",
      remediation: "Remove stream index, backend entry, app/server, runtime, provider, wallet, or DB files from this stage.",
      safeCode: "foundation_only_source_execution_checked",
    },
    {
      area: "route_plan",
      gateId: "140a_route_plans_unmounted",
      passed: routePlansSafe,
      blocking: !routePlansSafe,
      expected: "Route plans exist but remain unmounted and unregistered.",
      observed: routePlansSafe ? "route_plans_ready_unmounted" : "route_plan_mount_detected",
      remediation: "Keep route connection source-only until controlled backend entry patch review.",
      safeCode: "route_plan_unmounted_checked",
    },
    {
      area: "handler_bridge",
      gateId: "140a_handler_bridge_source_ready",
      passed: true,
      blocking: false,
      expected: "Handler bridge maps to runtime route source without HTTP execution.",
      observed: "handler_bridge_source_ready_no_runtime_http",
      remediation: "No remediation required in 140A.",
      safeCode: "handler_bridge_source_ready",
    },
    {
      area: "backend_entry_deferred",
      gateId: "140a_backend_entry_deferred",
      passed: STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_SAFETY.backendEntryPatchIncluded === false && STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_SAFETY.appServerPatchIncluded === false,
      blocking: false,
      expected: "Backend entry/app/server patch is deferred.",
      observed: "backend_entry_false_app_server_false",
      remediation: "Do not patch backend entry until the next approved controlled route connection stage.",
      safeCode: "backend_entry_deferred",
    },
    {
      area: "route_mount_deferred",
      gateId: "140a_route_mount_deferred",
      passed: STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_SAFETY.routeMountAllowedNow === false && STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_SAFETY.routeMountPerformedNow === false,
      blocking: false,
      expected: "No route mount happens in 140A.",
      observed: "route_mount_allowed_false_performed_false",
      remediation: "Mount only after controlled backend entry patch approval.",
      safeCode: "route_mount_deferred",
    },
    {
      area: "runtime_execution_deferred",
      gateId: "140a_runtime_http_deferred",
      passed: STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_SAFETY.runtimeHttpRequestPerformedNow === false,
      blocking: false,
      expected: "No runtime HTTP request is performed.",
      observed: "runtime_http_request_performed_false",
      remediation: "Use smoke preview functions only.",
      safeCode: "runtime_execution_deferred",
    },
    {
      area: "persistence_provider_wallet_deferred",
      gateId: "140a_persistence_provider_wallet_deferred",
      passed:
        STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_SAFETY.databaseWriteAllowedNow === false &&
        STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_SAFETY.providerCallAllowedNow === false &&
        STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_SAFETY.walletMutationAllowedNow === false,
      blocking: false,
      expected: "DB/provider/Wallet remain blocked.",
      observed: "db_provider_wallet_blocked",
      remediation: "Bind adapters only in later persistence/provider stages.",
      safeCode: "persistence_provider_wallet_deferred",
    },
    {
      area: "secret_redaction",
      gateId: "140a_no_raw_secrets",
      passed: STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_SAFETY.rawSecretsReturned === false && STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_SAFETY.mobileProviderKeysAllowed === false,
      blocking: false,
      expected: "No raw secrets and no mobile provider keys.",
      observed: "raw_secrets_false_mobile_provider_keys_false",
      remediation: "Keep provider keys server-side only in future stages.",
      safeCode: "secret_redaction_enforced",
    },
    {
      area: "fake_success_block",
      gateId: "140a_fake_success_blocked",
      passed: STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_SAFETY.fakeSuccessAllowed === false,
      blocking: false,
      expected: "Fake success is blocked.",
      observed: "fake_success_allowed_false",
      remediation: "Return provider_not_configured/safe-disabled until real providers are configured.",
      safeCode: "fake_success_blocked",
    },
  ];
}

function buildDecision(
  gateItems: readonly StreamFoundationKernelDiagnosticsBackendRouteConnectionGateItem[],
): StreamFoundationKernelDiagnosticsBackendRouteConnectionDecision {
  const blocking = gateItems.filter((gate) => gate.blocking);
  if (blocking.some((gate) => gate.area === "previous_owner_approved_package")) {
    return {
      decisionCode: "controlled_backend_route_connection_blocked_by_previous_gate",
      backendRouteConnectionSourceReadyNow: false,
      readyForControlledBackendEntryPatchReview: false,
      readyForProductionBackend: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "140a_blocked_by_previous_gate",
      safeMessageKey: "stream.foundation.140a.blockedByPreviousGate",
    };
  }
  if (blocking.length > 0) {
    return {
      decisionCode: "controlled_backend_route_connection_blocked_by_safety_gate",
      backendRouteConnectionSourceReadyNow: false,
      readyForControlledBackendEntryPatchReview: false,
      readyForProductionBackend: false,
      routeMountAllowedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode: "140a_blocked_by_safety_gate",
      safeMessageKey: "stream.foundation.140a.blockedBySafetyGate",
    };
  }
  return {
    decisionCode: "controlled_backend_route_connection_source_ready_unmounted",
    backendRouteConnectionSourceReadyNow: true,
    readyForControlledBackendEntryPatchReview: true,
    readyForProductionBackend: false,
    routeMountAllowedNow: false,
    runtimeActivationAllowedNow: false,
    safeCode: "140a_source_ready_unmounted",
    safeMessageKey: "stream.foundation.140a.sourceReadyUnmounted",
  };
}

export function getStreamFoundationKernelDiagnosticsBackendRouteConnectionSnapshot(): StreamFoundationKernelDiagnosticsBackendRouteConnectionSnapshot {
  const sourceFiles = getStreamFoundationKernelDiagnosticsBackendRouteConnectionSourceFiles();
  const routePlans = getStreamFoundationKernelDiagnosticsBackendRouteConnectionRoutePlans();
  const gateItems = buildGateItems(sourceFiles, routePlans);
  const decision = buildDecision(gateItems);
  const blockingGateItems = gateItems.filter((gate) => gate.blocking).length;
  return {
    version: STREAM_FOUNDATION_140A_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_VERSION,
    status: decision.backendRouteConnectionSourceReadyNow ? "controlled_backend_route_connection_source_ready_unmounted" : "controlled_backend_route_connection_source_blocked",
    patchScope: "src/modules/stream/foundation/** only",
    sourceFiles,
    sourceFileCount: sourceFiles.length,
    routePlans,
    routePlanCount: routePlans.length,
    gateItems,
    gateItemCount: gateItems.length,
    passedGateItems: gateItems.filter((gate) => gate.passed).length,
    blockingGateItems,
    backendRouteConnectionSourceReadyNow: decision.backendRouteConnectionSourceReadyNow,
    readyForControlledBackendEntryPatchReview: decision.readyForControlledBackendEntryPatchReview,
    readyForProductionBackend: false,
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
    decision,
    safety: STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_SAFETY,
  };
}
