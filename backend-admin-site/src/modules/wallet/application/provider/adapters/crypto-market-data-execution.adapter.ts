import { createUnavailableWalletProviderExecutionAdapter } from "./wallet-provider-adapter.types"

export const cryptoMarketDataExecutionAdapter = createUnavailableWalletProviderExecutionAdapter({
  providerId: "crypto_market_data_provider",
  adapterId: "crypto_market_data_provider.real_market_data_adapter_required",
  capabilities: ["crypto_market_data"],
})
