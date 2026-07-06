import {
  TAXI_SCHEMA_CANDIDATE_MATERIALIZATION_APPROVAL_TEMPLATE,
  TAXI_SCHEMA_CANDIDATE_MATERIALIZATION_ITEMS,
  TAXI_SCHEMA_CANDIDATE_MATERIALIZATION_STAGES,
  TAXI_SCHEMA_CANDIDATE_MATERIALIZATION_VERSION,
  taxiSchemaCandidateMaterializationRouteDescriptors,
} from './taxiSchemaCandidateMaterialization.constants';
import type {
  TaxiSchemaCandidateMaterializationDecision,
  TaxiSchemaCandidateMaterializationInput,
  TaxiSchemaCandidateMaterializationSnapshot,
} from './taxiSchemaCandidateMaterialization.types';

export function getTaxiSchemaCandidateMaterializationSnapshot(): TaxiSchemaCandidateMaterializationSnapshot {
  return {
    version: TAXI_SCHEMA_CANDIDATE_MATERIALIZATION_VERSION,
    module: 'taxi',
    status: 'schema_candidate_materialization_plan_safe_disabled_ready',
    schemaCandidateMaterializationPlanReady: true,
    candidateFileWriteEnabledNow: false,
    prismaSchemaWriteEnabledNow: false,
    prismaGenerateEnabledNow: false,
    prismaMigrationEnabledNow: false,
    dbReadEnabledNow: false,
    dbWriteEnabledNow: false,
    routeRuntimeMountedNow: false,
    schedulerRuntimeMountedNow: false,
    adminAddedWithFoundation: true,
    adminUiUsesSameFoundationContracts: true,
    maximumCompatibilityMode: true,
    clientAppMustUseKernel: true,
    rawEvidenceAdminFoundationOnly: true,
    fullDailyAiReportRequired: true,
    allComplaintsCheckedEveryDayRequired: true,
    schemaDiffReviewRequiredBeforePrismaWrite: true,
    rollbackPlanRequiredBeforeMigration: true,
    exactApprovalRequiredBeforeMaterialization: true,
    stages: TAXI_SCHEMA_CANDIDATE_MATERIALIZATION_STAGES,
    materializationItems: TAXI_SCHEMA_CANDIDATE_MATERIALIZATION_ITEMS,
    approvalTemplate: TAXI_SCHEMA_CANDIDATE_MATERIALIZATION_APPROVAL_TEMPLATE,
    routeDescriptors: taxiSchemaCandidateMaterializationRouteDescriptors,
    walletMutationEnabled: false,
    paymentEnabled: false,
    payoutEnabled: false,
    providerEnabled: false,
    fakeSuccessBlocked: true,
  };
}

export function evaluateTaxiSchemaCandidateMaterializationRequest(
  input: TaxiSchemaCandidateMaterializationInput,
): TaxiSchemaCandidateMaterializationDecision {
  const blockedReasons: string[] = [];

  if (input.wantsCandidateFileWrite) {
    blockedReasons.push('candidate_file_write_requires_separate_exact_owner_approval');
  }
  if (input.wantsPrismaSchemaWrite) {
    blockedReasons.push('prisma_schema_write_blocked_until_schema_diff_review_and_exact_approval');
  }
  if (input.wantsPrismaGenerate) {
    blockedReasons.push('prisma_generate_blocked_until_schema_write_approved_and_verified');
  }
  if (input.wantsMigration) {
    blockedReasons.push('migration_blocked_until_rollback_plan_and_exact_approval');
  }
  if (input.wantsDbRead) {
    blockedReasons.push('db_read_blocked_in_schema_materialization_planning');
  }
  if (input.wantsDbWrite) {
    blockedReasons.push('db_write_blocked_in_schema_materialization_planning');
  }
  if (input.wantsRuntimeRouteMount) {
    blockedReasons.push('runtime_route_mount_blocked_in_schema_materialization_planning');
  }
  if (!input.hasExactOwnerApprovalForMaterialization) {
    blockedReasons.push('exact_owner_approval_required_before_any_candidate_materialization');
  }

  return {
    canMaterializeCandidateFileNow: false,
    canWritePrismaSchemaNow: false,
    canRunPrismaGenerateNow: false,
    canRunMigrationNow: false,
    canReadDbNow: false,
    canWriteDbNow: false,
    canMountRuntimeRoutesNow: false,
    blockedReasons: Array.from(new Set(blockedReasons)),
    exactApprovalRequiredBeforeMaterialization: true,
    adminCompatibleFromFoundation: true,
    clientAppMustUseKernel: true,
    fakeSuccessBlocked: true,
  };
}
