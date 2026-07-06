export type TaxiServiceActivationGateKind002R =
  | 'runtime_smoke'
  | 'route_catalog'
  | 'hardening_header'
  | 'db_read_gate'
  | 'db_write_gate'
  | 'admin_gate'
  | 'idempotency_gate'
  | 'wallet_boundary'
  | 'provider_boundary'
  | 'audit_gate'
  | 'rollback_gate'
  | 'fake_success_blocker';

export type TaxiServiceActivationGate002R = Readonly<{
  key: string;
  kind: TaxiServiceActivationGateKind002R;
  title: string;
  requiredBeforeActivation: boolean;
  passedNow: boolean;
  evidence: string;
}>;

export type TaxiServiceActivationApprovalSafety002R = Readonly<{
  envValueReadByModule: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  prismaValidateExecuted: false;
  prismaGenerateExecuted: false;
  prismaMigrationExecuted: false;
  routeRuntimeMountedAlreadyFrom002N: true;
  walletMutation: false;
  payment: false;
  payout: false;
  providerDispatch: false;
  fakeSuccessBlocked: true;
}>;

export type TaxiServiceActivationApproval002R = Readonly<{
  version: string;
  status: 'approval_required';
  routeCatalogCount: 58;
  hardeningHeaderCount: 10;
  protectedPolicyCount: 22;
  controllerGroupCount: 12;
  readOperationGateCount: 20;
  writeOperationGateCount: 44;
  adminOperationGateCount: 24;
  idempotencyGateCount: 44;
  serviceActivationGateCount: number;
  requiresSeparateExactOwnerApproval: true;
  dbRuntimeReadApprovedNow: false;
  dbRuntimeWriteApprovedNow: false;
  walletRuntimeApprovedNow: false;
  providerRuntimeApprovedNow: false;
  paymentRuntimeApprovedNow: false;
  gates: readonly TaxiServiceActivationGate002R[];
  safety: TaxiServiceActivationApprovalSafety002R;
  nextStep: '002S controlled DB runtime activation dry-run approval';
}>;

export type TaxiServiceActivationApprovalEvaluation002R = Readonly<{
  version: string;
  readyForNextApprovalPack: boolean;
  allPriorRuntimeEvidenceRequired: boolean;
  allRuntimeGatesStillSafeDisabled: boolean;
  gateCount: number;
  blockingGateKeys: readonly string[];
  nextStep: string;
}>;
