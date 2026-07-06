export const STREAM_FOUNDATION_141B_BINDING_REGISTRY_VERIFICATION_VERSION = "BACKEND-STREAM-FOUNDATION-141B" as const;

export type StreamFoundation141BRouteId = "stream_live_start" | "stream_live_stop" | "stream_live_heartbeat";

export interface StreamFoundation141BRegistryVerificationItem {
  readonly routeId: StreamFoundation141BRouteId;
  readonly plannedPath: string;
  readonly plannedMethod: "POST";
  readonly sourceOnlyBindingPlanPresent: true;
  readonly draftHandlerPresent: true;
  readonly exactApprovalRequired: true;
  readonly expectedBlockedStatusCode: 423;
  readonly appTsMountNow: false;
  readonly serverTsMountNow: false;
  readonly streamIndexExportNow: false;
  readonly runtimePostAllowedNow: false;
  readonly runtimeSmokeAllowedNow: false;
  readonly backendRestartAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly paymentAuthorizationAllowedNow: false;
  readonly monthlyPayoutAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowed: false;
}

export interface StreamFoundation141BRegistryVerificationSnapshot {
  readonly version: typeof STREAM_FOUNDATION_141B_BINDING_REGISTRY_VERIFICATION_VERSION;
  readonly stage: "source_only_binding_registry_verification";
  readonly status: "binding_registry_verified_runtime_mount_blocked";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-141A";
  readonly verificationItems: readonly StreamFoundation141BRegistryVerificationItem[];
  readonly totals: {
    readonly verifiedBindings: 3;
    readonly draftHandlersPresent: 3;
    readonly exactApprovalRequired: 3;
    readonly runtimeMountAllowedNow: 0;
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
    readonly runtimeHttpBy141B: false;
    readonly runtimePostBy141B: false;
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
