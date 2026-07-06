export const STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_REQUEST_200R_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-200R" as const;

export type StreamGiftLedgerLiveActivationRuntimeApprovalRequestKind200R =
  | "accept_payments_provider"
  | "creator_payout_provider"
  | "google_billing_diamonds_provider"
  | "airwallex_merchant_rails_provider";

export type StreamGiftLedgerLiveActivationRuntimeApprovalRequestProviderName200R =
  | "google_billing"
  | "airwallex"
  | "wallet"
  | "bank"
  | "manual_review"
  | "other";

export type StreamGiftLedgerLiveActivationRuntimeApprovalRequestConfigScope200R =
  | "accept_payments"
  | "creator_payout"
  | "diamonds_topup"
  | "merchant_rails"
  | "manual_review";

export type StreamGiftLedgerLiveActivationRuntimeApprovalRequestItem200R = Readonly<{
  bindingKind: StreamGiftLedgerLiveActivationRuntimeApprovalRequestKind200R;
  providerName: StreamGiftLedgerLiveActivationRuntimeApprovalRequestProviderName200R;
  configReferenceLabel: string;
  configScope: StreamGiftLedgerLiveActivationRuntimeApprovalRequestConfigScope200R;
  previousFinalGateStage: "200Q_final_gate_clean" | "pending_owner_fill";
  runtimePackageRequestMode: "request_only_no_execution" | "pending_owner_fill";
  exactOwnerApprovalRequired: "required_before_runtime_package_execution" | "pending_owner_fill";
  activationExecutionMode: "not_executed_request_only" | "pending_owner_fill";
  providerBindingMode: "disabled_no_binding" | "pending_owner_fill";
  providerRuntimeMode: "disabled_no_runtime_enablement" | "pending_owner_fill";
  liveCallMode: "disabled_no_provider_call" | "pending_owner_fill";
  paymentRuntimeMode: "disabled_no_payment_capture" | "pending_owner_fill";
  payoutRuntimeMode: "disabled_no_payout_execution" | "pending_owner_fill";
  walletMutationMode: "disabled_no_wallet_mutation" | "pending_owner_fill";
  runtimeCutoverMode: "disabled_no_cutover" | "pending_owner_fill";
  rollbackPlan: "ready" | "pending_owner_fill";
  auditFinalGateClosure: "complete" | "pending_owner_fill";
}>;

export type StreamGiftLedgerLiveActivationRuntimeApprovalRequestSafety200R = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderResponseAccepted: false;
  previous200QFinalGateClean: true;
  runtimePackageApprovalRequestOnly: true;
  liveActivationRuntimePackageApprovedNow: false;
  liveActivationExecutionApprovedNow: false;
  liveActivationExecutionPerformedNow: false;
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
  futureRuntimeVerificationRequiresSeparateExactOwnerApproval: true;
  referenceLabelsOnly: true;
}>;

export type StreamGiftLedgerLiveActivationRuntimeApprovalRequestInput200R = Readonly<{
  ownerApproval?: string;
  runtimeApprovalRequestMode?: "request_only" | "disabled";
  acknowledgedFinalGateStage?: "200Q_final_gate_clean" | "disabled";
  bindingItems: readonly StreamGiftLedgerLiveActivationRuntimeApprovalRequestItem200R[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerLiveActivationRuntimeApprovalRequestBlockedCode200R =
  | "owner_approval_required"
  | "runtime_approval_request_mode_disabled"
  | "previous_200q_final_gate_required"
  | "binding_items_required"
  | "missing_required_binding_kind"
  | "invalid_reference_label"
  | "invalid_provider_scope_pair"
  | "previous_final_gate_item_stage_required"
  | "runtime_package_request_mode_must_remain_no_execution"
  | "exact_owner_approval_required_before_execution"
  | "activation_execution_mode_must_remain_not_executed"
  | "provider_binding_mode_must_remain_disabled"
  | "provider_runtime_mode_must_remain_disabled"
  | "live_call_mode_must_remain_disabled"
  | "payment_runtime_mode_must_remain_disabled"
  | "payout_runtime_mode_must_remain_disabled"
  | "wallet_mutation_mode_must_remain_disabled"
  | "runtime_cutover_mode_must_remain_disabled"
  | "rollback_plan_required"
  | "audit_final_gate_closure_required"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerLiveActivationRuntimeApprovalRequestBlocked200R = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_REQUEST_200R_VERSION;
  status: "runtime_approval_request_blocked_without_activation";
  code: StreamGiftLedgerLiveActivationRuntimeApprovalRequestBlockedCode200R;
  blockedReason: string;
  runtimeApprovalRequestPrepared: false;
  liveActivationRuntimePackageApprovedNow: false;
  liveActivationExecutionApprovedNow: false;
  liveActivationExecutionPerformedNow: false;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerLiveActivationRuntimeApprovalRequestSafety200R;
}>;

export type StreamGiftLedgerLiveActivationRuntimeApprovalRequestEnvelope200R = Readonly<{
  contract: "stream.gift.live_activation.runtime_approval_request.v1";
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_REQUEST_200R_VERSION;
  previousStageRequired: "200Q_final_gate_clean";
  requiredBindingKinds: readonly StreamGiftLedgerLiveActivationRuntimeApprovalRequestKind200R[];
  verifiedBindingKinds: readonly StreamGiftLedgerLiveActivationRuntimeApprovalRequestKind200R[];
  referenceLabelCount: number;
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsProviderSeparated: true;
  airwallexMerchantRailsProviderSeparated: true;
  runtimeApprovalRequestPrepared: true;
  runtimeApprovalRequestOnlyNoExecution: true;
  liveActivationRuntimePackageApprovedNow: false;
  liveActivationExecutionApprovedNow: false;
  liveActivationExecutionPerformedNow: false;
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
  auditFinalGateClosureComplete: boolean;
  futureRuntimeVerificationRequiresSeparateExactOwnerApproval: true;
  nextStage: "200S_live_activation_runtime_package_approval_verification";
}>;

export type StreamGiftLedgerLiveActivationRuntimeApprovalRequestPrepared200R = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_REQUEST_200R_VERSION;
  status: "runtime_approval_request_prepared_without_activation";
  envelope: StreamGiftLedgerLiveActivationRuntimeApprovalRequestEnvelope200R;
  runtimeApprovalRequestPrepared: true;
  liveActivationRuntimePackageApprovedNow: false;
  liveActivationExecutionApprovedNow: false;
  liveActivationExecutionPerformedNow: false;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerLiveActivationRuntimeApprovalRequestSafety200R;
}>;

export type StreamGiftLedgerLiveActivationRuntimeApprovalRequestResult200R =
  | StreamGiftLedgerLiveActivationRuntimeApprovalRequestPrepared200R
  | StreamGiftLedgerLiveActivationRuntimeApprovalRequestBlocked200R;

export type StreamGiftLedgerLiveActivationRuntimeApprovalRequestReadiness200R = Readonly<{
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_REQUEST_200R_VERSION;
  status: "ready_for_runtime_approval_request_without_activation";
  previousStageRequired: "200Q_final_gate_clean";
  backendReadinessPercent: 100;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  nextStage: "200S_live_activation_runtime_package_approval_verification";
  safety: StreamGiftLedgerLiveActivationRuntimeApprovalRequestSafety200R;
}>;
