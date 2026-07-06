import {
  TAXI_MIGRATION_DIFF_ARTIFACTS_002F,
  TAXI_MIGRATION_DIFF_COMMAND_DRAFTS_002F,
  TAXI_MIGRATION_DIFF_GATES_002F,
  TAXI_MIGRATION_DIFF_PREFLIGHT_VERSION_002F,
  TAXI_MIGRATION_DIFF_REQUIRED_ENUM_COUNT_002F,
  TAXI_MIGRATION_DIFF_REQUIRED_MODEL_COUNT_002F,
} from './constants';
import type {
  TaxiMigrationDiffGateId002F,
  TaxiMigrationDiffPreflightDecision002F,
  TaxiMigrationDiffPreflightInput002F,
  TaxiMigrationDiffPreflightSnapshot002F,
} from './types';

export function getTaxiMigrationDiffPreflightSnapshot002F(): TaxiMigrationDiffPreflightSnapshot002F {
  return {
    version: TAXI_MIGRATION_DIFF_PREFLIGHT_VERSION_002F,
    status: 'migration_diff_preflight_ready_safe_disabled',
    prerequisiteGenerateReportPath: '.data/taxi/002e/prisma-generate-execution-report.json',
    migrationDiffReportPath: '.data/taxi/002f/migration-diff-preflight-report.json',
    migrationDiffSqlCandidatePath: '.data/taxi/002f/prisma-migrate-diff-from-empty.sql',
    requiredTaxiModelCount: TAXI_MIGRATION_DIFF_REQUIRED_MODEL_COUNT_002F,
    requiredTaxiEnumCount: TAXI_MIGRATION_DIFF_REQUIRED_ENUM_COUNT_002F,
    commandDrafts: TAXI_MIGRATION_DIFF_COMMAND_DRAFTS_002F,
    artifacts: TAXI_MIGRATION_DIFF_ARTIFACTS_002F,
    gates: TAXI_MIGRATION_DIFF_GATES_002F,
    prismaMigrateDiffExecutedNow: false,
    prismaMigrationApplyExecutedNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    schemaWriteNow: false,
    runtimeRouteMountedNow: false,
    walletMutationNow: false,
    paymentNow: false,
    payoutNow: false,
    providerDispatchNow: false,
    fakeSuccessBlocked: true,
  };
}

export function buildTaxiMigrationDiffApprovalRequest002F(): string {
  return [
    'I approve TAXI-BACKEND-FOUNDATION-002F Prisma migrate diff preflight only after 002E Prisma generate passed.',
    'Allowed: run Prisma migrate diff from empty to prisma/schema.prisma, write only .data/taxi/002f report and SQL candidate artifacts, and run TypeScript check separately.',
    'Not allowed: Prisma migrate dev/deploy/reset, DB read/write, migration folder creation, schema write, route mount, backend restart, Wallet/payment/payout, provider dispatch, Admin UI runtime, raw env value read or print.',
    'Any real migration apply or DB execution requires a separate exact approval and separate command run.',
  ].join(' ');
}

export function evaluateTaxiMigrationDiffPreflight002F(
  input: TaxiMigrationDiffPreflightInput002F,
): TaxiMigrationDiffPreflightDecision002F {
  const missingGateIds: TaxiMigrationDiffGateId002F[] = [];

  if (!input.schemaAppendApplied002B) missingGateIds.push('schema_002b_append_required');
  if (!input.prismaValidatePassed002D) missingGateIds.push('prisma_validate_002d_fix1_passed_required');
  if (!input.prismaGeneratePassed002E) missingGateIds.push('prisma_generate_002e_passed_required');
  if (!input.ownerApprovedMigrationDiffOnly) missingGateIds.push('migration_diff_owner_approval_required');
  if (input.ownerApprovedMigrationApply) missingGateIds.push('migration_apply_separate_approval_required');
  if (input.ownerApprovedDbExecution) missingGateIds.push('db_execution_blocked_required');
  if (input.ownerApprovedRuntimeRouteMount) missingGateIds.push('runtime_route_mount_blocked_required');
  if (input.ownerApprovedWalletPaymentProvider) missingGateIds.push('wallet_payment_provider_blocked_required');

  return {
    canRunPrismaMigrateDiffNow: missingGateIds.length === 0,
    canApplyPrismaMigrationNow: false,
    canReadDbNow: false,
    canWriteDbNow: false,
    canWriteSchemaNow: false,
    canMountRuntimeRoutesNow: false,
    canEnableWalletPaymentProviderNow: false,
    safeDisabledForRuntime: true,
    missingGateIds: Array.from(new Set(missingGateIds)),
    fakeSuccessBlocked: true,
  };
}
