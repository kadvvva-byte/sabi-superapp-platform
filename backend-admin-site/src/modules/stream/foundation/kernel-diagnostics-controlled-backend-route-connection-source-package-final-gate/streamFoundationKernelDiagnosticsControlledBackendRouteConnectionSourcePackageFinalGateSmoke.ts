import { getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageFinalGateReadiness } from "./streamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageFinalGateReadiness";
import { getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageFinalGateSnapshot } from "./streamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageFinalGate";

export function getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageFinalGateSmoke() {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageFinalGateSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageFinalGateReadiness();
  const assertions = [
    { id: "139y_status_ready", passed: snapshot.status === "controlled_backend_route_connection_source_package_final_gate_ready_unmounted" },
    { id: "139y_readiness_passed", passed: readiness.ready === true },
    { id: "139y_foundation_only_scope", passed: snapshot.patchScope === "src/modules/stream/foundation/** only" },
    { id: "139y_previous_write_review_passed", passed: snapshot.safety.previousWriteReviewPassed === true && snapshot.previousWriteReviewStatus === "controlled_backend_route_connection_source_package_write_review_ready_unmounted" },
    { id: "139y_no_stream_index", passed: snapshot.safety.streamIndexPatchIncluded === false && snapshot.safety.streamModuleIndexTouchedNow === false },
    { id: "139y_no_app_server", passed: snapshot.safety.appServerPatchIncluded === false && snapshot.safety.appServerTouchedNow === false },
    { id: "139y_no_route_mount", passed: snapshot.routeMountPerformedNow === false && snapshot.routeMountAllowedNow === false },
    { id: "139y_no_runtime_http", passed: snapshot.runtimeHttpRequestsPerformed === 0 },
    { id: "139y_no_db_provider_wallet", passed: snapshot.databaseExecutionPerformed === 0 && snapshot.providerCallsPerformed === 0 && snapshot.walletMutationPerformed === 0 },
    { id: "139y_no_money_movement", passed: snapshot.paymentAuthorizationPerformed === 0 && snapshot.monthlyPayoutPerformed === 0 && snapshot.moneyMovementPerformed === 0 },
    { id: "139y_no_secret_or_fake", passed: snapshot.rawSecretsReturned === 0 && snapshot.mobileProviderKeysAllowed === false && snapshot.fakeSuccessAllowed === false },
  ] as const;
  return {
    version: snapshot.version,
    status: assertions.every((assertion) => assertion.passed) ? "controlled_backend_route_connection_source_package_final_gate_smoke_passed" : "controlled_backend_route_connection_source_package_final_gate_smoke_failed",
    assertions,
    passedAssertions: assertions.filter((assertion) => assertion.passed).length,
    failedAssertions: assertions.filter((assertion) => !assertion.passed).length,
    readyForControlledBackendRouteConnectionOwnerApprovedSourceOnlyWritePackage: snapshot.readyForControlledBackendRouteConnectionOwnerApprovedSourceOnlyWritePackage,
    readyForProductionBackend: false as const,
  } as const;
}
