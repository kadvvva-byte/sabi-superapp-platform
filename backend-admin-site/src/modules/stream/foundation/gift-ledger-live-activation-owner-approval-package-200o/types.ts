export const STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-200O" as const;

export type StreamGiftLedgerLiveActivationOwnerApprovalPackageKind200O =
  | "accept_payments_provider"
  | "creator_payout_provider"
  | "google_billing_diamonds_provider"
  | "airwallex_merchant_rails_provider";

export type StreamGiftLedgerLiveActivationOwnerApprovalPackageProviderName200O =
  | "google_billing"
  | "airwallex"
  | "wallet"
  | "bank"
  | "manual_review"
  | "other";

export type StreamGiftLedgerLiveActivationOwnerApprovalPackageConfigScope200O =
  | "accept_payments"
  | "creator_payout"
  | "diamonds_topup"
  | "merchant_rails"
  | "manual_review";

export type StreamGiftLedgerLiveActivationOwnerApprovalPackageItem200O = Readonly<{
  bindingKind: StreamGiftLedgerLiveActivationOwnerApprovalPackageKind200O;
  providerName: StreamGiftLedgerLiveActivationOwnerApprovalPackageProviderName200O;
  configReferenceLabel: string;
  configScope: StreamGiftLedgerLiveActivationOwnerApprovalPackageConfigScope200O;
  previousFinalHandoffStage: "200N_separate_exact_live_provider_binding_activation_execution_final_handoff_prepared" | "pending_owner_fill";
  approvalPackageMode: "exact_owner_approval_package_only_no_execution" | "pending_owner_fill";
  activationExecutionMode: "not_executed_requires_separate_execution_approval" | "pending_owner_fill";
  providerBindingMode: "disabled_until_separate_execution_step" | "pending_owner_fill";
  liveCallMode: "disabled_no_provider_call" | "pending_owner_fill";
  paymentRuntimeMode: "disabled_no_payment_capture" | "pending_owner_fill";
  payoutRuntimeMode: "disabled_no_payout_execution" | "pending_owner_fill";
  walletMutationMode: "disabled_no_wallet_mutation" | "pending_owner_fill";
  runtimeCutoverMode: "disabled_until_separate_execution_step" | "pending_owner_fill";
  rollbackPlan: "ready" | "pending_owner_fill";
  ownerRiskAcknowledgement: "required_for_future_execution" | "pending_owner_fill";
  auditPackageClosure: "complete" | "pending_owner_fill";
}>;

export type StreamGiftLedgerLiveActivationOwnerApprovalPackageSafety200O = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderResponseAccepted: false;
  previous200NFinalHandoffPrepared: true;
  exactOwnerApprovalPackageOnly: true;
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
  requiresSeparateExecutionStepAfterThisPackage: true;
  referenceLabelsOnly: true;
}>;

export type StreamGiftLedgerLiveActivationOwnerApprovalPackageInput200O = Readonly<{
  ownerApproval?: string;
  approvalPackageMode?: "exact_owner_approval_package" | "disabled";
  acknowledgedFinalHandoffStage?: "200N_separate_exact_live_provider_binding_activation_execution_final_handoff_prepared" | "disabled";
  bindingItems: readonly StreamGiftLedgerLiveActivationOwnerApprovalPackageItem200O[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerLiveActivationOwnerApprovalPackageBlockedCode200O =
  | "owner_approval_required"
  | "approval_package_mode_disabled"
  | "previous_final_handoff_stage_required"
  | "binding_items_required"
  | "missing_required_binding_kind"
  | "invalid_reference_label"
  | "invalid_provider_scope_pair"
  | "previous_final_handoff_item_stage_required"
  | "approval_package_mode_must_remain_package_only"
  | "provider_binding_mode_must_remain_disabled"
  | "activation_execution_mode_must_remain_not_executed"
  | "live_call_mode_must_remain_disabled"
  | "payment_runtime_mode_must_remain_disabled"
  | "payout_runtime_mode_must_remain_disabled"
  | "wallet_mutation_mode_must_remain_disabled"
  | "runtime_cutover_mode_must_remain_disabled"
  | "rollback_plan_required"
  | "owner_risk_acknowledgement_required"
  | "audit_package_closure_required"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerLiveActivationOwnerApprovalPackageBlocked200O = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_VERSION;
  status: "exact_owner_approval_package_blocked_without_activation";
  code: StreamGiftLedgerLiveActivationOwnerApprovalPackageBlockedCode200O;
  blockedReason: string;
  approvalPackagePrepared: false;
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
  safety: StreamGiftLedgerLiveActivationOwnerApprovalPackageSafety200O;
}>;

export type StreamGiftLedgerLiveActivationOwnerApprovalPackageEnvelope200O = Readonly<{
  contract: "stream.gift.live_activation.exact_owner_approval_package.v1";
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_VERSION;
  previousStageRequired: "200N_separate_exact_live_provider_binding_activation_execution_final_handoff_prepared";
  requiredBindingKinds: readonly StreamGiftLedgerLiveActivationOwnerApprovalPackageKind200O[];
  verifiedBindingKinds: readonly StreamGiftLedgerLiveActivationOwnerApprovalPackageKind200O[];
  referenceLabelCount: number;
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsProviderSeparated: true;
  airwallexMerchantRailsProviderSeparated: true;
  exactOwnerApprovalPackagePrepared: true;
  packageOnlyNoExecution: true;
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
  ownerRiskAcknowledgementRequired: boolean;
  auditPackageClosureComplete: boolean;
  requiresSeparateExecutionStepAfterThisPackage: true;
  nextStage: "200P_separate_exact_live_provider_binding_activation_execution_pre_execution_dry_run";
}>;

export type StreamGiftLedgerLiveActivationOwnerApprovalPackagePrepared200O = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_VERSION;
  status: "exact_owner_approval_package_prepared_without_activation";
  envelope: StreamGiftLedgerLiveActivationOwnerApprovalPackageEnvelope200O;
  approvalPackagePrepared: true;
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
  safety: StreamGiftLedgerLiveActivationOwnerApprovalPackageSafety200O;
}>;

export type StreamGiftLedgerLiveActivationOwnerApprovalPackageResult200O =
  | StreamGiftLedgerLiveActivationOwnerApprovalPackagePrepared200O
  | StreamGiftLedgerLiveActivationOwnerApprovalPackageBlocked200O;

export type StreamGiftLedgerLiveActivationOwnerApprovalPackageReadiness200O = Readonly<{
  version: typeof STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_VERSION;
  status: "ready_for_exact_owner_approval_package_without_activation";
  previousStageRequired: "200N_separate_exact_live_provider_binding_activation_execution_final_handoff_prepared";
  backendReadinessPercent: 100;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  nextStage: "200P_separate_exact_live_provider_binding_activation_execution_pre_execution_dry_run";
  safety: StreamGiftLedgerLiveActivationOwnerApprovalPackageSafety200O;
}>;
