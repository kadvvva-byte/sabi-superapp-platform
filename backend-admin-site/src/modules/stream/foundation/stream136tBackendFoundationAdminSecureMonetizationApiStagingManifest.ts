import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "./core";
import { getStreamFoundationAdminSecureMonetizationApiReadinessSnapshot } from "./monetization";

export const STREAM_136T_BACKEND_FOUNDATION_ADMIN_SECURE_MONETIZATION_API_STAGING_STAGE = "BACKEND_STREAM_FOUNDATION_136T_ADMIN_SECURE_MONETIZATION_API_STAGING" as const;

export type Stream136TBackendFoundationAdminSecureMonetizationApiStagingManifest = Readonly<{
  stage: typeof STREAM_136T_BACKEND_FOUNDATION_ADMIN_SECURE_MONETIZATION_API_STAGING_STAGE;
  description: string;
  changedFiles: readonly string[];
  dependsOn: readonly string[];
  apiReadinessStage: ReturnType<typeof getStreamFoundationAdminSecureMonetizationApiReadinessSnapshot>["stage"];
  paymentAcceptProviderConfigSeparated: true;
  monetizationPayoutProviderConfigSeparated: true;
  walletCoinLedgerProviderConfigRequired: true;
  monthlyPayoutOncePerMonth: true;
  providerKeysServerSideOnly: true;
  redactedAdminResponsesOnly: true;
  routeMountAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
  rawSecretValuesReturned: false;
  mobileProviderKeysReturned: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
  safety: typeof STREAM_FOUNDATION_SAFE_SNAPSHOT;
}>;

export function getStream136TBackendFoundationAdminSecureMonetizationApiStagingManifest(): Stream136TBackendFoundationAdminSecureMonetizationApiStagingManifest {
  const readiness = getStreamFoundationAdminSecureMonetizationApiReadinessSnapshot();
  return {
    stage: STREAM_136T_BACKEND_FOUNDATION_ADMIN_SECURE_MONETIZATION_API_STAGING_STAGE,
    description:
      "Admin secure monetization API draft for separate accept-payment provider config, separate payout/monetization provider config, Wallet/COIN ledger gate, monthly payout policy, and redacted server-side-only provider secret handling.",
    changedFiles: [
      "src/modules/stream/foundation/monetization/streamFoundationAdminSecureMonetizationApiContracts.ts",
      "src/modules/stream/foundation/monetization/streamFoundationAdminSecureMonetizationApiService.ts",
      "src/modules/stream/foundation/monetization/streamFoundationAdminSecureMonetizationApiReadiness.ts",
      "src/modules/stream/foundation/monetization/index.ts",
      "src/modules/stream/foundation/stream136tBackendFoundationAdminSecureMonetizationApiStagingManifest.ts",
      "src/modules/stream/index.ts",
      "STREAM_BACKEND_STAGING_README_136T.md",
    ],
    dependsOn: [
      "BACKEND_STREAM_FOUNDATION_136P_PAYMENT_MONETIZATION_STAGING",
      "BACKEND_STREAM_FOUNDATION_136Q_LEDGER_PAYOUT_STAGING",
      "BACKEND_STREAM_FOUNDATION_136R_ADMIN_MONETIZATION_CONFIG_STAGING",
      "BACKEND_STREAM_FOUNDATION_136S_GIFT_TRANSACTION_FLOW_STAGING",
    ],
    apiReadinessStage: readiness.stage,
    paymentAcceptProviderConfigSeparated: true,
    monetizationPayoutProviderConfigSeparated: true,
    walletCoinLedgerProviderConfigRequired: true,
    monthlyPayoutOncePerMonth: true,
    providerKeysServerSideOnly: true,
    redactedAdminResponsesOnly: true,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretValuesReturned: false,
    mobileProviderKeysReturned: false,
    fakePaymentSuccessAllowed: false,
    fakeGiftSuccessAllowed: false,
    fakePayoutSuccessAllowed: false,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}
