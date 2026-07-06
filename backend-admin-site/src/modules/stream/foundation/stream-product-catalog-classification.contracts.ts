import {
  type SabiPurchasePurpose,
  type SabiRequiredPaymentRail,
  type SabiValueLedgerBucket,
} from "./stream-coin-wallet-digital-billing-boundary.contracts";
import {
  type SabiPurchasePlatform,
  type SabiPurchaseTargetKind,
} from "./stream-purchase-purpose-classifier.contracts";
import {
  type StreamBillingProviderGateId,
} from "./stream-admin-provider-readiness.contracts";

export const STREAM_PRODUCT_CATALOG_CLASSIFICATION_VERSION = "BACKEND-STREAM-FOUNDATION-141I" as const;

export type StreamCatalogProductKind =
  | "physical_good"
  | "real_world_service"
  | "android_digital_good"
  | "android_digital_service"
  | "reward_bonus"
  | "creator_subscription"
  | "premium_subscription"
  | "manual_review_required";

export type StreamCatalogLaunchState =
  | "draft"
  | "classified_safe_disabled"
  | "provider_not_configured"
  | "blocked"
  | "ready_for_future_smoke"
  | "live_enabled_future";

export type StreamCatalogFeeModel = Readonly<{
  googleFeePercentMin: 15;
  googleFeePercentMax: 30;
  sabiFeePercentMin: 15;
  sabiFeePercentMax: 20;
  googleFeeApplies: boolean;
  sabiFeeApplies: boolean;
  creatorOrMerchantNetCalculatedAfterFeesAndHolds: true;
}>;

export type StreamCatalogProductClassification = Readonly<{
  version: typeof STREAM_PRODUCT_CATALOG_CLASSIFICATION_VERSION;
  sku: string;
  productKind: StreamCatalogProductKind;
  platform: SabiPurchasePlatform;
  purchasePurpose: SabiPurchasePurpose;
  targetKind: SabiPurchaseTargetKind;
  ledgerBucket: SabiValueLedgerBucket;
  requiredRail: SabiRequiredPaymentRail;
  providerGate: StreamBillingProviderGateId;
  launchState: StreamCatalogLaunchState;
  googleBillingRequired: boolean;
  physicalCommerceRailAllowed: boolean;
  walletPhysicalBalanceAllowed: boolean;
  walletPhysicalBalanceCanBuyAndroidDigital: false;
  rewardBonusCanBeSoldForCash: false;
  balanceMixingAllowed: false;
  productActiveNow: false;
  providerCallsAllowedNow: false;
  runtimeDbWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  feeModel: StreamCatalogFeeModel;
  adminReviewRequired: boolean;
  notes: string;
}>;

export type StreamProductCatalogClassificationSnapshot = Readonly<{
  version: typeof STREAM_PRODUCT_CATALOG_CLASSIFICATION_VERSION;
  sourceOnly: true;
  productActivationAllowedNow: false;
  providerCallsAllowedNow: false;
  runtimeDbWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  allProductsMustBeClassifiedBeforeLaunch: true;
  unclassifiedProductsBlocked: true;
  products: readonly StreamCatalogProductClassification[];
}>;

function feeModel(input: Readonly<{ google: boolean; sabi: boolean }>): StreamCatalogFeeModel {
  return {
    googleFeePercentMin: 15,
    googleFeePercentMax: 30,
    sabiFeePercentMin: 15,
    sabiFeePercentMax: 20,
    googleFeeApplies: input.google,
    sabiFeeApplies: input.sabi,
    creatorOrMerchantNetCalculatedAfterFeesAndHolds: true,
  };
}

function physicalProduct(
  sku: string,
  productKind: Extract<StreamCatalogProductKind, "physical_good" | "real_world_service">,
  purchasePurpose: SabiPurchasePurpose,
  targetKind: Extract<SabiPurchaseTargetKind, "physical_goods_order" | "real_world_service_order" | "merchant_settlement">,
  notes: string,
): StreamCatalogProductClassification {
  return {
    version: STREAM_PRODUCT_CATALOG_CLASSIFICATION_VERSION,
    sku,
    productKind,
    platform: "android",
    purchasePurpose,
    targetKind,
    ledgerBucket: "wallet_balance_physical_commerce",
    requiredRail: "external_payment_provider_or_bank_rail",
    providerGate: "external_payment_provider_or_bank_rail",
    launchState: "provider_not_configured",
    googleBillingRequired: false,
    physicalCommerceRailAllowed: true,
    walletPhysicalBalanceAllowed: true,
    walletPhysicalBalanceCanBuyAndroidDigital: false,
    rewardBonusCanBeSoldForCash: false,
    balanceMixingAllowed: false,
    productActiveNow: false,
    providerCallsAllowedNow: false,
    runtimeDbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    feeModel: feeModel({ google: false, sabi: true }),
    adminReviewRequired: true,
    notes,
  };
}

function androidDigitalProduct(
  sku: string,
  productKind: Extract<
    StreamCatalogProductKind,
    "android_digital_good" | "android_digital_service" | "creator_subscription" | "premium_subscription"
  >,
  purchasePurpose: SabiPurchasePurpose,
  targetKind: Extract<SabiPurchaseTargetKind, "digital_entitlement" | "creator_earning">,
  notes: string,
): StreamCatalogProductClassification {
  return {
    version: STREAM_PRODUCT_CATALOG_CLASSIFICATION_VERSION,
    sku,
    productKind,
    platform: "android",
    purchasePurpose,
    targetKind,
    ledgerBucket: "purchased_digital_coin_google_billing",
    requiredRail: "google_play_billing_android",
    providerGate: "google_play_billing_android",
    launchState: "provider_not_configured",
    googleBillingRequired: true,
    physicalCommerceRailAllowed: false,
    walletPhysicalBalanceAllowed: false,
    walletPhysicalBalanceCanBuyAndroidDigital: false,
    rewardBonusCanBeSoldForCash: false,
    balanceMixingAllowed: false,
    productActiveNow: false,
    providerCallsAllowedNow: false,
    runtimeDbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    feeModel: feeModel({ google: true, sabi: true }),
    adminReviewRequired: true,
    notes,
  };
}

function rewardProduct(
  sku: string,
  notes: string,
): StreamCatalogProductClassification {
  return {
    version: STREAM_PRODUCT_CATALOG_CLASSIFICATION_VERSION,
    sku,
    productKind: "reward_bonus",
    platform: "android",
    purchasePurpose: "other_android_in_app_digital_good_or_service",
    targetKind: "reward_bonus",
    ledgerBucket: "reward_bonus_coin",
    requiredRail: "reward_or_bonus_no_cash_purchase",
    providerGate: "google_play_billing_android",
    launchState: "classified_safe_disabled",
    googleBillingRequired: false,
    physicalCommerceRailAllowed: false,
    walletPhysicalBalanceAllowed: false,
    walletPhysicalBalanceCanBuyAndroidDigital: false,
    rewardBonusCanBeSoldForCash: false,
    balanceMixingAllowed: false,
    productActiveNow: false,
    providerCallsAllowedNow: false,
    runtimeDbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    feeModel: feeModel({ google: false, sabi: false }),
    adminReviewRequired: true,
    notes,
  };
}

export const STREAM_PRODUCT_CATALOG_CLASSIFICATIONS: readonly StreamCatalogProductClassification[] = [
  androidDigitalProduct(
    "stream_gift_coin_pack_android",
    "android_digital_good",
    "stream_digital_gift",
    "creator_earning",
    "Android Stream gift/coin pack must use Google Play Billing before entitlement or creator earning.",
  ),
  androidDigitalProduct(
    "sabi_premium_subscription_android",
    "premium_subscription",
    "premium_subscription_digital",
    "digital_entitlement",
    "Android premium subscription must use Google Play Billing where policy requires it.",
  ),
  androidDigitalProduct(
    "stream_creator_subscription_android",
    "creator_subscription",
    "creator_subscription_digital",
    "creator_earning",
    "Android creator subscription must use Google Play Billing and creator earning stays pending until holds clear.",
  ),
  androidDigitalProduct(
    "stream_boost_android",
    "android_digital_service",
    "stream_boost_digital",
    "digital_entitlement",
    "Android Stream boost is a digital service and must use Google Play Billing where required.",
  ),
  androidDigitalProduct(
    "stream_effect_pack_android",
    "android_digital_good",
    "digital_sticker_pack",
    "digital_entitlement",
    "Digital stickers/effects sold in Android must use Google Play Billing where required.",
  ),
  androidDigitalProduct(
    "sabi_ai_stream_tool_android",
    "android_digital_service",
    "ai_digital_tool",
    "digital_entitlement",
    "AI Stream tools sold as Android in-app digital services must use Google Play Billing where required.",
  ),
  physicalProduct(
    "sabi_marketplace_physical_order",
    "physical_good",
    "physical_goods_marketplace",
    "physical_goods_order",
    "Marketplace physical goods use external provider/bank rails and merchant settlement, not Google Play Billing.",
  ),
  physicalProduct(
    "sabi_supermarket_delivery_order",
    "physical_good",
    "supermarket_delivery",
    "physical_goods_order",
    "Supermarket/delivery purchases use external payment provider/bank rails, not Google Play Billing.",
  ),
  physicalProduct(
    "sabi_merchant_qr_physical_payment",
    "real_world_service",
    "offline_merchant_qr_payment",
    "merchant_settlement",
    "Merchant QR payment for physical goods/services uses commerce rails, not Google Play Billing.",
  ),
  rewardProduct(
    "sabi_reward_bonus_coin",
    "Reward/bonus value is free/earned/promo only and must not be sold for cash as Google Billing bypass.",
  ),
];

export function findStreamCatalogClassificationBySku(
  sku: string,
): StreamCatalogProductClassification | undefined {
  return STREAM_PRODUCT_CATALOG_CLASSIFICATIONS.find((item) => item.sku === sku);
}

export function buildStreamProductCatalogClassificationSnapshot(): StreamProductCatalogClassificationSnapshot {
  return {
    version: STREAM_PRODUCT_CATALOG_CLASSIFICATION_VERSION,
    sourceOnly: true,
    productActivationAllowedNow: false,
    providerCallsAllowedNow: false,
    runtimeDbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    allProductsMustBeClassifiedBeforeLaunch: true,
    unclassifiedProductsBlocked: true,
    products: STREAM_PRODUCT_CATALOG_CLASSIFICATIONS,
  };
}
