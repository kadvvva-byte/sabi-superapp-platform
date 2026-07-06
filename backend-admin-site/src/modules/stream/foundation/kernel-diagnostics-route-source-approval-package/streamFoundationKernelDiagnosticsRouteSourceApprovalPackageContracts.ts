import type {
  StreamFoundationKernelDiagnosticsRouteSourcePatchPlanRouteItem,
  StreamFoundationKernelDiagnosticsRouteSourcePatchPlanSafety,
  StreamFoundationKernelDiagnosticsRouteSourcePatchPlanTargetPath,
} from "../kernel-diagnostics-route-source-patch-plan";

export const STREAM_FOUNDATION_138O_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_APPROVAL_PACKAGE_VERSION = "BACKEND-STREAM-FOUNDATION-138O" as const;

export type StreamFoundationKernelDiagnosticsRouteSourceApprovalPackageId =
  | "stream_kernel_diagnostics_route_source_approval_package"
  | "stream_kernel_diagnostics_route_source_owner_review_package"
  | "stream_kernel_diagnostics_route_source_safe_mount_boundary_package";

export type StreamFoundationKernelDiagnosticsRouteSourceApprovalPackageStatus =
  | "approval_package_ready_for_owner_review"
  | "approval_package_blocked_by_source_patch_plan"
  | "approval_package_blocked_by_safety_boundary"
  | "approval_package_blocked_by_forbidden_scope";

export type StreamFoundationKernelDiagnosticsRouteSourceApprovalStatus =
  | "not_requested_in_this_patch"
  | "owner_review_required_later"
  | "separate_source_patch_approval_required_later"
  | "separate_route_mount_approval_required_later";

export type StreamFoundationKernelDiagnosticsRouteSourceApprovalChecklistItemId =
  | "owner_route_source_approval_required"
  | "protected_admin_scope_required"
  | "redacted_response_envelope_required"
  | "no_stream_index_patch_required"
  | "no_app_server_patch_required"
  | "no_provider_wallet_money_required"
  | "no_raw_secret_return_required"
  | "future_route_mount_separate_approval_required";

export interface StreamFoundationKernelDiagnosticsRouteSourceApprovalPackageSafety
  extends StreamFoundationKernelDiagnosticsRouteSourcePatchPlanSafety {
  readonly approvalPackageOnly: true;
  readonly ownerApprovalCapturedNow: false;
  readonly routeSourcePatchAuthorizedNow: false;
  readonly routeSourcePatchGeneratedNow: false;
  readonly protectedRouteSourceCreatedNow: false;
  readonly protectedRouteMountedNow: false;
  readonly streamIndexPatchIncluded: false;
  readonly appServerPatchIncluded: false;
  readonly adminUiPatchIncluded: false;
  readonly runtimeHandlerBoundNow: false;
  readonly routeFactoryExecutedAtRuntimeNow: false;
  readonly separateOwnerApprovalRequiredForSourcePatch: true;
  readonly separateOwnerApprovalRequiredForMountPatch: true;
}

export interface StreamFoundationKernelDiagnosticsRouteSourceApprovalChecklistItem {
  readonly itemId: StreamFoundationKernelDiagnosticsRouteSourceApprovalChecklistItemId;
  readonly ordered: number;
  readonly required: true;
  readonly satisfiedByCurrentFoundationContracts: boolean;
  readonly approvedNow: false;
  readonly approvalStatus: StreamFoundationKernelDiagnosticsRouteSourceApprovalStatus;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteSourceApprovalTargetReview {
  readonly targetPath: StreamFoundationKernelDiagnosticsRouteSourcePatchPlanTargetPath;
  readonly allowedForFutureReview: boolean;
  readonly includedInThisPatch: boolean;
  readonly approvedNow: false;
  readonly approvalStatus: StreamFoundationKernelDiagnosticsRouteSourceApprovalStatus;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteSourceApprovalRouteReview {
  readonly routeItem: StreamFoundationKernelDiagnosticsRouteSourcePatchPlanRouteItem;
  readonly routeSourceApprovedNow: false;
  readonly routeMountApprovedNow: false;
  readonly readyForOwnerReview: boolean;
  readonly approvalStatus: StreamFoundationKernelDiagnosticsRouteSourceApprovalStatus;
  readonly futureSourceHandlerName: string;
  readonly mountedNow: false;
  readonly sourceCreatedNow: false;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteSourceApprovalPackageSnapshot {
  readonly version: typeof STREAM_FOUNDATION_138O_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_APPROVAL_PACKAGE_VERSION;
  readonly packageId: StreamFoundationKernelDiagnosticsRouteSourceApprovalPackageId;
  readonly status: StreamFoundationKernelDiagnosticsRouteSourceApprovalPackageStatus;
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly sourcePlanVersion: string;
  readonly streamIndexPatchIncluded: false;
  readonly appServerPatchIncluded: false;
  readonly approvalPackageOnly: true;
  readonly ownerApprovalCapturedNow: false;
  readonly routeSourcePatchAuthorizedNow: false;
  readonly routeSourcePatchGeneratedNow: false;
  readonly routeSourcePatchCreatedNow: false;
  readonly routeMountAuthorizedNow: false;
  readonly routeMountPerformed: false;
  readonly protectedRouteRegisteredNow: false;
  readonly readyForOwnerApprovalReview: boolean;
  readonly readyForRouteSourcePatchNow: false;
  readonly requiresSeparateRouteSourceApproval: true;
  readonly requiresSeparateRouteMountApproval: true;
  readonly checklist: readonly StreamFoundationKernelDiagnosticsRouteSourceApprovalChecklistItem[];
  readonly checklistItemCount: number;
  readonly checklistSatisfiedCount: number;
  readonly targetReviews: readonly StreamFoundationKernelDiagnosticsRouteSourceApprovalTargetReview[];
  readonly forbiddenTargetsIncluded: 0;
  readonly routeReviews: readonly StreamFoundationKernelDiagnosticsRouteSourceApprovalRouteReview[];
  readonly routeReviewCount: number;
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
  readonly safety: StreamFoundationKernelDiagnosticsRouteSourceApprovalPackageSafety;
}
