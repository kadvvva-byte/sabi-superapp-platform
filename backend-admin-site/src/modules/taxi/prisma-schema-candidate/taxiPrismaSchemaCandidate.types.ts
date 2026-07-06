import type { TaxiRouteDescriptor } from '../foundation';
import type { TaxiDbSchemaApprovalModelId } from '../db-schema-approval';

export type TaxiPrismaSchemaCandidateVersion = 'TAXI-BACKEND-FOUNDATION-001O';

export type TaxiPrismaSchemaCandidateStatus = 'prisma_schema_candidate_package_safe_disabled_ready';

export type TaxiPrismaSchemaCandidateStage =
  | 'candidate_scope_inventory'
  | 'model_shape_candidate_review'
  | 'field_privacy_review'
  | 'index_unique_constraint_review'
  | 'relation_integrity_review'
  | 'admin_ui_compatibility_review'
  | 'client_boundary_summary_review'
  | 'owner_exact_approval_template'
  | 'blocked_until_schema_write_approval';

export type TaxiPrismaCandidateFieldClass =
  | 'identity'
  | 'country_day_partition'
  | 'status_lifecycle'
  | 'money_minor_units'
  | 'redacted_mobile_summary'
  | 'admin_raw_evidence_reference'
  | 'audit_timestamp'
  | 'approval_lock';

export interface TaxiPrismaSchemaCandidateModelShape {
  readonly modelId: TaxiDbSchemaApprovalModelId;
  readonly purpose: string;
  readonly fieldClasses: readonly TaxiPrismaCandidateFieldClass[];
  readonly adminUiRequired: true;
  readonly clientBoundarySummaryAllowed: boolean;
  readonly rawEvidenceMobileBlocked: true;
  readonly requiresExactOwnerApprovalBeforeSchemaWrite: true;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiPrismaSchemaCandidatePackageGuard {
  readonly id: string;
  readonly title: string;
  readonly lockedNow: true;
  readonly exactApprovalRequired: true;
  readonly reason: string;
}

export interface TaxiPrismaSchemaCandidateOwnerApprovalTemplate {
  readonly approvalId: 'taxi_prisma_schema_candidate_write_approval';
  readonly ownerMustApprove: true;
  readonly allowsSchemaWriteNow: false;
  readonly allowsPrismaGenerateNow: false;
  readonly allowsMigrationNow: false;
  readonly allowsDbReadNow: false;
  readonly allowsDbWriteNow: false;
  readonly requiredOwnerStatement: string;
  readonly forbiddenWithoutApproval: readonly string[];
}

export interface TaxiPrismaSchemaCandidateInput {
  readonly wantsCandidateFileWrite: boolean;
  readonly wantsPrismaSchemaWrite: boolean;
  readonly wantsPrismaGenerate: boolean;
  readonly wantsMigration: boolean;
  readonly wantsDbRead: boolean;
  readonly wantsDbWrite: boolean;
  readonly wantsRuntimeRouteMount: boolean;
  readonly hasExactOwnerApprovalForCandidateWrite: boolean;
}

export interface TaxiPrismaSchemaCandidateDecision {
  readonly canWriteCandidateFileNow: false;
  readonly canWritePrismaSchemaNow: false;
  readonly canRunPrismaGenerateNow: false;
  readonly canRunMigrationNow: false;
  readonly canReadDbNow: false;
  readonly canWriteDbNow: false;
  readonly canMountRuntimeRoutesNow: false;
  readonly blockedReasons: readonly string[];
  readonly ownerExactApprovalRequiredBeforeCandidateWrite: true;
  readonly adminCompatibleFromFoundation: true;
  readonly clientAppMustUseKernel: true;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiPrismaSchemaCandidateSnapshot {
  readonly version: TaxiPrismaSchemaCandidateVersion;
  readonly module: 'taxi';
  readonly status: TaxiPrismaSchemaCandidateStatus;
  readonly prismaSchemaCandidatePackageReady: true;
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
  readonly ownerExactApprovalRequiredBeforeCandidateWrite: true;
  readonly schemaDiffReviewRequiredBeforePrismaWrite: true;
  readonly rollbackPlanRequiredBeforeMigration: true;
  readonly stages: readonly TaxiPrismaSchemaCandidateStage[];
  readonly candidateModelShapes: readonly TaxiPrismaSchemaCandidateModelShape[];
  readonly packageGuards: readonly TaxiPrismaSchemaCandidatePackageGuard[];
  readonly ownerApprovalTemplate: TaxiPrismaSchemaCandidateOwnerApprovalTemplate;
  readonly routeDescriptors: readonly TaxiRouteDescriptor[];
  readonly walletMutationEnabled: false;
  readonly paymentEnabled: false;
  readonly payoutEnabled: false;
  readonly providerEnabled: false;
  readonly fakeSuccessBlocked: true;
}
