import { getStreamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerApprovedPackageSnapshot } from "./streamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerApprovedPackage";
import { getStreamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerApprovedPackageReadiness } from "./streamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerApprovedPackageReadiness";

export function getStreamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerApprovedPackageSmokeReport() {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerApprovedPackageSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsControlledBackendEntryPatchOwnerApprovedPackageReadiness();
  const assertions = [
    { id: "140e_snapshot_ready_unwritten", passed: snapshot.status === "controlled_backend_entry_patch_owner_approved_package_ready_unwritten" },
    { id: "140e_readiness_ready", passed: readiness.ready === true },
    { id: "140e_previous_140d_ready", passed: snapshot.previous140dStatus === "controlled_backend_entry_patch_owner_review_package_ready" && snapshot.previous140dReady === true },
    { id: "140e_owner_approval_package_only", passed: snapshot.ownerApprovalCapturedForPackageNow === true && snapshot.approval.approvalDoesNotAllowRuntimeMountNow === true && snapshot.approval.approvalDoesNotAllowAppServerWriteNow === true && snapshot.approval.approvalDoesNotAllowStreamIndexWriteNow === true },
    { id: "140e_package_items_no_write", passed: snapshot.packageItemCount === 6 && snapshot.packageItems.every((item) => item.operation === "owner_approved_source_only_package_no_write" && item.ownerApprovedForPackageNow === true && item.writtenNow === false && item.mountedNow === false) },
    { id: "140e_foundation_scope", passed: snapshot.patchScope === "src/modules/stream/foundation/** only" },
    { id: "140e_no_index_or_app_write_now", passed: snapshot.streamIndexPatchIncludedNow === false && snapshot.streamModuleIndexTouchedNow === false && snapshot.appServerPatchIncludedNow === false && snapshot.appServerTouchedNow === false },
    { id: "140e_no_route_mount_or_runtime", passed: snapshot.routeMountPerformedNow === false && snapshot.protectedRouteRegisteredNow === false && snapshot.runtimeHttpRequestsPerformed === 0 },
    { id: "140e_no_db_provider_wallet_money", passed: snapshot.databaseExecutionPerformed === 0 && snapshot.providerCallsPerformed === 0 && snapshot.walletMutationPerformed === 0 && snapshot.moneyMovementPerformed === 0 },
    { id: "140e_no_secret_or_fake", passed: snapshot.rawSecretsReturned === 0 && snapshot.mobileProviderKeysAllowed === false && snapshot.fakeSuccessAllowed === false },
    { id: "140e_ready_for_exact_diff_review_only", passed: snapshot.readyForExactNonFoundationDiffReview === true && snapshot.readyForControlledBackendEntryPatchSourceOnlyWrite === false && snapshot.readyForRuntimeMount === false },
  ] as const;
  const passedAssertions = assertions.filter((assertion) => assertion.passed).length;
  return {
    version: "BACKEND-STREAM-FOUNDATION-140E" as const,
    status: passedAssertions === assertions.length
      ? "controlled_backend_entry_patch_owner_approved_package_smoke_passed"
      : "controlled_backend_entry_patch_owner_approved_package_smoke_failed",
    assertions,
    passedAssertions,
    failedAssertions: assertions.length - passedAssertions,
    ownerApprovedPackageReadyNow: snapshot.ownerApprovedPackageReadyNow,
    readyForExactNonFoundationDiffReview: snapshot.readyForExactNonFoundationDiffReview,
    readyForControlledBackendEntryPatchSourceOnlyWrite: false as const,
    readyForRuntimeMount: false as const,
    readyForProductionBackend: false as const,
  } as const;
}
