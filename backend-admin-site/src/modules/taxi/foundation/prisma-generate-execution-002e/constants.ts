import type { TaxiPrismaGenerateCommandDraft002E, TaxiPrismaGenerateGateId002E } from './types';

export const TAXI_PRISMA_GENERATE_EXECUTION_VERSION_002E =
  'TAXI-BACKEND-FOUNDATION-002E-PRISMA-GENERATE-EXECUTION' as const;

export const TAXI_PRISMA_GENERATE_REQUIRED_MODEL_COUNT_002E = 20 as const;
export const TAXI_PRISMA_GENERATE_REQUIRED_ENUM_COUNT_002E = 17 as const;

export const TAXI_PRISMA_GENERATE_GATES_002E: readonly TaxiPrismaGenerateGateId002E[] = [
  'schema_002b_append_required',
  'prisma_validate_002d_fix1_passed_required',
  'generate_only_owner_approval_required',
  'migration_separate_approval_required',
  'db_execution_blocked_required',
  'runtime_route_mount_blocked_required',
  'wallet_payment_provider_blocked_required',
];

export const TAXI_PRISMA_GENERATE_COMMAND_DRAFTS_002E: readonly TaxiPrismaGenerateCommandDraft002E[] = [
  {
    id: 'prisma_generate_only_002e',
    command: 'node .\\node_modules\\prisma\\build\\index.js generate --schema prisma/schema.prisma',
    allowedNow: true,
    requiresSeparateApproval: true,
    safetyNote: 'Generate Prisma Client only after 002D-FIX1 validate passed; no migration and no DB execution.',
  },
  {
    id: 'typescript_check_after_generate_002e',
    command: 'node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json',
    allowedNow: true,
    requiresSeparateApproval: false,
    safetyNote: 'Compile verification only; no runtime mount and no provider dispatch.',
  },
  {
    id: 'migration_blocked_002e',
    command: 'node .\\node_modules\\prisma\\build\\index.js migrate dev --name taxi_foundation',
    allowedNow: false,
    requiresSeparateApproval: true,
    safetyNote: 'Migration is blocked until a later exact migration-only approval.',
  },
];
