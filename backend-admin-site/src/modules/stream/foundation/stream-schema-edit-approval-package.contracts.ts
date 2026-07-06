export const STREAM_SCHEMA_EDIT_APPROVAL_PACKAGE_VERSION = "BACKEND-STREAM-FOUNDATION-141O" as const;

export type StreamSchemaEditApprovalReadinessStatus =
  | "planning_only_ready"
  | "blocked"
  | "review_required";

export type StreamSchemaEditApprovalGate = Readonly<{
  version: typeof STREAM_SCHEMA_EDIT_APPROVAL_PACKAGE_VERSION;
  status: StreamSchemaEditApprovalReadinessStatus;
  sourceOnly: true;
  schemaPrismaEditAllowedNow: false;
  migrationFileCreationAllowedNow: false;
  migrationExecutionAllowedNow: false;
  prismaGenerateAllowedNow: false;
  liveDatabaseQueryAllowedNow: false;
  runtimeDbWriteAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  routeMountAllowedNow: false;
  adminUiTouchAllowedNow: false;
  mobileTouchAllowedNow: false;
  rawSecretStorageAllowed: false;
  rawPurchaseTokenStorageAllowed: false;
  fakeSuccessAllowed: false;
  plannedTables: readonly string[];
  mustHaveBeforeSchemaPatchDraft: readonly string[];
  exactNextApprovalPhrase: string;
  notes: string;
}>;

export const STREAM_SCHEMA_EDIT_APPROVAL_GATE: StreamSchemaEditApprovalGate = {
  version: STREAM_SCHEMA_EDIT_APPROVAL_PACKAGE_VERSION,
  status: "planning_only_ready",
  sourceOnly: true,
  schemaPrismaEditAllowedNow: false,
  migrationFileCreationAllowedNow: false,
  migrationExecutionAllowedNow: false,
  prismaGenerateAllowedNow: false,
  liveDatabaseQueryAllowedNow: false,
  runtimeDbWriteAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  routeMountAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  rawSecretStorageAllowed: false,
  rawPurchaseTokenStorageAllowed: false,
  fakeSuccessAllowed: false,
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
  mustHaveBeforeSchemaPatchDraft: [
    "Clean 141N DB conflict preflight planning report",
    "schema.prisma unchanged guard",
    "No planned model conflict in schema.prisma",
    "Backup and rollback runbook evidence",
    "No raw purchase token storage",
    "No raw provider secret storage",
    "Append-only ledger invariant",
    "Idempotency uniqueness invariant",
    "Owner approval phrase before 141P",
  ],
  exactNextApprovalPhrase:
    "I approve BACKEND-STREAM-FOUNDATION-141P source-only schema.prisma patch draft planning only, no schema.prisma edit execution, no migration file creation, no migration execution, no prisma generate, no DB write, no route mount, no provider call, no Wallet mutation, no money movement, no Admin UI touch, no mobile touch.",
  notes:
    "This approval package is source-only planning. It prepares the exact approval wording for a future schema.prisma patch draft planning stage, but does not edit schema.prisma.",
};

export function getStreamSchemaEditApprovalGate(): StreamSchemaEditApprovalGate {
  return STREAM_SCHEMA_EDIT_APPROVAL_GATE;
}
