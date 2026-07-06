import {
  type SabiValueLedgerBucket,
} from "./stream-coin-wallet-digital-billing-boundary.contracts";
import {
  type SabiPurchasePurposeClassifierDecision,
  type SabiPurchasePurposeClassifierInput,
} from "./stream-purchase-purpose-classifier.contracts";
import {
  type StreamCatalogProductClassification,
} from "./stream-product-catalog-classification.contracts";

export const STREAM_GOOGLE_PURCHASE_VERIFICATION_VERSION = "BACKEND-STREAM-FOUNDATION-141J" as const;

export type StreamGooglePurchaseProductType =
  | "one_time_in_app_product"
  | "subscription_product";

export type StreamGooglePurchaseVerificationStatus =
  | "provider_not_configured"
  | "verification_not_attempted"
  | "verification_required"
  | "verified_future"
  | "invalid_purchase"
  | "refunded_or_voided_future"
  | "manual_review_required";

export type StreamGooglePurchaseAcknowledgementStatus =
  | "acknowledgement_not_attempted"
  | "acknowledgement_required_future"
  | "acknowledged_future"
  | "consume_required_future"
  | "consumed_future"
  | "manual_review_required";

export type StreamGooglePurchaseVerificationInput = Readonly<{
  sku: string;
  productType: StreamGooglePurchaseProductType;
  platform: "android";
  purchaseTokenHashOnly: string;
  purchaseTokenRawAllowedInLogs: false;
  packageName: string;
  userId: string;
  classifierInput: SabiPurchasePurposeClassifierInput;
  classifierDecisionStatus: SabiPurchasePurposeClassifierDecision["status"];
  catalogClassification: Pick<
    StreamCatalogProductClassification,
    | "sku"
    | "googleBillingRequired"
    | "requiredRail"
    | "ledgerBucket"
    | "productActiveNow"
    | "providerCallsAllowedNow"
    | "fakeSuccessAllowed"
  >;
}>;

export type StreamGooglePurchaseVerificationDecision = Readonly<{
  version: typeof STREAM_GOOGLE_PURCHASE_VERIFICATION_VERSION;
  input: StreamGooglePurchaseVerificationInput;
  status: StreamGooglePurchaseVerificationStatus;
  acknowledgementStatus: StreamGooglePurchaseAcknowledgementStatus;
  googleProviderConfiguredNow: false;
  googleProviderCallAllowedNow: false;
  serverSideVerificationRequired: true;
  mobileSideOnlyVerificationAccepted: false;
  rawPurchaseTokenReturned: false;
  rawProviderSecretReturned: false;
  entitlementDeliveryAllowedNow: false;
  ledgerWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  idempotencyRequired: true;
  targetLedgerBucket: SabiValueLedgerBucket;
  hardBlockReasons: readonly string[];
  notes: string;
}>;

export type StreamGooglePurchaseVerificationSnapshot = Readonly<{
  version: typeof STREAM_GOOGLE_PURCHASE_VERIFICATION_VERSION;
  sourceOnly: true;
  liveVerificationEnabledNow: false;
  googleProviderConfiguredNow: false;
  googleProviderCallAllowedNow: false;
  serverSideVerificationRequired: true;
  mobileSideOnlyVerificationAccepted: false;
  rawPurchaseTokenReturned: false;
  rawProviderSecretReturned: false;
  entitlementDeliveryAllowedNow: false;
  ledgerWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  requiredBeforeRuntime: readonly string[];
}>;

export function buildStreamGooglePurchaseVerificationDecisionPreview(
  input: StreamGooglePurchaseVerificationInput,
): StreamGooglePurchaseVerificationDecision {
  const hardBlockReasons: string[] = [];

  if (input.platform !== "android") {
    hardBlockReasons.push("only_android_google_billing_contract_is_planned_here");
  }

  if (!input.catalogClassification.googleBillingRequired) {
    hardBlockReasons.push("catalog_product_does_not_require_google_billing");
  }

  if (input.catalogClassification.requiredRail !== "google_play_billing_android") {
    hardBlockReasons.push("catalog_required_rail_is_not_google_play_billing_android");
  }

  if (input.catalogClassification.productActiveNow) {
    hardBlockReasons.push("product_active_now_must_remain_false_in_source_only_stage");
  }

  if (input.catalogClassification.providerCallsAllowedNow) {
    hardBlockReasons.push("provider_calls_allowed_now_must_remain_false");
  }

  if (input.catalogClassification.fakeSuccessAllowed) {
    hardBlockReasons.push("fake_success_must_remain_false");
  }

  if (input.classifierDecisionStatus !== "android_digital_google_billing_required") {
    hardBlockReasons.push("classifier_decision_must_require_google_billing_for_android_digital_purchase");
  }

  if (!input.purchaseTokenHashOnly || input.purchaseTokenHashOnly.length < 12) {
    hardBlockReasons.push("purchase_token_hash_only_required_for_logs_and_snapshots");
  }

  return {
    version: STREAM_GOOGLE_PURCHASE_VERIFICATION_VERSION,
    input,
    status: hardBlockReasons.length > 0 ? "manual_review_required" : "provider_not_configured",
    acknowledgementStatus: "acknowledgement_not_attempted",
    googleProviderConfiguredNow: false,
    googleProviderCallAllowedNow: false,
    serverSideVerificationRequired: true,
    mobileSideOnlyVerificationAccepted: false,
    rawPurchaseTokenReturned: false,
    rawProviderSecretReturned: false,
    entitlementDeliveryAllowedNow: false,
    ledgerWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    idempotencyRequired: true,
    targetLedgerBucket: input.catalogClassification.ledgerBucket,
    hardBlockReasons,
    notes:
      hardBlockReasons.length > 0
        ? "Purchase verification preview is blocked until catalog/classifier/input consistency is fixed."
        : "Provider is not configured; future runtime must perform server-side Google purchase verification before entitlement or ledger write.",
  };
}

export function buildStreamGooglePurchaseVerificationSnapshot(): StreamGooglePurchaseVerificationSnapshot {
  return {
    version: STREAM_GOOGLE_PURCHASE_VERIFICATION_VERSION,
    sourceOnly: true,
    liveVerificationEnabledNow: false,
    googleProviderConfiguredNow: false,
    googleProviderCallAllowedNow: false,
    serverSideVerificationRequired: true,
    mobileSideOnlyVerificationAccepted: false,
    rawPurchaseTokenReturned: false,
    rawProviderSecretReturned: false,
    entitlementDeliveryAllowedNow: false,
    ledgerWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    requiredBeforeRuntime: [
      "Google Play Console product catalog must exist for every Android digital SKU.",
      "Server-side provider credentials must be configured without exposing raw secret values.",
      "Server-side purchase token verification must pass before entitlement delivery.",
      "Acknowledgement or consume flow must be defined before digital product goes live.",
      "Idempotency key must block duplicate entitlement and duplicate ledger entries.",
      "Refund, void, chargeback and subscription lifecycle handling must exist before public launch.",
      "Append-only ledger must be ready before any creator earning is created.",
      "Admin Billing Provider Status and Product Catalog visibility must exist before public launch.",
    ],
  };
}
