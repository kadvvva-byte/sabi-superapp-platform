import {
  STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_DEFINITIONS,
  STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_SAFETY,
  previewStreamFoundationKernelDiagnosticsAdminRoute,
  type StreamFoundationKernelDiagnosticsAdminRouteEnvelope,
} from "../kernel-diagnostics-admin-route";
import {
  STREAM_FOUNDATION_138K_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_FACTORY_VERSION,
  toKernelDiagnosticsAdminRouteRequest,
  type StreamFoundationKernelDiagnosticsAdminRouteFactoryHandler,
  type StreamFoundationKernelDiagnosticsAdminRouteFactoryPreviewRequest,
  type StreamFoundationKernelDiagnosticsAdminRouteFactoryPreviewResult,
  type StreamFoundationKernelDiagnosticsAdminRouteFactorySafety,
  type StreamFoundationKernelDiagnosticsAdminRouteFactorySnapshot,
} from "./streamFoundationKernelDiagnosticsAdminRouteFactoryContracts";

export const STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_FACTORY_SAFETY: StreamFoundationKernelDiagnosticsAdminRouteFactorySafety = {
  ...STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_SAFETY,
  streamIndexPatchIncluded: false,
  adminUiFilesChangedNow: false,
  adminRouteMountedNow: false,
  expressRouterCreatedNow: false,
  expressRouterImportedNow: false,
  appServerTouchedNow: false,
  routeMountAllowedNow: false,
  routeHandlerExecutesProviderCallNow: false,
  routeHandlerExecutesDatabaseNow: false,
  routeHandlerExecutesWalletNow: false,
  routeHandlerExecutesMoneyMovementNow: false,
};

export function createStreamFoundationKernelDiagnosticsAdminRouteFactoryHandlers(): readonly StreamFoundationKernelDiagnosticsAdminRouteFactoryHandler[] {
  return STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_DEFINITIONS.map((definition) => ({
    routeId: definition.routeId,
    method: definition.method,
    path: definition.path,
    mountedNow: false,
    expressRouterBoundNow: false,
    requiredScopes: definition.requiredScopes,
    returnsRawSecrets: false,
    executesDatabase: false,
    executesProviderCall: false,
    executesWalletMutation: false,
    executesMoneyMovement: false,
    preview: (context) => previewStreamFoundationKernelDiagnosticsAdminRoute(toKernelDiagnosticsAdminRouteRequest(definition.routeId, context)),
  }));
}

function unknownRouteEnvelope(request: StreamFoundationKernelDiagnosticsAdminRouteFactoryPreviewRequest): StreamFoundationKernelDiagnosticsAdminRouteEnvelope {
  return previewStreamFoundationKernelDiagnosticsAdminRoute(toKernelDiagnosticsAdminRouteRequest(request.routeId, request.context));
}

export function getStreamFoundationKernelDiagnosticsAdminRouteFactorySnapshot(): StreamFoundationKernelDiagnosticsAdminRouteFactorySnapshot {
  const handlers = createStreamFoundationKernelDiagnosticsAdminRouteFactoryHandlers();
  return {
    version: STREAM_FOUNDATION_138K_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_FACTORY_VERSION,
    factoryId: "stream_kernel_diagnostics_admin_route_factory_unmounted",
    status: "factory_ready_unmounted",
    patchScope: "src/modules/stream/foundation/** only",
    handlers,
    handlerCount: handlers.length,
    mountedHandlerCount: 0,
    expressRouterBoundCount: 0,
    rawSecretReturningHandlers: 0,
    providerCallingHandlers: 0,
    databaseExecutingHandlers: 0,
    walletMutatingHandlers: 0,
    moneyMovementHandlers: 0,
    mobileProviderKeyHandlers: 0,
    safety: STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_FACTORY_SAFETY,
  };
}

export function previewStreamFoundationKernelDiagnosticsAdminRouteFactoryHandler(
  request: StreamFoundationKernelDiagnosticsAdminRouteFactoryPreviewRequest,
): StreamFoundationKernelDiagnosticsAdminRouteFactoryPreviewResult {
  const handler = createStreamFoundationKernelDiagnosticsAdminRouteFactoryHandlers().find((item) => item.routeId === request.routeId);
  const envelope = handler ? handler.preview(request.context) : unknownRouteEnvelope(request);
  return {
    version: STREAM_FOUNDATION_138K_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_FACTORY_VERSION,
    routeId: request.routeId,
    handlerFound: Boolean(handler),
    mountedNow: false,
    expressRouterBoundNow: false,
    envelope,
    safety: STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_FACTORY_SAFETY,
  };
}
