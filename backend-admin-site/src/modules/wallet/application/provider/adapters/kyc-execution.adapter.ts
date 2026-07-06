import { createUnavailableWalletProviderExecutionAdapter } from "./wallet-provider-adapter.types"

export const kycExecutionAdapter = createUnavailableWalletProviderExecutionAdapter({
  providerId: "kyc_provider",
  adapterId: "kyc_provider.real_adapter_required",
  capabilities: ["kyc_verification"],
})
