export type TaxiDbWriteActivationGateArea002W =
  | 'prior_evidence'
  | 'db_write_activation'
  | 'write_operation'
  | 'admin_guard'
  | 'idempotency'
  | 'wallet_provider_boundary'
  | 'fake_success_boundary';

export type TaxiDbWriteActivationGate002W = Readonly<{
  key: string;
  area: TaxiDbWriteActivationGateArea002W;
  approvedNow: boolean;
  requiredFor002X: boolean;
  note: string;
}>;

export type TaxiDbWriteActivationSnapshot002W = Readonly<{
  version: string;
  status: 'db_write_runtime_activation_approval_boundary_ready';
  readOnlyDbRuntimeFinalized002V: boolean;
  routeCatalogCount: number;
  writeOperationCount: number;
  adminOperationGateCount: number;
  idempotencyGateCount: number;
  dbRuntimeWriteApprovedNow: boolean;
  walletRuntimeApprovedNow: boolean;
  providerRuntimeApprovedNow: boolean;
  paymentRuntimeApprovedNow: boolean;
  fakeSuccessBlocked: boolean;
  gates: readonly TaxiDbWriteActivationGate002W[];
  writeOperationKeys: readonly string[];
}>;
