import { AssistantStateService } from "../../../../core/kernel/ai/assistant-state.service"
import { AiFacadeService } from "../../../../core/kernel/ai/ai-facade.service"
import type {
  AiAssistantMode,
  AiPremiumFeature,
  AiProviderKey,
  AiSearchProviderManifestItem,
  AiTranslationProviderManifestItem,
} from "../../../../core/kernel/ai/ai.types"
import type {
  AiWorkspaceCatalogContract,
  AiWorkspaceConsentContract,
  AiWorkspaceFeatureGateContract,
  AiWorkspaceMobileUiManifestContract,
  AiWorkspaceModeContract,
  AiWorkspaceProviderContract,
  AiWorkspaceQuickActionContract,
  AiWorkspaceScreenContract,
  AiWorkspaceSectionContract,
} from "../../contracts/ai-workspace.contracts"
import type {
  AiVoiceManifestContract,
  AiVoiceStatusContract,
  AiWorkspaceVoiceContract,
} from "../../contracts/ai-voice.contracts"
import type { AiWorkspaceSettingsProfileSummaryContract } from "../../contracts/ai-settings-profile.contracts"
import type { AiWorkspaceIntegrationSummaryContract } from "../../contracts/ai-app-integration.contracts"
import type { AiAppActionWorkspaceSummaryContract } from "../../contracts/ai-app-actions.contracts"
import type { AiRealtimeTranslationWorkspaceSummaryContract } from "../../contracts/ai-realtime-translation.contracts"
import type { AiWorkspacePersonalizationSummaryContract } from "../../contracts/ai-personalization.contracts"
import type { AiSafetyAdminWorkspaceSummaryContract } from "../../contracts/ai-safety-admin.contracts"

const MODE_TITLES: Record<AiAssistantMode, { title: string; description: string }> = {
  general: {
    title: "General assistant",
    description: "Everyday help, answers, smart tasks, and file guidance.",
  },
  business: {
    title: "Business assistant",
    description: "Accounting-style analysis, income and expense summaries, and business insights.",
  },
  education: {
    title: "Education assistant",
    description: "Study plans, quiz generation, explanations, and learning support.",
  },
  student: {
    title: "Student assistant",
    description: "University and college study help, summaries, practice, and research support.",
  },
  abiturient: {
    title: "Abiturient assistant",
    description: "Exam preparation, admission planning, and step-by-step topic explanation.",
  },
  teacher: {
    title: "Teacher assistant",
    description: "Lesson plans, quiz drafts, explanations, and classroom preparation.",
  },
  translation: {
    title: "Translation assistant",
    description: "Text, audio, video, and call translation flows.",
  },
  search: {
    title: "Search assistant",
    description: "Google, Yandex, and internal search for web, images, video, music, and files.",
  },
}

const FEATURE_META: Record<AiPremiumFeature, { title: string; description: string }> = {
  ai_workspace: {
    title: "AI workspace",
    description: "Unlocks the full dedicated AI workspace experience.",
  },
  ai_search_external: {
    title: "External search",
    description: "Allows Google and Yandex search providers.",
  },
  ai_translation_media: {
    title: "Media translation",
    description: "Audio and video translation support.",
  },
  ai_translation_realtime: {
    title: "Realtime call translation",
    description: "Live call translation capability.",
  },
  ai_business_assistant: {
    title: "Business assistant",
    description: "Accounting-style and business support flows.",
  },
  ai_education_assistant: {
    title: "Education assistant",
    description: "Study plans, quiz generation, and education support.",
  },
  ai_memory_extended: {
    title: "Extended memory",
    description: "More AI memory capacity and richer memory usage.",
  },
}

const DISCONNECTED_VOICE_MANIFEST: AiVoiceManifestContract = {
  area: "voice",
  configured: false,
  status: "not_connected",
  version: "AI-19",
  bridgeMode: "native_client_bridge",
  supportedInputKinds: ["speech_to_text", "text_to_speech", "quick_invoke", "wake_invoke"],
  supportedLocales: [],
  providers: [],
  capabilities: [
    {
      key: "voice_input",
      title: "Voice input",
      description: "Voice input contract for Sabi AI workspace.",
      enabled: false,
      requiresPremium: false,
      requiresNativeBridge: true,
      status: "not_connected",
    },
    {
      key: "speech_to_text",
      title: "Speech to text",
      description: "Native STT must return final transcript to Sabi AI.",
      enabled: false,
      requiresPremium: false,
      requiresNativeBridge: true,
      status: "not_connected",
    },
    {
      key: "text_to_speech",
      title: "Text to speech",
      description: "Native TTS must play Sabi AI voice response commands.",
      enabled: false,
      requiresPremium: false,
      requiresNativeBridge: true,
      status: "not_connected",
    },
    {
      key: "push_to_talk",
      title: "Push to talk",
      description: "Press/hold voice session lifecycle contract.",
      enabled: false,
      requiresPremium: false,
      requiresNativeBridge: true,
      status: "not_connected",
    },
    {
      key: "quick_invoke",
      title: "Quick invoke",
      description: "Starts Sabi AI from a fast voice action.",
      enabled: false,
      requiresPremium: false,
      requiresNativeBridge: true,
      status: "not_connected",
    },
    {
      key: "wake_invoke",
      title: "Wake invoke",
      description: "Architecture contract for future wake-style launch.",
      enabled: false,
      requiresPremium: true,
      requiresNativeBridge: true,
      status: "not_connected",
    },
    {
      key: "voice_response_playback",
      title: "Voice response playback",
      description: "Native playback of AI response text.",
      enabled: false,
      requiresPremium: false,
      requiresNativeBridge: true,
      status: "not_connected",
    },
    {
      key: "interruption_cancel",
      title: "Interruption and cancel",
      description: "User can interrupt listening, processing, or playback.",
      enabled: false,
      requiresPremium: false,
      requiresNativeBridge: true,
      status: "not_connected",
    },
    {
      key: "language_auto_detection",
      title: "Language auto detection",
      description: "Native client may return detected language with transcript events.",
      enabled: false,
      requiresPremium: false,
      requiresNativeBridge: true,
      status: "not_connected",
    },
    {
      key: "call_translation_bridge",
      title: "Call translation bridge",
      description: "Voice bridge for premium realtime call translation.",
      enabled: false,
      requiresPremium: true,
      requiresNativeBridge: true,
      status: "not_connected",
    },
  ],
  nativeBridge: {
    required: true,
    serverSttProvider: false,
    serverTtsProvider: false,
    clientMustReturnTranscript: true,
    clientMustPerformPlayback: true,
    wakeInvokeMode: "contract_only",
  },
}
type AiVoiceFacadePort = {
  getVoiceManifest?: () => AiVoiceManifestContract
  getVoiceStatus?: (userId: string) => AiVoiceStatusContract
}

export class AiWorkspaceService {
  private readonly stateService = new AssistantStateService()

  constructor(private readonly aiFacade: AiFacadeService) {}

  getCatalog(): AiWorkspaceCatalogContract {
    const searchProviders = this.toWorkspaceProviders(this.aiFacade.getSearchProviderManifest(), "search")
    const translationProviders = this.toWorkspaceProviders(
      this.aiFacade.getTranslationProviderManifest(),
      "translation",
    )

    return {
      programId: "sabi_ai",
      title: "Sabi AI",
      description: "Dedicated AI workspace contracts for assistant, app actions, realtime translation, search, translation, voice, business, education, profile, and settings.",
      modes: this.buildModes([], []),
      searchProviders,
      translationProviders,
      assistantManifest: this.aiFacade.getAssistantManifest(),
      voiceManifest: this.getVoiceManifest(),
      appActionManifest: this.aiFacade.getAppActionManifest(),
      mobileUiManifest: this.getMobileUiManifest(),
      personalizationManifest: this.aiFacade.getPersonalizationManifest(),
      safetyAdminManifest: this.aiFacade.getSafetyAdminManifest() as any,
      sections: this.buildSections([]),
    }
  }

  getWorkspace(userId: string, mode?: AiAssistantMode, provider?: AiProviderKey): AiWorkspaceScreenContract {
    const session = this.aiFacade.getSession(userId)
    const configuredSession = mode || provider
      ? this.aiFacade.configureSession({ userId, mode, provider })
      : session

    const state = this.stateService.buildState({
      session: configuredSession,
      lastRequestAt: new Date().toISOString(),
    })

    const premiumAccess = this.aiFacade.getPremiumAccess(userId)
    const localeBinding = this.aiFacade.getLocaleBinding(userId)
    const aiNotifications = this.aiFacade.listAiNotifications(userId)
    const activeFeatures = premiumAccess.activeFeatures
    const consent = this.aiFacade.getConsent(userId)
    const memory = this.aiFacade.getMemorySummary(userId)
    const providerSettings = this.aiFacade.getProviderSettings(userId)
    const searchProviders = this.aiFacade.getSearchProviderManifest()
    const translationProviders = this.aiFacade.getTranslationProviderManifest()
    const history = this.aiFacade.listHistory(userId, 5)
    const tasks = this.aiFacade.listTasks(userId, undefined, 5)
    const voice = this.getVoiceWorkspace(userId)
    const settingsProfile = this.buildSettingsProfileSummary(userId, consent, memory)
    const appActions = this.buildAppActionSummary(userId)
    const realtimeTranslation = this.buildRealtimeTranslationSummary(userId)
    const personalization = this.buildPersonalizationSummary(userId)
    const safetyAdmin = this.buildSafetyAdminSummary(userId)

    return {
      catalog: {
        ...this.getCatalog(),
        modes: this.buildModes(activeFeatures, state.availableCapabilities),
        sections: this.buildSections(activeFeatures),
        voiceManifest: voice.manifest,
        appActionManifest: appActions.manifest,
        mobileUiManifest: this.getMobileUiManifest(),
        safetyAdminManifest: this.aiFacade.getSafetyAdminManifest() as any,
      },
      session: configuredSession,
      state,
      permissions: this.buildPermissions(consent),
      quickActions: this.buildQuickActions(activeFeatures, consent.toolExecutionAllowed, voice),
      featureGates: this.buildFeatureGates(userId),
      searchProviders,
      translationProviders,
      assistant: {
        manifest: this.aiFacade.getAssistantManifest(),
        status: "ready",
      },
      appActions,
      realtimeTranslation,
      personalization,
      safetyAdmin,
      mobileUi: this.buildMobileUiSummary(userId),
      voice,
      settingsProfile,
      integration: this.buildIntegrationSummary(userId, voice),
      providerSettings: {
        searchProvider: providerSettings.searchProvider,
        translationProvider: providerSettings.translationProvider,
        modeProviders: providerSettings.modeProviders,
      },
      premium: {
        enabled: premiumAccess.premiumEnabled,
        planKey: premiumAccess.planKey,
        activeFeatures,
        coinBalance: premiumAccess.coinBalance,
      },
      memory: {
        totalEntries: memory.totalEntries,
        memoryWriteAllowed: memory.memoryWriteAllowed,
      },
      locale: {
        value: localeBinding.locale,
        supportedLocales: localeBinding.supportedLocales,
      },
      activity: {
        historyPreviewCount: history.length,
        taskPreviewCount: tasks.length,
        awaitingConfirmationTasks: tasks.filter((item) => item.status === "awaiting_confirmation").length,
        draftTasks: tasks.filter((item) => item.status === "draft").length,
        completedTasks: tasks.filter((item) => item.status === "completed").length,
        cancelledTasks: tasks.filter((item) => item.status === "cancelled").length,
        lastHistoryAt: history[0]?.createdAt,
      },
      notificationPreview: aiNotifications.slice(0, 5).map((item) => ({
        id: item.id,
        kind: item.kind,
        titleKey: item.titleKey,
        messageKey: item.messageKey,
        createdAt: item.createdAt,
        readAt: item.readAt,
      })),
      historyPreview: history.map((item) => ({
        id: item.id,
        title: item.title,
        kind: item.kind,
        createdAt: item.createdAt,
      })),
      taskPreview: tasks.map((item) => ({
        id: item.id,
        title: item.title,
        status: item.status,
      })),
    }
  }

  getProviderSettings(userId: string) {
    return this.aiFacade.getProviderSettings(userId)
  }

  updateProviderSettings(input: Parameters<AiFacadeService["updateProviderSettings"]>[0]) {
    return this.aiFacade.updateProviderSettings(input)
  }

  getVoiceWorkspace(userId: string): AiWorkspaceVoiceContract {
    return {
      manifest: this.getVoiceManifest(),
      status: this.getVoiceStatus(userId),
    }
  }

  private getVoiceManifest(): AiVoiceManifestContract {
    const voiceFacade = this.aiFacade as unknown as AiVoiceFacadePort
    if (typeof voiceFacade.getVoiceManifest === "function") {
      return voiceFacade.getVoiceManifest()
    }
    return DISCONNECTED_VOICE_MANIFEST
  }

  private getVoiceStatus(userId: string): AiVoiceStatusContract {
    const voiceFacade = this.aiFacade as unknown as AiVoiceFacadePort
    if (typeof voiceFacade.getVoiceStatus === "function") {
      return voiceFacade.getVoiceStatus(userId)
    }

    return {
      userId,
      enabled: false,
      status: "not_connected",
      recentSessions: [],
    }
  }

  private buildModes(activeFeatures: string[], availableCapabilities: string[]): AiWorkspaceModeContract[] {
    const featureSet = new Set(activeFeatures)
    const capabilitySet = new Set(availableCapabilities)

    return (["general", "search", "translation", "business", "education", "student", "abiturient", "teacher"] as AiAssistantMode[]).map((key) => {
      const meta = MODE_TITLES[key]
      const requiredFeature =
        key === "business"
          ? "ai_business_assistant"
          : ["education", "student", "abiturient", "teacher"].includes(key)
            ? "ai_education_assistant"
            : key === "translation"
              ? "ai_translation_media"
              : key === "search"
                ? "ai_search_external"
                : undefined

      const locked = requiredFeature ? !featureSet.has(requiredFeature as AiPremiumFeature) : false

      return {
        key,
        title: meta.title,
        description: meta.description,
        primaryCapabilities: [...capabilitySet].filter((capability) => {
          if (key === "business") return capability === "analyze_business"
          if (["education", "student", "abiturient", "teacher"].includes(key)) {
            return ["plan_study", "generate_quiz", "explain_concepts", "analyze_learning"].includes(capability)
          }
          if (key === "translation") return capability.startsWith("translate_")
          if (key === "search") return capability.startsWith("search_")
          if (key === "general") return ["answer_basic", "summarize_text", "analyze_text", "draft_text"].includes(capability)
          return false
        }) as never[],
        locked,
        requiredFeature,
      }
    })
  }

  private buildSections(activeFeatures: string[]): AiWorkspaceSectionContract[] {
    const featureSet = new Set(activeFeatures)
    return [
      {
        key: "mobile_ui",
        title: "Mobile AI UI",
        description: "AI-23 mobile UI contract for AI Home, assistant chat, voice, realtime translation, history, tasks, settings, premium, and safe action confirmations.",
        visible: true,
        locked: false,
      },
      {
        key: "assistant",
        title: "Assistant brain",
        description: "AI-20 orchestrator for intent, context, app actions, client-dispatch routing, safety, and confirmation policy.",
        visible: true,
        locked: false,
      },
      {
        key: "safety_admin",
        title: "Safety/Admin monitoring",
        description: "AI-24 internal policy violation reporting, account/funds hold contracts, emergency escalation, and admin panel monitoring queues.",
        visible: true,
        locked: false,
      },
      {
        key: "actions",
        title: "App actions",
        description: "AI-20 client-dispatch actions for Messenger, Wallet, Coin Wallet, QR, Profile, Premium, settings, translation, and tasks.",
        visible: true,
        locked: false,
      },
      {
        key: "chat",
        title: "Chat",
        description: "Main AI conversation flow and task entry point.",
        visible: true,
        locked: false,
      },
      {
        key: "profile",
        title: "Profile",
        description: "Profile-linked Sabi AI entry points and product settings contracts.",
        visible: true,
        locked: false,
      },
      {
        key: "settings",
        title: "Settings",
        description: "Permissions, providers, memory, locale, notifications, and premium controls.",
        visible: true,
        locked: false,
      },
      {
        key: "voice",
        title: "Voice",
        description: "Voice input, speech-to-text, text-to-speech, and quick invoke contracts.",
        visible: true,
        locked: false,
      },
      {
        key: "integration",
        title: "App integration",
        description: "Final app boot, router, profile, activity, settings, premium, locale, and notification integration contract.",
        visible: true,
        locked: false,
      },
      {
        key: "search",
        title: "Search",
        description: "Google, Yandex, and internal search results.",
        visible: true,
        locked: false,
      },
      {
        key: "translation",
        title: "Translation",
        description: "Text, media, voice, call, and AI-21 realtime translation workspace.",
        visible: true,
        locked: false,
      },
      {
        key: "business",
        title: "Business",
        description: "Accounting-style business assistant area.",
        visible: true,
        locked: !featureSet.has("ai_business_assistant"),
      },
      {
        key: "education",
        title: "Education",
        description: "Learning, study plans, and quiz tools.",
        visible: true,
        locked: !featureSet.has("ai_education_assistant"),
      },
      {
        key: "memory",
        title: "Memory",
        description: "Memory review and consent-based memory controls.",
        visible: true,
        locked: false,
      },
      {
        key: "personalization",
        title: "Personalization",
        description: "AI-23 memory ranking, saved instructions, preferences, privacy mode, and adaptive context runtime.",
        visible: true,
        locked: false,
      },
      {
        key: "premium",
        title: "Premium",
        description: "Plan, COIN access, and feature unlock area.",
        visible: true,
        locked: false,
      },
      {
        key: "providers",
        title: "Providers",
        description: "Search and translation provider selection.",
        visible: true,
        locked: false,
      },
    ]
  }

  private buildPermissions(consent: ReturnType<AiFacadeService["getConsent"]>): AiWorkspaceConsentContract[] {
    return [
      {
        scope: "read_access",
        title: "Read access",
        enabled: consent.readAccessAllowed,
        requiredFor: ["context-aware help", "analysis"],
      },
      {
        scope: "memory_write",
        title: "Memory save",
        enabled: consent.memoryWriteAllowed,
        requiredFor: ["saving preferences", "remembering instructions"],
      },
      {
        scope: "tool_execution",
        title: "Tool execution",
        enabled: consent.toolExecutionAllowed,
        requiredFor: ["confirmed actions", "task execution"],
      },
      {
        scope: "internet_search",
        title: "Internet search",
        enabled: consent.internetSearchAllowed,
        requiredFor: ["Google", "Yandex", "web results"],
      },
    ]
  }

  private buildQuickActions(
    activeFeatures: string[],
    toolExecutionAllowed: boolean,
    voice: AiWorkspaceVoiceContract,
  ): AiWorkspaceQuickActionContract[] {
    const featureSet = new Set(activeFeatures)
    const voiceEnabled = voice.manifest.configured && voice.status.enabled
    return [
      {
        key: "mobile_ai_ui",
        title: "Mobile AI UI",
        description: "Open the AI-23 mobile program shell and screen contracts.",
        mode: "general",
        requiresConfirmation: false,
        locked: false,
        targetSection: "mobile_ui",
      },
      {
        key: "assistant_brain",
        title: "AI assistant brain",
        description: "Run AI-20 intent, context, app-action routing, client dispatch, and safety orchestration.",
        mode: "general",
        requiresConfirmation: false,
        locked: false,
        targetSection: "assistant",
      },
      {
        key: "ai_safety_admin",
        title: "AI safety/admin monitor",
        description: "Open AI-24 internal reports, safety queues, account/funds hold status, and emergency escalation monitoring.",
        mode: "general",
        requiresConfirmation: false,
        locked: false,
        targetSection: "integration",
      },
      {
        key: "app_actions",
        title: "App actions",
        description: "Open AI-20 action registry and pending confirmations.",
        mode: "general",
        requiresConfirmation: false,
        locked: false,
        targetSection: "actions",
      },
      {
        key: "ask_general",
        title: "Ask AI",
        description: "Open the main chat flow for answers and smart help.",
        mode: "general",
        requiresConfirmation: false,
        locked: false,
        targetSection: "chat",
      },
      {
        key: "open_ai_settings",
        title: "AI settings",
        description: "Open Sabi AI permissions, providers, memory, locale, notifications, and premium controls.",
        mode: "general",
        requiresConfirmation: false,
        locked: false,
        targetSection: "settings",
      },
      {
        key: "profile_ai_permissions",
        title: "Profile AI permissions",
        description: "Open profile-linked AI permissions and safety contracts.",
        mode: "general",
        requiresConfirmation: false,
        locked: false,
        targetSection: "profile",
      },
      {
        key: "open_ai_integration",
        title: "AI integration",
        description: "Open the app boot and integration contract for Sabi AI.",
        mode: "general",
        requiresConfirmation: false,
        locked: false,
        targetSection: "integration",
      },
      {
        key: "voice_quick_invoke",
        title: "Voice AI",
        description: "Start Sabi AI through the voice quick-invoke contract.",
        mode: "general",
        requiresConfirmation: false,
        locked: !voiceEnabled,
        targetSection: "voice",
      },
      {
        key: "voice_transcribe",
        title: "Transcribe voice",
        description: "Convert audio input into text for Sabi AI.",
        mode: "general",
        requiresConfirmation: false,
        locked: !voiceEnabled,
        targetSection: "voice",
      },
      {
        key: "voice_speak_response",
        title: "Speak response",
        description: "Use the text-to-speech contract for AI voice output.",
        mode: "general",
        requiresConfirmation: false,
        locked: !voiceEnabled,
        targetSection: "voice",
      },
      {
        key: "voice_call_translation",
        title: "Call translation voice bridge",
        description: "Connect voice contracts to premium realtime call translation.",
        mode: "translation",
        requiresConfirmation: false,
        locked: !featureSet.has("ai_translation_realtime") || !voiceEnabled,
        targetSection: "voice",
      },
      {
        key: "search_web",
        title: "Search web",
        description: "Search with internal, Google, or Yandex providers.",
        mode: "search",
        requiresConfirmation: false,
        locked: false,
        targetSection: "search",
      },
      {
        key: "translate_text",
        title: "Translate",
        description: "Translate text or media from the workspace.",
        mode: "translation",
        requiresConfirmation: false,
        locked: false,
        targetSection: "translation",
      },
      {
        key: "translate_realtime_text",
        title: "Realtime text translation",
        description: "Translate chat text live and dispatch translated overlays to Messenger.",
        mode: "translation",
        requiresConfirmation: false,
        locked: false,
        targetSection: "translation",
      },
      {
        key: "translate_realtime_call",
        title: "Realtime call translation",
        description: "Translate voice or video call transcript segments into live subtitles.",
        mode: "translation",
        requiresConfirmation: false,
        locked: !featureSet.has("ai_translation_realtime") || !voiceEnabled,
        targetSection: "translation",
      },
      {
        key: "analyze_business",
        title: "Business summary",
        description: "Run accounting-style business analysis.",
        mode: "business",
        requiresConfirmation: toolExecutionAllowed,
        locked: !featureSet.has("ai_business_assistant"),
        targetSection: "business",
      },
      {
        key: "build_study_plan",
        title: "Study plan",
        description: "Create a study plan or quiz flow.",
        mode: "education",
        requiresConfirmation: toolExecutionAllowed,
        locked: !featureSet.has("ai_education_assistant"),
        targetSection: "education",
      },
    ]
  }

  private buildFeatureGates(userId: string): AiWorkspaceFeatureGateContract[] {
    const access = this.aiFacade.getPremiumAccess(userId)
    const active = new Set(access.activeFeatures)

    return (Object.entries(FEATURE_META) as Array<[AiPremiumFeature, (typeof FEATURE_META)[AiPremiumFeature]]>).map(
      ([featureKey, meta]) => ({
        featureKey,
        title: meta.title,
        description: meta.description,
        locked: !active.has(featureKey),
        reason: active.has(featureKey) ? undefined : "Requires premium access or COIN activation.",
      }),
    )
  }

  private buildIntegrationSummary(userId: string, voice: AiWorkspaceVoiceContract): AiWorkspaceIntegrationSummaryContract {
    const nativeVoiceStatus = voice.manifest.configured && voice.status.enabled ? "ready" : "not_connected"

    return {
      programId: "sabi_ai",
      moduleName: "ai",
      status: nativeVoiceStatus === "ready" ? "ready" : "limited",
      publicBasePath: "/api/ai",
      workspaceRoute: "/api/ai/workspace/:userId",
      integrationRoute: "/api/ai/integration/:userId/boot",
      settingsRoute: "/api/ai/settings/:userId",
      activityRoute: "/api/ai/activity/:userId/overview",
      voiceRoute: "/api/ai/voice/:userId/status",
      personalizationRoute: "/api/ai/personalization/:userId/snapshot",
      safetyRoute: "/api/ai/safety/:userId/summary",
      externalBindings: {
        authSession: "ready",
        profile: "limited",
        premiumCoin: "ready",
        notifications: "ready",
        nativeVoice: nativeVoiceStatus,
        admin: "limited",
        personalization: "ready",
        safetyAdmin: "ready",
      },
    }
  }

  private buildRealtimeTranslationSummary(userId: string): AiRealtimeTranslationWorkspaceSummaryContract {
    return this.aiFacade.getRealtimeTranslationSummary(userId)
  }

  private buildAppActionSummary(userId: string): AiAppActionWorkspaceSummaryContract {
    const registry = this.aiFacade.getAppActionRegistry({ includeBlocked: true })
    const pending = this.aiFacade.listPendingAppActions(userId)
    return {
      manifest: this.aiFacade.getAppActionManifest(),
      registryPreview: registry.slice(0, 16).map((action) => ({
        key: action.key,
        module: action.module,
        title: action.title,
        route: action.route,
        riskLevel: action.riskLevel,
        requiresConfirmation: action.requiresConfirmation,
      })),
      pendingCount: pending.length,
      highRiskPendingCount: pending.filter((action) => action.definition.riskLevel === "high").length,
    }
  }

  private buildSettingsProfileSummary(
    userId: string,
    consent: ReturnType<AiFacadeService["getConsent"]>,
    memory: ReturnType<AiFacadeService["getMemorySummary"]>,
  ): AiWorkspaceSettingsProfileSummaryContract {
    const encodedUserId = encodeURIComponent(userId)
    const permissions = [
      consent.readAccessAllowed,
      consent.memoryWriteAllowed,
      consent.toolExecutionAllowed,
      consent.internetSearchAllowed,
    ]

    return {
      userId,
      profileSource: "kernel_session",
      permissionsEnabled: permissions.filter(Boolean).length,
      permissionsTotal: permissions.length,
      memoryWriteAllowed: memory.memoryWriteAllowed,
      providerSettingsRoute: `/api/ai/settings/${encodedUserId}/providers`,
      permissionsRoute: `/api/ai/settings/${encodedUserId}/permissions`,
      profileContractsRoute: `/api/ai/settings/${encodedUserId}/profile-contracts`,
      settingsRoute: `/api/ai/settings/${encodedUserId}`,
      entryPoints: [
        {
          key: "ai_workspace",
          title: "Sabi AI workspace",
          description: "Open the dedicated AI program workspace.",
          route: "/ai/workspace",
          visible: true,
          locked: false,
        },
        {
          key: "ai_permissions",
          title: "AI permissions",
          description: "Manage consent and action permissions.",
          route: `/api/ai/settings/${encodedUserId}/permissions`,
          visible: true,
          locked: false,
        },
        {
          key: "ai_memory",
          title: "AI memory",
          description: "Review or remove saved AI memory entries.",
          route: `/api/ai/settings/${encodedUserId}/memory`,
          visible: true,
          locked: false,
        },
        {
          key: "ai_providers",
          title: "AI providers",
          description: "Choose Google, Yandex, or internal providers where available.",
          route: `/api/ai/settings/${encodedUserId}/providers`,
          visible: true,
          locked: false,
        },
        {
          key: "ai_premium",
          title: "AI premium",
          description: "Manage premium AI features and COIN access.",
          route: `/api/ai/settings/${encodedUserId}/premium`,
          visible: true,
          locked: false,
        },
        {
          key: "ai_voice",
          title: "AI voice",
          description: "Open the voice contract entry point.",
          route: `/api/ai/voice/${encodedUserId}/status`,
          visible: true,
          locked: false,
        },
        {
          key: "ai_personalization",
          title: "AI personalization",
          description: "Open preferences, saved instructions, ranked memory, behavior signals, and privacy controls.",
          route: `/api/ai/personalization/${encodedUserId}/snapshot`,
          visible: true,
          locked: false,
        },
        {
          key: "ai_realtime_translation",
          title: "AI realtime translation",
          description: "Open realtime text, media, and call translation contracts.",
          route: `/api/ai/translation/realtime/${encodedUserId}/summary`,
          visible: true,
          locked: false,
        },
        {
          key: "ai_app_actions",
          title: "AI app actions",
          description: "Review AI-prepared app actions and pending confirmations.",
          route: `/api/ai/actions/${encodedUserId}/summary`,
          visible: true,
          locked: false,
        },
        {
          key: "ai_history_tasks",
          title: "AI history and tasks",
          description: "Review AI history and user-confirmed tasks.",
          route: `/api/ai/activity/${encodedUserId}/overview`,
          visible: true,
          locked: false,
        },
      ],
    }
  }

  private getMobileUiManifest(): AiWorkspaceMobileUiManifestContract {
    return {
      programId: "sabi_ai",
      version: "AI-29.2",
      area: "mobile_ui",
      title: "Sabi AI mobile UI",
      description: "Official mobile UI contract for AI Home, assistant chat, voice, realtime translation, history, tasks, memory, providers, settings, premium, profile entry, and app-action confirmations.",
      baseRoute: "/api/ai/mobile-ui",
      mobileBaseRoute: "/ai",
      routes: {
        manifest: "/api/ai/mobile-ui/manifest",
        snapshot: "/api/ai/mobile-ui/:userId/snapshot",
        shell: "/api/ai/mobile-ui/:userId/shell",
        home: "/api/ai/mobile-ui/:userId/home",
        chat: "/api/ai/mobile-ui/:userId/chat",
        voice: "/api/ai/mobile-ui/:userId/voice",
        translation: "/api/ai/mobile-ui/:userId/translation",
        activity: "/api/ai/mobile-ui/:userId/activity",
        settings: "/api/ai/mobile-ui/:userId/settings",
        premium: "/api/ai/mobile-ui/:userId/premium",
        sendMessage: "/api/ai/mobile-ui/assistant/message",
      },
      surfaces: [
        { key: "home", title: "AI Home", description: "Main mobile AI entry.", requiredSource: "workspace" },
        { key: "assistant_chat", title: "Assistant chat", description: "AI-20 assistant chat UI.", requiredSource: "assistant" },
        { key: "voice", title: "Voice", description: "AI-19 native voice bridge UI.", requiredSource: "voice" },
        { key: "translation", title: "Realtime translation", description: "AI-21 realtime translation UI.", requiredSource: "realtime_translation" },
        { key: "history_tasks", title: "History and tasks", description: "AI activity UI.", requiredSource: "activity" },
        { key: "memory", title: "Memory", description: "AI memory review UI.", requiredSource: "settings_profile" },
        { key: "providers", title: "Providers", description: "Provider selection UI.", requiredSource: "settings_profile" },
        { key: "settings", title: "AI settings", description: "AI permissions and settings UI.", requiredSource: "settings_profile" },
        { key: "premium", title: "Premium", description: "AI premium and COIN access UI.", requiredSource: "premium" },
        { key: "safety_admin", title: "Safety/Admin monitor", description: "AI-24 admin monitoring contract.", requiredSource: "safety_admin" },
        { key: "actions", title: "App actions", description: "AI action confirmations UI.", requiredSource: "app_actions" },
      ],
      components: [
        "hero",
        "chat_composer",
        "voice_button",
        "quick_actions",
        "card_grid",
        "list",
        "toggle_list",
        "provider_picker",
        "premium_gate",
        "history_preview",
        "task_preview",
        "translation_panel",
        "settings_panel",
        "action_confirmation_panel",
      ],
      safeExecution: {
        dangerousActionsRequireConfirmation: true,
        moneyActionsRequireConfirmation: true,
        accountDeletionBlockedForAiAutoRun: true,
        internalRiskReportsDoNotNotifyUser: true,
      },
    }
  }


  private buildSafetyAdminSummary(userId: string): AiSafetyAdminWorkspaceSummaryContract {
    const monitor = this.aiFacade.getSafetyAdminMonitor()
    const encodedUserId = encodeURIComponent(userId)
    return {
      version: "AI-24",
      status: "ready",
      routeBase: "/api/ai/safety",
      adminMonitorRoute: "/api/ai/safety/admin/monitor",
      userSummaryRoute: `/api/ai/safety/${encodedUserId}/summary`,
      totalReports: monitor.totalReports,
      openReports: monitor.openReports,
      holdActiveReports: monitor.holdActiveReports,
      emergencyReports: monitor.emergencyReports,
      lawEnforcementEligibleReports: monitor.lawEnforcementEligibleReports,
      policy: {
        aiCanAccuseUser: false,
        aiCanDecideUserIsCriminal: false,
        aiCanPunishUser: false,
        userMustNotBeWarnedAboutReport: true,
        finalDecisionOwner: "human_admin_or_compliance_team",
      },
    }
  }

  private buildPersonalizationSummary(userId: string): AiWorkspacePersonalizationSummaryContract {
    const summary = this.aiFacade.getPersonalizationSummary(userId)
    const context = this.aiFacade.getPersonalizationContext({ userId, limit: 6 })
    return {
      version: "AI-23",
      status: summary.status === "ready" ? "ready" : summary.status === "blocked" ? "blocked" : "limited",
      privacyMode: summary.privacyMode,
      personalizationAllowed: summary.personalizationAllowed,
      preferencesCount: summary.preferencesCount,
      signalsCount: summary.signalsCount,
      instructionsCount: summary.instructionsCount,
      rankedMemoryCount: summary.rankedMemoryCount,
      topPreferenceKeys: summary.topPreferenceKeys,
      promptHints: context.promptHints,
      routeBase: "/api/ai/personalization",
    }
  }

  private buildMobileUiSummary(userId: string) {
    const encodedUserId = encodeURIComponent(userId)
    const manifest = this.getMobileUiManifest()
    return {
      manifest,
      status: "ready" as const,
      baseRoute: manifest.baseRoute,
      mobileBaseRoute: manifest.mobileBaseRoute,
      primaryRoute: `/api/ai/mobile-ui/${encodedUserId}/snapshot`,
      surfaces: manifest.surfaces.map((surface) => surface.key),
    }
  }

  private toWorkspaceProviders(
    providers: Array<AiSearchProviderManifestItem | AiTranslationProviderManifestItem>,
    area: "search" | "translation",
  ): AiWorkspaceProviderContract[] {
    return providers.map((provider) => {
      const supportedAreas = area === "search"
        ? (provider as AiSearchProviderManifestItem).supportedVerticals
        : (provider as AiTranslationProviderManifestItem).supportedContentTypes

      return {
        key: provider.key,
        area,
        title: provider.label,
        description:
          area === "search"
            ? `Search provider for ${supportedAreas.join(", ")}.`
            : `Translation provider for ${supportedAreas.join(", ")}.`,
        configured: provider.configured,
        status: provider.status,
        supportedAreas,
        selected: false,
      }
    })
  }
}
