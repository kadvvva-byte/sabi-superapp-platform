import { createUnavailableWalletProviderExecutionAdapter } from "./wallet-provider-adapter.types"

export const cardTokenizationExecutionAdapter = createUnavailableWalletProviderExecutionAdapter({
  providerId: "bank_card_tokenization",
  adapterId: "bank_card_tokenization.sdk_or_iframe_required",
  capabilities: ["card_tokenization"],
})
