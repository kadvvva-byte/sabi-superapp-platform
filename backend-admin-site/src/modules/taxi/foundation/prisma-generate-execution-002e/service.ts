import {
  TAXI_PRISMA_GENERATE_COMMAND_DRAFTS_002E,
  TAXI_PRISMA_GENERATE_EXECUTION_VERSION_002E,
  TAXI_PRISMA_GENERATE_GATES_002E,
  TAXI_PRISMA_GENERATE_REQUIRED_ENUM_COUNT_002E,
  TAXI_PRISMA_GENERATE_REQUIRED_MODEL_COUNT_002E,
} from './constants';
import type {
  TaxiPrismaGenerateExecutionDecision002E,
  TaxiPrismaGenerateExecutionInput002E,
  TaxiPrismaGenerateExecutionSnapshot002E,
  TaxiPrismaGenerateGateId002E,
} from './types';

export function getTaxiPrismaGenerateExecutionSnapshot002E(): TaxiPrismaGenerateExecutionSnapshot002E {
  return {
    version: TAXI_PRISMA_GENERATE_EXECUTION_VERSION_002E,
    status: 'prisma_generate_execution_ready_safe_disabled',
    prerequisiteValidateReportPath: '.data/taxi/002d-fix1/prisma-validate-execution-fix1-report.json',
    generateReportPath: '.data/taxi/002e/prisma-generate-execution-report.json',
    requiredTaxiModelCount: TAXI_PRISMA_GENERATE_REQUIRED_MODEL_COUNT_002E,
    requiredTaxiEnumCount: TAXI_PRISMA_GENERATE_REQUIRED_ENUM_COUNT_002E,
    commandDrafts: TAXI_PRISMA_GENERATE_COMMAND_DRAFTS_002E,
    gates: TAXI_PRISMA_GENERATE_GATES_002E,
    prismaGenerateExecutedNow: false,
    prismaMigrationExecutedNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    runtimeRouteMountedNow: false,
    walletMutationNow: false,
    paymentNow: false,
    payoutNow: false,
    providerDispatchNow: false,
    fakeSuccessBlocked: true,
  };
}

export function buildTaxiPrismaGenerateApprovalRequest002E(): string {
  return [
    'I approve TAXI-BACKEND-FOUNDATION-002E Prisma generate only after 002D-FIX1 Prisma validate passed.',
    'Allowed: run Prisma generate for prisma/schema.prisma, write generated Prisma Client artifacts, create .data/taxi/002e generate report, and run TypeScript check separately.',
    'Not allowed: Prisma migration, DB read/write, route mount, backend restart, Wallet/payment/payout, provider dispatch, Admin UI runtime, raw env value read or print.',
    'Any migration or DB execution requires a separate exact approval and separate command run.',
  ].join(' ');
}

export function evaluateTaxiPrismaGenerateExecution002E(
  input: TaxiPrismaGenerateExecutionInput002E,
): TaxiPrismaGenerateExecutionDecision002E {
  const missingGateIds: TaxiPrismaGenerateGateId002E[] = [];

  if (!input.schemaAppendApplied002B) missingGateIds.push('schema_002b_append_required');
  if (!input.prismaValidatePassed002D) missingGateIds.push('prisma_validate_002d_fix1_passed_required');
  if (!input.ownerApprovedGenerateOnly) missingGateIds.push('generate_only_owner_approval_required');
  if (input.ownerApprovedMigrationExecution) missingGateIds.push('migration_separate_approval_required');
  if (input.ownerApprovedDbExecution) missingGateIds.push('db_execution_blocked_required');
  if (input.ownerApprovedRuntimeRouteMount) missingGateIds.push('runtime_route_mount_blocked_required');
  if (input.ownerApprovedWalletPaymentProvider) missingGateIds.push('wallet_payment_provider_blocked_required');

  return {
    canRunPrismaGenerateNow: missingGateIds.length === 0,
    canRunPrismaMigrationNow: false,
    canReadDbNow: false,
    canWriteDbNow: false,
    canMountRuntimeRoutesNow: false,
    canEnableWalletPaymentProviderNow: false,
    safeDisabledForRuntime: true,
    missingGateIds: Array.from(new Set(missingGateIds)),
    fakeSuccessBlocked: true,
  };
}
