export const STREAM_SCHEMA_PRISMA_PATCH_DRAFT_VERSION = "BACKEND-STREAM-FOUNDATION-141P" as const;

export type StreamSchemaPrismaPatchDraftStatus =
  | "patch_draft_planning_ready"
  | "blocked"
  | "review_required";

export type StreamSchemaPrismaPatchDraft = Readonly<{
  version: typeof STREAM_SCHEMA_PRISMA_PATCH_DRAFT_VERSION;
  status: StreamSchemaPrismaPatchDraftStatus;
  sourceOnly: true;
  ownerApprovalPhraseAcceptedBeforePackage: true;
  schemaPrismaEditPerformed: false;
  schemaPrismaEditAllowedNow: false;
  migrationFileCreationPerformed: false;
  migrationFileCreationAllowedNow: false;
  migrationExecutionPerformed: false;
  migrationExecutionAllowedNow: false;
  prismaGeneratePerformed: false;
  prismaGenerateAllowedNow: false;
  liveDatabaseQueried: false;
  liveDatabaseQueryAllowedNow: false;
  runtimeDbWritePerformed: false;
  runtimeDbWriteAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  routeMountAllowedNow: false;
  adminUiTouchAllowedNow: false;
  mobileTouchAllowedNow: false;
  fakeSuccessAllowed: false;
  rawPurchaseTokenColumnAllowed: false;
  rawSecretColumnAllowed: false;
  plannedTables: readonly string[];
  patchDraftText: string;
  exactNextApprovalPhrase: string;
  notes: string;
}>;

export const STREAM_SCHEMA_PRISMA_PATCH_DRAFT_TEXT = "// BACKEND-STREAM-FOUNDATION-141P PATCH DRAFT ONLY\n// Do not apply without separate owner approval.\n// Raw purchase tokens and raw provider secrets are forbidden.\n\nmodel StreamPurchaseIntent {\n  id String @id\n  userId String\n  sku String\n  platform String\n  purchasePurpose String\n  targetKind String\n  idempotencyKey String @unique\n  status String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([userId, status])\n  @@index([sku])\n}\n\nmodel StreamPurchaseClassification {\n  id String @id\n  purchaseIntentId String\n  classifierVersion String\n  decisionStatus String\n  requiredRail String\n  ledgerBucket String\n  hardBlockReasons Json\n  createdAt DateTime @default(now())\n\n  @@index([purchaseIntentId])\n}\n\nmodel StreamGooglePurchaseVerification {\n  id String @id\n  purchaseIntentId String\n  sku String\n  productType String\n  packageName String\n  purchaseTokenHash String\n  verificationStatus String\n  acknowledgementStatus String\n  providerResponseMetadata Json?\n  createdAt DateTime @default(now())\n\n  @@index([purchaseIntentId])\n  @@index([sku])\n  @@index([purchaseTokenHash])\n}\n\nmodel StreamAppendOnlyLedgerEntry {\n  id String @id\n  purchaseIntentId String\n  entryKind String\n  direction String\n  sourceBucket String\n  targetBucket String\n  requiredRail String\n  partyKind String\n  amountMinor String\n  currency String\n  idempotencyKey String @unique\n  metadata Json?\n  createdAt DateTime @default(now())\n\n  @@index([purchaseIntentId])\n  @@index([entryKind])\n  @@index([sourceBucket, targetBucket])\n}\n\nmodel StreamLedgerHold {\n  id String @id\n  ledgerEntryId String\n  holdKind String\n  holdStatus String\n  amountMinor String\n  currency String\n  reason String\n  createdAt DateTime @default(now())\n\n  @@index([ledgerEntryId])\n  @@index([holdStatus])\n}\n\nmodel StreamCreatorEarningState {\n  id String @id\n  creatorId String\n  purchaseIntentId String\n  stateKind String\n  amountMinor String\n  currency String\n  blockedReasons Json?\n  createdAt DateTime @default(now())\n\n  @@index([creatorId, stateKind])\n  @@index([purchaseIntentId])\n}\n\nmodel StreamMerchantSettlementState {\n  id String @id\n  merchantId String\n  purchaseIntentId String\n  stateKind String\n  amountMinor String\n  currency String\n  kybAmlState String\n  blockedReasons Json?\n  createdAt DateTime @default(now())\n\n  @@index([merchantId, stateKind])\n  @@index([purchaseIntentId])\n}\n\nmodel StreamRefundVoidAdjustment {\n  id String @id\n  purchaseIntentId String\n  adjustmentKind String\n  sourceReferenceHash String\n  amountMinor String\n  currency String\n  createdAt DateTime @default(now())\n\n  @@index([purchaseIntentId])\n  @@index([sourceReferenceHash])\n}\n\nmodel StreamIdempotencyKey {\n  id String @id\n  scope String\n  keyHash String @unique\n  status String\n  createdAt DateTime @default(now())\n  expiresAt DateTime\n\n  @@index([scope, status])\n  @@index([expiresAt])\n}\n\nmodel StreamProviderGateSnapshot {\n  id String @id\n  gateId String\n  status String\n  configuredNow Boolean\n  callsAllowedNow Boolean\n  rawSecretValuesReturned Boolean\n  createdAt DateTime @default(now())\n\n  @@index([gateId, createdAt])\n}" as const;

export const STREAM_SCHEMA_PRISMA_PATCH_DRAFT: StreamSchemaPrismaPatchDraft = {
  version: STREAM_SCHEMA_PRISMA_PATCH_DRAFT_VERSION,
  status: "patch_draft_planning_ready",
  sourceOnly: true,
  ownerApprovalPhraseAcceptedBeforePackage: true,
  schemaPrismaEditPerformed: false,
  schemaPrismaEditAllowedNow: false,
  migrationFileCreationPerformed: false,
  migrationFileCreationAllowedNow: false,
  migrationExecutionPerformed: false,
  migrationExecutionAllowedNow: false,
  prismaGeneratePerformed: false,
  prismaGenerateAllowedNow: false,
  liveDatabaseQueried: false,
  liveDatabaseQueryAllowedNow: false,
  runtimeDbWritePerformed: false,
  runtimeDbWriteAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  routeMountAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  fakeSuccessAllowed: false,
  rawPurchaseTokenColumnAllowed: false,
  rawSecretColumnAllowed: false,
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
  patchDraftText: STREAM_SCHEMA_PRISMA_PATCH_DRAFT_TEXT,
  exactNextApprovalPhrase:
    "I approve BACKEND-STREAM-FOUNDATION-141Q read-only schema patch draft verification and live DB conflict preflight planning only, no schema.prisma edit execution, no migration file creation, no migration execution, no prisma generate, no DB write, no route mount, no provider call, no Wallet mutation, no money movement, no Admin UI touch, no mobile touch.",
  notes:
    "This is a schema.prisma patch draft as source-only planning text. It must not be applied by this stage.",
};

export function getStreamSchemaPrismaPatchDraft(): StreamSchemaPrismaPatchDraft {
  return STREAM_SCHEMA_PRISMA_PATCH_DRAFT;
}
