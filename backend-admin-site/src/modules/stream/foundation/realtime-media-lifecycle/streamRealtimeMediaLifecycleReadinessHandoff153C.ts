/**
 * BACKEND-STREAM-FOUNDATION-153C
 * Source-only readiness route handoff metadata.
 */

export const streamRealtimeMediaLifecycleReadinessHandoff153C = Object.freeze({
  version: "BACKEND-STREAM-FOUNDATION-153C",
  mode: "source_only_read_only_route_factory",
  files: [
    "streamRealtimeMediaLifecycleReadinessService153C.ts",
    "streamRealtimeMediaLifecycleReadinessRoute153C.ts",
    "streamRealtimeMediaLifecycleReadinessHandoff153C.ts",
  ],
  route: {
    method: "GET",
    path: "/stream/realtime-media-lifecycle/readiness",
    futureFullAdminPathIfMountedLater: "/api/admin/stream/realtime-media-lifecycle/readiness",
    routeMountedNow: false,
    readOnly: true,
  },
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
  forbiddenNow: [
    "route_mount",
    "backend_restart",
    "runtime_smoke",
    "protected_api_fetch",
    "provider_call",
    "provider_binding",
    "credential_read",
    "token_issue",
    "media_room_create",
    "realtime_gateway_start",
    "recording_start",
    "database_read_write",
    "wallet_mutation",
    "money_movement",
    "admin_ui_patch",
    "mobile_touch",
    "fake_success",
  ],
});
