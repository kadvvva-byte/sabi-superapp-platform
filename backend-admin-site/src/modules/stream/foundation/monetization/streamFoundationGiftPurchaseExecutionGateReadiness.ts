import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "../core";
import { getStreamFoundationGiftTransactionFlowReadinessSnapshot } from "./streamFoundationGiftTransactionFlowReadiness";
import {
  getStreamFoundationGiftPurchaseExecutionGateMountedApprovedPreview,
  getStreamFoundationGiftPurchaseExecutionGateReadyButUnmountedPreview,
  getStreamFoundationGiftPurchaseExecutionGateSafeDisabledPreview,
} from "./streamFoundationGiftPurchaseExecutionGateService";
import { STREAM_FOUNDATION_GIFT_PURCHASE_EXECUTION_GATE_STAGE } from "./streamFoundationGiftPurchaseExecutionGateTypes";

export const STREAM_FOUNDATION_GIFT_PURCHASE_EXECUTION_GATE_READINESS_STAGE = "BACKEND_STREAM_FOUNDATION_136X_GIFT_PURCHASE_EXECUTION_GATE_READINESS_STAGING" as const;

export type StreamFoundationGiftPurchaseExecutionGateReadinessSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_GIFT_PURCHASE_EXECUTION_GATE_READINESS_STAGE;
  dependsOn: readonly string[];
  gateStage: typeof STREAM_FOUNDATION_GIFT_PURCHASE_EXECUTION_GATE_STAGE;
  safeDisabledDecisionCode: ReturnType<typeof getStreamFoundationGiftPurchaseExecutionGateSafeDisabledPreview>["decisionCode"];
  readyButUnmountedDecisionCode: ReturnType<typeof getStreamFoundationGiftPurchaseExecutionGateReadyButUnmountedPreview>["decisionCode"];
  mountedApprovedDecisionCode: ReturnType<typeof getStreamFoundationGiftPurchaseExecutionGateMountedApprovedPreview>["decisionCode"];
  gateStepsCovered: number;
  senderChargeAuthorizationRequired: true;
  senderWalletDebitRequired: true;
  recipientPendingEarningPlanned: true;
  monthlyPayoutReservePlanned: true;
  monthlyPayoutOncePerMonth: true;
  giftVisibleOnlyAfterPaymentAuthorization: true;
  recipientAvailableEarningNow: false;
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
  readyForRealExecutionAfterRouteMountProviderApproval: boolean;
  readyForRealExecutionNow: false;
  safety: typeof STREAM_FOUNDATION_SAFE_SNAPSHOT;
}>;

export function getStreamFoundationGiftPurchaseExecutionGateReadinessSnapshot(): StreamFoundationGiftPurchaseExecutionGateReadinessSnapshot {
  const safeDisabled = getStreamFoundationGiftPurchaseExecutionGateSafeDisabledPreview();
  const readyButUnmounted = getStreamFoundationGiftPurchaseExecutionGateReadyButUnmountedPreview();
  const mountedApproved = getStreamFoundationGiftPurchaseExecutionGateMountedApprovedPreview();
  return {
    stage: STREAM_FOUNDATION_GIFT_PURCHASE_EXECUTION_GATE_READINESS_STAGE,
    dependsOn: [getStreamFoundationGiftTransactionFlowReadinessSnapshot().stage],
    gateStage: STREAM_FOUNDATION_GIFT_PURCHASE_EXECUTION_GATE_STAGE,
    safeDisabledDecisionCode: safeDisabled.decisionCode,
    readyButUnmountedDecisionCode: readyButUnmounted.decisionCode,
    mountedApprovedDecisionCode: mountedApproved.decisionCode,
    gateStepsCovered: mountedApproved.steps.length,
    senderChargeAuthorizationRequired: true,
    senderWalletDebitRequired: true,
    recipientPendingEarningPlanned: true,
    monthlyPayoutReservePlanned: true,
    monthlyPayoutOncePerMonth: true,
    giftVisibleOnlyAfterPaymentAuthorization: true,
    recipientAvailableEarningNow: false,
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
    readyForRealExecutionAfterRouteMountProviderApproval: mountedApproved.readyForRealExecutionWhenMountedAndApproved,
    readyForRealExecutionNow: false,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}
