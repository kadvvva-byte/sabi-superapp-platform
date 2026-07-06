import { createUnavailableWalletProviderExecutionAdapter } from "./wallet-provider-adapter.types"

export const merchantAcquiringExecutionAdapter = createUnavailableWalletProviderExecutionAdapter({
  providerId: "merchant_acquiring",
  adapterId: "merchant_acquiring.real_adapter_required",
  capabilities: ["merchant_payment", "merchant_settlement"],
})
