import { STREAM_FOUNDATION_138J_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_VERSION } from "./streamFoundationKernelDiagnosticsAdminRouteContracts";
import { STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_DEFINITIONS } from "./streamFoundationKernelDiagnosticsAdminRouteDefinitions";
import { previewDefaultStreamFoundationKernelDiagnosticsAdminRoute } from "./streamFoundationKernelDiagnosticsAdminRoutePreview";

export interface StreamFoundationKernelDiagnosticsAdminRouteReadiness {
  readonly version: typeof STREAM_FOUNDATION_138J_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_VERSION;
  readonly streamIndexPatchIncluded: false;
  readonly totalRoutes: number;
  readonly allRoutesUnmounted: boolean;
  readonly allRoutesAdminProtected: boolean;
  readonly allRoutesRedacted: boolean;
  readonly appServerUntouched: boolean;
  readonly providerCallsBlocked: boolean;
  readonly databaseWritesBlocked: boolean;
  readonly moneyMovementBlocked: boolean;
  readonly fakeSuccessBlocked: boolean;
  readonly routeContractReadyForLaterMount: boolean;
}

export function getStreamFoundationKernelDiagnosticsAdminRouteReadiness(): StreamFoundationKernelDiagnosticsAdminRouteReadiness {
  const preview = previewDefaultStreamFoundationKernelDiagnosticsAdminRoute();
  const allRoutesUnmounted = STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_DEFINITIONS.every((route) => route.mountedNow === false);
  const allRoutesAdminProtected = STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_DEFINITIONS.every((route) => route.adminPermissionRequired && route.requiredScopes.length > 0);
  const allRoutesRedacted = STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_DEFINITIONS.every((route) => route.returnsRawSecrets === false);
  return {
    version: STREAM_FOUNDATION_138J_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_VERSION,
    streamIndexPatchIncluded: false,
    totalRoutes: STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_DEFINITIONS.length,
    allRoutesUnmounted,
    allRoutesAdminProtected,
    allRoutesRedacted,
    appServerUntouched: preview.safety.appServerTouchedNow === false && preview.safety.adminRouteMountedNow === false,
    providerCallsBlocked: preview.providerCallsPerformed === 0 && preview.safety.providerCallAllowedNow === false,
    databaseWritesBlocked: preview.safety.databaseWriteAllowedNow === false,
    moneyMovementBlocked: preview.moneyMovementPerformed === 0 && preview.safety.moneyMovementAllowedNow === false,
    fakeSuccessBlocked: preview.safety.fakeSuccessAllowed === false,
    routeContractReadyForLaterMount: preview.ok === true && allRoutesUnmounted && allRoutesAdminProtected && allRoutesRedacted,
  };
}
