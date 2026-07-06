import { DisabledSabiCallTranslationProvider } from "./sabi-call-translation-disabled.provider";
import type {
  SabiCallTranslationProvider,
  SabiCallTranslationProviderHealth,
} from "./sabi-call-translation-provider.port";

export type SabiCallTranslationBridge = {
  readonly provider: SabiCallTranslationProvider;
  getHealth(): SabiCallTranslationProviderHealth;
};

export function createSabiCallTranslationBridge(
  provider?: SabiCallTranslationProvider | null
): SabiCallTranslationBridge {
  const activeProvider = provider ?? new DisabledSabiCallTranslationProvider();

  return {
    provider: activeProvider,
    getHealth: () => activeProvider.getHealth(),
  };
}

export function createDisabledSabiCallTranslationProvider(): SabiCallTranslationProvider {
  return new DisabledSabiCallTranslationProvider();
}
