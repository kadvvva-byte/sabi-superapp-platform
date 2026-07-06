import { getStreamFoundationKernelDiagnosticsAdminRouteFactoryReadiness } from "../kernel-diagnostics-admin-route-factory";
import { getStreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeSnapshot } from "./streamFoundationKernelDiagnosticsAdminRouteUnmountedSmoke";
import { STREAM_FOUNDATION_138L_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_UNMOUNTED_SMOKE_VERSION } from "./streamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeContracts";

export interface StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeReadiness {
  readonly version: typeof STREAM_FOUNDATION_138L_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_UNMOUNTED_SMOKE_VERSION;
  readonly readyForUnmountedSmokeReview: boolean;
  readonly readyForRouteMountNow: false;
  readonly requiresSeparateRouteMountApproval: true;
  readonly factoryReadyForUnmountedPreview: boolean;
  readonly allExpectedCasesPassed: boolean;
  readonly allHandlersFound: boolean;
  readonly allRoutesUnmounted: boolean;
  readonly allResponsesRedacted: boolean;
  readonly noRuntimeHttpRequests: boolean;
  readonly noProviderCalls: boolean;
  readonly noDatabaseExecution: boolean;
  readonly noWalletMutation: boolean;
  readonly noMoneyMovement: boolean;
  readonly streamIndexPatchIncluded: false;
}

export function getStreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeReadiness(): StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeReadiness {
  const factoryReadiness = getStreamFoundationKernelDiagnosticsAdminRouteFactoryReadiness();
  const snapshot = getStreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeSnapshot();
  return {
    version: STREAM_FOUNDATION_138L_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_UNMOUNTED_SMOKE_VERSION,
    readyForUnmountedSmokeReview: factoryReadiness.readyForUnmountedPreview && snapshot.status === "unmounted_smoke_passed",
    readyForRouteMountNow: false,
    requiresSeparateRouteMountApproval: true,
    factoryReadyForUnmountedPreview: factoryReadiness.readyForUnmountedPreview,
    allExpectedCasesPassed: snapshot.failedCases === 0,
    allHandlersFound: snapshot.allHandlersFound,
    allRoutesUnmounted: snapshot.allRoutesUnmounted,
    allResponsesRedacted: snapshot.allResponsesRedacted,
    noRuntimeHttpRequests: snapshot.runtimeHttpRequestsPerformed === 0,
    noProviderCalls: snapshot.providerCallsPerformed === 0,
    noDatabaseExecution: snapshot.databaseExecutionPerformed === 0,
    noWalletMutation: snapshot.walletMutationPerformed === 0,
    noMoneyMovement: snapshot.moneyMovementPerformed === 0,
    streamIndexPatchIncluded: false,
  };
}
