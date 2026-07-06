import {
  STREAM_DB_SCHEMA_PLANNED_TABLES,
  type StreamDbPlannedTableName,
} from "./stream-db-schema-planning.contracts";

export const STREAM_MIGRATION_DRAFT_VERSION = "BACKEND-STREAM-FOUNDATION-141M" as const;

export type StreamMigrationDraftArtifactKind =
  | "prisma_model_block_draft"
  | "index_draft"
  | "constraint_draft"
  | "rollback_note"
  | "manual_review_note";

export type StreamMigrationDraftRiskLevel =
  | "low"
  | "medium"
  | "high"
  | "blocked_until_owner_approval";

export type StreamMigrationDraftArtifact = Readonly<{
  version: typeof STREAM_MIGRATION_DRAFT_VERSION;
  tableName: StreamDbPlannedTableName;
  artifactKind: StreamMigrationDraftArtifactKind;
  riskLevel: StreamMigrationDraftRiskLevel;
  schemaPrismaEditAllowedNow: false;
  migrationFileCreationAllowedNow: false;
  prismaGenerateAllowedNow: false;
  runtimeDbWriteAllowedNow: false;
  rawSecretColumnAllowed: false;
  rawPurchaseTokenColumnAllowed: false;
  draftText: string;
  notes: string;
}>;

export type StreamMigrationDraftSnapshot = Readonly<{
  version: typeof STREAM_MIGRATION_DRAFT_VERSION;
  sourceOnly: true;
  schemaPrismaEditAllowedNow: false;
  migrationFileCreationAllowedNow: false;
  migrationExecutionAllowedNow: false;
  prismaGenerateAllowedNow: false;
  runtimeDbWriteAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  rawSecretColumnAllowed: false;
  rawPurchaseTokenColumnAllowed: false;
  plannedTableCount: number;
  artifacts: readonly StreamMigrationDraftArtifact[];
  requiredBeforeAnySchemaEdit: readonly string[];
}>;

function artifact(
  tableName: StreamDbPlannedTableName,
  artifactKind: StreamMigrationDraftArtifactKind,
  riskLevel: StreamMigrationDraftRiskLevel,
  draftText: string,
  notes: string,
): StreamMigrationDraftArtifact {
  return {
    version: STREAM_MIGRATION_DRAFT_VERSION,
    tableName,
    artifactKind,
    riskLevel,
    schemaPrismaEditAllowedNow: false,
    migrationFileCreationAllowedNow: false,
    prismaGenerateAllowedNow: false,
    runtimeDbWriteAllowedNow: false,
    rawSecretColumnAllowed: false,
    rawPurchaseTokenColumnAllowed: false,
    draftText,
    notes,
  };
}

export const STREAM_MIGRATION_DRAFT_ARTIFACTS: readonly StreamMigrationDraftArtifact[] = [
  artifact(
    "StreamPurchaseIntent",
    "prisma_model_block_draft",
    "blocked_until_owner_approval",
    [
      "model StreamPurchaseIntent {",
      "  id String @id",
      "  userId String",
      "  sku String",
      "  platform String",
      "  purchasePurpose String",
      "  targetKind String",
      "  idempotencyKey String @unique",
      "  status String",
      "  createdAt DateTime @default(now())",
      "  updatedAt DateTime @updatedAt",
      "}",
    ].join("\n"),
    "Draft only: purchase intent status table. It must not credit balances or deliver entitlements by itself.",
  ),
  artifact(
    "StreamPurchaseClassification",
    "prisma_model_block_draft",
    "blocked_until_owner_approval",
    [
      "model StreamPurchaseClassification {",
      "  id String @id",
      "  purchaseIntentId String",
      "  classifierVersion String",
      "  decisionStatus String",
      "  requiredRail String",
      "  ledgerBucket String",
      "  hardBlockReasons Json",
      "  createdAt DateTime @default(now())",
      "}",
    ].join("\n"),
    "Draft only: append-only classification evidence.",
  ),
  artifact(
    "StreamGooglePurchaseVerification",
    "prisma_model_block_draft",
    "blocked_until_owner_approval",
    [
      "model StreamGooglePurchaseVerification {",
      "  id String @id",
      "  purchaseIntentId String",
      "  sku String",
      "  productType String",
      "  packageName String",
      "  purchaseTokenHash String",
      "  verificationStatus String",
      "  acknowledgementStatus String",
      "  providerResponseMetadata Json?",
      "  createdAt DateTime @default(now())",
      "}",
    ].join("\n"),
    "Draft only: stores purchaseTokenHash only. Raw purchase tokens and raw provider secrets are forbidden.",
  ),
  artifact(
    "StreamAppendOnlyLedgerEntry",
    "prisma_model_block_draft",
    "blocked_until_owner_approval",
    [
      "model StreamAppendOnlyLedgerEntry {",
      "  id String @id",
      "  purchaseIntentId String",
      "  entryKind String",
      "  direction String",
      "  sourceBucket String",
      "  targetBucket String",
      "  requiredRail String",
      "  partyKind String",
      "  amountMinor String",
      "  currency String",
      "  idempotencyKey String @unique",
      "  metadata Json?",
      "  createdAt DateTime @default(now())",
      "}",
    ].join("\n"),
    "Draft only: core append-only ledger entry. Future corrections must append adjustment rows, not overwrite history.",
  ),
  artifact(
    "StreamLedgerHold",
    "prisma_model_block_draft",
    "blocked_until_owner_approval",
    [
      "model StreamLedgerHold {",
      "  id String @id",
      "  ledgerEntryId String",
      "  holdKind String",
      "  holdStatus String",
      "  amountMinor String",
      "  currency String",
      "  reason String",
      "  createdAt DateTime @default(now())",
      "}",
    ].join("\n"),
    "Draft only: holds are append-only evidence for refund, chargeback, compliance, fraud, provider settlement and tax.",
  ),
  artifact(
    "StreamCreatorEarningState",
    "prisma_model_block_draft",
    "blocked_until_owner_approval",
    [
      "model StreamCreatorEarningState {",
      "  id String @id",
      "  creatorId String",
      "  purchaseIntentId String",
      "  stateKind String",
      "  amountMinor String",
      "  currency String",
      "  blockedReasons Json?",
      "  createdAt DateTime @default(now())",
      "}",
    ].join("\n"),
    "Draft only: creator earnings stay separate from merchant settlement and are not payable immediately.",
  ),
  artifact(
    "StreamMerchantSettlementState",
    "prisma_model_block_draft",
    "blocked_until_owner_approval",
    [
      "model StreamMerchantSettlementState {",
      "  id String @id",
      "  merchantId String",
      "  purchaseIntentId String",
      "  stateKind String",
      "  amountMinor String",
      "  currency String",
      "  kybAmlState String",
      "  blockedReasons Json?",
      "  createdAt DateTime @default(now())",
      "}",
    ].join("\n"),
    "Draft only: merchant settlement stays separate from creator earnings and requires KYB/AML.",
  ),
  artifact(
    "StreamRefundVoidAdjustment",
    "prisma_model_block_draft",
    "blocked_until_owner_approval",
    [
      "model StreamRefundVoidAdjustment {",
      "  id String @id",
      "  purchaseIntentId String",
      "  adjustmentKind String",
      "  sourceReferenceHash String",
      "  amountMinor String",
      "  currency String",
      "  createdAt DateTime @default(now())",
      "}",
    ].join("\n"),
    "Draft only: refund, void, chargeback and subscription lifecycle events append adjustment rows.",
  ),
  artifact(
    "StreamIdempotencyKey",
    "prisma_model_block_draft",
    "blocked_until_owner_approval",
    [
      "model StreamIdempotencyKey {",
      "  id String @id",
      "  scope String",
      "  keyHash String @unique",
      "  status String",
      "  createdAt DateTime @default(now())",
      "  expiresAt DateTime",
      "}",
    ].join("\n"),
    "Draft only: stores keyHash only and blocks duplicate processing.",
  ),
  artifact(
    "StreamProviderGateSnapshot",
    "prisma_model_block_draft",
    "blocked_until_owner_approval",
    [
      "model StreamProviderGateSnapshot {",
      "  id String @id",
      "  gateId String",
      "  status String",
      "  configuredNow Boolean",
      "  callsAllowedNow Boolean",
      "  rawSecretValuesReturned Boolean",
      "  createdAt DateTime @default(now())",
      "}",
    ].join("\n"),
    "Draft only: stores provider presence/status only; raw provider secrets are forbidden.",
  ),
  artifact(
    "StreamAppendOnlyLedgerEntry",
    "index_draft",
    "blocked_until_owner_approval",
    "Recommended unique index: idempotencyKey. Recommended trace indexes: purchaseIntentId, entryKind, sourceBucket+targetBucket.",
    "Draft only: indexes must be reviewed in DB conflict preflight before migration.",
  ),
  artifact(
    "StreamGooglePurchaseVerification",
    "constraint_draft",
    "blocked_until_owner_approval",
    "Constraint intent: purchaseTokenHash is hash-only; no raw token column allowed.",
    "Draft only: future migration review must reject raw purchase token storage.",
  ),
  artifact(
    "StreamProviderGateSnapshot",
    "constraint_draft",
    "blocked_until_owner_approval",
    "Constraint intent: rawSecretValuesReturned must stay false in provider snapshots.",
    "Draft only: future migration review must reject raw provider secret storage.",
  ),
];

export function buildStreamMigrationDraftSnapshot(): StreamMigrationDraftSnapshot {
  const plannedNames = STREAM_DB_SCHEMA_PLANNED_TABLES.map((table) => table.tableName);
  return {
    version: STREAM_MIGRATION_DRAFT_VERSION,
    sourceOnly: true,
    schemaPrismaEditAllowedNow: false,
    migrationFileCreationAllowedNow: false,
    migrationExecutionAllowedNow: false,
    prismaGenerateAllowedNow: false,
    runtimeDbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    rawSecretColumnAllowed: false,
    rawPurchaseTokenColumnAllowed: false,
    plannedTableCount: plannedNames.length,
    artifacts: STREAM_MIGRATION_DRAFT_ARTIFACTS,
    requiredBeforeAnySchemaEdit: [
      "Owner approval for schema edit stage",
      "Read-only DB conflict preflight",
      "Backup and rollback runbook",
      "Explicit raw-token/raw-secret column rejection",
      "Append-only invariant review",
      "Idempotency uniqueness review",
      "Prisma migration draft review",
      "Separate approval before migration execution",
    ],
  };
}
