import { createStreamFoundationKernelDiagnosticsBackendRouteConnectionHandler } from "./streamFoundationKernelDiagnosticsBackendRouteConnectionHandlerBridge";
import { getStreamFoundationKernelDiagnosticsBackendRouteConnectionSnapshot } from "./streamFoundationKernelDiagnosticsBackendRouteConnectionMountPlan";
import { getStreamFoundationKernelDiagnosticsBackendRouteConnectionReadiness } from "./streamFoundationKernelDiagnosticsBackendRouteConnectionReadiness";

export interface StreamFoundationKernelDiagnosticsBackendRouteConnectionSmokeReport {
  readonly version: "BACKEND-STREAM-FOUNDATION-140A";
  readonly status: "controlled_backend_route_connection_source_smoke_ready_unmounted" | "controlled_backend_route_connection_source_smoke_blocked";
  readonly snapshotReady: boolean;
  readonly readinessReady: boolean;
  readonly handlerSampleReady: boolean;
  readonly routePlansReady: boolean;
  readonly sourceFilesReady: boolean;
  readonly foundationScopeOnly: boolean;
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
  readonly fakeSuccessAllowed: false;
}

export function getStreamFoundationKernelDiagnosticsBackendRouteConnectionSmokeReport(): StreamFoundationKernelDiagnosticsBackendRouteConnectionSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsBackendRouteConnectionSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsBackendRouteConnectionReadiness();
  const handler = createStreamFoundationKernelDiagnosticsBackendRouteConnectionHandler();
  const sampleRoute = snapshot.routePlans[0];
  const sample = sampleRoute
    ? handler({ routeId: sampleRoute.routeId, context: { requestId: "140a-smoke", scopes: sampleRoute.requiredScopes } })
    : undefined;
  const snapshotReady = snapshot.status === "controlled_backend_route_connection_source_ready_unmounted" && snapshot.blockingGateItems === 0;
  const readinessReady = readiness.ready === true;
  const handlerSampleReady = sample?.sourceReadyNow === true && sample.mountedNow === false && sample.protectedRouteRegisteredNow === false;
  const routePlansReady = snapshot.routePlans.every((plan) => plan.sourceReadyNow === true && plan.mountedNow === false);
  const sourceFilesReady = snapshot.sourceFiles.every((file) => file.writtenInsideFoundationNow === true && file.scope === "src/modules/stream/foundation/** only");
  const foundationScopeOnly = snapshot.patchScope === "src/modules/stream/foundation/** only";
  const safe = snapshotReady && readinessReady && handlerSampleReady && routePlansReady && sourceFilesReady && foundationScopeOnly;
  return {
    version: snapshot.version,
    status: safe ? "controlled_backend_route_connection_source_smoke_ready_unmounted" : "controlled_backend_route_connection_source_smoke_blocked",
    snapshotReady,
    readinessReady,
    handlerSampleReady,
    routePlansReady,
    sourceFilesReady,
    foundationScopeOnly,
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
    fakeSuccessAllowed: false,
  };
}
