export const STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_EXEC_APPROVAL_VERIFICATION_200V_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-200V" as const;

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationKind200V =
  | "accept_payments_provider"
  | "creator_payout_provider"
  | "google_billing_diamonds_provider"
  | "airwallex_merchant_rails_provider";

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationProviderName200V =
  | "google_billing"
  | "airwallex"
  | "wallet"
  | "bank"
  | "manual_review"
  | "other";

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationConfigScope200V =
  | "accept_payments"
  | "creator_payout"
  | "diamonds_topup"
  | "merchant_rails"
  | "manual_review";

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationItem200V = Readonly<{
  bindingKind: StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationKind200V;
  providerName: StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationProviderName200V;
  configReferenceLabel: string;
  configScope: StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationConfigScope200V;
  previousRuntimeExecutionApprovalRequestStage: "200U_runtime_execution_approval_request_clean" | "pending_owner_fill";
  approvalVerificationMode: "runtime_execution_approval_verification_only_no_execution" | "pending_owner_fill";
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

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationSafety200V = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderResponseAccepted: false;
  previous200URuntimeExecutionApprovalRequestClean: true;
  runtimeExecutionApprovalVerificationOnly: true;
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
  futureRuntimeExecutionFinalHandoffRequiresNewExactOwnerApproval: true;
  referenceLabelsOnly: true;
}>;

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationInput200V = Readonly<{
  ownerApproval?: string;
  runtimeExecutionApprovalVerificationMode?: "approval_verification_only" | "disabled";
  acknowledgedRuntimeExecutionApprovalRequestStage?: "200U_runtime_execution_approval_request_clean" | "disabled";
  bindingItems: readonly StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationItem200V[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationBlockedCode200V =
  | "owner_approval_required"
  | "runtime_execution_approval_verification_mode_disabled"
  | "previous_200u_runtime_execution_approval_request_required"
  | "binding_items_required"
  | "missing_required_binding_kind"
  | "invalid_reference_label"
  | "invalid_provider_scope_pair"
  | "previous_runtime_execution_approval_request_item_stage_required"
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

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationBlocked200V = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_EXEC_APPROVAL_VERIFICATION_200V_VERSION;
  status: "runtime_execution_approval_verification_blocked_without_execution";
  code: StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationBlockedCode200V;
  blockedReason: string;
  runtimeExecutionApprovalVerificationPrepared: false;
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
  safety: StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationSafety200V;
}>;

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationEnvelope200V = Readonly<{
  contract: "stream.gift.live_activation.runtime_execution_approval_verification.v1";
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_EXEC_APPROVAL_VERIFICATION_200V_VERSION;
  previousStageRequired: "200U_runtime_execution_approval_request_clean";
  requiredBindingKinds: readonly StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationKind200V[];
  verifiedBindingKinds: readonly StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationKind200V[];
  referenceLabelCount: number;
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsProviderSeparated: true;
  airwallexMerchantRailsProviderSeparated: true;
  runtimeExecutionApprovalVerificationPrepared: true;
  runtimeExecutionApprovalVerificationOnlyNoExecution: true;
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
  futureRuntimeExecutionFinalHandoffRequiresNewExactOwnerApproval: true;
  nextStage: "200W_live_activation_runtime_execution_final_handoff";
}>;

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationPrepared200V = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_EXEC_APPROVAL_VERIFICATION_200V_VERSION;
  status: "runtime_execution_approval_verification_prepared_without_execution";
  envelope: StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationEnvelope200V;
  runtimeExecutionApprovalVerificationPrepared: true;
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
  safety: StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationSafety200V;
}>;

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationResult200V =
  | StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationPrepared200V
  | StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationBlocked200V;

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationReadiness200V = Readonly<{
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_EXEC_APPROVAL_VERIFICATION_200V_VERSION;
  status: "ready_for_runtime_execution_approval_verification_without_execution";
  previousStageRequired: "200U_runtime_execution_approval_request_clean";
  backendReadinessPercent: 100;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  nextStage: "200W_live_activation_runtime_execution_final_handoff";
  safety: StreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationSafety200V;
}>;
