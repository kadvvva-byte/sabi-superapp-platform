import { getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationReadiness } from "./streamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationReadiness";
import { getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationSnapshot } from "./streamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerification";

export function getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationSmokeReport() {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationReadiness();
  const assertions = [
    { id: "140h_verify_status", passed: snapshot.status === "controlled_non_foundation_source_write_independent_verification_passed_blocked_until_exact_owner_approval" },
    { id: "140h_verify_readiness", passed: readiness.ready === true && readiness.sourceWriteBlockedUntilExactApproval === true },
    { id: "140h_verify_previous_staged", passed: snapshot.previous140hStagedReady === true && snapshot.previous140hStagedSmokePassed === true },
    { id: "140h_verify_targets", passed: snapshot.reviewedTargetPaths.includes("src/modules/stream/index.ts") && snapshot.reviewedTargetPaths.includes("src/app.ts") && snapshot.reviewedTargetPaths.includes("src/server.ts") && snapshot.reviewedTargetPaths.includes("rollback_plan") },
    { id: "140h_verify_target_summary_count", passed: snapshot.targetSummaryCount === 4 },
    { id: "140h_verify_artifact_count", passed: snapshot.stagedArtifactCount === 6 && snapshot.stagedDiffHunksCarriedForward === 6 },
    { id: "140h_verify_all_summaries_review_only", passed: snapshot.targetSummaries.every((summary) => summary.reviewedNow === true && summary.writtenNow === false && summary.mountedNow === false && summary.runtimeSmokeNow === false) },
    { id: "140h_verify_exact_approval_missing", passed: snapshot.exactOwnerApprovalPhraseReceivedNow === false && snapshot.decision.reason === "exact_owner_approval_phrase_missing" },
    { id: "140h_verify_source_write_blocked", passed: snapshot.nonFoundationFilesWrittenNow === false && snapshot.streamIndexWrittenNow === false && snapshot.appTsWrittenNow === false && snapshot.serverTsWrittenNow === false },
    { id: "140h_verify_no_route_mount", passed: snapshot.routeMountSourceWrittenNow === false && snapshot.routeMountRuntimePerformedNow === false && snapshot.readyForRuntimeMount === false },
    { id: "140h_verify_no_runtime_http", passed: snapshot.runtimeHttpRequestsPerformed === 0 && snapshot.readyForRuntimeSmoke === false },
    { id: "140h_verify_no_state_or_money", passed: snapshot.databaseExecutionPerformed === 0 && snapshot.providerCallsPerformed === 0 && snapshot.walletMutationPerformed === 0 && snapshot.paymentAuthorizationPerformed === 0 && snapshot.monthlyPayoutPerformed === 0 && snapshot.moneyMovementPerformed === 0 },
    { id: "140h_verify_no_secret_or_fake", passed: snapshot.rawSecretsReturned === 0 && snapshot.fakeSuccessAllowed === false },
    { id: "140h_verify_exact_phrase", passed: snapshot.exactOwnerApprovalPhrase.includes("BACKEND-STREAM-FOUNDATION-140H") && snapshot.exactOwnerApprovalPhrase.includes("no money movement") },
  ] as const;
  const passedAssertions = assertions.filter((assertion) => assertion.passed).length;
  return {
    version: "BACKEND-STREAM-FOUNDATION-140H-VERIFY" as const,
    status: passedAssertions === assertions.length
      ? "controlled_non_foundation_source_write_independent_verification_smoke_passed"
      : "controlled_non_foundation_source_write_independent_verification_smoke_failed",
    assertions,
    passedAssertions,
    failedAssertions: assertions.length - passedAssertions,
    sourceWriteBlockedUntilExactApproval: true as const,
    exactOwnerApprovalPhraseReceivedNow: false as const,
    readyForRuntimeMount: false as const,
    readyForRuntimeSmoke: false as const,
    readyForProductionBackend: false as const,
    exactOwnerApprovalPhrase: snapshot.exactOwnerApprovalPhrase,
  } as const;
}
