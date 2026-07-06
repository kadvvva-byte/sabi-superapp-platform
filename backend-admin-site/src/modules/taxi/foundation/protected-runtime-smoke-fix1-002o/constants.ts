import type { TaxiProtectedRuntimeSmokeFix1Endpoint002O, TaxiProtectedRuntimeSmokeFix1Safety002O } from './types';

export const TAXI_PROTECTED_RUNTIME_SMOKE_FIX1_VERSION_002O = 'TAXI-BACKEND-FOUNDATION-002O-FIX1-PROTECTED-RUNTIME-SMOKE' as const;

export const TAXI_PROTECTED_RUNTIME_SMOKE_FIX1_EXPECTED_ROUTE_COUNT_002O = 58 as const;
export const TAXI_PROTECTED_RUNTIME_SMOKE_FIX1_PREVIOUS_OBSERVED_ROUTE_COUNT_002O = 39 as const;

export const TAXI_PROTECTED_RUNTIME_SMOKE_FIX1_ENDPOINTS_002O = [
  { key: 'public_readiness', method: 'GET', path: '/api/taxi/002n/readiness', expectedStatuses: [200], purpose: 'Taxi mounted readiness must report 58 safe-disabled contracts after FIX1 restart.' },
  { key: 'public_route_catalog', method: 'GET', path: '/api/taxi/002n/routes', expectedStatuses: [200], purpose: 'Taxi route catalog must expose at least 58 safe-disabled route contracts.' },
  { key: 'admin_diagnostics_unauth', method: 'GET', path: '/api/admin/taxi/002n/diagnostics', expectedStatuses: [200, 403], purpose: 'Admin diagnostics must be protected or explicitly safe.' },
  { key: 'safe_disabled_rider_quote_create', method: 'POST', path: '/internal/taxi/rider/quote/create/guarded', expectedStatuses: [409], purpose: 'Write route must stay safe-disabled without DB/Wallet/provider execution.' },
  { key: 'admin_safe_disabled_or_protected', method: 'POST', path: '/internal/taxi/admin/driver/application/review/guarded', expectedStatuses: [403, 409], purpose: 'Admin write route must be protected or safe-disabled.' },
] as const satisfies readonly TaxiProtectedRuntimeSmokeFix1Endpoint002O[];

export const TAXI_PROTECTED_RUNTIME_SMOKE_FIX1_SAFETY_002O: TaxiProtectedRuntimeSmokeFix1Safety002O = {
  sourcePatch: true,
  httpSmokeOnly: true,
  envValueReadByModule: false,
  dbReadByTaxiSmoke: false,
  dbWrite: false,
  prismaValidate: false,
  prismaGenerate: false,
  prismaMigration: false,
  appRuntimeMounted: true,
  walletMutation: false,
  payment: false,
  payout: false,
  providerDispatch: false,
  fakeSuccessBlocked: true,
};
