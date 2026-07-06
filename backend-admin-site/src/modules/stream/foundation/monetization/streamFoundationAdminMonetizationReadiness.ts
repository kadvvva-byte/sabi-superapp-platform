import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "../core";
import { getStreamFoundationMonetizationLedgerReadinessSnapshot } from "./streamFoundationMonetizationLedgerReadiness";
import {
  STREAM_FOUNDATION_ADMIN_MONETIZATION_CONFIG_STAGE,
  STREAM_FOUNDATION_ADMIN_MONETIZATION_SAFE_DISABLED_CONFIG,
  STREAM_FOUNDATION_ADMIN_MONETIZATION_READY_FOR_REAL_PROVIDER_REVIEW_CONFIG,
} from "./streamFoundationAdminMonetizationConfigContracts";
import { validateStreamFoundationAdminMonetizationConfig } from "./streamFoundationAdminMonetizationConfigValidator";

export const STREAM_FOUNDATION_ADMIN_MONETIZATION_READINESS_STAGE = "BACKEND_STREAM_FOUNDATION_136R_ADMIN_MONETIZATION_READINESS_STAGING" as const;

export type StreamFoundationAdminMonetizationReadinessSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_ADMIN_MONETIZATION_READINESS_STAGE;
  dependsOn: readonly string[];
  adminConfigStage: typeof STREAM_FOUNDATION_ADMIN_MONETIZATION_CONFIG_STAGE;
  safeDisabledBlockedGates: number;
  readyProviderReviewBlockedGates: number;
  readyProviderReviewReviewRequiredGates: number;
  ledgerReadinessStage: ReturnType<typeof getStreamFoundationMonetizationLedgerReadinessSnapshot>["stage"];
  senderChargeRequiredBeforeGiftSuccess: true;
  recipientEarningsCountedAsPending: true;
  monthlyPayoutOncePerMonth: true;
  acceptPaymentProviderConfigSeparated: true;
  monetizationPayoutProviderConfigSeparated: true;
  walletCoinLedgerProviderRequired: true;
  providerKeysServerSideOnly: true;
  mobileProviderKeysBlocked: true;
  rawSecretValuesReturned: false;
  routeMountAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
  readyForAdminUiSecureConfigScreenDraft: true;
  readyForRealProviderBindingAfterOwnerApproval: boolean;
  safety: typeof STREAM_FOUNDATION_SAFE_SNAPSHOT;
}>;

export function getStreamFoundationAdminMonetizationReadinessSnapshot(): StreamFoundationAdminMonetizationReadinessSnapshot {
  const ledgerReadiness = getStreamFoundationMonetizationLedgerReadinessSnapshot();
  const safeDisabledValidation = validateStreamFoundationAdminMonetizationConfig(STREAM_FOUNDATION_ADMIN_MONETIZATION_SAFE_DISABLED_CONFIG);
  const readyProviderReviewValidation = validateStreamFoundationAdminMonetizationConfig(STREAM_FOUNDATION_ADMIN_MONETIZATION_READY_FOR_REAL_PROVIDER_REVIEW_CONFIG);
  return {
    stage: STREAM_FOUNDATION_ADMIN_MONETIZATION_READINESS_STAGE,
    dependsOn: [
      "BACKEND_STREAM_FOUNDATION_136P_PAYMENT_MONETIZATION_STAGING",
      "BACKEND_STREAM_FOUNDATION_136Q_LEDGER_READINESS_STAGING",
    ],
    adminConfigStage: STREAM_FOUNDATION_ADMIN_MONETIZATION_CONFIG_STAGE,
    safeDisabledBlockedGates: safeDisabledValidation.blockedGates,
    readyProviderReviewBlockedGates: readyProviderReviewValidation.blockedGates,
    readyProviderReviewReviewRequiredGates: readyProviderReviewValidation.reviewRequiredGates,
    ledgerReadinessStage: ledgerReadiness.stage,
    senderChargeRequiredBeforeGiftSuccess: true,
    recipientEarningsCountedAsPending: true,
    monthlyPayoutOncePerMonth: true,
    acceptPaymentProviderConfigSeparated: true,
    monetizationPayoutProviderConfigSeparated: true,
    walletCoinLedgerProviderRequired: true,
    providerKeysServerSideOnly: true,
    mobileProviderKeysBlocked: true,
    rawSecretValuesReturned: false,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakePaymentSuccessAllowed: false,
    fakeGiftSuccessAllowed: false,
    fakePayoutSuccessAllowed: false,
    readyForAdminUiSecureConfigScreenDraft: true,
    readyForRealProviderBindingAfterOwnerApproval:
      readyProviderReviewValidation.readyForGiftPaymentExecutionAfterRouteMountApproval &&
      readyProviderReviewValidation.readyForMonthlyPayoutExecutionAfterRouteMountApproval &&
      readyProviderReviewValidation.reviewRequiredGates === 1,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}
