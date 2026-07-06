import type { TaxiProtectedRuntimeSmokeSafety002O, TaxiRuntimeSmokeEndpointExpectation002O } from './types';

export const TAXI_PROTECTED_RUNTIME_SMOKE_VERSION_002O = 'TAXI-BACKEND-FOUNDATION-002O-PROTECTED-RUNTIME-SMOKE' as const;

export const TAXI_PROTECTED_RUNTIME_SMOKE_REQUIRED_ROUTE_COUNT_002O = 58 as const;

export const TAXI_PROTECTED_RUNTIME_SMOKE_ENDPOINTS_002O = [
  { key: 'public_readiness', method: 'GET', path: '/api/taxi/002n/readiness', expectedStatus: 200, requiresAdminToken: false, expectedSafeDisabled: false },
  { key: 'public_route_catalog', method: 'GET', path: '/api/taxi/002n/routes', expectedStatus: 200, requiresAdminToken: false, expectedSafeDisabled: false },
  { key: 'admin_diagnostics_unauth', method: 'GET', path: '/api/admin/taxi/002n/diagnostics', expectedStatus: '200_or_403', requiresAdminToken: true, expectedSafeDisabled: false },
  { key: 'safe_disabled_rider_quote_create', method: 'POST', path: '/internal/taxi/rider/quote/create/guarded', expectedStatus: 409, requiresAdminToken: false, expectedSafeDisabled: true },
  { key: 'admin_safe_disabled_or_protected', method: 'POST', path: '/internal/taxi/admin/driver/application/review/guarded', expectedStatus: '200_or_403', requiresAdminToken: true, expectedSafeDisabled: true },
] as const satisfies readonly TaxiRuntimeSmokeEndpointExpectation002O[];

export const TAXI_PROTECTED_RUNTIME_SMOKE_SAFETY_002O: TaxiProtectedRuntimeSmokeSafety002O = {
  sourceOnly: true,
  envValueRead: false,
  dbWrite: false,
  prismaValidate: false,
  prismaGenerate: false,
  prismaMigration: false,
  walletMutation: false,
  payment: false,
  payout: false,
  providerDispatch: false,
};
