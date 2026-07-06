import {
  getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationReadiness,
  getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationSmokeReport,
  getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationSnapshot,
} from "../kernel-diagnostics-controlled-non-foundation-source-write-independent-verification";
import {
  STREAM_FOUNDATION_140H_FINAL_GATE_KERNEL_DIAGNOSTICS_CONTROLLED_NON_FOUNDATION_SOURCE_WRITE_FINAL_GATE_VERSION,
  type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateFinding,
  type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateHandoffItem,
  type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateSafety,
  type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateSnapshot,
  type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateTargetPath,
} from "./streamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateContracts";

const EXACT_OWNER_APPROVAL_PHRASE =
  "I approve BACKEND-STREAM-FOUNDATION-140H controlled non-foundation source write patch package only, write src/modules/stream/index.ts and src/app.ts exactly as reviewed, no src/server.ts change, no backend restart, no runtime HTTP smoke, no DB write, no provider call, no Wallet mutation, no payment authorization, no monthly payout, no money movement.";

const SAFETY: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateSafety = {
  patchScope: "src/modules/stream/foundation/** only",
  finalGateBuiltNow: true,
  exactOwnerApprovalPhraseRequired: true,
  exactOwnerApprovalPhraseReceivedNow: false,
  genericNextAcceptedForFinalGateOnly: true,
  sourceWriteAllowedNow: false,
  sourceWritePerformedNow: false,
  nonFoundationFilesWrittenNow: false,
  streamIndexWrittenNow: false,
  appTsWrittenNow: false,
  serverTsWrittenNow: false,
  routeMountSourceWrittenNow: false,
  routeMountRuntimePerformedNow: false,
  runtimeHttpRequestAllowedNow: false,
  runtimeHttpRequestPerformedNow: false,
  databaseReadAllowedNow: false,
  databaseWriteAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentAuthorizationAllowedNow: false,
  monthlyPayoutAllowedNow: false,
  moneyMovementAllowedNow: false,
  rawSecretsReturned: false,
  mobileProviderKeysAllowed: false,
  fakeSuccessAllowed: false,
  readyForRuntimeMount: false,
  readyForRuntimeSmoke: false,
  readyForProductionBackend: false,
};

function toTargetPath(value: string): StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateTargetPath {
  if (value === "src/modules/stream/index.ts" || value === "src/app.ts" || value === "src/server.ts" || value === "rollback_plan") {
    return value;
  }
  return "rollback_plan";
}

function buildHandoffItems(): readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateHandoffItem[] {
  return [
    {
      id: "140h_final_gate_exact_approval_required",
      label: "Exact owner approval phrase is still required",
      status: "blocked_until_exact_owner_approval",
      targetPath: "approval_phrase",
      writtenNow: false,
      runtimeActionNow: false,
      detail: "Generic 'дальше' is accepted only for this final source-only gate, not for non-foundation source write.",
    },
    {
      id: "140h_final_gate_stream_index_future_create",
      label: "Future stream index create remains review-only",
      status: "ready_for_exact_owner_approval",
      targetPath: "src/modules/stream/index.ts",
      writtenNow: false,
      runtimeActionNow: false,
      detail: "The future create target is reviewed but not written in this package.",
    },
    {
      id: "140h_final_gate_app_patch_future_only",
      label: "Future app route patch remains review-only",
      status: "ready_for_exact_owner_approval",
      targetPath: "src/app.ts",
      writtenNow: false,
      runtimeActionNow: false,
      detail: "The future app import/mount/health marker patch is reviewed but not written in this package.",
    },
    {
      id: "140h_final_gate_server_no_change",
      label: "Server file remains no-change",
      status: "review_only",
      targetPath: "src/server.ts",
      writtenNow: false,
      runtimeActionNow: false,
      detail: "The approved package must not change src/server.ts.",
    },
    {
      id: "140h_final_gate_rollback_ready",
      label: "Rollback checklist is carried forward",
      status: "review_only",
      targetPath: "rollback_plan",
      writtenNow: false,
      runtimeActionNow: false,
      detail: "Rollback remains a review artifact only until an exact source-write approval exists.",
    },
    {
      id: "140h_final_gate_runtime_safety_locked",
      label: "Runtime safety remains locked",
      status: "blocked_until_exact_owner_approval",
      targetPath: "runtime_safety",
      writtenNow: false,
      runtimeActionNow: false,
      detail: "No backend restart, runtime HTTP smoke, DB write, provider call, Wallet mutation, payout, or money movement is allowed now.",
    },
  ] as const;
}

function buildFindings(args: {
  readonly previous140hVerifyReady: boolean;
  readonly previous140hVerifySmokePassed: boolean;
  readonly reviewedTargetPaths: readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateTargetPath[];
  readonly stagedArtifactCount: number;
  readonly stagedDiffHunksCarriedForward: number;
  readonly finalHandoffItems: readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateHandoffItem[];
}): readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateFinding[] {
  const hasStreamIndex = args.reviewedTargetPaths.includes("src/modules/stream/index.ts");
  const hasAppTs = args.reviewedTargetPaths.includes("src/app.ts");
  const hasServerTs = args.reviewedTargetPaths.includes("src/server.ts");
  const hasRollback = args.reviewedTargetPaths.includes("rollback_plan");
  return [
    {
      id: "140h_final_gate_verify_ready",
      label: "140H-VERIFY readiness is true",
      passed: args.previous140hVerifyReady,
      severity: "required",
      detail: "The final gate must be built only after independent verification passed.",
    },
    {
      id: "140h_final_gate_verify_smoke_passed",
      label: "140H-VERIFY smoke is passed",
      passed: args.previous140hVerifySmokePassed,
      severity: "required",
      detail: "Independent verification smoke must still pass before source-write handoff.",
    },
    {
      id: "140h_final_gate_target_coverage",
      label: "All reviewed target paths are covered",
      passed: hasStreamIndex && hasAppTs && hasServerTs && hasRollback && args.reviewedTargetPaths.length === 4,
      severity: "required",
      detail: "The final gate covers future stream index create, app patch, server no-change, and rollback review.",
    },
    {
      id: "140h_final_gate_diff_hunks_preserved",
      label: "Reviewed diff hunks are preserved",
      passed: args.stagedArtifactCount === 6 && args.stagedDiffHunksCarriedForward === 6,
      severity: "required",
      detail: "The six reviewed diff hunks are still carried forward from the staged package.",
    },
    {
      id: "140h_final_gate_handoff_complete",
      label: "Final handoff items are complete",
      passed: args.finalHandoffItems.length === 6 && args.finalHandoffItems.every((item) => item.writtenNow === false && item.runtimeActionNow === false),
      severity: "handoff",
      detail: "The handoff has approval, future stream index, future app patch, server no-change, rollback, and runtime safety items.",
    },
    {
      id: "140h_final_gate_source_write_blocked",
      label: "Source write remains blocked",
      passed: SAFETY.sourceWriteAllowedNow === false && SAFETY.sourceWritePerformedNow === false && SAFETY.nonFoundationFilesWrittenNow === false,
      severity: "blocked_until_exact_owner_approval",
      detail: "This package does not write entry files because the exact owner approval phrase was not provided.",
    },
    {
      id: "140h_final_gate_entry_files_unwritten",
      label: "Entry files are not written now",
      passed: SAFETY.streamIndexWrittenNow === false && SAFETY.appTsWrittenNow === false && SAFETY.serverTsWrittenNow === false,
      severity: "blocked_until_exact_owner_approval",
      detail: "src/modules/stream/index.ts, src/app.ts, and src/server.ts remain untouched by this patch.",
    },
    {
      id: "140h_final_gate_no_mount_or_http",
      label: "No mount and no runtime HTTP",
      passed: SAFETY.routeMountSourceWrittenNow === false && SAFETY.routeMountRuntimePerformedNow === false && SAFETY.runtimeHttpRequestPerformedNow === false,
      severity: "guard",
      detail: "No route is mounted, no backend restart is needed, and no runtime HTTP smoke is run.",
    },
    {
      id: "140h_final_gate_no_state_provider_wallet_money",
      label: "No state/provider/Wallet/money execution",
      passed: SAFETY.databaseWriteAllowedNow === false && SAFETY.providerCallAllowedNow === false && SAFETY.walletMutationAllowedNow === false && SAFETY.paymentAuthorizationAllowedNow === false && SAFETY.monthlyPayoutAllowedNow === false && SAFETY.moneyMovementAllowedNow === false,
      severity: "guard",
      detail: "The gate does not touch DB writes, Stream providers, Wallet, payment authorization, payout, or money movement.",
    },
    {
      id: "140h_final_gate_no_secrets_or_fake_success",
      label: "No secrets and no fake success",
      passed: SAFETY.rawSecretsReturned === false && SAFETY.mobileProviderKeysAllowed === false && SAFETY.fakeSuccessAllowed === false,
      severity: "guard",
      detail: "No provider secret is read or returned and no provider/payment/launch success is faked.",
    },
  ] as const;
}

export function getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateSnapshot(): StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateSnapshot {
  const verifySnapshot = getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationSnapshot();
  const verifyReadiness = getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationReadiness();
  const verifySmoke = getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationSmokeReport();
  const reviewedTargetPaths = verifySnapshot.reviewedTargetPaths.map(toTargetPath);
  const finalHandoffItems = buildHandoffItems();
  const findings = buildFindings({
    previous140hVerifyReady: verifyReadiness.ready === true,
    previous140hVerifySmokePassed: verifySmoke.status === "controlled_non_foundation_source_write_independent_verification_smoke_passed",
    reviewedTargetPaths,
    stagedArtifactCount: verifySnapshot.stagedArtifactCount,
    stagedDiffHunksCarriedForward: verifySnapshot.stagedDiffHunksCarriedForward,
    finalHandoffItems,
  });
  const failedFindings = findings.filter((finding) => !finding.passed);
  return {
    version: STREAM_FOUNDATION_140H_FINAL_GATE_KERNEL_DIAGNOSTICS_CONTROLLED_NON_FOUNDATION_SOURCE_WRITE_FINAL_GATE_VERSION,
    status: failedFindings.length === 0
      ? "controlled_non_foundation_source_write_final_gate_ready_blocked_until_exact_owner_approval"
      : "controlled_non_foundation_source_write_final_gate_failed",
    patchScope: "src/modules/stream/foundation/** only",
    previous140hVerifyReady: verifyReadiness.ready === true,
    previous140hVerifySmokePassed: verifySmoke.status === "controlled_non_foundation_source_write_independent_verification_smoke_passed",
    sourceWriteBlockedUntilExactApproval: true,
    exactOwnerApprovalPhraseRequired: true,
    exactOwnerApprovalPhraseReceivedNow: false,
    userInstructionObserved: "дальше",
    genericNextAcceptedForFinalGateOnly: true,
    reviewedTargetPaths,
    reviewedTargetPathCount: reviewedTargetPaths.length,
    stagedArtifactCount: verifySnapshot.stagedArtifactCount,
    stagedDiffHunksCarriedForward: verifySnapshot.stagedDiffHunksCarriedForward,
    finalHandoffItems,
    finalHandoffItemCount: finalHandoffItems.length,
    totalFindings: findings.length,
    passedFindings: findings.length - failedFindings.length,
    failedFindings: failedFindings.length,
    blockingFindings: failedFindings,
    findings,
    decision: {
      decision: "keep_source_write_blocked_until_exact_owner_approval",
      reason: "exact_owner_approval_phrase_missing",
      genericNextAcceptedAs: "final_gate_only",
      nextAllowedWithoutExactApproval: "review_only_or_stop",
      nextStageWhenApprovalProvided: "140H_controlled_non_foundation_source_write_patch_package",
      exactOwnerApprovalPhrase: EXACT_OWNER_APPROVAL_PHRASE,
    },
    safety: SAFETY,
    nonFoundationFilesWrittenNow: false,
    streamIndexWrittenNow: false,
    appTsWrittenNow: false,
    serverTsWrittenNow: false,
    routeMountSourceWrittenNow: false,
    routeMountRuntimePerformedNow: false,
    runtimeHttpRequestsPerformed: 0,
    databaseExecutionPerformed: 0,
    providerCallsPerformed: 0,
    walletMutationPerformed: 0,
    paymentAuthorizationPerformed: 0,
    monthlyPayoutPerformed: 0,
    moneyMovementPerformed: 0,
    rawSecretsReturned: 0,
    mobileProviderKeysAllowed: false,
    fakeSuccessAllowed: false,
    readyForRuntimeMount: false,
    readyForRuntimeSmoke: false,
    readyForProductionBackend: false,
    exactOwnerApprovalPhrase: EXACT_OWNER_APPROVAL_PHRASE,
  };
}
