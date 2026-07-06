import { AiAppActionsService } from "./ai-app-actions.service"
import type { AiPreparedAppAction } from "./ai-app-actions.types"
import { AssistantStateService } from "./assistant-state.service"
import { AiConsentService } from "./ai-consent.service"
import { AiHistoryService } from "./ai-history.service"
import { AiLocaleBindingService } from "./ai-locale-binding.service"
import { AiMemoryService } from "./ai-memory.service"
import { AiPremiumCoinAccessService } from "./ai-premium-coin-access.service"
import { AiPersonalizationRuntimeService } from "./ai-personalization.service"
import { AiProviderSettingsService } from "./ai-provider-settings.service"
import { AiSessionService } from "./ai-session.service"
import { AiTaskService } from "./ai-task.service"
import { AiSafetyAdminService } from "./ai-safety-admin.service"
import type {
  AiActionIntent,
  AiActionPlan,
  AiAssistantActionCandidate,
  AiAssistantAnswer,
  AiAssistantContextSnapshot,
  AiAssistantDomain,
  AiAssistantExecutionStatus,
  AiAssistantManifest,
  AiAssistantMode,
  AiAssistantOrchestrationInput,
  AiAssistantOrchestrationResult,
  AiAssistantResolvedIntent,
  AiAssistantRiskLevel,
  AiAssistantRouteTarget,
  AiAssistantSafetyDecision,
  AiCapability,
  AiExecutionPolicy,
  AiProviderKey,
} from "./ai.types"

const SUPPORTED_DOMAINS: AiAssistantDomain[] = [
  "conversation",
  "search",
  "translation",
  "business",
  "education",
  "task",
  "memory",
  "app_navigation",
  "messenger",
  "wallet",
  "profile",
  "settings",
  "qr",
  "premium",
]

const HIGH_RISK_WORDS = [
  "delete account",
  "удалить аккаунт",
  "удали аккаунт",
  "remove account",
  "send message",
  "отправь сообщение",
  "withdraw",
  "cash out",
  "transfer money",
  "send money",
  "send coin",
  "coin transfer",
  "переведи деньги",
  "отправь деньги",
  "отправь коин",
  "вывод",
  "оплатить",
  "pay",
]

const MEMORY_WORDS = ["remember", "запомни", "сохрани в памяти", "memory", "память"]
const SEARCH_WORDS = ["find", "search", "google", "yandex", "look up", "internet", "web", "найди", "поиск", "ищи", "интернет"]
const TRANSLATION_WORDS = ["translate", "translation", "переведи", "таржима", "tarjima", "перевод"]
const BUSINESS_WORDS = ["business", "accounting", "income", "expense", "tax", "бизнес", "бухгалтер", "доход", "расход", "налог"]
const EDUCATION_WORDS = ["study", "student", "abiturient", "teacher", "learn", "lesson", "quiz", "exam", "education", "учеб", "студент", "абитуриент", "учитель", "урок", "объясни", "экзамен", "домаш"]
const TASK_WORDS = ["task", "todo", "plan", "remind", "задача", "план", "напомни", "сделай задачу"]
const SETTINGS_WORDS = ["settings", "permission", "provider", "настрой", "разрешен", "провайдер"]
const PREMIUM_WORDS = ["premium", "subscription", "премиум", "подписка"]
const PROFILE_WORDS = ["profile", "account", "профиль", "аккаунт"]
const QR_WORDS = ["qr", "кьюар", "куар", "скан"]
const MESSENGER_WORDS = ["messenger", "chat", "message", "call", "мессенджер", "чат", "сообщ", "звон"]
const WALLET_WORDS = ["wallet", "balance", "card", "кошелек", "кошелёк", "валет", "баланс", "карта", "coin", "коин"]

function createId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
}

function normalizePrompt(prompt: string) {
  return prompt.trim().replace(/\s+/g, " ")
}

function includesAny(text: string, words: readonly string[]) {
  return words.some((word) => text.includes(word))
}

function extractQuotedValue(prompt: string) {
  const match = prompt.match(/["“«](.*?)["”»]/)
  return match?.[1]?.trim()
}

export class AiAssistantOrchestratorService {
  private readonly stateService = new AssistantStateService()

  constructor(
    private readonly sessionService: AiSessionService,
    private readonly consentService: AiConsentService,
    private readonly memoryService: AiMemoryService,
    private readonly historyService: AiHistoryService,
    private readonly taskService: AiTaskService,
    private readonly premiumService: AiPremiumCoinAccessService,
    private readonly providerSettingsService: AiProviderSettingsService,
    private readonly localeBindingService: AiLocaleBindingService,
    private readonly appActionsService: AiAppActionsService,
    private readonly personalizationService?: AiPersonalizationRuntimeService,
    private readonly safetyAdminService?: AiSafetyAdminService,
  ) {}

  getManifest(): AiAssistantManifest {
    return {
      area: "assistant_orchestrator",
      status: "ready",
      version: "AI-29.2",
      dangerousActionPolicy: "confirm_required",
      supportedDomains: SUPPORTED_DOMAINS,
      capabilities: [
        {
          key: "intent_detection",
          title: "Intent detection",
          enabled: true,
          requiresConfirmation: false,
        },
        {
          key: "context_resolver",
          title: "Session, memory, premium, locale, and provider context resolver",
          enabled: true,
          requiresConfirmation: false,
        },
        {
          key: "safe_app_action_routing",
          title: "Safe SuperApp action routing",
          enabled: true,
          requiresConfirmation: true,
        },
        {
          key: "app_action_registry",
          title: "AI app action registry and client dispatch contracts",
          enabled: true,
          requiresConfirmation: true,
        },
        {
          key: "client_dispatch_commands",
          title: "Prepared commands for Messenger, Wallet, Coin Wallet, QR, Profile, Premium, settings, translation, and tasks",
          enabled: true,
          requiresConfirmation: true,
        },
        {
          key: "task_creation",
          title: "AI task creation with confirmation state",
          enabled: true,
          requiresConfirmation: true,
        },
        {
          key: "personalized_context_resolver",
          title: "AI-23 personalization runtime context resolver",
          enabled: true,
          requiresConfirmation: false,
        },
        {
          key: "answer_composer",
          title: "Action-aware answer composer",
          enabled: true,
          requiresConfirmation: false,
        },
        {
          key: "chatgpt_provider_router",
          title: "ChatGPT/OpenAI provider routing foundation",
          enabled: true,
          requiresConfirmation: false,
        },
        {
          key: "multimodal_attachments",
          title: "Photo, video, document, and audio attachment context contract",
          enabled: true,
          requiresConfirmation: false,
        },
        {
          key: "voice_command_control",
          title: "Voice command foundation with safety approval",
          enabled: true,
          requiresConfirmation: true,
        },
        {
          key: "google_translate_search_gateway",
          title: "Google Translate and Google Search gateway contract",
          enabled: true,
          requiresConfirmation: false,
        },
        {
          key: "internal_safety_reporting",
          title: "AI-24 internal safety/admin reporting without user accusation",
          enabled: true,
          requiresConfirmation: false,
        },
      ],
    }
  }

  getContext(userId: string, mode?: AiAssistantMode, provider?: AiProviderKey): AiAssistantContextSnapshot {
    const consent = this.consentService.getConsent(userId)
    const premiumAccess = this.premiumService.getUserAccess(userId)
    const locale = this.localeBindingService.getLocale(userId)
    const providerSettings = this.providerSettingsService.getSettings(userId)
    const session = this.sessionService.getOrCreateSession({
      userId,
      locale: locale.locale,
      mode,
      provider: provider ?? providerSettings.searchProvider,
      consent,
      premiumEnabled: premiumAccess.premiumEnabled,
      premiumPlanKey: premiumAccess.planKey,
      activePremiumFeatures: premiumAccess.activeFeatures,
      coinBalance: premiumAccess.coinBalance,
    })

    return {
      userId,
      locale: session.locale,
      mode: session.mode,
      provider: session.defaultProvider,
      premiumEnabled: session.premiumEnabled,
      premiumPlanKey: session.premiumPlanKey,
      activePremiumFeatures: session.activePremiumFeatures,
      consent: session.consent,
      memorySummary: this.memoryService.getMemorySummary(userId),
      memoryPreview: this.memoryService.listMemory(userId).slice(0, 8),
      recentHistory: this.historyService.list(userId, 8),
      recentTasks: this.taskService.list(userId, undefined, 8),
      providerSettings,
      personalization: this.personalizationService?.getContext({
        userId,
        mode: session.mode,
        provider: session.defaultProvider,
        limit: 8,
      }),
    }
  }

  run(input: AiAssistantOrchestrationInput): AiAssistantOrchestrationResult {
    const prompt = normalizePrompt(input.prompt)
    if (!input.userId?.trim()) {
      throw new Error("ai_assistant_user_id_required")
    }
    if (!prompt) {
      throw new Error("ai_assistant_prompt_required")
    }

    const safetyReport = this.safetyAdminService?.reportFromTextSignal({
      userId: input.userId,
      text: prompt,
      source: input.source ?? "assistant",
      evidenceKind: input.source === "voice" ? "voice_transcript" : "assistant_prompt",
      metadata: { assistantOrchestratorVersion: "AI-29.2", locale: input.locale, attachmentCount: input.attachments?.length ?? 0, providerHint: input.providerHint, webSearchEnabled: input.webSearchEnabled },
    })
    const resolvedIntent = this.resolveIntent({ ...input, prompt })
    const context = {
      ...this.getContext(input.userId, resolvedIntent.mode, input.preferredProvider),
      clientCapabilities: input.clientCapabilities,
    }
    const session = this.sessionService.getOrCreateSession({
      userId: input.userId,
      locale: input.locale ?? context.locale,
      mode: resolvedIntent.mode,
      provider: input.preferredProvider ?? context.provider,
      consent: context.consent,
      premiumEnabled: context.premiumEnabled,
      premiumPlanKey: context.premiumPlanKey,
      activePremiumFeatures: context.activePremiumFeatures,
    })
    const plan = this.buildPlan(resolvedIntent, context, input)
    const actions = this.buildActions(resolvedIntent, context, prompt, input)
    const safety = this.decideSafety(resolvedIntent, context, actions, input)
    const preparedAppAction = this.maybePrepareAppAction(input, resolvedIntent, safety)
    const createdTask = this.maybeCreateTask(input, resolvedIntent, actions, safety)
    const executionStatus = this.resolveExecutionStatus(safety, createdTask, input.autoExecute, preparedAppAction)
    const state = this.stateService.buildState({
      session,
      lastIntent: resolvedIntent.intent,
      lastRequestAt: new Date().toISOString(),
    })
    const answer = this.composeAnswer(resolvedIntent, actions, safety, executionStatus, createdTask, preparedAppAction)
    const historyEntry = this.historyService.log({
      userId: input.userId,
      kind: "chat",
      title: prompt.slice(0, 120) || "AI assistant orchestration",
      metadata: {
        source: input.source ?? "text",
        domain: resolvedIntent.domain,
        intent: resolvedIntent.intent,
        mode: resolvedIntent.mode,
        executionStatus,
        riskLevel: resolvedIntent.riskLevel,
        appActionKey: preparedAppAction?.definition.key,
        appActionStatus: preparedAppAction?.status,
        safetyReportId: safetyReport?.id,
        safetyReportCategory: safetyReport?.category,
        attachmentCount: input.attachments?.length ?? 0,
        providerHint: input.providerHint,
        webSearchEnabled: input.webSearchEnabled,
        voiceControlEnabled: input.voiceControlEnabled,
      },
    })

    this.personalizationService?.recordSignal({
      userId: input.userId,
      kind: resolvedIntent.intent === "translate"
        ? "translation"
        : resolvedIntent.intent === "search"
          ? "search"
          : resolvedIntent.intent === "task"
            ? "task"
            : resolvedIntent.intent === "app_action"
              ? "app_action"
              : "assistant_prompt",
      source: input.source === "voice" ? "user" : "assistant",
      summary: prompt.slice(0, 180),
      weight: resolvedIntent.confidence * 5,
      metadata: {
        source: input.source ?? "text",
        domain: resolvedIntent.domain,
        intent: resolvedIntent.intent,
        mode: resolvedIntent.mode,
        executionStatus,
        historyId: historyEntry.id,
        safetyReportId: safetyReport?.id,
        safetyReportCategory: safetyReport?.category,
          attachmentCount: input.attachments?.length ?? 0,
          providerHint: input.providerHint,
          webSearchEnabled: input.webSearchEnabled,
          voiceControlEnabled: input.voiceControlEnabled,
        },
    })

    return {
      id: createId("ai_assistant_run"),
      createdAt: new Date().toISOString(),
      session,
      state,
      context,
      resolvedIntent,
      plan,
      actions,
      safety,
      answer,
      executionStatus,
      appAction: preparedAppAction
        ? {
            prepared: preparedAppAction as unknown as Record<string, unknown>,
          }
        : undefined,
      safetyApproval: preparedAppAction?.safety.approval
        ? (preparedAppAction.safety.approval as unknown as Record<string, unknown>)
        : undefined,
      attachments: input.attachments,
      createdTask,
      historyEntry,
    }
  }

  private resolveIntent(input: AiAssistantOrchestrationInput): AiAssistantResolvedIntent {
    const normalizedPrompt = normalizePrompt(input.prompt)
    const lowered = normalizedPrompt.toLowerCase()
    const highRisk = includesAny(lowered, HIGH_RISK_WORDS)

    const routeTarget = this.resolveRoute(lowered)
    const domain = this.resolveDomain(lowered, routeTarget)
    const intent = this.intentForDomain(domain, lowered)
    const mode = input.preferredMode ?? this.modeForDomain(domain, lowered)
    const requiresConfirmation = highRisk || domain === "task" || domain === "memory" || domain === "wallet"
    const riskLevel = this.resolveRisk(domain, highRisk, lowered)

    return {
      domain,
      intent,
      mode,
      confidence: domain === "conversation" ? 0.56 : routeTarget ? 0.88 : 0.76,
      normalizedPrompt,
      languageHint: input.locale,
      entities: this.extractEntities(normalizedPrompt, domain),
      requiresConfirmation,
      riskLevel,
      routeTarget,
    }
  }

  private resolveDomain(lowered: string, routeTarget?: AiAssistantRouteTarget): AiAssistantDomain {
    if (includesAny(lowered, MEMORY_WORDS)) return "memory"
    if (includesAny(lowered, SEARCH_WORDS)) return "search"
    if (includesAny(lowered, TRANSLATION_WORDS)) return "translation"
    if (includesAny(lowered, BUSINESS_WORDS)) return "business"
    if (includesAny(lowered, EDUCATION_WORDS)) return "education"
    if (includesAny(lowered, TASK_WORDS)) return "task"
    if (includesAny(lowered, SETTINGS_WORDS)) return "settings"
    if (includesAny(lowered, PREMIUM_WORDS)) return "premium"
    if (includesAny(lowered, PROFILE_WORDS)) return "profile"
    if (includesAny(lowered, QR_WORDS)) return "qr"
    if (includesAny(lowered, MESSENGER_WORDS)) return "messenger"
    if (includesAny(lowered, WALLET_WORDS)) return "wallet"
    if (routeTarget) return "app_navigation"
    return "conversation"
  }

  private intentForDomain(domain: AiAssistantDomain, lowered: string): AiActionIntent {
    if (domain === "search") return "search"
    if (domain === "translation") return "translate"
    if (domain === "task") return "task"
    if (domain === "memory") return "memory"
    if (domain === "settings") return "settings"
    if (["wallet", "messenger", "profile", "qr", "premium", "app_navigation"].includes(domain)) return "app_action"
    if (includesAny(lowered, ["summary", "summarize", "кратко", "резюме"])) return "summarize"
    if (includesAny(lowered, ["analyze", "analysis", "проанализ", "разбор"])) return "analyze"
    if (includesAny(lowered, ["write", "draft", "compose", "напиши", "составь"])) return "draft"
    return "answer"
  }

  private modeForDomain(domain: AiAssistantDomain, lowered = ""): AiAssistantMode {
    if (domain === "search") return "search"
    if (domain === "translation") return "translation"
    if (domain === "business") return "business"
    if (domain === "education") {
      if (includesAny(lowered, ["abiturient", "абитуриент"])) return "abiturient"
      if (includesAny(lowered, ["teacher", "учитель", "преподаватель"])) return "teacher"
      if (includesAny(lowered, ["student", "студент"])) return "student"
      return "education"
    }
    return "general"
  }

  private resolveRisk(domain: AiAssistantDomain, highRisk: boolean, lowered: string): AiAssistantRiskLevel {
    if (highRisk) return "high"
    if (domain === "wallet") return includesAny(lowered, ["open", "открой", "покажи", "balance", "баланс"]) ? "low" : "high"
    if (domain === "memory" || domain === "task") return "medium"
    if (["settings", "premium"].includes(domain)) return "medium"
    if (["messenger", "profile", "qr", "app_navigation"].includes(domain)) return "low"
    return "none"
  }

  private resolveRoute(lowered: string): AiAssistantRouteTarget | undefined {
    if (includesAny(lowered, ["voice", "голос", "speech", "tts", "stt"])) {
      return { route: "/ai/voice", module: "ai", title: "AI voice" }
    }
    if (includesAny(lowered, ["coin wallet", "coin", "коин"])) {
      return { route: "/wallet/coin", module: "wallet", title: "Coin Wallet" }
    }
    if (includesAny(lowered, WALLET_WORDS)) {
      return { route: "/wallet/home", module: "wallet", title: "Sabi Wallet" }
    }
    if (includesAny(lowered, MESSENGER_WORDS)) {
      return { route: "/messenger", module: "messenger", title: "Sabi Messenger" }
    }
    if (includesAny(lowered, PROFILE_WORDS)) {
      return { route: "/profile", module: "profile", title: "Profile" }
    }
    if (includesAny(lowered, QR_WORDS)) {
      return { route: "/qr", module: "qr", title: "QR" }
    }
    if (includesAny(lowered, PREMIUM_WORDS)) {
      return { route: "/profile/premium", module: "premium", title: "Premium" }
    }
    if (includesAny(lowered, SETTINGS_WORDS)) {
      return { route: "/profile/ai", module: "settings", title: "AI settings" }
    }
    return undefined
  }

  private extractEntities(prompt: string, domain: AiAssistantDomain): Record<string, string> {
    const entities: Record<string, string> = {}
    const quoted = extractQuotedValue(prompt)
    if (quoted) entities.quotedText = quoted
    if (domain === "translation") {
      const toMatch = prompt.match(/(?:to|на|в)\s+([a-zа-яё-]{2,30})/i)
      if (toMatch?.[1]) entities.targetLanguage = toMatch[1].toLowerCase()
    }
    return entities
  }

  private buildPlan(
    intent: AiAssistantResolvedIntent,
    context: AiAssistantContextSnapshot,
    input: AiAssistantOrchestrationInput,
  ): AiActionPlan {
    const capabilities = this.requiredCapabilitiesFor(intent.domain, intent.intent, input)
    const executionPolicy: AiExecutionPolicy = intent.requiresConfirmation ? "confirm_required" : intent.intent === "draft" ? "suggest_only" : "read_only"
    const requiresInternet =
      intent.domain === "search" ||
      input.webSearchEnabled === true ||
      input.providerHint === "google_search" ||
      input.providerHint === "google_translate"
    return {
      intent: intent.intent,
      executionPolicy,
      requiresInternet,
      requiresProviderSelection: requiresInternet || input.providerHint === "chatgpt" || input.providerHint === "openai",
      requiresExplicitConfirmation: intent.requiresConfirmation,
      requiredCapabilities: capabilities,
      summary: `AI-29.2 orchestrator routed ${intent.domain} intent with ${intent.riskLevel} risk, multimodal context, provider routing, and safe approval policy.`,
    }
  }

  private requiredCapabilitiesFor(domain: AiAssistantDomain, intent: AiActionIntent, input?: AiAssistantOrchestrationInput): AiCapability[] {
    if (domain === "search") return ["search_web", "google_search_gateway"]
    if (domain === "translation") return ["translate_text", "google_translate_gateway"]
    if (domain === "business") return ["analyze_business"]
    if (domain === "education") return ["plan_study", "explain_concepts"]
    if (domain === "memory") return ["assistant_orchestration"]
    if (intent === "app_action") return ["run_app_action"]
    if (intent === "settings") return ["manage_ai_settings"]
    return input?.attachments?.length ? ["answer_basic", "assistant_orchestration", "multimodal_attachments"] : ["answer_basic", "assistant_orchestration", "chatgpt_provider"]
  }

  private buildActions(
    intent: AiAssistantResolvedIntent,
    context: AiAssistantContextSnapshot,
    prompt: string,
    input: AiAssistantOrchestrationInput,
  ): AiAssistantActionCandidate[] {
    const actions: AiAssistantActionCandidate[] = []
    if (intent.routeTarget) {
      actions.push({
        id: createId("ai_action"),
        type: "open_route",
        title: `Open ${intent.routeTarget.title}`,
        description: `Navigate to ${intent.routeTarget.route}.`,
        executionPolicy: intent.riskLevel === "high" ? "confirm_required" : "suggest_only",
        requiresConfirmation: intent.riskLevel !== "none",
        riskLevel: intent.riskLevel,
        routeTarget: intent.routeTarget,
      })
    }

    if (input.attachments?.length) {
      actions.push({
        id: createId("ai_action"),
        type: "client_dispatch",
        title: "Attach files to AI context",
        description: "Photo, video, document, and audio files are attached as context and routed to the configured provider gateway when needed.",
        executionPolicy: "read_only",
        requiresConfirmation: false,
        riskLevel: "low",
        payload: { attachmentCount: input.attachments.length, attachments: input.attachments },
      })
    }

    if (intent.domain === "search" || input.webSearchEnabled) {
      actions.push({
        id: createId("ai_action"),
        type: "search",
        title: "Prepare AI search",
        description: "Route the request to configured search provider after permission and premium checks.",
        executionPolicy: context.consent.internetSearchAllowed ? "read_only" : "confirm_required",
        requiresConfirmation: !context.consent.internetSearchAllowed,
        riskLevel: "low",
        payload: { query: prompt, provider: input.providerHint === "google_search" ? "google" : context.provider, providerHint: input.providerHint },
      })
    }

    if (intent.domain === "translation" || input.providerHint === "google_translate") {
      actions.push({
        id: createId("ai_action"),
        type: "translate",
        title: "Prepare translation",
        description: "Route text/media translation to the translation core.",
        executionPolicy: context.consent.toolExecutionAllowed ? "suggest_only" : "confirm_required",
        requiresConfirmation: !context.consent.toolExecutionAllowed,
        riskLevel: "low",
        payload: { text: intent.entities.quotedText ?? prompt, targetLanguage: intent.entities.targetLanguage, provider: "google", providerHint: input.providerHint },
      })
    }

    if (intent.domain === "memory") {
      actions.push({
        id: createId("ai_action"),
        type: "save_memory",
        title: "Save memory after consent",
        description: "Save the provided preference or instruction only if memory write permission is enabled.",
        executionPolicy: "confirm_required",
        requiresConfirmation: true,
        riskLevel: "medium",
        payload: { value: intent.entities.quotedText ?? prompt },
      })
    }

    if (intent.domain === "task") {
      actions.push({
        id: createId("ai_action"),
        type: "create_task",
        title: "Create AI task",
        description: "Create a task in awaiting confirmation state before execution.",
        executionPolicy: "confirm_required",
        requiresConfirmation: true,
        riskLevel: "medium",
        payload: { title: prompt, mode: intent.mode },
      })
    }

    if (actions.length === 0) {
      actions.push({
        id: createId("ai_action"),
        type: "none",
        title: "Answer in AI workspace",
        description: "No external tool or app action is required for this request.",
        executionPolicy: "read_only",
        requiresConfirmation: false,
        riskLevel: "none",
      })
    }

    return actions
  }

  private decideSafety(
    intent: AiAssistantResolvedIntent,
    context: AiAssistantContextSnapshot,
    actions: AiAssistantActionCandidate[],
    input: AiAssistantOrchestrationInput,
  ): AiAssistantSafetyDecision {
    if (!context.consent.readAccessAllowed && intent.domain !== "settings") {
      return {
        allowed: false,
        requiresConfirmation: true,
        riskLevel: "medium",
        blockedReason: "AI read access is disabled for this user.",
        confirmationReason: "Enable read access in AI permissions to use contextual assistant actions.",
      }
    }

    if ((input.webSearchEnabled || input.providerHint === "google_search") && !context.consent.internetSearchAllowed) {
      return {
        allowed: false,
        requiresConfirmation: true,
        riskLevel: "medium",
        blockedReason: "Internet search is disabled until the user grants AI internet-search permission.",
        confirmationReason: "Enable internet search permission before routing requests to Google Search.",
      }
    }

    if (intent.riskLevel === "high") {
      return {
        allowed: true,
        requiresConfirmation: true,
        riskLevel: "high",
        confirmationReason: "Money, payment, account deletion, and destructive actions require a separate explicit confirmation flow. AI can only prepare a client command, never execute it automatically.",
      }
    }

    const needsConfirmation = intent.requiresConfirmation || actions.some((action) => action.requiresConfirmation)
    if (needsConfirmation && !input.confirmActionId) {
      return {
        allowed: true,
        requiresConfirmation: true,
        riskLevel: intent.riskLevel,
        confirmationReason: "This action is prepared but waiting for explicit user confirmation.",
      }
    }

    return {
      allowed: true,
      requiresConfirmation: false,
      riskLevel: intent.riskLevel,
    }
  }

  private maybePrepareAppAction(
    input: AiAssistantOrchestrationInput,
    intent: AiAssistantResolvedIntent,
    safety: AiAssistantSafetyDecision,
  ): AiPreparedAppAction | undefined {
    if (!safety.allowed) return undefined
    if (intent.intent !== "app_action" && !intent.routeTarget) return undefined

    const resolved = this.appActionsService.resolve({
      userId: input.userId,
      prompt: intent.normalizedPrompt,
      locale: input.locale,
      mode: intent.mode,
      preferredProvider: input.preferredProvider,
      params: input.metadata,
    })
    const best = resolved.bestCandidate
    if (!best) return undefined

    const metadataParams = input.metadata?.appActionParams
    const explicitParams =
      typeof metadataParams === "object" && metadataParams !== null
        ? (metadataParams as Record<string, unknown>)
        : {}

    return this.appActionsService.prepare({
      userId: input.userId,
      actionKey: best.definition.key,
      locale: input.locale,
      source: input.source === "voice" ? "voice" : input.source === "quick_action" ? "quick_action" : "assistant",
      autoDispatch: Boolean(input.autoExecute && !best.definition.requiresConfirmation && best.definition.riskLevel === "low"),
      params: {
        ...best.extractedParams,
        ...explicitParams,
      },
      metadata: {
        orchestratorVersion: "AI-29.2",
        assistantDomain: intent.domain,
        assistantIntent: intent.intent,
        riskLevel: intent.riskLevel,
        prompt: intent.normalizedPrompt,
        providerHint: input.providerHint,
        attachmentCount: input.attachments?.length ?? 0,
      },
    })
  }

  private maybeCreateTask(
    input: AiAssistantOrchestrationInput,
    intent: AiAssistantResolvedIntent,
    actions: AiAssistantActionCandidate[],
    safety: AiAssistantSafetyDecision,
  ) {
    const shouldCreate = intent.domain === "task" || actions.some((action) => action.type === "create_task")
    if (!shouldCreate || !safety.allowed) return undefined

    return this.taskService.create({
      userId: input.userId,
      title: intent.normalizedPrompt.slice(0, 160) || "AI task",
      mode: intent.mode,
      requiresConfirmation: true,
      metadata: {
        source: input.source ?? "text",
        orchestratorVersion: "AI-29.2",
        riskLevel: intent.riskLevel,
      },
    })
  }

  private resolveExecutionStatus(
    safety: AiAssistantSafetyDecision,
    createdTask: unknown,
    autoExecute?: boolean,
    preparedAppAction?: AiPreparedAppAction,
  ): AiAssistantExecutionStatus {
    if (!safety.allowed) return "blocked"
    if (preparedAppAction?.status === "blocked") return "blocked"
    if (preparedAppAction?.status === "awaiting_confirmation") return "awaiting_confirmation"
    if (preparedAppAction?.status === "dispatched") return "completed"
    if (safety.requiresConfirmation || createdTask) return "awaiting_confirmation"
    if (autoExecute) return "completed"
    return "planned"
  }

  private composeAnswer(
    intent: AiAssistantResolvedIntent,
    actions: AiAssistantActionCandidate[],
    safety: AiAssistantSafetyDecision,
    executionStatus: AiAssistantExecutionStatus,
    createdTask?: unknown,
    preparedAppAction?: AiPreparedAppAction,
  ): AiAssistantAnswer {
    if (!safety.allowed) {
      return {
        text: safety.blockedReason ?? "This AI action is blocked by the current safety policy.",
        messageKey: "ai.assistant.blocked",
        tone: "safety",
        suggestions: [safety.confirmationReason ?? "Review AI permissions and confirmation requirements."],
      }
    }

    if (preparedAppAction?.status === "blocked") {
      return {
        text: preparedAppAction.safety.blockedReason ?? "This app action is blocked by AI action policy.",
        messageKey: "ai.assistant.app_action_blocked",
        tone: "safety",
        suggestions: [preparedAppAction.confirmation?.reason ?? "Open the final screen manually and confirm there."],
      }
    }

    if (executionStatus === "awaiting_confirmation") {
      return {
        text: preparedAppAction
          ? `AI prepared ${preparedAppAction.definition.title}. It is waiting for confirmation before client dispatch.`
          : createdTask
            ? "AI prepared a task and moved it to awaiting confirmation."
            : "AI prepared the action, but it requires confirmation before execution.",
        messageKey: preparedAppAction ? "ai.assistant.app_action_awaiting_confirmation" : "ai.assistant.awaiting_confirmation",
        tone: "action_ready",
        suggestions: preparedAppAction
          ? [preparedAppAction.clientCommand.route ?? preparedAppAction.definition.key, preparedAppAction.confirmation?.reason ?? "Confirm before execution"]
          : actions.map((action) => action.title).slice(0, 3),
      }
    }

    if (preparedAppAction?.status === "dispatched") {
      return {
        text: `AI prepared a client dispatch command for ${preparedAppAction.definition.title}.`,
        messageKey: "ai.assistant.app_action_dispatch_ready",
        tone: "action_ready",
        suggestions: [preparedAppAction.clientCommand.route ?? preparedAppAction.definition.key],
      }
    }

    if (intent.routeTarget) {
      return {
        text: `AI resolved the request to ${intent.routeTarget.title} and prepared a safe route action.`,
        messageKey: "ai.assistant.route_ready",
        tone: "action_ready",
        suggestions: [intent.routeTarget.route],
      }
    }

    return {
      text: `AI understood this as ${intent.domain}. The assistant brain prepared context, safety, app actions, and client-dispatch routing without executing unsafe operations automatically.`,
      messageKey: "ai.assistant.planned",
      tone: "helpful",
      suggestions: actions.map((action) => action.description).slice(0, 3),
    }
  }
}
