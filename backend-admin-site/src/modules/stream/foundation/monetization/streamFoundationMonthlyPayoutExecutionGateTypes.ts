import type { StreamFoundationSafetySnapshot } from "../core";
import type { StreamFoundationMonetizationAdminConfigSnapshot } from "./streamFoundationMonetizationTypes";
import type { StreamFoundationCreatorEarningsSnapshot } from "./streamFoundationMonetizationLedgerRepositoryContracts";
import type { StreamFoundationMonthlyPayoutBatchDecision } from "./streamFoundationMonthlyPayoutBatchContracts";

export const STREAM_FOUNDATION_MONTHLY_PAYOUT_EXECUTION_GATE_STAGE = "BACKEND_STREAM_FOUNDATION_136Y_MONTHLY_PAYOUT_EXECUTION_GATE_STAGING" as const;

export type StreamFoundationMonthlyPayoutExecutionGateStage = typeof STREAM_FOUNDATION_MONTHLY_PAYOUT_EXECUTION_GATE_STAGE;

export type StreamFoundationMonthlyPayoutExecutionGateDecisionCode =
  | "monthly_payout_ready_for_real_execution_after_route_mount_and_provider_approval"
  | "monthly_payout_blocked_invalid_batch_request"
  | "monthly_payout_blocked_no_available_earnings"
  | "monthly_payout_blocked_not_monthly_payout_day"
  | "monthly_payout_blocked_min_amount_not_reached"
  | "monthly_payout_blocked_kyc_required"
  | "monthly_payout_blocked_creator_approval_required"
  | "monthly_payout_blocked_payout_provider_not_configured"
  | "monthly_payout_blocked_wallet_ledger_not_configured"
  | "monthly_payout_blocked_provider_live_test_required"
  | "monthly_payout_blocked_route_not_mounted";

export type StreamFoundationMonthlyPayoutExecutionGateStepId =
  | "batch_idempotency_guard"
  | "creator_earnings_snapshot_guard"
  | "monthly_payout_cycle_guard"
  | "minimum_payout_amount_guard"
  | "creator_kyc_guard"
  | "creator_monetization_approval_guard"
  | "wallet_ledger_provider_guard"
  | "payout_provider_guard"
  | "provider_live_test_guard"
  | "ledger_and_provider_execution_guard"
  | "route_mount_owner_approval_guard"
  | "audit_and_reconciliation_guard";

export type StreamFoundationMonthlyPayoutExecutionGateStepStatus =
  | "passed"
  | "blocked_invalid_batch_request"
  | "blocked_no_available_earnings"
  | "blocked_not_monthly_payout_day"
  | "blocked_min_amount_not_reached"
  | "blocked_kyc_required"
  | "blocked_creator_approval_required"
  | "blocked_payout_provider_not_configured"
  | "blocked_wallet_ledger_not_configured"
  | "blocked_provider_live_test_required"
  | "blocked_route_not_mounted"
  | "ready_after_route_mount_and_provider_approval";

export type StreamFoundationMonthlyPayoutExecutionGateInput = Readonly<{
  batchId: string;
  payoutMonth: string;
  creatorUserId: string;
  todayDayOfMonth: number;
  kycApproved: boolean;
  creatorMonetizationApproved: boolean;
  walletLedgerLiveTestPassed: boolean;
  payoutProviderLiveTestPassed: boolean;
  routeMounted: boolean;
  ownerApprovedRealExecution: boolean;
  providerLiveExecutionApproved: boolean;
  earnings: StreamFoundationCreatorEarningsSnapshot;
}>;

export type StreamFoundationMonthlyPayoutExecutionGateStep = Readonly<{
  stepId: StreamFoundationMonthlyPayoutExecutionGateStepId;
  order: number;
  status: StreamFoundationMonthlyPayoutExecutionGateStepStatus;
  safeMessageKey: string;
  blocksBatchCreation: boolean;
  blocksWalletLedgerDebit: boolean;
  blocksProviderPayoutCall: boolean;
  blocksCreatorAvailableBalanceSettlement: boolean;
  executedNow: false;
  routeMountAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  walletLedgerMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
}>;

export type StreamFoundationMonthlyPayoutExecutionGateAuditDraft = Readonly<{
  auditId: string;
  batchId: string;
  payoutMonth: string;
  creatorUserId: string;
  pendingCoinAmount: number;
  availableForPayoutCoinAmount: number;
  decisionCode: StreamFoundationMonthlyPayoutExecutionGateDecisionCode;
  persistedNow: false;
  auditPersistRequiredLater: true;
  reconciliationRequiredLater: true;
  providerPayoutCallExecuted: false;
  walletLedgerMutationExecuted: false;
  moneyMovementExecuted: false;
  rawSecretCaptured: false;
}>;

export type StreamFoundationMonthlyPayoutExecutionGatePlan = Readonly<{
  stage: StreamFoundationMonthlyPayoutExecutionGateStage;
  ok: boolean;
  decisionCode: StreamFoundationMonthlyPayoutExecutionGateDecisionCode;
  safeMessageKey: string;
  input: StreamFoundationMonthlyPayoutExecutionGateInput;
  adminConfig: StreamFoundationMonetizationAdminConfigSnapshot;
  monthlyPayoutBatchDecision: StreamFoundationMonthlyPayoutBatchDecision;
  steps: readonly StreamFoundationMonthlyPayoutExecutionGateStep[];
  auditDraft: StreamFoundationMonthlyPayoutExecutionGateAuditDraft;
  payoutOncePerMonth: true;
  monthlyPayoutDayOfMonth: number;
  minPayoutCoinAmount: number;
  pendingCoinAmount: number;
  availableForPayoutCoinAmount: number;
  creatorKycRequired: boolean;
  creatorApprovalRequired: boolean;
  walletLedgerConfigured: boolean;
  payoutProviderConfigured: boolean;
  providerLiveTestRequired: boolean;
  routeMounted: boolean;
  ownerApprovedRealExecution: boolean;
  providerLiveExecutionApproved: boolean;
  readyForRealExecutionWhenMountedAndApproved: boolean;
  directUserWithdrawalAllowedNow: false;
  payoutBeforeMonthlyCycleAllowedNow: false;
  creatorAvailableBalanceSettlementAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerPayoutCallAllowedNow: false;
  walletLedgerMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  rawProviderSecretReturned: false;
  mobileProviderKeysAllowed: false;
  fakePayoutSuccessAllowed: false;
  fakeEarningCreditAllowed: false;
  fakeWalletDebitAllowed: false;
  safety: StreamFoundationSafetySnapshot;
}>;
