declare const process: { env: Record<string, string | undefined> }

import type { AiProviderRegistryService } from "./ai-provider-registry.service"
import type { AiProviderSettingsService } from "./ai-provider-settings.service"
import type { AiTranslationProviderRegistryService } from "./ai-translation-provider-registry.service"
import type { AiAssistantMode, AiAssistantProviderHint, AiProviderKey, AiProviderStatus } from "./ai.types"
import type {
  AiAssistantProviderManifestItem,
  AiProviderResolveRequest,
  AiProviderResolveResult,
  AiProviderRouterManifest,
  AiProviderRouteKind,
} from "./ai-provider-router.types"

const ASSISTANT_MODES: AiAssistantMode[] = [
  "general",
  "business",
  "education",
  "student",
  "abiturient",
  "teacher",
  "translation",
  "search",
]

function configuredByEnv(...keys: string[]) {
  return keys.some((key) => Boolean(process.env[key]?.trim()))
}

function providerFromHint(hint?: AiAssistantProviderHint): AiProviderKey | undefined {
  if (!hint) return undefined
  if (hint === "chatgpt" || hint === "openai") return "openai"
  if (hint === "google" || hint === "google_search" || hint === "google_translate") return "google"
  if (hint === "yandex") return "google"
  if (hint === "internal") return "internal"
  return undefined
}

export class AiProviderRouterService {
  constructor(
    private readonly searchRegistry: AiProviderRegistryService,
    private readonly translationRegistry: AiTranslationProviderRegistryService,
    private readonly providerSettings: AiProviderSettingsService,
  ) {}

  getManifest(userId?: string): AiProviderRouterManifest {
    const settings = userId ? this.providerSettings.getSettings(userId) : undefined

    return {
      area: "provider_router",
      version: "AI-29.2",
      status: "ready",
      mobileSecretsAllowed: false,
      serverGatewayRequired: true,
      defaultProviders: {
        assistant: settings?.modeProviders.general ?? "openai",
        search: settings?.searchProvider ?? "google",
        translation: settings?.translationProvider ?? "google",
        voice: "internal",
      },
      assistantProviders: this.getAssistantProviders(),
      searchProviders: this.searchRegistry.listManifest(),
      translationProviders: this.translationRegistry.listManifest(),
      security: {
        apiKeysMustStayOnServer: true,
        mobileMaySendProviderHintOnly: true,
        internetProvidersUseGateway: true,
        noInternalDictionaryFallbackForGoogleTranslation: true,
      },
    }
  }

  resolve(input: AiProviderResolveRequest): AiProviderResolveResult {
    const settings = input.userId ? this.providerSettings.getSettings(input.userId) : undefined
    const hinted = providerFromHint(input.providerHint)
    const provider = this.normalizeProviderForKind(
      input.kind,
      hinted ??
        input.preferredProvider ??
        (input.kind === "translation"
          ? settings?.translationProvider
          : input.kind === "search"
            ? settings?.searchProvider
            : input.mode
              ? settings?.modeProviders[input.mode]
              : undefined) ??
        this.defaultProviderForKind(input.kind),
    )

    const manifest = this.getManifest(input.userId)
    const source =
      input.kind === "assistant"
        ? manifest.assistantProviders.find((item) => item.key === provider)
        : input.kind === "translation"
          ? manifest.translationProviders.find((item) => item.key === provider)
          : input.kind === "search"
            ? manifest.searchProviders.find((item) => item.key === provider)
            : manifest.assistantProviders.find((item) => item.key === provider)

    return {
      kind: input.kind,
      provider,
      label: source?.label ?? this.labelForProvider(provider),
      status: source?.status ?? this.statusForProvider(provider, input.kind),
      configured: Boolean(source?.configured ?? this.statusForProvider(provider, input.kind) === "configured"),
      requiresGateway: Boolean(source?.requiresGateway ?? provider !== "internal"),
      safeForMobile: false,
      reason:
        provider === "openai"
          ? "ChatGPT/OpenAI is routed through server provider gateway. Mobile must not contain API keys."
          : provider === "google"
            ? "Google provider is routed through server gateway for search/translation."
            : provider === "internal"
              ? "Internal provider is allowed only as server-side fallback, not as a fake dictionary response."
              : "Provider resolved by AI provider router.",
    }
  }

  private defaultProviderForKind(kind: AiProviderRouteKind): AiProviderKey {
    if (kind === "assistant") return "openai"
    if (kind === "search") return "google"
    if (kind === "translation") return "google"
    return "internal"
  }

  private normalizeProviderForKind(kind: AiProviderRouteKind, provider: AiProviderKey): AiProviderKey {
    if (kind === "assistant") return provider === "yandex" ? "google" : provider
    if (kind === "search") return provider === "openai" ? "google" : provider
    if (kind === "translation") return provider === "openai" ? "google" : provider
    return provider
  }

  private getAssistantProviders(): AiAssistantProviderManifestItem[] {
    return [
      {
        key: "openai",
        label: "ChatGPT / OpenAI",
        status: this.statusForProvider("openai", "assistant"),
        configured: this.statusForProvider("openai", "assistant") === "configured",
        requiresGateway: true,
        supportedModes: ASSISTANT_MODES,
        gatewayEnv: "OPENAI_API_KEY or AI_OPENAI_GATEWAY_URL",
      },
      {
        key: "google",
        label: "Google AI / Gemini",
        status: this.statusForProvider("google", "assistant"),
        configured: this.statusForProvider("google", "assistant") === "configured",
        requiresGateway: true,
        supportedModes: ASSISTANT_MODES,
        gatewayEnv: "GEMINI_API_KEY or GOOGLE_API_KEY",
      },
      {
        key: "internal",
        label: "Sabi internal assistant router",
        status: "configured",
        configured: true,
        requiresGateway: false,
        supportedModes: ASSISTANT_MODES,
      },
    ]
  }

  private statusForProvider(provider: AiProviderKey, kind: AiProviderRouteKind): AiProviderStatus {
    if (provider === "internal") return "configured"
    if (provider === "openai") {
      return configuredByEnv("OPENAI_API_KEY", "AI_OPENAI_GATEWAY_URL") ? "configured" : "unconfigured"
    }
    if (provider === "google") {
      if (kind === "assistant") return configuredByEnv("GEMINI_API_KEY", "GOOGLE_API_KEY", "AI_GOOGLE_AI_API_KEY") ? "configured" : "unconfigured"
      if (kind === "translation") return configuredByEnv("AI_GOOGLE_TRANSLATION_GATEWAY_URL") ? "configured" : "unconfigured"
      if (kind === "search") return configuredByEnv("AI_GOOGLE_SEARCH_GATEWAY_URL") ? "configured" : "unconfigured"
      return "unconfigured"
    }
    if (provider === "yandex") {
      return this.statusForProvider("google", kind)
    }
    return "unconfigured"
  }

  private labelForProvider(provider: AiProviderKey) {
    if (provider === "openai") return "ChatGPT / OpenAI"
    if (provider === "google") return "Google AI / Gemini"
    if (provider === "yandex") return "Google AI / Gemini (legacy Yandex setting)"
    return "Sabi internal"
  }
}
