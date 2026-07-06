import {
  getStreamFoundationProtectedRouterSourceModule,
  previewStreamFoundationProtectedRouterSource,
  type StreamFoundationProtectedRouterSourcePreviewResponse,
  type StreamFoundationProtectedRouterSourceRoute,
} from "../routes";
import {
  STREAM_FOUNDATION_UNMOUNTED_ROUTE_MODULE_SMOKE_STAGE,
  type StreamFoundationUnmountedRouteModuleSmokeCase,
  type StreamFoundationUnmountedRouteModuleSmokeObservation,
  type StreamFoundationUnmountedRouteModuleSmokeSafetyPolicy,
  type StreamFoundationUnmountedRouteModuleSmokeStatus,
  type StreamFoundationUnmountedRouteModuleSmokeSummary,
} from "./streamFoundationUnmountedRouteModuleSmokeTypes";

const SAFETY: StreamFoundationUnmountedRouteModuleSmokeSafetyPolicy = {
  localStagingOnly: true,
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
  "explicit owner approval for real route mount",
  "copy source into /opt/sabi/backend only after staging package review",
  "run backend TypeScript on server before restart",
  "bind persistent audit sink before write routes are public",
  "bind DB repositories before live persistence",
  "bind accept-payment provider and payout provider as server-side secret refs only",
  "bind Wallet/COIN atomic ledger before gift success or payout execution",
  "complete provider live-test before money movement is enabled",
] as const;

function bool(value: unknown): boolean {
  return value === true;
}

function isNonEmptyString(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function smokeRequestBody(route: StreamFoundationProtectedRouterSourceRoute, index: number): Record<string, unknown> {
  if (route.handlerKind === "admin_monetization_read") {
    return { requestId: `body-137k-${index + 1}`, surface: "moderation_admin", action: "admin_monetization_snapshot", locale: "system_default" };
  }
  if (route.handlerKind === "admin_monetization_write") {
    return { requestId: `body-137k-${index + 1}`, surface: "moderation_admin", action: "admin_monetization_save", locale: "system_default" };
  }
  if (route.handlerKind === "gift_purchase_gate") {
    return { requestId: `body-137k-${index + 1}`, surface: "wallet_gift_boundary", action: "gift_send_boundary", locale: "system_default" };
  }
  if (route.handlerKind === "monthly_payout_gate") {
    return { requestId: `body-137k-${index + 1}`, surface: "wallet_gift_boundary", action: "monthly_payout_gate", locale: "system_default" };
  }
  if (route.handlerKind === "shorts_write_gate") {
    return { requestId: `body-137k-${index + 1}`, surface: "shorts_creator", action: "publish_short", locale: "system_default" };
  }
  if (route.handlerKind === "live_write_gate") {
    return { requestId: `body-137k-${index + 1}`, surface: "live_composer", action: "start_live", locale: "system_default" };
  }
  return { requestId: `body-137k-${index + 1}`, surface: "stream_entry", action: "open_surface", locale: "system_default" };
}

function previewFor(route: StreamFoundationProtectedRouterSourceRoute, index: number): StreamFoundationProtectedRouterSourcePreviewResponse {
  return previewStreamFoundationProtectedRouterSource({
    requestId: `137k-unmounted-route-smoke-${index + 1}-${route.routeId}`,
    routeId: route.routeId,
    method: route.method as any,
    path: route.path,
    actorKind: route.adminPermissionRequired ? "admin" : "user",
    actorId: route.adminPermissionRequired ? "admin-137k-smoke" : "user-137k-smoke",
    sessionId: `session-137k-${index + 1}`,
    permissions: route.adminPermissionRequired ? (["stream:admin", "stream:monetization:write"] as any) : (["stream:read", "stream:write"] as any),
    idempotencyKey: route.idempotencyRequired ? `idem-137k-${route.routeId}` : undefined,
    clientIpHash: `iphash-137k-${index + 1}`,
    userAgentHash: `uahash-137k-${index + 1}`,
    nowEpochMs: 0,
    body: smokeRequestBody(route, index),
    dryRunOnly: true,
  });
}

function observe(route: StreamFoundationProtectedRouterSourceRoute, previewResponse: StreamFoundationProtectedRouterSourcePreviewResponse): StreamFoundationUnmountedRouteModuleSmokeObservation {
  const handlerPreview = previewResponse.handlerPreview;
  const protectedResponse = handlerPreview?.protectedResponse;
  return {
    routeSourceFound: true,
    exportedHandlerNamePresent: isNonEmptyString(route.exportedHandlerName),
    protectedBySecurityPipeline: bool(route.protectedBySecurityPipeline),
    responseEnvelopeRequired: bool(route.responseEnvelopeRequired),
    previewResponseFound: Boolean(previewResponse),
    previewStatusCode: previewResponse.status,
    safeCodePresent: isNonEmptyString(previewResponse.safeCode),
    safeMessageKeyPresent: isNonEmptyString(previewResponse.safeMessageKey),
    requiredBeforeLiveMountPresent: previewResponse.requiredBeforeLiveMount.length > 0,
    handlerPreviewFound: Boolean(handlerPreview),
    protectedResponseFound: Boolean(protectedResponse),
    routeMountedNow: bool(route.routeMountAllowedNow) || bool(previewResponse.safety.routeMountAllowedNow) || bool(protectedResponse?.routeMountedNow),
    expressRouterInstanceCreatedNow: bool(route.expressRouterInstanceCreatedNow) || bool(previewResponse.safety.expressRouterInstanceCreatedNow),
    appServerTouchedNow: bool(route.appServerTouchedNow) || bool(previewResponse.safety.appServerTouchedNow) || false,
    runtimeExecutionAllowedNow: bool(previewResponse.safety.runtimeExecutionAllowedNow) || bool(protectedResponse?.runtimeExecutionAllowedNow),
    databaseReadAllowedNow: bool(previewResponse.safety.databaseReadAllowedNow),
    databaseWriteAllowedNow: bool(previewResponse.safety.databaseWriteAllowedNow) || bool(protectedResponse?.databaseWriteAllowedNow),
    providerCallAllowedNow: bool(previewResponse.safety.providerCallAllowedNow) || bool(protectedResponse?.providerCallAllowedNow),
    realtimePublishAllowedNow: bool(previewResponse.safety.realtimePublishAllowedNow),
    mediaStorageWriteAllowedNow: bool(previewResponse.safety.mediaStorageWriteAllowedNow),
    walletMutationAllowedNow: bool(previewResponse.safety.walletMutationAllowedNow),
    messengerMutationAllowedNow: bool(previewResponse.safety.messengerMutationAllowedNow),
    moneyMovementAllowedNow: bool(previewResponse.safety.moneyMovementAllowedNow) || bool(protectedResponse?.moneyMovementAllowedNow),
    rawSecretsReturned: bool(previewResponse.safety.rawSecretsReturned) || bool(protectedResponse?.rawSecretsReturned),
    mobileProviderKeysAllowed: bool(previewResponse.safety.mobileProviderKeysAllowed) || bool(protectedResponse?.mobileProviderKeysAllowed),
    fakePaymentSuccessAllowed: bool(previewResponse.safety.fakePaymentSuccessAllowed) || bool(protectedResponse?.fakePaymentSuccessAllowed),
    fakeGiftSuccessAllowed: bool(previewResponse.safety.fakeGiftSuccessAllowed) || bool(protectedResponse?.fakeGiftSuccessAllowed),
    fakePayoutSuccessAllowed: bool(previewResponse.safety.fakePayoutSuccessAllowed) || bool(protectedResponse?.fakePayoutSuccessAllowed),
    fakeSuccessAllowed: bool(previewResponse.safety.fakeSuccessAllowed),
  };
}

function isSafeObservation(observation: StreamFoundationUnmountedRouteModuleSmokeObservation): boolean {
  return (
    observation.routeSourceFound &&
    observation.exportedHandlerNamePresent &&
    observation.protectedBySecurityPipeline &&
    observation.responseEnvelopeRequired &&
    observation.previewResponseFound &&
    observation.previewStatusCode >= 200 &&
    observation.previewStatusCode < 500 &&
    observation.safeCodePresent &&
    observation.safeMessageKeyPresent &&
    observation.requiredBeforeLiveMountPresent &&
    observation.handlerPreviewFound &&
    observation.protectedResponseFound &&
    !observation.routeMountedNow &&
    !observation.expressRouterInstanceCreatedNow &&
    !observation.appServerTouchedNow &&
    !observation.runtimeExecutionAllowedNow &&
    !observation.databaseReadAllowedNow &&
    !observation.databaseWriteAllowedNow &&
    !observation.providerCallAllowedNow &&
    !observation.realtimePublishAllowedNow &&
    !observation.mediaStorageWriteAllowedNow &&
    !observation.walletMutationAllowedNow &&
    !observation.messengerMutationAllowedNow &&
    !observation.moneyMovementAllowedNow &&
    !observation.rawSecretsReturned &&
    !observation.mobileProviderKeysAllowed &&
    !observation.fakePaymentSuccessAllowed &&
    !observation.fakeGiftSuccessAllowed &&
    !observation.fakePayoutSuccessAllowed &&
    !observation.fakeSuccessAllowed
  );
}

function statusFor(route: StreamFoundationProtectedRouterSourceRoute, observation: StreamFoundationUnmountedRouteModuleSmokeObservation): StreamFoundationUnmountedRouteModuleSmokeStatus {
  if (!isSafeObservation(observation)) return "blocked";
  if (route.adminPermissionRequired || route.moneyMovementBlockedUntilProviderLedgerReady) return "review_required";
  return "passed";
}

function safeCodeFor(status: StreamFoundationUnmountedRouteModuleSmokeStatus): StreamFoundationUnmountedRouteModuleSmokeCase["safeCode"] {
  if (status === "passed") return "STREAM_UNMOUNTED_ROUTE_MODULE_SMOKE_PASSED";
  if (status === "review_required") return "STREAM_UNMOUNTED_ROUTE_MODULE_REVIEW_REQUIRED";
  return "STREAM_UNMOUNTED_ROUTE_MODULE_SMOKE_BLOCKED";
}

function safeMessageKeyFor(status: StreamFoundationUnmountedRouteModuleSmokeStatus): string {
  if (status === "passed") return "stream.foundation.unmounted_route_module.safe_not_mounted";
  if (status === "review_required") return "stream.foundation.unmounted_route_module.safe_review_required_before_mount";
  return "stream.foundation.unmounted_route_module.blocked_safety_expectation_failed";
}

function makeCase(route: StreamFoundationProtectedRouterSourceRoute, index: number): StreamFoundationUnmountedRouteModuleSmokeCase {
  const previewResponse = previewFor(route, index);
  const observation = observe(route, previewResponse);
  const status = statusFor(route, observation);
  return {
    caseId: `137k-unmounted-route-module-smoke-${index + 1}-${route.routeId}`,
    routeId: route.routeId,
    method: route.method,
    path: route.path,
    plannedFullPath: route.plannedFullPath,
    exportedHandlerName: route.exportedHandlerName,
    handlerKind: route.handlerKind,
    runtimeMode: route.runtimeMode,
    status,
    safeCode: safeCodeFor(status),
    safeMessageKey: safeMessageKeyFor(status),
    observation,
    sourceRoute: route,
    previewResponse,
  };
}

export function getStreamFoundationUnmountedRouteModuleSmokeCases(): readonly StreamFoundationUnmountedRouteModuleSmokeCase[] {
  return getStreamFoundationProtectedRouterSourceModule().routes.map(makeCase);
}

export function summarizeStreamFoundationUnmountedRouteModuleSmokeCases(
  cases: readonly StreamFoundationUnmountedRouteModuleSmokeCase[],
): StreamFoundationUnmountedRouteModuleSmokeSummary {
  const passedCases = cases.filter((item) => item.status === "passed").length;
  const reviewRequiredCases = cases.filter((item) => item.status === "review_required").length;
  const blockedCases = cases.filter((item) => item.status === "blocked").length;
  const safeCases = passedCases + reviewRequiredCases;
  const totalCases = cases.length;
  return {
    totalCases,
    passedCases,
    reviewRequiredCases,
    blockedCases,
    coveragePercent: totalCases === 0 ? 0 : Math.round((safeCases / totalCases) * 100),
    allRoutesCovered: totalCases === getStreamFoundationProtectedRouterSourceModule().totalRoutes && totalCases > 0,
    allRoutesRemainUnmounted: cases.every((item) => !item.observation.routeMountedNow && !item.observation.expressRouterInstanceCreatedNow && !item.observation.appServerTouchedNow),
    allRoutesProtectedBySecurityPipeline: cases.every((item) => item.observation.protectedBySecurityPipeline),
    allResponsesUseSafeEnvelope: cases.every((item) => item.observation.safeCodePresent && item.observation.safeMessageKeyPresent && item.observation.protectedResponseFound),
    noRawSecretsReturned: cases.every((item) => !item.observation.rawSecretsReturned),
    noMobileProviderKeys: cases.every((item) => !item.observation.mobileProviderKeysAllowed),
    noFakeMoneySuccess: cases.every(
      (item) => !item.observation.fakePaymentSuccessAllowed && !item.observation.fakeGiftSuccessAllowed && !item.observation.fakePayoutSuccessAllowed && !item.observation.fakeSuccessAllowed,
    ),
  };
}

export function getStreamFoundationUnmountedRouteModuleSmokeStage(): typeof STREAM_FOUNDATION_UNMOUNTED_ROUTE_MODULE_SMOKE_STAGE {
  return STREAM_FOUNDATION_UNMOUNTED_ROUTE_MODULE_SMOKE_STAGE;
}

export function getStreamFoundationUnmountedRouteModuleSmokeSafetyPolicy(): StreamFoundationUnmountedRouteModuleSmokeSafetyPolicy {
  return SAFETY;
}

export function getStreamFoundationUnmountedRouteModuleSmokeRequiredBeforeLiveMount(): typeof REQUIRED_BEFORE_LIVE_MOUNT {
  return REQUIRED_BEFORE_LIVE_MOUNT;
}
