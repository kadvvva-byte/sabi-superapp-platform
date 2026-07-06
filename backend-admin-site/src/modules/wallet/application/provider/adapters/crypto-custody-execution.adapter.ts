import { createUnavailableWalletProviderExecutionAdapter } from "./wallet-provider-adapter.types"

export const cryptoCustodyExecutionAdapter = createUnavailableWalletProviderExecutionAdapter({
  providerId: "crypto_custody_provider",
  adapterId: "crypto_custody_provider.real_custody_adapter_required",
  capabilities: ["crypto_custody"],
})
