import { getStreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeSnapshot } from "./streamFoundationKernelDiagnosticsControlledRouteMountPlanningFreeze";

export function getStreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeReadiness() {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeSnapshot();
  return {
    version: snapshot.version,
    status: snapshot.status,
    ready: snapshot.planningFreezePassedNow && snapshot.readyForControlledBackendRouteConnectionPlanning && snapshot.blockingChecks === 0,
    readyForControlledBackendRouteConnectionPlanning: snapshot.readyForControlledBackendRouteConnectionPlanning,
    readyForProductionRouteMount: snapshot.readyForProductionRouteMount,
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
    nextStage: "BACKEND-STREAM-FOUNDATION-139U controlled backend route connection planning",
  } as const;
}
