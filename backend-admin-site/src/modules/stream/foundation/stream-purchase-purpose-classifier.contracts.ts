import {
  type SabiPurchasePurpose,
  type SabiRequiredPaymentRail,
  type SabiValueLedgerBucket,
} from "./stream-coin-wallet-digital-billing-boundary.contracts";

export const STREAM_PURCHASE_PURPOSE_CLASSIFIER_VERSION = "BACKEND-STREAM-FOUNDATION-141D" as const;

export type SabiPurchasePlatform =
  | "android"
  | "ios_future"
  | "web_future"
  | "admin";

export type SabiPurchaseTargetKind =
  | "physical_goods_order"
  | "real_world_service_order"
  | "merchant_settlement"
  | "digital_entitlement"
  | "creator_earning"
  | "reward_bonus"
  | "manual_review";

export type SabiPurchaseClassificationStatus =
  | "physical_commerce_payment_rail"
  | "android_digital_google_billing_required"
  | "reward_bonus_no_cash_purchase"
  | "blocked_wallet_balance_google_billing_bypass"
  | "manual_compliance_review_required";

export type SabiPurchasePurposeClassifierInput = Readonly<{
  platform: SabiPurchasePlatform;
  purpose: SabiPurchasePurpose;
  fundingBucket: SabiValueLedgerBucket;
  targetKind: SabiPurchaseTargetKind;
}>;

export type SabiPurchasePurposeClassifierDecision = Readonly<{
  version: typeof STREAM_PURCHASE_PURPOSE_CLASSIFIER_VERSION;
  input: SabiPurchasePurposeClassifierInput;
  status: SabiPurchaseClassificationStatus;
  requiredRail: SabiRequiredPaymentRail;
  googleBillingRequiredOnAndroid: boolean;
  walletPhysicalCommerceRailAllowed: boolean;
  walletBalanceCanBuyAndroidDigitalEntitlement: false;
  balanceMixingAllowed: false;
  runtimeDbWriteAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  hardBlockReasons: readonly string[];
  notes: string;
}>;

const PHYSICAL_PURPOSES: readonly SabiPurchasePurpose[] = [
  "physical_goods_store",
  "physical_goods_marketplace",
  "supermarket_delivery",
  "taxi_or_transport",
  "hotel_booking",
  "offline_merchant_qr_payment",
  "real_world_service",
];

const ANDROID_DIGITAL_PURPOSES: readonly SabiPurchasePurpose[] = [
  "premium_subscription_digital",
  "premium_feature_digital",
  "stream_digital_gift",
  "stream_boost_digital",
  "digital_badge_or_effect",
  "digital_sticker_pack",
  "ai_digital_tool",
  "creator_subscription_digital",
  "other_android_in_app_digital_good_or_service",
];

const PHYSICAL_TARGETS: readonly SabiPurchaseTargetKind[] = [
  "physical_goods_order",
  "real_world_service_order",
  "merchant_settlement",
];

const DIGITAL_TARGETS: readonly SabiPurchaseTargetKind[] = [
  "digital_entitlement",
  "creator_earning",
];

export function isSabiPhysicalCommercePurpose(purpose: SabiPurchasePurpose): boolean {
  return PHYSICAL_PURPOSES.includes(purpose);
}

export function isSabiAndroidDigitalPurpose(purpose: SabiPurchasePurpose): boolean {
  return ANDROID_DIGITAL_PURPOSES.includes(purpose);
}

export function classifySabiPurchasePurpose(
  input: SabiPurchasePurposeClassifierInput,
): SabiPurchasePurposeClassifierDecision {
  const hardBlockReasons: string[] = [];

  const isPhysical = isSabiPhysicalCommercePurpose(input.purpose);
  const isDigital = isSabiAndroidDigitalPurpose(input.purpose);
  const usesPhysicalWallet = input.fundingBucket === "wallet_balance_physical_commerce";
  const usesDigitalCoin = input.fundingBucket === "purchased_digital_coin_google_billing";
  const usesRewardBonus = input.fundingBucket === "reward_bonus_coin";
  const physicalTarget = PHYSICAL_TARGETS.includes(input.targetKind);
  const digitalTarget = DIGITAL_TARGETS.includes(input.targetKind);
  const androidDigital = input.platform === "android" && isDigital;

  if (androidDigital && usesPhysicalWallet) {
    hardBlockReasons.push("wallet_balance_physical_commerce_cannot_buy_android_digital_entitlement_without_google_billing");
  }

  if (androidDigital && physicalTarget) {
    hardBlockReasons.push("android_digital_purchase_cannot_target_physical_or_merchant_settlement");
  }

  if (isPhysical && usesDigitalCoin) {
    hardBlockReasons.push("purchased_digital_coin_google_billing_cannot_pay_physical_merchant_without_separate_approved_accounting_bridge");
  }

  if (isPhysical && digitalTarget) {
    hardBlockReasons.push("physical_commerce_purchase_cannot_create_digital_or_creator_entitlement");
  }

  if (usesRewardBonus && input.targetKind === "merchant_settlement") {
    hardBlockReasons.push("reward_bonus_coin_cannot_cash_out_or_settle_to_merchant_by_default");
  }

  if (hardBlockReasons.length > 0) {
    return {
      version: STREAM_PURCHASE_PURPOSE_CLASSIFIER_VERSION,
      input,
      status: "blocked_wallet_balance_google_billing_bypass",
      requiredRail: "manual_compliance_review_required",
      googleBillingRequiredOnAndroid: androidDigital,
      walletPhysicalCommerceRailAllowed: false,
      walletBalanceCanBuyAndroidDigitalEntitlement: false,
      balanceMixingAllowed: false,
      runtimeDbWriteAllowedNow: false,
      providerCallAllowedNow: false,
      walletMutationAllowedNow: false,
      moneyMovementAllowedNow: false,
      fakeSuccessAllowed: false,
      hardBlockReasons,
      notes: "Classifier blocked this purchase route because it would mix balances or bypass the required billing/payment rail.",
    };
  }

  if (androidDigital) {
    return {
      version: STREAM_PURCHASE_PURPOSE_CLASSIFIER_VERSION,
      input,
      status: "android_digital_google_billing_required",
      requiredRail: "google_play_billing_android",
      googleBillingRequiredOnAndroid: true,
      walletPhysicalCommerceRailAllowed: false,
      walletBalanceCanBuyAndroidDigitalEntitlement: false,
      balanceMixingAllowed: false,
      runtimeDbWriteAllowedNow: false,
      providerCallAllowedNow: false,
      walletMutationAllowedNow: false,
      moneyMovementAllowedNow: false,
      fakeSuccessAllowed: false,
      hardBlockReasons,
      notes: "Android in-app digital good/service must route through Google Play Billing where policy requires it.",
    };
  }

  if (isPhysical && usesPhysicalWallet && physicalTarget) {
    return {
      version: STREAM_PURCHASE_PURPOSE_CLASSIFIER_VERSION,
      input,
      status: "physical_commerce_payment_rail",
      requiredRail: "external_payment_provider_or_bank_rail",
      googleBillingRequiredOnAndroid: false,
      walletPhysicalCommerceRailAllowed: true,
      walletBalanceCanBuyAndroidDigitalEntitlement: false,
      balanceMixingAllowed: false,
      runtimeDbWriteAllowedNow: false,
      providerCallAllowedNow: false,
      walletMutationAllowedNow: false,
      moneyMovementAllowedNow: false,
      fakeSuccessAllowed: false,
      hardBlockReasons,
      notes: "Physical commerce or real-world service can use Wallet/payment provider/bank rails, not Google Play Billing.",
    };
  }

  if (usesRewardBonus && !physicalTarget) {
    return {
      version: STREAM_PURCHASE_PURPOSE_CLASSIFIER_VERSION,
      input,
      status: "reward_bonus_no_cash_purchase",
      requiredRail: "reward_or_bonus_no_cash_purchase",
      googleBillingRequiredOnAndroid: false,
      walletPhysicalCommerceRailAllowed: false,
      walletBalanceCanBuyAndroidDigitalEntitlement: false,
      balanceMixingAllowed: false,
      runtimeDbWriteAllowedNow: false,
      providerCallAllowedNow: false,
      walletMutationAllowedNow: false,
      moneyMovementAllowedNow: false,
      fakeSuccessAllowed: false,
      hardBlockReasons,
      notes: "Reward/bonus value can be used only as free/earned value and must not become a paid-currency bypass.",
    };
  }

  return {
    version: STREAM_PURCHASE_PURPOSE_CLASSIFIER_VERSION,
    input,
    status: "manual_compliance_review_required",
    requiredRail: "manual_compliance_review_required",
    googleBillingRequiredOnAndroid: androidDigital,
    walletPhysicalCommerceRailAllowed: false,
    walletBalanceCanBuyAndroidDigitalEntitlement: false,
    balanceMixingAllowed: false,
    runtimeDbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    hardBlockReasons: ["classifier_route_not_explicitly_allowed"],
    notes: "Unrecognized or incomplete purchase route stays blocked until compliance/admin review.",
  };
}

export const STREAM_PURCHASE_PURPOSE_CLASSIFIER_TEST_CASES: readonly SabiPurchasePurposeClassifierInput[] = [
  {
    platform: "android",
    purpose: "physical_goods_store",
    fundingBucket: "wallet_balance_physical_commerce",
    targetKind: "physical_goods_order",
  },
  {
    platform: "android",
    purpose: "premium_subscription_digital",
    fundingBucket: "wallet_balance_physical_commerce",
    targetKind: "digital_entitlement",
  },
  {
    platform: "android",
    purpose: "stream_digital_gift",
    fundingBucket: "purchased_digital_coin_google_billing",
    targetKind: "creator_earning",
  },
  {
    platform: "android",
    purpose: "stream_digital_gift",
    fundingBucket: "reward_bonus_coin",
    targetKind: "digital_entitlement",
  },
  {
    platform: "android",
    purpose: "physical_goods_marketplace",
    fundingBucket: "purchased_digital_coin_google_billing",
    targetKind: "merchant_settlement",
  },
];

export function buildSabiPurchasePurposeClassifierTestSnapshot(): readonly SabiPurchasePurposeClassifierDecision[] {
  return STREAM_PURCHASE_PURPOSE_CLASSIFIER_TEST_CASES.map((item) => classifySabiPurchasePurpose(item));
}
