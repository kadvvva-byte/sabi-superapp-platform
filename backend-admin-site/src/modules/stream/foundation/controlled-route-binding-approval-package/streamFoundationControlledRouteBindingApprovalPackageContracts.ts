export const STREAM_FOUNDATION_141C_ROUTE_BINDING_APPROVAL_PACKAGE_VERSION = "BACKEND-STREAM-FOUNDATION-141C" as const;

export type StreamFoundation141CRouteId = "stream_live_start" | "stream_live_stop" | "stream_live_heartbeat";

export interface StreamFoundation141CApprovalItem {
  readonly routeId: StreamFoundation141CRouteId;
  readonly plannedPath: string;
  readonly plannedMethod: "POST";
  readonly previousVerificationStage: "BACKEND-STREAM-FOUNDATION-141B";
  readonly approvalPackageReady: true;
  readonly exactApprovalRequired: true;
  readonly appTsPatchAllowedBy141C: false;
  readonly serverTsPatchAllowedBy141C: false;
  readonly streamIndexPatchAllowedBy141C: false;
  readonly routeMountAllowedBy141C: false;
  readonly runtimePostAllowedBy141C: false;
  readonly runtimeSmokeAllowedBy141C: false;
  readonly backendRestartAllowedBy141C: false;
  readonly databaseWriteAllowedBy141C: false;
  readonly providerCallAllowedBy141C: false;
  readonly walletMutationAllowedBy141C: false;
  readonly paymentAuthorizationAllowedBy141C: false;
  readonly monthlyPayoutAllowedBy141C: false;
  readonly moneyMovementAllowedBy141C: false;
  readonly fakeSuccessAllowedBy141C: false;
  readonly requiredApprovalText: string;
}

export interface StreamFoundation141CApprovalPackageSnapshot {
  readonly version: typeof STREAM_FOUNDATION_141C_ROUTE_BINDING_APPROVAL_PACKAGE_VERSION;
  readonly stage: "controlled_route_binding_source_only_approval_package";
  readonly status: "approval_package_ready_no_runtime_binding";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-141B";
  readonly approvalItems: readonly StreamFoundation141CApprovalItem[];
  readonly totals: {
    readonly approvalItems: 3;
    readonly exactApprovalRequired: 3;
    readonly appTsPatchAllowedBy141C: 0;
    readonly serverTsPatchAllowedBy141C: 0;
    readonly streamIndexPatchAllowedBy141C: 0;
    readonly routeMountAllowedBy141C: 0;
    readonly runtimePostAllowedBy141C: 0;
    readonly runtimeSmokeAllowedBy141C: 0;
    readonly backendRestartAllowedBy141C: 0;
    readonly databaseWriteAllowedBy141C: 0;
    readonly providerCallAllowedBy141C: 0;
    readonly walletMutationAllowedBy141C: 0;
    readonly moneyMovementAllowedBy141C: 0;
    readonly fakeSuccessAllowedBy141C: 0;
  };
  readonly safety: {
    readonly sourceOnly: true;
    readonly appTsChange: false;
    readonly serverTsChange: false;
    readonly streamIndexChange: false;
    readonly routeMountNow: false;
    readonly runtimeHttpBy141C: false;
    readonly runtimePostBy141C: false;
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
