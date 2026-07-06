declare const process: { env: Record<string, string | undefined> }

import { type AiSearchProviderPort } from "../ai-search-provider.port"
import {
  type AiProviderStatus,
  type AiSearchMediaType,
  type AiSearchProviderManifestItem,
  type AiSearchRequest,
  type AiSearchResponse,
  type AiSearchResultItem,
  type AiSearchVertical,
} from "../ai.types"

const SUPPORTED_VERTICALS: AiSearchVertical[] = ["web", "images", "video", "music", "files"]

export class YandexSearchProvider implements AiSearchProviderPort {
  readonly key = "yandex" as const
  readonly label = "Yandex"
  readonly supportedVerticals = SUPPORTED_VERTICALS
  readonly requiresGateway = true

  constructor(private readonly gatewayUrl = process.env.AI_YANDEX_SEARCH_GATEWAY_URL?.trim()) {}

  getStatus(): AiProviderStatus {
    if (!this.gatewayUrl) {
      return "unconfigured"
    }

    return "configured"
  }

  canSearch(vertical: AiSearchVertical) {
    return this.supportedVerticals.includes(vertical)
  }

  async search(request: AiSearchRequest): Promise<AiSearchResponse> {
    if (!this.gatewayUrl) {
      return {
        provider: this.key,
        query: request.query,
        vertical: request.vertical ?? "web",
        performedAt: new Date().toISOString(),
        configured: false,
        status: "unconfigured",
        fallbackUsed: false,
        attemptedProviders: [this.key],
        results: [],
        note: "Yandex search gateway is not configured. Set AI_YANDEX_SEARCH_GATEWAY_URL to enable real search.",
      }
    }

    try {
      const response = await fetch(this.gatewayUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          provider: this.key,
          query: request.query,
          vertical: request.vertical ?? "web",
          locale: request.locale,
          limit: request.limit ?? 10,
          safeSearch: request.safeSearch ?? true,
          userId: request.userId,
        }),
      })

      if (!response.ok) {
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
          note: `Yandex search gateway returned HTTP ${response.status}`,
        }
      }

      const payload = (await response.json()) as { results?: unknown[] }
      const results = Array.isArray(payload.results)
        ? payload.results.map((item, index) => this.normalizeResult(item, index, request.vertical ?? "web"))
        : []

      return {
        provider: this.key,
        query: request.query,
        vertical: request.vertical ?? "web",
        performedAt: new Date().toISOString(),
        configured: true,
        status: "configured",
        fallbackUsed: false,
        attemptedProviders: [this.key],
        results,
      }
    } catch (error) {
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
        note: error instanceof Error ? error.message : "Unknown Yandex search gateway error",
      }
    }
  }

  getManifestItem(): AiSearchProviderManifestItem {
    return {
      key: this.key,
      label: this.label,
      status: this.getStatus(),
      configured: this.getStatus() === "configured",
      requiresGateway: this.requiresGateway,
      supportedVerticals: this.supportedVerticals,
    }
  }

  private normalizeResult(raw: unknown, index: number, vertical: AiSearchVertical): AiSearchResultItem {
    const item = typeof raw === "object" && raw ? (raw as Record<string, unknown>) : {}

    return {
      id: String(item.id ?? `${this.key}_${index + 1}`),
      title: String(item.title ?? "Untitled result"),
      snippet: item.snippet ? String(item.snippet) : undefined,
      url: String(item.url ?? ""),
      sourceDomain: item.sourceDomain ? String(item.sourceDomain) : undefined,
      mediaType: this.resolveMediaType(vertical),
      thumbnailUrl: item.thumbnailUrl ? String(item.thumbnailUrl) : undefined,
      previewUrl: item.previewUrl ? String(item.previewUrl) : undefined,
      durationSeconds:
        typeof item.durationSeconds === "number" ? item.durationSeconds : undefined,
      fileType: item.fileType ? String(item.fileType) : undefined,
    }
  }

  private resolveMediaType(vertical: AiSearchVertical): AiSearchMediaType {
    if (vertical === "images") return "image"
    if (vertical === "video") return "video"
    if (vertical === "music") return "audio"
    if (vertical === "files") return "file"
    return "web"
  }
}
