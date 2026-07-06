export const STREAM_MIGRATE_DEPLOY_APPROVAL_VERSION = "BACKEND-STREAM-FOUNDATION-141W" as const;

export type StreamMigrateDeployApprovalStatus =
  | "migrate_deploy_approval_package_ready"
  | "blocked"
  | "review_required";

export type StreamMigrateDeployApprovalPackage = Readonly<{
  version: typeof STREAM_MIGRATE_DEPLOY_APPROVAL_VERSION;
  status: StreamMigrateDeployApprovalStatus;
  sourceOnly: true;
  migrationFileVerified: true;
  liveDbReadOnlyPredeployCheckRequired: true;
  migrationName: string;
  migrationFileSha256: string;
  controlledMigrateDeployAllowedNow: false;
  prismaGenerateAllowedNow: false;
  routeMountAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  adminUiTouchAllowedNow: false;
  mobileTouchAllowedNow: false;
  fakeSuccessAllowed: false;
  plannedTables: readonly string[];
  requiredBeforeMigrateDeploy: readonly string[];
  exactNextApprovalPhrase: string;
  notes: string;
}>;

export const STREAM_MIGRATE_DEPLOY_APPROVAL_PACKAGE: StreamMigrateDeployApprovalPackage = {
  version: STREAM_MIGRATE_DEPLOY_APPROVAL_VERSION,
  status: "migrate_deploy_approval_package_ready",
  sourceOnly: true,
  migrationFileVerified: true,
  liveDbReadOnlyPredeployCheckRequired: true,
  migrationName: "20260605164100_stream_billing_ledger_foundation",
  migrationFileSha256: "6ba42cb5653bc464d3648e7cbd3429fc92d213c0dfbdbc52ef032afbab1c86fc",
  controlledMigrateDeployAllowedNow: false,
  prismaGenerateAllowedNow: false,
  routeMountAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
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
  requiredBeforeMigrateDeploy: [
    "Clean 141V migration file creation report",
    "Clean 141W migration file verification report",
    "plannedTableConflictCount equals 0",
    "migrationAlreadyApplied equals false",
    "migration file has no raw token/secret columns",
    "migration file has no DROP/TRUNCATE/DELETE/UPDATE/INSERT statements",
    "database backup/rollback plan remains available",
    "owner approval phrase for 141X",
  ],
  exactNextApprovalPhrase:
    "I approve BACKEND-STREAM-FOUNDATION-141X controlled Prisma migrate deploy execution only, no prisma generate, no route mount, no provider call, no Wallet mutation, no money movement, no Admin UI touch, no mobile touch.",
  notes:
    "This approval package does not execute migrate deploy. It only prepares the gate for a future controlled migration execution stage.",
};

export function getStreamMigrateDeployApprovalPackage(): StreamMigrateDeployApprovalPackage {
  return STREAM_MIGRATE_DEPLOY_APPROVAL_PACKAGE;
}
