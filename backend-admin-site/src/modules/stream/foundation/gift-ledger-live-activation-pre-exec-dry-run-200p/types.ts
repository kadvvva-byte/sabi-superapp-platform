export const STREAM_GIFT_LEDGER_LIVE_ACTIVATION_PRE_EXEC_DRY_RUN_200P_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-200P" as const;

export type StreamGiftLedgerLiveActivationPreExecDryRunKind200P =
  | "accept_payments_provider"
  | "creator_payout_provider"
  | "google_billing_diamonds_provider"
  | "airwallex_merchant_rails_provider";

export type StreamGiftLedgerLiveActivationPreExecDryRunProviderName200P =
  | "google_billing"
  | "airwallex"
  | "wallet"
  | "bank"
  | "manual_review"
  | "other";

export type StreamGiftLedgerLiveActivationPreExecDryRunConfigScope200P =
  | "accept_payments"
  | "creator_payout"
  | "diamonds_topup"
  | "merchant_rails"
  | "manual_review";

export type StreamGiftLedgerLiveActivationPreExecDryRunItem200P = Readonly<{
  bindingKind: StreamGiftLedgerLiveActivationPreExecDryRunKind200P;
  providerName: StreamGiftLedgerLiveActivationPreExecDryRunProviderName200P;
  configReferenceLabel: string;
  configScope: StreamGiftLedgerLiveActivationPreExecDryRunConfigScope200P;
  previousOwnerApprovalPackageStage: "200O_exact_owner_approval_package_prepared" | "pending_owner_fill";
  preExecutionDryRunMode: "contract_projection_only_no_execution" | "pending_owner_fill";
  activationExecutionMode: "not_executed_requires_future_exact_owner_execution" | "pending_owner_fill";
  providerBindingMode: "disabled_no_binding" | "pending_owner_fill";
  providerRuntimeMode: "disabled_no_runtime_enablement" | "pending_owner_fill";
  liveCallMode: "disabled_no_provider_call" | "pending_owner_fill";
  paymentRuntimeMode: "disabled_no_payment_capture" | "pending_owner_fill";
  payoutRuntimeMode: "disabled_no_payout_execution" | "pending_owner_fill";
  walletMutationMode: "disabled_no_wallet_mutation" | "pending_owner_fill";
  runtimeCutoverMode: "disabled_no_cutover" | "pending_owner_fill";
  rollbackPlan: "ready" | "pending_owner_fill";
  ownerFinalReviewRequired: "required_before_execution" | "pending_owner_fill";
  auditPreflightClosure: "complete" | "pending_owner_fill";
}>;

export type StreamGiftLedgerLiveActivationPreExecDryRunSafety200P = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderResponseAccepted: false;
  previous200OApprovalPackagePrepared: true;
  preExecutionDryRunOnly: true;
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
  futureExecutionStillRequiresSeparateExactOwnerApproval: true;
  referenceLabelsOnly: true;
}>;

export type StreamGiftLedgerLiveActivationPreExecDryRunInput200P = Readonly<{
  ownerApproval?: string;
  dryRunMode?: "pre_execution_dry_run" | "disabled";
  acknowledgedOwnerApprovalPackageStage?: "200O_exact_owner_approval_package_prepared" | "disabled";
  bindingItems: readonly StreamGiftLedgerLiveActivationPreExecDryRunItem200P[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerLiveActivationPreExecDryRunBlockedCode200P =
  | "owner_approval_required"
  | "dry_run_mode_disabled"
  | "previous_200o_owner_approval_package_required"
  | "binding_items_required"
  | "missing_required_binding_kind"
  | "invalid_reference_label"
  | "invalid_provider_scope_pair"
  | "previous_owner_approval_package_item_stage_required"
  | "pre_execution_dry_run_mode_must_remain_projection_only"
  | "activation_execution_mode_must_remain_not_executed"
  | "provider_binding_mode_must_remain_disabled"
  | "provider_runtime_mode_must_remain_disabled"
  | "live_call_mode_must_remain_disabled"
  | "payment_runtime_mode_must_remain_disabled"
  | "payout_runtime_mode_must_remain_disabled"
  | "wallet_mutation_mode_must_remain_disabled"
  | "runtime_cutover_mode_must_remain_disabled"
  | "rollback_plan_required"
  | "owner_final_review_required"
  | "audit_preflight_closure_required"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerLiveActivationPreExecDryRunBlocked200P = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_PRE_EXEC_DRY_RUN_200P_VERSION;
  status: "pre_execution_dry_run_blocked_without_activation";
  code: StreamGiftLedgerLiveActivationPreExecDryRunBlockedCode200P;
  blockedReason: string;
  preExecutionDryRunPrepared: false;
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
  safety: StreamGiftLedgerLiveActivationPreExecDryRunSafety200P;
}>;

export type StreamGiftLedgerLiveActivationPreExecDryRunEnvelope200P = Readonly<{
  contract: "stream.gift.live_activation.pre_execution_dry_run.v1";
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_PRE_EXEC_DRY_RUN_200P_VERSION;
  previousStageRequired: "200O_exact_owner_approval_package_prepared";
  requiredBindingKinds: readonly StreamGiftLedgerLiveActivationPreExecDryRunKind200P[];
  verifiedBindingKinds: readonly StreamGiftLedgerLiveActivationPreExecDryRunKind200P[];
  referenceLabelCount: number;
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsProviderSeparated: true;
  airwallexMerchantRailsProviderSeparated: true;
  preExecutionDryRunPrepared: true;
  dryRunProjectionOnlyNoExecution: true;
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
  ownerFinalReviewRequired: boolean;
  auditPreflightClosureComplete: boolean;
  futureExecutionStillRequiresSeparateExactOwnerApproval: true;
  nextStage: "200Q_separate_exact_live_provider_binding_activation_execution_final_gate";
}>;

export type StreamGiftLedgerLiveActivationPreExecDryRunPrepared200P = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_PRE_EXEC_DRY_RUN_200P_VERSION;
  status: "pre_execution_dry_run_prepared_without_activation";
  envelope: StreamGiftLedgerLiveActivationPreExecDryRunEnvelope200P;
  preExecutionDryRunPrepared: true;
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
  safety: StreamGiftLedgerLiveActivationPreExecDryRunSafety200P;
}>;

export type StreamGiftLedgerLiveActivationPreExecDryRunResult200P =
  | StreamGiftLedgerLiveActivationPreExecDryRunPrepared200P
  | StreamGiftLedgerLiveActivationPreExecDryRunBlocked200P;

export type StreamGiftLedgerLiveActivationPreExecDryRunReadiness200P = Readonly<{
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_PRE_EXEC_DRY_RUN_200P_VERSION;
  status: "ready_for_pre_execution_dry_run_without_activation";
  previousStageRequired: "200O_exact_owner_approval_package_prepared";
  backendReadinessPercent: 100;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  nextStage: "200Q_separate_exact_live_provider_binding_activation_execution_final_gate";
  safety: StreamGiftLedgerLiveActivationPreExecDryRunSafety200P;
}>;
