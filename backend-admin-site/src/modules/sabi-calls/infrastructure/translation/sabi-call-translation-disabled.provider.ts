import type {
  SabiCallTranslationProvider,
  SabiCallTranslationProviderHealth,
  SabiCallTranslationProviderRequest,
  SabiCallTranslationProviderResult,
} from "./sabi-call-translation-provider.port";

export class DisabledSabiCallTranslationProvider implements SabiCallTranslationProvider {
  readonly providerKey = "provider_not_configured";

  getHealth(): SabiCallTranslationProviderHealth {
    return {
      ready: false,
      providerKey: this.providerKey,
      reason: "provider_not_configured",
    };
  }

  async translateCallSegment(
    _request: SabiCallTranslationProviderRequest
  ): Promise<SabiCallTranslationProviderResult> {
    throw new Error("provider_not_configured");
  }
}
