import { isProviderLiveExecutionEnabled } from "./admin.config";
import type {
  AdminProviderCatalogItem,
  AdminProviderPersistedConfig,
  AdminProviderPublicConfig,
  AdminProviderStatus,
  AdminProviderTestResult,
} from "./admin.types";

export const ADMIN_PROVIDER_CATALOG: AdminProviderCatalogItem[] = [
  {
    key: "kyc_provider",
    title: "KYC Provider",
    kind: "kyc",
    description: "Identity verification provider for onboarding, limits, wallet access, cards, business and merchant flows.",
    requiredFields: ["baseUrl"],
    secretFields: ["apiKey"],
    optionalFields: ["clientId", "webhookSecret", "environment"],
    recommendedBeforeLaunch: true,
  },
  {
    key: "aml_provider",
    title: "AML / Sanctions Provider",
    kind: "aml",
    description: "AML, sanctions, watchlist and transaction risk provider.",
    requiredFields: ["baseUrl"],
    secretFields: ["apiKey"],
    optionalFields: ["webhookSecret", "environment"],
    recommendedBeforeLaunch: true,
  },
  {
    key: "bank_card_tokenization",
    title: "Bank / Card Tokenization",
    kind: "card_tokenization",
    description: "Token-only card binding provider. Sabi must not store PAN/CVV.",
    requiredFields: ["baseUrl", "iframeUrl"],
    secretFields: ["apiKey", "webhookSecret"],
    optionalFields: ["merchantId", "environment", "callbackUrl"],
    recommendedBeforeLaunch: true,
  },
  {
    key: "virtual_card_issuer",
    title: "Virtual Card Issuer",
    kind: "virtual_card",
    description: "Partner bank or issuer processor for virtual card issuance.",
    requiredFields: ["baseUrl"],
    secretFields: ["apiKey", "webhookSecret"],
    optionalFields: ["issuerId", "programId", "environment"],
    recommendedBeforeLaunch: true,
  },
  {
    key: "wallet_transfer",
    title: "Wallet Transfer Provider",
    kind: "wallet",
    description: "Provider route for wallet top-up, transfer, settlement or payment rail execution.",
    requiredFields: ["baseUrl"],
    secretFields: ["apiKey", "webhookSecret"],
    optionalFields: ["merchantId", "environment"],
    recommendedBeforeLaunch: true,
  },
  {
    key: "local_payment_rails",
    title: "Local Wallet Payment Rails",
    kind: "wallet",
    description: "Local currency/local card/local payment rail provider for Local Wallet flows. Currency must be configured or detected, not hardcoded in UI.",
    requiredFields: ["baseUrl"],
    secretFields: ["apiKey", "webhookSecret"],
    optionalFields: ["railId", "localCurrency", "environment"],
    recommendedBeforeLaunch: true,
  },
  {
    key: "merchant_payment",
    title: "Merchant Payment Provider",
    kind: "merchant",
    description: "Merchant QR/payments/acquiring integration.",
    requiredFields: ["baseUrl"],
    secretFields: ["apiKey", "webhookSecret"],
    optionalFields: ["merchantId", "terminalId", "environment"],
    recommendedBeforeLaunch: true,
  },
  {
    key: "business_payout",
    title: "Business Payout Provider",
    kind: "business",
    description: "Business payout and settlement route for business/merchant accounts.",
    requiredFields: ["baseUrl"],
    secretFields: ["apiKey", "webhookSecret"],
    optionalFields: ["businessId", "environment"],
    recommendedBeforeLaunch: true,
  },
  {
    key: "alipay_partner",
    title: "Alipay / Wallet Partner Gateway",
    kind: "wallet",
    description: "Future Alipay-style partner gateway configuration and readiness status.",
    requiredFields: ["baseUrl", "partnerId"],
    secretFields: ["apiKey", "privateKey", "webhookSecret"],
    optionalFields: ["publicKey", "environment"],
    recommendedBeforeLaunch: true,
  },
  {
    key: "coin_ledger",
    title: "SABI COIN Ledger",
    kind: "coin",
    description: "COIN ledger/provider route for coin balance, gifts, earning, locking and transfer flows.",
    requiredFields: ["baseUrl"],
    secretFields: ["apiKey", "webhookSecret"],
    optionalFields: ["environment"],
    recommendedBeforeLaunch: true,
  },
  {
    key: "crypto_custody",
    title: "Crypto Custody Provider",
    kind: "crypto",
    description: "Crypto custody or wallet provider. No fake networks/prices/transactions.",
    requiredFields: ["baseUrl"],
    secretFields: ["apiKey", "webhookSecret"],
    optionalFields: ["custodyAccountId", "environment"],
    recommendedBeforeLaunch: false,
  },
  {
    key: "crypto_market_data",
    title: "Crypto Market Data Provider",
    kind: "crypto",
    description: "Real market data source for crypto wallet prices.",
    requiredFields: ["baseUrl"],
    secretFields: ["apiKey"],
    optionalFields: ["environment"],
    recommendedBeforeLaunch: false,
  },
  {
    key: "ai_provider",
    title: "AI Provider Gateway",
    kind: "ai",
    description: "AI provider gateway for chat, translation, STT/TTS/OCR, voice and realtime services.",
    requiredFields: ["baseUrl"],
    secretFields: ["apiKey"],
    optionalFields: ["model", "visionModel", "ttsVoice", "environment"],
    recommendedBeforeLaunch: true,
  },
  {
    key: "push_provider",
    title: "Push / Firebase Provider",
    kind: "push",
    description: "Push notification provider configuration.",
    requiredFields: ["projectId"],
    secretFields: ["serviceAccountJson"],
    optionalFields: ["senderId", "environment"],
    recommendedBeforeLaunch: true,
  },
  {
    key: "redis",
    title: "Redis Runtime",
    kind: "redis",
    description: "Redis for realtime scaling, sessions/cache, queues, rate limits and admin/risk events.",
    requiredFields: ["url"],
    secretFields: ["password"],
    optionalFields: ["tls", "db", "environment"],
    recommendedBeforeLaunch: true,
  },
  {
    key: "object_storage",
    title: "Object Storage / Media CDN",
    kind: "storage",
    description: "Storage provider for media, profile photos, attachments and admin exports.",
    requiredFields: ["bucket", "region", "endpoint"],
    secretFields: ["accessKeyId", "secretAccessKey"],
    optionalFields: ["cdnBaseUrl", "environment"],
    recommendedBeforeLaunch: true,
  },
];

function envFieldNames(provider: AdminProviderCatalogItem): string[] {
  const prefix = provider.key.toUpperCase().replace(/[^A-Z0-9]+/g, "_");
  return [...provider.requiredFields, ...provider.secretFields, ...provider.optionalFields].map(
    (field) => `${prefix}_${field.replace(/[^A-Za-z0-9]+/g, "_").toUpperCase()}`,
  );
}

function hasValue(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

function hasAdminField(config: AdminProviderPersistedConfig | null, field: string): boolean {
  if (!config) return false;
  return hasValue(config.fields[field]) || hasValue(config.secretFields[field]);
}

function hasEnvField(provider: AdminProviderCatalogItem, field: string): boolean {
  const envName = `${provider.key.toUpperCase().replace(/[^A-Z0-9]+/g, "_")}_${field.replace(/[^A-Za-z0-9]+/g, "_").toUpperCase()}`;
  return hasValue(process.env[envName]);
}

function getProviderSource(config: AdminProviderPersistedConfig | null, envConfigured: boolean): AdminProviderStatus["source"] {
  if (config && envConfigured) return "mixed";
  if (config) return "admin_config";
  if (envConfigured) return "env";
  return "none";
}

export function getAdminProviderCatalog(): AdminProviderCatalogItem[] {
  return ADMIN_PROVIDER_CATALOG.map((provider) => ({ ...provider }));
}

export function getAdminProviderCatalogItem(key: string): AdminProviderCatalogItem | null {
  return ADMIN_PROVIDER_CATALOG.find((provider) => provider.key === key) ?? null;
}

export function buildProviderStatus(provider: AdminProviderCatalogItem, config: AdminProviderPersistedConfig | null): AdminProviderStatus {
  const requiredFields = provider.requiredFields;
  const envConfigured = envFieldNames(provider).some((name) => hasValue(process.env[name]));
  const missingFields = requiredFields.filter((field) => !hasAdminField(config, field) && !hasEnvField(provider, field));
  const configured = missingFields.length === 0;
  const enabled = config?.enabled ?? false;

  return {
    key: provider.key,
    title: provider.title,
    kind: provider.kind,
    configured,
    enabled,
    status: !enabled ? "disabled" : configured ? "ready" : "provider_not_configured",
    source: getProviderSource(config, envConfigured),
    requiredFields: [...provider.requiredFields],
    missingFields,
    secretFields: [...provider.secretFields],
    optionalFields: [...provider.optionalFields],
    liveAllowed: configured && enabled && isProviderLiveExecutionEnabled(),
    recommendedBeforeLaunch: provider.recommendedBeforeLaunch,
    updatedAt: config?.updatedAt,
    lastTest: config?.lastTest,
  };
}

export function getAdminProviderStatuses(configs: AdminProviderPersistedConfig[] = []): AdminProviderStatus[] {
  return ADMIN_PROVIDER_CATALOG.map((provider) => {
    const config = configs.find((item) => item.key === provider.key) ?? null;
    return buildProviderStatus(provider, config);
  });
}

export function testAdminProviderReadiness(provider: AdminProviderCatalogItem, config: AdminProviderPersistedConfig | null): AdminProviderTestResult {
  const status = buildProviderStatus(provider, config);
  const checkedAt = new Date().toISOString();

  if (!status.enabled) {
    return {
      ok: false,
      status: "disabled",
      checkedAt,
      message: "Provider is disabled in Admin Console.",
      missingFields: status.missingFields,
    };
  }

  if (!status.configured) {
    return {
      ok: false,
      status: "provider_not_configured",
      checkedAt,
      message: "Provider is missing required fields.",
      missingFields: status.missingFields,
    };
  }

  return {
    ok: true,
    status: "ready",
    checkedAt,
    message: "Provider configuration is present. Live network test is intentionally disabled until the provider SDK/API connector is bound.",
    metadata: {
      source: status.source,
      liveAllowed: status.liveAllowed,
    },
  };
}

export function toProviderDetails(provider: AdminProviderCatalogItem, config: AdminProviderPublicConfig | null, persistedConfig: AdminProviderPersistedConfig | null) {
  return {
    catalog: provider,
    status: buildProviderStatus(provider, persistedConfig),
    config,
  };
}
