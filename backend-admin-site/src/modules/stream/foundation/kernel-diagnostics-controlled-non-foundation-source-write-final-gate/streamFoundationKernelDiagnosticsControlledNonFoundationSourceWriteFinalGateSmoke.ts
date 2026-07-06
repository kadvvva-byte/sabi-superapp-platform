import { getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateReadiness } from "./streamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateReadiness";
import { getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateSnapshot } from "./streamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGate";

export function getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateSmokeReport() {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateReadiness();
  const assertions = [
    { id: "140h_final_gate_status", passed: snapshot.status === "controlled_non_foundation_source_write_final_gate_ready_blocked_until_exact_owner_approval" },
    { id: "140h_final_gate_readiness", passed: readiness.ready === true && readiness.sourceWriteBlockedUntilExactApproval === true },
    { id: "140h_final_gate_previous_verify", passed: snapshot.previous140hVerifyReady === true && snapshot.previous140hVerifySmokePassed === true },
    { id: "140h_final_gate_targets", passed: snapshot.reviewedTargetPaths.includes("src/modules/stream/index.ts") && snapshot.reviewedTargetPaths.includes("src/app.ts") && snapshot.reviewedTargetPaths.includes("src/server.ts") && snapshot.reviewedTargetPaths.includes("rollback_plan") },
    { id: "140h_final_gate_counts", passed: snapshot.reviewedTargetPathCount === 4 && snapshot.finalHandoffItemCount === 6 && snapshot.stagedArtifactCount === 6 && snapshot.stagedDiffHunksCarriedForward === 6 },
    { id: "140h_final_gate_findings", passed: snapshot.totalFindings === 10 && snapshot.passedFindings === 10 && snapshot.failedFindings === 0 && snapshot.blockingFindings.length === 0 },
    { id: "140h_final_gate_handoff_review_only", passed: snapshot.finalHandoffItems.every((item) => item.writtenNow === false && item.runtimeActionNow === false) },
    { id: "140h_final_gate_exact_approval_missing", passed: snapshot.exactOwnerApprovalPhraseReceivedNow === false && snapshot.decision.reason === "exact_owner_approval_phrase_missing" },
    { id: "140h_final_gate_source_write_blocked", passed: snapshot.nonFoundationFilesWrittenNow === false && snapshot.streamIndexWrittenNow === false && snapshot.appTsWrittenNow === false && snapshot.serverTsWrittenNow === false },
    { id: "140h_final_gate_no_mount_or_http", passed: snapshot.routeMountSourceWrittenNow === false && snapshot.routeMountRuntimePerformedNow === false && snapshot.runtimeHttpRequestsPerformed === 0 },
    { id: "140h_final_gate_no_state_or_money", passed: snapshot.databaseExecutionPerformed === 0 && snapshot.providerCallsPerformed === 0 && snapshot.walletMutationPerformed === 0 && snapshot.paymentAuthorizationPerformed === 0 && snapshot.monthlyPayoutPerformed === 0 && snapshot.moneyMovementPerformed === 0 },
    { id: "140h_final_gate_no_secret_or_fake", passed: snapshot.rawSecretsReturned === 0 && snapshot.fakeSuccessAllowed === false },
    { id: "140h_final_gate_exact_phrase", passed: snapshot.exactOwnerApprovalPhrase.includes("BACKEND-STREAM-FOUNDATION-140H") && snapshot.exactOwnerApprovalPhrase.includes("no money movement") },
  ] as const;
  const passedAssertions = assertions.filter((assertion) => assertion.passed).length;
  return {
    version: "BACKEND-STREAM-FOUNDATION-140H-FINAL-GATE" as const,
    status: passedAssertions === assertions.length
      ? "controlled_non_foundation_source_write_final_gate_smoke_passed"
      : "controlled_non_foundation_source_write_final_gate_smoke_failed",
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
