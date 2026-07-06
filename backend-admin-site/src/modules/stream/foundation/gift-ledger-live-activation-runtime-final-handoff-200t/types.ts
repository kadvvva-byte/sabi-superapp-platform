export const STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_FINAL_HANDOFF_200T_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-200T" as const;

export type StreamGiftLedgerLiveActivationRuntimeFinalHandoffKind200T =
  | "accept_payments_provider"
  | "creator_payout_provider"
  | "google_billing_diamonds_provider"
  | "airwallex_merchant_rails_provider";

export type StreamGiftLedgerLiveActivationRuntimeFinalHandoffProviderName200T =
  | "google_billing"
  | "airwallex"
  | "wallet"
  | "bank"
  | "manual_review"
  | "other";

export type StreamGiftLedgerLiveActivationRuntimeFinalHandoffConfigScope200T =
  | "accept_payments"
  | "creator_payout"
  | "diamonds_topup"
  | "merchant_rails"
  | "manual_review";

export type StreamGiftLedgerLiveActivationRuntimeFinalHandoffItem200T = Readonly<{
  bindingKind: StreamGiftLedgerLiveActivationRuntimeFinalHandoffKind200T;
  providerName: StreamGiftLedgerLiveActivationRuntimeFinalHandoffProviderName200T;
  configReferenceLabel: string;
  configScope: StreamGiftLedgerLiveActivationRuntimeFinalHandoffConfigScope200T;
  previousApprovalVerificationStage: "200S_runtime_approval_verification_clean" | "pending_owner_fill";
  finalHandoffMode: "runtime_package_final_handoff_only_no_execution" | "pending_owner_fill";
  runtimePackageApprovalMode: "not_approved_now_requires_future_execution_package" | "pending_owner_fill";
  liveActivationExecutionMode: "not_executed_final_handoff_only" | "pending_owner_fill";
  providerBindingMode: "disabled_no_binding" | "pending_owner_fill";
  providerRuntimeMode: "disabled_no_runtime_enablement" | "pending_owner_fill";
  liveCallMode: "disabled_no_provider_call" | "pending_owner_fill";
  paymentRuntimeMode: "disabled_no_payment_capture" | "pending_owner_fill";
  payoutRuntimeMode: "disabled_no_payout_execution" | "pending_owner_fill";
  walletMutationMode: "disabled_no_wallet_mutation" | "pending_owner_fill";
  runtimeCutoverMode: "disabled_no_cutover" | "pending_owner_fill";
  rollbackPlan: "ready" | "pending_owner_fill";
  finalHandoffChecklist: "complete" | "pending_owner_fill";
  auditClosure: "complete" | "pending_owner_fill";
}>;

export type StreamGiftLedgerLiveActivationRuntimeFinalHandoffSafety200T = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderResponseAccepted: false;
  previous200SApprovalVerificationClean: true;
  runtimeFinalHandoffOnly: true;
  liveActivationRuntimePackageApprovedNow: false;
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
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  referenceLabelsOnly: true;
}>;

export type StreamGiftLedgerLiveActivationRuntimeFinalHandoffInput200T = Readonly<{
  ownerApproval?: string;
  runtimeFinalHandoffMode?: "final_handoff_only" | "disabled";
  acknowledgedApprovalVerificationStage?: "200S_runtime_approval_verification_clean" | "disabled";
  bindingItems: readonly StreamGiftLedgerLiveActivationRuntimeFinalHandoffItem200T[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerLiveActivationRuntimeFinalHandoffBlockedCode200T =
  | "owner_approval_required"
  | "runtime_final_handoff_mode_disabled"
  | "previous_200s_approval_verification_required"
  | "binding_items_required"
  | "missing_required_binding_kind"
  | "invalid_reference_label"
  | "invalid_provider_scope_pair"
  | "previous_approval_verification_item_stage_required"
  | "final_handoff_mode_must_remain_handoff_only"
  | "runtime_package_approval_must_not_happen_now"
  | "activation_execution_mode_must_remain_not_executed"
  | "provider_binding_mode_must_remain_disabled"
  | "provider_runtime_mode_must_remain_disabled"
  | "live_call_mode_must_remain_disabled"
  | "payment_runtime_mode_must_remain_disabled"
  | "payout_runtime_mode_must_remain_disabled"
  | "wallet_mutation_mode_must_remain_disabled"
  | "runtime_cutover_mode_must_remain_disabled"
  | "rollback_plan_required"
  | "final_handoff_checklist_required"
  | "audit_closure_required"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerLiveActivationRuntimeFinalHandoffBlocked200T = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_FINAL_HANDOFF_200T_VERSION;
  status: "runtime_final_handoff_blocked_without_activation";
  code: StreamGiftLedgerLiveActivationRuntimeFinalHandoffBlockedCode200T;
  blockedReason: string;
  runtimeFinalHandoffPrepared: false;
  liveActivationRuntimePackageApprovedNow: false;
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
  safety: StreamGiftLedgerLiveActivationRuntimeFinalHandoffSafety200T;
}>;

export type StreamGiftLedgerLiveActivationRuntimeFinalHandoffEnvelope200T = Readonly<{
  contract: "stream.gift.live_activation.runtime_final_handoff.v1";
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_FINAL_HANDOFF_200T_VERSION;
  previousStageRequired: "200S_runtime_approval_verification_clean";
  requiredBindingKinds: readonly StreamGiftLedgerLiveActivationRuntimeFinalHandoffKind200T[];
  verifiedBindingKinds: readonly StreamGiftLedgerLiveActivationRuntimeFinalHandoffKind200T[];
  referenceLabelCount: number;
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsProviderSeparated: true;
  airwallexMerchantRailsProviderSeparated: true;
  runtimeFinalHandoffPrepared: true;
  runtimeFinalHandoffOnlyNoExecution: true;
  liveActivationRuntimePackageApprovedNow: false;
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
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  nextStage: "future_live_activation_runtime_execution_package_requires_new_exact_owner_approval";
}>;

export type StreamGiftLedgerLiveActivationRuntimeFinalHandoffPrepared200T = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_FINAL_HANDOFF_200T_VERSION;
  status: "runtime_final_handoff_prepared_without_activation";
  envelope: StreamGiftLedgerLiveActivationRuntimeFinalHandoffEnvelope200T;
  runtimeFinalHandoffPrepared: true;
  liveActivationRuntimePackageApprovedNow: false;
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
  safety: StreamGiftLedgerLiveActivationRuntimeFinalHandoffSafety200T;
}>;

export type StreamGiftLedgerLiveActivationRuntimeFinalHandoffResult200T =
  | StreamGiftLedgerLiveActivationRuntimeFinalHandoffPrepared200T
  | StreamGiftLedgerLiveActivationRuntimeFinalHandoffBlocked200T;

export type StreamGiftLedgerLiveActivationRuntimeFinalHandoffReadiness200T = Readonly<{
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_FINAL_HANDOFF_200T_VERSION;
  status: "ready_for_runtime_final_handoff_without_activation";
  previousStageRequired: "200S_runtime_approval_verification_clean";
  backendReadinessPercent: 100;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  nextStage: "future_live_activation_runtime_execution_package_requires_new_exact_owner_approval";
  safety: StreamGiftLedgerLiveActivationRuntimeFinalHandoffSafety200T;
}>;
