import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "../core";
import {
  STREAM_FOUNDATION_MONETIZATION_READY_PREVIEW_CONFIG,
  STREAM_FOUNDATION_MONETIZATION_SAFE_DISABLED_CONFIG,
} from "./streamFoundationMonetizationAdminConfig";
import { STREAM_FOUNDATION_MONETIZATION_LEDGER_REPOSITORY_STAGE, type StreamFoundationCreatorEarningsSnapshot } from "./streamFoundationMonetizationLedgerRepositoryContracts";
import { planStreamFoundationMonthlyPayoutBatch } from "./streamFoundationMonthlyPayoutBatchContracts";
import type { StreamFoundationMonetizationAdminConfigSnapshot } from "./streamFoundationMonetizationTypes";
import {
  STREAM_FOUNDATION_MONTHLY_PAYOUT_EXECUTION_GATE_STAGE,
  type StreamFoundationMonthlyPayoutExecutionGateAuditDraft,
  type StreamFoundationMonthlyPayoutExecutionGateDecisionCode,
  type StreamFoundationMonthlyPayoutExecutionGateInput,
  type StreamFoundationMonthlyPayoutExecutionGatePlan,
  type StreamFoundationMonthlyPayoutExecutionGateStep,
  type StreamFoundationMonthlyPayoutExecutionGateStepStatus,
} from "./streamFoundationMonthlyPayoutExecutionGateTypes";

function safeText(value: string): string {
  return value.trim();
}

function safeAmount(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.floor(value));
}

function validInput(input: StreamFoundationMonthlyPayoutExecutionGateInput): boolean {
  return safeText(input.batchId).length > 0
    && safeText(input.payoutMonth).length > 0
    && safeText(input.creatorUserId).length > 0
    && input.creatorUserId === input.earnings.creatorUserId
    && Number.isFinite(input.todayDayOfMonth)
    && input.todayDayOfMonth >= 1
    && input.todayDayOfMonth <= 31;
}

function payoutProviderConfigured(config: StreamFoundationMonetizationAdminConfigSnapshot): boolean {
  return config.monetizationPayoutProvider.configured && config.monetizationPayoutProvider.enabled;
}

function walletLedgerConfigured(config: StreamFoundationMonetizationAdminConfigSnapshot): boolean {
  return config.walletCoinLedgerProvider.configured && config.walletCoinLedgerProvider.enabled;
}

function decisionCodeFor(
  input: StreamFoundationMonthlyPayoutExecutionGateInput,
  config: StreamFoundationMonetizationAdminConfigSnapshot,
): StreamFoundationMonthlyPayoutExecutionGateDecisionCode {
  const pending = safeAmount(input.earnings.pendingCoinAmount);
  if (!validInput(input)) return "monthly_payout_blocked_invalid_batch_request";
  if (pending <= 0) return "monthly_payout_blocked_no_available_earnings";
  if (!walletLedgerConfigured(config)) return "monthly_payout_blocked_wallet_ledger_not_configured";
  if (!payoutProviderConfigured(config)) return "monthly_payout_blocked_payout_provider_not_configured";
  if (!input.kycApproved) return "monthly_payout_blocked_kyc_required";
  if (!input.creatorMonetizationApproved) return "monthly_payout_blocked_creator_approval_required";
  if (pending < config.minPayoutCoinAmount) return "monthly_payout_blocked_min_amount_not_reached";
  if (Math.floor(input.todayDayOfMonth) !== config.monthlyPayoutDayOfMonth) return "monthly_payout_blocked_not_monthly_payout_day";
  if (!input.walletLedgerLiveTestPassed || !input.payoutProviderLiveTestPassed) return "monthly_payout_blocked_provider_live_test_required";
  if (!input.routeMounted || !input.ownerApprovedRealExecution || !input.providerLiveExecutionApproved) return "monthly_payout_blocked_route_not_mounted";
  return "monthly_payout_ready_for_real_execution_after_route_mount_and_provider_approval";
}

function messageKeyFor(code: StreamFoundationMonthlyPayoutExecutionGateDecisionCode): string {
  switch (code) {
    case "monthly_payout_ready_for_real_execution_after_route_mount_and_provider_approval":
      return "stream.monetization.payout.ready_after_route_mount_and_provider_approval";
    case "monthly_payout_blocked_invalid_batch_request":
      return "stream.monetization.payout.invalid_batch_request";
    case "monthly_payout_blocked_no_available_earnings":
      return "stream.monetization.payout.no_available_earnings";
    case "monthly_payout_blocked_not_monthly_payout_day":
      return "stream.monetization.payout.wait_monthly_cycle";
    case "monthly_payout_blocked_min_amount_not_reached":
      return "stream.monetization.payout.min_amount_not_reached";
    case "monthly_payout_blocked_kyc_required":
      return "stream.monetization.payout.kyc_required";
    case "monthly_payout_blocked_creator_approval_required":
      return "stream.monetization.payout.creator_approval_required";
    case "monthly_payout_blocked_payout_provider_not_configured":
      return "stream.monetization.payout.provider_not_configured";
    case "monthly_payout_blocked_wallet_ledger_not_configured":
      return "stream.monetization.payout.wallet_ledger_not_configured";
    case "monthly_payout_blocked_provider_live_test_required":
      return "stream.monetization.payout.provider_live_test_required";
    case "monthly_payout_blocked_route_not_mounted":
    default:
      return "stream.monetization.payout.route_not_mounted_or_owner_approval_required";
  }
}

function statusFor(code: StreamFoundationMonthlyPayoutExecutionGateDecisionCode, passed: boolean): StreamFoundationMonthlyPayoutExecutionGateStepStatus {
  if (passed) return "passed";
  switch (code) {
    case "monthly_payout_ready_for_real_execution_after_route_mount_and_provider_approval":
      return "ready_after_route_mount_and_provider_approval";
    case "monthly_payout_blocked_invalid_batch_request":
      return "blocked_invalid_batch_request";
    case "monthly_payout_blocked_no_available_earnings":
      return "blocked_no_available_earnings";
    case "monthly_payout_blocked_not_monthly_payout_day":
      return "blocked_not_monthly_payout_day";
    case "monthly_payout_blocked_min_amount_not_reached":
      return "blocked_min_amount_not_reached";
    case "monthly_payout_blocked_kyc_required":
      return "blocked_kyc_required";
    case "monthly_payout_blocked_creator_approval_required":
      return "blocked_creator_approval_required";
    case "monthly_payout_blocked_payout_provider_not_configured":
      return "blocked_payout_provider_not_configured";
    case "monthly_payout_blocked_wallet_ledger_not_configured":
      return "blocked_wallet_ledger_not_configured";
    case "monthly_payout_blocked_provider_live_test_required":
      return "blocked_provider_live_test_required";
    case "monthly_payout_blocked_route_not_mounted":
    default:
      return "blocked_route_not_mounted";
  }
}

function step(input: Omit<StreamFoundationMonthlyPayoutExecutionGateStep,
  "executedNow"
  | "routeMountAllowedNow"
  | "databaseWriteAllowedNow"
  | "providerCallAllowedNow"
  | "walletLedgerMutationAllowedNow"
  | "moneyMovementAllowedNow"
>): StreamFoundationMonthlyPayoutExecutionGateStep {
  return {
    ...input,
    executedNow: false,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletLedgerMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
  };
}

function buildSteps(
  input: StreamFoundationMonthlyPayoutExecutionGateInput,
  config: StreamFoundationMonetizationAdminConfigSnapshot,
  code: StreamFoundationMonthlyPayoutExecutionGateDecisionCode,
): readonly StreamFoundationMonthlyPayoutExecutionGateStep[] {
  const pending = safeAmount(input.earnings.pendingCoinAmount);
  const inputReady = validInput(input);
  const hasEarnings = pending > 0;
  const monthlyDayReady = inputReady && Math.floor(input.todayDayOfMonth) === config.monthlyPayoutDayOfMonth;
  const minReady = hasEarnings && pending >= config.minPayoutCoinAmount;
  const kycReady = input.kycApproved;
  const creatorReady = input.creatorMonetizationApproved;
  const walletReady = walletLedgerConfigured(config);
  const payoutReady = payoutProviderConfigured(config);
  const liveTestReady = input.walletLedgerLiveTestPassed && input.payoutProviderLiveTestPassed;
  const routeReady = input.routeMounted && input.ownerApprovedRealExecution && input.providerLiveExecutionApproved;
  const auditReady = routeReady && liveTestReady && walletReady && payoutReady && kycReady && creatorReady && minReady && monthlyDayReady;

  return [
    step({
      stepId: "batch_idempotency_guard",
      order: 1,
      status: statusFor(code, inputReady),
      safeMessageKey: "stream.monetization.payout.batch_idempotency_guard",
      blocksBatchCreation: !inputReady,
      blocksWalletLedgerDebit: !inputReady,
      blocksProviderPayoutCall: !inputReady,
      blocksCreatorAvailableBalanceSettlement: !inputReady,
    }),
    step({
      stepId: "creator_earnings_snapshot_guard",
      order: 2,
      status: statusFor(code, hasEarnings),
      safeMessageKey: "stream.monetization.payout.creator_earnings_snapshot_guard",
      blocksBatchCreation: !hasEarnings,
      blocksWalletLedgerDebit: !hasEarnings,
      blocksProviderPayoutCall: !hasEarnings,
      blocksCreatorAvailableBalanceSettlement: !hasEarnings,
    }),
    step({
      stepId: "monthly_payout_cycle_guard",
      order: 3,
      status: statusFor(code, monthlyDayReady),
      safeMessageKey: "stream.monetization.payout.monthly_cycle_guard",
      blocksBatchCreation: !monthlyDayReady,
      blocksWalletLedgerDebit: !monthlyDayReady,
      blocksProviderPayoutCall: !monthlyDayReady,
      blocksCreatorAvailableBalanceSettlement: !monthlyDayReady,
    }),
    step({
      stepId: "minimum_payout_amount_guard",
      order: 4,
      status: statusFor(code, minReady),
      safeMessageKey: "stream.monetization.payout.minimum_amount_guard",
      blocksBatchCreation: !minReady,
      blocksWalletLedgerDebit: !minReady,
      blocksProviderPayoutCall: !minReady,
      blocksCreatorAvailableBalanceSettlement: !minReady,
    }),
    step({
      stepId: "creator_kyc_guard",
      order: 5,
      status: statusFor(code, kycReady),
      safeMessageKey: "stream.monetization.payout.creator_kyc_guard",
      blocksBatchCreation: !kycReady,
      blocksWalletLedgerDebit: !kycReady,
      blocksProviderPayoutCall: !kycReady,
      blocksCreatorAvailableBalanceSettlement: !kycReady,
    }),
    step({
      stepId: "creator_monetization_approval_guard",
      order: 6,
      status: statusFor(code, creatorReady),
      safeMessageKey: "stream.monetization.payout.creator_monetization_approval_guard",
      blocksBatchCreation: !creatorReady,
      blocksWalletLedgerDebit: !creatorReady,
      blocksProviderPayoutCall: !creatorReady,
      blocksCreatorAvailableBalanceSettlement: !creatorReady,
    }),
    step({
      stepId: "wallet_ledger_provider_guard",
      order: 7,
      status: statusFor(code, walletReady),
      safeMessageKey: "stream.monetization.payout.wallet_ledger_provider_guard",
      blocksBatchCreation: !walletReady,
      blocksWalletLedgerDebit: !walletReady,
      blocksProviderPayoutCall: false,
      blocksCreatorAvailableBalanceSettlement: !walletReady,
    }),
    step({
      stepId: "payout_provider_guard",
      order: 8,
      status: statusFor(code, payoutReady),
      safeMessageKey: "stream.monetization.payout.provider_guard",
      blocksBatchCreation: !payoutReady,
      blocksWalletLedgerDebit: false,
      blocksProviderPayoutCall: !payoutReady,
      blocksCreatorAvailableBalanceSettlement: !payoutReady,
    }),
    step({
      stepId: "provider_live_test_guard",
      order: 9,
      status: statusFor(code, liveTestReady),
      safeMessageKey: "stream.monetization.payout.provider_live_test_guard",
      blocksBatchCreation: !liveTestReady,
      blocksWalletLedgerDebit: !input.walletLedgerLiveTestPassed,
      blocksProviderPayoutCall: !input.payoutProviderLiveTestPassed,
      blocksCreatorAvailableBalanceSettlement: !liveTestReady,
    }),
    step({
      stepId: "ledger_and_provider_execution_guard",
      order: 10,
      status: statusFor(code, routeReady && liveTestReady),
      safeMessageKey: "stream.monetization.payout.ledger_provider_execution_guard",
      blocksBatchCreation: !(routeReady && liveTestReady),
      blocksWalletLedgerDebit: !(routeReady && liveTestReady),
      blocksProviderPayoutCall: !(routeReady && liveTestReady),
      blocksCreatorAvailableBalanceSettlement: !(routeReady && liveTestReady),
    }),
    step({
      stepId: "route_mount_owner_approval_guard",
      order: 11,
      status: statusFor(code, routeReady),
      safeMessageKey: "stream.monetization.payout.route_mount_owner_approval_guard",
      blocksBatchCreation: !routeReady,
      blocksWalletLedgerDebit: !routeReady,
      blocksProviderPayoutCall: !routeReady,
      blocksCreatorAvailableBalanceSettlement: !routeReady,
    }),
    step({
      stepId: "audit_and_reconciliation_guard",
      order: 12,
      status: statusFor(code, auditReady),
      safeMessageKey: "stream.monetization.payout.audit_reconciliation_guard",
      blocksBatchCreation: !auditReady,
      blocksWalletLedgerDebit: !auditReady,
      blocksProviderPayoutCall: !auditReady,
      blocksCreatorAvailableBalanceSettlement: !auditReady,
    }),
  ];
}

function auditDraft(
  input: StreamFoundationMonthlyPayoutExecutionGateInput,
  code: StreamFoundationMonthlyPayoutExecutionGateDecisionCode,
  availableForPayoutCoinAmount: number,
): StreamFoundationMonthlyPayoutExecutionGateAuditDraft {
  return {
    auditId: `stream-monthly-payout-gate-audit-${input.batchId}:${input.creatorUserId}`,
    batchId: input.batchId,
    payoutMonth: input.payoutMonth,
    creatorUserId: input.creatorUserId,
    pendingCoinAmount: safeAmount(input.earnings.pendingCoinAmount),
    availableForPayoutCoinAmount,
    decisionCode: code,
    persistedNow: false,
    auditPersistRequiredLater: true,
    reconciliationRequiredLater: true,
    providerPayoutCallExecuted: false,
    walletLedgerMutationExecuted: false,
    moneyMovementExecuted: false,
    rawSecretCaptured: false,
  };
}

export function planStreamFoundationMonthlyPayoutExecutionGate(
  input: StreamFoundationMonthlyPayoutExecutionGateInput,
  config: StreamFoundationMonetizationAdminConfigSnapshot = STREAM_FOUNDATION_MONETIZATION_SAFE_DISABLED_CONFIG,
): StreamFoundationMonthlyPayoutExecutionGatePlan {
  const monthlyPayoutBatchDecision = planStreamFoundationMonthlyPayoutBatch({
    batchId: input.batchId,
    creatorUserId: input.creatorUserId,
    payoutMonth: input.payoutMonth,
    todayDayOfMonth: input.todayDayOfMonth,
    kycApproved: input.kycApproved,
    creatorMonetizationApproved: input.creatorMonetizationApproved,
    earnings: input.earnings,
  }, config);
  const decisionCode = decisionCodeFor(input, config);
  const ok = decisionCode === "monthly_payout_ready_for_real_execution_after_route_mount_and_provider_approval";
  const availableForPayoutCoinAmount = ok ? monthlyPayoutBatchDecision.availableForPayoutCoinAmount : 0;

  return {
    stage: STREAM_FOUNDATION_MONTHLY_PAYOUT_EXECUTION_GATE_STAGE,
    ok,
    decisionCode,
    safeMessageKey: messageKeyFor(decisionCode),
    input,
    adminConfig: config,
    monthlyPayoutBatchDecision,
    steps: buildSteps(input, config, decisionCode),
    auditDraft: auditDraft(input, decisionCode, availableForPayoutCoinAmount),
    payoutOncePerMonth: true,
    monthlyPayoutDayOfMonth: config.monthlyPayoutDayOfMonth,
    minPayoutCoinAmount: config.minPayoutCoinAmount,
    pendingCoinAmount: safeAmount(input.earnings.pendingCoinAmount),
    availableForPayoutCoinAmount,
    creatorKycRequired: !input.kycApproved,
    creatorApprovalRequired: !input.creatorMonetizationApproved,
    walletLedgerConfigured: walletLedgerConfigured(config),
    payoutProviderConfigured: payoutProviderConfigured(config),
    providerLiveTestRequired: true,
    routeMounted: input.routeMounted,
    ownerApprovedRealExecution: input.ownerApprovedRealExecution,
    providerLiveExecutionApproved: input.providerLiveExecutionApproved,
    readyForRealExecutionWhenMountedAndApproved: ok,
    directUserWithdrawalAllowedNow: false,
    payoutBeforeMonthlyCycleAllowedNow: false,
    creatorAvailableBalanceSettlementAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerPayoutCallAllowedNow: false,
    walletLedgerMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawProviderSecretReturned: false,
    mobileProviderKeysAllowed: false,
    fakePayoutSuccessAllowed: false,
    fakeEarningCreditAllowed: false,
    fakeWalletDebitAllowed: false,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}

function creatorEarningsSnapshot(creatorUserId: string, pendingCoinAmount: number): StreamFoundationCreatorEarningsSnapshot {
  const pending = safeAmount(pendingCoinAmount);
  return {
    stage: STREAM_FOUNDATION_MONETIZATION_LEDGER_REPOSITORY_STAGE,
    creatorUserId,
    pendingCoinAmount: pending,
    availableCoinAmount: 0,
    lifetimeGrossCoinAmount: pending,
    lifetimePlatformFeeCoinAmount: 0,
    lifetimeNetCoinAmount: pending,
    giftCount: pending > 0 ? 1 : 0,
    lastGiftLedgerRecordId: pending > 0 ? `preview-ledger:${creatorUserId}` : undefined,
    status: pending > 0 ? "pending_only_until_monthly_cycle" : "blocked_kyc_or_creator_approval_required",
    payoutOncePerMonth: true,
    databaseReadAllowedNow: false,
    databaseWriteAllowedNow: false,
    payoutExecutionAllowedNow: false,
    fakeEarningsAllowed: false,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}

export function getStreamFoundationMonthlyPayoutExecutionGateSafeDisabledPreview(): StreamFoundationMonthlyPayoutExecutionGatePlan {
  return planStreamFoundationMonthlyPayoutExecutionGate({
    batchId: "stream-payout-safe-disabled-preview",
    payoutMonth: "2026-06",
    creatorUserId: "creator-preview",
    todayDayOfMonth: 1,
    kycApproved: false,
    creatorMonetizationApproved: false,
    walletLedgerLiveTestPassed: false,
    payoutProviderLiveTestPassed: false,
    routeMounted: false,
    ownerApprovedRealExecution: false,
    providerLiveExecutionApproved: false,
    earnings: creatorEarningsSnapshot("creator-preview", 0),
  }, STREAM_FOUNDATION_MONETIZATION_SAFE_DISABLED_CONFIG);
}

export function getStreamFoundationMonthlyPayoutExecutionGateReadyButUnmountedPreview(): StreamFoundationMonthlyPayoutExecutionGatePlan {
  return planStreamFoundationMonthlyPayoutExecutionGate({
    batchId: "stream-payout-ready-unmounted-preview",
    payoutMonth: "2026-06",
    creatorUserId: "creator-preview",
    todayDayOfMonth: STREAM_FOUNDATION_MONETIZATION_READY_PREVIEW_CONFIG.monthlyPayoutDayOfMonth,
    kycApproved: true,
    creatorMonetizationApproved: true,
    walletLedgerLiveTestPassed: true,
    payoutProviderLiveTestPassed: true,
    routeMounted: false,
    ownerApprovedRealExecution: false,
    providerLiveExecutionApproved: false,
    earnings: creatorEarningsSnapshot("creator-preview", 1000),
  }, STREAM_FOUNDATION_MONETIZATION_READY_PREVIEW_CONFIG);
}

export function getStreamFoundationMonthlyPayoutExecutionGateMountedApprovedPreview(): StreamFoundationMonthlyPayoutExecutionGatePlan {
  return planStreamFoundationMonthlyPayoutExecutionGate({
    batchId: "stream-payout-mounted-approved-preview",
    payoutMonth: "2026-06",
    creatorUserId: "creator-preview",
    todayDayOfMonth: STREAM_FOUNDATION_MONETIZATION_READY_PREVIEW_CONFIG.monthlyPayoutDayOfMonth,
    kycApproved: true,
    creatorMonetizationApproved: true,
    walletLedgerLiveTestPassed: true,
    payoutProviderLiveTestPassed: true,
    routeMounted: true,
    ownerApprovedRealExecution: true,
    providerLiveExecutionApproved: true,
    earnings: creatorEarningsSnapshot("creator-preview", 1000),
  }, STREAM_FOUNDATION_MONETIZATION_READY_PREVIEW_CONFIG);
}

export function getStreamFoundationMonthlyPayoutExecutionGateSafety() {
  return {
    stage: STREAM_FOUNDATION_MONTHLY_PAYOUT_EXECUTION_GATE_STAGE,
    payoutOncePerMonth: true,
    directUserWithdrawalAllowedNow: false,
    payoutBeforeMonthlyCycleAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerPayoutCallAllowedNow: false,
    walletLedgerMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawProviderSecretReturned: false,
    mobileProviderKeysAllowed: false,
    fakePayoutSuccessAllowed: false,
    fakeEarningCreditAllowed: false,
    fakeWalletDebitAllowed: false,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  } as const;
}
