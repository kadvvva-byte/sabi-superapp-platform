export const PLAY_READY_12_VERSION = "PLAY-READY-12" as const;

export const PLAY_READY_12_OWNER_APPROVAL_TEXT = "I approve PLAY-READY-12 controlled billing-vs-wallet separation and entitlement target patch review package source-only, use PLAY-READY-11 provider_not_configured evidence review and PLAY-READY-7 gap-closure planning to prepare an exact future changed-file patch review for Google Play Billing product map, purchase token verification, entitlement ledger states, Wallet bypass hard-block for digital goods, refund/revoke/expire states, provider_not_configured reviewer evidence, and no fake purchase/entitlement success, without executing target writes, without backend restart, without runtime DB write, without provider calls, without Wallet mutation, without payment authorization, without money movement, and without fake success.";
export const PLAY_READY_12_REQUIRED_APPROVAL_TEXT_FOR_PLAY_READY_13 = "I approve PLAY-READY-13 controlled financial features, NFT/tokenized assets, virtual card disclosure target patch review package source-only, use PLAY-READY-12 billing entitlement review and PLAY-READY-7 gap-closure planning to prepare an exact future changed-file patch review for Play Console Financial features declaration evidence, tokenized digital asset disclosure, no NFT gambling/staking/chance-based unknown value, virtual card issuer/provider_not_configured copy, no raw PAN/CVV storage evidence, no fake NFT minting, no fake card issuing, and no fake balance, without executing target writes, without backend restart, without runtime DB write, without provider calls, without secret value exposure, without Wallet mutation, without payment authorization, without money movement, and without fake success.";

export type PlayReady12TargetStatus =
  | "observed_candidate"
  | "future_target_write_required_after_approval"
  | "missing_requires_local_project_confirmation";

export type PlayReady12DigitalProductKind =
  | "subscription"
  | "consumable"
  | "non_consumable"
  | "usage_pack"
  | "virtual_currency_for_digital_goods";

export type PlayReady12EntitlementState =
  | "pending_verification"
  | "active"
  | "consumed"
  | "expired"
  | "refunded"
  | "revoked"
  | "provider_not_configured"
  | "verification_failed";

export interface PlayReady12FutureChangedFileReview {
  readonly path: string;
  readonly status: PlayReady12TargetStatus;
  readonly futurePurpose: string;
  readonly plannedChange: string;
  readonly writeExecutedNow: false;
  readonly runtimeEffectNow: false;
}

export interface PlayReady12DigitalProductMapItem {
  readonly id: string;
  readonly module: "Sabi AI Assistant" | "Stream" | "Messenger" | "Games" | "Cross-module digital economy";
  readonly productKind: PlayReady12DigitalProductKind;
  readonly playBillingRequiredInAndroidPlayBuild: true;
  readonly walletBypassAllowed: false;
  readonly airwallexBypassAllowed: false;
  readonly alipayBypassAllowed: false;
  readonly entitlementLedgerRequired: true;
  readonly serverPurchaseTokenVerificationRequired: true;
  readonly fakePurchaseSuccessAllowed: false;
}

export const PLAY_READY_12_BILLING_WALLET_ENTITLEMENT_REVIEW = {
  version: PLAY_READY_12_VERSION,
  stage: "controlled_billing_vs_wallet_separation_and_entitlement_target_patch_review_source_only",
  status: "billing_wallet_entitlement_review_ready_for_financial_features_review",
  sourceOnly: true,
  sourceTargetWritesNow: 0,
  targetFilesModifiedNow: 0,
  runtimeDbWriteNow: 0,
  providerCallsNow: 0,
  walletMutationsNow: 0,
  paymentAuthorizationsNow: 0,
  moneyMovementNow: 0,

  futureChangedFileReview: [
    {
      path: "app/ai/premium.tsx",
      status: "observed_candidate" as PlayReady12TargetStatus,
      futurePurpose: "AI Premium surface where digital subscription/usage pack must be Google Play Billing gated in Android Play build.",
      plannedChange: "Review future copy and purchase entry so AI Premium never routes to Sabi Wallet/Airwallex/Alipay for Play-build digital goods.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
    {
      path: "app/profile/premium.tsx",
      status: "observed_candidate" as PlayReady12TargetStatus,
      futurePurpose: "Profile premium surface that may expose subscriptions or digital upgrades.",
      plannedChange: "Review future product mapping and entitlement status display for Play Billing verified entitlements only.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
    {
      path: "app/wallet/coin/topup.tsx",
      status: "observed_candidate" as PlayReady12TargetStatus,
      futurePurpose: "Coin/top-up surface that must not buy digital goods currency through Wallet in Android Play build if used for digital goods.",
      plannedChange: "Review future block/copy: digital-only Sabi Coin or virtual currency must use Google Play Billing in Play build; Wallet top-up remains real-world only.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
    {
      path: "app/wallet/coin/diamonds.tsx",
      status: "observed_candidate" as PlayReady12TargetStatus,
      futurePurpose: "Digital diamond/currency surface likely tied to gifts or digital goods.",
      plannedChange: "Review future Google Play Billing product map and Wallet bypass hard-block.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
    {
      path: "src/modules/ai/mobile/aiMobileEntitlements.ts",
      status: "observed_candidate" as PlayReady12TargetStatus,
      futurePurpose: "Mobile entitlement boundary for AI Premium and AI usage packs.",
      plannedChange: "Review future entitlement states and provider_not_configured/fake-entitlement prevention.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
    {
      path: "src/core/kernel/premium/premium.service.ts",
      status: "observed_candidate" as PlayReady12TargetStatus,
      futurePurpose: "Premium entitlement service candidate for verified entitlement state machine.",
      plannedChange: "Review future server-side verified entitlement plan without DB mutation now.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
    {
      path: "src/core/kernel/premium/feature-catalog.ts",
      status: "observed_candidate" as PlayReady12TargetStatus,
      futurePurpose: "Feature catalog candidate for tagging digital goods, real-world payments, and billing rails.",
      plannedChange: "Review future metadata fields: playBillingRequired, walletAllowed, realWorldOnly, provider_not_configured state.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
    {
      path: "src/modules/messenger/gifts/StreamGiftSendBridge.ts",
      status: "observed_candidate" as PlayReady12TargetStatus,
      futurePurpose: "Gift bridge candidate where digital gifts must not use Wallet bypass in Android Play build.",
      plannedChange: "Review future gift purchase route split: Play Billing for digital gifts, Wallet only for real-world/provider payments.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
    {
      path: "src/core/contracts/wallet-payment-execution.port.ts",
      status: "observed_candidate" as PlayReady12TargetStatus,
      futurePurpose: "Wallet payment execution boundary that must reject Android Play-build digital goods purchase attempts.",
      plannedChange: "Review future hard-block contract for digital goods attempts routed to Wallet/Airwallex/Alipay.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
    {
      path: "future Google Play Billing adapter service",
      status: "missing_requires_local_project_confirmation" as PlayReady12TargetStatus,
      futurePurpose: "Server-side adapter for Play Billing purchase token verification.",
      plannedChange: "Detect or create after future target-write approval; no provider calls or token verification now.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
    {
      path: "future entitlement ledger service/table",
      status: "missing_requires_local_project_confirmation" as PlayReady12TargetStatus,
      futurePurpose: "Server-side entitlement ledger for verified digital goods states.",
      plannedChange: "Plan schema/service only after explicit approval; no DB write or migration now.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
    {
      path: "future refund/revoke/expire entitlement handler",
      status: "missing_requires_local_project_confirmation" as PlayReady12TargetStatus,
      futurePurpose: "Controlled lifecycle handler for refunds, revocations, expirations, and consumptions.",
      plannedChange: "Plan lifecycle contract only after exact approval; no runtime mutation now.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
  ] as const satisfies readonly PlayReady12FutureChangedFileReview[],

  digitalProductMap: [
    {
      id: "ai_premium_subscription",
      module: "Sabi AI Assistant",
      productKind: "subscription" as PlayReady12DigitalProductKind,
      playBillingRequiredInAndroidPlayBuild: true,
      walletBypassAllowed: false,
      airwallexBypassAllowed: false,
      alipayBypassAllowed: false,
      entitlementLedgerRequired: true,
      serverPurchaseTokenVerificationRequired: true,
      fakePurchaseSuccessAllowed: false,
    },
    {
      id: "ai_usage_pack",
      module: "Sabi AI Assistant",
      productKind: "usage_pack" as PlayReady12DigitalProductKind,
      playBillingRequiredInAndroidPlayBuild: true,
      walletBypassAllowed: false,
      airwallexBypassAllowed: false,
      alipayBypassAllowed: false,
      entitlementLedgerRequired: true,
      serverPurchaseTokenVerificationRequired: true,
      fakePurchaseSuccessAllowed: false,
    },
    {
      id: "stream_premium_subscription",
      module: "Stream",
      productKind: "subscription" as PlayReady12DigitalProductKind,
      playBillingRequiredInAndroidPlayBuild: true,
      walletBypassAllowed: false,
      airwallexBypassAllowed: false,
      alipayBypassAllowed: false,
      entitlementLedgerRequired: true,
      serverPurchaseTokenVerificationRequired: true,
      fakePurchaseSuccessAllowed: false,
    },
    {
      id: "stream_digital_gift",
      module: "Stream",
      productKind: "consumable" as PlayReady12DigitalProductKind,
      playBillingRequiredInAndroidPlayBuild: true,
      walletBypassAllowed: false,
      airwallexBypassAllowed: false,
      alipayBypassAllowed: false,
      entitlementLedgerRequired: true,
      serverPurchaseTokenVerificationRequired: true,
      fakePurchaseSuccessAllowed: false,
    },
    {
      id: "stream_badge_or_effect",
      module: "Stream",
      productKind: "non_consumable" as PlayReady12DigitalProductKind,
      playBillingRequiredInAndroidPlayBuild: true,
      walletBypassAllowed: false,
      airwallexBypassAllowed: false,
      alipayBypassAllowed: false,
      entitlementLedgerRequired: true,
      serverPurchaseTokenVerificationRequired: true,
      fakePurchaseSuccessAllowed: false,
    },
    {
      id: "messenger_paid_translation",
      module: "Messenger",
      productKind: "usage_pack" as PlayReady12DigitalProductKind,
      playBillingRequiredInAndroidPlayBuild: true,
      walletBypassAllowed: false,
      airwallexBypassAllowed: false,
      alipayBypassAllowed: false,
      entitlementLedgerRequired: true,
      serverPurchaseTokenVerificationRequired: true,
      fakePurchaseSuccessAllowed: false,
    },
    {
      id: "premium_sticker_pack",
      module: "Messenger",
      productKind: "non_consumable" as PlayReady12DigitalProductKind,
      playBillingRequiredInAndroidPlayBuild: true,
      walletBypassAllowed: false,
      airwallexBypassAllowed: false,
      alipayBypassAllowed: false,
      entitlementLedgerRequired: true,
      serverPurchaseTokenVerificationRequired: true,
      fakePurchaseSuccessAllowed: false,
    },
    {
      id: "game_digital_goods",
      module: "Games",
      productKind: "consumable" as PlayReady12DigitalProductKind,
      playBillingRequiredInAndroidPlayBuild: true,
      walletBypassAllowed: false,
      airwallexBypassAllowed: false,
      alipayBypassAllowed: false,
      entitlementLedgerRequired: true,
      serverPurchaseTokenVerificationRequired: true,
      fakePurchaseSuccessAllowed: false,
    },
    {
      id: "sabi_coin_for_digital_goods",
      module: "Cross-module digital economy",
      productKind: "virtual_currency_for_digital_goods" as PlayReady12DigitalProductKind,
      playBillingRequiredInAndroidPlayBuild: true,
      walletBypassAllowed: false,
      airwallexBypassAllowed: false,
      alipayBypassAllowed: false,
      entitlementLedgerRequired: true,
      serverPurchaseTokenVerificationRequired: true,
      fakePurchaseSuccessAllowed: false,
    },
  ] as const satisfies readonly PlayReady12DigitalProductMapItem[],

  entitlementLedgerStatePlan: {
    states: [
      "pending_verification" as PlayReady12EntitlementState,
      "active" as PlayReady12EntitlementState,
      "consumed" as PlayReady12EntitlementState,
      "expired" as PlayReady12EntitlementState,
      "refunded" as PlayReady12EntitlementState,
      "revoked" as PlayReady12EntitlementState,
      "provider_not_configured" as PlayReady12EntitlementState,
      "verification_failed" as PlayReady12EntitlementState,
    ],
    activeOnlyAfterServerVerification: true,
    consumptionRequiresVerifiedEntitlement: true,
    refundRevokesOrDisablesEntitlement: true,
    fakeActiveEntitlementAllowed: false,
    fakeConsumeAllowed: false,
    runtimeDbWriteNow: false,
  },

  walletBypassHardBlockPlan: {
    androidPlayBuildDigitalGoodsWalletCheckoutAllowed: false,
    airwallexForPlayBuildDigitalGoodsAllowed: false,
    alipayForPlayBuildDigitalGoodsAllowed: false,
    directCardForPlayBuildDigitalGoodsAllowed: false,
    walletAllowedForRealWorldPaymentsOnly: true,
    realWorldExamples: [
      "QR Pay",
      "Merchant payments",
      "Business Account",
      "Supermarket/delivery",
      "Hotel/real-world bookings",
      "Airwallex/Alipay/bank-provider real-world payments",
    ],
    blockedDigitalExamples: [
      "AI Premium",
      "Stream Premium",
      "Stream digital gifts",
      "Premium stickers",
      "Messenger paid translation",
      "game digital goods",
      "virtual currency for digital goods",
    ],
  },

  purchaseTokenVerificationPlan: {
    serverSideVerificationRequired: true,
    clientOnlyTrustAllowed: false,
    providerCallNow: false,
    tokenVerificationNow: false,
    requiredFutureFields: [
      "platform",
      "packageName",
      "productId",
      "purchaseToken",
      "orderId if available",
      "userId",
      "purchaseTime",
      "acknowledgementState",
      "consumptionState if applicable",
      "verificationStatus",
    ],
    mustNotStore: [
      "payment card PAN",
      "CVV",
      "raw provider secrets",
      "unredacted access tokens in mobile",
    ],
  },

  refundRevokeExpirePlan: {
    requiredFutureTransitions: [
      "active_to_revoked",
      "active_to_refunded",
      "active_to_expired",
      "pending_verification_to_verification_failed",
      "active_to_consumed_for_consumables",
    ],
    mustBeVisibleToUserWhenRelevant: true,
    mustBeVisibleToReviewerAsEvidence: true,
    fakeRefundOrRevokeAllowed: false,
    runtimeMutationNow: false,
  },

  providerNotConfiguredEvidencePlan: {
    googlePlayBillingMissing: "play_billing_not_configured",
    entitlementLedgerMissing: "entitlement_ledger_not_configured",
    walletDigitalGoodsAttempt: "wallet_bypass_blocked_for_digital_goods",
    airwallexDigitalGoodsAttempt: "airwallex_bypass_blocked_for_digital_goods",
    alipayDigitalGoodsAttempt: "alipay_bypass_blocked_for_digital_goods",
    userFacingCopyIntent: "This digital product requires Google Play Billing in the Android Play build. Wallet and external provider checkout are not available for this digital item.",
    reviewerFacingCopyIntent: "Sabi separates digital goods from real-world payments. Digital goods use Google Play Billing; Sabi Wallet/Airwallex/Alipay are only for real-world payment flows after provider approval.",
  },

  productionBlockers: [
    "digital product can be purchased through Sabi Wallet in Android Play build",
    "Airwallex/Alipay/direct card can buy Play-build digital goods",
    "purchase token verification missing",
    "entitlement ledger missing",
    "active entitlement can be created without server verification",
    "fake purchase success shown to user",
    "refund/revoke/expire states missing",
    "premium/gift/translation/game goods not mapped to Play Billing products",
    "reviewer evidence for billing-vs-wallet separation missing",
  ],

  nextStage: "PLAY-READY-13",
  requiredExactApprovalTextForPlayReady13: PLAY_READY_12_REQUIRED_APPROVAL_TEXT_FOR_PLAY_READY_13,

  safety: {
    sourceTargetWriteByPlayReady12: false,
    targetFilesModifiedByPlayReady12: false,
    backendRestartByPlayReady12: false,
    runtimeDbWriteByPlayReady12: false,
    providerCallByPlayReady12: false,
    walletMutationByPlayReady12: false,
    paymentAuthorizationByPlayReady12: false,
    moneyMovementByPlayReady12: false,
    fakePurchaseSuccessByPlayReady12: false,
    fakeEntitlementSuccessByPlayReady12: false,
    fakeSuccessByPlayReady12: false,
  },
} as const;

export function getPlayReady12BillingWalletEntitlementReview() {
  return PLAY_READY_12_BILLING_WALLET_ENTITLEMENT_REVIEW;
}

export function getPlayReady12Readiness() {
  const s = getPlayReady12BillingWalletEntitlementReview();

  const targetReviewReady =
    s.futureChangedFileReview.length >= 11 &&
    s.futureChangedFileReview.every((item) => item.writeExecutedNow === false) &&
    s.futureChangedFileReview.every((item) => item.runtimeEffectNow === false) &&
    s.futureChangedFileReview.some((item) => item.path === "app/ai/premium.tsx") &&
    s.futureChangedFileReview.some((item) => item.path === "src/core/contracts/wallet-payment-execution.port.ts") &&
    s.futureChangedFileReview.some((item) => item.status === "missing_requires_local_project_confirmation");

  const productMapReady =
    s.digitalProductMap.length >= 9 &&
    s.digitalProductMap.every((item) => item.playBillingRequiredInAndroidPlayBuild === true) &&
    s.digitalProductMap.every((item) => item.walletBypassAllowed === false) &&
    s.digitalProductMap.every((item) => item.airwallexBypassAllowed === false) &&
    s.digitalProductMap.every((item) => item.alipayBypassAllowed === false) &&
    s.digitalProductMap.every((item) => item.serverPurchaseTokenVerificationRequired === true) &&
    s.digitalProductMap.every((item) => item.fakePurchaseSuccessAllowed === false);

  const ledgerReady =
    s.entitlementLedgerStatePlan.states.length >= 8 &&
    s.entitlementLedgerStatePlan.activeOnlyAfterServerVerification === true &&
    s.entitlementLedgerStatePlan.fakeActiveEntitlementAllowed === false &&
    s.entitlementLedgerStatePlan.runtimeDbWriteNow === false;

  const bypassReady =
    s.walletBypassHardBlockPlan.androidPlayBuildDigitalGoodsWalletCheckoutAllowed === false &&
    s.walletBypassHardBlockPlan.airwallexForPlayBuildDigitalGoodsAllowed === false &&
    s.walletBypassHardBlockPlan.alipayForPlayBuildDigitalGoodsAllowed === false &&
    s.walletBypassHardBlockPlan.walletAllowedForRealWorldPaymentsOnly === true &&
    s.walletBypassHardBlockPlan.blockedDigitalExamples.length >= 6;

  const verificationReady =
    s.purchaseTokenVerificationPlan.serverSideVerificationRequired === true &&
    s.purchaseTokenVerificationPlan.clientOnlyTrustAllowed === false &&
    s.purchaseTokenVerificationPlan.providerCallNow === false &&
    s.purchaseTokenVerificationPlan.tokenVerificationNow === false &&
    s.purchaseTokenVerificationPlan.requiredFutureFields.length >= 8;

  const lifecycleReady =
    s.refundRevokeExpirePlan.requiredFutureTransitions.length >= 5 &&
    s.refundRevokeExpirePlan.fakeRefundOrRevokeAllowed === false &&
    s.refundRevokeExpirePlan.runtimeMutationNow === false;

  const evidenceReady =
    s.providerNotConfiguredEvidencePlan.walletDigitalGoodsAttempt === "wallet_bypass_blocked_for_digital_goods" &&
    s.productionBlockers.length >= 8;

  const safetyReady =
    s.sourceTargetWritesNow === 0 &&
    s.targetFilesModifiedNow === 0 &&
    s.runtimeDbWriteNow === 0 &&
    s.providerCallsNow === 0 &&
    s.walletMutationsNow === 0 &&
    s.paymentAuthorizationsNow === 0 &&
    s.moneyMovementNow === 0 &&
    s.safety.sourceTargetWriteByPlayReady12 === false &&
    s.safety.targetFilesModifiedByPlayReady12 === false &&
    s.safety.backendRestartByPlayReady12 === false &&
    s.safety.runtimeDbWriteByPlayReady12 === false &&
    s.safety.providerCallByPlayReady12 === false &&
    s.safety.walletMutationByPlayReady12 === false &&
    s.safety.paymentAuthorizationByPlayReady12 === false &&
    s.safety.moneyMovementByPlayReady12 === false &&
    s.safety.fakePurchaseSuccessByPlayReady12 === false &&
    s.safety.fakeEntitlementSuccessByPlayReady12 === false &&
    s.safety.fakeSuccessByPlayReady12 === false;

  const ready =
    targetReviewReady &&
    productMapReady &&
    ledgerReady &&
    bypassReady &&
    verificationReady &&
    lifecycleReady &&
    evidenceReady &&
    safetyReady &&
    s.requiredExactApprovalTextForPlayReady13.includes("PLAY-READY-13");

  return {
    version: s.version,
    ready,
    status: ready
      ? "billing_wallet_entitlement_review_ready_for_financial_features_review"
      : "billing_wallet_entitlement_review_blocked",
    futureChangedFilesReviewed: s.futureChangedFileReview.length,
    digitalProductsMapped: s.digitalProductMap.length,
    entitlementStates: s.entitlementLedgerStatePlan.states.length,
    productionBlockers: s.productionBlockers.length,
    nextRecommendedStage: "PLAY-READY-13 controlled financial features, NFT/tokenized assets, virtual card disclosure target patch review package source-only after exact approval",
  } as const;
}

export function runPlayReady12BillingWalletEntitlementReviewSmoke() {
  const snapshot = getPlayReady12BillingWalletEntitlementReview();
  const readiness = getPlayReady12Readiness();

  const assertions = [
    {
      id: "billing_target_review_present_no_writes",
      passed:
        snapshot.futureChangedFileReview.length >= 11 &&
        snapshot.futureChangedFileReview.every((item) => item.writeExecutedNow === false) &&
        snapshot.futureChangedFileReview.every((item) => item.runtimeEffectNow === false),
      evidence: JSON.stringify(snapshot.futureChangedFileReview.map((item) => ({
        path: item.path,
        status: item.status,
        write: item.writeExecutedNow,
      })),
    },
    {
      id: "digital_product_map_blocks_wallet_bypass",
      passed:
        snapshot.digitalProductMap.length >= 9 &&
        snapshot.digitalProductMap.every((item) => item.playBillingRequiredInAndroidPlayBuild === true) &&
        snapshot.digitalProductMap.every((item) => item.walletBypassAllowed === false) &&
        snapshot.digitalProductMap.every((item) => item.fakePurchaseSuccessAllowed === false),
      evidence: JSON.stringify(snapshot.digitalProductMap.map((item) => ({
        id: item.id,
        play: item.playBillingRequiredInAndroidPlayBuild,
        wallet: item.walletBypassAllowed,
        fake: item.fakePurchaseSuccessAllowed,
      })),
    },
    {
      id: "entitlement_ledger_and_token_verification_planned_no_runtime",
      passed:
        snapshot.entitlementLedgerStatePlan.activeOnlyAfterServerVerification === true &&
        snapshot.entitlementLedgerStatePlan.fakeActiveEntitlementAllowed === false &&
        snapshot.entitlementLedgerStatePlan.runtimeDbWriteNow === false &&
        snapshot.purchaseTokenVerificationPlan.serverSideVerificationRequired === true &&
        snapshot.purchaseTokenVerificationPlan.providerCallNow === false &&
        snapshot.purchaseTokenVerificationPlan.tokenVerificationNow === false,
      evidence: JSON.stringify({
        ledger: snapshot.entitlementLedgerStatePlan,
        verification: snapshot.purchaseTokenVerificationPlan,
      }),
    },
    {
      id: "wallet_bypass_and_lifecycle_blocks_present",
      passed:
        snapshot.walletBypassHardBlockPlan.androidPlayBuildDigitalGoodsWalletCheckoutAllowed === false &&
        snapshot.walletBypassHardBlockPlan.airwallexForPlayBuildDigitalGoodsAllowed === false &&
        snapshot.walletBypassHardBlockPlan.alipayForPlayBuildDigitalGoodsAllowed === false &&
        snapshot.refundRevokeExpirePlan.fakeRefundOrRevokeAllowed === false &&
        snapshot.refundRevokeExpirePlan.runtimeMutationNow === false,
      evidence: JSON.stringify({
        bypass: snapshot.walletBypassHardBlockPlan,
        lifecycle: snapshot.refundRevokeExpirePlan,
      }),
    },
    {
      id: "safety_no_purchase_wallet_money_fake",
      passed:
        snapshot.sourceTargetWritesNow === 0 &&
        snapshot.targetFilesModifiedNow === 0 &&
        snapshot.runtimeDbWriteNow === 0 &&
        snapshot.providerCallsNow === 0 &&
        snapshot.walletMutationsNow === 0 &&
        snapshot.paymentAuthorizationsNow === 0 &&
        snapshot.moneyMovementNow === 0 &&
        snapshot.safety.fakePurchaseSuccessByPlayReady12 === false &&
        snapshot.safety.fakeEntitlementSuccessByPlayReady12 === false &&
        snapshot.safety.fakeSuccessByPlayReady12 === false,
      evidence: JSON.stringify(snapshot.safety),
    },
    {
      id: "readiness_true",
      passed: readiness.ready,
      evidence: readiness.status,
    },
  ];

  const failedAssertions = assertions.filter((item) => !item.passed);

  return {
    version: snapshot.version,
    stage: "billing_wallet_entitlement_review_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0
      ? "billing_wallet_entitlement_review_smoke_passed"
      : "billing_wallet_entitlement_review_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
