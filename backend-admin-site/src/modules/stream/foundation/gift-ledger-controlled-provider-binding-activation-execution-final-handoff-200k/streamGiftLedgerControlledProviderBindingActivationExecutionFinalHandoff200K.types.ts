export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_HANDOFF_200K_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-200K" as const;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffKind200K =
  | "accept_payments_provider"
  | "creator_payout_provider"
  | "google_billing_diamonds_provider"
  | "airwallex_merchant_rails_provider";

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffProviderName200K = "google_billing" | "airwallex" | "wallet" | "bank" | "manual_review" | "other";
export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffConfigScope200K = "accept_payments" | "creator_payout" | "diamonds_topup" | "merchant_rails" | "manual_review";

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffItem200K = Readonly<{
  bindingKind: StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffKind200K;
  providerName: StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffProviderName200K;
  configReferenceLabel: string;
  configScope: StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffConfigScope200K;
  ownerAttestation: "server_side_config_exists" | "pending_owner_fill";
  previousFinalGateStage: "200J_controlled_provider_binding_activation_execution_final_gate_prepared" | "pending_owner_fill";
  finalHandoffIntent: "close_safe_disabled_handoff_without_runtime_activation" | "pending_owner_fill";
  finalHandoffMode: "final_handoff_only_no_activation_execution" | "pending_owner_fill";
  providerBindingMode: "disabled_until_separate_live_activation" | "pending_owner_fill";
  liveCallMode: "disabled_no_provider_call" | "pending_owner_fill";
  paymentRuntimeMode: "disabled_no_payment_capture" | "pending_owner_fill";
  payoutRuntimeMode: "disabled_no_payout_execution" | "pending_owner_fill";
  walletMutationMode: "disabled_no_wallet_mutation" | "pending_owner_fill";
  runtimeCutoverMode: "disabled_until_separate_exact_activation_execution" | "pending_owner_fill";
  rollbackPlan: "ready" | "pending_owner_fill";
  adminComplianceGate: "ready_for_final_handoff" | "pending_owner_fill";
  auditEnvelopeMode: "final_handoff_audit_only_no_runtime_write" | "pending_owner_fill";
  operatorFinalHandoffChecklist: "complete" | "pending_owner_fill";
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffSafety200K = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderResponseAccepted: false;
  previous200JFinalGateAlreadyPrepared: true;
  activationExecutionFinalHandoffOnly: true;
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
  requiresSeparateExactLiveActivationExecutionApproval: true;
  referenceLabelsOnly: true;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffInput200K = Readonly<{
  ownerApproval?: string;
  finalHandoffMode?: "controlled_provider_binding_activation_execution_final_handoff_request" | "disabled";
  acknowledgedFinalGateStage?: "200J_controlled_provider_binding_activation_execution_final_gate_prepared" | "disabled";
  bindingItems: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffItem200K[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffBlockedCode200K =
  | "owner_approval_required"
  | "final_handoff_mode_disabled"
  | "previous_final_gate_stage_required"
  | "binding_items_required"
  | "missing_required_binding_kind"
  | "invalid_reference_label"
  | "invalid_provider_scope_pair"
  | "owner_attestation_required"
  | "previous_final_gate_item_stage_required"
  | "final_handoff_intent_required"
  | "final_handoff_mode_must_remain_handoff_only"
  | "provider_binding_mode_must_remain_disabled"
  | "live_call_mode_must_remain_disabled"
  | "payment_runtime_mode_must_remain_disabled"
  | "payout_runtime_mode_must_remain_disabled"
  | "wallet_mutation_mode_must_remain_disabled"
  | "runtime_cutover_mode_must_remain_disabled"
  | "rollback_plan_required"
  | "admin_compliance_gate_required"
  | "audit_envelope_mode_required"
  | "operator_final_handoff_checklist_required"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffBlocked200K = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_HANDOFF_200K_VERSION;
  status: "controlled_provider_binding_activation_execution_final_handoff_blocked_without_activation";
  code: StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffBlockedCode200K;
  blockedReason: string;
  finalHandoffPrepared: false;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffSafety200K;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffEnvelope200K = Readonly<{
  contract: "stream.gift.controlled_provider_binding.activation_execution_final_handoff.v1";
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_HANDOFF_200K_VERSION;
  previousStageRequired: "200J_controlled_provider_binding_activation_execution_final_gate_prepared";
  requiredBindingKinds: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffKind200K[];
  finalHandoffBindingKinds: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffKind200K[];
  referenceLabelCount: number;
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsProviderSeparated: true;
  airwallexMerchantRailsProviderSeparated: true;
  controlledActivationExecutionFinalHandoffPrepared: true;
  activationExecutionFinalHandoffOnly: true;
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
  operatorFinalHandoffChecklistComplete: boolean;
  requiresSeparateExactLiveActivationExecutionApproval: true;
  nextStage: "separate_exact_live_provider_binding_activation_execution_approval_required";
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffPrepared200K = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_HANDOFF_200K_VERSION;
  status: "controlled_provider_binding_activation_execution_final_handoff_prepared_without_activation";
  envelope: StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffEnvelope200K;
  finalHandoffPrepared: true;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffSafety200K;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffResult200K =
  | StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffPrepared200K
  | StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffBlocked200K;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffReadiness200K = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_HANDOFF_200K_VERSION;
  status: "ready_for_controlled_provider_binding_activation_execution_final_handoff";
  previousStageRequired: "200J_controlled_provider_binding_activation_execution_final_gate_prepared";
  backendReadinessPercent: 100;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  nextStage: "separate_exact_live_provider_binding_activation_execution_approval_required";
  safety: StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffSafety200K;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionLiveActivationNextRequest200K = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_HANDOFF_200K_VERSION;
  status: "separate_exact_live_provider_binding_activation_execution_requires_owner_approval";
  nextStage: "separate_exact_live_provider_binding_activation_execution_approval_required";
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  forbiddenUntilSeparateExactLiveActivation: readonly string[];
}>;
