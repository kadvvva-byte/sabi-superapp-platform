import { getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardSnapshot } from "./streamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuard";
import { getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardReadiness } from "./streamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardReadiness";

export function getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardSmokeReport() {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardReadiness();
  const assertions = [
    { id: "140h_pre_guard_status", passed: snapshot.status === "controlled_non_foundation_source_write_blocked_pending_exact_owner_approval" },
    { id: "140h_pre_readiness_guard_ready", passed: readiness.guardReady === true && readiness.sourceWriteBlockedUntilExactApproval === true },
    { id: "140h_pre_previous_140g_ready", passed: snapshot.previous140gReady === true && snapshot.previous140gApprovalItemCount === 8 },
    { id: "140h_pre_exact_approval_missing", passed: snapshot.exactOwnerApprovalPhraseReceivedNow === false && snapshot.guardBlockingReasons.includes("exact_owner_approval_phrase_missing") },
    { id: "140h_pre_user_next_guard_only", passed: snapshot.userInstructionAcceptedForGuardOnly === true && snapshot.userInstructionAcceptedForNonFoundationWrite === false },
    { id: "140h_pre_foundation_only", passed: snapshot.patchScope === "src/modules/stream/foundation/** only" && snapshot.nonFoundationFilesWrittenNow === false },
    { id: "140h_pre_entry_files_unwritten", passed: snapshot.streamIndexWrittenNow === false && snapshot.appTsWrittenNow === false && snapshot.serverTsWrittenNow === false },
    { id: "140h_pre_no_route_mount", passed: snapshot.routeMountSourceWrittenNow === false && snapshot.routeMountRuntimePerformedNow === false },
    { id: "140h_pre_no_runtime_http", passed: snapshot.runtimeHttpRequestsPerformed === 0 && snapshot.readyForRuntimeSmoke === false },
    { id: "140h_pre_no_state_or_money_execution", passed: snapshot.databaseExecutionPerformed === 0 && snapshot.providerCallsPerformed === 0 && snapshot.walletMutationPerformed === 0 && snapshot.paymentAuthorizationPerformed === 0 && snapshot.monthlyPayoutPerformed === 0 && snapshot.moneyMovementPerformed === 0 },
    { id: "140h_pre_no_secret_or_fake", passed: snapshot.rawSecretsReturned === 0 && snapshot.mobileProviderKeysAllowed === false && snapshot.fakeSuccessAllowed === false },
    { id: "140h_pre_exact_phrase_kept", passed: snapshot.exactOwnerApprovalPhrase.includes("BACKEND-STREAM-FOUNDATION-140H") && snapshot.exactOwnerApprovalPhrase.includes("no money movement") },
  ] as const;
  const passedAssertions = assertions.filter((assertion) => assertion.passed).length;
  return {
    version: "BACKEND-STREAM-FOUNDATION-140H-PRE" as const,
    status: passedAssertions === assertions.length
      ? "controlled_non_foundation_source_write_approval_guard_smoke_passed"
      : "controlled_non_foundation_source_write_approval_guard_smoke_failed",
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
