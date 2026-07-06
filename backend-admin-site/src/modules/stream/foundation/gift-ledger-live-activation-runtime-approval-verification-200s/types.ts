export const STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_200S_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-200S" as const;

export type StreamGiftLedgerLiveActivationRuntimeApprovalVerificationKind200S =
  | "accept_payments_provider"
  | "creator_payout_provider"
  | "google_billing_diamonds_provider"
  | "airwallex_merchant_rails_provider";

export type StreamGiftLedgerLiveActivationRuntimeApprovalVerificationProviderName200S =
  | "google_billing"
  | "airwallex"
  | "wallet"
  | "bank"
  | "manual_review"
  | "other";

export type StreamGiftLedgerLiveActivationRuntimeApprovalVerificationConfigScope200S =
  | "accept_payments"
  | "creator_payout"
  | "diamonds_topup"
  | "merchant_rails"
  | "manual_review";

export type StreamGiftLedgerLiveActivationRuntimeApprovalVerificationItem200S = Readonly<{
  bindingKind: StreamGiftLedgerLiveActivationRuntimeApprovalVerificationKind200S;
  providerName: StreamGiftLedgerLiveActivationRuntimeApprovalVerificationProviderName200S;
  configReferenceLabel: string;
  configScope: StreamGiftLedgerLiveActivationRuntimeApprovalVerificationConfigScope200S;
  previousApprovalRequestStage: "200R_runtime_approval_request_clean" | "pending_owner_fill";
  runtimePackageVerificationMode: "verification_only_no_execution" | "pending_owner_fill";
  exactOwnerApprovalRequired: "required_before_runtime_package_final_handoff" | "pending_owner_fill";
  activationExecutionMode: "not_executed_verification_only" | "pending_owner_fill";
  providerBindingMode: "disabled_no_binding" | "pending_owner_fill";
  providerRuntimeMode: "disabled_no_runtime_enablement" | "pending_owner_fill";
  liveCallMode: "disabled_no_provider_call" | "pending_owner_fill";
  paymentRuntimeMode: "disabled_no_payment_capture" | "pending_owner_fill";
  payoutRuntimeMode: "disabled_no_payout_execution" | "pending_owner_fill";
  walletMutationMode: "disabled_no_wallet_mutation" | "pending_owner_fill";
  runtimeCutoverMode: "disabled_no_cutover" | "pending_owner_fill";
  rollbackPlan: "ready" | "pending_owner_fill";
  auditApprovalRequestClosure: "complete" | "pending_owner_fill";
}>;

export type StreamGiftLedgerLiveActivationRuntimeApprovalVerificationSafety200S = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderResponseAccepted: false;
  previous200RRuntimeApprovalRequestClean: true;
  runtimePackageApprovalVerificationOnly: true;
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
  futureRuntimeFinalHandoffRequiresSeparateExactOwnerApproval: true;
  referenceLabelsOnly: true;
}>;

export type StreamGiftLedgerLiveActivationRuntimeApprovalVerificationInput200S = Readonly<{
  ownerApproval?: string;
  runtimeApprovalVerificationMode?: "verification_only" | "disabled";
  acknowledgedApprovalRequestStage?: "200R_runtime_approval_request_clean" | "disabled";
  bindingItems: readonly StreamGiftLedgerLiveActivationRuntimeApprovalVerificationItem200S[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerLiveActivationRuntimeApprovalVerificationBlockedCode200S =
  | "owner_approval_required"
  | "runtime_approval_verification_mode_disabled"
  | "previous_200r_approval_request_required"
  | "binding_items_required"
  | "missing_required_binding_kind"
  | "invalid_reference_label"
  | "invalid_provider_scope_pair"
  | "previous_approval_request_item_stage_required"
  | "runtime_package_verification_mode_must_remain_no_execution"
  | "exact_owner_approval_required_before_final_handoff"
  | "activation_execution_mode_must_remain_not_executed"
  | "provider_binding_mode_must_remain_disabled"
  | "provider_runtime_mode_must_remain_disabled"
  | "live_call_mode_must_remain_disabled"
  | "payment_runtime_mode_must_remain_disabled"
  | "payout_runtime_mode_must_remain_disabled"
  | "wallet_mutation_mode_must_remain_disabled"
  | "runtime_cutover_mode_must_remain_disabled"
  | "rollback_plan_required"
  | "audit_approval_request_closure_required"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerLiveActivationRuntimeApprovalVerificationBlocked200S = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_200S_VERSION;
  status: "runtime_approval_verification_blocked_without_activation";
  code: StreamGiftLedgerLiveActivationRuntimeApprovalVerificationBlockedCode200S;
  blockedReason: string;
  runtimeApprovalVerificationPrepared: false;
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
  safety: StreamGiftLedgerLiveActivationRuntimeApprovalVerificationSafety200S;
}>;

export type StreamGiftLedgerLiveActivationRuntimeApprovalVerificationEnvelope200S = Readonly<{
  contract: "stream.gift.live_activation.runtime_approval_verification.v1";
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_200S_VERSION;
  previousStageRequired: "200R_runtime_approval_request_clean";
  requiredBindingKinds: readonly StreamGiftLedgerLiveActivationRuntimeApprovalVerificationKind200S[];
  verifiedBindingKinds: readonly StreamGiftLedgerLiveActivationRuntimeApprovalVerificationKind200S[];
  referenceLabelCount: number;
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsProviderSeparated: true;
  airwallexMerchantRailsProviderSeparated: true;
  runtimeApprovalVerificationPrepared: true;
  runtimeApprovalVerificationOnlyNoExecution: true;
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
  auditApprovalRequestClosureComplete: boolean;
  futureRuntimeFinalHandoffRequiresSeparateExactOwnerApproval: true;
  nextStage: "200T_live_activation_runtime_package_final_handoff";
}>;

export type StreamGiftLedgerLiveActivationRuntimeApprovalVerificationPrepared200S = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_200S_VERSION;
  status: "runtime_approval_verification_prepared_without_activation";
  envelope: StreamGiftLedgerLiveActivationRuntimeApprovalVerificationEnvelope200S;
  runtimeApprovalVerificationPrepared: true;
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
  safety: StreamGiftLedgerLiveActivationRuntimeApprovalVerificationSafety200S;
}>;

export type StreamGiftLedgerLiveActivationRuntimeApprovalVerificationResult200S =
  | StreamGiftLedgerLiveActivationRuntimeApprovalVerificationPrepared200S
  | StreamGiftLedgerLiveActivationRuntimeApprovalVerificationBlocked200S;

export type StreamGiftLedgerLiveActivationRuntimeApprovalVerificationReadiness200S = Readonly<{
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_200S_VERSION;
  status: "ready_for_runtime_approval_verification_without_activation";
  previousStageRequired: "200R_runtime_approval_request_clean";
  backendReadinessPercent: 100;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  nextStage: "200T_live_activation_runtime_package_final_handoff";
  safety: StreamGiftLedgerLiveActivationRuntimeApprovalVerificationSafety200S;
}>;
