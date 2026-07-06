export type SabiCoreMonetization102EProviderVisibilityStatus =
  | "ready_for_readonly_visibility"
  | "runtime_not_enabled"
  | "provider_not_configured"
  | "locked_until_separate_approval";

export type SabiCoreMonetization102EProviderKeyReadinessSection = Readonly<{
  id: string;
  title: string;
  status: SabiCoreMonetization102EProviderVisibilityStatus;
  visibleInAdminReadOnly: true;
  allowedVisibilitySignals: readonly string[];
  blockedRuntimeActions: readonly string[];
  requiredBeforeRuntime: readonly string[];
}>;

export const SABI_CORE_MONETIZATION_102E_PROVIDER_KEY_READINESS_ADMIN_VISIBILITY_DESIGN = {
  version: "SABI-CORE-MONETIZATION-102E",
  mode: "provider_key_readiness_admin_visibility_design_source_only",
  sourceOnly: true,
  readOnlyAdminVisibilityOnly: true,
  adminUiRuntimeBindingAllowedNow: false,
  backendRouteMountAllowedNow: false,
  providerActivationAllowedNow: false,
  providerCallAllowedNow: false,
  databaseWriteAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  mobileUiAllowedNow: false,
  expectedAdminAuthHeaderForFutureReadOnlyRoutes: "x-sabi-admin-token",
  visibilitySections: [
    {
      id: "google_billing_server_verification",
      title: "Google Billing server verification readiness",
      status: "runtime_not_enabled",
      visibleInAdminReadOnly: true,
      allowedVisibilitySignals: [
        "provider configured status as redacted boolean only",
        "Android digital goods boundary",
        "server verification connector readiness",
        "raw purchase token redaction readiness",
        "entitlement ledger blocker status",
        "refund chargeback revocation blocker status",
      ],
      blockedRuntimeActions: [
        "enable Google Billing runtime",
        "call Google provider API",
        "store raw purchase token",
        "write entitlement ledger",
        "grant paid entitlement",
        "move money through Wallet",
      ],
      requiredBeforeRuntime: [
        "real Google Billing config",
        "server-side purchase verification connector approval",
        "DB entitlement ledger schema approval",
        "raw token redaction audit",
        "Play review evidence approval",
      ],
    },
    {
      id: "airwallex_secret_reference",
      title: "Airwallex server-side secret reference readiness",
      status: "runtime_not_enabled",
      visibleInAdminReadOnly: true,
      allowedVisibilitySignals: [
        "redacted configured status only",
        "physical merchant commerce boundary",
        "business merchant settlement readiness blocker status",
        "KYB KYC AML blocker status",
        "country currency merchant allow-list blocker status",
        "provider error redaction readiness",
      ],
      blockedRuntimeActions: [
        "enable Airwallex runtime",
        "call Airwallex provider API",
        "return raw secret value",
        "use Airwallex for Android digital goods",
        "write settlement ledger",
        "move money through Wallet",
      ],
      requiredBeforeRuntime: [
        "real Airwallex account/API config",
        "secret storage/environment reference approval",
        "KYB KYC AML gateway approval",
        "merchant settlement ledger approval",
        "country currency merchant allow-list approval",
      ],
    },
    {
      id: "creator_earnings_payout_lock",
      title: "Creator earnings ledger and payout lock readiness",
      status: "locked_until_separate_approval",
      visibleInAdminReadOnly: true,
      allowedVisibilitySignals: [
        "earnings ledger schema blocker status",
        "pending compliance hold refund reserve payable reversed bucket design",
        "payout provider readiness blocker status",
        "tax AML risk review blocker status",
        "creator payout execution locked status",
      ],
      blockedRuntimeActions: [
        "execute creator payout",
        "write creator earnings ledger",
        "release compliance hold",
        "move money through Wallet",
        "call payout provider",
      ],
      requiredBeforeRuntime: [
        "earnings ledger DB approval",
        "payout provider readiness approval",
        "tax compliance approval",
        "AML risk review workflow approval",
        "owner payout approval gate",
      ],
    },
    {
      id: "paid_games_stake_lock",
      title: "Paid games and stake lock readiness",
      status: "locked_until_separate_approval",
      visibleInAdminReadOnly: true,
      allowedVisibilitySignals: [
        "legal license blocker status",
        "country allow-list blocker status",
        "age KYC AML blocker status",
        "responsible gaming blocker status",
        "odds prize evidence blocker status",
      ],
      blockedRuntimeActions: [
        "enable stake runtime",
        "enable gambling runtime",
        "execute stake payout",
        "use creator payout rails for gambling payout",
        "move stake money through Wallet",
      ],
      requiredBeforeRuntime: [
        "legal license approval",
        "country allow-list approval",
        "age KYC AML enforcement approval",
        "responsible gaming controls approval",
        "odds prize evidence approval",
      ],
    },
    {
      id: "ai_core_provider_safety",
      title: "AI provider runtime and safety gate readiness",
      status: "provider_not_configured",
      visibleInAdminReadOnly: true,
      allowedVisibilitySignals: [
        "provider configured status as redacted boolean only",
        "prompt private-data redaction readiness",
        "moderation reporting blocker status",
        "AI safety gate blocker status",
        "provider routing disabled status",
      ],
      blockedRuntimeActions: [
        "enable AI provider runtime",
        "log raw prompt private data",
        "return raw provider secrets",
        "bypass moderation/reporting gates",
      ],
      requiredBeforeRuntime: [
        "provider env readiness",
        "prompt/private-data redaction audit",
        "moderation and report evidence approval",
        "Admin safety gate approval",
      ],
    },
  ] satisfies readonly SabiCoreMonetization102EProviderKeyReadinessSection[],
  adminVisibilityContract: {
    targetSurface: "Sabi Core Control Center",
    futurePanel: "Provider-key readiness visibility",
    visibilityOnly: true,
    readOnlyFetchOnly: true,
    unsafeLiveControlsAllowed: false,
    rawSecretsReturned: false,
    rawPurchaseTokensReturned: false,
    rawCardDataReturned: false,
    rawPromptDataReturned: false,
    rawUserPrivateDataReturned: false,
    allowedReadOnlyWidgets: [
      "redacted provider configured status",
      "provider boundary status",
      "runtime disabled status",
      "required blocker checklist",
      "Play review evidence readiness",
      "compliance and ledger blockers",
    ],
    forbiddenWidgetsNow: [
      "enable provider button",
      "run provider test button",
      "enter raw secret field",
      "show raw purchase token",
      "approve payout button",
      "release money button",
      "stake payout control",
      "Google Billing live verify control",
      "Airwallex live settlement control",
    ],
  },
  redactionPolicy: {
    rawSecretsAllowedInSource: false,
    rawSecretsAllowedInAdminUi: false,
    rawSecretsAllowedInMobileUi: false,
    rawSecretsAllowedInLogs: false,
    rawSecretsAllowedInReports: false,
    rawPurchaseTokensAllowedInSource: false,
    rawPurchaseTokensAllowedInAdminUi: false,
    rawPurchaseTokensAllowedInLogs: false,
    rawPurchaseTokensAllowedInReports: false,
    redactedConfiguredStatusOnly: true,
    auditHashAllowed: true,
  },
  safety: {
    providerActivationAllowedNow: false,
    providerCallAllowedNow: false,
    googleBillingRuntimeAllowedNow: false,
    airwallexRuntimeAllowedNow: false,
    runtimeDbWriteAllowedNow: false,
    prismaMigrateOrGenerateAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    creatorPayoutExecutionAllowedNow: false,
    stakeRuntimeAllowedNow: false,
    gamblingRuntimeAllowedNow: false,
    mobileUiAllowedNow: false,
  },
} as const;

export type SabiCoreMonetization102EProviderKeyReadinessAdminVisibilityDesign =
  typeof SABI_CORE_MONETIZATION_102E_PROVIDER_KEY_READINESS_ADMIN_VISIBILITY_DESIGN;
