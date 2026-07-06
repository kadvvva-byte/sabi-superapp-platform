import { buildTaxiRuntimeServiceImplementation002K } from '../runtime-service-implementation-002k';
import {
  TAXI_CONTROLLER_GROUPS_002L,
  TAXI_ROUTE_CONTROLLER_IMPLEMENTATION_VERSION_002L,
  TAXI_ROUTE_CONTROLLER_SAFETY_002L,
} from './constants';
import type {
  TaxiControllerArea002L,
  TaxiControllerExecutionPlan002L,
  TaxiControllerExecutionPlanInput002L,
  TaxiControllerRouteContract002L,
  TaxiHttpMethod002L,
  TaxiRouteControllerImplementation002L,
} from './types';

const toRouteKey002L = (operationKey: string): string => `taxi.controller.${operationKey.replace(/[^a-zA-Z0-9]+/g, '.')}.002l`;

const toRoutePath002L = (operationKey: string): string => `/internal/taxi/${operationKey.replace(/[^a-zA-Z0-9]+/g, '/')}`;

const toControllerName002L = (operationKey: string): string =>
  `Taxi${operationKey
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join('')}Controller002L`;

const toHttpMethod002L = (operationKey: string): TaxiHttpMethod002L => {
  if (operationKey.includes('read') || operationKey.includes('list') || operationKey.includes('count') || operationKey.includes('snapshot')) return 'GET';
  if (operationKey.includes('set') || operationKey.includes('mark') || operationKey.includes('expire') || operationKey.includes('arrive') || operationKey.includes('suspend') || operationKey.includes('update')) return 'PATCH';
  return 'POST';
};

const toArea002L = (operationKey: string): TaxiControllerArea002L => {
  if (operationKey.startsWith('admin.')) return 'admin_control';
  if (operationKey.includes('rider.profile')) return 'rider';
  if (operationKey.includes('driver.profile') || operationKey.includes('driver.availability') || operationKey.includes('driver.location')) return 'driver';
  if (operationKey.includes('application')) return 'driver_application';
  if (operationKey.includes('vehicle')) return 'vehicle';
  if (operationKey.includes('tariff') || operationKey.includes('commission')) return 'tariff';
  if (operationKey.includes('quote') || operationKey.includes('request')) return 'quote_request';
  if (operationKey.includes('dispatch') || operationKey.includes('trip.')) return 'dispatch_trip';
  if (operationKey.includes('payment') || operationKey.includes('settlement')) return 'payment_settlement';
  if (operationKey.includes('support') || operationKey.includes('dispute') || operationKey.includes('safety')) return 'support_safety';
  if (operationKey.includes('provider')) return 'provider_readiness';
  return 'audit_realtime';
};

const requiresAdmin002L = (operationKey: string, area: TaxiControllerArea002L): boolean =>
  operationKey.startsWith('admin.') ||
  area === 'admin_control' ||
  area === 'driver_application' ||
  area === 'vehicle' ||
  area === 'tariff' ||
  area === 'payment_settlement' ||
  area === 'support_safety' ||
  area === 'provider_readiness' ||
  area === 'audit_realtime';

const buildRouteContracts002L = (): readonly TaxiControllerRouteContract002L[] => {
  const runtime = buildTaxiRuntimeServiceImplementation002K();
  return runtime.workflowImplementations.map((workflow) => {
    const method = toHttpMethod002L(workflow.key);
    const area = toArea002L(workflow.key);
    return {
      key: toRouteKey002L(workflow.key),
      operationKey: workflow.key,
      method,
      path: toRoutePath002L(workflow.key),
      controllerName: toControllerName002L(workflow.key),
      area,
      workflow,
      requiresAuth: true,
      requiresAdmin: requiresAdmin002L(workflow.key, area),
      requiresIdempotencyForWrite: method !== 'GET',
      requiresProviderReadiness: workflow.requiresProviderReadiness,
      requiresWalletBoundary: workflow.requiresWalletBoundary,
      requestValidatorKey: `taxi.${workflow.key}.request.validator002L`,
      responseContractKey: `taxi.${workflow.key}.response.contract002L`,
      routeMounted: false,
      appMounted: false,
      dbRuntimeExecutionApprovedNow: false,
      providerDispatch: false,
      walletMutation: false,
      fakeSuccessBlocked: true,
    } satisfies TaxiControllerRouteContract002L;
  });
};

export const buildTaxiRouteControllerImplementation002L = (): TaxiRouteControllerImplementation002L => {
  const routeContracts = buildRouteContracts002L();
  const adminRouteContractCount = routeContracts.filter((route) => route.requiresAdmin).length;
  const idempotentWriteRouteCount = routeContracts.filter((route) => route.requiresIdempotencyForWrite).length;
  const walletBoundaryRouteCount = routeContracts.filter((route) => route.requiresWalletBoundary).length;
  const providerReadinessRouteCount = routeContracts.filter((route) => route.requiresProviderReadiness).length;

  return {
    version: TAXI_ROUTE_CONTROLLER_IMPLEMENTATION_VERSION_002L,
    status: 'source_only_route_controller_ready',
    controllerGroupCount: TAXI_CONTROLLER_GROUPS_002L.length,
    routeContractCount: routeContracts.length,
    adminRouteContractCount,
    idempotentWriteRouteCount,
    walletBoundaryRouteCount,
    providerReadinessRouteCount,
    controllerGroups: TAXI_CONTROLLER_GROUPS_002L,
    routeContracts,
    safety: TAXI_ROUTE_CONTROLLER_SAFETY_002L,
    readiness: {
      runtimeService002KRequired: true,
      repositoryContracts002JRequired: true,
      postMigrationVerified002IRequired: true,
      routeMountApprovedNow: false,
      appMountApprovedNow: false,
      dbRuntimeExecutionApprovedNow: false,
      providerRuntimeApprovedNow: false,
      walletRuntimeApprovedNow: false,
      nextStep: '002M controlled route mount approval',
    },
  };
};

export const createTaxiControllerExecutionPlan002L = (
  input: TaxiControllerExecutionPlanInput002L,
): TaxiControllerExecutionPlan002L => ({
  routeKey: input.routeKey,
  canExecuteNow: false,
  blockedReason: 'app_route_mount_not_approved',
  routeMounted: false,
  appMounted: false,
  dbExecutedInThisStage: false,
  requiredNextApproval: '002M controlled route mount approval',
});

export const evaluateTaxiRouteControllerImplementation002L = () => {
  const implementation = buildTaxiRouteControllerImplementation002L();
  const routeKeys = implementation.routeContracts.map((route) => route.key);
  const duplicateRouteKeys = routeKeys.filter((key, index, all) => all.indexOf(key) !== index);
  const routePaths = implementation.routeContracts.map((route) => `${route.method} ${route.path}`);
  const duplicateRoutePaths = routePaths.filter((path, index, all) => all.indexOf(path) !== index);

  return {
    version: implementation.version,
    status: implementation.status,
    controllerGroupCountReady: implementation.controllerGroupCount >= 12,
    routeContractCountReady: implementation.routeContractCount >= 58,
    adminRouteContractCountReady: implementation.adminRouteContractCount >= 18,
    idempotentWriteRouteCountReady: implementation.idempotentWriteRouteCount >= 40,
    walletBoundaryRouteCountReady: implementation.walletBoundaryRouteCount >= 4,
    providerReadinessRouteCountReady: implementation.providerReadinessRouteCount >= 4,
    duplicateRouteKeys,
    duplicateRoutePaths,
    routeMountApprovedNow: implementation.readiness.routeMountApprovedNow,
    appMountApprovedNow: implementation.readiness.appMountApprovedNow,
    dbRuntimeExecutionApprovedNow: implementation.readiness.dbRuntimeExecutionApprovedNow,
    providerRuntimeApprovedNow: implementation.readiness.providerRuntimeApprovedNow,
    walletRuntimeApprovedNow: implementation.readiness.walletRuntimeApprovedNow,
    safety: implementation.safety,
  };
};
