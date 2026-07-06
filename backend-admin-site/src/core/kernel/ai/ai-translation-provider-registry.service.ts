import { type AiTranslationProviderPort } from "./ai-translation-provider.port"
import {
  type AiProviderKey,
  type AiTranslationContentType,
} from "./ai.types"

export class AiTranslationProviderRegistryService {
  private readonly providers = new Map<AiProviderKey, AiTranslationProviderPort>()

  register(provider: AiTranslationProviderPort) {
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
    contentType: AiTranslationContentType
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
        : ["google", "yandex", "internal"]

      for (const key of fallbacks) {
        ordered.add(key)
      }
    }

    return Array.from(ordered)
      .map((key) => this.providers.get(key))
      .filter((provider): provider is AiTranslationProviderPort => {
        return Boolean(provider && provider.canTranslate(input.contentType))
      })
  }
}
