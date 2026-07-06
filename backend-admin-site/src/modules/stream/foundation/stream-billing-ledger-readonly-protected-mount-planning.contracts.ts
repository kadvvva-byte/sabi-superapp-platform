export const STREAM_BILLING_LEDGER_READONLY_PROTECTED_MOUNT_PLANNING_VERSION = "BACKEND-STREAM-FOUNDATION-142E" as const;

export type StreamBillingLedgerReadOnlyProtectedMountPlanningStatus =
  | "protected_mount_planning_ready"
  | "blocked"
  | "review_required";

export type StreamBillingLedgerReadOnlyProtectedMountPlan = Readonly<{
  version: typeof STREAM_BILLING_LEDGER_READONLY_PROTECTED_MOUNT_PLANNING_VERSION;
  status: StreamBillingLedgerReadOnlyProtectedMountPlanningStatus;
  sourceOnly: true;
  routeSourceVerified: true;
  routeMountedNow: false;
  routeMountAllowedNow: false;
  futureRouteMountRequiresSeparateApproval: true;
  preferredTargetFile: "src/modules/admin/admin.routes.ts";
  routeFactoryName: "createStreamBillingLedgerReadOnlyRouteSourceDraft";
  routeFactoryImportPath: "../stream/foundation/stream-billing-ledger-readonly.route";
  plannedPath: "/api/admin/stream/billing-ledger/read-only-snapshot";
  httpMethod: "GET";
  protectionRequired: true;
  adminOnly: true;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  databaseWriteAllowedNow: false;
  fakeSuccessAllowed: false;
  adminUiTouchAllowedNow: false;
  mobileTouchAllowedNow: false;
  responseMustExclude: readonly string[];
  exactNextApprovalPhrase: string;
}>;

export const STREAM_BILLING_LEDGER_READONLY_PROTECTED_MOUNT_PLAN: StreamBillingLedgerReadOnlyProtectedMountPlan = {
  version: STREAM_BILLING_LEDGER_READONLY_PROTECTED_MOUNT_PLANNING_VERSION,
  status: "protected_mount_planning_ready",
  sourceOnly: true,
  routeSourceVerified: true,
  routeMountedNow: false,
  routeMountAllowedNow: false,
  futureRouteMountRequiresSeparateApproval: true,
  preferredTargetFile: "src/modules/admin/admin.routes.ts",
  routeFactoryName: "createStreamBillingLedgerReadOnlyRouteSourceDraft",
  routeFactoryImportPath: "../stream/foundation/stream-billing-ledger-readonly.route",
  plannedPath: "/api/admin/stream/billing-ledger/read-only-snapshot",
  httpMethod: "GET",
  protectionRequired: true,
  adminOnly: true,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  databaseWriteAllowedNow: false,
  fakeSuccessAllowed: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
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
  exactNextApprovalPhrase:
    "I approve BACKEND-STREAM-FOUNDATION-142F protected read-only route mount source patch approval package only, no route mount execution yet, no provider call, no Wallet mutation, no money movement, no Admin UI touch, no mobile touch.",
};

export function getStreamBillingLedgerReadOnlyProtectedMountPlan(): StreamBillingLedgerReadOnlyProtectedMountPlan {
  return STREAM_BILLING_LEDGER_READONLY_PROTECTED_MOUNT_PLAN;
}
