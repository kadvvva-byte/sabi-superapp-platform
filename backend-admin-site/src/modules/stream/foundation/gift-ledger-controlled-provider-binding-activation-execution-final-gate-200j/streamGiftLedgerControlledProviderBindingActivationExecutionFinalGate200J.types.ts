export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-200J" as const;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateKind200J =
  | "accept_payments_provider"
  | "creator_payout_provider"
  | "google_billing_diamonds_provider"
  | "airwallex_merchant_rails_provider";

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateProviderName200J = "google_billing" | "airwallex" | "wallet" | "bank" | "manual_review" | "other";
export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateConfigScope200J = "accept_payments" | "creator_payout" | "diamonds_topup" | "merchant_rails" | "manual_review";

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateItem200J = Readonly<{
  bindingKind: StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateKind200J;
  providerName: StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateProviderName200J;
  configReferenceLabel: string;
  configScope: StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateConfigScope200J;
  ownerAttestation: "server_side_config_exists" | "pending_owner_fill";
  authorizationStage: "200I_controlled_provider_binding_activation_execution_authorization_prepared" | "pending_owner_fill";
  finalGateIntent: "open_final_gate_without_runtime_activation" | "pending_owner_fill";
  finalGateMode: "final_gate_only_no_activation_execution" | "pending_owner_fill";
  providerBindingMode: "disabled_until_separate_live_activation" | "pending_owner_fill";
  liveCallMode: "disabled_no_provider_call" | "pending_owner_fill";
  paymentRuntimeMode: "disabled_no_payment_capture" | "pending_owner_fill";
  payoutRuntimeMode: "disabled_no_payout_execution" | "pending_owner_fill";
  walletMutationMode: "disabled_no_wallet_mutation" | "pending_owner_fill";
  runtimeCutoverMode: "disabled_until_separate_exact_activation_execution" | "pending_owner_fill";
  rollbackPlan: "ready" | "pending_owner_fill";
  adminComplianceGate: "ready_for_final_gate_review" | "pending_owner_fill";
  auditEnvelopeMode: "final_gate_audit_only_no_runtime_write" | "pending_owner_fill";
  operatorFinalGateChecklist: "complete" | "pending_owner_fill";
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateSafety200J = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderResponseAccepted: false;
  previous200IAuthorizationAlreadyPrepared: true;
  activationExecutionFinalGateOnly: true;
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

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateInput200J = Readonly<{
  ownerApproval?: string;
  finalGateMode?: "controlled_provider_binding_activation_execution_final_gate_request" | "disabled";
  acknowledgedAuthorizationStage?: "200I_controlled_provider_binding_activation_execution_authorization_prepared" | "disabled";
  bindingItems: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateItem200J[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateBlockedCode200J =
  | "owner_approval_required"
  | "final_gate_mode_disabled"
  | "authorization_stage_required"
  | "binding_items_required"
  | "missing_required_binding_kind"
  | "invalid_reference_label"
  | "invalid_provider_scope_pair"
  | "owner_attestation_required"
  | "final_gate_intent_required"
  | "final_gate_mode_must_remain_gate_only"
  | "provider_binding_mode_must_remain_disabled"
  | "live_call_mode_must_remain_disabled"
  | "payment_runtime_mode_must_remain_disabled"
  | "payout_runtime_mode_must_remain_disabled"
  | "wallet_mutation_mode_must_remain_disabled"
  | "runtime_cutover_mode_must_remain_disabled"
  | "rollback_plan_required"
  | "admin_compliance_gate_required"
  | "audit_envelope_mode_required"
  | "operator_final_gate_checklist_required"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateBlocked200J = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_VERSION;
  status: "controlled_provider_binding_activation_execution_final_gate_blocked_without_activation";
  code: StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateBlockedCode200J;
  blockedReason: string;
  finalGatePrepared: false;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateSafety200J;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateEnvelope200J = Readonly<{
  contract: "stream.gift.controlled_provider_binding.activation_execution_final_gate.v1";
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_VERSION;
  previousStageRequired: "200I_controlled_provider_binding_activation_execution_authorization_prepared";
  requiredBindingKinds: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateKind200J[];
  finalGateBindingKinds: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateKind200J[];
  referenceLabelCount: number;
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsProviderSeparated: true;
  airwallexMerchantRailsProviderSeparated: true;
  controlledActivationExecutionFinalGatePrepared: true;
  activationExecutionFinalGateOnly: true;
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
  operatorFinalGateChecklistComplete: boolean;
  requiresSeparateExactLiveActivationExecutionApproval: true;
  nextStage: "200K_controlled_provider_binding_activation_execution_final_handoff";
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGatePrepared200J = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_VERSION;
  status: "controlled_provider_binding_activation_execution_final_gate_prepared_without_activation";
  envelope: StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateEnvelope200J;
  finalGatePrepared: true;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateSafety200J;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateResult200J =
  | StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGatePrepared200J
  | StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateBlocked200J;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateReadiness200J = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_VERSION;
  status: "ready_for_controlled_provider_binding_activation_execution_final_gate";
  previousStageRequired: "200I_controlled_provider_binding_activation_execution_authorization_prepared";
  backendReadinessPercent: 100;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  nextStage: "200K_controlled_provider_binding_activation_execution_final_handoff";
  safety: StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateSafety200J;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffNextRequest200J = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_VERSION;
  status: "next_stage_requires_controlled_provider_binding_activation_execution_final_handoff";
  nextStage: "200K_controlled_provider_binding_activation_execution_final_handoff";
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  forbiddenUntilSeparateExactLiveActivation: readonly string[];
}>;
