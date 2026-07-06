import {
  STREAM_SCHEMA_PRISMA_PATCH_DRAFT_VERSION,
  STREAM_SCHEMA_PRISMA_PATCH_DRAFT,
  type StreamSchemaPrismaPatchDraft,
} from "./stream-schema-prisma-patch-draft.contracts";

export type StreamSchemaPrismaPatchDraftSourcePlan = Readonly<{
  version: typeof STREAM_SCHEMA_PRISMA_PATCH_DRAFT_VERSION;
  sourceOnly: true;
  planningStage: "BACKEND_STREAM_FOUNDATION_141P";
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
  runtimeUseAllowedNow: false;
  runtimeDbWritePerformed: false;
  runtimeDbWriteAllowedNow: false;
  routeMountAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  adminUiTouchAllowedNow: false;
  mobileTouchAllowedNow: false;
  fakeSuccessAllowed: false;
  rawSecretColumnAllowed: false;
  rawPurchaseTokenColumnAllowed: false;
  patchDraft: StreamSchemaPrismaPatchDraft;
  requiredNextGate: readonly string[];
}>;

export const STREAM_SCHEMA_PRISMA_PATCH_DRAFT_SOURCE_PLAN: StreamSchemaPrismaPatchDraftSourcePlan = {
  version: STREAM_SCHEMA_PRISMA_PATCH_DRAFT_VERSION,
  sourceOnly: true,
  planningStage: "BACKEND_STREAM_FOUNDATION_141P",
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
  runtimeUseAllowedNow: false,
  runtimeDbWritePerformed: false,
  runtimeDbWriteAllowedNow: false,
  routeMountAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  fakeSuccessAllowed: false,
  rawSecretColumnAllowed: false,
  rawPurchaseTokenColumnAllowed: false,
  patchDraft: STREAM_SCHEMA_PRISMA_PATCH_DRAFT,
  requiredNextGate: [
    "Verify patch draft against current schema.prisma without applying it",
    "Plan live DB conflict preflight queries without executing DB writes",
    "Confirm no raw purchase token or raw provider secret columns",
    "Confirm append-only ledger invariant",
    "Owner approval before any actual schema.prisma edit",
    "Owner approval before any migration file creation",
    "Owner approval before any prisma generate",
  ],
};

export function getStreamSchemaPrismaPatchDraftSourcePlan(): StreamSchemaPrismaPatchDraftSourcePlan {
  return STREAM_SCHEMA_PRISMA_PATCH_DRAFT_SOURCE_PLAN;
}
