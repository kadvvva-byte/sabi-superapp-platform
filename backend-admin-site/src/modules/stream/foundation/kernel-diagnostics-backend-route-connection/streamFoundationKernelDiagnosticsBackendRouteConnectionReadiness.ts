import { getStreamFoundationKernelDiagnosticsBackendRouteConnectionHandlerBridge } from "./streamFoundationKernelDiagnosticsBackendRouteConnectionHandlerBridge";
import { getStreamFoundationKernelDiagnosticsBackendRouteConnectionSnapshot } from "./streamFoundationKernelDiagnosticsBackendRouteConnectionMountPlan";

export interface StreamFoundationKernelDiagnosticsBackendRouteConnectionReadiness {
  readonly version: "BACKEND-STREAM-FOUNDATION-140A";
  readonly ready: boolean;
  readonly status: "controlled_backend_route_connection_source_ready_unmounted" | "controlled_backend_route_connection_source_blocked";
  readonly sourceFilesReady: boolean;
  readonly routePlansReady: boolean;
  readonly handlerBridgeReady: boolean;
  readonly readyForControlledBackendEntryPatchReview: boolean;
  readonly readyForProductionBackend: false;
  readonly patchScope: "src/modules/stream/foundation/** only";
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

export function getStreamFoundationKernelDiagnosticsBackendRouteConnectionReadiness(): StreamFoundationKernelDiagnosticsBackendRouteConnectionReadiness {
  const snapshot = getStreamFoundationKernelDiagnosticsBackendRouteConnectionSnapshot();
  const bridge = getStreamFoundationKernelDiagnosticsBackendRouteConnectionHandlerBridge();
  const sourceFilesReady = snapshot.sourceFileCount >= 7 && snapshot.sourceFiles.every((file) => file.writtenInsideFoundationNow === true);
  const routePlansReady = snapshot.routePlanCount > 0 && snapshot.routePlans.every((plan) => plan.sourceReadyNow === true && plan.mountedNow === false);
  const handlerBridgeReady = bridge.sourceReadyNow === true && bridge.mountedNow === false && bridge.protectedRouteRegisteredNow === false;
  const ready = snapshot.backendRouteConnectionSourceReadyNow && sourceFilesReady && routePlansReady && handlerBridgeReady;
  return {
    version: snapshot.version,
    ready,
    status: snapshot.status,
    sourceFilesReady,
    routePlansReady,
    handlerBridgeReady,
    readyForControlledBackendEntryPatchReview: snapshot.readyForControlledBackendEntryPatchReview,
    readyForProductionBackend: false,
    patchScope: snapshot.patchScope,
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
