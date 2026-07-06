export const STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-200A" as const;

export type StreamGiftLedgerControlledLiveProviderBindingKind200A =
  | "accept_payments_provider"
  | "creator_payout_provider"
  | "google_billing_diamonds_provider"
  | "airwallex_merchant_rails_provider";

export type StreamGiftLedgerControlledLiveProviderBindingReference200A = Readonly<{
  bindingKind: StreamGiftLedgerControlledLiveProviderBindingKind200A;
  providerName: "google_billing" | "airwallex" | "wallet" | "bank" | "manual_review" | "other";
  configReferenceLabel: string;
  ownerAttestation: "server_side_config_exists" | "pending_owner_fill";
}>;

export type StreamGiftLedgerControlledLiveProviderBindingApprovalSafety200A = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
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
  fakePaymentSuccessAllowed: false;
  fakeGiftSendSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
  requiresSeparate200BProviderConfigVerification: true;
  referenceLabelsOnly: true;
}>;

export type StreamGiftLedgerControlledLiveProviderBindingApprovalInput200A = Readonly<{
  ownerApproval?: string;
  approvalMode?: "controlled_live_provider_binding_approval_request" | "disabled";
  targetStage?: "stream_gifts_live_provider_binding" | "disabled";
  acknowledgedFinalReadinessStage?: "199H_stream_gifts_backend_100_percent_ready" | "disabled";
  bindingReferences: readonly StreamGiftLedgerControlledLiveProviderBindingReference200A[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerControlledLiveProviderBindingApprovalBlockedCode200A =
  | "owner_approval_required"
  | "approval_mode_disabled"
  | "final_readiness_ack_required"
  | "binding_references_required"
  | "missing_required_binding_kind"
  | "invalid_reference_label"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerControlledLiveProviderBindingApprovalBlocked200A = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_VERSION;
  status: "controlled_live_provider_binding_approval_blocked_without_runtime_enablement";
  code: StreamGiftLedgerControlledLiveProviderBindingApprovalBlockedCode200A;
  blockedReason: string;
  controlledApprovalPrepared: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerControlledLiveProviderBindingApprovalSafety200A;
}>;

export type StreamGiftLedgerControlledLiveProviderBindingApprovalEnvelope200A = Readonly<{
  contract: "stream.gift.controlled_live_provider_binding.approval_request.v1";
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_VERSION;
  previousStageRequired: "199H_stream_gifts_backend_100_percent_ready";
  targetStage: "stream_gifts_live_provider_binding";
  requiredBindingKinds: readonly StreamGiftLedgerControlledLiveProviderBindingKind200A[];
  providedBindingKinds: readonly StreamGiftLedgerControlledLiveProviderBindingKind200A[];
  referenceLabelCount: number;
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsProviderSeparated: true;
  airwallexMerchantRailsProviderSeparated: true;
  rawSecretsIncluded: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  nextStage: "200B_owner_filled_provider_reference_labels_verification";
}>;

export type StreamGiftLedgerControlledLiveProviderBindingApprovalPrepared200A = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_VERSION;
  status: "controlled_live_provider_binding_approval_prepared_not_executed";
  envelope: StreamGiftLedgerControlledLiveProviderBindingApprovalEnvelope200A;
  controlledApprovalPrepared: true;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerControlledLiveProviderBindingApprovalSafety200A;
}>;

export type StreamGiftLedgerControlledLiveProviderBindingApprovalResult200A =
  | StreamGiftLedgerControlledLiveProviderBindingApprovalPrepared200A
  | StreamGiftLedgerControlledLiveProviderBindingApprovalBlocked200A;

export type StreamGiftLedgerControlledLiveProviderBindingApprovalReadiness200A = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_VERSION;
  status: "ready_for_controlled_live_provider_binding_approval_request";
  previousStageRequired: "199H_stream_gifts_backend_100_percent_ready";
  backendReadinessPercent: 100;
  runtimeEnabledNow: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  nextStage: "200B_owner_filled_provider_reference_labels_verification";
  safety: StreamGiftLedgerControlledLiveProviderBindingApprovalSafety200A;
}>;

export type StreamGiftLedgerControlledLiveProviderBindingNextRequest200A = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_VERSION;
  status: "next_stage_requires_owner_filled_reference_labels_only";
  nextStage: "200B_owner_filled_provider_reference_labels_verification";
  providerBindingExecuted: false;
  forbiddenUntil200B: readonly string[];
}>;
