import {
  STREAM_MIGRATION_DRAFT_VERSION,
  STREAM_MIGRATION_DRAFT_ARTIFACTS,
  buildStreamMigrationDraftSnapshot,
  type StreamMigrationDraftSnapshot,
} from "./stream-migration-draft.contracts";

export type StreamMigrationDraftSourcePlan = Readonly<{
  version: typeof STREAM_MIGRATION_DRAFT_VERSION;
  sourceOnly: true;
  planningStage: "BACKEND_STREAM_FOUNDATION_141M";
  schemaPrismaEditAllowedNow: false;
  migrationFileCreationAllowedNow: false;
  migrationExecutionAllowedNow: false;
  prismaGenerateAllowedNow: false;
  runtimeUseAllowedNow: false;
  runtimeDbWriteAllowedNow: false;
  routeMountAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  rawSecretColumnAllowed: false;
  rawPurchaseTokenColumnAllowed: false;
  draftArtifactCount: number;
  snapshot: StreamMigrationDraftSnapshot;
  requiredNextGate: readonly string[];
}>;

export const STREAM_MIGRATION_DRAFT_SOURCE_PLAN: StreamMigrationDraftSourcePlan = {
  version: STREAM_MIGRATION_DRAFT_VERSION,
  sourceOnly: true,
  planningStage: "BACKEND_STREAM_FOUNDATION_141M",
  schemaPrismaEditAllowedNow: false,
  migrationFileCreationAllowedNow: false,
  migrationExecutionAllowedNow: false,
  prismaGenerateAllowedNow: false,
  runtimeUseAllowedNow: false,
  runtimeDbWriteAllowedNow: false,
  routeMountAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  fakeSuccessAllowed: false,
  rawSecretColumnAllowed: false,
  rawPurchaseTokenColumnAllowed: false,
  draftArtifactCount: STREAM_MIGRATION_DRAFT_ARTIFACTS.length,
  snapshot: buildStreamMigrationDraftSnapshot(),
  requiredNextGate: [
    "Read-only DB conflict preflight",
    "Verify planned table names do not already conflict",
    "Verify indexes/unique constraints are safe",
    "Verify no raw purchase token or raw secret columns",
    "Verify backup/rollback runbook exists",
    "Owner approval before schema.prisma edit",
  ],
};

export function getStreamMigrationDraftSourcePlan(): StreamMigrationDraftSourcePlan {
  return STREAM_MIGRATION_DRAFT_SOURCE_PLAN;
}
