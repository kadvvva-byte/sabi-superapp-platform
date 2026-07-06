export const STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_VERSION =
  "BACKEND-STREAM-FOUNDATION-143E" as const;

export const STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_STATUS =
  "source_only_readonly_service_draft" as const;

export const STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_ADMIN_LOCAL_ROUTE_DRAFT =
  "/stream/billing-ledger/admin-provider-readiness" as const;

export const STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_PUBLIC_ROUTE_DRAFT =
  "/api/admin/stream/billing-ledger/admin-provider-readiness" as const;

export type StreamBillingLedgerProviderReadinessState =
  | "ready"
  | "configured_but_disabled"
  | "missing_provider_config"
  | "planning_required"
  | "not_implemented_yet"
  | "safe_disabled"
  | "review_required";

export type StreamBillingLedgerAdminProviderReadinessDimensionKey =
  | "google_play_billing_server_verification"
  | "digital_purchase_boundary_classifier"
  | "append_only_ledger_readiness"
  | "admin_provider_readiness_snapshot"
  | "creator_payout_monthly_withdrawal"
  | "admin_ui_readiness"
  | "wallet_bridge_boundary"
  | "provider_secret_redaction"
  | "refund_chargeback_reserve"
  | "compliance_tax_withholding";

export type StreamBillingLedgerProviderEnvKeySummary = Readonly<{
  key: string;
  configured: boolean;
  valueLength: number;
  valueSha256Prefix: string | null;
  secretLike: boolean;
  rawValueReturned: false;
}>;

export type StreamBillingLedgerAdminProviderReadinessDimension = Readonly<{
  key: StreamBillingLedgerAdminProviderReadinessDimensionKey;
  title: string;
  state: StreamBillingLedgerProviderReadinessState;
  liveAllowed: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  databaseWriteAllowedNow: false;
  sourceWriteAllowedNow: false;
  adminUiTouchAllowedNow: false;
  mobileTouchAllowedNow: false;
  requiredBeforeLive: readonly string[];
  blockers: readonly string[];
  notes: readonly string[];
}>;

export type StreamBillingLedgerAdminProviderReadinessSnapshotInput = Readonly<{
  generatedAtUtc?: string;
  env?: Readonly<Record<string, string | undefined>>;
  runtimeRouteAuthenticated?: boolean;
  runtimeDuplicateRouteBlocked?: boolean;
  normalizedSecretScanSafe?: boolean;
  expectedLedgerTablesVisible?: boolean;
  metadataRouteMountedNow?: boolean | null;
}>;

export type StreamBillingLedgerAdminProviderReadinessSnapshot = Readonly<{
  ok: true;
  version: typeof STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_VERSION;
  status: typeof STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_STATUS;
  generatedAtUtc: string;
  planningOnly: true;
  sourceOnly: true;
  routeMountedNow: false;
  routeMountAllowedNow: false;
  backendRestartAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  databaseWriteAllowedNow: false;
  adminUiTouchAllowedNow: false;
  mobileTouchAllowedNow: false;
  liveBillingEnabledNow: false;
  fakeSuccessAllowed: false;
  rawSecretReturnAllowed: false;
  rawPurchaseTokenReturnAllowed: false;
  adminLocalRouteDraft: typeof STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_ADMIN_LOCAL_ROUTE_DRAFT;
  publicRouteDraft: typeof STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_PUBLIC_ROUTE_DRAFT;
  dimensions: readonly StreamBillingLedgerAdminProviderReadinessDimension[];
  expectedLedgerTables: readonly string[];
  providerEnvSummary: readonly StreamBillingLedgerProviderEnvKeySummary[];
  runtimeSignals: Readonly<{
    runtimeRouteAuthenticated: boolean;
    runtimeDuplicateRouteBlocked: boolean;
    normalizedSecretScanSafe: boolean;
    expectedLedgerTablesVisible: boolean;
    metadataRouteMountedNow: boolean | null;
    metadataNormalizationRequired: boolean;
  }>;
  nextRequiredStages: readonly string[];
  responseMustExclude: readonly string[];
}>;

export const STREAM_BILLING_LEDGER_EXPECTED_TABLES: readonly string[] = [
  "StreamPurchaseIntent",
  "StreamPurchaseClassification",
  "StreamGooglePurchaseVerification",
  "StreamAppendOnlyLedgerEntry",
  "StreamLedgerHold",
  "StreamCreatorEarningState",
  "StreamMerchantSettlementState",
  "StreamRefundVoidAdjustment",
  "StreamIdempotencyKey",
  "StreamProviderGateSnapshot",
] as const;

export const STREAM_BILLING_LEDGER_RESPONSE_MUST_EXCLUDE: readonly string[] = [
  "rawPurchaseToken",
  "purchaseToken",
  "providerSecret",
  "clientSecret",
  "privateKey",
  "accessToken",
  "refreshToken",
  "DATABASE_URL",
  "raw env value",
  "Wallet mutation result",
  "provider call result",
  "money movement result",
] as const;

export const STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_DIMENSIONS: readonly StreamBillingLedgerAdminProviderReadinessDimension[] = [
  {
    key: "google_play_billing_server_verification",
    title: "Google Play Billing server verification",
    state: "planning_required",
    liveAllowed: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    databaseWriteAllowedNow: false,
    sourceWriteAllowedNow: false,
    adminUiTouchAllowedNow: false,
    mobileTouchAllowedNow: false,
    requiredBeforeLive: [
      "server-side Google Play purchase token verification adapter",
      "service account configuration stored server-side only",
      "package name and product catalog binding",
      "idempotent verification result handling",
      "no raw purchase token in Admin or runtime responses",
    ],
    blockers: [
      "provider adapter not implemented",
      "Google service account readiness not verified here",
      "live billing activation not owner-approved",
    ],
    notes: [
      "Android digital goods must use Google Play Billing where required.",
      "This draft does not call Google or any external provider.",
    ],
  },
  {
    key: "digital_purchase_boundary_classifier",
    title: "Digital purchase boundary classifier",
    state: "planning_required",
    liveAllowed: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    databaseWriteAllowedNow: false,
    sourceWriteAllowedNow: false,
    adminUiTouchAllowedNow: false,
    mobileTouchAllowedNow: false,
    requiredBeforeLive: [
      "separate Android digital goods from physical commerce",
      "block Wallet physical-commerce balance from buying Android digital entitlements",
      "separate purchased digital coin, bonus coin, creator earning pending/payable, merchant settlement pending/payable",
    ],
    blockers: [
      "classification route/service not live",
      "Google Billing verification not live",
    ],
    notes: [
      "Physical goods and real-world commerce can stay outside Google Play Billing where policy allows.",
    ],
  },
  {
    key: "append_only_ledger_readiness",
    title: "Append-only billing ledger readiness",
    state: "safe_disabled",
    liveAllowed: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    databaseWriteAllowedNow: false,
    sourceWriteAllowedNow: false,
    adminUiTouchAllowedNow: false,
    mobileTouchAllowedNow: false,
    requiredBeforeLive: [
      "append-only ledger entries only after verified provider result",
      "idempotency keys for purchase/provider callbacks",
      "refund and void adjustments as compensation entries",
      "no update/delete money mutation path without audit compensation",
    ],
    blockers: [
      "live ledger write route not approved",
      "provider verification not implemented",
    ],
    notes: [
      "Current stage is read-only planning and does not write ledger rows.",
    ],
  },
  {
    key: "admin_provider_readiness_snapshot",
    title: "Admin provider readiness snapshot",
    state: "not_implemented_yet",
    liveAllowed: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    databaseWriteAllowedNow: false,
    sourceWriteAllowedNow: false,
    adminUiTouchAllowedNow: false,
    mobileTouchAllowedNow: false,
    requiredBeforeLive: [
      "Admin read-only route showing provider configured or missing status",
      "provider gate status for Google Play, payout provider, Wallet bridge",
      "safe-disabled reason when provider keys are absent",
      "secret redaction and no mobile secret exposure",
    ],
    blockers: [
      "Admin provider readiness route not drafted",
      "Admin UI not touched yet",
    ],
    notes: [
      "This source-only draft provides service contracts for a later protected route.",
    ],
  },
  {
    key: "creator_payout_monthly_withdrawal",
    title: "Creator payout and monthly withdrawal readiness",
    state: "planning_required",
    liveAllowed: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    databaseWriteAllowedNow: false,
    sourceWriteAllowedNow: false,
    adminUiTouchAllowedNow: false,
    mobileTouchAllowedNow: false,
    requiredBeforeLive: [
      "monthly payout cycle",
      "tax and withholding state",
      "compliance hold state",
      "refund and chargeback reserve window",
      "payable balance only after provider settlement checks",
    ],
    blockers: [
      "payout provider not verified",
      "tax/compliance workflow not implemented",
      "owner approval not granted for money movement",
    ],
    notes: [
      "No payout or withdrawal execution is allowed in this stage.",
    ],
  },
  {
    key: "admin_ui_readiness",
    title: "Admin UI readiness",
    state: "not_implemented_yet",
    liveAllowed: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    databaseWriteAllowedNow: false,
    sourceWriteAllowedNow: false,
    adminUiTouchAllowedNow: false,
    mobileTouchAllowedNow: false,
    requiredBeforeLive: [
      "Admin UI card for billing ledger safety",
      "provider readiness safe-disabled states",
      "no provider secret display",
      "no live activation button until provider keys and owner approval",
    ],
    blockers: [
      "Admin UI not approved for this stage",
    ],
    notes: [
      "Admin UI remains untouched here.",
    ],
  },
  {
    key: "wallet_bridge_boundary",
    title: "Wallet bridge boundary",
    state: "planning_required",
    liveAllowed: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    databaseWriteAllowedNow: false,
    sourceWriteAllowedNow: false,
    adminUiTouchAllowedNow: false,
    mobileTouchAllowedNow: false,
    requiredBeforeLive: [
      "no Wallet mutation until verified billing and ledger idempotency are complete",
      "digital entitlement must not be purchased from physical-commerce wallet balance on Android where Google policy requires billing",
      "Wallet bridge must use explicit safe-disabled gate until provider readiness is complete",
    ],
    blockers: [
      "Wallet bridge not live-approved",
      "money movement not owner-approved",
    ],
    notes: [
      "This stage does not mutate Wallet state.",
    ],
  },
  {
    key: "provider_secret_redaction",
    title: "Provider secret redaction",
    state: "safe_disabled",
    liveAllowed: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    databaseWriteAllowedNow: false,
    sourceWriteAllowedNow: false,
    adminUiTouchAllowedNow: false,
    mobileTouchAllowedNow: false,
    requiredBeforeLive: [
      "never return raw provider secrets",
      "return only key presence, length and hash prefix",
      "keep provider keys server-side only",
      "prevent mobile secret exposure",
    ],
    blockers: [
      "provider readiness route not yet implemented",
    ],
    notes: [
      "This draft exposes redacted metadata only.",
    ],
  },
  {
    key: "refund_chargeback_reserve",
    title: "Refund and chargeback reserve",
    state: "planning_required",
    liveAllowed: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    databaseWriteAllowedNow: false,
    sourceWriteAllowedNow: false,
    adminUiTouchAllowedNow: false,
    mobileTouchAllowedNow: false,
    requiredBeforeLive: [
      "refund/void adjustment contracts",
      "chargeback reserve window",
      "ledger compensation entries",
      "creator/merchant payable hold adjustment",
    ],
    blockers: [
      "provider dispute callbacks not implemented",
      "ledger compensation write not approved",
    ],
    notes: [
      "No refund or chargeback money movement is allowed in this stage.",
    ],
  },
  {
    key: "compliance_tax_withholding",
    title: "Compliance, tax and withholding",
    state: "planning_required",
    liveAllowed: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    databaseWriteAllowedNow: false,
    sourceWriteAllowedNow: false,
    adminUiTouchAllowedNow: false,
    mobileTouchAllowedNow: false,
    requiredBeforeLive: [
      "KYC/KYB and eligibility status before payout",
      "tax and withholding fields",
      "compliance hold reason",
      "Admin review path before releasing payable balance",
    ],
    blockers: [
      "compliance workflow not connected",
      "payout provider not verified",
    ],
    notes: [
      "Compliance states are planned only here.",
    ],
  },
] as const;
