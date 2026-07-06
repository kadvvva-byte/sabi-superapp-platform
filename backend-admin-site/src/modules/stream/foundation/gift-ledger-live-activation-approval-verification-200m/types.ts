export const STREAM_GIFT_LEDGER_SEPARATE_EXACT_LIVE_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_VERIFICATION_200M_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-200M" as const;

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationKind200M =
  | "accept_payments_provider"
  | "creator_payout_provider"
  | "google_billing_diamonds_provider"
  | "airwallex_merchant_rails_provider";

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationProviderName200M =
  | "google_billing"
  | "airwallex"
  | "wallet"
  | "bank"
  | "manual_review"
  | "other";

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationConfigScope200M =
  | "accept_payments"
  | "creator_payout"
  | "diamonds_topup"
  | "merchant_rails"
  | "manual_review";

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationItem200M = Readonly<{
  bindingKind: StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationKind200M;
  providerName: StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationProviderName200M;
  configReferenceLabel: string;
  configScope: StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationConfigScope200M;
  ownerAttestation: "server_side_config_exists" | "pending_owner_fill";
  previousApprovalRequestStage: "200L_separate_exact_live_provider_binding_activation_execution_approval_request_prepared" | "pending_owner_fill";
  approvalVerificationIntent: "verify_separate_exact_owner_approval_request_for_future_live_activation_execution" | "pending_owner_fill";
  approvalVerificationMode: "separate_exact_owner_approval_verification_only_no_activation_execution" | "pending_owner_fill";
  providerBindingMode: "disabled_until_future_execution_package" | "pending_owner_fill";
  liveCallMode: "disabled_no_provider_call" | "pending_owner_fill";
  paymentRuntimeMode: "disabled_no_payment_capture" | "pending_owner_fill";
  payoutRuntimeMode: "disabled_no_payout_execution" | "pending_owner_fill";
  walletMutationMode: "disabled_no_wallet_mutation" | "pending_owner_fill";
  runtimeCutoverMode: "disabled_until_future_execution_package" | "pending_owner_fill";
  rollbackPlan: "ready" | "pending_owner_fill";
  adminComplianceGate: "ready_for_approval_verification" | "pending_owner_fill";
  auditEnvelopeMode: "approval_verification_audit_only_no_runtime_write" | "pending_owner_fill";
  operatorVerificationChecklist: "complete" | "pending_owner_fill";
}>;

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationSafety200M = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderResponseAccepted: false;
  previous200LApprovalRequestAlreadyPrepared: true;
  separateExactApprovalVerificationOnly: true;
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
  requiresSeparateExactOwnerApprovalBeforeAnyExecution: true;
  referenceLabelsOnly: true;
}>;

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationInput200M = Readonly<{
  ownerApproval?: string;
  verificationMode?: "separate_exact_live_provider_binding_activation_execution_approval_verification" | "disabled";
  acknowledgedApprovalRequestStage?: "200L_separate_exact_live_provider_binding_activation_execution_approval_request_prepared" | "disabled";
  bindingItems: readonly StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationItem200M[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationBlockedCode200M =
  | "owner_approval_required"
  | "verification_mode_disabled"
  | "previous_approval_request_stage_required"
  | "binding_items_required"
  | "missing_required_binding_kind"
  | "invalid_reference_label"
  | "invalid_provider_scope_pair"
  | "owner_attestation_required"
  | "previous_approval_request_item_stage_required"
  | "approval_verification_intent_required"
  | "approval_verification_mode_must_remain_verification_only"
  | "provider_binding_mode_must_remain_disabled"
  | "live_call_mode_must_remain_disabled"
  | "payment_runtime_mode_must_remain_disabled"
  | "payout_runtime_mode_must_remain_disabled"
  | "wallet_mutation_mode_must_remain_disabled"
  | "runtime_cutover_mode_must_remain_disabled"
  | "rollback_plan_required"
  | "admin_compliance_gate_required"
  | "audit_envelope_mode_required"
  | "operator_verification_checklist_required"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationBlocked200M = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_SEPARATE_EXACT_LIVE_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_VERIFICATION_200M_VERSION;
  status: "separate_exact_live_provider_binding_activation_execution_approval_verification_blocked_without_activation";
  code: StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationBlockedCode200M;
  blockedReason: string;
  approvalVerificationPrepared: false;
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
  safety: StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationSafety200M;
}>;

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationEnvelope200M = Readonly<{
  contract: "stream.gift.separate_exact_live_provider_binding.activation_execution_approval_verification.v1";
  version: typeof STREAM_GIFT_LEDGER_SEPARATE_EXACT_LIVE_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_VERIFICATION_200M_VERSION;
  previousStageRequired: "200L_separate_exact_live_provider_binding_activation_execution_approval_request_prepared";
  requiredBindingKinds: readonly StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationKind200M[];
  verifiedBindingKinds: readonly StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationKind200M[];
  referenceLabelCount: number;
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsProviderSeparated: true;
  airwallexMerchantRailsProviderSeparated: true;
  separateExactApprovalVerificationPrepared: true;
  approvalVerificationOnlyNoExecution: true;
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
  adminComplianceReady: boolean;
  auditEnvelopeReady: boolean;
  operatorVerificationChecklistComplete: boolean;
  requiresSeparateExactOwnerApprovalBeforeAnyExecution: true;
  nextStage: "200N_separate_exact_live_provider_binding_activation_execution_final_handoff";
}>;

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationPrepared200M = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_SEPARATE_EXACT_LIVE_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_VERIFICATION_200M_VERSION;
  status: "separate_exact_live_provider_binding_activation_execution_approval_verification_prepared_without_activation";
  envelope: StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationEnvelope200M;
  approvalVerificationPrepared: true;
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
  safety: StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationSafety200M;
}>;

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationResult200M =
  | StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationPrepared200M
  | StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationBlocked200M;

export type StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationReadiness200M = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_SEPARATE_EXACT_LIVE_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_VERIFICATION_200M_VERSION;
  status: "ready_for_separate_exact_live_provider_binding_activation_execution_approval_verification";
  previousStageRequired: "200L_separate_exact_live_provider_binding_activation_execution_approval_request_prepared";
  backendReadinessPercent: 100;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  nextStage: "200N_separate_exact_live_provider_binding_activation_execution_final_handoff";
  safety: StreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationSafety200M;
}>;
