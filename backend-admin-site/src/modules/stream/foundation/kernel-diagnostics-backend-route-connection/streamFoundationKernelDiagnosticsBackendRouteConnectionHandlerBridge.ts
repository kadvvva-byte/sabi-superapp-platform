import { createStreamFoundationKernelDiagnosticsAdminRuntimeRouteHandler } from "../kernel-diagnostics-admin-runtime-route";
import {
  STREAM_FOUNDATION_140A_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_VERSION,
  type StreamFoundationKernelDiagnosticsBackendRouteConnectionHandler,
  type StreamFoundationKernelDiagnosticsBackendRouteConnectionHandlerBridge,
} from "./streamFoundationKernelDiagnosticsBackendRouteConnectionContracts";
import { STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_SAFETY } from "./streamFoundationKernelDiagnosticsBackendRouteConnectionMountPlan";
import { mapStreamFoundationKernelDiagnosticsBackendRouteConnectionResponse } from "./streamFoundationKernelDiagnosticsBackendRouteConnectionResponseAdapter";

export function createStreamFoundationKernelDiagnosticsBackendRouteConnectionHandler(): StreamFoundationKernelDiagnosticsBackendRouteConnectionHandler {
  const runtimeHandler = createStreamFoundationKernelDiagnosticsAdminRuntimeRouteHandler();
  return (request) => {
    const runtimeResponse = runtimeHandler({
      routeId: request.routeId,
      context: {
        adminUserId: request.context?.adminUserId,
        requestId: request.context?.requestId,
        locale: request.context?.locale,
        scopes: request.context?.scopes,
        query: request.context?.query,
        body: request.context?.body,
        sourceIpHash: request.context?.sourceIpHash,
        routeMountApproved: false,
      },
    });
    return mapStreamFoundationKernelDiagnosticsBackendRouteConnectionResponse(request, runtimeResponse);
  };
}

export function getStreamFoundationKernelDiagnosticsBackendRouteConnectionHandlerBridge(): StreamFoundationKernelDiagnosticsBackendRouteConnectionHandlerBridge {
  const runtimeHandler = createStreamFoundationKernelDiagnosticsAdminRuntimeRouteHandler();
  return {
    bridgeId: "stream_kernel_diagnostics_backend_route_connection_handler_bridge",
    version: STREAM_FOUNDATION_140A_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_VERSION,
    sourceReadyNow: true,
    mountedNow: false,
    protectedRouteRegisteredNow: false,
    runtimeHandler,
    backendHandler: createStreamFoundationKernelDiagnosticsBackendRouteConnectionHandler(),
    safety: STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_SAFETY,
  };
}
