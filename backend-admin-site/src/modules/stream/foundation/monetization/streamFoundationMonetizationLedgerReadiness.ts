import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "../core";
import { STREAM_FOUNDATION_MONETIZATION_READY_PREVIEW_CONFIG, STREAM_FOUNDATION_MONETIZATION_SAFE_DISABLED_CONFIG } from "./streamFoundationMonetizationAdminConfig";
import { StreamFoundationMonetizationService } from "./streamFoundationMonetizationService";
import { createStreamFoundationInMemoryMonetizationLedgerPreviewRepository, getStreamFoundationMonetizationLedgerRepositorySafety } from "./streamFoundationMonetizationLedgerRepositoryContracts";
import { getStreamFoundationMonthlyPayoutBatchSafety, planStreamFoundationMonthlyPayoutBatch } from "./streamFoundationMonthlyPayoutBatchContracts";

export const STREAM_FOUNDATION_MONETIZATION_LEDGER_READINESS_STAGE = "BACKEND_STREAM_FOUNDATION_136Q_LEDGER_READINESS_STAGING" as const;

export type StreamFoundationMonetizationLedgerReadinessSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_MONETIZATION_LEDGER_READINESS_STAGE;
  giftLedgerPlanCreated: true;
  giftLedgerPreviewRecorded: boolean;
  receiverPendingEarningsCounted: boolean;
  monthlyPayoutBatchPlanned: boolean;
  monthlyPayoutOncePerMonth: true;
  separatePaymentAcceptanceAndPayoutConfig: true;
  providerKeysServerSideOnly: true;
  rawSecretReturned: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSuccessAllowed: false;
  fakeEarningCreditAllowed: false;
  fakePayoutSuccessAllowed: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
  repositorySafety: ReturnType<typeof getStreamFoundationMonetizationLedgerRepositorySafety>;
  payoutSafety: ReturnType<typeof getStreamFoundationMonthlyPayoutBatchSafety>;
  safeDisabledStatus: string;
  readyPreviewGiftDecisionCode: string;
  readyPreviewPayoutDecisionCode: string;
  readyPreviewPendingCoinAmount: number;
  readyPreviewAvailableForPayoutCoinAmount: number;
  safety: typeof STREAM_FOUNDATION_SAFE_SNAPSHOT;
}>;

export function getStreamFoundationMonetizationLedgerReadinessSnapshot(): StreamFoundationMonetizationLedgerReadinessSnapshot {
  const safeDisabledService = new StreamFoundationMonetizationService(STREAM_FOUNDATION_MONETIZATION_SAFE_DISABLED_CONFIG);
  const readyService = new StreamFoundationMonetizationService(STREAM_FOUNDATION_MONETIZATION_READY_PREVIEW_CONFIG);
  const repository = createStreamFoundationInMemoryMonetizationLedgerPreviewRepository();
  const giftDecision = readyService.planGiftPayment({
    requestId: "stream-136q-gift-readiness-request",
    idempotencyKey: "stream-136q-gift-readiness-idempotency",
    senderUserId: "sender-user-preview",
    recipientUserId: "recipient-creator-preview",
    streamRoomId: "stream-room-preview",
    giftSku: "gift-basic-preview",
    coinAmount: 100,
    paymentRail: "sabi_coin_wallet",
  });
  const ledgerRecord = repository.recordGiftLedgerPlan(giftDecision);
  const earnings = repository.getCreatorEarningsSnapshot(ledgerRecord.recipientUserId);
  const payoutDecision = planStreamFoundationMonthlyPayoutBatch({
    batchId: "stream-136q-monthly-payout-batch-preview",
    creatorUserId: ledgerRecord.recipientUserId,
    payoutMonth: "2026-06",
    todayDayOfMonth: STREAM_FOUNDATION_MONETIZATION_READY_PREVIEW_CONFIG.monthlyPayoutDayOfMonth,
    kycApproved: true,
    creatorMonetizationApproved: true,
    earnings,
  }, STREAM_FOUNDATION_MONETIZATION_READY_PREVIEW_CONFIG);

  return {
    stage: STREAM_FOUNDATION_MONETIZATION_LEDGER_READINESS_STAGE,
    giftLedgerPlanCreated: true,
    giftLedgerPreviewRecorded: ledgerRecord.status === "preview_recorded_local_memory_only",
    receiverPendingEarningsCounted: earnings.pendingCoinAmount === giftDecision.recipientNetCoinAmount,
    monthlyPayoutBatchPlanned: payoutDecision.lines.length > 0,
    monthlyPayoutOncePerMonth: true,
    separatePaymentAcceptanceAndPayoutConfig: true,
    providerKeysServerSideOnly: true,
    rawSecretReturned: false,
    fakePaymentSuccessAllowed: false,
    fakeGiftSuccessAllowed: false,
    fakeEarningCreditAllowed: false,
    fakePayoutSuccessAllowed: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    repositorySafety: getStreamFoundationMonetizationLedgerRepositorySafety(),
    payoutSafety: getStreamFoundationMonthlyPayoutBatchSafety(),
    safeDisabledStatus: safeDisabledService.getAdminConfigSnapshot().status,
    readyPreviewGiftDecisionCode: giftDecision.decisionCode,
    readyPreviewPayoutDecisionCode: payoutDecision.decisionCode,
    readyPreviewPendingCoinAmount: earnings.pendingCoinAmount,
    readyPreviewAvailableForPayoutCoinAmount: payoutDecision.availableForPayoutCoinAmount,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}
