import { getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageSnapshot } from "./streamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackage";

export function getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageReadiness() {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageSnapshot();
  const ready =
    snapshot.status === "controlled_backend_route_connection_source_package_ready_unmounted" &&
    snapshot.sourcePackagePassedNow === true &&
    snapshot.readyForControlledBackendRouteConnectionSourcePackageWriteReview === true &&
    snapshot.blockingChecks === 0 &&
    snapshot.readyForProductionBackend === false &&
    snapshot.routeMountPerformedNow === false &&
    snapshot.runtimeHttpRequestsPerformed === 0 &&
    snapshot.databaseExecutionPerformed === 0 &&
    snapshot.providerCallsPerformed === 0 &&
    snapshot.walletMutationPerformed === 0 &&
    snapshot.moneyMovementPerformed === 0 &&
    snapshot.rawSecretsReturned === 0 &&
    snapshot.fakeSuccessAllowed === false;

  return {
    version: snapshot.version,
    status: ready ? "controlled_backend_route_connection_source_package_readiness_passed" : "controlled_backend_route_connection_source_package_readiness_blocked",
    ready,
    patchScope: snapshot.patchScope,
    sourcePackagePassedNow: snapshot.sourcePackagePassedNow,
    readyForControlledBackendRouteConnectionSourcePackageWriteReview: snapshot.readyForControlledBackendRouteConnectionSourcePackageWriteReview,
    readyForProductionBackend: false as const,
    routeMountPerformedNow: false as const,
    runtimeHttpRequestsPerformed: 0 as const,
    databaseExecutionPerformed: 0 as const,
    providerCallsPerformed: 0 as const,
    walletMutationPerformed: 0 as const,
    moneyMovementPerformed: 0 as const,
    fakeSuccessAllowed: false as const,
    blockingChecks: snapshot.blockingChecks,
    safeMessageKey: ready ? "stream.foundation.139w.readinessPassed" : "stream.foundation.139w.readinessBlocked",
  } as const;
}
