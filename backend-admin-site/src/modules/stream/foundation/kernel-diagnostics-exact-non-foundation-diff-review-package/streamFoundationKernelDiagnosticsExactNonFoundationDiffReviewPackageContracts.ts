export const STREAM_FOUNDATION_140F_KERNEL_DIAGNOSTICS_EXACT_NON_FOUNDATION_DIFF_REVIEW_PACKAGE_VERSION = "BACKEND-STREAM-FOUNDATION-140F" as const;

export type StreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageStatus =
  | "exact_non_foundation_diff_review_ready_unwritten"
  | "exact_non_foundation_diff_review_blocked";

export type StreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageTargetPath =
  | "src/modules/stream/index.ts"
  | "src/app.ts"
  | "src/server.ts"
  | "rollback_plan";

export type StreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageOperation =
  | "create_file_diff_preview_only"
  | "insert_import_diff_preview_only"
  | "insert_mount_diff_preview_only"
  | "insert_health_marker_diff_preview_only"
  | "confirm_no_change_diff_preview_only"
  | "rollback_diff_preview_only";

export type StreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageArea =
  | "previous_140e_owner_approved_package"
  | "exact_diff_review_scope"
  | "stream_module_index_future_create"
  | "backend_app_future_import"
  | "backend_app_future_mount"
  | "backend_health_future_marker"
  | "server_future_no_change"
  | "rollback_future_plan"
  | "runtime_execution_block"
  | "db_provider_wallet_money_block"
  | "secret_redaction"
  | "fake_success_block";

export interface StreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageSafety {
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly exactNonFoundationDiffPreviewBuiltNow: true;
  readonly nonFoundationFilesWrittenNow: false;
  readonly streamIndexWrittenNow: false;
  readonly appTsWrittenNow: false;
  readonly serverTsWrittenNow: false;
  readonly routeMountPerformedNow: false;
  readonly protectedRouteRegisteredNow: false;
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
  readonly readyForProductionBackend: false;
}

export interface StreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageHunk {
  readonly hunkId: string;
  readonly targetPath: StreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageTargetPath;
  readonly operation: StreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageOperation;
  readonly reviewOnly: true;
  readonly ownerVisible: true;
  readonly writtenNow: false;
  readonly mountedNow: false;
  readonly runtimeSmokeNow: false;
  readonly oldAnchor: string;
  readonly newLines: readonly string[];
  readonly rationale: string;
  readonly safetyNotes: readonly string[];
  readonly nextApprovalRequired: string;
  readonly rollbackInstruction: string;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageCheck {
  readonly area: StreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageArea;
  readonly checkId: string;
  readonly passed: boolean;
  readonly blocking: boolean;
  readonly expected: string;
  readonly observed: string;
  readonly remediation: string;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageDecision {
  readonly decisionCode:
    | "exact_non_foundation_diff_review_ready_for_owner_review"
    | "exact_non_foundation_diff_review_blocked_by_previous_stage"
    | "exact_non_foundation_diff_review_blocked_by_safety_gate";
  readonly exactDiffReviewReadyNow: boolean;
  readonly readyForControlledNonFoundationSourceWrite: false;
  readonly readyForRuntimeMount: false;
  readonly readyForRuntimeSmoke: false;
  readonly readyForProductionBackend: false;
  readonly nextStage: "140G_controlled_non_foundation_source_write_approval_package" | "blocked";
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageSnapshot {
  readonly version: typeof STREAM_FOUNDATION_140F_KERNEL_DIAGNOSTICS_EXACT_NON_FOUNDATION_DIFF_REVIEW_PACKAGE_VERSION;
  readonly status: StreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageStatus;
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly previous140eStatus: string;
  readonly previous140eReady: boolean;
  readonly diffHunks: readonly StreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageHunk[];
  readonly diffHunkCount: number;
  readonly targetPaths: readonly StreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageTargetPath[];
  readonly totalChecks: number;
  readonly passedChecks: number;
  readonly blockingChecks: number;
  readonly exactDiffReviewReadyNow: boolean;
  readonly readyForControlledNonFoundationSourceWrite: false;
  readonly readyForRuntimeMount: false;
  readonly readyForRuntimeSmoke: false;
  readonly readyForProductionBackend: false;
  readonly nonFoundationFilesWrittenNow: false;
  readonly streamIndexWrittenNow: false;
  readonly appTsWrittenNow: false;
  readonly serverTsWrittenNow: false;
  readonly routeMountPerformedNow: false;
  readonly protectedRouteRegisteredNow: false;
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
  readonly checks: readonly StreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageCheck[];
  readonly decision: StreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageDecision;
  readonly safety: StreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageSafety;
}
