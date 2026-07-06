import { createUnavailableWalletProviderExecutionAdapter } from "./wallet-provider-adapter.types"

export const alipayPlusExecutionAdapter = createUnavailableWalletProviderExecutionAdapter({
  providerId: "alipay_plus_acquiring",
  adapterId: "alipay_plus_acquiring.real_adapter_required",
  capabilities: ["alipay_payment"],
})
