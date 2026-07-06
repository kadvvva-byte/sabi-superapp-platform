export type TaxiControlledDbWriteExecutionSmokeOperation003A = Readonly<{
  key: string;
  model: 'TaxiAuditLog' | 'TaxiIdempotencyRecord';
  action: 'create' | 'update' | 'deleteMany' | 'count';
  isolated: boolean;
  cleanupRequired: boolean;
}>;

export type TaxiControlledDbWriteExecutionSmokeSnapshot003A = Readonly<{
  version: string;
  status: 'controlled_db_write_execution_smoke_ready';
  exactApprovalRequired: true;
  dbWriteExecutionApprovedByThisPackage: true;
  walletRuntimeApprovedNow: false;
  providerRuntimeApprovedNow: false;
  paymentRuntimeApprovedNow: false;
  payoutRuntimeApprovedNow: false;
  rollbackSafeIsolatedRecordsOnly: true;
  operations: readonly TaxiControlledDbWriteExecutionSmokeOperation003A[];
}>;
