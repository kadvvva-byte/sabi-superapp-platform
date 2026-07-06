import type { TaxiRouteMountRuntimeSafety002N } from './types';

export const TAXI_ROUTE_MOUNT_RUNTIME_VERSION_002N = 'TAXI-BACKEND-FOUNDATION-002N-CONTROLLED-APP-ROUTE-MOUNT' as const;

export const TAXI_ROUTE_MOUNT_RUNTIME_ENDPOINTS_002N = [
  { key: 'public_readiness', method: 'GET', path: '/api/taxi/002n/readiness', purpose: 'Mounted Taxi route readiness without DB/provider/Wallet execution.' },
  { key: 'route_catalog', method: 'GET', path: '/api/taxi/002n/routes', purpose: 'Mounted Taxi route contract catalog without executing workflows.' },
  { key: 'admin_diagnostics', method: 'GET', path: '/api/admin/taxi/002n/diagnostics', purpose: 'Admin guarded diagnostics without raw token output.' },
] as const;

export const TAXI_ROUTE_MOUNT_RUNTIME_SAFETY_002N: TaxiRouteMountRuntimeSafety002N = {
  sourcePatch: true,
  envValueReadByModule: false,
  dbRead: false,
  dbWrite: false,
  prismaValidate: false,
  prismaGenerate: false,
  prismaMigration: false,
  routeRuntimeMounted: true,
  appRuntimeMounted: true,
  adminUiRuntimeMounted: false,
  walletMutation: false,
  payment: false,
  payout: false,
  providerDispatch: false,
  fakeSuccessBlocked: true,
};
