import { getStreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageSnapshot } from "./streamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackage";
import { getStreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageReadiness } from "./streamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageReadiness";

export function getStreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageSmokeReport() {
  const snapshot = getStreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageReadiness();
  const assertions = [
    { id: "140f_snapshot_ready_unwritten", passed: snapshot.status === "exact_non_foundation_diff_review_ready_unwritten" },
    { id: "140f_readiness_ready", passed: readiness.ready === true },
    { id: "140f_previous_140e_ready", passed: snapshot.previous140eReady === true && snapshot.previous140eStatus === "controlled_backend_entry_patch_owner_approved_package_ready_unwritten" },
    { id: "140f_diff_hunks_present", passed: snapshot.diffHunkCount === 6 && snapshot.diffHunks.every((hunk) => hunk.reviewOnly === true && hunk.writtenNow === false) },
    { id: "140f_target_paths_reviewed", passed: snapshot.targetPaths.includes("src/modules/stream/index.ts") && snapshot.targetPaths.includes("src/app.ts") && snapshot.targetPaths.includes("src/server.ts") && snapshot.targetPaths.includes("rollback_plan") },
    { id: "140f_foundation_patch_scope_only", passed: snapshot.patchScope === "src/modules/stream/foundation/** only" && snapshot.nonFoundationFilesWrittenNow === false },
    { id: "140f_no_nonfoundation_write_now", passed: snapshot.streamIndexWrittenNow === false && snapshot.appTsWrittenNow === false && snapshot.serverTsWrittenNow === false },
    { id: "140f_no_runtime_or_mount_now", passed: snapshot.routeMountPerformedNow === false && snapshot.protectedRouteRegisteredNow === false && snapshot.runtimeHttpRequestsPerformed === 0 },
    { id: "140f_no_db_provider_wallet_money", passed: snapshot.databaseExecutionPerformed === 0 && snapshot.providerCallsPerformed === 0 && snapshot.walletMutationPerformed === 0 && snapshot.moneyMovementPerformed === 0 },
    { id: "140f_no_secret_or_fake", passed: snapshot.rawSecretsReturned === 0 && snapshot.mobileProviderKeysAllowed === false && snapshot.fakeSuccessAllowed === false },
    { id: "140f_owner_review_only", passed: snapshot.exactDiffReviewReadyNow === true && snapshot.readyForControlledNonFoundationSourceWrite === false && snapshot.readyForRuntimeMount === false && snapshot.readyForRuntimeSmoke === false },
  ] as const;
  const passedAssertions = assertions.filter((assertion) => assertion.passed).length;
  return {
    version: "BACKEND-STREAM-FOUNDATION-140F" as const,
    status: passedAssertions === assertions.length
      ? "exact_non_foundation_diff_review_smoke_passed"
      : "exact_non_foundation_diff_review_smoke_failed",
    assertions,
    passedAssertions,
    failedAssertions: assertions.length - passedAssertions,
    exactDiffReviewReadyNow: snapshot.exactDiffReviewReadyNow,
    readyForControlledNonFoundationSourceWrite: false as const,
    readyForRuntimeMount: false as const,
    readyForRuntimeSmoke: false as const,
    readyForProductionBackend: false as const,
  } as const;
}
