import type {
  AiAssistantMode,
  AiConsentScope,
  AiPremiumFeature,
  AiProviderKey,
} from "../../../core/kernel/ai/ai.types"

export type AiSettingsProfileSectionKey =
  | "overview"
  | "profile"
  | "permissions"
  | "providers"
  | "memory"
  | "premium"
  | "locale"
  | "notifications"
  | "voice"
  | "history_tasks"

export type AiSettingsProfileEntryPointKey =
  | "ai_workspace"
  | "ai_permissions"
  | "ai_memory"
  | "ai_providers"
  | "ai_premium"
  | "ai_voice"
  | "ai_realtime_translation"
  | "ai_app_actions"
  | "ai_personalization"
  | "ai_history_tasks"

export type AiSettingsProfileStatus = "ready" | "limited" | "not_connected"

export type AiSettingsProfileManifestContract = {
  programId: "sabi_ai"
  area: "settings_profile"
  title: string
  description: string
  baseRoute: string
  routes: {
    dashboard: string
    permissions: string
    profileContracts: string
    providers: string
    locale: string
    memory: string
    notifications: string
    premium: string
  }
  sections: Array<{
    key: AiSettingsProfileSectionKey
    title: string
    description: string
    requiredSource: "ai_kernel" | "profile_module" | "premium_gate" | "notification_service"
  }>
  entryPoints: Array<{
    key: AiSettingsProfileEntryPointKey
    title: string
    description: string
    targetRoute: string
    visibleInProfile: boolean
  }>
}

export type AiPermissionToggleContract = {
  scope: AiConsentScope
  title: string
  description: string
  enabled: boolean
  locked: boolean
  source: "ai_consent"
  requiredFor: string[]
  warning?: string
}

export type AiProviderSettingsProfileContract = {
  searchProvider: AiProviderKey
  translationProvider: AiProviderKey
  modeProviders: Partial<Record<AiAssistantMode, AiProviderKey>>
  routes: {
    read: string
    update: string
    reset: string
  }
}

export type AiLocaleSettingsProfileContract = {
  locale: string
  supportedLocales: string[]
  source: "user" | "system" | "profile" | "kernel"
  route: string
}

export type AiMemorySettingsProfileContract = {
  totalEntries: number
  memoryWriteAllowed: boolean
  reviewRoute: string
  deleteRoutePattern: string
  preview: Array<{
    id: string
    kind?: string
    label?: string
    title?: string
    createdAt?: string
    updatedAt?: string
  }>
}

export type AiPremiumSettingsProfileContract = {
  enabled: boolean
  planKey: string
  activeFeatures: AiPremiumFeature[] | string[]
  coinBalance?: number
  catalogRoute: string
  purchasePreviewRoute: string
}

export type AiNotificationSettingsProfileContract = {
  manifestRoute: string
  listRoute: string
  unreadCount: number
  latestPreview: Array<{
    id: string
    kind?: string
    titleKey?: string
    messageKey?: string
    createdAt: string
    readAt?: string
  }>
}

export type AiProfileContractEntry = {
  key: AiSettingsProfileEntryPointKey
  title: string
  description: string
  route: string
  visible: boolean
  locked: boolean
  reason?: string
}

export type AiProfileBindingContract = {
  userId: string
  status: AiSettingsProfileStatus
  profileSource: "kernel_session" | "profile_module" | "not_connected"
  displayName?: string | null
  avatarUrl?: string | null
  aiProgramCard: {
    title: string
    description: string
    route: string
    badge: "enabled" | "limited" | "premium_required"
  }
  entryPoints: AiProfileContractEntry[]
  safety: {
    requiresExplicitConsentForWriteActions: boolean
    memoryCanBeDisabled: boolean
    toolExecutionRequiresConfirmation: boolean
    profileDataIsNotPublicByDefault: boolean
  }
}

export type AiSettingsProfileDashboardContract = {
  userId: string
  updatedAt: string
  manifest: AiSettingsProfileManifestContract
  profile: AiProfileBindingContract
  permissions: AiPermissionToggleContract[]
  providers: AiProviderSettingsProfileContract
  locale: AiLocaleSettingsProfileContract
  memory: AiMemorySettingsProfileContract
  premium: AiPremiumSettingsProfileContract
  notifications: AiNotificationSettingsProfileContract
  sections: Array<{
    key: AiSettingsProfileSectionKey
    title: string
    visible: boolean
    locked: boolean
    route: string
    status: AiSettingsProfileStatus
  }>
}

export type AiUpdatePermissionsInputContract = {
  userId: string
  actorType?: "user" | "admin" | "system"
  actorId?: string
  reason?: string
  permissions: Partial<Record<AiConsentScope, boolean>>
}

export type AiUpdateProviderSettingsInputContract = {
  userId: string
  searchProvider?: AiProviderKey
  translationProvider?: AiProviderKey
  modeProviders?: Partial<Record<AiAssistantMode, AiProviderKey>>
}

export type AiUpdateLocaleSettingsInputContract = {
  userId: string
  locale: string
  source?: "user" | "system" | "profile" | "kernel"
}

export type AiWorkspaceSettingsProfileSummaryContract = {
  userId: string
  profileSource: AiProfileBindingContract["profileSource"]
  permissionsEnabled: number
  permissionsTotal: number
  memoryWriteAllowed: boolean
  providerSettingsRoute: string
  permissionsRoute: string
  profileContractsRoute: string
  settingsRoute: string
  entryPoints: AiProfileContractEntry[]
}
