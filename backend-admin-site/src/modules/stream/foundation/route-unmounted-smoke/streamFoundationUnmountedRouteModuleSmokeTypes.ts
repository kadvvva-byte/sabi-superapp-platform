import type { StreamFoundationProtectedRouterSourcePreviewResponse, StreamFoundationProtectedRouterSourceRoute } from "../routes";

export const STREAM_FOUNDATION_UNMOUNTED_ROUTE_MODULE_SMOKE_STAGE = "BACKEND_STREAM_FOUNDATION_137K_UNMOUNTED_ROUTE_MODULE_SMOKE_STAGING" as const;

export type StreamFoundationUnmountedRouteModuleSmokeStatus = "passed" | "review_required" | "blocked";

export type StreamFoundationUnmountedRouteModuleSmokeSafetyPolicy = Readonly<{
  localStagingOnly: true;
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

export type StreamFoundationUnmountedRouteModuleSmokeObservation = Readonly<{
  routeSourceFound: boolean;
  exportedHandlerNamePresent: boolean;
  protectedBySecurityPipeline: boolean;
  responseEnvelopeRequired: boolean;
  previewResponseFound: boolean;
  previewStatusCode: 0 | 400 | 403 | 409 | 423;
  safeCodePresent: boolean;
  safeMessageKeyPresent: boolean;
  requiredBeforeLiveMountPresent: boolean;
  handlerPreviewFound: boolean;
  protectedResponseFound: boolean;
  routeMountedNow: boolean;
  expressRouterInstanceCreatedNow: boolean;
  appServerTouchedNow: boolean;
  runtimeExecutionAllowedNow: boolean;
  databaseReadAllowedNow: boolean;
  databaseWriteAllowedNow: boolean;
  providerCallAllowedNow: boolean;
  realtimePublishAllowedNow: boolean;
  mediaStorageWriteAllowedNow: boolean;
  walletMutationAllowedNow: boolean;
  messengerMutationAllowedNow: boolean;
  moneyMovementAllowedNow: boolean;
  rawSecretsReturned: boolean;
  mobileProviderKeysAllowed: boolean;
  fakePaymentSuccessAllowed: boolean;
  fakeGiftSuccessAllowed: boolean;
  fakePayoutSuccessAllowed: boolean;
  fakeSuccessAllowed: boolean;
}>;

export type StreamFoundationUnmountedRouteModuleSmokeCase = Readonly<{
  caseId: string;
  routeId: string;
  method: StreamFoundationProtectedRouterSourceRoute["method"];
  path: string;
  plannedFullPath: string;
  exportedHandlerName: string;
  handlerKind: StreamFoundationProtectedRouterSourceRoute["handlerKind"];
  runtimeMode: StreamFoundationProtectedRouterSourceRoute["runtimeMode"];
  status: StreamFoundationUnmountedRouteModuleSmokeStatus;
  safeCode:
    | "STREAM_UNMOUNTED_ROUTE_MODULE_SMOKE_PASSED"
    | "STREAM_UNMOUNTED_ROUTE_MODULE_REVIEW_REQUIRED"
    | "STREAM_UNMOUNTED_ROUTE_MODULE_SMOKE_BLOCKED";
  safeMessageKey: string;
  observation: StreamFoundationUnmountedRouteModuleSmokeObservation;
  sourceRoute: StreamFoundationProtectedRouterSourceRoute;
  previewResponse: StreamFoundationProtectedRouterSourcePreviewResponse;
}>;

export type StreamFoundationUnmountedRouteModuleSmokeSummary = Readonly<{
  totalCases: number;
  passedCases: number;
  reviewRequiredCases: number;
  blockedCases: number;
  coveragePercent: number;
  allRoutesCovered: boolean;
  allRoutesRemainUnmounted: boolean;
  allRoutesProtectedBySecurityPipeline: boolean;
  allResponsesUseSafeEnvelope: boolean;
  noRawSecretsReturned: boolean;
  noMobileProviderKeys: boolean;
  noFakeMoneySuccess: boolean;
}>;

export type StreamFoundationUnmountedRouteModuleSmokeReadinessSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_UNMOUNTED_ROUTE_MODULE_SMOKE_STAGE;
  status: "unmounted_route_module_smoke_passed_not_mounted" | "unmounted_route_module_smoke_review_required" | "unmounted_route_module_smoke_blocked";
  cases: readonly StreamFoundationUnmountedRouteModuleSmokeCase[];
  summary: StreamFoundationUnmountedRouteModuleSmokeSummary;
  requiredBeforeLiveMount: readonly string[];
  safety: StreamFoundationUnmountedRouteModuleSmokeSafetyPolicy;
}>;
