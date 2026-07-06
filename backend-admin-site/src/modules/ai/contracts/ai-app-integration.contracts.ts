import type { AiAssistantMode, AiProviderKey } from "../../../core/kernel/ai/ai.types"

export type AiAppIntegrationStatusContract = "ready" | "limited" | "not_connected" | "blocked"

export type AiAppIntegrationAreaContract =
  | "app_boot"
  | "router"
  | "kernel"
  | "workspace"
  | "activity"
  | "settings_profile"
  | "providers"
  | "premium_coin"
  | "locale"
  | "notifications"
  | "personalization"
  | "safety_admin"
  | "profile"
  | "voice"
  | "admin"

export type AiAppIntegrationRouteContract = {
  key: string
  title: string
  method: "GET" | "POST" | "PATCH" | "DELETE"
  path: string
  area: AiAppIntegrationAreaContract
  public: boolean
  requiresUserId: boolean
  description: string
}

export type AiAppIntegrationCheckContract = {
  key: string
  area: AiAppIntegrationAreaContract
  title: string
  status: AiAppIntegrationStatusContract
  required: boolean
  description: string
  action?: string
}

export type AiAppIntegrationDependencyContract = {
  key: string
  title: string
  required: boolean
  status: AiAppIntegrationStatusContract
  description: string
}

export type AiWorkspaceIntegrationSummaryContract = {
  programId: "sabi_ai"
  moduleName: "ai"
  status: AiAppIntegrationStatusContract
  publicBasePath: "/api/ai"
  workspaceRoute: "/api/ai/workspace/:userId"
  integrationRoute: "/api/ai/integration/:userId/boot"
  settingsRoute: "/api/ai/settings/:userId"
  activityRoute: "/api/ai/activity/:userId/overview"
  voiceRoute: "/api/ai/voice/:userId/status"
  personalizationRoute: "/api/ai/personalization/:userId/snapshot"
  safetyRoute: "/api/ai/safety/:userId/summary"
  externalBindings: {
    authSession: AiAppIntegrationStatusContract
    profile: AiAppIntegrationStatusContract
    premiumCoin: AiAppIntegrationStatusContract
    notifications: AiAppIntegrationStatusContract
    nativeVoice: AiAppIntegrationStatusContract
    admin: AiAppIntegrationStatusContract
    personalization: AiAppIntegrationStatusContract
    safetyAdmin: AiAppIntegrationStatusContract
  }
}

export type AiAppIntegrationManifestContract = {
  programId: "sabi_ai"
  moduleName: "ai"
  title: string
  description: string
  sourceRoot: "src/modules/ai"
  kernelRoot: "src/core/kernel/ai"
  publicBasePath: "/api/ai"
  routerMountPath: "/api/ai"
  appRoutes: {
    manifest: "/api/ai/manifest"
    workspace: "/api/ai/workspace/:userId"
    runtime: "/api/ai"
    voice: "/api/ai/voice"
    activity: "/api/ai/activity"
    settingsProfile: "/api/ai/settings"
    integration: "/api/ai/integration"
    personalization: "/api/ai/personalization"
    safety: "/api/ai/safety"
  }
  bootOrder: string[]
  dependencies: AiAppIntegrationDependencyContract[]
  routes: AiAppIntegrationRouteContract[]
  checks: AiAppIntegrationCheckContract[]
  featureFlags: string[]
  generatedAt: string
}

export type AiAppIntegrationReadinessContract = {
  programId: "sabi_ai"
  moduleName: "ai"
  status: AiAppIntegrationStatusContract
  readyForAppMount: boolean
  checks: AiAppIntegrationCheckContract[]
  requiredFailures: AiAppIntegrationCheckContract[]
  limitedExternalBindings: AiAppIntegrationCheckContract[]
  generatedAt: string
}

export type AiAppSessionBindInputContract = {
  userId: string
  mode?: AiAssistantMode
  provider?: AiProviderKey
  locale?: string
  searchProvider?: AiProviderKey
  translationProvider?: AiProviderKey
  modeProviders?: Partial<Record<AiAssistantMode, AiProviderKey>>
  source?: "app_boot" | "profile" | "workspace" | "settings" | "admin" | "system"
}

export type AiAppSessionBindingContract = {
  userId: string
  source: "app_boot" | "profile" | "workspace" | "settings" | "admin" | "system"
  mode: AiAssistantMode
  provider: AiProviderKey
  locale: string
  searchProvider: AiProviderKey
  translationProvider: AiProviderKey
  premiumEnabled: boolean
  activeFeatures: string[]
  consent: {
    readAccessAllowed: boolean
    memoryWriteAllowed: boolean
    toolExecutionAllowed: boolean
    internetSearchAllowed: boolean
  }
  boundAt: string
}

export type AiAppBootContract = {
  programId: "sabi_ai"
  moduleName: "ai"
  userId: string
  status: AiAppIntegrationStatusContract
  readyForAppMount: boolean
  sessionBinding: AiAppSessionBindingContract
  integration: AiWorkspaceIntegrationSummaryContract
  workspace: {
    route: string
    sections: string[]
    quickActions: string[]
  }
  profile: {
    route: string
    status: AiAppIntegrationStatusContract
    entryPoints: string[]
  }
  activity: {
    route: string
    historyPreviewCount: number
    taskPreviewCount: number
    awaitingConfirmationTasks: number
  }
  settings: {
    route: string
    enabledPermissions: number
    totalPermissions: number
  }
  personalization: {
    route: string
    status: AiAppIntegrationStatusContract
    preferencesCount: number
    instructionsCount: number
  }
  safety: {
    route: string
    status: string
    openReports: number
    holdActiveReports: number
    emergencyReports: number
  }
  checks: AiAppIntegrationCheckContract[]
  generatedAt: string
}
