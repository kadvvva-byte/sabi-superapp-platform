import type {
  StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalBlueprintReview,
  StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateSafety,
  StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateStatus,
  StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalRequirementId,
} from "../kernel-diagnostics-route-source-generation-approval-gate";
import type {
  StreamFoundationKernelDiagnosticsRouteSourceDraftFileTarget,
} from "../kernel-diagnostics-route-source-draft-package";

export const STREAM_FOUNDATION_138T_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_DRY_RUN_PACKAGE_VERSION = "BACKEND-STREAM-FOUNDATION-138T" as const;

export type StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageId =
  | "stream_kernel_diagnostics_route_source_generation_dry_run_package"
  | "stream_kernel_diagnostics_route_source_generation_virtual_file_plan"
  | "stream_kernel_diagnostics_route_source_generation_no_write_plan";

export type StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageStatus =
  | "dry_run_package_ready_for_owner_review"
  | "dry_run_package_blocked_by_approval_gate"
  | "dry_run_package_blocked_by_missing_generation_approval"
  | "dry_run_package_blocked_by_mount_boundary"
  | "dry_run_package_blocked_by_safety_boundary";

export type StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunVirtualFileKind =
  | "redacted_response_virtual_file"
  | "admin_scope_guard_virtual_file"
  | "protected_handler_virtual_file"
  | "protected_route_definition_virtual_file"
  | "future_stream_module_entrypoint_virtual_file";

export type StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunOutputChannel =
  | "review_manifest_only"
  | "no_source_text_returned"
  | "no_file_write"
  | "no_route_mount";

export interface StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageSafety
  extends StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateSafety {
  readonly dryRunPackageOnly: true;
  readonly dryRunReviewManifestBuiltNow: true;
  readonly virtualFilePlanBuiltNow: true;
  readonly sourceGenerationApprovedNow: false;
  readonly routeSourceGenerationExecutedNow: false;
  readonly routeSourceFilesWrittenNow: false;
  readonly implementationSourceFilesGeneratedNow: false;
  readonly implementationSourceTextReturnedNow: false;
  readonly generatedSourceTextPersistedNow: false;
  readonly generatedSourceTextPrintedNow: false;
  readonly routeMountApprovedNow: false;
  readonly routeMountPerformedNow: false;
  readonly protectedRouteRegisteredNow: false;
  readonly expressRouterCreatedNow: false;
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
}

export interface StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunVirtualFilePlan {
  readonly blueprintReview: StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalBlueprintReview;
  readonly virtualFileKind: StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunVirtualFileKind;
  readonly futureTargetPath: StreamFoundationKernelDiagnosticsRouteSourceDraftFileTarget;
  readonly outputChannel: StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunOutputChannel;
  readonly includedInThisPatch: false;
  readonly generatedNow: false;
  readonly writtenNow: false;
  readonly sourceTextReturnedNow: false;
  readonly sourceTextPersistedNow: false;
  readonly routeMountedNow: false;
  readonly requiresOwnerApprovalBeforeWrite: true;
  readonly requiresForbiddenPathScanBeforeWrite: true;
  readonly requiresSeparateMountApprovalBeforeMount: true;
  readonly requiredRequirementIds: readonly StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalRequirementId[];
  readonly expectedFutureExports: readonly string[];
  readonly expectedFutureGuards: readonly string[];
  readonly forbiddenRuntimeEffectsNow: readonly string[];
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunForbiddenPathCheck {
  readonly checkId:
    | "stream_index_not_included"
    | "app_server_not_included"
    | "wallet_messenger_admin_not_included"
    | "env_and_prisma_not_included"
    | "route_mount_not_included";
  readonly checkedNow: true;
  readonly passed: boolean;
  readonly blockedPathPattern: string;
  readonly matchedCount: 0;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunDecision {
  readonly decisionCode:
    | "dry_run_ready_for_owner_review_but_generation_blocked"
    | "dry_run_blocked_by_approval_gate"
    | "dry_run_blocked_until_owner_generation_approval"
    | "dry_run_blocked_until_separate_mount_approval"
    | "dry_run_blocked_by_safety_boundary";
  readonly dryRunReviewManifestBuiltNow: true;
  readonly routeSourceGenerationAllowedNow: false;
  readonly routeSourceFilesWrittenNow: false;
  readonly implementationSourceFilesGeneratedNow: false;
  readonly implementationSourceTextReturnedNow: false;
  readonly routeMountAllowedNow: false;
  readonly routeMountPerformedNow: false;
  readonly blockedRequirementIds: readonly StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalRequirementId[];
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageSnapshot {
  readonly version: typeof STREAM_FOUNDATION_138T_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_DRY_RUN_PACKAGE_VERSION;
  readonly packageId: StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageId;
  readonly status: StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageStatus;
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly approvalGateVersion: string;
  readonly approvalGateStatus: StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateStatus;
  readonly dryRunPackageOnly: true;
  readonly dryRunReviewManifestBuiltNow: true;
  readonly virtualFilePlanBuiltNow: true;
  readonly readyForDryRunReview: boolean;
  readonly readyForRouteSourceGenerationNow: false;
  readonly sourceGenerationApprovedNow: false;
  readonly routeSourceGenerationExecutedNow: false;
  readonly routeSourceFilesWrittenNow: false;
  readonly implementationSourceFilesGeneratedNow: false;
  readonly implementationSourceTextReturnedNow: false;
  readonly generatedSourceTextPersistedNow: false;
  readonly generatedSourceTextPrintedNow: false;
  readonly routeMountApprovedNow: false;
  readonly routeMountPerformed: false;
  readonly protectedRouteRegisteredNow: false;
  readonly streamIndexPatchIncluded: false;
  readonly appServerPatchIncluded: false;
  readonly streamModulePatchIncluded: false;
  readonly virtualFilePlans: readonly StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunVirtualFilePlan[];
  readonly virtualFilePlanCount: number;
  readonly generatedVirtualFileCount: 0;
  readonly writtenVirtualFileCount: 0;
  readonly forbiddenPathChecks: readonly StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunForbiddenPathCheck[];
  readonly forbiddenPathCheckCount: number;
  readonly forbiddenPathViolationCount: 0;
  readonly decision: StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunDecision;
  readonly runtimeHttpRequestsPerformed: 0;
  readonly providerCallsPerformed: 0;
  readonly databaseExecutionPerformed: 0;
  readonly walletMutationPerformed: 0;
  readonly paymentAuthorizationPerformed: 0;
  readonly monthlyPayoutPerformed: 0;
  readonly moneyMovementPerformed: 0;
  readonly rawSecretsReturned: 0;
  readonly mobileProviderKeysAllowed: false;
  readonly fakeSuccessAllowed: false;
  readonly safety: StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageSafety;
}
