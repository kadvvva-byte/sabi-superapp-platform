import {
  STREAM_DB_SCHEMA_PLANNING_VERSION,
  STREAM_DB_SCHEMA_PLANNED_TABLES,
  buildStreamDbSchemaPlanningSnapshot,
  type StreamDbSchemaPlanningSnapshot,
} from "./stream-db-schema-planning.contracts";

export type StreamDbSchemaPlanningSourcePlan = Readonly<{
  version: typeof STREAM_DB_SCHEMA_PLANNING_VERSION;
  sourceOnly: true;
  planningStage: "BACKEND_STREAM_FOUNDATION_141K";
  prismaSchemaWriteAllowedNow: false;
  schemaMigrationAllowedNow: false;
  prismaGenerateAllowedNow: false;
  runtimeUseAllowedNow: false;
  runtimeDbWriteAllowedNow: false;
  routeMountAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  rawSecretStorageAllowed: false;
  rawPurchaseTokenStorageAllowed: false;
  plannedTableCount: number;
  appendOnlyTableNames: readonly string[];
  controlledStatusTableNames: readonly string[];
  snapshot: StreamDbSchemaPlanningSnapshot;
  requiredBeforeSchemaMigration: readonly string[];
}>;

export const STREAM_DB_SCHEMA_PLANNING_SOURCE_PLAN: StreamDbSchemaPlanningSourcePlan = {
  version: STREAM_DB_SCHEMA_PLANNING_VERSION,
  sourceOnly: true,
  planningStage: "BACKEND_STREAM_FOUNDATION_141K",
  prismaSchemaWriteAllowedNow: false,
  schemaMigrationAllowedNow: false,
  prismaGenerateAllowedNow: false,
  runtimeUseAllowedNow: false,
  runtimeDbWriteAllowedNow: false,
  routeMountAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  fakeSuccessAllowed: false,
  rawSecretStorageAllowed: false,
  rawPurchaseTokenStorageAllowed: false,
  plannedTableCount: STREAM_DB_SCHEMA_PLANNED_TABLES.length,
  appendOnlyTableNames: STREAM_DB_SCHEMA_PLANNED_TABLES
    .filter((table) => table.appendOnly)
    .map((table) => table.tableName),
  controlledStatusTableNames: STREAM_DB_SCHEMA_PLANNED_TABLES
    .filter((table) => !table.appendOnly)
    .map((table) => table.tableName),
  snapshot: buildStreamDbSchemaPlanningSnapshot(),
  requiredBeforeSchemaMigration: [
    "Owner approval for schema planning only",
    "Prisma migration draft review",
    "No existing table conflict check",
    "No raw secret or raw purchase token column review",
    "Append-only ledger invariants review",
    "Idempotency model review",
    "Admin read-only route plan",
    "Read-only migration preflight",
    "Backup/rollback runbook before any migration",
    "Separate approval before prisma migrate or prisma generate",
  ],
};

export function getStreamDbSchemaPlanningSourcePlan(): StreamDbSchemaPlanningSourcePlan {
  return STREAM_DB_SCHEMA_PLANNING_SOURCE_PLAN;
}
