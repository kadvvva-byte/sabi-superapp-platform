import { previewStreamFoundationFunctionalApi } from "../services";
import {
  evaluateStreamFoundationSecurityGuardPipeline,
  STREAM_FOUNDATION_SECURITY_ROUTE_CONTRACTS,
  type StreamFoundationSecurityRequest,
  type StreamFoundationSecurityRouteContract,
} from "../security";
import {
  STREAM_FOUNDATION_PROTECTED_ROUTE_FACTORY_STAGE,
  type StreamFoundationProtectedRouteFactoryDescriptor,
  type StreamFoundationProtectedRouteFactoryHandlerKind,
  type StreamFoundationProtectedRouteFactoryRequest,
  type StreamFoundationProtectedRouteFactoryResponse,
} from "./streamFoundationProtectedRouteFactoryTypes";

const REQUIRED_BEFORE_LIVE_MOUNT = [
  "separate owner approval for route mount",
  "server backup and rollback point",
  "real auth/session middleware binding",
  "persistent audit sink binding",
  "real DB repository binding for write routes",
  "real provider configuration for payment/payout routes",
  "Wallet ledger atomic commit binding for gifts and payouts",
] as const;

function handlerKindFor(route: StreamFoundationSecurityRouteContract): StreamFoundationProtectedRouteFactoryHandlerKind {
  if (route.routeId === "stream_foundation_preview") return "foundation_preview";
  if (route.routeId === "stream_live_start") return "live_write_gate";
  if (route.routeId === "stream_short_publish") return "shorts_write_gate";
  if (route.routeId === "stream_gift_purchase_gate") return "gift_purchase_gate";
  if (route.routeId === "admin_stream_monetization_snapshot") return "admin_monetization_read";
  if (route.routeId === "admin_stream_monetization_save") return "admin_monetization_write";
  if (route.routeId === "admin_stream_monthly_payout_gate") return "monthly_payout_gate";
  return "foundation_safety";
}

function toSecurityRequest(request: StreamFoundationProtectedRouteFactoryRequest): StreamFoundationSecurityRequest {
  return {
    requestId: request.requestId,
    routeId: request.routeId,
    actorKind: request.actorKind,
    actorId: request.actorId,
    sessionId: request.sessionId,
    permissions: request.permissions,
    idempotencyKey: request.idempotencyKey ?? (typeof request.body?.idempotencyKey === "string" ? request.body.idempotencyKey : undefined),
    clientIpHash: request.clientIpHash,
    userAgentHash: request.userAgentHash,
    nowEpochMs: request.nowEpochMs,
    metadata: {
      method: request.method,
      path: request.path,
      hasBody: Boolean(request.body),
    },
  };
}

function routeFor(routeId: string): StreamFoundationSecurityRouteContract | undefined {
  return STREAM_FOUNDATION_SECURITY_ROUTE_CONTRACTS.find((route) => route.routeId === routeId);
}

function canRunLocalPreview(route: StreamFoundationSecurityRouteContract | undefined): boolean {
  return route?.routeId === "stream_foundation_preview";
}

function createBlockedResponse(
  request: StreamFoundationProtectedRouteFactoryRequest,
  route: StreamFoundationSecurityRouteContract | undefined,
  securityResult: ReturnType<typeof evaluateStreamFoundationSecurityGuardPipeline>,
): StreamFoundationProtectedRouteFactoryResponse {
  const hasUnknownRoute = !route;
  const blocked = securityResult.decisions.some((decision) => decision.status === "blocked");
  const reviewRequired = securityResult.decisions.some((decision) => decision.status === "review_required");
  const factoryStatus = hasUnknownRoute
    ? "blocked_unknown_route"
    : blocked
      ? "blocked_by_security_guard"
      : reviewRequired
        ? "blocked_route_not_mounted"
        : "ready_for_protected_mount_later";
  return {
    stage: STREAM_FOUNDATION_PROTECTED_ROUTE_FACTORY_STAGE,
    ok: false,
    status: hasUnknownRoute ? 409 : blocked ? 403 : 423,
    routeId: request.routeId,
    path: request.path,
    method: request.method,
    factoryStatus,
    handlerKind: route ? handlerKindFor(route) : undefined,
    securityResult,
    safeCode: securityResult.safeCode,
    safeMessageKey: hasUnknownRoute ? "stream.foundation.route_factory.unknown_route" : securityResult.safeMessageKey,
    requiredBeforeLiveMount: REQUIRED_BEFORE_LIVE_MOUNT,
    redactedResponseOnly: true,
    routeMountedNow: false,
    runtimeExecutionAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretsReturned: false,
    mobileProviderKeysAllowed: false,
    fakePaymentSuccessAllowed: false,
    fakeGiftSuccessAllowed: false,
    fakePayoutSuccessAllowed: false,
  };
}

export function getStreamFoundationProtectedRouteFactoryDescriptors(): readonly StreamFoundationProtectedRouteFactoryDescriptor[] {
  return STREAM_FOUNDATION_SECURITY_ROUTE_CONTRACTS.map((contract) => ({
    routeId: contract.routeId,
    handlerKind: handlerKindFor(contract),
    contract,
    securityGuardRequired: true,
    idempotencyGuardRequired: contract.idempotencyRequired,
    auditGuardRequired: true,
    rateLimitGuardRequired: true,
    returnsRedactedEnvelope: true,
    routeMountedNow: false,
    appServerTouchedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
  }));
}

export function handleStreamFoundationProtectedRoutePreview(
  request: StreamFoundationProtectedRouteFactoryRequest,
): StreamFoundationProtectedRouteFactoryResponse {
  const route = routeFor(request.routeId);
  const securityResult = evaluateStreamFoundationSecurityGuardPipeline(toSecurityRequest(request));

  if (!route || !canRunLocalPreview(route)) {
    return createBlockedResponse(request, route, securityResult);
  }

  const apiPreview = previewStreamFoundationFunctionalApi({
    requestId: request.requestId,
    surface: request.body?.surface ?? route.surface ?? "stream_entry",
    action: request.body?.action ?? route.action ?? "open_surface",
    userId: request.actorId,
    sessionId: request.sessionId,
    locale: typeof request.body?.locale === "string" ? request.body.locale : "system_default",
    correlationId: request.requestId,
    metadata: {
      idempotencyKey: request.idempotencyKey ?? null,
      protectedRouteFactory: true,
      routeId: request.routeId,
    },
  });

  return {
    stage: STREAM_FOUNDATION_PROTECTED_ROUTE_FACTORY_STAGE,
    ok: false,
    status: 423,
    routeId: request.routeId,
    path: request.path,
    method: request.method,
    factoryStatus: "blocked_route_not_mounted",
    handlerKind: handlerKindFor(route),
    securityResult,
    apiPreview,
    safeCode: "STREAM_ROUTE_NOT_MOUNTED",
    safeMessageKey: "stream.foundation.route_factory.local_preview_ready_route_mount_blocked",
    requiredBeforeLiveMount: REQUIRED_BEFORE_LIVE_MOUNT,
    redactedResponseOnly: true,
    routeMountedNow: false,
    runtimeExecutionAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretsReturned: false,
    mobileProviderKeysAllowed: false,
    fakePaymentSuccessAllowed: false,
    fakeGiftSuccessAllowed: false,
    fakePayoutSuccessAllowed: false,
  };
}
