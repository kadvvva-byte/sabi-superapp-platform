import {
  STREAM_COIN_WALLET_DIGITAL_BILLING_BOUNDARY_VERSION,
  SABI_COIN_WALLET_DIGITAL_BILLING_BOUNDARY_DECISIONS,
  type SabiBillingBoundaryDecision,
  type SabiPurchasePurpose,
  type SabiRequiredPaymentRail,
} from "./stream-coin-wallet-digital-billing-boundary.contracts";

export type SabiBillingBoundaryClassifierPlan = Readonly<{
  version: typeof STREAM_COIN_WALLET_DIGITAL_BILLING_BOUNDARY_VERSION;
  sourceOnly: true;
  planningStage: "BACKEND_STREAM_FOUNDATION_141B";
  physicalCommerceDoesNotUseGoogleBilling: true;
  androidDigitalGoodsUseGoogleBillingWhereRequired: true;
  walletBalanceCanBypassGoogleForAndroidDigitalGoods: false;
  balanceMixingAllowed: false;
  futureClassifierInputs: readonly string[];
  futureHardBlocks: readonly string[];
  futureLedgerBuckets: readonly string[];
  decisions: readonly SabiBillingBoundaryDecision[];
}>;

export const SABI_BILLING_BOUNDARY_CLASSIFIER_PLAN: SabiBillingBoundaryClassifierPlan = {
  version: STREAM_COIN_WALLET_DIGITAL_BILLING_BOUNDARY_VERSION,
  sourceOnly: true,
  planningStage: "BACKEND_STREAM_FOUNDATION_141B",
  physicalCommerceDoesNotUseGoogleBilling: true,
  androidDigitalGoodsUseGoogleBillingWhereRequired: true,
  walletBalanceCanBypassGoogleForAndroidDigitalGoods: false,
  balanceMixingAllowed: false,
  futureClassifierInputs: [
    "platform: android | ios | web | admin",
    "purchasePurpose",
    "sku/product classification: physical_good | real_world_service | digital_good | digital_service | reward_bonus",
    "consumptionLocation: in_app_android | outside_app | physical_world",
    "fundingSourceBucket",
    "merchantOrCreatorTarget",
    "complianceState",
  ],
  futureHardBlocks: [
    "Block wallet_balance_physical_commerce -> Android digital entitlement purchase.",
    "Block external provider/bank/QR payment for Android premium subscription and digital goods where Google Billing is required.",
    "Block purchased_digital_coin_google_billing -> physical merchant settlement unless separate refund/tax/accounting bridge is explicitly approved.",
    "Block reward_bonus_coin cash-out unless separate compliance/anti-abuse rules approve it.",
    "Block fake purchase success, fake provider success, fake money movement and fake streamer payout.",
  ],
  futureLedgerBuckets: [
    "wallet_balance_physical_commerce",
    "purchased_digital_coin_google_billing",
    "reward_bonus_coin",
    "creator_earning_pending",
    "creator_earning_payable",
    "merchant_settlement_pending",
    "merchant_settlement_payable",
  ],
  decisions: SABI_COIN_WALLET_DIGITAL_BILLING_BOUNDARY_DECISIONS,
};

export function getSabiBillingBoundaryRailForPurpose(purpose: SabiPurchasePurpose): SabiRequiredPaymentRail {
  const exact = SABI_COIN_WALLET_DIGITAL_BILLING_BOUNDARY_DECISIONS.find((item) => item.purpose === purpose);
  return exact?.requiredRail ?? "manual_compliance_review_required";
}

export function getSabiBillingBoundaryClassifierPlan(): SabiBillingBoundaryClassifierPlan {
  return SABI_BILLING_BOUNDARY_CLASSIFIER_PLAN;
}
