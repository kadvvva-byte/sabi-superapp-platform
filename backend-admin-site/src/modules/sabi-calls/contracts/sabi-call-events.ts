import type { SabiCallEvent, SabiCallEventKind, SabiCallRealtimeEnvelope } from "./sabi-call.types";
export const SABI_CALL_EVENTS = {
  CREATED: "call.created",
  RINGING: "call.ringing",
  ACCEPTED: "call.accepted",
  DECLINED: "call.declined",
  CANCELLED: "call.cancelled",
  ENDED: "call.ended",
  FAILED: "call.failed",
  MEDIA_UPDATED: "call.media.updated",
  SIGNAL_CREATED: "call.signal.created",
  PRESENTATION_STARTED: "call.presentation.started",
  PRESENTATION_STOPPED: "call.presentation.stopped",
  EFFECT_UPDATED: "call.effect.updated",
  TRANSLATION_UPDATED: "call.translation.updated",
} as const;
export type SabiCallEventName = SabiCallEventKind;
export type SabiCallRealtimeEvent<TPayload = unknown> = SabiCallRealtimeEnvelope<TPayload>;
export type { SabiCallEvent, SabiCallEventKind };
