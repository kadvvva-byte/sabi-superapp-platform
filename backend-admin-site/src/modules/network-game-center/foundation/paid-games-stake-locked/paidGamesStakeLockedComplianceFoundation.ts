export const SABI_CORE_MONETIZATION_100F_VERSION = "SABI-CORE-MONETIZATION-100F" as const;

export type SabiPaidGameStakeLaneKey =
  | "fishing_stake_locked"
  | "wheel_of_fortune_stake_locked"
  | "skill_tournament_entry_locked"
  | "creator_challenge_prize_locked";

export type SabiPaidGameStakeStatus =
  | "locked_compliance"
  | "safe_disabled"
  | "waiting_legal_license"
  | "waiting_country_approval"
  | "waiting_kyc_aml";

export type SabiPaidGameStakeGate = Readonly<{
  legalLicenseApproved: false;
  countryAllowed: false;
  ageGatePassed: false;
  kycAmlPassed: false;
  responsibleGamingControlsReady: false;
  oddsDisclosureReady: boolean;
  randomnessAuditReady: boolean;
  antiFraudReady: false;
  payoutProviderReady: false;
  adminApprovalRequired: true;
}>;

export type SabiPaidGameStakeLane = Readonly<{
  key: SabiPaidGameStakeLaneKey;
  title: string;
  status: SabiPaidGameStakeStatus;
  stakeCurrencyBucket: "game_stake_locked";
  googleBillingDigitalEntryRequiredWhenAndroidDigitalGoods: true;
  walletPhysicalBalanceAllowedForStake: false;
  airwallexAllowedForStake: false;
  providerCallAllowedNow: false;
  dbWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  stakeRuntimeAllowedNow: false;
  payoutRuntimeAllowedNow: false;
  fakeWinAllowed: false;
  fakeStakeSuccessAllowed: false;
  rawProviderProofOutputAllowed: false;
  gate: SabiPaidGameStakeGate;
  notes: readonly string[];
}>;

export const SABI_CORE_100F_STAKE_BUCKETS = [
  "game_stake_locked",
  "game_prize_pending",
  "game_prize_payable_after_legal_review",
] as const;

export const SABI_CORE_100F_PAID_GAME_LANES: readonly SabiPaidGameStakeLane[] = [
  {
    key: "fishing_stake_locked",
    title: "Fishing game stake mode",
    status: "locked_compliance",
    stakeCurrencyBucket: "game_stake_locked",
    googleBillingDigitalEntryRequiredWhenAndroidDigitalGoods: true,
    walletPhysicalBalanceAllowedForStake: false,
    airwallexAllowedForStake: false,
    providerCallAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    stakeRuntimeAllowedNow: false,
    payoutRuntimeAllowedNow: false,
    fakeWinAllowed: false,
    fakeStakeSuccessAllowed: false,
    rawProviderProofOutputAllowed: false,
    gate: {
      legalLicenseApproved: false,
      countryAllowed: false,
      ageGatePassed: false,
      kycAmlPassed: false,
      responsibleGamingControlsReady: false,
      oddsDisclosureReady: false,
      randomnessAuditReady: false,
      antiFraudReady: false,
      payoutProviderReady: false,
      adminApprovalRequired: true,
    },
    notes: [
      "Fishing stake mode remains locked until legal license, country gate, age gate, KYC/AML and responsible gaming controls pass.",
      "No real stake, payout, fake win, fake balance or money movement is enabled in this foundation stage.",
      "Mobile UI may later show locked preview only until the legal/provider gates are complete.",
    ],
  },
  {
    key: "wheel_of_fortune_stake_locked",
    title: "Wheel of fortune stake mode",
    status: "locked_compliance",
    stakeCurrencyBucket: "game_stake_locked",
    googleBillingDigitalEntryRequiredWhenAndroidDigitalGoods: true,
    walletPhysicalBalanceAllowedForStake: false,
    airwallexAllowedForStake: false,
    providerCallAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    stakeRuntimeAllowedNow: false,
    payoutRuntimeAllowedNow: false,
    fakeWinAllowed: false,
    fakeStakeSuccessAllowed: false,
    rawProviderProofOutputAllowed: false,
    gate: {
      legalLicenseApproved: false,
      countryAllowed: false,
      ageGatePassed: false,
      kycAmlPassed: false,
      responsibleGamingControlsReady: false,
      oddsDisclosureReady: true,
      randomnessAuditReady: false,
      antiFraudReady: false,
      payoutProviderReady: false,
      adminApprovalRequired: true,
    },
    notes: [
      "Wheel of fortune requires odds disclosure and randomness audit before any public release.",
      "Stake and payout stay disabled until legal license, country allow-list, KYC/AML and provider gates are complete.",
      "No loot-box style randomized reward can be enabled without odds disclosure evidence.",
    ],
  },
  {
    key: "skill_tournament_entry_locked",
    title: "Skill tournament paid entry",
    status: "safe_disabled",
    stakeCurrencyBucket: "game_stake_locked",
    googleBillingDigitalEntryRequiredWhenAndroidDigitalGoods: true,
    walletPhysicalBalanceAllowedForStake: false,
    airwallexAllowedForStake: false,
    providerCallAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    stakeRuntimeAllowedNow: false,
    payoutRuntimeAllowedNow: false,
    fakeWinAllowed: false,
    fakeStakeSuccessAllowed: false,
    rawProviderProofOutputAllowed: false,
    gate: {
      legalLicenseApproved: false,
      countryAllowed: false,
      ageGatePassed: false,
      kycAmlPassed: false,
      responsibleGamingControlsReady: false,
      oddsDisclosureReady: false,
      randomnessAuditReady: false,
      antiFraudReady: false,
      payoutProviderReady: false,
      adminApprovalRequired: true,
    },
    notes: [
      "Paid entry tournaments are locked until legal classification and policy review are complete.",
      "Prize liability and payout processing cannot be enabled by UI alone.",
    ],
  },
  {
    key: "creator_challenge_prize_locked",
    title: "Creator challenge prize mode",
    status: "waiting_legal_license",
    stakeCurrencyBucket: "game_stake_locked",
    googleBillingDigitalEntryRequiredWhenAndroidDigitalGoods: true,
    walletPhysicalBalanceAllowedForStake: false,
    airwallexAllowedForStake: false,
    providerCallAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    stakeRuntimeAllowedNow: false,
    payoutRuntimeAllowedNow: false,
    fakeWinAllowed: false,
    fakeStakeSuccessAllowed: false,
    rawProviderProofOutputAllowed: false,
    gate: {
      legalLicenseApproved: false,
      countryAllowed: false,
      ageGatePassed: false,
      kycAmlPassed: false,
      responsibleGamingControlsReady: false,
      oddsDisclosureReady: false,
      randomnessAuditReady: false,
      antiFraudReady: false,
      payoutProviderReady: false,
      adminApprovalRequired: true,
    },
    notes: [
      "Creator challenge prizes require legal, tax, KYC/AML, payout and fraud review before activation.",
      "This foundation only records the locked compliance contract.",
    ],
  },
] as const;

export const SABI_CORE_100F_HARD_RULES = Object.freeze({
  paidGamesMustRemainLockedUntilLegalLicenseApproval: true,
  countryGateRequiredBeforeStakeRuntime: true,
  ageGateRequiredBeforeStakeRuntime: true,
  kycAmlRequiredBeforeStakeRuntime: true,
  responsibleGamingControlsRequired: true,
  wheelOfFortuneRequiresOddsDisclosure: true,
  randomRewardsRequireOddsDisclosureAndAudit: true,
  noWalletPhysicalBalanceBypassForAndroidDigitalGameGoods: true,
  noAirwallexStakeRuntimeInAndroidDigitalGames: true,
  noFakeWin: true,
  noFakeStakeSuccess: true,
  noMoneyMovement: true,
  noRuntimeProviderCall: true,
  noRawProviderProofOutput: true,
});

export function getSabiCore100FPaidGamesStakeLockedSnapshot() {
  const lanes = SABI_CORE_100F_PAID_GAME_LANES.map((lane) => ({
    ...lane,
    gate: { ...lane.gate },
    notes: [...lane.notes],
  }));

  const blockedLiveActions = lanes.flatMap((lane) => [
    lane.walletPhysicalBalanceAllowedForStake ? "wallet_physical_balance_stake_bypass" : null,
    lane.airwallexAllowedForStake ? "airwallex_stake_bypass" : null,
    lane.providerCallAllowedNow ? "provider_call" : null,
    lane.dbWriteAllowedNow ? "db_write" : null,
    lane.walletMutationAllowedNow ? "wallet_mutation" : null,
    lane.moneyMovementAllowedNow ? "money_movement" : null,
    lane.stakeRuntimeAllowedNow ? "stake_runtime" : null,
    lane.payoutRuntimeAllowedNow ? "payout_runtime" : null,
    lane.fakeWinAllowed ? "fake_win" : null,
    lane.fakeStakeSuccessAllowed ? "fake_stake_success" : null,
    lane.rawProviderProofOutputAllowed ? "raw_provider_proof_output" : null,
  ]).filter((item): item is string => Boolean(item));

  return {
    version: SABI_CORE_MONETIZATION_100F_VERSION,
    status: "locked_compliance_foundation_ready" as const,
    ok: true,
    lanes,
    stakeBuckets: [...SABI_CORE_100F_STAKE_BUCKETS],
    hardRules: { ...SABI_CORE_100F_HARD_RULES },
    googleBillingRuntimeEnabled: false,
    airwallexRuntimeEnabled: false,
    stakeRuntimeEnabled: false,
    payoutRuntimeEnabled: false,
    liveMoneyMovementReady: false,
    blockedLiveActions,
    nextRequiredStages: [
      "SABI-CORE-MONETIZATION-100G AI as Sabi Core control and safety layer",
      "SABI-CORE-MONETIZATION-100H Play Review Evidence Center",
    ],
  };
}

export function assertSabiCore100FPaidGamesRemainLocked() {
  const snapshot = getSabiCore100FPaidGamesStakeLockedSnapshot();
  const unsafeLane = snapshot.lanes.find((lane) => (
    lane.walletPhysicalBalanceAllowedForStake !== false ||
    lane.airwallexAllowedForStake !== false ||
    lane.providerCallAllowedNow !== false ||
    lane.dbWriteAllowedNow !== false ||
    lane.walletMutationAllowedNow !== false ||
    lane.moneyMovementAllowedNow !== false ||
    lane.stakeRuntimeAllowedNow !== false ||
    lane.payoutRuntimeAllowedNow !== false ||
    lane.fakeWinAllowed !== false ||
    lane.fakeStakeSuccessAllowed !== false ||
    lane.rawProviderProofOutputAllowed !== false
  ));

  return {
    passed: !unsafeLane && snapshot.blockedLiveActions.length === 0,
    unsafeLaneKey: unsafeLane?.key ?? null,
    stakeRuntimeEnabled: snapshot.stakeRuntimeEnabled,
    payoutRuntimeEnabled: snapshot.payoutRuntimeEnabled,
    liveMoneyMovementReady: snapshot.liveMoneyMovementReady,
  };
}
