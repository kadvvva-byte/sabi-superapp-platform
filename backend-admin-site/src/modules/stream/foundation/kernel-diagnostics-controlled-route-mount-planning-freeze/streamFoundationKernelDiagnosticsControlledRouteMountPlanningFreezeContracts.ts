import type { StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationStatus } from "../kernel-diagnostics-controlled-route-mount-source-only-post-write-verification";

export const STREAM_FOUNDATION_139T_KERNEL_DIAGNOSTICS_CONTROLLED_ROUTE_MOUNT_PLANNING_FREEZE_VERSION = "BACKEND-STREAM-FOUNDATION-139T" as const;

export type StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeStatus =
  | "controlled_route_mount_planning_freeze_ready_unmounted"
  | "controlled_route_mount_planning_freeze_blocked";

export type StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeArea =
  | "previous_post_write_verification"
  | "runtime_route_source_boundary"
  | "foundation_scope"
  | "stream_index_guard"
  | "app_server_guard"
  | "route_mount_guard"
  | "runtime_http_guard"
  | "data_side_effect_guard"
  | "payment_wallet_guard"
  | "secret_guard"
  | "fake_success_guard"
  | "production_transition_guard";

export interface StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeItem {
  readonly area: StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeArea;
  readonly checkId: string;
  readonly passed: boolean;
  readonly blocking: boolean;
  readonly expected: string;
  readonly observed: string;
  readonly remediation: string;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export type StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeFreezeRecordRole =
  | "foundation_runtime_route_source_frozen"
  | "controlled_mount_boundary_frozen"
  | "stream_index_guard_frozen"
  | "app_server_guard_frozen"
  | "provider_wallet_guard_frozen"
  | "production_transition_guard_frozen";

export interface StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeFreezeRecord {
  readonly role: StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeFreezeRecordRole;
  readonly frozen: true;
  readonly scope: "src/modules/stream/foundation/** only";
  readonly readyForNextControlledRouteConnectionPlanning: boolean;
  readonly readyForProductionRouteMount: false;
  readonly routeMountPerformedNow: false;
  readonly streamIndexPatchIncluded: false;
  readonly appServerPatchIncluded: false;
  readonly safeCode: string;
}

export interface StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeDecision {
  readonly decisionCode:
    | "controlled_route_mount_planning_freeze_ready_for_connection_planning"
    | "controlled_route_mount_planning_freeze_blocked_by_post_write_verification"
    | "controlled_route_mount_planning_freeze_blocked_by_safety_gate";
  readonly planningFreezePassedNow: boolean;
  readonly readyForControlledBackendRouteConnectionPlanning: boolean;
  readonly readyForProductionRouteMount: false;
  readonly routeMountAllowedNow: false;
  readonly routeMountPerformedNow: false;
  readonly runtimeActivationAllowedNow: false;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeSafety {
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly planningFreezeLayerBuiltNow: true;
  readonly postWriteVerificationRequired: true;
  readonly controlledRouteConnectionPlanningRequiredNext: true;
  readonly readyForProductionRouteMount: false;
  readonly routeMountAllowedNow: false;
  readonly routeMountPerformedNow: false;
  readonly protectedRouteRegisteredNow: false;
  readonly expressRouterCreatedNow: false;
  readonly expressRouterImportedNow: false;
  readonly expressRouterBoundNow: false;
  readonly streamIndexPatchIncluded: false;
  readonly streamModuleIndexTouchedNow: false;
  readonly appServerPatchIncluded: false;
  readonly appServerTouchedNow: false;
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

export interface StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeSnapshot {
  readonly version: typeof STREAM_FOUNDATION_139T_KERNEL_DIAGNOSTICS_CONTROLLED_ROUTE_MOUNT_PLANNING_FREEZE_VERSION;
  readonly status: StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeStatus;
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly previousPostWriteVerificationStatus: StreamFoundationKernelDiagnosticsControlledRouteMountSourceOnlyPostWriteVerificationStatus;
  readonly planningFreezePassedNow: boolean;
  readonly freezeRecords: readonly StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeFreezeRecord[];
  readonly freezeRecordCount: number;
  readonly totalChecks: number;
  readonly passedChecks: number;
  readonly blockingChecks: number;
  readonly readyForControlledBackendRouteConnectionPlanning: boolean;
  readonly readyForProductionRouteMount: false;
  readonly routeMountAllowedNow: false;
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
  readonly checks: readonly StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeItem[];
  readonly decision: StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeDecision;
  readonly safety: StreamFoundationKernelDiagnosticsControlledRouteMountPlanningFreezeSafety;
}
