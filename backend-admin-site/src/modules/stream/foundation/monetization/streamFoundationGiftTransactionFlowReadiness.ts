import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "../core";
import { getStreamFoundationAdminMonetizationReadinessSnapshot } from "./streamFoundationAdminMonetizationReadiness";
import { getStreamFoundationMonetizationLedgerReadinessSnapshot } from "./streamFoundationMonetizationLedgerReadiness";
import { getStreamFoundationGiftTransactionFlowReadyProviderReviewPreview, getStreamFoundationGiftTransactionFlowSafeDisabledPreview } from "./streamFoundationGiftTransactionFlowService";
import { STREAM_FOUNDATION_GIFT_TRANSACTION_FLOW_STAGE } from "./streamFoundationGiftTransactionFlowTypes";

export const STREAM_FOUNDATION_GIFT_TRANSACTION_FLOW_READINESS_STAGE = "BACKEND_STREAM_FOUNDATION_136S_GIFT_TRANSACTION_FLOW_READINESS_STAGING" as const;

export type StreamFoundationGiftTransactionFlowReadinessSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_GIFT_TRANSACTION_FLOW_READINESS_STAGE;
  dependsOn: readonly string[];
  flowStage: typeof STREAM_FOUNDATION_GIFT_TRANSACTION_FLOW_STAGE;
  safeDisabledDecisionCode: ReturnType<typeof getStreamFoundationGiftTransactionFlowSafeDisabledPreview>["decisionCode"];
  readyProviderReviewDecisionCode: ReturnType<typeof getStreamFoundationGiftTransactionFlowReadyProviderReviewPreview>["decisionCode"];
  readyProviderReviewSteps: number;
  allKnownGiftFlowStepsCovered: true;
  senderChargeRequiredBeforeGiftSuccess: true;
  paymentAuthorizationRequiredBeforeGiftVisible: true;
  walletLedgerDebitRequiredBeforeRecipientCredit: true;
  recipientPendingEarningCounted: true;
  recipientAvailableEarningNow: false;
  monthlyPayoutOncePerMonth: true;
  directUserWithdrawalAllowedNow: false;
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
  readyForRouteMountApprovalPlanning: true;
  readyForRealExecutionNow: false;
  safety: typeof STREAM_FOUNDATION_SAFE_SNAPSHOT;
}>;

export function getStreamFoundationGiftTransactionFlowReadinessSnapshot(): StreamFoundationGiftTransactionFlowReadinessSnapshot {
  const safeDisabled = getStreamFoundationGiftTransactionFlowSafeDisabledPreview();
  const readyProviderReview = getStreamFoundationGiftTransactionFlowReadyProviderReviewPreview();
  return {
    stage: STREAM_FOUNDATION_GIFT_TRANSACTION_FLOW_READINESS_STAGE,
    dependsOn: [
      getStreamFoundationAdminMonetizationReadinessSnapshot().stage,
      getStreamFoundationMonetizationLedgerReadinessSnapshot().stage,
    ],
    flowStage: STREAM_FOUNDATION_GIFT_TRANSACTION_FLOW_STAGE,
    safeDisabledDecisionCode: safeDisabled.decisionCode,
    readyProviderReviewDecisionCode: readyProviderReview.decisionCode,
    readyProviderReviewSteps: readyProviderReview.steps.length,
    allKnownGiftFlowStepsCovered: true,
    senderChargeRequiredBeforeGiftSuccess: true,
    paymentAuthorizationRequiredBeforeGiftVisible: true,
    walletLedgerDebitRequiredBeforeRecipientCredit: true,
    recipientPendingEarningCounted: true,
    recipientAvailableEarningNow: false,
    monthlyPayoutOncePerMonth: true,
    directUserWithdrawalAllowedNow: false,
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
    readyForRouteMountApprovalPlanning: true,
    readyForRealExecutionNow: false,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}
