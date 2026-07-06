import type {
  GoogleBilling175Capability,
  GoogleBilling175Diagnostics,
  GoogleBilling175ProductContract,
  GoogleBilling175SafetyBoundary
} from "./googleBilling175.types";

const safety: GoogleBilling175SafetyBoundary = {
  providerStatus: "provider_not_configured",
  providerSafeDisabled: true,
  googleBillingRuntimeEnabled: false,
  providerRuntimeEnabled: false,
  providerCallAllowed: false,
  credentialImportAllowed: false,
  rawSecretReadAllowed: false,
  envReadAllowed: false,
  rawPurchaseTokenReadAllowed: false,
  rawPurchaseTokenPrintAllowed: false,
  purchaseVerificationAllowed: false,
  entitlementGrantAllowed: false,
  dbWriteAllowed: false,
  walletMutationAllowed: false,
  moneyMovementAllowed: false,
  fakePurchaseSuccessAllowed: false,
  productionLaunchAllowed: false,
};

const productContracts: GoogleBilling175ProductContract[] = [
  {
    productId: "sabi_plus_monthly",
    type: "subscription",
    status: "contract_ready_owner_value_required_later",
    playConsoleConfiguredNow: false,
    runtimeVerificationAllowedNow: false,
    entitlementGrantAllowedNow: false,
  },
  {
    productId: "sabi_creator_tools_monthly",
    type: "subscription",
    status: "contract_ready_owner_value_required_later",
    playConsoleConfiguredNow: false,
    runtimeVerificationAllowedNow: false,
    entitlementGrantAllowedNow: false,
  },
  {
    productId: "sabi_digital_gift_pack_basic",
    type: "one_time",
    status: "contract_ready_owner_value_required_later",
    playConsoleConfiguredNow: false,
    runtimeVerificationAllowedNow: false,
    entitlementGrantAllowedNow: false,
  },
];

const capabilities: GoogleBilling175Capability[] = [
  {
    id: "google_billing_admin_visibility",
    name: "Admin visibility and diagnostics",
    status: "ready_safe_disabled",
    reason: "Admin can see Google Billing readiness without provider calls, secrets, or purchase token reads.",
  },
  {
    id: "google_billing_play_console_contract",
    name: "Play Console product contract",
    status: "ready_safe_disabled",
    reason: "Product IDs and product types are represented as contracts only; owner values and Play Console setup are required later.",
  },
  {
    id: "google_billing_purchase_token_boundary",
    name: "Purchase token boundary",
    status: "ready_safe_disabled",
    reason: "Raw purchase tokens are not accepted, read, printed, verified, or stored in this stage.",
  },
  {
    id: "google_billing_entitlement_grant",
    name: "Entitlement grant",
    status: "blocked_provider_not_configured",
    reason: "No entitlement can be granted until real Google Billing runtime verification and DB persistence are explicitly approved.",
  },
  {
    id: "google_billing_wallet_money",
    name: "Wallet and money movement",
    status: "blocked_policy_boundary",
    reason: "Google Billing is for digital goods; wallet mutation and money movement stay blocked in this stage.",
  },
  {
    id: "google_billing_physical_commerce",
    name: "Physical commerce boundary",
    status: "blocked_policy_boundary",
    reason: "Physical commerce must not use Google Billing; it stays separated from Airwallex/Wallet provider flow.",
  },
];

export class GoogleBilling175ReadinessService {
  diagnostics(): GoogleBilling175Diagnostics {
    return {
      version: "GOOGLE-BILLING-175",
      status: "safe_disabled_ready_for_play_console_products",
      providerName: "google_billing",
      providerUseBoundary: "digital_goods_only",
      physicalCommerceBoundary: "blocked_use_airwallex_or_wallet_provider",
      gamblingBoundary: "blocked",
      safety,
      capabilities,
      productContracts,
      readiness: {
        backendRoutesReady: true,
        adminVisibilityReady: true,
        playConsoleProductContractReady: true,
        purchaseTokenBoundaryReady: true,
        providerBindingReady: false,
        livePurchaseVerificationReady: false,
        entitlementGrantReady: false,
        walletMoneyMovementReady: false,
      },
      requiredBeforeRuntimeEnablement: [
        "real Google Play Console app ownership",
        "real product IDs configured in Play Console",
        "real service account credential stored server-side only",
        "DB persistence and entitlement audit schema",
        "purchase token verification runtime approval",
        "explicit Google Billing runtime enablement approval",
        "no fake purchase success",
        "no fake entitlement grant",
      ],
    };
  }

  providerGate() {
    return {
      ok: true,
      provider: "google_billing",
      status: safety.providerStatus,
      safeDisabled: safety.providerSafeDisabled,
      googleBillingRuntimeEnabled: safety.googleBillingRuntimeEnabled,
      providerCallAllowed: safety.providerCallAllowed,
      purchaseVerificationAllowed: safety.purchaseVerificationAllowed,
      entitlementGrantAllowed: safety.entitlementGrantAllowed,
      fakePurchaseSuccessAllowed: safety.fakePurchaseSuccessAllowed,
      moneyMovementAllowed: safety.moneyMovementAllowed,
      reason: "google_billing_provider_not_configured_safe_disabled",
    };
  }

  productCatalogReadiness() {
    return {
      ok: true,
      status: "product_contract_ready_owner_play_console_values_required_later",
      productContracts,
      playConsoleConfiguredNow: false,
      productValuesCollectedNow: false,
      providerCallAllowedNow: false,
      runtimeVerificationAllowedNow: false,
      entitlementGrantAllowedNow: false,
    };
  }

  purchaseTokenBoundary() {
    return {
      ok: true,
      status: "purchase_token_boundary_locked",
      rawPurchaseTokensAcceptedNow: false,
      rawPurchaseTokensReadNow: false,
      rawPurchaseTokensPrintedNow: false,
      purchaseVerificationAllowedNow: false,
      entitlementGrantAllowedNow: false,
      dbWriteAllowedNow: false,
      fakePurchaseSuccessAllowedNow: false,
    };
  }
}

export const googleBilling175ReadinessService = new GoogleBilling175ReadinessService();
