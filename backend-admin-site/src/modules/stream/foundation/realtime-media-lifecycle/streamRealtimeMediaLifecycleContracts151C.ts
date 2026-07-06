/**
 * BACKEND-STREAM-FOUNDATION-151C
 * Stream realtime/media lifecycle source-only core contracts.
 *
 * Safe-disabled by default:
 * - provider_not_configured
 * - runtimeEnabled false
 * - provider/media/database/wallet/money/fake-success disabled
 */

export type StreamProviderStatus151C = "provider_not_configured";

export type StreamRoomLifecycleStatus151C =
  | "draft"
  | "scheduled"
  | "waiting"
  | "live_disabled"
  | "ended"
  | "blocked";

export type StreamRoomMode151C =
  | "single"
  | "group"
  | "battle"
  | "audio"
  | "business"
  | "shorts_deferred";

export type StreamParticipantRole151C =
  | "host"
  | "co_host"
  | "guest"
  | "viewer"
  | "moderator";

export type StreamParticipantConnectionState151C =
  | "not_connected"
  | "join_requested"
  | "joined_disabled"
  | "left"
  | "blocked";

export type StreamRealtimeEventType151C =
  | "room_lifecycle_snapshot"
  | "participant_session_snapshot"
  | "media_lifecycle_snapshot"
  | "moderation_risk_signal"
  | "provider_boundary_snapshot"
  | "business_stream_readiness_snapshot"
  | "shorts_deferred_publish_snapshot";

export type StreamCaptureState151C =
  | "not_started"
  | "camera_preview_only"
  | "provider_disabled"
  | "ended";

export type StreamRecordingState151C =
  | "not_allowed"
  | "not_started"
  | "disabled";

export type StreamQualityState151C =
  | "unknown"
  | "local_preview_only"
  | "provider_not_configured";

export type StreamModerationSeverity151C =
  | "info"
  | "low"
  | "medium"
  | "high"
  | "blocked";

export type StreamModerationEvidenceMode151C =
  | "metadata_only"
  | "user_report"
  | "admin_review_required";

export type StreamSafeDisabledBoundary151C = {
  providerStatus: StreamProviderStatus151C;
  runtimeEnabled: false;
  providerCallAllowedNow: false;
  providerBindingAllowedNow: false;
  providerCredentialReadAllowedNow: false;
  providerTokenIssueAllowedNow: false;
  mediaRoomCreateAllowedNow: false;
  realtimeGatewayStartAllowedNow: false;
  recordingStartAllowedNow: false;
  databaseWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowedNow: false;
};

export type StreamRoomLifecycleState151C = StreamSafeDisabledBoundary151C & {
  roomId: string;
  status: StreamRoomLifecycleStatus151C;
  mode: StreamRoomMode151C;
  safeDisabledReason: string;
  updatedAt: string;
};

export type StreamParticipantSessionState151C = StreamSafeDisabledBoundary151C & {
  sessionId: string;
  roomId: string;
  userId: string;
  role: StreamParticipantRole151C;
  connectionState: StreamParticipantConnectionState151C;
  joinedAt: string | null;
  leftAt: string | null;
};

export type StreamRealtimeEventEnvelope151C = StreamSafeDisabledBoundary151C & {
  eventId: string;
  roomId: string;
  type: StreamRealtimeEventType151C;
  createdAt: string;
  payload: Record<string, unknown>;
  safety: {
    moderationRequired: boolean;
    adminReviewRequired: boolean;
    evidenceMode: StreamModerationEvidenceMode151C;
  };
};

export type StreamMediaSessionLifecycleState151C = StreamSafeDisabledBoundary151C & {
  mediaSessionId: string;
  roomId: string;
  captureState: StreamCaptureState151C;
  recordingState: StreamRecordingState151C;
  qualityState: StreamQualityState151C;
};

export type StreamModerationRiskSignal151C = StreamSafeDisabledBoundary151C & {
  signalId: string;
  roomId: string;
  severity: StreamModerationSeverity151C;
  reason: string;
  evidenceMode: StreamModerationEvidenceMode151C;
  createdAt: string;
};

export type StreamProviderBoundaryState151C = StreamSafeDisabledBoundary151C & {
  boundaryId: string;
  note: string;
};

export type BusinessStreamReadinessCard151C = StreamSafeDisabledBoundary151C & {
  businessStreamEnabled: false;
  silkRoadProductLinkAllowed: false;
  paymentAllowedNow: false;
  kybRequired: true;
  readinessReason: string;
};

export type ShortsDeferredPublishBoundary151C = StreamSafeDisabledBoundary151C & {
  shortsPublishRuntimeReady: false;
  uploadProviderReady: false;
  moderationRequired: true;
  walletMoneyAllowedNow: false;
  readinessReason: string;
};

export type StreamRealtimeMediaLifecycleSnapshot151C = {
  version: "BACKEND-STREAM-FOUNDATION-151C";
  generatedAt: string;
  roomLifecycle: StreamRoomLifecycleState151C;
  participantSession: StreamParticipantSessionState151C;
  realtimeEvent: StreamRealtimeEventEnvelope151C;
  mediaSession: StreamMediaSessionLifecycleState151C;
  moderationSignal: StreamModerationRiskSignal151C;
  providerBoundary: StreamProviderBoundaryState151C;
  businessStream: BusinessStreamReadinessCard151C;
  shortsDeferredPublish: ShortsDeferredPublishBoundary151C;
};
