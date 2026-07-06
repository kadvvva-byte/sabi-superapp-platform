import type {
  StreamGiftLedgerBlockedDbCommit198K,
  StreamGiftLedgerDbCommit198K,
} from "../gift-ledger-db-backed-198k/streamGiftLedgerDbBacked198K.types";
import type {
  StreamGiftLedgerRealPaymentAuthorizationAdapterBlocked199D,
  StreamGiftLedgerRealPaymentAuthorizationEnvelope199D,
} from "../gift-ledger-real-payment-authorization-adapter-199d/streamGiftLedgerRealPaymentAuthorizationAdapter199D.types";

export const STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-199E" as const;

export type StreamGiftLedgerAuthorizedSendCommitSafety199E = Readonly<{
  dbReadAllowedNow: true;
  dbWriteAllowedOnlyThrough198KGuard: true;
  providerReferenceHashRequired: true;
  providerLiveCallAllowedNow: false;
  providerAuthorizationCallAllowedNow: false;
  walletMutationAllowedNow: false;
  paymentCaptureAllowedNow: false;
  payoutExecutionAllowedNow: false;
  realtimeEmitAllowedNow: false;
  availableBalanceReleaseAllowedNow: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderResponseAccepted: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSendSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
}>;

export type StreamGiftLedgerAuthorizedSendCommitInput199E = Readonly<{
  commitApproval?: string;
  requestedBundle?: "stream_gifts_provider_authorized_ledger_commit" | "disabled";
  paymentAuthorization: Record<string, unknown>;
}>;

export type StreamGiftLedgerAuthorizedSendCommitReadiness199E = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_VERSION;
  status: "ready_for_provider_authorized_ledger_commit_boundary";
  requiredPreviousStages: readonly [
    "199D_real_payment_authorization_adapter_owner_local_hash_only_clean",
    "198K_db_backed_ledger_service_clean",
  ];
  commitTarget: "198K_createStreamGiftLedgerDbCommit198K";
  providerLiveCallExecuted: false;
  paymentCaptureExecuted: false;
  walletMutationExecuted: false;
  realtimeEmitExecuted: false;
  safety: StreamGiftLedgerAuthorizedSendCommitSafety199E;
}>;

export type StreamGiftLedgerAuthorizedSendCommitBlockedCode199E =
  | "commit_approval_required"
  | "requested_bundle_disabled"
  | "payment_authorization_blocked"
  | "provider_authorization_hash_required"
  | "provider_authorization_amount_mismatch"
  | "198k_commit_guard_blocked"
  | "unsafe_runtime_flag";

export type StreamGiftLedgerAuthorizedSendCommitBlocked199E = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_VERSION;
  status: "authorized_send_commit_blocked_without_fake_success";
  code: StreamGiftLedgerAuthorizedSendCommitBlockedCode199E;
  blockedReason: string;
  paymentAuthorization?: StreamGiftLedgerRealPaymentAuthorizationAdapterBlocked199D;
  acceptedEnvelope?: StreamGiftLedgerRealPaymentAuthorizationEnvelope199D;
  ledgerResult?: StreamGiftLedgerBlockedDbCommit198K;
  providerLiveCallExecuted: false;
  paymentCaptureExecuted: false;
  walletMutationExecuted: false;
  giftSendCommitted: false;
  fakeGiftSendSuccess: false;
  safety: StreamGiftLedgerAuthorizedSendCommitSafety199E;
}>;

export type StreamGiftLedgerAuthorizedSendCommitAccepted199E = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_VERSION;
  status: "provider_authorized_ledger_committed";
  paymentAuthorization: StreamGiftLedgerRealPaymentAuthorizationEnvelope199D;
  ledgerCommit: StreamGiftLedgerDbCommit198K;
  providerLiveCallExecuted: false;
  paymentCaptureExecuted: false;
  walletMutationExecuted: false;
  realtimeEmitExecuted: false;
  availableBalanceReleased: false;
  payoutExecuted: false;
  fakePaymentSuccess: false;
  fakeGiftSendSuccess: false;
  fakeAvailableBalance: false;
  nextStages: readonly [
    "198P_post_commit_inspection",
    "198Q_realtime_delivery_preview",
    "198R_guarded_realtime_runtime_binding_if_enabled",
  ];
  safety: StreamGiftLedgerAuthorizedSendCommitSafety199E;
}>;

export type StreamGiftLedgerAuthorizedSendCommitResult199E =
  | StreamGiftLedgerAuthorizedSendCommitAccepted199E
  | StreamGiftLedgerAuthorizedSendCommitBlocked199E;
