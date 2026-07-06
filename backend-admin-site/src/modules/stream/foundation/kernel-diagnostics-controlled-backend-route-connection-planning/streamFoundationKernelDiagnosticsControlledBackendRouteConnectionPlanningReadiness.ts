import { getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionPlanningSnapshot } from "./streamFoundationKernelDiagnosticsControlledBackendRouteConnectionPlanning";

export function getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionPlanningReadiness() {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionPlanningSnapshot();
  return {
    version: snapshot.version,
    status: snapshot.status,
    ready: snapshot.connectionPlanningPassedNow && snapshot.readyForBackendRouteConnectionSourcePatchReview && snapshot.blockingChecks === 0,
    readyForBackendRouteConnectionSourcePatchReview: snapshot.readyForBackendRouteConnectionSourcePatchReview,
    readyForProductionBackend: snapshot.readyForProductionBackend,
    routeMountAllowedNow: snapshot.routeMountAllowedNow,
    routeMountPerformedNow: snapshot.routeMountPerformedNow,
    streamIndexPatchIncluded: snapshot.safety.streamIndexPatchIncluded,
    appServerPatchIncluded: snapshot.safety.appServerPatchIncluded,
    databaseWriteAllowedNow: snapshot.safety.databaseWriteAllowedNow,
    providerCallAllowedNow: snapshot.safety.providerCallAllowedNow,
    walletMutationAllowedNow: snapshot.safety.walletMutationAllowedNow,
    moneyMovementAllowedNow: snapshot.safety.moneyMovementAllowedNow,
    rawSecretsReturned: snapshot.rawSecretsReturned,
    fakeSuccessAllowed: snapshot.fakeSuccessAllowed,
    totalChecks: snapshot.totalChecks,
    passedChecks: snapshot.passedChecks,
    blockingChecks: snapshot.blockingChecks,
    nextStage: "BACKEND-STREAM-FOUNDATION-139V controlled backend route connection source patch review",
  } as const;
}
