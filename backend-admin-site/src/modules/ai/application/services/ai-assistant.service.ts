import type { AiFacadeService } from "../../../../core/kernel/ai/ai-facade.service"
import type { AiAssistantMode, AiProviderKey } from "../../../../core/kernel/ai/ai.types"
import type {
  AiAssistantContextContract,
  AiAssistantManifestContract,
  AiAssistantRunRequestContract,
  AiAssistantRunResponseContract,
  AiAssistantWorkspaceSummaryContract,
} from "../../contracts/ai-assistant.contracts"

export class AiAssistantService {
  private readonly lastRunByUser = new Map<string, AiAssistantRunResponseContract>()

  constructor(private readonly aiFacade: AiFacadeService) {}

  getManifest(): AiAssistantManifestContract {
    return this.aiFacade.getAssistantManifest()
  }

  getContext(userId: string, mode?: AiAssistantMode, provider?: AiProviderKey): AiAssistantContextContract {
    return this.aiFacade.getAssistantContext(userId, mode, provider)
  }

  run(input: AiAssistantRunRequestContract): AiAssistantRunResponseContract {
    const result = this.aiFacade.runAssistant(input)
    this.lastRunByUser.set(input.userId, result)
    return result
  }

  getWorkspaceSummary(userId: string): AiAssistantWorkspaceSummaryContract {
    const lastRun = this.lastRunByUser.get(userId)
    return {
      manifest: this.getManifest(),
      status: "ready",
      lastIntent: lastRun?.resolvedIntent,
      lastActions: lastRun?.actions ?? [],
      lastSafety: lastRun?.safety,
      lastExecutionStatus: lastRun?.executionStatus,
    }
  }
}
