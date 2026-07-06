import { getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePatchReviewSnapshot } from "./streamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePatchReview";

export function runStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePatchReviewSmoke() {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePatchReviewSnapshot();
  const assertions = [
    { id: "139v_source_patch_review_ready", passed: snapshot.status === "controlled_backend_route_connection_source_patch_review_ready_unmounted" && snapshot.sourcePatchReviewPassedNow === true },
    { id: "139v_ready_for_source_package_not_production", passed: snapshot.readyForControlledBackendRouteConnectionSourcePackage === true && snapshot.readyForProductionBackend === false },
    { id: "139v_no_stream_index_or_app_server", passed: snapshot.safety.streamIndexPatchIncluded === false && snapshot.safety.appServerPatchIncluded === false },
    { id: "139v_no_route_mount_or_http", passed: snapshot.routeMountPerformedNow === false && snapshot.runtimeHttpRequestsPerformed === 0 },
    { id: "139v_no_data_payment_side_effects", passed: snapshot.databaseExecutionPerformed === 0 && snapshot.providerCallsPerformed === 0 && snapshot.walletMutationPerformed === 0 && snapshot.moneyMovementPerformed === 0 },
    { id: "139v_no_secrets_or_fake_success", passed: snapshot.rawSecretsReturned === 0 && snapshot.fakeSuccessAllowed === false },
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
