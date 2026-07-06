export const STREAM_FOUNDATION_140H_PRE_KERNEL_DIAGNOSTICS_CONTROLLED_NON_FOUNDATION_SOURCE_WRITE_APPROVAL_GUARD_VERSION = "BACKEND-STREAM-FOUNDATION-140H-PRE" as const;

export type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardStatus =
  | "controlled_non_foundation_source_write_blocked_pending_exact_owner_approval"
  | "controlled_non_foundation_source_write_guard_failed";

export type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardTargetPath =
  | "src/modules/stream/index.ts"
  | "src/app.ts"
  | "src/server.ts"
  | "rollback_plan";

export interface StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardSafety {
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly guardPackageBuiltNow: true;
  readonly exactOwnerApprovalPhraseRequired: true;
  readonly exactOwnerApprovalPhraseReceivedNow: false;
  readonly userInstructionWasGenericNextOnly: true;
  readonly genericNextIsNotSufficientForEntryWrite: true;
  readonly nonFoundationSourceWriteAllowedNow: false;
  readonly nonFoundationFilesWrittenNow: false;
  readonly streamIndexWrittenNow: false;
  readonly appTsWrittenNow: false;
  readonly serverTsWrittenNow: false;
  readonly routeMountSourceWrittenNow: false;
  readonly routeMountRuntimePerformedNow: false;
  readonly protectedRouteRegisteredAtRuntimeNow: false;
  readonly expressRouterCreatedNow: false;
  readonly expressRouterImportedNow: false;
  readonly expressRouterBoundNow: false;
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

export interface StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardCheck {
  readonly id: string;
  readonly label: string;
  readonly passed: boolean;
  readonly severity: "required" | "guard" | "blocked_until_owner_approval";
  readonly detail: string;
}

export interface StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardDecision {
  readonly decision: "do_not_write_non_foundation_sources_yet";
  readonly reason: "exact_owner_approval_phrase_missing";
  readonly nextStageWhenApprovalProvided: "140H_controlled_non_foundation_source_write_patch_package";
  readonly fallbackStageNow: "140H_PRE_controlled_non_foundation_source_write_approval_guard";
  readonly exactOwnerApprovalPhrase: string;
}

export interface StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardSnapshot {
  readonly version: typeof STREAM_FOUNDATION_140H_PRE_KERNEL_DIAGNOSTICS_CONTROLLED_NON_FOUNDATION_SOURCE_WRITE_APPROVAL_GUARD_VERSION;
  readonly status: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardStatus;
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly previous140gReady: boolean;
  readonly previous140gStatus: string;
  readonly previous140gApprovalItemCount: number;
  readonly exactOwnerApprovalPhraseRequired: true;
  readonly exactOwnerApprovalPhraseReceivedNow: false;
  readonly sourceWriteBlockedUntilExactApproval: true;
  readonly userInstructionObserved: "дальше";
  readonly userInstructionAcceptedForGuardOnly: true;
  readonly userInstructionAcceptedForNonFoundationWrite: false;
  readonly targetPaths: readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardTargetPath[];
  readonly totalChecks: number;
  readonly passedChecks: number;
  readonly failedChecks: number;
  readonly guardBlockingReasons: readonly string[];
  readonly checks: readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardCheck[];
  readonly decision: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardDecision;
  readonly safety: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardSafety;
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
