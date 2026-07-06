import type { AiFacadeService } from "../../../../core/kernel/ai/ai-facade.service"
import type {
  AiAssistantMode,
  AiConsentScope,
  AiProviderKey,
} from "../../../../core/kernel/ai/ai.types"
import type {
  AiLocaleSettingsProfileContract,
  AiMemorySettingsProfileContract,
  AiNotificationSettingsProfileContract,
  AiPermissionToggleContract,
  AiProfileBindingContract,
  AiProviderSettingsProfileContract,
  AiSettingsProfileDashboardContract,
  AiSettingsProfileEntryPointKey,
  AiSettingsProfileManifestContract,
  AiSettingsProfileSectionKey,
  AiUpdateLocaleSettingsInputContract,
  AiUpdatePermissionsInputContract,
  AiUpdateProviderSettingsInputContract,
  AiWorkspaceSettingsProfileSummaryContract,
} from "../../contracts/ai-settings-profile.contracts"

const BASE_ROUTE = "/api/ai/settings"

const PERMISSION_META: Record<AiConsentScope, { title: string; description: string; requiredFor: string[]; warning?: string }> = {
  read_access: {
    title: "Read access",
    description: "Allows Sabi AI to read the context that the user explicitly opens for AI help.",
    requiredFor: ["context-aware help", "file or screen analysis", "profile-linked AI dashboard"],
  },
  memory_write: {
    title: "Memory save",
    description: "Allows Sabi AI to save approved preferences and long-term instructions.",
    requiredFor: ["personalized answers", "remembered settings", "assistant continuity"],
    warning: "Memory can be disabled and reviewed from the AI profile settings area.",
  },
  tool_execution: {
    title: "Tool execution",
    description: "Allows Sabi AI to prepare actions that still require explicit user confirmation before execution.",
    requiredFor: ["confirmed tasks", "business assistant actions", "education plans", "workspace automations"],
    warning: "Write actions must stay confirmation-first and must not run silently.",
  },
  internet_search: {
    title: "Internet search",
    description: "Allows Sabi AI to use configured search providers such as Google, Yandex, or internal search.",
    requiredFor: ["web search", "fresh information", "provider-based lookup"],
  },
}

const SECTION_META: Record<AiSettingsProfileSectionKey, { title: string; description: string }> = {
  overview: {
    title: "Overview",
    description: "AI program summary and profile-linked dashboard.",
  },
  profile: {
    title: "Profile binding",
    description: "Profile entry points and AI program card contract.",
  },
  permissions: {
    title: "Permissions",
    description: "Consent controls for read access, memory, tools, and internet search.",
  },
  providers: {
    title: "Providers",
    description: "Search and translation provider settings.",
  },
  memory: {
    title: "Memory",
    description: "Memory summary, review, and delete controls.",
  },
  premium: {
    title: "Premium",
    description: "Premium AI access, COIN route, and active feature gates.",
  },
  locale: {
    title: "Language",
    description: "AI locale binding and supported language contract.",
  },
  notifications: {
    title: "Notifications",
    description: "AI notification manifest and latest AI notifications.",
  },
  voice: {
    title: "Voice",
    description: "Voice contract entry for STT, TTS, quick invoke, and future wake invoke.",
  },
  history_tasks: {
    title: "History and tasks",
    description: "AI history and task review entry point.",
  },
}

const ENTRY_META: Record<AiSettingsProfileEntryPointKey, { title: string; description: string; route: string }> = {
  ai_workspace: {
    title: "Sabi AI workspace",
    description: "Open the dedicated AI program workspace.",
    route: "/ai/workspace",
  },
  ai_permissions: {
    title: "AI permissions",
    description: "Manage consent and action permissions.",
    route: `${BASE_ROUTE}/:userId/permissions`,
  },
  ai_memory: {
    title: "AI memory",
    description: "Review or remove saved AI memory entries.",
    route: `${BASE_ROUTE}/:userId/memory`,
  },
  ai_providers: {
    title: "AI providers",
    description: "Choose Google, Yandex, or internal providers where available.",
    route: `${BASE_ROUTE}/:userId/providers`,
  },
  ai_premium: {
    title: "AI premium",
    description: "Manage premium AI features and COIN access.",
    route: `${BASE_ROUTE}/:userId/premium`,
  },
  ai_voice: {
    title: "AI voice",
    description: "Open the voice contract entry point.",
    route: "/api/ai/voice/:userId/status",
  },
  ai_realtime_translation: {
    title: "AI realtime translation",
    description: "Open realtime text, media, and call translation contracts.",
    route: "/api/ai/translation/realtime/:userId/summary",
  },
  ai_app_actions: {
    title: "AI app actions",
    description: "Review AI-prepared app actions and pending confirmations.",
    route: "/api/ai/actions/:userId/summary",
  },
  ai_personalization: {
    title: "AI personalization",
    description: "Open AI-23 preferences, saved instructions, ranked memory, and privacy mode.",
    route: "/api/ai/personalization/:userId/snapshot",
  },
  ai_history_tasks: {
    title: "AI history and tasks",
    description: "Review AI history and user-confirmed tasks.",
    route: "/api/ai/activity/:userId/overview",
  },
}

function hasBoolean(value: unknown): value is boolean {
  return typeof value === "boolean"
}

function mapPermissionsToConsentPatch(permissions: Partial<Record<AiConsentScope, boolean>>) {
  return {
    readAccessAllowed: hasBoolean(permissions.read_access) ? permissions.read_access : undefined,
    memoryWriteAllowed: hasBoolean(permissions.memory_write) ? permissions.memory_write : undefined,
    toolExecutionAllowed: hasBoolean(permissions.tool_execution) ? permissions.tool_execution : undefined,
    internetSearchAllowed: hasBoolean(permissions.internet_search) ? permissions.internet_search : undefined,
  }
}

function compactUndefined<T extends Record<string, unknown>>(value: T): T {
  Object.keys(value).forEach((key) => {
    if (value[key] === undefined) delete value[key]
  })
  return value
}

export class AiSettingsProfileService {
  constructor(private readonly aiFacade: AiFacadeService) {}

  getManifest(): AiSettingsProfileManifestContract {
    return {
      programId: "sabi_ai",
      area: "settings_profile",
      title: "Sabi AI settings and profile contracts",
      description: "Profile-facing AI settings, consent, memory, provider, premium, locale, and notification contracts.",
      baseRoute: BASE_ROUTE,
      routes: {
        dashboard: `${BASE_ROUTE}/:userId`,
        permissions: `${BASE_ROUTE}/:userId/permissions`,
        profileContracts: `${BASE_ROUTE}/:userId/profile-contracts`,
        providers: `${BASE_ROUTE}/:userId/providers`,
        locale: `${BASE_ROUTE}/:userId/locale`,
        memory: `${BASE_ROUTE}/:userId/memory`,
        notifications: `${BASE_ROUTE}/:userId/notifications`,
        premium: `${BASE_ROUTE}/:userId/premium`,
      },
      sections: [
        { key: "overview", ...SECTION_META.overview, requiredSource: "ai_kernel" },
        { key: "profile", ...SECTION_META.profile, requiredSource: "profile_module" },
        { key: "permissions", ...SECTION_META.permissions, requiredSource: "ai_kernel" },
        { key: "providers", ...SECTION_META.providers, requiredSource: "ai_kernel" },
        { key: "memory", ...SECTION_META.memory, requiredSource: "ai_kernel" },
        { key: "premium", ...SECTION_META.premium, requiredSource: "premium_gate" },
        { key: "locale", ...SECTION_META.locale, requiredSource: "ai_kernel" },
        { key: "notifications", ...SECTION_META.notifications, requiredSource: "notification_service" },
        { key: "voice", ...SECTION_META.voice, requiredSource: "ai_kernel" },
        { key: "history_tasks", ...SECTION_META.history_tasks, requiredSource: "ai_kernel" },
      ],
      entryPoints: Object.entries(ENTRY_META).map(([key, item]) => ({
        key: key as AiSettingsProfileEntryPointKey,
        title: item.title,
        description: item.description,
        targetRoute: item.route,
        visibleInProfile: true,
      })),
    }
  }

  getDashboard(userId: string): AiSettingsProfileDashboardContract {
    const manifest = this.getManifest()
    const permissions = this.getPermissions(userId)
    const providers = this.getProviderSettings(userId)
    const locale = this.getLocale(userId)
    const memory = this.getMemorySettings(userId)
    const premium = this.getPremiumSettings(userId)
    const notifications = this.getNotificationSettings(userId)
    const profile = this.getProfileContracts(userId)

    return {
      userId,
      updatedAt: new Date().toISOString(),
      manifest,
      profile,
      permissions,
      providers,
      locale,
      memory,
      premium,
      notifications,
      sections: manifest.sections.map((section) => ({
        key: section.key,
        title: section.title,
        visible: true,
        locked: section.key === "premium" ? !premium.enabled : false,
        route: this.getSectionRoute(userId, section.key),
        status: section.requiredSource === "profile_module" ? "limited" : "ready",
      })),
    }
  }

  getWorkspaceSummary(userId: string): AiWorkspaceSettingsProfileSummaryContract {
    const permissions = this.getPermissions(userId)
    const profile = this.getProfileContracts(userId)
    const memory = this.getMemorySettings(userId)

    return {
      userId,
      profileSource: profile.profileSource,
      permissionsEnabled: permissions.filter((permission) => permission.enabled).length,
      permissionsTotal: permissions.length,
      memoryWriteAllowed: memory.memoryWriteAllowed,
      providerSettingsRoute: `${BASE_ROUTE}/${encodeURIComponent(userId)}/providers`,
      permissionsRoute: `${BASE_ROUTE}/${encodeURIComponent(userId)}/permissions`,
      profileContractsRoute: `${BASE_ROUTE}/${encodeURIComponent(userId)}/profile-contracts`,
      settingsRoute: `${BASE_ROUTE}/${encodeURIComponent(userId)}`,
      entryPoints: profile.entryPoints,
    }
  }

  getPermissions(userId: string): AiPermissionToggleContract[] {
    const consent = this.aiFacade.getConsent(userId)
    return [
      this.toPermission("read_access", consent.readAccessAllowed),
      this.toPermission("memory_write", consent.memoryWriteAllowed),
      this.toPermission("tool_execution", consent.toolExecutionAllowed),
      this.toPermission("internet_search", consent.internetSearchAllowed),
    ]
  }

  updatePermissions(input: AiUpdatePermissionsInputContract) {
    const consent = compactUndefined(mapPermissionsToConsentPatch(input.permissions))
    return this.aiFacade.updateConsent({
      userId: input.userId,
      actorType: input.actorType ?? "user",
      actorId: input.actorId,
      reason: input.reason ?? "ai_settings_profile_permissions_update",
      consent: consent as never,
    })
  }

  getProfileContracts(userId: string): AiProfileBindingContract {
    const premium = this.aiFacade.getPremiumAccess(userId)
    const entryPoints = (Object.keys(ENTRY_META) as AiSettingsProfileEntryPointKey[]).map((key) => {
      const meta = ENTRY_META[key]
      const locked = key === "ai_premium" ? false : key === "ai_workspace" ? false : false
      return {
        key,
        title: meta.title,
        description: meta.description,
        route: meta.route.replace(":userId", encodeURIComponent(userId)),
        visible: true,
        locked,
        reason: locked ? "Requires active AI access." : undefined,
      }
    })

    return {
      userId,
      status: "limited",
      profileSource: "kernel_session",
      displayName: null,
      avatarUrl: null,
      aiProgramCard: {
        title: "Sabi AI",
        description: "Dedicated AI program entry with permissions, memory, providers, premium, voice, history, and tasks.",
        route: "/ai/workspace",
        badge: premium.premiumEnabled ? "enabled" : "limited",
      },
      entryPoints,
      safety: {
        requiresExplicitConsentForWriteActions: true,
        memoryCanBeDisabled: true,
        toolExecutionRequiresConfirmation: true,
        profileDataIsNotPublicByDefault: true,
      },
    }
  }

  getProviderSettings(userId: string): AiProviderSettingsProfileContract {
    const settings = this.aiFacade.getProviderSettings(userId)
    return {
      searchProvider: settings.searchProvider,
      translationProvider: settings.translationProvider,
      modeProviders: settings.modeProviders,
      routes: {
        read: `${BASE_ROUTE}/${encodeURIComponent(userId)}/providers`,
        update: `${BASE_ROUTE}/${encodeURIComponent(userId)}/providers`,
        reset: `${BASE_ROUTE}/${encodeURIComponent(userId)}/providers`,
      },
    }
  }

  updateProviderSettings(input: AiUpdateProviderSettingsInputContract) {
    return this.aiFacade.updateProviderSettings(input)
  }

  resetProviderSettings(userId: string) {
    return this.aiFacade.resetProviderSettings(userId)
  }

  getLocale(userId: string): AiLocaleSettingsProfileContract {
    const locale = this.aiFacade.getLocaleBinding(userId)
    return {
      locale: locale.locale,
      supportedLocales: locale.supportedLocales,
      source: "kernel",
      route: `${BASE_ROUTE}/${encodeURIComponent(userId)}/locale`,
    }
  }

  updateLocale(input: AiUpdateLocaleSettingsInputContract) {
    const source = input.source === "system" || input.source === "profile" || input.source === "kernel"
      ? "user"
      : input.source ?? "user"

    return this.aiFacade.updateLocaleBinding({
      userId: input.userId,
      locale: input.locale,
      source,
    })
  }

  getMemorySettings(userId: string): AiMemorySettingsProfileContract {
    const summary = this.aiFacade.getMemorySummary(userId)
    const entries = this.aiFacade.listMemory(userId).slice(0, 8)
    return {
      totalEntries: summary.totalEntries,
      memoryWriteAllowed: summary.memoryWriteAllowed,
      reviewRoute: `${BASE_ROUTE}/${encodeURIComponent(userId)}/memory`,
      deleteRoutePattern: `${BASE_ROUTE}/${encodeURIComponent(userId)}/memory/:entryId`,
      preview: entries.map((entry: any) => ({
        id: entry.id,
        kind: entry.kind,
        label: entry.label,
        title: entry.title ?? entry.label,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
      })),
    }
  }

  listMemory(userId: string) {
    return this.aiFacade.listMemory(userId)
  }

  removeMemory(userId: string, entryId: string) {
    return this.aiFacade.removeMemory(userId, entryId)
  }

  getPremiumSettings(userId: string) {
    const premium = this.aiFacade.getPremiumAccess(userId)
    return {
      enabled: premium.premiumEnabled,
      planKey: premium.planKey,
      activeFeatures: premium.activeFeatures,
      coinBalance: premium.coinBalance,
      catalogRoute: "/api/ai/premium/catalog",
      purchasePreviewRoute: "/api/ai/premium/preview",
    }
  }

  getNotificationSettings(userId: string): AiNotificationSettingsProfileContract {
    const notifications = this.aiFacade.listAiNotifications(userId)
    return {
      manifestRoute: "/api/ai/notifications/manifest",
      listRoute: `${BASE_ROUTE}/${encodeURIComponent(userId)}/notifications`,
      unreadCount: notifications.filter((item) => !item.readAt).length,
      latestPreview: notifications.slice(0, 5).map((item) => ({
        id: item.id,
        kind: item.kind,
        titleKey: item.titleKey,
        messageKey: item.messageKey,
        createdAt: item.createdAt,
        readAt: item.readAt,
      })),
    }
  }

  listNotifications(userId: string) {
    return this.aiFacade.listAiNotifications(userId)
  }

  private getSectionRoute(userId: string, key: AiSettingsProfileSectionKey): string {
    const encodedUserId = encodeURIComponent(userId)
    if (key === "overview") return `${BASE_ROUTE}/${encodedUserId}`
    if (key === "profile") return `${BASE_ROUTE}/${encodedUserId}/profile-contracts`
    if (key === "permissions") return `${BASE_ROUTE}/${encodedUserId}/permissions`
    if (key === "providers") return `${BASE_ROUTE}/${encodedUserId}/providers`
    if (key === "memory") return `${BASE_ROUTE}/${encodedUserId}/memory`
    if (key === "premium") return `${BASE_ROUTE}/${encodedUserId}/premium`
    if (key === "locale") return `${BASE_ROUTE}/${encodedUserId}/locale`
    if (key === "notifications") return `${BASE_ROUTE}/${encodedUserId}/notifications`
    if (key === "voice") return `/api/ai/voice/${encodedUserId}/status`
    return `/api/ai/activity/${encodedUserId}/overview`
  }

  private toPermission(scope: AiConsentScope, enabled: boolean): AiPermissionToggleContract {
    const meta = PERMISSION_META[scope]
    return {
      scope,
      title: meta.title,
      description: meta.description,
      enabled,
      locked: false,
      source: "ai_consent",
      requiredFor: meta.requiredFor,
      warning: meta.warning,
    }
  }
}
