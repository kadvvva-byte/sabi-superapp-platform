export const STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_EXEC_EXACT_APPROVAL_VERIFICATION_200Y_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-200Y" as const;

export type StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationKind200Y =
  | "accept_payments_provider"
  | "creator_payout_provider"
  | "google_billing_diamonds_provider"
  | "airwallex_merchant_rails_provider";

export type StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationProviderName200Y =
  | "google_billing"
  | "airwallex"
  | "wallet"
  | "bank"
  | "manual_review"
  | "other";

export type StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationConfigScope200Y =
  | "accept_payments"
  | "creator_payout"
  | "diamonds_topup"
  | "merchant_rails"
  | "manual_review";

export type StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationItem200Y = Readonly<{
  bindingKind: StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationKind200Y;
  providerName: StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationProviderName200Y;
  configReferenceLabel: string;
  configScope: StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationConfigScope200Y;
  previousRuntimeExecutionExactApprovalRequestStage: "200X_runtime_execution_exact_approval_request_clean" | "pending_owner_fill";
  approvalVerificationMode: "runtime_execution_exact_approval_verification_only_no_execution" | "pending_owner_fill";
  runtimeExecutionApprovalMode: "not_approved_now_requires_future_exact_owner_approval" | "pending_owner_fill";
  liveActivationExecutionMode: "not_executed_verification_only" | "pending_owner_fill";
  providerBindingMode: "disabled_no_binding" | "pending_owner_fill";
  providerRuntimeMode: "disabled_no_runtime_enablement" | "pending_owner_fill";
  liveCallMode: "disabled_no_provider_call" | "pending_owner_fill";
  paymentRuntimeMode: "disabled_no_payment_capture" | "pending_owner_fill";
  payoutRuntimeMode: "disabled_no_payout_execution" | "pending_owner_fill";
  walletMutationMode: "disabled_no_wallet_mutation" | "pending_owner_fill";
  runtimeCutoverMode: "disabled_no_cutover" | "pending_owner_fill";
  rollbackPlan: "ready" | "pending_owner_fill";
  executionRunbook: "ready" | "pending_owner_fill";
  auditTrail: "ready" | "pending_owner_fill";
}>;

export type StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationSafety200Y = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderResponseAccepted: false;
  previous200XRuntimeExecutionExactApprovalRequestClean: true;
  runtimeExecutionExactApprovalVerificationOnly: true;
  liveActivationRuntimeExecutionApprovedNow: false;
  liveActivationRuntimeExecutionPerformedNow: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerRuntimeEnabled: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  walletMutationExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecutionExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  schemaWriteExecuted: false;
  migrationExecuted: false;
  prismaGenerateExecuted: false;
  realtimeEmitExecuted: false;
  runtimeEnablementExecuted: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSendSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
  futureRuntimeExecutionExactFinalHandoffRequiresNewExactOwnerApproval: true;
  referenceLabelsOnly: true;
}>;

export type StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationInput200Y = Readonly<{
  ownerApproval?: string;
  runtimeExecutionExactApprovalVerificationMode?: "approval_verification_only" | "disabled";
  acknowledgedRuntimeExecutionExactApprovalRequestStage?: "200X_runtime_execution_exact_approval_request_clean" | "disabled";
  bindingItems: readonly StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationItem200Y[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationBlockedCode200Y =
  | "owner_approval_required"
  | "runtime_execution_exact_approval_verification_mode_disabled"
  | "previous_200x_runtime_execution_exact_approval_request_required"
  | "binding_items_required"
  | "missing_required_binding_kind"
  | "invalid_reference_label"
  | "invalid_provider_scope_pair"
  | "previous_runtime_execution_exact_approval_request_item_stage_required"
  | "approval_verification_mode_must_remain_verification_only"
  | "runtime_execution_approval_must_not_happen_now"
  | "activation_execution_mode_must_remain_not_executed"
  | "provider_binding_mode_must_remain_disabled"
  | "provider_runtime_mode_must_remain_disabled"
  | "live_call_mode_must_remain_disabled"
  | "payment_runtime_mode_must_remain_disabled"
  | "payout_runtime_mode_must_remain_disabled"
  | "wallet_mutation_mode_must_remain_disabled"
  | "runtime_cutover_mode_must_remain_disabled"
  | "rollback_plan_required"
  | "execution_runbook_required"
  | "audit_trail_required"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationBlocked200Y = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_EXEC_EXACT_APPROVAL_VERIFICATION_200Y_VERSION;
  status: "runtime_execution_exact_approval_verification_blocked_without_execution";
  code: StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationBlockedCode200Y;
  blockedReason: string;
  runtimeExecutionExactApprovalVerificationPrepared: false;
  liveActivationRuntimeExecutionApprovedNow: false;
  liveActivationRuntimeExecutionPerformedNow: false;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationSafety200Y;
}>;

export type StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationEnvelope200Y = Readonly<{
  contract: "stream.gift.live_activation.runtime_execution_exact_approval_verification.v1";
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_EXEC_EXACT_APPROVAL_VERIFICATION_200Y_VERSION;
  previousStageRequired: "200X_runtime_execution_exact_approval_request_clean";
  requiredBindingKinds: readonly StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationKind200Y[];
  verifiedBindingKinds: readonly StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationKind200Y[];
  referenceLabelCount: number;
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsProviderSeparated: true;
  airwallexMerchantRailsProviderSeparated: true;
  runtimeExecutionExactApprovalVerificationPrepared: true;
  runtimeExecutionExactApprovalVerificationOnlyNoExecution: true;
  liveActivationRuntimeExecutionApprovedNow: false;
  liveActivationRuntimeExecutionPerformedNow: false;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  realtimeEmitExecuted: false;
  rawSecretsIncluded: false;
  envFileRead: false;
  envValueRead: false;
  fakeSuccessWritten: false;
  runtimeCutoverDisabled: boolean;
  rollbackReady: boolean;
  executionRunbookReady: boolean;
  auditTrailReady: boolean;
  futureRuntimeExecutionExactFinalHandoffRequiresNewExactOwnerApproval: true;
  nextStage: "200Z_live_activation_runtime_execution_exact_final_handoff";
}>;

export type StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationPrepared200Y = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_EXEC_EXACT_APPROVAL_VERIFICATION_200Y_VERSION;
  status: "runtime_execution_exact_approval_verification_prepared_without_execution";
  envelope: StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationEnvelope200Y;
  runtimeExecutionExactApprovalVerificationPrepared: true;
  liveActivationRuntimeExecutionApprovedNow: false;
  liveActivationRuntimeExecutionPerformedNow: false;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationSafety200Y;
}>;

export type StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationResult200Y =
  | StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationPrepared200Y
  | StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationBlocked200Y;

export type StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationReadiness200Y = Readonly<{
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_EXEC_EXACT_APPROVAL_VERIFICATION_200Y_VERSION;
  status: "ready_for_runtime_execution_exact_approval_verification_without_execution";
  previousStageRequired: "200X_runtime_execution_exact_approval_request_clean";
  backendReadinessPercent: 100;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  nextStage: "200Z_live_activation_runtime_execution_exact_final_handoff";
  safety: StreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationSafety200Y;
}>;
