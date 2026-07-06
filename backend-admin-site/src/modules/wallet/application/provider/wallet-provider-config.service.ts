export type SabiWalletProviderFamily =
  | "bank"
  | "card"
  | "virtual_card"
  | "acquiring"
  | "merchant"
  | "business"
  | "coin"
  | "crypto"
  | "kyc"
  | "aml"
  | "admin"

export type SabiWalletProviderStatus =
  | "provider_not_configured"
  | "ready"
  | "disabled_by_admin"
  | "admin_review_required"

export type SabiWalletProviderEnvironment =
  | "sandbox"
  | "production"
  | "not_configured"

export type SabiWalletProviderDefinition = {
  readonly providerId: string
  readonly title: string
  readonly family: SabiWalletProviderFamily
  readonly module: string
  readonly environmentEnv?: string
  readonly enabledEnv?: string
  readonly requiredSecretEnv: readonly string[]
  readonly requiredPublicEnv?: readonly string[]
  readonly requiredAdminFields: readonly string[]
  readonly requiredWebhooks: readonly string[]
  readonly tokenOnlyStorage: true
  readonly panStorageAllowed: false
  readonly cvvStorageAllowed: false
  readonly mobileCanReadSecret: false
  readonly storesPrivateKeys?: false
  readonly storesSeedPhrase?: false
}

export type SabiWalletProviderManifestItem = {
  providerId: string
  title: string
  family: SabiWalletProviderFamily
  module: string
  status: SabiWalletProviderStatus
  environment: SabiWalletProviderEnvironment
  enabled: boolean
  configured: boolean
  missingSecretEnv: string[]
  missingPublicEnv: string[]
  requiredAdminFields: string[]
  requiredWebhooks: string[]
  tokenOnlyStorage: true
  panStorageAllowed: false
  cvvStorageAllowed: false
  mobileCanReadSecret: false
  storesPrivateKeys: false
  storesSeedPhrase: false
  secretValuesReturned: false
}

export type SabiWalletProviderManifest = {
  generatedAt: string
  overallStatus: SabiWalletProviderStatus
  bankingPriority: true
  alipayCompatible: true
  tokenOnlyStorage: true
  panStorageAllowed: false
  cvvStorageAllowed: false
  mobileCanReadSecret: false
  providerCount: number
  readyProviderCount: number
  providers: SabiWalletProviderManifestItem[]
}

const PROVIDERS: readonly SabiWalletProviderDefinition[] = [
  {
    providerId: "alipay_plus_acquiring",
    title: "Alipay+ acquiring / partner API",
    family: "acquiring",
    module: "payments",
    environmentEnv: "ALIPAY_PLUS_ENVIRONMENT",
    enabledEnv: "ALIPAY_PLUS_ENABLED",
    requiredSecretEnv: [
      "ALIPAY_PLUS_PRIVATE_KEY_VAULT_REF",
      "ALIPAY_PLUS_WEBHOOK_SECRET_VAULT_REF",
    ],
    requiredPublicEnv: [
      "ALIPAY_PLUS_PARTNER_ID",
      "ALIPAY_PLUS_CLIENT_ID",
      "ALIPAY_PLUS_MERCHANT_ID",
      "ALIPAY_PLUS_PUBLIC_KEY_ID",
    ],
    requiredAdminFields: [
      "partnerId",
      "clientId",
      "merchantId",
      "publicKeyId",
      "privateKeyVaultRef",
      "webhookSecretVaultRef",
      "environment",
    ],
    requiredWebhooks: [
      "notifyPayment",
      "inquiryPayment",
      "refundNotification",
      "settlementNotification",
    ],
    tokenOnlyStorage: true,
    panStorageAllowed: false,
    cvvStorageAllowed: false,
    mobileCanReadSecret: false,
  },
  {
    providerId: "local_bank_gateway",
    title: "Local bank / payment gateway",
    family: "bank",
    module: "wallet",
    environmentEnv: "LOCAL_BANK_GATEWAY_ENVIRONMENT",
    enabledEnv: "LOCAL_BANK_GATEWAY_ENABLED",
    requiredSecretEnv: [
      "LOCAL_BANK_GATEWAY_API_KEY_VAULT_REF",
      "LOCAL_BANK_GATEWAY_WEBHOOK_SECRET_VAULT_REF",
    ],
    requiredPublicEnv: [
      "LOCAL_BANK_GATEWAY_ID",
      "LOCAL_BANK_MERCHANT_ID",
    ],
    requiredAdminFields: [
      "gatewayId",
      "merchantId",
      "apiKeyVaultRef",
      "webhookSecretVaultRef",
      "tokenizationEnabled",
    ],
    requiredWebhooks: ["paymentStatus", "payoutStatus", "cardTokenized"],
    tokenOnlyStorage: true,
    panStorageAllowed: false,
    cvvStorageAllowed: false,
    mobileCanReadSecret: false,
  },
  {
    providerId: "bank_card_tokenization",
    title: "Bank card tokenization SDK/iFrame",
    family: "card",
    module: "cards",
    environmentEnv: "CARD_TOKENIZATION_ENVIRONMENT",
    enabledEnv: "CARD_TOKENIZATION_ENABLED",
    requiredSecretEnv: [
      "CARD_TOKENIZATION_API_KEY_VAULT_REF",
      "CARD_TOKENIZATION_WEBHOOK_SECRET_VAULT_REF",
    ],
    requiredPublicEnv: [
      "CARD_TOKENIZATION_PROVIDER_ID",
      "CARD_TOKENIZATION_PROGRAM_ID",
    ],
    requiredAdminFields: [
      "providerId",
      "programId",
      "apiKeyVaultRef",
      "webhookSecretVaultRef",
      "sdkOrIframeUrl",
    ],
    requiredWebhooks: ["cardTokenized", "cardTokenRevoked", "cardVerificationStatus"],
    tokenOnlyStorage: true,
    panStorageAllowed: false,
    cvvStorageAllowed: false,
    mobileCanReadSecret: false,
  },
  {
    providerId: "virtual_card_issuer",
    title: "Virtual card issuer / processor",
    family: "virtual_card",
    module: "virtual_cards",
    environmentEnv: "VIRTUAL_CARD_ISSUER_ENVIRONMENT",
    enabledEnv: "VIRTUAL_CARD_ISSUER_ENABLED",
    requiredSecretEnv: [
      "VIRTUAL_CARD_ISSUER_API_KEY_VAULT_REF",
      "VIRTUAL_CARD_ISSUER_WEBHOOK_SECRET_VAULT_REF",
    ],
    requiredPublicEnv: [
      "VIRTUAL_CARD_ISSUER_ID",
      "VIRTUAL_CARD_ISSUER_PROGRAM_ID",
    ],
    requiredAdminFields: [
      "issuerId",
      "issuerProgramId",
      "apiKeyVaultRef",
      "webhookSecretVaultRef",
      "kycPolicy",
      "spendLimitPolicy",
    ],
    requiredWebhooks: [
      "cardIssued",
      "cardAuthorized",
      "cardDeclined",
      "cardFrozen",
      "cardClosed",
    ],
    tokenOnlyStorage: true,
    panStorageAllowed: false,
    cvvStorageAllowed: false,
    mobileCanReadSecret: false,
  },
  {
    providerId: "merchant_acquiring",
    title: "Merchant acquiring / settlement provider",
    family: "merchant",
    module: "merchant_wallet",
    environmentEnv: "MERCHANT_ACQUIRING_ENVIRONMENT",
    enabledEnv: "MERCHANT_ACQUIRING_ENABLED",
    requiredSecretEnv: [
      "MERCHANT_ACQUIRING_API_KEY_VAULT_REF",
      "MERCHANT_ACQUIRING_WEBHOOK_SECRET_VAULT_REF",
    ],
    requiredPublicEnv: [
      "MERCHANT_ACQUIRING_PROVIDER_ID",
      "MERCHANT_ACQUIRING_SETTLEMENT_PROGRAM_ID",
    ],
    requiredAdminFields: [
      "providerId",
      "settlementProgramId",
      "apiKeyVaultRef",
      "webhookSecretVaultRef",
      "kybPolicy",
    ],
    requiredWebhooks: ["merchantPaymentStatus", "settlementStatus", "chargebackStatus"],
    tokenOnlyStorage: true,
    panStorageAllowed: false,
    cvvStorageAllowed: false,
    mobileCanReadSecret: false,
  },
  {
    providerId: "business_payout",
    title: "Business payout / bank transfer provider",
    family: "business",
    module: "business_wallet",
    environmentEnv: "BUSINESS_PAYOUT_ENVIRONMENT",
    enabledEnv: "BUSINESS_PAYOUT_ENABLED",
    requiredSecretEnv: [
      "BUSINESS_PAYOUT_API_KEY_VAULT_REF",
      "BUSINESS_PAYOUT_WEBHOOK_SECRET_VAULT_REF",
    ],
    requiredPublicEnv: ["BUSINESS_PAYOUT_PROVIDER_ID"],
    requiredAdminFields: [
      "providerId",
      "apiKeyVaultRef",
      "webhookSecretVaultRef",
      "kybPolicy",
      "payoutLimitPolicy",
    ],
    requiredWebhooks: ["payoutCreated", "payoutSettled", "payoutFailed", "payoutReversed"],
    tokenOnlyStorage: true,
    panStorageAllowed: false,
    cvvStorageAllowed: false,
    mobileCanReadSecret: false,
  },
  {
    providerId: "coin_wallet_ledger",
    title: "SABI COIN backend ledger / treasury bridge",
    family: "coin",
    module: "coin_wallet",
    environmentEnv: "COIN_WALLET_ENVIRONMENT",
    enabledEnv: "COIN_WALLET_ENABLED",
    requiredSecretEnv: [
      "COIN_TREASURY_SIGNING_KEY_VAULT_REF",
      "COIN_LEDGER_WEBHOOK_SECRET_VAULT_REF",
    ],
    requiredPublicEnv: ["COIN_TREASURY_ACCOUNT_ID"],
    requiredAdminFields: [
      "treasuryAccountId",
      "treasurySigningKeyVaultRef",
      "ledgerWebhookSecretVaultRef",
      "coinToWalletBridgePolicy",
    ],
    requiredWebhooks: ["coinTopupSettled", "coinSpendSettled", "coinBridgeSettled"],
    tokenOnlyStorage: true,
    panStorageAllowed: false,
    cvvStorageAllowed: false,
    mobileCanReadSecret: false,
  },
  {
    providerId: "crypto_custody_provider",
    title: "Crypto custody / wallet provider",
    family: "crypto",
    module: "crypto_wallet",
    environmentEnv: "CRYPTO_CUSTODY_ENVIRONMENT",
    enabledEnv: "CRYPTO_CUSTODY_ENABLED",
    requiredSecretEnv: [
      "CRYPTO_CUSTODY_API_KEY_VAULT_REF",
      "CRYPTO_CUSTODY_WEBHOOK_SECRET_VAULT_REF",
    ],
    requiredPublicEnv: ["CRYPTO_CUSTODY_PROVIDER_ID"],
    requiredAdminFields: [
      "providerId",
      "apiKeyVaultRef",
      "webhookSecretVaultRef",
      "chainPolicy",
      "withdrawalPolicy",
    ],
    requiredWebhooks: ["depositDetected", "withdrawalStatus", "addressCreated"],
    tokenOnlyStorage: true,
    panStorageAllowed: false,
    cvvStorageAllowed: false,
    mobileCanReadSecret: false,
    storesPrivateKeys: false,
    storesSeedPhrase: false,
  },
  {
    providerId: "crypto_market_data_provider",
    title: "Crypto market data provider",
    family: "crypto",
    module: "crypto_market_data",
    environmentEnv: "CRYPTO_MARKET_DATA_ENVIRONMENT",
    enabledEnv: "CRYPTO_MARKET_DATA_ENABLED",
    requiredSecretEnv: ["CRYPTO_MARKET_DATA_API_KEY_VAULT_REF"],
    requiredPublicEnv: ["CRYPTO_MARKET_DATA_PROVIDER_ID"],
    requiredAdminFields: ["providerId", "apiKeyVaultRef", "priceFeedPolicy"],
    requiredWebhooks: ["marketDataHealth", "priceFeedIncident"],
    tokenOnlyStorage: true,
    panStorageAllowed: false,
    cvvStorageAllowed: false,
    mobileCanReadSecret: false,
    storesPrivateKeys: false,
    storesSeedPhrase: false,
  },
  {
    providerId: "kyc_provider",
    title: "KYC identity verification provider",
    family: "kyc",
    module: "compliance",
    environmentEnv: "KYC_PROVIDER_ENVIRONMENT",
    enabledEnv: "KYC_PROVIDER_ENABLED",
    requiredSecretEnv: [
      "KYC_PROVIDER_API_KEY_VAULT_REF",
      "KYC_PROVIDER_WEBHOOK_SECRET_VAULT_REF",
    ],
    requiredPublicEnv: ["KYC_PROVIDER_ID"],
    requiredAdminFields: ["providerId", "apiKeyVaultRef", "webhookSecretVaultRef", "verificationPolicy"],
    requiredWebhooks: ["verificationStarted", "verificationApproved", "verificationRejected"],
    tokenOnlyStorage: true,
    panStorageAllowed: false,
    cvvStorageAllowed: false,
    mobileCanReadSecret: false,
  },
  {
    providerId: "aml_provider",
    title: "AML / sanctions / transaction monitoring provider",
    family: "aml",
    module: "compliance",
    environmentEnv: "AML_PROVIDER_ENVIRONMENT",
    enabledEnv: "AML_PROVIDER_ENABLED",
    requiredSecretEnv: [
      "AML_PROVIDER_API_KEY_VAULT_REF",
      "AML_PROVIDER_WEBHOOK_SECRET_VAULT_REF",
    ],
    requiredPublicEnv: ["AML_PROVIDER_ID"],
    requiredAdminFields: ["providerId", "apiKeyVaultRef", "webhookSecretVaultRef", "screeningPolicy"],
    requiredWebhooks: ["screeningAlert", "transactionRiskStatus", "caseClosed"],
    tokenOnlyStorage: true,
    panStorageAllowed: false,
    cvvStorageAllowed: false,
    mobileCanReadSecret: false,
  },
]

function isTruthyFlag(value: string | undefined): boolean {
  if (value === undefined || value.trim() === "") return false
  const normalized = value.trim().toLowerCase()
  return normalized === "1" || normalized === "true" || normalized === "yes" || normalized === "enabled"
}

function readEnvironment(value: string | undefined): SabiWalletProviderEnvironment {
  const normalized = (value ?? "").trim().toLowerCase()
  if (normalized === "production") return "production"
  if (normalized === "sandbox") return "sandbox"
  return "not_configured"
}

function missingEnv(env: NodeJS.ProcessEnv, names: readonly string[] = []): string[] {
  return names.filter((name) => !env[name] || String(env[name]).trim() === "")
}

export class WalletProviderConfigService {
  constructor(private readonly env: NodeJS.ProcessEnv = process.env) {}

  listDefinitions(): readonly SabiWalletProviderDefinition[] {
    return PROVIDERS
  }

  resolveProvider(providerId: string): SabiWalletProviderManifestItem {
    const provider = PROVIDERS.find((item) => item.providerId === providerId)

    if (!provider) {
      throw new Error(`unknown_wallet_provider:${providerId}`)
    }

    return this.resolveProviderDefinition(provider)
  }

  resolveProviderDefinition(
    provider: SabiWalletProviderDefinition
  ): SabiWalletProviderManifestItem {
    const enabled = provider.enabledEnv
      ? isTruthyFlag(this.env[provider.enabledEnv])
      : false
    const missingSecretEnv = missingEnv(this.env, provider.requiredSecretEnv)
    const missingPublicEnv = missingEnv(this.env, provider.requiredPublicEnv ?? [])
    const configured = enabled && missingSecretEnv.length === 0 && missingPublicEnv.length === 0
    const environment = readEnvironment(
      provider.environmentEnv ? this.env[provider.environmentEnv] : undefined
    )

    let status: SabiWalletProviderStatus = "provider_not_configured"

    if (!enabled && (missingSecretEnv.length > 0 || missingPublicEnv.length > 0)) {
      status = "provider_not_configured"
    } else if (!enabled) {
      status = "disabled_by_admin"
    } else if (!configured) {
      status = "provider_not_configured"
    } else if (environment === "not_configured") {
      status = "admin_review_required"
    } else {
      status = "ready"
    }

    return {
      providerId: provider.providerId,
      title: provider.title,
      family: provider.family,
      module: provider.module,
      status,
      environment,
      enabled,
      configured,
      missingSecretEnv,
      missingPublicEnv,
      requiredAdminFields: [...provider.requiredAdminFields],
      requiredWebhooks: [...provider.requiredWebhooks],
      tokenOnlyStorage: true,
      panStorageAllowed: false,
      cvvStorageAllowed: false,
      mobileCanReadSecret: false,
      storesPrivateKeys: false,
      storesSeedPhrase: false,
      secretValuesReturned: false,
    }
  }

  getManifest(): SabiWalletProviderManifest {
    const providers = PROVIDERS.map((provider) => this.resolveProviderDefinition(provider))
    const readyProviderCount = providers.filter((provider) => provider.status === "ready").length
    const overallStatus: SabiWalletProviderStatus = providers.every(
      (provider) => provider.status === "ready"
    )
      ? "ready"
      : providers.some((provider) => provider.status === "admin_review_required")
        ? "admin_review_required"
        : "provider_not_configured"

    return {
      generatedAt: new Date().toISOString(),
      overallStatus,
      bankingPriority: true,
      alipayCompatible: true,
      tokenOnlyStorage: true,
      panStorageAllowed: false,
      cvvStorageAllowed: false,
      mobileCanReadSecret: false,
      providerCount: providers.length,
      readyProviderCount,
      providers,
    }
  }

  getMobileManifest(): SabiWalletProviderManifest {
    const manifest = this.getManifest()

    return {
      ...manifest,
      providers: manifest.providers.map((provider) => ({
        ...provider,
        missingSecretEnv: [],
        missingPublicEnv: [],
        secretValuesReturned: false,
      })),
    }
  }

  assertProviderReady(providerId: string): SabiWalletProviderManifestItem {
    const provider = this.resolveProvider(providerId)

    if (provider.status !== "ready") {
      throw new Error(`wallet_provider_not_ready:${providerId}:${provider.status}`)
    }

    return provider
  }
}
