export const SABI_CORE_MONETIZATION_100H_VERSION = "SABI-CORE-MONETIZATION-100H" as const;

export type SabiCoreReviewEvidenceLaneKey =
  | "google_billing_digital_goods"
  | "wallet_airwallex_physical_commerce"
  | "stream_gifts_creator_earnings"
  | "paid_games_stake_locked"
  | "ai_generated_content_safety"
  | "messenger_safety_reporting"
  | "data_safety_privacy"
  | "reviewer_access_and_demo";

export type SabiCoreReviewEvidenceStatus =
  | "evidence_ready"
  | "safe_disabled_until_provider"
  | "locked_until_legal_approval"
  | "manual_reviewer_note_required";

export type SabiCoreReviewEvidenceGate = Readonly<{
  reviewerVisible: true;
  adminEvidenceVisible: true;
  mobileSecretsAllowed: false;
  rawSecretOutputAllowed: false;
  rawPurchaseTokenOutputAllowed: false;
  rawCardDataOutputAllowed: false;
  rawPromptOutputAllowed: false;
  rawUserPrivateDataOutputAllowed: false;
  fakeProviderSuccessAllowed: false;
  fakePaymentSuccessAllowed: false;
  providerCallAllowedNow: false;
  databaseWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  routeMountAllowedNow: false;
}>;

export type SabiCoreReviewEvidenceLane = Readonly<{
  key: SabiCoreReviewEvidenceLaneKey;
  title: string;
  status: SabiCoreReviewEvidenceStatus;
  evidenceGate: SabiCoreReviewEvidenceGate;
  requiredEvidence: readonly string[];
  reviewerMessage: string;
}>;

const BASE_EVIDENCE_GATE: SabiCoreReviewEvidenceGate = {
  reviewerVisible: true,
  adminEvidenceVisible: true,
  mobileSecretsAllowed: false,
  rawSecretOutputAllowed: false,
  rawPurchaseTokenOutputAllowed: false,
  rawCardDataOutputAllowed: false,
  rawPromptOutputAllowed: false,
  rawUserPrivateDataOutputAllowed: false,
  fakeProviderSuccessAllowed: false,
  fakePaymentSuccessAllowed: false,
  providerCallAllowedNow: false,
  databaseWriteAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  routeMountAllowedNow: false,
};

export const SABI_CORE_100H_REVIEW_EVIDENCE_LANES: readonly SabiCoreReviewEvidenceLane[] = [
  {
    key: "google_billing_digital_goods",
    title: "Google Billing evidence for Android digital goods",
    status: "evidence_ready",
    evidenceGate: BASE_EVIDENCE_GATE,
    requiredEvidence: [
      "Android digital coin packs, gifts, boosts, premium effects, premium AI services and digital game items must use Google Billing where policy requires it.",
      "Wallet physical balance and Airwallex are blocked from bypassing Google Billing for Android digital goods.",
      "Purchase token verification remains server-side and raw purchase tokens are never returned in Admin or reviewer evidence.",
    ],
    reviewerMessage: "Digital monetization is separated from physical commerce and remains safe-disabled until real Google Billing configuration is approved.",
  },
  {
    key: "wallet_airwallex_physical_commerce",
    title: "Wallet and Airwallex physical commerce evidence",
    status: "safe_disabled_until_provider",
    evidenceGate: BASE_EVIDENCE_GATE,
    requiredEvidence: [
      "Airwallex is reserved for physical goods, merchant QR/pay, business settlement and provider-backed commerce.",
      "KYB/KYC/AML gates stay required before merchant settlement, payout, refund or dispute runtime.",
      "Raw card data and provider secrets are not stored or printed by Sabi Admin evidence.",
    ],
    reviewerMessage: "Physical commerce provider rails are provider-not-configured and cannot move money in the foundation stage.",
  },
  {
    key: "stream_gifts_creator_earnings",
    title: "Stream gifts and creator earnings evidence",
    status: "evidence_ready",
    evidenceGate: BASE_EVIDENCE_GATE,
    requiredEvidence: [
      "Live stream gifts, short video gifts, creator support, premium effects and boosts use digital coin boundaries.",
      "Creator earnings stay pending/payable buckets and payout runtime is locked until provider/compliance approval.",
      "Fake gift purchase success is blocked.",
    ],
    reviewerMessage: "Stream monetization is prepared as a controlled foundation without live payout or fake purchase success.",
  },
  {
    key: "paid_games_stake_locked",
    title: "Paid games and stake locked evidence",
    status: "locked_until_legal_approval",
    evidenceGate: BASE_EVIDENCE_GATE,
    requiredEvidence: [
      "Fishing stake, wheel of fortune, paid tournaments and creator prize challenges stay locked.",
      "Legal license, country gate, age gate, KYC/AML gate, responsible gaming and odds disclosure are required before runtime.",
      "Fake win and fake stake success are blocked.",
    ],
    reviewerMessage: "Paid games and stake mechanics are compliance-locked and not enabled for real-money operation.",
  },
  {
    key: "ai_generated_content_safety",
    title: "AI generated content and safety evidence",
    status: "manual_reviewer_note_required",
    evidenceGate: BASE_EVIDENCE_GATE,
    requiredEvidence: [
      "Sabi AI is a core project layer for diagnostics, moderation, creator tools, business helper and review evidence.",
      "Generated content requires report/flagging, abuse, profanity and adult-safety controls before public rollout.",
      "AI cannot output raw prompts, private user data, provider secrets or card data in evidence reports.",
    ],
    reviewerMessage: "AI controls are registered as a core safety layer and remain provider-safe until public rollout gates pass.",
  },
  {
    key: "messenger_safety_reporting",
    title: "Messenger safety and reporting evidence",
    status: "evidence_ready",
    evidenceGate: BASE_EVIDENCE_GATE,
    requiredEvidence: [
      "Messenger safety and reporting evidence remains part of the Sabi Core reviewer pack.",
      "Abuse, moderation and user-report flows must be visible for review without exposing private raw message content.",
    ],
    reviewerMessage: "Messenger safety evidence is connected to the same Admin reviewer evidence center.",
  },
  {
    key: "data_safety_privacy",
    title: "Data safety and privacy evidence",
    status: "manual_reviewer_note_required",
    evidenceGate: BASE_EVIDENCE_GATE,
    requiredEvidence: [
      "No raw secrets, purchase tokens, card data, private prompts or private user data may be printed in Admin evidence.",
      "Provider keys must remain server-side and mobile secrets are not allowed.",
      "Reviewer evidence must show provider-not-configured and safe-disabled states honestly.",
    ],
    reviewerMessage: "Data safety evidence stays redacted and review-safe.",
  },
  {
    key: "reviewer_access_and_demo",
    title: "Reviewer access and demo evidence",
    status: "manual_reviewer_note_required",
    evidenceGate: BASE_EVIDENCE_GATE,
    requiredEvidence: [
      "Reviewer access should expose safe demo paths for Messenger, Stream, Wallet readiness, AI safety and Play Billing boundaries.",
      "The demo must not fake payment success, provider approval, Wallet settlement, game wins or creator payout.",
    ],
    reviewerMessage: "Reviewer demo access should be safe, truthful and blocked where providers or legal approvals are missing.",
  },
] as const;

export const SABI_CORE_100H_PLAY_REVIEW_HARD_RULES = Object.freeze({
  playReviewEvidenceCenterReady: true,
  androidDigitalGoodsMustUseGoogleBilling: true,
  walletAndAirwallexCannotBypassGoogleBillingForDigitalGoods: true,
  airwallexReservedForPhysicalMerchantCommerce: true,
  paidGamesStakeLockedUntilLegalLicenseApproval: true,
  generatedAiContentNeedsReportAndFlagging: true,
  noFakeGoogleBillingSuccess: true,
  noFakeAirwallexSuccess: true,
  noFakeGiftPurchaseSuccess: true,
  noFakeStakeOrWinSuccess: true,
  noMoneyMovementInFoundation: true,
  noRawSecretsInEvidence: true,
  noRawPurchaseTokensInEvidence: true,
  noRawCardDataInEvidence: true,
  noRawPromptOrPrivateUserDataInEvidence: true,
});

export function getSabiCore100HPlayReviewEvidenceSnapshot() {
  const lanes = SABI_CORE_100H_REVIEW_EVIDENCE_LANES.map((lane) => ({
    ...lane,
    evidenceGate: { ...lane.evidenceGate },
    requiredEvidence: [...lane.requiredEvidence],
  }));

  const blockedUnsafeActions = lanes.flatMap((lane) => [
    lane.evidenceGate.mobileSecretsAllowed ? "mobile_secrets" : null,
    lane.evidenceGate.rawSecretOutputAllowed ? "raw_secret_output" : null,
    lane.evidenceGate.rawPurchaseTokenOutputAllowed ? "raw_purchase_token_output" : null,
    lane.evidenceGate.rawCardDataOutputAllowed ? "raw_card_data_output" : null,
    lane.evidenceGate.rawPromptOutputAllowed ? "raw_prompt_output" : null,
    lane.evidenceGate.rawUserPrivateDataOutputAllowed ? "raw_user_private_data_output" : null,
    lane.evidenceGate.fakeProviderSuccessAllowed ? "fake_provider_success" : null,
    lane.evidenceGate.fakePaymentSuccessAllowed ? "fake_payment_success" : null,
    lane.evidenceGate.providerCallAllowedNow ? "provider_call" : null,
    lane.evidenceGate.databaseWriteAllowedNow ? "database_write" : null,
    lane.evidenceGate.walletMutationAllowedNow ? "wallet_mutation" : null,
    lane.evidenceGate.moneyMovementAllowedNow ? "money_movement" : null,
    lane.evidenceGate.routeMountAllowedNow ? "route_mount" : null,
  ]).filter((item): item is string => Boolean(item));

  return {
    version: SABI_CORE_MONETIZATION_100H_VERSION,
    status: "play_review_evidence_center_foundation_ready" as const,
    ok: true,
    lanes,
    hardRules: { ...SABI_CORE_100H_PLAY_REVIEW_HARD_RULES },
    providerRuntimeEnabled: false,
    googleBillingRuntimeEnabled: false,
    airwallexRuntimeEnabled: false,
    giftPurchaseRuntimeEnabled: false,
    gameStakeRuntimeEnabled: false,
    aiProviderRuntimeEnabled: false,
    routeMounted: false,
    databaseWriteReady: false,
    walletMutationReady: false,
    moneyMovementReady: false,
    blockedUnsafeActions,
    nextRequiredStages: [
      "SABI-CORE-MONETIZATION-100I Final foundation verification and TypeScript check",
      "SABI-CORE-MONETIZATION-100J Provider configuration readiness planning",
    ],
  };
}

export function assertSabiCore100HPlayReviewEvidenceLocked() {
  const snapshot = getSabiCore100HPlayReviewEvidenceSnapshot();
  const unsafeLane = snapshot.lanes.find((lane) => (
    lane.evidenceGate.mobileSecretsAllowed !== false ||
    lane.evidenceGate.rawSecretOutputAllowed !== false ||
    lane.evidenceGate.rawPurchaseTokenOutputAllowed !== false ||
    lane.evidenceGate.rawCardDataOutputAllowed !== false ||
    lane.evidenceGate.rawPromptOutputAllowed !== false ||
    lane.evidenceGate.rawUserPrivateDataOutputAllowed !== false ||
    lane.evidenceGate.fakeProviderSuccessAllowed !== false ||
    lane.evidenceGate.fakePaymentSuccessAllowed !== false ||
    lane.evidenceGate.providerCallAllowedNow !== false ||
    lane.evidenceGate.databaseWriteAllowedNow !== false ||
    lane.evidenceGate.walletMutationAllowedNow !== false ||
    lane.evidenceGate.moneyMovementAllowedNow !== false ||
    lane.evidenceGate.routeMountAllowedNow !== false
  ));

  return {
    passed: !unsafeLane && snapshot.blockedUnsafeActions.length === 0,
    unsafeLaneKey: unsafeLane?.key ?? null,
    providerRuntimeEnabled: snapshot.providerRuntimeEnabled,
    googleBillingRuntimeEnabled: snapshot.googleBillingRuntimeEnabled,
    airwallexRuntimeEnabled: snapshot.airwallexRuntimeEnabled,
    giftPurchaseRuntimeEnabled: snapshot.giftPurchaseRuntimeEnabled,
    gameStakeRuntimeEnabled: snapshot.gameStakeRuntimeEnabled,
    aiProviderRuntimeEnabled: snapshot.aiProviderRuntimeEnabled,
    routeMounted: snapshot.routeMounted,
    databaseWriteReady: snapshot.databaseWriteReady,
    walletMutationReady: snapshot.walletMutationReady,
    moneyMovementReady: snapshot.moneyMovementReady,
  };
}
