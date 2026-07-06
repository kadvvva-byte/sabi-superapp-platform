import { getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageReadiness } from "./streamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageReadiness";
import { getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageSnapshot } from "./streamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackage";

export function getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageSmokeReport() {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageReadiness();
  const assertions = [
    { id: "140h_staged_status", passed: snapshot.status === "controlled_non_foundation_source_write_staged_pending_exact_owner_approval" },
    { id: "140h_staged_readiness", passed: readiness.ready === true && readiness.sourceWriteBlockedUntilExactApproval === true },
    { id: "140h_staged_previous_chain", passed: snapshot.previous140fReady === true && snapshot.previous140gReady === true && snapshot.previous140hPreGuardReady === true },
    { id: "140h_staged_exact_approval_missing", passed: snapshot.exactOwnerApprovalPhraseReceivedNow === false && snapshot.decision.reason === "exact_owner_approval_phrase_missing" },
    { id: "140h_staged_artifacts", passed: snapshot.artifactCount === 6 && snapshot.diffHunksCarriedForward === 6 },
    { id: "140h_staged_targets", passed: snapshot.targetPaths.includes("src/modules/stream/index.ts") && snapshot.targetPaths.includes("src/app.ts") && snapshot.targetPaths.includes("src/server.ts") },
    { id: "140h_staged_review_data_only", passed: snapshot.artifacts.every((artifact) => artifact.reviewDataOnly === true && artifact.writtenNow === false && artifact.mountedNow === false && artifact.runtimeSmokeNow === false) },
    { id: "140h_staged_entry_unwritten", passed: snapshot.nonFoundationFilesWrittenNow === false && snapshot.streamIndexWrittenNow === false && snapshot.appTsWrittenNow === false && snapshot.serverTsWrittenNow === false },
    { id: "140h_staged_no_route_mount", passed: snapshot.routeMountSourceWrittenNow === false && snapshot.routeMountRuntimePerformedNow === false && snapshot.readyForRuntimeMount === false },
    { id: "140h_staged_no_runtime_http", passed: snapshot.runtimeHttpRequestsPerformed === 0 && snapshot.readyForRuntimeSmoke === false },
    { id: "140h_staged_no_state_or_money", passed: snapshot.databaseExecutionPerformed === 0 && snapshot.providerCallsPerformed === 0 && snapshot.walletMutationPerformed === 0 && snapshot.paymentAuthorizationPerformed === 0 && snapshot.monthlyPayoutPerformed === 0 && snapshot.moneyMovementPerformed === 0 },
    { id: "140h_staged_no_secret_or_fake", passed: snapshot.rawSecretsReturned === 0 && snapshot.fakeSuccessAllowed === false },
    { id: "140h_staged_exact_phrase", passed: snapshot.exactOwnerApprovalPhrase.includes("BACKEND-STREAM-FOUNDATION-140H") && snapshot.exactOwnerApprovalPhrase.includes("no money movement") },
  ] as const;
  const passedAssertions = assertions.filter((assertion) => assertion.passed).length;
  return {
    version: "BACKEND-STREAM-FOUNDATION-140H-STAGED" as const,
    status: passedAssertions === assertions.length
      ? "controlled_non_foundation_source_write_staged_package_smoke_passed"
      : "controlled_non_foundation_source_write_staged_package_smoke_failed",
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
