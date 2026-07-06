export const STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-200C" as const;

export type StreamGiftLedgerLiveProviderBindingKind200C =
  | "accept_payments_provider"
  | "creator_payout_provider"
  | "google_billing_diamonds_provider"
  | "airwallex_merchant_rails_provider";

export type StreamGiftLedgerLiveProviderName200C = "google_billing" | "airwallex" | "wallet" | "bank" | "manual_review" | "other";

export type StreamGiftLedgerLiveProviderConfigScope200C = "accept_payments" | "creator_payout" | "diamonds_topup" | "merchant_rails" | "manual_review";

export type StreamGiftLedgerLiveProviderBindingDryRunItem200C = Readonly<{
  bindingKind: StreamGiftLedgerLiveProviderBindingKind200C;
  providerName: StreamGiftLedgerLiveProviderName200C;
  configReferenceLabel: string;
  ownerAttestation: "server_side_config_exists" | "pending_owner_fill";
  configScope: StreamGiftLedgerLiveProviderConfigScope200C;
  dryRunExpectation: "reference_label_resolves_server_side" | "pending_owner_fill";
}>;

export type StreamGiftLedgerLiveProviderBindingDryRunSafety200C = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawProviderResponseAccepted: false;
  providerBindingExecuted: false;
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
  dryRunOnly: true;
  requiresSeparate200DProviderBindingActivation: true;
  referenceLabelsOnly: true;
}>;

export type StreamGiftLedgerLiveProviderBindingDryRunInput200C = Readonly<{
  ownerApproval?: string;
  dryRunMode?: "live_provider_binding_dry_run" | "disabled";
  acknowledgedProviderReferenceLabelsStage?: "200B_provider_reference_labels_verified" | "disabled";
  bindingItems: readonly StreamGiftLedgerLiveProviderBindingDryRunItem200C[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerLiveProviderBindingDryRunBlockedCode200C =
  | "owner_approval_required"
  | "dry_run_mode_disabled"
  | "provider_reference_labels_ack_required"
  | "binding_items_required"
  | "missing_required_binding_kind"
  | "invalid_reference_label"
  | "invalid_provider_scope_pair"
  | "owner_attestation_required"
  | "dry_run_expectation_required"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerLiveProviderBindingDryRunBlocked200C = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_VERSION;
  status: "live_provider_binding_dry_run_blocked_without_provider_call";
  code: StreamGiftLedgerLiveProviderBindingDryRunBlockedCode200C;
  blockedReason: string;
  dryRunPrepared: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  runtimeEnabled: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerLiveProviderBindingDryRunSafety200C;
}>;

export type StreamGiftLedgerLiveProviderBindingDryRunEnvelope200C = Readonly<{
  contract: "stream.gift.live_provider_binding.dry_run.v1";
  version: typeof STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_VERSION;
  previousStageRequired: "200B_provider_reference_labels_verified";
  requiredBindingKinds: readonly StreamGiftLedgerLiveProviderBindingKind200C[];
  dryRunBindingKinds: readonly StreamGiftLedgerLiveProviderBindingKind200C[];
  referenceLabelCount: number;
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsProviderSeparated: true;
  airwallexMerchantRailsProviderSeparated: true;
  referenceLabelsResolveServerSideAttested: boolean;
  pendingOwnerFillCount: number;
  rawSecretsIncluded: false;
  envFileRead: false;
  envValueRead: false;
  providerBindingDryRunPrepared: true;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  nextStage: "200D_controlled_provider_binding_activation_request";
}>;

export type StreamGiftLedgerLiveProviderBindingDryRunPrepared200C = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_VERSION;
  status: "live_provider_binding_dry_run_prepared_without_provider_call";
  envelope: StreamGiftLedgerLiveProviderBindingDryRunEnvelope200C;
  dryRunPrepared: true;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  runtimeEnabled: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerLiveProviderBindingDryRunSafety200C;
}>;

export type StreamGiftLedgerLiveProviderBindingDryRunResult200C =
  | StreamGiftLedgerLiveProviderBindingDryRunPrepared200C
  | StreamGiftLedgerLiveProviderBindingDryRunBlocked200C;

export type StreamGiftLedgerLiveProviderBindingDryRunReadiness200C = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_VERSION;
  status: "ready_for_live_provider_binding_dry_run";
  previousStageRequired: "200B_provider_reference_labels_verified";
  backendReadinessPercent: 100;
  runtimeEnabledNow: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  nextStage: "200D_controlled_provider_binding_activation_request";
  safety: StreamGiftLedgerLiveProviderBindingDryRunSafety200C;
}>;

export type StreamGiftLedgerControlledProviderBindingActivationNextRequest200C = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_VERSION;
  status: "next_stage_requires_controlled_provider_binding_activation_approval";
  nextStage: "200D_controlled_provider_binding_activation_request";
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  forbiddenUntil200D: readonly string[];
}>;
