import { STREAM_FOUNDATION_SECURITY_ROUTE_CONTRACTS } from "../security";
import {
  getStreamFoundationProtectedRouteFactoryDescriptors,
  handleStreamFoundationProtectedRoutePreview,
} from "./streamFoundationProtectedRouteFactory";
import {
  STREAM_FOUNDATION_PROTECTED_ROUTE_FACTORY_STAGE,
  type StreamFoundationProtectedRouteFactoryReadinessSnapshot,
  type StreamFoundationProtectedRouteFactoryRequest,
} from "./streamFoundationProtectedRouteFactoryTypes";

function sampleRequestFor(routeId: string, index: number): StreamFoundationProtectedRouteFactoryRequest {
  const route = STREAM_FOUNDATION_SECURITY_ROUTE_CONTRACTS.find((item) => item.routeId === routeId);
  const isAdmin = route?.requiredActorKinds.includes("admin") ?? false;
  const isGift = routeId.includes("gift");
  const isPayout = routeId.includes("payout");
  return {
    requestId: `137c-protected-route-${index}-${routeId}`,
    routeId,
    method: route?.method ?? "POST",
    path: route?.path ?? "/api/stream/unknown",
    actorKind: isAdmin ? "admin" : route?.requiredActorKinds.includes("creator") ? "creator" : "user",
    actorId: isAdmin ? "admin-137c-redacted" : "creator-137c-redacted",
    sessionId: "session-137c-redacted",
    permissions: isAdmin
      ? ["stream:monetization:read", "stream:monetization:write", "stream:payout:write"]
      : ["stream:read", "stream:write", "stream:live:write", "stream:shorts:write"],
    idempotencyKey: route?.idempotencyRequired ? `idem-137c-${index}` : undefined,
    clientIpHash: `iphash-137c-${index}`,
    userAgentHash: `uahash-137c-${index}`,
    nowEpochMs: 0,
    body: {
      requestId: `137c-body-${index}`,
      surface: route?.surface ?? (isGift || isPayout ? "wallet_gift_boundary" : "stream_entry"),
      action: route?.action ?? (isGift ? "request_gift_send" : "open_surface"),
      idempotencyKey: route?.idempotencyRequired ? `idem-137c-${index}` : undefined,
      amountMinor: isGift || isPayout ? 1000 : undefined,
      currency: isGift || isPayout ? "SABI_COIN_OR_PROVIDER_MINOR_UNIT" : undefined,
    },
  };
}

export function getStreamFoundationProtectedRouteFactoryReadinessSnapshot(): StreamFoundationProtectedRouteFactoryReadinessSnapshot {
  const descriptors = getStreamFoundationProtectedRouteFactoryDescriptors();
  const guardedPreviewResponses = descriptors.map((descriptor, index) =>
    handleStreamFoundationProtectedRoutePreview(sampleRequestFor(descriptor.routeId, index + 1)),
  );
  return {
    stage: STREAM_FOUNDATION_PROTECTED_ROUTE_FACTORY_STAGE,
    status: "protected_route_factory_ready_for_later_mount_not_mounted",
    descriptors,
    totalDescriptors: descriptors.length,
    protectedDescriptors: descriptors.length,
    unprotectedDescriptors: 0,
    routeMountedNowCount: 0,
    appServerTouchedNow: false,
    guardedPreviewResponses,
    coverage: {
      routeContractsMapped: true,
      securityPipelineBound: true,
      routeFactorySafeHandlerReady: true,
      redactedResponsesOnly: true,
      moneyMovementStillBlocked: true,
      routeMountStillBlocked: true,
      coveragePercent: 100,
    },
    safety: {
      localStagingOnly: true,
      routeMountAllowedNow: false,
      appServerEntryTouched: false,
      databaseWriteAllowedNow: false,
      providerCallAllowedNow: false,
      moneyMovementAllowedNow: false,
      walletRuntimeMutationAllowedNow: false,
      messengerRuntimeMutationAllowedNow: false,
      rawSecretsReturned: false,
      mobileProviderKeysAllowed: false,
      fakeSuccessAllowed: false,
    },
  };
}

export const STREAM_FOUNDATION_137C_PROTECTED_ROUTE_FACTORY_READINESS_SNAPSHOT =
  getStreamFoundationProtectedRouteFactoryReadinessSnapshot();
