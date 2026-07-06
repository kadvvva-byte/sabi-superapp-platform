export const STREAM_BILLING_LEDGER_READONLY_ROUTE_PLANNING_VERSION = "BACKEND-STREAM-FOUNDATION-142C-FIX2" as const;

export type StreamBillingLedgerReadOnlyRoutePlanningStatus =
  | "readonly_route_planning_ready"
  | "blocked"
  | "review_required";

export type StreamBillingLedgerReadOnlyRoutePlan = Readonly<{
  version: typeof STREAM_BILLING_LEDGER_READONLY_ROUTE_PLANNING_VERSION;
  status: StreamBillingLedgerReadOnlyRoutePlanningStatus;
  sourceOnly: true;
  routeMountedNow: false;
  routeMountAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  adminUiTouchAllowedNow: false;
  mobileTouchAllowedNow: false;
  fakeSuccessAllowed: false;
  httpMethodPlanned: "GET";
  plannedPath: "/api/admin/stream/billing-ledger/read-only-snapshot";
  authRequired: true;
  adminOnly: true;
  readOnlyServiceFunction: "getStreamBillingLedgerReadOnlySnapshot";
  responseMustExclude: readonly string[];
  responseMayInclude: readonly string[];
  scannerSeparation: Readonly<{
    serviceRuntimeImplementationScannedStrictly: true;
    contractsAndPlansScannedAsDeclarativeBoundaries: true;
    runtimeMutationMarkersStillBlocked: true;
    falsePositiveFixedFrom142CAndFix1: true;
  }>;
  exactNextApprovalPhrase: string;
}>;

export const STREAM_BILLING_LEDGER_READONLY_ROUTE_PLAN: StreamBillingLedgerReadOnlyRoutePlan = {
  version: STREAM_BILLING_LEDGER_READONLY_ROUTE_PLANNING_VERSION,
  status: "readonly_route_planning_ready",
  sourceOnly: true,
  routeMountedNow: false,
  routeMountAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  fakeSuccessAllowed: false,
  httpMethodPlanned: "GET",
  plannedPath: "/api/admin/stream/billing-ledger/read-only-snapshot",
  authRequired: true,
  adminOnly: true,
  readOnlyServiceFunction: "getStreamBillingLedgerReadOnlySnapshot",
  responseMustExclude: [
    "rawPurchaseToken",
    "purchaseToken",
    "providerSecret",
    "clientSecret",
    "privateKey",
    "accessToken",
    "refreshToken",
    "Wallet mutation result",
    "provider call result",
    "money movement result",
  ],
  responseMayInclude: [
    "read-only table counts",
    "safe status summaries",
    "token hash presence only",
    "provider gate boolean audit flags",
    "migration readiness summary",
  ],
  scannerSeparation: {
    serviceRuntimeImplementationScannedStrictly: true,
    contractsAndPlansScannedAsDeclarativeBoundaries: true,
    runtimeMutationMarkersStillBlocked: true,
    falsePositiveFixedFrom142CAndFix1: true,
  },
  exactNextApprovalPhrase:
    "I approve BACKEND-STREAM-FOUNDATION-142D read-only route source draft no-mount implementation only, no route mount, no provider call, no Wallet mutation, no money movement, no Admin UI touch, no mobile touch.",
};

export function getStreamBillingLedgerReadOnlyRoutePlan(): StreamBillingLedgerReadOnlyRoutePlan {
  return STREAM_BILLING_LEDGER_READONLY_ROUTE_PLAN;
}
