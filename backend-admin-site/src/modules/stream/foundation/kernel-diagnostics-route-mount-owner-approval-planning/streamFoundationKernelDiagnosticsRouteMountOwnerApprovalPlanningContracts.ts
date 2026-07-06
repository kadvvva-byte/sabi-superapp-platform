import type {
  StreamFoundationKernelDiagnosticsFoundationHandoffFreezeStatus,
} from "../kernel-diagnostics-foundation-handoff-freeze";

export const STREAM_FOUNDATION_139B_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_OWNER_APPROVAL_PLANNING_VERSION = "BACKEND-STREAM-FOUNDATION-139B" as const;

export type StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningStatus =
  | "route_mount_owner_approval_planning_ready"
  | "route_mount_owner_approval_planning_blocked_by_handoff_freeze"
  | "route_mount_owner_approval_planning_blocked_by_scope_violation"
  | "route_mount_owner_approval_planning_blocked_by_runtime_activation";

export type StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningCheckId =
  | "previous_139a_handoff_freeze_ready"
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
  | "owner_approval_planning_only"
  | "mount_requires_future_explicit_owner_approval";

export interface StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningCheck {
  readonly checkId: StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningCheckId;
  readonly passed: boolean;
  readonly blocking: boolean;
  readonly expected: string;
  readonly observed: string;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export type StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningArtifact =
  | "owner_approval_scope_summary"
  | "mount_blocker_summary"
  | "future_server_patch_boundary"
  | "rollback_requirement_summary"
  | "admin_auth_requirement_summary"
  | "diagnostics_route_contract_summary";

export interface StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningRequirement {
  readonly artifact: StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningArtifact;
  readonly requiredBeforeMount: true;
  readonly readyNow: boolean;
  readonly routeMountAllowedNow: false;
  readonly description: string;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningSafety {
  readonly ownerApprovalPlanningBuiltNow: true;
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly requiresFutureExplicitOwnerApproval: true;
  readonly ownerApprovalCapturedNow: false;
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

export interface StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningDecision {
  readonly decisionCode:
    | "route_mount_owner_approval_planning_ready_for_future_owner_review"
    | "route_mount_owner_approval_planning_blocked_by_handoff_freeze"
    | "route_mount_owner_approval_planning_blocked_by_safety_check";
  readonly readyForFutureOwnerReview: boolean;
  readonly ownerApprovalCapturedNow: false;
  readonly routeMountAllowedNow: false;
  readonly runtimeActivationAllowedNow: false;
  readonly sourceWriteAllowedNow: false;
  readonly serverCopyAllowedNow: false;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningSnapshot {
  readonly version: typeof STREAM_FOUNDATION_139B_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_OWNER_APPROVAL_PLANNING_VERSION;
  readonly status: StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningStatus;
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly previousHandoffFreezeStatus: StreamFoundationKernelDiagnosticsFoundationHandoffFreezeStatus;
  readonly ownerApprovalPlanningBuiltNow: true;
  readonly requiresFutureExplicitOwnerApproval: true;
  readonly totalChecks: number;
  readonly passedChecks: number;
  readonly blockingChecks: number;
  readonly totalRequirements: number;
  readonly readyRequirements: number;
  readonly ownerApprovalCapturedNow: false;
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
  readonly checks: readonly StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningCheck[];
  readonly requirements: readonly StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningRequirement[];
  readonly decision: StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningDecision;
  readonly safety: StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningSafety;
}
