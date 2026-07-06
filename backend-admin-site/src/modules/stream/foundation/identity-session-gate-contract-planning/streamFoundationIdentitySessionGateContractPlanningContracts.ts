export const STREAM_FOUNDATION_141N_IDENTITY_SESSION_GATE_VERSION = "BACKEND-STREAM-FOUNDATION-141N" as const;

export type StreamFoundation141NIdentityGateStatus =
  | "contract_planned_not_enabled"
  | "runtime_mount_blocked"
  | "owner_approval_required";

export type StreamFoundation141NLiveCommandId =
  | "stream_start_live_session_command"
  | "stream_stop_live_session_command"
  | "stream_live_heartbeat_command";

export interface StreamFoundation141NIdentityRule {
  readonly id: string;
  readonly requiredBeforeRuntimeMount: true;
  readonly status: StreamFoundation141NIdentityGateStatus;
  readonly runtimeSuccessAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly description: string;
}

export interface StreamFoundation141NCommandIdentityContract {
  readonly commandId: StreamFoundation141NLiveCommandId;
  readonly unifiedUserIdRequiredBeforeRuntime: true;
  readonly deviceSessionRequiredBeforeRuntime: true;
  readonly authenticatedActorRequiredBeforeRuntime: true;
  readonly anonymousRuntimeAllowedNow: false;
  readonly mismatchedModuleUserIdAllowedNow: false;
  readonly adminBypassAllowedNow: false;
  readonly runtimeSuccessAllowedNow: false;
  readonly expectedCurrentStatusCode: 423;
}

export interface StreamFoundation141NIdentitySessionGateSnapshot {
  readonly version: typeof STREAM_FOUNDATION_141N_IDENTITY_SESSION_GATE_VERSION;
  readonly stage: "identity_session_gate_source_only_contract_planning";
  readonly status: "identity_session_contract_planned_routes_remain_blocked";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-141M";
  readonly identityRules: readonly StreamFoundation141NIdentityRule[];
  readonly commandContracts: readonly StreamFoundation141NCommandIdentityContract[];
  readonly unifiedIdentityPolicy: {
    readonly unifiedUserIdRequired: true;
    readonly messengerAndStreamUserIdMustMatchBeforeRuntime: true;
    readonly giftAndStreamIdentityMustUseSameUserIdLater: true;
    readonly displayNameIsNotPrimaryIdentity: true;
    readonly anonymousLiveRuntimeAllowedNow: false;
    readonly mismatchedIdentityAllowedNow: false;
  };
  readonly currentRouteFreeze: {
    readonly routesStayBlocked: true;
    readonly expectedCurrentStatusCode: 423;
    readonly runtimeSuccessAllowedNow: false;
    readonly fakeSuccessAllowedNow: false;
  };
  readonly totals: {
    readonly identityRules: 8;
    readonly commandContracts: 3;
    readonly readyForRuntimeMountNow: 0;
    readonly runtimeSuccessAllowedNow: 0;
    readonly databaseWriteAllowedNow: 0;
    readonly providerCallAllowedNow: 0;
    readonly walletMutationAllowedNow: 0;
    readonly moneyMovementAllowedNow: 0;
    readonly fakeSuccessAllowedNow: 0;
  };
  readonly safety: {
    readonly sourceOnly141N: true;
    readonly appTsChangeBy141N: false;
    readonly serverTsChangeBy141N: false;
    readonly streamIndexChangeBy141N: false;
    readonly backendRestartBy141N: false;
    readonly runtimeHttpBy141N: false;
    readonly runtimePostBy141N: false;
    readonly databaseWriteBy141N: false;
    readonly providerCallBy141N: false;
    readonly walletMutationBy141N: false;
    readonly paymentAuthorizationBy141N: false;
    readonly monthlyPayoutBy141N: false;
    readonly moneyMovementBy141N: false;
    readonly fakeSuccessBy141N: false;
  };
}
