import type {
  StreamFoundationAction,
  StreamFoundationGateId,
  StreamFoundationSafeCode,
  StreamFoundationSeverity,
  StreamFoundationSurface,
} from "../core";
import { STREAM_FOUNDATION_SAFE_SNAPSHOT, type StreamFoundationSafetySnapshot } from "../core";
import type { StreamFoundationWriteCommandId } from "../write-models";

export type StreamFoundationDomainEventStage = "BACKEND_STREAM_FOUNDATION_136J_DOMAIN_EVENTS_STAGING";

export type StreamFoundationDomainEventId =
  | "stream_live_session_requested_event"
  | "stream_live_session_stop_requested_event"
  | "stream_live_heartbeat_received_event"
  | "stream_short_media_upload_requested_event"
  | "stream_short_publish_requested_event"
  | "stream_content_report_received_event"
  | "stream_business_product_attach_requested_event"
  | "stream_creator_verification_requested_event"
  | "stream_playback_analytics_requested_event"
  | "stream_gift_send_boundary_requested_event"
  | "stream_launch_readiness_review_required_event";

export type StreamFoundationDomainEventKind =
  | "live_lifecycle"
  | "live_presence"
  | "shorts_media"
  | "shorts_publish"
  | "moderation"
  | "business_catalog"
  | "creator_verification"
  | "analytics"
  | "wallet_gift_boundary"
  | "launch_readiness";

export type StreamFoundationDomainEventStatus =
  | "source_only_contract_ready"
  | "blocked_backend_common_missing"
  | "blocked_admin_gate_missing"
  | "blocked_provider_not_configured"
  | "locked_wallet_gift_last_stage";

export type StreamFoundationDomainEventFieldKind = "string" | "number" | "boolean" | "string_array" | "object_reference";

export type StreamFoundationDomainEventField = Readonly<{
  name: string;
  kind: StreamFoundationDomainEventFieldKind;
  requiredLater: boolean;
  piiAllowedInStagingNow: false;
  secretMaterialAllowedNow: false;
}>;

export type StreamFoundationDomainEventContract = Readonly<{
  stage: StreamFoundationDomainEventStage;
  eventId: StreamFoundationDomainEventId;
  kind: StreamFoundationDomainEventKind;
  sourceCommandIds: readonly StreamFoundationWriteCommandId[];
  sourceSurfaces: readonly StreamFoundationSurface[];
  sourceActions: readonly StreamFoundationAction[];
  status: StreamFoundationDomainEventStatus;
  safeCode: StreamFoundationSafeCode;
  severity: StreamFoundationSeverity;
  safeMessageKey: string;
  requiredGates: readonly StreamFoundationGateId[];
  payloadFields: readonly StreamFoundationDomainEventField[];
  eventBusPublishAllowedNow: false;
  realtimeBroadcastAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  mediaStorageWriteAllowedNow: false;
  externalNetworkAllowedNow: false;
  walletRuntimeMutationAllowedNow: false;
  messengerRuntimeMutationAllowedNow: false;
  giftsPaymentsRuntimeMutationAllowedNow: false;
  fakeLiveAllowed: false;
  fakeUploadAllowed: false;
  fakePublishAllowed: false;
  fakeAnalyticsAllowed: false;
  fakeModerationAllowed: false;
  fakeGiftAllowed: false;
  fakeSuccessAllowed: false;
  secretMaterialAllowedInEventNow: false;
  safety: StreamFoundationSafetySnapshot;
}>;

const backendGates: readonly StreamFoundationGateId[] = [
  "identity_session_gate",
  "locale_error_gate",
  "stream_kernel_gateway_gate",
  "observability_audit_gate",
];

const liveGates: readonly StreamFoundationGateId[] = [
  ...backendGates,
  "realtime_room_gate",
  "live_lifecycle_gate",
  "media_storage_cdn_gate",
];

const mediaGates: readonly StreamFoundationGateId[] = [
  ...backendGates,
  "provider_secret_gate",
  "media_storage_cdn_gate",
  "shorts_moderation_feed_gate",
];

const adminGates: readonly StreamFoundationGateId[] = [
  ...backendGates,
  "moderation_admin_gate",
  "launch_readiness_gate",
];

const businessGates: readonly StreamFoundationGateId[] = [
  ...backendGates,
  "business_merchant_catalog_gate",
  "creator_business_verification_gate",
  "moderation_admin_gate",
];

const giftGates: readonly StreamFoundationGateId[] = [
  ...backendGates,
  "wallet_coin_gift_last_stage_gate",
  "provider_secret_gate",
  "launch_readiness_gate",
];

const field = (
  name: string,
  kind: StreamFoundationDomainEventFieldKind,
  requiredLater: boolean,
): StreamFoundationDomainEventField => ({
  name,
  kind,
  requiredLater,
  piiAllowedInStagingNow: false,
  secretMaterialAllowedNow: false,
});

function contract(input: Omit<StreamFoundationDomainEventContract,
  | "stage"
  | "eventBusPublishAllowedNow"
  | "realtimeBroadcastAllowedNow"
  | "databaseWriteAllowedNow"
  | "providerCallAllowedNow"
  | "mediaStorageWriteAllowedNow"
  | "externalNetworkAllowedNow"
  | "walletRuntimeMutationAllowedNow"
  | "messengerRuntimeMutationAllowedNow"
  | "giftsPaymentsRuntimeMutationAllowedNow"
  | "fakeLiveAllowed"
  | "fakeUploadAllowed"
  | "fakePublishAllowed"
  | "fakeAnalyticsAllowed"
  | "fakeModerationAllowed"
  | "fakeGiftAllowed"
  | "fakeSuccessAllowed"
  | "secretMaterialAllowedInEventNow"
  | "safety"
>): StreamFoundationDomainEventContract {
  return {
    stage: "BACKEND_STREAM_FOUNDATION_136J_DOMAIN_EVENTS_STAGING",
    ...input,
    eventBusPublishAllowedNow: false,
    realtimeBroadcastAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    mediaStorageWriteAllowedNow: false,
    externalNetworkAllowedNow: false,
    walletRuntimeMutationAllowedNow: false,
    messengerRuntimeMutationAllowedNow: false,
    giftsPaymentsRuntimeMutationAllowedNow: false,
    fakeLiveAllowed: false,
    fakeUploadAllowed: false,
    fakePublishAllowed: false,
    fakeAnalyticsAllowed: false,
    fakeModerationAllowed: false,
    fakeGiftAllowed: false,
    fakeSuccessAllowed: false,
    secretMaterialAllowedInEventNow: false,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}

export const STREAM_FOUNDATION_DOMAIN_EVENT_CONTRACTS: readonly StreamFoundationDomainEventContract[] = [
  contract({
    eventId: "stream_live_session_requested_event",
    kind: "live_lifecycle",
    sourceCommandIds: ["stream_start_live_session_command"],
    sourceSurfaces: ["live_single", "live_group", "live_audio", "live_game_screen", "live_video_file", "business_stream"],
    sourceActions: ["start_live"],
    status: "blocked_backend_common_missing",
    safeCode: "STREAM_BACKEND_COMMON_FOUNDATION_MISSING",
    severity: "blocked",
    safeMessageKey: "stream.foundation.event.live_session_requested.backend_required",
    requiredGates: liveGates,
    payloadFields: [field("roomDraftId", "string", true), field("mode", "string", true), field("visibility", "string", true)],
  }),
  contract({
    eventId: "stream_live_session_stop_requested_event",
    kind: "live_lifecycle",
    sourceCommandIds: ["stream_stop_live_session_command"],
    sourceSurfaces: ["live_single", "live_group", "live_audio", "live_game_screen", "live_video_file", "business_stream"],
    sourceActions: ["stop_live"],
    status: "blocked_backend_common_missing",
    safeCode: "STREAM_BACKEND_COMMON_FOUNDATION_MISSING",
    severity: "blocked",
    safeMessageKey: "stream.foundation.event.live_stop_requested.backend_required",
    requiredGates: liveGates,
    payloadFields: [field("roomId", "string", true), field("endedBy", "string", true)],
  }),
  contract({
    eventId: "stream_live_heartbeat_received_event",
    kind: "live_presence",
    sourceCommandIds: ["stream_live_heartbeat_command"],
    sourceSurfaces: ["live_single", "live_group", "live_audio", "live_game_screen", "live_video_file"],
    sourceActions: ["send_live_heartbeat"],
    status: "blocked_backend_common_missing",
    safeCode: "STREAM_BACKEND_COMMON_FOUNDATION_MISSING",
    severity: "blocked",
    safeMessageKey: "stream.foundation.event.live_heartbeat.backend_required",
    requiredGates: ["identity_session_gate", "realtime_room_gate", "live_lifecycle_gate", "observability_audit_gate"],
    payloadFields: [field("roomId", "string", true), field("clientSequence", "number", true)],
  }),
  contract({
    eventId: "stream_short_media_upload_requested_event",
    kind: "shorts_media",
    sourceCommandIds: ["stream_short_media_upload_command"],
    sourceSurfaces: ["shorts_creator"],
    sourceActions: ["upload_short_media"],
    status: "blocked_provider_not_configured",
    safeCode: "STREAM_PROVIDER_NOT_CONFIGURED",
    severity: "blocked",
    safeMessageKey: "stream.foundation.event.short_upload.provider_required",
    requiredGates: mediaGates,
    payloadFields: [field("draftId", "string", true), field("assetReference", "object_reference", true), field("durationMs", "number", true)],
  }),
  contract({
    eventId: "stream_short_publish_requested_event",
    kind: "shorts_publish",
    sourceCommandIds: ["stream_short_publish_command"],
    sourceSurfaces: ["shorts_creator"],
    sourceActions: ["publish_short"],
    status: "blocked_backend_common_missing",
    safeCode: "STREAM_BACKEND_COMMON_FOUNDATION_MISSING",
    severity: "blocked",
    safeMessageKey: "stream.foundation.event.short_publish.backend_required",
    requiredGates: [...mediaGates, "moderation_admin_gate"],
    payloadFields: [field("draftId", "string", true), field("caption", "string", false), field("privacy", "string", true)],
  }),
  contract({
    eventId: "stream_content_report_received_event",
    kind: "moderation",
    sourceCommandIds: ["stream_content_report_command"],
    sourceSurfaces: ["moderation_admin", "shorts_feed", "live_single", "business_stream"],
    sourceActions: ["report_content"],
    status: "blocked_admin_gate_missing",
    safeCode: "STREAM_ADMIN_GATE_REQUIRED",
    severity: "review_required",
    safeMessageKey: "stream.foundation.event.content_report.admin_gate_required",
    requiredGates: adminGates,
    payloadFields: [field("targetType", "string", true), field("targetId", "string", true), field("reasonCode", "string", true)],
  }),
  contract({
    eventId: "stream_business_product_attach_requested_event",
    kind: "business_catalog",
    sourceCommandIds: ["stream_business_product_attach_command"],
    sourceSurfaces: ["business_stream"],
    sourceActions: ["request_business_product_attach"],
    status: "blocked_admin_gate_missing",
    safeCode: "STREAM_ADMIN_GATE_REQUIRED",
    severity: "review_required",
    safeMessageKey: "stream.foundation.event.business_product_attach.admin_gate_required",
    requiredGates: businessGates,
    payloadFields: [field("businessId", "string", true), field("productId", "string", true), field("roomDraftId", "string", true)],
  }),
  contract({
    eventId: "stream_creator_verification_requested_event",
    kind: "creator_verification",
    sourceCommandIds: ["stream_creator_verification_request_command"],
    sourceSurfaces: ["creator_profile"],
    sourceActions: ["request_creator_verification"],
    status: "blocked_admin_gate_missing",
    safeCode: "STREAM_ADMIN_GATE_REQUIRED",
    severity: "review_required",
    safeMessageKey: "stream.foundation.event.creator_verification.admin_gate_required",
    requiredGates: ["identity_session_gate", "creator_business_verification_gate", "moderation_admin_gate", "observability_audit_gate"],
    payloadFields: [field("creatorId", "string", true), field("verificationTier", "string", true)],
  }),
  contract({
    eventId: "stream_playback_analytics_requested_event",
    kind: "analytics",
    sourceCommandIds: [],
    sourceSurfaces: ["playback_analytics"],
    sourceActions: ["load_playback_analytics"],
    status: "blocked_backend_common_missing",
    safeCode: "STREAM_BACKEND_COMMON_FOUNDATION_MISSING",
    severity: "blocked",
    safeMessageKey: "stream.foundation.event.analytics.backend_required",
    requiredGates: backendGates,
    payloadFields: [field("targetId", "string", true), field("window", "string", true)],
  }),
  contract({
    eventId: "stream_gift_send_boundary_requested_event",
    kind: "wallet_gift_boundary",
    sourceCommandIds: ["stream_gift_send_boundary_command"],
    sourceSurfaces: ["wallet_gift_boundary"],
    sourceActions: ["request_gift_send"],
    status: "locked_wallet_gift_last_stage",
    safeCode: "STREAM_WALLET_GIFT_LAST_STAGE_LOCKED",
    severity: "locked",
    safeMessageKey: "stream.foundation.event.gift_boundary.last_stage_locked",
    requiredGates: giftGates,
    payloadFields: [field("giftId", "string", true), field("receiverId", "string", true), field("coinAmount", "number", true)],
  }),
  contract({
    eventId: "stream_launch_readiness_review_required_event",
    kind: "launch_readiness",
    sourceCommandIds: [],
    sourceSurfaces: ["stream_entry", "live_composer", "shorts_creator", "business_stream", "creator_profile"],
    sourceActions: ["open_surface", "prepare_live_draft", "prepare_short_draft", "request_business_product_attach", "request_creator_verification"],
    status: "source_only_contract_ready",
    safeCode: "STREAM_SOURCE_ONLY_PREVIEW_ALLOWED",
    severity: "info",
    safeMessageKey: "stream.foundation.event.launch_readiness.source_only_contract_ready",
    requiredGates: ["launch_readiness_gate", "observability_audit_gate"],
    payloadFields: [field("readinessStage", "string", true), field("sourceOnly", "boolean", true)],
  }),
] as const;

export function getStreamFoundationDomainEventContract(
  eventId: StreamFoundationDomainEventId,
): StreamFoundationDomainEventContract | undefined {
  return STREAM_FOUNDATION_DOMAIN_EVENT_CONTRACTS.find((event) => event.eventId === eventId);
}

export function getStreamFoundationDomainEventContractsForSurfaceAction(
  surface: StreamFoundationSurface,
  action: StreamFoundationAction,
): readonly StreamFoundationDomainEventContract[] {
  return STREAM_FOUNDATION_DOMAIN_EVENT_CONTRACTS.filter((event) =>
    event.sourceSurfaces.includes(surface) && event.sourceActions.includes(action),
  );
}
