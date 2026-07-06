export const STREAM_FOUNDATION_141R_REALTIME_PROVIDER_READINESS_VERSION = "BACKEND-STREAM-FOUNDATION-141R" as const;

export type StreamFoundation141RProviderContractId =
  | "realtime_room_provider_manifest"
  | "media_session_provider_manifest"
  | "provider_secret_server_side_gate"
  | "provider_health_readiness_gate"
  | "provider_region_policy_gate"
  | "provider_fallback_disabled_gate"
  | "provider_runtime_owner_approval";

export type StreamFoundation141RProviderStatus =
  | "contract_planned_not_configured"
  | "provider_not_configured"
  | "server_side_secret_required"
  | "owner_approval_required"
  | "runtime_mount_blocked";

export interface StreamFoundation141RProviderReadinessContract {
  readonly id: StreamFoundation141RProviderContractId;
  readonly status: StreamFoundation141RProviderStatus;
  readonly requiredBeforeRuntimeMount: true;
  readonly serverSideOnly: true;
  readonly mobileSecretAllowed: false;
  readonly providerCallAllowedNow: false;
  readonly providerLiveAllowedNow: false;
  readonly fakeProviderSuccessAllowedNow: false;
  readonly runtimeSuccessAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly description: string;
}

export interface StreamFoundation141RRealtimeProviderReadinessSnapshot {
  readonly version: typeof STREAM_FOUNDATION_141R_REALTIME_PROVIDER_READINESS_VERSION;
  readonly stage: "realtime_provider_readiness_gate_source_only_contract_planning";
  readonly status: "realtime_provider_contract_planned_routes_remain_blocked";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-141Q";
  readonly providerContracts: readonly StreamFoundation141RProviderReadinessContract[];
  readonly providerPolicy: {
    readonly realtimeProviderRequiredBeforeRuntimeMount: true;
    readonly mediaSessionProviderRequiredBeforeRuntimeMount: true;
    readonly providerSecretsServerSideOnly: true;
    readonly mobileProviderSecretsAllowed: false;
    readonly fakeProviderFallbackAllowed: false;
    readonly providerLiveAllowedNow: false;
    readonly providerCallAllowedNow: false;
    readonly routesStayBlockedNow: true;
    readonly expectedCurrentStatusCode: 423;
  };
  readonly totals: {
    readonly providerContracts: 7;
    readonly readyForRuntimeMountNow: 0;
    readonly providerConfiguredNow: 0;
    readonly providerCallAllowedNow: 0;
    readonly providerLiveAllowedNow: 0;
    readonly fakeProviderSuccessAllowedNow: 0;
    readonly runtimeSuccessAllowedNow: 0;
    readonly databaseWriteAllowedNow: 0;
    readonly walletMutationAllowedNow: 0;
    readonly moneyMovementAllowedNow: 0;
    readonly fakeSuccessAllowedNow: 0;
  };
  readonly safety: {
    readonly sourceOnly141R: true;
    readonly appTsChangeBy141R: false;
    readonly serverTsChangeBy141R: false;
    readonly streamIndexChangeBy141R: false;
    readonly backendRestartBy141R: false;
    readonly runtimeHttpBy141R: false;
    readonly runtimePostBy141R: false;
    readonly databaseWriteBy141R: false;
    readonly providerCallBy141R: false;
    readonly providerSecretReadBy141R: false;
    readonly walletMutationBy141R: false;
    readonly paymentAuthorizationBy141R: false;
    readonly monthlyPayoutBy141R: false;
    readonly moneyMovementBy141R: false;
    readonly fakeSuccessBy141R: false;
  };
}
