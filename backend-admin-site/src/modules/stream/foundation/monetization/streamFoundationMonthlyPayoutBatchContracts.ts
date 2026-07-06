import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "../core";
import type { StreamFoundationSafetySnapshot } from "../core";
import type { StreamFoundationCreatorEarningsSnapshot } from "./streamFoundationMonetizationLedgerRepositoryContracts";
import type { StreamFoundationMonetizationAdminConfigSnapshot } from "./streamFoundationMonetizationTypes";

export const STREAM_FOUNDATION_MONTHLY_PAYOUT_BATCH_STAGE = "BACKEND_STREAM_FOUNDATION_136Q_MONTHLY_PAYOUT_BATCH_STAGING" as const;

export type StreamFoundationMonthlyPayoutBatchStage = typeof STREAM_FOUNDATION_MONTHLY_PAYOUT_BATCH_STAGE;

export type StreamFoundationMonthlyPayoutBatchDecisionCode =
  | "monthly_payout_batch_ready_for_real_execution_when_mounted"
  | "monthly_payout_batch_blocked_not_monthly_payout_day"
  | "monthly_payout_batch_blocked_min_amount_not_reached"
  | "monthly_payout_batch_blocked_kyc_required"
  | "monthly_payout_batch_blocked_creator_approval_required"
  | "monthly_payout_batch_blocked_payout_provider_not_configured"
  | "monthly_payout_batch_blocked_wallet_ledger_not_configured"
  | "monthly_payout_batch_blocked_no_pending_earnings";

export type StreamFoundationMonthlyPayoutBatchInput = Readonly<{
  batchId: string;
  creatorUserId: string;
  payoutMonth: string;
  todayDayOfMonth: number;
  kycApproved: boolean;
  creatorMonetizationApproved: boolean;
  earnings: StreamFoundationCreatorEarningsSnapshot;
}>;

export type StreamFoundationMonthlyPayoutBatchLine = Readonly<{
  lineId: string;
  creatorUserId: string;
  pendingCoinAmount: number;
  availableForPayoutCoinAmount: number;
  platformFeeAlreadyReserved: true;
  payoutProviderReferenceRequired: true;
  walletLedgerDebitRequired: true;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
}>;

export type StreamFoundationMonthlyPayoutBatchDecision = Readonly<{
  stage: StreamFoundationMonthlyPayoutBatchStage;
  ok: boolean;
  decisionCode: StreamFoundationMonthlyPayoutBatchDecisionCode;
  safeMessageKey: string;
  batchId: string;
  payoutMonth: string;
  creatorUserId: string;
  payoutOncePerMonth: true;
  monthlyPayoutDayOfMonth: number;
  minPayoutCoinAmount: number;
  pendingCoinAmount: number;
  availableForPayoutCoinAmount: number;
  lines: readonly StreamFoundationMonthlyPayoutBatchLine[];
  kycRequired: boolean;
  creatorApprovalRequired: boolean;
  payoutProviderConfigured: boolean;
  walletLedgerConfigured: boolean;
  databaseWriteAllowedNow: false;
  providerPayoutCallAllowedNow: false;
  walletLedgerMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakePayoutSuccessAllowed: false;
  rawProviderSecretReturned: false;
  safety: StreamFoundationSafetySnapshot;
}>;

function safeAmount(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.floor(value));
}

function safeDay(value: number): number {
  if (!Number.isFinite(value)) return 1;
  return Math.max(1, Math.min(31, Math.floor(value)));
}

function codeForPayout(input: StreamFoundationMonthlyPayoutBatchInput, config: StreamFoundationMonetizationAdminConfigSnapshot): StreamFoundationMonthlyPayoutBatchDecisionCode {
  const pending = safeAmount(input.earnings.pendingCoinAmount);
  if (pending <= 0) return "monthly_payout_batch_blocked_no_pending_earnings";
  if (!config.walletCoinLedgerProvider.configured || !config.walletCoinLedgerProvider.enabled) return "monthly_payout_batch_blocked_wallet_ledger_not_configured";
  if (!config.monetizationPayoutProvider.configured || !config.monetizationPayoutProvider.enabled) return "monthly_payout_batch_blocked_payout_provider_not_configured";
  if (!input.kycApproved) return "monthly_payout_batch_blocked_kyc_required";
  if (!input.creatorMonetizationApproved) return "monthly_payout_batch_blocked_creator_approval_required";
  if (pending < config.minPayoutCoinAmount) return "monthly_payout_batch_blocked_min_amount_not_reached";
  if (safeDay(input.todayDayOfMonth) !== config.monthlyPayoutDayOfMonth) return "monthly_payout_batch_blocked_not_monthly_payout_day";
  return "monthly_payout_batch_ready_for_real_execution_when_mounted";
}

function messageKeyForCode(code: StreamFoundationMonthlyPayoutBatchDecisionCode): string {
  switch (code) {
    case "monthly_payout_batch_ready_for_real_execution_when_mounted":
      return "stream.monetization.payout.ready_for_real_execution_when_mounted";
    case "monthly_payout_batch_blocked_no_pending_earnings":
      return "stream.monetization.payout.no_pending_earnings";
    case "monthly_payout_batch_blocked_wallet_ledger_not_configured":
      return "stream.monetization.payout.wallet_ledger_not_configured";
    case "monthly_payout_batch_blocked_payout_provider_not_configured":
      return "stream.monetization.payout.provider_not_configured";
    case "monthly_payout_batch_blocked_kyc_required":
      return "stream.monetization.payout.kyc_required";
    case "monthly_payout_batch_blocked_creator_approval_required":
      return "stream.monetization.payout.creator_approval_required";
    case "monthly_payout_batch_blocked_min_amount_not_reached":
      return "stream.monetization.payout.min_amount_not_reached";
    case "monthly_payout_batch_blocked_not_monthly_payout_day":
    default:
      return "stream.monetization.payout.wait_monthly_cycle";
  }
}

export function planStreamFoundationMonthlyPayoutBatch(
  input: StreamFoundationMonthlyPayoutBatchInput,
  config: StreamFoundationMonetizationAdminConfigSnapshot,
): StreamFoundationMonthlyPayoutBatchDecision {
  const pending = safeAmount(input.earnings.pendingCoinAmount);
  const decisionCode = codeForPayout(input, config);
  const ok = decisionCode === "monthly_payout_batch_ready_for_real_execution_when_mounted";
  const availableForPayoutCoinAmount = ok ? pending : 0;
  const line: StreamFoundationMonthlyPayoutBatchLine = {
    lineId: `${input.batchId}:${input.creatorUserId}`,
    creatorUserId: input.creatorUserId,
    pendingCoinAmount: pending,
    availableForPayoutCoinAmount,
    platformFeeAlreadyReserved: true,
    payoutProviderReferenceRequired: true,
    walletLedgerDebitRequired: true,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
  };

  return {
    stage: STREAM_FOUNDATION_MONTHLY_PAYOUT_BATCH_STAGE,
    ok,
    decisionCode,
    safeMessageKey: messageKeyForCode(decisionCode),
    batchId: input.batchId,
    payoutMonth: input.payoutMonth,
    creatorUserId: input.creatorUserId,
    payoutOncePerMonth: true,
    monthlyPayoutDayOfMonth: config.monthlyPayoutDayOfMonth,
    minPayoutCoinAmount: config.minPayoutCoinAmount,
    pendingCoinAmount: pending,
    availableForPayoutCoinAmount,
    lines: pending > 0 ? [line] : [],
    kycRequired: !input.kycApproved,
    creatorApprovalRequired: !input.creatorMonetizationApproved,
    payoutProviderConfigured: config.monetizationPayoutProvider.configured && config.monetizationPayoutProvider.enabled,
    walletLedgerConfigured: config.walletCoinLedgerProvider.configured && config.walletCoinLedgerProvider.enabled,
    databaseWriteAllowedNow: false,
    providerPayoutCallAllowedNow: false,
    walletLedgerMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakePayoutSuccessAllowed: false,
    rawProviderSecretReturned: false,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}

export function getStreamFoundationMonthlyPayoutBatchSafety() {
  return {
    stage: STREAM_FOUNDATION_MONTHLY_PAYOUT_BATCH_STAGE,
    payoutOncePerMonth: true,
    directUserWithdrawalAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerPayoutCallAllowedNow: false,
    walletLedgerMutationAllowedNow: false,
    fakePayoutSuccessAllowed: false,
    rawProviderSecretReturned: false,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  } as const;
}
