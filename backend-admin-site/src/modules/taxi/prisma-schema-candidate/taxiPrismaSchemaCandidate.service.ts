import {
  TAXI_PRISMA_SCHEMA_CANDIDATE_MODEL_SHAPES,
  TAXI_PRISMA_SCHEMA_CANDIDATE_OWNER_APPROVAL_TEMPLATE,
  TAXI_PRISMA_SCHEMA_CANDIDATE_PACKAGE_GUARDS,
  TAXI_PRISMA_SCHEMA_CANDIDATE_STAGES,
  taxiPrismaSchemaCandidateRouteDescriptors,
} from './taxiPrismaSchemaCandidate.constants';
import type {
  TaxiPrismaSchemaCandidateDecision,
  TaxiPrismaSchemaCandidateInput,
  TaxiPrismaSchemaCandidateSnapshot,
} from './taxiPrismaSchemaCandidate.types';

export function getTaxiPrismaSchemaCandidateSnapshot(): TaxiPrismaSchemaCandidateSnapshot {
  return {
    version: 'TAXI-BACKEND-FOUNDATION-001O',
    module: 'taxi',
    status: 'prisma_schema_candidate_package_safe_disabled_ready',
    prismaSchemaCandidatePackageReady: true,
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
    ownerExactApprovalRequiredBeforeCandidateWrite: true,
    schemaDiffReviewRequiredBeforePrismaWrite: true,
    rollbackPlanRequiredBeforeMigration: true,
    stages: TAXI_PRISMA_SCHEMA_CANDIDATE_STAGES,
    candidateModelShapes: TAXI_PRISMA_SCHEMA_CANDIDATE_MODEL_SHAPES,
    packageGuards: TAXI_PRISMA_SCHEMA_CANDIDATE_PACKAGE_GUARDS,
    ownerApprovalTemplate: TAXI_PRISMA_SCHEMA_CANDIDATE_OWNER_APPROVAL_TEMPLATE,
    routeDescriptors: taxiPrismaSchemaCandidateRouteDescriptors,
    walletMutationEnabled: false,
    paymentEnabled: false,
    payoutEnabled: false,
    providerEnabled: false,
    fakeSuccessBlocked: true,
  };
}

export function evaluateTaxiPrismaSchemaCandidateRequest(
  input: TaxiPrismaSchemaCandidateInput,
): TaxiPrismaSchemaCandidateDecision {
  const blockedReasons: string[] = [];

  if (input.wantsCandidateFileWrite) {
    blockedReasons.push('candidate_file_write_requires_separate_exact_owner_approval');
  }
  if (input.wantsPrismaSchemaWrite) {
    blockedReasons.push('prisma_schema_write_requires_candidate_diff_review_and_exact_approval');
  }
  if (input.wantsPrismaGenerate) {
    blockedReasons.push('prisma_generate_requires_schema_write_approval_and_successful_type_review');
  }
  if (input.wantsMigration) {
    blockedReasons.push('migration_requires_backup_dry_run_rollback_plan_and_exact_approval');
  }
  if (input.wantsDbRead) {
    blockedReasons.push('db_read_requires_separate_read_approval_and_safe_query_plan');
  }
  if (input.wantsDbWrite) {
    blockedReasons.push('db_write_requires_migration_execution_approval');
  }
  if (input.wantsRuntimeRouteMount) {
    blockedReasons.push('runtime_route_mount_requires_separate_api_security_and_smoke_approval');
  }
  if (!input.hasExactOwnerApprovalForCandidateWrite) {
    blockedReasons.push('exact_owner_approval_required_before_schema_candidate_write');
  }

  return {
    canWriteCandidateFileNow: false,
    canWritePrismaSchemaNow: false,
    canRunPrismaGenerateNow: false,
    canRunMigrationNow: false,
    canReadDbNow: false,
    canWriteDbNow: false,
    canMountRuntimeRoutesNow: false,
    blockedReasons: Array.from(new Set(blockedReasons)),
    ownerExactApprovalRequiredBeforeCandidateWrite: true,
    adminCompatibleFromFoundation: true,
    clientAppMustUseKernel: true,
    fakeSuccessBlocked: true,
  };
}
