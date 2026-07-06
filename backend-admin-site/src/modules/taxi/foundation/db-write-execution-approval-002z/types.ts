export type TaxiDbWriteExecutionApprovalArea002Z =
  | 'prior_evidence'
  | 'exact_owner_approval'
  | 'write_operation'
  | 'idempotency'
  | 'admin_guard'
  | 'rollback_audit'
  | 'wallet_provider_boundary'
  | 'fake_success_boundary';

export type TaxiDbWriteExecutionApprovalGate002Z = Readonly<{
  key: string;
  area: TaxiDbWriteExecutionApprovalArea002Z;
  approvedNow: boolean;
  requiredFor003A: boolean;
  note: string;
}>;

export type TaxiDbWriteExecutionApprovalSnapshot002Z = Readonly<{
  version: string;
  status: 'exact_db_write_execution_approval_boundary_ready';
  writeGateSmokePassed002Y: boolean;
  routeCatalogCount: number;
  writeOperationCount: number;
  adminOperationGateCount: number;
  idempotencyGateCount: number;
  dbRuntimeWriteExecutionApprovedNow: boolean;
  walletRuntimeApprovedNow: boolean;
  providerRuntimeApprovedNow: boolean;
  paymentRuntimeApprovedNow: boolean;
  fakeSuccessBlocked: boolean;
  gates: readonly TaxiDbWriteExecutionApprovalGate002Z[];
  writeOperationKeys: readonly string[];
}>;
