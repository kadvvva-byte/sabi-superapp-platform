import type {
  AiAssistantMode,
  AiAssistantState,
  AiCapability,
  AiConsentScope,
  AiProviderKey,
  AiSearchProviderManifestItem,
  AiSessionConsentState,
  AiSessionContext,
  AiTranslationProviderManifestItem,
} from "../../../core/kernel/ai/ai.types"
import type { AiVoiceManifestContract, AiWorkspaceVoiceContract } from "./ai-voice.contracts"
import type { AiWorkspaceSettingsProfileSummaryContract } from "./ai-settings-profile.contracts"
import type { AiWorkspaceIntegrationSummaryContract } from "./ai-app-integration.contracts"
import type { AiAssistantManifestContract } from "./ai-assistant.contracts"
import type { AiAppActionManifestContract, AiAppActionWorkspaceSummaryContract } from "./ai-app-actions.contracts"
import type { AiRealtimeTranslationWorkspaceSummaryContract } from "./ai-realtime-translation.contracts"
import type { AiPersonalizationManifestContract, AiWorkspacePersonalizationSummaryContract } from "./ai-personalization.contracts"
import type { AiSafetyAdminManifestContract, AiSafetyAdminWorkspaceSummaryContract } from "./ai-safety-admin.contracts"

export type AiWorkspaceMobileUiManifestContract = {
  programId: "sabi_ai"
  version: "AI-29.2"
  area: "mobile_ui"
  title: string
  description: string
  baseRoute: string
  mobileBaseRoute: string
  routes: Record<string, string>
  surfaces: Array<{
    key: string
    title: string
    description: string
    requiredSource: string
  }>
  components: string[]
  safeExecution: {
    dangerousActionsRequireConfirmation: true
    moneyActionsRequireConfirmation: true
    accountDeletionBlockedForAiAutoRun: true
    internalRiskReportsDoNotNotifyUser?: true
  }
}

export type AiWorkspaceSectionKey =
  | "mobile_ui"
  | "assistant"
  | "chat"
  | "search"
  | "translation"
  | "business"
  | "education"
  | "memory"
  | "personalization"
  | "premium"
  | "providers"
  | "settings"
  | "profile"
  | "voice"
  | "integration"
  | "actions"
  | "safety_admin"

export type AiWorkspaceModeContract = {
  key: AiAssistantMode
  title: string
  description: string
  primaryCapabilities: AiCapability[]
  locked: boolean
  requiredFeature?: string
}

export type AiWorkspaceProviderContract = {
  key: AiProviderKey
  area: "search" | "translation"
  title: string
  description: string
  configured: boolean
  status: string
  supportedAreas: string[]
  selected: boolean
}

export type AiWorkspaceFeatureGateContract = {
  featureKey: string
  title: string
  description: string
  locked: boolean
  reason?: string
}

export type AiWorkspaceQuickActionContract = {
  key: string
  title: string
  description: string
  mode: AiAssistantMode
  requiresConfirmation: boolean
  locked: boolean
  targetSection: AiWorkspaceSectionKey
}

export type AiWorkspaceSectionContract = {
  key: AiWorkspaceSectionKey
  title: string
  description: string
  visible: boolean
  locked: boolean
}

export type AiWorkspaceConsentContract = {
  scope: AiConsentScope
  title: string
  enabled: boolean
  requiredFor: string[]
}

export type AiWorkspaceCatalogContract = {
  programId: string
  title: string
  description: string
  modes: AiWorkspaceModeContract[]
  searchProviders: AiWorkspaceProviderContract[]
  translationProviders: AiWorkspaceProviderContract[]
  assistantManifest: AiAssistantManifestContract
  voiceManifest: AiVoiceManifestContract
  appActionManifest: AiAppActionManifestContract
  mobileUiManifest: AiWorkspaceMobileUiManifestContract
  personalizationManifest: AiPersonalizationManifestContract
  safetyAdminManifest: AiSafetyAdminManifestContract
  sections: AiWorkspaceSectionContract[]
}

export type AiWorkspaceScreenContract = {
  catalog: AiWorkspaceCatalogContract
  session: AiSessionContext
  state: AiAssistantState
  permissions: AiWorkspaceConsentContract[]
  quickActions: AiWorkspaceQuickActionContract[]
  featureGates: AiWorkspaceFeatureGateContract[]
  searchProviders: AiSearchProviderManifestItem[]
  translationProviders: AiTranslationProviderManifestItem[]
  assistant: {
    manifest: AiAssistantManifestContract
    status: "ready"
  }
  appActions: AiAppActionWorkspaceSummaryContract
  realtimeTranslation: AiRealtimeTranslationWorkspaceSummaryContract
  personalization: AiWorkspacePersonalizationSummaryContract
  safetyAdmin: AiSafetyAdminWorkspaceSummaryContract
  mobileUi: {
    manifest: AiWorkspaceMobileUiManifestContract
    status: "ready"
    baseRoute: string
    mobileBaseRoute: string
    primaryRoute: string
    surfaces: string[]
  }
  voice: AiWorkspaceVoiceContract
  settingsProfile: AiWorkspaceSettingsProfileSummaryContract
  integration: AiWorkspaceIntegrationSummaryContract
  providerSettings: {
    searchProvider: AiProviderKey
    translationProvider: AiProviderKey
    modeProviders: Partial<Record<AiAssistantMode, AiProviderKey>>
  }
  premium: {
    enabled: boolean
    planKey: string
    activeFeatures: string[]
    coinBalance?: number
  }
  memory: {
    totalEntries: number
    memoryWriteAllowed: boolean
  }
  locale: {
    value: string
    supportedLocales: string[]
  }
  activity: {
    historyPreviewCount: number
    taskPreviewCount: number
    awaitingConfirmationTasks: number
    draftTasks: number
    completedTasks: number
    cancelledTasks: number
    lastHistoryAt?: string
  }
  notificationPreview: Array<{
    id: string
    kind?: string
    titleKey?: string
    messageKey?: string
    createdAt: string
    readAt?: string
  }>
  historyPreview: Array<{
    id: string
    title: string
    kind: "search" | "translation" | "business" | "education" | "chat"
    createdAt: string
  }>
  taskPreview: Array<{
    id: string
    title: string
    status: "draft" | "awaiting_confirmation" | "completed" | "cancelled"
  }>
}
