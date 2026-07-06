import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "./core";
import { getStreamFoundationAdminMonetizationReadinessSnapshot } from "./monetization/streamFoundationAdminMonetizationReadiness";
import { getStreamFoundationAdminMonetizationSafeDisabledValidation, getStreamFoundationAdminMonetizationReadyProviderReviewValidation } from "./monetization/streamFoundationAdminMonetizationConfigValidator";

export const STREAM_136R_BACKEND_FOUNDATION_ADMIN_MONETIZATION_CONFIG_STAGING_VERSION = "BACKEND-STREAM-FOUNDATION-136R" as const;

export type Stream136RBackendFoundationAdminMonetizationConfigStagingManifest = Readonly<{
  version: typeof STREAM_136R_BACKEND_FOUNDATION_ADMIN_MONETIZATION_CONFIG_STAGING_VERSION;
  scope: "backend_stream_foundation_local_staging_only";
  changedFiles: readonly string[];
  adminConfigSeparated: true;
  paymentAcceptProviderConfig: "server_side_only";
  monetizationPayoutProviderConfig: "server_side_only";
  walletCoinLedgerProviderConfig: "required_before_gift_execution";
  monthlyPayoutRule: "once_per_month";
  giftFlow: "sender_charge_required_then_recipient_pending_earning_then_monthly_payout";
  safeDisabledValidationBlockedGates: number;
  readyProviderReviewBlockedGates: number;
  readyProviderReviewReviewRequiredGates: number;
  readiness: ReturnType<typeof getStreamFoundationAdminMonetizationReadinessSnapshot>;
  routeMountAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
  rawSecretValuesReturned: false;
  mobileProviderKeysAllowed: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
  safety: typeof STREAM_FOUNDATION_SAFE_SNAPSHOT;
}>;

export function getStream136RBackendFoundationAdminMonetizationConfigStagingManifest(): Stream136RBackendFoundationAdminMonetizationConfigStagingManifest {
  const readiness = getStreamFoundationAdminMonetizationReadinessSnapshot();
  const safeDisabledValidation = getStreamFoundationAdminMonetizationSafeDisabledValidation();
  const readyProviderReviewValidation = getStreamFoundationAdminMonetizationReadyProviderReviewValidation();
  return {
    version: STREAM_136R_BACKEND_FOUNDATION_ADMIN_MONETIZATION_CONFIG_STAGING_VERSION,
    scope: "backend_stream_foundation_local_staging_only",
    changedFiles: [
      "src/modules/stream/foundation/monetization/streamFoundationAdminMonetizationConfigContracts.ts",
      "src/modules/stream/foundation/monetization/streamFoundationAdminMonetizationConfigValidator.ts",
      "src/modules/stream/foundation/monetization/streamFoundationAdminMonetizationReadiness.ts",
      "src/modules/stream/foundation/monetization/index.ts",
      "src/modules/stream/foundation/stream136rBackendFoundationAdminMonetizationConfigStagingManifest.ts",
      "src/modules/stream/index.ts",
      "STREAM_BACKEND_STAGING_README_136R.md",
    ],
    adminConfigSeparated: true,
    paymentAcceptProviderConfig: "server_side_only",
    monetizationPayoutProviderConfig: "server_side_only",
    walletCoinLedgerProviderConfig: "required_before_gift_execution",
    monthlyPayoutRule: "once_per_month",
    giftFlow: "sender_charge_required_then_recipient_pending_earning_then_monthly_payout",
    safeDisabledValidationBlockedGates: safeDisabledValidation.blockedGates,
    readyProviderReviewBlockedGates: readyProviderReviewValidation.blockedGates,
    readyProviderReviewReviewRequiredGates: readyProviderReviewValidation.reviewRequiredGates,
    readiness,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretValuesReturned: false,
    mobileProviderKeysAllowed: false,
    fakePaymentSuccessAllowed: false,
    fakeGiftSuccessAllowed: false,
    fakePayoutSuccessAllowed: false,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}
