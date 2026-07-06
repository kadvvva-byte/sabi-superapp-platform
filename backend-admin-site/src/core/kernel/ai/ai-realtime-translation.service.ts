import type {
  AiTranslationContentType,
  AiTranslationRequest,
  AiTranslationResponse,
} from "./ai.types"
import type {
  AiRealtimeTranslationClientAction,
  AiRealtimeTranslationManifest,
  AiRealtimeTranslationSegmentInput,
  AiRealtimeTranslationSegmentResult,
  AiRealtimeTranslationSession,
  AiRealtimeTranslationSessionCreateInput,
  AiRealtimeTranslationSessionStatus,
  AiRealtimeTranslationSessionUpdateInput,
  AiRealtimeTranslationSurface,
  AiRealtimeTranslationUserSummary,
} from "./ai-realtime-translation.types"

const SUPPORTED_SURFACES: AiRealtimeTranslationSurface[] = [
  "text_chat",
  "audio_message",
  "video_message",
  "voice_call",
  "video_call",
]

const SUPPORTED_CONTENT_TYPES: AiTranslationContentType[] = ["text", "audio_message", "video_message", "call"]

type TranslateRuntime = (request: AiTranslationRequest) => Promise<AiTranslationResponse>

function nowIso() {
  return new Date().toISOString()
}

function makeId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
}

function requireText(value: string | undefined, code: string) {
  const normalized = value?.trim()
  if (!normalized) throw new Error(code)
  return normalized
}

function normalizeLanguage(value: string | undefined, fallback = "auto") {
  const normalized = value?.trim().toLowerCase()
  return normalized || fallback
}

function contentTypeForSurface(surface: AiRealtimeTranslationSurface): AiTranslationContentType {
  if (surface === "audio_message") return "audio_message"
  if (surface === "video_message") return "video_message"
  if (surface === "voice_call" || surface === "video_call") return "call"
  return "text"
}

function surfaceForContentType(contentType: AiTranslationContentType): AiRealtimeTranslationSurface {
  if (contentType === "audio_message") return "audio_message"
  if (contentType === "video_message") return "video_message"
  if (contentType === "call") return "voice_call"
  return "text_chat"
}

function sameSessionUser(
  session: AiRealtimeTranslationSession | undefined,
  userId: string,
): session is AiRealtimeTranslationSession {
  return session?.userId === userId
}

export class AiRealtimeTranslationService {
  private readonly sessions = new Map<string, AiRealtimeTranslationSession>()
  private readonly segmentsByUser = new Map<string, AiRealtimeTranslationSegmentResult[]>()

  constructor(private readonly translateRuntime: TranslateRuntime) {}

  getManifest(): AiRealtimeTranslationManifest {
    return {
      area: "realtime_translation",
      status: "ready",
      version: "AI-21",
      mode: "native_transcript_and_provider_translation",
      supportedSurfaces: SUPPORTED_SURFACES,
      supportedContentTypes: SUPPORTED_CONTENT_TYPES,
      capabilities: [
        {
          key: "text_message_translation",
          title: "Text message translation",
          description: "Realtime translation for incoming and outgoing text messages.",
          enabled: true,
          requiresNativeBridge: false,
        },
        {
          key: "audio_message_translation",
          title: "Audio message translation",
          description: "Native/mobile audio transcript handoff followed by provider translation.",
          enabled: true,
          requiresPremiumFeature: "ai_translation_media",
          requiresNativeBridge: true,
        },
        {
          key: "video_message_translation",
          title: "Video message translation",
          description: "Native/mobile video transcript handoff followed by provider translation.",
          enabled: true,
          requiresPremiumFeature: "ai_translation_media",
          requiresNativeBridge: true,
        },
        {
          key: "call_translation_subtitles",
          title: "Call translation subtitles",
          description: "Realtime subtitle packets for voice and video calls.",
          enabled: true,
          requiresPremiumFeature: "ai_translation_realtime",
          requiresNativeBridge: true,
        },
        {
          key: "call_translation_tts_bridge",
          title: "Call translation TTS bridge",
          description: "Client-dispatch command for optional native TTS playback of translated call segments.",
          enabled: true,
          requiresPremiumFeature: "ai_translation_realtime",
          requiresNativeBridge: true,
        },
        {
          key: "messenger_translation_overlay",
          title: "Messenger translation overlay",
          description: "Client action contracts for translated message preview, bubble overlay, and subtitles.",
          enabled: true,
          requiresNativeBridge: false,
        },
      ],
      safety: {
        textTranslationAllowedWithoutPremium: true,
        mediaTranslationRequiresPremium: true,
        callTranslationRequiresRealtimePremium: true,
        destructiveActionsAllowed: false,
        nativeAudioProcessingServerSide: false,
      },
    }
  }

  createSession(input: AiRealtimeTranslationSessionCreateInput): AiRealtimeTranslationSession {
    const userId = requireText(input.userId, "ai_realtime_translation_user_id_required")
    const targetLanguage = normalizeLanguage(input.targetLanguage, "")
    if (!targetLanguage) throw new Error("ai_realtime_translation_target_language_required")
    if (!SUPPORTED_SURFACES.includes(input.surface)) throw new Error("ai_realtime_translation_surface_not_supported")
    if ((input.surface === "voice_call" || input.surface === "video_call") && !input.callSessionId?.trim()) {
      throw new Error("ai_realtime_translation_call_session_id_required")
    }

    const createdAt = nowIso()
    const session: AiRealtimeTranslationSession = {
      id: makeId("airt_session"),
      userId,
      surface: input.surface,
      status: "active",
      sourceLanguage: normalizeLanguage(input.sourceLanguage),
      targetLanguage,
      locale: input.locale?.trim() || undefined,
      preferredProvider: input.preferredProvider,
      chatId: input.chatId?.trim() || undefined,
      messageId: input.messageId?.trim() || undefined,
      peerUserId: input.peerUserId?.trim() || undefined,
      callSessionId: input.callSessionId?.trim() || undefined,
      autoSpeak: Boolean(input.autoSpeak),
      preserveFormatting: input.preserveFormatting !== false,
      createdAt,
      updatedAt: createdAt,
      counters: {
        textSegments: 0,
        mediaSegments: 0,
        callSegments: 0,
        translatedSegments: 0,
      },
      metadata: input.metadata,
    }

    this.sessions.set(session.id, session)
    return session
  }

  updateSession(input: AiRealtimeTranslationSessionUpdateInput): AiRealtimeTranslationSession {
    const userId = requireText(input.userId, "ai_realtime_translation_user_id_required")
    const session = this.sessions.get(requireText(input.sessionId, "ai_realtime_translation_session_id_required"))
    if (!sameSessionUser(session, userId)) throw new Error("ai_realtime_translation_session_not_found")

    const status = input.status
    if (status && !["active", "paused", "stopped"].includes(status)) {
      throw new Error("ai_realtime_translation_session_status_not_supported")
    }

    const next: AiRealtimeTranslationSession = {
      ...session,
      status: status ?? session.status,
      targetLanguage: input.targetLanguage ? normalizeLanguage(input.targetLanguage, "") : session.targetLanguage,
      sourceLanguage: input.sourceLanguage ? normalizeLanguage(input.sourceLanguage) : session.sourceLanguage,
      preferredProvider: input.preferredProvider ?? session.preferredProvider,
      autoSpeak: typeof input.autoSpeak === "boolean" ? input.autoSpeak : session.autoSpeak,
      preserveFormatting: typeof input.preserveFormatting === "boolean" ? input.preserveFormatting : session.preserveFormatting,
      updatedAt: nowIso(),
      stoppedAt: status === "stopped" ? nowIso() : session.stoppedAt,
      metadata: input.metadata ? { ...(session.metadata ?? {}), ...input.metadata } : session.metadata,
    }

    if (!next.targetLanguage) throw new Error("ai_realtime_translation_target_language_required")
    this.sessions.set(next.id, next)
    return next
  }

  stopSession(userId: string, sessionId: string): AiRealtimeTranslationSession {
    return this.updateSession({ userId, sessionId, status: "stopped" })
  }

  listSessions(userId: string, status?: AiRealtimeTranslationSessionStatus): AiRealtimeTranslationSession[] {
    return Array.from(this.sessions.values())
      .filter((session) => session.userId === userId && (!status || session.status === status))
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  }

  getSummary(userId: string): AiRealtimeTranslationUserSummary {
    const sessions = this.listSessions(userId)
    const recentSegments = (this.segmentsByUser.get(userId) ?? []).slice(0, 8)
    return {
      userId,
      manifest: this.getManifest(),
      activeSessions: sessions.filter((session) => session.status === "active").length,
      pausedSessions: sessions.filter((session) => session.status === "paused").length,
      stoppedSessions: sessions.filter((session) => session.status === "stopped").length,
      recentSegments: recentSegments.map((segment) => ({
        id: segment.id,
        createdAt: segment.createdAt,
        surface: segment.surface,
        contentType: segment.contentType,
        sourceLanguage: segment.sourceLanguage,
        targetLanguage: segment.targetLanguage,
        provider: segment.provider,
        configured: segment.configured,
        messageId: segment.messageId,
        chatId: segment.chatId,
        callSessionId: segment.callSessionId,
      })),
    }
  }

  translateText(input: AiRealtimeTranslationSegmentInput): Promise<AiRealtimeTranslationSegmentResult> {
    return this.translateSegment({ ...input, surface: input.surface ?? "text_chat", contentType: "text" })
  }

  translateMessage(input: AiRealtimeTranslationSegmentInput): Promise<AiRealtimeTranslationSegmentResult> {
    const surface = input.surface ?? (input.contentType ? surfaceForContentType(input.contentType) : "text_chat")
    return this.translateSegment({
      ...input,
      surface,
      contentType: input.contentType ?? contentTypeForSurface(surface),
    })
  }

  translateMediaTranscript(input: AiRealtimeTranslationSegmentInput): Promise<AiRealtimeTranslationSegmentResult> {
    const surface = input.surface === "video_message" ? "video_message" : "audio_message"
    return this.translateSegment({
      ...input,
      surface,
      contentType: surface === "video_message" ? "video_message" : "audio_message",
    })
  }

  translateCallSegment(input: AiRealtimeTranslationSegmentInput): Promise<AiRealtimeTranslationSegmentResult> {
    return this.translateSegment({
      ...input,
      surface: input.surface === "video_call" ? "video_call" : "voice_call",
      contentType: "call",
    })
  }

  private async translateSegment(input: AiRealtimeTranslationSegmentInput): Promise<AiRealtimeTranslationSegmentResult> {
    const userId = requireText(input.userId, "ai_realtime_translation_user_id_required")
    const session = input.sessionId ? this.sessions.get(input.sessionId) : undefined
    if (input.sessionId && !sameSessionUser(session, userId)) {
      throw new Error("ai_realtime_translation_session_not_found")
    }
    if (session?.status === "paused") throw new Error("ai_realtime_translation_session_paused")
    if (session?.status === "stopped") throw new Error("ai_realtime_translation_session_stopped")

    const surface = input.surface ?? session?.surface ?? (input.contentType ? surfaceForContentType(input.contentType) : "text_chat")
    if (!SUPPORTED_SURFACES.includes(surface)) throw new Error("ai_realtime_translation_surface_not_supported")

    const contentType = input.contentType ?? contentTypeForSurface(surface)
    if (!SUPPORTED_CONTENT_TYPES.includes(contentType)) throw new Error("ai_realtime_translation_content_type_not_supported")

    const sourceText = requireText(input.text ?? input.transcript, "ai_realtime_translation_text_or_transcript_required")
    const targetLanguage = normalizeLanguage(input.targetLanguage ?? session?.targetLanguage, "")
    if (!targetLanguage) throw new Error("ai_realtime_translation_target_language_required")

    const callSessionId = input.callSessionId ?? session?.callSessionId
    if (contentType === "call" && !callSessionId?.trim()) {
      throw new Error("ai_realtime_translation_call_session_id_required")
    }

    const providerResponse = await this.translateRuntime({
      userId,
      contentType,
      targetLanguage,
      sourceLanguage: input.sourceLanguage ?? session?.sourceLanguage,
      locale: input.locale ?? session?.locale,
      preferredProvider: input.preferredProvider ?? session?.preferredProvider,
      text: contentType === "text" ? sourceText : undefined,
      transcript: contentType !== "text" ? sourceText : undefined,
      callSessionId,
      speakerHints: input.speakerLabel ? [input.speakerLabel] : undefined,
      preserveFormatting: input.preserveFormatting ?? session?.preserveFormatting,
      allowFallback: true,
    })

    const translatedText =
      providerResponse.translatedText ??
      providerResponse.translatedTranscript ??
      providerResponse.segments.map((segment) => segment.translatedText).join("\n")

    const result: AiRealtimeTranslationSegmentResult = {
      id: makeId("airt_segment"),
      createdAt: nowIso(),
      userId,
      session,
      surface,
      contentType,
      direction: input.direction ?? "incoming",
      sourceLanguage: providerResponse.sourceLanguage,
      targetLanguage: providerResponse.targetLanguage,
      sourceText,
      translatedText,
      provider: providerResponse.provider,
      configured: providerResponse.configured,
      fallbackUsed: providerResponse.fallbackUsed,
      attemptedProviders: providerResponse.attemptedProviders,
      messageId: input.messageId ?? session?.messageId,
      chatId: input.chatId ?? session?.chatId,
      callSessionId,
      speakerId: input.speakerId,
      speakerLabel: input.speakerLabel,
      startedAtMs: input.startedAtMs,
      endedAtMs: input.endedAtMs,
      providerResponse,
      clientActions: [],
    }

    result.clientActions = this.buildClientActions(result, Boolean(input.autoSpeak ?? session?.autoSpeak))
    this.recordSegment(result)
    this.bumpCounters(session, contentType)
    return result
  }

  private buildClientActions(
    result: AiRealtimeTranslationSegmentResult,
    autoSpeak: boolean,
  ): AiRealtimeTranslationClientAction[] {
    const actions: AiRealtimeTranslationClientAction[] = [
      {
        type: "translation.overlay.update",
        target: "ai",
        requiresClientDispatch: true,
        payload: {
          segmentId: result.id,
          surface: result.surface,
          contentType: result.contentType,
          sourceLanguage: result.sourceLanguage,
          targetLanguage: result.targetLanguage,
          sourceText: result.sourceText,
          translatedText: result.translatedText,
          provider: result.provider,
        },
      },
    ]

    if (result.messageId || result.chatId) {
      actions.push({
        type: "messenger.message.translation_ready",
        target: "messenger",
        requiresClientDispatch: true,
        payload: {
          segmentId: result.id,
          chatId: result.chatId,
          messageId: result.messageId,
          direction: result.direction,
          translatedText: result.translatedText,
          sourceLanguage: result.sourceLanguage,
          targetLanguage: result.targetLanguage,
        },
      })
    }

    if (result.contentType === "call") {
      actions.push({
        type: "call.translation.subtitle_update",
        target: "call",
        requiresClientDispatch: true,
        payload: {
          segmentId: result.id,
          callSessionId: result.callSessionId,
          speakerId: result.speakerId,
          speakerLabel: result.speakerLabel,
          startedAtMs: result.startedAtMs,
          endedAtMs: result.endedAtMs,
          translatedText: result.translatedText,
          sourceLanguage: result.sourceLanguage,
          targetLanguage: result.targetLanguage,
        },
      })
    }

    if (autoSpeak && result.translatedText) {
      actions.push({
        type: "voice.tts.playback_request",
        target: "voice",
        requiresClientDispatch: true,
        payload: {
          segmentId: result.id,
          callSessionId: result.callSessionId,
          text: result.translatedText,
          language: result.targetLanguage,
        },
      })
    }

    return actions
  }

  private recordSegment(result: AiRealtimeTranslationSegmentResult) {
    const current = this.segmentsByUser.get(result.userId) ?? []
    this.segmentsByUser.set(result.userId, [result, ...current].slice(0, 50))
  }

  private bumpCounters(session: AiRealtimeTranslationSession | undefined, contentType: AiTranslationContentType) {
    if (!session) return
    const current = this.sessions.get(session.id)
    if (!current) return
    const next: AiRealtimeTranslationSession = {
      ...current,
      updatedAt: nowIso(),
      counters: {
        ...current.counters,
        textSegments: current.counters.textSegments + (contentType === "text" ? 1 : 0),
        mediaSegments: current.counters.mediaSegments + (["audio_message", "video_message"].includes(contentType) ? 1 : 0),
        callSegments: current.counters.callSegments + (contentType === "call" ? 1 : 0),
        translatedSegments: current.counters.translatedSegments + 1,
      },
    }
    this.sessions.set(next.id, next)
  }
}
