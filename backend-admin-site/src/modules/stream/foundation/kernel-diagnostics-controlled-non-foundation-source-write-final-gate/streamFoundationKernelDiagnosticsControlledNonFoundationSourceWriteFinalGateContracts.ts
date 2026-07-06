export const STREAM_FOUNDATION_140H_FINAL_GATE_KERNEL_DIAGNOSTICS_CONTROLLED_NON_FOUNDATION_SOURCE_WRITE_FINAL_GATE_VERSION = "BACKEND-STREAM-FOUNDATION-140H-FINAL-GATE" as const;

export type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateStatus =
  | "controlled_non_foundation_source_write_final_gate_ready_blocked_until_exact_owner_approval"
  | "controlled_non_foundation_source_write_final_gate_failed";

export type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateFindingSeverity =
  | "required"
  | "guard"
  | "handoff"
  | "blocked_until_exact_owner_approval";

export type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateTargetPath =
  | "src/modules/stream/index.ts"
  | "src/app.ts"
  | "src/server.ts"
  | "rollback_plan";

export type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateHandoffStatus =
  | "ready_for_exact_owner_approval"
  | "blocked_until_exact_owner_approval"
  | "review_only";

export interface StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateSafety {
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly finalGateBuiltNow: true;
  readonly exactOwnerApprovalPhraseRequired: true;
  readonly exactOwnerApprovalPhraseReceivedNow: false;
  readonly genericNextAcceptedForFinalGateOnly: true;
  readonly sourceWriteAllowedNow: false;
  readonly sourceWritePerformedNow: false;
  readonly nonFoundationFilesWrittenNow: false;
  readonly streamIndexWrittenNow: false;
  readonly appTsWrittenNow: false;
  readonly serverTsWrittenNow: false;
  readonly routeMountSourceWrittenNow: false;
  readonly routeMountRuntimePerformedNow: false;
  readonly runtimeHttpRequestAllowedNow: false;
  readonly runtimeHttpRequestPerformedNow: false;
  readonly databaseReadAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly paymentAuthorizationAllowedNow: false;
  readonly monthlyPayoutAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly rawSecretsReturned: false;
  readonly mobileProviderKeysAllowed: false;
  readonly fakeSuccessAllowed: false;
  readonly readyForRuntimeMount: false;
  readonly readyForRuntimeSmoke: false;
  readonly readyForProductionBackend: false;
}

export interface StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateFinding {
  readonly id: string;
  readonly label: string;
  readonly passed: boolean;
  readonly severity: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateFindingSeverity;
  readonly detail: string;
}

export interface StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateHandoffItem {
  readonly id: string;
  readonly label: string;
  readonly status: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateHandoffStatus;
  readonly targetPath: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateTargetPath | "approval_phrase" | "runtime_safety";
  readonly writtenNow: false;
  readonly runtimeActionNow: false;
  readonly detail: string;
}

export interface StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateDecision {
  readonly decision: "keep_source_write_blocked_until_exact_owner_approval";
  readonly reason: "exact_owner_approval_phrase_missing";
  readonly genericNextAcceptedAs: "final_gate_only";
  readonly nextAllowedWithoutExactApproval: "review_only_or_stop";
  readonly nextStageWhenApprovalProvided: "140H_controlled_non_foundation_source_write_patch_package";
  readonly exactOwnerApprovalPhrase: string;
}

export interface StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateSnapshot {
  readonly version: typeof STREAM_FOUNDATION_140H_FINAL_GATE_KERNEL_DIAGNOSTICS_CONTROLLED_NON_FOUNDATION_SOURCE_WRITE_FINAL_GATE_VERSION;
  readonly status: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateStatus;
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly previous140hVerifyReady: boolean;
  readonly previous140hVerifySmokePassed: boolean;
  readonly sourceWriteBlockedUntilExactApproval: true;
  readonly exactOwnerApprovalPhraseRequired: true;
  readonly exactOwnerApprovalPhraseReceivedNow: false;
  readonly userInstructionObserved: "дальше";
  readonly genericNextAcceptedForFinalGateOnly: true;
  readonly reviewedTargetPaths: readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateTargetPath[];
  readonly reviewedTargetPathCount: number;
  readonly stagedArtifactCount: number;
  readonly stagedDiffHunksCarriedForward: number;
  readonly finalHandoffItems: readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateHandoffItem[];
  readonly finalHandoffItemCount: number;
  readonly totalFindings: number;
  readonly passedFindings: number;
  readonly failedFindings: number;
  readonly blockingFindings: readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateFinding[];
  readonly findings: readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateFinding[];
  readonly decision: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateDecision;
  readonly safety: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteFinalGateSafety;
  readonly nonFoundationFilesWrittenNow: false;
  readonly streamIndexWrittenNow: false;
  readonly appTsWrittenNow: false;
  readonly serverTsWrittenNow: false;
  readonly routeMountSourceWrittenNow: false;
  readonly routeMountRuntimePerformedNow: false;
  readonly runtimeHttpRequestsPerformed: 0;
  readonly databaseExecutionPerformed: 0;
  readonly providerCallsPerformed: 0;
  readonly walletMutationPerformed: 0;
  readonly paymentAuthorizationPerformed: 0;
  readonly monthlyPayoutPerformed: 0;
  readonly moneyMovementPerformed: 0;
  readonly rawSecretsReturned: 0;
  readonly mobileProviderKeysAllowed: false;
  readonly fakeSuccessAllowed: false;
  readonly readyForRuntimeMount: false;
  readonly readyForRuntimeSmoke: false;
  readonly readyForProductionBackend: false;
  readonly exactOwnerApprovalPhrase: string;
}
