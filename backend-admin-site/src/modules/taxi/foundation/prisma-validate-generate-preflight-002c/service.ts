import {
  TAXI_PRISMA_PREFLIGHT_COMMAND_DRAFTS_002C,
  TAXI_PRISMA_PREFLIGHT_GATES_002C,
  TAXI_PRISMA_PREFLIGHT_REQUIRED_ENUMS_002C,
  TAXI_PRISMA_PREFLIGHT_REQUIRED_MODELS_002C,
  TAXI_PRISMA_VALIDATE_GENERATE_PREFLIGHT_VERSION_002C,
} from './constants';
import type {
  TaxiPrismaPreflightDecision002C,
  TaxiPrismaPreflightGateId002C,
  TaxiPrismaPreflightInput002C,
  TaxiPrismaPreflightModelCoverage002C,
  TaxiPrismaValidateGeneratePreflightSnapshot002C,
} from './types';

export function getTaxiPrismaPreflightModelCoverage002C(): TaxiPrismaPreflightModelCoverage002C {
  return {
    modelNames: TAXI_PRISMA_PREFLIGHT_REQUIRED_MODELS_002C,
    enumNames: TAXI_PRISMA_PREFLIGHT_REQUIRED_ENUMS_002C,
    expectedModelCount: TAXI_PRISMA_PREFLIGHT_REQUIRED_MODELS_002C.length,
    expectedEnumCount: TAXI_PRISMA_PREFLIGHT_REQUIRED_ENUMS_002C.length,
    schemaReadAllowedForPreflight: true,
    prismaSchemaWriteNow: false,
    prismaValidateExecutedNow: false,
    prismaGenerateExecutedNow: false,
  };
}

export function getTaxiPrismaValidateGeneratePreflightSnapshot002C(): TaxiPrismaValidateGeneratePreflightSnapshot002C {
  return {
    version: TAXI_PRISMA_VALIDATE_GENERATE_PREFLIGHT_VERSION_002C,
    status: 'prisma_validate_generate_preflight_ready_safe_disabled',
    gates: TAXI_PRISMA_PREFLIGHT_GATES_002C,
    commandDrafts: TAXI_PRISMA_PREFLIGHT_COMMAND_DRAFTS_002C,
    coverage: getTaxiPrismaPreflightModelCoverage002C(),
    schemaAppendAlreadyApplied002BRequired: true,
    preflightReportPath: '.data/taxi/002c/prisma-preflight-report.json',
    prismaValidateExecutedNow: false,
    prismaGenerateExecutedNow: false,
    prismaMigrationExecutedNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    runtimeRouteMountedNow: false,
    adminUiRuntimeMountedNow: false,
    walletMutationNow: false,
    paymentNow: false,
    payoutNow: false,
    providerDispatchNow: false,
    fakeSuccessBlocked: true,
  };
}

export function buildTaxiPrismaValidateApprovalRequest002C(): string {
  return [
    'I approve TAXI-BACKEND-FOUNDATION-002C Prisma validate preflight only after 002B schema append passed.',
    'Allowed: read prisma/schema.prisma structurally, verify Taxi model/enum counts, create .data/taxi/002c prisma preflight report, and prepare exact Prisma validate/generate commands.',
    'Not allowed: Prisma generate, Prisma migration, DB read/write, route mount, backend restart, Wallet/payment/payout, provider dispatch, Admin UI runtime, env value read or print.',
    'Any actual Prisma validate/generate execution requires a separate exact approval and separate command run.',
  ].join(' ');
}

export function evaluateTaxiPrismaPreflight002C(input: TaxiPrismaPreflightInput002C): TaxiPrismaPreflightDecision002C {
  const missingGateIds: TaxiPrismaPreflightGateId002C[] = [];

  if (!input.schemaAppendMarkersPresent) missingGateIds.push('schema_002b_append_marker_required');
  if (!input.allTaxiModelsPresentOnce) missingGateIds.push('all_taxi_models_present_once_required');
  if (!input.allTaxiEnumsPresentOnce) missingGateIds.push('all_taxi_enums_present_once_required');
  if (!input.schemaBackupReportPresent) missingGateIds.push('schema_backup_report_required');
  if (!input.ownerApprovedPrismaValidateExecution) missingGateIds.push('prisma_validate_command_review_required');
  if (!input.ownerApprovedPrismaGenerateExecution) missingGateIds.push('prisma_generate_separate_owner_approval_required');
  if (!input.ownerApprovedMigrationExecution) missingGateIds.push('migration_separate_owner_approval_required');
  if (input.ownerApprovedDbSmokeExecution) missingGateIds.push('no_db_execution_required');
  if (input.ownerApprovedRuntimeRouteMount) missingGateIds.push('no_runtime_route_mount_required');
  if (input.ownerApprovedWalletPaymentProvider) missingGateIds.push('no_wallet_payment_provider_required');

  return {
    canRunPrismaValidateNow: false,
    canRunPrismaGenerateNow: false,
    canRunPrismaMigrationNow: false,
    canReadDbNow: false,
    canWriteDbNow: false,
    canMountRuntimeRoutesNow: false,
    canEnableWalletPaymentProviderNow: false,
    safeDisabled: true,
    exactOwnerApprovalRequired: true,
    missingGateIds: Array.from(new Set(missingGateIds)),
    fakeSuccessBlocked: true,
  };
}

export function listTaxiPrismaPreflightCommandDrafts002C(): readonly string[] {
  return TAXI_PRISMA_PREFLIGHT_COMMAND_DRAFTS_002C.map((draft) => draft.command);
}
