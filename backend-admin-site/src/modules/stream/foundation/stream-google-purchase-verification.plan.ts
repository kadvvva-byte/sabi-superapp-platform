import {
  STREAM_GOOGLE_PURCHASE_VERIFICATION_VERSION,
  buildStreamGooglePurchaseVerificationDecisionPreview,
  buildStreamGooglePurchaseVerificationSnapshot,
  type StreamGooglePurchaseVerificationDecision,
  type StreamGooglePurchaseVerificationSnapshot,
} from "./stream-google-purchase-verification.contracts";

export type StreamGooglePurchaseVerificationSourcePlan = Readonly<{
  version: typeof STREAM_GOOGLE_PURCHASE_VERIFICATION_VERSION;
  sourceOnly: true;
  planningStage: "BACKEND_STREAM_FOUNDATION_141J";
  runtimeUseAllowedNow: false;
  routeMountAllowedNow: false;
  liveVerificationEnabledNow: false;
  googleProviderConfiguredNow: false;
  googleProviderCallAllowedNow: false;
  entitlementDeliveryAllowedNow: false;
  ledgerWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  rawPurchaseTokenReturned: false;
  rawProviderSecretReturned: false;
  serverSideVerificationRequired: true;
  mobileSideOnlyVerificationAccepted: false;
  snapshot: StreamGooglePurchaseVerificationSnapshot;
  previewDecisions: readonly StreamGooglePurchaseVerificationDecision[];
  requiredBeforeRuntime: readonly string[];
}>;

export const STREAM_GOOGLE_PURCHASE_VERIFICATION_PREVIEW_DECISIONS: readonly StreamGooglePurchaseVerificationDecision[] = [
  buildStreamGooglePurchaseVerificationDecisionPreview({
    sku: "stream_gift_coin_pack_android",
    productType: "one_time_in_app_product",
    platform: "android",
    purchaseTokenHashOnly: "hash_preview_stream_gift_0001",
    purchaseTokenRawAllowedInLogs: false,
    packageName: "com.sabi.superapp",
    userId: "preview_user",
    classifierInput: {
      platform: "android",
      purpose: "stream_digital_gift",
      fundingBucket: "purchased_digital_coin_google_billing",
      targetKind: "creator_earning",
    },
    classifierDecisionStatus: "android_digital_google_billing_required",
    catalogClassification: {
      sku: "stream_gift_coin_pack_android",
      googleBillingRequired: true,
      requiredRail: "google_play_billing_android",
      ledgerBucket: "purchased_digital_coin_google_billing",
      productActiveNow: false,
      providerCallsAllowedNow: false,
      fakeSuccessAllowed: false,
    },
  }),
  buildStreamGooglePurchaseVerificationDecisionPreview({
    sku: "sabi_premium_subscription_android",
    productType: "subscription_product",
    platform: "android",
    purchaseTokenHashOnly: "hash_preview_premium_0001",
    purchaseTokenRawAllowedInLogs: false,
    packageName: "com.sabi.superapp",
    userId: "preview_user",
    classifierInput: {
      platform: "android",
      purpose: "premium_subscription_digital",
      fundingBucket: "purchased_digital_coin_google_billing",
      targetKind: "digital_entitlement",
    },
    classifierDecisionStatus: "android_digital_google_billing_required",
    catalogClassification: {
      sku: "sabi_premium_subscription_android",
      googleBillingRequired: true,
      requiredRail: "google_play_billing_android",
      ledgerBucket: "purchased_digital_coin_google_billing",
      productActiveNow: false,
      providerCallsAllowedNow: false,
      fakeSuccessAllowed: false,
    },
  }),
];

export const STREAM_GOOGLE_PURCHASE_VERIFICATION_SOURCE_PLAN: StreamGooglePurchaseVerificationSourcePlan = {
  version: STREAM_GOOGLE_PURCHASE_VERIFICATION_VERSION,
  sourceOnly: true,
  planningStage: "BACKEND_STREAM_FOUNDATION_141J",
  runtimeUseAllowedNow: false,
  routeMountAllowedNow: false,
  liveVerificationEnabledNow: false,
  googleProviderConfiguredNow: false,
  googleProviderCallAllowedNow: false,
  entitlementDeliveryAllowedNow: false,
  ledgerWriteAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  fakeSuccessAllowed: false,
  rawPurchaseTokenReturned: false,
  rawProviderSecretReturned: false,
  serverSideVerificationRequired: true,
  mobileSideOnlyVerificationAccepted: false,
  snapshot: buildStreamGooglePurchaseVerificationSnapshot(),
  previewDecisions: STREAM_GOOGLE_PURCHASE_VERIFICATION_PREVIEW_DECISIONS,
  requiredBeforeRuntime: [
    "Read-only provider config presence route",
    "Google Play Console SKU mapping",
    "Server-side verification implementation",
    "Acknowledgement/consume implementation",
    "Idempotency and duplicate-delivery protection",
    "Refund/void/chargeback/subscription lifecycle handling",
    "Append-only ledger DB schema",
    "Admin Billing Center visibility",
    "Owner approval before any runtime route mount",
  ],
};

export function getStreamGooglePurchaseVerificationSourcePlan(): StreamGooglePurchaseVerificationSourcePlan {
  return STREAM_GOOGLE_PURCHASE_VERIFICATION_SOURCE_PLAN;
}
