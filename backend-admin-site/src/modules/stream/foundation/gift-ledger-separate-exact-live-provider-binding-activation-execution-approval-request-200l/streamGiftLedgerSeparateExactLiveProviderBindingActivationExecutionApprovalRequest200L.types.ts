export const STREAM_GIFT_LEDGER_SEPARATE_EXACT_LIVE_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_REQUEST_200L_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-200L" as const;

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestKind200L =
  | "accept_payments_provider"
  | "creator_payout_provider"
  | "google_billing_diamonds_provider"
  | "airwallex_merchant_rails_provider";

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestProviderName200L =
  | "google_billing"
  | "airwallex"
  | "wallet"
  | "bank"
  | "manual_review"
  | "other";

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestConfigScope200L =
  | "accept_payments"
  | "creator_payout"
  | "diamonds_topup"
  | "merchant_rails"
  | "manual_review";

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestItem200L = Readonly<{
  bindingKind: StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestKind200L;
  providerName: StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestProviderName200L;
  configReferenceLabel: string;
  configScope: StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestConfigScope200L;
  ownerAttestation: "server_side_config_exists" | "pending_owner_fill";
  previousFinalHandoffStage: "200K_controlled_provider_binding_activation_execution_final_handoff_completed" | "pending_owner_fill";
  liveActivationApprovalRequestIntent: "request_separate_exact_owner_approval_for_future_live_activation_execution" | "pending_owner_fill";
  approvalRequestMode: "separate_exact_owner_approval_request_only_no_activation_execution" | "pending_owner_fill";
  providerBindingMode: "disabled_until_owner_approves_execution" | "pending_owner_fill";
  liveCallMode: "disabled_no_provider_call" | "pending_owner_fill";
  paymentRuntimeMode: "disabled_no_payment_capture" | "pending_owner_fill";
  payoutRuntimeMode: "disabled_no_payout_execution" | "pending_owner_fill";
  walletMutationMode: "disabled_no_wallet_mutation" | "pending_owner_fill";
  runtimeCutoverMode: "disabled_until_future_execution_package" | "pending_owner_fill";
  rollbackPlan: "ready" | "pending_owner_fill";
  adminComplianceGate: "ready_for_owner_approval_request" | "pending_owner_fill";
  auditEnvelopeMode: "approval_request_audit_only_no_runtime_write" | "pending_owner_fill";
  operatorApprovalRequestChecklist: "complete" | "pending_owner_fill";
}>;

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestSafety200L = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderResponseAccepted: false;
  previous200KFinalHandoffAlreadyCompleted: true;
  separateExactApprovalRequestOnly: true;
  liveActivationExecutionApprovedNow: false;
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
  requiresSeparateExactOwnerApprovalBeforeAnyExecution: true;
  referenceLabelsOnly: true;
}>;

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestInput200L = Readonly<{
  ownerApproval?: string;
  approvalRequestMode?: "separate_exact_live_provider_binding_activation_execution_approval_request" | "disabled";
  acknowledgedFinalHandoffStage?: "200K_controlled_provider_binding_activation_execution_final_handoff_completed" | "disabled";
  bindingItems: readonly StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestItem200L[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestBlockedCode200L =
  | "owner_approval_required"
  | "approval_request_mode_disabled"
  | "previous_final_handoff_stage_required"
  | "binding_items_required"
  | "missing_required_binding_kind"
  | "invalid_reference_label"
  | "invalid_provider_scope_pair"
  | "owner_attestation_required"
  | "previous_final_handoff_item_stage_required"
  | "approval_request_intent_required"
  | "approval_request_mode_must_remain_request_only"
  | "provider_binding_mode_must_remain_disabled"
  | "live_call_mode_must_remain_disabled"
  | "payment_runtime_mode_must_remain_disabled"
  | "payout_runtime_mode_must_remain_disabled"
  | "wallet_mutation_mode_must_remain_disabled"
  | "runtime_cutover_mode_must_remain_disabled"
  | "rollback_plan_required"
  | "admin_compliance_gate_required"
  | "audit_envelope_mode_required"
  | "operator_approval_request_checklist_required"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestBlocked200L = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_SEPARATE_EXACT_LIVE_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_REQUEST_200L_VERSION;
  status: "separate_exact_live_provider_binding_activation_execution_approval_request_blocked_without_activation";
  code: StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestBlockedCode200L;
  blockedReason: string;
  approvalRequestPrepared: false;
  liveActivationExecutionApprovedNow: false;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestSafety200L;
}>;

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestEnvelope200L = Readonly<{
  contract: "stream.gift.separate_exact_live_provider_binding.activation_execution_approval_request.v1";
  version: typeof STREAM_GIFT_LEDGER_SEPARATE_EXACT_LIVE_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_REQUEST_200L_VERSION;
  previousStageRequired: "200K_controlled_provider_binding_activation_execution_final_handoff_completed";
  requiredBindingKinds: readonly StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestKind200L[];
  approvalRequestBindingKinds: readonly StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestKind200L[];
  referenceLabelCount: number;
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsProviderSeparated: true;
  airwallexMerchantRailsProviderSeparated: true;
  separateExactApprovalRequestPrepared: true;
  approvalRequestOnlyNoExecution: true;
  liveActivationExecutionApprovedNow: false;
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
  adminComplianceReady: boolean;
  auditEnvelopeReady: boolean;
  operatorApprovalRequestChecklistComplete: boolean;
  requiresSeparateExactOwnerApprovalBeforeAnyExecution: true;
  nextStage: "200M_separate_exact_live_provider_binding_activation_execution_approval_verification";
}>;

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestPrepared200L = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_SEPARATE_EXACT_LIVE_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_REQUEST_200L_VERSION;
  status: "separate_exact_live_provider_binding_activation_execution_approval_request_prepared_without_activation";
  envelope: StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestEnvelope200L;
  approvalRequestPrepared: true;
  liveActivationExecutionApprovedNow: false;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestSafety200L;
}>;

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestResult200L =
  | StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestPrepared200L
  | StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestBlocked200L;

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestReadiness200L = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_SEPARATE_EXACT_LIVE_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_REQUEST_200L_VERSION;
  status: "ready_for_separate_exact_live_provider_binding_activation_execution_approval_request";
  previousStageRequired: "200K_controlled_provider_binding_activation_execution_final_handoff_completed";
  backendReadinessPercent: 100;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  nextStage: "200M_separate_exact_live_provider_binding_activation_execution_approval_verification";
  safety: StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestSafety200L;
}>;

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationNextRequest200L = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_SEPARATE_EXACT_LIVE_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_REQUEST_200L_VERSION;
  status: "separate_exact_live_provider_binding_activation_execution_approval_verification_requires_owner_approval";
  nextStage: "200M_separate_exact_live_provider_binding_activation_execution_approval_verification";
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  requiredOwnerApprovalPhrase: "STREAM_GIFT_LEDGER_200M_SEPARATE_EXACT_LIVE_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_VERIFICATION_APPROVED";
  blockedReason: "200L only prepares the separate exact approval request. 200M must verify exact owner approval before any later execution package.";
  safety: StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestSafety200L;
}>;
