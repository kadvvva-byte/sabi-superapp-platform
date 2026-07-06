import type { AiAssistantMode, AiProviderKey } from "./ai.types"

export type AiVoiceInputKind = "speech_to_text" | "text_to_speech" | "wake_invoke" | "quick_invoke"

export type AiVoiceSessionStatus =
  | "idle"
  | "listening"
  | "processing"
  | "speaking"
  | "completed"
  | "cancelled"
  | "failed"

export type AiVoiceBridgeStatus = "ready" | "not_configured" | "not_connected" | "disabled" | "error"

export type AiVoiceCapabilityKey =
  | "voice_input"
  | "speech_to_text"
  | "text_to_speech"
  | "push_to_talk"
  | "quick_invoke"
  | "wake_invoke"
  | "voice_response_playback"
  | "interruption_cancel"
  | "language_auto_detection"
  | "call_translation_bridge"

export type AiVoiceProviderArea = "stt" | "tts" | "wake" | "invoke" | "playback" | "interruption"

export type AiNativeVoicePlatform = "ios" | "android" | "web" | "desktop" | "unknown"

export type AiVoiceProviderContract = {
  key: AiProviderKey
  label: string
  configured: boolean
  status: AiVoiceBridgeStatus
  supportedAreas: AiVoiceProviderArea[]
  supportedLocales: string[]
}

export type AiVoiceCapabilityContract = {
  key: AiVoiceCapabilityKey
  title: string
  description: string
  enabled: boolean
  requiresPremium: boolean
  requiresNativeBridge: boolean
  status: AiVoiceBridgeStatus
}

export type AiNativeVoiceBridgeSurfaceContract = {
  platform: AiNativeVoicePlatform
  supportsSpeechToText: boolean
  supportsTextToSpeech: boolean
  supportsPushToTalk: boolean
  supportsQuickInvoke: boolean
  supportsWakeInvoke: boolean
  supportsPlaybackInterruption: boolean
  supportsLanguageAutoDetection: boolean
  supportedLocales: string[]
  appVersion?: string
  deviceId?: string
  boundAt?: string
  updatedAt?: string
}

export type AiVoiceManifestContract = {
  area: "voice"
  configured: boolean
  status: AiVoiceBridgeStatus
  version: "AI-19"
  bridgeMode: "native_client_bridge"
  supportedInputKinds: AiVoiceInputKind[]
  supportedLocales: string[]
  providers: AiVoiceProviderContract[]
  capabilities: AiVoiceCapabilityContract[]
  nativeBridge: {
    required: true
    serverSttProvider: false
    serverTtsProvider: false
    clientMustReturnTranscript: true
    clientMustPerformPlayback: true
    wakeInvokeMode: "contract_only"
  }
}

export type AiVoiceSessionContract = {
  id: string
  userId: string
  mode: AiAssistantMode
  status: AiVoiceSessionStatus
  inputKind: AiVoiceInputKind
  sourceLanguage?: string
  targetLanguage?: string
  provider?: AiProviderKey
  callSessionId?: string
  createdAt: string
  updatedAt: string
  lastTranscript?: string
  lastResponseText?: string
  errorCode?: string
  metadata?: Record<string, unknown>
}

export type AiVoiceStatusContract = {
  userId: string
  enabled: boolean
  status: AiVoiceBridgeStatus
  bridge?: AiNativeVoiceBridgeSurfaceContract
  activeSession?: AiVoiceSessionContract
  recentSessions: AiVoiceSessionContract[]
}

export type AiStartVoiceSessionRequestContract = {
  userId: string
  mode?: AiAssistantMode
  inputKind: AiVoiceInputKind
  sourceLanguage?: string
  targetLanguage?: string
  preferredProvider?: AiProviderKey
  callSessionId?: string
  metadata?: Record<string, unknown>
}

export type AiUpdateVoiceSessionRequestContract = {
  userId: string
  sessionId: string
  status?: AiVoiceSessionStatus
  transcript?: string
  responseText?: string
  errorCode?: string
  metadata?: Record<string, unknown>
}

export type AiVoiceTranscriptionRequestContract = {
  userId: string
  sessionId?: string
  audioUrl?: string
  audioBase64?: string
  mimeType?: string
  sourceLanguage?: string
  preferredProvider?: AiProviderKey
  transcript?: string
  clientTranscript?: string
  confidence?: number
  metadata?: Record<string, unknown>
}

export type AiVoiceTranscriptionResultContract = {
  userId: string
  sessionId?: string
  provider: AiProviderKey
  transcript: string
  language?: string
  confidence?: number
  createdAt: string
  bridgeMode: "native_client_bridge"
}

export type AiVoiceSynthesisRequestContract = {
  userId: string
  sessionId?: string
  text: string
  language: string
  voiceKey?: string
  preferredProvider?: AiProviderKey
  metadata?: Record<string, unknown>
}

export type AiVoiceSynthesisResultContract = {
  userId: string
  sessionId?: string
  provider: AiProviderKey
  audioUrl?: string
  audioBase64?: string
  mimeType: string
  durationMs?: number
  createdAt: string
  bridgeMode: "native_client_bridge"
  bridgeOperationId: string
  playbackRequired: boolean
  playbackPayload: {
    text: string
    language: string
    voiceKey?: string
  }
}

export type AiVoiceInvokeRequestContract = {
  userId: string
  sessionId?: string
  transcript?: string
  prompt?: string
  mode?: AiAssistantMode
  sourceLanguage?: string
  targetLanguage?: string
  preferredProvider?: AiProviderKey
  metadata?: Record<string, unknown>
}

export type AiVoiceInvokeResultContract = {
  userId: string
  sessionId?: string
  mode: AiAssistantMode
  provider: AiProviderKey
  transcript?: string
  responseText: string
  responseAudio?: AiVoiceSynthesisResultContract
  createdAt: string
}

export type AiNativeVoiceBridgeBindRequestContract = {
  userId: string
  platform?: AiNativeVoicePlatform
  appVersion?: string
  deviceId?: string
  supportsSpeechToText?: boolean
  supportsTextToSpeech?: boolean
  supportsPushToTalk?: boolean
  supportsQuickInvoke?: boolean
  supportsWakeInvoke?: boolean
  supportsPlaybackInterruption?: boolean
  supportsLanguageAutoDetection?: boolean
  supportedLocales?: string[]
}

export type AiNativeVoiceBridgeStateContract = {
  userId: string
  status: AiVoiceBridgeStatus
  surface: AiNativeVoiceBridgeSurfaceContract
}

export type AiNativeVoiceClientEventKind =
  | "permission_granted"
  | "permission_denied"
  | "listening_started"
  | "listening_stopped"
  | "partial_transcript"
  | "final_transcript"
  | "tts_playback_started"
  | "tts_playback_finished"
  | "tts_playback_interrupted"
  | "wake_detected"
  | "error"

export type AiNativeVoiceClientEventContract = {
  userId: string
  sessionId?: string
  kind: AiNativeVoiceClientEventKind
  transcript?: string
  errorCode?: string
  language?: string
  confidence?: number
  metadata?: Record<string, unknown>
}

export type AiVoicePlaybackRequestContract = {
  userId: string
  sessionId?: string
  text: string
  language: string
  voiceKey?: string
  interruptCurrent?: boolean
  metadata?: Record<string, unknown>
}

export type AiVoiceInterruptRequestContract = {
  userId: string
  sessionId?: string
  reason?: string
}

export type AiVoiceInterruptResultContract = {
  userId: string
  sessionId?: string
  interrupted: boolean
  status: AiVoiceSessionStatus
  reason?: string
  updatedAt: string
}

export type AiWorkspaceVoiceContract = {
  manifest: AiVoiceManifestContract
  status: AiVoiceStatusContract
}
