export const SABI_CORE_PROVIDER_KEY_READINESS_ADMIN_ROUTES = {
  snapshot: "/sabi-core/provider-key-readiness/snapshot",
  googleBilling: "/sabi-core/provider-key-readiness/google-billing",
  airwallex: "/sabi-core/provider-key-readiness/airwallex",
  creatorEarnings: "/sabi-core/provider-key-readiness/creator-earnings",
  lockedRuntime: "/sabi-core/provider-key-readiness/locked-runtime",
} as const;

export type SabiCoreProviderKeyReadinessState = "ready_for_config_reference" | "provider_not_configured" | "locked" | "disabled";

export type SabiCoreProviderKeyReadinessSection = Readonly<{
  id: string;
  title: string;
  state: SabiCoreProviderKeyReadinessState;
  readOnly: true;
  runtimeEnabled: false;
  providerCallAllowedNow: false;
  dbWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  rawSecretOutputAllowedNow: false;
  rawPurchaseTokenOutputAllowedNow: false;
  boundaries: readonly string[];
  stillRequired: readonly string[];
}>;

export const sabiCoreProviderKeyReadinessAdminRouteBinding = {
  version: "SABI-CORE-MONETIZATION-102G",
  readOnly: true,
  protectedAdminRoute: true,
  expectedAdminAuthHeader: "x-sabi-admin-token",
  permissionRequired: "admin:read",
  routeMountedByThisStage: true,
  runtimeSmokeExecutedNow: false,
  providerActivationAllowedNow: false,
  providerCallAllowedNow: false,
  databaseWriteAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  rawSecretVisibilityAllowed: false,
  rawPurchaseTokenVisibilityAllowed: false,
  rawCardDataVisibilityAllowed: false,
  rawPromptDataVisibilityAllowed: false,
  rawPrivateUserDataVisibilityAllowed: false,
} as const;

export function buildSabiCoreProviderKeyReadinessSnapshot() {
  const sections: readonly SabiCoreProviderKeyReadinessSection[] = [
    buildGoogleBillingProviderReadiness(),
    buildAirwallexProviderReadiness(),
    buildCreatorEarningsProviderReadiness(),
    buildPaidGamesStakeProviderReadiness(),
    buildAiCoreProviderSafetyReadiness(),
  ];

  return {
    version: "SABI-CORE-MONETIZATION-102G",
    generatedAtUtc: new Date().toISOString(),
    status: "provider_key_readiness_readonly_snapshot_ready",
    readOnly: true,
    routeMountedByThisStage: true,
    routeProtection: {
      expectedHeader: "x-sabi-admin-token",
      alternateHeader: "Authorization: Bearer <token>",
      permissionRequired: "admin:read",
    },
    sections,
    summary: {
      totalSections: sections.length,
      providerRuntimeEnabled: false,
      providerCallsAllowedNow: false,
      databaseWritesAllowedNow: false,
      walletMoneyMovementAllowedNow: false,
      unsafeLiveControlsAllowedNow: false,
    },
    safety: buildSabiCoreProviderKeyReadinessSafety(),
    stillNotEnabled: [
      "Google Billing runtime/provider calls",
      "Airwallex runtime/provider calls",
      "DB entitlement or earnings ledger persistence",
      "Wallet mutation and money movement",
      "creator payout execution",
      "stake/gambling runtime",
      "raw secret or raw purchase token visibility",
    ],
  } as const;
}

export function buildGoogleBillingProviderReadiness(): SabiCoreProviderKeyReadinessSection {
  return {
    id: "google_billing_server_verification",
    title: "Google Billing server verification readiness",
    state: "provider_not_configured",
    readOnly: true,
    runtimeEnabled: false,
    providerCallAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretOutputAllowedNow: false,
    rawPurchaseTokenOutputAllowedNow: false,
    boundaries: [
      "Android digital goods only",
      "raw purchase token storage/logging blocked",
      "redacted purchase evidence and audit hash only",
      "Airwallex blocked for Android digital goods",
    ],
    stillRequired: [
      "real Google Play Billing server config",
      "server-side verification connector approval",
      "DB entitlement ledger schema/migration approval",
      "refund/chargeback/revocation runtime approval",
    ],
  } as const;
}

export function buildAirwallexProviderReadiness(): SabiCoreProviderKeyReadinessSection {
  return {
    id: "airwallex_secret_reference",
    title: "Airwallex server-side secret reference readiness",
    state: "provider_not_configured",
    readOnly: true,
    runtimeEnabled: false,
    providerCallAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretOutputAllowedNow: false,
    rawPurchaseTokenOutputAllowedNow: false,
    boundaries: [
      "server-side env/secret-manager references only",
      "physical merchant/business commerce only",
      "KYB/KYC/AML gateway readiness required",
      "Android digital goods blocked",
    ],
    stillRequired: [
      "real Airwallex account/API config",
      "secret reference approval without raw value output",
      "merchant settlement ledger approval",
      "country/currency/merchant allow-list approval",
    ],
  } as const;
}

export function buildCreatorEarningsProviderReadiness(): SabiCoreProviderKeyReadinessSection {
  return {
    id: "creator_earnings_payout_lock",
    title: "Creator earnings and payout lock readiness",
    state: "locked",
    readOnly: true,
    runtimeEnabled: false,
    providerCallAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretOutputAllowedNow: false,
    rawPurchaseTokenOutputAllowedNow: false,
    boundaries: [
      "creator earnings ledger planned only",
      "payout release forbidden now",
      "refund reserve and compliance hold required",
      "tax/AML/risk review required",
    ],
    stillRequired: [
      "DB ledger schema/migration approval",
      "payout provider readiness approval",
      "owner/admin payout review workflow approval",
      "tax/compliance hold logic approval",
    ],
  } as const;
}

export function buildPaidGamesStakeProviderReadiness(): SabiCoreProviderKeyReadinessSection {
  return {
    id: "paid_games_stake_lock",
    title: "Paid games and stake runtime lock",
    state: "locked",
    readOnly: true,
    runtimeEnabled: false,
    providerCallAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretOutputAllowedNow: false,
    rawPurchaseTokenOutputAllowedNow: false,
    boundaries: [
      "stake/gambling runtime disabled",
      "real money payout forbidden now",
      "country/legal/license gates required",
      "age/KYC/AML/responsible-gaming gates required",
    ],
    stillRequired: [
      "legal/license approval",
      "country allow-list approval",
      "age/KYC/AML enforcement approval",
      "odds/prize evidence approval",
    ],
  } as const;
}

export function buildAiCoreProviderSafetyReadiness(): SabiCoreProviderKeyReadinessSection {
  return {
    id: "ai_core_provider_safety",
    title: "AI core provider safety readiness",
    state: "disabled",
    readOnly: true,
    runtimeEnabled: false,
    providerCallAllowedNow: false,
    dbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretOutputAllowedNow: false,
    rawPurchaseTokenOutputAllowedNow: false,
    boundaries: [
      "provider runtime disabled",
      "prompt/private-data redaction required",
      "moderation and reporting evidence required",
      "raw prompts/private user data blocked from Admin UI/logs/reports",
    ],
    stillRequired: [
      "provider env readiness",
      "admin safety gate approval",
      "redaction audit approval",
      "moderation evidence approval",
    ],
  } as const;
}

export function buildSabiCoreProviderKeyReadinessSafety() {
  return {
    readOnly: true,
    providerActivationPerformed: false,
    providerCallPerformed: false,
    runtimeDbWritePerformed: false,
    prismaMigrateOrGeneratePerformed: false,
    walletMutationPerformed: false,
    moneyMovementPerformed: false,
    creatorPayoutExecutionPerformed: false,
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
  } as const;
}
