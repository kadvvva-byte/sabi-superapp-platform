import { type AiSearchProviderPort } from "./ai-search-provider.port"
import {
  type AiProviderKey,
  type AiSearchProviderManifestItem,
  type AiSearchVertical,
} from "./ai.types"

export class AiProviderRegistryService {
  private readonly providers = new Map<AiProviderKey, AiSearchProviderPort>()

  register(provider: AiSearchProviderPort) {
    this.providers.set(provider.key, provider)
  }

  getProvider(key: AiProviderKey) {
    return this.providers.get(key) ?? null
  }

  listManifest() {
    return Array.from(this.providers.values()).map((provider) => provider.getManifestItem())
  }

  resolveProviderChain(input: {
    preferredProvider?: AiProviderKey
    sessionDefaultProvider?: AiProviderKey
    vertical: AiSearchVertical
    allowFallback?: boolean
    fallbackProviders?: AiProviderKey[]
  }) {
    const ordered = new Set<AiProviderKey>()

    if (input.preferredProvider) {
      ordered.add(input.preferredProvider)
    }

    if (input.sessionDefaultProvider) {
      ordered.add(input.sessionDefaultProvider)
    }

    if (input.allowFallback !== false) {
      const fallbacks: AiProviderKey[] = input.fallbackProviders?.length
        ? input.fallbackProviders
        : ["google", "internal"]

      for (const key of fallbacks) {
        ordered.add(key)
      }
    }

    return Array.from(ordered)
      .map((key) => this.providers.get(key))
      .filter((provider): provider is AiSearchProviderPort => {
        return Boolean(provider && provider.canSearch(input.vertical))
      })
  }

  resolveManifestByVertical(vertical: AiSearchVertical) {
    return this.listManifest().filter((item) => item.supportedVerticals.includes(vertical))
  }
}
