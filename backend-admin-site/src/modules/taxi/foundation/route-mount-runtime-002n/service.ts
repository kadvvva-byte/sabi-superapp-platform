import { buildTaxiRouteControllerImplementation002L } from '../route-controller-implementation-002l';
import { buildTaxiRouteMountApproval002M } from '../route-mount-approval-002m';
import {
  TAXI_ROUTE_MOUNT_RUNTIME_ENDPOINTS_002N,
  TAXI_ROUTE_MOUNT_RUNTIME_SAFETY_002N,
  TAXI_ROUTE_MOUNT_RUNTIME_VERSION_002N,
} from './constants';
import type {
  TaxiRouteMountRuntime002N,
  TaxiRouteMountRuntimeEvaluation002N,
  TaxiSafeDisabledRouteResponse002N,
} from './types';
import type { TaxiControllerRouteContract002L } from '../route-controller-implementation-002l';

export const buildTaxiRouteMountRuntime002N = (): TaxiRouteMountRuntime002N => {
  const routeController002L = buildTaxiRouteControllerImplementation002L();
  const approval002M = buildTaxiRouteMountApproval002M();

  return {
    version: TAXI_ROUTE_MOUNT_RUNTIME_VERSION_002N,
    status: 'app_route_mounted_safe_disabled',
    mountBasePath: '/api/taxi',
    internalContractBasePath: '/internal/taxi',
    readinessPath: '/api/taxi/002n/readiness',
    routeCatalogPath: '/api/taxi/002n/routes',
    adminDiagnosticsPath: '/api/admin/taxi/002n/diagnostics',
    approval002M,
    routeContracts: routeController002L.routeContracts,
    routeContractCount: routeController002L.routeContractCount,
    controllerGroupCount: routeController002L.controllerGroupCount,
    adminRouteContractCount: routeController002L.adminRouteContractCount,
    idempotentWriteRouteCount: routeController002L.idempotentWriteRouteCount,
    walletBoundaryRouteCount: routeController002L.walletBoundaryRouteCount,
    providerReadinessRouteCount: routeController002L.providerReadinessRouteCount,
    mountedReadinessEndpointCount: TAXI_ROUTE_MOUNT_RUNTIME_ENDPOINTS_002N.length,
    routeRuntimeRegistrationCount: routeController002L.routeContracts.length,
    appMountApprovedNow: true,
    routeMountApprovedNow: true,
    dbRuntimeExecutionApprovedNow: false,
    providerRuntimeApprovedNow: false,
    walletRuntimeApprovedNow: false,
    nextStep: '002O protected runtime smoke',
    safety: TAXI_ROUTE_MOUNT_RUNTIME_SAFETY_002N,
  };
};

export const evaluateTaxiRouteMountRuntime002N = (): TaxiRouteMountRuntimeEvaluation002N => {
  const runtime = buildTaxiRouteMountRuntime002N();

  return {
    version: runtime.version,
    status: runtime.status,
    routeContractCountReady: runtime.routeContractCount >= 58,
    controllerGroupCountReady: runtime.controllerGroupCount >= 12,
    adminRouteContractCountReady: runtime.adminRouteContractCount >= 18,
    idempotentWriteRouteCountReady: runtime.idempotentWriteRouteCount >= 40,
    mountedReadinessEndpointCountReady: runtime.mountedReadinessEndpointCount >= 3,
    routeRuntimeRegistrationCountReady: runtime.routeRuntimeRegistrationCount >= 58,
    walletProviderRuntimeBlocked: runtime.walletRuntimeApprovedNow === false && runtime.providerRuntimeApprovedNow === false,
    dbRuntimeExecutionApprovedNow: runtime.dbRuntimeExecutionApprovedNow,
    providerRuntimeApprovedNow: runtime.providerRuntimeApprovedNow,
    walletRuntimeApprovedNow: runtime.walletRuntimeApprovedNow,
    safety: runtime.safety,
  };
};

export const createTaxiSafeDisabledRouteResponse002N = (
  route: TaxiControllerRouteContract002L,
): TaxiSafeDisabledRouteResponse002N => ({
  ok: false,
  code: 'taxi_runtime_safe_disabled_002n',
  routeKey: route.key,
  operationKey: route.operationKey,
  method: route.method,
  path: route.path,
  routeMounted: true,
  appMounted: true,
  dbRuntimeExecutionApprovedNow: false,
  walletMutation: false,
  providerDispatch: false,
  fakeSuccessBlocked: true,
  nextStep: '002O protected runtime smoke',
});
