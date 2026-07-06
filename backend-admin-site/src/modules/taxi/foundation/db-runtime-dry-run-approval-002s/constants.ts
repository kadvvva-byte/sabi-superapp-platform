import type {
  TaxiDbRuntimeDryRunApprovalSafety002S,
  TaxiDbRuntimeDryRunGate002S,
} from './types';

export const TAXI_DB_RUNTIME_DRY_RUN_APPROVAL_VERSION_002S =
  'TAXI-BACKEND-FOUNDATION-002S-DB-RUNTIME-ACTIVATION-DRY-RUN-APPROVAL' as const;

export const TAXI_DB_RUNTIME_DRY_RUN_COUNTS_002S = {
  routeCatalogCount: 58,
  hardeningHeaderCount: 10,
  protectedPolicyCount: 22,
  expectedTaxiTableCount: 20,
  dbReadOperationDryRunCount: 20,
  dbWriteOperationDryRunBlockedCount: 44,
  adminOperationGateCount: 24,
  idempotencyGateCount: 44,
} as const;

export const TAXI_DB_RUNTIME_DRY_RUN_APPROVAL_SAFETY_002S: TaxiDbRuntimeDryRunApprovalSafety002S = {
  envValueReadByModule: false,
  dbReadExecuted: false,
  dbWriteExecuted: false,
  prismaValidateExecuted: false,
  prismaGenerateExecuted: false,
  prismaMigrationExecuted: false,
  routeRuntimeMountedAlreadyFrom002N: true,
  appRuntimeMountedAlreadyFrom002N: true,
  adminUiRuntimeMounted: false,
  walletMutation: false,
  payment: false,
  payout: false,
  providerDispatch: false,
  fakeSuccessBlocked: true,
} as const;

const gate = (
  key: string,
  kind: TaxiDbRuntimeDryRunGate002S['kind'],
  title: string,
  evidence: string,
  passedNow = false,
): TaxiDbRuntimeDryRunGate002S => ({
  key,
  kind,
  title,
  passedNow,
  requiredBeforeNextStep: true,
  evidence,
});

export const TAXI_DB_RUNTIME_DRY_RUN_GATES_002S = [
  gate('service.activation.approval.002r.passed', 'prior_runtime_evidence', '002R service activation approval must be passed', '.data/taxi/002r/service-activation-approval-report.json', true),
  gate('hardening.smoke.002q.passed', 'prior_runtime_evidence', '002Q hardened runtime smoke must remain passed', '.data/taxi/002q/protected-runtime-hardening-smoke-report.json', true),
  gate('db.verify.002i.passed', 'prior_runtime_evidence', '002I post-migration DB verification must be passed', '.data/taxi/002i/post-migration-db-verify-report.json', true),
  gate('route.catalog.58.ready', 'prior_runtime_evidence', 'Runtime route catalog must stay at 58 routes', '002Q routeCatalogCount', true),
  gate('db.read.dry.run.requires.next.exact.approval', 'db_read_dry_run_gate', 'Read-only DB runtime dry-run requires separate exact owner approval', 'next 002T template'),
  gate('db.read.only.no.mutation', 'db_read_dry_run_gate', 'DB dry-run must use count/find read-only operations only', 'read-only dry-run plan'),
  gate('db.write.activation.blocked', 'db_write_blocker', 'DB write runtime activation remains blocked', 'dbRuntimeWriteApprovedNow false'),
  gate('trip.create.write.blocked', 'db_write_blocker', 'Trip creation writes stay blocked until later exact approval', 'future stage only'),
  gate('payment.hold.write.blocked', 'db_write_blocker', 'Payment hold writes stay blocked', 'Wallet/payment separate'),
  gate('settlement.write.blocked', 'db_write_blocker', 'Settlement writes stay blocked', 'payout separate'),
  gate('admin.write.requires.admin.token', 'admin_gate', 'Admin write routes still require admin token', '002Q admin write 403 unauth'),
  gate('admin.diagnostics.no.raw.token', 'admin_gate', 'Admin diagnostics must never print raw token', 'protected diagnostics'),
  gate('idempotency.required.44.write.routes', 'idempotency_gate', '44 write routes require idempotency before activation', '002L/002R counts'),
  gate('audit.before.write.required', 'audit_gate', 'Audit logging plan required before write activation', 'future write stage'),
  gate('rollback.before.write.required', 'rollback_gate', 'Rollback plan required before write activation', 'future write stage'),
  gate('wallet.mutation.blocked', 'wallet_boundary', 'Wallet mutation remains blocked', 'walletRuntimeApprovedNow false'),
  gate('payment.provider.blocked', 'provider_boundary', 'Payment provider dispatch remains blocked', 'providerRuntimeApprovedNow false'),
  gate('payout.provider.blocked', 'provider_boundary', 'Payout provider dispatch remains blocked', 'payout false'),
  gate('fake.success.blocked', 'fake_success_blocker', 'Fake success remains blocked', '002Q fakeSuccessBlocked true'),
  gate('production.launch.not.claimed', 'fake_success_blocker', 'Production readiness is not claimed from dry-run approval', 'honest readiness'),
] as const satisfies readonly TaxiDbRuntimeDryRunGate002S[];
