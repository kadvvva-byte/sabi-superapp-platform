export const STREAM_FOUNDATION_141O_RATE_LIMIT_GATE_VERSION = "BACKEND-STREAM-FOUNDATION-141O" as const;

export type StreamFoundation141ORateLimitScope =
  | "actor_user_id"
  | "device_session_id"
  | "room_id"
  | "ip_hash_later"
  | "command_id";

export type StreamFoundation141OLiveCommandId =
  | "stream_start_live_session_command"
  | "stream_stop_live_session_command"
  | "stream_live_heartbeat_command";

export type StreamFoundation141ORateLimitStatus =
  | "contract_planned_not_enabled"
  | "runtime_mount_blocked"
  | "owner_approval_required";

export interface StreamFoundation141ORateLimitRule {
  readonly id: string;
  readonly commandId: StreamFoundation141OLiveCommandId;
  readonly scopes: readonly StreamFoundation141ORateLimitScope[];
  readonly status: StreamFoundation141ORateLimitStatus;
  readonly requiredBeforeRuntimeMount: true;
  readonly proposedWindowSeconds: number;
  readonly proposedMaxAttempts: number;
  readonly runtimeEnforcementEnabledNow: false;
  readonly runtimeSuccessAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly description: string;
}

export interface StreamFoundation141ORateLimitGateSnapshot {
  readonly version: typeof STREAM_FOUNDATION_141O_RATE_LIMIT_GATE_VERSION;
  readonly stage: "rate_limit_gate_source_only_contract_planning";
  readonly status: "rate_limit_contract_planned_routes_remain_blocked";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-141N";
  readonly rateLimitRules: readonly StreamFoundation141ORateLimitRule[];
  readonly antiAbusePolicy: {
    readonly startStopHeartbeatMustBeThrottledBeforeRuntime: true;
    readonly perUserAndDeviceScopesRequiredBeforeRuntime: true;
    readonly ipHashScopeAllowedLaterWithoutRawIpExposure: true;
    readonly rawIpStorageAllowedNow: false;
    readonly runtimeEnforcementEnabledNow: false;
    readonly routesStayBlockedNow: true;
    readonly expectedCurrentStatusCode: 423;
  };
  readonly totals: {
    readonly rateLimitRules: 6;
    readonly readyForRuntimeMountNow: 0;
    readonly runtimeEnforcementEnabledNow: 0;
    readonly runtimeSuccessAllowedNow: 0;
    readonly databaseWriteAllowedNow: 0;
    readonly providerCallAllowedNow: 0;
    readonly walletMutationAllowedNow: 0;
    readonly moneyMovementAllowedNow: 0;
    readonly fakeSuccessAllowedNow: 0;
  };
  readonly safety: {
    readonly sourceOnly141O: true;
    readonly appTsChangeBy141O: false;
    readonly serverTsChangeBy141O: false;
    readonly streamIndexChangeBy141O: false;
    readonly backendRestartBy141O: false;
    readonly runtimeHttpBy141O: false;
    readonly runtimePostBy141O: false;
    readonly databaseWriteBy141O: false;
    readonly providerCallBy141O: false;
    readonly walletMutationBy141O: false;
    readonly paymentAuthorizationBy141O: false;
    readonly monthlyPayoutBy141O: false;
    readonly moneyMovementBy141O: false;
    readonly fakeSuccessBy141O: false;
  };
}
