import { getStreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeSnapshot } from "./streamFoundationKernelDiagnosticsControlledRouteMountPlanningFreeze";

export function runStreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeSmoke() {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeSnapshot();
  const assertions = [
    { id: "139t_planning_freeze_ready", passed: snapshot.status === "controlled_route_mount_planning_freeze_ready_unmounted" && snapshot.planningFreezePassedNow === true },
    { id: "139t_ready_for_controlled_connection_planning", passed: snapshot.readyForControlledBackendRouteConnectionPlanning === true && snapshot.readyForProductionRouteMount === false },
    { id: "139t_no_stream_index_or_app_server", passed: snapshot.safety.streamIndexPatchIncluded === false && snapshot.safety.appServerPatchIncluded === false },
    { id: "139t_no_route_mount_or_http", passed: snapshot.routeMountPerformedNow === false && snapshot.runtimeHttpRequestsPerformed === 0 },
    { id: "139t_no_data_payment_side_effects", passed: snapshot.databaseExecutionPerformed === 0 && snapshot.providerCallsPerformed === 0 && snapshot.walletMutationPerformed === 0 && snapshot.moneyMovementPerformed === 0 },
    { id: "139t_no_secrets_or_fake_success", passed: snapshot.rawSecretsReturned === 0 && snapshot.fakeSuccessAllowed === false },
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
