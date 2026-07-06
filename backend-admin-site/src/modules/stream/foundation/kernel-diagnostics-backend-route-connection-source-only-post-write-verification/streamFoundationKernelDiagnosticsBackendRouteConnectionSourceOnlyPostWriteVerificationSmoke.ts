import { getStreamFoundationKernelDiagnosticsBackendRouteConnectionSourceOnlyPostWriteVerificationReadiness } from "./streamFoundationKernelDiagnosticsBackendRouteConnectionSourceOnlyPostWriteVerificationReadiness";
import { getStreamFoundationKernelDiagnosticsBackendRouteConnectionSourceOnlyPostWriteVerificationSnapshot } from "./streamFoundationKernelDiagnosticsBackendRouteConnectionSourceOnlyPostWriteVerification";

export function getStreamFoundationKernelDiagnosticsBackendRouteConnectionSourceOnlyPostWriteVerificationSmokeReport() {
  const snapshot = getStreamFoundationKernelDiagnosticsBackendRouteConnectionSourceOnlyPostWriteVerificationSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsBackendRouteConnectionSourceOnlyPostWriteVerificationReadiness();
  const assertions = [
    { id: "140b_snapshot_ready", passed: snapshot.status === "controlled_backend_route_connection_source_only_post_write_verification_ready" },
    { id: "140b_readiness_ready", passed: readiness.ready === true },
    { id: "140b_previous_140a_ready", passed: snapshot.previous140aStatus === "controlled_backend_route_connection_source_ready_unmounted" && snapshot.previous140aReadinessReady === true },
    { id: "140b_foundation_only", passed: snapshot.patchScope === "src/modules/stream/foundation/** only" },
    { id: "140b_no_stream_index_or_app_server", passed: snapshot.streamIndexPatchIncluded === false && snapshot.streamModuleIndexTouchedNow === false && snapshot.appServerPatchIncluded === false && snapshot.appServerTouchedNow === false },
    { id: "140b_no_route_mount_or_runtime", passed: snapshot.routeMountPerformedNow === false && snapshot.protectedRouteRegisteredNow === false && snapshot.runtimeHttpRequestsPerformed === 0 },
    { id: "140b_no_db_provider_wallet_money", passed: snapshot.databaseExecutionPerformed === 0 && snapshot.providerCallsPerformed === 0 && snapshot.walletMutationPerformed === 0 && snapshot.moneyMovementPerformed === 0 },
    { id: "140b_no_secret_or_fake", passed: snapshot.rawSecretsReturned === 0 && snapshot.mobileProviderKeysAllowed === false && snapshot.fakeSuccessAllowed === false },
  ] as const;
  const passedAssertions = assertions.filter((assertion) => assertion.passed).length;
  return {
    version: "BACKEND-STREAM-FOUNDATION-140B" as const,
    status: passedAssertions === assertions.length ? "controlled_backend_route_connection_source_only_post_write_verification_smoke_passed" : "controlled_backend_route_connection_source_only_post_write_verification_smoke_failed",
    assertions,
    passedAssertions,
    failedAssertions: assertions.length - passedAssertions,
    readyForControlledBackendEntryPatchPlanning: snapshot.readyForControlledBackendEntryPatchPlanning,
    readyForProductionBackend: false as const,
  } as const;
}
