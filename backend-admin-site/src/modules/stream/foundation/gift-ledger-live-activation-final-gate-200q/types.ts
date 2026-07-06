export const STREAM_GIFT_LEDGER_LIVE_ACTIVATION_FINAL_GATE_200Q_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-200Q" as const;

export type StreamGiftLedgerLiveActivationFinalGateKind200Q =
  | "accept_payments_provider"
  | "creator_payout_provider"
  | "google_billing_diamonds_provider"
  | "airwallex_merchant_rails_provider";

export type StreamGiftLedgerLiveActivationFinalGateProviderName200Q =
  | "google_billing"
  | "airwallex"
  | "wallet"
  | "bank"
  | "manual_review"
  | "other";

export type StreamGiftLedgerLiveActivationFinalGateConfigScope200Q =
  | "accept_payments"
  | "creator_payout"
  | "diamonds_topup"
  | "merchant_rails"
  | "manual_review";

export type StreamGiftLedgerLiveActivationFinalGateItem200Q = Readonly<{
  bindingKind: StreamGiftLedgerLiveActivationFinalGateKind200Q;
  providerName: StreamGiftLedgerLiveActivationFinalGateProviderName200Q;
  configReferenceLabel: string;
  configScope: StreamGiftLedgerLiveActivationFinalGateConfigScope200Q;
  previousPreExecutionDryRunStage: "200P_pre_execution_dry_run_clean" | "pending_owner_fill";
  finalGateMode: "final_gate_only_no_execution" | "pending_owner_fill";
  ownerExecutionApprovalRequired: "required_before_runtime_enablement" | "pending_owner_fill";
  activationExecutionMode: "not_executed_final_gate_only" | "pending_owner_fill";
  providerBindingMode: "disabled_no_binding" | "pending_owner_fill";
  providerRuntimeMode: "disabled_no_runtime_enablement" | "pending_owner_fill";
  liveCallMode: "disabled_no_provider_call" | "pending_owner_fill";
  paymentRuntimeMode: "disabled_no_payment_capture" | "pending_owner_fill";
  payoutRuntimeMode: "disabled_no_payout_execution" | "pending_owner_fill";
  walletMutationMode: "disabled_no_wallet_mutation" | "pending_owner_fill";
  runtimeCutoverMode: "disabled_no_cutover" | "pending_owner_fill";
  rollbackPlan: "ready" | "pending_owner_fill";
  auditPreflightClosure: "complete" | "pending_owner_fill";
}>;

export type StreamGiftLedgerLiveActivationFinalGateSafety200Q = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderResponseAccepted: false;
  previous200PPreExecutionDryRunClean: true;
  finalGateOnlyNoExecution: true;
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
  futureRuntimePackageRequiresSeparateExactOwnerApproval: true;
  referenceLabelsOnly: true;
}>;

export type StreamGiftLedgerLiveActivationFinalGateInput200Q = Readonly<{
  ownerApproval?: string;
  finalGateMode?: "final_gate" | "disabled";
  acknowledgedPreExecutionDryRunStage?: "200P_pre_execution_dry_run_clean" | "disabled";
  bindingItems: readonly StreamGiftLedgerLiveActivationFinalGateItem200Q[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerLiveActivationFinalGateBlockedCode200Q =
  | "owner_approval_required"
  | "final_gate_mode_disabled"
  | "previous_200p_pre_execution_dry_run_required"
  | "binding_items_required"
  | "missing_required_binding_kind"
  | "invalid_reference_label"
  | "invalid_provider_scope_pair"
  | "previous_pre_execution_dry_run_item_stage_required"
  | "final_gate_mode_must_remain_no_execution"
  | "owner_execution_approval_required"
  | "activation_execution_mode_must_remain_not_executed"
  | "provider_binding_mode_must_remain_disabled"
  | "provider_runtime_mode_must_remain_disabled"
  | "live_call_mode_must_remain_disabled"
  | "payment_runtime_mode_must_remain_disabled"
  | "payout_runtime_mode_must_remain_disabled"
  | "wallet_mutation_mode_must_remain_disabled"
  | "runtime_cutover_mode_must_remain_disabled"
  | "rollback_plan_required"
  | "audit_preflight_closure_required"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerLiveActivationFinalGateBlocked200Q = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_FINAL_GATE_200Q_VERSION;
  status: "final_gate_blocked_without_activation";
  code: StreamGiftLedgerLiveActivationFinalGateBlockedCode200Q;
  blockedReason: string;
  finalGatePrepared: false;
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
  safety: StreamGiftLedgerLiveActivationFinalGateSafety200Q;
}>;

export type StreamGiftLedgerLiveActivationFinalGateEnvelope200Q = Readonly<{
  contract: "stream.gift.live_activation.final_gate.v1";
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_FINAL_GATE_200Q_VERSION;
  previousStageRequired: "200P_pre_execution_dry_run_clean";
  requiredBindingKinds: readonly StreamGiftLedgerLiveActivationFinalGateKind200Q[];
  verifiedBindingKinds: readonly StreamGiftLedgerLiveActivationFinalGateKind200Q[];
  referenceLabelCount: number;
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsProviderSeparated: true;
  airwallexMerchantRailsProviderSeparated: true;
  finalGatePrepared: true;
  finalGateOnlyNoExecution: true;
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
  auditPreflightClosureComplete: boolean;
  futureRuntimePackageRequiresSeparateExactOwnerApproval: true;
  nextStage: "future_separate_exact_live_provider_binding_activation_execution_runtime_package_requires_new_exact_owner_approval";
}>;

export type StreamGiftLedgerLiveActivationFinalGatePrepared200Q = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_FINAL_GATE_200Q_VERSION;
  status: "final_gate_prepared_without_activation";
  envelope: StreamGiftLedgerLiveActivationFinalGateEnvelope200Q;
  finalGatePrepared: true;
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
  safety: StreamGiftLedgerLiveActivationFinalGateSafety200Q;
}>;

export type StreamGiftLedgerLiveActivationFinalGateResult200Q =
  | StreamGiftLedgerLiveActivationFinalGatePrepared200Q
  | StreamGiftLedgerLiveActivationFinalGateBlocked200Q;

export type StreamGiftLedgerLiveActivationFinalGateReadiness200Q = Readonly<{
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_FINAL_GATE_200Q_VERSION;
  status: "ready_for_final_gate_without_activation";
  previousStageRequired: "200P_pre_execution_dry_run_clean";
  backendReadinessPercent: 100;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  nextStage: "future_separate_exact_live_provider_binding_activation_execution_runtime_package_requires_new_exact_owner_approval";
  safety: StreamGiftLedgerLiveActivationFinalGateSafety200Q;
}>;
