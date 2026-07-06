import type {
  AiProviderKey,
  AiTranslationContentType,
  AiTranslationResponse,
} from "./ai.types"

export type AiRealtimeTranslationSurface =
  | "text_chat"
  | "audio_message"
  | "video_message"
  | "voice_call"
  | "video_call"

export type AiRealtimeTranslationSessionStatus = "active" | "paused" | "stopped"

export type AiRealtimeTranslationDirection = "incoming" | "outgoing" | "system"

export type AiRealtimeTranslationClientActionType =
  | "translation.overlay.update"
  | "messenger.message.translation_ready"
  | "call.translation.subtitle_update"
  | "voice.tts.playback_request"

export type AiRealtimeTranslationManifest = {
  area: "realtime_translation"
  status: "ready"
  version: "AI-21"
  mode: "native_transcript_and_provider_translation"
  supportedSurfaces: AiRealtimeTranslationSurface[]
  supportedContentTypes: AiTranslationContentType[]
  capabilities: Array<{
    key: string
    title: string
    description: string
    enabled: boolean
    requiresPremiumFeature?: "ai_translation_media" | "ai_translation_realtime"
    requiresNativeBridge: boolean
  }>
  safety: {
    textTranslationAllowedWithoutPremium: boolean
    mediaTranslationRequiresPremium: boolean
    callTranslationRequiresRealtimePremium: boolean
    destructiveActionsAllowed: false
    nativeAudioProcessingServerSide: false
  }
}

export type AiRealtimeTranslationSessionCreateInput = {
  userId: string
  surface: AiRealtimeTranslationSurface
  targetLanguage: string
  sourceLanguage?: string
  locale?: string
  preferredProvider?: AiProviderKey
  chatId?: string
  messageId?: string
  peerUserId?: string
  callSessionId?: string
  autoSpeak?: boolean
  preserveFormatting?: boolean
  metadata?: Record<string, unknown>
}

export type AiRealtimeTranslationSessionUpdateInput = {
  userId: string
  sessionId: string
  status?: AiRealtimeTranslationSessionStatus
  targetLanguage?: string
  sourceLanguage?: string
  preferredProvider?: AiProviderKey
  autoSpeak?: boolean
  preserveFormatting?: boolean
  metadata?: Record<string, unknown>
}

export type AiRealtimeTranslationSession = {
  id: string
  userId: string
  surface: AiRealtimeTranslationSurface
  status: AiRealtimeTranslationSessionStatus
  sourceLanguage: string
  targetLanguage: string
  locale?: string
  preferredProvider?: AiProviderKey
  chatId?: string
  messageId?: string
  peerUserId?: string
  callSessionId?: string
  autoSpeak: boolean
  preserveFormatting: boolean
  createdAt: string
  updatedAt: string
  stoppedAt?: string
  counters: {
    textSegments: number
    mediaSegments: number
    callSegments: number
    translatedSegments: number
  }
  metadata?: Record<string, unknown>
}

export type AiRealtimeTranslationSegmentInput = {
  userId: string
  sessionId?: string
  surface?: AiRealtimeTranslationSurface
  contentType?: AiTranslationContentType
  targetLanguage?: string
  sourceLanguage?: string
  locale?: string
  preferredProvider?: AiProviderKey
  chatId?: string
  messageId?: string
  peerUserId?: string
  callSessionId?: string
  speakerId?: string
  speakerLabel?: string
  direction?: AiRealtimeTranslationDirection
  startedAtMs?: number
  endedAtMs?: number
  text?: string
  transcript?: string
  autoSpeak?: boolean
  preserveFormatting?: boolean
  metadata?: Record<string, unknown>
}

export type AiRealtimeTranslationClientAction = {
  type: AiRealtimeTranslationClientActionType
  target: "messenger" | "call" | "voice" | "ai"
  requiresClientDispatch: true
  payload: Record<string, unknown>
}

export type AiRealtimeTranslationSegmentResult = {
  id: string
  createdAt: string
  userId: string
  session?: AiRealtimeTranslationSession
  surface: AiRealtimeTranslationSurface
  contentType: AiTranslationContentType
  direction: AiRealtimeTranslationDirection
  sourceLanguage: string
  targetLanguage: string
  sourceText: string
  translatedText: string
  provider: AiProviderKey
  configured: boolean
  fallbackUsed: boolean
  attemptedProviders: AiProviderKey[]
  messageId?: string
  chatId?: string
  callSessionId?: string
  speakerId?: string
  speakerLabel?: string
  startedAtMs?: number
  endedAtMs?: number
  providerResponse: AiTranslationResponse
  clientActions: AiRealtimeTranslationClientAction[]
}

export type AiRealtimeTranslationUserSummary = {
  userId: string
  manifest: AiRealtimeTranslationManifest
  activeSessions: number
  pausedSessions: number
  stoppedSessions: number
  recentSegments: Array<{
    id: string
    createdAt: string
    surface: AiRealtimeTranslationSurface
    contentType: AiTranslationContentType
    sourceLanguage: string
    targetLanguage: string
    provider: AiProviderKey
    configured: boolean
    messageId?: string
    chatId?: string
    callSessionId?: string
  }>
}
