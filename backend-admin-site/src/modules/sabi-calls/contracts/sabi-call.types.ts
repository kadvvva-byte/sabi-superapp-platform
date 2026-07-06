export type JsonPrimitive = string | number | boolean | null;
export type JsonRecord = Record<string, unknown>;

export type SabiCallId = string;
export type SabiUserId = string;
export type SabiCallUserId = SabiUserId;
export type SabiCallContextId = string;

export type SabiCallKind = "audio" | "video";
export type SabiCallContextType = "direct" | "messenger" | "group" | "channel" | "business" | "support" | "stream" | "unknown";
export type SabiCallDirection = "incoming" | "outgoing";
export type SabiCallStatus = "created" | "ringing" | "connecting" | "active" | "declined" | "cancelled" | "ended" | "missed" | "failed";
export type SabiCallParticipantRole = "initiator" | "callee" | "participant" | "presenter" | "observer";
export type SabiCallParticipantStatus = "invited" | "ringing" | "joining" | "joined" | "declined" | "left" | "missed" | "removed" | "failed";
export type SabiCameraFacing = "front" | "back" | "unknown";
export type SabiCallToneType = "none" | "incoming_ringtone" | "outgoing_ringback" | "busy" | "ended" | "failed";
export type SabiCallToneKind = SabiCallToneType;
export type SabiCallSignalKind = "offer" | "answer" | "ice_candidate" | "renegotiate" | "bye" | "media_state" | "presentation_state" | "effect_state" | "translation_state";
export type SabiCallPresentationStatus = "idle" | "starting" | "active" | "paused" | "stopped" | "failed";
export type SabiCallPresentationSource = "camera" | "screen" | "document" | "whiteboard" | "unknown";
export type SabiCallEffectKind = "beauty" | "blur" | "background" | "voice" | "light" | "none";
export type SabiCallEffectStatus = "disabled" | "enabled" | "failed";
export type SabiCallTranslationStatus = "disabled" | "starting" | "active" | "provider_not_configured" | "failed" | "stopped";
export type SabiCallFailureCode = "unknown" | "not_found" | "not_allowed" | "invalid_state" | "participant_not_found" | "initiator_required" | "target_required" | "self_call_not_allowed" | "provider_not_configured" | "signaling_error" | "media_error" | "presentation_error" | "translation_error";
export type SabiCallMetadataValue = JsonPrimitive;
export type SabiCallMetadata = Record<string, SabiCallMetadataValue>;

export type SabiCallMediaState = {
  audioEnabled: boolean;
  videoEnabled: boolean;
  speakerEnabled: boolean;
  screenShareEnabled: boolean;
  cameraFacing: SabiCameraFacing;
  updatedAt: string;
};
export type SabiCallParticipantMediaState = SabiCallMediaState;

export type SabiCallParticipant = {
  id: string;
  callId: SabiCallId;
  userId: SabiUserId;
  role: SabiCallParticipantRole;
  status: SabiCallParticipantStatus;
  media: SabiCallMediaState;
  joinedAt: string | null;
  leftAt: string | null;
  createdAt: string;
  updatedAt: string;
};
export type SabiCallParticipantDto = SabiCallParticipant;

export type SabiCallToneState = {
  type: SabiCallToneType;
  forUserId: SabiUserId | null;
  startedAt: string | null;
  stoppedAt: string | null;
  reason: string | null;
};

export type SabiCallPresentationState = {
  status: SabiCallPresentationStatus;
  source: SabiCallPresentationSource;
  presenterUserId: SabiUserId | null;
  startedAt: string | null;
  pausedAt: string | null;
  stoppedAt: string | null;
  failureReason: string | null;
};

export type SabiCallEffectState = {
  status: SabiCallEffectStatus;
  kind: SabiCallEffectKind;
  effectKey: string | null;
  ownerUserId: SabiUserId | null;
  config: SabiCallMetadata;
  updatedAt: string | null;
  failureReason: string | null;
};

export type SabiCallTranslationState = {
  status: SabiCallTranslationStatus;
  sourceLanguage: string | null;
  targetLanguage: string | null;
  ownerUserId: SabiUserId | null;
  sessionId: string | null;
  startedAt: string | null;
  stoppedAt: string | null;
  failureReason: string | null;
};

export type SabiCallSignal = {
  id: string;
  callId: SabiCallId;
  senderUserId: SabiUserId;
  receiverUserId: SabiUserId | null;
  kind: SabiCallSignalKind;
  type: SabiCallSignalKind;
  payload: SabiCallMetadata;
  createdAt: string;
};
export type SabiCallSignalDto = SabiCallSignal;

export type SabiCallEventKind = "call.created" | "call.ringing" | "call.accepted" | "call.declined" | "call.cancelled" | "call.ended" | "call.missed" | "call.failed" | "call.participant.updated" | "call.media.updated" | "call.tone.started" | "call.tone.stopped" | "call.signal.created" | "call.presentation.started" | "call.presentation.stopped" | "call.effect.updated" | "call.translation.updated";
export type SabiCallEventName = SabiCallEventKind;
export type SabiCallEvent = {
  id: string;
  callId: SabiCallId;
  kind: SabiCallEventKind;
  event: SabiCallEventKind;
  actorUserId: SabiUserId | null;
  payload: SabiCallMetadata;
  createdAt: string;
};
export type SabiCallEventDto = SabiCallEvent;

export type SabiCallSession = {
  id: SabiCallId;
  kind: SabiCallKind;
  status: SabiCallStatus;
  contextType: SabiCallContextType;
  contextId: SabiCallContextId | null;
  initiatedByUserId: SabiUserId;
  participants: SabiCallParticipant[];
  tone: SabiCallToneState;
  presentation: SabiCallPresentationState;
  effect: SabiCallEffectState;
  effects: SabiCallEffectState;
  translation: SabiCallTranslationState;
  metadata: SabiCallMetadata;
  createdAt: string;
  updatedAt: string;
  startedAt: string | null;
  connectedAt: string | null;
  endedAt: string | null;
  failureCode: SabiCallFailureCode | null;
  failureReason: string | null;
};
export type SabiCallSessionDto = SabiCallSession;
export type SabiCallPublicSession = SabiCallSession & { direction: SabiCallDirection };

export type CreateSabiCallCommand = { kind: SabiCallKind; initiatedByUserId: SabiUserId; initiatorUserId?: SabiUserId; targetUserIds: SabiUserId[]; contextType?: SabiCallContextType; contextId?: SabiCallContextId | null; metadata?: SabiCallMetadata };
export type CreateSabiCallRequest = CreateSabiCallCommand;
export type AcceptSabiCallCommand = { callId: SabiCallId; userId: SabiUserId };
export type DeclineSabiCallCommand = { callId: SabiCallId; userId: SabiUserId; reason?: string | null };
export type CancelSabiCallCommand = { callId: SabiCallId; userId: SabiUserId; reason?: string | null };
export type EndSabiCallCommand = { callId: SabiCallId; userId: SabiUserId; reason?: string | null };
export type FailSabiCallCommand = { callId: SabiCallId; userId: SabiUserId; code?: SabiCallFailureCode; reason: string };
export type UpdateSabiCallMediaCommand = { callId: SabiCallId; userId: SabiUserId; audioEnabled?: boolean; videoEnabled?: boolean; speakerEnabled?: boolean; screenShareEnabled?: boolean; cameraFacing?: SabiCameraFacing };
export type CreateSabiCallSignalCommand = { callId: SabiCallId; senderUserId: SabiUserId; receiverUserId?: SabiUserId | null; kind: SabiCallSignalKind; type?: SabiCallSignalKind; payload: SabiCallMetadata };
export type StartSabiCallPresentationCommand = { callId: SabiCallId; presenterUserId: SabiUserId; source?: SabiCallPresentationSource };
export type StopSabiCallPresentationCommand = { callId: SabiCallId; userId: SabiUserId; reason?: string | null };
export type UpdateSabiCallEffectCommand = { callId: SabiCallId; userId: SabiUserId; kind?: SabiCallEffectKind; effectKey: string | null; enabled: boolean; config?: SabiCallMetadata };
export type StartSabiCallTranslationCommand = { callId: SabiCallId; userId: SabiUserId; sourceLanguage: string; targetLanguage: string };
export type StopSabiCallTranslationCommand = { callId: SabiCallId; userId: SabiUserId };
export type TranslateSabiCallSegmentCommand = { callId: SabiCallId; userId: SabiUserId; sourceLanguage: string; targetLanguage: string; text: string; segmentId?: string | null; metadata?: SabiCallMetadata };
export type SabiCallTranslationSegmentResult = { ok: boolean; callId: SabiCallId; segmentId: string; sourceLanguage: string; targetLanguage: string; sourceText: string; translatedText: string | null; errorCode: SabiCallFailureCode | null; errorMessage: string | null };
export type ListSabiCallsQuery = { userId?: SabiUserId; status?: SabiCallStatus; contextType?: SabiCallContextType; contextId?: SabiCallContextId; limit?: number };
export type SabiCallRealtimeEnvelope<TPayload> = { event: SabiCallEventKind; callId: SabiCallId; targetUserIds: SabiUserId[]; payload: TPayload; emittedAt: string };
export type SabiCallIceCandidatePayload = { candidate: string; sdpMid?: string | null; sdpMLineIndex?: number | null };
