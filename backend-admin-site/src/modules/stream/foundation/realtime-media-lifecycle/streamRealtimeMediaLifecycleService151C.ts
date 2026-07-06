/**
 * BACKEND-STREAM-FOUNDATION-151C
 * Pure deterministic Stream realtime/media lifecycle service.
 *
 * This file must stay source-only:
 * - no route mount
 * - no runtime start
 * - no provider call
 * - no database access
 * - no Wallet/money movement
 */

import type {
  BusinessStreamReadinessCard151C,
  ShortsDeferredPublishBoundary151C,
  StreamMediaSessionLifecycleState151C,
  StreamModerationRiskSignal151C,
  StreamParticipantSessionState151C,
  StreamProviderBoundaryState151C,
  StreamRealtimeEventEnvelope151C,
  StreamRealtimeMediaLifecycleSnapshot151C,
  StreamRoomLifecycleState151C,
  StreamSafeDisabledBoundary151C,
} from "./streamRealtimeMediaLifecycleContracts151C";

export type StreamRealtimeMediaLifecycleSnapshotInput151C = {
  roomId?: string;
  userId?: string;
  generatedAt?: string;
};

export function createStreamSafeDisabledBoundary151C(): StreamSafeDisabledBoundary151C {
  return {
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
  };
}

export function createStreamRoomLifecycleState151C(input: StreamRealtimeMediaLifecycleSnapshotInput151C = {}): StreamRoomLifecycleState151C {
  const boundary = createStreamSafeDisabledBoundary151C();

  return {
    ...boundary,
    roomId: input.roomId ?? "stream_room_151c_placeholder",
    status: "live_disabled",
    mode: "single",
    safeDisabledReason: "provider_not_configured",
    updatedAt: input.generatedAt ?? "1970-01-01T00:00:00.000Z",
  };
}

export function createStreamParticipantSessionState151C(input: StreamRealtimeMediaLifecycleSnapshotInput151C = {}): StreamParticipantSessionState151C {
  const boundary = createStreamSafeDisabledBoundary151C();
  const roomId = input.roomId ?? "stream_room_151c_placeholder";
  const userId = input.userId ?? "stream_user_151c_placeholder";

  return {
    ...boundary,
    sessionId: `${roomId}:${userId}:session_151c`,
    roomId,
    userId,
    role: "viewer",
    connectionState: "not_connected",
    joinedAt: null,
    leftAt: null,
  };
}

export function createStreamRealtimeEventEnvelope151C(input: StreamRealtimeMediaLifecycleSnapshotInput151C = {}): StreamRealtimeEventEnvelope151C {
  const boundary = createStreamSafeDisabledBoundary151C();
  const roomId = input.roomId ?? "stream_room_151c_placeholder";

  return {
    ...boundary,
    eventId: `${roomId}:event_151c`,
    roomId,
    type: "room_lifecycle_snapshot",
    createdAt: input.generatedAt ?? "1970-01-01T00:00:00.000Z",
    payload: {
      providerStatus: boundary.providerStatus,
      runtimeEnabled: boundary.runtimeEnabled,
      safeDisabledReason: "provider_not_configured",
    },
    safety: {
      moderationRequired: true,
      adminReviewRequired: false,
      evidenceMode: "metadata_only",
    },
  };
}

export function createStreamMediaSessionLifecycleState151C(input: StreamRealtimeMediaLifecycleSnapshotInput151C = {}): StreamMediaSessionLifecycleState151C {
  const boundary = createStreamSafeDisabledBoundary151C();
  const roomId = input.roomId ?? "stream_room_151c_placeholder";

  return {
    ...boundary,
    mediaSessionId: `${roomId}:media_session_151c`,
    roomId,
    captureState: "provider_disabled",
    recordingState: "not_allowed",
    qualityState: "provider_not_configured",
  };
}

export function createStreamModerationRiskSignal151C(input: StreamRealtimeMediaLifecycleSnapshotInput151C = {}): StreamModerationRiskSignal151C {
  const boundary = createStreamSafeDisabledBoundary151C();
  const roomId = input.roomId ?? "stream_room_151c_placeholder";

  return {
    ...boundary,
    signalId: `${roomId}:moderation_signal_151c`,
    roomId,
    severity: "info",
    reason: "metadata_only_safe_disabled_foundation",
    evidenceMode: "metadata_only",
    createdAt: input.generatedAt ?? "1970-01-01T00:00:00.000Z",
  };
}

export function createStreamProviderBoundaryState151C(): StreamProviderBoundaryState151C {
  const boundary = createStreamSafeDisabledBoundary151C();

  return {
    ...boundary,
    boundaryId: "stream_provider_boundary_151c",
    note: "provider_not_configured",
  };
}

export function createBusinessStreamReadinessCard151C(): BusinessStreamReadinessCard151C {
  const boundary = createStreamSafeDisabledBoundary151C();

  return {
    ...boundary,
    businessStreamEnabled: false,
    silkRoadProductLinkAllowed: false,
    paymentAllowedNow: false,
    kybRequired: true,
    readinessReason: "business_stream_requires_verified_business_and_provider_boundary",
  };
}

export function createShortsDeferredPublishBoundary151C(): ShortsDeferredPublishBoundary151C {
  const boundary = createStreamSafeDisabledBoundary151C();

  return {
    ...boundary,
    shortsPublishRuntimeReady: false,
    uploadProviderReady: false,
    moderationRequired: true,
    walletMoneyAllowedNow: false,
    readinessReason: "shorts_publish_provider_is_deferred",
  };
}

export function createStreamRealtimeMediaLifecycleSnapshot151C(input: StreamRealtimeMediaLifecycleSnapshotInput151C = {}): StreamRealtimeMediaLifecycleSnapshot151C {
  return {
    version: "BACKEND-STREAM-FOUNDATION-151C",
    generatedAt: input.generatedAt ?? "1970-01-01T00:00:00.000Z",
    roomLifecycle: createStreamRoomLifecycleState151C(input),
    participantSession: createStreamParticipantSessionState151C(input),
    realtimeEvent: createStreamRealtimeEventEnvelope151C(input),
    mediaSession: createStreamMediaSessionLifecycleState151C(input),
    moderationSignal: createStreamModerationRiskSignal151C(input),
    providerBoundary: createStreamProviderBoundaryState151C(),
    businessStream: createBusinessStreamReadinessCard151C(),
    shortsDeferredPublish: createShortsDeferredPublishBoundary151C(),
  };
}
