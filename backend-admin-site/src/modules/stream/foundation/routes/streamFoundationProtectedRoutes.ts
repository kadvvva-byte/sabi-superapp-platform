import {
  previewStreamFoundationProtectedRouteHandlerBinding,
  type StreamFoundationProtectedRouteHandlerBindingPreviewResponse,
} from "../route-handler-binding";
import { getStreamFoundationRouteMountSourcePatchPlan } from "../route-mount-plan";
import {
  STREAM_FOUNDATION_PROTECTED_ROUTER_SOURCE_STAGE,
  type StreamFoundationProtectedRouterSourceModule,
  type StreamFoundationProtectedRouterSourcePreviewRequest,
  type StreamFoundationProtectedRouterSourcePreviewResponse,
  type StreamFoundationProtectedRouterSourceRoute,
  type StreamFoundationProtectedRouterSourceSafetyPolicy,
  type StreamFoundationProtectedRouterSourceStatus,
} from "./streamFoundationProtectedRouterSourceTypes";

const SAFETY: StreamFoundationProtectedRouterSourceSafetyPolicy = {
  localStagingOnly: true,
  routerSourceModuleCreatedNow: true,
  routeMountAllowedNow: false,
  expressRouterInstanceCreatedNow: false,
  appServerTouchedNow: false,
  adminRouteTouchedNow: false,
  serverRestartAllowedNow: false,
  runtimeExecutionAllowedNow: false,
  databaseReadAllowedNow: false,
  databaseWriteAllowedNow: false,
  providerCallAllowedNow: false,
  realtimePublishAllowedNow: false,
  mediaStorageWriteAllowedNow: false,
  walletMutationAllowedNow: false,
  messengerMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  rawSecretsReturned: false,
  mobileProviderKeysAllowed: false,
  fakePaymentSuccessAllowed: false,
  fakeGiftSuccessAllowed: false,
  fakePayoutSuccessAllowed: false,
  fakeSuccessAllowed: false,
};

const REQUIRED_BEFORE_LIVE_MOUNT = [
  "copy router source into backend only after owner approval",
  "keep src/app.ts and src/server.ts untouched until mount stage",
  "run backend TypeScript before restart",
  "bind persistent audit sink before exposing write routes",
  "bind DB repositories before persistence routes go live",
  "bind accept-payment provider and payout provider as server-side secret refs only",
  "bind Wallet/COIN atomic ledger before gift purchase or monthly payout execution",
  "complete provider live-test before money movement is enabled",
] as const;

function exportedHandlerName(routeId: string): string {
  return `handle${routeId
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")}ProtectedRoute`;
}

function toRouterRoute(route: ReturnType<typeof getStreamFoundationRouteMountSourcePatchPlan>["routes"][number]): StreamFoundationProtectedRouterSourceRoute {
  return {
    routerRouteId: `137j-protected-router-source-${route.routeId}`,
    routeId: route.routeId,
    method: route.method,
    path: route.path,
    plannedFullPath: route.plannedFullPath,
    handlerKind: route.handlerKind,
    runtimeMode: route.runtimeMode,
    exportedHandlerName: exportedHandlerName(route.routeId),
    sourceFilePath: "src/modules/stream/foundation/routes/streamFoundationProtectedRoutes.ts",
    indexFilePath: "src/modules/stream/foundation/routes/index.ts",
    protectedBySecurityPipeline: true,
    responseEnvelopeRequired: true,
    idempotencyRequired: route.idempotencyRequired,
    adminPermissionRequired: route.adminPermissionRequired,
    moneyMovementBlockedUntilProviderLedgerReady: route.moneyMovementBlockedUntilProviderLedgerReady,
    routeMountAllowedNow: false,
    expressRouterInstanceCreatedNow: false,
    appServerTouchedNow: false,
    sourcePlanRoute: route,
  };
}

function statusFor(routes: readonly StreamFoundationProtectedRouterSourceRoute[]): StreamFoundationProtectedRouterSourceStatus {
  if (routes.some((route) => !route.sourcePlanRoute.sourceRouteEntryReadyForFuturePatch)) return "protected_router_source_blocked";
  if (routes.some((route) => route.sourcePlanRoute.sourceDryRunEntry.status === "route_entry_review_required")) {
    return "protected_router_source_review_required_not_mounted";
  }
  return "protected_router_source_ready_not_mounted";
}

function findRoute(
  routes: readonly StreamFoundationProtectedRouterSourceRoute[],
  request: StreamFoundationProtectedRouterSourcePreviewRequest,
): StreamFoundationProtectedRouterSourceRoute | undefined {
  if (request.routeId) return routes.find((route) => route.routeId === request.routeId);
  if (request.path && request.method) {
    return routes.find((route) => route.path === request.path && route.method === request.method);
  }
  if (request.path) return routes.find((route) => route.path === request.path || route.plannedFullPath === request.path);
  return undefined;
}

function routerStatusFor(handlerPreview: StreamFoundationProtectedRouteHandlerBindingPreviewResponse): StreamFoundationProtectedRouterSourcePreviewResponse["routerStatus"] {
  if (handlerPreview.bindingStatus === "handler_bound_mount_blocked") return "handler_preview_returned_mount_blocked";
  if (handlerPreview.bindingStatus === "handler_bound_review_required") return "handler_preview_review_required";
  return "handler_preview_blocked";
}

function safeCodeFor(status: StreamFoundationProtectedRouterSourcePreviewResponse["routerStatus"]): StreamFoundationProtectedRouterSourcePreviewResponse["safeCode"] {
  if (status === "route_not_found") return "STREAM_PROTECTED_ROUTER_ROUTE_NOT_FOUND";
  if (status === "handler_preview_review_required") return "STREAM_PROTECTED_ROUTER_HANDLER_REVIEW_REQUIRED";
  if (status === "handler_preview_blocked") return "STREAM_PROTECTED_ROUTER_HANDLER_BLOCKED";
  return "STREAM_PROTECTED_ROUTER_HANDLER_MOUNT_BLOCKED";
}

function safeMessageKeyFor(status: StreamFoundationProtectedRouterSourcePreviewResponse["routerStatus"]): string {
  if (status === "route_not_found") return "stream.foundation.protected_router.route_not_found";
  if (status === "handler_preview_review_required") return "stream.foundation.protected_router.handler_review_required_not_mounted";
  if (status === "handler_preview_blocked") return "stream.foundation.protected_router.handler_blocked";
  return "stream.foundation.protected_router.handler_ready_mount_blocked";
}

export function getStreamFoundationProtectedRouterSourceModule(): StreamFoundationProtectedRouterSourceModule {
  const mountPlan = getStreamFoundationRouteMountSourcePatchPlan();
  const routes = mountPlan.routes.map(toRouterRoute);
  const blockedRoutes = routes.filter((route) => !route.sourcePlanRoute.sourceRouteEntryReadyForFuturePatch).length;
  const reviewRequiredRoutes = routes.filter((route) => route.sourcePlanRoute.sourceDryRunEntry.status === "route_entry_review_required").length;

  return {
    stage: STREAM_FOUNDATION_PROTECTED_ROUTER_SOURCE_STAGE,
    status: statusFor(routes),
    mountPlan,
    routes,
    totalRoutes: routes.length,
    readyRoutes: routes.length - blockedRoutes - reviewRequiredRoutes,
    reviewRequiredRoutes,
    blockedRoutes,
    routerSourceModuleCreatedNow: true,
    expressRouterInstanceCreatedNow: false,
    routeMountedNow: false,
    appServerTouchedNow: false,
    canCopyRouterSourceToBackendAsUnMountedCode: blockedRoutes === 0,
    canMountRouterNow: false,
    safety: SAFETY,
  };
}

export function previewStreamFoundationProtectedRouterSource(
  request: StreamFoundationProtectedRouterSourcePreviewRequest,
): StreamFoundationProtectedRouterSourcePreviewResponse {
  const routerSource = getStreamFoundationProtectedRouterSourceModule();
  const route = findRoute(routerSource.routes, request);

  if (!route) {
    return {
      stage: STREAM_FOUNDATION_PROTECTED_ROUTER_SOURCE_STAGE,
      ok: false,
      status: 400,
      routerStatus: "route_not_found",
      safeCode: "STREAM_PROTECTED_ROUTER_ROUTE_NOT_FOUND",
      safeMessageKey: "stream.foundation.protected_router.route_not_found",
      requiredBeforeLiveMount: REQUIRED_BEFORE_LIVE_MOUNT,
      safety: SAFETY,
    };
  }

  const handlerPreview = previewStreamFoundationProtectedRouteHandlerBinding({
    requestId: request.requestId ?? `137j-router-preview-${route.routeId}`,
    routeId: route.routeId,
    method: route.method as any,
    path: route.path,
    actorKind: request.actorKind ?? "user",
    actorId: request.actorId ?? "stream-137j-preview-user",
    sessionId: request.sessionId ?? "stream-137j-preview-session",
    permissions: request.permissions,
    idempotencyKey: request.idempotencyKey ?? (route.idempotencyRequired ? `idem-137j-${route.routeId}` : undefined),
    clientIpHash: request.clientIpHash ?? "iphash-137j-preview",
    userAgentHash: request.userAgentHash ?? "uahash-137j-preview",
    nowEpochMs: request.nowEpochMs ?? 0,
    body: request.body,
    query: request.query,
    dryRunOnly: true,
  });
  const routerStatus = routerStatusFor(handlerPreview);

  return {
    stage: STREAM_FOUNDATION_PROTECTED_ROUTER_SOURCE_STAGE,
    ok: false,
    status: handlerPreview.status,
    routerStatus,
    route,
    handlerPreview,
    safeCode: safeCodeFor(routerStatus),
    safeMessageKey: safeMessageKeyFor(routerStatus),
    requiredBeforeLiveMount: REQUIRED_BEFORE_LIVE_MOUNT,
    safety: SAFETY,
  };
}

export function getStreamFoundationProtectedRouterSourceStage(): typeof STREAM_FOUNDATION_PROTECTED_ROUTER_SOURCE_STAGE {
  return STREAM_FOUNDATION_PROTECTED_ROUTER_SOURCE_STAGE;
}
