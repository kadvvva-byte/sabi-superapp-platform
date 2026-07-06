export type SabiCoreMonetizationRuntimeStatus =
  | "source_only_contract_ready_safe_disabled"
  | "source_only_contract_ready_provider_not_configured"
  | "source_only_contract_ready_payout_locked"
  | "source_only_contract_ready_legal_country_age_kyc_locked"
  | "source_only_evidence_center_ready";

export type SabiCoreMonetizationLaneKey =
  | "stream_google_billing"
  | "wallet_airwallex"
  | "gifts_creator_earnings"
  | "paid_games_stake_locked"
  | "sabi_ai_core_safety"
  | "play_review_evidence";

export type SabiCoreMonetizationProviderGate =
  | "safe_disabled"
  | "provider_not_configured"
  | "locked_until_legal_approval"
  | "runtime_disabled";

export interface SabiCoreMonetizationLaneSnapshot {
  key: SabiCoreMonetizationLaneKey;
  title: string;
  status: SabiCoreMonetizationRuntimeStatus;
  providerGate: SabiCoreMonetizationProviderGate;
  sourceContractPath: string;
  adminVisible: boolean;
  runtimeEnabled: boolean;
  dbWriteAllowedNow: boolean;
  providerCallAllowedNow: boolean;
  walletMutationAllowedNow: boolean;
  moneyMovementAllowedNow: boolean;
  rawSecretOutputAllowedNow: boolean;
  rawPurchaseTokenOutputAllowedNow: boolean;
  rawCardDataOutputAllowedNow: boolean;
  blockers: string[];
}

export interface SabiCoreMonetizationRuntimeSnapshot {
  version: "SABI-CORE-MONETIZATION-101B";
  generatedAtUtc: string;
  status: "read_only_snapshot_ready";
  readOnly: true;
  routeMountedByThisStage: false;
  mountExecutionAllowedNow: false;
  lanes: SabiCoreMonetizationLaneSnapshot[];
  readiness: Record<SabiCoreMonetizationLaneKey, number>;
  balanceBuckets: string[];
  fixedRules: {
    androidDigitalGoodsMustUseGooglePlayBilling: true;
    walletBalanceMustNotBypassGoogleForDigitalGoods: true;
    airwallexReservedForPhysicalMerchantCommerce: true;
    paidGamesStakeMustRemainLockedUntilLegalLicenseApproval: true;
    noFakeProviderSuccess: true;
    noFakeMoneyMovement: true;
    noRawPurchaseTokenLeak: true;
    noRawCardDataStorageOrOutput: true;
    aiMustBeCoreProjectLayer: true;
  };
  safety: {
    providerCallPerformed: false;
    runtimeDbWritePerformed: false;
    walletMutationPerformed: false;
    moneyMovementPerformed: false;
    creatorPayoutPerformed: false;
    stakeRuntimeEnabled: false;
    payoutRuntimeEnabled: false;
    gamblingRuntimeEnabled: false;
    googleBillingRuntimeEnabled: false;
    airwallexRuntimeEnabled: false;
    aiProviderRuntimeEnabled: false;
    rawSecretsReturned: false;
    rawPurchaseTokensReturned: false;
    rawCardDataReturned: false;
    rawPromptDataReturned: false;
    rawUserPrivateDataReturned: false;
  };
  stillNotEnabled: string[];
}

export const SABI_CORE_MONETIZATION_READONLY_ROUTES = [
  "/api/admin/sabi-core/monetization/runtime-snapshot",
  "/api/admin/sabi-core/monetization/readiness",
  "/api/admin/sabi-core/monetization/provider-gates",
  "/api/admin/sabi-core/monetization/play-review-evidence",
] as const;

const lanes: SabiCoreMonetizationLaneSnapshot[] = [
  {
    key: "stream_google_billing",
    title: "Stream monetization plus Google Billing",
    status: "source_only_contract_ready_safe_disabled",
    providerGate: "safe_disabled",
    sourceContractPath: "src/modules/stream/foundation/monetization-control/streamMonetizationGoogleBillingControlContracts.ts",
    adminVisible: true,
    runtimeEnabled: false,
    dbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretOutputAllowedNow: false,
    rawPurchaseTokenOutputAllowedNow: false,
    rawCardDataOutputAllowedNow: false,
    blockers: ["google_billing_runtime_not_enabled", "purchase_persistence_not_enabled"],
  },
  {
    key: "wallet_airwallex",
    title: "Wallet balance separation plus Airwallex",
    status: "source_only_contract_ready_provider_not_configured",
    providerGate: "provider_not_configured",
    sourceContractPath: "src/modules/wallet/foundation/airwallex-readiness/walletAirwallexReadinessControls.ts",
    adminVisible: true,
    runtimeEnabled: false,
    dbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretOutputAllowedNow: false,
    rawPurchaseTokenOutputAllowedNow: false,
    rawCardDataOutputAllowedNow: false,
    blockers: ["airwallex_runtime_not_enabled", "provider_keys_not_bound"],
  },
  {
    key: "gifts_creator_earnings",
    title: "Gifts plus creator earnings",
    status: "source_only_contract_ready_payout_locked",
    providerGate: "safe_disabled",
    sourceContractPath: "src/modules/stream/foundation/gifts-creator-earnings/streamGiftsCreatorEarningsFoundation.ts",
    adminVisible: true,
    runtimeEnabled: false,
    dbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretOutputAllowedNow: false,
    rawPurchaseTokenOutputAllowedNow: false,
    rawCardDataOutputAllowedNow: false,
    blockers: ["gift_purchase_runtime_not_enabled", "creator_payout_locked"],
  },
  {
    key: "paid_games_stake_locked",
    title: "Paid games plus stake locked",
    status: "source_only_contract_ready_legal_country_age_kyc_locked",
    providerGate: "locked_until_legal_approval",
    sourceContractPath: "src/modules/network-game-center/foundation/paid-games-stake-locked/paidGamesStakeLockedComplianceFoundation.ts",
    adminVisible: true,
    runtimeEnabled: false,
    dbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretOutputAllowedNow: false,
    rawPurchaseTokenOutputAllowedNow: false,
    rawCardDataOutputAllowedNow: false,
    blockers: ["legal_license_required", "country_gate_required", "age_gate_required", "kyc_aml_gate_required"],
  },
  {
    key: "sabi_ai_core_safety",
    title: "Sabi AI core safety",
    status: "source_only_contract_ready_safe_disabled",
    providerGate: "runtime_disabled",
    sourceContractPath: "src/modules/ai/foundation/sabi-core-ai-control/sabiCoreAiControlSafetyFoundation.ts",
    adminVisible: true,
    runtimeEnabled: false,
    dbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretOutputAllowedNow: false,
    rawPurchaseTokenOutputAllowedNow: false,
    rawCardDataOutputAllowedNow: false,
    blockers: ["ai_provider_runtime_disabled", "generated_content_runtime_disabled"],
  },
  {
    key: "play_review_evidence",
    title: "Play Review Evidence Center",
    status: "source_only_evidence_center_ready",
    providerGate: "safe_disabled",
    sourceContractPath: "src/modules/play-ready/foundation/sabi-core-review-evidence-center/sabiCorePlayReviewEvidenceCenter.ts",
    adminVisible: true,
    runtimeEnabled: false,
    dbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretOutputAllowedNow: false,
    rawPurchaseTokenOutputAllowedNow: false,
    rawCardDataOutputAllowedNow: false,
    blockers: ["review_evidence_runtime_snapshot_not_mounted"],
  },
];

export function buildSabiCoreMonetizationRuntimeSnapshot(now: Date = new Date()): SabiCoreMonetizationRuntimeSnapshot {
  return {
    version: "SABI-CORE-MONETIZATION-101B",
    generatedAtUtc: now.toISOString(),
    status: "read_only_snapshot_ready",
    readOnly: true,
    routeMountedByThisStage: false,
    mountExecutionAllowedNow: false,
    lanes,
    readiness: {
      stream_google_billing: 100,
      wallet_airwallex: 100,
      gifts_creator_earnings: 100,
      paid_games_stake_locked: 100,
      sabi_ai_core_safety: 100,
      play_review_evidence: 100,
    },
    balanceBuckets: [
      "wallet_balance_physical_commerce",
      "purchased_digital_coin_google_billing",
      "reward_bonus_coin",
      "creator_earning_pending",
      "creator_earning_payable",
      "game_stake_locked",
      "merchant_settlement_pending",
    ],
    fixedRules: {
      androidDigitalGoodsMustUseGooglePlayBilling: true,
      walletBalanceMustNotBypassGoogleForDigitalGoods: true,
      airwallexReservedForPhysicalMerchantCommerce: true,
      paidGamesStakeMustRemainLockedUntilLegalLicenseApproval: true,
      noFakeProviderSuccess: true,
      noFakeMoneyMovement: true,
      noRawPurchaseTokenLeak: true,
      noRawCardDataStorageOrOutput: true,
      aiMustBeCoreProjectLayer: true,
    },
    safety: {
      providerCallPerformed: false,
      runtimeDbWritePerformed: false,
      walletMutationPerformed: false,
      moneyMovementPerformed: false,
      creatorPayoutPerformed: false,
      stakeRuntimeEnabled: false,
      payoutRuntimeEnabled: false,
      gamblingRuntimeEnabled: false,
      googleBillingRuntimeEnabled: false,
      airwallexRuntimeEnabled: false,
      aiProviderRuntimeEnabled: false,
      rawSecretsReturned: false,
      rawPurchaseTokensReturned: false,
      rawCardDataReturned: false,
      rawPromptDataReturned: false,
      rawUserPrivateDataReturned: false,
    },
    stillNotEnabled: [
      "real Google Billing runtime",
      "real Airwallex provider runtime",
      "real DB persistence for purchases/earnings/stakes",
      "real Wallet money movement",
      "creator payout",
      "stake/gambling runtime",
      "mobile UI games/gifts/monetization",
    ],
  };
}

export function buildSabiCoreMonetizationReadinessSnapshot(now: Date = new Date()) {
  const snapshot = buildSabiCoreMonetizationRuntimeSnapshot(now);
  return {
    version: snapshot.version,
    generatedAtUtc: snapshot.generatedAtUtc,
    readOnly: true as const,
    routeMountedByThisStage: false as const,
    overallFoundationReadiness: 100,
    readiness: snapshot.readiness,
    stillNotEnabled: snapshot.stillNotEnabled,
    safety: snapshot.safety,
  };
}

export function buildSabiCoreMonetizationProviderGatesSnapshot(now: Date = new Date()) {
  const snapshot = buildSabiCoreMonetizationRuntimeSnapshot(now);
  return {
    version: snapshot.version,
    generatedAtUtc: snapshot.generatedAtUtc,
    readOnly: true as const,
    providerGates: snapshot.lanes.map((lane) => ({
      key: lane.key,
      title: lane.title,
      providerGate: lane.providerGate,
      runtimeEnabled: lane.runtimeEnabled,
      blockers: lane.blockers,
      providerCallAllowedNow: lane.providerCallAllowedNow,
      walletMutationAllowedNow: lane.walletMutationAllowedNow,
      moneyMovementAllowedNow: lane.moneyMovementAllowedNow,
    })),
    safety: snapshot.safety,
  };
}

export function buildSabiCoreMonetizationPlayReviewEvidenceSnapshot(now: Date = new Date()) {
  const snapshot = buildSabiCoreMonetizationRuntimeSnapshot(now);
  return {
    version: snapshot.version,
    generatedAtUtc: snapshot.generatedAtUtc,
    readOnly: true as const,
    evidenceReady: true,
    evidenceLanes: snapshot.lanes.map((lane) => ({
      key: lane.key,
      title: lane.title,
      status: lane.status,
      sourceContractPath: lane.sourceContractPath,
      rawSecretOutputAllowedNow: lane.rawSecretOutputAllowedNow,
      rawPurchaseTokenOutputAllowedNow: lane.rawPurchaseTokenOutputAllowedNow,
      rawCardDataOutputAllowedNow: lane.rawCardDataOutputAllowedNow,
    })),
    fixedRules: snapshot.fixedRules,
    safety: snapshot.safety,
  };
}
