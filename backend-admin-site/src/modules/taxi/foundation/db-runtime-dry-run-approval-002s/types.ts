export type TaxiDbRuntimeDryRunGateKind002S =
  | 'prior_runtime_evidence'
  | 'db_read_dry_run_gate'
  | 'db_write_blocker'
  | 'admin_gate'
  | 'idempotency_gate'
  | 'audit_gate'
  | 'rollback_gate'
  | 'wallet_boundary'
  | 'provider_boundary'
  | 'fake_success_blocker';

export type TaxiDbRuntimeDryRunGate002S = Readonly<{
  key: string;
  kind: TaxiDbRuntimeDryRunGateKind002S;
  title: string;
  passedNow: boolean;
  requiredBeforeNextStep: boolean;
  evidence: string;
}>;

export type TaxiDbRuntimeDryRunApprovalSafety002S = Readonly<{
  envValueReadByModule: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  prismaValidateExecuted: false;
  prismaGenerateExecuted: false;
  prismaMigrationExecuted: false;
  routeRuntimeMountedAlreadyFrom002N: true;
  appRuntimeMountedAlreadyFrom002N: true;
  adminUiRuntimeMounted: false;
  walletMutation: false;
  payment: false;
  payout: false;
  providerDispatch: false;
  fakeSuccessBlocked: true;
}>;

export type TaxiDbRuntimeDryRunApproval002S = Readonly<{
  version: string;
  status: 'dry_run_approval_required';
  routeCatalogCount: 58;
  hardeningHeaderCount: 10;
  protectedPolicyCount: 22;
  expectedTaxiTableCount: 20;
  dbReadOperationDryRunCount: 20;
  dbWriteOperationDryRunBlockedCount: 44;
  adminOperationGateCount: 24;
  idempotencyGateCount: 44;
  dryRunGateCount: number;
  requiresSeparateExactOwnerApproval: true;
  dbRuntimeReadDryRunApprovedNow: false;
  dbRuntimeWriteApprovedNow: false;
  walletRuntimeApprovedNow: false;
  providerRuntimeApprovedNow: false;
  paymentRuntimeApprovedNow: false;
  gates: readonly TaxiDbRuntimeDryRunGate002S[];
  safety: TaxiDbRuntimeDryRunApprovalSafety002S;
  nextStep: '002T controlled read-only DB runtime dry-run route patch';
}>;

export type TaxiDbRuntimeDryRunApprovalEvaluation002S = Readonly<{
  version: string;
  approvalPackReady: boolean;
  safeToPrepareReadOnlyRuntimePatch: boolean;
  dbRuntimeStillDisabled: boolean;
  walletProviderPaymentStillDisabled: boolean;
  gateCount: number;
  blockingGateKeys: readonly string[];
  nextStep: string;
}>;
