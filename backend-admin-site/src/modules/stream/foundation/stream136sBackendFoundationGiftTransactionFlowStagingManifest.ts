import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "./core";
import { getStreamFoundationGiftTransactionFlowReadinessSnapshot } from "./monetization/streamFoundationGiftTransactionFlowReadiness";
import { getStreamFoundationGiftTransactionFlowReadyProviderReviewPreview, getStreamFoundationGiftTransactionFlowSafeDisabledPreview } from "./monetization/streamFoundationGiftTransactionFlowService";

export const STREAM_136S_BACKEND_FOUNDATION_GIFT_TRANSACTION_FLOW_STAGING_VERSION = "BACKEND-STREAM-FOUNDATION-136S" as const;

export type Stream136SBackendFoundationGiftTransactionFlowStagingManifest = Readonly<{
  version: typeof STREAM_136S_BACKEND_FOUNDATION_GIFT_TRANSACTION_FLOW_STAGING_VERSION;
  scope: "backend_stream_foundation_local_staging_only";
  changedFiles: readonly string[];
  giftTransactionFlow: "request_to_payment_authorization_to_wallet_ledger_to_recipient_pending_earning_to_monthly_payout_reserve";
  senderChargeRequiredBeforeGiftSuccess: true;
  paymentAuthorizationRequiredBeforeGiftVisible: true;
  walletLedgerDebitRequiredBeforeRecipientCredit: true;
  recipientPendingEarningCounted: true;
  monthlyPayoutRule: "once_per_month";
  adminPaymentAcceptProviderConfig: "server_side_only";
  adminMonetizationPayoutProviderConfig: "server_side_only";
  safeDisabledDecisionCode: ReturnType<typeof getStreamFoundationGiftTransactionFlowSafeDisabledPreview>["decisionCode"];
  readyProviderReviewDecisionCode: ReturnType<typeof getStreamFoundationGiftTransactionFlowReadyProviderReviewPreview>["decisionCode"];
  readiness: ReturnType<typeof getStreamFoundationGiftTransactionFlowReadinessSnapshot>;
  routeMountAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  walletLedgerMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  rawProviderSecretReturned: false;
  mobileProviderKeysAllowed: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSuccessAllowed: false;
  fakeEarningCreditAllowed: false;
  fakePayoutSuccessAllowed: false;
  safety: typeof STREAM_FOUNDATION_SAFE_SNAPSHOT;
}>;

export function getStream136SBackendFoundationGiftTransactionFlowStagingManifest(): Stream136SBackendFoundationGiftTransactionFlowStagingManifest {
  const safeDisabled = getStreamFoundationGiftTransactionFlowSafeDisabledPreview();
  const readyProviderReview = getStreamFoundationGiftTransactionFlowReadyProviderReviewPreview();
  return {
    version: STREAM_136S_BACKEND_FOUNDATION_GIFT_TRANSACTION_FLOW_STAGING_VERSION,
    scope: "backend_stream_foundation_local_staging_only",
    changedFiles: [
      "src/modules/stream/foundation/monetization/streamFoundationGiftTransactionFlowTypes.ts",
      "src/modules/stream/foundation/monetization/streamFoundationGiftTransactionFlowService.ts",
      "src/modules/stream/foundation/monetization/streamFoundationGiftTransactionFlowReadiness.ts",
      "src/modules/stream/foundation/monetization/index.ts",
      "src/modules/stream/foundation/stream136sBackendFoundationGiftTransactionFlowStagingManifest.ts",
      "src/modules/stream/index.ts",
      "STREAM_BACKEND_STAGING_README_136S.md",
    ],
    giftTransactionFlow: "request_to_payment_authorization_to_wallet_ledger_to_recipient_pending_earning_to_monthly_payout_reserve",
    senderChargeRequiredBeforeGiftSuccess: true,
    paymentAuthorizationRequiredBeforeGiftVisible: true,
    walletLedgerDebitRequiredBeforeRecipientCredit: true,
    recipientPendingEarningCounted: true,
    monthlyPayoutRule: "once_per_month",
    adminPaymentAcceptProviderConfig: "server_side_only",
    adminMonetizationPayoutProviderConfig: "server_side_only",
    safeDisabledDecisionCode: safeDisabled.decisionCode,
    readyProviderReviewDecisionCode: readyProviderReview.decisionCode,
    readiness: getStreamFoundationGiftTransactionFlowReadinessSnapshot(),
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletLedgerMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawProviderSecretReturned: false,
    mobileProviderKeysAllowed: false,
    fakePaymentSuccessAllowed: false,
    fakeGiftSuccessAllowed: false,
    fakeEarningCreditAllowed: false,
    fakePayoutSuccessAllowed: false,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}
