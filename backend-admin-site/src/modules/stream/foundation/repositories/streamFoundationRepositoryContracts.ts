import type {
  StreamFoundationGateId,
  StreamFoundationSafetySnapshot,
  StreamFoundationSurface,
} from "../core";
import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "../core";
import type {
  StreamFoundationPersistenceModelContract,
  StreamFoundationPersistenceModelId,
  StreamFoundationPersistenceModelKind,
  StreamFoundationPersistenceStatus,
} from "../persistence";
import { STREAM_FOUNDATION_PERSISTENCE_MODEL_CONTRACTS } from "../persistence";

export type StreamFoundationRepositoryStage = "BACKEND_STREAM_FOUNDATION_136L_REPOSITORY_STAGING";

export type StreamFoundationRepositoryId =
  | "stream_identity_session_repository"
  | "stream_live_room_repository"
  | "stream_live_presence_repository"
  | "stream_live_lifecycle_event_repository"
  | "stream_media_asset_reference_repository"
  | "stream_short_video_repository"
  | "stream_short_engagement_repository"
  | "stream_moderation_case_repository"
  | "stream_business_product_attachment_repository"
  | "stream_creator_verification_repository"
  | "stream_playback_analytics_repository"
  | "stream_notification_delivery_repository"
  | "stream_wallet_gift_boundary_repository";

export type StreamFoundationRepositoryKind =
  | "projection_repository"
  | "state_repository"
  | "presence_repository"
  | "append_only_log_repository"
  | "reference_repository"
  | "content_repository"
  | "counter_projection_repository"
  | "case_repository"
  | "business_link_repository"
  | "analytics_rollup_repository"
  | "notification_repository"
  | "financial_boundary_repository";

export type StreamFoundationRepositoryStatus =
  | "interface_ready_source_only"
  | "blocked_data_store_missing"
  | "blocked_admin_review_missing"
  | "blocked_provider_gate_missing"
  | "locked_wallet_gift_last_stage";

export type StreamFoundationRepositoryOperation =
  | "read_by_id"
  | "read_list"
  | "read_snapshot"
  | "append_event"
  | "upsert_state"
  | "increment_counter"
  | "create_case"
  | "link_reference"
  | "mark_review_required";

export type StreamFoundationRepositoryOperationContract = Readonly<{
  operation: StreamFoundationRepositoryOperation;
  requiredLater: boolean;
  sourceOnlyNow: true;
  acceptsInputNow: false;
  returnsStoredDataNow: false;
  mutatesStoreNow: false;
  emitsEventNow: false;
  externalNetworkAllowedNow: false;
  secretMaterialAllowedNow: false;
  fakeDataAllowedNow: false;
}>;

export type StreamFoundationRepositoryContract = Readonly<{
  stage: StreamFoundationRepositoryStage;
  repositoryId: StreamFoundationRepositoryId;
  repositoryKind: StreamFoundationRepositoryKind;
  modelId: StreamFoundationPersistenceModelId;
  modelKind: StreamFoundationPersistenceModelKind;
  modelStatus: StreamFoundationPersistenceStatus;
  logicalStoreKey: string;
  purposeKey: string;
  sourceSurfaces: readonly StreamFoundationSurface[];
  requiredGates: readonly StreamFoundationGateId[];
  status: StreamFoundationRepositoryStatus;
  operations: readonly StreamFoundationRepositoryOperationContract[];
  routeMountAllowedNow: false;
  runtimeExecutionAllowedNow: false;
  dataStoreClientAllowedNow: false;
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

const operation = (
  name: StreamFoundationRepositoryOperation,
  requiredLater = true,
): StreamFoundationRepositoryOperationContract => ({
  operation: name,
  requiredLater,
  sourceOnlyNow: true,
  acceptsInputNow: false,
  returnsStoredDataNow: false,
  mutatesStoreNow: false,
  emitsEventNow: false,
  externalNetworkAllowedNow: false,
  secretMaterialAllowedNow: false,
  fakeDataAllowedNow: false,
});

const statusFromModel = (modelStatus: StreamFoundationPersistenceStatus): StreamFoundationRepositoryStatus => {
  if (modelStatus === "contract_ready_source_only") {
    return "interface_ready_source_only";
  }
  if (modelStatus === "blocked_admin_review_missing") {
    return "blocked_admin_review_missing";
  }
  if (modelStatus === "blocked_provider_gate_missing") {
    return "blocked_provider_gate_missing";
  }
  if (modelStatus === "locked_wallet_gift_last_stage") {
    return "locked_wallet_gift_last_stage";
  }
  return "blocked_data_store_missing";
};

const repositoryKindFromModel = (modelKind: StreamFoundationPersistenceModelKind): StreamFoundationRepositoryKind => {
  switch (modelKind) {
    case "identity_projection":
      return "projection_repository";
    case "live_room_state":
      return "state_repository";
    case "presence_state":
      return "presence_repository";
    case "event_log":
      return "append_only_log_repository";
    case "media_reference":
      return "reference_repository";
    case "shorts_content":
      return "content_repository";
    case "counter_projection":
      return "counter_projection_repository";
    case "moderation_case":
      return "case_repository";
    case "business_catalog_link":
      return "business_link_repository";
    case "verification_case":
      return "case_repository";
    case "analytics_rollup":
      return "analytics_rollup_repository";
    case "notification_delivery":
      return "notification_repository";
    case "wallet_gift_boundary_reference":
      return "financial_boundary_repository";
    default:
      return "reference_repository";
  }
};

const repositoryIdFromModel = (modelId: StreamFoundationPersistenceModelId): StreamFoundationRepositoryId => {
  switch (modelId) {
    case "stream_identity_session_projection":
      return "stream_identity_session_repository";
    case "stream_live_room_record":
      return "stream_live_room_repository";
    case "stream_live_participant_presence_record":
      return "stream_live_presence_repository";
    case "stream_live_lifecycle_event_log":
      return "stream_live_lifecycle_event_repository";
    case "stream_media_asset_reference_record":
      return "stream_media_asset_reference_repository";
    case "stream_short_video_record":
      return "stream_short_video_repository";
    case "stream_short_engagement_counter_projection":
      return "stream_short_engagement_repository";
    case "stream_moderation_case_record":
      return "stream_moderation_case_repository";
    case "stream_business_product_attachment_record":
      return "stream_business_product_attachment_repository";
    case "stream_creator_verification_case_record":
      return "stream_creator_verification_repository";
    case "stream_playback_analytics_rollup_record":
      return "stream_playback_analytics_repository";
    case "stream_notification_delivery_record":
      return "stream_notification_delivery_repository";
    case "stream_wallet_gift_boundary_reference_record":
      return "stream_wallet_gift_boundary_repository";
    default:
      return "stream_media_asset_reference_repository";
  }
};

const operationsFromModel = (modelKind: StreamFoundationPersistenceModelKind): readonly StreamFoundationRepositoryOperationContract[] => {
  switch (modelKind) {
    case "identity_projection":
      return [operation("read_by_id"), operation("read_snapshot")];
    case "live_room_state":
      return [operation("read_by_id"), operation("read_list"), operation("upsert_state")];
    case "presence_state":
      return [operation("read_snapshot"), operation("upsert_state")];
    case "event_log":
      return [operation("read_list"), operation("append_event")];
    case "media_reference":
      return [operation("read_by_id"), operation("link_reference")];
    case "shorts_content":
      return [operation("read_by_id"), operation("read_list"), operation("upsert_state")];
    case "counter_projection":
      return [operation("read_snapshot"), operation("increment_counter")];
    case "moderation_case":
      return [operation("read_by_id"), operation("read_list"), operation("create_case"), operation("mark_review_required")];
    case "business_catalog_link":
      return [operation("read_by_id"), operation("read_list"), operation("link_reference")];
    case "verification_case":
      return [operation("read_by_id"), operation("create_case"), operation("mark_review_required")];
    case "analytics_rollup":
      return [operation("read_snapshot"), operation("increment_counter")];
    case "notification_delivery":
      return [operation("read_list"), operation("append_event")];
    case "wallet_gift_boundary_reference":
      return [operation("read_by_id"), operation("link_reference")];
    default:
      return [operation("read_by_id")];
  }
};

const toRepositoryContract = (
  model: StreamFoundationPersistenceModelContract,
): StreamFoundationRepositoryContract => ({
  stage: "BACKEND_STREAM_FOUNDATION_136L_REPOSITORY_STAGING",
  repositoryId: repositoryIdFromModel(model.modelId),
  repositoryKind: repositoryKindFromModel(model.modelKind),
  modelId: model.modelId,
  modelKind: model.modelKind,
  modelStatus: model.status,
  logicalStoreKey: model.logicalStoreKey,
  purposeKey: model.purposeKey,
  sourceSurfaces: model.sourceSurfaces,
  requiredGates: model.requiredGates,
  status: statusFromModel(model.status),
  operations: operationsFromModel(model.modelKind),
  routeMountAllowedNow: false,
  runtimeExecutionAllowedNow: false,
  dataStoreClientAllowedNow: false,
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
});

export const STREAM_FOUNDATION_REPOSITORY_CONTRACTS: readonly StreamFoundationRepositoryContract[] =
  STREAM_FOUNDATION_PERSISTENCE_MODEL_CONTRACTS.map(toRepositoryContract);
