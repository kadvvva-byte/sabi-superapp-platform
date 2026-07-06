import { getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageFinalGateSnapshot } from "./streamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageFinalGate";

export function getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageFinalGateReadiness() {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageFinalGateSnapshot();
  const ready =
    snapshot.status === "controlled_backend_route_connection_source_package_final_gate_ready_unmounted" &&
    snapshot.finalGatePassedNow === true &&
    snapshot.readyForControlledBackendRouteConnectionOwnerApprovedSourceOnlyWritePackage === true &&
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
    status: ready ? "controlled_backend_route_connection_source_package_final_gate_readiness_passed" : "controlled_backend_route_connection_source_package_final_gate_readiness_blocked",
    ready,
    patchScope: snapshot.patchScope,
    finalGatePassedNow: snapshot.finalGatePassedNow,
    readyForControlledBackendRouteConnectionOwnerApprovedSourceOnlyWritePackage: snapshot.readyForControlledBackendRouteConnectionOwnerApprovedSourceOnlyWritePackage,
    readyForProductionBackend: false as const,
    routeMountPerformedNow: false as const,
    runtimeHttpRequestsPerformed: 0 as const,
    databaseExecutionPerformed: 0 as const,
    providerCallsPerformed: 0 as const,
    walletMutationPerformed: 0 as const,
    moneyMovementPerformed: 0 as const,
    fakeSuccessAllowed: false as const,
    blockingChecks: snapshot.blockingChecks,
    safeMessageKey: ready ? "stream.foundation.139y.readinessPassed" : "stream.foundation.139y.readinessBlocked",
  } as const;
}
