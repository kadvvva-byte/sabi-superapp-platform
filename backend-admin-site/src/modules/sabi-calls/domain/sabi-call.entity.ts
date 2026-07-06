import type { CreateSabiCallSignalCommand, SabiCallEffectKind, SabiCallEvent, SabiCallEventKind, SabiCallFailureCode, SabiCallMetadata, SabiCallParticipant, SabiCallPresentationSource, SabiCallSession, SabiCallSignal, SabiCallSignalKind, SabiCallStatus, SabiUserId } from "../contracts";
import { canTransitionSabiCall } from "./sabi-call-state-machine";
import { SabiCallDomainError, SabiCallPolicyError } from "./sabi-call-errors";
import { normalizeSabiCallMetadata } from "./sabi-call-policy";
import { SabiCallParticipantEntity } from "./sabi-call-participant.entity";
function iso(date: Date): string { return date.toISOString(); }
export class SabiCallEntity {
  private props: SabiCallSession;
  private signalItems: SabiCallSignal[];
  private eventItems: SabiCallEvent[];
  constructor(session: SabiCallSession, signals: SabiCallSignal[] = [], events: SabiCallEvent[] = []) {
    this.props = JSON.parse(JSON.stringify(session)) as SabiCallSession;
    this.signalItems = signals.map(item => ({ ...item, payload: { ...item.payload } }));
    this.eventItems = events.map(item => ({ ...item, payload: { ...item.payload } }));
  }
  static create(params: { id: string; kind: "audio" | "video"; contextType: SabiCallSession["contextType"]; contextId: string | null; initiatedByUserId: SabiUserId; targetUserIds: SabiUserId[]; metadata: SabiCallMetadata; now: Date; idFactory: () => string }): SabiCallEntity {
    const createdAt = iso(params.now);
    const callId = params.id;
    const participants: SabiCallParticipant[] = [
      SabiCallParticipantEntity.create({ id: params.idFactory(), callId, userId: params.initiatedByUserId, role: "initiator", status: "joined", now: params.now, videoEnabled: params.kind === "video" }).toDto(),
      ...params.targetUserIds.map(userId => SabiCallParticipantEntity.create({ id: params.idFactory(), callId, userId, role: "callee", status: "ringing", now: params.now, videoEnabled: params.kind === "video" }).toDto()),
    ];
    return new SabiCallEntity({
      id: callId, kind: params.kind, status: "ringing", contextType: params.contextType, contextId: params.contextId, initiatedByUserId: params.initiatedByUserId,
      participants,
      tone: { type: "outgoing_ringback", forUserId: params.initiatedByUserId, startedAt: createdAt, stoppedAt: null, reason: null },
      presentation: { status: "idle", source: "unknown", presenterUserId: null, startedAt: null, pausedAt: null, stoppedAt: null, failureReason: null },
      effect: { status: "disabled", kind: "none", effectKey: null, ownerUserId: null, config: {}, updatedAt: null, failureReason: null },
      effects: { status: "disabled", kind: "none", effectKey: null, ownerUserId: null, config: {}, updatedAt: null, failureReason: null },
      translation: { status: "disabled", sourceLanguage: null, targetLanguage: null, ownerUserId: null, sessionId: null, startedAt: null, stoppedAt: null, failureReason: null },
      metadata: normalizeSabiCallMetadata(params.metadata), createdAt, updatedAt: createdAt, startedAt: null, connectedAt: null, endedAt: null, failureCode: null, failureReason: null,
    });
  }
  static fromSession(session: SabiCallSession): SabiCallEntity { return new SabiCallEntity(session); }
  get id(): string { return this.props.id; }
  get status(): SabiCallStatus { return this.props.status; }
  get initiatedByUserId(): string { return this.props.initiatedByUserId; }
  get participants(): SabiCallParticipant[] { return this.props.participants.map(p => ({ ...p, media: { ...p.media } })); }
  get signals(): SabiCallSignal[] { return this.signalItems.map(s => ({ ...s, payload: { ...s.payload } })); }
  get events(): SabiCallEvent[] { return this.eventItems.map(e => ({ ...e, payload: { ...e.payload } })); }
  private transition(to: SabiCallStatus, now: Date): void { if (!canTransitionSabiCall(this.props.status, to)) throw new SabiCallPolicyError("sabi_call_invalid_state"); this.props.status = to; this.props.updatedAt = iso(now); }
  private participant(userId: string): SabiCallParticipantEntity { const found = this.props.participants.find(p => p.userId === userId); if (!found) throw new SabiCallDomainError("participant_not_found", `Sabi call participant not found: ${userId}`); return new SabiCallParticipantEntity(found); }
  private replaceParticipant(entity: SabiCallParticipantEntity): void { const dto = entity.toDto(); this.props.participants = this.props.participants.map(p => p.userId === dto.userId ? dto : p); this.props.updatedAt = dto.updatedAt; }
  assertParticipant(userId: string): void { this.participant(userId); }
  accept(params: { userId: string; now: Date }): void { const p = this.participant(params.userId); p.transition("joined", params.now); this.replaceParticipant(p); if (this.props.status === "ringing" || this.props.status === "connecting") this.transition("active", params.now); this.props.startedAt = this.props.startedAt ?? iso(params.now); this.props.connectedAt = this.props.connectedAt ?? iso(params.now); this.stopTone(params.now, "accepted"); }
  decline(params: { userId: string; reason?: string | null; now: Date }): void { const p = this.participant(params.userId); p.transition("declined", params.now); this.replaceParticipant(p); this.transition("declined", params.now); this.props.endedAt = iso(params.now); this.stopTone(params.now, params.reason ?? "declined"); }
  cancel(params: { userId: string; reason?: string | null; now: Date }): void { if (params.userId !== this.props.initiatedByUserId) this.assertParticipant(params.userId); this.transition("cancelled", params.now); this.props.endedAt = iso(params.now); this.stopTone(params.now, params.reason ?? "cancelled"); }
  end(params: { userId: string; reason?: string | null; now: Date }): void { this.assertParticipant(params.userId); if (this.props.status !== "ended") this.transition("ended", params.now); this.props.endedAt = iso(params.now); this.stopTone(params.now, params.reason ?? "ended"); this.props.participants = this.props.participants.map(p => p.status === "joined" ? { ...p, status: "left", leftAt: iso(params.now), updatedAt: iso(params.now) } : p); }
  fail(params: { userId: string; code?: SabiCallFailureCode; reason: string; now: Date }): void { this.assertParticipant(params.userId); this.transition("failed", params.now); this.props.failureCode = params.code ?? "unknown"; this.props.failureReason = params.reason; this.props.endedAt = iso(params.now); this.props.tone = { type: "failed", forUserId: null, startedAt: iso(params.now), stoppedAt: null, reason: params.reason }; }
  updateParticipantMedia(params: { userId: string; now: Date; audioEnabled?: boolean; videoEnabled?: boolean; speakerEnabled?: boolean; screenShareEnabled?: boolean; cameraFacing?: "front" | "back" | "unknown" }): void { const p = this.participant(params.userId); p.updateMedia(params); this.replaceParticipant(p); }
  createSignal(params: Omit<CreateSabiCallSignalCommand, "payload"> & { id: string; kind: SabiCallSignalKind; payload: SabiCallMetadata; now: Date }): SabiCallSignal { this.assertParticipant(params.senderUserId); const signal: SabiCallSignal = { id: params.id, callId: this.props.id, senderUserId: params.senderUserId, receiverUserId: params.receiverUserId ?? null, kind: params.kind, type: params.kind, payload: normalizeSabiCallMetadata(params.payload), createdAt: iso(params.now) }; this.signalItems.push(signal); return { ...signal, payload: { ...signal.payload } }; }
  startPresentation(params: { presenterUserId: string; source?: SabiCallPresentationSource; now: Date }): void { this.assertParticipant(params.presenterUserId); this.props.presentation = { status: "active", source: params.source ?? "screen", presenterUserId: params.presenterUserId, startedAt: iso(params.now), pausedAt: null, stoppedAt: null, failureReason: null }; this.props.updatedAt = iso(params.now); }
  stopPresentation(params: { userId: string; reason?: string | null; now: Date }): void { this.assertParticipant(params.userId); this.props.presentation = { ...this.props.presentation, status: "stopped", stoppedAt: iso(params.now), failureReason: params.reason ?? null }; this.props.updatedAt = iso(params.now); }
  updateEffect(params: { userId: string; enabled: boolean; kind?: SabiCallEffectKind; effectKey: string | null; config?: SabiCallMetadata; now: Date }): void { this.assertParticipant(params.userId); const next = { status: params.enabled ? "enabled" : "disabled", kind: params.kind ?? "none", effectKey: params.enabled ? params.effectKey : null, ownerUserId: params.enabled ? params.userId : null, config: normalizeSabiCallMetadata(params.config), updatedAt: iso(params.now), failureReason: null } as const; this.props.effect = next; this.props.effects = next; this.props.updatedAt = iso(params.now); }
  startTranslation(params: { userId: string; sourceLanguage: string; targetLanguage: string; providerConfigured: boolean; sessionId: string | null; now: Date }): void { this.assertParticipant(params.userId); this.props.translation = { status: params.providerConfigured ? "active" : "provider_not_configured", sourceLanguage: params.sourceLanguage, targetLanguage: params.targetLanguage, ownerUserId: params.userId, sessionId: params.sessionId, startedAt: iso(params.now), stoppedAt: null, failureReason: params.providerConfigured ? null : "provider_not_configured" }; this.props.updatedAt = iso(params.now); }
  stopTranslation(params: { userId: string; now: Date }): void { this.assertParticipant(params.userId); this.props.translation = { ...this.props.translation, status: "stopped", stoppedAt: iso(params.now) }; this.props.updatedAt = iso(params.now); }
  createEvent(params: { id: string; kind: SabiCallEventKind; actorUserId: string | null; payload: SabiCallMetadata; now: Date }): SabiCallEvent { const event: SabiCallEvent = { id: params.id, callId: this.props.id, kind: params.kind, event: params.kind, actorUserId: params.actorUserId, payload: normalizeSabiCallMetadata(params.payload), createdAt: iso(params.now) }; this.eventItems.push(event); return { ...event, payload: { ...event.payload } }; }
  private stopTone(now: Date, reason: string): void { this.props.tone = { ...this.props.tone, type: "none", stoppedAt: iso(now), reason }; }
  snapshot(_viewerUserId?: string): SabiCallSession { return this.toDto(); }
  toDto(): SabiCallSession { const copy = JSON.parse(JSON.stringify(this.props)) as SabiCallSession; copy.effects = copy.effect; return copy; }
}
