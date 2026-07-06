export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-200D" as const;

export type StreamGiftLedgerControlledProviderBindingKind200D =
  | "accept_payments_provider"
  | "creator_payout_provider"
  | "google_billing_diamonds_provider"
  | "airwallex_merchant_rails_provider";

export type StreamGiftLedgerControlledProviderBindingProviderName200D = "google_billing" | "airwallex" | "wallet" | "bank" | "manual_review" | "other";

export type StreamGiftLedgerControlledProviderBindingConfigScope200D = "accept_payments" | "creator_payout" | "diamonds_topup" | "merchant_rails" | "manual_review";

export type StreamGiftLedgerControlledProviderBindingActivationRequestItem200D = Readonly<{
  bindingKind: StreamGiftLedgerControlledProviderBindingKind200D;
  providerName: StreamGiftLedgerControlledProviderBindingProviderName200D;
  configReferenceLabel: string;
  configScope: StreamGiftLedgerControlledProviderBindingConfigScope200D;
  ownerAttestation: "server_side_config_exists" | "pending_owner_fill";
  dryRunStage: "200C_live_provider_binding_dry_run_prepared" | "pending_owner_fill";
  activationIntent: "request_activation_only" | "pending_owner_fill";
}>;

export type StreamGiftLedgerControlledProviderBindingActivationRequestSafety200D = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderResponseAccepted: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  walletMutationExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecutionExecuted: false;
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
  activationRequestOnly: true;
  requiresSeparate200EProviderRuntimeReadiness: true;
  referenceLabelsOnly: true;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationRequestInput200D = Readonly<{
  ownerApproval?: string;
  activationMode?: "controlled_provider_binding_activation_request" | "disabled";
  acknowledgedDryRunStage?: "200C_live_provider_binding_dry_run_prepared" | "disabled";
  bindingItems: readonly StreamGiftLedgerControlledProviderBindingActivationRequestItem200D[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationRequestBlockedCode200D =
  | "owner_approval_required"
  | "activation_mode_disabled"
  | "dry_run_ack_required"
  | "binding_items_required"
  | "missing_required_binding_kind"
  | "invalid_reference_label"
  | "invalid_provider_scope_pair"
  | "owner_attestation_required"
  | "dry_run_stage_required"
  | "activation_intent_required"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerControlledProviderBindingActivationRequestBlocked200D = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_VERSION;
  status: "controlled_provider_binding_activation_request_blocked_without_runtime_enablement";
  code: StreamGiftLedgerControlledProviderBindingActivationRequestBlockedCode200D;
  blockedReason: string;
  activationRequestPrepared: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  runtimeEnabled: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerControlledProviderBindingActivationRequestSafety200D;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationRequestEnvelope200D = Readonly<{
  contract: "stream.gift.provider_binding.activation_request.v1";
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_VERSION;
  previousStageRequired: "200C_live_provider_binding_dry_run_prepared";
  requiredBindingKinds: readonly StreamGiftLedgerControlledProviderBindingKind200D[];
  requestedBindingKinds: readonly StreamGiftLedgerControlledProviderBindingKind200D[];
  referenceLabelCount: number;
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsProviderSeparated: true;
  airwallexMerchantRailsProviderSeparated: true;
  serverSideConfigAttested: boolean;
  activationIntentRequestOnly: true;
  pendingOwnerFillCount: number;
  rawSecretsIncluded: false;
  envFileRead: false;
  envValueRead: false;
  activationRequestPrepared: true;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  runtimeEnabled: false;
  fakeSuccessWritten: false;
  nextStage: "200E_provider_runtime_readiness_guard";
}>;

export type StreamGiftLedgerControlledProviderBindingActivationRequestPrepared200D = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_VERSION;
  status: "controlled_provider_binding_activation_request_prepared_without_runtime_enablement";
  envelope: StreamGiftLedgerControlledProviderBindingActivationRequestEnvelope200D;
  activationRequestPrepared: true;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  runtimeEnabled: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerControlledProviderBindingActivationRequestSafety200D;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationRequestResult200D =
  | StreamGiftLedgerControlledProviderBindingActivationRequestPrepared200D
  | StreamGiftLedgerControlledProviderBindingActivationRequestBlocked200D;

export type StreamGiftLedgerControlledProviderBindingActivationRequestReadiness200D = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_VERSION;
  status: "ready_for_controlled_provider_binding_activation_request";
  previousStageRequired: "200C_live_provider_binding_dry_run_prepared";
  backendReadinessPercent: 100;
  runtimeEnabledNow: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  nextStage: "200E_provider_runtime_readiness_guard";
  safety: StreamGiftLedgerControlledProviderBindingActivationRequestSafety200D;
}>;

export type StreamGiftLedgerProviderRuntimeReadinessNextRequest200D = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_VERSION;
  status: "next_stage_requires_provider_runtime_readiness_guard";
  nextStage: "200E_provider_runtime_readiness_guard";
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  forbiddenUntil200E: readonly string[];
}>;
