import type {
  AiAssistantMode,
  AiProviderKey,
} from "../../../core/kernel/ai/ai.types"
import type {
  AiAssistantRunRequestContract,
  AiAssistantRunResponseContract,
} from "./ai-assistant.contracts"
import type { AiAppActionWorkspaceSummaryContract } from "./ai-app-actions.contracts"
import type { AiRealtimeTranslationWorkspaceSummaryContract } from "./ai-realtime-translation.contracts"
import type { AiWorkspaceScreenContract } from "./ai-workspace.contracts"

export type AiMobileUiSurfaceKey =
  | "home"
  | "assistant_chat"
  | "voice"
  | "translation"
  | "history_tasks"
  | "memory"
  | "personalization"
  | "providers"
  | "settings"
  | "premium"
  | "profile"
  | "actions"
  | "safety_admin"

export type AiMobileUiStatus = "ready" | "limited" | "locked" | "not_connected"

export type AiMobileUiComponentKind =
  | "hero"
  | "chat_composer"
  | "voice_button"
  | "quick_actions"
  | "card_grid"
  | "list"
  | "toggle_list"
  | "provider_picker"
  | "premium_gate"
  | "history_preview"
  | "task_preview"
  | "translation_panel"
  | "settings_panel"
  | "action_confirmation_panel"

export type AiMobileUiIconKey =
  | "sabi_ai"
  | "chat"
  | "voice"
  | "translation"
  | "history"
  | "task"
  | "memory"
  | "personalization"
  | "provider"
  | "settings"
  | "premium"
  | "profile"
  | "shield"
  | "wallet"
  | "qr"
  | "messenger"
  | "coin"
  | "ai"

export type AiMobileUiRouteContract = {
  mobileRoute: string
  apiRoute: string
  deepLink: string
}

export type AiMobileUiNavigationItemContract = {
  key: AiMobileUiSurfaceKey
  title: string
  description: string
  icon: AiMobileUiIconKey
  route: AiMobileUiRouteContract
  active: boolean
  locked: boolean
  badge?: number | string
}

export type AiMobileUiActionContract = {
  key: string
  title: string
  description: string
  icon: AiMobileUiIconKey
  mode: AiAssistantMode
  targetSurface: AiMobileUiSurfaceKey
  route: AiMobileUiRouteContract
  appActionKey?: string
  requiresConfirmation: boolean
  locked: boolean
  lockReason?: string
}

export type AiMobileUiComponentContract = {
  key: string
  kind: AiMobileUiComponentKind
  title: string
  description: string
  status: AiMobileUiStatus
  visible: boolean
  locked: boolean
  route?: AiMobileUiRouteContract
  primaryAction?: AiMobileUiActionContract
  metadata?: Record<string, unknown>
}

export type AiMobileUiManifestContract = {
  programId: "sabi_ai"
  version: "AI-29.2"
  area: "mobile_ui"
  title: string
  description: string
  baseRoute: string
  mobileBaseRoute: string
  routes: {
    manifest: string
    snapshot: string
    shell: string
    home: string
    chat: string
    voice: string
    translation: string
    activity: string
    settings: string
    premium: string
    personalization: string
    sendMessage: string
  }
  surfaces: Array<{
    key: AiMobileUiSurfaceKey
    title: string
    description: string
    requiredSource: "workspace" | "assistant" | "voice" | "realtime_translation" | "activity" | "settings_profile" | "premium" | "app_actions" | "personalization" | "safety_admin"
  }>
  components: AiMobileUiComponentKind[]
  safeExecution: {
    dangerousActionsRequireConfirmation: true
    moneyActionsRequireConfirmation: true
    accountDeletionBlockedForAiAutoRun: true
    internalRiskReportsDoNotNotifyUser?: true
  }
}

export type AiMobileUiShellContract = {
  programId: "sabi_ai"
  version: "AI-29.2"
  userId: string
  generatedAt: string
  title: string
  subtitle: string
  status: AiMobileUiStatus
  activeSurface: AiMobileUiSurfaceKey
  topBar: {
    title: string
    subtitle: string
    avatarLabel: string
    premiumBadge: boolean
    voiceStatus: AiMobileUiStatus
    settingsRoute: AiMobileUiRouteContract
  }
  bottomTabs: AiMobileUiNavigationItemContract[]
  floatingAction: AiMobileUiActionContract
  safetyNotice: {
    title: string
    description: string
    route: AiMobileUiRouteContract
  }
}

export type AiMobileUiHomeContract = {
  shell: AiMobileUiShellContract
  hero: AiMobileUiComponentContract & {
    headline: string
    subheadline: string
    chips: string[]
  }
  quickActions: AiMobileUiActionContract[]
  cards: AiMobileUiComponentContract[]
  workspace: Pick<AiWorkspaceScreenContract, "premium" | "memory" | "activity" | "locale" | "providerSettings">
}

export type AiMobileUiChatContract = {
  shell: AiMobileUiShellContract
  input: {
    placeholder: string
    sendRoute: string
    supportsVoice: boolean
    supportsAttachmentContext: boolean
    supportsWebSearch: boolean
    supportsVoiceControl: boolean
    defaultMode: AiAssistantMode
  }
  starterPrompts: Array<{
    key: string
    title: string
    prompt: string
    mode: AiAssistantMode
  }>
  lastAssistantRun?: AiAssistantRunResponseContract
  pendingConfirmations: AiAppActionWorkspaceSummaryContract
}

export type AiMobileUiVoiceContract = {
  shell: AiMobileUiShellContract
  status: AiWorkspaceScreenContract["voice"]
  components: AiMobileUiComponentContract[]
  nativeBridgeNotice: {
    title: string
    description: string
    required: boolean
  }
}

export type AiMobileUiTranslationContract = {
  shell: AiMobileUiShellContract
  realtime: AiRealtimeTranslationWorkspaceSummaryContract
  components: AiMobileUiComponentContract[]
  quickActions: AiMobileUiActionContract[]
}

export type AiMobileUiActivityContract = {
  shell: AiMobileUiShellContract
  historyPreview: AiWorkspaceScreenContract["historyPreview"]
  taskPreview: AiWorkspaceScreenContract["taskPreview"]
  counters: AiWorkspaceScreenContract["activity"]
  components: AiMobileUiComponentContract[]
}

export type AiMobileUiSettingsContract = {
  shell: AiMobileUiShellContract
  permissions: AiWorkspaceScreenContract["permissions"]
  providers: {
    search: AiWorkspaceScreenContract["searchProviders"]
    translation: AiWorkspaceScreenContract["translationProviders"]
  }
  profile: AiWorkspaceScreenContract["settingsProfile"]
  personalization: AiWorkspaceScreenContract["personalization"]
  components: AiMobileUiComponentContract[]
}


export type AiMobileUiPersonalizationContract = {
  shell: AiMobileUiShellContract
  personalization: AiWorkspaceScreenContract["personalization"]
  components: AiMobileUiComponentContract[]
}

export type AiMobileUiPremiumContract = {
  shell: AiMobileUiShellContract
  premium: AiWorkspaceScreenContract["premium"]
  featureGates: AiWorkspaceScreenContract["featureGates"]
  components: AiMobileUiComponentContract[]
}

export type AiMobileUiSnapshotContract = {
  manifest: AiMobileUiManifestContract
  shell: AiMobileUiShellContract
  home: AiMobileUiHomeContract
  chat: AiMobileUiChatContract
  voice: AiMobileUiVoiceContract
  translation: AiMobileUiTranslationContract
  activity: AiMobileUiActivityContract
  settings: AiMobileUiSettingsContract
  personalization: AiMobileUiPersonalizationContract
  premium: AiMobileUiPremiumContract
}

export type AiMobileUiSendMessageRequestContract = AiAssistantRunRequestContract & {
  surface?: AiMobileUiSurfaceKey
}

export type AiMobileUiSendMessageResponseContract = {
  userId: string
  surface: AiMobileUiSurfaceKey
  createdAt: string
  assistant: AiAssistantRunResponseContract
  ui: {
    refreshRoutes: string[]
    pendingConfirmationCount: number
    dispatchCommands: AiAssistantRunResponseContract["actions"]
  }
}

export type AiMobileUiProviderSelectionContract = {
  searchProvider: AiProviderKey
  translationProvider: AiProviderKey
  modeProviders: Partial<Record<AiAssistantMode, AiProviderKey>>
}
