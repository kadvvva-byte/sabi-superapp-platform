import type { Airwallex174ACapability, Airwallex174ADiagnostics, Airwallex174ASafetyBoundary } from "./airwallex174A.types";

const safety: Airwallex174ASafetyBoundary = {
  providerStatus: "provider_not_configured",
  providerSafeDisabled: true,
  providerRuntimeEnabled: false,
  providerCallAllowed: false,
  credentialImportAllowed: false,
  rawSecretReadAllowed: false,
  envReadAllowed: false,
  dbWriteAllowed: false,
  walletMutationAllowed: false,
  moneyMovementAllowed: false,
  fakePaymentSuccessAllowed: false,
  productionLaunchAllowed: false,
};

const capabilities: Airwallex174ACapability[] = [
  {
    id: "airwallex_admin_visibility",
    name: "Admin visibility and diagnostics",
    status: "ready_safe_disabled",
    reason: "Admin can see Airwallex readiness without provider calls or secrets.",
  },
  {
    id: "airwallex_owner_key_intake_boundary",
    name: "Owner key intake boundary",
    status: "ready_safe_disabled",
    reason: "Owner keys can be prepared later as references only; raw secret values are not read now.",
  },
  {
    id: "airwallex_business_physical_commerce",
    name: "Business physical commerce boundary",
    status: "ready_safe_disabled",
    reason: "Airwallex stays limited to business/merchant physical commerce until explicit provider runtime approval.",
  },
  {
    id: "airwallex_wallet_money_movement",
    name: "Wallet and money movement",
    status: "blocked_provider_not_configured",
    reason: "No wallet mutation or money movement is allowed without real provider keys, DB persistence, compliance approval, and explicit runtime approval.",
  },
  {
    id: "airwallex_digital_goods",
    name: "Digital goods boundary",
    status: "blocked_policy_boundary",
    reason: "Digital goods are blocked for Airwallex in this stage; Google Billing remains separate for digital goods where applicable.",
  },
  {
    id: "airwallex_gambling_stake",
    name: "Gambling and stake",
    status: "blocked_policy_boundary",
    reason: "Gambling/stake payout is blocked and requires separate legal/license/KYC/AML/country/age flow.",
  },
];

export class Airwallex174AReadinessService {
  diagnostics(): Airwallex174ADiagnostics {
    return {
      version: "AIRWALLEX-174A",
      status: "safe_disabled_ready_for_owner_keys",
      providerName: "airwallex",
      providerUseBoundary: "business_physical_commerce_only",
      digitalGoodsBoundary: "blocked_until_separate_policy_and_provider_approval",
      gamblingBoundary: "blocked",
      safety,
      capabilities,
      readiness: {
        backendRoutesReady: true,
        adminVisibilityReady: true,
        ownerKeyIntakeReady: true,
        providerBindingReady: false,
        livePaymentReady: false,
        livePayoutReady: false,
        walletMoneyMovementReady: false,
      },
      requiredBeforeRuntimeEnablement: [
        "real Airwallex account approval",
        "real provider credentials stored server-side only",
        "DB persistence and audit schema",
        "KYC/KYB/AML/compliance approval",
        "wallet ledger and idempotency execution approval",
        "explicit provider runtime enablement approval",
        "no fake provider payment success",
      ],
    };
  }

  providerGate() {
    return {
      ok: true,
      provider: "airwallex",
      status: safety.providerStatus,
      safeDisabled: safety.providerSafeDisabled,
      providerCallAllowed: safety.providerCallAllowed,
      providerRuntimeEnabled: safety.providerRuntimeEnabled,
      moneyMovementAllowed: safety.moneyMovementAllowed,
      fakePaymentSuccessAllowed: safety.fakePaymentSuccessAllowed,
      reason: "airwallex_provider_not_configured_safe_disabled",
    };
  }

  ownerKeyIntakeReadiness() {
    return {
      ok: true,
      status: "ready_for_future_owner_reference_labels_only",
      rawSecretValuesAcceptedNow: false,
      rawSecretValuesReadNow: false,
      envReadAllowedNow: false,
      providerCredentialImportAllowedNow: false,
      allowedInputModeLater: "reference_labels_only",
      requiredLabelsLater: [
        "AIRWALLEX_CLIENT_ID_REFERENCE",
        "AIRWALLEX_API_KEY_REFERENCE",
        "AIRWALLEX_WEBHOOK_SECRET_REFERENCE",
        "AIRWALLEX_ACCOUNT_ID_REFERENCE",
      ],
    };
  }
}

export const airwallex174AReadinessService = new Airwallex174AReadinessService();
