import type { TaxiControlledDbWriteExecutionSmokeOperation003A, TaxiControlledDbWriteExecutionSmokeSnapshot003A } from './types';

export const TAXI_CONTROLLED_DB_WRITE_EXECUTION_SMOKE_VERSION_003A = 'TAXI-BACKEND-FOUNDATION-003A-CONTROLLED-DB-WRITE-EXECUTION-SMOKE' as const;

export const taxiControlledDbWriteExecutionSmokeOperations003A = [
  { key: 'audit_log_create_smoke_record', model: 'TaxiAuditLog', action: 'create', isolated: true, cleanupRequired: true },
  { key: 'idempotency_record_create_smoke_record', model: 'TaxiIdempotencyRecord', action: 'create', isolated: true, cleanupRequired: true },
  { key: 'idempotency_record_update_to_completed', model: 'TaxiIdempotencyRecord', action: 'update', isolated: true, cleanupRequired: true },
  { key: 'pre_cleanup_count_verification', model: 'TaxiAuditLog', action: 'count', isolated: true, cleanupRequired: true },
  { key: 'audit_log_delete_smoke_record', model: 'TaxiAuditLog', action: 'deleteMany', isolated: true, cleanupRequired: true },
  { key: 'idempotency_record_delete_smoke_record', model: 'TaxiIdempotencyRecord', action: 'deleteMany', isolated: true, cleanupRequired: true },
  { key: 'post_cleanup_zero_leftover_verification', model: 'TaxiIdempotencyRecord', action: 'count', isolated: true, cleanupRequired: true },
] as const satisfies readonly TaxiControlledDbWriteExecutionSmokeOperation003A[];

export const taxiControlledDbWriteExecutionSmokeSnapshot003A = {
  version: TAXI_CONTROLLED_DB_WRITE_EXECUTION_SMOKE_VERSION_003A,
  status: 'controlled_db_write_execution_smoke_ready',
  exactApprovalRequired: true,
  dbWriteExecutionApprovedByThisPackage: true,
  walletRuntimeApprovedNow: false,
  providerRuntimeApprovedNow: false,
  paymentRuntimeApprovedNow: false,
  payoutRuntimeApprovedNow: false,
  rollbackSafeIsolatedRecordsOnly: true,
  operations: taxiControlledDbWriteExecutionSmokeOperations003A,
} as const satisfies TaxiControlledDbWriteExecutionSmokeSnapshot003A;
