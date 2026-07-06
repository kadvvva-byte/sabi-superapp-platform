import type { StreamFoundationSafetySnapshot } from "../core";
import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "../core";
import type {
  StreamFoundationGiftLedgerEntry,
  StreamFoundationGiftPaymentDecision,
  StreamFoundationGiftPaymentRequest,
  StreamFoundationMonthlyPayoutPlan,
} from "./streamFoundationMonetizationTypes";

export const STREAM_FOUNDATION_MONETIZATION_LEDGER_REPOSITORY_STAGE = "BACKEND_STREAM_FOUNDATION_136Q_LEDGER_REPOSITORY_STAGING" as const;

export type StreamFoundationMonetizationLedgerRepositoryStage = typeof STREAM_FOUNDATION_MONETIZATION_LEDGER_REPOSITORY_STAGE;

export type StreamFoundationMonetizationLedgerRecordStatus =
  | "preview_recorded_local_memory_only"
  | "blocked_invalid_decision"
  | "blocked_not_ready_for_real_execution"
  | "blocked_repository_not_mounted";

export type StreamFoundationMonetizationLedgerRecord = Readonly<{
  ledgerRecordId: string;
  requestId: string;
  idempotencyKey: string;
  senderUserId: string;
  recipientUserId: string;
  streamRoomId: string;
  giftSku: string;
  grossCoinAmount: number;
  platformFeeCoinAmount: number;
  recipientNetCoinAmount: number;
  entries: readonly StreamFoundationGiftLedgerEntry[];
  monthlyPayoutPlan?: StreamFoundationMonthlyPayoutPlan;
  status: StreamFoundationMonetizationLedgerRecordStatus;
  previewOnly: true;
  databaseWriteAllowedNow: false;
  moneyMovementAllowedNow: false;
  providerCallAllowedNow: false;
  fakeLedgerCreditAllowed: false;
}>;

export type StreamFoundationCreatorEarningsStatus =
  | "pending_only_until_monthly_cycle"
  | "available_for_monthly_payout_review"
  | "blocked_kyc_or_creator_approval_required"
  | "blocked_payout_provider_not_configured";

export type StreamFoundationCreatorEarningsSnapshot = Readonly<{
  stage: StreamFoundationMonetizationLedgerRepositoryStage;
  creatorUserId: string;
  pendingCoinAmount: number;
  availableCoinAmount: number;
  lifetimeGrossCoinAmount: number;
  lifetimePlatformFeeCoinAmount: number;
  lifetimeNetCoinAmount: number;
  giftCount: number;
  lastGiftLedgerRecordId?: string;
  status: StreamFoundationCreatorEarningsStatus;
  payoutOncePerMonth: true;
  databaseReadAllowedNow: false;
  databaseWriteAllowedNow: false;
  payoutExecutionAllowedNow: false;
  fakeEarningsAllowed: false;
  safety: StreamFoundationSafetySnapshot;
}>;

export type StreamFoundationMonetizationLedgerRepositoryPort = Readonly<{
  repositoryName: "stream_monetization_ledger_repository";
  stage: StreamFoundationMonetizationLedgerRepositoryStage;
  mounted: false;
  recordGiftLedgerPlan: (decision: StreamFoundationGiftPaymentDecision) => StreamFoundationMonetizationLedgerRecord;
  getCreatorEarningsSnapshot: (creatorUserId: string) => StreamFoundationCreatorEarningsSnapshot;
  databaseReadAllowedNow: false;
  databaseWriteAllowedNow: false;
  moneyMovementAllowedNow: false;
  providerCallAllowedNow: false;
}>;

function safeAmount(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.floor(value));
}

function entryNetForCreator(entry: StreamFoundationGiftLedgerEntry, creatorUserId: string): number {
  if (entry.kind !== "recipient_pending_earning_credit") return 0;
  if (entry.ownerUserId !== creatorUserId) return 0;
  if (!entry.visibleToRecipientEarnings) return 0;
  return safeAmount(entry.coinAmount);
}

function entryFee(entry: StreamFoundationGiftLedgerEntry): number {
  if (entry.kind !== "platform_fee_receivable") return 0;
  return safeAmount(entry.coinAmount);
}

export class StreamFoundationInMemoryMonetizationLedgerPreviewRepository implements StreamFoundationMonetizationLedgerRepositoryPort {
  readonly repositoryName = "stream_monetization_ledger_repository" as const;
  readonly stage = STREAM_FOUNDATION_MONETIZATION_LEDGER_REPOSITORY_STAGE;
  readonly mounted = false;
  readonly databaseReadAllowedNow = false;
  readonly databaseWriteAllowedNow = false;
  readonly moneyMovementAllowedNow = false;
  readonly providerCallAllowedNow = false;

  private readonly records: StreamFoundationMonetizationLedgerRecord[] = [];

  recordGiftLedgerPlan(decision: StreamFoundationGiftPaymentDecision): StreamFoundationMonetizationLedgerRecord {
    const request = decision.requestPreview;
    const valid = request.coinAmount > 0
      && decision.ledgerEntries.length > 0
      && request.senderUserId.trim().length > 0
      && request.recipientUserId.trim().length > 0
      && request.senderUserId !== request.recipientUserId;

    const record: StreamFoundationMonetizationLedgerRecord = {
      ledgerRecordId: `preview-ledger:${request.requestId}`,
      requestId: request.requestId,
      idempotencyKey: `preview-idempotency:${request.requestId}`,
      senderUserId: request.senderUserId,
      recipientUserId: request.recipientUserId,
      streamRoomId: request.streamRoomId,
      giftSku: request.giftSku,
      grossCoinAmount: safeAmount(request.coinAmount),
      platformFeeCoinAmount: safeAmount(decision.platformFeeCoinAmount),
      recipientNetCoinAmount: safeAmount(decision.recipientNetCoinAmount),
      entries: decision.ledgerEntries,
      monthlyPayoutPlan: decision.monthlyPayoutPlan,
      status: valid
        ? decision.ok ? "preview_recorded_local_memory_only" : "blocked_not_ready_for_real_execution"
        : "blocked_invalid_decision",
      previewOnly: true,
      databaseWriteAllowedNow: false,
      moneyMovementAllowedNow: false,
      providerCallAllowedNow: false,
      fakeLedgerCreditAllowed: false,
    };

    this.records.push(record);
    return record;
  }

  getCreatorEarningsSnapshot(creatorUserId: string): StreamFoundationCreatorEarningsSnapshot {
    const matching = this.records.filter((record) => record.recipientUserId === creatorUserId);
    const pendingCoinAmount = matching.reduce((sum, record) => sum + record.entries.reduce((entrySum, entry) => entrySum + entryNetForCreator(entry, creatorUserId), 0), 0);
    const lifetimePlatformFeeCoinAmount = matching.reduce((sum, record) => sum + record.entries.reduce((entrySum, entry) => entrySum + entryFee(entry), 0), 0);
    const lifetimeGrossCoinAmount = matching.reduce((sum, record) => sum + safeAmount(record.grossCoinAmount), 0);
    const lifetimeNetCoinAmount = matching.reduce((sum, record) => sum + safeAmount(record.recipientNetCoinAmount), 0);

    return {
      stage: STREAM_FOUNDATION_MONETIZATION_LEDGER_REPOSITORY_STAGE,
      creatorUserId,
      pendingCoinAmount,
      availableCoinAmount: 0,
      lifetimeGrossCoinAmount,
      lifetimePlatformFeeCoinAmount,
      lifetimeNetCoinAmount,
      giftCount: matching.length,
      lastGiftLedgerRecordId: matching.length > 0 ? matching[matching.length - 1]?.ledgerRecordId : undefined,
      status: pendingCoinAmount > 0 ? "pending_only_until_monthly_cycle" : "blocked_kyc_or_creator_approval_required",
      payoutOncePerMonth: true,
      databaseReadAllowedNow: false,
      databaseWriteAllowedNow: false,
      payoutExecutionAllowedNow: false,
      fakeEarningsAllowed: false,
      safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
    };
  }

  getPreviewRecords(): readonly StreamFoundationMonetizationLedgerRecord[] {
    return [...this.records];
  }
}

export function createStreamFoundationInMemoryMonetizationLedgerPreviewRepository(): StreamFoundationInMemoryMonetizationLedgerPreviewRepository {
  return new StreamFoundationInMemoryMonetizationLedgerPreviewRepository();
}

export function getStreamFoundationMonetizationLedgerRepositorySafety() {
  return {
    stage: STREAM_FOUNDATION_MONETIZATION_LEDGER_REPOSITORY_STAGE,
    repositoryMounted: false,
    previewMemoryOnly: true,
    databaseReadAllowedNow: false,
    databaseWriteAllowedNow: false,
    moneyMovementAllowedNow: false,
    providerCallAllowedNow: false,
    fakeLedgerCreditAllowed: false,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  } as const;
}

export function createStreamFoundationMonetizationLedgerRecordFromRequest(
  request: StreamFoundationGiftPaymentRequest,
  decision: StreamFoundationGiftPaymentDecision,
): StreamFoundationMonetizationLedgerRecord {
  const repository = createStreamFoundationInMemoryMonetizationLedgerPreviewRepository();
  const record = repository.recordGiftLedgerPlan(decision);
  return {
    ...record,
    idempotencyKey: request.idempotencyKey,
  };
}
