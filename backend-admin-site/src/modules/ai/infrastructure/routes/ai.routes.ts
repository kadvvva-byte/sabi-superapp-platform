import { Router } from "express"
import type { AiFacadeService } from "../../../../core/kernel/ai/ai-facade.service"
import type { AiAppActionsApplicationService } from "../../application/services/ai-app-actions.service"
import type { AiAppIntegrationService } from "../../application/services/ai-app-integration.service"
import type { AiAssistantService } from "../../application/services/ai-assistant.service"
import type { AiHistoryTaskService } from "../../application/services/ai-history-task.service"
import type { AiMobileUiService } from "../../application/services/ai-mobile-ui.service"
import type { AiPersonalizationApplicationService } from "../../application/services/ai-personalization.service"
import type { AiProviderRouterApplicationService } from "../../application/services/ai-provider-router.service"
import type { AiSafetyApprovalApplicationService } from "../../application/services/ai-safety-approval.service"
import type { AiSettingsProfileService } from "../../application/services/ai-settings-profile.service"
import type { AiSafetyAdminApplicationService } from "../../application/services/ai-safety-admin.service"
import type { AiRealtimeTranslationApplicationService } from "../../application/services/ai-realtime-translation.service"
import type { AiWorkspaceService } from "../../application/services/ai-workspace.service"
import { createAiAppActionsRouter } from "./ai-app-actions.routes"
import { createAiAppIntegrationRouter } from "./ai-app-integration.routes"
import { createAiAssistantRouter } from "./ai-assistant.routes"
import { createAiMobileUiRouter } from "./ai-mobile-ui.routes"
import { createAiPersonalizationRouter } from "./ai-personalization.routes"
import { createAiProviderRouter } from "./ai-provider-router.routes"
import { createAiProviderGatewayRouter } from "./ai-provider-gateway.routes"
import { createAiSafetyApprovalRouter } from "./ai-safety-approval.routes"
import { createAiRuntimeRouter } from "./ai-runtime.routes"
import { createAiWorkspaceRouter } from "./ai-workspace.routes"
import { createAiVoiceRouter } from "./ai-voice.routes"
import { createAiHistoryTaskRouter } from "./ai-history-task.routes"
import { createAiRealtimeTranslationRouter } from "./ai-realtime-translation.routes"
import { createAiSettingsProfileRouter } from "./ai-settings-profile.routes"
import { createAiSafetyAdminRouter } from "./ai-safety-admin.routes"
import { AiSabiVoiceCommandService } from "../../application/services/ai-sabi-voice-command.service"
import { createAiSabiVoiceCommandRouter } from "./ai-sabi-voice-command.routes"
import type { AiVoiceManifestContract } from "../../contracts/ai-voice.contracts"

export type CreateAiRouterInput = {
  aiFacade: AiFacadeService
  aiWorkspaceService: AiWorkspaceService
  aiAssistantService: AiAssistantService
  aiAppActionsService: AiAppActionsApplicationService
  aiRealtimeTranslationService: AiRealtimeTranslationApplicationService
  aiHistoryTaskService: AiHistoryTaskService
  aiSettingsProfileService: AiSettingsProfileService
  aiAppIntegrationService: AiAppIntegrationService
  aiMobileUiService: AiMobileUiService
  aiPersonalizationService: AiPersonalizationApplicationService
  aiProviderRouterService: AiProviderRouterApplicationService
  aiSafetyApprovalService: AiSafetyApprovalApplicationService
  aiSafetyAdminService: AiSafetyAdminApplicationService
}

type AiVoiceManifestPort = {
  getVoiceManifest?: () => AiVoiceManifestContract
}

function getVoiceManifestForRouter(aiFacade: AiFacadeService): AiVoiceManifestContract | { area: "voice"; configured: false; status: "not_connected" } {
  const voiceFacade = aiFacade as unknown as AiVoiceManifestPort
  if (typeof voiceFacade.getVoiceManifest === "function") {
    return voiceFacade.getVoiceManifest()
  }

  return {
    area: "voice",
    configured: false,
    status: "not_connected",
  }
}

export function createAiRouter(input: CreateAiRouterInput) {
  const router = Router()
  const sabiVoiceCommandService = new AiSabiVoiceCommandService()

  router.get("/manifest", (_req, res) => {
    res.json({
      ok: true,
      data: {
        programId: "sabi_ai",
        title: "Sabi AI",
        description: "Dedicated AI program with assistant brain, mobile UI, workspace, search, translation, voice, history, tasks, settings, permissions, profile, business, education, realtime translation, and app integration contracts.",
        routes: {
          mobileUiBase: "/api/ai/mobile-ui",
          personalizationBase: "/api/ai/personalization",
          safetyBase: "/api/ai/safety",
          assistantBase: "/api/ai/assistant",
          workspaceBase: "/api/ai/workspace",
          runtimeBase: "/api/ai",
          voiceBase: "/api/ai/voice",
          activityBase: "/api/ai/activity",
          settingsProfileBase: "/api/ai/settings",
          integrationBase: "/api/ai/integration",
          actionsBase: "/api/ai/actions",
          realtimeTranslationBase: "/api/ai/translation/realtime",
          providerRouterBase: "/api/ai/providers",
          providerGatewayBase: "/api/ai/provider-gateway",
          approvalBase: "/api/ai/approval",
          sabiVoiceCommandBase: "/api/ai/sabi-voice",
        },
        mobileUi: input.aiMobileUiService.getManifest(),
        personalization: input.aiPersonalizationService.getManifest(),
        safetyAdmin: input.aiSafetyAdminService.getManifest(),
        assistant: input.aiAssistantService.getManifest(),
        appActions: input.aiAppActionsService.getManifest(),
        sabiVoiceCommand: sabiVoiceCommandService.getManifest(),
        realtimeTranslation: input.aiRealtimeTranslationService.getManifest(),
        providers: {
          router: input.aiProviderRouterService.getManifest(),
          search: input.aiFacade.getSearchProviderManifest(),
          translation: input.aiFacade.getTranslationProviderManifest(),
          voice: getVoiceManifestForRouter(input.aiFacade),
        },
        approval: input.aiSafetyApprovalService.getPolicy(),
        appIntegration: input.aiAppIntegrationService.getManifest(),
        activity: input.aiHistoryTaskService.getManifest(),
        settingsProfile: input.aiSettingsProfileService.getManifest(),
        premiumCatalog: input.aiFacade.getPremiumCatalog(),
        workspaceCatalog: input.aiWorkspaceService.getCatalog(),
      },
    })
  })

  router.use(createAiSafetyAdminRouter(input.aiSafetyAdminService))
  router.use(createAiProviderRouter(input.aiProviderRouterService))
  router.use(createAiProviderGatewayRouter(input.aiFacade))
  router.use(createAiSafetyApprovalRouter(input.aiSafetyApprovalService))
  router.use(createAiMobileUiRouter(input.aiMobileUiService))
  router.use(createAiPersonalizationRouter(input.aiPersonalizationService))
  router.use(createAiAppIntegrationRouter(input.aiAppIntegrationService))
  router.use(createAiAppActionsRouter(input.aiAppActionsService))
  router.use(createAiRealtimeTranslationRouter(input.aiRealtimeTranslationService))
  router.use(createAiAssistantRouter(input.aiAssistantService))
  router.use(createAiWorkspaceRouter(input.aiWorkspaceService))
  router.use(createAiSettingsProfileRouter(input.aiSettingsProfileService))
  router.use(createAiHistoryTaskRouter(input.aiHistoryTaskService))
  router.use(createAiRuntimeRouter(input.aiFacade))
  router.use(createAiVoiceRouter(input.aiFacade))
  router.use(createAiSabiVoiceCommandRouter(sabiVoiceCommandService))

  return router
}
