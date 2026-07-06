import { getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionPlanningSnapshot } from "./streamFoundationKernelDiagnosticsControlledBackendRouteConnectionPlanning";

export function runStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionPlanningSmoke() {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionPlanningSnapshot();
  const assertions = [
    { id: "139u_connection_planning_ready", passed: snapshot.status === "controlled_backend_route_connection_planning_ready_unmounted" && snapshot.connectionPlanningPassedNow === true },
    { id: "139u_ready_for_source_patch_review_not_production", passed: snapshot.readyForBackendRouteConnectionSourcePatchReview === true && snapshot.readyForProductionBackend === false },
    { id: "139u_no_stream_index_or_app_server", passed: snapshot.safety.streamIndexPatchIncluded === false && snapshot.safety.appServerPatchIncluded === false },
    { id: "139u_no_route_mount_or_http", passed: snapshot.routeMountPerformedNow === false && snapshot.runtimeHttpRequestsPerformed === 0 },
    { id: "139u_no_data_payment_side_effects", passed: snapshot.databaseExecutionPerformed === 0 && snapshot.providerCallsPerformed === 0 && snapshot.walletMutationPerformed === 0 && snapshot.moneyMovementPerformed === 0 },
    { id: "139u_no_secrets_or_fake_success", passed: snapshot.rawSecretsReturned === 0 && snapshot.fakeSuccessAllowed === false },
  ] as const;
  return {
    version: snapshot.version,
    status: assertions.every((assertion) => assertion.passed) ? "passed" : "blocked",
    assertions,
    assertionCount: assertions.length,
    passedCount: assertions.filter((assertion) => assertion.passed).length,
    snapshot,
  } as const;
}
