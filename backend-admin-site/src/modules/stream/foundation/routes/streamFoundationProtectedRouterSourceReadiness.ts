import { getStreamFoundationProtectedRouterSourceModule, previewStreamFoundationProtectedRouterSource } from "./streamFoundationProtectedRoutes";
import {
  STREAM_FOUNDATION_PROTECTED_ROUTER_SOURCE_STAGE,
  type StreamFoundationProtectedRouterSourceReadinessSnapshot,
} from "./streamFoundationProtectedRouterSourceTypes";

export function getStreamFoundationProtectedRouterSourceReadinessSnapshot(): StreamFoundationProtectedRouterSourceReadinessSnapshot {
  const routerSource = getStreamFoundationProtectedRouterSourceModule();
  const samplePreviewResponses = routerSource.routes.slice(0, 7).map((route, index) =>
    previewStreamFoundationProtectedRouterSource({
      requestId: `137j-router-source-readiness-${index + 1}-${route.routeId}`,
      routeId: route.routeId,
      method: route.method as any,
      path: route.path,
      actorKind: route.adminPermissionRequired ? "admin" : "user",
      actorId: route.adminPermissionRequired ? "admin-137j-readiness" : "user-137j-readiness",
      sessionId: `session-137j-${index + 1}`,
      permissions: route.adminPermissionRequired ? (["stream:admin", "stream:monetization:write"] as any) : (["stream:read", "stream:write"] as any),
      idempotencyKey: route.idempotencyRequired ? `idem-137j-readiness-${index + 1}` : undefined,
      clientIpHash: `iphash-137j-${index + 1}`,
      userAgentHash: `uahash-137j-${index + 1}`,
      nowEpochMs: 0,
      body: {
        requestId: `body-137j-${index + 1}`,
        surface: "stream_entry",
        action: "open_surface",
        locale: "system_default",
      },
      dryRunOnly: true,
    }),
  );

  return {
    stage: STREAM_FOUNDATION_PROTECTED_ROUTER_SOURCE_STAGE,
    status: "protected_router_source_ready_not_mounted",
    routerSource,
    samplePreviewResponses,
    coverage: {
      routeMountPlanIncluded: true,
      routerSourceModuleCreated: true,
      protectedRoutesIncluded: true,
      handlerBindingsIncluded: true,
      securityGuardsIncluded: true,
      safeResponseEnvelopeIncluded: true,
      appServerUntouched: true,
      expressRouterInstanceCreatedNow: false,
      routeMountedNow: false,
      coveragePercent: 100,
    },
    safety: routerSource.safety,
  };
}
