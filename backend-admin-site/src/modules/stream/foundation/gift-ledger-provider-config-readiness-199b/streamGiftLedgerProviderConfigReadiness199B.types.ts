export const STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-199B" as const;

export type StreamGiftLedgerProviderConfigKind199B =
  | "accept_payments"
  | "creator_payout"
  | "google_billing_diamonds"
  | "airwallex_merchant_rails";

export type StreamGiftLedgerProviderName199B =
  | "google_billing"
  | "airwallex"
  | "bank"
  | "wallet"
  | "manual_review"
  | "other";

export type StreamGiftLedgerProviderConfigReferenceLabel199B = Readonly<{
  providerKind: StreamGiftLedgerProviderConfigKind199B;
  providerName: StreamGiftLedgerProviderName199B;
  envReferenceLabel: string;
  purpose: string;
  serverSideOnly: true;
}>;

export type StreamGiftLedgerProviderConfigReadinessAttestation199B = Readonly<{
  providerKind: StreamGiftLedgerProviderConfigKind199B;
  envReferenceLabel: string;
  ownerConfirmsReferenceLabelExists: true;
  ownerConfirmsNoRawSecretShared: true;
  ownerConfirmsServerSideOnly: true;
}>;

export type StreamGiftLedgerProviderConfigReadinessSafety199B = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  providerConfigPresenceLookupAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  providerBindingAllowedNow: false;
  providerLiveCallAllowedNow: false;
  providerPayoutCallAllowedNow: false;
  walletMutationAllowedNow: false;
  paymentCaptureAllowedNow: false;
  payoutExecutionAllowedNow: false;
  dbWriteAllowedNow: false;
  migrationAllowedNow: false;
  realtimeEmitAllowedNow: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSendSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
  referenceLabelsOnly: true;
  separateExactOwnerApprovalRequiredFor199C: true;
}>;

export type StreamGiftLedgerProviderConfigReadinessInput199B = Readonly<{
  ownerApproval?: string;
  configMode?: "reference_label_readiness" | "disabled";
  requestedBundle?: "stream_gifts_provider_config_readiness" | "disabled";
  referenceLabels?: readonly StreamGiftLedgerProviderConfigReferenceLabel199B[];
  attestations?: readonly StreamGiftLedgerProviderConfigReadinessAttestation199B[];
}>;

export type StreamGiftLedgerProviderConfigReadinessBlockedCode199B =
  | "owner_approval_required"
  | "config_mode_disabled"
  | "reference_labels_required"
  | "missing_required_provider_kind"
  | "invalid_reference_label"
  | "attestation_required"
  | "raw_secret_or_provider_value_rejected"
  | "unsafe_runtime_flag";

export type StreamGiftLedgerProviderConfigReadinessBlocked199B = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_VERSION;
  status: "provider_config_readiness_blocked";
  code: StreamGiftLedgerProviderConfigReadinessBlockedCode199B;
  blockedReason: string;
  providerConfigReadyForLiveCalls: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  payoutExecutionAllowed: false;
  safety: StreamGiftLedgerProviderConfigReadinessSafety199B;
}>;

export type StreamGiftLedgerProviderConfigReadinessEnvelope199B = Readonly<{
  contract: "stream.gift.provider_config.reference_labels_readiness.v1";
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_VERSION;
  requestedBundle: "stream_gifts_provider_config_readiness";
  referenceLabelCount: number;
  attestationCount: number;
  requiredProviderKinds: readonly StreamGiftLedgerProviderConfigKind199B[];
  providedProviderKinds: readonly StreamGiftLedgerProviderConfigKind199B[];
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsSeparated: true;
  airwallexMerchantRailsSeparated: true;
  referenceLabelsOnly: true;
  rawSecretsIncluded: false;
  providerConfigPresenceLookupExecuted: false;
  providerConfigReadyForLiveCalls: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  payoutExecutionAllowed: false;
  walletMutationAllowed: false;
  nextStage: "199C_payment_authorization_adapter_boundary";
}>;

export type StreamGiftLedgerProviderConfigReadinessPrepared199B = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_VERSION;
  status: "provider_config_readiness_prepared_reference_labels_only";
  code: "provider_config_requires_199c_adapter_boundary";
  envelope: StreamGiftLedgerProviderConfigReadinessEnvelope199B;
  providerConfigReadyForLiveCalls: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  payoutExecutionAllowed: false;
  safety: StreamGiftLedgerProviderConfigReadinessSafety199B;
}>;

export type StreamGiftLedgerProviderConfigReadiness199B = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_VERSION;
  status: "ready_for_provider_config_reference_label_readiness_only";
  requiredPreviousStage: "199A_exact_owner_approval_clean";
  currentStage: "199B_provider_config_readiness_reference_labels_only";
  nextStage: "199C_payment_authorization_adapter_boundary";
  providerConfigReadyForLiveCalls: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  payoutExecutionAllowed: false;
  safety: StreamGiftLedgerProviderConfigReadinessSafety199B;
}>;

export type StreamGiftLedgerProviderConfigReadinessResult199B =
  | StreamGiftLedgerProviderConfigReadinessPrepared199B
  | StreamGiftLedgerProviderConfigReadinessBlocked199B;
