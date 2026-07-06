import {
  STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_ADMIN_LOCAL_ROUTE_DRAFT,
  STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_DIMENSIONS,
  STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_PUBLIC_ROUTE_DRAFT,
  STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_STATUS,
  STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_VERSION,
  STREAM_BILLING_LEDGER_EXPECTED_TABLES,
  STREAM_BILLING_LEDGER_RESPONSE_MUST_EXCLUDE,
  type StreamBillingLedgerAdminProviderReadinessSnapshot,
  type StreamBillingLedgerAdminProviderReadinessSnapshotInput,
  type StreamBillingLedgerProviderEnvKeySummary,
} from "./stream-billing-ledger-admin-provider-readiness.contracts";

function stablePreviewHash(value: string): string {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(16).padStart(8, "0").slice(0, 8);
}

function isInterestingProviderReadinessKey(key: string): boolean {
  return /GOOGLE|PLAY|BILLING|PAYMENT|PAYOUT|PROVIDER|AIRWALLEX|STRIPE|ADYEN|PAYME|CLICK|STREAM|LEDGER|MERCHANT|WALLET|FEE|TAX|WITHHOLD|REFUND|CHARGEBACK/i.test(key);
}

function isSecretLikeProviderReadinessKey(key: string): boolean {
  return /SECRET|TOKEN|KEY|PASSWORD|PRIVATE|CREDENTIAL|SERVICE_ACCOUNT|JSON|CERT/i.test(key);
}

export function summarizeStreamBillingLedgerProviderEnv(
  env: Readonly<Record<string, string | undefined>> = {},
): readonly StreamBillingLedgerProviderEnvKeySummary[] {
  return Object.entries(env)
    .filter(([key]) => isInterestingProviderReadinessKey(key))
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => {
      const safeValue = String(value ?? "");

      return {
        key,
        configured: safeValue.length > 0,
        valueLength: safeValue.length,
        valueSha256Prefix: safeValue.length > 0 ? stablePreviewHash(safeValue) : null,
        secretLike: isSecretLikeProviderReadinessKey(key),
        rawValueReturned: false,
      };
    });
}

export function buildStreamBillingLedgerAdminProviderReadinessSnapshot(
  input: StreamBillingLedgerAdminProviderReadinessSnapshotInput = {},
): StreamBillingLedgerAdminProviderReadinessSnapshot {
  const runtimeRouteAuthenticated = input.runtimeRouteAuthenticated === true;
  const runtimeDuplicateRouteBlocked = input.runtimeDuplicateRouteBlocked === true;
  const normalizedSecretScanSafe = input.normalizedSecretScanSafe === true;
  const expectedLedgerTablesVisible = input.expectedLedgerTablesVisible === true;
  const metadataRouteMountedNow =
    typeof input.metadataRouteMountedNow === "boolean" ? input.metadataRouteMountedNow : null;

  return {
    ok: true,
    version: STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_VERSION,
    status: STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_STATUS,
    generatedAtUtc: input.generatedAtUtc ?? new Date(0).toISOString(),
    planningOnly: true,
    sourceOnly: true,
    routeMountedNow: false,
    routeMountAllowedNow: false,
    backendRestartAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    databaseWriteAllowedNow: false,
    adminUiTouchAllowedNow: false,
    mobileTouchAllowedNow: false,
    liveBillingEnabledNow: false,
    fakeSuccessAllowed: false,
    rawSecretReturnAllowed: false,
    rawPurchaseTokenReturnAllowed: false,
    adminLocalRouteDraft: STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_ADMIN_LOCAL_ROUTE_DRAFT,
    publicRouteDraft: STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_PUBLIC_ROUTE_DRAFT,
    dimensions: STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_DIMENSIONS,
    expectedLedgerTables: STREAM_BILLING_LEDGER_EXPECTED_TABLES,
    providerEnvSummary: summarizeStreamBillingLedgerProviderEnv(input.env),
    runtimeSignals: {
      runtimeRouteAuthenticated,
      runtimeDuplicateRouteBlocked,
      normalizedSecretScanSafe,
      expectedLedgerTablesVisible,
      metadataRouteMountedNow,
      metadataNormalizationRequired: metadataRouteMountedNow === false && runtimeRouteAuthenticated,
    },
    nextRequiredStages: [
      "source-only protected Admin/provider readiness route draft",
      "protected route mount approval package",
      "backend restart and authenticated smoke approval package",
      "Admin UI readiness card source planning",
      "Google Play Billing provider verification adapter planning",
      "owner-approved provider binding only after secret redaction and compliance gates",
    ],
    responseMustExclude: STREAM_BILLING_LEDGER_RESPONSE_MUST_EXCLUDE,
  };
}

export function getStreamBillingLedgerAdminProviderReadinessSafeDisabledReason(
  snapshot: StreamBillingLedgerAdminProviderReadinessSnapshot,
): string {
  if (!snapshot.runtimeSignals.runtimeRouteAuthenticated) {
    return "runtime_route_not_authenticated";
  }

  if (!snapshot.runtimeSignals.runtimeDuplicateRouteBlocked) {
    return "duplicate_route_not_blocked";
  }

  if (!snapshot.runtimeSignals.normalizedSecretScanSafe) {
    return "normalized_secret_scan_not_safe";
  }

  if (!snapshot.runtimeSignals.expectedLedgerTablesVisible) {
    return "expected_ledger_tables_not_visible";
  }

  return "provider_readiness_route_not_mounted_and_live_billing_disabled";
}

export function assertStreamBillingLedgerAdminProviderReadinessHasNoLiveActivation(
  snapshot: StreamBillingLedgerAdminProviderReadinessSnapshot,
): true {
  const unsafe =
    snapshot.routeMountedNow ||
    snapshot.routeMountAllowedNow ||
    snapshot.backendRestartAllowedNow ||
    snapshot.providerCallAllowedNow ||
    snapshot.walletMutationAllowedNow ||
    snapshot.moneyMovementAllowedNow ||
    snapshot.databaseWriteAllowedNow ||
    snapshot.adminUiTouchAllowedNow ||
    snapshot.mobileTouchAllowedNow ||
    snapshot.liveBillingEnabledNow ||
    snapshot.fakeSuccessAllowed ||
    snapshot.rawSecretReturnAllowed ||
    snapshot.rawPurchaseTokenReturnAllowed;

  if (unsafe) {
    throw new Error("stream_billing_ledger_admin_provider_readiness_live_activation_not_allowed");
  }

  return true;
}
