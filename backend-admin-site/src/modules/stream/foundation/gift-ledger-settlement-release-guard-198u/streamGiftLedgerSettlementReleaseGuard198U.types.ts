export const STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-198U" as const;

export type StreamGiftLedgerSettlementGateVerdict198U = "passed" | "waived_by_admin" | "pending" | "failed" | "missing";

export type StreamGiftLedgerSettlementReleaseSafety198U = Readonly<{
  dbReadAllowedNow: true;
  dbWriteAllowedOnlyWithExplicitRuntimeFlagAndAdminApproval: true;
  allSettlementGatesRequiredBeforeRelease: true;
  deliveryReceiptAcceptedAsFinancialSettlementProof: false;
  availableBalanceReleaseAllowedOnlyAfterAllGatesPass: true;
  payoutExecutionAllowedNow: false;
  walletMutationAllowedNow: false;
  providerCallAllowedNow: false;
  paymentCaptureAllowedNow: false;
  realtimeEmitAllowedNow: false;
  fakeAvailableBalanceAllowed: false;
  fakeGiftSendSuccessAllowed: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceOutputAllowed: false;
}>;

export type StreamGiftLedgerSettlementReleaseInput198U = Readonly<{
  sendIntentId?: string;
  creatorUserId?: string;
  releaseApproval?: string;
  idempotencyKey?: string;
}>;

export type StreamGiftLedgerSettlementGateSnapshot198U = Readonly<{
  gateKind: string;
  status: string;
  verdict: StreamGiftLedgerSettlementGateVerdict198U;
  checkedAt?: string;
  reasonCode?: string;
  evidenceHashPresent: boolean;
  payoutReleaseAllowed: boolean;
}>;

export type StreamGiftLedgerSettlementReleaseInspection198U = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_VERSION;
  status: "settlement_release_inspected";
  sendIntentId: string;
  creatorUserId: string;
  earningId: string;
  earningStatus: string;
  pendingDiamondMicros: string;
  availableDiamondMicros: string;
  allRequiredGatesSatisfied: boolean;
  failedGateCount: number;
  pendingGateCount: number;
  missingGateCount: number;
  receiptAuditCount: number;
  releaseEligibleNow: boolean;
  releaseBlockedReasons: readonly string[];
  gates: readonly StreamGiftLedgerSettlementGateSnapshot198U[];
  safety: StreamGiftLedgerSettlementReleaseSafety198U;
}>;

export type StreamGiftLedgerSettlementReleaseBlocked198U = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_VERSION;
  status: "available_release_blocked_by_guard";
  code:
    | "send_intent_id_required"
    | "release_runtime_flag_disabled"
    | "release_mode_not_all_gates_passed"
    | "admin_release_approval_required"
    | "settlement_inspection_failed"
    | "settlement_gates_not_satisfied"
    | "earning_not_pending"
    | "earning_delegate_missing_generate_required"
    | "ledger_delegate_missing_generate_required"
    | "release_db_write_failed";
  blockedReason: string;
  availableBalanceReleased: false;
  payoutExecutionAllowed: false;
  safety: StreamGiftLedgerSettlementReleaseSafety198U;
}>;

export type StreamGiftLedgerSettlementReleaseCommitted198U = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_VERSION;
  status: "available_balance_released_after_settlement_gates";
  sendIntentId: string;
  creatorUserId: string;
  earningId: string;
  settlementReleaseLedgerEntryId: string;
  availableDiamondMicrosReleased: string;
  payoutExecutionAllowed: false;
  payoutEligible: false;
  availableBalanceReleased: true;
  releaseNotes: readonly string[];
  safety: StreamGiftLedgerSettlementReleaseSafety198U;
}>;

export type StreamGiftLedgerSettlementReleaseResult198U =
  | StreamGiftLedgerSettlementReleaseInspection198U
  | StreamGiftLedgerSettlementReleaseBlocked198U
  | StreamGiftLedgerSettlementReleaseCommitted198U;
