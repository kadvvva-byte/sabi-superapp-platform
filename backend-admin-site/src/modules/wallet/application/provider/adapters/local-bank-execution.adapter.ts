import { createUnavailableWalletProviderExecutionAdapter } from "./wallet-provider-adapter.types"

export const localBankExecutionAdapter = createUnavailableWalletProviderExecutionAdapter({
  providerId: "local_bank_gateway",
  adapterId: "local_bank_gateway.real_adapter_required",
  capabilities: ["bank_deposit", "bank_transfer", "bank_withdraw"],
})
