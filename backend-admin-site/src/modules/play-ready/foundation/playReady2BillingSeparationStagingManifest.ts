import { getPlayReady2BillingSeparationReadiness } from "./play-ready-2-billing-separation";

export const PLAY_READY_2_BILLING_SEPARATION_STAGING_MANIFEST = {
  version: "PLAY-READY-2",
  stage: "controlled_billing_separation_and_entitlement_architecture_source_only",
  sourceOnly: true,
  changedScope: "src/modules/play-ready/foundation/play-ready-2-billing-separation/**",
  digitalGoodsRail: "Google Play Billing for Android Play build",
  realWorldPaymentsRail: "Sabi Wallet / Airwallex / Alipay provider layer",
  walletBypassForDigitalGoodsAllowed: false,
  fakePurchaseSuccessAllowed: false,
  fakeEntitlementAllowed: false,
  fakeMoneyMovementAllowed: false,
  providerCallsNow: false,
  walletMutationNow: false,
  paymentAuthorizationNow: false,
  moneyMovementNow: false,
  nextStage: "PLAY-READY-3",
  readiness: getPlayReady2BillingSeparationReadiness(),
} as const;
