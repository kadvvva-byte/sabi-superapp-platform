import { getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePatchReviewSnapshot } from "./streamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePatchReview";

export function getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePatchReviewReadiness() {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePatchReviewSnapshot();
  return {
    version: snapshot.version,
    status: snapshot.status,
    ready: snapshot.sourcePatchReviewPassedNow && snapshot.readyForControlledBackendRouteConnectionSourcePackage && snapshot.blockingChecks === 0,
    readyForControlledBackendRouteConnectionSourcePackage: snapshot.readyForControlledBackendRouteConnectionSourcePackage,
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
    nextStage: "BACKEND-STREAM-FOUNDATION-139W controlled backend route connection source package",
  } as const;
}
