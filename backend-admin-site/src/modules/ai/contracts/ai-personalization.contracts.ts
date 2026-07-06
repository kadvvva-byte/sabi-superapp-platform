import type {
  AiPersonalizationContext,
  AiPersonalizationManifest,
  AiPersonalizationPreferenceKey,
  AiPersonalizationPrivacyMode,
  AiPersonalizationProfile,
  AiPersonalizationSnapshot,
  AiPersonalizationSummary,
} from "../../../core/kernel/ai/ai-personalization.types"

export type AiPersonalizationManifestContract = AiPersonalizationManifest
export type AiPersonalizationProfileContract = AiPersonalizationProfile
export type AiPersonalizationContextContract = AiPersonalizationContext
export type AiPersonalizationSnapshotContract = AiPersonalizationSnapshot
export type AiPersonalizationSummaryContract = AiPersonalizationSummary

export type AiWorkspacePersonalizationSummaryContract = {
  version: "AI-23"
  status: "ready" | "limited" | "blocked"
  privacyMode: AiPersonalizationPrivacyMode
  personalizationAllowed: boolean
  preferencesCount: number
  signalsCount: number
  instructionsCount: number
  rankedMemoryCount: number
  topPreferenceKeys: AiPersonalizationPreferenceKey[]
  promptHints: string[]
  routeBase: "/api/ai/personalization"
}

export type AiPersonalizationPreferenceUpdateRequestContract = {
  preferences: Array<{
    key: AiPersonalizationPreferenceKey
    value: string
    source?: "user" | "memory" | "behavior" | "system"
    confidence?: number
    metadata?: Record<string, unknown>
  }>
}

export type AiPersonalizationSignalRequestContract = {
  kind: "assistant_prompt" | "assistant_response" | "app_action" | "translation" | "search" | "voice" | "settings" | "memory" | "task"
  source?: "user" | "assistant" | "system" | "mobile_ui"
  summary: string
  weight?: number
  metadata?: Record<string, unknown>
}

export type AiPersonalizationInstructionRequestContract = {
  title: string
  instruction: string
  kind?: "preference" | "profile_fact" | "task_context" | "study_context" | "business_context" | "saved_instruction"
  tags?: string[]
}

export type AiPersonalizationPrivacyModeRequestContract = {
  privacyMode: AiPersonalizationPrivacyMode
}
