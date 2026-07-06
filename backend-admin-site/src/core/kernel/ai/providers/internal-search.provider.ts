import { type AiSearchProviderPort } from "../ai-search-provider.port"
import {
  type AiProviderStatus,
  type AiSearchProviderManifestItem,
  type AiSearchRequest,
  type AiSearchResponse,
  type AiSearchVertical,
} from "../ai.types"

const SUPPORTED_VERTICALS: AiSearchVertical[] = ["web", "images", "video", "music", "files"]

export class InternalSearchProvider implements AiSearchProviderPort {
  readonly key = "internal" as const
  readonly label = "Sabi Internal"
  readonly supportedVerticals = SUPPORTED_VERTICALS
  readonly requiresGateway = false

  getStatus(): AiProviderStatus {
    return "configured"
  }

  canSearch(vertical: AiSearchVertical) {
    return this.supportedVerticals.includes(vertical)
  }

  async search(request: AiSearchRequest): Promise<AiSearchResponse> {
    return {
      provider: this.key,
      query: request.query,
      vertical: request.vertical ?? "web",
      performedAt: new Date().toISOString(),
      configured: true,
      status: "configured",
      fallbackUsed: false,
      attemptedProviders: [this.key],
      results: [],
      note:
        "Internal fallback provider is active. No external gateway was used, so no web results were fetched.",
    }
  }

  getManifestItem(): AiSearchProviderManifestItem {
    return {
      key: this.key,
      label: this.label,
      status: this.getStatus(),
      configured: true,
      requiresGateway: this.requiresGateway,
      supportedVerticals: this.supportedVerticals,
    }
  }
}
