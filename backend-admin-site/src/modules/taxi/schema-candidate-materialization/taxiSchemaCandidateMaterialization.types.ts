import type { TaxiRouteDescriptor } from '../foundation';
import type { TaxiDbSchemaApprovalModelId } from '../db-schema-approval';

export type TaxiSchemaCandidateMaterializationVersion = 'TAXI-BACKEND-FOUNDATION-001P';

export type TaxiSchemaCandidateMaterializationStatus = 'schema_candidate_materialization_plan_safe_disabled_ready';

export type TaxiSchemaCandidateMaterializationStage =
  | 'materialization_scope_inventory'
  | 'candidate_file_shape_review'
  | 'candidate_write_exact_approval_gate'
  | 'schema_diff_preview_gate'
  | 'prisma_schema_write_blocked'
  | 'prisma_generate_blocked'
  | 'migration_blocked'
  | 'db_access_blocked'
  | 'admin_review_only_ready'
  | 'client_boundary_contract_unchanged';

export type TaxiSchemaCandidateArtifactType =
  | 'candidate_json_file'
  | 'prisma_schema_patch_preview'
  | 'schema_diff_report'
  | 'migration_rollback_plan'
  | 'admin_readiness_payload'
  | 'client_boundary_summary_contract';

export interface TaxiSchemaCandidateMaterializationItem {
  readonly id: string;
  readonly title: string;
  readonly artifactType: TaxiSchemaCandidateArtifactType;
  readonly targetPath: string;
  readonly modelIds: readonly TaxiDbSchemaApprovalModelId[];
  readonly writeEnabledNow: false;
  readonly exactApprovalRequiredBeforeWrite: true;
  readonly dbAccessEnabledNow: false;
  readonly prismaGenerateEnabledNow: false;
  readonly migrationEnabledNow: false;
  readonly routeRuntimeMountedNow: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiSchemaCandidateMaterializationApprovalTemplate {
  readonly approvalId: 'taxi_schema_candidate_materialization_exact_approval';
  readonly ownerMustApprove: true;
  readonly allowsCandidateFileWriteNow: false;
  readonly allowsPrismaSchemaWriteNow: false;
  readonly allowsPrismaGenerateNow: false;
  readonly allowsMigrationNow: false;
  readonly allowsDbReadNow: false;
  readonly allowsDbWriteNow: false;
  readonly requiredOwnerStatement: string;
  readonly forbiddenWithoutApproval: readonly string[];
}

export interface TaxiSchemaCandidateMaterializationInput {
  readonly wantsCandidateFileWrite: boolean;
  readonly wantsPrismaSchemaWrite: boolean;
  readonly wantsPrismaGenerate: boolean;
  readonly wantsMigration: boolean;
  readonly wantsDbRead: boolean;
  readonly wantsDbWrite: boolean;
  readonly wantsRuntimeRouteMount: boolean;
  readonly hasExactOwnerApprovalForMaterialization: boolean;
}

export interface TaxiSchemaCandidateMaterializationDecision {
  readonly canMaterializeCandidateFileNow: false;
  readonly canWritePrismaSchemaNow: false;
  readonly canRunPrismaGenerateNow: false;
  readonly canRunMigrationNow: false;
  readonly canReadDbNow: false;
  readonly canWriteDbNow: false;
  readonly canMountRuntimeRoutesNow: false;
  readonly blockedReasons: readonly string[];
  readonly exactApprovalRequiredBeforeMaterialization: true;
  readonly adminCompatibleFromFoundation: true;
  readonly clientAppMustUseKernel: true;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiSchemaCandidateMaterializationSnapshot {
  readonly version: TaxiSchemaCandidateMaterializationVersion;
  readonly module: 'taxi';
  readonly status: TaxiSchemaCandidateMaterializationStatus;
  readonly schemaCandidateMaterializationPlanReady: true;
  readonly candidateFileWriteEnabledNow: false;
  readonly prismaSchemaWriteEnabledNow: false;
  readonly prismaGenerateEnabledNow: false;
  readonly prismaMigrationEnabledNow: false;
  readonly dbReadEnabledNow: false;
  readonly dbWriteEnabledNow: false;
  readonly routeRuntimeMountedNow: false;
  readonly schedulerRuntimeMountedNow: false;
  readonly adminAddedWithFoundation: true;
  readonly adminUiUsesSameFoundationContracts: true;
  readonly maximumCompatibilityMode: true;
  readonly clientAppMustUseKernel: true;
  readonly rawEvidenceAdminFoundationOnly: true;
  readonly fullDailyAiReportRequired: true;
  readonly allComplaintsCheckedEveryDayRequired: true;
  readonly schemaDiffReviewRequiredBeforePrismaWrite: true;
  readonly rollbackPlanRequiredBeforeMigration: true;
  readonly exactApprovalRequiredBeforeMaterialization: true;
  readonly stages: readonly TaxiSchemaCandidateMaterializationStage[];
  readonly materializationItems: readonly TaxiSchemaCandidateMaterializationItem[];
  readonly approvalTemplate: TaxiSchemaCandidateMaterializationApprovalTemplate;
  readonly routeDescriptors: readonly TaxiRouteDescriptor[];
  readonly walletMutationEnabled: false;
  readonly paymentEnabled: false;
  readonly payoutEnabled: false;
  readonly providerEnabled: false;
  readonly fakeSuccessBlocked: true;
}
