export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-200F" as const;

export type StreamGiftLedgerControlledProviderBindingActivationDryRunKind200F =
  | "accept_payments_provider"
  | "creator_payout_provider"
  | "google_billing_diamonds_provider"
  | "airwallex_merchant_rails_provider";

export type StreamGiftLedgerControlledProviderBindingActivationDryRunProviderName200F = "google_billing" | "airwallex" | "wallet" | "bank" | "manual_review" | "other";

export type StreamGiftLedgerControlledProviderBindingActivationDryRunConfigScope200F = "accept_payments" | "creator_payout" | "diamonds_topup" | "merchant_rails" | "manual_review";

export type StreamGiftLedgerControlledProviderBindingActivationDryRunItem200F = Readonly<{
  bindingKind: StreamGiftLedgerControlledProviderBindingActivationDryRunKind200F;
  providerName: StreamGiftLedgerControlledProviderBindingActivationDryRunProviderName200F;
  configReferenceLabel: string;
  configScope: StreamGiftLedgerControlledProviderBindingActivationDryRunConfigScope200F;
  ownerAttestation: "server_side_config_exists" | "pending_owner_fill";
  runtimeReadinessGuardStage: "200E_provider_runtime_readiness_guard_passed" | "pending_owner_fill";
  activationDryRunIntent: "validate_controlled_provider_binding_plan_only" | "pending_owner_fill";
  providerBindingMode: "dry_run_only_no_provider_binding" | "pending_owner_fill";
  liveCallMode: "disabled_no_provider_call" | "pending_owner_fill";
  paymentRuntimeMode: "disabled_no_payment_capture" | "pending_owner_fill";
  payoutRuntimeMode: "disabled_no_payout_execution" | "pending_owner_fill";
  walletMutationMode: "disabled_no_wallet_mutation" | "pending_owner_fill";
  rollbackPlan: "ready" | "pending_owner_fill";
}>;

export type StreamGiftLedgerControlledProviderBindingActivationDryRunSafety200F = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderResponseAccepted: false;
  providerBindingDryRunOnly: true;
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
  requiresSeparate200GControlledActivationExecutionApproval: true;
  referenceLabelsOnly: true;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationDryRunInput200F = Readonly<{
  ownerApproval?: string;
  dryRunMode?: "controlled_provider_binding_activation_dry_run" | "disabled";
  acknowledgedRuntimeReadinessGuardStage?: "200E_provider_runtime_readiness_guard_passed" | "disabled";
  bindingItems: readonly StreamGiftLedgerControlledProviderBindingActivationDryRunItem200F[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationDryRunBlockedCode200F =
  | "owner_approval_required"
  | "dry_run_mode_disabled"
  | "runtime_readiness_guard_stage_required"
  | "binding_items_required"
  | "missing_required_binding_kind"
  | "invalid_reference_label"
  | "invalid_provider_scope_pair"
  | "owner_attestation_required"
  | "runtime_readiness_guard_item_required"
  | "activation_dry_run_intent_required"
  | "provider_binding_mode_must_remain_dry_run"
  | "live_call_mode_must_remain_disabled"
  | "payment_runtime_mode_must_remain_disabled"
  | "payout_runtime_mode_must_remain_disabled"
  | "wallet_mutation_mode_must_remain_disabled"
  | "rollback_plan_required"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerControlledProviderBindingActivationDryRunBlocked200F = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_VERSION;
  status: "controlled_provider_binding_activation_dry_run_blocked_without_provider_binding";
  code: StreamGiftLedgerControlledProviderBindingActivationDryRunBlockedCode200F;
  blockedReason: string;
  activationDryRunPrepared: false;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerControlledProviderBindingActivationDryRunSafety200F;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationDryRunEnvelope200F = Readonly<{
  contract: "stream.gift.controlled_provider_binding.activation_dry_run.v1";
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_VERSION;
  previousStageRequired: "200E_provider_runtime_readiness_guard_passed";
  requiredBindingKinds: readonly StreamGiftLedgerControlledProviderBindingActivationDryRunKind200F[];
  dryRunBindingKinds: readonly StreamGiftLedgerControlledProviderBindingActivationDryRunKind200F[];
  referenceLabelCount: number;
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsProviderSeparated: true;
  airwallexMerchantRailsProviderSeparated: true;
  controlledActivationDryRunPrepared: true;
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
  nextStage: "200G_controlled_provider_binding_activation_execution_approval";
}>;

export type StreamGiftLedgerControlledProviderBindingActivationDryRunPrepared200F = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_VERSION;
  status: "controlled_provider_binding_activation_dry_run_prepared_without_provider_binding";
  envelope: StreamGiftLedgerControlledProviderBindingActivationDryRunEnvelope200F;
  activationDryRunPrepared: true;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerControlledProviderBindingActivationDryRunSafety200F;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationDryRunResult200F =
  | StreamGiftLedgerControlledProviderBindingActivationDryRunPrepared200F
  | StreamGiftLedgerControlledProviderBindingActivationDryRunBlocked200F;

export type StreamGiftLedgerControlledProviderBindingActivationDryRunReadiness200F = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_VERSION;
  status: "ready_for_controlled_provider_binding_activation_dry_run";
  previousStageRequired: "200E_provider_runtime_readiness_guard_passed";
  backendReadinessPercent: 100;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  nextStage: "200G_controlled_provider_binding_activation_execution_approval";
  safety: StreamGiftLedgerControlledProviderBindingActivationDryRunSafety200F;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalNextRequest200F = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_VERSION;
  status: "next_stage_requires_controlled_provider_binding_activation_execution_approval";
  nextStage: "200G_controlled_provider_binding_activation_execution_approval";
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  forbiddenUntil200G: readonly string[];
}>;
