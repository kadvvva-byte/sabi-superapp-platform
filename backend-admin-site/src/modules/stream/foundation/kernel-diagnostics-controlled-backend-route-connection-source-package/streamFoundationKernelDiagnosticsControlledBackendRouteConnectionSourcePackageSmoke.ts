import { getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageReadiness } from "./streamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageReadiness";
import { getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageSnapshot } from "./streamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackage";

export function getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageSmoke() {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsControlledBackendRouteConnectionSourcePackageReadiness();
  const assertions = [
    { id: "139w_status_ready", passed: snapshot.status === "controlled_backend_route_connection_source_package_ready_unmounted" },
    { id: "139w_readiness_passed", passed: readiness.ready === true },
    { id: "139w_foundation_only_scope", passed: snapshot.patchScope === "src/modules/stream/foundation/** only" },
    { id: "139w_no_stream_index", passed: snapshot.safety.streamIndexPatchIncluded === false && snapshot.safety.streamModuleIndexTouchedNow === false },
    { id: "139w_no_app_server", passed: snapshot.safety.appServerPatchIncluded === false && snapshot.safety.appServerTouchedNow === false },
    { id: "139w_no_route_mount", passed: snapshot.routeMountPerformedNow === false && snapshot.routeMountAllowedNow === false },
    { id: "139w_no_runtime_http", passed: snapshot.runtimeHttpRequestsPerformed === 0 },
    { id: "139w_no_db_provider_wallet", passed: snapshot.databaseExecutionPerformed === 0 && snapshot.providerCallsPerformed === 0 && snapshot.walletMutationPerformed === 0 },
    { id: "139w_no_money_movement", passed: snapshot.paymentAuthorizationPerformed === 0 && snapshot.monthlyPayoutPerformed === 0 && snapshot.moneyMovementPerformed === 0 },
    { id: "139w_no_secret_or_fake", passed: snapshot.rawSecretsReturned === 0 && snapshot.mobileProviderKeysAllowed === false && snapshot.fakeSuccessAllowed === false },
  ] as const;
  return {
    version: snapshot.version,
    status: assertions.every((assertion) => assertion.passed) ? "controlled_backend_route_connection_source_package_smoke_passed" : "controlled_backend_route_connection_source_package_smoke_failed",
    assertions,
    passedAssertions: assertions.filter((assertion) => assertion.passed).length,
    failedAssertions: assertions.filter((assertion) => !assertion.passed).length,
    readyForControlledBackendRouteConnectionSourcePackageWriteReview: snapshot.readyForControlledBackendRouteConnectionSourcePackageWriteReview,
    readyForProductionBackend: false as const,
  } as const;
}
