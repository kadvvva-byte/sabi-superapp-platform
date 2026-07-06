import { createStreamFoundationKernelDiagnosticsAdminRuntimeRouteHandler, getStreamFoundationKernelDiagnosticsAdminRuntimeRouteSnapshot } from "./streamFoundationKernelDiagnosticsAdminRuntimeRouteHandlerFactory";
import { getStreamFoundationKernelDiagnosticsAdminRuntimeRouteReadiness } from "./streamFoundationKernelDiagnosticsAdminRuntimeRouteReadiness";

export interface StreamFoundationKernelDiagnosticsAdminRuntimeRouteSmokeReport {
  readonly version: "BACKEND-STREAM-FOUNDATION-139K";
  readonly status: "runtime_route_source_smoke_ready_unmounted" | "runtime_route_source_smoke_blocked";
  readonly snapshotReady: boolean;
  readonly readinessReady: boolean;
  readonly sampleHandlerReady: boolean;
  readonly foundationScopeOnly: boolean;
  readonly sourceReadyNow: true;
  readonly routeSourceWrittenInFoundationNow: true;
  readonly streamIndexPatchIncluded: false;
  readonly appServerPatchIncluded: false;
  readonly routeMountPerformed: false;
  readonly runtimeHttpRequestPerformed: false;
  readonly databaseWritePerformed: false;
  readonly providerCallPerformed: false;
  readonly walletMutationPerformed: false;
  readonly paymentAuthorizationPerformed: false;
  readonly monthlyPayoutPerformed: false;
  readonly moneyMovementPerformed: false;
  readonly rawSecretsReturned: false;
  readonly mobileProviderKeysAllowed: false;
  readonly fakeSuccessAllowed: false;
}

export function getStreamFoundationKernelDiagnosticsAdminRuntimeRouteSmokeReport(): StreamFoundationKernelDiagnosticsAdminRuntimeRouteSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsAdminRuntimeRouteSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsAdminRuntimeRouteReadiness();
  const handler = createStreamFoundationKernelDiagnosticsAdminRuntimeRouteHandler();
  const firstRouteId = snapshot.definitions[0]?.routeId;
  const sample = firstRouteId ? handler({ routeId: firstRouteId, context: { requestId: "139k-smoke", scopes: ["admin:stream:diagnostics:read"] } }) : undefined;
  const snapshotReady = snapshot.status === "runtime_route_source_ready_unmounted" && snapshot.definitionCount > 0;
  const readinessReady = readiness.ready === true;
  const sampleHandlerReady = sample?.status === "runtime_route_source_ready_unmounted" && sample.mountedNow === false;
  const foundationScopeOnly = snapshot.patchScope === "src/modules/stream/foundation/** only";
  const safe = snapshotReady && readinessReady && sampleHandlerReady && foundationScopeOnly;

  return {
    version: snapshot.version,
    status: safe ? "runtime_route_source_smoke_ready_unmounted" : "runtime_route_source_smoke_blocked",
    snapshotReady,
    readinessReady,
    sampleHandlerReady,
    foundationScopeOnly,
    sourceReadyNow: true,
    routeSourceWrittenInFoundationNow: true,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    routeMountPerformed: false,
    runtimeHttpRequestPerformed: false,
    databaseWritePerformed: false,
    providerCallPerformed: false,
    walletMutationPerformed: false,
    paymentAuthorizationPerformed: false,
    monthlyPayoutPerformed: false,
    moneyMovementPerformed: false,
    rawSecretsReturned: false,
    mobileProviderKeysAllowed: false,
    fakeSuccessAllowed: false,
  };
}
