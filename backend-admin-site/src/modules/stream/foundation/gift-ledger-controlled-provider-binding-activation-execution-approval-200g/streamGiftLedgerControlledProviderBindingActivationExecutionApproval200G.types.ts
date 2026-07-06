export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-200G" as const;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalKind200G =
  | "accept_payments_provider"
  | "creator_payout_provider"
  | "google_billing_diamonds_provider"
  | "airwallex_merchant_rails_provider";

export type StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalProviderName200G = "google_billing" | "airwallex" | "wallet" | "bank" | "manual_review" | "other";

export type StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalConfigScope200G = "accept_payments" | "creator_payout" | "diamonds_topup" | "merchant_rails" | "manual_review";

export type StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalItem200G = Readonly<{
  bindingKind: StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalKind200G;
  providerName: StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalProviderName200G;
  configReferenceLabel: string;
  configScope: StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalConfigScope200G;
  ownerAttestation: "server_side_config_exists" | "pending_owner_fill";
  dryRunStage: "200F_controlled_provider_binding_activation_dry_run_prepared" | "pending_owner_fill";
  executionApprovalIntent: "request_controlled_activation_execution_approval_only" | "pending_owner_fill";
  executionApprovalMode: "approval_only_no_activation_execution" | "pending_owner_fill";
  providerBindingMode: "disabled_until_separate_execution_preflight" | "pending_owner_fill";
  liveCallMode: "disabled_no_provider_call" | "pending_owner_fill";
  paymentRuntimeMode: "disabled_no_payment_capture" | "pending_owner_fill";
  payoutRuntimeMode: "disabled_no_payout_execution" | "pending_owner_fill";
  walletMutationMode: "disabled_no_wallet_mutation" | "pending_owner_fill";
  rollbackPlan: "ready" | "pending_owner_fill";
  adminComplianceGate: "ready_for_execution_review" | "pending_owner_fill";
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalSafety200G = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderResponseAccepted: false;
  providerBindingDryRunOnlyAlreadyCompleted: true;
  activationExecutionApprovalOnly: true;
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
  requiresSeparate200HControlledActivationExecutionPreflight: true;
  referenceLabelsOnly: true;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalInput200G = Readonly<{
  ownerApproval?: string;
  approvalMode?: "controlled_provider_binding_activation_execution_approval_request" | "disabled";
  acknowledgedDryRunStage?: "200F_controlled_provider_binding_activation_dry_run_prepared" | "disabled";
  bindingItems: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalItem200G[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalBlockedCode200G =
  | "owner_approval_required"
  | "approval_mode_disabled"
  | "dry_run_stage_required"
  | "binding_items_required"
  | "missing_required_binding_kind"
  | "invalid_reference_label"
  | "invalid_provider_scope_pair"
  | "owner_attestation_required"
  | "execution_approval_intent_required"
  | "execution_approval_mode_must_remain_approval_only"
  | "provider_binding_mode_must_remain_disabled"
  | "live_call_mode_must_remain_disabled"
  | "payment_runtime_mode_must_remain_disabled"
  | "payout_runtime_mode_must_remain_disabled"
  | "wallet_mutation_mode_must_remain_disabled"
  | "rollback_plan_required"
  | "admin_compliance_gate_required"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalBlocked200G = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_VERSION;
  status: "controlled_provider_binding_activation_execution_approval_blocked_without_activation";
  code: StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalBlockedCode200G;
  blockedReason: string;
  activationExecutionApprovalPrepared: false;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalSafety200G;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalEnvelope200G = Readonly<{
  contract: "stream.gift.controlled_provider_binding.activation_execution_approval.v1";
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_VERSION;
  previousStageRequired: "200F_controlled_provider_binding_activation_dry_run_prepared";
  requiredBindingKinds: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalKind200G[];
  approvedBindingKinds: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalKind200G[];
  referenceLabelCount: number;
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsProviderSeparated: true;
  airwallexMerchantRailsProviderSeparated: true;
  controlledActivationExecutionApprovalPrepared: true;
  activationExecutionApprovalOnly: true;
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
  nextStage: "200H_controlled_provider_binding_activation_execution_preflight";
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalPrepared200G = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_VERSION;
  status: "controlled_provider_binding_activation_execution_approval_prepared_without_activation";
  envelope: StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalEnvelope200G;
  activationExecutionApprovalPrepared: true;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalSafety200G;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalResult200G =
  | StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalPrepared200G
  | StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalBlocked200G;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalReadiness200G = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_VERSION;
  status: "ready_for_controlled_provider_binding_activation_execution_approval";
  previousStageRequired: "200F_controlled_provider_binding_activation_dry_run_prepared";
  backendReadinessPercent: 100;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  nextStage: "200H_controlled_provider_binding_activation_execution_preflight";
  safety: StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalSafety200G;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightNextRequest200G = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_VERSION;
  status: "next_stage_requires_controlled_provider_binding_activation_execution_preflight";
  nextStage: "200H_controlled_provider_binding_activation_execution_preflight";
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  forbiddenUntil200H: readonly string[];
}>;
