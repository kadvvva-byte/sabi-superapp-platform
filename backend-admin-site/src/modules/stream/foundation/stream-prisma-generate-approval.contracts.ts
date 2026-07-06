export const STREAM_PRISMA_GENERATE_APPROVAL_VERSION = "BACKEND-STREAM-FOUNDATION-141Y-FIX1" as const;

export type StreamPrismaGenerateApprovalStatus =
  | "prisma_generate_approval_package_ready"
  | "blocked"
  | "review_required";

export type StreamPrismaGenerateApprovalPackage = Readonly<{
  version: typeof STREAM_PRISMA_GENERATE_APPROVAL_VERSION;
  status: StreamPrismaGenerateApprovalStatus;
  sourceOnly: true;
  postMigrateVerificationRequired: true;
  migrationApplied: true;
  plannedTablesVisible: true;
  controlledPrismaGenerateAllowedNow: false;
  routeMountAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  adminUiTouchAllowedNow: false;
  mobileTouchAllowedNow: false;
  fakeSuccessAllowed: false;
  rawSecretValuesReturnedAllowedOnlyAsBooleanAuditFlag: true;
  rawSecretValuesReturnedIsNotASecretColumn: true;
  rawSecretValuesReturnedMustNotContainSecretValues: true;
  rawSecretValuesReturnedMustRemainBoolean: true;
  plannedTables: readonly string[];
  requiredBeforePrismaGenerate: readonly string[];
  exactNextApprovalPhrase: string;
  notes: string;
}>;

export const STREAM_PRISMA_GENERATE_APPROVAL_PACKAGE: StreamPrismaGenerateApprovalPackage = {
  version: STREAM_PRISMA_GENERATE_APPROVAL_VERSION,
  status: "prisma_generate_approval_package_ready",
  sourceOnly: true,
  postMigrateVerificationRequired: true,
  migrationApplied: true,
  plannedTablesVisible: true,
  controlledPrismaGenerateAllowedNow: false,
  routeMountAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  fakeSuccessAllowed: false,
  rawSecretValuesReturnedAllowedOnlyAsBooleanAuditFlag: true,
  rawSecretValuesReturnedIsNotASecretColumn: true,
  rawSecretValuesReturnedMustNotContainSecretValues: true,
  rawSecretValuesReturnedMustRemainBoolean: true,
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
  requiredBeforePrismaGenerate: [
    "Clean 141X migrate deploy execution report",
    "Clean 141Y-FIX1 post-migrate read-only DB verification",
    "migrationApplied equals true",
    "migrationFinished equals true",
    "plannedTableCount equals 10",
    "purchaseTokenHash exists",
    "no raw purchase token column",
    "no forbidden raw secret/access token/private key columns",
    "rawSecretValuesReturned is allowed only as a boolean audit flag",
    "owner approval phrase for 141Z",
  ],
  exactNextApprovalPhrase:
    "I approve BACKEND-STREAM-FOUNDATION-141Z controlled Prisma generate execution only, no route mount, no provider call, no Wallet mutation, no money movement, no Admin UI touch, no mobile touch.",
  notes:
    "This approval package does not run prisma generate. It only prepares the gate for a future controlled Prisma client generation stage. rawSecretValuesReturned is a boolean audit flag and must never contain secret values.",
};

export function getStreamPrismaGenerateApprovalPackage(): StreamPrismaGenerateApprovalPackage {
  return STREAM_PRISMA_GENERATE_APPROVAL_PACKAGE;
}
