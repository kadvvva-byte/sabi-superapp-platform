import type {
  TaxiMigrationDiffArtifact002F,
  TaxiMigrationDiffCommandDraft002F,
  TaxiMigrationDiffGateId002F,
} from './types';

export const TAXI_MIGRATION_DIFF_PREFLIGHT_VERSION_002F =
  'TAXI-BACKEND-FOUNDATION-002F-MIGRATION-DIFF-PREFLIGHT' as const;

export const TAXI_MIGRATION_DIFF_REQUIRED_MODEL_COUNT_002F = 20 as const;
export const TAXI_MIGRATION_DIFF_REQUIRED_ENUM_COUNT_002F = 17 as const;

export const TAXI_MIGRATION_DIFF_GATES_002F: readonly TaxiMigrationDiffGateId002F[] = [
  'schema_002b_append_required',
  'prisma_validate_002d_fix1_passed_required',
  'prisma_generate_002e_passed_required',
  'migration_diff_owner_approval_required',
  'migration_apply_separate_approval_required',
  'db_execution_blocked_required',
  'runtime_route_mount_blocked_required',
  'wallet_payment_provider_blocked_required',
];

export const TAXI_MIGRATION_DIFF_COMMAND_DRAFTS_002F: readonly TaxiMigrationDiffCommandDraft002F[] = [
  {
    id: 'prisma_migrate_diff_from_empty_to_schema_datamodel_002f',
    command: 'node .\\node_modules\\prisma\\build\\index.js migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script',
    allowedNow: true,
    requiresSeparateApproval: true,
    writesDb: false,
    writesSchema: false,
    writesMigrationFolder: false,
    safetyNote: 'Creates a local SQL diff candidate only; it must not apply the migration and must not connect to DB.',
  },
  {
    id: 'migration_apply_blocked_002f',
    command: 'node .\\node_modules\\prisma\\build\\index.js migrate dev --name taxi_foundation',
    allowedNow: false,
    requiresSeparateApproval: true,
    writesDb: true,
    writesSchema: false,
    writesMigrationFolder: true,
    safetyNote: 'Migration apply is blocked until a later exact migration-only approval.',
  },
  {
    id: 'typescript_check_after_diff_002f',
    command: 'node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json',
    allowedNow: true,
    requiresSeparateApproval: false,
    writesDb: false,
    writesSchema: false,
    writesMigrationFolder: false,
    safetyNote: 'Compile verification only; no runtime mount and no provider dispatch.',
  },
];

export const TAXI_MIGRATION_DIFF_ARTIFACTS_002F: readonly TaxiMigrationDiffArtifact002F[] = [
  {
    id: 'migration_diff_report_002f',
    path: '.data/taxi/002f/migration-diff-preflight-report.json',
    required: true,
    writeAllowedNow: true,
    safetyNote: 'Local report only; no DB write.',
  },
  {
    id: 'migration_diff_sql_candidate_002f',
    path: '.data/taxi/002f/prisma-migrate-diff-from-empty.sql',
    required: true,
    writeAllowedNow: true,
    safetyNote: 'SQL candidate artifact only; not a migration folder and not applied.',
  },
  {
    id: 'migration_apply_folder_002f',
    path: 'prisma/migrations/*taxi*',
    required: false,
    writeAllowedNow: false,
    safetyNote: 'Migration folder creation is blocked for 002F.',
  },
];
