export const STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-200E" as const;

export type StreamGiftLedgerProviderRuntimeReadinessBindingKind200E =
  | "accept_payments_provider"
  | "creator_payout_provider"
  | "google_billing_diamonds_provider"
  | "airwallex_merchant_rails_provider";

export type StreamGiftLedgerProviderRuntimeReadinessProviderName200E = "google_billing" | "airwallex" | "wallet" | "bank" | "manual_review" | "other";

export type StreamGiftLedgerProviderRuntimeReadinessConfigScope200E = "accept_payments" | "creator_payout" | "diamonds_topup" | "merchant_rails" | "manual_review";

export type StreamGiftLedgerProviderRuntimeReadinessItem200E = Readonly<{
  bindingKind: StreamGiftLedgerProviderRuntimeReadinessBindingKind200E;
  providerName: StreamGiftLedgerProviderRuntimeReadinessProviderName200E;
  configReferenceLabel: string;
  configScope: StreamGiftLedgerProviderRuntimeReadinessConfigScope200E;
  ownerAttestation: "server_side_config_exists" | "pending_owner_fill";
  activationRequestStage: "200D_controlled_provider_binding_activation_request_prepared" | "pending_owner_fill";
  runtimeReadiness: "ready_for_controlled_activation" | "pending_owner_fill";
  liveCallMode: "disabled_until_separate_activation" | "pending_owner_fill";
  rollbackPlan: "ready" | "pending_owner_fill";
}>;

export type StreamGiftLedgerProviderRuntimeReadinessSafety200E = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderResponseAccepted: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerRuntimeReadinessGuardOnly: true;
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
  requiresSeparate200FControlledActivationDryRun: true;
  referenceLabelsOnly: true;
}>;

export type StreamGiftLedgerProviderRuntimeReadinessInput200E = Readonly<{
  ownerApproval?: string;
  readinessMode?: "provider_runtime_readiness_guard" | "disabled";
  acknowledgedActivationRequestStage?: "200D_controlled_provider_binding_activation_request_prepared" | "disabled";
  bindingItems: readonly StreamGiftLedgerProviderRuntimeReadinessItem200E[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerProviderRuntimeReadinessBlockedCode200E =
  | "owner_approval_required"
  | "readiness_mode_disabled"
  | "activation_request_stage_required"
  | "binding_items_required"
  | "missing_required_binding_kind"
  | "invalid_reference_label"
  | "invalid_provider_scope_pair"
  | "owner_attestation_required"
  | "activation_request_stage_item_required"
  | "runtime_readiness_required"
  | "live_call_mode_must_remain_disabled"
  | "rollback_plan_required"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerProviderRuntimeReadinessBlocked200E = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_VERSION;
  status: "provider_runtime_readiness_blocked_without_runtime_enablement";
  code: StreamGiftLedgerProviderRuntimeReadinessBlockedCode200E;
  blockedReason: string;
  runtimeReadinessGuardPassed: false;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerProviderRuntimeReadinessSafety200E;
}>;

export type StreamGiftLedgerProviderRuntimeReadinessEnvelope200E = Readonly<{
  contract: "stream.gift.provider_runtime.readiness_guard.v1";
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_VERSION;
  previousStageRequired: "200D_controlled_provider_binding_activation_request_prepared";
  requiredBindingKinds: readonly StreamGiftLedgerProviderRuntimeReadinessBindingKind200E[];
  checkedBindingKinds: readonly StreamGiftLedgerProviderRuntimeReadinessBindingKind200E[];
  referenceLabelCount: number;
  runtimeReadinessGuardPassed: true;
  readyForControlledActivationDryRun: true;
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
  nextStage: "200F_controlled_provider_binding_activation_dry_run";
}>;

export type StreamGiftLedgerProviderRuntimeReadinessPassed200E = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_VERSION;
  status: "provider_runtime_readiness_guard_passed_without_runtime_enablement";
  envelope: StreamGiftLedgerProviderRuntimeReadinessEnvelope200E;
  runtimeReadinessGuardPassed: true;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerProviderRuntimeReadinessSafety200E;
}>;

export type StreamGiftLedgerProviderRuntimeReadinessResult200E =
  | StreamGiftLedgerProviderRuntimeReadinessPassed200E
  | StreamGiftLedgerProviderRuntimeReadinessBlocked200E;

export type StreamGiftLedgerProviderRuntimeReadinessStatus200E = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_VERSION;
  status: "ready_for_provider_runtime_readiness_guard";
  previousStageRequired: "200D_controlled_provider_binding_activation_request_prepared";
  backendReadinessPercent: 100;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  nextStage: "200F_controlled_provider_binding_activation_dry_run";
  safety: StreamGiftLedgerProviderRuntimeReadinessSafety200E;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationDryRunNextRequest200E = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_VERSION;
  status: "next_stage_requires_controlled_provider_binding_activation_dry_run";
  nextStage: "200F_controlled_provider_binding_activation_dry_run";
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  forbiddenUntil200F: readonly string[];
}>;
