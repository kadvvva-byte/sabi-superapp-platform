export const STREAM_BILLING_LEDGER_READONLY_SERVICE_PLANNING_VERSION = "BACKEND-STREAM-FOUNDATION-142A" as const;

export type StreamBillingLedgerReadOnlyServicePlanningStatus =
  | "readonly_service_planning_ready"
  | "blocked"
  | "review_required";

export type StreamBillingLedgerReadOnlyServicePlanningPackage = Readonly<{
  version: typeof STREAM_BILLING_LEDGER_READONLY_SERVICE_PLANNING_VERSION;
  status: StreamBillingLedgerReadOnlyServicePlanningStatus;
  sourceOnly: true;
  routeMountAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  adminUiTouchAllowedNow: false;
  mobileTouchAllowedNow: false;
  fakeSuccessAllowed: false;
  readOnlyServiceScope: readonly string[];
  plannedTables: readonly string[];
  allowedReadOnlyOperations: readonly string[];
  forbiddenOperations: readonly string[];
  exactNextApprovalPhrase: string;
}>;

export const STREAM_BILLING_LEDGER_READONLY_SERVICE_PLANNING_PACKAGE: StreamBillingLedgerReadOnlyServicePlanningPackage = {
  version: STREAM_BILLING_LEDGER_READONLY_SERVICE_PLANNING_VERSION,
  status: "readonly_service_planning_ready",
  sourceOnly: true,
  routeMountAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  fakeSuccessAllowed: false,
  readOnlyServiceScope: [
    "read migration/table/provider gate readiness snapshots",
    "read ledger summary counts only",
    "read purchase intent/classification status summaries only",
    "read Google verification status summaries without raw purchase token values",
    "read creator earning and merchant settlement status summaries without payout execution",
    "read safe audit flag rawSecretValuesReturned as boolean only",
  ],
  plannedTables: [
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
  ],
  allowedReadOnlyOperations: [
    "findMany",
    "findFirst",
    "count",
    "groupBy",
    "aggregate",
    "safe SELECT-only diagnostics",
  ],
  forbiddenOperations: [
    "create",
    "createMany",
    "update",
    "updateMany",
    "upsert",
    "delete",
    "deleteMany",
    "raw SQL mutation",
    "provider call",
    "Wallet mutation",
    "money movement",
    "route mount",
    "fake success",
    "raw purchase token return",
    "raw secret return",
  ],
  exactNextApprovalPhrase:
    "I approve BACKEND-STREAM-FOUNDATION-142B read-only service contract implementation only, no route mount, no provider call, no Wallet mutation, no money movement, no Admin UI touch, no mobile touch.",
};

export function getStreamBillingLedgerReadOnlyServicePlanningPackage(): StreamBillingLedgerReadOnlyServicePlanningPackage {
  return STREAM_BILLING_LEDGER_READONLY_SERVICE_PLANNING_PACKAGE;
}
