export const STREAM_FOUNDATION_140X_LIVE_WRITE_HANDLER_SOURCE_PLAN_VERSION = "BACKEND-STREAM-FOUNDATION-140X" as const;

export type StreamFoundation140XLiveWriteCommandId =
  | "stream_start_live_session_command"
  | "stream_stop_live_session_command"
  | "stream_live_heartbeat_command";

export type StreamFoundation140XLiveWriteRouteId =
  | "stream_live_start"
  | "stream_live_stop"
  | "stream_live_heartbeat";

export type StreamFoundation140XLiveWritePlanStatus =
  | "source_plan_ready_runtime_blocked"
  | "blocked_until_identity_session_gate"
  | "blocked_until_realtime_provider_gate"
  | "blocked_until_repository_gate"
  | "blocked_until_owner_runtime_mount_approval";

export interface StreamFoundation140XLiveWriteHandlerPlanItem {
  readonly id: string;
  readonly routeId: StreamFoundation140XLiveWriteRouteId;
  readonly commandId: StreamFoundation140XLiveWriteCommandId;
  readonly title: string;
  readonly plannedMethod: "POST";
  readonly plannedPath: string;
  readonly status: StreamFoundation140XLiveWritePlanStatus;
  readonly sourcePlanReady: true;
  readonly runtimeMountedNow: false;
  readonly runtimePostAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly paymentAuthorizationAllowedNow: false;
  readonly monthlyPayoutAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowed: false;
  readonly requiredInputFields: readonly string[];
  readonly requiredGatesBeforeRuntime: readonly string[];
  readonly safeFailureCodes: readonly string[];
  readonly auditEventPlan: readonly string[];
}

export interface StreamFoundation140XLiveWriteHandlerSourcePlanSnapshot {
  readonly version: typeof STREAM_FOUNDATION_140X_LIVE_WRITE_HANDLER_SOURCE_PLAN_VERSION;
  readonly stage: "live_write_handler_source_plan_only";
  readonly status: "live_write_handler_plan_ready_runtime_blocked";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-140W";
  readonly writeRouteApprovalGatePassed: true;
  readonly liveWriteHandlers: readonly StreamFoundation140XLiveWriteHandlerPlanItem[];
  readonly totals: {
    readonly totalLiveWriteHandlers: number;
    readonly runtimeMountedNow: 0;
    readonly runtimePostAllowedNow: 0;
    readonly databaseWriteAllowedNow: 0;
    readonly providerCallAllowedNow: 0;
    readonly walletMutationAllowedNow: 0;
    readonly moneyMovementAllowedNow: 0;
    readonly fakeSuccessAllowed: 0;
  };
  readonly safety: {
    readonly sourceOnly: true;
    readonly appTsChange: false;
    readonly serverTsChange: false;
    readonly streamIndexChange: false;
    readonly routeMountNow: false;
    readonly runtimePostBy140X: false;
    readonly backendRestart: false;
    readonly databaseWrite: false;
    readonly providerCall: false;
    readonly walletMutation: false;
    readonly paymentAuthorization: false;
    readonly monthlyPayout: false;
    readonly moneyMovement: false;
    readonly fakeSuccess: false;
  };
}
