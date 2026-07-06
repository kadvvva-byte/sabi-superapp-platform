export const STREAM_FOUNDATION_140H_STAGED_KERNEL_DIAGNOSTICS_CONTROLLED_NON_FOUNDATION_SOURCE_WRITE_STAGED_PACKAGE_VERSION = "BACKEND-STREAM-FOUNDATION-140H-STAGED" as const;

export type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageStatus =
  | "controlled_non_foundation_source_write_staged_pending_exact_owner_approval"
  | "controlled_non_foundation_source_write_staged_package_failed";

export type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageTargetPath =
  | "src/modules/stream/index.ts"
  | "src/app.ts"
  | "src/server.ts"
  | "rollback_plan";

export type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageArtifactKind =
  | "planned_create_file_source"
  | "planned_import_patch"
  | "planned_route_bridge_patch"
  | "planned_health_marker_patch"
  | "planned_no_change_assertion"
  | "planned_rollback_checklist";

export interface StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageSafety {
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly stagedPackageBuiltNow: true;
  readonly exactOwnerApprovalPhraseRequired: true;
  readonly exactOwnerApprovalPhraseReceivedNow: false;
  readonly genericNextAcceptedForStagingOnly: true;
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

export interface StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageArtifact {
  readonly artifactId: string;
  readonly sourceHunkId: string;
  readonly targetPath: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageTargetPath;
  readonly artifactKind: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageArtifactKind;
  readonly reviewDataOnly: true;
  readonly writtenNow: false;
  readonly mountedNow: false;
  readonly runtimeSmokeNow: false;
  readonly exactOwnerApprovalRequiredBeforeWrite: true;
  readonly exactAnchor: string;
  readonly plannedLines: readonly string[];
  readonly safetyNotes: readonly string[];
  readonly rollbackInstruction: string;
}

export interface StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageCheck {
  readonly id: string;
  readonly label: string;
  readonly passed: boolean;
  readonly severity: "required" | "guard" | "blocked_until_owner_approval";
  readonly detail: string;
}

export interface StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageDecision {
  readonly decision: "keep_non_foundation_source_write_blocked";
  readonly reason: "exact_owner_approval_phrase_missing";
  readonly genericNextAcceptedAs: "stage_review_data_only";
  readonly nextStageWhenApprovalProvided: "140H_controlled_non_foundation_source_write_patch_package";
  readonly exactOwnerApprovalPhrase: string;
}

export interface StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageSnapshot {
  readonly version: typeof STREAM_FOUNDATION_140H_STAGED_KERNEL_DIAGNOSTICS_CONTROLLED_NON_FOUNDATION_SOURCE_WRITE_STAGED_PACKAGE_VERSION;
  readonly status: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageStatus;
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly previous140fReady: boolean;
  readonly previous140gReady: boolean;
  readonly previous140hPreGuardReady: boolean;
  readonly exactOwnerApprovalPhraseRequired: true;
  readonly exactOwnerApprovalPhraseReceivedNow: false;
  readonly sourceWriteBlockedUntilExactApproval: true;
  readonly userInstructionObserved: "дальше";
  readonly genericNextAcceptedForStagingOnly: true;
  readonly targetPaths: readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageTargetPath[];
  readonly artifacts: readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageArtifact[];
  readonly artifactCount: number;
  readonly diffHunksCarriedForward: number;
  readonly totalChecks: number;
  readonly passedChecks: number;
  readonly failedChecks: number;
  readonly blockingChecks: readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageCheck[];
  readonly checks: readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageCheck[];
  readonly decision: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageDecision;
  readonly safety: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageSafety;
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
