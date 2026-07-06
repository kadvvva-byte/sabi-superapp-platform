export const SABI_CORE_MONETIZATION_100D_VERSION = "SABI-CORE-MONETIZATION-100D" as const;

export type SabiCoreWalletBalanceBucket =
  | "wallet_balance_physical_commerce"
  | "purchased_digital_coin_google_billing"
  | "reward_bonus_coin"
  | "creator_earning_pending"
  | "creator_earning_payable"
  | "game_stake_locked"
  | "merchant_settlement_pending";

export type SabiCoreAirwallexReadinessStatus =
  | "provider_not_configured"
  | "safe_disabled"
  | "contract_ready"
  | "locked_compliance"
  | "waiting_real_provider";

export type SabiCoreAirwallexReadinessLane = Readonly<{
  key: string;
  title: string;
  status: SabiCoreAirwallexReadinessStatus;
  physicalCommerceAllowedThroughAirwallex: boolean;
  androidDigitalGoodsAllowedThroughAirwallex: false;
  androidDigitalGoodsMustUseGooglePlayBilling: true;
  providerCallAllowedNow: false;
  dbWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  rawCardDataAllowed: false;
  rawProviderSecretReturnAllowed: false;
  adminApprovalRequired: boolean;
  kybKycRequired: boolean;
  reviewEvidenceRequired: boolean;
  notes: readonly string[];
}>;

export const SABI_CORE_100D_BALANCE_BUCKETS: readonly SabiCoreWalletBalanceBucket[] = [
  "wallet_balance_physical_commerce",
  "purchased_digital_coin_google_billing",
  "reward_bonus_coin",
  "creator_earning_pending",
  "creator_earning_payable",
  "game_stake_locked",
  "merchant_settlement_pending",
] as const;

export const SABI_CORE_100D_AIRWALLEX_READINESS_LANES: readonly SabiCoreAirwallexReadinessLane[] = [
  {
    key: "airwallex_provider_config_vault",
    title: "Airwallex provider config vault",
    status: "provider_not_configured",
    physicalCommerceAllowedThroughAirwallex: true,
    androidDigitalGoodsAllowedThroughAirwallex: false,
    androidDigitalGoodsMustUseGooglePlayBilling: true,
    providerCallAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawCardDataAllowed: false,
    rawProviderSecretReturnAllowed: false,
    adminApprovalRequired: true,
    kybKycRequired: true,
    reviewEvidenceRequired: true,
    notes: [
      "Airwallex keys must stay server-side and must not be printed in Admin evidence.",
      "This stage creates readiness controls only; it does not enable provider runtime.",
      "Provider status remains provider_not_configured until real owner-approved binding.",
    ],
  },
  {
    key: "merchant_business_onboarding_kyb",
    title: "Merchant and business KYB onboarding",
    status: "contract_ready",
    physicalCommerceAllowedThroughAirwallex: true,
    androidDigitalGoodsAllowedThroughAirwallex: false,
    androidDigitalGoodsMustUseGooglePlayBilling: true,
    providerCallAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawCardDataAllowed: false,
    rawProviderSecretReturnAllowed: false,
    adminApprovalRequired: true,
    kybKycRequired: true,
    reviewEvidenceRequired: true,
    notes: [
      "Business and merchant accounts require KYB/KYC gates before live payment acceptance.",
      "QR/pay, supermarket, SilkRoad physical goods and merchant settlement belong to physical commerce rails.",
      "No fake onboarding success is allowed.",
    ],
  },
  {
    key: "physical_merchant_qr_pay_boundary",
    title: "Physical merchant QR/pay boundary",
    status: "safe_disabled",
    physicalCommerceAllowedThroughAirwallex: true,
    androidDigitalGoodsAllowedThroughAirwallex: false,
    androidDigitalGoodsMustUseGooglePlayBilling: true,
    providerCallAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawCardDataAllowed: false,
    rawProviderSecretReturnAllowed: false,
    adminApprovalRequired: true,
    kybKycRequired: true,
    reviewEvidenceRequired: true,
    notes: [
      "Wallet/Airwallex may be used for physical commerce only after provider and compliance approval.",
      "Android digital gifts, boosts, premium effects, digital coin packs and digital game entitlements cannot use this rail.",
      "Safe-disabled state must be visible in Admin until real provider readiness is approved.",
    ],
  },
  {
    key: "settlement_payout_refund_dispute_controls",
    title: "Settlement, payout, refund and dispute controls",
    status: "locked_compliance",
    physicalCommerceAllowedThroughAirwallex: true,
    androidDigitalGoodsAllowedThroughAirwallex: false,
    androidDigitalGoodsMustUseGooglePlayBilling: true,
    providerCallAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawCardDataAllowed: false,
    rawProviderSecretReturnAllowed: false,
    adminApprovalRequired: true,
    kybKycRequired: true,
    reviewEvidenceRequired: true,
    notes: [
      "Merchant settlement stays merchant_settlement_pending until real provider confirmation and approval.",
      "Refund, dispute and payout controls require audit trail and separation of duties before live activation.",
      "No live payout, refund or settlement movement is allowed from this foundation stage.",
    ],
  },
  {
    key: "digital_goods_wallet_bypass_guard",
    title: "Digital goods wallet bypass guard",
    status: "contract_ready",
    physicalCommerceAllowedThroughAirwallex: false,
    androidDigitalGoodsAllowedThroughAirwallex: false,
    androidDigitalGoodsMustUseGooglePlayBilling: true,
    providerCallAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawCardDataAllowed: false,
    rawProviderSecretReturnAllowed: false,
    adminApprovalRequired: true,
    kybKycRequired: false,
    reviewEvidenceRequired: true,
    notes: [
      "Physical wallet balance must not bypass Google Play Billing for Android digital goods.",
      "Purchased digital coin from Google Billing remains separate from physical wallet balance.",
      "Game stake locked and creator earnings must not be released by this Airwallex readiness stage.",
    ],
  },
] as const;

export const SABI_CORE_100D_HARD_RULES = Object.freeze({
  androidDigitalGoodsMustUseGooglePlayBilling: true,
  walletBalanceMustNotBypassGoogleForDigitalGoods: true,
  airwallexReservedForPhysicalMerchantCommerce: true,
  merchantBusinessKybKycRequiredBeforeLive: true,
  noFakeAirwallexSuccess: true,
  noFakeProviderSuccess: true,
  noRuntimeProviderCallFromContract: true,
  noRuntimeDbWriteFromContract: true,
  noWalletMutationFromContract: true,
  noMoneyMovementFromContract: true,
  noRawCardDataStorageOrOutput: true,
  noRawProviderSecretsInReports: true,
  settlementPayoutRefundsRemainDisabledUntilProviderComplianceApproval: true,
});

export function getSabiCore100DWalletAirwallexReadinessSnapshot() {
  const lanes = SABI_CORE_100D_AIRWALLEX_READINESS_LANES.map((lane) => ({ ...lane, notes: [...lane.notes] }));
  const blockedLiveActions = lanes.flatMap((lane) => [
    lane.providerCallAllowedNow ? "provider_call" : null,
    lane.dbWriteAllowedNow ? "db_write" : null,
    lane.walletMutationAllowedNow ? "wallet_mutation" : null,
    lane.moneyMovementAllowedNow ? "money_movement" : null,
    lane.rawCardDataAllowed ? "raw_card_data" : null,
    lane.rawProviderSecretReturnAllowed ? "raw_provider_secret" : null,
    lane.androidDigitalGoodsAllowedThroughAirwallex ? "digital_goods_airwallex_bypass" : null,
  ]).filter((item): item is string => Boolean(item));

  return {
    version: SABI_CORE_MONETIZATION_100D_VERSION,
    status: "provider_not_configured_safe_disabled" as const,
    ok: true,
    lanes,
    balanceBuckets: [...SABI_CORE_100D_BALANCE_BUCKETS],
    hardRules: { ...SABI_CORE_100D_HARD_RULES },
    airwallexRuntimeEnabled: false,
    googleBillingRuntimeEnabled: false,
    liveProviderReady: false,
    liveMoneyMovementReady: false,
    blockedLiveActions,
    nextRequiredStages: [
      "SABI-CORE-MONETIZATION-100E Gifts and creator earnings foundation",
      "SABI-CORE-MONETIZATION-100F Paid games locked compliance foundation",
      "SABI-CORE-MONETIZATION-100G AI as Sabi Core control and safety layer",
    ],
  };
}

export function assertSabiCore100DNoWalletAirwallexBypassAllowed() {
  const snapshot = getSabiCore100DWalletAirwallexReadinessSnapshot();
  const unsafeLane = snapshot.lanes.find((lane) => (
    lane.androidDigitalGoodsAllowedThroughAirwallex !== false ||
    lane.providerCallAllowedNow !== false ||
    lane.dbWriteAllowedNow !== false ||
    lane.walletMutationAllowedNow !== false ||
    lane.moneyMovementAllowedNow !== false ||
    lane.rawCardDataAllowed !== false ||
    lane.rawProviderSecretReturnAllowed !== false
  ));

  return {
    passed: !unsafeLane && snapshot.blockedLiveActions.length === 0,
    unsafeLaneKey: unsafeLane?.key ?? null,
    airwallexRuntimeEnabled: snapshot.airwallexRuntimeEnabled,
    liveMoneyMovementReady: snapshot.liveMoneyMovementReady,
  };
}
