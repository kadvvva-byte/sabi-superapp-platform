export const STREAM_COIN_WALLET_DIGITAL_BILLING_BOUNDARY_VERSION = "BACKEND-STREAM-FOUNDATION-141B" as const;

export type SabiValueLedgerBucket =
  | "wallet_balance_physical_commerce"
  | "purchased_digital_coin_google_billing"
  | "reward_bonus_coin"
  | "creator_earning_pending"
  | "creator_earning_payable"
  | "merchant_settlement_pending"
  | "merchant_settlement_payable";

export type SabiPurchasePurpose =
  | "physical_goods_store"
  | "physical_goods_marketplace"
  | "supermarket_delivery"
  | "taxi_or_transport"
  | "hotel_booking"
  | "offline_merchant_qr_payment"
  | "real_world_service"
  | "premium_subscription_digital"
  | "premium_feature_digital"
  | "stream_digital_gift"
  | "stream_boost_digital"
  | "digital_badge_or_effect"
  | "digital_sticker_pack"
  | "ai_digital_tool"
  | "creator_subscription_digital"
  | "other_android_in_app_digital_good_or_service";

export type SabiRequiredPaymentRail =
  | "external_payment_provider_or_bank_rail"
  | "google_play_billing_android"
  | "reward_or_bonus_no_cash_purchase"
  | "provider_not_configured"
  | "manual_compliance_review_required";

export type SabiBillingBoundaryDecision = Readonly<{
  version: typeof STREAM_COIN_WALLET_DIGITAL_BILLING_BOUNDARY_VERSION;
  purpose: SabiPurchasePurpose;
  sourceBucket: SabiValueLedgerBucket;
  targetBucket: SabiValueLedgerBucket;
  requiredRail: SabiRequiredPaymentRail;
  googleBillingRequiredOnAndroid: boolean;
  walletOrProviderRailAllowed: boolean;
  mayUseWalletBalanceWithoutGoogleBilling: boolean;
  mayUsePurchasedDigitalCoin: boolean;
  mayUseRewardBonusCoin: boolean;
  bypassGoogleBillingAllowed: false;
  fakeSuccessAllowed: false;
  runtimeMoneyMovementAllowedNow: false;
  walletMutationAllowedNow: false;
  notes: string;
}>;

export type SabiCoinWalletDigitalBillingBoundarySnapshot = Readonly<{
  version: typeof STREAM_COIN_WALLET_DIGITAL_BILLING_BOUNDARY_VERSION;
  sourceOnly: true;
  runtimeDbWriteAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  balanceMixingAllowed: false;

  physicalCommerceDoesNotUseGoogleBilling: true;
  walletBalanceCanBuyAndroidDigitalGoodsWithoutGoogleBilling: false;
  decisions: readonly SabiBillingBoundaryDecision[];
}>;

function makePhysicalDecision(
  purpose: Extract<
    SabiPurchasePurpose,
    | "physical_goods_store"
    | "physical_goods_marketplace"
    | "supermarket_delivery"
    | "taxi_or_transport"
    | "hotel_booking"
    | "offline_merchant_qr_payment"
    | "real_world_service"
  >,
  notes: string,
): SabiBillingBoundaryDecision {
  return {
    version: STREAM_COIN_WALLET_DIGITAL_BILLING_BOUNDARY_VERSION,
    purpose,
    sourceBucket: "wallet_balance_physical_commerce",
    targetBucket: "merchant_settlement_pending",
    requiredRail: "external_payment_provider_or_bank_rail",
    googleBillingRequiredOnAndroid: false,
    walletOrProviderRailAllowed: true,
    mayUseWalletBalanceWithoutGoogleBilling: true,
    mayUsePurchasedDigitalCoin: false,
    mayUseRewardBonusCoin: true,
    bypassGoogleBillingAllowed: false,
    fakeSuccessAllowed: false,
    runtimeMoneyMovementAllowedNow: false,
    walletMutationAllowedNow: false,
    notes,
  };
}

function makeDigitalDecision(
  purpose: Extract<
    SabiPurchasePurpose,
    | "premium_subscription_digital"
    | "premium_feature_digital"
    | "stream_digital_gift"
    | "stream_boost_digital"
    | "digital_badge_or_effect"
    | "digital_sticker_pack"
    | "ai_digital_tool"
    | "creator_subscription_digital"
    | "other_android_in_app_digital_good_or_service"
  >,
  notes: string,
): SabiBillingBoundaryDecision {
  return {
    version: STREAM_COIN_WALLET_DIGITAL_BILLING_BOUNDARY_VERSION,
    purpose,
    sourceBucket: "purchased_digital_coin_google_billing",
    targetBucket: purpose === "stream_digital_gift" ? "creator_earning_pending" : "purchased_digital_coin_google_billing",
    requiredRail: "google_play_billing_android",
    googleBillingRequiredOnAndroid: true,
    walletOrProviderRailAllowed: false,
    mayUseWalletBalanceWithoutGoogleBilling: false,
    mayUsePurchasedDigitalCoin: true,
    mayUseRewardBonusCoin: true,
    bypassGoogleBillingAllowed: false,
    fakeSuccessAllowed: false,
    runtimeMoneyMovementAllowedNow: false,
    walletMutationAllowedNow: false,
    notes,
  };
}

export const SABI_COIN_WALLET_DIGITAL_BILLING_BOUNDARY_DECISIONS: readonly SabiBillingBoundaryDecision[] = [
  makePhysicalDecision(
    "physical_goods_store",
    "Store purchases, groceries, home goods and other physical commerce use Wallet/payment provider/bank rails, not Google Play Billing.",
  ),
  makePhysicalDecision(
    "physical_goods_marketplace",
    "Marketplace physical goods use commerce/merchant payment rails, KYC/KYB/AML and settlement logic, not Google Play Billing.",
  ),
  makePhysicalDecision(
    "supermarket_delivery",
    "Supermarket and food delivery are real-world goods/services and can use Wallet/payment providers outside Google Play Billing.",
  ),
  makePhysicalDecision(
    "taxi_or_transport",
    "Taxi/transport is a physical service and can use external payment rails, not Google Play Billing.",
  ),
  makePhysicalDecision(
    "hotel_booking",
    "Hotel/booking is a real-world service and can use external payment rails, not Google Play Billing.",
  ),
  makePhysicalDecision(
    "offline_merchant_qr_payment",
    "Merchant QR/pay for physical goods/services uses Wallet/payment provider rails and merchant settlement, not Google Play Billing.",
  ),
  makePhysicalDecision(
    "real_world_service",
    "Real-world services use payment provider/bank rails and compliance controls outside Google Play Billing.",
  ),
  makeDigitalDecision(
    "premium_subscription_digital",
    "Premium subscription sold/used in Android for app digital access must use Google Play Billing where required.",
  ),
  makeDigitalDecision(
    "premium_feature_digital",
    "Premium digital feature unlocks in Android must use Google Play Billing where required.",
  ),
  makeDigitalDecision(
    "stream_digital_gift",
    "Stream gifts/effects/recognition that are digital goods or digital services in Android must use Google Play Billing where required.",
  ),
  makeDigitalDecision(
    "stream_boost_digital",
    "Stream boosts and placements sold as digital services inside Android must use Google Play Billing where required.",
  ),
  makeDigitalDecision(
    "digital_badge_or_effect",
    "Digital badges/effects/status marks sold in Android must use Google Play Billing where required.",
  ),
  makeDigitalDecision(
    "digital_sticker_pack",
    "Digital stickers/effects/content packs sold in Android must use Google Play Billing where required.",
  ),
  makeDigitalDecision(
    "ai_digital_tool",
    "AI-powered in-app digital tools/services sold in Android must use Google Play Billing where required.",
  ),
  makeDigitalDecision(
    "creator_subscription_digital",
    "Creator subscriptions consumed in Android must use Google Play Billing where required.",
  ),
  makeDigitalDecision(
    "other_android_in_app_digital_good_or_service",
    "Catch-all digital boundary: if the value is consumed as an Android in-app digital good/service, Google Play Billing is required where policy requires it.",
  ),
  {
    version: STREAM_COIN_WALLET_DIGITAL_BILLING_BOUNDARY_VERSION,
    purpose: "other_android_in_app_digital_good_or_service",
    sourceBucket: "reward_bonus_coin",
    targetBucket: "purchased_digital_coin_google_billing",
    requiredRail: "reward_or_bonus_no_cash_purchase",
    googleBillingRequiredOnAndroid: false,
    walletOrProviderRailAllowed: false,
    mayUseWalletBalanceWithoutGoogleBilling: false,
    mayUsePurchasedDigitalCoin: false,
    mayUseRewardBonusCoin: true,
    bypassGoogleBillingAllowed: false,
    fakeSuccessAllowed: false,
    runtimeMoneyMovementAllowedNow: false,
    walletMutationAllowedNow: false,
    notes:
      "Earned/free/reward/bonus value can be issued without Google Billing only when it is not sold for cash in-app and not used as a paid-currency bypass.",
  },
];

export function buildSabiCoinWalletDigitalBillingBoundarySnapshot(): SabiCoinWalletDigitalBillingBoundarySnapshot {
  return {
    version: STREAM_COIN_WALLET_DIGITAL_BILLING_BOUNDARY_VERSION,
    sourceOnly: true,
    runtimeDbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    balanceMixingAllowed: false,

    physicalCommerceDoesNotUseGoogleBilling: true,
    walletBalanceCanBuyAndroidDigitalGoodsWithoutGoogleBilling: false,
    decisions: SABI_COIN_WALLET_DIGITAL_BILLING_BOUNDARY_DECISIONS,
  };
}
