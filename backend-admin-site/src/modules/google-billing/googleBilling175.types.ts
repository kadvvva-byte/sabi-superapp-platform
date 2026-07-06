export type GoogleBilling175ProviderStatus = "provider_not_configured";
export type GoogleBilling175ReadinessStatus = "safe_disabled_ready_for_play_console_products" | "blocked_until_provider_runtime";
export type GoogleBilling175CapabilityStatus = "ready_safe_disabled" | "blocked_provider_not_configured" | "blocked_policy_boundary";

export type GoogleBilling175SafetyBoundary = {
  providerStatus: GoogleBilling175ProviderStatus;
  providerSafeDisabled: true;
  googleBillingRuntimeEnabled: false;
  providerRuntimeEnabled: false;
  providerCallAllowed: false;
  credentialImportAllowed: false;
  rawSecretReadAllowed: false;
  envReadAllowed: false;
  rawPurchaseTokenReadAllowed: false;
  rawPurchaseTokenPrintAllowed: false;
  purchaseVerificationAllowed: false;
  entitlementGrantAllowed: false;
  dbWriteAllowed: false;
  walletMutationAllowed: false;
  moneyMovementAllowed: false;
  fakePurchaseSuccessAllowed: false;
  productionLaunchAllowed: false;
};

export type GoogleBilling175Capability = {
  id: string;
  name: string;
  status: GoogleBilling175CapabilityStatus;
  reason: string;
};

export type GoogleBilling175ProductContract = {
  productId: string;
  type: "subscription" | "one_time";
  status: "contract_ready_owner_value_required_later";
  playConsoleConfiguredNow: false;
  runtimeVerificationAllowedNow: false;
  entitlementGrantAllowedNow: false;
};

export type GoogleBilling175Diagnostics = {
  version: "GOOGLE-BILLING-175";
  status: GoogleBilling175ReadinessStatus;
  providerName: "google_billing";
  providerUseBoundary: "digital_goods_only";
  physicalCommerceBoundary: "blocked_use_airwallex_or_wallet_provider";
  gamblingBoundary: "blocked";
  safety: GoogleBilling175SafetyBoundary;
  capabilities: GoogleBilling175Capability[];
  productContracts: GoogleBilling175ProductContract[];
  readiness: {
    backendRoutesReady: true;
    adminVisibilityReady: true;
    playConsoleProductContractReady: true;
    purchaseTokenBoundaryReady: true;
    providerBindingReady: false;
    livePurchaseVerificationReady: false;
    entitlementGrantReady: false;
    walletMoneyMovementReady: false;
  };
  requiredBeforeRuntimeEnablement: string[];
};
