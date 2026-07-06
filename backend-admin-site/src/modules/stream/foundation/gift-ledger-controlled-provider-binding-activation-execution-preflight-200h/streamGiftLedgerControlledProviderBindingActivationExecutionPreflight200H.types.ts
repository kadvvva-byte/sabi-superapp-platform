export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-200H" as const;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightKind200H =
  | "accept_payments_provider"
  | "creator_payout_provider"
  | "google_billing_diamonds_provider"
  | "airwallex_merchant_rails_provider";

export type StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightProviderName200H = "google_billing" | "airwallex" | "wallet" | "bank" | "manual_review" | "other";

export type StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightConfigScope200H = "accept_payments" | "creator_payout" | "diamonds_topup" | "merchant_rails" | "manual_review";

export type StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightItem200H = Readonly<{
  bindingKind: StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightKind200H;
  providerName: StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightProviderName200H;
  configReferenceLabel: string;
  configScope: StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightConfigScope200H;
  ownerAttestation: "server_side_config_exists" | "pending_owner_fill";
  executionApprovalStage: "200G_controlled_provider_binding_activation_execution_approval_prepared" | "pending_owner_fill";
  activationExecutionPreflightIntent: "request_controlled_activation_execution_preflight_only" | "pending_owner_fill";
  activationExecutionPreflightMode: "preflight_only_no_activation_execution" | "pending_owner_fill";
  providerBindingMode: "disabled_until_separate_activation_execution" | "pending_owner_fill";
  liveCallMode: "disabled_no_provider_call" | "pending_owner_fill";
  paymentRuntimeMode: "disabled_no_payment_capture" | "pending_owner_fill";
  payoutRuntimeMode: "disabled_no_payout_execution" | "pending_owner_fill";
  walletMutationMode: "disabled_no_wallet_mutation" | "pending_owner_fill";
  rollbackPlan: "ready" | "pending_owner_fill";
  adminComplianceGate: "ready_for_activation_execution_review" | "pending_owner_fill";
  auditEnvelopeMode: "preflight_audit_only_no_runtime_write" | "pending_owner_fill";
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightSafety200H = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderResponseAccepted: false;
  previous200GExecutionApprovalAlreadyPrepared: true;
  activationExecutionPreflightOnly: true;
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
  requiresSeparate200IControlledActivationExecutionAuthorization: true;
  referenceLabelsOnly: true;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightInput200H = Readonly<{
  ownerApproval?: string;
  preflightMode?: "controlled_provider_binding_activation_execution_preflight_request" | "disabled";
  acknowledgedExecutionApprovalStage?: "200G_controlled_provider_binding_activation_execution_approval_prepared" | "disabled";
  bindingItems: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightItem200H[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightBlockedCode200H =
  | "owner_approval_required"
  | "preflight_mode_disabled"
  | "execution_approval_stage_required"
  | "binding_items_required"
  | "missing_required_binding_kind"
  | "invalid_reference_label"
  | "invalid_provider_scope_pair"
  | "owner_attestation_required"
  | "activation_execution_preflight_intent_required"
  | "activation_execution_preflight_mode_must_remain_preflight_only"
  | "provider_binding_mode_must_remain_disabled"
  | "live_call_mode_must_remain_disabled"
  | "payment_runtime_mode_must_remain_disabled"
  | "payout_runtime_mode_must_remain_disabled"
  | "wallet_mutation_mode_must_remain_disabled"
  | "rollback_plan_required"
  | "admin_compliance_gate_required"
  | "audit_envelope_mode_required"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightBlocked200H = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_VERSION;
  status: "controlled_provider_binding_activation_execution_preflight_blocked_without_activation";
  code: StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightBlockedCode200H;
  blockedReason: string;
  activationExecutionPreflightPrepared: false;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightSafety200H;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightEnvelope200H = Readonly<{
  contract: "stream.gift.controlled_provider_binding.activation_execution_preflight.v1";
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_VERSION;
  previousStageRequired: "200G_controlled_provider_binding_activation_execution_approval_prepared";
  requiredBindingKinds: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightKind200H[];
  preflightedBindingKinds: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightKind200H[];
  referenceLabelCount: number;
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsProviderSeparated: true;
  airwallexMerchantRailsProviderSeparated: true;
  controlledActivationExecutionPreflightPrepared: true;
  activationExecutionPreflightOnly: true;
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
  rollbackReady: boolean;
  adminComplianceReady: boolean;
  auditEnvelopeReady: boolean;
  nextStage: "200I_controlled_provider_binding_activation_execution_authorization";
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightPrepared200H = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_VERSION;
  status: "controlled_provider_binding_activation_execution_preflight_prepared_without_activation";
  envelope: StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightEnvelope200H;
  activationExecutionPreflightPrepared: true;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightSafety200H;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightResult200H =
  | StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightPrepared200H
  | StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightBlocked200H;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightReadiness200H = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_VERSION;
  status: "ready_for_controlled_provider_binding_activation_execution_preflight";
  previousStageRequired: "200G_controlled_provider_binding_activation_execution_approval_prepared";
  backendReadinessPercent: 100;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  nextStage: "200I_controlled_provider_binding_activation_execution_authorization";
  safety: StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightSafety200H;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationNextRequest200H = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_VERSION;
  status: "next_stage_requires_controlled_provider_binding_activation_execution_authorization";
  nextStage: "200I_controlled_provider_binding_activation_execution_authorization";
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  forbiddenUntil200I: readonly string[];
}>;
