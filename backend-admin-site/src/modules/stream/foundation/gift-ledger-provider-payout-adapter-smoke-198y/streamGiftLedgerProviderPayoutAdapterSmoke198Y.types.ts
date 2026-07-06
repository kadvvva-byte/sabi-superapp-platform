export const STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-198Y" as const;

export type StreamGiftLedgerProviderPayoutAdapterSmokeSafety198Y = Readonly<{
  dbReadAllowedNow: true;
  dbWriteAllowedNow: false;
  providerAdapterDryRunAllowedNow: true;
  providerAdapterLiveCallAllowedNow: false;
  providerPayoutCallAllowedNow: false;
  payoutExecutionAllowedNow: false;
  walletMutationAllowedNow: false;
  paymentCaptureAllowedNow: false;
  availableBalanceMutationAllowedNow: false;
  realtimeEmitAllowedNow: false;
  adminApprovalRequired: true;
  providerPayoutReferenceHashRequired: true;
  payoutDestinationReferenceHashAllowed: true;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawBankOrCardAccepted: false;
  rawProviderReferenceOutputAllowed: false;
  providerResponseBodyOutputAllowed: false;
  fakeCashOutAllowed: false;
  fakePayoutSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
}>;

export type StreamGiftLedgerProviderPayoutAdapterSmokeInput198Y = Readonly<{
  sendIntentId?: string;
  creatorUserId?: string;
  payoutProvider?: "airwallex" | "bank" | "manual_review" | "other";
  providerPayoutReferenceHash?: string;
  payoutDestinationReferenceHash?: string;
  payoutApproval?: string;
  executionApproval?: string;
  providerAdapterMode?: "server_verified_reference" | "manual_review" | "disabled";
  adapterSmokeApproval?: string;
}>;

export type StreamGiftLedgerProviderPayoutAdapterSmokeBlockedCode198Y =
  | "send_intent_id_required"
  | "raw_provider_reference_rejected"
  | "payout_execution_guard_not_ready"
  | "adapter_smoke_approval_required"
  | "provider_adapter_mode_invalid"
  | "provider_live_call_runtime_disabled"
  | "payout_execution_runtime_disabled"
  | "unsafe_runtime_flag";

export type StreamGiftLedgerProviderPayoutAdapterSmokeGate198Y = Readonly<{
  name: string;
  passed: boolean;
  evidence: string;
}>;

export type StreamGiftLedgerProviderPayoutAdapterEnvelope198Y = Readonly<{
  contract: "stream.gift.creator.payout.provider_adapter_envelope.v1";
  adapterMode: "server_verified_reference" | "manual_review";
  payoutProvider: string;
  sendIntentId: string;
  providerPayoutReferenceHashPresent: true;
  payoutDestinationReferenceHashPresent: boolean;
  providerPayoutCallExecuted: false;
  providerResponseStored: false;
  providerResponseBodyOutputAllowed: false;
  payoutExecutionAllowed: false;
  fakePayoutSuccessAllowed: false;
}>;

export type StreamGiftLedgerProviderPayoutAdapterSmokeAccepted198Y = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_VERSION;
  status: "owner_local_provider_payout_adapter_smoke_passed_no_provider_call";
  sendIntentId: string;
  creatorUserId: string;
  payoutProvider: string;
  providerAdapterMode: "server_verified_reference" | "manual_review";
  adapterSmokeApprovalAccepted: true;
  payoutExecutionGuard198XAccepted: true;
  providerPayoutReferenceHashPresent: true;
  payoutDestinationReferenceHashPresent: boolean;
  adapterEnvelope: StreamGiftLedgerProviderPayoutAdapterEnvelope198Y;
  nextStage: "198Z_final_payout_audit_and_production_provider_binding_request";
  gates: readonly StreamGiftLedgerProviderPayoutAdapterSmokeGate198Y[];
  safety: StreamGiftLedgerProviderPayoutAdapterSmokeSafety198Y;
}>;

export type StreamGiftLedgerProviderPayoutAdapterSmokeBlocked198Y = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_VERSION;
  status: "provider_payout_adapter_smoke_blocked";
  code: StreamGiftLedgerProviderPayoutAdapterSmokeBlockedCode198Y;
  blockedReason: string;
  providerPayoutCallAllowed: false;
  payoutExecutionAllowed: false;
  fakePayoutSuccessAllowed: false;
  safety: StreamGiftLedgerProviderPayoutAdapterSmokeSafety198Y;
}>;

export type StreamGiftLedgerProviderPayoutAdapterSmokeResult198Y =
  | StreamGiftLedgerProviderPayoutAdapterSmokeAccepted198Y
  | StreamGiftLedgerProviderPayoutAdapterSmokeBlocked198Y;
