export const PLAY_READY_13_VERSION = "PLAY-READY-13" as const;

export const PLAY_READY_13_OWNER_APPROVAL_TEXT = "I approve PLAY-READY-13 controlled financial features, NFT/tokenized assets, virtual card disclosure target patch review package source-only, use PLAY-READY-12 billing entitlement review and PLAY-READY-7 gap-closure planning to prepare an exact future changed-file patch review for Play Console Financial features declaration evidence, tokenized digital asset disclosure, no NFT gambling/staking/chance-based unknown value, virtual card issuer/provider_not_configured copy, no raw PAN/CVV storage evidence, no fake NFT minting, no fake card issuing, and no fake balance, without executing target writes, without backend restart, without runtime DB write, without provider calls, without secret value exposure, without Wallet mutation, without payment authorization, without money movement, and without fake success.";
export const PLAY_READY_13_REQUIRED_APPROVAL_TEXT_FOR_PLAY_READY_14 = "I approve PLAY-READY-14 controlled permission rationale and target SDK/AAB local root audit planning source-only, use PLAY-READY-13 financial features review and PLAY-READY-7 gap-closure planning to prepare an exact future local-root inspection plan for Android permissions, permission rationale copy, targetSdk/API check, AAB build readiness, app signing/versioning, reviewer credentials/access checklist, and no unused sensitive permissions, without executing target writes, without backend restart, without runtime DB write, without provider calls, without secret value exposure, without Wallet mutation, without payment authorization, without money movement, and without fake success.";

export type PlayReady13TargetStatus =
  | "observed_candidate"
  | "future_target_write_required_after_approval"
  | "missing_requires_local_project_confirmation"
  | "play_console_external_declaration_required";

export type PlayReady13FinancialFeature =
  | "wallet_payments"
  | "business_merchant_payments"
  | "tokenized_digital_assets"
  | "virtual_card_issuing"
  | "google_pay_tokenization_later"
  | "crypto_exchange_blocked_until_regulated_provider"
  | "financial_metadata_handling";

export interface PlayReady13FutureChangedFileReview {
  readonly path: string;
  readonly status: PlayReady13TargetStatus;
  readonly featureAreas: readonly PlayReady13FinancialFeature[];
  readonly futurePurpose: string;
  readonly plannedChange: string;
  readonly writeExecutedNow: false;
  readonly runtimeEffectNow: false;
}

export const PLAY_READY_13_FINANCIAL_FEATURES_NFT_CARD_REVIEW = {
  version: PLAY_READY_13_VERSION,
  stage: "controlled_financial_features_nft_tokenized_assets_virtual_card_disclosure_target_patch_review_source_only",
  status: "financial_features_nft_card_review_ready_for_permission_target_sdk_aab_planning",
  sourceOnly: true,
  sourceTargetWritesNow: 0,
  targetFilesModifiedNow: 0,
  runtimeDbWriteNow: 0,
  providerCallsNow: 0,
  secretValueExposureNow: false,
  walletMutationsNow: 0,
  paymentAuthorizationsNow: 0,
  moneyMovementNow: 0,

  futureChangedFileReview: [
    {
      path: "app/wallet/virtual-card.tsx",
      status: "observed_candidate" as PlayReady13TargetStatus,
      featureAreas: ["virtual_card_issuing", "google_pay_tokenization_later"] as const,
      futurePurpose: "Mobile virtual card surface where issuer/provider_not_configured copy and no fake card issuing must be explicit.",
      plannedChange: "Review future copy: Sabi Virtual Visa Card requires Airwallex or licensed issuer approval; Google Pay compatibility comes later through issuer/TSP approval.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
    {
      path: "app/wallet/virtual-card-qr.tsx",
      status: "observed_candidate" as PlayReady13TargetStatus,
      featureAreas: ["virtual_card_issuing", "financial_metadata_handling"] as const,
      futurePurpose: "Virtual card QR/payment-adjacent surface that must not imply live issuing, fake balance, or money movement.",
      plannedChange: "Review future provider_not_configured copy and block live card/payment claims until issuer/provider approval.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
    {
      path: "app/qr/virtual-card-payment.tsx",
      status: "observed_candidate" as PlayReady13TargetStatus,
      featureAreas: ["virtual_card_issuing", "wallet_payments"] as const,
      futurePurpose: "QR virtual card payment surface that must stay disabled until issuer/payment provider approval.",
      plannedChange: "Review future copy and safe-disabled route; no fake transaction/card success.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
    {
      path: "app/wallet/crypto.tsx",
      status: "observed_candidate" as PlayReady13TargetStatus,
      featureAreas: ["tokenized_digital_assets", "crypto_exchange_blocked_until_regulated_provider"] as const,
      futurePurpose: "Crypto/tokenized surface candidate that must not appear as unregulated exchange or investment product.",
      plannedChange: "Review future disclosure: crypto exchange/trading is blocked until certified regulated provider and country compliance.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
    {
      path: "app/wallet/crypto/buy.tsx",
      status: "observed_candidate" as PlayReady13TargetStatus,
      featureAreas: ["tokenized_digital_assets", "crypto_exchange_blocked_until_regulated_provider"] as const,
      futurePurpose: "Crypto buy surface candidate requiring certified regulated provider gate or disabled state.",
      plannedChange: "Review future safe-disabled copy; no buy/trade/money movement without provider approval.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
    {
      path: "app/wallet/crypto/sell.tsx",
      status: "observed_candidate" as PlayReady13TargetStatus,
      featureAreas: ["tokenized_digital_assets", "crypto_exchange_blocked_until_regulated_provider"] as const,
      futurePurpose: "Crypto sell surface candidate requiring certified regulated provider gate or disabled state.",
      plannedChange: "Review future safe-disabled copy; no sell/trade/money movement without provider approval.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
    {
      path: "src/modules/business-banking/business-banking.contracts.ts",
      status: "observed_candidate" as PlayReady13TargetStatus,
      featureAreas: ["business_merchant_payments", "virtual_card_issuing", "financial_metadata_handling"] as const,
      futurePurpose: "Business banking contracts candidate for issuer/provider_not_configured, KYB/KYC/AML, and no raw PAN/CVV evidence.",
      plannedChange: "Review future contract fields for card issuing disabled state, token-only card metadata, and no fake balance.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
    {
      path: "src/modules/business-banking/business-banking.service.ts",
      status: "observed_candidate" as PlayReady13TargetStatus,
      featureAreas: ["business_merchant_payments", "virtual_card_issuing", "financial_metadata_handling"] as const,
      futurePurpose: "Business banking service candidate for safe-disabled virtual card and financial feature evidence.",
      plannedChange: "Review future read-only evidence and provider gate; no card issuing/payment/money movement now.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
    {
      path: "src/core/contracts/wallet-payment-execution.port.ts",
      status: "observed_candidate" as PlayReady13TargetStatus,
      featureAreas: ["wallet_payments", "business_merchant_payments"] as const,
      futurePurpose: "Wallet execution contract candidate where real-world financial provider status and no fake payment success must be enforced.",
      plannedChange: "Review future financial feature gate split: real-world provider payments only, digital goods via Play Billing.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
    {
      path: "future tokenized digital asset disclosure catalog",
      status: "missing_requires_local_project_confirmation" as PlayReady13TargetStatus,
      featureAreas: ["tokenized_digital_assets"] as const,
      futurePurpose: "Catalog/disclosure target for Sabi Digital Collectibles and Tokenized Digital Asset product details.",
      plannedChange: "Detect/create only after exact approval; must state tokenized nature and block gambling/staking/chance-based unknown value.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
    {
      path: "future Play Console Financial features declaration evidence file",
      status: "play_console_external_declaration_required" as PlayReady13TargetStatus,
      featureAreas: ["wallet_payments", "business_merchant_payments", "tokenized_digital_assets", "virtual_card_issuing", "financial_metadata_handling"] as const,
      futurePurpose: "Reviewer/internal evidence file for Play Console Financial features declaration answers.",
      plannedChange: "Prepare external declaration notes and evidence checklist before Play submission; no live declaration submitted now.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
    {
      path: "future raw PAN/CVV safety audit evidence file",
      status: "missing_requires_local_project_confirmation" as PlayReady13TargetStatus,
      featureAreas: ["virtual_card_issuing", "financial_metadata_handling"] as const,
      futurePurpose: "Audit evidence showing Sabi infrastructure does not store raw PAN/CVV and uses token/provider metadata only.",
      plannedChange: "Plan search/audit runner in future stage; do not read secret/card data or expose sensitive values now.",
      writeExecutedNow: false,
      runtimeEffectNow: false,
    },
  ] as const satisfies readonly PlayReady13FutureChangedFileReview[],

  financialFeaturesDeclarationPlan: {
    declarationRequiredBeforeSubmissionIfVisibleOrEnabled: true,
    externalPlayConsoleSubmissionDoneNow: false,
    featuresToDeclareIfVisibleOrEnabled: [
      "Wallet/payments",
      "Business/Merchant payments",
      "Tokenized Digital Assets",
      "Virtual card readiness/issuing",
      "Financial account/payment metadata handling",
      "Money transfer/payment provider features if enabled",
    ],
    reviewerEvidenceRequired: [
      "which financial features are visible/enabled",
      "which are provider_not_configured",
      "digital goods use Google Play Billing",
      "Wallet/Airwallex/Alipay are real-world payment rails only",
      "NFT/tokenized assets are declared and disclosed",
      "virtual card requires Airwallex/licensed issuer approval",
      "no raw PAN/CVV storage by Sabi",
      "no fake payment/card/NFT success",
    ],
  },

  tokenizedDigitalAssetDisclosurePlan: {
    productName: "Sabi Digital Collectibles / Tokenized Digital Assets",
    googlePlayBillingRequiredForDigitalCollectiblesInPlayBuild: true,
    inAppProductDetailsMustDiscloseTokenizedAsset: true,
    financialFeaturesDeclarationRequired: true,
    blockchainMintingAllowedNow: false,
    tradingMarketplaceAllowedNow: false,
    nftGamblingAllowed: false,
    nftStakingAllowed: false,
    chanceBasedUnknownValueAllowed: false,
    investmentOrEarningPromiseAllowed: false,
    cryptoExchangeWithoutCertifiedRegulatedProviderAllowed: false,
    fakeNftMintingAllowed: false,
    safeInitialEntitlementOnlyUseCases: [
      "creator collectible badge entitlement",
      "premium profile collectible entitlement",
      "stream creator collectible entitlement",
      "limited digital sticker/card entitlement",
      "AI-generated collectible entitlement after safety review",
    ],
  },

  virtualCardDisclosurePlan: {
    correctNaming: "Sabi Virtual Visa Card issued by Airwallex or licensed issuer; Google Pay compatible later",
    blockedNaming: "Google Visa Card",
    issuerRequired: true,
    airwallexOrLicensedIssuerRequired: true,
    googlePayTokenizationOnlyThroughIssuerTspApproval: true,
    kybRequired: true,
    kycRequired: true,
    amlRequired: true,
    cardIssuingAllowedNow: false,
    fakeCardIssuingAllowed: false,
    fakeBalanceAllowed: false,
    rawPanCvvStorageAllowedOnSabiInfrastructure: false,
    tokenOnlyCardMetadataRequired: true,
    userFacingProviderNotConfiguredCopy: "Sabi Virtual Visa Card requires Airwallex or licensed issuer approval and is not available yet.",
    reviewerFacingCopy: "Virtual card features are planned but remain provider_not_configured until licensed issuer, KYB/KYC/AML, and tokenization approvals are complete. Sabi does not store raw PAN/CVV.",
  },

  noRawPanCvvSafetyPlan: {
    rawPanCvvStorageAllowedOnSabiInfrastructure: false,
    futureAuditShouldSearchFor: [
      "PAN",
      "CVV",
      "cardNumber",
      "card_number",
      "cvc",
      "securityCode",
      "expiry",
      "rawCard",
    ],
    allowedFutureEvidenceOnly: [
      "tokenized card reference",
      "provider card id",
      "last4 if provider allows and policy permits",
      "card brand",
      "status",
      "issuer/provider state",
      "spending limits",
      "freeze/cancel state",
    ],
    secretValueExposureNow: false,
  },

  providerNotConfiguredPlan: {
    airwallexIssuingMissing: "airwallex_issuing_provider_not_configured",
    licensedIssuerMissing: "licensed_issuer_not_configured",
    googlePayTspMissing: "google_pay_tsp_not_configured",
    tokenizedAssetProviderMissing: "tokenized_asset_provider_not_configured",
    financialFeatureDeclarationMissing: "financial_feature_declaration_required",
    kybMissing: "kyb_required",
    kycMissing: "kyc_required",
    amlMissing: "aml_required",
    fakeProviderReadyAllowed: false,
  },

  productionBlockers: [
    "Financial features declaration missing while financial features are visible/enabled",
    "Tokenized Digital Asset product details missing disclosure",
    "NFT/tokenized feature allows gambling/staking/chance-based unknown value",
    "NFT/tokenized feature promises investment or earning",
    "crypto exchange/trading appears without certified regulated provider",
    "virtual card surface says Google Visa Card",
    "virtual card appears issued without Airwallex/licensed issuer approval",
    "raw PAN/CVV storage evidence is missing or unsafe",
    "fake NFT minting shown",
    "fake card issuing shown",
    "fake balance shown",
    "money movement/payment success shown without real authorized provider transaction",
  ],

  nextStage: "PLAY-READY-14",
  requiredExactApprovalTextForPlayReady14: PLAY_READY_13_REQUIRED_APPROVAL_TEXT_FOR_PLAY_READY_14,

  safety: {
    sourceTargetWriteByPlayReady13: false,
    targetFilesModifiedByPlayReady13: false,
    backendRestartByPlayReady13: false,
    runtimeDbWriteByPlayReady13: false,
    providerCallByPlayReady13: false,
    secretValueExposureByPlayReady13: false,
    walletMutationByPlayReady13: false,
    paymentAuthorizationByPlayReady13: false,
    moneyMovementByPlayReady13: false,
    fakeNftMintingByPlayReady13: false,
    fakeCardIssuingByPlayReady13: false,
    fakeBalanceByPlayReady13: false,
    fakeSuccessByPlayReady13: false,
  },
} as const;

export function getPlayReady13FinancialFeaturesNftCardReview() {
  return PLAY_READY_13_FINANCIAL_FEATURES_NFT_CARD_REVIEW;
}

export function getPlayReady13Readiness() {
  const s = getPlayReady13FinancialFeaturesNftCardReview();

  const targetReviewReady =
    s.futureChangedFileReview.length >= 11 &&
    s.futureChangedFileReview.every((item) => item.writeExecutedNow === false) &&
    s.futureChangedFileReview.every((item) => item.runtimeEffectNow === false) &&
    s.futureChangedFileReview.some((item) => item.path === "app/wallet/virtual-card.tsx") &&
    s.futureChangedFileReview.some((item) => item.status === "play_console_external_declaration_required") &&
    s.futureChangedFileReview.some((item) => item.status === "missing_requires_local_project_confirmation");

  const declarationReady =
    s.financialFeaturesDeclarationPlan.declarationRequiredBeforeSubmissionIfVisibleOrEnabled === true &&
    s.financialFeaturesDeclarationPlan.externalPlayConsoleSubmissionDoneNow === false &&
    s.financialFeaturesDeclarationPlan.featuresToDeclareIfVisibleOrEnabled.length >= 5 &&
    s.financialFeaturesDeclarationPlan.reviewerEvidenceRequired.length >= 7;

  const tokenizedReady =
    s.tokenizedDigitalAssetDisclosurePlan.googlePlayBillingRequiredForDigitalCollectiblesInPlayBuild === true &&
    s.tokenizedDigitalAssetDisclosurePlan.inAppProductDetailsMustDiscloseTokenizedAsset === true &&
    s.tokenizedDigitalAssetDisclosurePlan.financialFeaturesDeclarationRequired === true &&
    s.tokenizedDigitalAssetDisclosurePlan.blockchainMintingAllowedNow === false &&
    s.tokenizedDigitalAssetDisclosurePlan.tradingMarketplaceAllowedNow === false &&
    s.tokenizedDigitalAssetDisclosurePlan.nftGamblingAllowed === false &&
    s.tokenizedDigitalAssetDisclosurePlan.nftStakingAllowed === false &&
    s.tokenizedDigitalAssetDisclosurePlan.chanceBasedUnknownValueAllowed === false &&
    s.tokenizedDigitalAssetDisclosurePlan.fakeNftMintingAllowed === false;

  const cardReady =
    s.virtualCardDisclosurePlan.correctNaming.includes("Sabi Virtual Visa Card") &&
    s.virtualCardDisclosurePlan.blockedNaming === "Google Visa Card" &&
    s.virtualCardDisclosurePlan.airwallexOrLicensedIssuerRequired === true &&
    s.virtualCardDisclosurePlan.googlePayTokenizationOnlyThroughIssuerTspApproval === true &&
    s.virtualCardDisclosurePlan.cardIssuingAllowedNow === false &&
    s.virtualCardDisclosurePlan.fakeCardIssuingAllowed === false &&
    s.virtualCardDisclosurePlan.fakeBalanceAllowed === false &&
    s.virtualCardDisclosurePlan.rawPanCvvStorageAllowedOnSabiInfrastructure === false;

  const panSafetyReady =
    s.noRawPanCvvSafetyPlan.rawPanCvvStorageAllowedOnSabiInfrastructure === false &&
    s.noRawPanCvvSafetyPlan.futureAuditShouldSearchFor.length >= 6 &&
    s.noRawPanCvvSafetyPlan.allowedFutureEvidenceOnly.length >= 6 &&
    s.noRawPanCvvSafetyPlan.secretValueExposureNow === false;

  const providerReady =
    s.providerNotConfiguredPlan.fakeProviderReadyAllowed === false &&
    s.productionBlockers.length >= 10;

  const safetyReady =
    s.sourceTargetWritesNow === 0 &&
    s.targetFilesModifiedNow === 0 &&
    s.runtimeDbWriteNow === 0 &&
    s.providerCallsNow === 0 &&
    s.secretValueExposureNow === false &&
    s.walletMutationsNow === 0 &&
    s.paymentAuthorizationsNow === 0 &&
    s.moneyMovementNow === 0 &&
    s.safety.sourceTargetWriteByPlayReady13 === false &&
    s.safety.targetFilesModifiedByPlayReady13 === false &&
    s.safety.backendRestartByPlayReady13 === false &&
    s.safety.runtimeDbWriteByPlayReady13 === false &&
    s.safety.providerCallByPlayReady13 === false &&
    s.safety.secretValueExposureByPlayReady13 === false &&
    s.safety.walletMutationByPlayReady13 === false &&
    s.safety.paymentAuthorizationByPlayReady13 === false &&
    s.safety.moneyMovementByPlayReady13 === false &&
    s.safety.fakeNftMintingByPlayReady13 === false &&
    s.safety.fakeCardIssuingByPlayReady13 === false &&
    s.safety.fakeBalanceByPlayReady13 === false &&
    s.safety.fakeSuccessByPlayReady13 === false;

  const ready =
    targetReviewReady &&
    declarationReady &&
    tokenizedReady &&
    cardReady &&
    panSafetyReady &&
    providerReady &&
    safetyReady &&
    s.requiredExactApprovalTextForPlayReady14.includes("PLAY-READY-14");

  return {
    version: s.version,
    ready,
    status: ready
      ? "financial_features_nft_card_review_ready_for_permission_target_sdk_aab_planning"
      : "financial_features_nft_card_review_blocked",
    futureChangedFilesReviewed: s.futureChangedFileReview.length,
    productionBlockers: s.productionBlockers.length,
    nextRecommendedStage: "PLAY-READY-14 controlled permission rationale and target SDK/AAB local root audit planning source-only after exact approval",
  } as const;
}

export function runPlayReady13FinancialFeaturesNftCardReviewSmoke() {
  const snapshot = getPlayReady13FinancialFeaturesNftCardReview();
  const readiness = getPlayReady13Readiness();

  const assertions = [
    {
      id: "financial_feature_targets_present_no_writes",
      passed:
        snapshot.futureChangedFileReview.length >= 11 &&
        snapshot.futureChangedFileReview.every((item) => item.writeExecutedNow === false) &&
        snapshot.futureChangedFileReview.every((item) => item.runtimeEffectNow === false),
      evidence: JSON.stringify(snapshot.futureChangedFileReview.map((item) => ({
        path: item.path,
        status: item.status,
        areas: item.featureAreas,
      })),
    },
    {
      id: "tokenized_assets_block_forbidden_mechanics",
      passed:
        snapshot.tokenizedDigitalAssetDisclosurePlan.inAppProductDetailsMustDiscloseTokenizedAsset === true &&
        snapshot.tokenizedDigitalAssetDisclosurePlan.nftGamblingAllowed === false &&
        snapshot.tokenizedDigitalAssetDisclosurePlan.nftStakingAllowed === false &&
        snapshot.tokenizedDigitalAssetDisclosurePlan.chanceBasedUnknownValueAllowed === false &&
        snapshot.tokenizedDigitalAssetDisclosurePlan.fakeNftMintingAllowed === false,
      evidence: JSON.stringify(snapshot.tokenizedDigitalAssetDisclosurePlan),
    },
    {
      id: "virtual_card_issuer_copy_and_no_fake_card_balance",
      passed:
        snapshot.virtualCardDisclosurePlan.correctNaming.includes("Airwallex or licensed issuer") &&
        snapshot.virtualCardDisclosurePlan.blockedNaming === "Google Visa Card" &&
        snapshot.virtualCardDisclosurePlan.cardIssuingAllowedNow === false &&
        snapshot.virtualCardDisclosurePlan.fakeCardIssuingAllowed === false &&
        snapshot.virtualCardDisclosurePlan.fakeBalanceAllowed === false &&
        snapshot.virtualCardDisclosurePlan.rawPanCvvStorageAllowedOnSabiInfrastructure === false,
      evidence: JSON.stringify(snapshot.virtualCardDisclosurePlan),
    },
    {
      id: "financial_declaration_and_pan_safety_present",
      passed:
        snapshot.financialFeaturesDeclarationPlan.declarationRequiredBeforeSubmissionIfVisibleOrEnabled === true &&
        snapshot.financialFeaturesDeclarationPlan.externalPlayConsoleSubmissionDoneNow === false &&
        snapshot.noRawPanCvvSafetyPlan.rawPanCvvStorageAllowedOnSabiInfrastructure === false &&
        snapshot.noRawPanCvvSafetyPlan.secretValueExposureNow === false,
      evidence: JSON.stringify({
        declaration: snapshot.financialFeaturesDeclarationPlan,
        panSafety: snapshot.noRawPanCvvSafetyPlan,
      }),
    },
    {
      id: "safety_no_target_secret_provider_money_fake",
      passed:
        snapshot.sourceTargetWritesNow === 0 &&
        snapshot.targetFilesModifiedNow === 0 &&
        snapshot.runtimeDbWriteNow === 0 &&
        snapshot.providerCallsNow === 0 &&
        snapshot.secretValueExposureNow === false &&
        snapshot.walletMutationsNow === 0 &&
        snapshot.paymentAuthorizationsNow === 0 &&
        snapshot.moneyMovementNow === 0 &&
        snapshot.safety.fakeNftMintingByPlayReady13 === false &&
        snapshot.safety.fakeCardIssuingByPlayReady13 === false &&
        snapshot.safety.fakeBalanceByPlayReady13 === false &&
        snapshot.safety.fakeSuccessByPlayReady13 === false,
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
    stage: "financial_features_nft_card_review_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0
      ? "financial_features_nft_card_review_smoke_passed"
      : "financial_features_nft_card_review_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
