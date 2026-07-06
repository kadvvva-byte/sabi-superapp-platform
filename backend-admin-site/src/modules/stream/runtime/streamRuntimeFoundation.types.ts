export type StreamRuntimeRoomStatus = "draft" | "scheduled" | "live" | "paused" | "ended" | "blocked";
export type StreamRuntimeRoomMode = "single" | "group" | "battle" | "audio" | "video" | "business";
export type StreamRuntimeParticipantRole = "host" | "cohost" | "guest" | "viewer" | "moderator";
export type StreamRuntimeParticipantState = "active" | "left" | "removed" | "muted";

export type StreamRuntimeSafety = {
  providerStatus: "provider_not_configured";
  providerSafeDisabled: true;
  databaseMode: "memory_only_until_schema_stage";
  fakeLiveAllowed: false;
  providerCallAllowed: false;
  mediaRoomCreationAllowed: false;
  realtimeGatewayStartAllowed: false;
  recordingStartAllowed: false;
  walletMutationAllowed: false;
  moneyMovementAllowed: false;
};

export type StreamRuntimeRoom = {
  id: string;
  title: string;
  hostUserId: string;
  mode: StreamRuntimeRoomMode;
  status: StreamRuntimeRoomStatus;
  category?: string;
  country?: string;
  language?: string;
  businessProductId?: string;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  pausedAt?: string;
  endedAt?: string;
  blockedAt?: string;
  blockedByUserId?: string;
  blockReason?: string;
  safety: StreamRuntimeSafety;
};

export type StreamRuntimeParticipant = {
  id: string;
  roomId: string;
  userId: string;
  role: StreamRuntimeParticipantRole;
  state: StreamRuntimeParticipantState;
  joinedAt: string;
  leftAt?: string;
  mutedAt?: string;
  removedAt?: string;
  removedByUserId?: string;
  removeReason?: string;
};

export type StreamRuntimeEvent = {
  id: string;
  roomId: string;
  type: string;
  actorUserId?: string;
  createdAt: string;
  payload: Record<string, unknown>;
};

export type StreamRuntimeModerationReport = {
  id: string;
  roomId: string;
  reporterUserId: string;
  targetUserId?: string;
  reason: string;
  details?: string;
  createdAt: string;
  reviewedAt?: string;
  reviewedByUserId?: string;
  status: "queued_for_admin_review" | "reviewed" | "dismissed";
};

export type StreamRuntimeRecordingGate = {
  roomId: string;
  status: "provider_not_configured";
  recordingStartAllowed: false;
  recordingProviderConfigured: false;
  reason: "recording_provider_not_configured";
};

export type StreamRuntimeRealtimeGate = {
  roomId: string;
  status: "contract_ready_provider_not_configured";
  realtimeGatewayStartAllowed: false;
  realtimeProviderConfigured: false;
  reason: "realtime_provider_not_configured";
};
