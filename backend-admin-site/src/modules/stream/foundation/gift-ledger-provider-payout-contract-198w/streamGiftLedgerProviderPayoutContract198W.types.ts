export const STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_CONTRACT_198W_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-198W" as const;

export type StreamGiftLedgerProviderPayoutContractSafety198W = Readonly<{
  dbReadAllowedNow: true;
  dbWriteAllowedNow: false;
  payoutExecutionAllowedNow: false;
  providerPayoutCallAllowedNow: false;
  walletMutationAllowedNow: false;
  paymentCaptureAllowedNow: false;
  availableBalanceMutationAllowedNow: false;
  realtimeEmitAllowedNow: false;
  officialCreatorVerificationRequired: true;
  creatorAgreementRequired: true;
  kycKybAmlRequired: true;
  taxWithholdingRequired: true;
  adminPayoutApprovalRequired: true;
  providerPayoutReferenceHashRequired: true;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderReferenceOutputAllowed: false;
  fakeCashOutAllowed: false;
  fakePayoutSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
}>;

export type StreamGiftLedgerProviderPayoutContractInput198W = Readonly<{
  sendIntentId?: string;
  creatorUserId?: string;
  payoutProvider?: "airwallex" | "bank" | "manual_review" | "other";
  providerPayoutReferenceHash?: string;
  payoutDestinationReferenceHash?: string;
  payoutApproval?: string;
}>;

export type StreamGiftLedgerProviderPayoutContractBlockedCode198W =
  | "send_intent_id_required"
  | "creator_payout_not_ready"
  | "provider_payout_reference_hash_required"
  | "provider_payout_reference_hash_invalid"
  | "raw_provider_reference_rejected"
  | "admin_payout_approval_required"
  | "payout_execution_disabled";

export type StreamGiftLedgerProviderPayoutContractGate198W = Readonly<{
  name: string;
  passed: boolean;
  evidence: string;
}>;

export type StreamGiftLedgerProviderPayoutContractAccepted198W = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_CONTRACT_198W_VERSION;
  status: "provider_payout_contract_ready_for_future_execution_only";
  sendIntentId: string;
  creatorUserId: string;
  payoutProvider: string;
  providerPayoutReferenceHashPresent: true;
  payoutDestinationReferenceHashPresent: boolean;
  adminApprovalAccepted: true;
  creatorPayoutReadinessStatus: string;
  availableDiamondMicros: string;
  payoutExecutionAllowed: false;
  providerPayoutCallAllowed: false;
  nextExecutionStage: "198X_provider_payout_execution_guard_required";
  gates: readonly StreamGiftLedgerProviderPayoutContractGate198W[];
  safety: StreamGiftLedgerProviderPayoutContractSafety198W;
}>;

export type StreamGiftLedgerProviderPayoutContractBlocked198W = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_CONTRACT_198W_VERSION;
  status: "provider_payout_contract_blocked";
  code: StreamGiftLedgerProviderPayoutContractBlockedCode198W;
  blockedReason: string;
  payoutExecutionAllowed: false;
  providerPayoutCallAllowed: false;
  fakePayoutSuccessAllowed: false;
  safety: StreamGiftLedgerProviderPayoutContractSafety198W;
}>;

export type StreamGiftLedgerProviderPayoutContractResult198W =
  | StreamGiftLedgerProviderPayoutContractAccepted198W
  | StreamGiftLedgerProviderPayoutContractBlocked198W;
