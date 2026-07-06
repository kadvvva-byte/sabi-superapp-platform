import type { AiFacadeService } from "../../../../core/kernel/ai/ai-facade.service"
import type { AiAssistantMode } from "../../../../core/kernel/ai/ai.types"
import type { AiAppActionsApplicationService } from "./ai-app-actions.service"
import type { AiAssistantService } from "./ai-assistant.service"
import type { AiRealtimeTranslationApplicationService } from "./ai-realtime-translation.service"
import type { AiWorkspaceService } from "./ai-workspace.service"
import type {
  AiMobileUiActionContract,
  AiMobileUiActivityContract,
  AiMobileUiChatContract,
  AiMobileUiComponentContract,
  AiMobileUiHomeContract,
  AiMobileUiManifestContract,
  AiMobileUiPersonalizationContract,
  AiMobileUiPremiumContract,
  AiMobileUiSendMessageRequestContract,
  AiMobileUiSendMessageResponseContract,
  AiMobileUiSettingsContract,
  AiMobileUiShellContract,
  AiMobileUiSnapshotContract,
  AiMobileUiStatus,
  AiMobileUiSurfaceKey,
  AiMobileUiTranslationContract,
  AiMobileUiVoiceContract,
} from "../../contracts/ai-mobile-ui.contracts"
import type { AiWorkspaceScreenContract } from "../../contracts/ai-workspace.contracts"

const MOBILE_BASE_ROUTE = "/ai"
const API_BASE_ROUTE = "/api/ai/mobile-ui"

type AiMobileUiAssistantMessageResponse = AiMobileUiSendMessageResponseContract & {
  text: string
  reply: string
  answer: Record<string, unknown>
  assistantRun: AiMobileUiSendMessageResponseContract["assistant"]
  webSearch?: Record<string, unknown>
  providerRoute?: Record<string, unknown>
}

function cleanText(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function buildSearchAnswer(input: {
  prompt: string
  provider: string
  configured: boolean
  status: string
  note?: string
  results: Array<{
    title: string
    snippet?: string
    url?: string
    sourceDomain?: string
  }>
}) {
  if (!input.configured || input.status !== "configured") {
    return input.note || "Google Search gateway is not configured on the server."
  }

  if (!input.results.length) {
    return input.note || "No web results were returned by the search provider."
  }

  const lines = input.results.slice(0, 5).map((item, index) => {
    const source = item.sourceDomain || item.url || "source"
    const snippet = item.snippet ? ` — ${item.snippet}` : ""
    return `${index + 1}. ${item.title}${snippet}\n${source}`
  })

  return `Web search result for: ${input.prompt}\n\n${lines.join("\n\n")}`
}

export class AiMobileUiService {
  constructor(
    private readonly aiFacade: AiFacadeService,
    private readonly workspaceService: AiWorkspaceService,
    private readonly assistantService: AiAssistantService,
    private readonly appActionsService: AiAppActionsApplicationService,
    private readonly realtimeTranslationService: AiRealtimeTranslationApplicationService,
  ) {}

  getManifest(): AiMobileUiManifestContract {
    return {
      programId: "sabi_ai",
      version: "AI-29.2",
      area: "mobile_ui",
      title: "Sabi AI mobile UI",
      description:
        "Mobile contract for AI Home, clean assistant chat, voice, translation, history, settings, premium, personalization, Google Search gateway and safe action confirmations.",
      baseRoute: API_BASE_ROUTE,
      mobileBaseRoute: MOBILE_BASE_ROUTE,
      routes: {
        manifest: `${API_BASE_ROUTE}/manifest`,
        snapshot: `${API_BASE_ROUTE}/:userId/snapshot`,
        shell: `${API_BASE_ROUTE}/:userId/shell`,
        home: `${API_BASE_ROUTE}/:userId/home`,
        chat: `${API_BASE_ROUTE}/:userId/chat`,
        voice: `${API_BASE_ROUTE}/:userId/voice`,
        translation: `${API_BASE_ROUTE}/:userId/translation`,
        activity: `${API_BASE_ROUTE}/:userId/activity`,
        settings: `${API_BASE_ROUTE}/:userId/settings`,
        premium: `${API_BASE_ROUTE}/:userId/premium`,
        personalization: `${API_BASE_ROUTE}/:userId/personalization`,
        sendMessage: `${API_BASE_ROUTE}/assistant/message`,
      },
      surfaces: [
        {
          key: "home",
          title: "AI Home",
          description: "Main AI entry.",
          requiredSource: "workspace",
        },
        {
          key: "assistant_chat",
          title: "Assistant chat",
          description: "Clean AI chat with attachment, voice, Google Search and provider routing.",
          requiredSource: "assistant",
        },
        {
          key: "voice",
          title: "Voice",
          description: "Voice command and native bridge surface.",
          requiredSource: "voice",
        },
        {
          key: "translation",
          title: "Translation",
          description: "Text, media and realtime translation surface.",
          requiredSource: "realtime_translation",
        },
        {
          key: "history_tasks",
          title: "Activity",
          description: "History and tasks.",
          requiredSource: "activity",
        },
        {
          key: "memory",
          title: "Memory",
          description: "Memory controls through settings profile.",
          requiredSource: "settings_profile",
        },
        {
          key: "personalization",
          title: "Personalization",
          description: "Personalization runtime.",
          requiredSource: "personalization",
        },
        {
          key: "providers",
          title: "Providers",
          description: "Provider settings.",
          requiredSource: "settings_profile",
        },
        {
          key: "settings",
          title: "Settings",
          description: "Permissions, providers and safety controls.",
          requiredSource: "settings_profile",
        },
        {
          key: "premium",
          title: "Premium",
          description: "Premium/COIN access.",
          requiredSource: "premium",
        },
        {
          key: "safety_admin",
          title: "Safety/Admin monitor",
          description: "Internal safety/admin contract.",
          requiredSource: "safety_admin",
        },
        {
          key: "actions",
          title: "Actions",
          description: "Pending confirmations.",
          requiredSource: "app_actions",
        },
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

  getSnapshot(userId: string, activeSurface: AiMobileUiSurfaceKey = "home"): AiMobileUiSnapshotContract {
    const workspace = this.workspaceService.getWorkspace(userId)

    return {
      manifest: this.getManifest(),
      shell: this.getShell(userId, activeSurface, workspace),
      home: this.getHome(userId, workspace),
      chat: this.getChat(userId, workspace),
      voice: this.getVoice(userId, workspace),
      translation: this.getTranslation(userId, workspace),
      activity: this.getActivity(userId, workspace),
      settings: this.getSettings(userId, workspace),
      personalization: this.getPersonalization(userId, workspace),
      premium: this.getPremium(userId, workspace),
    }
  }

  getShell(
    userId: string,
    activeSurface: AiMobileUiSurfaceKey = "home",
    workspace?: AiWorkspaceScreenContract,
  ): AiMobileUiShellContract {
    const data = workspace ?? this.workspaceService.getWorkspace(userId)
    const voiceReady = data.voice.manifest.configured && data.voice.status.enabled
    const hasPending = data.appActions.pendingCount > 0
    const status: AiMobileUiStatus = hasPending ? "limited" : "ready"

    return {
      programId: "sabi_ai",
      version: "AI-29.2",
      userId,
      generatedAt: new Date().toISOString(),
      title: "Sabi AI",
      subtitle: voiceReady ? "Assistant, voice and translation" : "Assistant and translation",
      status,
      activeSurface,
      topBar: {
        title: "Sabi AI",
        subtitle: data.session.mode,
        avatarLabel: "AI",
        premiumBadge: data.premium.enabled,
        voiceStatus: voiceReady ? "ready" : "not_connected",
        settingsRoute: this.route(userId, "settings"),
      },
      bottomTabs: this.buildBottomTabs(userId, activeSurface, data),
      floatingAction: this.buildAction(userId, {
        key: "ask_sabi_ai",
        title: "Ask Sabi AI",
        description: "Open clean assistant chat.",
        icon: "sabi_ai",
        mode: "general",
        surface: "assistant_chat",
        requiresConfirmation: false,
        locked: false,
      }),
      safetyNotice: {
        title: "Safe AI actions",
        description:
          "AI cannot send messages, money or execute sensitive actions without explicit user confirmation.",
        route: this.route(userId, "actions", `/api/ai/actions/${encodeURIComponent(userId)}/pending`),
      },
    }
  }

  getHome(userId: string, workspace?: AiWorkspaceScreenContract): AiMobileUiHomeContract {
    const data = workspace ?? this.workspaceService.getWorkspace(userId)
    const voiceReady = data.voice.manifest.configured && data.voice.status.enabled
    const hasPending = data.appActions.pendingCount > 0

    return {
      shell: this.getShell(userId, "home", data),
      hero: {
        key: "ai_mobile_home_hero",
        kind: "hero",
        title: "Sabi AI",
        description: "Assistant, translation, voice and safe app actions.",
        status: "ready",
        visible: true,
        locked: false,
        route: this.route(userId, "assistant_chat"),
        headline: "Sabi AI",
        subheadline: "Clean AI assistant with files, voice, web search and confirmation safety.",
        chips: [
          data.premium.enabled ? "Premium active" : "Base access",
          voiceReady ? "Voice ready" : "Voice bridge pending",
          hasPending ? `${data.appActions.pendingCount} confirmations` : "No pending actions",
        ],
      },
      quickActions: this.buildHomeQuickActions(userId, data),
      cards: [
        this.card(
          userId,
          "assistant_card",
          "assistant_chat",
          "Assistant chat",
          "Ask questions, attach files, use voice and web provider routing.",
          "chat",
          "ready",
        ),
        this.card(
          userId,
          "translation_card",
          "translation",
          "Translation",
          "Text, photo, media transcript and realtime translation contracts.",
          "translation",
          "ready",
        ),
        this.card(
          userId,
          "voice_card",
          "voice",
          "Voice",
          "Voice command and native bridge foundation.",
          "voice",
          voiceReady ? "ready" : "not_connected",
          !voiceReady,
        ),
        this.card(
          userId,
          "search_card",
          "assistant_chat",
          "Web search",
          "Use Google Search gateway from AI Chat.",
          "chat",
          "ready",
        ),
        this.card(
          userId,
          "safety_card",
          "actions",
          "Confirmations",
          "Sensitive actions wait for user confirmation.",
          "shield",
          hasPending ? "limited" : "ready",
        ),
        this.card(
          userId,
          "personalization_card",
          "personalization",
          "Personalization",
          "Privacy mode, saved instructions and adaptive context.",
          "personalization",
          data.personalization.personalizationAllowed ? "ready" : "limited",
        ),
        this.card(
          userId,
          "premium_card",
          "premium",
          "Premium",
          "COIN-gated AI tools and premium features.",
          "premium",
          data.premium.enabled ? "ready" : "locked",
          !data.premium.enabled,
        ),
      ],
      workspace: {
        premium: data.premium,
        memory: data.memory,
        activity: data.activity,
        locale: data.locale,
        providerSettings: data.providerSettings,
      },
    }
  }

  getChat(userId: string, workspace?: AiWorkspaceScreenContract): AiMobileUiChatContract {
    const data = workspace ?? this.workspaceService.getWorkspace(userId)

    return {
      shell: this.getShell(userId, "assistant_chat", data),
      input: {
        placeholder: "Ask Sabi AI...",
        sendRoute: `${API_BASE_ROUTE}/assistant/message`,
        supportsVoice: data.voice.manifest.configured && data.voice.status.enabled,
        supportsAttachmentContext: true,
        supportsWebSearch: true,
        supportsVoiceControl: true,
        defaultMode: "general",
      },
      starterPrompts: [
        {
          key: "business_help",
          title: "Business help",
          prompt: "Help me analyze my business task.",
          mode: "business",
        },
        {
          key: "study_help",
          title: "Study help",
          prompt: "Explain this topic step by step.",
          mode: "education",
        },
        {
          key: "web_search",
          title: "Web search",
          prompt: "Search the web and summarize the answer.",
          mode: "search",
        },
        {
          key: "translate_message",
          title: "Translate",
          prompt: "Translate this text for me.",
          mode: "translation",
        },
      ],
      pendingConfirmations: this.appActionsService.getWorkspaceSummary(userId),
    }
  }

  getVoice(userId: string, workspace?: AiWorkspaceScreenContract): AiMobileUiVoiceContract {
    const data = workspace ?? this.workspaceService.getWorkspace(userId)
    const voiceReady = data.voice.manifest.configured && data.voice.status.enabled

    return {
      shell: this.getShell(userId, "voice", data),
      status: data.voice,
      components: [
        {
          key: "push_to_talk_button",
          kind: "voice_button",
          title: "Push to talk",
          description: "Start a voice command and send native transcript back to Sabi AI.",
          status: voiceReady ? "ready" : "not_connected",
          visible: true,
          locked: !voiceReady,
          route: this.route(userId, "voice", "/api/ai/voice/session"),
        },
        {
          key: "tts_playback",
          kind: "voice_button",
          title: "Speak response",
          description: "Native TTS playback command for a female assistant voice.",
          status: voiceReady ? "ready" : "not_connected",
          visible: true,
          locked: !voiceReady,
          route: this.route(userId, "voice", "/api/ai/voice/native/playback"),
        },
        {
          key: "voice_interrupt",
          kind: "voice_button",
          title: "Interrupt",
          description: "Stop listening, processing or response playback.",
          status: voiceReady ? "ready" : "not_connected",
          visible: true,
          locked: !voiceReady,
          route: this.route(userId, "voice", "/api/ai/voice/native/interrupt"),
        },
      ],
      nativeBridgeNotice: {
        title: "Native voice bridge required",
        description:
          "Server contracts are ready. Real microphone, STT, TTS, quick invoke and playback must run through the Expo/React Native voice bridge.",
        required: true,
      },
    }
  }

  getTranslation(userId: string, workspace?: AiWorkspaceScreenContract): AiMobileUiTranslationContract {
    const data = workspace ?? this.workspaceService.getWorkspace(userId)
    const realtime = this.realtimeTranslationService.getSummary(userId)
    const realtimeLocked = !data.premium.activeFeatures.includes("ai_translation_realtime")
    const mediaLocked = !data.premium.activeFeatures.includes("ai_translation_media")

    return {
      shell: this.getShell(userId, "translation", data),
      realtime,
      components: [
        {
          key: "translate_text_panel",
          kind: "translation_panel",
          title: "Text translation",
          description: "Translate text through Google Translate provider gateway, not a local fake dictionary.",
          status: "ready",
          visible: true,
          locked: false,
          route: this.route(userId, "translation", "/api/ai/provider-gateway/translation/text"),
        },
        {
          key: "translate_image_panel",
          kind: "translation_panel",
          title: "Photo and camera translation",
          description: "Send photo/camera text to backend OCR + translation provider gateway.",
          status: "ready",
          visible: true,
          locked: false,
          route: this.route(userId, "translation", "/api/ai/provider-gateway/translation/image"),
        },
        {
          key: "translate_media_transcript_panel",
          kind: "translation_panel",
          title: "Media transcript translation",
          description: "Translate prepared audio/video transcript from the native client bridge.",
          status: mediaLocked ? "locked" : "ready",
          visible: true,
          locked: mediaLocked,
          route: this.route(userId, "translation", "/api/ai/translation/realtime/media-transcript"),
        },
        {
          key: "translate_call_segment_panel",
          kind: "translation_panel",
          title: "Call subtitles",
          description: "Translate live call transcript segments into subtitles and optional TTS playback.",
          status: realtimeLocked ? "locked" : "ready",
          visible: true,
          locked: realtimeLocked,
          route: this.route(userId, "translation", "/api/ai/translation/realtime/call-segment"),
        },
      ],
      quickActions: [
        this.buildAction(userId, {
          key: "translate_text_action",
          title: "Translate text",
          description: "Open text translation.",
          icon: "translation",
          mode: "translation",
          surface: "translation",
          requiresConfirmation: false,
          locked: false,
        }),
        this.buildAction(userId, {
          key: "call_translation_action",
          title: "Call translation",
          description: "Open premium call subtitle translation controls.",
          icon: "voice",
          mode: "translation",
          surface: "translation",
          requiresConfirmation: false,
          locked: realtimeLocked,
          lockReason: realtimeLocked ? "Requires realtime translation premium access." : undefined,
        }),
      ],
    }
  }

  getActivity(userId: string, workspace?: AiWorkspaceScreenContract): AiMobileUiActivityContract {
    const data = workspace ?? this.workspaceService.getWorkspace(userId)

    return {
      shell: this.getShell(userId, "history_tasks", data),
      historyPreview: data.historyPreview,
      taskPreview: data.taskPreview,
      counters: data.activity,
      components: [
        {
          key: "history_preview",
          kind: "history_preview",
          title: "Recent AI history",
          description: "Latest assistant, search, translation, business, education and chat entries.",
          status: "ready",
          visible: true,
          locked: false,
          route: this.route(userId, "history_tasks", `/api/ai/activity/${encodeURIComponent(userId)}/history`),
        },
        {
          key: "task_preview",
          kind: "task_preview",
          title: "AI tasks",
          description: "Draft, awaiting confirmation, completed and cancelled AI tasks.",
          status: "ready",
          visible: true,
          locked: false,
          route: this.route(userId, "history_tasks", `/api/ai/activity/${encodeURIComponent(userId)}/tasks`),
        },
        {
          key: "pending_confirmations",
          kind: "action_confirmation_panel",
          title: "Pending confirmations",
          description: "Review AI-prepared app actions before anything sensitive is executed.",
          status: data.appActions.pendingCount > 0 ? "limited" : "ready",
          visible: true,
          locked: false,
          route: this.route(userId, "actions", `/api/ai/actions/${encodeURIComponent(userId)}/pending`),
        },
      ],
    }
  }

  getSettings(userId: string, workspace?: AiWorkspaceScreenContract): AiMobileUiSettingsContract {
    const data = workspace ?? this.workspaceService.getWorkspace(userId)

    return {
      shell: this.getShell(userId, "settings", data),
      permissions: data.permissions,
      providers: {
        search: data.searchProviders,
        translation: data.translationProviders,
      },
      profile: data.settingsProfile,
      personalization: data.personalization,
      components: [
        {
          key: "permissions_panel",
          kind: "toggle_list",
          title: "Permissions",
          description: "Read access, memory write, tool execution and internet search consent.",
          status: "ready",
          visible: true,
          locked: false,
          route: this.route(userId, "settings", `/api/ai/settings/${encodeURIComponent(userId)}/permissions`),
        },
        {
          key: "provider_picker",
          kind: "provider_picker",
          title: "Providers",
          description: "Choose ChatGPT/OpenAI, Google, Yandex or internal gateway where configured.",
          status: "ready",
          visible: true,
          locked: false,
          route: this.route(userId, "providers", `/api/ai/settings/${encodeURIComponent(userId)}/providers`),
        },
        {
          key: "memory_panel",
          kind: "settings_panel",
          title: "Memory",
          description: "Review saved memory and consent state.",
          status: data.memory.memoryWriteAllowed ? "ready" : "limited",
          visible: true,
          locked: false,
          route: this.route(userId, "memory", `/api/ai/settings/${encodeURIComponent(userId)}/memory`),
        },
        {
          key: "safety_panel",
          kind: "settings_panel",
          title: "Safety approval",
          description: "Messages, money, account and sensitive app actions require confirmation.",
          status: "ready",
          visible: true,
          locked: false,
          route: this.route(userId, "actions", `/api/ai/actions/${encodeURIComponent(userId)}/pending`),
        },
      ],
    }
  }

  getPersonalization(
    userId: string,
    workspace?: AiWorkspaceScreenContract,
  ): AiMobileUiPersonalizationContract {
    const data = workspace ?? this.workspaceService.getWorkspace(userId)

    return {
      shell: this.getShell(userId, "personalization", data),
      personalization: data.personalization,
      components: [
        {
          key: "personalization_summary",
          kind: "settings_panel",
          title: "Personalization runtime",
          description: "Privacy mode, preferences, saved instructions, ranked memory context and adaptive hints.",
          status: data.personalization.personalizationAllowed ? "ready" : "limited",
          visible: true,
          locked: false,
          route: this.route(userId, "personalization", `/api/ai/personalization/${encodeURIComponent(userId)}/summary`),
        },
        {
          key: "saved_instructions",
          kind: "list",
          title: "Saved instructions",
          description: "User-approved instructions that shape future AI answers.",
          status: data.personalization.instructionsCount > 0 ? "ready" : "limited",
          visible: true,
          locked: false,
          route: this.route(userId, "personalization", `/api/ai/personalization/${encodeURIComponent(userId)}/context`),
        },
        {
          key: "privacy_mode",
          kind: "toggle_list",
          title: "Privacy mode",
          description: "Strict, balanced or adaptive personalization control.",
          status: "ready",
          visible: true,
          locked: false,
          route: this.route(userId, "personalization", `/api/ai/personalization/${encodeURIComponent(userId)}/privacy-mode`),
        },
      ],
    }
  }

  getPremium(userId: string, workspace?: AiWorkspaceScreenContract): AiMobileUiPremiumContract {
    const data = workspace ?? this.workspaceService.getWorkspace(userId)

    return {
      shell: this.getShell(userId, "premium", data),
      premium: data.premium,
      featureGates: data.featureGates,
      components: [
        {
          key: "premium_gate",
          kind: "premium_gate",
          title: data.premium.enabled ? "AI Premium active" : "Unlock AI Premium",
          description:
            "Use COIN or premium entitlement for business, education, media translation, realtime call translation and extended memory.",
          status: data.premium.enabled ? "ready" : "locked",
          visible: true,
          locked: !data.premium.enabled,
          route: this.route(userId, "premium", `/api/ai/settings/${encodeURIComponent(userId)}/premium`),
        },
      ],
    }
  }

  async sendAssistantMessage(input: AiMobileUiSendMessageRequestContract): Promise<AiMobileUiAssistantMessageResponse> {
    const wantsWebSearch =
      input.webSearchEnabled === true ||
      input.providerHint === "google_search" ||
      input.preferredMode === "search"

    const assistantPrompt = wantsWebSearch
      ? `Search the web and summarize the answer. Query: ${input.prompt}`
      : input.prompt

    const assistant = this.assistantService.run({
      userId: input.userId,
      prompt: assistantPrompt,
      locale: input.locale,
      source: input.source ?? "text",
      preferredMode: wantsWebSearch ? "search" : input.preferredMode,
      preferredProvider: wantsWebSearch ? "google" : input.preferredProvider,
      providerHint: wantsWebSearch ? "google_search" : input.providerHint,
      webSearchEnabled: wantsWebSearch,
      voiceControlEnabled: input.voiceControlEnabled,
      attachments: input.attachments,
      clientCapabilities: input.clientCapabilities,
      autoExecute: false,
      confirmActionId: input.confirmActionId,
      metadata: {
        ...(input.metadata ?? {}),
        mobileUiSurface: input.surface ?? "assistant_chat",
        webSearchEnabled: wantsWebSearch,
      },
    })

    let webSearch: Record<string, unknown> | undefined
    let text = cleanText((assistant.answer as unknown as Record<string, unknown> | undefined)?.text)

    if (wantsWebSearch) {
      const search = await this.aiFacade.search({
        userId: input.userId,
        query: input.prompt,
        locale: input.locale,
        preferredProvider: "google",
        vertical: "web",
        limit: 5,
        safeSearch: true,
        allowFallback: false,
      })

      webSearch = search as unknown as Record<string, unknown>

      text = buildSearchAnswer({
        prompt: input.prompt,
        provider: search.provider,
        configured: search.configured,
        status: search.status,
        note: search.note,
        results: search.results,
      })
    }

    if (!text) {
      text =
        cleanText((assistant.answer as unknown as Record<string, unknown> | undefined)?.summary) ||
        "AI request was accepted. No answer text was returned by the provider."
    }

    const pending = this.appActionsService.getWorkspaceSummary(input.userId)

    return {
      userId: input.userId,
      surface: input.surface ?? "assistant_chat",
      createdAt: new Date().toISOString(),
      assistant,
      text,
      reply: text,
      answer: {
        text,
        webSearchEnabled: wantsWebSearch,
        provider: wantsWebSearch ? "google" : input.preferredProvider,
      },
      assistantRun: assistant,
      webSearch,
      providerRoute: wantsWebSearch
        ? {
            kind: "search",
            provider: "google",
            requiresGateway: true,
            allowFallback: false,
          }
        : undefined,
      ui: {
        refreshRoutes: [
          `${API_BASE_ROUTE}/${encodeURIComponent(input.userId)}/chat`,
          `${API_BASE_ROUTE}/${encodeURIComponent(input.userId)}/activity`,
          `${API_BASE_ROUTE}/${encodeURIComponent(input.userId)}/home`,
        ],
        pendingConfirmationCount: pending.pendingCount,
        dispatchCommands: assistant.actions,
      },
    }
  }

  getProviderSelection(userId: string) {
    return this.aiFacade.getProviderSettings(userId)
  }

  private buildBottomTabs(
    userId: string,
    activeSurface: AiMobileUiSurfaceKey,
    workspace: AiWorkspaceScreenContract,
  ): AiMobileUiShellContract["bottomTabs"] {
    const voiceLocked = !(workspace.voice.manifest.configured && workspace.voice.status.enabled)

    return [
      this.nav(userId, "home", "Home", "AI overview", "sabi_ai", activeSurface),
      this.nav(userId, "assistant_chat", "Chat", "Ask Sabi AI", "chat", activeSurface),
      this.nav(userId, "voice", "Voice", "Speak with AI", "voice", activeSurface, voiceLocked),
      this.nav(userId, "translation", "Translate", "Realtime translation", "translation", activeSurface),
      this.nav(
        userId,
        "history_tasks",
        "Activity",
        "History and tasks",
        "history",
        activeSurface,
        false,
        workspace.activity.awaitingConfirmationTasks,
      ),
      this.nav(userId, "settings", "Settings", "AI permissions and providers", "settings", activeSurface),
    ]
  }

  private buildHomeQuickActions(userId: string, workspace: AiWorkspaceScreenContract): AiMobileUiActionContract[] {
    const voiceLocked = !(workspace.voice.manifest.configured && workspace.voice.status.enabled)

    return [
      this.buildAction(userId, {
        key: "ask_ai",
        title: "Ask AI",
        description: "Open main AI chat.",
        icon: "chat",
        mode: "general",
        surface: "assistant_chat",
        requiresConfirmation: false,
        locked: false,
      }),
      this.buildAction(userId, {
        key: "voice_ai",
        title: "Voice AI",
        description: "Start voice UI.",
        icon: "voice",
        mode: "general",
        surface: "voice",
        requiresConfirmation: false,
        locked: voiceLocked,
        lockReason: voiceLocked ? "Native voice bridge is not connected." : undefined,
      }),
      this.buildAction(userId, {
        key: "translate_now",
        title: "Translate",
        description: "Open translation.",
        icon: "translation",
        mode: "translation",
        surface: "translation",
        requiresConfirmation: false,
        locked: false,
      }),
      this.buildAction(userId, {
        key: "web_search",
        title: "Web search",
        description: "Open AI Chat with Google Search gateway.",
        icon: "chat",
        mode: "search",
        surface: "assistant_chat",
        requiresConfirmation: false,
        locked: false,
      }),
      this.buildAction(userId, {
        key: "review_tasks",
        title: "Tasks",
        description: "Review tasks and confirmations.",
        icon: "task",
        mode: "general",
        surface: "history_tasks",
        requiresConfirmation: false,
        locked: false,
      }),
      this.buildAction(userId, {
        key: "personalize_ai",
        title: "Personalize",
        description: "Open AI personalization controls.",
        icon: "memory",
        mode: "general",
        surface: "personalization",
        requiresConfirmation: false,
        locked: !workspace.personalization.personalizationAllowed,
      }),
      this.buildAction(userId, {
        key: "ai_settings",
        title: "Settings",
        description: "Manage AI permissions and providers.",
        icon: "settings",
        mode: "general",
        surface: "settings",
        requiresConfirmation: false,
        locked: false,
      }),
    ]
  }

  private buildAction(
    userId: string,
    input: {
      key: string
      title: string
      description: string
      icon: AiMobileUiActionContract["icon"]
      mode: AiAssistantMode
      surface: AiMobileUiSurfaceKey
      requiresConfirmation: boolean
      locked: boolean
      lockReason?: string
      appActionKey?: string
      apiRoute?: string
    },
  ): AiMobileUiActionContract {
    return {
      key: input.key,
      title: input.title,
      description: input.description,
      icon: input.icon,
      mode: input.mode,
      targetSurface: input.surface,
      route: this.route(userId, input.surface, input.apiRoute),
      appActionKey: input.appActionKey,
      requiresConfirmation: input.requiresConfirmation,
      locked: input.locked,
      lockReason: input.lockReason,
    }
  }

  private card(
    userId: string,
    key: string,
    surface: AiMobileUiSurfaceKey,
    title: string,
    description: string,
    icon: AiMobileUiActionContract["icon"],
    status: AiMobileUiStatus,
    locked = false,
  ): AiMobileUiComponentContract {
    return {
      key,
      kind: "card_grid",
      title,
      description,
      status,
      visible: true,
      locked,
      route: this.route(userId, surface),
      primaryAction: {
        key: `${key}_open`,
        title: "Open",
        description: `Open ${title}.`,
        icon,
        mode: surface === "translation" ? "translation" : "general",
        targetSurface: surface,
        route: this.route(userId, surface),
        requiresConfirmation: false,
        locked,
      },
      metadata: { icon },
    }
  }

  private nav(
    userId: string,
    key: AiMobileUiSurfaceKey,
    title: string,
    description: string,
    icon: AiMobileUiShellContract["bottomTabs"][number]["icon"],
    activeSurface: AiMobileUiSurfaceKey,
    locked = false,
    badge?: number | string,
  ): AiMobileUiShellContract["bottomTabs"][number] {
    return {
      key,
      title,
      description,
      icon,
      route: this.route(userId, key),
      active: activeSurface === key,
      locked,
      badge,
    }
  }

  private route(userId: string, surface: AiMobileUiSurfaceKey, apiRoute?: string) {
    const encodedUserId = encodeURIComponent(userId)
    const mobilePath = this.surfaceToMobilePath(surface)
    const mobileRoute = mobilePath ? `${MOBILE_BASE_ROUTE}/${mobilePath}` : MOBILE_BASE_ROUTE
    const deepLinkPath = mobilePath || "home"

    return {
      mobileRoute,
      apiRoute: apiRoute ?? `${API_BASE_ROUTE}/${encodedUserId}/${this.surfaceToApiPath(surface)}`,
      deepLink: `sabi://ai/${deepLinkPath}`,
    }
  }

  private surfaceToMobilePath(surface: AiMobileUiSurfaceKey): string {
    if (surface === "home") return ""
    if (surface === "assistant_chat") return "chat"
    if (surface === "history_tasks") return "activity"
    if (surface === "actions") return "activity"
    if (surface === "memory") return "settings"
    if (surface === "providers") return "settings"
    if (surface === "personalization") return "settings"
    if (surface === "profile") return "settings"
    if (surface === "safety_admin") return "settings"
    return surface.replace("_", "-")
  }
  private surfaceToApiPath(surface: AiMobileUiSurfaceKey): string {
    if (surface === "assistant_chat") return "chat"
    if (surface === "history_tasks") return "activity"
    if (surface === "actions") return "activity"
    if (surface === "memory") return "settings"
    if (surface === "personalization") return "personalization"
    if (surface === "providers") return "settings"
    if (surface === "profile") return "settings"
    return surface
  }
}