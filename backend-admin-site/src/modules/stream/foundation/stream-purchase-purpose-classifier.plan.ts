import {
  STREAM_PURCHASE_PURPOSE_CLASSIFIER_VERSION,
  buildSabiPurchasePurposeClassifierTestSnapshot,
  classifySabiPurchasePurpose,
  type SabiPurchasePurposeClassifierDecision,
  type SabiPurchasePurposeClassifierInput,
} from "./stream-purchase-purpose-classifier.contracts";

export type SabiPurchasePurposeClassifierSourcePlan = Readonly<{
  version: typeof STREAM_PURCHASE_PURPOSE_CLASSIFIER_VERSION;
  sourceOnly: true;
  planningStage: "BACKEND_STREAM_FOUNDATION_141D";
  runtimeUseAllowedNow: false;
  routeMountAllowedNow: false;
  liveBillingEnabledNow: false;
  googleProviderCallAllowedNow: false;
  runtimeDbWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  classifierRequiredBefore: readonly string[];
  hardSafetyRules: readonly string[];
  testSnapshot: readonly SabiPurchasePurposeClassifierDecision[];
}>;

export const SABI_PURCHASE_PURPOSE_CLASSIFIER_SOURCE_PLAN: SabiPurchasePurposeClassifierSourcePlan = {
  version: STREAM_PURCHASE_PURPOSE_CLASSIFIER_VERSION,
  sourceOnly: true,
  planningStage: "BACKEND_STREAM_FOUNDATION_141D",
  runtimeUseAllowedNow: false,
  routeMountAllowedNow: false,
  liveBillingEnabledNow: false,
  googleProviderCallAllowedNow: false,
  runtimeDbWriteAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  fakeSuccessAllowed: false,
  classifierRequiredBefore: [
    "Any Stream digital gift purchase route",
    "Any premium subscription route",
    "Any premium feature unlock route",
    "Any Coin conversion or balance bridge",
    "Any Wallet-to-digital entitlement bridge",
    "Any creator earning ledger write",
    "Any merchant settlement ledger write",
  ],
  hardSafetyRules: [
    "Physical commerce can use Wallet/payment provider/bank rails and must not be routed through Google Billing.",
    "Android in-app digital goods/services must use Google Play Billing where policy requires it.",
    "Wallet physical-commerce balance cannot buy Android digital entitlements without Google Billing.",
    "Purchased digital coin cannot pay physical merchants unless a separate legal/accounting bridge is approved later.",
    "Reward/bonus coin cannot be sold for cash and cannot be used as a paid-currency bypass.",
    "No fake Google verification, fake Wallet credit, fake streamer payout, fake merchant settlement or fake success.",
  ],
  testSnapshot: buildSabiPurchasePurposeClassifierTestSnapshot(),
};

export function getSabiPurchasePurposeClassifierSourcePlan(): SabiPurchasePurposeClassifierSourcePlan {
  return SABI_PURCHASE_PURPOSE_CLASSIFIER_SOURCE_PLAN;
}

export function previewSabiPurchasePurposeClassification(
  input: SabiPurchasePurposeClassifierInput,
): SabiPurchasePurposeClassifierDecision {
  return classifySabiPurchasePurpose(input);
}
