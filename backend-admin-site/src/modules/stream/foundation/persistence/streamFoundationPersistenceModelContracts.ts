import type {
  StreamFoundationGateId,
  StreamFoundationSafetySnapshot,
  StreamFoundationSurface,
} from "../core";
import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "../core";
import type { StreamFoundationDomainEventId } from "../domain-events";
import type { StreamFoundationWriteCommandId } from "../write-models";

export type StreamFoundationPersistenceStage = "BACKEND_STREAM_FOUNDATION_136K_PERSISTENCE_STAGING";

export type StreamFoundationPersistenceModelId =
  | "stream_identity_session_projection"
  | "stream_live_room_record"
  | "stream_live_participant_presence_record"
  | "stream_live_lifecycle_event_log"
  | "stream_media_asset_reference_record"
  | "stream_short_video_record"
  | "stream_short_engagement_counter_projection"
  | "stream_moderation_case_record"
  | "stream_business_product_attachment_record"
  | "stream_creator_verification_case_record"
  | "stream_playback_analytics_rollup_record"
  | "stream_notification_delivery_record"
  | "stream_wallet_gift_boundary_reference_record";

export type StreamFoundationPersistenceModelKind =
  | "identity_projection"
  | "live_room_state"
  | "presence_state"
  | "event_log"
  | "media_reference"
  | "shorts_content"
  | "counter_projection"
  | "moderation_case"
  | "business_catalog_link"
  | "verification_case"
  | "analytics_rollup"
  | "notification_delivery"
  | "wallet_gift_boundary_reference";

export type StreamFoundationPersistenceStatus =
  | "contract_ready_source_only"
  | "blocked_database_foundation_missing"
  | "blocked_admin_review_missing"
  | "blocked_provider_gate_missing"
  | "locked_wallet_gift_last_stage";

export type StreamFoundationDataClass =
  | "public_stream_metadata"
  | "session_reference"
  | "content_reference"
  | "moderation_evidence_reference"
  | "business_reference"
  | "analytics_aggregate"
  | "financial_boundary_reference";

export type StreamFoundationRetentionClass =
  | "ephemeral_presence_later"
  | "active_room_lifecycle_later"
  | "content_lifecycle_later"
  | "audit_retained_later"
  | "analytics_rollup_later"
  | "financial_boundary_retained_later";

export type StreamFoundationPersistenceFieldKind =
  | "id"
  | "string"
  | "number"
  | "boolean"
  | "timestamp"
  | "enum"
  | "json_reference"
  | "foreign_reference";

export type StreamFoundationPersistenceFieldContract = Readonly<{
  fieldName: string;
  fieldKind: StreamFoundationPersistenceFieldKind;
  requiredLater: boolean;
  indexedLater: boolean;
  piiAllowedInStagingNow: false;
  secretMaterialAllowedNow: false;
}>;

export type StreamFoundationPersistenceModelContract = Readonly<{
  stage: StreamFoundationPersistenceStage;
  modelId: StreamFoundationPersistenceModelId;
  modelKind: StreamFoundationPersistenceModelKind;
  logicalStoreKey: string;
  purposeKey: string;
  sourceSurfaces: readonly StreamFoundationSurface[];
  relatedCommands: readonly StreamFoundationWriteCommandId[];
  relatedEvents: readonly StreamFoundationDomainEventId[];
  requiredGates: readonly StreamFoundationGateId[];
  dataClass: StreamFoundationDataClass;
  retentionClass: StreamFoundationRetentionClass;
  status: StreamFoundationPersistenceStatus;
  fieldContracts: readonly StreamFoundationPersistenceFieldContract[];
  routeMountAllowedNow: false;
  runtimeExecutionAllowedNow: false;
  databaseReadAllowedNow: false;
  databaseWriteAllowedNow: false;
  schemaFileMutationAllowedNow: false;
  migrationAllowedNow: false;
  providerCallAllowedNow: false;
  externalStorageWriteAllowedNow: false;
  realtimePublishAllowedNow: false;
  walletRuntimeMutationAllowedNow: false;
  messengerRuntimeMutationAllowedNow: false;
  giftsPaymentsRuntimeMutationAllowedNow: false;
  fakeRowAllowed: false;
  fakeCounterAllowed: false;
  fakeSuccessAllowed: false;
  safety: StreamFoundationSafetySnapshot;
}>;

const commonGates: readonly StreamFoundationGateId[] = [
  "identity_session_gate",
  "locale_error_gate",
  "stream_kernel_gateway_gate",
  "observability_audit_gate",
];

const liveGates: readonly StreamFoundationGateId[] = [
  ...commonGates,
  "realtime_room_gate",
  "live_lifecycle_gate",
];

const mediaGates: readonly StreamFoundationGateId[] = [
  ...commonGates,
  "provider_secret_gate",
  "media_storage_cdn_gate",
  "shorts_moderation_feed_gate",
];

const adminGates: readonly StreamFoundationGateId[] = [
  ...commonGates,
  "moderation_admin_gate",
  "launch_readiness_gate",
];

const businessGates: readonly StreamFoundationGateId[] = [
  ...commonGates,
  "business_merchant_catalog_gate",
  "creator_business_verification_gate",
  "moderation_admin_gate",
];

const walletGiftGates: readonly StreamFoundationGateId[] = [
  ...commonGates,
  "wallet_coin_gift_last_stage_gate",
  "provider_secret_gate",
  "launch_readiness_gate",
];

const field = (
  fieldName: string,
  fieldKind: StreamFoundationPersistenceFieldKind,
  requiredLater: boolean,
  indexedLater: boolean,
): StreamFoundationPersistenceFieldContract => ({
  fieldName,
  fieldKind,
  requiredLater,
  indexedLater,
  piiAllowedInStagingNow: false,
  secretMaterialAllowedNow: false,
});

function model(input: Omit<StreamFoundationPersistenceModelContract,
  | "stage"
  | "routeMountAllowedNow"
  | "runtimeExecutionAllowedNow"
  | "databaseReadAllowedNow"
  | "databaseWriteAllowedNow"
  | "schemaFileMutationAllowedNow"
  | "migrationAllowedNow"
  | "providerCallAllowedNow"
  | "externalStorageWriteAllowedNow"
  | "realtimePublishAllowedNow"
  | "walletRuntimeMutationAllowedNow"
  | "messengerRuntimeMutationAllowedNow"
  | "giftsPaymentsRuntimeMutationAllowedNow"
  | "fakeRowAllowed"
  | "fakeCounterAllowed"
  | "fakeSuccessAllowed"
  | "safety"
>): StreamFoundationPersistenceModelContract {
  return {
    stage: "BACKEND_STREAM_FOUNDATION_136K_PERSISTENCE_STAGING",
    ...input,
    routeMountAllowedNow: false,
    runtimeExecutionAllowedNow: false,
    databaseReadAllowedNow: false,
    databaseWriteAllowedNow: false,
    schemaFileMutationAllowedNow: false,
    migrationAllowedNow: false,
    providerCallAllowedNow: false,
    externalStorageWriteAllowedNow: false,
    realtimePublishAllowedNow: false,
    walletRuntimeMutationAllowedNow: false,
    messengerRuntimeMutationAllowedNow: false,
    giftsPaymentsRuntimeMutationAllowedNow: false,
    fakeRowAllowed: false,
    fakeCounterAllowed: false,
    fakeSuccessAllowed: false,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}

export const STREAM_FOUNDATION_PERSISTENCE_MODEL_CONTRACTS: readonly StreamFoundationPersistenceModelContract[] = [
  model({
    modelId: "stream_identity_session_projection",
    modelKind: "identity_projection",
    logicalStoreKey: "stream.identity.session_projection",
    purposeKey: "stream.persistence.identity_session_projection",
    sourceSurfaces: ["stream_entry", "live_composer", "shorts_creator", "creator_profile"],
    relatedCommands: [],
    relatedEvents: [],
    requiredGates: commonGates,
    dataClass: "session_reference",
    retentionClass: "audit_retained_later",
    status: "contract_ready_source_only",
    fieldContracts: [
      field("userId", "foreign_reference", true, true),
      field("sessionId", "string", true, true),
      field("locale", "enum", false, true),
      field("createdAt", "timestamp", true, true),
    ],
  }),
  model({
    modelId: "stream_live_room_record",
    modelKind: "live_room_state",
    logicalStoreKey: "stream.live.room",
    purposeKey: "stream.persistence.live_room_state",
    sourceSurfaces: ["live_single", "live_group", "live_audio", "live_game_screen", "live_video_file", "business_stream"],
    relatedCommands: ["stream_start_live_session_command", "stream_stop_live_session_command"],
    relatedEvents: ["stream_live_session_requested_event", "stream_live_session_stop_requested_event"],
    requiredGates: liveGates,
    dataClass: "public_stream_metadata",
    retentionClass: "active_room_lifecycle_later",
    status: "blocked_database_foundation_missing",
    fieldContracts: [
      field("roomId", "id", true, true),
      field("ownerId", "foreign_reference", true, true),
      field("mode", "enum", true, true),
      field("lifecycleStatus", "enum", true, true),
      field("startedAt", "timestamp", true, true),
      field("endedAt", "timestamp", false, true),
    ],
  }),
  model({
    modelId: "stream_live_participant_presence_record",
    modelKind: "presence_state",
    logicalStoreKey: "stream.live.participant_presence",
    purposeKey: "stream.persistence.live_presence_state",
    sourceSurfaces: ["live_single", "live_group", "live_audio", "live_game_screen", "live_video_file", "business_stream"],
    relatedCommands: ["stream_live_heartbeat_command"],
    relatedEvents: ["stream_live_heartbeat_received_event"],
    requiredGates: ["identity_session_gate", "realtime_room_gate", "observability_audit_gate"],
    dataClass: "session_reference",
    retentionClass: "ephemeral_presence_later",
    status: "blocked_database_foundation_missing",
    fieldContracts: [
      field("presenceId", "id", true, true),
      field("roomId", "foreign_reference", true, true),
      field("userId", "foreign_reference", true, true),
      field("lastSeenAt", "timestamp", true, true),
      field("role", "enum", true, true),
    ],
  }),
  model({
    modelId: "stream_live_lifecycle_event_log",
    modelKind: "event_log",
    logicalStoreKey: "stream.live.lifecycle_event_log",
    purposeKey: "stream.persistence.live_lifecycle_event_log",
    sourceSurfaces: ["live_single", "live_group", "live_audio", "live_game_screen", "live_video_file", "business_stream"],
    relatedCommands: ["stream_start_live_session_command", "stream_stop_live_session_command", "stream_live_heartbeat_command"],
    relatedEvents: ["stream_live_session_requested_event", "stream_live_session_stop_requested_event", "stream_live_heartbeat_received_event"],
    requiredGates: liveGates,
    dataClass: "public_stream_metadata",
    retentionClass: "audit_retained_later",
    status: "blocked_database_foundation_missing",
    fieldContracts: [
      field("eventId", "id", true, true),
      field("roomId", "foreign_reference", true, true),
      field("eventName", "enum", true, true),
      field("payloadHash", "string", true, true),
      field("createdAt", "timestamp", true, true),
    ],
  }),
  model({
    modelId: "stream_media_asset_reference_record",
    modelKind: "media_reference",
    logicalStoreKey: "stream.media.asset_reference",
    purposeKey: "stream.persistence.media_asset_reference",
    sourceSurfaces: ["live_composer", "shorts_creator", "shorts_feed", "live_video_file"],
    relatedCommands: ["stream_short_media_upload_command", "stream_short_publish_command"],
    relatedEvents: ["stream_short_media_upload_requested_event", "stream_short_publish_requested_event"],
    requiredGates: mediaGates,
    dataClass: "content_reference",
    retentionClass: "content_lifecycle_later",
    status: "blocked_provider_gate_missing",
    fieldContracts: [
      field("assetId", "id", true, true),
      field("ownerId", "foreign_reference", true, true),
      field("storageReference", "string", true, true),
      field("mimeType", "string", true, false),
      field("moderationStatus", "enum", true, true),
    ],
  }),
  model({
    modelId: "stream_short_video_record",
    modelKind: "shorts_content",
    logicalStoreKey: "stream.shorts.video",
    purposeKey: "stream.persistence.short_video_record",
    sourceSurfaces: ["shorts_creator", "shorts_feed"],
    relatedCommands: ["stream_short_publish_command"],
    relatedEvents: ["stream_short_publish_requested_event"],
    requiredGates: mediaGates,
    dataClass: "content_reference",
    retentionClass: "content_lifecycle_later",
    status: "blocked_database_foundation_missing",
    fieldContracts: [
      field("shortId", "id", true, true),
      field("creatorId", "foreign_reference", true, true),
      field("assetId", "foreign_reference", true, true),
      field("visibility", "enum", true, true),
      field("publishedAt", "timestamp", false, true),
    ],
  }),
  model({
    modelId: "stream_short_engagement_counter_projection",
    modelKind: "counter_projection",
    logicalStoreKey: "stream.shorts.engagement_counter_projection",
    purposeKey: "stream.persistence.short_engagement_counter_projection",
    sourceSurfaces: ["shorts_feed", "playback_analytics"],
    relatedCommands: [],
    relatedEvents: ["stream_playback_analytics_requested_event"],
    requiredGates: ["stream_kernel_gateway_gate", "observability_audit_gate", "launch_readiness_gate"],
    dataClass: "analytics_aggregate",
    retentionClass: "analytics_rollup_later",
    status: "blocked_database_foundation_missing",
    fieldContracts: [
      field("shortId", "foreign_reference", true, true),
      field("viewsCount", "number", true, true),
      field("likesCount", "number", true, true),
      field("commentsCount", "number", true, true),
      field("updatedAt", "timestamp", true, true),
    ],
  }),
  model({
    modelId: "stream_moderation_case_record",
    modelKind: "moderation_case",
    logicalStoreKey: "stream.moderation.case",
    purposeKey: "stream.persistence.moderation_case_record",
    sourceSurfaces: ["moderation_admin", "shorts_feed", "live_single", "live_group", "business_stream"],
    relatedCommands: ["stream_content_report_command"],
    relatedEvents: ["stream_content_report_received_event"],
    requiredGates: adminGates,
    dataClass: "moderation_evidence_reference",
    retentionClass: "audit_retained_later",
    status: "blocked_admin_review_missing",
    fieldContracts: [
      field("caseId", "id", true, true),
      field("contentReference", "foreign_reference", true, true),
      field("reporterId", "foreign_reference", true, true),
      field("reasonCode", "enum", true, true),
      field("status", "enum", true, true),
    ],
  }),
  model({
    modelId: "stream_business_product_attachment_record",
    modelKind: "business_catalog_link",
    logicalStoreKey: "stream.business.product_attachment",
    purposeKey: "stream.persistence.business_product_attachment_record",
    sourceSurfaces: ["business_stream"],
    relatedCommands: ["stream_business_product_attach_command"],
    relatedEvents: ["stream_business_product_attach_requested_event"],
    requiredGates: businessGates,
    dataClass: "business_reference",
    retentionClass: "audit_retained_later",
    status: "blocked_admin_review_missing",
    fieldContracts: [
      field("attachmentId", "id", true, true),
      field("businessId", "foreign_reference", true, true),
      field("productId", "foreign_reference", true, true),
      field("roomId", "foreign_reference", true, true),
      field("approvalStatus", "enum", true, true),
    ],
  }),
  model({
    modelId: "stream_creator_verification_case_record",
    modelKind: "verification_case",
    logicalStoreKey: "stream.creator.verification_case",
    purposeKey: "stream.persistence.creator_verification_case_record",
    sourceSurfaces: ["creator_profile", "moderation_admin"],
    relatedCommands: ["stream_creator_verification_request_command"],
    relatedEvents: ["stream_creator_verification_requested_event"],
    requiredGates: ["identity_session_gate", "creator_business_verification_gate", "moderation_admin_gate", "observability_audit_gate"],
    dataClass: "moderation_evidence_reference",
    retentionClass: "audit_retained_later",
    status: "blocked_admin_review_missing",
    fieldContracts: [
      field("verificationCaseId", "id", true, true),
      field("creatorId", "foreign_reference", true, true),
      field("documentReference", "string", true, false),
      field("riskStatus", "enum", true, true),
      field("reviewedAt", "timestamp", false, true),
    ],
  }),
  model({
    modelId: "stream_playback_analytics_rollup_record",
    modelKind: "analytics_rollup",
    logicalStoreKey: "stream.analytics.playback_rollup",
    purposeKey: "stream.persistence.playback_analytics_rollup_record",
    sourceSurfaces: ["playback_analytics", "shorts_feed", "live_single"],
    relatedCommands: [],
    relatedEvents: ["stream_playback_analytics_requested_event"],
    requiredGates: ["stream_kernel_gateway_gate", "observability_audit_gate", "launch_readiness_gate"],
    dataClass: "analytics_aggregate",
    retentionClass: "analytics_rollup_later",
    status: "blocked_database_foundation_missing",
    fieldContracts: [
      field("rollupId", "id", true, true),
      field("contentReference", "foreign_reference", true, true),
      field("windowStart", "timestamp", true, true),
      field("windowEnd", "timestamp", true, true),
      field("aggregatePayload", "json_reference", true, false),
    ],
  }),
  model({
    modelId: "stream_notification_delivery_record",
    modelKind: "notification_delivery",
    logicalStoreKey: "stream.notification.delivery",
    purposeKey: "stream.persistence.notification_delivery_record",
    sourceSurfaces: ["live_single", "live_group", "shorts_feed", "business_stream", "creator_profile"],
    relatedCommands: [],
    relatedEvents: ["stream_launch_readiness_review_required_event"],
    requiredGates: ["identity_session_gate", "notification_qr_deeplink_gate", "observability_audit_gate"],
    dataClass: "session_reference",
    retentionClass: "audit_retained_later",
    status: "blocked_provider_gate_missing",
    fieldContracts: [
      field("deliveryId", "id", true, true),
      field("recipientId", "foreign_reference", true, true),
      field("channel", "enum", true, true),
      field("deliveryStatus", "enum", true, true),
      field("createdAt", "timestamp", true, true),
    ],
  }),
  model({
    modelId: "stream_wallet_gift_boundary_reference_record",
    modelKind: "wallet_gift_boundary_reference",
    logicalStoreKey: "stream.wallet_gift.boundary_reference",
    purposeKey: "stream.persistence.wallet_gift_boundary_reference_record",
    sourceSurfaces: ["wallet_gift_boundary"],
    relatedCommands: ["stream_gift_send_boundary_command"],
    relatedEvents: ["stream_gift_send_boundary_requested_event"],
    requiredGates: walletGiftGates,
    dataClass: "financial_boundary_reference",
    retentionClass: "financial_boundary_retained_later",
    status: "locked_wallet_gift_last_stage",
    fieldContracts: [
      field("boundaryReferenceId", "id", true, true),
      field("streamContentReference", "foreign_reference", true, true),
      field("walletLedgerReference", "foreign_reference", true, true),
      field("coinAmount", "number", true, false),
      field("approvalStatus", "enum", true, true),
    ],
  }),
];
