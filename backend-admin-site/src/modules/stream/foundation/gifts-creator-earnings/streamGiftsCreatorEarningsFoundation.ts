export const SABI_CORE_MONETIZATION_100E_VERSION = "SABI-CORE-MONETIZATION-100E" as const;

export type SabiGiftFundingBucket =
  | "purchased_digital_coin_google_billing"
  | "reward_bonus_coin";

export type SabiCreatorEarningBucket =
  | "creator_earning_pending"
  | "creator_earning_payable";

export type SabiGiftFoundationStatus =
  | "safe_disabled"
  | "contract_ready"
  | "waiting_google_billing_provider"
  | "locked_compliance";

export type SabiGiftCatalogLane = Readonly<{
  key: string;
  title: string;
  status: SabiGiftFoundationStatus;
  allowedFundingBuckets: readonly SabiGiftFundingBucket[];
  androidDigitalGoodsMustUseGooglePlayBilling: true;
  walletPhysicalBalanceAllowedForGiftPurchase: false;
  airwallexAllowedForGiftPurchase: false;
  providerCallAllowedNow: false;
  dbWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeGiftPurchaseSuccessAllowed: false;
  rawPurchaseTokenOutputAllowed: false;
  creatorEarningBucket: SabiCreatorEarningBucket;
  creatorPayoutAllowedNow: false;
  reviewEvidenceRequired: boolean;
  adminApprovalRequiredBeforeRelease: boolean;
  notes: readonly string[];
}>;

export const SABI_CORE_100E_GIFT_FUNDING_BUCKETS: readonly SabiGiftFundingBucket[] = [
  "purchased_digital_coin_google_billing",
  "reward_bonus_coin",
] as const;

export const SABI_CORE_100E_CREATOR_EARNING_BUCKETS: readonly SabiCreatorEarningBucket[] = [
  "creator_earning_pending",
  "creator_earning_payable",
] as const;

export const SABI_CORE_100E_GIFT_CATALOG_LANES: readonly SabiGiftCatalogLane[] = [
  {
    key: "live_stream_gift",
    title: "Live stream gift",
    status: "contract_ready",
    allowedFundingBuckets: ["purchased_digital_coin_google_billing", "reward_bonus_coin"],
    androidDigitalGoodsMustUseGooglePlayBilling: true,
    walletPhysicalBalanceAllowedForGiftPurchase: false,
    airwallexAllowedForGiftPurchase: false,
    providerCallAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeGiftPurchaseSuccessAllowed: false,
    rawPurchaseTokenOutputAllowed: false,
    creatorEarningBucket: "creator_earning_pending",
    creatorPayoutAllowedNow: false,
    reviewEvidenceRequired: true,
    adminApprovalRequiredBeforeRelease: true,
    notes: [
      "Live gifts are Android digital goods and must be funded by Google Play Billing digital coin or approved reward bonus coin.",
      "Gift income starts as creator_earning_pending and cannot be paid out by this foundation stage.",
      "No fake gift purchase success is allowed.",
    ],
  },
  {
    key: "short_video_gift",
    title: "Short video gift",
    status: "contract_ready",
    allowedFundingBuckets: ["purchased_digital_coin_google_billing", "reward_bonus_coin"],
    androidDigitalGoodsMustUseGooglePlayBilling: true,
    walletPhysicalBalanceAllowedForGiftPurchase: false,
    airwallexAllowedForGiftPurchase: false,
    providerCallAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeGiftPurchaseSuccessAllowed: false,
    rawPurchaseTokenOutputAllowed: false,
    creatorEarningBucket: "creator_earning_pending",
    creatorPayoutAllowedNow: false,
    reviewEvidenceRequired: true,
    adminApprovalRequiredBeforeRelease: true,
    notes: [
      "Short video gifts follow the same digital goods boundary as live stream gifts.",
      "Engagement counters must not create spend or earnings without a real purchase entitlement.",
      "Refund or revoke events must reduce entitlement before earnings become payable.",
    ],
  },
  {
    key: "creator_support_gift",
    title: "Creator support gift",
    status: "safe_disabled",
    allowedFundingBuckets: ["purchased_digital_coin_google_billing", "reward_bonus_coin"],
    androidDigitalGoodsMustUseGooglePlayBilling: true,
    walletPhysicalBalanceAllowedForGiftPurchase: false,
    airwallexAllowedForGiftPurchase: false,
    providerCallAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeGiftPurchaseSuccessAllowed: false,
    rawPurchaseTokenOutputAllowed: false,
    creatorEarningBucket: "creator_earning_pending",
    creatorPayoutAllowedNow: false,
    reviewEvidenceRequired: true,
    adminApprovalRequiredBeforeRelease: true,
    notes: [
      "Creator support is a digital creator monetization feature and cannot use physical wallet balance on Android.",
      "Creator earnings remain pending until payout provider, KYC/AML and approval controls are complete.",
    ],
  },
  {
    key: "premium_effect_gift",
    title: "Premium effect or badge gift",
    status: "waiting_google_billing_provider",
    allowedFundingBuckets: ["purchased_digital_coin_google_billing"],
    androidDigitalGoodsMustUseGooglePlayBilling: true,
    walletPhysicalBalanceAllowedForGiftPurchase: false,
    airwallexAllowedForGiftPurchase: false,
    providerCallAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeGiftPurchaseSuccessAllowed: false,
    rawPurchaseTokenOutputAllowed: false,
    creatorEarningBucket: "creator_earning_pending",
    creatorPayoutAllowedNow: false,
    reviewEvidenceRequired: true,
    adminApprovalRequiredBeforeRelease: true,
    notes: [
      "Premium effects, badges and digital cosmetic gifts require Google Play Billing digital coin or direct Google Billing entitlement.",
      "No raw purchase token or provider proof may be shown in Admin.",
    ],
  },
  {
    key: "stream_boost_gift",
    title: "Stream boost gift",
    status: "locked_compliance",
    allowedFundingBuckets: ["purchased_digital_coin_google_billing"],
    androidDigitalGoodsMustUseGooglePlayBilling: true,
    walletPhysicalBalanceAllowedForGiftPurchase: false,
    airwallexAllowedForGiftPurchase: false,
    providerCallAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeGiftPurchaseSuccessAllowed: false,
    rawPurchaseTokenOutputAllowed: false,
    creatorEarningBucket: "creator_earning_pending",
    creatorPayoutAllowedNow: false,
    reviewEvidenceRequired: true,
    adminApprovalRequiredBeforeRelease: true,
    notes: [
      "Boosts affect digital visibility and must be treated as digital goods.",
      "Ad-like, ranking or promotion behavior must be reviewed before launch.",
      "This lane stays locked until Google Billing and policy evidence are complete.",
    ],
  },
] as const;

export const SABI_CORE_100E_CREATOR_EARNINGS_RULES = Object.freeze({
  giftIncomeStartsPending: true,
  pendingEarningsCanBeReleasedOnlyAfterRefundWindowAndRiskReview: true,
  creatorEarningPayableRequiresKycAmlAndAdminApproval: true,
  payoutProviderRequiredBeforeLivePayout: true,
  directWithdrawalFromPendingGiftIncomeBlocked: true,
  accountantOrOwnerApprovalRequiredForManualRelease: true,
  noPayoutFromThisFoundationStage: true,
});

export const SABI_CORE_100E_HARD_RULES = Object.freeze({
  androidDigitalGiftsMustUseGooglePlayBilling: true,
  walletPhysicalBalanceMustNotBuyAndroidDigitalGifts: true,
  airwallexMustNotBuyAndroidDigitalGifts: true,
  noFakeGiftPurchaseSuccess: true,
  noRuntimeProviderCallFromContract: true,
  noRuntimeDbWriteFromContract: true,
  noWalletMutationFromContract: true,
  noMoneyMovementFromContract: true,
  noCreatorPayoutFromContract: true,
  noRawPurchaseTokenLeak: true,
  giftEarningsRemainPendingUntilComplianceProviderApproval: true,
  paidGameStakeNotCoveredByGiftFoundation: true,
});

export function getSabiCore100EGiftsCreatorEarningsSnapshot() {
  const lanes = SABI_CORE_100E_GIFT_CATALOG_LANES.map((lane) => ({
    ...lane,
    allowedFundingBuckets: [...lane.allowedFundingBuckets],
    notes: [...lane.notes],
  }));

  const blockedLiveActions = lanes.flatMap((lane) => [
    lane.walletPhysicalBalanceAllowedForGiftPurchase ? "wallet_physical_balance_gift_bypass" : null,
    lane.airwallexAllowedForGiftPurchase ? "airwallex_digital_gift_bypass" : null,
    lane.providerCallAllowedNow ? "provider_call" : null,
    lane.dbWriteAllowedNow ? "db_write" : null,
    lane.walletMutationAllowedNow ? "wallet_mutation" : null,
    lane.moneyMovementAllowedNow ? "money_movement" : null,
    lane.fakeGiftPurchaseSuccessAllowed ? "fake_gift_purchase_success" : null,
    lane.rawPurchaseTokenOutputAllowed ? "raw_purchase_token_output" : null,
    lane.creatorPayoutAllowedNow ? "creator_payout" : null,
  ]).filter((item): item is string => Boolean(item));

  return {
    version: SABI_CORE_MONETIZATION_100E_VERSION,
    status: "safe_disabled_contract_ready" as const,
    ok: true,
    lanes,
    giftFundingBuckets: [...SABI_CORE_100E_GIFT_FUNDING_BUCKETS],
    creatorEarningBuckets: [...SABI_CORE_100E_CREATOR_EARNING_BUCKETS],
    creatorEarningsRules: { ...SABI_CORE_100E_CREATOR_EARNINGS_RULES },
    hardRules: { ...SABI_CORE_100E_HARD_RULES },
    googleBillingRuntimeEnabled: false,
    giftPurchaseRuntimeEnabled: false,
    creatorPayoutRuntimeEnabled: false,
    liveMoneyMovementReady: false,
    blockedLiveActions,
    nextRequiredStages: [
      "SABI-CORE-MONETIZATION-100F Paid games and stake locked compliance foundation",
      "SABI-CORE-MONETIZATION-100G AI as Sabi Core control and safety layer",
      "SABI-CORE-MONETIZATION-100H Play Review Evidence Center",
    ],
  };
}

export function assertSabiCore100EGiftsRemainSafeDisabled() {
  const snapshot = getSabiCore100EGiftsCreatorEarningsSnapshot();
  const unsafeLane = snapshot.lanes.find((lane) => (
    lane.walletPhysicalBalanceAllowedForGiftPurchase !== false ||
    lane.airwallexAllowedForGiftPurchase !== false ||
    lane.providerCallAllowedNow !== false ||
    lane.dbWriteAllowedNow !== false ||
    lane.walletMutationAllowedNow !== false ||
    lane.moneyMovementAllowedNow !== false ||
    lane.fakeGiftPurchaseSuccessAllowed !== false ||
    lane.rawPurchaseTokenOutputAllowed !== false ||
    lane.creatorPayoutAllowedNow !== false
  ));

  return {
    passed: !unsafeLane && snapshot.blockedLiveActions.length === 0,
    unsafeLaneKey: unsafeLane?.key ?? null,
    googleBillingRuntimeEnabled: snapshot.googleBillingRuntimeEnabled,
    giftPurchaseRuntimeEnabled: snapshot.giftPurchaseRuntimeEnabled,
    creatorPayoutRuntimeEnabled: snapshot.creatorPayoutRuntimeEnabled,
    liveMoneyMovementReady: snapshot.liveMoneyMovementReady,
  };
}
