import { AiProviderRegistryService } from "./ai-provider-registry.service"
import { type AiSearchRequest, type AiSearchResponse } from "./ai.types"
import { AiSessionService } from "./ai-session.service"

export class AiSearchService {
  constructor(
    private readonly sessionService: AiSessionService,
    private readonly providerRegistry: AiProviderRegistryService,
  ) {}

  async search(request: AiSearchRequest): Promise<AiSearchResponse> {
    const session = this.sessionService.getOrCreateSession({
      userId: request.userId,
      locale: request.locale,
      provider: request.preferredProvider,
      mode: "search",
    })

    if (!session.consent.internetSearchAllowed) {
      return {
        provider: request.preferredProvider ?? session.defaultProvider,
        query: request.query,
        vertical: request.vertical ?? "web",
        performedAt: new Date().toISOString(),
        configured: false,
        status: "disabled",
        fallbackUsed: false,
        attemptedProviders: [],
        results: [],
        note: "Internet search is disabled for this user session until consent is granted.",
      }
    }

    const providerChain = this.providerRegistry.resolveProviderChain({
      preferredProvider: request.preferredProvider,
      sessionDefaultProvider: session.defaultProvider,
      vertical: request.vertical ?? "web",
      allowFallback: request.allowFallback,
      fallbackProviders: request.fallbackProviders,
    })

    const attemptedProviders: AiSearchResponse["attemptedProviders"] = []

    for (const provider of providerChain) {
      attemptedProviders.push(provider.key)
      const response = await provider.search({
        ...request,
        preferredProvider: provider.key,
      })

      const hasResults = response.results.length > 0
      const isConfigured = response.configured && response.status === "configured"

      if (hasResults || request.allowFallback === false || isConfigured) {
        return {
          ...response,
          attemptedProviders,
          fallbackUsed: provider.key !== (request.preferredProvider ?? session.defaultProvider),
        }
      }
    }

    return {
      provider: request.preferredProvider ?? session.defaultProvider,
      query: request.query,
      vertical: request.vertical ?? "web",
      performedAt: new Date().toISOString(),
      configured: false,
      status: "unconfigured",
      fallbackUsed: attemptedProviders.length > 1,
      attemptedProviders,
      results: [],
      note:
        attemptedProviders.length > 0
          ? `No configured provider returned results. Attempted: ${attemptedProviders.join(", ")}.`
          : "No AI search provider is registered for the requested vertical.",
    }
  }

  getProviderManifest() {
    return this.providerRegistry.listManifest()
  }
}
