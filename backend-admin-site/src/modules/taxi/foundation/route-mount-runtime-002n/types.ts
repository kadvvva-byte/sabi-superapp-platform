import type { TaxiControllerRouteContract002L } from '../route-controller-implementation-002l';
import type { TaxiRouteMountApproval002M } from '../route-mount-approval-002m';

export interface TaxiRouteMountRuntimeSafety002N {
  readonly sourcePatch: true;
  readonly envValueReadByModule: false;
  readonly dbRead: false;
  readonly dbWrite: false;
  readonly prismaValidate: false;
  readonly prismaGenerate: false;
  readonly prismaMigration: false;
  readonly routeRuntimeMounted: true;
  readonly appRuntimeMounted: true;
  readonly adminUiRuntimeMounted: false;
  readonly walletMutation: false;
  readonly payment: false;
  readonly payout: false;
  readonly providerDispatch: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiRouteMountRuntime002N {
  readonly version: 'TAXI-BACKEND-FOUNDATION-002N-CONTROLLED-APP-ROUTE-MOUNT';
  readonly status: 'app_route_mounted_safe_disabled';
  readonly mountBasePath: '/api/taxi';
  readonly internalContractBasePath: '/internal/taxi';
  readonly readinessPath: '/api/taxi/002n/readiness';
  readonly routeCatalogPath: '/api/taxi/002n/routes';
  readonly adminDiagnosticsPath: '/api/admin/taxi/002n/diagnostics';
  readonly approval002M: TaxiRouteMountApproval002M;
  readonly routeContracts: readonly TaxiControllerRouteContract002L[];
  readonly routeContractCount: number;
  readonly controllerGroupCount: number;
  readonly adminRouteContractCount: number;
  readonly idempotentWriteRouteCount: number;
  readonly walletBoundaryRouteCount: number;
  readonly providerReadinessRouteCount: number;
  readonly mountedReadinessEndpointCount: number;
  readonly routeRuntimeRegistrationCount: number;
  readonly appMountApprovedNow: true;
  readonly routeMountApprovedNow: true;
  readonly dbRuntimeExecutionApprovedNow: false;
  readonly providerRuntimeApprovedNow: false;
  readonly walletRuntimeApprovedNow: false;
  readonly nextStep: '002O protected runtime smoke';
  readonly safety: TaxiRouteMountRuntimeSafety002N;
}

export interface TaxiRouteMountRuntimeEvaluation002N {
  readonly version: TaxiRouteMountRuntime002N['version'];
  readonly status: TaxiRouteMountRuntime002N['status'];
  readonly routeContractCountReady: boolean;
  readonly controllerGroupCountReady: boolean;
  readonly adminRouteContractCountReady: boolean;
  readonly idempotentWriteRouteCountReady: boolean;
  readonly mountedReadinessEndpointCountReady: boolean;
  readonly routeRuntimeRegistrationCountReady: boolean;
  readonly walletProviderRuntimeBlocked: boolean;
  readonly dbRuntimeExecutionApprovedNow: false;
  readonly providerRuntimeApprovedNow: false;
  readonly walletRuntimeApprovedNow: false;
  readonly safety: TaxiRouteMountRuntimeSafety002N;
}

export interface TaxiSafeDisabledRouteResponse002N {
  readonly ok: false;
  readonly code: 'taxi_runtime_safe_disabled_002n';
  readonly routeKey: string;
  readonly operationKey: string;
  readonly method: string;
  readonly path: string;
  readonly routeMounted: true;
  readonly appMounted: true;
  readonly dbRuntimeExecutionApprovedNow: false;
  readonly walletMutation: false;
  readonly providerDispatch: false;
  readonly fakeSuccessBlocked: true;
  readonly nextStep: '002O protected runtime smoke';
}
