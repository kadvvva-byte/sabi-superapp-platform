import {
  WalletProviderConfigService,
  type SabiWalletProviderManifestItem,
  type SabiWalletProviderStatus,
} from "./wallet-provider-config.service"
import {
  WalletProviderExecutionAdapterRegistry,
  walletProviderExecutionAdapterRegistry,
} from "./adapters/wallet-provider-adapter.registry"
import type { WalletProviderExecutionAdapterReadiness } from "./adapters/wallet-provider-adapter.types"

export type WalletExecutionRoute =
  | "wallet_deposit"
  | "wallet_transfer"
  | "wallet_withdraw"
  | "qr_wallet_payment"
  | "sabi_user_transfer"
  | "merchant_payment"
  | "merchant_settlement"
  | "business_transfer"
  | "business_payout"
  | "card_tokenization"
  | "virtual_card_issue"
  | "coin_send"
  | "coin_receive"
  | "coin_topup"
  | "coin_withdraw"
  | "coin_deposit"
  | "crypto_send"
  | "crypto_receive"
  | "crypto_buy"
  | "crypto_sell"
  | "crypto_swap"
  | "crypto_market_data"
  | "kyc_verification"
  | "kyc_status"
  | "aml_screening"
  | "aml_transaction_monitoring"
  | string

export type WalletProviderExecutionReadiness = {
  ok: boolean
  route: WalletExecutionRoute
  requiredProviderId: string
  providerStatus: SabiWalletProviderStatus
  providerFamily: SabiWalletProviderManifestItem["family"]
  executionAdapterEnabled: boolean
  adapterReadiness: WalletProviderExecutionAdapterReadiness
  reason?: string
  tokenOnlyStorage: true
  panStorageAllowed: false
  cvvStorageAllowed: false
  mobileCanReadSecret: false
}

type AssertReadyOptions = {
  route: WalletExecutionRoute
  providerId?: string
  reason?: string
}

const ROUTE_PROVIDER_MAP: Record<string, string> = {
  wallet_deposit: "local_bank_gateway",
  wallet_transfer: "local_bank_gateway",
  wallet_withdraw: "local_bank_gateway",
  qr_wallet_payment: "alipay_plus_acquiring",
  sabi_user_transfer: "local_bank_gateway",
  merchant_payment: "merchant_acquiring",
  merchant_settlement: "merchant_acquiring",
  business_transfer: "business_payout",
  business_payout: "business_payout",
  card_tokenization: "bank_card_tokenization",
  virtual_card_issue: "virtual_card_issuer",
  coin_send: "coin_wallet_ledger",
  coin_receive: "coin_wallet_ledger",
  coin_topup: "coin_wallet_ledger",
  coin_withdraw: "coin_wallet_ledger",
  coin_deposit: "coin_wallet_ledger",
  crypto_send: "crypto_custody_provider",
  crypto_receive: "crypto_custody_provider",
  crypto_buy: "crypto_custody_provider",
  crypto_sell: "crypto_custody_provider",
  crypto_swap: "crypto_custody_provider",
  crypto_market_data: "crypto_market_data_provider",
  kyc_verification: "kyc_provider",
  kyc_status: "kyc_provider",
  aml_screening: "aml_provider",
  aml_transaction_monitoring: "aml_provider",
}

function normalizeRoute(route: WalletExecutionRoute): string {
  const normalized = String(route ?? "").trim().toLowerCase()

  if (!normalized) {
    return "wallet_transfer"
  }

  return normalized
}

function inferProviderId(route: WalletExecutionRoute): string {
  const normalized = normalizeRoute(route)

  return ROUTE_PROVIDER_MAP[normalized] ?? "local_bank_gateway"
}

function isTruthyFlag(value: string | undefined): boolean {
  if (value === undefined || value.trim() === "") return false
  const normalized = value.trim().toLowerCase()

  return normalized === "1" || normalized === "true" || normalized === "yes" || normalized === "enabled"
}

function toProviderExecutionEnv(providerId: string): string {
  return `WALLET_PROVIDER_EXECUTION_${providerId.toUpperCase().replace(/[^A-Z0-9]+/g, "_")}_ENABLED`
}

export class WalletProviderExecutionGuard {
  constructor(
    private readonly providerConfigService = new WalletProviderConfigService(),
    private readonly adapterRegistry: WalletProviderExecutionAdapterRegistry =
      walletProviderExecutionAdapterRegistry
  ) {}

  checkProviderReady(
    route: WalletExecutionRoute,
    providerId = inferProviderId(route)
  ): WalletProviderExecutionReadiness {
    const normalizedRoute = normalizeRoute(route)
    const provider = this.providerConfigService.resolveProvider(providerId)
    const adapterReadiness = this.adapterRegistry.checkAdapterReadiness(provider)
    const executionAdapterEnabled =
      isTruthyFlag(process.env.WALLET_PROVIDER_EXECUTION_ENABLED) ||
      isTruthyFlag(process.env[toProviderExecutionEnv(provider.providerId)])
    const ok =
      provider.status === "ready" &&
      executionAdapterEnabled &&
      adapterReadiness.executionAvailable

    return {
      ok,
      route: normalizedRoute,
      requiredProviderId: provider.providerId,
      providerStatus: provider.status,
      providerFamily: provider.family,
      executionAdapterEnabled,
      adapterReadiness,
      reason: ok
        ? undefined
        : provider.status !== "ready"
          ? `wallet_provider_not_ready:${provider.providerId}:${provider.status}`
          : !executionAdapterEnabled
            ? `wallet_provider_execution_adapter_not_enabled:${provider.providerId}`
            : adapterReadiness.reason ?? `wallet_provider_adapter_not_ready:${provider.providerId}`,
      tokenOnlyStorage: true,
      panStorageAllowed: false,
      cvvStorageAllowed: false,
      mobileCanReadSecret: false,
    }
  }

  assertProviderReady(options: AssertReadyOptions): WalletProviderExecutionReadiness {
    const readiness = this.checkProviderReady(options.route, options.providerId)

    if (!readiness.ok) {
      throw new Error(options.reason ?? readiness.reason ?? "wallet_provider_not_ready")
    }

    return readiness
  }

  assertQrRouteReady(route: WalletExecutionRoute): WalletProviderExecutionReadiness {
    const normalizedRoute = normalizeRoute(route)

    if (normalizedRoute === "coin_send" || normalizedRoute === "coin_receive") {
      return this.assertProviderReady({ route: normalizedRoute, providerId: "coin_wallet_ledger" })
    }

    if (normalizedRoute === "merchant_payment") {
      return this.assertProviderReady({ route: normalizedRoute, providerId: "merchant_acquiring" })
    }

    if (normalizedRoute === "sabi_user_transfer") {
      return this.assertProviderReady({ route: normalizedRoute, providerId: "local_bank_gateway" })
    }

    return this.assertProviderReady({ route: "qr_wallet_payment", providerId: "alipay_plus_acquiring" })
  }

  buildBlockedExecutionResponse(route: WalletExecutionRoute) {
    const readiness = this.checkProviderReady(route)

    return {
      ok: false,
      status: "provider_not_configured" as const,
      reason: readiness.reason,
      route: readiness.route,
      requiredProviderId: readiness.requiredProviderId,
      providerStatus: readiness.providerStatus,
      providerFamily: readiness.providerFamily,
      executionAdapterEnabled: readiness.executionAdapterEnabled,
      adapterReadiness: readiness.adapterReadiness,
      tokenOnlyStorage: true as const,
      panStorageAllowed: false as const,
      cvvStorageAllowed: false as const,
      mobileCanReadSecret: false as const,
    }
  }
}

export const walletProviderExecutionGuard = new WalletProviderExecutionGuard()
