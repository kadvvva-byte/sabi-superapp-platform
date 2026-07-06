import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "../core";
import { getStreamFoundationAdminSecureMonetizationApiReadinessSnapshot } from "./streamFoundationAdminSecureMonetizationApiReadiness";
import { getStreamFoundationGiftPurchaseExecutionGateReadinessSnapshot } from "./streamFoundationGiftPurchaseExecutionGateReadiness";
import { getStreamFoundationMonetizationLedgerReadinessSnapshot } from "./streamFoundationMonetizationLedgerReadiness";
import {
  getStreamFoundationMonthlyPayoutExecutionGateMountedApprovedPreview,
  getStreamFoundationMonthlyPayoutExecutionGateReadyButUnmountedPreview,
  getStreamFoundationMonthlyPayoutExecutionGateSafeDisabledPreview,
} from "./streamFoundationMonthlyPayoutExecutionGateService";
import { STREAM_FOUNDATION_MONTHLY_PAYOUT_EXECUTION_GATE_STAGE } from "./streamFoundationMonthlyPayoutExecutionGateTypes";

export const STREAM_FOUNDATION_MONTHLY_PAYOUT_EXECUTION_GATE_READINESS_STAGE = "BACKEND_STREAM_FOUNDATION_136Y_MONTHLY_PAYOUT_EXECUTION_GATE_READINESS_STAGING" as const;

export type StreamFoundationMonthlyPayoutExecutionGateReadinessSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_MONTHLY_PAYOUT_EXECUTION_GATE_READINESS_STAGE;
  dependsOn: readonly string[];
  gateStage: typeof STREAM_FOUNDATION_MONTHLY_PAYOUT_EXECUTION_GATE_STAGE;
  safeDisabledDecisionCode: ReturnType<typeof getStreamFoundationMonthlyPayoutExecutionGateSafeDisabledPreview>["decisionCode"];
  readyButUnmountedDecisionCode: ReturnType<typeof getStreamFoundationMonthlyPayoutExecutionGateReadyButUnmountedPreview>["decisionCode"];
  mountedApprovedDecisionCode: ReturnType<typeof getStreamFoundationMonthlyPayoutExecutionGateMountedApprovedPreview>["decisionCode"];
  gateStepsCovered: number;
  payoutOncePerMonth: true;
  directUserWithdrawalAllowedNow: false;
  payoutBeforeMonthlyCycleAllowedNow: false;
  pendingEarningsMustBecomeAvailableOnlyThroughMonthlyBatch: true;
  creatorKycRequired: true;
  creatorMonetizationApprovalRequired: true;
  payoutProviderConfigRequired: true;
  walletLedgerProviderConfigRequired: true;
  providerLiveTestRequired: true;
  adminSecureConfigRequired: true;
  auditAndReconciliationRequired: true;
  routeMountAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  walletLedgerMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  rawProviderSecretReturned: false;
  mobileProviderKeysAllowed: false;
  fakePayoutSuccessAllowed: false;
  fakeEarningCreditAllowed: false;
  fakeWalletDebitAllowed: false;
  readyForRealExecutionAfterRouteMountProviderApproval: boolean;
  readyForRealExecutionNow: false;
  safety: typeof STREAM_FOUNDATION_SAFE_SNAPSHOT;
}>;

export function getStreamFoundationMonthlyPayoutExecutionGateReadinessSnapshot(): StreamFoundationMonthlyPayoutExecutionGateReadinessSnapshot {
  const safeDisabled = getStreamFoundationMonthlyPayoutExecutionGateSafeDisabledPreview();
  const readyButUnmounted = getStreamFoundationMonthlyPayoutExecutionGateReadyButUnmountedPreview();
  const mountedApproved = getStreamFoundationMonthlyPayoutExecutionGateMountedApprovedPreview();
  return {
    stage: STREAM_FOUNDATION_MONTHLY_PAYOUT_EXECUTION_GATE_READINESS_STAGE,
    dependsOn: [
      getStreamFoundationGiftPurchaseExecutionGateReadinessSnapshot().stage,
      getStreamFoundationMonetizationLedgerReadinessSnapshot().stage,
      getStreamFoundationAdminSecureMonetizationApiReadinessSnapshot().stage,
    ],
    gateStage: STREAM_FOUNDATION_MONTHLY_PAYOUT_EXECUTION_GATE_STAGE,
    safeDisabledDecisionCode: safeDisabled.decisionCode,
    readyButUnmountedDecisionCode: readyButUnmounted.decisionCode,
    mountedApprovedDecisionCode: mountedApproved.decisionCode,
    gateStepsCovered: mountedApproved.steps.length,
    payoutOncePerMonth: true,
    directUserWithdrawalAllowedNow: false,
    payoutBeforeMonthlyCycleAllowedNow: false,
    pendingEarningsMustBecomeAvailableOnlyThroughMonthlyBatch: true,
    creatorKycRequired: true,
    creatorMonetizationApprovalRequired: true,
    payoutProviderConfigRequired: true,
    walletLedgerProviderConfigRequired: true,
    providerLiveTestRequired: true,
    adminSecureConfigRequired: true,
    auditAndReconciliationRequired: true,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletLedgerMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawProviderSecretReturned: false,
    mobileProviderKeysAllowed: false,
    fakePayoutSuccessAllowed: false,
    fakeEarningCreditAllowed: false,
    fakeWalletDebitAllowed: false,
    readyForRealExecutionAfterRouteMountProviderApproval: mountedApproved.readyForRealExecutionWhenMountedAndApproved,
    readyForRealExecutionNow: false,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}
