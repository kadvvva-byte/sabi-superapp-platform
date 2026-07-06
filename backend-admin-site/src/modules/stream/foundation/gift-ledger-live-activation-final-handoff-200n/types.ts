export const STREAM_GIFT_LEDGER_LIVE_ACTIVATION_FINAL_HANDOFF_200N_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-200N" as const;

export type StreamGiftLedgerLiveActivationFinalHandoffKind200N =
  | "accept_payments_provider"
  | "creator_payout_provider"
  | "google_billing_diamonds_provider"
  | "airwallex_merchant_rails_provider";

export type StreamGiftLedgerLiveActivationFinalHandoffProviderName200N =
  | "google_billing"
  | "airwallex"
  | "wallet"
  | "bank"
  | "manual_review"
  | "other";

export type StreamGiftLedgerLiveActivationFinalHandoffConfigScope200N =
  | "accept_payments"
  | "creator_payout"
  | "diamonds_topup"
  | "merchant_rails"
  | "manual_review";

export type StreamGiftLedgerLiveActivationFinalHandoffItem200N = Readonly<{
  bindingKind: StreamGiftLedgerLiveActivationFinalHandoffKind200N;
  providerName: StreamGiftLedgerLiveActivationFinalHandoffProviderName200N;
  configReferenceLabel: string;
  configScope: StreamGiftLedgerLiveActivationFinalHandoffConfigScope200N;
  previousApprovalVerificationStage: "200M_separate_exact_live_provider_binding_activation_execution_approval_verification_prepared" | "pending_owner_fill";
  finalHandoffMode: "separate_exact_live_provider_binding_activation_execution_final_handoff_only_no_runtime_enablement" | "pending_owner_fill";
  providerBindingMode: "disabled_until_future_execution_package" | "pending_owner_fill";
  liveActivationMode: "not_executed_requires_future_exact_owner_activation_package" | "pending_owner_fill";
  liveCallMode: "disabled_no_provider_call" | "pending_owner_fill";
  paymentRuntimeMode: "disabled_no_payment_capture" | "pending_owner_fill";
  payoutRuntimeMode: "disabled_no_payout_execution" | "pending_owner_fill";
  walletMutationMode: "disabled_no_wallet_mutation" | "pending_owner_fill";
  runtimeCutoverMode: "disabled_until_future_execution_package" | "pending_owner_fill";
  rollbackPlan: "ready" | "pending_owner_fill";
  finalHandoffChecklist: "complete" | "pending_owner_fill";
  auditClosure: "complete" | "pending_owner_fill";
}>;

export type StreamGiftLedgerLiveActivationFinalHandoffSafety200N = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderResponseAccepted: false;
  previous200MApprovalVerificationPrepared: true;
  finalHandoffOnly: true;
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
  requiresSeparateExactOwnerApprovalBeforeAnyLiveExecution: true;
  referenceLabelsOnly: true;
}>;

export type StreamGiftLedgerLiveActivationFinalHandoffInput200N = Readonly<{
  ownerApproval?: string;
  finalHandoffMode?: "separate_exact_live_provider_binding_activation_execution_final_handoff" | "disabled";
  acknowledgedApprovalVerificationStage?: "200M_separate_exact_live_provider_binding_activation_execution_approval_verification_prepared" | "disabled";
  bindingItems: readonly StreamGiftLedgerLiveActivationFinalHandoffItem200N[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerLiveActivationFinalHandoffBlockedCode200N =
  | "owner_approval_required"
  | "final_handoff_mode_disabled"
  | "previous_approval_verification_stage_required"
  | "binding_items_required"
  | "missing_required_binding_kind"
  | "invalid_reference_label"
  | "invalid_provider_scope_pair"
  | "previous_approval_verification_item_stage_required"
  | "final_handoff_mode_must_remain_handoff_only"
  | "provider_binding_mode_must_remain_disabled"
  | "live_activation_mode_must_remain_not_executed"
  | "live_call_mode_must_remain_disabled"
  | "payment_runtime_mode_must_remain_disabled"
  | "payout_runtime_mode_must_remain_disabled"
  | "wallet_mutation_mode_must_remain_disabled"
  | "runtime_cutover_mode_must_remain_disabled"
  | "rollback_plan_required"
  | "final_handoff_checklist_required"
  | "audit_closure_required"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerLiveActivationFinalHandoffBlocked200N = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_FINAL_HANDOFF_200N_VERSION;
  status: "separate_exact_live_provider_binding_activation_execution_final_handoff_blocked_without_activation";
  code: StreamGiftLedgerLiveActivationFinalHandoffBlockedCode200N;
  blockedReason: string;
  finalHandoffPrepared: false;
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
  safety: StreamGiftLedgerLiveActivationFinalHandoffSafety200N;
}>;

export type StreamGiftLedgerLiveActivationFinalHandoffEnvelope200N = Readonly<{
  contract: "stream.gift.separate_exact_live_provider_binding.activation_execution_final_handoff.v1";
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_FINAL_HANDOFF_200N_VERSION;
  previousStageRequired: "200M_separate_exact_live_provider_binding_activation_execution_approval_verification_prepared";
  requiredBindingKinds: readonly StreamGiftLedgerLiveActivationFinalHandoffKind200N[];
  verifiedBindingKinds: readonly StreamGiftLedgerLiveActivationFinalHandoffKind200N[];
  referenceLabelCount: number;
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsProviderSeparated: true;
  airwallexMerchantRailsProviderSeparated: true;
  finalHandoffPrepared: true;
  finalHandoffOnlyNoExecution: true;
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
  finalHandoffChecklistComplete: boolean;
  auditClosureComplete: boolean;
  requiresFutureSeparateExactLiveExecutionApproval: true;
  nextStage: "future_separate_exact_live_provider_binding_activation_execution_package_required";
}>;

export type StreamGiftLedgerLiveActivationFinalHandoffPrepared200N = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_FINAL_HANDOFF_200N_VERSION;
  status: "separate_exact_live_provider_binding_activation_execution_final_handoff_prepared_without_activation";
  envelope: StreamGiftLedgerLiveActivationFinalHandoffEnvelope200N;
  finalHandoffPrepared: true;
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
  safety: StreamGiftLedgerLiveActivationFinalHandoffSafety200N;
}>;

export type StreamGiftLedgerLiveActivationFinalHandoffResult200N =
  | StreamGiftLedgerLiveActivationFinalHandoffPrepared200N
  | StreamGiftLedgerLiveActivationFinalHandoffBlocked200N;

export type StreamGiftLedgerLiveActivationFinalHandoffReadiness200N = Readonly<{
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_FINAL_HANDOFF_200N_VERSION;
  status: "ready_for_separate_exact_live_provider_binding_activation_execution_final_handoff";
  previousStageRequired: "200M_separate_exact_live_provider_binding_activation_execution_approval_verification_prepared";
  backendReadinessPercent: 100;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  nextStage: "future_separate_exact_live_provider_binding_activation_execution_package_required";
  safety: StreamGiftLedgerLiveActivationFinalHandoffSafety200N;
}>;
