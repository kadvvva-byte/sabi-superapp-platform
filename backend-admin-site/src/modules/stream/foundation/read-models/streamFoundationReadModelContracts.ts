import type {
  StreamFoundationAction,
  StreamFoundationGateId,
  StreamFoundationSafeCode,
  StreamFoundationSeverity,
  StreamFoundationSurface,
} from "../core";
import { STREAM_FOUNDATION_SAFE_SNAPSHOT, type StreamFoundationSafetySnapshot } from "../core";

export type StreamFoundationReadModelStage = "BACKEND_STREAM_FOUNDATION_136H_READ_MODELS_STAGING";

export type StreamFoundationReadModelId =
  | "stream_live_list_read_model"
  | "stream_live_room_snapshot_read_model"
  | "stream_shorts_feed_read_model"
  | "stream_short_detail_read_model"
  | "stream_creator_profile_read_model"
  | "stream_business_catalog_read_model"
  | "stream_playback_analytics_read_model"
  | "stream_moderation_queue_read_model"
  | "stream_launch_readiness_read_model";

export type StreamFoundationReadModelKind =
  | "live_discovery"
  | "live_room"
  | "shorts_feed"
  | "short_detail"
  | "creator_profile"
  | "business_catalog"
  | "analytics"
  | "moderation"
  | "launch_readiness";

export type StreamFoundationReadModelStatus =
  | "contract_ready_empty_source_only"
  | "blocked_backend_common_missing"
  | "blocked_realtime_missing"
  | "blocked_media_storage_missing"
  | "blocked_admin_gate_missing"
  | "blocked_provider_not_configured"
  | "locked_wallet_gift_last_stage";

export type StreamFoundationReadModelResponseKind =
  | "empty_live_list"
  | "empty_live_room_snapshot"
  | "empty_shorts_feed"
  | "empty_short_detail"
  | "empty_creator_profile"
  | "empty_business_catalog"
  | "empty_playback_analytics"
  | "empty_moderation_queue"
  | "locked_launch_readiness";

export type StreamFoundationReadModelContract = Readonly<{
  readModelId: StreamFoundationReadModelId;
  kind: StreamFoundationReadModelKind;
  surface: StreamFoundationSurface;
  loadAction: StreamFoundationAction;
  status: StreamFoundationReadModelStatus;
  safeCode: StreamFoundationSafeCode;
  severity: StreamFoundationSeverity;
  safeMessageKey: string;
  emptyReasonKey: string;
  requiredGates: readonly StreamFoundationGateId[];
  responseKind: StreamFoundationReadModelResponseKind;
  returnsEmptySourceOnlySnapshotNow: true;
  routeMountAllowedNow: false;
  databaseReadAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  realtimeSubscriptionAllowedNow: false;
  mediaSignedUrlAllowedNow: false;
  walletRuntimeMutationAllowedNow: false;
  messengerRuntimeMutationAllowedNow: false;
  giftsPaymentsRuntimeMutationAllowedNow: false;
  fakeRowsAllowed: false;
  fakeCountersAllowed: false;
  fakeSuccessAllowed: false;
  safety: StreamFoundationSafetySnapshot;
}>;

const backendGates: readonly StreamFoundationGateId[] = [
  "identity_session_gate",
  "locale_error_gate",
  "stream_kernel_gateway_gate",
  "observability_audit_gate",
];

const liveRoomGates: readonly StreamFoundationGateId[] = [
  ...backendGates,
  "realtime_room_gate",
  "live_lifecycle_gate",
  "media_storage_cdn_gate",
];

const shortsGates: readonly StreamFoundationGateId[] = [
  ...backendGates,
  "media_storage_cdn_gate",
  "shorts_moderation_feed_gate",
];

const adminGates: readonly StreamFoundationGateId[] = [
  ...backendGates,
  "moderation_admin_gate",
  "launch_readiness_gate",
];

function contract(input: Omit<StreamFoundationReadModelContract, "returnsEmptySourceOnlySnapshotNow" | "routeMountAllowedNow" | "databaseReadAllowedNow" | "databaseWriteAllowedNow" | "providerCallAllowedNow" | "realtimeSubscriptionAllowedNow" | "mediaSignedUrlAllowedNow" | "walletRuntimeMutationAllowedNow" | "messengerRuntimeMutationAllowedNow" | "giftsPaymentsRuntimeMutationAllowedNow" | "fakeRowsAllowed" | "fakeCountersAllowed" | "fakeSuccessAllowed" | "safety">): StreamFoundationReadModelContract {
  return {
    ...input,
    returnsEmptySourceOnlySnapshotNow: true,
    routeMountAllowedNow: false,
    databaseReadAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    realtimeSubscriptionAllowedNow: false,
    mediaSignedUrlAllowedNow: false,
    walletRuntimeMutationAllowedNow: false,
    messengerRuntimeMutationAllowedNow: false,
    giftsPaymentsRuntimeMutationAllowedNow: false,
    fakeRowsAllowed: false,
    fakeCountersAllowed: false,
    fakeSuccessAllowed: false,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}

export const STREAM_FOUNDATION_READ_MODEL_CONTRACTS: readonly StreamFoundationReadModelContract[] = [
  contract({
    readModelId: "stream_live_list_read_model",
    kind: "live_discovery",
    surface: "stream_entry",
    loadAction: "open_surface",
    status: "blocked_backend_common_missing",
    safeCode: "STREAM_BACKEND_COMMON_FOUNDATION_MISSING",
    severity: "blocked",
    safeMessageKey: "stream.foundation.read_model.live_list.backend_required",
    emptyReasonKey: "stream.foundation.read_model.live_list.empty_until_backend_common",
    requiredGates: [...backendGates, "realtime_room_gate", "live_lifecycle_gate"],
    responseKind: "empty_live_list",
  }),
  contract({
    readModelId: "stream_live_room_snapshot_read_model",
    kind: "live_room",
    surface: "live_single",
    loadAction: "join_live",
    status: "blocked_realtime_missing",
    safeCode: "STREAM_BACKEND_COMMON_FOUNDATION_MISSING",
    severity: "blocked",
    safeMessageKey: "stream.foundation.read_model.live_room.realtime_required",
    emptyReasonKey: "stream.foundation.read_model.live_room.empty_until_realtime_lifecycle",
    requiredGates: liveRoomGates,
    responseKind: "empty_live_room_snapshot",
  }),
  contract({
    readModelId: "stream_shorts_feed_read_model",
    kind: "shorts_feed",
    surface: "shorts_feed",
    loadAction: "load_shorts_feed",
    status: "blocked_backend_common_missing",
    safeCode: "STREAM_BACKEND_COMMON_FOUNDATION_MISSING",
    severity: "blocked",
    safeMessageKey: "stream.foundation.read_model.shorts_feed.backend_required",
    emptyReasonKey: "stream.foundation.read_model.shorts_feed.empty_until_media_feed",
    requiredGates: shortsGates,
    responseKind: "empty_shorts_feed",
  }),
  contract({
    readModelId: "stream_short_detail_read_model",
    kind: "short_detail",
    surface: "shorts_feed",
    loadAction: "load_shorts_feed",
    status: "blocked_media_storage_missing",
    safeCode: "STREAM_PROVIDER_NOT_CONFIGURED",
    severity: "blocked",
    safeMessageKey: "stream.foundation.read_model.short_detail.media_required",
    emptyReasonKey: "stream.foundation.read_model.short_detail.empty_until_media_storage",
    requiredGates: shortsGates,
    responseKind: "empty_short_detail",
  }),
  contract({
    readModelId: "stream_creator_profile_read_model",
    kind: "creator_profile",
    surface: "creator_profile",
    loadAction: "request_creator_verification",
    status: "blocked_admin_gate_missing",
    safeCode: "STREAM_ADMIN_GATE_REQUIRED",
    severity: "review_required",
    safeMessageKey: "stream.foundation.read_model.creator_profile.admin_required",
    emptyReasonKey: "stream.foundation.read_model.creator_profile.empty_until_verification_admin",
    requiredGates: [...backendGates, "creator_business_verification_gate", "moderation_admin_gate"],
    responseKind: "empty_creator_profile",
  }),
  contract({
    readModelId: "stream_business_catalog_read_model",
    kind: "business_catalog",
    surface: "business_stream",
    loadAction: "request_business_product_attach",
    status: "blocked_admin_gate_missing",
    safeCode: "STREAM_ADMIN_GATE_REQUIRED",
    severity: "review_required",
    safeMessageKey: "stream.foundation.read_model.business_catalog.admin_required",
    emptyReasonKey: "stream.foundation.read_model.business_catalog.empty_until_merchant_approval",
    requiredGates: [...backendGates, "business_merchant_catalog_gate", "moderation_admin_gate"],
    responseKind: "empty_business_catalog",
  }),
  contract({
    readModelId: "stream_playback_analytics_read_model",
    kind: "analytics",
    surface: "playback_analytics",
    loadAction: "load_playback_analytics",
    status: "blocked_backend_common_missing",
    safeCode: "STREAM_BACKEND_COMMON_FOUNDATION_MISSING",
    severity: "blocked",
    safeMessageKey: "stream.foundation.read_model.analytics.backend_required",
    emptyReasonKey: "stream.foundation.read_model.analytics.empty_until_observability",
    requiredGates: [...backendGates, "observability_audit_gate"],
    responseKind: "empty_playback_analytics",
  }),
  contract({
    readModelId: "stream_moderation_queue_read_model",
    kind: "moderation",
    surface: "moderation_admin",
    loadAction: "report_content",
    status: "blocked_admin_gate_missing",
    safeCode: "STREAM_ADMIN_GATE_REQUIRED",
    severity: "review_required",
    safeMessageKey: "stream.foundation.read_model.moderation_queue.admin_required",
    emptyReasonKey: "stream.foundation.read_model.moderation_queue.empty_until_admin_gate",
    requiredGates: adminGates,
    responseKind: "empty_moderation_queue",
  }),
  contract({
    readModelId: "stream_launch_readiness_read_model",
    kind: "launch_readiness",
    surface: "stream_entry",
    loadAction: "open_surface",
    status: "locked_wallet_gift_last_stage",
    safeCode: "STREAM_WALLET_GIFT_LAST_STAGE_LOCKED",
    severity: "locked",
    safeMessageKey: "stream.foundation.read_model.launch_readiness.locked_until_all_gates",
    emptyReasonKey: "stream.foundation.read_model.launch_readiness.locked_until_backend_admin_provider_wallet",
    requiredGates: [...backendGates, "provider_secret_gate", "wallet_coin_gift_last_stage_gate", "launch_readiness_gate"],
    responseKind: "locked_launch_readiness",
  }),
] as const;

export function getStreamFoundationReadModelContract(readModelId: StreamFoundationReadModelId): StreamFoundationReadModelContract | undefined {
  return STREAM_FOUNDATION_READ_MODEL_CONTRACTS.find((contractItem) => contractItem.readModelId === readModelId);
}

export function getStreamFoundationReadModelContracts(): readonly StreamFoundationReadModelContract[] {
  return STREAM_FOUNDATION_READ_MODEL_CONTRACTS;
}
