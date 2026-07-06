export const STREAM_BILLING_LEDGER_READONLY_MOUNT_APPROVAL_PACKAGE_VERSION = "BACKEND-STREAM-FOUNDATION-142F" as const;

export type StreamBillingLedgerReadOnlyMountApprovalPackage = Readonly<{
  version: typeof STREAM_BILLING_LEDGER_READONLY_MOUNT_APPROVAL_PACKAGE_VERSION;
  sourceOnly: true;
  approvalPackageOnly: true;
  routeMountExecutionAllowedNow: false;
  routeMountPerformedNow: false;
  futureMountRequiresSeparateApproval: true;
  targetFile: "src/modules/admin/admin.routes.ts";
  routeFactoryName: "createStreamBillingLedgerReadOnlyRouteSourceDraft";
  routeFactoryImportPath: "../stream/foundation/stream-billing-ledger-readonly.route";
  plannedPath: "/api/admin/stream/billing-ledger/read-only-snapshot";
  plannedMountProtection: "existing-admin-auth-chain";
  plannedHttpMethod: "GET";
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  databaseWriteAllowedNow: false;
  backendRestartAllowedNow: false;
  adminUiTouchAllowedNow: false;
  mobileTouchAllowedNow: false;
  rawPurchaseTokenReturnAllowed: false;
  rawSecretReturnAllowed: false;
  exactNextApprovalPhrase: string;
}>;

export const STREAM_BILLING_LEDGER_READONLY_MOUNT_APPROVAL_PACKAGE: StreamBillingLedgerReadOnlyMountApprovalPackage = {
  version: STREAM_BILLING_LEDGER_READONLY_MOUNT_APPROVAL_PACKAGE_VERSION,
  sourceOnly: true,
  approvalPackageOnly: true,
  routeMountExecutionAllowedNow: false,
  routeMountPerformedNow: false,
  futureMountRequiresSeparateApproval: true,
  targetFile: "src/modules/admin/admin.routes.ts",
  routeFactoryName: "createStreamBillingLedgerReadOnlyRouteSourceDraft",
  routeFactoryImportPath: "../stream/foundation/stream-billing-ledger-readonly.route",
  plannedPath: "/api/admin/stream/billing-ledger/read-only-snapshot",
  plannedMountProtection: "existing-admin-auth-chain",
  plannedHttpMethod: "GET",
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  databaseWriteAllowedNow: false,
  backendRestartAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  rawPurchaseTokenReturnAllowed: false,
  rawSecretReturnAllowed: false,
  exactNextApprovalPhrase:
    "I approve BACKEND-STREAM-FOUNDATION-142G controlled protected read-only route mount source patch execution only, source patch to admin.routes.ts allowed, no backend restart, no provider call, no Wallet mutation, no money movement, no Admin UI touch, no mobile touch.",
};

export function getStreamBillingLedgerReadOnlyMountApprovalPackage(): StreamBillingLedgerReadOnlyMountApprovalPackage {
  return STREAM_BILLING_LEDGER_READONLY_MOUNT_APPROVAL_PACKAGE;
}
