export type Airwallex174AProviderStatus = "provider_not_configured";
export type Airwallex174AReadinessStatus = "safe_disabled_ready_for_owner_keys" | "blocked_until_owner_keys";
export type Airwallex174ACapabilityStatus = "ready_safe_disabled" | "blocked_provider_not_configured" | "blocked_policy_boundary";

export type Airwallex174ASafetyBoundary = {
  providerStatus: Airwallex174AProviderStatus;
  providerSafeDisabled: true;
  providerRuntimeEnabled: false;
  providerCallAllowed: false;
  credentialImportAllowed: false;
  rawSecretReadAllowed: false;
  envReadAllowed: false;
  dbWriteAllowed: false;
  walletMutationAllowed: false;
  moneyMovementAllowed: false;
  fakePaymentSuccessAllowed: false;
  productionLaunchAllowed: false;
};

export type Airwallex174ACapability = {
  id: string;
  name: string;
  status: Airwallex174ACapabilityStatus;
  reason: string;
};

export type Airwallex174ADiagnostics = {
  version: "AIRWALLEX-174A";
  status: Airwallex174AReadinessStatus;
  providerName: "airwallex";
  providerUseBoundary: "business_physical_commerce_only";
  digitalGoodsBoundary: "blocked_until_separate_policy_and_provider_approval";
  gamblingBoundary: "blocked";
  safety: Airwallex174ASafetyBoundary;
  capabilities: Airwallex174ACapability[];
  readiness: {
    backendRoutesReady: true;
    adminVisibilityReady: true;
    ownerKeyIntakeReady: true;
    providerBindingReady: false;
    livePaymentReady: false;
    livePayoutReady: false;
    walletMoneyMovementReady: false;
  };
  requiredBeforeRuntimeEnablement: string[];
};
