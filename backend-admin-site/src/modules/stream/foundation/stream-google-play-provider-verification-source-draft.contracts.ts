// BACKEND-STREAM-FOUNDATION-144B-FIX1
// Google Play Billing provider verification contracts source-only draft.
// Contract-only: no external provider network, no database write, no Sabi balance change,
// no funds flow, no raw provider proof response, and no live billing enablement.

export const STREAM_GOOGLE_PLAY_PROVIDER_VERIFICATION_SOURCE_DRAFT_VERSION =
  "BACKEND-STREAM-FOUNDATION-144B-FIX1" as const;

export type StreamGooglePlayProviderVerificationDraftVersion =
  typeof STREAM_GOOGLE_PLAY_PROVIDER_VERIFICATION_SOURCE_DRAFT_VERSION;

export type StreamGooglePlayProviderRail = "google_play_billing";

export type StreamGooglePlayProviderEnvironmentState =
  | "provider_not_configured"
  | "provider_env_missing"
  | "provider_env_present_unverified"
  | "provider_env_verified_server_side"
  | "live_verification_requires_separate_approval";

export type StreamGooglePlayDigitalPurpose =
  | "premium_subscription"
  | "premium_feature"
  | "digital_gift"
  | "stream_boost"
  | "creator_subscription"
  | "digital_badge"
  | "digital_effect"
  | "ai_digital_tool"
  | "other_android_digital_entitlement";

export type StreamGooglePlayBalanceBucket =
  | "purchased_digital_coin_google_billing"
  | "reward_bonus_coin"
  | "creator_earning_pending"
  | "creator_earning_payable"
  | "merchant_settlement_pending"
  | "merchant_settlement_payable";

export type StreamGooglePlayProviderVerificationDecision =
  | "not_configured"
  | "blocked_missing_server_env"
  | "blocked_invalid_request"
  | "blocked_duplicate_idempotency_key"
  | "pending_real_provider_verification"
  | "verified_by_real_provider"
  | "rejected_by_real_provider"
  | "refundable_or_voided"
  | "manual_review_required";

export type StreamGooglePlayProviderVerificationSafeFlagMap = {
  readonly sourceOnly: boolean;
  readonly planningOnly: boolean;
  readonly providerCallAllowedNow: false;
  readonly dataStoreWriteAllowedNow: false;
  readonly walletFlowAllowedNow: false;
  readonly fundsFlowAllowedNow: false;
  readonly adminUiTouchAllowedNow: false;
  readonly mobileTouchAllowedNow: false;
  readonly rawSecretReturnAllowed: false;
  readonly rawProviderProofReturnAllowed: false;
  readonly syntheticProviderApprovalAllowed: false;
  readonly liveBillingEnabledNow: false;
};

export type StreamGooglePlayProviderProofReference = {
  readonly proofHashSha256: string;
  readonly proofLength: number;
  readonly proofSource: "server_received_android_billing_client";
  readonly rawProviderProofStoredServerSideOnly: true;
  readonly rawProviderProofReturnedToAdminOrMobile: false;
};

export type StreamGooglePlayProviderVerificationRequestDraft = {
  readonly version: StreamGooglePlayProviderVerificationDraftVersion;
  readonly rail: StreamGooglePlayProviderRail;
  readonly environmentState: StreamGooglePlayProviderEnvironmentState;
  readonly userId: string;
  readonly unifiedUserId: string;
  readonly packageName: string;
  readonly productId: string;
  readonly orderReferenceHash?: string;
  readonly purchasePurpose: StreamGooglePlayDigitalPurpose;
  readonly targetBalanceBucket: "purchased_digital_coin_google_billing";
  readonly idempotencyKey: string;
  readonly providerProof: StreamGooglePlayProviderProofReference;
  readonly requestedAtUtc: string;
  readonly clientPlatform: "android";
};

export type StreamGooglePlayProviderVerificationFeeDraft = {
  readonly googleFeeRange: "15-30%";
  readonly sabiPlatformServiceFeeTarget: "15-20%";
  readonly releaseAfter: readonly [
    "google_fee",
    "sabi_fee",
    "tax_or_withholding",
    "compliance_hold",
    "refund_or_chargeback_window",
    "provider_settlement_check"
  ];
};

export type StreamGooglePlayProviderVerificationResultDraft = {
  readonly version: StreamGooglePlayProviderVerificationDraftVersion;
  readonly rail: StreamGooglePlayProviderRail;
  readonly decision: StreamGooglePlayProviderVerificationDecision;
  readonly verifiedByRealProvider: boolean;
  readonly providerReferenceHash?: string;
  readonly productId?: string;
  readonly packageName?: string;
  readonly purchasePurpose?: StreamGooglePlayDigitalPurpose;
  readonly targetBalanceBucket?: StreamGooglePlayBalanceBucket;
  readonly idempotencyKey?: string;
  readonly safeFlags: StreamGooglePlayProviderVerificationSafeFlagMap;
  readonly feePolicy: StreamGooglePlayProviderVerificationFeeDraft;
  readonly ledgerAppendAllowedNow: false;
  readonly balanceChangeAllowedNow: false;
  readonly creatorReleaseAllowedNow: false;
  readonly adminVisibleRedactedSummaryOnly: true;
  readonly mobileVisibleEntitlementOnlyAfterLedgerConfirmation: true;
  readonly blockers: readonly string[];
  readonly generatedAtUtc: string;
};

export type StreamGooglePlayProviderVerificationLiveReadinessDraft = {
  readonly version: StreamGooglePlayProviderVerificationDraftVersion;
  readonly requiredBeforeLive: readonly [
    "server_side_google_provider_adapter",
    "server_only_provider_credentials",
    "android_package_name_binding",
    "product_catalog_binding",
    "idempotent_verification_result_mapping",
    "redacted_admin_status_only",
    "append_only_ledger_gate",
    "refund_void_chargeback_hold_policy",
    "owner_approval_for_real_provider_call"
  ];
  readonly forbiddenUntilLiveApproved: readonly [
    "provider_network_call",
    "synthetic_provider_approval",
    "database_write",
    "wallet_flow",
    "funds_flow",
    "raw_secret_response",
    "raw_provider_proof_response",
    "mobile_provider_secret"
  ];
};

export const STREAM_GOOGLE_PLAY_PROVIDER_VERIFICATION_SAFE_FLAGS: StreamGooglePlayProviderVerificationSafeFlagMap = {
  sourceOnly: true,
  planningOnly: true,
  providerCallAllowedNow: false,
  dataStoreWriteAllowedNow: false,
  walletFlowAllowedNow: false,
  fundsFlowAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  rawSecretReturnAllowed: false,
  rawProviderProofReturnAllowed: false,
  syntheticProviderApprovalAllowed: false,
  liveBillingEnabledNow: false,
};

export const STREAM_GOOGLE_PLAY_PROVIDER_VERIFICATION_FEE_DRAFT: StreamGooglePlayProviderVerificationFeeDraft = {
  googleFeeRange: "15-30%",
  sabiPlatformServiceFeeTarget: "15-20%",
  releaseAfter: [
    "google_fee",
    "sabi_fee",
    "tax_or_withholding",
    "compliance_hold",
    "refund_or_chargeback_window",
    "provider_settlement_check",
  ],
};

export const STREAM_GOOGLE_PLAY_PROVIDER_VERIFICATION_LIVE_READINESS_DRAFT: StreamGooglePlayProviderVerificationLiveReadinessDraft = {
  version: STREAM_GOOGLE_PLAY_PROVIDER_VERIFICATION_SOURCE_DRAFT_VERSION,
  requiredBeforeLive: [
    "server_side_google_provider_adapter",
    "server_only_provider_credentials",
    "android_package_name_binding",
    "product_catalog_binding",
    "idempotent_verification_result_mapping",
    "redacted_admin_status_only",
    "append_only_ledger_gate",
    "refund_void_chargeback_hold_policy",
    "owner_approval_for_real_provider_call",
  ],
  forbiddenUntilLiveApproved: [
    "provider_network_call",
    "synthetic_provider_approval",
    "database_write",
    "wallet_flow",
    "funds_flow",
    "raw_secret_response",
    "raw_provider_proof_response",
    "mobile_provider_secret",
  ],
};

export function buildStreamGooglePlayProviderVerificationNotConfiguredResultDraft(
  blockers: readonly string[] = ["provider_not_configured", "real_provider_env_not_bound"],
): StreamGooglePlayProviderVerificationResultDraft {
  return {
    version: STREAM_GOOGLE_PLAY_PROVIDER_VERIFICATION_SOURCE_DRAFT_VERSION,
    rail: "google_play_billing",
    decision: "not_configured",
    verifiedByRealProvider: false,
    targetBalanceBucket: "purchased_digital_coin_google_billing",
    safeFlags: STREAM_GOOGLE_PLAY_PROVIDER_VERIFICATION_SAFE_FLAGS,
    feePolicy: STREAM_GOOGLE_PLAY_PROVIDER_VERIFICATION_FEE_DRAFT,
    ledgerAppendAllowedNow: false,
    balanceChangeAllowedNow: false,
    creatorReleaseAllowedNow: false,
    adminVisibleRedactedSummaryOnly: true,
    mobileVisibleEntitlementOnlyAfterLedgerConfirmation: true,
    blockers,
    generatedAtUtc: new Date().toISOString(),
  };
}

export function assertStreamGooglePlayProviderVerificationDraftSafe(
  value: StreamGooglePlayProviderVerificationResultDraft,
): boolean {
  return (
    value.safeFlags.providerCallAllowedNow === false &&
    value.safeFlags.dataStoreWriteAllowedNow === false &&
    value.safeFlags.walletFlowAllowedNow === false &&
    value.safeFlags.fundsFlowAllowedNow === false &&
    value.safeFlags.rawSecretReturnAllowed === false &&
    value.safeFlags.rawProviderProofReturnAllowed === false &&
    value.safeFlags.syntheticProviderApprovalAllowed === false &&
    value.safeFlags.liveBillingEnabledNow === false &&
    value.ledgerAppendAllowedNow === false &&
    value.balanceChangeAllowedNow === false &&
    value.creatorReleaseAllowedNow === false
  );
}
