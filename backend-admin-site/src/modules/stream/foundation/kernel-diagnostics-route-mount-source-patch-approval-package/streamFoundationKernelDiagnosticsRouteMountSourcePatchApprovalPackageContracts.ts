import type {
  StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningStatus,
} from "../kernel-diagnostics-route-mount-owner-approval-planning";

export const STREAM_FOUNDATION_139C_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_SOURCE_PATCH_APPROVAL_PACKAGE_VERSION = "BACKEND-STREAM-FOUNDATION-139C" as const;

export type StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageStatus =
  | "route_mount_source_patch_approval_package_ready"
  | "route_mount_source_patch_approval_package_blocked_by_owner_planning"
  | "route_mount_source_patch_approval_package_blocked_by_scope_violation"
  | "route_mount_source_patch_approval_package_blocked_by_runtime_activation";

export type StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageCheckId =
  | "previous_139b_owner_planning_ready"
  | "foundation_scope_only"
  | "stream_index_absent"
  | "app_server_absent"
  | "route_mount_absent"
  | "runtime_http_absent"
  | "database_execution_absent"
  | "provider_call_absent"
  | "wallet_mutation_absent"
  | "payment_authorization_absent"
  | "monthly_payout_absent"
  | "money_movement_absent"
  | "raw_secret_absent"
  | "fake_success_absent"
  | "source_patch_approval_package_only"
  | "source_patch_requires_future_explicit_owner_approval";

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageCheck {
  readonly checkId: StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageCheckId;
  readonly passed: boolean;
  readonly blocking: boolean;
  readonly expected: string;
  readonly observed: string;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export type StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageArtifact =
  | "source_patch_scope_summary"
  | "source_patch_file_boundary_summary"
  | "route_mount_blocker_summary"
  | "admin_auth_guard_summary"
  | "redacted_response_contract_summary"
  | "rollback_requirement_summary";

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageRequirement {
  readonly artifact: StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageArtifact;
  readonly requiredBeforeSourcePatch: true;
  readonly readyNow: boolean;
  readonly sourcePatchAllowedNow: false;
  readonly routeMountAllowedNow: false;
  readonly description: string;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageSafety {
  readonly sourcePatchApprovalPackageBuiltNow: true;
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly requiresFutureExplicitOwnerApproval: true;
  readonly ownerApprovalCapturedNow: false;
  readonly sourcePatchAllowedNow: false;
  readonly sourcePatchExecutedNow: false;
  readonly diagnosticsRouteRuntimeMountAllowedNow: false;
  readonly diagnosticsRouteRuntimeMountPerformedNow: false;
  readonly protectedRouteRegisteredNow: false;
  readonly streamIndexPatchIncluded: false;
  readonly streamModuleIndexTouchedNow: false;
  readonly appServerPatchIncluded: false;
  readonly appServerTouchedNow: false;
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

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageDecision {
  readonly decisionCode:
    | "route_mount_source_patch_approval_package_ready_for_future_owner_review"
    | "route_mount_source_patch_approval_package_blocked_by_owner_planning"
    | "route_mount_source_patch_approval_package_blocked_by_safety_check";
  readonly readyForFutureOwnerReview: boolean;
  readonly ownerApprovalCapturedNow: false;
  readonly sourcePatchAllowedNow: false;
  readonly routeMountAllowedNow: false;
  readonly runtimeActivationAllowedNow: false;
  readonly serverCopyAllowedNow: false;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageSnapshot {
  readonly version: typeof STREAM_FOUNDATION_139C_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_SOURCE_PATCH_APPROVAL_PACKAGE_VERSION;
  readonly status: StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageStatus;
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly previousOwnerPlanningStatus: StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningStatus;
  readonly sourcePatchApprovalPackageBuiltNow: true;
  readonly requiresFutureExplicitOwnerApproval: true;
  readonly totalChecks: number;
  readonly passedChecks: number;
  readonly blockingChecks: number;
  readonly totalRequirements: number;
  readonly readyRequirements: number;
  readonly ownerApprovalCapturedNow: false;
  readonly sourcePatchAllowedNow: false;
  readonly sourcePatchExecutedNow: false;
  readonly diagnosticsRouteRuntimeMountAllowedNow: false;
  readonly diagnosticsRouteRuntimeMountPerformedNow: false;
  readonly protectedRouteRegisteredNow: false;
  readonly streamIndexPatchIncluded: false;
  readonly streamModuleIndexTouchedNow: false;
  readonly appServerPatchIncluded: false;
  readonly appServerTouchedNow: false;
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
  readonly checks: readonly StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageCheck[];
  readonly requirements: readonly StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageRequirement[];
  readonly decision: StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageDecision;
  readonly safety: StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageSafety;
}
