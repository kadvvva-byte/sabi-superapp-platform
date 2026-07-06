export const STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-200B" as const;

export type StreamGiftLedgerProviderReferenceLabelKind200B =
  | "accept_payments_provider"
  | "creator_payout_provider"
  | "google_billing_diamonds_provider"
  | "airwallex_merchant_rails_provider";

export type StreamGiftLedgerProviderName200B = "google_billing" | "airwallex" | "wallet" | "bank" | "manual_review" | "other";

export type StreamGiftLedgerProviderReferenceLabelVerificationItem200B = Readonly<{
  bindingKind: StreamGiftLedgerProviderReferenceLabelKind200B;
  providerName: StreamGiftLedgerProviderName200B;
  configReferenceLabel: string;
  ownerAttestation: "server_side_config_exists" | "pending_owner_fill";
  configScope: "accept_payments" | "creator_payout" | "diamonds_topup" | "merchant_rails" | "manual_review";
}>;

export type StreamGiftLedgerProviderReferenceLabelsVerificationSafety200B = Readonly<{
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
  requiresSeparate200CLiveBindingDryRun: true;
  referenceLabelsOnly: true;
}>;

export type StreamGiftLedgerProviderReferenceLabelsVerificationInput200B = Readonly<{
  ownerApproval?: string;
  verificationMode?: "owner_filled_provider_reference_labels_verification" | "disabled";
  acknowledgedControlledApprovalStage?: "200A_controlled_live_provider_binding_approval_prepared" | "disabled";
  labelItems: readonly StreamGiftLedgerProviderReferenceLabelVerificationItem200B[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerProviderReferenceLabelsVerificationBlockedCode200B =
  | "owner_approval_required"
  | "verification_mode_disabled"
  | "controlled_approval_ack_required"
  | "label_items_required"
  | "missing_required_binding_kind"
  | "invalid_reference_label"
  | "invalid_provider_scope_pair"
  | "owner_attestation_required"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerProviderReferenceLabelsVerificationBlocked200B = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_VERSION;
  status: "provider_reference_labels_verification_blocked_without_provider_binding";
  code: StreamGiftLedgerProviderReferenceLabelsVerificationBlockedCode200B;
  blockedReason: string;
  labelsVerified: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  runtimeEnabled: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerProviderReferenceLabelsVerificationSafety200B;
}>;

export type StreamGiftLedgerProviderReferenceLabelsVerificationEnvelope200B = Readonly<{
  contract: "stream.gift.provider_reference_labels.verification.v1";
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_VERSION;
  previousStageRequired: "200A_controlled_live_provider_binding_approval_prepared";
  requiredBindingKinds: readonly StreamGiftLedgerProviderReferenceLabelKind200B[];
  verifiedBindingKinds: readonly StreamGiftLedgerProviderReferenceLabelKind200B[];
  referenceLabelCount: number;
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsProviderSeparated: true;
  airwallexMerchantRailsProviderSeparated: true;
  serverSideConfigAttested: boolean;
  pendingOwnerFillCount: number;
  rawSecretsIncluded: false;
  envFileRead: false;
  envValueRead: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  nextStage: "200C_live_provider_binding_dry_run";
}>;

export type StreamGiftLedgerProviderReferenceLabelsVerificationVerified200B = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_VERSION;
  status: "provider_reference_labels_verified_without_provider_binding";
  envelope: StreamGiftLedgerProviderReferenceLabelsVerificationEnvelope200B;
  labelsVerified: true;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  runtimeEnabled: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerProviderReferenceLabelsVerificationSafety200B;
}>;

export type StreamGiftLedgerProviderReferenceLabelsVerificationResult200B =
  | StreamGiftLedgerProviderReferenceLabelsVerificationVerified200B
  | StreamGiftLedgerProviderReferenceLabelsVerificationBlocked200B;

export type StreamGiftLedgerProviderReferenceLabelsVerificationReadiness200B = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_VERSION;
  status: "ready_for_owner_filled_provider_reference_labels_verification";
  previousStageRequired: "200A_controlled_live_provider_binding_approval_prepared";
  backendReadinessPercent: 100;
  runtimeEnabledNow: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  nextStage: "200C_live_provider_binding_dry_run";
  safety: StreamGiftLedgerProviderReferenceLabelsVerificationSafety200B;
}>;

export type StreamGiftLedgerLiveProviderBindingDryRunNextRequest200B = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_VERSION;
  status: "next_stage_requires_live_provider_binding_dry_run_approval";
  nextStage: "200C_live_provider_binding_dry_run";
  providerBindingExecuted: false;
  forbiddenUntil200C: readonly string[];
}>;
