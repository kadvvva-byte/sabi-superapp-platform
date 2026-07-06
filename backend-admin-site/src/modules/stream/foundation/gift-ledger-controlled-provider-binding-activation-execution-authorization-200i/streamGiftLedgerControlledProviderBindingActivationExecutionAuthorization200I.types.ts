export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-200I" as const;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationKind200I =
  | "accept_payments_provider"
  | "creator_payout_provider"
  | "google_billing_diamonds_provider"
  | "airwallex_merchant_rails_provider";

export type StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationProviderName200I = "google_billing" | "airwallex" | "wallet" | "bank" | "manual_review" | "other";

export type StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationConfigScope200I = "accept_payments" | "creator_payout" | "diamonds_topup" | "merchant_rails" | "manual_review";

export type StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationItem200I = Readonly<{
  bindingKind: StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationKind200I;
  providerName: StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationProviderName200I;
  configReferenceLabel: string;
  configScope: StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationConfigScope200I;
  ownerAttestation: "server_side_config_exists" | "pending_owner_fill";
  preflightStage: "200H_controlled_provider_binding_activation_execution_preflight_prepared" | "pending_owner_fill";
  activationExecutionAuthorizationIntent: "authorize_controlled_activation_execution_without_live_call" | "pending_owner_fill";
  activationExecutionAuthorizationMode: "authorization_only_no_activation_execution" | "pending_owner_fill";
  providerBindingMode: "disabled_until_separate_activation_execution" | "pending_owner_fill";
  liveCallMode: "disabled_no_provider_call" | "pending_owner_fill";
  paymentRuntimeMode: "disabled_no_payment_capture" | "pending_owner_fill";
  payoutRuntimeMode: "disabled_no_payout_execution" | "pending_owner_fill";
  walletMutationMode: "disabled_no_wallet_mutation" | "pending_owner_fill";
  runtimeCutoverMode: "disabled_until_200j_final_execution_gate" | "pending_owner_fill";
  rollbackPlan: "ready" | "pending_owner_fill";
  adminComplianceGate: "ready_for_activation_execution_authorization_review" | "pending_owner_fill";
  auditEnvelopeMode: "authorization_audit_only_no_runtime_write" | "pending_owner_fill";
  operatorAuthorizationChecklist: "complete" | "pending_owner_fill";
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationSafety200I = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderResponseAccepted: false;
  previous200HExecutionPreflightAlreadyPrepared: true;
  activationExecutionAuthorizationOnly: true;
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
  requiresSeparate200JControlledActivationExecutionFinalGate: true;
  referenceLabelsOnly: true;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationInput200I = Readonly<{
  ownerApproval?: string;
  authorizationMode?: "controlled_provider_binding_activation_execution_authorization_request" | "disabled";
  acknowledgedPreflightStage?: "200H_controlled_provider_binding_activation_execution_preflight_prepared" | "disabled";
  bindingItems: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationItem200I[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationBlockedCode200I =
  | "owner_approval_required"
  | "authorization_mode_disabled"
  | "preflight_stage_required"
  | "binding_items_required"
  | "missing_required_binding_kind"
  | "invalid_reference_label"
  | "invalid_provider_scope_pair"
  | "owner_attestation_required"
  | "activation_execution_authorization_intent_required"
  | "activation_execution_authorization_mode_must_remain_authorization_only"
  | "provider_binding_mode_must_remain_disabled"
  | "live_call_mode_must_remain_disabled"
  | "payment_runtime_mode_must_remain_disabled"
  | "payout_runtime_mode_must_remain_disabled"
  | "wallet_mutation_mode_must_remain_disabled"
  | "runtime_cutover_mode_must_remain_disabled"
  | "rollback_plan_required"
  | "admin_compliance_gate_required"
  | "audit_envelope_mode_required"
  | "operator_authorization_checklist_required"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationBlocked200I = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_VERSION;
  status: "controlled_provider_binding_activation_execution_authorization_blocked_without_activation";
  code: StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationBlockedCode200I;
  blockedReason: string;
  activationExecutionAuthorizationPrepared: false;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationSafety200I;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationEnvelope200I = Readonly<{
  contract: "stream.gift.controlled_provider_binding.activation_execution_authorization.v1";
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_VERSION;
  previousStageRequired: "200H_controlled_provider_binding_activation_execution_preflight_prepared";
  requiredBindingKinds: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationKind200I[];
  authorizedBindingKinds: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationKind200I[];
  referenceLabelCount: number;
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsProviderSeparated: true;
  airwallexMerchantRailsProviderSeparated: true;
  controlledActivationExecutionAuthorizationPrepared: true;
  activationExecutionAuthorizationOnly: true;
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
  operatorAuthorizationChecklistComplete: boolean;
  nextStage: "200J_controlled_provider_binding_activation_execution_final_gate";
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationPrepared200I = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_VERSION;
  status: "controlled_provider_binding_activation_execution_authorization_prepared_without_activation";
  envelope: StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationEnvelope200I;
  activationExecutionAuthorizationPrepared: true;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationSafety200I;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationResult200I =
  | StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationPrepared200I
  | StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationBlocked200I;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationReadiness200I = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_VERSION;
  status: "ready_for_controlled_provider_binding_activation_execution_authorization";
  previousStageRequired: "200H_controlled_provider_binding_activation_execution_preflight_prepared";
  backendReadinessPercent: 100;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  nextStage: "200J_controlled_provider_binding_activation_execution_final_gate";
  safety: StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationSafety200I;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateNextRequest200I = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_VERSION;
  status: "next_stage_requires_controlled_provider_binding_activation_execution_final_gate";
  nextStage: "200J_controlled_provider_binding_activation_execution_final_gate";
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  forbiddenUntil200J: readonly string[];
}>;
