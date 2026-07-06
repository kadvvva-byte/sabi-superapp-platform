export const STREAM_GOOGLE_BILLING_PAYOUT_RULES_VERSION = "BACKEND-STREAM-FOUNDATION-141A-FIX1" as const;

export type StreamMonetizationProductKind =
  | "stream_digital_gift"
  | "stream_coin_pack"
  | "stream_creator_subscription"
  | "stream_user_premium_subscription"
  | "stream_premium_feature"
  | "stream_digital_badge"
  | "stream_digital_sticker_or_effect_pack"
  | "stream_business_showcase_boost"
  | "stream_ai_stream_tool"
  | "stream_other_in_app_digital_good_or_service";

export type StreamBillingRail =
  | "google_play_billing_android"
  | "apple_in_app_purchase_ios_future"
  | "web_or_non_android_future"
  | "provider_not_configured";

export type StreamGoogleServiceFeeModel =
  | "google_15_percent_tier_expected_when_eligible"
  | "google_30_percent_standard_or_above_threshold"
  | "google_subscription_15_percent"
  | "google_user_choice_billing_region_specific_future"
  | "google_fee_unknown_until_play_console_settlement";

export type StreamPayoutHoldReason =
  | "google_purchase_not_verified"
  | "google_purchase_not_acknowledged_or_consumed"
  | "refund_window"
  | "chargeback_or_dispute_window"
  | "tax_or_withholding_review"
  | "kyc_kyb_aml_review"
  | "fraud_risk_review"
  | "monthly_gift_income_release_rule"
  | "provider_settlement_pending"
  | "admin_review_required";

export type StreamFeeRule = Readonly<{
  version: typeof STREAM_GOOGLE_BILLING_PAYOUT_RULES_VERSION;
  billingRail: StreamBillingRail;
  productKind: StreamMonetizationProductKind;
  googlePlayBillingRequiredOnAndroid: true;
  bypassGooglePlayBillingAllowed: false;
  targetGoogleFeePercentMin: 15;
  targetGoogleFeePercentMax: 30;
  sabiPlatformFeePercentMin: 15;
  sabiPlatformFeePercentMax: 20;
  streamerPayoutCalculatedOnlyAfterGoogleFee: true;
  streamerPayoutCalculatedOnlyAfterSabiFee: true;
  streamerPayoutCalculatedOnlyAfterComplianceHold: true;
  payoutAvailableImmediately: false;
  fakeBillingSuccessAllowed: false;
  fakeMoneyMovementAllowed: false;
  mobileProviderSecretsAllowed: false;
  serverSidePurchaseVerificationRequired: true;
  walletCreditAllowedNow: false;
  notes: string;
}>;

export type StreamPayoutFormulaComponent =
  | "gross_user_payment"
  | "google_play_service_fee"
  | "sabi_platform_service_fee"
  | "tax_or_withholding"
  | "refund_chargeback_dispute_reserve"
  | "compliance_or_fraud_hold"
  | "provider_settlement_hold"
  | "streamer_payable_net";

export type StreamPayoutFormula = Readonly<{
  grossUserPayment: "input_minor_units";
  googlePlayServiceFee: "grossUserPayment * googleFeePercent";
  sabiPlatformServiceFee: "(grossUserPayment - googlePlayServiceFee) * sabiFeePercent";
  streamerPayableNet: "grossUserPayment - googlePlayServiceFee - sabiPlatformServiceFee - taxOrWithholding - refundReserve - complianceHold - providerSettlementHold";
  payableCreditTiming: "monthly_release_or_admin_approved_settlement";
  components: readonly StreamPayoutFormulaComponent[];
}>;

export type StreamGoogleBillingPayoutRulesSnapshot = Readonly<{
  version: typeof STREAM_GOOGLE_BILLING_PAYOUT_RULES_VERSION;
  sourceOnly: true;
  allAndroidInAppDigitalGoodsAndServicesUseGoogleBilling: true;
  liveBillingEnabledNow: false;
  googleProviderCallAllowedNow: false;
  runtimeDbWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  feeRules: readonly StreamFeeRule[];
  payoutFormula: StreamPayoutFormula;
  payoutHoldReasons: readonly StreamPayoutHoldReason[];
}>;

function makeRule(productKind: StreamMonetizationProductKind, notes: string): StreamFeeRule {
  return {
    version: STREAM_GOOGLE_BILLING_PAYOUT_RULES_VERSION,
    billingRail: "google_play_billing_android",
    productKind,
    googlePlayBillingRequiredOnAndroid: true,
    bypassGooglePlayBillingAllowed: false,
    targetGoogleFeePercentMin: 15,
    targetGoogleFeePercentMax: 30,
    sabiPlatformFeePercentMin: 15,
    sabiPlatformFeePercentMax: 20,
    streamerPayoutCalculatedOnlyAfterGoogleFee: true,
    streamerPayoutCalculatedOnlyAfterSabiFee: true,
    streamerPayoutCalculatedOnlyAfterComplianceHold: true,
    payoutAvailableImmediately: false,
    fakeBillingSuccessAllowed: false,
    fakeMoneyMovementAllowed: false,
    mobileProviderSecretsAllowed: false,
    serverSidePurchaseVerificationRequired: true,
    walletCreditAllowedNow: false,
    notes,
  };
}

export const STREAM_GOOGLE_BILLING_FEE_RULES: readonly StreamFeeRule[] = [
  makeRule(
    "stream_digital_gift",
    "Android stream digital gifts must use Google Play Billing where policy requires it. Streamer payout is net after Google fee, Sabi fee, tax/withholding, refund/chargeback reserve, compliance hold and settlement rules.",
  ),
  makeRule(
    "stream_coin_pack",
    "Purchased virtual currency/coin packs used in-app for digital goods/services must use Google Play Billing on Android. Earned/awarded points must stay separated from purchased digital currency accounting.",
  ),
  makeRule(
    "stream_creator_subscription",
    "Creator subscriptions sold in the Android app must use Google Play Billing/subscription products where policy requires it.",
  ),
  makeRule(
    "stream_user_premium_subscription",
    "User premium subscription for Sabi/Stream premium features sold in the Android app must use Google Play Billing. Do not route premium subscription payment through Wallet, bank, QR, web checkout, or provider workaround inside Android.",
  ),
  makeRule(
    "stream_premium_feature",
    "One-time or recurring premium feature unlocks sold in the Android app must use Google Play Billing if they are in-app digital services.",
  ),
  makeRule(
    "stream_digital_badge",
    "Digital badges, status marks, creator badges and similar in-app digital identity items sold in Android must use Google Play Billing.",
  ),
  makeRule(
    "stream_digital_sticker_or_effect_pack",
    "Digital sticker, video effect, beauty/filter, avatar or stream effect packs sold in Android must use Google Play Billing.",
  ),
  makeRule(
    "stream_business_showcase_boost",
    "Business Stream digital boosts/showcase placements sold as in-app digital services on Android must use Google Play Billing unless a specific policy exception applies and is reviewed separately.",
  ),
  makeRule(
    "stream_ai_stream_tool",
    "AI-powered Stream digital tools/features sold in Android as in-app digital services must use Google Play Billing where policy requires it.",
  ),
  makeRule(
    "stream_other_in_app_digital_good_or_service",
    "Catch-all rule: every in-app electronic/digital good or service consumed in Sabi Android must be classified first; if Google policy requires Play Billing, it must use Google Play Billing and must not bypass Google.",
  ),
];

export const STREAM_PAYOUT_FORMULA: StreamPayoutFormula = {
  grossUserPayment: "input_minor_units",
  googlePlayServiceFee: "grossUserPayment * googleFeePercent",
  sabiPlatformServiceFee: "(grossUserPayment - googlePlayServiceFee) * sabiFeePercent",
  streamerPayableNet:
    "grossUserPayment - googlePlayServiceFee - sabiPlatformServiceFee - taxOrWithholding - refundReserve - complianceHold - providerSettlementHold",
  payableCreditTiming: "monthly_release_or_admin_approved_settlement",
  components: [
    "gross_user_payment",
    "google_play_service_fee",
    "sabi_platform_service_fee",
    "tax_or_withholding",
    "refund_chargeback_dispute_reserve",
    "compliance_or_fraud_hold",
    "provider_settlement_hold",
    "streamer_payable_net",
  ],
};

export const STREAM_PAYOUT_HOLD_REASONS: readonly StreamPayoutHoldReason[] = [
  "google_purchase_not_verified",
  "google_purchase_not_acknowledged_or_consumed",
  "refund_window",
  "chargeback_or_dispute_window",
  "tax_or_withholding_review",
  "kyc_kyb_aml_review",
  "fraud_risk_review",
  "monthly_gift_income_release_rule",
  "provider_settlement_pending",
  "admin_review_required",
];

export function buildStreamGoogleBillingPayoutRulesSnapshot(): StreamGoogleBillingPayoutRulesSnapshot {
  return {
    version: STREAM_GOOGLE_BILLING_PAYOUT_RULES_VERSION,
    sourceOnly: true,
    allAndroidInAppDigitalGoodsAndServicesUseGoogleBilling: true,
    liveBillingEnabledNow: false,
    googleProviderCallAllowedNow: false,
    runtimeDbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    feeRules: STREAM_GOOGLE_BILLING_FEE_RULES,
    payoutFormula: STREAM_PAYOUT_FORMULA,
    payoutHoldReasons: STREAM_PAYOUT_HOLD_REASONS,
  };
}
