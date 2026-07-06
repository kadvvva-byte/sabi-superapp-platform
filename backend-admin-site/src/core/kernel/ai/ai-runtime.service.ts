import { AssistantStateService } from "./assistant-state.service"
import { AiBusinessAssistantService } from "./ai-business-assistant.service"
import { AiConsentService } from "./ai-consent.service"
import { AiEducationAssistantService } from "./ai-education-assistant.service"
import { AiHistoryService } from "./ai-history.service"
import { AiLocaleBindingService } from "./ai-locale-binding.service"
import { AiMemoryService } from "./ai-memory.service"
import { AiNotificationIntegrationService } from "./ai-notification-integration.service"
import { AiPremiumCoinAccessService } from "./ai-premium-coin-access.service"
import { AiProviderSettingsService } from "./ai-provider-settings.service"
import { AiSearchService } from "./ai-search.service"
import { AiSessionService } from "./ai-session.service"
import { AiSmartActionsRouterService } from "./ai-smart-actions-router.service"
import { AiTaskService } from "./ai-task.service"
import { AiTranslationService } from "./ai-translation.service"
import {
  type AiBusinessAnalysisRequest,
  type AiCoinPurchasePreviewInput,
  type AiEducationRequest,
  type AiMemoryKind,
  type AiMemorySaveInput,
  type AiMemorySuggestion,
  type AiNotificationKind,
  type AiPremiumGrantInput,
  type AiProviderSettingsUpdateInput,
  type AiRequestInput,
  type AiRuntimeResponse,
  type AiSearchRequest,
  type AiSearchResponse,
  type AiTaskCreateInput,
  type AiTaskStatus,
  type AiTranslationRequest,
} from "./ai.types"

export class AiRuntimeService {
  constructor(
    private readonly sessionService: AiSessionService,
    private readonly stateService: AssistantStateService,
    private readonly router: AiSmartActionsRouterService,
    private readonly searchService: AiSearchService,
    private readonly consentService: AiConsentService,
    private readonly memoryService: AiMemoryService,
    private readonly businessAssistant: AiBusinessAssistantService,
    private readonly educationAssistant: AiEducationAssistantService,
    private readonly translationService: AiTranslationService,
    private readonly premiumService: AiPremiumCoinAccessService,
    private readonly providerSettingsService: AiProviderSettingsService,
    private readonly localeBindingService: AiLocaleBindingService,
    private readonly aiNotificationIntegrationService: AiNotificationIntegrationService,
    private readonly historyService: AiHistoryService,
    private readonly taskService: AiTaskService,
  ) {}

  handle(input: AiRequestInput): AiRuntimeResponse {
    const consent = this.consentService.getConsent(input.userId)
    const premiumAccess = this.premiumService.getUserAccess(input.userId)
    const locale = input.locale ?? this.localeBindingService.getLocale(input.userId).locale
    const session = this.sessionService.getOrCreateSession({
      userId: input.userId,
      locale,
      mode: input.preferredMode,
      provider: this.providerSettingsService.resolveSearchProvider({
        userId: input.userId,
        preferredProvider: input.preferredProvider,
        mode: input.preferredMode,
      }),
      premiumEnabled: premiumAccess.premiumEnabled,
      premiumPlanKey: premiumAccess.planKey,
      activePremiumFeatures: premiumAccess.activeFeatures,
      coinBalance: premiumAccess.coinBalance,
      consent,
    })

    const plan = this.router.route(input)
    const state = this.stateService.buildState({
      session,
      lastIntent: plan.intent,
      lastRequestAt: new Date().toISOString(),
    })

    this.historyService.log({
      userId: input.userId,
      kind: "chat",
      title: input.prompt.trim().slice(0, 120) || "AI chat request",
      metadata: {
        mode: session.mode,
        provider: session.defaultProvider,
        intent: plan.intent,
      },
    })

    return { session, state, plan }
  }

  async search(request: AiSearchRequest): Promise<AiSearchResponse> {
    if (!request.userId) {
      throw new Error("AI search request requires userId")
    }

    if (!request.query.trim()) {
      throw new Error("AI search request requires a non-empty query")
    }

    const consent = this.consentService.getConsent(request.userId)
    if (!consent.internetSearchAllowed) {
      throw new Error("AI internet search is blocked until the user grants permission")
    }

    const provider = this.providerSettingsService.resolveSearchProvider({
      userId: request.userId,
      preferredProvider: request.preferredProvider,
      mode: this.sessionService.getSession(request.userId)?.mode ?? "search",
    })
    if (provider !== "internal") {
      const access = this.premiumService.resolveFeatureAccess({
        userId: request.userId,
        feature: "ai_search_external",
      })
      if (!access.allowed) {
        throw new Error(access.reason)
      }
    }

    const response = await this.searchService.search({
      ...request,
      preferredProvider: provider,
    })
    this.historyService.log({
      userId: request.userId,
      kind: "search",
      title: request.query.trim().slice(0, 120),
      metadata: {
        provider: response.provider,
        vertical: response.vertical,
        resultCount: response.results.length,
      },
    })
    this.aiNotificationIntegrationService.publish({
      userId: request.userId,
      kind: "search_completed",
      params: {
        query: request.query,
        resultCount: response.results.length,
        provider: response.provider,
      },
    })
    return response
  }

  async translate(request: AiTranslationRequest) {
    if (!request.userId) {
      throw new Error("AI translation request requires userId")
    }

    const consent = this.consentService.getConsent(request.userId)
    if (!consent.readAccessAllowed || !consent.toolExecutionAllowed) {
      throw new Error("AI translation requires read access and tool execution consent")
    }

    if (request.contentType === "text" && !request.text?.trim()) {
      throw new Error("AI text translation requires text")
    }

    if (request.contentType !== "text" && !request.transcript?.trim() && !request.mediaUrl?.trim()) {
      throw new Error("AI media translation requires either transcript or mediaUrl")
    }

    if (["audio_message", "video_message"].includes(request.contentType)) {
      const access = this.premiumService.resolveFeatureAccess({
        userId: request.userId,
        feature: "ai_translation_media",
      })
      if (!access.allowed) {
        throw new Error(access.reason)
      }
    }

    if (request.contentType === "call") {
      const access = this.premiumService.resolveFeatureAccess({
        userId: request.userId,
        feature: "ai_translation_realtime",
      })
      if (!access.allowed) {
        throw new Error(access.reason)
      }
    }

    const translationProvider = this.providerSettingsService.resolveTranslationProvider({
      userId: request.userId,
      preferredProvider: request.preferredProvider,
      mode: "translation",
    })

    const response = await this.translationService.translate({
      ...request,
      preferredProvider: translationProvider,
    })
    this.historyService.log({
      userId: request.userId,
      kind: "translation",
      title: `${request.contentType} → ${response.targetLanguage}`,
      metadata: {
        provider: response.provider,
        sourceLanguage: response.sourceLanguage,
        targetLanguage: response.targetLanguage,
      },
    })
    this.aiNotificationIntegrationService.publish({
      userId: request.userId,
      kind: "translation_ready",
      params: {
        contentType: request.contentType,
        provider: response.provider,
        targetLanguage: response.targetLanguage,
      },
    })
    return response
  }

  getSearchProviderManifest() {
    return this.searchService.getProviderManifest()
  }

  getTranslationProviderManifest() {
    return this.translationService.getProviderManifest()
  }

  getPremiumCatalog() {
    return this.premiumService.getCatalog()
  }

  getPremiumAccess(userId: string) {
    return this.premiumService.getUserAccess(userId)
  }

  previewCoinPurchase(input: AiCoinPurchasePreviewInput) {
    return this.premiumService.previewPurchase(input)
  }

  grantPremiumAccess(input: AiPremiumGrantInput) {
    const access = this.premiumService.grantPremiumAccess(input)
    const session = this.sessionService.getOrCreateSession({
      userId: input.userId,
      premiumEnabled: access.premiumEnabled,
      premiumPlanKey: access.planKey,
      activePremiumFeatures: access.activeFeatures,
      coinBalance: access.coinBalance,
      consent: this.consentService.getConsent(input.userId),
    })

    this.aiNotificationIntegrationService.publish({
      userId: input.userId,
      kind: "premium_unlocked",
      params: {
        planKey: access.planKey,
        activeFeatures: access.activeFeatures,
      },
    })

    return { access, session }
  }

  revokePremiumAccess(userId: string) {
    const access = this.premiumService.revokePremiumAccess(userId)
    const session = this.sessionService.getOrCreateSession({
      userId,
      premiumEnabled: access.premiumEnabled,
      premiumPlanKey: access.planKey,
      activePremiumFeatures: access.activeFeatures,
      coinBalance: access.coinBalance,
      consent: this.consentService.getConsent(userId),
    })

    return { access, session }
  }

  getConsent(userId: string) {
    return this.consentService.getConsent(userId)
  }

  getConsentAudit(userId: string) {
    return this.consentService.getAuditTrail(userId)
  }

  updateConsent(input: Parameters<AiConsentService["updateConsent"]>[0]) {
    const nextConsent = this.consentService.updateConsent(input)
    const premiumAccess = this.premiumService.getUserAccess(input.userId)
    const session = this.sessionService.getOrCreateSession({
      userId: input.userId,
      consent: nextConsent,
      premiumEnabled: premiumAccess.premiumEnabled,
      premiumPlanKey: premiumAccess.planKey,
      activePremiumFeatures: premiumAccess.activeFeatures,
      coinBalance: premiumAccess.coinBalance,
    })
    return { consent: nextConsent, session }
  }

  listMemory(userId: string, options?: { kind?: AiMemoryKind; tag?: string }) {
    return this.memoryService.listMemory(userId, options)
  }

  getMemorySummary(userId: string) {
    return this.memoryService.getMemorySummary(userId)
  }

  saveMemory(input: AiMemorySaveInput) {
    const premiumAccess = this.premiumService.getUserAccess(input.userId)
    const session = this.sessionService.getOrCreateSession({
      userId: input.userId,
      consent: this.consentService.getConsent(input.userId),
      premiumEnabled: premiumAccess.premiumEnabled,
      premiumPlanKey: premiumAccess.planKey,
      activePremiumFeatures: premiumAccess.activeFeatures,
      coinBalance: premiumAccess.coinBalance,
    })

    return {
      session,
      entry: this.memoryService.saveMemory(input),
      summary: this.memoryService.getMemorySummary(input.userId),
    }
  }

  removeMemory(userId: string, entryId: string) {
    return {
      result: this.memoryService.removeMemory(userId, entryId),
      summary: this.memoryService.getMemorySummary(userId),
    }
  }

  clearMemory(userId: string) {
    return {
      result: this.memoryService.clearMemory(userId),
      summary: this.memoryService.getMemorySummary(userId),
    }
  }

  createMemorySuggestion(input: {
    userId: string
    kind: AiMemoryKind
    label: string
    value: string
    reason: string
  }): AiMemorySuggestion {
    const suggestion = this.memoryService.createSuggestion(input)
    this.aiNotificationIntegrationService.publish({
      userId: input.userId,
      kind: "memory_suggestion",
      params: {
        label: input.label,
      },
    })
    return suggestion
  }

  getLocaleBinding(userId: string) {
    return this.localeBindingService.getLocale(userId)
  }

  updateLocaleBinding(input: { userId: string; locale: string; source?: "default" | "user" | "session" }) {
    const locale = this.localeBindingService.updateLocale(input)
    const premiumAccess = this.premiumService.getUserAccess(input.userId)
    const session = this.sessionService.getOrCreateSession({
      userId: input.userId,
      locale: locale.locale,
      consent: this.consentService.getConsent(input.userId),
      premiumEnabled: premiumAccess.premiumEnabled,
      premiumPlanKey: premiumAccess.planKey,
      activePremiumFeatures: premiumAccess.activeFeatures,
      coinBalance: premiumAccess.coinBalance,
    })
    return { locale, session }
  }

  getProviderSettings(userId: string) {
    return this.providerSettingsService.getSettings(userId)
  }

  updateProviderSettings(input: AiProviderSettingsUpdateInput) {
    const settings = this.providerSettingsService.updateSettings(input)
    const access = this.premiumService.getUserAccess(input.userId)
    const session = this.sessionService.getOrCreateSession({
      userId: input.userId,
      provider: settings.searchProvider,
      consent: this.consentService.getConsent(input.userId),
      premiumEnabled: access.premiumEnabled,
      premiumPlanKey: access.planKey,
      activePremiumFeatures: access.activeFeatures,
      coinBalance: access.coinBalance,
      locale: this.localeBindingService.getLocale(input.userId).locale,
    })
    return { settings, session }
  }

  resetProviderSettings(userId: string) {
    const settings = this.providerSettingsService.resetSettings(userId)
    const access = this.premiumService.getUserAccess(userId)
    const session = this.sessionService.getOrCreateSession({
      userId,
      provider: settings.searchProvider,
      consent: this.consentService.getConsent(userId),
      premiumEnabled: access.premiumEnabled,
      premiumPlanKey: access.planKey,
      activePremiumFeatures: access.activeFeatures,
      coinBalance: access.coinBalance,
      locale: this.localeBindingService.getLocale(userId).locale,
    })
    return { settings, session }
  }

  configureSession(input: { userId: string; locale?: string; mode?: import("./ai.types").AiAssistantMode; provider?: import("./ai.types").AiProviderKey }) {
    return this.sessionService.updateSession(input.userId, {
      locale: input.locale,
      mode: input.mode,
      provider: input.provider,
    })
  }

  getAiNotificationManifest() {
    return this.aiNotificationIntegrationService.getManifest()
  }

  listAiNotifications(userId: string) {
    return this.aiNotificationIntegrationService.list(userId)
  }

  publishAiNotification(input: { userId: string; kind: AiNotificationKind; params?: Record<string, unknown>; actorUserId?: string }) {
    return this.aiNotificationIntegrationService.publish(input)
  }

  listHistory(userId: string, limit?: number) {
    return this.historyService.list(userId, limit)
  }

  createTask(input: AiTaskCreateInput) {
    return this.taskService.create(input)
  }

  listTasks(userId: string, status?: AiTaskStatus, limit?: number) {
    return this.taskService.list(userId, status, limit)
  }

  updateTaskStatus(userId: string, taskId: string, status: AiTaskStatus) {
    return this.taskService.update({ userId, taskId, status })
  }

  analyzeBusiness(input: AiBusinessAnalysisRequest) {
    if (!input.userId) {
      throw new Error("AI business assistant requires userId")
    }

    const access = this.premiumService.resolveFeatureAccess({
      userId: input.userId,
      feature: "ai_business_assistant",
    })
    if (!access.allowed) {
      throw new Error(access.reason)
    }

    const consent = this.consentService.getConsent(input.userId)
    const premiumAccess = this.premiumService.getUserAccess(input.userId)
    const session = this.sessionService.getOrCreateSession({
      userId: input.userId,
      locale: input.locale,
      mode: "business",
      consent,
      premiumEnabled: premiumAccess.premiumEnabled,
      premiumPlanKey: premiumAccess.planKey,
      activePremiumFeatures: premiumAccess.activeFeatures,
      coinBalance: premiumAccess.coinBalance,
    })

    const analysis = this.businessAssistant.analyze(input)
    const dominantExpense = analysis.topExpenseCategories[0]
    const memorySuggestion = dominantExpense
      ? this.memoryService.createSuggestion({
          userId: input.userId,
          kind: "business_context",
          label: `Primary expense category${analysis.periodLabel ? ` (${analysis.periodLabel})` : ""}`,
          value: dominantExpense.category,
          reason: "Save the current dominant expense category for future business analysis.",
        })
      : null

    this.historyService.log({
      userId: input.userId,
      kind: "business",
      title: analysis.periodLabel ? `Business summary: ${analysis.periodLabel}` : "Business summary",
      metadata: {
        currencies: analysis.currencies,
        recordCount: analysis.recordCount,
      },
    })
    this.aiNotificationIntegrationService.publish({
      userId: input.userId,
      kind: "business_summary_ready",
      params: {
        periodLabel: analysis.periodLabel,
        currencies: analysis.currencies,
      },
    })

    return { session, access, analysis, memorySuggestion }
  }

  assistEducation(input: AiEducationRequest) {
    if (!input.userId) {
      throw new Error("AI education assistant requires userId")
    }

    const access = this.premiumService.resolveFeatureAccess({
      userId: input.userId,
      feature: "ai_education_assistant",
    })
    if (!access.allowed) {
      throw new Error(access.reason)
    }

    const consent = this.consentService.getConsent(input.userId)
    const premiumAccess = this.premiumService.getUserAccess(input.userId)
    const session = this.sessionService.getOrCreateSession({
      userId: input.userId,
      locale: input.locale,
      mode: "education",
      consent,
      premiumEnabled: premiumAccess.premiumEnabled,
      premiumPlanKey: premiumAccess.planKey,
      activePremiumFeatures: premiumAccess.activeFeatures,
      coinBalance: premiumAccess.coinBalance,
    })

    const education = this.educationAssistant.assist(input)
    const focusTopic = input.weakTopics?.[0] ?? education.normalizedTopics[0]?.title
    const memorySuggestion = focusTopic
      ? this.memoryService.createSuggestion({
          userId: input.userId,
          kind: "study_context",
          label: `Current focus in ${education.subject}`,
          value: focusTopic,
          reason: "Save the main study focus to continue the learning plan later.",
        })
      : null

    this.historyService.log({
      userId: input.userId,
      kind: "education",
      title: `${education.subject} · ${education.taskType}`,
      metadata: {
        learnerLevel: education.learnerLevel,
        topicCount: education.topicCount,
      },
    })
    this.aiNotificationIntegrationService.publish({
      userId: input.userId,
      kind: "education_plan_ready",
      params: {
        subject: education.subject,
        taskType: education.taskType,
      },
    })

    return { session, access, education, memorySuggestion }
  }
}
