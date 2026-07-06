import type {
  AiNativeVoiceBridgeBindRequestContract,
  AiNativeVoiceBridgeStateContract,
  AiNativeVoiceClientEventContract,
  AiVoiceBridgeStatus,
  AiVoiceInterruptRequestContract,
  AiVoiceInterruptResultContract,
  AiVoiceInvokeRequestContract,
  AiVoiceInvokeResultContract,
  AiVoiceManifestContract,
  AiVoicePlaybackRequestContract,
  AiVoiceSessionContract,
  AiVoiceSessionStatus,
  AiVoiceStatusContract,
  AiVoiceSynthesisRequestContract,
  AiVoiceSynthesisResultContract,
  AiVoiceTranscriptionRequestContract,
  AiVoiceTranscriptionResultContract,
  AiStartVoiceSessionRequestContract,
  AiUpdateVoiceSessionRequestContract,
} from "./ai-voice.types"
import type { AiAssistantMode, AiProviderKey } from "./ai.types"

const SUPPORTED_LOCALES = [
  "auto",
  "en",
  "ru",
  "uz",
  "tg",
  "kk",
  "ky",
  "tr",
  "az",
  "ar",
  "de",
  "fr",
  "es",
  "zh",
  "ko",
  "ja",
  "hi",
  "ur",
]

const ACTIVE_STATUSES = new Set<AiVoiceSessionStatus>(["listening", "processing", "speaking"])

function now() {
  return new Date().toISOString()
}

function createId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
}

function normalizeText(value: string | undefined) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : ""
}

function estimateSpeechDurationMs(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(850, Math.ceil((words / 2.5) * 1000))
}

export class AiVoiceService {
  private readonly sessionsByUserId = new Map<string, AiVoiceSessionContract[]>()
  private readonly nativeBridgeByUserId = new Map<string, AiNativeVoiceBridgeStateContract>()

  getManifest(): AiVoiceManifestContract {
    return {
      area: "voice",
      configured: true,
      status: "ready",
      version: "AI-19",
      bridgeMode: "native_client_bridge",
      supportedInputKinds: ["speech_to_text", "text_to_speech", "quick_invoke", "wake_invoke"],
      supportedLocales: SUPPORTED_LOCALES,
      providers: [
        {
          key: "internal",
          label: "Sabi native voice bridge",
          configured: true,
          status: "ready",
          supportedAreas: ["stt", "tts", "invoke", "playback", "interruption"],
          supportedLocales: SUPPORTED_LOCALES,
        },
        {
          key: "google",
          label: "Google voice gateway",
          configured: false,
          status: "not_configured",
          supportedAreas: ["stt", "tts"],
          supportedLocales: SUPPORTED_LOCALES,
        },
        {
          key: "yandex",
          label: "Yandex voice gateway",
          configured: false,
          status: "not_configured",
          supportedAreas: ["stt", "tts"],
          supportedLocales: SUPPORTED_LOCALES,
        },
      ],
      capabilities: [
        {
          key: "voice_input",
          title: "Voice input",
          description: "Native microphone input session for Sabi AI.",
          enabled: true,
          requiresPremium: false,
          requiresNativeBridge: true,
          status: "ready",
        },
        {
          key: "speech_to_text",
          title: "Speech to text",
          description: "Client native STT returns final transcript to the AI kernel.",
          enabled: true,
          requiresPremium: false,
          requiresNativeBridge: true,
          status: "ready",
        },
        {
          key: "text_to_speech",
          title: "Text to speech",
          description: "AI kernel creates native TTS playback requests for the mobile bridge.",
          enabled: true,
          requiresPremium: false,
          requiresNativeBridge: true,
          status: "ready",
        },
        {
          key: "push_to_talk",
          title: "Push to talk",
          description: "Voice sessions support press/hold and release/cancel lifecycle.",
          enabled: true,
          requiresPremium: false,
          requiresNativeBridge: true,
          status: "ready",
        },
        {
          key: "quick_invoke",
          title: "Quick invoke",
          description: "Fast voice prompt handoff into Sabi AI assistant runtime.",
          enabled: true,
          requiresPremium: false,
          requiresNativeBridge: true,
          status: "ready",
        },
        {
          key: "wake_invoke",
          title: "Wake invoke",
          description: "Wake mode is registered as contract only until native wake permissions are implemented.",
          enabled: false,
          requiresPremium: true,
          requiresNativeBridge: true,
          status: "not_configured",
        },
        {
          key: "voice_response_playback",
          title: "Voice response playback",
          description: "AI response text is packaged as a native playback command.",
          enabled: true,
          requiresPremium: false,
          requiresNativeBridge: true,
          status: "ready",
        },
        {
          key: "interruption_cancel",
          title: "Interruption and cancel",
          description: "User can interrupt listening, processing, or TTS playback.",
          enabled: true,
          requiresPremium: false,
          requiresNativeBridge: true,
          status: "ready",
        },
        {
          key: "language_auto_detection",
          title: "Language auto detection",
          description: "Native client may return detected language with transcript events.",
          enabled: true,
          requiresPremium: false,
          requiresNativeBridge: true,
          status: "ready",
        },
        {
          key: "call_translation_bridge",
          title: "Call translation bridge",
          description: "Premium realtime call translation can use the same voice session contract.",
          enabled: true,
          requiresPremium: true,
          requiresNativeBridge: true,
          status: "ready",
        },
      ],
      nativeBridge: {
        required: true,
        serverSttProvider: false,
        serverTtsProvider: false,
        clientMustReturnTranscript: true,
        clientMustPerformPlayback: true,
        wakeInvokeMode: "contract_only",
      },
    }
  }

  bindNativeBridge(input: AiNativeVoiceBridgeBindRequestContract): AiNativeVoiceBridgeStateContract {
    if (!input.userId?.trim()) {
      throw new Error("ai_voice_user_id_required")
    }

    const timestamp = now()
    const previous = this.nativeBridgeByUserId.get(input.userId)
    const state: AiNativeVoiceBridgeStateContract = {
      userId: input.userId,
      status: "ready",
      surface: {
        platform: input.platform ?? previous?.surface.platform ?? "unknown",
        appVersion: input.appVersion ?? previous?.surface.appVersion,
        deviceId: input.deviceId ?? previous?.surface.deviceId,
        supportsSpeechToText: input.supportsSpeechToText ?? true,
        supportsTextToSpeech: input.supportsTextToSpeech ?? true,
        supportsPushToTalk: input.supportsPushToTalk ?? true,
        supportsQuickInvoke: input.supportsQuickInvoke ?? true,
        supportsWakeInvoke: input.supportsWakeInvoke ?? false,
        supportsPlaybackInterruption: input.supportsPlaybackInterruption ?? true,
        supportsLanguageAutoDetection: input.supportsLanguageAutoDetection ?? true,
        supportedLocales: input.supportedLocales?.length ? input.supportedLocales : SUPPORTED_LOCALES,
        boundAt: previous?.surface.boundAt ?? timestamp,
        updatedAt: timestamp,
      },
    }

    this.nativeBridgeByUserId.set(input.userId, state)
    return state
  }

  getNativeBridge(userId: string): AiNativeVoiceBridgeStateContract | undefined {
    return this.nativeBridgeByUserId.get(userId)
  }

  getStatus(userId: string): AiVoiceStatusContract {
    const recentSessions = this.getRecentSessions(userId)
    const activeSession = recentSessions.find((session) => ACTIVE_STATUSES.has(session.status))
    const bridge = this.getNativeBridge(userId)
    const status: AiVoiceBridgeStatus = bridge?.status ?? "not_connected"

    return {
      userId,
      enabled: status === "ready",
      status,
      bridge: bridge?.surface,
      activeSession,
      recentSessions,
    }
  }

  startSession(input: AiStartVoiceSessionRequestContract): AiVoiceSessionContract {
    if (!input.userId?.trim()) {
      throw new Error("ai_voice_user_id_required")
    }

    const timestamp = now()
    const session: AiVoiceSessionContract = {
      id: createId("ai_voice_session"),
      userId: input.userId,
      mode: input.mode ?? this.modeForInputKind(input.inputKind),
      status: input.inputKind === "text_to_speech" ? "processing" : "listening",
      inputKind: input.inputKind,
      sourceLanguage: input.sourceLanguage,
      targetLanguage: input.targetLanguage,
      provider: input.preferredProvider ?? "internal",
      callSessionId: input.callSessionId,
      createdAt: timestamp,
      updatedAt: timestamp,
      metadata: input.metadata,
    }

    this.appendSession(session)
    return session
  }

  updateSession(input: AiUpdateVoiceSessionRequestContract): AiVoiceSessionContract {
    const session = this.requireSession(input.userId, input.sessionId)
    const next: AiVoiceSessionContract = {
      ...session,
      status: input.status ?? session.status,
      updatedAt: now(),
      lastTranscript: normalizeText(input.transcript) || session.lastTranscript,
      lastResponseText: normalizeText(input.responseText) || session.lastResponseText,
      errorCode: input.errorCode ?? session.errorCode,
      metadata: {
        ...(session.metadata ?? {}),
        ...(input.metadata ?? {}),
      },
    }

    this.replaceSession(next)
    return next
  }

  cancelSession(userId: string, sessionId: string, reason = "cancelled_by_user"): AiVoiceSessionContract {
    return this.updateSession({ userId, sessionId, status: "cancelled", errorCode: reason })
  }

  transcribe(input: AiVoiceTranscriptionRequestContract): AiVoiceTranscriptionResultContract {
    if (!input.userId?.trim()) {
      throw new Error("ai_voice_user_id_required")
    }

    const transcript = normalizeText(input.transcript) || normalizeText(input.clientTranscript)
    if (!transcript) {
      if (input.sessionId) {
        this.updateSession({
          userId: input.userId,
          sessionId: input.sessionId,
          status: "failed",
          errorCode: "ai_voice_native_stt_result_required",
        })
      }
      throw new Error("ai_voice_native_stt_result_required")
    }

    if (input.sessionId) {
      this.updateSession({
        userId: input.userId,
        sessionId: input.sessionId,
        status: "processing",
        transcript,
        metadata: {
          sourceLanguage: input.sourceLanguage,
          mimeType: input.mimeType,
          audioUrl: input.audioUrl,
          nativeStt: true,
        },
      })
    }

    return {
      userId: input.userId,
      sessionId: input.sessionId,
      provider: input.preferredProvider ?? "internal",
      transcript,
      language: input.sourceLanguage ?? this.detectLanguage(transcript),
      confidence: input.confidence ?? 0.92,
      createdAt: now(),
      bridgeMode: "native_client_bridge",
    }
  }

  synthesize(input: AiVoiceSynthesisRequestContract): AiVoiceSynthesisResultContract {
    if (!input.userId?.trim()) {
      throw new Error("ai_voice_user_id_required")
    }

    const text = normalizeText(input.text)
    if (!text) {
      throw new Error("ai_voice_tts_text_required")
    }

    if (input.sessionId) {
      this.updateSession({
        userId: input.userId,
        sessionId: input.sessionId,
        status: "speaking",
        responseText: text,
        metadata: {
          ttsLanguage: input.language,
          voiceKey: input.voiceKey,
          nativeTts: true,
        },
      })
    }

    return {
      userId: input.userId,
      sessionId: input.sessionId,
      provider: input.preferredProvider ?? "internal",
      mimeType: "application/vnd.sabi.ai.native-tts-request+json",
      durationMs: estimateSpeechDurationMs(text),
      createdAt: now(),
      bridgeMode: "native_client_bridge",
      bridgeOperationId: createId("ai_voice_playback"),
      playbackRequired: true,
      playbackPayload: {
        text,
        language: input.language,
        voiceKey: input.voiceKey,
      },
    }
  }

  invoke(input: AiVoiceInvokeRequestContract, responseText: string, provider: AiProviderKey): AiVoiceInvokeResultContract {
    const prompt = normalizeText(input.prompt) || normalizeText(input.transcript)
    if (!input.userId?.trim()) {
      throw new Error("ai_voice_user_id_required")
    }
    if (!prompt) {
      throw new Error("ai_voice_invoke_prompt_required")
    }

    const session = input.sessionId
      ? this.updateSession({
          userId: input.userId,
          sessionId: input.sessionId,
          status: "processing",
          transcript: input.transcript ?? input.prompt,
        })
      : this.startSession({
          userId: input.userId,
          inputKind: "quick_invoke",
          mode: input.mode,
          sourceLanguage: input.sourceLanguage,
          targetLanguage: input.targetLanguage,
          preferredProvider: input.preferredProvider,
          metadata: input.metadata,
        })

    const responseAudio = this.synthesize({
      userId: input.userId,
      sessionId: session.id,
      text: responseText,
      language: input.targetLanguage ?? input.sourceLanguage ?? "auto",
      preferredProvider: provider,
    })

    return {
      userId: input.userId,
      sessionId: session.id,
      mode: input.mode ?? session.mode,
      provider,
      transcript: input.transcript ?? input.prompt,
      responseText,
      responseAudio,
      createdAt: now(),
    }
  }

  recordClientEvent(input: AiNativeVoiceClientEventContract): AiVoiceSessionContract | undefined {
    if (!input.userId?.trim()) {
      throw new Error("ai_voice_user_id_required")
    }

    if (!input.sessionId) {
      return undefined
    }

    const status = this.statusFromClientEvent(input.kind)
    return this.updateSession({
      userId: input.userId,
      sessionId: input.sessionId,
      status,
      transcript: input.transcript,
      errorCode: input.errorCode,
      metadata: {
        clientEventKind: input.kind,
        language: input.language,
        confidence: input.confidence,
        ...(input.metadata ?? {}),
      },
    })
  }

  requestPlayback(input: AiVoicePlaybackRequestContract): AiVoiceSynthesisResultContract {
    if (input.interruptCurrent && input.sessionId) {
      this.interrupt({ userId: input.userId, sessionId: input.sessionId, reason: "interrupted_before_new_playback" })
    }

    return this.synthesize({
      userId: input.userId,
      sessionId: input.sessionId,
      text: input.text,
      language: input.language,
      voiceKey: input.voiceKey,
      metadata: input.metadata,
    })
  }

  interrupt(input: AiVoiceInterruptRequestContract): AiVoiceInterruptResultContract {
    if (!input.userId?.trim()) {
      throw new Error("ai_voice_user_id_required")
    }

    const session = input.sessionId
      ? this.cancelSession(input.userId, input.sessionId, input.reason ?? "interrupted")
      : this.getRecentSessions(input.userId).find((item) => ACTIVE_STATUSES.has(item.status))

    if (!session) {
      return {
        userId: input.userId,
        sessionId: input.sessionId,
        interrupted: false,
        status: "idle",
        reason: input.reason,
        updatedAt: now(),
      }
    }

    const cancelled = session.status === "cancelled" ? session : this.cancelSession(input.userId, session.id, input.reason ?? "interrupted")

    return {
      userId: input.userId,
      sessionId: cancelled.id,
      interrupted: true,
      status: cancelled.status,
      reason: input.reason,
      updatedAt: cancelled.updatedAt,
    }
  }

  private modeForInputKind(inputKind: AiStartVoiceSessionRequestContract["inputKind"]): AiAssistantMode {
    if (inputKind === "wake_invoke" || inputKind === "quick_invoke") return "general"
    if (inputKind === "text_to_speech") return "general"
    return "general"
  }

  private appendSession(session: AiVoiceSessionContract) {
    const sessions = this.sessionsByUserId.get(session.userId) ?? []
    this.sessionsByUserId.set(session.userId, [session, ...sessions].slice(0, 30))
  }

  private replaceSession(session: AiVoiceSessionContract) {
    const sessions = this.sessionsByUserId.get(session.userId) ?? []
    this.sessionsByUserId.set(
      session.userId,
      sessions.map((item) => (item.id === session.id ? session : item)),
    )
  }

  private requireSession(userId: string, sessionId: string) {
    const session = (this.sessionsByUserId.get(userId) ?? []).find((item) => item.id === sessionId)
    if (!session) {
      throw new Error("ai_voice_session_not_found")
    }
    return session
  }

  private getRecentSessions(userId: string) {
    return this.sessionsByUserId.get(userId) ?? []
  }

  private detectLanguage(text: string) {
    if (/[а-яё]/i.test(text)) return "ru"
    if (/[ء-ي]/.test(text)) return "ar"
    if (/[\u4e00-\u9fff]/.test(text)) return "zh"
    return "auto"
  }

  private statusFromClientEvent(kind: AiNativeVoiceClientEventContract["kind"]): AiVoiceSessionStatus {
    if (kind === "listening_started") return "listening"
    if (kind === "listening_stopped") return "processing"
    if (kind === "partial_transcript") return "listening"
    if (kind === "final_transcript") return "processing"
    if (kind === "tts_playback_started") return "speaking"
    if (kind === "tts_playback_finished") return "completed"
    if (kind === "tts_playback_interrupted") return "cancelled"
    if (kind === "error" || kind === "permission_denied") return "failed"
    if (kind === "wake_detected") return "listening"
    return "idle"
  }
}
