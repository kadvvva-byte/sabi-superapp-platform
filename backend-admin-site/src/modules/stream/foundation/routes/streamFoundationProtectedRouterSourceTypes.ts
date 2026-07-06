import type { StreamFoundationProtectedRouteFactoryRequest } from "../route-factory";
import type { StreamFoundationProtectedRouteHandlerBindingPreviewResponse } from "../route-handler-binding";
import type { StreamFoundationRouteMountSourcePatchPlan, StreamFoundationRouteMountSourcePatchPlanRoute } from "../route-mount-plan";

export const STREAM_FOUNDATION_PROTECTED_ROUTER_SOURCE_STAGE = "BACKEND_STREAM_FOUNDATION_137J_PROTECTED_ROUTER_SOURCE_STAGING" as const;

export type StreamFoundationProtectedRouterSourceStatus =
  | "protected_router_source_ready_not_mounted"
  | "protected_router_source_review_required_not_mounted"
  | "protected_router_source_blocked";

export type StreamFoundationProtectedRouterSourceSafetyPolicy = Readonly<{
  localStagingOnly: true;
  routerSourceModuleCreatedNow: true;
  routeMountAllowedNow: false;
  expressRouterInstanceCreatedNow: false;
  appServerTouchedNow: false;
  adminRouteTouchedNow: false;
  serverRestartAllowedNow: false;
  runtimeExecutionAllowedNow: false;
  databaseReadAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  realtimePublishAllowedNow: false;
  mediaStorageWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  messengerMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  rawSecretsReturned: false;
  mobileProviderKeysAllowed: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
  fakeSuccessAllowed: false;
}>;

export type StreamFoundationProtectedRouterSourceRoute = Readonly<{
  routerRouteId: string;
  routeId: string;
  method: StreamFoundationRouteMountSourcePatchPlanRoute["method"];
  path: string;
  plannedFullPath: string;
  handlerKind: StreamFoundationRouteMountSourcePatchPlanRoute["handlerKind"];
  runtimeMode: StreamFoundationRouteMountSourcePatchPlanRoute["runtimeMode"];
  exportedHandlerName: string;
  sourceFilePath: "src/modules/stream/foundation/routes/streamFoundationProtectedRoutes.ts";
  indexFilePath: "src/modules/stream/foundation/routes/index.ts";
  protectedBySecurityPipeline: true;
  responseEnvelopeRequired: true;
  idempotencyRequired: boolean;
  adminPermissionRequired: boolean;
  moneyMovementBlockedUntilProviderLedgerReady: boolean;
  routeMountAllowedNow: false;
  expressRouterInstanceCreatedNow: false;
  appServerTouchedNow: false;
  sourcePlanRoute: StreamFoundationRouteMountSourcePatchPlanRoute;
}>;

export type StreamFoundationProtectedRouterSourceModule = Readonly<{
  stage: typeof STREAM_FOUNDATION_PROTECTED_ROUTER_SOURCE_STAGE;
  status: StreamFoundationProtectedRouterSourceStatus;
  mountPlan: StreamFoundationRouteMountSourcePatchPlan;
  routes: readonly StreamFoundationProtectedRouterSourceRoute[];
  totalRoutes: number;
  readyRoutes: number;
  reviewRequiredRoutes: number;
  blockedRoutes: number;
  routerSourceModuleCreatedNow: true;
  expressRouterInstanceCreatedNow: false;
  routeMountedNow: false;
  appServerTouchedNow: false;
  canCopyRouterSourceToBackendAsUnMountedCode: boolean;
  canMountRouterNow: false;
  safety: StreamFoundationProtectedRouterSourceSafetyPolicy;
}>;

export type StreamFoundationProtectedRouterSourcePreviewRequest = Partial<StreamFoundationProtectedRouteFactoryRequest> &
  Readonly<{
    routeId?: string;
    method?: StreamFoundationProtectedRouteFactoryRequest["method"];
    path?: string;
    dryRunOnly?: boolean;
  }>;

export type StreamFoundationProtectedRouterSourcePreviewResponse = Readonly<{
  stage: typeof STREAM_FOUNDATION_PROTECTED_ROUTER_SOURCE_STAGE;
  ok: false;
  status: 400 | 403 | 409 | 423;
  routerStatus: "route_not_found" | "handler_preview_returned_mount_blocked" | "handler_preview_review_required" | "handler_preview_blocked";
  route?: StreamFoundationProtectedRouterSourceRoute;
  handlerPreview?: StreamFoundationProtectedRouteHandlerBindingPreviewResponse;
  safeCode:
    | "STREAM_PROTECTED_ROUTER_ROUTE_NOT_FOUND"
    | "STREAM_PROTECTED_ROUTER_HANDLER_MOUNT_BLOCKED"
    | "STREAM_PROTECTED_ROUTER_HANDLER_REVIEW_REQUIRED"
    | "STREAM_PROTECTED_ROUTER_HANDLER_BLOCKED";
  safeMessageKey: string;
  requiredBeforeLiveMount: readonly string[];
  safety: StreamFoundationProtectedRouterSourceSafetyPolicy;
}>;

export type StreamFoundationProtectedRouterSourceReadinessSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_PROTECTED_ROUTER_SOURCE_STAGE;
  status: "protected_router_source_ready_not_mounted";
  routerSource: StreamFoundationProtectedRouterSourceModule;
  samplePreviewResponses: readonly StreamFoundationProtectedRouterSourcePreviewResponse[];
  coverage: Readonly<{
    routeMountPlanIncluded: true;
    routerSourceModuleCreated: true;
    protectedRoutesIncluded: true;
    handlerBindingsIncluded: true;
    securityGuardsIncluded: true;
    safeResponseEnvelopeIncluded: true;
    appServerUntouched: true;
    expressRouterInstanceCreatedNow: false;
    routeMountedNow: false;
    coveragePercent: 100;
  }>;
  safety: StreamFoundationProtectedRouterSourceSafetyPolicy;
}>;
