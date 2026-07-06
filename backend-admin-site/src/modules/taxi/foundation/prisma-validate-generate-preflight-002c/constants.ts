import {
  TAXI_SCHEMA_REAL_APPEND_REQUIRED_ENUMS_002B,
  TAXI_SCHEMA_REAL_APPEND_REQUIRED_MODELS_002B,
} from '../schema-real-append-002b';
import type {
  TaxiPrismaPreflightCommandDraft002C,
  TaxiPrismaPreflightGate002C,
  TaxiPrismaValidateGeneratePreflightVersion002C,
} from './types';

export const TAXI_PRISMA_VALIDATE_GENERATE_PREFLIGHT_VERSION_002C: TaxiPrismaValidateGeneratePreflightVersion002C =
  'TAXI-BACKEND-FOUNDATION-002C-PRISMA-VALIDATE-GENERATE-PREFLIGHT';

const gate = (
  id: TaxiPrismaPreflightGate002C['id'],
  label: string,
  requiredBeforePrismaValidate: boolean,
  requiredBeforePrismaGenerate: boolean,
): TaxiPrismaPreflightGate002C => ({
  id,
  label,
  requiredBeforePrismaValidate,
  requiredBeforePrismaGenerate,
  passedNow: false,
  exactOwnerApprovalRequired: true,
  fakePassBlocked: true,
});

export const TAXI_PRISMA_PREFLIGHT_GATES_002C: readonly TaxiPrismaPreflightGate002C[] = [
  gate('schema_002b_append_marker_required', '002B Taxi schema append markers must be present before Prisma validation', true, true),
  gate('all_taxi_models_present_once_required', 'All 20 Taxi model declarations must be present exactly once', true, true),
  gate('all_taxi_enums_present_once_required', 'All 17 Taxi enum declarations must be present exactly once', true, true),
  gate('schema_backup_report_required', '002B schema backup and append report must exist before any Prisma CLI step', true, true),
  gate('prisma_validate_command_review_required', 'Prisma validate command must be reviewed before execution', true, true),
  gate('prisma_generate_command_review_required', 'Prisma generate command must be reviewed before execution', false, true),
  gate('no_migration_execution_required', 'Migration execution must remain blocked during 002C', true, true),
  gate('no_db_execution_required', 'DB read/write and runtime smoke must remain blocked during 002C', true, true),
  gate('no_runtime_route_mount_required', 'Taxi runtime routes must remain unmounted during 002C', true, true),
  gate('no_wallet_payment_provider_required', 'Wallet/payment/provider execution remains blocked during 002C', true, true),
  gate('prisma_generate_separate_owner_approval_required', 'Prisma generate needs separate owner approval after validate preflight', false, true),
  gate('migration_separate_owner_approval_required', 'Migration needs separate owner approval after generate review', false, true),
];

const commandDraft = (
  kind: TaxiPrismaPreflightCommandDraft002C['kind'],
  command: string,
  readsEnvPotentially: boolean,
): TaxiPrismaPreflightCommandDraft002C => ({
  kind,
  command,
  allowedToExecuteNow: false,
  readsEnvPotentially,
  touchesDb: false,
  writesDb: false,
  writesSchema: false,
  runsMigration: false,
  requiresSeparateApproval: true,
  fakeExecutionBlocked: true,
});

export const TAXI_PRISMA_PREFLIGHT_COMMAND_DRAFTS_002C: readonly TaxiPrismaPreflightCommandDraft002C[] = [
  commandDraft('prisma_validate', 'node .\\node_modules\\prisma\\build\\index.js validate --schema prisma/schema.prisma', true),
  commandDraft('prisma_generate', 'node .\\node_modules\\prisma\\build\\index.js generate --schema prisma/schema.prisma', true),
  commandDraft('prisma_format_check', 'node .\\node_modules\\prisma\\build\\index.js format --schema prisma/schema.prisma --check', true),
  commandDraft('typescript_check_after_generate', 'node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json', false),
];

export const TAXI_PRISMA_PREFLIGHT_REQUIRED_MODELS_002C = TAXI_SCHEMA_REAL_APPEND_REQUIRED_MODELS_002B;
export const TAXI_PRISMA_PREFLIGHT_REQUIRED_ENUMS_002C = TAXI_SCHEMA_REAL_APPEND_REQUIRED_ENUMS_002B;
