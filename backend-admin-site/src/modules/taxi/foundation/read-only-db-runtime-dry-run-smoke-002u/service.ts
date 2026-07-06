import {
  TAXI_READ_ONLY_DB_RUNTIME_DRY_RUN_SMOKE_ENDPOINTS_002U,
  TAXI_READ_ONLY_DB_RUNTIME_DRY_RUN_SMOKE_EXPECTED_COUNTS_002U,
  TAXI_READ_ONLY_DB_RUNTIME_DRY_RUN_SMOKE_SAFETY_002U,
  TAXI_READ_ONLY_DB_RUNTIME_DRY_RUN_SMOKE_VERSION_002U,
} from './constants';
import type { TaxiReadOnlyDbRuntimeDryRunSmokeSummary002U } from './types';

export const buildTaxiReadOnlyDbRuntimeDryRunSmokePlan002U = () => ({
  version: TAXI_READ_ONLY_DB_RUNTIME_DRY_RUN_SMOKE_VERSION_002U,
  status: 'protected_read_only_db_runtime_dry_run_smoke_plan',
  expected: TAXI_READ_ONLY_DB_RUNTIME_DRY_RUN_SMOKE_EXPECTED_COUNTS_002U,
  endpoints: TAXI_READ_ONLY_DB_RUNTIME_DRY_RUN_SMOKE_ENDPOINTS_002U,
  safety: TAXI_READ_ONLY_DB_RUNTIME_DRY_RUN_SMOKE_SAFETY_002U,
  nextStep: '002V controlled DB read service activation finalization',
} as const);

export const buildTaxiReadOnlyDbRuntimeDryRunSmokeSummary002U = (
  summary: Omit<TaxiReadOnlyDbRuntimeDryRunSmokeSummary002U, 'version'>,
): TaxiReadOnlyDbRuntimeDryRunSmokeSummary002U => ({
  version: TAXI_READ_ONLY_DB_RUNTIME_DRY_RUN_SMOKE_VERSION_002U,
  ...summary,
});
