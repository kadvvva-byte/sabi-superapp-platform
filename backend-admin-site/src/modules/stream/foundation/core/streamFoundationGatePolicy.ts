import type {
  StreamFoundationAction,
  StreamFoundationGateId,
  StreamFoundationGateSnapshot,
  StreamFoundationGateStatus,
  StreamFoundationMobileAction,
  StreamFoundationSafeCode,
  StreamFoundationSeverity,
  StreamFoundationSurface,
} from "./streamFoundationCoreTypes";

export type StreamFoundationActionPolicy = Readonly<{
  action: StreamFoundationAction;
  sourceOnlyLocalPreviewAllowed: boolean;
  requiredGates: readonly StreamFoundationGateId[];
  blockedBy: StreamFoundationGateStatus;
  safeCode: StreamFoundationSafeCode;
  mobileAction: StreamFoundationMobileAction;
  severity: StreamFoundationSeverity;
  safeMessageKey: string;
}>;

const BACKEND_GATES: readonly StreamFoundationGateId[] = [
  "identity_session_gate",
  "locale_error_gate",
  "stream_kernel_gateway_gate",
  "observability_audit_gate",
];

const LIVE_GATES: readonly StreamFoundationGateId[] = [
  ...BACKEND_GATES,
  "realtime_room_gate",
  "live_lifecycle_gate",
  "media_storage_cdn_gate",
];

const SHORTS_GATES: readonly StreamFoundationGateId[] = [
  ...BACKEND_GATES,
  "media_storage_cdn_gate",
  "shorts_moderation_feed_gate",
];

const ADMIN_GATES: readonly StreamFoundationGateId[] = [
  ...BACKEND_GATES,
  "moderation_admin_gate",
  "launch_readiness_gate",
];

const PROVIDER_GATES: readonly StreamFoundationGateId[] = [
  ...BACKEND_GATES,
  "provider_secret_gate",
  "media_storage_cdn_gate",
];

const PAYMENT_MONETIZATION_GATES: readonly StreamFoundationGateId[] = [
  ...BACKEND_GATES,
  "wallet_coin_gift_last_stage_gate",
  "provider_secret_gate",
  "launch_readiness_gate",
];

const policy = (
  action: StreamFoundationAction,
  sourceOnlyLocalPreviewAllowed: boolean,
  requiredGates: readonly StreamFoundationGateId[],
  blockedBy: StreamFoundationGateStatus,
  safeCode: StreamFoundationSafeCode,
  mobileAction: StreamFoundationMobileAction,
  severity: StreamFoundationSeverity,
  safeMessageKey: string,
): StreamFoundationActionPolicy => ({
  action,
  sourceOnlyLocalPreviewAllowed,
  requiredGates,
  blockedBy,
  safeCode,
  mobileAction,
  severity,
  safeMessageKey,
});

export const STREAM_FOUNDATION_ACTION_POLICIES: readonly StreamFoundationActionPolicy[] = [
  policy("open_surface", true, ["locale_error_gate", "stream_kernel_gateway_gate"], "ready_for_source_only_planning", "STREAM_SOURCE_ONLY_PREVIEW_ALLOWED", "allow_local_preview_only", "info", "stream.foundation.source_only.preview_allowed"),
  policy("prepare_live_draft", true, ["locale_error_gate", "stream_kernel_gateway_gate"], "ready_for_source_only_planning", "STREAM_SOURCE_ONLY_PREVIEW_ALLOWED", "allow_local_preview_only", "info", "stream.foundation.source_only.live_draft_allowed"),
  policy("prepare_short_draft", true, ["locale_error_gate", "stream_kernel_gateway_gate"], "ready_for_source_only_planning", "STREAM_SOURCE_ONLY_PREVIEW_ALLOWED", "allow_local_preview_only", "info", "stream.foundation.source_only.short_draft_allowed"),
  policy("request_creator_verification", true, ["identity_session_gate", "creator_business_verification_gate", "moderation_admin_gate"], "blocked_admin_gate_missing", "STREAM_ADMIN_GATE_REQUIRED", "show_review_required_state", "review_required", "stream.foundation.admin_gate.creator_verification_required"),
  policy("start_live", false, LIVE_GATES, "blocked_backend_common_missing", "STREAM_BACKEND_COMMON_FOUNDATION_MISSING", "show_blocked_state", "blocked", "stream.foundation.backend_required.start_live"),
  policy("stop_live", false, LIVE_GATES, "blocked_backend_common_missing", "STREAM_BACKEND_COMMON_FOUNDATION_MISSING", "show_blocked_state", "blocked", "stream.foundation.backend_required.stop_live"),
  policy("join_live", false, LIVE_GATES, "blocked_backend_common_missing", "STREAM_BACKEND_COMMON_FOUNDATION_MISSING", "show_blocked_state", "blocked", "stream.foundation.backend_required.join_live"),
  policy("send_live_heartbeat", false, LIVE_GATES, "blocked_backend_common_missing", "STREAM_BACKEND_COMMON_FOUNDATION_MISSING", "show_blocked_state", "blocked", "stream.foundation.backend_required.live_heartbeat"),
  policy("upload_short_media", false, PROVIDER_GATES, "blocked_provider_not_configured", "STREAM_PROVIDER_NOT_CONFIGURED", "show_provider_not_configured_state", "blocked", "stream.foundation.provider_required.short_upload"),
  policy("publish_short", false, SHORTS_GATES, "blocked_backend_common_missing", "STREAM_BACKEND_COMMON_FOUNDATION_MISSING", "show_blocked_state", "blocked", "stream.foundation.backend_required.publish_short"),
  policy("load_shorts_feed", false, SHORTS_GATES, "blocked_backend_common_missing", "STREAM_BACKEND_COMMON_FOUNDATION_MISSING", "show_blocked_state", "blocked", "stream.foundation.backend_required.shorts_feed"),
  policy("report_content", false, ADMIN_GATES, "blocked_admin_gate_missing", "STREAM_ADMIN_GATE_REQUIRED", "show_review_required_state", "review_required", "stream.foundation.admin_gate.report_content"),
  policy("load_playback_analytics", false, BACKEND_GATES, "blocked_backend_common_missing", "STREAM_BACKEND_COMMON_FOUNDATION_MISSING", "show_blocked_state", "blocked", "stream.foundation.backend_required.analytics"),
  policy("request_business_product_attach", false, ["identity_session_gate", "business_merchant_catalog_gate", "creator_business_verification_gate", "moderation_admin_gate"], "blocked_admin_gate_missing", "STREAM_ADMIN_GATE_REQUIRED", "show_review_required_state", "review_required", "stream.foundation.admin_gate.business_product_attach"),
  policy("request_gift_send", false, PAYMENT_MONETIZATION_GATES, "blocked_provider_not_configured", "STREAM_PROVIDER_NOT_CONFIGURED", "show_provider_not_configured_state", "blocked", "stream.foundation.payment_monetization.provider_required"),
] as const;

export const STREAM_FOUNDATION_SURFACE_ACTIONS: Readonly<Record<StreamFoundationSurface, readonly StreamFoundationAction[]>> = {
  stream_entry: ["open_surface"],
  live_composer: ["open_surface", "prepare_live_draft"],
  live_single: ["start_live", "stop_live", "join_live", "send_live_heartbeat", "request_gift_send"],
  live_group: ["start_live", "stop_live", "join_live", "send_live_heartbeat", "request_gift_send"],
  live_audio: ["start_live", "stop_live", "join_live", "send_live_heartbeat", "request_gift_send"],
  live_game_screen: ["start_live", "stop_live", "join_live", "send_live_heartbeat", "request_gift_send"],
  live_video_file: ["start_live", "stop_live", "join_live", "send_live_heartbeat", "request_gift_send"],
  shorts_creator: ["open_surface", "prepare_short_draft", "upload_short_media", "publish_short"],
  shorts_feed: ["load_shorts_feed"],
  business_stream: ["request_business_product_attach", "start_live", "stop_live", "request_gift_send"],
  creator_profile: ["open_surface", "request_creator_verification"],
  moderation_admin: ["report_content"],
  playback_analytics: ["load_playback_analytics"],
  wallet_gift_boundary: ["request_gift_send"],
};

export function getStreamFoundationActionPolicy(action: StreamFoundationAction): StreamFoundationActionPolicy | undefined {
  return STREAM_FOUNDATION_ACTION_POLICIES.find((entry) => entry.action === action);
}

export function isStreamFoundationActionAllowedForSurface(surface: StreamFoundationSurface, action: StreamFoundationAction): boolean {
  return STREAM_FOUNDATION_SURFACE_ACTIONS[surface].includes(action);
}

export function createStreamFoundationGateSnapshot(
  gateId: StreamFoundationGateId,
  status: StreamFoundationGateStatus,
): StreamFoundationGateSnapshot {
  const severity: StreamFoundationSeverity = status === "ready_for_source_only_planning"
    ? "info"
    : status === "locked_last_stage_boundary"
      ? "locked"
      : status === "blocked_admin_gate_missing"
        ? "review_required"
        : "blocked";

  return {
    gateId,
    status,
    severity,
    reasonKey: `stream.foundation.gate.${gateId}.${status}`,
    requiredBeforeExecution: true,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
  };
}
