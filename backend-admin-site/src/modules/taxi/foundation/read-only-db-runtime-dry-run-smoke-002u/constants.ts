export const TAXI_READ_ONLY_DB_RUNTIME_DRY_RUN_SMOKE_VERSION_002U =
  'TAXI-BACKEND-FOUNDATION-002U-PROTECTED-READ-ONLY-DB-RUNTIME-DRY-RUN-SMOKE' as const;

export const TAXI_READ_ONLY_DB_RUNTIME_DRY_RUN_SMOKE_STAGE_002U = '002U' as const;
export const TAXI_READ_ONLY_DB_RUNTIME_DRY_RUN_SMOKE_APPROVAL_HEADER_002U = 'x-sabi-taxi-db-dry-run' as const;
export const TAXI_READ_ONLY_DB_RUNTIME_DRY_RUN_SMOKE_APPROVAL_HEADER_VALUE_002U = 'read-only-approved-002t' as const;

export const TAXI_READ_ONLY_DB_RUNTIME_DRY_RUN_SMOKE_EXPECTED_COUNTS_002U = {
  endpointSmokeCount: 5,
  routeCatalogCount: 58,
  expectedDelegateCount: 20,
  expectedPassedDelegateCount: 20,
  expectedDbWriteExecuted: false,
  expectedWalletMutation: false,
  expectedProviderDispatch: false,
  expectedFakeSuccessBlocked: true,
  hardeningHeaderCount: 10,
  protectedPolicyCount: 22,
} as const;

export const TAXI_READ_ONLY_DB_RUNTIME_DRY_RUN_SMOKE_ENDPOINTS_002U = [
  '/api/taxi/002t/read-only-db-dry-run/plan',
  '/api/taxi/002t/read-only-db-dry-run',
  '/api/taxi/002n/routes',
  '/internal/taxi/rider/quote/create/guarded',
] as const;

export const TAXI_READ_ONLY_DB_RUNTIME_DRY_RUN_SMOKE_SAFETY_002U = {
  envValueReadByModule: false,
  dbReadThroughMountedEndpointOnly: true,
  dbWrite: false,
  prismaSchemaWrite: false,
  prismaValidate: false,
  prismaGenerate: false,
  prismaMigrationApply: false,
  routeRuntimeSmoke: true,
  appRuntimeMounted: true,
  adminUiRuntimeMounted: false,
  walletMutation: false,
  payment: false,
  payout: false,
  providerDispatch: false,
  fakeSuccessBlocked: true,
} as const;
