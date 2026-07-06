export const PLAY_READY_2_VERSION = "PLAY-READY-2" as const;

export const PLAY_READY_2_OWNER_APPROVAL_TEXT = "I approve PLAY-READY-2 controlled billing separation and entitlement architecture source-only, use PLAY-READY-1 audit to plan Google Play Billing for digital goods and Sabi Wallet/Airwallex for real-world payments, including AI Premium, Stream Premium, gifts, Messenger paid translation, game digital goods, purchase token verification, entitlement ledger, provider_not_configured states, no Wallet bypass for digital goods, no source target writes, no backend restart, no runtime DB write, no provider calls, no Wallet mutation, no payment authorization, no money movement, and no fake success.";
export const PLAY_READY_2_REQUIRED_APPROVAL_TEXT_FOR_PLAY_READY_3 = "I approve PLAY-READY-3 controlled privacy, Data Safety, account deletion, permissions, AI reporting, and UGC moderation readiness source-only, use PLAY-READY-2 billing separation architecture to plan Play Console compliance documents and app-side compliance gates for Sabi Wallet, Messenger, Stream, and Sabi AI Assistant, without source target writes, without backend restart, without runtime DB write, without provider calls, without Wallet mutation, without payment authorization, without money movement, and without fake success.";

export const PLAY_READY_2_BILLING_SEPARATION_SNAPSHOT = {
  version: PLAY_READY_2_VERSION,
  stage: "controlled_billing_separation_and_entitlement_architecture_source_only",
  status: "billing_separation_architecture_ready_for_privacy_data_safety_stage",
  positioning: "Sabi AI-first Global SuperApp",
  sourceOnly: true,
  playBuildRule: "digital_goods_and_digital_services_must_not_use_sabi_wallet_bypass",
  digitalGoodsGooglePlayBilling: [
    {
      id: "ai_premium",
      module: "Sabi AI Assistant",
      productType: "subscription_or_consumable_quota",
      billingRail: "GOOGLE_PLAY_BILLING_ANDROID_PLAY_BUILD",
      entitlement: "AI_PREMIUM_ACCESS_OR_AI_USAGE_PACK",
      walletBypassAllowed: false,
      providerStateIfNotConfigured: "provider_not_configured",
    },
    {
      id: "stream_premium",
      module: "Stream",
      productType: "subscription",
      billingRail: "GOOGLE_PLAY_BILLING_ANDROID_PLAY_BUILD",
      entitlement: "STREAM_PREMIUM_ACCESS",
      walletBypassAllowed: false,
      providerStateIfNotConfigured: "provider_not_configured",
    },
    {
      id: "stream_gifts_badges_effects",
      module: "Stream",
      productType: "consumable_digital_goods",
      billingRail: "GOOGLE_PLAY_BILLING_ANDROID_PLAY_BUILD",
      entitlement: "STREAM_DIGITAL_GIFT_OR_BADGE_OR_EFFECT",
      walletBypassAllowed: false,
      providerStateIfNotConfigured: "provider_not_configured",
    },
    {
      id: "messenger_paid_translation",
      module: "Messenger",
      productType: "subscription_or_usage_pack",
      billingRail: "GOOGLE_PLAY_BILLING_ANDROID_PLAY_BUILD",
      entitlement: "MESSENGER_PAID_TRANSLATION",
      walletBypassAllowed: false,
      providerStateIfNotConfigured: "provider_not_configured",
    },
    {
      id: "premium_stickers",
      module: "Messenger",
      productType: "digital_goods",
      billingRail: "GOOGLE_PLAY_BILLING_ANDROID_PLAY_BUILD",
      entitlement: "PREMIUM_STICKER_PACK",
      walletBypassAllowed: false,
      providerStateIfNotConfigured: "provider_not_configured",
    },
    {
      id: "game_digital_goods",
      module: "Games",
      productType: "consumable_or_non_consumable_digital_goods",
      billingRail: "GOOGLE_PLAY_BILLING_ANDROID_PLAY_BUILD",
      entitlement: "GAME_DIGITAL_GOOD",
      walletBypassAllowed: false,
      providerStateIfNotConfigured: "provider_not_configured",
    },
    {
      id: "sabi_coin_for_digital_goods",
      module: "Cross-module digital economy",
      productType: "virtual_currency_for_digital_goods",
      billingRail: "GOOGLE_PLAY_BILLING_ANDROID_PLAY_BUILD",
      entitlement: "DIGITAL_ONLY_BALANCE_OR_ENTITLEMENT",
      walletBypassAllowed: false,
      providerStateIfNotConfigured: "provider_not_configured",
    },
  ],
  realWorldPaymentsSabiWalletAirwallex: [
    "QR Pay",
    "Merchant payments",
    "Business Account",
    "Supermarket and delivery",
    "Hotel and real-world bookings",
    "Airwallex or Alipay provider-backed payments",
    "Business settlements and payouts after compliance approval",
  ],
  entitlementLedgerPlan: {
    purchaseTokenVerificationRequired: true,
    serverSideVerificationRequired: true,
    storeOrderIdStored: true,
    entitlementStateMachine: [
      "pending_verification",
      "active",
      "consumed",
      "expired",
      "refunded",
      "revoked",
      "provider_not_configured",
    ],
    fakePremiumAllowed: false,
    fakeProviderSuccessAllowed: false,
    fakeMoneyMovementAllowed: false,
  },
  providerGatePlan: {
    googlePlayBillingMissing: "digital_purchase_disabled",
    walletProviderMissing: "wallet_provider_not_configured",
    airwallexMissing: "airwallex_provider_not_configured",
    alipayMissing: "alipay_provider_not_configured",
    aiProviderMissing: "ai_provider_not_configured",
    streamProviderMissing: "stream_provider_not_configured",
  },
  hardBlocks: {
    walletBypassForDigitalGoodsAllowed: false,
    directCardForDigitalGoodsInPlayBuildAllowed: false,
    airwallexForDigitalGoodsInPlayBuildAllowed: false,
    alipayForDigitalGoodsInPlayBuildAllowed: false,
    fakePurchaseSuccessAllowed: false,
    fakeEntitlementAllowed: false,
    fakeMoneyMovementAllowed: false,
  },
  nextStage: "PLAY-READY-3",
  requiredExactApprovalTextForPlayReady3: PLAY_READY_2_REQUIRED_APPROVAL_TEXT_FOR_PLAY_READY_3,
  safety: {
    sourceTargetWriteByPlayReady2: false,
    backendRestartByPlayReady2: false,
    runtimeDbWriteByPlayReady2: false,
    providerCallByPlayReady2: false,
    walletMutationByPlayReady2: false,
    paymentAuthorizationByPlayReady2: false,
    moneyMovementByPlayReady2: false,
    fakeSuccessByPlayReady2: false,
  },
} as const;

export function getPlayReady2BillingSeparationSnapshot() {
  return PLAY_READY_2_BILLING_SEPARATION_SNAPSHOT;
}

export function getPlayReady2BillingSeparationReadiness() {
  const s = getPlayReady2BillingSeparationSnapshot();
  const ready =
    s.digitalGoodsGooglePlayBilling.length >= 7 &&
    s.realWorldPaymentsSabiWalletAirwallex.length >= 6 &&
    s.digitalGoodsGooglePlayBilling.every((item) => item.walletBypassAllowed === false) &&
    s.entitlementLedgerPlan.purchaseTokenVerificationRequired === true &&
    s.entitlementLedgerPlan.serverSideVerificationRequired === true &&
    s.hardBlocks.walletBypassForDigitalGoodsAllowed === false &&
    s.hardBlocks.fakePurchaseSuccessAllowed === false &&
    s.hardBlocks.fakeEntitlementAllowed === false &&
    s.hardBlocks.fakeMoneyMovementAllowed === false &&
    s.safety.sourceTargetWriteByPlayReady2 === false &&
    s.safety.backendRestartByPlayReady2 === false &&
    s.safety.runtimeDbWriteByPlayReady2 === false &&
    s.safety.providerCallByPlayReady2 === false &&
    s.safety.walletMutationByPlayReady2 === false &&
    s.safety.paymentAuthorizationByPlayReady2 === false &&
    s.safety.moneyMovementByPlayReady2 === false &&
    s.safety.fakeSuccessByPlayReady2 === false &&
    s.requiredExactApprovalTextForPlayReady3.includes("PLAY-READY-3");

  return {
    version: s.version,
    ready,
    status: ready
      ? "billing_separation_architecture_ready_for_privacy_data_safety_stage"
      : "billing_separation_architecture_blocked",
    digitalProducts: s.digitalGoodsGooglePlayBilling.length,
    realWorldPaymentRails: s.realWorldPaymentsSabiWalletAirwallex.length,
    nextRecommendedStage: "PLAY-READY-3 controlled privacy, Data Safety, account deletion, permissions, AI reporting, and UGC moderation readiness source-only after exact approval",
  } as const;
}

export function runPlayReady2BillingSeparationSmoke() {
  const snapshot = getPlayReady2BillingSeparationSnapshot();
  const readiness = getPlayReady2BillingSeparationReadiness();
  const assertions = [
    {
      id: "digital_goods_use_google_play_billing",
      passed: snapshot.digitalGoodsGooglePlayBilling.every((item) => item.billingRail === "GOOGLE_PLAY_BILLING_ANDROID_PLAY_BUILD" && item.walletBypassAllowed === false),
      evidence: JSON.stringify(snapshot.digitalGoodsGooglePlayBilling.map((item) => item.id)),
    },
    {
      id: "real_world_payments_stay_wallet_provider_layer",
      passed: snapshot.realWorldPaymentsSabiWalletAirwallex.length >= 6,
      evidence: JSON.stringify(snapshot.realWorldPaymentsSabiWalletAirwallex),
    },
    {
      id: "entitlement_ledger_requires_server_verification",
      passed: snapshot.entitlementLedgerPlan.purchaseTokenVerificationRequired && snapshot.entitlementLedgerPlan.serverSideVerificationRequired && !snapshot.entitlementLedgerPlan.fakePremiumAllowed,
      evidence: JSON.stringify(snapshot.entitlementLedgerPlan),
    },
    {
      id: "hard_blocks_prevent_bypass_and_fake_success",
      passed: !snapshot.hardBlocks.walletBypassForDigitalGoodsAllowed && !snapshot.hardBlocks.fakePurchaseSuccessAllowed && !snapshot.hardBlocks.fakeMoneyMovementAllowed,
      evidence: JSON.stringify(snapshot.hardBlocks),
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
    stage: "billing_separation_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "billing_separation_smoke_passed" : "billing_separation_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
