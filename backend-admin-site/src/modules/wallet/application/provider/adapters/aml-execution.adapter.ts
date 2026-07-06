import { createUnavailableWalletProviderExecutionAdapter } from "./wallet-provider-adapter.types"

export const amlExecutionAdapter = createUnavailableWalletProviderExecutionAdapter({
  providerId: "aml_provider",
  adapterId: "aml_provider.real_adapter_required",
  capabilities: ["aml_screening"],
})
