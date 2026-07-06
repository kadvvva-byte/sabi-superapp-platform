import type { Router } from "express"

import type { NotificationService } from "../notification/application/services/notification.service"
import { AiFacadeService } from "../../core/kernel/ai/ai-facade.service"
import { AiPersistenceService } from "../../core/kernel/ai/ai-persistence.service"
import { AiAppActionsApplicationService } from "./application/services/ai-app-actions.service"
import { AiAppIntegrationService } from "./application/services/ai-app-integration.service"
import { AiAssistantService } from "./application/services/ai-assistant.service"
import { AiHistoryTaskService } from "./application/services/ai-history-task.service"
import { AiMobileUiService } from "./application/services/ai-mobile-ui.service"
import { AiPersonalizationApplicationService } from "./application/services/ai-personalization.service"
import { AiProviderRouterApplicationService } from "./application/services/ai-provider-router.service"
import { AiSafetyApprovalApplicationService } from "./application/services/ai-safety-approval.service"
import { AiSettingsProfileService } from "./application/services/ai-settings-profile.service"
import { AiSafetyAdminApplicationService } from "./application/services/ai-safety-admin.service"
import { AiRealtimeTranslationApplicationService } from "./application/services/ai-realtime-translation.service"
import { AiWorkspaceService } from "./application/services/ai-workspace.service"
import { createAiRouter } from "./infrastructure/routes/ai.routes"

export type CreateAiModuleInput = {
  notificationService?: NotificationService
  persistenceService?: AiPersistenceService
}

export class AiModule {
  readonly facade: AiFacadeService
  readonly workspace: AiWorkspaceService
  readonly assistant: AiAssistantService
  readonly historyTasks: AiHistoryTaskService
  readonly settingsProfile: AiSettingsProfileService
  readonly appActions: AiAppActionsApplicationService
  readonly realtimeTranslation: AiRealtimeTranslationApplicationService
  readonly appIntegration: AiAppIntegrationService
  readonly mobileUi: AiMobileUiService
  readonly personalization: AiPersonalizationApplicationService
  readonly providerRouter: AiProviderRouterApplicationService
  readonly safetyApproval: AiSafetyApprovalApplicationService
  readonly safetyAdmin: AiSafetyAdminApplicationService
  readonly router: Router

  constructor(input?: CreateAiModuleInput) {
    const persistenceService = input?.persistenceService ?? new AiPersistenceService()
    this.facade = new AiFacadeService({
      notificationService: input?.notificationService,
      persistenceService,
    })
    this.workspace = new AiWorkspaceService(this.facade)
    this.assistant = new AiAssistantService(this.facade)
    this.appActions = new AiAppActionsApplicationService(this.facade)
    this.realtimeTranslation = new AiRealtimeTranslationApplicationService(this.facade)
    this.historyTasks = new AiHistoryTaskService(this.facade)
    this.settingsProfile = new AiSettingsProfileService(this.facade)
    this.personalization = new AiPersonalizationApplicationService(this.facade)
    this.providerRouter = new AiProviderRouterApplicationService(this.facade)
    this.safetyApproval = new AiSafetyApprovalApplicationService(this.facade)
    this.safetyAdmin = new AiSafetyAdminApplicationService(this.facade)
    this.appIntegration = new AiAppIntegrationService(
      this.facade,
      this.workspace,
      this.historyTasks,
      this.settingsProfile,
    )
    this.mobileUi = new AiMobileUiService(
      this.facade,
      this.workspace,
      this.assistant,
      this.appActions,
      this.realtimeTranslation,
    )
    this.router = createAiRouter({
      aiFacade: this.facade,
      aiWorkspaceService: this.workspace,
      aiAssistantService: this.assistant,
      aiAppActionsService: this.appActions,
      aiRealtimeTranslationService: this.realtimeTranslation,
      aiHistoryTaskService: this.historyTasks,
      aiSettingsProfileService: this.settingsProfile,
      aiAppIntegrationService: this.appIntegration,
      aiMobileUiService: this.mobileUi,
      aiPersonalizationService: this.personalization,
      aiProviderRouterService: this.providerRouter,
      aiSafetyApprovalService: this.safetyApproval,
      aiSafetyAdminService: this.safetyAdmin,
    })
  }
}

export function createAiModule(input?: CreateAiModuleInput): AiModule {
  return new AiModule(input)
}
