import { getStreamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerReviewPackageReadiness } from "./streamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerReviewPackageReadiness";
import { getStreamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerReviewPackageSnapshot } from "./streamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerReviewPackage";

export function getStreamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerReviewPackageSmokeReport() {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerReviewPackageSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerReviewPackageReadiness();
  const assertions = [
    { id: "140d_snapshot_ready", passed: snapshot.status === "controlled_backend_entry_patch_owner_review_package_ready" },
    { id: "140d_readiness_ready", passed: readiness.ready === true },
    { id: "140d_previous_140c_ready", passed: snapshot.previous140cStatus === "controlled_backend_entry_patch_planning_ready_unmounted" && snapshot.previous140cReady === true },
    { id: "140d_review_items_only", passed: snapshot.reviewItemCount === 6 && snapshot.reviewItems.every((item) => item.operation === "review_only_no_write" && item.writtenNow === false && item.mountedNow === false && item.approvedForWriteNow === false) },
    { id: "140d_foundation_scope", passed: snapshot.patchScope === "src/modules/stream/foundation/** only" },
    { id: "140d_owner_approval_required_not_captured", passed: snapshot.explicitOwnerApprovalRequiredBeforeAnyNonFoundationWrite === true && snapshot.explicitOwnerApprovalCapturedNow === false && snapshot.sourceWriteAllowedNow === false },
    { id: "140d_no_index_or_app_write_now", passed: snapshot.streamIndexPatchIncludedNow === false && snapshot.streamModuleIndexTouchedNow === false && snapshot.appServerPatchIncludedNow === false && snapshot.appServerTouchedNow === false },
    { id: "140d_no_route_mount_or_runtime", passed: snapshot.routeMountPerformedNow === false && snapshot.protectedRouteRegisteredNow === false && snapshot.runtimeHttpRequestsPerformed === 0 },
    { id: "140d_no_db_provider_wallet_money", passed: snapshot.databaseExecutionPerformed === 0 && snapshot.providerCallsPerformed === 0 && snapshot.walletMutationPerformed === 0 && snapshot.moneyMovementPerformed === 0 },
    { id: "140d_no_secret_or_fake", passed: snapshot.rawSecretsReturned === 0 && snapshot.mobileProviderKeysAllowed === false && snapshot.fakeSuccessAllowed === false },
  ] as const;
  const passedAssertions = assertions.filter((assertion) => assertion.passed).length;
  return {
    version: "BACKEND-STREAM-FOUNDATION-140D" as const,
    status: passedAssertions === assertions.length ? "controlled_backend_entry_patch_owner_review_package_smoke_passed" : "controlled_backend_entry_patch_owner_review_package_smoke_failed",
    assertions,
    passedAssertions,
    failedAssertions: assertions.length - passedAssertions,
    readyForExplicitOwnerApproval: snapshot.readyForExplicitOwnerApproval,
    readyForControlledBackendEntryPatchOwnerApprovedPackage: false as const,
    readyForControlledBackendEntryPatchSourceOnlyWrite: false as const,
    readyForProductionBackend: false as const,
  } as const;
}
