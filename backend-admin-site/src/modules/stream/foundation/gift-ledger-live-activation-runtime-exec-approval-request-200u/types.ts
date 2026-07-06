export const STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_EXEC_APPROVAL_REQUEST_200U_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-200U" as const;

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestKind200U =
  | "accept_payments_provider"
  | "creator_payout_provider"
  | "google_billing_diamonds_provider"
  | "airwallex_merchant_rails_provider";

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestProviderName200U =
  | "google_billing"
  | "airwallex"
  | "wallet"
  | "bank"
  | "manual_review"
  | "other";

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestConfigScope200U =
  | "accept_payments"
  | "creator_payout"
  | "diamonds_topup"
  | "merchant_rails"
  | "manual_review";

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestItem200U = Readonly<{
  bindingKind: StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestKind200U;
  providerName: StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestProviderName200U;
  configReferenceLabel: string;
  configScope: StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestConfigScope200U;
  previousRuntimeFinalHandoffStage: "200T_runtime_final_handoff_clean" | "pending_owner_fill";
  approvalRequestMode: "runtime_execution_approval_request_only_no_execution" | "pending_owner_fill";
  runtimeExecutionApprovalMode: "not_approved_now_requires_future_exact_owner_approval" | "pending_owner_fill";
  liveActivationExecutionMode: "not_executed_request_only" | "pending_owner_fill";
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

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestSafety200U = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderResponseAccepted: false;
  previous200TRuntimeFinalHandoffClean: true;
  runtimeExecutionApprovalRequestOnly: true;
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
  futureRuntimeExecutionApprovalVerificationRequiresNewExactOwnerApproval: true;
  referenceLabelsOnly: true;
}>;

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestInput200U = Readonly<{
  ownerApproval?: string;
  runtimeExecutionApprovalRequestMode?: "approval_request_only" | "disabled";
  acknowledgedRuntimeFinalHandoffStage?: "200T_runtime_final_handoff_clean" | "disabled";
  bindingItems: readonly StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestItem200U[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestBlockedCode200U =
  | "owner_approval_required"
  | "runtime_execution_approval_request_mode_disabled"
  | "previous_200t_runtime_final_handoff_required"
  | "binding_items_required"
  | "missing_required_binding_kind"
  | "invalid_reference_label"
  | "invalid_provider_scope_pair"
  | "previous_runtime_final_handoff_item_stage_required"
  | "approval_request_mode_must_remain_request_only"
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

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestBlocked200U = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_EXEC_APPROVAL_REQUEST_200U_VERSION;
  status: "runtime_execution_approval_request_blocked_without_execution";
  code: StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestBlockedCode200U;
  blockedReason: string;
  runtimeExecutionApprovalRequestPrepared: false;
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
  safety: StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestSafety200U;
}>;

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestEnvelope200U = Readonly<{
  contract: "stream.gift.live_activation.runtime_execution_approval_request.v1";
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_EXEC_APPROVAL_REQUEST_200U_VERSION;
  previousStageRequired: "200T_runtime_final_handoff_clean";
  requiredBindingKinds: readonly StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestKind200U[];
  verifiedBindingKinds: readonly StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestKind200U[];
  referenceLabelCount: number;
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsProviderSeparated: true;
  airwallexMerchantRailsProviderSeparated: true;
  runtimeExecutionApprovalRequestPrepared: true;
  runtimeExecutionApprovalRequestOnlyNoExecution: true;
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
  futureRuntimeExecutionApprovalVerificationRequiresNewExactOwnerApproval: true;
  nextStage: "200V_live_activation_runtime_execution_approval_verification";
}>;

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestPrepared200U = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_EXEC_APPROVAL_REQUEST_200U_VERSION;
  status: "runtime_execution_approval_request_prepared_without_execution";
  envelope: StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestEnvelope200U;
  runtimeExecutionApprovalRequestPrepared: true;
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
  safety: StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestSafety200U;
}>;

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestResult200U =
  | StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestPrepared200U
  | StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestBlocked200U;

export type StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestReadiness200U = Readonly<{
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_EXEC_APPROVAL_REQUEST_200U_VERSION;
  status: "ready_for_runtime_execution_approval_request_without_execution";
  previousStageRequired: "200T_runtime_final_handoff_clean";
  backendReadinessPercent: 100;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  nextStage: "200V_live_activation_runtime_execution_approval_verification";
  safety: StreamGiftLedgerLiveActivationRuntimeExecApprovalRequestSafety200U;
}>;
