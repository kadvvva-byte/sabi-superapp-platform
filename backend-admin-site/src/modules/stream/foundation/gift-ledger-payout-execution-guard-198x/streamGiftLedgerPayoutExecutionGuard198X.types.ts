export const STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_GUARD_198X_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-198X" as const;

export type StreamGiftLedgerPayoutExecutionGuardSafety198X = Readonly<{
  dbReadAllowedNow: true;
  dbWriteAllowedNow: false;
  payoutExecutionAllowedNow: false;
  providerPayoutCallAllowedNow: false;
  providerAdapterBindingAllowedNow: false;
  walletMutationAllowedNow: false;
  paymentCaptureAllowedNow: false;
  availableBalanceMutationAllowedNow: false;
  realtimeEmitAllowedNow: false;
  adminApprovalRequired: true;
  providerPayoutReferenceHashRequired: true;
  payoutDestinationReferenceHashRequired: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderReferenceOutputAllowed: false;
  fakeCashOutAllowed: false;
  fakePayoutSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
}>;

export type StreamGiftLedgerPayoutExecutionGuardInput198X = Readonly<{
  sendIntentId?: string;
  creatorUserId?: string;
  payoutProvider?: "airwallex" | "bank" | "manual_review" | "other";
  providerPayoutReferenceHash?: string;
  payoutDestinationReferenceHash?: string;
  payoutApproval?: string;
  executionApproval?: string;
  providerAdapterMode?: "server_verified_reference" | "manual_review" | "disabled";
}>;

export type StreamGiftLedgerPayoutExecutionGuardBlockedCode198X =
  | "send_intent_id_required"
  | "raw_provider_reference_rejected"
  | "provider_payout_contract_not_ready"
  | "execution_approval_required"
  | "provider_adapter_mode_invalid"
  | "payout_execution_runtime_disabled"
  | "provider_adapter_binding_disabled";

export type StreamGiftLedgerPayoutExecutionGuardGate198X = Readonly<{
  name: string;
  passed: boolean;
  evidence: string;
}>;

export type StreamGiftLedgerPayoutExecutionGuardAccepted198X = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_GUARD_198X_VERSION;
  status: "payout_execution_guard_ready_for_future_adapter_binding_only";
  sendIntentId: string;
  creatorUserId: string;
  payoutProvider: string;
  providerPayoutReferenceHashPresent: true;
  payoutDestinationReferenceHashPresent: boolean;
  adminApprovalAccepted: true;
  executionApprovalAccepted: true;
  providerAdapterMode: "server_verified_reference" | "manual_review";
  payoutExecutionAllowed: false;
  providerPayoutCallAllowed: false;
  providerAdapterBindingAllowed: false;
  nextExecutionStage: "198Y_owner_local_provider_payout_adapter_smoke_required";
  gates: readonly StreamGiftLedgerPayoutExecutionGuardGate198X[];
  safety: StreamGiftLedgerPayoutExecutionGuardSafety198X;
}>;

export type StreamGiftLedgerPayoutExecutionGuardBlocked198X = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_GUARD_198X_VERSION;
  status: "payout_execution_guard_blocked";
  code: StreamGiftLedgerPayoutExecutionGuardBlockedCode198X;
  blockedReason: string;
  payoutExecutionAllowed: false;
  providerPayoutCallAllowed: false;
  providerAdapterBindingAllowed: false;
  fakePayoutSuccessAllowed: false;
  safety: StreamGiftLedgerPayoutExecutionGuardSafety198X;
}>;

export type StreamGiftLedgerPayoutExecutionGuardResult198X =
  | StreamGiftLedgerPayoutExecutionGuardAccepted198X
  | StreamGiftLedgerPayoutExecutionGuardBlocked198X;
