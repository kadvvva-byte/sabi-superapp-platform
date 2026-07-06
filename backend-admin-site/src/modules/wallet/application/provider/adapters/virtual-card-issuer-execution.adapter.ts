import { createUnavailableWalletProviderExecutionAdapter } from "./wallet-provider-adapter.types"

export const virtualCardIssuerExecutionAdapter = createUnavailableWalletProviderExecutionAdapter({
  providerId: "virtual_card_issuer",
  adapterId: "virtual_card_issuer.real_issuer_adapter_required",
  capabilities: ["virtual_card_issue"],
})
