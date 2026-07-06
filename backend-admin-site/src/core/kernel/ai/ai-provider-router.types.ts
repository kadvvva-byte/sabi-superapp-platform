import type {
  AiAssistantMode,
  AiAssistantProviderHint,
  AiProviderKey,
  AiProviderStatus,
  AiSearchProviderManifestItem,
  AiTranslationProviderManifestItem,
} from "./ai.types"

export type AiProviderRouteKind = "assistant" | "search" | "translation" | "voice"

export type AiAssistantProviderManifestItem = {
  key: AiProviderKey
  label: string
  status: AiProviderStatus
  configured: boolean
  requiresGateway: boolean
  supportedModes: AiAssistantMode[]
  gatewayEnv?: string
}

export type AiProviderRouterManifest = {
  area: "provider_router"
  version: "AI-29.2"
  status: "ready"
  mobileSecretsAllowed: false
  serverGatewayRequired: true
  defaultProviders: {
    assistant: AiProviderKey
    search: AiProviderKey
    translation: AiProviderKey
    voice: AiProviderKey
  }
  assistantProviders: AiAssistantProviderManifestItem[]
  searchProviders: AiSearchProviderManifestItem[]
  translationProviders: AiTranslationProviderManifestItem[]
  security: {
    apiKeysMustStayOnServer: true
    mobileMaySendProviderHintOnly: true
    internetProvidersUseGateway: true
    noInternalDictionaryFallbackForGoogleTranslation: true
  }
}

export type AiProviderResolveRequest = {
  userId?: string
  kind: AiProviderRouteKind
  mode?: AiAssistantMode
  preferredProvider?: AiProviderKey
  providerHint?: AiAssistantProviderHint
}

export type AiProviderResolveResult = {
  kind: AiProviderRouteKind
  provider: AiProviderKey
  label: string
  status: AiProviderStatus
  configured: boolean
  requiresGateway: boolean
  safeForMobile: false
  reason: string
}
