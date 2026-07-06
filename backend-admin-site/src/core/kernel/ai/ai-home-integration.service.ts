import { AiProviderRegistryService } from "./ai-provider-registry.service"
import { AiTaskService } from "./ai-task.service"

export class AiHomeIntegrationService {
  constructor(
    private readonly tasks: AiTaskService,
    private readonly providers: AiProviderRegistryService,
  ) {}

  buildWidget(userId: string) {
    const tasks = this.tasks.list(userId)
    const waitingApprovals = tasks.filter((item) => item.status === "awaiting_confirmation").length
    const providerManifest = this.providers.listManifest()
    return {
      id: "ai_workspace_widget",
      userId,
      title: "AI Workspace",
      subtitle: waitingApprovals > 0 ? `${waitingApprovals} tasks waiting for confirmation` : "Assistant brain, search, business, education, and translation",
      route: "/ai/workspace",
      premium: true,
      badges: {
        waitingApprovals,
        searchReady: providerManifest.some((item) => item.configured),
        providers: providerManifest.map((item) => item.key),
      },
    }
  }
}
