import { getStreamFoundationKernelDiagnosticsAdminHandoffSnapshot } from "../kernel-diagnostics-admin-handoff";
import {
  STREAM_FOUNDATION_138J_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_VERSION,
  toAdminHandoffRequest,
  type StreamFoundationKernelDiagnosticsAdminRouteAuthScope,
  type StreamFoundationKernelDiagnosticsAdminRouteBlockedEnvelope,
  type StreamFoundationKernelDiagnosticsAdminRouteEnvelope,
  type StreamFoundationKernelDiagnosticsAdminRouteRequest,
  type StreamFoundationKernelDiagnosticsAdminRouteResponseEnvelope,
} from "./streamFoundationKernelDiagnosticsAdminRouteContracts";
import {
  STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_SAFETY,
  getStreamFoundationKernelDiagnosticsAdminRouteDefinition,
} from "./streamFoundationKernelDiagnosticsAdminRouteDefinitions";

function redactedAdminUserId(adminUserId?: string): string {
  if (!adminUserId) return "admin_user_not_provided";
  if (adminUserId.length <= 6) return "admin_user_redacted";
  return `${adminUserId.slice(0, 3)}***${adminUserId.slice(-2)}`;
}

function missingScopes(required: readonly StreamFoundationKernelDiagnosticsAdminRouteAuthScope[], provided: readonly StreamFoundationKernelDiagnosticsAdminRouteAuthScope[]): readonly StreamFoundationKernelDiagnosticsAdminRouteAuthScope[] {
  return required.filter((scope) => !provided.includes(scope));
}

function blocked(routeId: StreamFoundationKernelDiagnosticsAdminRouteRequest["routeId"], statusCode: StreamFoundationKernelDiagnosticsAdminRouteBlockedEnvelope["statusCode"], safeCode: StreamFoundationKernelDiagnosticsAdminRouteBlockedEnvelope["safeCode"], missing: readonly StreamFoundationKernelDiagnosticsAdminRouteAuthScope[] = []): StreamFoundationKernelDiagnosticsAdminRouteBlockedEnvelope {
  return {
    version: STREAM_FOUNDATION_138J_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_VERSION,
    ok: false,
    routeId,
    mountedNow: false,
    statusCode,
    safeCode,
    safeMessageKey: `stream.admin.kernelDiagnostics.routes.${safeCode}`,
    missingScopes: missing,
    rawSecretFieldsReturned: 0,
    providerCallsPerformed: 0,
    moneyMovementPerformed: 0,
    safety: STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_SAFETY,
  };
}

export function previewStreamFoundationKernelDiagnosticsAdminRoute(request: StreamFoundationKernelDiagnosticsAdminRouteRequest): StreamFoundationKernelDiagnosticsAdminRouteEnvelope {
  const routeDefinition = getStreamFoundationKernelDiagnosticsAdminRouteDefinition(request.routeId);
  if (!routeDefinition) {
    return blocked(request.routeId, 404, "stream_kernel_diagnostics_route_unknown");
  }
  const missing = missingScopes(routeDefinition.requiredScopes, request.scopes);
  if (missing.length > 0) {
    return blocked(request.routeId, 403, "stream_kernel_diagnostics_admin_scope_missing", missing);
  }
  if (request.routeMountApproved) {
    return blocked(request.routeId, 409, "stream_kernel_diagnostics_route_mount_still_blocked");
  }
  const snapshot = getStreamFoundationKernelDiagnosticsAdminHandoffSnapshot(toAdminHandoffRequest(request));
  const response: StreamFoundationKernelDiagnosticsAdminRouteResponseEnvelope = {
    version: STREAM_FOUNDATION_138J_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_VERSION,
    ok: true,
    routeId: request.routeId,
    mountedNow: false,
    statusCode: 200,
    safeCode: "stream_kernel_diagnostics_route_preview_ready",
    safeMessageKey: "stream.admin.kernelDiagnostics.routes.previewReady",
    snapshot,
    routeDefinition,
    requestedAdminUserIdRedacted: redactedAdminUserId(request.adminUserId),
    rawSecretFieldsReturned: 0,
    providerCallsPerformed: 0,
    moneyMovementPerformed: 0,
    safety: STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_SAFETY,
  };
  return response;
}

export function previewDefaultStreamFoundationKernelDiagnosticsAdminRoute(): StreamFoundationKernelDiagnosticsAdminRouteEnvelope {
  return previewStreamFoundationKernelDiagnosticsAdminRoute({
    routeId: "stream_kernel_diagnostics_snapshot",
    adminUserId: "admin-preview-user",
    scopes: ["admin:stream:read", "admin:stream:diagnostics:read"],
    routeMountApproved: false,
  });
}
