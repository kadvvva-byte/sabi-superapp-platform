import { getStreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningReadiness } from "./streamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningReadiness";
import { getStreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningSnapshot } from "./streamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanning";

export function getStreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningSmokeReport() {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningReadiness();
  const assertions = [
    { id: "140c_snapshot_ready", passed: snapshot.status === "controlled_backend_entry_patch_planning_ready_unmounted" },
    { id: "140c_readiness_ready", passed: readiness.ready === true },
    { id: "140c_previous_140b_ready", passed: snapshot.previous140bStatus === "controlled_backend_route_connection_source_only_post_write_verification_ready" && snapshot.previous140bReady === true },
    { id: "140c_planned_items_only", passed: snapshot.plannedPatchItemCount === 5 && snapshot.plannedPatchItems.every((item) => item.operation === "plan_only_no_write" && item.writtenNow === false && item.mountedNow === false) },
    { id: "140c_foundation_scope", passed: snapshot.patchScope === "src/modules/stream/foundation/** only" },
    { id: "140c_no_index_or_app_write_now", passed: snapshot.streamIndexPatchIncludedNow === false && snapshot.streamModuleIndexTouchedNow === false && snapshot.appServerPatchIncludedNow === false && snapshot.appServerTouchedNow === false },
    { id: "140c_no_route_mount_or_runtime", passed: snapshot.routeMountPerformedNow === false && snapshot.protectedRouteRegisteredNow === false && snapshot.runtimeHttpRequestsPerformed === 0 },
    { id: "140c_no_db_provider_wallet_money", passed: snapshot.databaseExecutionPerformed === 0 && snapshot.providerCallsPerformed === 0 && snapshot.walletMutationPerformed === 0 && snapshot.moneyMovementPerformed === 0 },
    { id: "140c_no_secret_or_fake", passed: snapshot.rawSecretsReturned === 0 && snapshot.mobileProviderKeysAllowed === false && snapshot.fakeSuccessAllowed === false },
  ] as const;
  const passedAssertions = assertions.filter((assertion) => assertion.passed).length;
  return {
    version: "BACKEND-STREAM-FOUNDATION-140C" as const,
    status: passedAssertions === assertions.length ? "controlled_backend_entry_patch_planning_smoke_passed" : "controlled_backend_entry_patch_planning_smoke_failed",
    assertions,
    passedAssertions,
    failedAssertions: assertions.length - passedAssertions,
    readyForControlledBackendEntryPatchOwnerReview: snapshot.readyForControlledBackendEntryPatchOwnerReview,
    readyForProductionBackend: false as const,
  } as const;
}
