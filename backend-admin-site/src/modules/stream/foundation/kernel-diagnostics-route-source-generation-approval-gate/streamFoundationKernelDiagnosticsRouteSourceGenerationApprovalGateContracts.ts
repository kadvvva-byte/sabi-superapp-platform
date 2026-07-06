import type {
  StreamFoundationKernelDiagnosticsRouteImplementationMountBoundaryReview,
  StreamFoundationKernelDiagnosticsRouteImplementationSourceBlueprint,
  StreamFoundationKernelDiagnosticsRouteImplementationSourcePackageSafety,
  StreamFoundationKernelDiagnosticsRouteImplementationSourcePackageStatus,
} from "../kernel-diagnostics-route-implementation-source-package";

export const STREAM_FOUNDATION_138S_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_APPROVAL_GATE_VERSION = "BACKEND-STREAM-FOUNDATION-138S" as const;

export type StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateId =
  | "stream_kernel_diagnostics_route_source_generation_approval_gate"
  | "stream_kernel_diagnostics_route_source_generation_owner_approval_gate"
  | "stream_kernel_diagnostics_route_source_generation_mount_separation_gate";

export type StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateStatus =
  | "generation_approval_gate_ready_for_owner_review"
  | "generation_approval_gate_blocked_by_source_package"
  | "generation_approval_gate_blocked_by_missing_owner_approval"
  | "generation_approval_gate_blocked_by_mount_boundary"
  | "generation_approval_gate_blocked_by_safety_boundary";

export type StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalRequirementId =
  | "source_package_review_passed"
  | "owner_route_source_generation_approval_required"
  | "admin_scope_guard_required"
  | "redacted_response_guard_required"
  | "provider_wallet_money_disabled_guard_required"
  | "forbidden_path_scan_required"
  | "route_mount_separate_approval_required"
  | "stream_index_separate_approval_required";

export type StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalDecisionCode =
  | "source_generation_review_ready_but_not_approved"
  | "source_generation_blocked_until_owner_approval"
  | "source_generation_blocked_until_mount_approval"
  | "source_generation_blocked_by_safety_boundary";

export interface StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateSafety
  extends StreamFoundationKernelDiagnosticsRouteImplementationSourcePackageSafety {
  readonly generationApprovalGateOnly: true;
  readonly sourceGenerationOwnerApprovalRecordedNow: false;
  readonly sourceGenerationApprovedNow: false;
  readonly routeSourceGenerationExecutedNow: false;
  readonly routeSourceFilesWrittenNow: false;
  readonly implementationSourceFilesGeneratedNow: false;
  readonly implementationSourceTextReturnedNow: false;
  readonly routeMountApprovedNow: false;
  readonly routeMountPerformedNow: false;
  readonly streamIndexPatchIncluded: false;
  readonly appServerPatchIncluded: false;
  readonly streamModulePatchIncluded: false;
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

export interface StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalRequirement {
  readonly requirementId: StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalRequirementId;
  readonly title: string;
  readonly requiredBeforeGeneration: true;
  readonly satisfiedNow: boolean;
  readonly blocksGenerationNow: boolean;
  readonly separateOwnerApprovalRequired: boolean;
  readonly separateMountApprovalRequired: boolean;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalBlueprintReview {
  readonly blueprint: StreamFoundationKernelDiagnosticsRouteImplementationSourceBlueprint;
  readonly approvedForGenerationNow: false;
  readonly generatedNow: false;
  readonly sourceTextReturnedNow: false;
  readonly routeMountedNow: false;
  readonly requiresOwnerApprovalBeforeGeneration: true;
  readonly requiresForbiddenPathScanBeforeGeneration: true;
  readonly requiredRequirementIds: readonly StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalRequirementId[];
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalMountBoundaryGate {
  readonly boundary: StreamFoundationKernelDiagnosticsRouteImplementationMountBoundaryReview;
  readonly approvedForMountNow: false;
  readonly routeMountedNow: false;
  readonly includedInThisPatch: false;
  readonly requiredBeforeMount: true;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalDecision {
  readonly decisionCode: StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalDecisionCode;
  readonly generationAllowedNow: false;
  readonly routeSourceFilesWrittenNow: false;
  readonly implementationSourceFilesGeneratedNow: false;
  readonly routeMountAllowedNow: false;
  readonly routeMountPerformedNow: false;
  readonly requiresOwnerApprovalLater: true;
  readonly requiresSeparateMountApprovalLater: true;
  readonly blockedRequirementIds: readonly StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalRequirementId[];
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateSnapshot {
  readonly version: typeof STREAM_FOUNDATION_138S_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_APPROVAL_GATE_VERSION;
  readonly gateId: StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateId;
  readonly status: StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateStatus;
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly sourcePackageVersion: string;
  readonly sourcePackageStatus: StreamFoundationKernelDiagnosticsRouteImplementationSourcePackageStatus;
  readonly generationApprovalGateOnly: true;
  readonly readyForGenerationApprovalReview: boolean;
  readonly sourceGenerationOwnerApprovalRecordedNow: false;
  readonly sourceGenerationApprovedNow: false;
  readonly readyForRouteSourceGenerationNow: false;
  readonly routeSourceGenerationExecutedNow: false;
  readonly routeSourceFilesWrittenNow: false;
  readonly implementationSourceFilesGeneratedNow: false;
  readonly implementationSourceTextReturnedNow: false;
  readonly routeMountApprovedNow: false;
  readonly routeMountPerformed: false;
  readonly protectedRouteRegisteredNow: false;
  readonly streamIndexPatchIncluded: false;
  readonly appServerPatchIncluded: false;
  readonly streamModulePatchIncluded: false;
  readonly requirements: readonly StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalRequirement[];
  readonly requirementCount: number;
  readonly satisfiedRequirementCount: number;
  readonly blockedRequirementCount: number;
  readonly blueprintReviews: readonly StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalBlueprintReview[];
  readonly blueprintReviewCount: number;
  readonly approvedBlueprintCount: 0;
  readonly mountBoundaryGates: readonly StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalMountBoundaryGate[];
  readonly mountBoundaryGateCount: number;
  readonly decision: StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalDecision;
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
  readonly safety: StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateSafety;
}
