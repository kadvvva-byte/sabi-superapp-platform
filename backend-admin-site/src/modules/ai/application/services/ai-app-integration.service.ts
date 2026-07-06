import type { AiFacadeService } from "../../../../core/kernel/ai/ai-facade.service"
import type { AiAssistantMode, AiProviderKey } from "../../../../core/kernel/ai/ai.types"
import type { AiHistoryTaskService } from "./ai-history-task.service"
import type { AiSettingsProfileService } from "./ai-settings-profile.service"
import type { AiWorkspaceService } from "./ai-workspace.service"
import type {
  AiAppBootContract,
  AiAppIntegrationCheckContract,
  AiAppIntegrationDependencyContract,
  AiAppIntegrationManifestContract,
  AiAppIntegrationReadinessContract,
  AiAppIntegrationRouteContract,
  AiAppIntegrationStatusContract,
  AiAppSessionBindInputContract,
  AiAppSessionBindingContract,
  AiWorkspaceIntegrationSummaryContract,
} from "../../contracts/ai-app-integration.contracts"

const PUBLIC_BASE_PATH = "/api/ai" as const
const WORKSPACE_ROUTE = "/api/ai/workspace/:userId" as const
const INTEGRATION_BOOT_ROUTE = "/api/ai/integration/:userId/boot" as const
const SETTINGS_ROUTE = "/api/ai/settings/:userId" as const
const ACTIVITY_ROUTE = "/api/ai/activity/:userId/overview" as const
const VOICE_ROUTE = "/api/ai/voice/:userId/status" as const
const PERSONALIZATION_ROUTE = "/api/ai/personalization/:userId/snapshot" as const
const SAFETY_ROUTE = "/api/ai/safety/:userId/summary" as const

const APP_ROUTES: AiAppIntegrationRouteContract[] = [
  {
    key: "ai_manifest",
    title: "AI program manifest",
    method: "GET",
    path: "/api/ai/manifest",
    area: "router",
    public: true,
    requiresUserId: false,
    description: "Returns the official Sabi AI product manifest and route map.",
  },
  {
    key: "ai_integration_manifest",
    title: "AI integration manifest",
    method: "GET",
    path: "/api/ai/integration/manifest",
    area: "app_boot",
    public: true,
    requiresUserId: false,
    description: "Returns the final app integration contract for mounting Sabi AI as a dedicated program.",
  },
  {
    key: "ai_integration_readiness",
    title: "AI integration readiness",
    method: "GET",
    path: "/api/ai/integration/:userId/readiness",
    area: "app_boot",
    public: false,
    requiresUserId: true,
    description: "Checks the per-user AI readiness state for app boot, profile entry, workspace, providers, activity, and settings.",
  },
  {
    key: "ai_integration_boot",
    title: "AI app boot payload",
    method: "GET",
    path: INTEGRATION_BOOT_ROUTE,
    area: "app_boot",
    public: false,
    requiresUserId: true,
    description: "Returns the compact boot payload that the app shell can use to mount the Sabi AI program.",
  },
  {
    key: "ai_session_bind",
    title: "AI app session binding",
    method: "POST",
    path: "/api/ai/integration/:userId/session/bind",
    area: "app_boot",
    public: false,
    requiresUserId: true,
    description: "Binds app session, locale, mode, and provider preferences to the AI kernel session.",
  },
  {
    key: "ai_workspace",
    title: "AI workspace",
    method: "GET",
    path: WORKSPACE_ROUTE,
    area: "workspace",
    public: false,
    requiresUserId: true,
    description: "Main Sabi AI workspace payload with modes, quick actions, feature gates, activity, voice, and settings summary.",
  },
  {
    key: "ai_activity_overview",
    title: "AI activity overview",
    method: "GET",
    path: ACTIVITY_ROUTE,
    area: "activity",
    public: false,
    requiresUserId: true,
    description: "History and task overview for the AI program.",
  },
  {
    key: "ai_settings_dashboard",
    title: "AI settings dashboard",
    method: "GET",
    path: SETTINGS_ROUTE,
    area: "settings_profile",
    public: false,
    requiresUserId: true,
    description: "Profile-facing AI settings, permissions, providers, memory, premium, locale, notifications, and voice entry points.",
  },
  {
    key: "ai_personalization_snapshot",
    title: "AI personalization snapshot",
    method: "GET",
    path: PERSONALIZATION_ROUTE,
    area: "personalization",
    public: false,
    requiresUserId: true,
    description: "AI-23 memory and personalization runtime snapshot for mobile AI UI and assistant context.",
  },
  {
    key: "ai_safety_user_summary",
    title: "AI safety/admin user summary",
    method: "GET",
    path: SAFETY_ROUTE,
    area: "safety_admin",
    public: false,
    requiresUserId: true,
    description: "AI-24 internal safety/admin summary for possible-violation reports, account/funds holds, emergency escalation, and admin panel monitoring.",
  },
  {
    key: "ai_safety_admin_monitor",
    title: "AI safety/admin monitor",
    method: "GET",
    path: "/api/ai/safety/admin/monitor",
    area: "safety_admin",
    public: false,
    requiresUserId: false,
    description: "Admin panel monitoring queue for AML/KYC, fraud, terrorism/violence, narcotics/psychotropics, bot/merchant/business abuse, and other AI-24 report categories.",
  },
  {
    key: "ai_voice_status",
    title: "AI voice status",
    method: "GET",
    path: VOICE_ROUTE,
    area: "voice",
    public: false,
    requiresUserId: true,
    description: "Voice contract status for STT, TTS, quick invoke, wake invoke, and realtime call translation bridge.",
  },
]

const FEATURE_FLAGS = [
  "ai.kernel.ready",
  "ai.workspace.coin.billing",
  "ai.voice.contracts",
  "ai.history_tasks.application",
  "ai.settings_profile.contracts",
  "ai.app.integration.contracts",
  "ai.personalization.runtime",
  "ai.safety_admin.monitoring",
  "ai.business.assistant",
  "ai.education.assistant",
  "ai.write.requires_confirmation",
]

const BOOT_ORDER = [
  "platform-foundation",
  "auth-session",
  "profile-runtime",
  "wallet-coin-runtime",
  "notifications-runtime",
  "ai-kernel",
  "ai-module-router",
  "ai-workspace",
]

type AiVoiceManifestPort = {
  getVoiceManifest?: () => { configured?: boolean; status?: string }
}

function nowIso(): string {
  return new Date().toISOString()
}

function asStatus(value: unknown, fallback: AiAppIntegrationStatusContract = "limited"): AiAppIntegrationStatusContract {
  return value === "ready" || value === "limited" || value === "not_connected" || value === "blocked"
    ? value
    : fallback
}

function normalizeUserId(userId: string): string {
  const normalized = userId.trim()
  if (!normalized) throw new Error("ai_user_id_required")
  return normalized
}

function fillRouteUserId(route: string, userId: string): string {
  return route.replace(":userId", encodeURIComponent(userId))
}

function getRequiredFailures(checks: AiAppIntegrationCheckContract[]): AiAppIntegrationCheckContract[] {
  return checks.filter((check) => check.required && (check.status === "blocked" || check.status === "not_connected"))
}

function getOverallStatus(checks: AiAppIntegrationCheckContract[]): AiAppIntegrationStatusContract {
  const requiredFailures = getRequiredFailures(checks)
  if (requiredFailures.length > 0) return "blocked"
  if (checks.some((check) => check.status === "limited" || check.status === "not_connected")) return "limited"
  return "ready"
}

export class AiAppIntegrationService {
  constructor(
    private readonly aiFacade: AiFacadeService,
    private readonly aiWorkspaceService: AiWorkspaceService,
    private readonly aiHistoryTaskService: AiHistoryTaskService,
    private readonly aiSettingsProfileService: AiSettingsProfileService,
  ) {}

  getManifest(): AiAppIntegrationManifestContract {
    const checks = this.getBaseChecks()

    return {
      programId: "sabi_ai",
      moduleName: "ai",
      title: "Sabi AI app integration",
      description:
        "Final product integration contract for mounting Sabi AI as a dedicated SuperApp program with workspace, runtime, activity, settings, voice, premium COIN access, notifications, locale, and profile entry points.",
      sourceRoot: "src/modules/ai",
      kernelRoot: "src/core/kernel/ai",
      publicBasePath: PUBLIC_BASE_PATH,
      routerMountPath: PUBLIC_BASE_PATH,
      appRoutes: {
        manifest: "/api/ai/manifest",
        workspace: WORKSPACE_ROUTE,
        runtime: PUBLIC_BASE_PATH,
        voice: "/api/ai/voice",
        activity: "/api/ai/activity",
        settingsProfile: "/api/ai/settings",
        integration: "/api/ai/integration",
        personalization: "/api/ai/personalization",
        safety: "/api/ai/safety",
      },
      bootOrder: BOOT_ORDER,
      dependencies: this.getDependencies(),
      routes: APP_ROUTES,
      checks,
      featureFlags: FEATURE_FLAGS,
      generatedAt: nowIso(),
    }
  }

  getReadiness(userId?: string): AiAppIntegrationReadinessContract {
    const checks = userId ? this.getUserChecks(normalizeUserId(userId)) : this.getBaseChecks()
    const requiredFailures = getRequiredFailures(checks)

    return {
      programId: "sabi_ai",
      moduleName: "ai",
      status: getOverallStatus(checks),
      readyForAppMount: requiredFailures.length === 0,
      checks,
      requiredFailures,
      limitedExternalBindings: checks.filter((check) => !check.required && check.status !== "ready"),
      generatedAt: nowIso(),
    }
  }

  getWorkspaceIntegrationSummary(userId?: string): AiWorkspaceIntegrationSummaryContract {
    const checks = userId ? this.getUserChecks(userId) : this.getBaseChecks()

    return {
      programId: "sabi_ai",
      moduleName: "ai",
      status: getOverallStatus(checks),
      publicBasePath: PUBLIC_BASE_PATH,
      workspaceRoute: WORKSPACE_ROUTE,
      integrationRoute: INTEGRATION_BOOT_ROUTE,
      settingsRoute: SETTINGS_ROUTE,
      activityRoute: ACTIVITY_ROUTE,
      voiceRoute: VOICE_ROUTE,
      personalizationRoute: PERSONALIZATION_ROUTE,
      safetyRoute: SAFETY_ROUTE,
      externalBindings: {
        authSession: this.getCheckStatus(checks, "auth_session_binding"),
        profile: this.getCheckStatus(checks, "profile_entry_binding"),
        premiumCoin: this.getCheckStatus(checks, "premium_coin_access"),
        notifications: this.getCheckStatus(checks, "notification_runtime"),
        nativeVoice: this.getCheckStatus(checks, "voice_native_bridge"),
        admin: this.getCheckStatus(checks, "admin_visibility"),
        personalization: this.getCheckStatus(checks, "personalization_runtime"),
        safetyAdmin: this.getCheckStatus(checks, "safety_admin_monitoring"),
      },
    }
  }

  bindAppSession(input: AiAppSessionBindInputContract): AiAppSessionBindingContract {
    const userId = normalizeUserId(input.userId)

    if (input.locale) {
      this.aiFacade.updateLocaleBinding({
        userId,
        locale: input.locale,
        source: (input.source ?? "app_boot") as never,
      })
    }

    if (input.searchProvider || input.translationProvider || input.modeProviders) {
      this.aiFacade.updateProviderSettings({
        userId,
        searchProvider: input.searchProvider,
        translationProvider: input.translationProvider,
        modeProviders: input.modeProviders,
      })
    }

    if (input.mode || input.provider) {
      this.aiFacade.configureSession({
        userId,
        mode: input.mode,
        provider: input.provider,
      })
    }

    return this.getSessionBinding(userId, input.source ?? "app_boot")
  }

  getBoot(userId: string): AiAppBootContract {
    const normalizedUserId = normalizeUserId(userId)
    const workspace = this.aiWorkspaceService.getWorkspace(normalizedUserId)
    const activity = this.aiHistoryTaskService.getOverview(normalizedUserId)
    const settings = this.aiSettingsProfileService.getDashboard(normalizedUserId)
    const profile = this.aiSettingsProfileService.getProfileContracts(normalizedUserId)
    const readiness = this.getReadiness(normalizedUserId)
    const personalization = this.aiFacade.getPersonalizationSummary(normalizedUserId)
    const safety = this.aiFacade.getSafetyUserSummary(normalizedUserId)

    return {
      programId: "sabi_ai",
      moduleName: "ai",
      userId: normalizedUserId,
      status: readiness.status,
      readyForAppMount: readiness.readyForAppMount,
      sessionBinding: this.getSessionBinding(normalizedUserId, "app_boot"),
      integration: this.getWorkspaceIntegrationSummary(normalizedUserId),
      workspace: {
        route: fillRouteUserId(WORKSPACE_ROUTE, normalizedUserId),
        sections: workspace.catalog.sections.filter((section) => section.visible).map((section) => section.key),
        quickActions: workspace.quickActions.map((action) => action.key),
      },
      profile: {
        route: fillRouteUserId(SETTINGS_ROUTE, normalizedUserId),
        status: asStatus(profile.status, "limited"),
        entryPoints: profile.entryPoints.filter((entry) => entry.visible).map((entry) => entry.key),
      },
      activity: {
        route: fillRouteUserId(ACTIVITY_ROUTE, normalizedUserId),
        historyPreviewCount: activity.counters.historyPreviewCount,
        taskPreviewCount: activity.counters.taskPreviewCount,
        awaitingConfirmationTasks: activity.counters.awaitingConfirmationTasks,
      },
      settings: {
        route: fillRouteUserId(SETTINGS_ROUTE, normalizedUserId),
        enabledPermissions: settings.permissions.filter((permission) => permission.enabled).length,
        totalPermissions: settings.permissions.length,
      },
      personalization: {
        route: fillRouteUserId(PERSONALIZATION_ROUTE, normalizedUserId),
        status: personalization.status,
        preferencesCount: personalization.preferencesCount,
        instructionsCount: personalization.instructionsCount,
      },
      safety: {
        route: fillRouteUserId(SAFETY_ROUTE, normalizedUserId),
        status: safety.status,
        openReports: safety.openReports,
        holdActiveReports: safety.holdActiveReports,
        emergencyReports: safety.emergencyReports,
      },
      checks: readiness.checks,
      generatedAt: nowIso(),
    }
  }

  private getSessionBinding(
    userId: string,
    source: AiAppSessionBindingContract["source"],
  ): AiAppSessionBindingContract {
    const session = this.aiFacade.getSession(userId)
    const locale = this.aiFacade.getLocaleBinding(userId)
    const providers = this.aiFacade.getProviderSettings(userId)
    const premium = this.aiFacade.getPremiumAccess(userId)
    const consent = this.aiFacade.getConsent(userId)

    return {
      userId,
      source,
      mode: session.mode,
      provider: session.defaultProvider,
      locale: locale.locale,
      searchProvider: providers.searchProvider,
      translationProvider: providers.translationProvider,
      premiumEnabled: premium.premiumEnabled,
      activeFeatures: premium.activeFeatures,
      consent: {
        readAccessAllowed: consent.readAccessAllowed,
        memoryWriteAllowed: consent.memoryWriteAllowed,
        toolExecutionAllowed: consent.toolExecutionAllowed,
        internetSearchAllowed: consent.internetSearchAllowed,
      },
      boundAt: nowIso(),
    }
  }

  private getDependencies(): AiAppIntegrationDependencyContract[] {
    return [
      {
        key: "platform_foundation",
        title: "Platform foundation",
        required: true,
        status: "ready",
        description: "Feature flags, health checks, and audit logs are owned by the platform foundation context.",
      },
      {
        key: "ai_kernel",
        title: "AI kernel",
        required: true,
        status: "ready",
        description: "Sabi AI product layer is connected to src/core/kernel/ai through AiFacadeService.",
      },
      {
        key: "auth_session",
        title: "Auth session",
        required: true,
        status: "limited",
        description: "Per-user AI state requires the app auth/session layer to pass the real unified user ID into AI routes.",
      },
      {
        key: "profile_runtime",
        title: "Profile runtime",
        required: false,
        status: "limited",
        description: "AI exposes profile contracts, but real display name and avatar must come from the Profile module at app integration time.",
      },
      {
        key: "wallet_coin_runtime",
        title: "Wallet COIN runtime",
        required: true,
        status: "ready",
        description: "Premium AI access is represented through COIN preview and premium gate contracts.",
      },
      {
        key: "native_voice_bridge",
        title: "Native voice bridge",
        required: false,
        status: this.getVoiceBridgeStatus(),
        description: "Voice contracts are ready; native STT/TTS/wake integration depends on the mobile bridge.",
      },
      {
        key: "admin_runtime",
        title: "Admin runtime",
        required: false,
        status: "limited",
        description: "Admin visibility contracts are reserved for pre-launch admin panel integration.",
      },
    ]
  }

  private getBaseChecks(): AiAppIntegrationCheckContract[] {
    return [
      {
        key: "router_manifest",
        area: "router",
        title: "Unified AI router",
        status: "ready",
        required: true,
        description: "The product router exposes workspace, runtime, voice, activity, settings/profile, and integration routes from one entry point.",
      },
      {
        key: "kernel_facade",
        area: "kernel",
        title: "AI kernel facade",
        status: "ready",
        required: true,
        description: "Product services are wired through AiFacadeService instead of direct temporary runtime state.",
      },
      {
        key: "workspace_contract",
        area: "workspace",
        title: "AI workspace contract",
        status: "ready",
        required: true,
        description: "Workspace catalog and per-user workspace payload are available.",
      },
      {
        key: "activity_application",
        area: "activity",
        title: "History/task application layer",
        status: "ready",
        required: true,
        description: "AI history and user-confirmed task contracts are available through the product layer.",
      },
      {
        key: "settings_profile_contracts",
        area: "settings_profile",
        title: "Settings/profile contracts",
        status: "ready",
        required: true,
        description: "AI settings, permissions, profile entries, memory, provider, locale, premium, and notification contracts are available.",
      },
      {
        key: "provider_settings",
        area: "providers",
        title: "Provider settings persistence contract",
        status: "ready",
        required: true,
        description: "Search and translation provider settings can be read, updated, and reset through AI settings routes.",
      },
      {
        key: "personalization_runtime",
        area: "personalization",
        title: "AI-23 personalization runtime",
        status: "ready",
        required: false,
        description: "Persistent preferences, saved instructions, ranked memory context, behavior signals, and privacy mode are available.",
      },
      {
        key: "safety_admin_monitoring",
        area: "safety_admin",
        title: "AI-24 safety/admin monitoring",
        status: "ready",
        required: true,
        description: "Internal violation/risk reports, account/funds hold contracts, narcotics/psychotropics reports, emergency escalation, and admin panel monitoring queues are available.",
      },
      {
        key: "premium_coin_access",
        area: "premium_coin",
        title: "Premium and COIN access",
        status: "ready",
        required: true,
        description: "AI premium gates and COIN purchase preview routes are exposed for app billing integration.",
      },
      {
        key: "locale_binding",
        area: "locale",
        title: "Locale binding",
        status: "ready",
        required: true,
        description: "AI locale can be read and updated through kernel-backed routes.",
      },
      {
        key: "notification_runtime",
        area: "notifications",
        title: "AI notifications",
        status: "ready",
        required: false,
        description: "AI notification manifest, list, and publish contracts are available for app notification wiring.",
      },
      {
        key: "profile_entry_binding",
        area: "profile",
        title: "Profile entry binding",
        status: "limited",
        required: false,
        description: "Profile entry points are exposed, but real Profile module avatar/name binding must be connected outside this package.",
        action: "Bind ProfileStore/ProfileContext to AI profile contracts when the profile integration pass starts.",
      },
      {
        key: "voice_contracts",
        area: "voice",
        title: "Voice contracts",
        status: "ready",
        required: false,
        description: "Product-level voice routes and workspace contracts are present.",
      },
      {
        key: "voice_native_bridge",
        area: "voice",
        title: "Native voice bridge",
        status: this.getVoiceBridgeStatus(),
        required: false,
        description: "Native speech-to-text, text-to-speech, and wake/quick invoke bridge is outside this package.",
        action: "Connect the mobile native voice bridge after the API/kernel contract is accepted.",
      },
      {
        key: "admin_visibility",
        area: "admin",
        title: "Admin visibility",
        status: "ready",
        required: true,
        description: "AI-24 exposes admin safety monitoring contracts. The live admin panel should mount these queues in the mandatory pre-launch admin step.",
      },
    ]
  }

  private getUserChecks(userId: string): AiAppIntegrationCheckContract[] {
    const checks = [...this.getBaseChecks()]
    const session = this.aiFacade.getSession(userId)
    const locale = this.aiFacade.getLocaleBinding(userId)
    const premium = this.aiFacade.getPremiumAccess(userId)
    const providers = this.aiFacade.getProviderSettings(userId)

    checks.push({
      key: "auth_session_binding",
      area: "app_boot",
      title: "Per-user session binding",
      status: session.userId === userId ? "ready" : "limited",
      required: true,
      description: "AI kernel session is bound to the unified user ID supplied by the app/auth layer.",
      action: session.userId === userId ? undefined : "Call /api/ai/integration/:userId/session/bind during app boot.",
    })

    checks.push({
      key: "locale_user_binding",
      area: "locale",
      title: "Per-user locale binding",
      status: locale.locale ? "ready" : "limited",
      required: true,
      description: "AI locale is available for this user and can be synchronized from app runtime language.",
    })

    checks.push({
      key: "provider_user_binding",
      area: "providers",
      title: "Per-user provider binding",
      status: providers.searchProvider && providers.translationProvider ? "ready" : "limited",
      required: true,
      description: "Search and translation provider settings are available for this user.",
    })

    checks.push({
      key: "premium_user_binding",
      area: "premium_coin",
      title: "Per-user premium binding",
      status: premium.planKey ? "ready" : "limited",
      required: true,
      description: "Premium AI entitlement state is available for this user.",
    })

    return checks
  }

  private getVoiceBridgeStatus(): AiAppIntegrationStatusContract {
    const voiceFacade = this.aiFacade as unknown as AiVoiceManifestPort
    if (typeof voiceFacade.getVoiceManifest !== "function") return "not_connected"
    const manifest = voiceFacade.getVoiceManifest()
    if (!manifest.configured) return "not_connected"
    return asStatus(manifest.status, "limited")
  }

  private getCheckStatus(
    checks: AiAppIntegrationCheckContract[],
    key: string,
  ): AiAppIntegrationStatusContract {
    return checks.find((check) => check.key === key)?.status ?? "limited"
  }
}
