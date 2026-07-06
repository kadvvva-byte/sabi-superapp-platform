import {
  WalletProviderConfigService,
  type SabiWalletProviderDefinition,
  type SabiWalletProviderManifestItem,
} from "./wallet-provider-config.service"
import {
  WalletProviderExecutionGuard,
  type WalletExecutionRoute,
  type WalletProviderExecutionReadiness,
} from "./wallet-provider-execution.guard"

export type WalletProviderBindingPriority =
  | "critical_banking"
  | "critical_compliance"
  | "core_wallet"
  | "ecosystem_wallet"
  | "crypto_wallet"

export type WalletProviderBindingChecklistItem = {
  providerId: string
  title: string
  family: SabiWalletProviderManifestItem["family"]
  module: string
  priority: WalletProviderBindingPriority
  providerStatus: SabiWalletProviderManifestItem["status"]
  environment: SabiWalletProviderManifestItem["environment"]
  configured: boolean
  enabled: boolean
  executionRoute: WalletExecutionRoute
  executionReadiness: WalletProviderExecutionReadiness
  requiredSecretEnv: string[]
  missingSecretEnv: string[]
  requiredPublicEnv: string[]
  missingPublicEnv: string[]
  requiredAdminFields: string[]
  requiredWebhooks: string[]
  requiredExecutionFlags: string[]
  requiredBackendBindings: string[]
  requiredOperationalChecks: string[]
  blockingReasons: string[]
  nextActions: string[]
  tokenOnlyStorage: true
  panStorageAllowed: false
  cvvStorageAllowed: false
  mobileCanReadSecret: false
  secretValuesReturned: false
  storesPrivateKeys: false
  storesSeedPhrase: false
}

export type WalletProviderLaunchChecklist = {
  generatedAt: string
  launchReady: boolean
  bankingPriority: true
  alipayCompatible: true
  tokenOnlyStorage: true
  panStorageAllowed: false
  cvvStorageAllowed: false
  mobileCanReadSecret: false
  secretValuesReturned: false
  providerCount: number
  readyProviderCount: number
  blockedProviderCount: number
  checklist: WalletProviderBindingChecklistItem[]
}

type WalletProviderLaunchChecklistOptions = {
  redactSecretEnv?: boolean
}

const PROVIDER_ROUTE_MAP: Record<string, WalletExecutionRoute> = {
  alipay_plus_acquiring: "qr_wallet_payment",
  local_bank_gateway: "wallet_transfer",
  bank_card_tokenization: "card_tokenization",
  virtual_card_issuer: "virtual_card_issue",
  merchant_acquiring: "merchant_payment",
  business_payout: "business_payout",
  coin_wallet_ledger: "coin_topup",
  crypto_custody_provider: "crypto_send",
  crypto_market_data_provider: "crypto_market_data",
  kyc_provider: "wallet_transfer",
  aml_provider: "wallet_transfer",
}

function toProviderExecutionEnv(providerId: string): string {
  return `WALLET_PROVIDER_EXECUTION_${providerId.toUpperCase().replace(/[^A-Z0-9]+/g, "_")}_ENABLED`
}

function priorityForProvider(provider: SabiWalletProviderDefinition): WalletProviderBindingPriority {
  if (provider.providerId === "alipay_plus_acquiring") return "critical_banking"
  if (provider.providerId === "local_bank_gateway") return "critical_banking"
  if (provider.providerId === "bank_card_tokenization") return "critical_banking"
  if (provider.providerId === "virtual_card_issuer") return "critical_banking"
  if (provider.providerId === "kyc_provider" || provider.providerId === "aml_provider") {
    return "critical_compliance"
  }
  if (provider.providerId === "merchant_acquiring" || provider.providerId === "business_payout") {
    return "core_wallet"
  }
  if (provider.providerId === "coin_wallet_ledger") return "ecosystem_wallet"
  if (
    provider.providerId === "crypto_custody_provider" ||
    provider.providerId === "crypto_market_data_provider"
  ) {
    return "crypto_wallet"
  }

  return "core_wallet"
}

function requiredBackendBindings(providerId: string): string[] {
  switch (providerId) {
    case "alipay_plus_acquiring":
      return [
        "Alipay+ partner API client bound on backend only",
        "Alipay+ webhook signature verification",
        "payment inquiry/refund/settlement handlers",
        "provider reference to ledger reference mapping",
      ]
    case "local_bank_gateway":
      return [
        "bank gateway payment/payout client bound on backend only",
        "bank webhook signature verification",
        "wallet ledger debit/credit persistence",
        "safe-hold/restricted account handling",
      ]
    case "bank_card_tokenization":
      return [
        "bank/provider SDK or iFrame launch URL from backend",
        "card tokenization webhook handler",
        "provider token ID storage only",
        "masked card metadata persistence",
      ]
    case "virtual_card_issuer":
      return [
        "issuer API client bound on backend only",
        "KYC-approved issuance policy",
        "issuer token/reference persistence",
        "authorization/freeze/close webhook handlers",
      ]
    case "merchant_acquiring":
      return [
        "merchant acquiring client bound on backend only",
        "KYB/admin approval gate",
        "merchant payment and settlement webhook handlers",
        "chargeback/risk/admin review route",
      ]
    case "business_payout":
      return [
        "business payout client bound on backend only",
        "KYB/admin approval gate",
        "payout webhook handler",
        "business wallet route separated from personal wallet",
      ]
    case "coin_wallet_ledger":
      return [
        "COIN ledger service bound on backend only",
        "treasury account and signing key vault refs",
        "Coin-to-Sabi-Wallet bridge policy",
        "monthly earnings release policy",
      ]
    case "crypto_custody_provider":
      return [
        "crypto custody provider client bound on backend only",
        "deposit address and withdrawal status webhooks",
        "chain/network policy",
        "no seed/private-key storage on Sabi infrastructure",
      ]
    case "crypto_market_data_provider":
      return [
        "market data provider client bound on backend only",
        "price-feed health checks",
        "stale price guard",
        "no fake crypto prices",
      ]
    case "kyc_provider":
      return [
        "KYC provider client bound on backend only",
        "verification webhook handler",
        "user/account KYC status persistence",
        "admin review fallback",
      ]
    case "aml_provider":
      return [
        "AML provider client bound on backend only",
        "sanctions/transaction monitoring webhook handler",
        "risk case persistence",
        "safe-hold/restricted-state integration",
      ]
    default:
      return ["real provider adapter bound on backend only"]
  }
}

function requiredOperationalChecks(providerId: string): string[] {
  const base = [
    "production/sandbox environment selected intentionally",
    "webhook endpoint registered and signature verification tested",
    "audit trail stores provider references but never secrets",
    "mobile receives status only, never secret values",
  ]

  if (providerId === "bank_card_tokenization" || providerId === "virtual_card_issuer") {
    return [
      ...base,
      "PAN/CVV never touch Sabi backend/mobile storage",
      "only token ID + masked metadata are persisted",
    ]
  }

  if (providerId === "crypto_custody_provider") {
    return [
      ...base,
      "Sabi never stores seed phrases or private keys",
      "withdrawal risk/admin review route tested",
    ]
  }

  return base
}

function dedupe(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))]
}

export class WalletProviderLaunchChecklistService {
  constructor(
    private readonly providerConfigService = new WalletProviderConfigService(),
    private readonly executionGuard = new WalletProviderExecutionGuard(providerConfigService)
  ) {}

  getChecklist(options: WalletProviderLaunchChecklistOptions = {}): WalletProviderLaunchChecklist {
    const manifest = this.providerConfigService.getManifest()
    const definitions = this.providerConfigService.listDefinitions()
    const checklist: WalletProviderBindingChecklistItem[] = definitions.map((definition): WalletProviderBindingChecklistItem => {
      const provider = manifest.providers.find((item) => item.providerId === definition.providerId)

      if (!provider) {
        throw new Error(`wallet_provider_manifest_missing:${definition.providerId}`)
      }

      const executionRoute = PROVIDER_ROUTE_MAP[definition.providerId] ?? "wallet_transfer"
      const executionReadiness = this.executionGuard.checkProviderReady(
        executionRoute,
        definition.providerId
      )
      const requiredExecutionFlags = [
        "WALLET_PROVIDER_EXECUTION_ENABLED",
        toProviderExecutionEnv(definition.providerId),
      ]
      const blockingReasons = dedupe([
        provider.status !== "ready"
          ? `provider_not_ready:${definition.providerId}:${provider.status}`
          : "",
        !executionReadiness.executionAdapterEnabled
          ? `execution_flag_not_enabled:${definition.providerId}`
          : "",
        !executionReadiness.adapterReadiness.executionAvailable
          ? executionReadiness.adapterReadiness.reason ?? `adapter_not_ready:${definition.providerId}`
          : "",
        provider.missingSecretEnv.length > 0 ? "missing_backend_secret_or_vault_ref" : "",
        provider.missingPublicEnv.length > 0 ? "missing_backend_public_provider_config" : "",
      ])
      const nextActions = dedupe([
        provider.enabled ? "" : `enable ${definition.enabledEnv ?? definition.providerId}`,
        provider.environment === "not_configured"
          ? `set ${definition.environmentEnv ?? "provider environment"} to sandbox or production`
          : "",
        ...provider.missingSecretEnv.map((name) => `set backend vault reference: ${name}`),
        ...provider.missingPublicEnv.map((name) => `set backend provider config: ${name}`),
        !executionReadiness.executionAdapterEnabled
          ? `enable execution flag only after real adapter is bound: ${toProviderExecutionEnv(definition.providerId)}`
          : "",
        !executionReadiness.adapterReadiness.executionAvailable
          ? `bind real adapter: ${executionReadiness.adapterReadiness.adapterId}`
          : "",
        ...definition.requiredWebhooks.map((name) => `register and verify webhook: ${name}`),
      ])

      return {
        providerId: definition.providerId,
        title: definition.title,
        family: provider.family,
        module: provider.module,
        priority: priorityForProvider(definition),
        providerStatus: provider.status,
        environment: provider.environment,
        configured: provider.configured,
        enabled: provider.enabled,
        executionRoute,
        executionReadiness,
        requiredSecretEnv: options.redactSecretEnv ? [] : [...definition.requiredSecretEnv],
        missingSecretEnv: options.redactSecretEnv ? [] : [...provider.missingSecretEnv],
        requiredPublicEnv: [...(definition.requiredPublicEnv ?? [])],
        missingPublicEnv: [...provider.missingPublicEnv],
        requiredAdminFields: [...definition.requiredAdminFields],
        requiredWebhooks: [...definition.requiredWebhooks],
        requiredExecutionFlags,
        requiredBackendBindings: requiredBackendBindings(definition.providerId),
        requiredOperationalChecks: requiredOperationalChecks(definition.providerId),
        blockingReasons,
        nextActions,
        tokenOnlyStorage: true,
        panStorageAllowed: false,
        cvvStorageAllowed: false,
        mobileCanReadSecret: false,
        secretValuesReturned: false,
        storesPrivateKeys: false,
        storesSeedPhrase: false,
      }
    })
    const blockedProviderCount = checklist.filter((item) => item.blockingReasons.length > 0).length

    return {
      generatedAt: new Date().toISOString(),
      launchReady: blockedProviderCount === 0,
      bankingPriority: true,
      alipayCompatible: true,
      tokenOnlyStorage: true,
      panStorageAllowed: false,
      cvvStorageAllowed: false,
      mobileCanReadSecret: false,
      secretValuesReturned: false,
      providerCount: checklist.length,
      readyProviderCount: checklist.length - blockedProviderCount,
      blockedProviderCount,
      checklist,
    }
  }
}
