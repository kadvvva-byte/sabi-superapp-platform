import type {
  StreamFoundationReadModelContract,
  StreamFoundationReadModelId,
  StreamFoundationReadModelStage,
  StreamFoundationReadModelStatus,
} from "./streamFoundationReadModelContracts";
import {
  STREAM_FOUNDATION_READ_MODEL_CONTRACTS,
  getStreamFoundationReadModelContract,
} from "./streamFoundationReadModelContracts";

export type StreamFoundationReadModelSnapshotBase = Readonly<{
  stage: StreamFoundationReadModelStage;
  readModelId: StreamFoundationReadModelId;
  requestId: string;
  ok: false;
  status: StreamFoundationReadModelStatus;
  safeCode: StreamFoundationReadModelContract["safeCode"];
  safeMessageKey: string;
  emptyReasonKey: string;
  routeMountAllowedNow: false;
  databaseReadAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  realtimeSubscriptionAllowedNow: false;
  mediaSignedUrlAllowedNow: false;
  fakeRowsAllowed: false;
  fakeCountersAllowed: false;
  fakeSuccessAllowed: false;
}>;

export type StreamFoundationLiveListItem = Readonly<{
  streamId: string;
  creatorId: string;
  titleKey: string;
  viewerCount: number;
}>;

export type StreamFoundationShortFeedItem = Readonly<{
  shortId: string;
  creatorId: string;
  mediaReady: boolean;
  likeCount: number;
  commentCount: number;
  saveCount: number;
}>;

export type StreamFoundationBusinessCatalogItem = Readonly<{
  productId: string;
  merchantId: string;
  attachAllowed: boolean;
}>;

export type StreamFoundationReadModelSnapshot =
  | (StreamFoundationReadModelSnapshotBase & Readonly<{
      responseKind: "empty_live_list";
      items: readonly StreamFoundationLiveListItem[];
      totalKnownLives: 0;
      realtimeConnectedNow: false;
    }>)
  | (StreamFoundationReadModelSnapshotBase & Readonly<{
      responseKind: "empty_live_room_snapshot";
      roomId: null;
      lifecycle: "unavailable_backend_common_missing";
      participants: readonly string[];
      chatPreview: readonly string[];
      realtimeConnectedNow: false;
    }>)
  | (StreamFoundationReadModelSnapshotBase & Readonly<{
      responseKind: "empty_shorts_feed";
      items: readonly StreamFoundationShortFeedItem[];
      nextCursor: null;
      feedReadyNow: false;
    }>)
  | (StreamFoundationReadModelSnapshotBase & Readonly<{
      responseKind: "empty_short_detail";
      shortId: null;
      mediaUrl: null;
      signedUrlReadyNow: false;
    }>)
  | (StreamFoundationReadModelSnapshotBase & Readonly<{
      responseKind: "empty_creator_profile";
      creatorId: null;
      verificationStatus: "review_required";
      profileReadyNow: false;
    }>)
  | (StreamFoundationReadModelSnapshotBase & Readonly<{
      responseKind: "empty_business_catalog";
      merchantId: null;
      products: readonly StreamFoundationBusinessCatalogItem[];
      catalogReadyNow: false;
    }>)
  | (StreamFoundationReadModelSnapshotBase & Readonly<{
      responseKind: "empty_playback_analytics";
      views: 0;
      watchSeconds: 0;
      engagementEvents: 0;
      analyticsReadyNow: false;
    }>)
  | (StreamFoundationReadModelSnapshotBase & Readonly<{
      responseKind: "empty_moderation_queue";
      pendingReports: 0;
      blockedItems: 0;
      moderationReadyNow: false;
    }>)
  | (StreamFoundationReadModelSnapshotBase & Readonly<{
      responseKind: "locked_launch_readiness";
      readyForLaunchNow: false;
      missingGateCount: number;
      lockedReasons: readonly string[];
    }>);

function baseSnapshot(contract: StreamFoundationReadModelContract, requestId: string): StreamFoundationReadModelSnapshotBase {
  return {
    stage: "BACKEND_STREAM_FOUNDATION_136H_READ_MODELS_STAGING",
    readModelId: contract.readModelId,
    requestId,
    ok: false,
    status: contract.status,
    safeCode: contract.safeCode,
    safeMessageKey: contract.safeMessageKey,
    emptyReasonKey: contract.emptyReasonKey,
    routeMountAllowedNow: false,
    databaseReadAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    realtimeSubscriptionAllowedNow: false,
    mediaSignedUrlAllowedNow: false,
    fakeRowsAllowed: false,
    fakeCountersAllowed: false,
    fakeSuccessAllowed: false,
  };
}

export function createStreamFoundationReadModelEmptySnapshot(readModelId: StreamFoundationReadModelId, requestId = "stream-136h-local-staging-read-model"): StreamFoundationReadModelSnapshot {
  const contract = getStreamFoundationReadModelContract(readModelId);

  if (!contract) {
    const fallbackContract = STREAM_FOUNDATION_READ_MODEL_CONTRACTS[0];
    return {
      ...baseSnapshot(fallbackContract, requestId),
      readModelId: fallbackContract.readModelId,
      responseKind: "empty_live_list",
      items: [],
      totalKnownLives: 0,
      realtimeConnectedNow: false,
    };
  }

  const base = baseSnapshot(contract, requestId);

  switch (contract.responseKind) {
    case "empty_live_list":
      return { ...base, responseKind: "empty_live_list", items: [], totalKnownLives: 0, realtimeConnectedNow: false };
    case "empty_live_room_snapshot":
      return { ...base, responseKind: "empty_live_room_snapshot", roomId: null, lifecycle: "unavailable_backend_common_missing", participants: [], chatPreview: [], realtimeConnectedNow: false };
    case "empty_shorts_feed":
      return { ...base, responseKind: "empty_shorts_feed", items: [], nextCursor: null, feedReadyNow: false };
    case "empty_short_detail":
      return { ...base, responseKind: "empty_short_detail", shortId: null, mediaUrl: null, signedUrlReadyNow: false };
    case "empty_creator_profile":
      return { ...base, responseKind: "empty_creator_profile", creatorId: null, verificationStatus: "review_required", profileReadyNow: false };
    case "empty_business_catalog":
      return { ...base, responseKind: "empty_business_catalog", merchantId: null, products: [], catalogReadyNow: false };
    case "empty_playback_analytics":
      return { ...base, responseKind: "empty_playback_analytics", views: 0, watchSeconds: 0, engagementEvents: 0, analyticsReadyNow: false };
    case "empty_moderation_queue":
      return { ...base, responseKind: "empty_moderation_queue", pendingReports: 0, blockedItems: 0, moderationReadyNow: false };
    case "locked_launch_readiness":
      return { ...base, responseKind: "locked_launch_readiness", readyForLaunchNow: false, missingGateCount: contract.requiredGates.length, lockedReasons: contract.requiredGates };
  }
}

export type StreamFoundationReadModelSnapshotIndex = Readonly<{
  stage: StreamFoundationReadModelStage;
  totalReadModels: number;
  contractReadyEmptySourceOnly: number;
  blockedReadModels: number;
  reviewRequiredReadModels: number;
  lockedReadModels: number;
  routeMountedNow: 0;
  databaseReadReadyNow: 0;
  databaseWriteReadyNow: 0;
  providerCallReadyNow: 0;
  realtimeSubscriptionReadyNow: 0;
  mediaSignedUrlReadyNow: 0;
  fakeRowsAllowedNow: 0;
  sampleSnapshots: readonly StreamFoundationReadModelSnapshot[];
}>;

export function getStreamFoundationReadModelSnapshotIndex(): StreamFoundationReadModelSnapshotIndex {
  const sampleSnapshots = STREAM_FOUNDATION_READ_MODEL_CONTRACTS.map((contract) => createStreamFoundationReadModelEmptySnapshot(contract.readModelId));

  return {
    stage: "BACKEND_STREAM_FOUNDATION_136H_READ_MODELS_STAGING",
    totalReadModels: STREAM_FOUNDATION_READ_MODEL_CONTRACTS.length,
    contractReadyEmptySourceOnly: STREAM_FOUNDATION_READ_MODEL_CONTRACTS.filter((contract) => contract.status === "contract_ready_empty_source_only").length,
    blockedReadModels: STREAM_FOUNDATION_READ_MODEL_CONTRACTS.filter((contract) => contract.severity === "blocked").length,
    reviewRequiredReadModels: STREAM_FOUNDATION_READ_MODEL_CONTRACTS.filter((contract) => contract.severity === "review_required").length,
    lockedReadModels: STREAM_FOUNDATION_READ_MODEL_CONTRACTS.filter((contract) => contract.severity === "locked").length,
    routeMountedNow: 0,
    databaseReadReadyNow: 0,
    databaseWriteReadyNow: 0,
    providerCallReadyNow: 0,
    realtimeSubscriptionReadyNow: 0,
    mediaSignedUrlReadyNow: 0,
    fakeRowsAllowedNow: 0,
    sampleSnapshots,
  };
}
