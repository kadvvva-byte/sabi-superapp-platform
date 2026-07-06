import { STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_DEFINITIONS } from "../kernel-diagnostics-admin-route";
import {
  type StreamFoundationKernelDiagnosticsAdminRuntimeRouteDefinition,
  type StreamFoundationKernelDiagnosticsAdminRuntimeRouteHandler,
  type StreamFoundationKernelDiagnosticsAdminRuntimeRouteSnapshot,
  STREAM_FOUNDATION_139K_KERNEL_DIAGNOSTICS_ADMIN_RUNTIME_ROUTE_VERSION,
} from "./streamFoundationKernelDiagnosticsAdminRuntimeRouteContracts";
import {
  STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_RUNTIME_ROUTE_SAFETY,
  mapStreamFoundationKernelDiagnosticsAdminRuntimeRouteResponse,
} from "./streamFoundationKernelDiagnosticsAdminRuntimeRouteResponseMapper";

export function createStreamFoundationKernelDiagnosticsAdminRuntimeRouteDefinitions(): readonly StreamFoundationKernelDiagnosticsAdminRuntimeRouteDefinition[] {
  return STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_DEFINITIONS.map((definition) => ({
    routeId: definition.routeId,
    method: definition.method,
    path: definition.path,
    mountedNow: false,
    protectedRouteRegisteredNow: false,
    sourceReadyNow: true,
    requiredScopes: definition.requiredScopes,
    safeCode: `runtime_route_source_ready_${definition.routeId}`,
    safeMessageKey: `stream.foundation.139k.runtimeRouteSourceReady.${definition.routeId}`,
  }));
}

export function createStreamFoundationKernelDiagnosticsAdminRuntimeRouteHandler(): StreamFoundationKernelDiagnosticsAdminRuntimeRouteHandler {
  return (request) => mapStreamFoundationKernelDiagnosticsAdminRuntimeRouteResponse(request);
}

export function getStreamFoundationKernelDiagnosticsAdminRuntimeRouteSnapshot(): StreamFoundationKernelDiagnosticsAdminRuntimeRouteSnapshot {
  const definitions = createStreamFoundationKernelDiagnosticsAdminRuntimeRouteDefinitions();
  return {
    version: STREAM_FOUNDATION_139K_KERNEL_DIAGNOSTICS_ADMIN_RUNTIME_ROUTE_VERSION,
    status: definitions.length > 0 ? "runtime_route_source_ready_unmounted" : "runtime_route_source_blocked",
    patchScope: "src/modules/stream/foundation/** only",
    sourceReadyNow: true,
    routeSourceWrittenInFoundationNow: true,
    definitions,
    definitionCount: definitions.length,
    mountedDefinitionCount: 0,
    protectedRouteRegisteredCount: 0,
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
    safety: STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_RUNTIME_ROUTE_SAFETY,
  };
}
