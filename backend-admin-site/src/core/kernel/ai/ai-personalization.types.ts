import type {
  AiAssistantMode,
  AiMemoryEntry,
  AiMemoryKind,
  AiPremiumFeature,
  AiPremiumPlanKey,
  AiProviderKey,
  AiSessionConsentState,
} from "./ai.types"

export type AiPersonalizationPrivacyMode = "strict" | "balanced" | "adaptive"

export type AiPersonalizationPreferenceSource = "user" | "memory" | "behavior" | "system"

export type AiPersonalizationPreferenceKey =
  | "assistant_tone"
  | "default_language"
  | "translation_target_language"
  | "search_provider"
  | "translation_provider"
  | "preferred_mode"
  | "favorite_module"
  | "learning_level"
  | "business_mode"
  | "voice_enabled"
  | "safe_action_level"

export type AiPersonalizationSignalKind =
  | "assistant_prompt"
  | "assistant_response"
  | "app_action"
  | "translation"
  | "search"
  | "voice"
  | "settings"
  | "memory"
  | "task"

export type AiPersonalizationSignalSource = "user" | "assistant" | "system" | "mobile_ui"

export type AiPersonalizationPreference = {
  key: AiPersonalizationPreferenceKey
  value: string
  source: AiPersonalizationPreferenceSource
  confidence: number
  updatedAt: string
  metadata?: Record<string, unknown>
}

export type AiPersonalizationSignal = {
  id: string
  userId: string
  kind: AiPersonalizationSignalKind
  source: AiPersonalizationSignalSource
  summary: string
  weight: number
  createdAt: string
  metadata?: Record<string, unknown>
}

export type AiPersonalizationProfile = {
  version: "AI-23"
  userId: string
  privacyMode: AiPersonalizationPrivacyMode
  preferredLocale?: string
  preferredProvider?: AiProviderKey
  preferredMode?: AiAssistantMode
  preferences: AiPersonalizationPreference[]
  signals: AiPersonalizationSignal[]
  createdAt: string
  updatedAt: string
}

export type AiPersonalizationManifest = {
  area: "personalization_runtime"
  status: "ready"
  version: "AI-23"
  persistence: "ai_persistence"
  privacyModes: AiPersonalizationPrivacyMode[]
  supportedPreferenceKeys: AiPersonalizationPreferenceKey[]
  supportedSignalKinds: AiPersonalizationSignalKind[]
  capabilities: Array<{
    key: string
    title: string
    enabled: boolean
    requiresConsent: boolean
  }>
}

export type AiPersonalizationRankedMemory = AiMemoryEntry & {
  score: number
  reason: string
}

export type AiPersonalizationContext = {
  userId: string
  available: boolean
  privacyMode: AiPersonalizationPrivacyMode
  locale: string
  provider: AiProviderKey
  preferredMode: AiAssistantMode
  premium: {
    enabled: boolean
    planKey: AiPremiumPlanKey
    activeFeatures: AiPremiumFeature[]
  }
  consent: AiSessionConsentState
  preferences: AiPersonalizationPreference[]
  instructions: AiMemoryEntry[]
  rankedMemory: AiPersonalizationRankedMemory[]
  recentSignals: AiPersonalizationSignal[]
  promptHints: string[]
  blockedReason?: string
}

export type AiPersonalizationSnapshot = {
  manifest: AiPersonalizationManifest
  profile: AiPersonalizationProfile
  context: AiPersonalizationContext
  summary: AiPersonalizationSummary
}

export type AiPersonalizationSummary = {
  userId: string
  status: "ready" | "limited" | "blocked"
  privacyMode: AiPersonalizationPrivacyMode
  personalizationAllowed: boolean
  memoryWriteAllowed: boolean
  preferencesCount: number
  signalsCount: number
  instructionsCount: number
  rankedMemoryCount: number
  topPreferenceKeys: AiPersonalizationPreferenceKey[]
  updatedAt: string
}

export type AiPersonalizationContextInput = {
  userId: string
  prompt?: string
  mode?: AiAssistantMode
  provider?: AiProviderKey
  limit?: number
}

export type AiPersonalizationPreferenceUpdateInput = {
  userId: string
  preferences: Array<{
    key: AiPersonalizationPreferenceKey
    value: string
    source?: AiPersonalizationPreferenceSource
    confidence?: number
    metadata?: Record<string, unknown>
  }>
}

export type AiPersonalizationSignalInput = {
  userId: string
  kind: AiPersonalizationSignalKind
  source?: AiPersonalizationSignalSource
  summary: string
  weight?: number
  metadata?: Record<string, unknown>
}

export type AiPersonalizationInstructionInput = {
  userId: string
  title: string
  instruction: string
  kind?: AiMemoryKind
  tags?: string[]
}
