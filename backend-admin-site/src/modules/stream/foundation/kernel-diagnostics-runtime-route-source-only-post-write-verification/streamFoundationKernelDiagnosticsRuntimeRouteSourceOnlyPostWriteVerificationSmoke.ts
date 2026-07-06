import { getStreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationSnapshot } from "./streamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerification";
import { getStreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationReadiness } from "./streamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationReadiness";

export interface StreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationSmokeReport {
  readonly version: "BACKEND-STREAM-FOUNDATION-139L";
  readonly status: "runtime_route_source_only_post_write_smoke_ready" | "runtime_route_source_only_post_write_smoke_blocked";
  readonly snapshotReady: boolean;
  readonly readinessReady: boolean;
  readonly verifiedFileCountReady: boolean;
  readonly noBlockingChecks: boolean;
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

export function getStreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationSmokeReport(): StreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationReadiness();
  const snapshotReady = snapshot.status === "runtime_route_source_only_post_write_verified";
  const readinessReady = readiness.ready === true && readiness.readyForControlledRouteMountPlanning === true;
  const verifiedFileCountReady = snapshot.verifiedFileCount === 6;
  const noBlockingChecks = snapshot.blockingChecks === 0;
  const foundationScopeOnly = snapshot.patchScope === "src/modules/stream/foundation/** only";
  const safe = snapshotReady && readinessReady && verifiedFileCountReady && noBlockingChecks && foundationScopeOnly;

  return {
    version: snapshot.version,
    status: safe ? "runtime_route_source_only_post_write_smoke_ready" : "runtime_route_source_only_post_write_smoke_blocked",
    snapshotReady,
    readinessReady,
    verifiedFileCountReady,
    noBlockingChecks,
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
