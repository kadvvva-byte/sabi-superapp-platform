import { AiAppActionsService } from "./ai-app-actions.service"
import { NotificationService } from "../../../modules/notification/application/services/notification.service"
import { AiAssistantOrchestratorService } from "./ai-assistant-orchestrator.service"
import { AssistantStateService } from "./assistant-state.service"
import { AiBusinessAssistantService } from "./ai-business-assistant.service"
import { AiConsentService } from "./ai-consent.service"
import { AiEducationAssistantService } from "./ai-education-assistant.service"
import { AiHistoryService } from "./ai-history.service"
import { AiLocaleBindingService } from "./ai-locale-binding.service"
import { AiMemoryService } from "./ai-memory.service"
import { AiNotificationIntegrationService } from "./ai-notification-integration.service"
import { AiPersistenceService } from "./ai-persistence.service"
import { AiPersonalizationRuntimeService } from "./ai-personalization.service"
import { AiPremiumCoinAccessService } from "./ai-premium-coin-access.service"
import { AiRealtimeTranslationService } from "./ai-realtime-translation.service"
import { AiSafetyAdminService } from "./ai-safety-admin.service"
import { AiProviderSettingsService } from "./ai-provider-settings.service"
import { AiProviderRegistryService } from "./ai-provider-registry.service"
import { AiProviderRouterService } from "./ai-provider-router.service"
import { AiSafetyApprovalService } from "./ai-safety-approval.service"
import { AiRuntimeService } from "./ai-runtime.service"
import { AiSearchService } from "./ai-search.service"
import { AiSessionService } from "./ai-session.service"
import { AiSmartActionsRouterService } from "./ai-smart-actions-router.service"
import { AiTaskService } from "./ai-task.service"
import { AiTranslationProviderRegistryService } from "./ai-translation-provider-registry.service"
import { AiTranslationService } from "./ai-translation.service"
import { AiVoiceService } from "./ai-voice.service"
import type {
  AiAppActionModule,
  AiAppActionResolveInput,
  AiCancelAppActionInput,
  AiConfirmAppActionInput,
  AiPrepareAppActionInput,
} from "./ai-app-actions.types"
import {
  type AiAssistantMode,
  type AiAssistantOrchestrationInput,
  type AiBusinessAnalysisRequest,
  type AiCoinPurchasePreviewInput,
  type AiConsentUpdateInput,
  type AiEducationRequest,
  type AiMemoryKind,
  type AiMemorySaveInput,
  type AiNotificationKind,
  type AiPremiumGrantInput,
  type AiProviderSettingsUpdateInput,
  type AiProviderKey,
  type AiRequestInput,
  type AiSearchRequest,
  type AiTaskCreateInput,
  type AiTaskStatus,
  type AiTranslationRequest,
} from "./ai.types"
import type {
  AiRealtimeTranslationSegmentInput,
  AiRealtimeTranslationSessionCreateInput,
  AiRealtimeTranslationSessionStatus,
  AiRealtimeTranslationSessionUpdateInput,
} from "./ai-realtime-translation.types"
import type {
  AiNativeVoiceBridgeBindRequestContract,
  AiNativeVoiceClientEventContract,
  AiVoiceInterruptRequestContract,
  AiVoiceInvokeRequestContract,
  AiVoicePlaybackRequestContract,
  AiVoiceSynthesisRequestContract,
  AiVoiceTranscriptionRequestContract,
  AiStartVoiceSessionRequestContract,
  AiUpdateVoiceSessionRequestContract,
} from "./ai-voice.types"
import type {
  AiPersonalizationContextInput,
  AiPersonalizationInstructionInput,
  AiPersonalizationPreferenceUpdateInput,
  AiPersonalizationPrivacyMode,
  AiPersonalizationSignalInput,
} from "./ai-personalization.types"
import type {
  AiSafetyAdminNoteInput,
  AiSafetyReportCreateInput,
  AiSafetyReportFilter,
  AiSafetyReportStatusUpdateInput,
  AiSafetyTextSignalInput,
} from "./ai-safety-admin.types"
import type { AiProviderResolveRequest } from "./ai-provider-router.types"
import type { AiSafetyApprovalRequest } from "./ai-safety-approval.types"
import { GoogleSearchProvider } from "./providers/google-search.provider"
import { GoogleTranslationProvider } from "./providers/google-translation.provider"
import { InternalSearchProvider } from "./providers/internal-search.provider"
import { InternalTranslationProvider } from "./providers/internal-translation.provider"

export type AiFacadeServiceInput = {
  notificationService?: NotificationService
  localeBindingService?: AiLocaleBindingService
  persistenceService?: AiPersistenceService
}

export class AiFacadeService {
  private readonly persistenceService?: AiPersistenceService
  private readonly consentService: AiConsentService
  private readonly sessionService: AiSessionService
  private readonly stateService = new AssistantStateService()
  private readonly router = new AiSmartActionsRouterService()
  private readonly providerRegistry = new AiProviderRegistryService()
  private readonly translationProviderRegistry = new AiTranslationProviderRegistryService()
  private readonly premiumService = new AiPremiumCoinAccessService()
  private readonly providerSettingsService = new AiProviderSettingsService()
  private readonly providerRouterService: AiProviderRouterService
  private readonly safetyApprovalService = new AiSafetyApprovalService()
  private readonly localeBindingService: AiLocaleBindingService
  private readonly notificationService: NotificationService
  private readonly aiNotificationIntegrationService: AiNotificationIntegrationService
  private readonly historyService: AiHistoryService
  private readonly taskService: AiTaskService
  private readonly searchService: AiSearchService
  private readonly translationService: AiTranslationService
  private readonly memoryService: AiMemoryService
  private readonly businessAssistant = new AiBusinessAssistantService()
  private readonly educationAssistant = new AiEducationAssistantService()
  private readonly runtime: AiRuntimeService
  private readonly assistantOrchestrator: AiAssistantOrchestratorService
  private readonly appActionsService = new AiAppActionsService()
  private readonly voiceService = new AiVoiceService()
  private readonly personalizationService: AiPersonalizationRuntimeService
  private readonly realtimeTranslationService: AiRealtimeTranslationService
  private readonly safetyAdminService: AiSafetyAdminService

  constructor(input?: AiFacadeServiceInput) {
    this.persistenceService = input?.persistenceService
    this.notificationService = input?.notificationService ?? new NotificationService()
    this.localeBindingService = input?.localeBindingService ?? new AiLocaleBindingService(this.persistenceService)
    this.consentService = new AiConsentService(this.persistenceService)
    this.sessionService = new AiSessionService(this.persistenceService)
    this.historyService = new AiHistoryService(this.persistenceService)
    this.taskService = new AiTaskService(this.persistenceService)

    this.providerRegistry.register(new InternalSearchProvider())
    this.providerRegistry.register(new GoogleSearchProvider())

    this.translationProviderRegistry.register(new InternalTranslationProvider())
    this.translationProviderRegistry.register(new GoogleTranslationProvider())

    this.providerRouterService = new AiProviderRouterService(
      this.providerRegistry,
      this.translationProviderRegistry,
      this.providerSettingsService,
    )

    this.searchService = new AiSearchService(this.sessionService, this.providerRegistry)
    this.translationService = new AiTranslationService(this.sessionService, this.translationProviderRegistry)
    this.memoryService = new AiMemoryService(this.consentService, this.persistenceService)
    this.personalizationService = new AiPersonalizationRuntimeService(
      this.memoryService,
      this.consentService,
      this.historyService,
      this.providerSettingsService,
      this.localeBindingService,
      this.premiumService,
      this.persistenceService,
    )
    this.aiNotificationIntegrationService = new AiNotificationIntegrationService(
      this.notificationService,
      this.localeBindingService,
    )
    this.runtime = new AiRuntimeService(
      this.sessionService,
      this.stateService,
      this.router,
      this.searchService,
      this.consentService,
      this.memoryService,
      this.businessAssistant,
      this.educationAssistant,
      this.translationService,
      this.premiumService,
      this.providerSettingsService,
      this.localeBindingService,
      this.aiNotificationIntegrationService,
      this.historyService,
      this.taskService,
    )
    this.safetyAdminService = new AiSafetyAdminService(this.persistenceService)
    this.assistantOrchestrator = new AiAssistantOrchestratorService(
      this.sessionService,
      this.consentService,
      this.memoryService,
      this.historyService,
      this.taskService,
      this.premiumService,
      this.providerSettingsService,
      this.localeBindingService,
      this.appActionsService,
      this.personalizationService,
      this.safetyAdminService,
    )
    this.realtimeTranslationService = new AiRealtimeTranslationService((request) => this.translate(request))
  }

  ask(input: AiRequestInput) {
    return this.runtime.handle(input)
  }

  runAssistant(input: AiAssistantOrchestrationInput) {
    return this.assistantOrchestrator.run(input)
  }

  getAssistantManifest() {
    return this.assistantOrchestrator.getManifest()
  }

  getAssistantContext(userId: string, mode?: AiAssistantMode, provider?: AiProviderKey) {
    return this.assistantOrchestrator.getContext(userId, mode, provider)
  }

  getAppActionManifest() {
    return this.appActionsService.getManifest()
  }

  getAppActionRegistry(options?: { module?: AiAppActionModule; includeBlocked?: boolean }) {
    return this.appActionsService.getRegistry(options)
  }

  resolveAppAction(input: AiAppActionResolveInput) {
    return this.appActionsService.resolve(input)
  }

  prepareAppAction(input: AiPrepareAppActionInput) {
    return this.appActionsService.prepare(input)
  }

  confirmAppAction(input: AiConfirmAppActionInput) {
    return this.appActionsService.confirm(input)
  }

  cancelAppAction(input: AiCancelAppActionInput) {
    return this.appActionsService.cancel(input)
  }

  listPendingAppActions(userId: string) {
    return this.appActionsService.listPending(userId)
  }

  getProviderRouterManifest(userId?: string) {
    return this.providerRouterService.getManifest(userId)
  }

  resolveProviderRoute(input: AiProviderResolveRequest) {
    return this.providerRouterService.resolve(input)
  }

  getSafetyApprovalPolicy() {
    return this.safetyApprovalService.getPolicy()
  }

  evaluateSafetyApproval(input: AiSafetyApprovalRequest) {
    return this.safetyApprovalService.evaluate(input)
  }

  search(request: AiSearchRequest) {
    return this.runtime.search(request)
  }

  translate(request: AiTranslationRequest) {
    return this.runtime.translate(request)
  }

  analyzeBusiness(input: AiBusinessAnalysisRequest) {
    return this.runtime.analyzeBusiness(input)
  }

  assistEducation(input: AiEducationRequest) {
    return this.runtime.assistEducation(input)
  }

  getSearchProviderManifest() {
    return this.runtime.getSearchProviderManifest()
  }

  getTranslationProviderManifest() {
    return this.runtime.getTranslationProviderManifest()
  }

  getPremiumCatalog() {
    return this.runtime.getPremiumCatalog()
  }

  getPremiumAccess(userId: string) {
    return this.runtime.getPremiumAccess(userId)
  }

  previewCoinPurchase(input: AiCoinPurchasePreviewInput) {
    return this.runtime.previewCoinPurchase(input)
  }

  grantPremiumAccess(input: AiPremiumGrantInput) {
    return this.runtime.grantPremiumAccess(input)
  }

  revokePremiumAccess(userId: string) {
    return this.runtime.revokePremiumAccess(userId)
  }

  getSession(userId: string) {
    const consent = this.consentService.getConsent(userId)
    const premiumAccess = this.premiumService.getUserAccess(userId)
    const locale = this.localeBindingService.getLocale(userId)
    const providerSettings = this.providerSettingsService.getSettings(userId)
    return this.sessionService.getOrCreateSession({
      userId,
      locale: locale.locale,
      provider: providerSettings.searchProvider,
      consent,
      premiumEnabled: premiumAccess.premiumEnabled,
      premiumPlanKey: premiumAccess.planKey,
      activePremiumFeatures: premiumAccess.activeFeatures,
      coinBalance: premiumAccess.coinBalance,
    })
  }

  configureSession(input: { userId: string; locale?: string; mode?: AiAssistantMode; provider?: AiProviderKey }) {
    this.getSession(input.userId)
    return this.runtime.configureSession(input)
  }

  getConsent(userId: string) {
    return this.runtime.getConsent(userId)
  }

  getConsentAudit(userId: string) {
    return this.runtime.getConsentAudit(userId)
  }

  updateConsent(input: AiConsentUpdateInput) {
    return this.runtime.updateConsent(input)
  }

  listMemory(userId: string, options?: { kind?: AiMemoryKind; tag?: string }) {
    return this.runtime.listMemory(userId, options)
  }

  getMemorySummary(userId: string) {
    return this.runtime.getMemorySummary(userId)
  }

  saveMemory(input: AiMemorySaveInput) {
    return this.runtime.saveMemory(input)
  }

  removeMemory(userId: string, entryId: string) {
    return this.runtime.removeMemory(userId, entryId)
  }

  clearMemory(userId: string) {
    return this.runtime.clearMemory(userId)
  }

  createMemorySuggestion(input: { userId: string; kind: AiMemoryKind; label: string; value: string; reason: string }) {
    return this.runtime.createMemorySuggestion(input)
  }

  getProviderSettings(userId: string) {
    return this.runtime.getProviderSettings(userId)
  }

  updateProviderSettings(input: AiProviderSettingsUpdateInput) {
    return this.runtime.updateProviderSettings(input)
  }

  resetProviderSettings(userId: string) {
    return this.runtime.resetProviderSettings(userId)
  }

  getLocaleBinding(userId: string) {
    const locale = this.localeBindingService.getLocale(userId)
    this.sessionService.getOrCreateSession({ userId, locale: locale.locale })
    return locale
  }

  updateLocaleBinding(input: { userId: string; locale: string; source?: "default" | "user" | "session" }) {
    return this.runtime.updateLocaleBinding(input)
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
    return this.runtime.listHistory(userId, limit)
  }

  createTask(input: AiTaskCreateInput) {
    return this.runtime.createTask(input)
  }

  listTasks(userId: string, status?: AiTaskStatus, limit?: number) {
    return this.runtime.listTasks(userId, status, limit)
  }

  updateTaskStatus(userId: string, taskId: string, status: AiTaskStatus) {
    return this.runtime.updateTaskStatus(userId, taskId, status)
  }

  getRealtimeTranslationManifest() {
    return this.realtimeTranslationService.getManifest()
  }

  getRealtimeTranslationSummary(userId: string) {
    return this.realtimeTranslationService.getSummary(userId)
  }

  listRealtimeTranslationSessions(userId: string, status?: AiRealtimeTranslationSessionStatus) {
    return this.realtimeTranslationService.listSessions(userId, status)
  }

  startRealtimeTranslationSession(input: AiRealtimeTranslationSessionCreateInput) {
    return this.realtimeTranslationService.createSession(input)
  }

  updateRealtimeTranslationSession(input: AiRealtimeTranslationSessionUpdateInput) {
    return this.realtimeTranslationService.updateSession(input)
  }

  stopRealtimeTranslationSession(userId: string, sessionId: string) {
    return this.realtimeTranslationService.stopSession(userId, sessionId)
  }

  translateRealtimeText(input: AiRealtimeTranslationSegmentInput) {
    return this.realtimeTranslationService.translateText(input)
  }

  translateRealtimeMessage(input: AiRealtimeTranslationSegmentInput) {
    return this.realtimeTranslationService.translateMessage(input)
  }

  translateRealtimeMediaTranscript(input: AiRealtimeTranslationSegmentInput) {
    return this.realtimeTranslationService.translateMediaTranscript(input)
  }

  translateRealtimeCallSegment(input: AiRealtimeTranslationSegmentInput) {
    return this.realtimeTranslationService.translateCallSegment(input)
  }

  getVoiceManifest() {
    return this.voiceService.getManifest()
  }

  getVoiceStatus(userId: string) {
    return this.voiceService.getStatus(userId)
  }

  bindNativeVoiceBridge(input: AiNativeVoiceBridgeBindRequestContract) {
    return this.voiceService.bindNativeBridge(input)
  }

  startVoiceSession(input: AiStartVoiceSessionRequestContract) {
    const consent = this.consentService.getConsent(input.userId)
    if (!consent.readAccessAllowed || !consent.toolExecutionAllowed) {
      throw new Error("ai_voice_requires_read_and_tool_consent")
    }

    if (input.callSessionId) {
      const access = this.premiumService.resolveFeatureAccess({
        userId: input.userId,
        feature: "ai_translation_realtime",
      })
      if (!access.allowed) {
        throw new Error(access.reason)
      }
    }

    return this.voiceService.startSession(input)
  }

  updateVoiceSession(input: AiUpdateVoiceSessionRequestContract) {
    return this.voiceService.updateSession(input)
  }

  cancelVoiceSession(userId: string, sessionId: string) {
    return this.voiceService.cancelSession(userId, sessionId)
  }

  transcribeVoice(input: AiVoiceTranscriptionRequestContract) {
    const consent = this.consentService.getConsent(input.userId)
    if (!consent.readAccessAllowed || !consent.toolExecutionAllowed) {
      throw new Error("ai_voice_requires_read_and_tool_consent")
    }

    return this.voiceService.transcribe(input)
  }

  synthesizeVoice(input: AiVoiceSynthesisRequestContract) {
    const consent = this.consentService.getConsent(input.userId)
    if (!consent.readAccessAllowed || !consent.toolExecutionAllowed) {
      throw new Error("ai_voice_requires_read_and_tool_consent")
    }

    return this.voiceService.synthesize(input)
  }

  invokeVoice(input: AiVoiceInvokeRequestContract) {
    const prompt = (input.prompt ?? input.transcript ?? "").trim()
    if (!prompt) {
      throw new Error("ai_voice_invoke_prompt_required")
    }

    const runtimeResponse = this.runtime.handle({
      userId: input.userId,
      prompt,
      locale: input.sourceLanguage,
      preferredMode: input.mode,
      preferredProvider: input.preferredProvider,
    })
    const responseText = runtimeResponse.plan.summary

    return this.voiceService.invoke(input, responseText, runtimeResponse.session.defaultProvider)
  }

  recordNativeVoiceEvent(input: AiNativeVoiceClientEventContract) {
    return this.voiceService.recordClientEvent(input)
  }

  requestVoicePlayback(input: AiVoicePlaybackRequestContract) {
    return this.voiceService.requestPlayback(input)
  }

  interruptVoice(input: AiVoiceInterruptRequestContract) {
    return this.voiceService.interrupt(input)
  }


  getPersonalizationManifest() {
    return this.personalizationService.getManifest()
  }

  getPersonalizationProfile(userId: string) {
    return this.personalizationService.getProfile(userId)
  }

  getPersonalizationSnapshot(userId: string, prompt?: string) {
    return this.personalizationService.getSnapshot(userId, prompt)
  }

  getPersonalizationSummary(userId: string) {
    return this.personalizationService.getSummary(userId)
  }

  getPersonalizationContext(input: AiPersonalizationContextInput) {
    return this.personalizationService.getContext(input)
  }

  updatePersonalizationPrivacyMode(userId: string, privacyMode: AiPersonalizationPrivacyMode) {
    return this.personalizationService.updatePrivacyMode(userId, privacyMode)
  }

  updatePersonalizationPreferences(input: AiPersonalizationPreferenceUpdateInput) {
    return this.personalizationService.updatePreferences(input)
  }

  recordPersonalizationSignal(input: AiPersonalizationSignalInput) {
    return this.personalizationService.recordSignal(input)
  }

  addPersonalizationInstruction(input: AiPersonalizationInstructionInput) {
    return this.personalizationService.addInstruction(input)
  }

  clearPersonalizationSignals(userId: string) {
    return this.personalizationService.clearSignals(userId)
  }

  rebuildPersonalizationProfile(userId: string) {
    return this.personalizationService.rebuildProfile(userId)
  }


  getSafetyAdminManifest() {
    return this.safetyAdminService.getManifest()
  }

  getSafetyPolicies() {
    return this.safetyAdminService.getPolicies()
  }

  getSafetyAdminMonitor() {
    return this.safetyAdminService.getAdminMonitorSummary()
  }

  listSafetyReports(filter?: AiSafetyReportFilter) {
    return this.safetyAdminService.listReports(filter)
  }

  getSafetyReport(reportId: string) {
    return this.safetyAdminService.getReport(reportId)
  }

  listUserSafetyReports(userId: string, limit?: number) {
    return this.safetyAdminService.listUserReports(userId, limit)
  }

  getSafetyUserSummary(userId: string) {
    return this.safetyAdminService.getUserSummary(userId)
  }

  createSafetyReport(input: AiSafetyReportCreateInput) {
    return this.safetyAdminService.createReport(input)
  }

  reportSafetyTextSignal(input: AiSafetyTextSignalInput) {
    return this.safetyAdminService.reportFromTextSignal(input)
  }

  updateSafetyReportStatus(input: AiSafetyReportStatusUpdateInput) {
    return this.safetyAdminService.updateReportStatus(input)
  }

  addSafetyAdminNote(input: AiSafetyAdminNoteInput) {
    return this.safetyAdminService.addAdminNote(input)
  }

  clearSession(userId: string) {
    this.sessionService.clearSession(userId)
  }

  getPersistenceStatus() {
    return this.persistenceService?.getStatus() ?? { configured: false }
  }
}
