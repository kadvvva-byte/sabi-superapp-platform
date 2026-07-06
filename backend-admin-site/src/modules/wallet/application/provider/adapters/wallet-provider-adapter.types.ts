import type { SabiWalletProviderManifestItem } from "../wallet-provider-config.service"

export type WalletProviderAdapterCapability =
  | "alipay_payment"
  | "bank_deposit"
  | "bank_transfer"
  | "bank_withdraw"
  | "card_tokenization"
  | "virtual_card_issue"
  | "merchant_payment"
  | "merchant_settlement"
  | "business_payout"
  | "coin_ledger"
  | "crypto_custody"
  | "crypto_market_data"
  | "kyc_verification"
  | "aml_screening"

export type WalletProviderExecutionAdapterReadiness = {
  providerId: string
  adapterId: string
  adapterBound: boolean
  executionAvailable: boolean
  reason?: string
  capabilities: WalletProviderAdapterCapability[]
  requiresVaultSecrets: true
  secretsLoadedInMobile: false
  tokenOnlyStorage: true
  panStorageAllowed: false
  cvvStorageAllowed: false
  storesPrivateKeys: false
  storesSeedPhrase: false
}

export type WalletProviderExecutionAdapterInput = {
  route: string
  providerId: string
  userId?: string
  walletId?: string
  amount?: string | number
  currency?: string
  providerReference?: string
  ledgerReference?: string
  payload?: unknown
  metadata?: Record<string, unknown>
}

export type WalletProviderExecutionAdapterResult = {
  ok: true
  providerId: string
  adapterId: string
  providerReference: string
  ledgerReference?: string
  providerStatus: "provider_pending" | "provider_confirmed"
  tokenOnlyStorage: true
  panStorageAllowed: false
  cvvStorageAllowed: false
}

export interface WalletProviderExecutionAdapter {
  readonly providerId: string
  readonly adapterId: string
  readonly capabilities: WalletProviderAdapterCapability[]

  getReadiness(provider: SabiWalletProviderManifestItem): WalletProviderExecutionAdapterReadiness

  execute(input: WalletProviderExecutionAdapterInput): Promise<WalletProviderExecutionAdapterResult>
}

export class WalletProviderAdapterNotConfiguredError extends Error {
  constructor(providerId: string, adapterId: string, reason = "wallet_provider_adapter_not_configured") {
    super(`${reason}:${providerId}:${adapterId}`)
    this.name = "WalletProviderAdapterNotConfiguredError"
  }
}

function looksLikeUnsafeCardDataKey(key: string): boolean {
  const normalized = key.toLowerCase().replace(/[^a-z0-9]/g, "")

  return (
    normalized === "pan" ||
    normalized === "cvv" ||
    normalized === "cvc" ||
    normalized === "cardnumber" ||
    normalized === "rawcardnumber" ||
    normalized === "securitycode" ||
    normalized === "cardsecuritycode" ||
    normalized === "expiry" ||
    normalized === "expiration" ||
    normalized === "expdate"
  )
}

export function hasUnsafeCardData(value: unknown, depth = 0): boolean {
  if (value === null || value === undefined) return false
  if (depth > 5) return false

  if (Array.isArray(value)) {
    return value.some((item) => hasUnsafeCardData(item, depth + 1))
  }

  if (typeof value !== "object") {
    return false
  }

  return Object.entries(value as Record<string, unknown>).some(([key, nested]) => {
    if (looksLikeUnsafeCardDataKey(key)) return true
    return hasUnsafeCardData(nested, depth + 1)
  })
}

export function createUnavailableWalletProviderExecutionAdapter(params: {
  providerId: string
  adapterId: string
  capabilities: WalletProviderAdapterCapability[]
  reason?: string
}): WalletProviderExecutionAdapter {
  return {
    providerId: params.providerId,
    adapterId: params.adapterId,
    capabilities: params.capabilities,

    getReadiness(provider) {
      const reason =
        params.reason ??
        (provider.status === "ready"
          ? "real_provider_adapter_not_bound"
          : `wallet_provider_not_ready:${provider.providerId}:${provider.status}`)

      return {
        providerId: params.providerId,
        adapterId: params.adapterId,
        adapterBound: false,
        executionAvailable: false,
        reason,
        capabilities: [...params.capabilities],
        requiresVaultSecrets: true,
        secretsLoadedInMobile: false,
        tokenOnlyStorage: true,
        panStorageAllowed: false,
        cvvStorageAllowed: false,
        storesPrivateKeys: false,
        storesSeedPhrase: false,
      }
    },

    async execute(input) {
      if (hasUnsafeCardData(input)) {
        throw new WalletProviderAdapterNotConfiguredError(
          params.providerId,
          params.adapterId,
          "raw_card_data_blocked"
        )
      }

      throw new WalletProviderAdapterNotConfiguredError(
        params.providerId,
        params.adapterId,
        params.reason ?? "real_provider_adapter_not_bound"
      )
    },
  }
}
