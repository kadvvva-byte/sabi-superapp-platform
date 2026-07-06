import {
  STREAM_FOUNDATION_140A_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_VERSION,
  type StreamFoundationKernelDiagnosticsBackendRouteConnectionEnvelope,
  type StreamFoundationKernelDiagnosticsBackendRouteConnectionRequest,
  type StreamFoundationKernelDiagnosticsBackendRouteConnectionSafety,
} from "./streamFoundationKernelDiagnosticsBackendRouteConnectionContracts";
import { STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_SAFETY } from "./streamFoundationKernelDiagnosticsBackendRouteConnectionMountPlan";
import type { StreamFoundationKernelDiagnosticsAdminRuntimeRouteResponse } from "../kernel-diagnostics-admin-runtime-route";

function mapStatusCode(runtimeResponse: StreamFoundationKernelDiagnosticsAdminRuntimeRouteResponse): 200 | 403 | 404 | 409 {
  const envelope = runtimeResponse.envelope;
  if (envelope.ok) {
    return 200;
  }
  return envelope.statusCode;
}

export function mapStreamFoundationKernelDiagnosticsBackendRouteConnectionResponse(
  request: StreamFoundationKernelDiagnosticsBackendRouteConnectionRequest,
  runtimeResponse: StreamFoundationKernelDiagnosticsAdminRuntimeRouteResponse,
  safety: StreamFoundationKernelDiagnosticsBackendRouteConnectionSafety = STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_SAFETY,
): StreamFoundationKernelDiagnosticsBackendRouteConnectionEnvelope {
  const ok = runtimeResponse.envelope.ok === true;
  const statusCode = mapStatusCode(runtimeResponse);
  return {
    version: STREAM_FOUNDATION_140A_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_VERSION,
    ok,
    routeId: request.routeId,
    sourceReadyNow: true,
    mountedNow: false,
    protectedRouteRegisteredNow: false,
    statusCode,
    safeCode: ok ? "140a_backend_route_connection_preview_ready" : "140a_backend_route_connection_preview_blocked",
    safeMessageKey: ok ? "stream.foundation.140a.backendRouteConnection.previewReady" : "stream.foundation.140a.backendRouteConnection.previewBlocked",
    runtimeResponse,
    rawSecretFieldsReturned: 0,
    providerCallsPerformed: 0,
    walletMutationPerformed: 0,
    moneyMovementPerformed: 0,
    safety,
  };
}
