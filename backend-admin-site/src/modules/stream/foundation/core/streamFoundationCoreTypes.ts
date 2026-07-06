export type StreamFoundationCoreStage =
  | "BACKEND_STREAM_FOUNDATION_CORE_STAGING"
  | "BACKEND_STREAM_FOUNDATION_RUNTIME_LATER";

export type StreamFoundationSurface =
  | "stream_entry"
  | "live_composer"
  | "live_single"
  | "live_group"
  | "live_audio"
  | "live_game_screen"
  | "live_video_file"
  | "shorts_creator"
  | "shorts_feed"
  | "business_stream"
  | "creator_profile"
  | "moderation_admin"
  | "playback_analytics"
  | "wallet_gift_boundary";

export type StreamFoundationAction =
  | "open_surface"
  | "prepare_live_draft"
  | "start_live"
  | "stop_live"
  | "join_live"
  | "send_live_heartbeat"
  | "prepare_short_draft"
  | "upload_short_media"
  | "publish_short"
  | "load_shorts_feed"
  | "report_content"
  | "load_playback_analytics"
  | "request_business_product_attach"
  | "request_creator_verification"
  | "request_gift_send";

export type StreamFoundationGateId =
  | "identity_session_gate"
  | "locale_error_gate"
  | "stream_kernel_gateway_gate"
  | "realtime_room_gate"
  | "live_lifecycle_gate"
  | "media_storage_cdn_gate"
  | "shorts_moderation_feed_gate"
  | "moderation_admin_gate"
  | "creator_business_verification_gate"
  | "business_merchant_catalog_gate"
  | "provider_secret_gate"
  | "observability_audit_gate"
  | "notification_qr_deeplink_gate"
  | "wallet_coin_gift_last_stage_gate"
  | "launch_readiness_gate";

export type StreamFoundationGateStatus =
  | "ready_for_source_only_planning"
  | "blocked_backend_common_missing"
  | "blocked_admin_gate_missing"
  | "blocked_provider_not_configured"
  | "locked_last_stage_boundary";

export type StreamFoundationSeverity = "info" | "review_required" | "blocked" | "locked";

export type StreamFoundationMobileAction =
  | "allow_local_preview_only"
  | "show_blocked_state"
  | "show_review_required_state"
  | "show_provider_not_configured_state"
  | "show_locked_last_stage_state";

export type StreamFoundationSafeCode =
  | "STREAM_SOURCE_ONLY_PREVIEW_ALLOWED"
  | "STREAM_BACKEND_COMMON_FOUNDATION_MISSING"
  | "STREAM_ADMIN_GATE_REQUIRED"
  | "STREAM_PROVIDER_NOT_CONFIGURED"
  | "STREAM_WALLET_GIFT_LAST_STAGE_LOCKED"
  | "STREAM_UNKNOWN_ACTION_BLOCKED";

export type StreamFoundationGateSnapshot = Readonly<{
  gateId: StreamFoundationGateId;
  status: StreamFoundationGateStatus;
  severity: StreamFoundationSeverity;
  reasonKey: string;
  requiredBeforeExecution: true;
  routeMountAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
}>;

export type StreamFoundationRequestEnvelope = Readonly<{
  requestId: string;
  stage: StreamFoundationCoreStage;
  surface: StreamFoundationSurface;
  action: StreamFoundationAction;
  userId?: string;
  sessionId?: string;
  locale?: string;
  ownerScope?: "user" | "creator" | "business" | "admin";
  idempotencyKey?: string;
  clientCreatedAt?: string;
  metadata?: Readonly<Record<string, string | number | boolean | null>>;
}>;

export type StreamFoundationResponseEnvelope = Readonly<{
  ok: boolean;
  safeCode: StreamFoundationSafeCode;
  safeMessageKey: string;
  severity: StreamFoundationSeverity;
  mobileAction: StreamFoundationMobileAction;
  request: Readonly<{
    requestId: string;
    surface: StreamFoundationSurface;
    action: StreamFoundationAction;
  }>;
  gates: readonly StreamFoundationGateSnapshot[];
  safety: StreamFoundationSafetySnapshot;
}>;

export type StreamFoundationSafetySnapshot = Readonly<{
  sourceOnlyNow: true;
  routeMountAllowedNow: false;
  runtimeExecutionAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  walletRuntimeMutationAllowedNow: false;
  messengerRuntimeMutationAllowedNow: false;
  giftsPaymentsRuntimeMutationAllowedNow: false;
  fakeLiveAllowed: false;
  fakeUploadAllowed: false;
  fakePublishAllowed: false;
  fakePlaybackAllowed: false;
  fakeAnalyticsAllowed: false;
  fakeModerationAllowed: false;
  fakePaymentAllowed: false;
  fakeGiftAllowed: false;
  secretMaterialAllowedInResponse: false;
}>;

export const STREAM_FOUNDATION_SAFE_SNAPSHOT: StreamFoundationSafetySnapshot = {
  sourceOnlyNow: true,
  routeMountAllowedNow: false,
  runtimeExecutionAllowedNow: false,
  databaseWriteAllowedNow: false,
  providerCallAllowedNow: false,
  walletRuntimeMutationAllowedNow: false,
  messengerRuntimeMutationAllowedNow: false,
  giftsPaymentsRuntimeMutationAllowedNow: false,
  fakeLiveAllowed: false,
  fakeUploadAllowed: false,
  fakePublishAllowed: false,
  fakePlaybackAllowed: false,
  fakeAnalyticsAllowed: false,
  fakeModerationAllowed: false,
  fakePaymentAllowed: false,
  fakeGiftAllowed: false,
  secretMaterialAllowedInResponse: false,
};
