/**
 * BACKEND-STREAM-FOUNDATION-151C
 * Source-only handoff metadata for Stream realtime/media lifecycle foundation.
 */

export const streamRealtimeMediaLifecycleHandoff151C = Object.freeze({
  version: "BACKEND-STREAM-FOUNDATION-151C",
  mode: "source_only_core_scaffold",
  files: [
    "streamRealtimeMediaLifecycleContracts151C.ts",
    "streamRealtimeMediaLifecycleService151C.ts",
    "streamRealtimeMediaLifecycleHandoff151C.ts",
  ],
  safeDisabledContract: {
    providerStatus: "provider_not_configured",
    runtimeEnabled: false,
    providerCallAllowedNow: false,
    providerBindingAllowedNow: false,
    providerCredentialReadAllowedNow: false,
    providerTokenIssueAllowedNow: false,
    mediaRoomCreateAllowedNow: false,
    realtimeGatewayStartAllowedNow: false,
    recordingStartAllowedNow: false,
    databaseWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowedNow: false,
  },
  forbiddenRuntimeActions: [
    "route_mount",
    "runtime_start",
    "provider_call",
    "provider_binding",
    "credential_read",
    "token_issue",
    "media_room_create",
    "realtime_gateway_start",
    "recording_start",
    "database_write",
    "wallet_mutation",
    "money_movement",
    "fake_success",
  ],
});
