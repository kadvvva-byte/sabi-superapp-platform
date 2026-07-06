import type { TaxiControllerGroup002L, TaxiControllerSafety002L } from './types';

export const TAXI_ROUTE_CONTROLLER_IMPLEMENTATION_VERSION_002L = 'TAXI-BACKEND-FOUNDATION-002L-ROUTE-CONTROLLER-IMPLEMENTATION' as const;

export const TAXI_CONTROLLER_GROUPS_002L = [
  { key: 'rider', label: 'Rider profile and app session controllers', routePrefix: '/internal/taxi/rider', adminOnly: false, routeMounted: false, appMounted: false },
  { key: 'driver', label: 'Driver profile, availability, and shadow controllers', routePrefix: '/internal/taxi/driver', adminOnly: false, routeMounted: false, appMounted: false },
  { key: 'driver_application', label: 'Driver application approval controllers', routePrefix: '/internal/taxi/driver-applications', adminOnly: true, routeMounted: false, appMounted: false },
  { key: 'vehicle', label: 'Vehicle and assignment controllers', routePrefix: '/internal/taxi/vehicles', adminOnly: true, routeMounted: false, appMounted: false },
  { key: 'tariff', label: 'Tariff region and commission controllers', routePrefix: '/internal/taxi/tariffs', adminOnly: true, routeMounted: false, appMounted: false },
  { key: 'quote_request', label: 'Quote and rider request controllers', routePrefix: '/internal/taxi/requests', adminOnly: false, routeMounted: false, appMounted: false },
  { key: 'dispatch_trip', label: 'Dispatch offer and trip lifecycle controllers', routePrefix: '/internal/taxi/trips', adminOnly: false, routeMounted: false, appMounted: false },
  { key: 'payment_settlement', label: 'Payment hold and driver settlement boundary controllers', routePrefix: '/internal/taxi/settlements', adminOnly: true, routeMounted: false, appMounted: false },
  { key: 'support_safety', label: 'Support, dispute, and safety controllers', routePrefix: '/internal/taxi/support', adminOnly: true, routeMounted: false, appMounted: false },
  { key: 'provider_readiness', label: 'Provider readiness snapshot controllers', routePrefix: '/internal/taxi/provider-readiness', adminOnly: true, routeMounted: false, appMounted: false },
  { key: 'admin_control', label: 'Admin maker-checker operation controllers', routePrefix: '/internal/taxi/admin', adminOnly: true, routeMounted: false, appMounted: false },
  { key: 'audit_realtime', label: 'Audit, idempotency, rating ledger, and realtime shadow controllers', routePrefix: '/internal/taxi/audit-realtime', adminOnly: true, routeMounted: false, appMounted: false },
] as const satisfies readonly TaxiControllerGroup002L[];

export const TAXI_ROUTE_CONTROLLER_MINIMUM_ROUTE_CONTRACTS_002L = 58 as const;
export const TAXI_ROUTE_CONTROLLER_MINIMUM_ADMIN_ROUTES_002L = 18 as const;
export const TAXI_ROUTE_CONTROLLER_MINIMUM_IDEMPOTENT_WRITE_ROUTES_002L = 40 as const;

export const TAXI_ROUTE_CONTROLLER_SAFETY_002L: TaxiControllerSafety002L = {
  sourceOnly: true,
  envRead: false,
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
};
