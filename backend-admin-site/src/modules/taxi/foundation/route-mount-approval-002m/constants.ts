import type { TaxiRouteMountApprovalGate002M, TaxiRouteMountApprovalSafety002M, TaxiRouteMountStep002M } from './types';

export const TAXI_ROUTE_MOUNT_APPROVAL_VERSION_002M = 'TAXI-BACKEND-FOUNDATION-002M-CONTROLLED-ROUTE-MOUNT-APPROVAL' as const;

export const TAXI_ROUTE_MOUNT_BASE_PATH_002M = '/api/taxi' as const;

export const TAXI_ROUTE_MOUNT_TARGET_APP_FILE_002M = 'src/app.ts' as const;

export const TAXI_ROUTE_MOUNT_APPROVAL_GATES_002M: readonly TaxiRouteMountApprovalGate002M[] = [
  { key: 'route_controller_002l_passed', label: '002L route/controller source layer passed', required: true, expectedPassedBeforeMount: true, evidenceKey: '002l.routeControllerPassed' },
  { key: 'runtime_service_002k_passed', label: '002K runtime service source layer passed', required: true, expectedPassedBeforeMount: true, evidenceKey: '002k.runtimeServicePassed' },
  { key: 'post_migration_db_verify_002i_passed', label: '002I post-migration DB read-only verification passed', required: true, expectedPassedBeforeMount: true, evidenceKey: '002i.dbVerifyPassed' },
  { key: 'taxi_schema_tables_verified', label: 'Twenty Taxi tables verified after real migration', required: true, expectedPassedBeforeMount: true, evidenceKey: '002i.allExpectedTaxiTablesPresent' },
  { key: 'generated_prisma_client_ready', label: 'Generated Prisma Client contains Taxi delegates', required: true, expectedPassedBeforeMount: true, evidenceKey: '002e.generatedClientContainsTaxiModels' },
  { key: 'app_ts_mount_absent_now', label: 'Application route mount is absent before controlled patch', required: true, expectedPassedBeforeMount: true, evidenceKey: 'appMountAbsentBefore002N' },
  { key: 'admin_auth_boundary_required', label: 'Admin-only routes require admin auth boundary', required: true, expectedPassedBeforeMount: true, evidenceKey: '002l.adminRouteContractCountReady' },
  { key: 'idempotency_boundary_required', label: 'Write routes require idempotency boundary', required: true, expectedPassedBeforeMount: true, evidenceKey: '002l.idempotentWriteRouteCountReady' },
  { key: 'wallet_provider_runtime_blocked', label: 'Wallet/payment/provider runtime remains blocked', required: true, expectedPassedBeforeMount: true, evidenceKey: 'safety.walletProviderRuntimeBlocked' },
  { key: 'db_runtime_limited_to_future_routes', label: 'DB runtime execution is not approved inside 002M', required: true, expectedPassedBeforeMount: true, evidenceKey: 'safety.dbRuntimeApprovedNowFalse' },
  { key: 'no_fake_success', label: 'No fake success for dispatch, wallet, payment, payout, provider', required: true, expectedPassedBeforeMount: true, evidenceKey: 'safety.fakeSuccessBlocked' },
  { key: 'rollback_plan_required', label: 'Future route mount patch requires rollback plan', required: true, expectedPassedBeforeMount: true, evidenceKey: '002m.rollbackPlanReady' },
  { key: 'runtime_smoke_required_after_mount', label: 'Future route mount requires protected runtime smoke', required: true, expectedPassedBeforeMount: true, evidenceKey: '002n.runtimeSmokeRequired' },
  { key: 'exact_owner_approval_required', label: 'Real app route mount requires separate exact owner approval', required: true, expectedPassedBeforeMount: true, evidenceKey: '002m.requiresSeparateExactOwnerApproval' },
] as const;

export const TAXI_ROUTE_MOUNT_PLAN_STEPS_002M: readonly TaxiRouteMountStep002M[] = [
  { step: 1, key: 'verify_previous_reports', label: 'Verify 002I, 002K, and 002L passed reports', allowedIn002M: false, requires002N: true },
  { step: 2, key: 'prepare_route_module_import', label: 'Prepare Taxi route module import for future app patch', allowedIn002M: false, requires002N: true },
  { step: 3, key: 'prepare_base_path', label: 'Prepare /api/taxi base path mount plan', allowedIn002M: false, requires002N: true },
  { step: 4, key: 'preserve_admin_guard', label: 'Preserve admin guard for admin-only routes', allowedIn002M: false, requires002N: true },
  { step: 5, key: 'preserve_auth_guard', label: 'Preserve authenticated access for rider/driver routes', allowedIn002M: false, requires002N: true },
  { step: 6, key: 'preserve_idempotency_guard', label: 'Preserve idempotency guard for write routes', allowedIn002M: false, requires002N: true },
  { step: 7, key: 'keep_provider_safe_disabled', label: 'Keep provider dispatch safe-disabled until provider step', allowedIn002M: false, requires002N: true },
  { step: 8, key: 'keep_wallet_safe_disabled', label: 'Keep wallet/payment/payout safe-disabled until wallet step', allowedIn002M: false, requires002N: true },
  { step: 9, key: 'write_mount_patch_report', label: 'Future 002N writes controlled patch report', allowedIn002M: false, requires002N: true },
  { step: 10, key: 'run_runtime_smoke_after_mount', label: 'Future 002N/002O runs protected runtime smoke after mount', allowedIn002M: false, requires002N: true },
] as const;

export const TAXI_ROUTE_MOUNT_APPROVAL_SAFETY_002M: TaxiRouteMountApprovalSafety002M = {
  sourceOnlyApprovalPack: true,
  envValueRead: false,
  dbRead: false,
  dbWrite: false,
  prismaValidate: false,
  prismaGenerate: false,
  prismaMigration: false,
  routeRuntimeMounted: false,
  appRuntimeMounted: false,
  adminUiRuntimeMounted: false,
  walletMutation: false,
  payment: false,
  payout: false,
  providerDispatch: false,
  fakeSuccessBlocked: true,
} as const;
