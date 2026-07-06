import type { TaxiServiceActivationApprovalSafety002R, TaxiServiceActivationGate002R } from './types';

export const TAXI_SERVICE_ACTIVATION_APPROVAL_VERSION_002R = 'TAXI-BACKEND-FOUNDATION-002R-SERVICE-ACTIVATION-APPROVAL' as const;

export const TAXI_SERVICE_ACTIVATION_COUNTS_002R = {
  routeCatalogCount: 58,
  hardeningHeaderCount: 10,
  protectedPolicyCount: 22,
  controllerGroupCount: 12,
  readOperationGateCount: 20,
  writeOperationGateCount: 44,
  adminOperationGateCount: 24,
  idempotencyGateCount: 44,
} as const;

export const TAXI_SERVICE_ACTIVATION_APPROVAL_SAFETY_002R: TaxiServiceActivationApprovalSafety002R = {
  envValueReadByModule: false,
  dbReadExecuted: false,
  dbWriteExecuted: false,
  prismaValidateExecuted: false,
  prismaGenerateExecuted: false,
  prismaMigrationExecuted: false,
  routeRuntimeMountedAlreadyFrom002N: true,
  walletMutation: false,
  payment: false,
  payout: false,
  providerDispatch: false,
  fakeSuccessBlocked: true,
} as const;

const gate = (key: string, kind: TaxiServiceActivationGate002R['kind'], title: string, evidence: string): TaxiServiceActivationGate002R => ({
  key,
  kind,
  title,
  requiredBeforeActivation: true,
  passedNow: false,
  evidence,
});

export const TAXI_SERVICE_ACTIVATION_GATES_002R = [
  gate('runtime.smoke.002q.passed', 'runtime_smoke', '002Q hardened runtime smoke must be passed', '.data/taxi/002q/protected-runtime-hardening-smoke-report.json'),
  gate('route.catalog.58.ready', 'route_catalog', 'Mounted route catalog must expose 58 routes', 'GET /api/taxi/002n/routes'),
  gate('readiness.headers.10.ready', 'hardening_header', 'All 10 hardening headers must be visible at runtime', '002Q allHardeningHeadersPassed'),
  gate('protected.policies.22.ready', 'hardening_header', 'All 22 protected runtime policies must be exposed', '002P/002Q protected policy count'),
  gate('db.read.owner.approval.required', 'db_read_gate', 'DB read runtime needs separate exact owner approval', '002S approval required'),
  gate('db.write.owner.approval.required', 'db_write_gate', 'DB write runtime needs separate exact owner approval', 'future stage only'),
  gate('db.write.dangerous.operations.blocked', 'db_write_gate', 'Trip/payment/settlement writes stay blocked until dedicated stage', 'safe-disabled boundary'),
  gate('admin.token.required', 'admin_gate', 'Admin operations require protected admin gate', 'admin unauth smoke 403'),
  gate('admin.raw.token.never.printed', 'admin_gate', 'Admin token must never be printed in diagnostics', 'protected diagnostics boundary'),
  gate('idempotency.required.for.write.routes', 'idempotency_gate', 'All 44 write routes require idempotency gate', '002L route contracts'),
  gate('wallet.boundary.blocked', 'wallet_boundary', 'Wallet mutation remains blocked', 'Wallet runtime approved false'),
  gate('payment.boundary.blocked', 'wallet_boundary', 'Payment runtime remains blocked', 'payment runtime approved false'),
  gate('payout.boundary.blocked', 'wallet_boundary', 'Payout runtime remains blocked', 'payout runtime approved false'),
  gate('provider.dispatch.blocked', 'provider_boundary', 'Provider dispatch remains blocked', 'provider dispatch false'),
  gate('provider.readiness.only', 'provider_boundary', 'Provider routes are readiness-only', 'provider readiness contract'),
  gate('audit.log.plan.required', 'audit_gate', 'Audit event plan required before DB write activation', 'future audit stage'),
  gate('rollback.plan.required', 'rollback_gate', 'Rollback plan required before real writes', '002R handoff'),
  gate('fake.success.blocked', 'fake_success_blocker', 'Fake success must remain blocked', '002Q fakeSuccessBlocked true'),
  gate('safe.disabled.write.409', 'runtime_smoke', 'Safe-disabled write routes must return 409 until activation', '002Q POST quote smoke'),
  gate('admin.write.403', 'admin_gate', 'Admin write routes must reject unauthenticated callers', '002Q admin write smoke'),
  gate('prisma.no.execution.now', 'db_read_gate', 'No Prisma execution in approval pack', '002R source-only'),
  gate('migration.no.execution.now', 'db_write_gate', 'No migration execution in approval pack', '002R source-only'),
  gate('route.mount.no.new.mount', 'route_catalog', 'No duplicate app route mount', 'src/app.ts single createTaxiFoundation002NRouter'),
  gate('env.value.no.read', 'runtime_smoke', 'No env value read or print', 'approval safety'),
  gate('db.read.dry.run.separate', 'db_read_gate', 'DB read dry-run is separate next step', '002S'),
  gate('db.write.activation.separate', 'db_write_gate', 'DB write activation is separate future step', 'post-002S'),
  gate('wallet.provider.integration.separate', 'provider_boundary', 'Wallet/provider integration is separate future step', 'provider safe-disabled'),
  gate('production.launch.not.claimed', 'fake_success_blocker', 'Do not claim production launch readiness from approval pack', 'honest readiness'),
] as const satisfies readonly TaxiServiceActivationGate002R[];
