export const STREAM_FOUNDATION_140C_KERNEL_DIAGNOSTICS_CONTROLLED_BACKEND_ENTRY_PATCH_PLANNING_VERSION = "BACKEND-STREAM-FOUNDATION-140C" as const;

export type StreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningStatus =
  | "controlled_backend_entry_patch_planning_ready_unmounted"
  | "controlled_backend_entry_patch_planning_blocked";

export type StreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningArea =
  | "previous_140b_verification"
  | "planned_stream_module_index_patch"
  | "planned_backend_entry_patch"
  | "planned_protected_router_mount"
  | "planned_runtime_smoke"
  | "source_only_scope"
  | "route_mount_deferred"
  | "runtime_execution_deferred"
  | "persistence_provider_wallet_deferred"
  | "money_movement_block"
  | "secret_redaction"
  | "fake_success_block";

export type StreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningTarget =
  | "stream_module_index"
  | "backend_app_route_registration"
  | "backend_server_route_audit"
  | "protected_router_mount_validation"
  | "post_mount_runtime_http_smoke";

export interface StreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningSafety {
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly planningSourceBuiltNow: true;
  readonly streamIndexPatchIncludedNow: false;
  readonly streamModuleIndexTouchedNow: false;
  readonly backendEntryPatchIncludedNow: false;
  readonly appServerPatchIncludedNow: false;
  readonly appServerTouchedNow: false;
  readonly routeMountAllowedNow: false;
  readonly routeMountPerformedNow: false;
  readonly protectedRouteRegisteredNow: false;
  readonly expressRouterCreatedNow: false;
  readonly expressRouterImportedNow: false;
  readonly expressRouterBoundNow: false;
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

export interface StreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningItem {
  readonly target: StreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningTarget;
  readonly plannedPath: string;
  readonly operation: "plan_only_no_write";
  readonly requiredBeforeRuntimeSmoke: boolean;
  readonly plannedForFuturePatch: true;
  readonly writtenNow: false;
  readonly mountedNow: false;
  readonly includesRuntimeExecutionNow: false;
  readonly includesDatabaseExecutionNow: false;
  readonly includesProviderCallNow: false;
  readonly includesWalletMutationNow: false;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningCheck {
  readonly area: StreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningArea;
  readonly checkId: string;
  readonly passed: boolean;
  readonly blocking: boolean;
  readonly expected: string;
  readonly observed: string;
  readonly remediation: string;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningDecision {
  readonly decisionCode:
    | "controlled_backend_entry_patch_planning_ready_for_owner_review"
    | "controlled_backend_entry_patch_planning_blocked_by_140b"
    | "controlled_backend_entry_patch_planning_blocked_by_safety_gate";
  readonly planningReadyNow: boolean;
  readonly readyForControlledBackendEntryPatchOwnerReview: boolean;
  readonly readyForProductionBackend: false;
  readonly routeMountAllowedNow: false;
  readonly runtimeActivationAllowedNow: false;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningSnapshot {
  readonly version: typeof STREAM_FOUNDATION_140C_KERNEL_DIAGNOSTICS_CONTROLLED_BACKEND_ENTRY_PATCH_PLANNING_VERSION;
  readonly status: StreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningStatus;
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly previous140bStatus: string;
  readonly previous140bReady: boolean;
  readonly plannedPatchItems: readonly StreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningItem[];
  readonly plannedPatchItemCount: number;
  readonly totalChecks: number;
  readonly passedChecks: number;
  readonly blockingChecks: number;
  readonly planningReadyNow: boolean;
  readonly readyForControlledBackendEntryPatchOwnerReview: boolean;
  readonly readyForProductionBackend: false;
  readonly streamIndexPatchIncludedNow: false;
  readonly streamModuleIndexTouchedNow: false;
  readonly backendEntryPatchIncludedNow: false;
  readonly appServerPatchIncludedNow: false;
  readonly appServerTouchedNow: false;
  readonly routeMountAllowedNow: false;
  readonly routeMountPerformedNow: false;
  readonly protectedRouteRegisteredNow: false;
  readonly expressRouterCreatedNow: false;
  readonly expressRouterImportedNow: false;
  readonly expressRouterBoundNow: false;
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
  readonly checks: readonly StreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningCheck[];
  readonly decision: StreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningDecision;
  readonly safety: StreamFoundationKernelDiagnosticsControlledBackendEntryPatchPlanningSafety;
}
