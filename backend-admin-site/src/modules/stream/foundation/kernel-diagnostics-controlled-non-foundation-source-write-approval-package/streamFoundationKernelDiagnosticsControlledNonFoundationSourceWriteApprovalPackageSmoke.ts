import { getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalPackageSnapshot } from "./streamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalPackage";
import { getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalPackageReadiness } from "./streamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalPackageReadiness";

export function getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalPackageSmokeReport() {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalPackageSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalPackageReadiness();
  const assertions = [
    { id: "140g_snapshot_ready_unwritten", passed: snapshot.status === "controlled_non_foundation_source_write_approval_package_ready_unwritten" },
    { id: "140g_readiness_ready", passed: readiness.ready === true },
    { id: "140g_previous_140f_ready", passed: snapshot.previous140fReady === true && snapshot.previous140fStatus === "exact_non_foundation_diff_review_ready_unwritten" && snapshot.previous140fDiffHunkCount === 6 },
    { id: "140g_approval_items_present", passed: snapshot.approvalItemCount === 8 && snapshot.approvalItems.every((item) => item.ownerApprovalRequiredBeforeWrite === true && item.writtenNow === false) },
    { id: "140g_target_paths_reviewed", passed: snapshot.targetPaths.includes("src/modules/stream/index.ts") && snapshot.targetPaths.includes("src/app.ts") && snapshot.targetPaths.includes("src/server.ts") && snapshot.targetPaths.includes("rollback_plan") },
    { id: "140g_foundation_patch_scope_only", passed: snapshot.patchScope === "src/modules/stream/foundation/** only" && snapshot.nonFoundationFilesWrittenNow === false },
    { id: "140g_no_nonfoundation_write_now", passed: snapshot.streamIndexWrittenNow === false && snapshot.appTsWrittenNow === false && snapshot.serverTsWrittenNow === false },
    { id: "140g_no_route_source_or_runtime_mount_now", passed: snapshot.routeMountSourceWrittenNow === false && snapshot.routeMountRuntimePerformedNow === false && snapshot.protectedRouteRegisteredAtRuntimeNow === false },
    { id: "140g_no_runtime_http_now", passed: snapshot.runtimeHttpRequestsPerformed === 0 && snapshot.readyForRuntimeSmoke === false },
    { id: "140g_no_db_provider_wallet_money", passed: snapshot.databaseExecutionPerformed === 0 && snapshot.providerCallsPerformed === 0 && snapshot.walletMutationPerformed === 0 && snapshot.moneyMovementPerformed === 0 && snapshot.paymentAuthorizationPerformed === 0 && snapshot.monthlyPayoutPerformed === 0 },
    { id: "140g_no_secret_or_fake", passed: snapshot.rawSecretsReturned === 0 && snapshot.mobileProviderKeysAllowed === false && snapshot.fakeSuccessAllowed === false },
    { id: "140g_owner_final_write_approval_phrase_present", passed: snapshot.exactOwnerApprovalPhrase.includes("BACKEND-STREAM-FOUNDATION-140H") && snapshot.exactOwnerApprovalPhrase.includes("no money movement") },
    { id: "140g_next_stage_limited", passed: snapshot.decision.nextStage === "140H_controlled_non_foundation_source_write_patch_package" && snapshot.readyForRuntimeMount === false && snapshot.readyForProductionBackend === false },
  ] as const;
  const passedAssertions = assertions.filter((assertion) => assertion.passed).length;
  return {
    version: "BACKEND-STREAM-FOUNDATION-140G" as const,
    status: passedAssertions === assertions.length
      ? "controlled_non_foundation_source_write_approval_package_smoke_passed"
      : "controlled_non_foundation_source_write_approval_package_smoke_failed",
    assertions,
    passedAssertions,
    failedAssertions: assertions.length - passedAssertions,
    approvalPackageReadyNow: snapshot.approvalPackageReadyNow,
    readyForControlledNonFoundationSourceWriteAfterExplicitOwnerApproval: snapshot.readyForControlledNonFoundationSourceWriteAfterExplicitOwnerApproval,
    readyForRuntimeMount: false as const,
    readyForRuntimeSmoke: false as const,
    readyForProductionBackend: false as const,
    exactOwnerApprovalPhrase: snapshot.exactOwnerApprovalPhrase,
  } as const;
}
