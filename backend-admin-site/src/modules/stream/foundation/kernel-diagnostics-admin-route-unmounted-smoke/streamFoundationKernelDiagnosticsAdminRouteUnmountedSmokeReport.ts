import { getStreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeReadiness } from "./streamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeReadiness";
import { getStreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeSnapshot } from "./streamFoundationKernelDiagnosticsAdminRouteUnmountedSmoke";
import { STREAM_FOUNDATION_138L_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_UNMOUNTED_SMOKE_VERSION } from "./streamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeContracts";

export interface StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeReport {
  readonly version: typeof STREAM_FOUNDATION_138L_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_UNMOUNTED_SMOKE_VERSION;
  readonly passed: boolean;
  readonly checkedCases: number;
  readonly passedCases: number;
  readonly failedCases: number;
  readonly readyForRouteMountNow: false;
  readonly requiresSeparateRouteMountApproval: true;
  readonly routeMountPerformed: false;
  readonly expressRouterCreated: false;
  readonly runtimeHttpRequestsPerformed: 0;
  readonly providerCallsPerformed: 0;
  readonly databaseExecutionPerformed: 0;
  readonly walletMutationPerformed: 0;
  readonly moneyMovementPerformed: 0;
  readonly rawSecretsReturned: 0;
  readonly mobileProviderKeysAllowed: false;
  readonly fakeSuccessAllowed: false;
  readonly streamIndexPatchIncluded: false;
}

export function getStreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeReport(): StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeReadiness();
  return {
    version: STREAM_FOUNDATION_138L_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_UNMOUNTED_SMOKE_VERSION,
    passed: readiness.readyForUnmountedSmokeReview,
    checkedCases: snapshot.checkedCases,
    passedCases: snapshot.passedCases,
    failedCases: snapshot.failedCases,
    readyForRouteMountNow: false,
    requiresSeparateRouteMountApproval: true,
    routeMountPerformed: false,
    expressRouterCreated: false,
    runtimeHttpRequestsPerformed: 0,
    providerCallsPerformed: 0,
    databaseExecutionPerformed: 0,
    walletMutationPerformed: 0,
    moneyMovementPerformed: 0,
    rawSecretsReturned: 0,
    mobileProviderKeysAllowed: false,
    fakeSuccessAllowed: false,
    streamIndexPatchIncluded: false,
  };
}
