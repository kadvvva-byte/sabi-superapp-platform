import { createUnavailableWalletProviderExecutionAdapter } from "./wallet-provider-adapter.types"

export const businessPayoutExecutionAdapter = createUnavailableWalletProviderExecutionAdapter({
  providerId: "business_payout",
  adapterId: "business_payout.real_adapter_required",
  capabilities: ["business_payout"],
})
