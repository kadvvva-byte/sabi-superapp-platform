import { createUnavailableWalletProviderExecutionAdapter } from "./wallet-provider-adapter.types"

export const coinWalletLedgerExecutionAdapter = createUnavailableWalletProviderExecutionAdapter({
  providerId: "coin_wallet_ledger",
  adapterId: "coin_wallet_ledger.real_treasury_ledger_required",
  capabilities: ["coin_ledger"],
})
