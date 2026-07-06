import {
  TAXI_DB_SCHEMA_APPROVAL_STAGES,
  TAXI_DB_SCHEMA_FORBIDDEN_EXECUTION_LOCKS,
  TAXI_DB_SCHEMA_MODEL_APPROVAL_PLAN,
  TAXI_DB_SCHEMA_PREFLIGHT_CHECKS,
  taxiDbSchemaApprovalRouteDescriptors,
} from './taxiDbSchemaApproval.constants';
import type {
  TaxiDbSchemaApprovalDecision,
  TaxiDbSchemaApprovalInput,
  TaxiDbSchemaApprovalSnapshot,
} from './taxiDbSchemaApproval.types';

export function getTaxiDbSchemaApprovalSnapshot(): TaxiDbSchemaApprovalSnapshot {
  return {
    version: 'TAXI-BACKEND-FOUNDATION-001N',
    module: 'taxi',
    status: 'db_schema_exact_approval_planning_safe_disabled_ready',
    dbSchemaExactApprovalPlanningReady: true,
    prismaSchemaWriteEnabledNow: false,
    prismaGenerateEnabledNow: false,
    prismaMigrationEnabledNow: false,
    dbReadEnabledNow: false,
    dbWriteEnabledNow: false,
    runtimeRouteMountEnabledNow: false,
    schedulerRuntimeMountedNow: false,
    adminAddedWithFoundation: true,
    adminUiUsesSameFoundationContracts: true,
    maximumCompatibilityMode: true,
    clientAppMustUseKernel: true,
    rawEvidenceAdminFoundationOnly: true,
    allComplaintsCheckedEveryDayRequired: true,
    fullDailyAiReportRequired: true,
    rollbackPlanRequiredBeforeMigration: true,
    stages: TAXI_DB_SCHEMA_APPROVAL_STAGES,
    modelPlan: TAXI_DB_SCHEMA_MODEL_APPROVAL_PLAN,
    preflightChecks: TAXI_DB_SCHEMA_PREFLIGHT_CHECKS,
    forbiddenExecutionLocks: TAXI_DB_SCHEMA_FORBIDDEN_EXECUTION_LOCKS,
    routeDescriptors: taxiDbSchemaApprovalRouteDescriptors,
    walletMutationEnabled: false,
    paymentEnabled: false,
    payoutEnabled: false,
    providerEnabled: false,
    fakeSuccessBlocked: true,
  };
}

export function evaluateTaxiDbSchemaApprovalRequest(input: TaxiDbSchemaApprovalInput): TaxiDbSchemaApprovalDecision {
  const blockedReasons: string[] = [];

  if (input.wantsPrismaSchemaWrite) {
    blockedReasons.push('prisma_schema_write_requires_separate_exact_owner_approval');
  }
  if (input.wantsPrismaGenerate) {
    blockedReasons.push('prisma_generate_requires_schema_review_and_exact_owner_approval');
  }
  if (input.wantsPrismaMigration) {
    blockedReasons.push('prisma_migration_requires_backup_rollback_plan_and_exact_owner_approval');
  }
  if (input.wantsDbRead) {
    blockedReasons.push('db_read_requires_separate_read_approval_and_safe_query_plan');
  }
  if (input.wantsDbWrite) {
    blockedReasons.push('db_write_requires_migration_approval_and_runtime_execution_approval');
  }
  if (input.wantsRuntimeRouteMount) {
    blockedReasons.push('runtime_route_mount_requires_security_smoke_and_rollback_approval');
  }
  if (input.wantsSchedulerActivation) {
    blockedReasons.push('scheduler_activation_requires_ai_provider_db_runtime_and_admin_approval');
  }
  if (!input.hasExactOwnerApproval) {
    blockedReasons.push('exact_owner_approval_required_before_any_schema_or_runtime_execution');
  }

  return {
    canWritePrismaSchemaNow: false,
    canRunPrismaGenerateNow: false,
    canRunMigrationNow: false,
    canReadDbNow: false,
    canWriteDbNow: false,
    canMountRuntimeRoutesNow: false,
    canActivateSchedulerNow: false,
    blockedReasons: Array.from(new Set(blockedReasons)),
    exactApprovalRequiredBeforeAnyExecution: true,
    adminCompatibleFromFoundation: true,
    clientAppMustUseKernel: true,
    fakeSuccessBlocked: true,
  };
}
