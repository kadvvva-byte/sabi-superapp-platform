import type { AiFacadeService } from "../../../../core/kernel/ai/ai-facade.service"
import type {
  AiProviderResolveRequest,
  AiProviderResolveResult,
  AiProviderRouterManifest,
} from "../../contracts/ai-provider-router.contracts"

export class AiProviderRouterApplicationService {
  constructor(private readonly aiFacade: AiFacadeService) {}

  getManifest(userId?: string): AiProviderRouterManifest {
    return this.aiFacade.getProviderRouterManifest(userId)
  }

  resolve(input: AiProviderResolveRequest): AiProviderResolveResult {
    return this.aiFacade.resolveProviderRoute(input)
  }
}
