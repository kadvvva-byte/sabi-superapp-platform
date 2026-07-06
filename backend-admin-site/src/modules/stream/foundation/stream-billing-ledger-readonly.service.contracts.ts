export const STREAM_BILLING_LEDGER_READONLY_SERVICE_VERSION = "BACKEND-STREAM-FOUNDATION-142B" as const;

export type StreamBillingLedgerTableName =
  | "StreamPurchaseIntent"
  | "StreamPurchaseClassification"
  | "StreamGooglePurchaseVerification"
  | "StreamAppendOnlyLedgerEntry"
  | "StreamLedgerHold"
  | "StreamCreatorEarningState"
  | "StreamMerchantSettlementState"
  | "StreamRefundVoidAdjustment"
  | "StreamIdempotencyKey"
  | "StreamProviderGateSnapshot";

export type StreamBillingLedgerDelegateName =
  | "streamPurchaseIntent"
  | "streamPurchaseClassification"
  | "streamGooglePurchaseVerification"
  | "streamAppendOnlyLedgerEntry"
  | "streamLedgerHold"
  | "streamCreatorEarningState"
  | "streamMerchantSettlementState"
  | "streamRefundVoidAdjustment"
  | "streamIdempotencyKey"
  | "streamProviderGateSnapshot";

export type StreamBillingLedgerReadOnlyTableBinding = Readonly<{
  tableName: StreamBillingLedgerTableName;
  delegateName: StreamBillingLedgerDelegateName;
  purpose: string;
}>;

export type StreamBillingLedgerReadOnlyCount = Readonly<{
  tableName: StreamBillingLedgerTableName;
  delegateName: StreamBillingLedgerDelegateName;
  count: number;
}>;

export type StreamBillingLedgerReadOnlySafetyBoundary = Readonly<{
  version: typeof STREAM_BILLING_LEDGER_READONLY_SERVICE_VERSION;
  readOnly: true;
  routeMountAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  rawPurchaseTokenReturnAllowed: false;
  rawSecretReturnAllowed: false;
  allowedOperations: readonly ["count", "findMany", "findFirst", "groupBy", "aggregate"];
  forbiddenOperations: readonly [
    "create",
    "createMany",
    "update",
    "updateMany",
    "upsert",
    "delete",
    "deleteMany",
    "rawSqlMutation",
    "providerCall",
    "walletMutation",
    "moneyMovement",
    "routeMount",
    "fakeSuccess",
    "rawPurchaseTokenReturn",
    "rawSecretReturn"
  ];
}>;

export type StreamBillingLedgerReadOnlySnapshot = Readonly<{
  version: typeof STREAM_BILLING_LEDGER_READONLY_SERVICE_VERSION;
  generatedAtUtc: string;
  safety: StreamBillingLedgerReadOnlySafetyBoundary;
  tableCounts: readonly StreamBillingLedgerReadOnlyCount[];
  purchaseIntentStatusSummary: readonly Record<string, unknown>[];
  classificationDecisionSummary: readonly Record<string, unknown>[];
  googleVerificationStatusSummary: readonly Record<string, unknown>[];
  providerGateAuditSummary: readonly Record<string, unknown>[];
  creatorEarningStateSummary: readonly Record<string, unknown>[];
  merchantSettlementStateSummary: readonly Record<string, unknown>[];
}>;

export const STREAM_BILLING_LEDGER_READONLY_TABLE_BINDINGS: readonly StreamBillingLedgerReadOnlyTableBinding[] = [
  { tableName: "StreamPurchaseIntent", delegateName: "streamPurchaseIntent", purpose: "purchase intent lifecycle summary only" },
  { tableName: "StreamPurchaseClassification", delegateName: "streamPurchaseClassification", purpose: "digital/physical rail classification summary only" },
  { tableName: "StreamGooglePurchaseVerification", delegateName: "streamGooglePurchaseVerification", purpose: "Google verification status summary using token hash only" },
  { tableName: "StreamAppendOnlyLedgerEntry", delegateName: "streamAppendOnlyLedgerEntry", purpose: "append-only ledger count/summary only" },
  { tableName: "StreamLedgerHold", delegateName: "streamLedgerHold", purpose: "hold status summary only" },
  { tableName: "StreamCreatorEarningState", delegateName: "streamCreatorEarningState", purpose: "creator earning state summary without payout execution" },
  { tableName: "StreamMerchantSettlementState", delegateName: "streamMerchantSettlementState", purpose: "merchant settlement state summary without settlement execution" },
  { tableName: "StreamRefundVoidAdjustment", delegateName: "streamRefundVoidAdjustment", purpose: "refund/void adjustment summary only" },
  { tableName: "StreamIdempotencyKey", delegateName: "streamIdempotencyKey", purpose: "idempotency state summary only" },
  { tableName: "StreamProviderGateSnapshot", delegateName: "streamProviderGateSnapshot", purpose: "provider readiness audit flags only; no raw secrets" },
];

export const STREAM_BILLING_LEDGER_READONLY_SAFETY_BOUNDARY: StreamBillingLedgerReadOnlySafetyBoundary = {
  version: STREAM_BILLING_LEDGER_READONLY_SERVICE_VERSION,
  readOnly: true,
  routeMountAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  fakeSuccessAllowed: false,
  rawPurchaseTokenReturnAllowed: false,
  rawSecretReturnAllowed: false,
  allowedOperations: ["count", "findMany", "findFirst", "groupBy", "aggregate"],
  forbiddenOperations: [
    "create",
    "createMany",
    "update",
    "updateMany",
    "upsert",
    "delete",
    "deleteMany",
    "rawSqlMutation",
    "providerCall",
    "walletMutation",
    "moneyMovement",
    "routeMount",
    "fakeSuccess",
    "rawPurchaseTokenReturn",
    "rawSecretReturn",
  ],
};

export const STREAM_BILLING_LEDGER_READONLY_SERVICE_NEXT_APPROVAL =
  "I approve BACKEND-STREAM-FOUNDATION-142C read-only service implementation verification and route planning only, no route mount, no provider call, no Wallet mutation, no money movement, no Admin UI touch, no mobile touch." as const;
