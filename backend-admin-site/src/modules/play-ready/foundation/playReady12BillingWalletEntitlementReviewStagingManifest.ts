import { getPlayReady12Readiness } from "./play-ready-12-billing-wallet-entitlement-review";

export const PLAY_READY_12_BILLING_WALLET_ENTITLEMENT_REVIEW_STAGING_MANIFEST = {
  version: "PLAY-READY-12",
  stage: "controlled_billing_vs_wallet_separation_and_entitlement_target_patch_review_source_only",
  sourceOnly: true,
  changedScope: "src/modules/play-ready/foundation/play-ready-12-billing-wallet-entitlement-review/**",
  reviewCovers: [
    "Google Play Billing product map",
    "purchase token verification",
    "entitlement ledger states",
    "Wallet bypass hard-block for digital goods",
    "refund/revoke/expire states",
    "provider_not_configured reviewer evidence",
    "no fake purchase/entitlement success",
  ],
  targetFilesModifiedNow: false,
  backendRestartNow: false,
  runtimeDbWriteNow: false,
  providerCallsNow: false,
  walletMutationNow: false,
  paymentAuthorizationNow: false,
  moneyMovementNow: false,
  noFakePurchaseSuccess: true,
  noFakeEntitlementSuccess: true,
  noFakeSuccess: true,
  nextStage: "PLAY-READY-13",
  readiness: getPlayReady12Readiness(),
} as const;
