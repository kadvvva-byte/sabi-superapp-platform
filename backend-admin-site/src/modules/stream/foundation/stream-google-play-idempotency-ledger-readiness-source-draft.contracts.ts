// BACKEND-STREAM-FOUNDATION-144E
// Idempotency and append-only ledger routing readiness contract.
// Draft-only: no external network use, no data-store write, no Sabi balance change,
// no funds flow, no runtime enablement, and no raw credential or proof output.

export const STREAM_GOOGLE_PLAY_IDEMPOTENCY_LEDGER_READINESS_SOURCE_DRAFT_VERSION =
  "BACKEND-STREAM-FOUNDATION-144E" as const;

export type StreamGooglePlayIdempotencyLedgerReadinessDraftVersion =
  typeof STREAM_GOOGLE_PLAY_IDEMPOTENCY_LEDGER_READINESS_SOURCE_DRAFT_VERSION;

export type StreamGooglePlayReadinessBalanceBucket =
  | "wallet_balance_physical_commerce"
  | "purchased_digital_coin_google_billing"
  | "reward_bonus_coin"
  | "creator_earning_pending"
  | "creator_earning_payable"
  | "merchant_settlement_pending"
  | "merchant_settlement_payable";

export type StreamGooglePlayReadinessDigitalPurpose =
  | "premium_subscription"
  | "premium_feature"
  | "digital_gift"
  | "stream_boost"
  | "creator_subscription"
  | "digital_badge"
  | "digital_effect"
  | "ai_digital_tool"
  | "other_android_digital_entitlement";

export type StreamGooglePlayReadinessIdempotencyScope =
  | "provider_proof_hash"
  | "unified_user_product"
  | "order_reference_hash"
  | "ledger_append_key"
  | "refund_void_adjustment_key";

export type StreamGooglePlayReadinessRouteDecision =
  | "blocked_provider_not_verified"
  | "blocked_duplicate_key"
  | "blocked_bucket_mismatch"
  | "ready_for_later_append_gate"
  | "manual_review_required";

export type StreamGooglePlayReadinessHoldReason =
  | "provider_not_verified"
  | "refund_window_open"
  | "chargeback_window_open"
  | "compliance_review"
  | "catalog_mismatch"
  | "duplicate_key_detected"
  | "owner_approval_missing";

export type StreamGooglePlayIdempotencyLedgerReadinessSafeFlags = {
  readonly sourceOnly: boolean;
  readonly planningOnly: boolean;
  readonly providerCallAllowedNow: false;
  readonly dataStoreWriteAllowedNow: false;
  readonly ledgerAppendAllowedNow: false;
  readonly balanceChangeAllowedNow: false;
  readonly walletFlowAllowedNow: false;
  readonly fundsFlowAllowedNow: false;
  readonly creatorReleaseAllowedNow: false;
  readonly merchantReleaseAllowedNow: false;
  readonly adminUiTouchAllowedNow: false;
  readonly mobileTouchAllowedNow: false;
  readonly rawCredentialReturnAllowed: false;
  readonly rawProviderProofReturnAllowed: false;
  readonly syntheticProviderApprovalAllowed: false;
  readonly liveBillingEnabledNow: false;
};

export type StreamGooglePlayIdempotencyKeyDraft = {
  readonly scope: StreamGooglePlayReadinessIdempotencyScope;
  readonly keyHashSha256: string;
  readonly keyLength: number;
  readonly rawKeyReturned: false;
};

export type StreamGooglePlayLedgerRoutingDraft = {
  readonly version: StreamGooglePlayIdempotencyLedgerReadinessDraftVersion;
  readonly digitalPurpose: StreamGooglePlayReadinessDigitalPurpose;
  readonly targetBucket: "purchased_digital_coin_google_billing";
  readonly disallowedBucketsForAndroidDigitalGoods: readonly ["wallet_balance_physical_commerce"];
  readonly pendingCreatorBucket: "creator_earning_pending";
  readonly releasableCreatorBucket: "creator_earning_payable";
  readonly pendingMerchantBucket: "merchant_settlement_pending";
  readonly releasableMerchantBucket: "merchant_settlement_payable";
  readonly routeDecision: StreamGooglePlayReadinessRouteDecision;
  readonly holdReasons: readonly StreamGooglePlayReadinessHoldReason[];
  readonly safeFlags: StreamGooglePlayIdempotencyLedgerReadinessSafeFlags;
};

export type StreamGooglePlayIdempotencyLedgerReadinessSnapshot = {
  readonly version: StreamGooglePlayIdempotencyLedgerReadinessDraftVersion;
  readonly idempotencyScopes: readonly StreamGooglePlayReadinessIdempotencyScope[];
  readonly digitalPurposeToBucketRule: readonly StreamGooglePlayLedgerRoutingDraft[];
  readonly requiredBeforeAppendGate: readonly [
    "real_provider_verified_result",
    "idempotency_key_not_seen",
    "catalog_product_match",
    "android_package_match",
    "unified_user_id_match",
    "redacted_provider_reference_only",
    "hold_policy_evaluated",
    "owner_approval_for_append_gate"
  ];
  readonly safeFlags: StreamGooglePlayIdempotencyLedgerReadinessSafeFlags;
  readonly generatedAtUtc: string;
};

export const STREAM_GOOGLE_PLAY_IDEMPOTENCY_LEDGER_READINESS_SAFE_FLAGS: StreamGooglePlayIdempotencyLedgerReadinessSafeFlags = {
  sourceOnly: true,
  planningOnly: true,
  providerCallAllowedNow: false,
  dataStoreWriteAllowedNow: false,
  ledgerAppendAllowedNow: false,
  balanceChangeAllowedNow: false,
  walletFlowAllowedNow: false,
  fundsFlowAllowedNow: false,
  creatorReleaseAllowedNow: false,
  merchantReleaseAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  rawCredentialReturnAllowed: false,
  rawProviderProofReturnAllowed: false,
  syntheticProviderApprovalAllowed: false,
  liveBillingEnabledNow: false,
};

export const STREAM_GOOGLE_PLAY_IDEMPOTENCY_SCOPES: readonly StreamGooglePlayReadinessIdempotencyScope[] = [
  "provider_proof_hash",
  "unified_user_product",
  "order_reference_hash",
  "ledger_append_key",
  "refund_void_adjustment_key",
];

export const STREAM_GOOGLE_PLAY_DIGITAL_PURPOSES: readonly StreamGooglePlayReadinessDigitalPurpose[] = [
  "premium_subscription",
  "premium_feature",
  "digital_gift",
  "stream_boost",
  "creator_subscription",
  "digital_badge",
  "digital_effect",
  "ai_digital_tool",
  "other_android_digital_entitlement",
];

export function buildStreamGooglePlayLedgerRoutingDraft(
  digitalPurpose: StreamGooglePlayReadinessDigitalPurpose,
  holdReasons: readonly StreamGooglePlayReadinessHoldReason[] = ["provider_not_verified", "owner_approval_missing"],
): StreamGooglePlayLedgerRoutingDraft {
  return {
    version: STREAM_GOOGLE_PLAY_IDEMPOTENCY_LEDGER_READINESS_SOURCE_DRAFT_VERSION,
    digitalPurpose,
    targetBucket: "purchased_digital_coin_google_billing",
    disallowedBucketsForAndroidDigitalGoods: ["wallet_balance_physical_commerce"],
    pendingCreatorBucket: "creator_earning_pending",
    releasableCreatorBucket: "creator_earning_payable",
    pendingMerchantBucket: "merchant_settlement_pending",
    releasableMerchantBucket: "merchant_settlement_payable",
    routeDecision: "blocked_provider_not_verified",
    holdReasons,
    safeFlags: STREAM_GOOGLE_PLAY_IDEMPOTENCY_LEDGER_READINESS_SAFE_FLAGS,
  };
}

export function buildStreamGooglePlayIdempotencyLedgerReadinessSnapshotDraft(): StreamGooglePlayIdempotencyLedgerReadinessSnapshot {
  return {
    version: STREAM_GOOGLE_PLAY_IDEMPOTENCY_LEDGER_READINESS_SOURCE_DRAFT_VERSION,
    idempotencyScopes: STREAM_GOOGLE_PLAY_IDEMPOTENCY_SCOPES,
    digitalPurposeToBucketRule: STREAM_GOOGLE_PLAY_DIGITAL_PURPOSES.map((purpose) =>
      buildStreamGooglePlayLedgerRoutingDraft(purpose),
    ),
    requiredBeforeAppendGate: [
      "real_provider_verified_result",
      "idempotency_key_not_seen",
      "catalog_product_match",
      "android_package_match",
      "unified_user_id_match",
      "redacted_provider_reference_only",
      "hold_policy_evaluated",
      "owner_approval_for_append_gate",
    ],
    safeFlags: STREAM_GOOGLE_PLAY_IDEMPOTENCY_LEDGER_READINESS_SAFE_FLAGS,
    generatedAtUtc: new Date().toISOString(),
  };
}

export function assertStreamGooglePlayIdempotencyLedgerReadinessDraftSafe(
  value: StreamGooglePlayIdempotencyLedgerReadinessSnapshot,
): boolean {
  return (
    value.safeFlags.providerCallAllowedNow === false &&
    value.safeFlags.dataStoreWriteAllowedNow === false &&
    value.safeFlags.ledgerAppendAllowedNow === false &&
    value.safeFlags.balanceChangeAllowedNow === false &&
    value.safeFlags.walletFlowAllowedNow === false &&
    value.safeFlags.fundsFlowAllowedNow === false &&
    value.safeFlags.creatorReleaseAllowedNow === false &&
    value.safeFlags.merchantReleaseAllowedNow === false &&
    value.safeFlags.rawCredentialReturnAllowed === false &&
    value.safeFlags.rawProviderProofReturnAllowed === false &&
    value.safeFlags.syntheticProviderApprovalAllowed === false &&
    value.safeFlags.liveBillingEnabledNow === false &&
    value.digitalPurposeToBucketRule.every(
      (rule) =>
        rule.targetBucket === "purchased_digital_coin_google_billing" &&
        rule.disallowedBucketsForAndroidDigitalGoods.includes("wallet_balance_physical_commerce") &&
        rule.safeFlags.ledgerAppendAllowedNow === false &&
        rule.safeFlags.balanceChangeAllowedNow === false,
    )
  );
}
