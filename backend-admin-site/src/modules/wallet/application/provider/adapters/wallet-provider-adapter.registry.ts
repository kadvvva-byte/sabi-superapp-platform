import type { SabiWalletProviderManifestItem } from "../wallet-provider-config.service"
import { alipayPlusExecutionAdapter } from "./alipay-plus-execution.adapter"
import { amlExecutionAdapter } from "./aml-execution.adapter"
import { businessPayoutExecutionAdapter } from "./business-payout-execution.adapter"
import { cardTokenizationExecutionAdapter } from "./card-tokenization-execution.adapter"
import { coinWalletLedgerExecutionAdapter } from "./coin-wallet-ledger-execution.adapter"
import { cryptoCustodyExecutionAdapter } from "./crypto-custody-execution.adapter"
import { cryptoMarketDataExecutionAdapter } from "./crypto-market-data-execution.adapter"
import { kycExecutionAdapter } from "./kyc-execution.adapter"
import { localBankExecutionAdapter } from "./local-bank-execution.adapter"
import { merchantAcquiringExecutionAdapter } from "./merchant-acquiring-execution.adapter"
import { virtualCardIssuerExecutionAdapter } from "./virtual-card-issuer-execution.adapter"
import type {
  WalletProviderExecutionAdapter,
  WalletProviderExecutionAdapterReadiness,
} from "./wallet-provider-adapter.types"

const ADAPTERS: Record<string, WalletProviderExecutionAdapter> = {
  alipay_plus_acquiring: alipayPlusExecutionAdapter,
  local_bank_gateway: localBankExecutionAdapter,
  bank_card_tokenization: cardTokenizationExecutionAdapter,
  virtual_card_issuer: virtualCardIssuerExecutionAdapter,
  merchant_acquiring: merchantAcquiringExecutionAdapter,
  business_payout: businessPayoutExecutionAdapter,
  coin_wallet_ledger: coinWalletLedgerExecutionAdapter,
  crypto_custody_provider: cryptoCustodyExecutionAdapter,
  crypto_market_data_provider: cryptoMarketDataExecutionAdapter,
  kyc_provider: kycExecutionAdapter,
  aml_provider: amlExecutionAdapter,
}

export class WalletProviderExecutionAdapterRegistry {
  constructor(
    private readonly adapters: Record<string, WalletProviderExecutionAdapter> = ADAPTERS
  ) {}

  listAdapters(): WalletProviderExecutionAdapter[] {
    return Object.values(this.adapters)
  }

  resolveAdapter(providerId: string): WalletProviderExecutionAdapter | null {
    return this.adapters[providerId] ?? null
  }

  checkAdapterReadiness(
    provider: SabiWalletProviderManifestItem
  ): WalletProviderExecutionAdapterReadiness {
    const adapter = this.resolveAdapter(provider.providerId)

    if (!adapter) {
      return {
        providerId: provider.providerId,
        adapterId: "missing_provider_adapter",
        adapterBound: false,
        executionAvailable: false,
        reason: `wallet_provider_adapter_missing:${provider.providerId}`,
        capabilities: [],
        requiresVaultSecrets: true,
        secretsLoadedInMobile: false,
        tokenOnlyStorage: true,
        panStorageAllowed: false,
        cvvStorageAllowed: false,
        storesPrivateKeys: false,
        storesSeedPhrase: false,
      }
    }

    return adapter.getReadiness(provider)
  }
}

export const walletProviderExecutionAdapterRegistry =
  new WalletProviderExecutionAdapterRegistry()
