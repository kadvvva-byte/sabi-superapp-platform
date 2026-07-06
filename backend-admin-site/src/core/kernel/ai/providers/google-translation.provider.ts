declare const process: { env: Record<string, string | undefined> }

import { TranslationGatewayProviderBase } from "./translation-gateway-provider.shared"

function readTimeoutMs() {
  const providerTimeout = Number(process.env.AI_GOOGLE_TRANSLATION_GATEWAY_TIMEOUT_MS)
  if (Number.isFinite(providerTimeout) && providerTimeout > 0) return providerTimeout

  const sharedTimeout = Number(process.env.AI_TRANSLATION_GATEWAY_TIMEOUT_MS)
  if (Number.isFinite(sharedTimeout) && sharedTimeout > 0) return sharedTimeout

  return 30_000
}

export class GoogleTranslationProvider extends TranslationGatewayProviderBase {
  constructor(gatewayUrl = process.env.AI_GOOGLE_TRANSLATION_GATEWAY_URL?.trim()) {
    super({
      key: "google",
      label: "Google",
      gatewayUrl,
      apiKey: process.env.AI_GOOGLE_TRANSLATION_GATEWAY_API_KEY,
      authToken: process.env.AI_GOOGLE_TRANSLATION_GATEWAY_AUTH_TOKEN,
      timeoutMs: readTimeoutMs(),
      unconfiguredNote:
        "Google translation gateway is not configured. Set AI_GOOGLE_TRANSLATION_GATEWAY_URL to enable real translation.",
    })
  }
}
