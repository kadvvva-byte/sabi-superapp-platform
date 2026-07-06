import {
  STREAM_APPEND_ONLY_LEDGER_VERSION,
  STREAM_LEDGER_BUCKET_RULES,
  buildStreamAppendOnlyLedgerEntryPreview,
  buildStreamAppendOnlyLedgerSnapshot,
  type StreamAppendOnlyLedgerEntry,
  type StreamAppendOnlyLedgerSnapshot,
} from "./stream-append-only-ledger.contracts";

export type StreamAppendOnlyLedgerSourcePlan = Readonly<{
  version: typeof STREAM_APPEND_ONLY_LEDGER_VERSION;
  sourceOnly: true;
  planningStage: "BACKEND_STREAM_FOUNDATION_141F";
  runtimeUseAllowedNow: false;
  routeMountAllowedNow: false;
  liveBillingEnabledNow: false;
  googleProviderCallAllowedNow: false;
  runtimeDbWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  appendOnlyRequired: true;
  updateExistingEntriesAllowed: false;
  deleteExistingEntriesAllowed: false;
  ledgerSnapshot: StreamAppendOnlyLedgerSnapshot;
  requiredBeforeRuntime: readonly string[];
  previewEntries: readonly StreamAppendOnlyLedgerEntry[];
}>;

export const STREAM_APPEND_ONLY_LEDGER_PREVIEW_ENTRIES: readonly StreamAppendOnlyLedgerEntry[] = [
  buildStreamAppendOnlyLedgerEntryPreview({
    entryKind: "provider_payment_authorized",
    direction: "informational",
    sourceBucket: "wallet_balance_physical_commerce",
    targetBucket: "merchant_settlement_pending",
    requiredRail: "external_payment_provider_or_bank_rail",
    purchaseInput: {
      platform: "android",
      purpose: "physical_goods_store",
      fundingBucket: "wallet_balance_physical_commerce",
      targetKind: "physical_goods_order",
    },
    classifierDecisionStatus: "physical_commerce_payment_rail",
    partyKind: "payment_provider",
    amount: { amountMinor: "0", currency: "UZS" },
    notes: "Preview only: physical commerce payment provider authorization must stay separate from digital billing.",
  }),
  buildStreamAppendOnlyLedgerEntryPreview({
    entryKind: "google_purchase_verified",
    direction: "informational",
    sourceBucket: "purchased_digital_coin_google_billing",
    targetBucket: "purchased_digital_coin_google_billing",
    requiredRail: "google_play_billing_android",
    purchaseInput: {
      platform: "android",
      purpose: "stream_digital_gift",
      fundingBucket: "purchased_digital_coin_google_billing",
      targetKind: "creator_earning",
    },
    classifierDecisionStatus: "android_digital_google_billing_required",
    partyKind: "google_play",
    amount: { amountMinor: "0", currency: "USD" },
    notes: "Preview only: Google purchase verification is required before digital gift entitlement or creator earning.",
  }),
  buildStreamAppendOnlyLedgerEntryPreview({
    entryKind: "creator_earning_pending_created",
    direction: "hold",
    sourceBucket: "purchased_digital_coin_google_billing",
    targetBucket: "creator_earning_pending",
    requiredRail: "google_play_billing_android",
    purchaseInput: {
      platform: "android",
      purpose: "stream_digital_gift",
      fundingBucket: "purchased_digital_coin_google_billing",
      targetKind: "creator_earning",
    },
    classifierDecisionStatus: "android_digital_google_billing_required",
    partyKind: "streamer_creator",
    amount: { amountMinor: "0", currency: "USD" },
    notes: "Preview only: creator earning stays pending until refund window, compliance and settlement checks pass.",
  }),
];

export const STREAM_APPEND_ONLY_LEDGER_SOURCE_PLAN: StreamAppendOnlyLedgerSourcePlan = {
  version: STREAM_APPEND_ONLY_LEDGER_VERSION,
  sourceOnly: true,
  planningStage: "BACKEND_STREAM_FOUNDATION_141F",
  runtimeUseAllowedNow: false,
  routeMountAllowedNow: false,
  liveBillingEnabledNow: false,
  googleProviderCallAllowedNow: false,
  runtimeDbWriteAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  fakeSuccessAllowed: false,
  appendOnlyRequired: true,
  updateExistingEntriesAllowed: false,
  deleteExistingEntriesAllowed: false,
  ledgerSnapshot: buildStreamAppendOnlyLedgerSnapshot(),
  requiredBeforeRuntime: [
    "Prisma schema planning for append-only entries only",
    "Idempotency model planning before write routes",
    "Google Play purchase verification contract before Android digital entitlement",
    "Provider/bank authorization contract before physical merchant settlement",
    "Admin Billing/Settlement visibility before public launch",
    "Refund/void/chargeback adjustment contract before live billing",
    "Compliance/KYC/KYB/AML hold contract before payouts",
    "Separate owner approval before any DB write or runtime route mount",
  ],
  previewEntries: STREAM_APPEND_ONLY_LEDGER_PREVIEW_ENTRIES,
};

export function getStreamAppendOnlyLedgerSourcePlan(): StreamAppendOnlyLedgerSourcePlan {
  return STREAM_APPEND_ONLY_LEDGER_SOURCE_PLAN;
}

export function getStreamLedgerBucketRuleCount(): number {
  return STREAM_LEDGER_BUCKET_RULES.length;
}
