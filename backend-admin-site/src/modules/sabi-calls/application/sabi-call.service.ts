import type {
  AcceptSabiCallCommand,
  CancelSabiCallCommand,
  CreateSabiCallCommand,
  CreateSabiCallSignalCommand,
  DeclineSabiCallCommand,
  EndSabiCallCommand,
  FailSabiCallCommand,
  ListSabiCallsQuery,
  SabiCallEventKind,
  SabiCallFailureCode,
  SabiCallMetadata,
  SabiCallParticipantStatus,
  SabiCallSession,
  SabiCallSignal,
  SabiCallStatus,
  SabiCallTranslationSegmentResult,
  StartSabiCallPresentationCommand,
  StartSabiCallTranslationCommand,
  StopSabiCallPresentationCommand,
  StopSabiCallTranslationCommand,
  TranslateSabiCallSegmentCommand,
  UpdateSabiCallEffectCommand,
  UpdateSabiCallMediaCommand,
} from "../contracts";
import {
  SabiCallEntity,
  SabiCallNotFoundError,
  assertSabiCallKind,
  assertSabiUserId,
  normalizeSabiCallMetadata,
  normalizeSabiCallTargets,
} from "../domain";
import type { SabiCallRepository } from "../infrastructure/persistence";
import {
  assertSabiCallTranslationText,
  createSabiCallTranslationBridge,
  normalizeSabiCallLanguage,
  type SabiCallTranslationBridge,
  type SabiCallTranslationProvider,
} from "../infrastructure/translation";

export type SabiCallRealtimePublisher = {
  publishToUsers<TPayload>(event: {
    event: SabiCallEventKind;
    callId: string;
    targetUserIds: string[];
    payload: TPayload;
  }): Promise<void> | void;
};

export type SabiCallServiceOptions = {
  repository: SabiCallRepository;
  realtime?: SabiCallRealtimePublisher | null;
  translationProvider?: SabiCallTranslationProvider | null;
  now?: () => Date;
  idFactory?: () => string;
};

function defaultIdFactory(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

function normalizeLimit(limit?: number): number {
  return Math.min(Math.max(limit ?? 50, 1), 100);
}

export class SabiCallService {
  private readonly repository: SabiCallRepository;
  private readonly realtime: SabiCallRealtimePublisher | null;
  private readonly translationBridge: SabiCallTranslationBridge;
  private readonly now: () => Date;
  private readonly idFactory: () => string;

  constructor(options: SabiCallServiceOptions) {
    this.repository = options.repository;
    this.realtime = options.realtime ?? null;
    this.translationBridge = createSabiCallTranslationBridge(options.translationProvider ?? null);
    this.now = options.now ?? (() => new Date());
    this.idFactory = options.idFactory ?? defaultIdFactory;
  }

  getTranslationHealth() {
    return this.translationBridge.getHealth();
  }

  async createCall(command: CreateSabiCallCommand): Promise<SabiCallSession> {
    const initiatedByUserId = command.initiatedByUserId ?? command.initiatorUserId ?? "";
    assertSabiUserId(initiatedByUserId, "sabi_call_initiator_required");
    assertSabiCallKind(command.kind);

    const targetUserIds = normalizeSabiCallTargets(
      initiatedByUserId,
      command.targetUserIds ?? []
    );

    const entity = SabiCallEntity.create({
      id: this.idFactory(),
      kind: command.kind,
      contextType: command.contextType ?? "direct",
      contextId: command.contextId ?? null,
      initiatedByUserId,
      targetUserIds,
      metadata: normalizeSabiCallMetadata(command.metadata),
      now: this.now(),
      idFactory: this.idFactory,
    });

    await this.repository.save(entity);
    await this.emitCallEvent(entity, "call.created", initiatedByUserId, { kind: command.kind });
    await this.emitCallEvent(entity, "call.ringing", initiatedByUserId, {
      tone: "incoming_ringtone",
    });

    return entity.toDto();
  }

  async getCall(callId: string): Promise<SabiCallSession> {
    return (await this.requireCall(callId)).toDto();
  }

  async listCalls(query: ListSabiCallsQuery = {}): Promise<SabiCallSession[]> {
    const calls = await this.repository.findMany({
      ...query,
      limit: normalizeLimit(query.limit),
    });

    return calls.map((call) => call.toDto());
  }

  async acceptCall(command: AcceptSabiCallCommand): Promise<SabiCallSession> {
    const call = await this.requireCall(command.callId);
    call.accept({ userId: command.userId, now: this.now() });
    await this.repository.save(call);
    await this.emitCallEvent(call, "call.accepted", command.userId, { userId: command.userId });
    return call.toDto();
  }

  async declineCall(command: DeclineSabiCallCommand): Promise<SabiCallSession> {
    const call = await this.requireCall(command.callId);
    call.decline({ userId: command.userId, reason: command.reason ?? null, now: this.now() });
    await this.repository.save(call);
    await this.emitCallEvent(call, "call.declined", command.userId, { userId: command.userId });
    return call.toDto();
  }

  async cancelCall(command: CancelSabiCallCommand): Promise<SabiCallSession> {
    const call = await this.requireCall(command.callId);
    call.cancel({ userId: command.userId, reason: command.reason ?? null, now: this.now() });
    await this.repository.save(call);
    await this.emitCallEvent(call, "call.cancelled", command.userId, { userId: command.userId });
    return call.toDto();
  }

  async endCall(command: EndSabiCallCommand): Promise<SabiCallSession> {
    const call = await this.requireCall(command.callId);
    call.end({ userId: command.userId, reason: command.reason ?? null, now: this.now() });
    await this.repository.save(call);
    await this.emitCallEvent(call, "call.ended", command.userId, { userId: command.userId });
    return call.toDto();
  }

  async failCall(command: FailSabiCallCommand): Promise<SabiCallSession> {
    const call = await this.requireCall(command.callId);
    call.fail({
      userId: command.userId,
      code: command.code ?? "unknown",
      reason: command.reason,
      now: this.now(),
    });
    await this.repository.save(call);
    await this.emitCallEvent(call, "call.failed", command.userId, {
      userId: command.userId,
      reason: command.reason,
    });
    return call.toDto();
  }

  async updateMedia(command: UpdateSabiCallMediaCommand): Promise<SabiCallSession> {
    const call = await this.requireCall(command.callId);
    call.updateParticipantMedia({ ...command, now: this.now() });
    await this.repository.save(call);
    await this.emitCallEvent(call, "call.media.updated", command.userId, { userId: command.userId });
    return call.toDto();
  }

  async createSignal(command: CreateSabiCallSignalCommand): Promise<SabiCallSignal> {
    const call = await this.requireCall(command.callId);
    const signal = call.createSignal({
      id: this.idFactory(),
      callId: command.callId,
      senderUserId: command.senderUserId,
      receiverUserId: command.receiverUserId ?? null,
      kind: command.kind ?? command.type ?? "offer",
      payload: normalizeSabiCallMetadata(command.payload),
      now: this.now(),
    });
    await this.repository.save(call);
    await this.emitCallEvent(call, "call.signal.created", command.senderUserId, {
      kind: signal.kind,
    });
    return signal;
  }

  async startPresentation(command: StartSabiCallPresentationCommand): Promise<SabiCallSession> {
    const call = await this.requireCall(command.callId);
    call.startPresentation({
      presenterUserId: command.presenterUserId,
      source: command.source ?? "screen",
      now: this.now(),
    });
    await this.repository.save(call);
    await this.emitCallEvent(call, "call.presentation.started", command.presenterUserId, {
      presenterUserId: command.presenterUserId,
    });
    return call.toDto();
  }

  async stopPresentation(command: StopSabiCallPresentationCommand): Promise<SabiCallSession> {
    const call = await this.requireCall(command.callId);
    call.stopPresentation({ userId: command.userId, reason: command.reason ?? null, now: this.now() });
    await this.repository.save(call);
    await this.emitCallEvent(call, "call.presentation.stopped", command.userId, { userId: command.userId });
    return call.toDto();
  }

  async updateEffect(command: UpdateSabiCallEffectCommand): Promise<SabiCallSession> {
    const call = await this.requireCall(command.callId);
    call.updateEffect({
      userId: command.userId,
      enabled: command.enabled,
      kind: command.kind,
      effectKey: command.effectKey,
      config: command.config,
      now: this.now(),
    });
    await this.repository.save(call);
    await this.emitCallEvent(call, "call.effect.updated", command.userId, { userId: command.userId });
    return call.toDto();
  }

  async startTranslation(command: StartSabiCallTranslationCommand): Promise<SabiCallSession> {
    const call = await this.requireCall(command.callId);
    const health = this.translationBridge.getHealth();
    const sourceLanguage = normalizeSabiCallLanguage(command.sourceLanguage, "auto");
    const targetLanguage = normalizeSabiCallLanguage(command.targetLanguage, "en");

    call.startTranslation({
      userId: command.userId,
      sourceLanguage,
      targetLanguage,
      providerConfigured: health.ready,
      sessionId: health.ready ? this.idFactory() : null,
      now: this.now(),
    });

    await this.repository.save(call);
    await this.emitCallEvent(call, "call.translation.updated", command.userId, {
      userId: command.userId,
      providerReady: health.ready,
      providerKey: health.providerKey ?? null,
      status: call.toDto().translation.status,
    });

    return call.toDto();
  }

  async stopTranslation(command: StopSabiCallTranslationCommand): Promise<SabiCallSession> {
    const call = await this.requireCall(command.callId);
    call.stopTranslation({ userId: command.userId, now: this.now() });
    await this.repository.save(call);
    await this.emitCallEvent(call, "call.translation.updated", command.userId, { userId: command.userId });
    return call.toDto();
  }

  async translateSegment(
    command: TranslateSabiCallSegmentCommand
  ): Promise<SabiCallTranslationSegmentResult> {
    const call = await this.requireCall(command.callId);
    call.assertParticipant(command.userId);

    const segmentId = command.segmentId?.trim() || this.idFactory();
    const sourceLanguage = normalizeSabiCallLanguage(command.sourceLanguage, "auto");
    const targetLanguage = normalizeSabiCallLanguage(command.targetLanguage, "en");
    const sourceText = assertSabiCallTranslationText(command.text);
    const health = this.translationBridge.getHealth();

    if (!health.ready) {
      const result: SabiCallTranslationSegmentResult = {
        ok: false,
        callId: command.callId,
        segmentId,
        sourceLanguage,
        targetLanguage,
        sourceText,
        translatedText: null,
        errorCode: "provider_not_configured",
        errorMessage: "Sabi Calls translation provider is not configured.",
      };
      await this.emitCallEvent(call, "call.translation.updated", command.userId, {
        ok: result.ok,
        segmentId: result.segmentId,
        sourceLanguage: result.sourceLanguage,
        targetLanguage: result.targetLanguage,
        translatedText: result.translatedText,
        errorCode: result.errorCode,
        errorMessage: result.errorMessage,
      });
      return result;
    }

    try {
      const translated = await this.translationBridge.provider.translateCallSegment({
        callId: command.callId,
        userId: command.userId,
        segmentId,
        sourceLanguage,
        targetLanguage,
        text: sourceText,
        metadata: normalizeSabiCallMetadata(command.metadata),
      });

      const result: SabiCallTranslationSegmentResult = {
        ok: true,
        callId: command.callId,
        segmentId,
        sourceLanguage,
        targetLanguage,
        sourceText,
        translatedText: translated.translatedText,
        errorCode: null,
        errorMessage: null,
      };

      await this.emitCallEvent(call, "call.translation.updated", command.userId, {
        ok: result.ok,
        segmentId: result.segmentId,
        sourceLanguage: result.sourceLanguage,
        targetLanguage: result.targetLanguage,
        translatedText: result.translatedText,
        errorCode: result.errorCode,
        errorMessage: result.errorMessage,
      });
      return result;
    } catch (error) {
      const result: SabiCallTranslationSegmentResult = {
        ok: false,
        callId: command.callId,
        segmentId,
        sourceLanguage,
        targetLanguage,
        sourceText,
        translatedText: null,
        errorCode: "translation_error",
        errorMessage: error instanceof Error ? error.message : "translation_error",
      };
      await this.emitCallEvent(call, "call.translation.updated", command.userId, {
        ok: result.ok,
        segmentId: result.segmentId,
        sourceLanguage: result.sourceLanguage,
        targetLanguage: result.targetLanguage,
        translatedText: result.translatedText,
        errorCode: result.errorCode,
        errorMessage: result.errorMessage,
      });
      return result;
    }
  }

  async getEvents(callId: string) {
    return (await this.requireCall(callId)).events;
  }

  async getSignals(callId: string) {
    return (await this.requireCall(callId)).signals;
  }

  isTerminalStatus(status: SabiCallStatus): boolean {
    return ["declined", "cancelled", "ended", "missed", "failed"].includes(status);
  }

  isParticipantTerminalStatus(status: SabiCallParticipantStatus): boolean {
    return ["declined", "left", "missed", "removed", "failed"].includes(status);
  }

  normalizeFailureCode(code: SabiCallFailureCode | string): SabiCallFailureCode {
    const allowed: SabiCallFailureCode[] = [
      "unknown",
      "not_found",
      "not_allowed",
      "invalid_state",
      "participant_not_found",
      "initiator_required",
      "target_required",
      "self_call_not_allowed",
      "provider_not_configured",
      "signaling_error",
      "media_error",
      "presentation_error",
      "translation_error",
    ];

    return allowed.includes(code as SabiCallFailureCode)
      ? (code as SabiCallFailureCode)
      : "unknown";
  }

  private async requireCall(callId: string): Promise<SabiCallEntity> {
    const call = await this.repository.findById(callId);

    if (!call) {
      throw new SabiCallNotFoundError(callId);
    }

    return call;
  }

  private async emitCallEvent(
    call: SabiCallEntity,
    kind: SabiCallEventKind,
    actorUserId: string | null,
    payload: SabiCallMetadata
  ): Promise<void> {
    const event = call.createEvent({
      id: this.idFactory(),
      kind,
      actorUserId,
      payload,
      now: this.now(),
    });

    await this.repository.save(call);

    const targetUserIds = call.toDto().participants.map((participant) => participant.userId);
    await this.realtime?.publishToUsers({
      event: kind,
      callId: call.id,
      targetUserIds,
      payload: {
        event,
        call: call.toDto(),
      },
    });
  }
}
