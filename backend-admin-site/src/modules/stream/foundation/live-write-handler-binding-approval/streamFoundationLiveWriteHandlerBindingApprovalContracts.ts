export const STREAM_FOUNDATION_140Z_LIVE_WRITE_HANDLER_BINDING_APPROVAL_VERSION = "BACKEND-STREAM-FOUNDATION-140Z" as const;

export type StreamFoundation140ZBindingTarget =
  | "stream_live_start"
  | "stream_live_stop"
  | "stream_live_heartbeat";

export type StreamFoundation140ZApprovalStatus =
  | "source_only_verified"
  | "binding_plan_ready"
  | "runtime_mount_blocked_requires_exact_owner_approval";

export interface StreamFoundation140ZHandlerVerificationItem {
  readonly target: StreamFoundation140ZBindingTarget;
  readonly draftHandlerExport: string;
  readonly commandId: string;
  readonly expectedBlockedStatusCode: 423;
  readonly expectedOk: false;
  readonly runtimeMountedNow: false;
  readonly runtimePostAllowedNow: false;
  readonly databaseWritePerformed: 0;
  readonly providerCallPerformed: 0;
  readonly walletMutationPerformed: 0;
  readonly paymentAuthorizationPerformed: 0;
  readonly monthlyPayoutPerformed: 0;
  readonly moneyMovementPerformed: 0;
  readonly fakeSuccessAllowed: false;
  readonly status: StreamFoundation140ZApprovalStatus;
}

export interface StreamFoundation140ZRouteBindingApprovalItem {
  readonly routeId: StreamFoundation140ZBindingTarget;
  readonly plannedMethod: "POST";
  readonly plannedPath: string;
  readonly plannedHandlerExport: string;
  readonly bindingSourceReady: true;
  readonly appRouteMountAllowedNow: false;
  readonly serverRouteMountAllowedNow: false;
  readonly streamIndexExportAllowedNow: false;
  readonly runtimeSmokeAllowedNow: false;
  readonly requiresExactOwnerApprovalBeforeMount: true;
  readonly requiredApprovalText: string;
}

export interface StreamFoundation140ZLiveWriteBindingApprovalSnapshot {
  readonly version: typeof STREAM_FOUNDATION_140Z_LIVE_WRITE_HANDLER_BINDING_APPROVAL_VERSION;
  readonly stage: "live_write_handler_source_only_verification_and_route_binding_approval";
  readonly status: "binding_approval_ready_runtime_mount_blocked";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-140Y";
  readonly handlerDraftsVerified: true;
  readonly verificationItems: readonly StreamFoundation140ZHandlerVerificationItem[];
  readonly bindingApprovalItems: readonly StreamFoundation140ZRouteBindingApprovalItem[];
  readonly totals: {
    readonly verifiedHandlers: 3;
    readonly bindingPlans: 3;
    readonly runtimeMountAllowedNow: 0;
    readonly runtimePostAllowedNow: 0;
    readonly databaseWritePerformed: 0;
    readonly providerCallPerformed: 0;
    readonly walletMutationPerformed: 0;
    readonly moneyMovementPerformed: 0;
    readonly fakeSuccessAllowed: 0;
  };
  readonly safety: {
    readonly sourceOnly: true;
    readonly appTsChange: false;
    readonly serverTsChange: false;
    readonly streamIndexChange: false;
    readonly routeMountNow: false;
    readonly runtimeHttpBy140Z: false;
    readonly runtimePostBy140Z: false;
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
