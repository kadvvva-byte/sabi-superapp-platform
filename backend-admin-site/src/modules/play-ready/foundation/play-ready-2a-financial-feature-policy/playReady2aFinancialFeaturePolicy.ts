export const PLAY_READY_2A_VERSION = "PLAY-READY-2A" as const;

export const PLAY_READY_2A_OWNER_APPROVAL_TEXT = "I approve PLAY-READY-2A controlled NFT, tokenized digital assets, virtual card, Google Pay, Airwallex Issuing, and financial feature policy planning source-only, extend PLAY-READY-2 billing separation with NFT digital collectibles, Google Play Billing requirements, Play Console Financial features declaration, no NFT gambling/staking/chance-based unknown value, no crypto exchange without certified regulated provider, Sabi Virtual Visa Card issued only through Airwallex or licensed issuer, Google Pay tokenization only through issuer/TSP approval, KYB/KYC/AML gates, provider_not_configured states, no fake NFT minting, no fake card issuing, no fake balance, no source target writes, no backend restart, no runtime DB write, no provider calls, no Wallet mutation, no payment authorization, no money movement, and no fake success.";
export const PLAY_READY_2A_REQUIRED_APPROVAL_TEXT_FOR_PLAY_READY_3 = "I approve PLAY-READY-3 controlled privacy, Data Safety, account deletion, permissions, AI reporting, and UGC moderation readiness source-only, use PLAY-READY-2 and PLAY-READY-2A billing/financial feature policy planning to plan Play Console compliance documents and app-side compliance gates for Sabi Wallet, Messenger, Stream, Sabi AI Assistant, NFT/tokenized digital collectibles, and virtual card readiness, without source target writes, without backend restart, without runtime DB write, without provider calls, without Wallet mutation, without payment authorization, without money movement, and without fake success.";

export type PlayReady2aStatus =
  | "planned_source_only"
  | "blocked_until_policy_and_provider_ready"
  | "provider_not_configured";

export const PLAY_READY_2A_FINANCIAL_FEATURE_POLICY_SNAPSHOT = {
  version: PLAY_READY_2A_VERSION,
  stage: "controlled_nft_tokenized_assets_virtual_card_google_pay_airwallex_policy_planning_source_only",
  status: "financial_feature_policy_plan_ready_for_privacy_data_safety_stage",
  sourceOnly: true,
  positioning: "Sabi AI-first Global SuperApp with compliant digital collectibles and licensed card issuing readiness",

  tokenizedDigitalAssetsPlan: {
    productName: "Sabi Digital Collectibles / Tokenized Digital Assets",
    launchModeNow: "planned_source_only" as PlayReady2aStatus,
    androidPlayPurchaseRail: "GOOGLE_PLAY_BILLING_FOR_DIGITAL_COLLECTIBLES_IN_PLAY_BUILD",
    playConsoleDeclarationRequired: true,
    inAppProductDisclosureRequired: true,
    blockchainMintingAllowedNow: false,
    tradingMarketplaceAllowedNow: false,
    gamblingAllowed: false,
    stakingAllowed: false,
    chanceBasedUnknownValueAllowed: false,
    cryptoExchangeAllowedWithoutCertifiedRegulatedProvider: false,
    earningOrInvestmentPromiseAllowed: false,
    providerStateIfNotReady: "provider_not_configured",
    safeInitialUseCases: [
      "creator collectible badge entitlement",
      "premium profile collectible entitlement",
      "stream creator collectible entitlement",
      "limited digital sticker or card entitlement",
      "AI-generated collectible entitlement after safety review",
    ],
    blockedUntilLater: [
      "live blockchain minting",
      "NFT trading marketplace",
      "NFT staking",
      "crypto exchange",
      "mystery box or unknown-value bundle",
      "investment or profit promise",
    ],
  },

  virtualCardPlan: {
    productName: "Sabi Virtual Visa Card",
    launchModeNow: "blocked_until_policy_and_provider_ready" as PlayReady2aStatus,
    correctNaming: "Sabi Virtual Visa Card issued by Airwallex or licensed issuer; Google Pay compatible later",
    incorrectNamingBlocked: "Google Visa Card",
    issuingProviderRequired: true,
    allowedIssuers: [
      "Airwallex Issuing after approval",
      "licensed issuer or bank partner after approval",
    ],
    googlePayTokenizationMode: "ONLY_THROUGH_ISSUER_TSP_APPROVAL",
    kybRequired: true,
    kycRequired: true,
    amlRequired: true,
    cardIssuingAllowedNow: false,
    cardDisplayAllowedNow: false,
    fakeBalanceAllowed: false,
    fakeCardNumberAllowed: false,
    rawPanCvvStorageAllowedOnSabiInfrastructure: false,
    providerStateIfNotReady: "provider_not_configured",
    requiredControls: [
      "spending limits",
      "MCC controls where provider supports",
      "freeze card",
      "cancel card",
      "lost/stolen status",
      "audit trail",
      "KYB/KYC/AML approval",
      "issuer/provider status",
      "token-only storage",
    ],
  },

  googlePayPlan: {
    role: "Google Pay is checkout/tokenization layer, not Sabi card issuer",
    googlePayForDigitalGoodsInPlayBuildAllowed: false,
    googlePlayBillingForDigitalGoodsRequired: true,
    googlePayForRealWorldPaymentsPossibleLater: true,
    googlePayCardTokenizationForSabiCardPossibleLater: true,
    issuerTspApprovalRequired: true,
    processorGatewayReadinessRequired: true,
    providerStateIfNotReady: "provider_not_configured",
  },

  airwallexPlan: {
    role: "real-world payments, business account, merchant, issuing provider candidate",
    digitalGoodsBypassAllowed: false,
    realWorldPaymentRailAllowedAfterProviderApproval: true,
    virtualCardIssuingCandidate: true,
    googlePayCompatibleCardsPossibleAfterProviderApproval: true,
    kybKycAmlRequired: true,
    providerStateIfNotReady: "airwallex_provider_not_configured",
  },

  hardBlocks: {
    noNftGambling: true,
    noNftStaking: true,
    noChanceBasedUnknownValueNft: true,
    noCryptoExchangeWithoutCertifiedRegulatedProvider: true,
    noFakeNftMinting: true,
    noFakeCardIssuing: true,
    noFakeBalance: true,
    noWalletBypassForDigitalGoods: true,
    noAirwallexBypassForDigitalGoods: true,
    noGooglePayForDigitalGoodsInsteadOfPlayBilling: true,
    noRawPanCvvStorageOnSabiInfrastructure: true,
    noMoneyMovementNow: true,
  },

  providerGates: {
    nftProviderMissing: "nft_provider_not_configured",
    blockchainMintProviderMissing: "blockchain_mint_provider_not_configured",
    financialFeatureDeclarationMissing: "financial_feature_declaration_required",
    airwallexIssuingMissing: "airwallex_issuing_provider_not_configured",
    licensedIssuerMissing: "licensed_issuer_not_configured",
    googlePayTspMissing: "google_pay_tsp_not_configured",
    kybMissing: "kyb_required",
    kycMissing: "kyc_required",
    amlMissing: "aml_required",
  },

  nextStage: "PLAY-READY-3",
  requiredExactApprovalTextForPlayReady3: PLAY_READY_2A_REQUIRED_APPROVAL_TEXT_FOR_PLAY_READY_3,

  safety: {
    sourceTargetWriteByPlayReady2A: false,
    backendRestartByPlayReady2A: false,
    runtimeDbWriteByPlayReady2A: false,
    providerCallByPlayReady2A: false,
    walletMutationByPlayReady2A: false,
    paymentAuthorizationByPlayReady2A: false,
    moneyMovementByPlayReady2A: false,
    fakeSuccessByPlayReady2A: false,
  },
} as const;

export function getPlayReady2aFinancialFeaturePolicySnapshot() {
  return PLAY_READY_2A_FINANCIAL_FEATURE_POLICY_SNAPSHOT;
}

export function getPlayReady2aFinancialFeaturePolicyReadiness() {
  const s = getPlayReady2aFinancialFeaturePolicySnapshot();

  const tokenizedAssetsReady =
    s.tokenizedDigitalAssetsPlan.playConsoleDeclarationRequired === true &&
    s.tokenizedDigitalAssetsPlan.inAppProductDisclosureRequired === true &&
    s.tokenizedDigitalAssetsPlan.blockchainMintingAllowedNow === false &&
    s.tokenizedDigitalAssetsPlan.tradingMarketplaceAllowedNow === false &&
    s.tokenizedDigitalAssetsPlan.gamblingAllowed === false &&
    s.tokenizedDigitalAssetsPlan.stakingAllowed === false &&
    s.tokenizedDigitalAssetsPlan.chanceBasedUnknownValueAllowed === false &&
    s.tokenizedDigitalAssetsPlan.cryptoExchangeAllowedWithoutCertifiedRegulatedProvider === false &&
    s.tokenizedDigitalAssetsPlan.earningOrInvestmentPromiseAllowed === false;

  const virtualCardReady =
    s.virtualCardPlan.correctNaming.includes("Sabi Virtual Visa Card") &&
    s.virtualCardPlan.incorrectNamingBlocked === "Google Visa Card" &&
    s.virtualCardPlan.issuingProviderRequired === true &&
    s.virtualCardPlan.googlePayTokenizationMode === "ONLY_THROUGH_ISSUER_TSP_APPROVAL" &&
    s.virtualCardPlan.kybRequired === true &&
    s.virtualCardPlan.kycRequired === true &&
    s.virtualCardPlan.amlRequired === true &&
    s.virtualCardPlan.cardIssuingAllowedNow === false &&
    s.virtualCardPlan.fakeBalanceAllowed === false &&
    s.virtualCardPlan.fakeCardNumberAllowed === false &&
    s.virtualCardPlan.rawPanCvvStorageAllowedOnSabiInfrastructure === false;

  const googlePayReady =
    s.googlePayPlan.googlePayForDigitalGoodsInPlayBuildAllowed === false &&
    s.googlePayPlan.googlePlayBillingForDigitalGoodsRequired === true &&
    s.googlePayPlan.issuerTspApprovalRequired === true;

  const airwallexReady =
    s.airwallexPlan.digitalGoodsBypassAllowed === false &&
    s.airwallexPlan.realWorldPaymentRailAllowedAfterProviderApproval === true &&
    s.airwallexPlan.kybKycAmlRequired === true;

  const safetyReady =
    s.safety.sourceTargetWriteByPlayReady2A === false &&
    s.safety.backendRestartByPlayReady2A === false &&
    s.safety.runtimeDbWriteByPlayReady2A === false &&
    s.safety.providerCallByPlayReady2A === false &&
    s.safety.walletMutationByPlayReady2A === false &&
    s.safety.paymentAuthorizationByPlayReady2A === false &&
    s.safety.moneyMovementByPlayReady2A === false &&
    s.safety.fakeSuccessByPlayReady2A === false;

  const ready = tokenizedAssetsReady && virtualCardReady && googlePayReady && airwallexReady && safetyReady;

  return {
    version: s.version,
    ready,
    status: ready
      ? "financial_feature_policy_plan_ready_for_privacy_data_safety_stage"
      : "financial_feature_policy_plan_blocked",
    tokenizedDigitalAssetsLaunchModeNow: s.tokenizedDigitalAssetsPlan.launchModeNow,
    virtualCardLaunchModeNow: s.virtualCardPlan.launchModeNow,
    nextRecommendedStage: "PLAY-READY-3 controlled privacy, Data Safety, account deletion, permissions, AI reporting, and UGC moderation readiness source-only after exact approval",
  } as const;
}

export function runPlayReady2aFinancialFeaturePolicySmoke() {
  const snapshot = getPlayReady2aFinancialFeaturePolicySnapshot();
  const readiness = getPlayReady2aFinancialFeaturePolicyReadiness();

  const assertions = [
    {
      id: "tokenized_assets_have_play_declaration_and_no_forbidden_mechanics",
      passed:
        snapshot.tokenizedDigitalAssetsPlan.playConsoleDeclarationRequired === true &&
        snapshot.tokenizedDigitalAssetsPlan.inAppProductDisclosureRequired === true &&
        snapshot.tokenizedDigitalAssetsPlan.gamblingAllowed === false &&
        snapshot.tokenizedDigitalAssetsPlan.stakingAllowed === false &&
        snapshot.tokenizedDigitalAssetsPlan.chanceBasedUnknownValueAllowed === false &&
        snapshot.tokenizedDigitalAssetsPlan.cryptoExchangeAllowedWithoutCertifiedRegulatedProvider === false,
      evidence: JSON.stringify(snapshot.tokenizedDigitalAssetsPlan),
    },
    {
      id: "virtual_card_requires_airwallex_or_licensed_issuer",
      passed:
        snapshot.virtualCardPlan.correctNaming.includes("Airwallex or licensed issuer") &&
        snapshot.virtualCardPlan.incorrectNamingBlocked === "Google Visa Card" &&
        snapshot.virtualCardPlan.cardIssuingAllowedNow === false &&
        snapshot.virtualCardPlan.rawPanCvvStorageAllowedOnSabiInfrastructure === false,
      evidence: JSON.stringify(snapshot.virtualCardPlan),
    },
    {
      id: "google_pay_is_not_card_issuer_or_digital_goods_bypass",
      passed:
        snapshot.googlePayPlan.role.includes("not Sabi card issuer") &&
        snapshot.googlePayPlan.googlePayForDigitalGoodsInPlayBuildAllowed === false &&
        snapshot.googlePayPlan.googlePlayBillingForDigitalGoodsRequired === true &&
        snapshot.googlePayPlan.issuerTspApprovalRequired === true,
      evidence: JSON.stringify(snapshot.googlePayPlan),
    },
    {
      id: "airwallex_cannot_bypass_play_billing_for_digital_goods",
      passed:
        snapshot.airwallexPlan.digitalGoodsBypassAllowed === false &&
        snapshot.airwallexPlan.realWorldPaymentRailAllowedAfterProviderApproval === true,
      evidence: JSON.stringify(snapshot.airwallexPlan),
    },
    {
      id: "safety_all_no_runtime_or_money",
      passed:
        snapshot.safety.sourceTargetWriteByPlayReady2A === false &&
        snapshot.safety.backendRestartByPlayReady2A === false &&
        snapshot.safety.runtimeDbWriteByPlayReady2A === false &&
        snapshot.safety.providerCallByPlayReady2A === false &&
        snapshot.safety.walletMutationByPlayReady2A === false &&
        snapshot.safety.paymentAuthorizationByPlayReady2A === false &&
        snapshot.safety.moneyMovementByPlayReady2A === false &&
        snapshot.safety.fakeSuccessByPlayReady2A === false,
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
    stage: "financial_feature_policy_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0
      ? "financial_feature_policy_smoke_passed"
      : "financial_feature_policy_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
