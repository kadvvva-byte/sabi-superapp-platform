export const STREAM_GIFT_LEDGER_CREATOR_PAYOUT_READINESS_198V_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-198V" as const;

export type StreamGiftLedgerCreatorPayoutReadinessSafety198V = Readonly<{
  dbReadAllowedNow: true;
  dbWriteAllowedNow: false;
  payoutExecutionAllowedNow: false;
  payoutProviderCallAllowedNow: false;
  walletMutationAllowedNow: false;
  paymentCaptureAllowedNow: false;
  availableBalanceReleaseAllowedNow: false;
  realtimeEmitAllowedNow: false;
  officialCreatorVerificationRequired: true;
  creatorAgreementRequired: true;
  kycKybAmlRequired: true;
  taxWithholdingRequired: true;
  adminPayoutApprovalRequired: true;
  fakeCashOutAllowed: false;
  fakePayoutSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceOutputAllowed: false;
}>;

export type StreamGiftLedgerCreatorPayoutReadinessInput198V = Readonly<{
  sendIntentId?: string;
  creatorUserId?: string;
}>;

export type StreamGiftLedgerCreatorPayoutGate198V = Readonly<{
  gateKind: string;
  status: string;
  verdict: "passed" | "waived_by_admin" | "pending" | "failed" | "missing";
  payoutReleaseAllowed: boolean;
  evidenceHashPresent: boolean;
}>;

export type StreamGiftLedgerCreatorPayoutReadinessInspection198V = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_CREATOR_PAYOUT_READINESS_198V_VERSION;
  status: "creator_payout_readiness_inspected";
  sendIntentId: string;
  creatorUserId: string;
  earningId: string;
  earningStatus: string;
  pendingDiamondMicros: string;
  availableDiamondMicros: string;
  availableBalancePresent: boolean;
  settlementGatesSatisfied: boolean;
  receiptAuditCount: number;
  payoutReadinessStatus: "not_ready" | "ready_for_admin_review_only";
  payoutExecutionAllowed: false;
  payoutProviderCallAllowed: false;
  payoutBlockedReasons: readonly string[];
  requiredCreatorCompliance: readonly string[];
  requiredPayoutProviderSetup: readonly string[];
  gates: readonly StreamGiftLedgerCreatorPayoutGate198V[];
  safety: StreamGiftLedgerCreatorPayoutReadinessSafety198V;
}>;

export type StreamGiftLedgerCreatorPayoutReadinessBlocked198V = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_CREATOR_PAYOUT_READINESS_198V_VERSION;
  status: "creator_payout_readiness_blocked";
  code:
    | "send_intent_id_required"
    | "creator_earning_not_found"
    | "creator_earning_delegate_missing_generate_required"
    | "settlement_gate_delegate_missing_generate_required"
    | "payout_readiness_inspection_failed";
  blockedReason: string;
  payoutExecutionAllowed: false;
  fakePayoutSuccessAllowed: false;
  safety: StreamGiftLedgerCreatorPayoutReadinessSafety198V;
}>;

export type StreamGiftLedgerCreatorPayoutReadinessResult198V =
  | StreamGiftLedgerCreatorPayoutReadinessInspection198V
  | StreamGiftLedgerCreatorPayoutReadinessBlocked198V;
