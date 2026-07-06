export type SabiAlipayIntegrationRole = "acquiring_partner" | "wallet_partner" | "merchant_app";
export type SabiAlipayEnvironment = "sandbox" | "production";

export type SabiAlipayAdminProviderConfig = {
  providerId: "alipay_plus";
  role: SabiAlipayIntegrationRole;
  environment: SabiAlipayEnvironment;
  partnerId: string;
  clientId: string;
  merchantId?: string;
  publicKey: string;
  privateKeyVaultRef: string;
  webhookSecretVaultRef?: string;
  allowedCurrencies: string[];
  allowedCountries: string[];
  enabledQrModes: Array<
    | "merchant_presented_static"
    | "merchant_presented_dynamic"
    | "merchant_presented_private"
    | "user_presented_dynamic"
  >;
  status: "not_configured" | "sandbox" | "production" | "disabled" | "review_required";
};

export const SABI_ALIPAY_QR_REQUIREMENTS = {
  requestSigningRequired: true,
  responseSignatureValidationRequired: true,
  notifyPaymentWebhookRequired: true,
  idempotencyRequired: true,
  sandboxProductionKeySeparationRequired: true,
  mobileApiKeyStorageAllowed: false,
  rawProviderSecretLoggingAllowed: false,
  adminPanelControlRequired: true,
} as const;
