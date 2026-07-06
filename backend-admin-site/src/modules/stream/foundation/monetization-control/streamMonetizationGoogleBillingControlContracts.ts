export const SABI_CORE_MONETIZATION_100C_VERSION = "SABI-CORE-MONETIZATION-100C" as const;

export type SabiCoreMonetizationGateStatus =
  | "safe_disabled"
  | "provider_not_configured"
  | "contract_ready"
  | "locked_compliance"
  | "waiting_real_provider";

export type SabiCoreDigitalBalanceBucket =
  | "wallet_balance_physical_commerce"
  | "purchased_digital_coin_google_billing"
  | "reward_bonus_coin"
  | "creator_earning_pending"
  | "creator_earning_payable"
  | "game_stake_locked"
  | "merchant_settlement_pending";

export type SabiCoreMonetizationControlLane = Readonly<{
  key: string;
  title: string;
  status: SabiCoreMonetizationGateStatus;
  googleBillingRequired: boolean;
  walletBypassAllowed: false;
  providerCallAllowedNow: false;
  dbWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  adminApprovalRequired: boolean;
  reviewEvidenceRequired: boolean;
  notes: readonly string[];
}>;

export const SABI_CORE_100C_DIGITAL_BALANCE_BUCKETS: readonly SabiCoreDigitalBalanceBucket[] = [
  "wallet_balance_physical_commerce",
  "purchased_digital_coin_google_billing",
  "reward_bonus_coin",
  "creator_earning_pending",
  "creator_earning_payable",
  "game_stake_locked",
  "merchant_settlement_pending",
] as const;

export const SABI_CORE_100C_MONETIZATION_LANES: readonly SabiCoreMonetizationControlLane[] = [
  {
    key: "stream_gifts",
    title: "Stream gifts",
    status: "contract_ready",
    googleBillingRequired: true,
    walletBypassAllowed: false,
    providerCallAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    adminApprovalRequired: true,
    reviewEvidenceRequired: true,
    notes: [
      "Android digital gifts must spend Google Play Billing purchased digital coin.",
      "Gift income enters creator_earning_pending first.",
      "No live gift payout is allowed from this contract stage.",
    ],
  },
  {
    key: "stream_boosts_premium_effects",
    title: "Stream boosts and premium effects",
    status: "provider_not_configured",
    googleBillingRequired: true,
    walletBypassAllowed: false,
    providerCallAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    adminApprovalRequired: true,
    reviewEvidenceRequired: true,
    notes: [
      "Boosts, premium effects, badges and digital entitlements are Android digital goods.",
      "No fake Google Billing success is allowed.",
      "Refund and revoke states are required before live provider binding.",
    ],
  },
  {
    key: "digital_coin_packs",
    title: "Digital coin packs",
    status: "safe_disabled",
    googleBillingRequired: true,
    walletBypassAllowed: false,
    providerCallAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    adminApprovalRequired: true,
    reviewEvidenceRequired: true,
    notes: [
      "Purchased digital coin is separate from physical wallet balance.",
      "Raw purchase tokens must never be printed or stored in reports.",
      "Entitlement activation stays disabled until real Google provider verification is approved.",
    ],
  },
  {
    key: "paid_games_stake_locked",
    title: "Paid games and stake modes",
    status: "locked_compliance",
    googleBillingRequired: true,
    walletBypassAllowed: false,
    providerCallAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    adminApprovalRequired: true,
    reviewEvidenceRequired: true,
    notes: [
      "Fishing and fortune wheel stake modes remain locked until legal, country, age and KYC gates pass.",
      "Odds disclosure is required for randomized virtual rewards.",
      "No real-money stake or payout is allowed from this foundation stage.",
    ],
  },
] as const;

export const SABI_CORE_100C_HARD_RULES = Object.freeze({
  androidDigitalGoodsMustUseGooglePlayBilling: true,
  walletBalanceMustNotBypassGoogleForDigitalGoods: true,
  physicalMerchantCommerceReservedForWalletAirwallexBankRails: true,
  noFakeGoogleBillingSuccess: true,
  noFakeProviderSuccess: true,
  noRawPurchaseTokenLeak: true,
  noRawCardDataStorageOrOutput: true,
  noRuntimeDbWriteFromContract: true,
  noWalletMutationFromContract: true,
  noMoneyMovementFromContract: true,
  paidGamesStakeMustRemainLockedUntilLegalLicenseApproval: true,
});

export function getSabiCore100CMonetizationReadinessSnapshot() {
  const lanes = SABI_CORE_100C_MONETIZATION_LANES.map((lane) => ({ ...lane, notes: [...lane.notes] }));
  const blockedLiveActions = lanes.flatMap((lane) => [
    lane.providerCallAllowedNow ? "provider_call" : null,
    lane.dbWriteAllowedNow ? "db_write" : null,
    lane.walletMutationAllowedNow ? "wallet_mutation" : null,
    lane.moneyMovementAllowedNow ? "money_movement" : null,
  ]).filter((item): item is string => Boolean(item));

  return {
    version: SABI_CORE_MONETIZATION_100C_VERSION,
    status: "safe_disabled_contract_ready" as const,
    ok: true,
    lanes,
    digitalBalanceBuckets: [...SABI_CORE_100C_DIGITAL_BALANCE_BUCKETS],
    hardRules: { ...SABI_CORE_100C_HARD_RULES },
    liveProviderReady: false,
    liveMoneyMovementReady: false,
    blockedLiveActions,
    nextRequiredStages: [
      "SABI-CORE-MONETIZATION-100D Wallet balance separation plus Airwallex readiness controls",
      "SABI-CORE-MONETIZATION-100E Gifts and creator earnings foundation",
      "SABI-CORE-MONETIZATION-100F Paid games locked compliance foundation",
    ],
  };
}

export function assertSabiCore100CNoLiveMovementAllowed() {
  const snapshot = getSabiCore100CMonetizationReadinessSnapshot();
  const unsafeLane = snapshot.lanes.find((lane) => (
    lane.walletBypassAllowed !== false ||
    lane.providerCallAllowedNow !== false ||
    lane.dbWriteAllowedNow !== false ||
    lane.walletMutationAllowedNow !== false ||
    lane.moneyMovementAllowedNow !== false
  ));

  return {
    passed: !unsafeLane && snapshot.blockedLiveActions.length === 0,
    unsafeLaneKey: unsafeLane?.key ?? null,
    liveProviderReady: snapshot.liveProviderReady,
    liveMoneyMovementReady: snapshot.liveMoneyMovementReady,
  };
}
