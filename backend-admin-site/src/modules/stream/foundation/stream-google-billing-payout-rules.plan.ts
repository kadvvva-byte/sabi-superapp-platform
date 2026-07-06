import {
  STREAM_GOOGLE_BILLING_PAYOUT_RULES_VERSION,
  STREAM_GOOGLE_BILLING_FEE_RULES,
  STREAM_PAYOUT_FORMULA,
  STREAM_PAYOUT_HOLD_REASONS,
  type StreamFeeRule,
  type StreamPayoutFormula,
  type StreamPayoutHoldReason,
} from "./stream-google-billing-payout-rules.contracts";

export type StreamGoogleBillingPayoutImplementationPlan = Readonly<{
  version: typeof STREAM_GOOGLE_BILLING_PAYOUT_RULES_VERSION;
  sourceOnly: true;
  planningStage: "BACKEND_STREAM_FOUNDATION_141A_FIX1";
  allAndroidInAppDigitalGoodsAndServicesUseGoogleBilling: true;
  liveBillingEnabledNow: false;
  googleProviderCallAllowedNow: false;
  runtimeDbWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  billingBypassBlockedFor: readonly string[];
  requiredFutureProviderSteps: readonly string[];
  requiredFutureLedgerSteps: readonly string[];
  requiredFutureAdminSteps: readonly string[];
  requiredFutureMobileSteps: readonly string[];
  feeRules: readonly StreamFeeRule[];
  payoutFormula: StreamPayoutFormula;
  payoutHoldReasons: readonly StreamPayoutHoldReason[];
}>;

export const STREAM_GOOGLE_BILLING_PAYOUT_IMPLEMENTATION_PLAN: StreamGoogleBillingPayoutImplementationPlan = {
  version: STREAM_GOOGLE_BILLING_PAYOUT_RULES_VERSION,
  sourceOnly: true,
  planningStage: "BACKEND_STREAM_FOUNDATION_141A_FIX1",
  allAndroidInAppDigitalGoodsAndServicesUseGoogleBilling: true,
  liveBillingEnabledNow: false,
  googleProviderCallAllowedNow: false,
  runtimeDbWriteAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  fakeSuccessAllowed: false,
  billingBypassBlockedFor: [
    "premium subscriptions",
    "premium feature unlocks",
    "creator subscriptions",
    "digital gifts",
    "coin packs",
    "digital badges",
    "digital sticker/effect packs",
    "digital boosts",
    "AI-powered digital tools",
    "any other in-app digital/electronic good or service consumed in Android",
  ],
  requiredFutureProviderSteps: [
    "Configure Google Play Console products for premium subscriptions, digital gifts, coin packs, premium features, creator subscriptions and other digital goods/services.",
    "Implement server-side Google purchase token verification before any entitlement, coin credit, gift transfer or streamer earning is created.",
    "Acknowledge or consume purchases only after server verification and idempotency checks.",
    "Keep Google/Play API credentials server-side only; mobile must never contain provider secrets.",
    "Support refunds, voided purchases, chargebacks and subscription lifecycle events before public launch.",
  ],
  requiredFutureLedgerSteps: [
    "Create append-only billing ledger entries for gross payment, Google fee, Sabi fee, reserve, hold and streamer/creator net payable.",
    "Do not credit active streamer payout balance immediately after gift receipt.",
    "Apply monthly gift income release rule and compliance checks before moving earnings to spendable/withdrawable balance.",
    "Keep Wallet, Coin and Stream earning balances separated until approved ledger bridge is implemented.",
    "Do not use Wallet/QR/bank/provider checkout to bypass Google Play Billing for Android in-app digital goods/services.",
  ],
  requiredFutureAdminSteps: [
    "Admin must show Google Billing configured/not-configured state.",
    "Admin must show product catalog, fee tier, Sabi fee, payout formula and settlement state.",
    "Admin must show payout holds, refund/chargeback impact, compliance holds and approval actions.",
    "Admin must block fake provider success and any mismatch between Google settlement and internal ledger.",
    "Admin must classify every monetized item as digital, physical, service exception, or provider-not-configured before launch.",
  ],
  requiredFutureMobileSteps: [
    "Mobile Stream gifts, premium subscriptions, premium features and digital services must call Google Play Billing on Android where required.",
    "Mobile must show honest pricing and payout disclosure without promising instant streamer withdrawal.",
    "Mobile must show provider_not_configured instead of fake purchase success until backend/provider is live.",
    "Mobile must never include Google API secrets or server credentials.",
    "Mobile must not present Wallet/QR/bank checkout as a bypass for Android in-app digital goods/services.",
  ],
  feeRules: STREAM_GOOGLE_BILLING_FEE_RULES,
  payoutFormula: STREAM_PAYOUT_FORMULA,
  payoutHoldReasons: STREAM_PAYOUT_HOLD_REASONS,
};


export const STREAM_GOOGLE_BILLING_REQUIRED_MARKERS = {
  serverSidePurchaseVerification: "server-side purchase verification",
  googleBillingRequiredForAllAndroidDigitalGoods: "all Android in-app digital goods and services use Google Billing where policy requires it",
  walletQrBankBypassBlocked: "Wallet/QR/bank checkout as a bypass is blocked for Android digital goods/services",
} as const;

export function getStreamGoogleBillingPayoutImplementationPlan(): StreamGoogleBillingPayoutImplementationPlan {
  return STREAM_GOOGLE_BILLING_PAYOUT_IMPLEMENTATION_PLAN;
}
