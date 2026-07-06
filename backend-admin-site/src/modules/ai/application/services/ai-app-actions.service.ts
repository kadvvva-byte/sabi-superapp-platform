import type { AiFacadeService } from "../../../../core/kernel/ai/ai-facade.service"
import type { AiAppActionModule } from "../../../../core/kernel/ai/ai-app-actions.types"
import type {
  AiAppActionCancelRequestContract,
  AiAppActionConfirmRequestContract,
  AiAppActionManifestContract,
  AiAppActionPrepareRequestContract,
  AiAppActionPrepareResponseContract,
  AiAppActionResolveRequestContract,
  AiAppActionResolveResponseContract,
  AiAppActionWorkspaceSummaryContract,
} from "../../contracts/ai-app-actions.contracts"

export class AiAppActionsApplicationService {
  constructor(private readonly aiFacade: AiFacadeService) {}

  getManifest(): AiAppActionManifestContract {
    return this.aiFacade.getAppActionManifest()
  }

  getRegistry(options?: { module?: AiAppActionModule; includeBlocked?: boolean }) {
    return this.aiFacade.getAppActionRegistry(options)
  }

  resolve(input: AiAppActionResolveRequestContract): AiAppActionResolveResponseContract {
    return this.aiFacade.resolveAppAction(input)
  }

  prepare(input: AiAppActionPrepareRequestContract): AiAppActionPrepareResponseContract {
    return this.aiFacade.prepareAppAction(input)
  }

  confirm(input: AiAppActionConfirmRequestContract) {
    return this.aiFacade.confirmAppAction(input)
  }

  cancel(input: AiAppActionCancelRequestContract) {
    return this.aiFacade.cancelAppAction(input)
  }

  listPending(userId: string) {
    return this.aiFacade.listPendingAppActions(userId)
  }

  getWorkspaceSummary(userId: string): AiAppActionWorkspaceSummaryContract {
    const registry = this.getRegistry({ includeBlocked: true })
    const pending = this.listPending(userId)
    return {
      manifest: this.getManifest(),
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
}
