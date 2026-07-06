import { PrismaClient } from '@prisma/client';
import {
  TAXI_READ_ONLY_DB_DRY_RUN_COUNTS_002T,
  TAXI_READ_ONLY_DB_DRY_RUN_DELEGATES_002T,
  TAXI_READ_ONLY_DB_DRY_RUN_EXECUTION_SAFETY_002T,
  TAXI_READ_ONLY_DB_DRY_RUN_PATCH_SAFETY_002T,
  TAXI_READ_ONLY_DB_DRY_RUN_ROUTES_002T,
  TAXI_READ_ONLY_DB_RUNTIME_DRY_RUN_VERSION_002T,
} from './constants';
import type {
  TaxiReadOnlyDbDelegateKey002T,
  TaxiReadOnlyDbDryRunDelegateResult002T,
  TaxiReadOnlyDbDryRunExecution002T,
  TaxiReadOnlyDbDryRunPlan002T,
} from './types';

type CountableDelegate002T = Readonly<{
  count: () => Promise<number>;
}>;

let taxiReadOnlyDbPrismaClient002T: PrismaClient | null = null;

export const getTaxiReadOnlyDbPrismaClient002T = (): PrismaClient => {
  if (!taxiReadOnlyDbPrismaClient002T) {
    taxiReadOnlyDbPrismaClient002T = new PrismaClient();
  }
  return taxiReadOnlyDbPrismaClient002T;
};

export const buildTaxiReadOnlyDbDryRunPlan002T = (): TaxiReadOnlyDbDryRunPlan002T => ({
  version: TAXI_READ_ONLY_DB_RUNTIME_DRY_RUN_VERSION_002T,
  status: 'read_only_db_runtime_dry_run_route_patched',
  routePatchApprovedNow: true,
  dbReadExecutedByPatchNow: false,
  dbWriteApprovedNow: false,
  ...TAXI_READ_ONLY_DB_DRY_RUN_COUNTS_002T,
  routes: TAXI_READ_ONLY_DB_DRY_RUN_ROUTES_002T,
  nextStep: '002U protected read-only DB runtime dry-run smoke',
});

const countDelegate002T = async (
  prisma: PrismaClient,
  delegate: TaxiReadOnlyDbDelegateKey002T,
): Promise<TaxiReadOnlyDbDryRunDelegateResult002T> => {
  try {
    const countable = (prisma as unknown as Record<TaxiReadOnlyDbDelegateKey002T, CountableDelegate002T>)[delegate];
    const count = await countable.count();
    return {
      delegate,
      readOnlyOperation: 'count',
      countReadable: true,
      count,
      error: null,
    };
  } catch (error) {
    return {
      delegate,
      readOnlyOperation: 'count',
      countReadable: false,
      count: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

export const runTaxiReadOnlyDbRuntimeDryRun002T = async (
  prisma: PrismaClient = getTaxiReadOnlyDbPrismaClient002T(),
): Promise<TaxiReadOnlyDbDryRunExecution002T> => {
  const delegateResults = await Promise.all(
    TAXI_READ_ONLY_DB_DRY_RUN_DELEGATES_002T.map((delegate) => countDelegate002T(prisma, delegate)),
  );
  const failedDelegateReads = delegateResults.filter((result) => !result.countReadable);

  return {
    version: TAXI_READ_ONLY_DB_RUNTIME_DRY_RUN_VERSION_002T,
    status: failedDelegateReads.length === 0 ? 'passed' : 'failed',
    dbReadExecuted: true,
    dbWriteExecuted: false,
    delegateCount: TAXI_READ_ONLY_DB_DRY_RUN_COUNTS_002T.delegateCount,
    passedDelegateReadCount: delegateResults.length - failedDelegateReads.length,
    failedDelegateReads,
    delegateResults,
    safety: TAXI_READ_ONLY_DB_DRY_RUN_EXECUTION_SAFETY_002T,
  };
};

export const buildTaxiReadOnlyDbDryRunPatchSafety002T = () => TAXI_READ_ONLY_DB_DRY_RUN_PATCH_SAFETY_002T;
