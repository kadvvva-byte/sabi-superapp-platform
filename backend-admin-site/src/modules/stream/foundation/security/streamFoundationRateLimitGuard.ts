import type {
  StreamFoundationRateLimitPolicy,
  StreamFoundationSecurityBlockCode,
  StreamFoundationSecurityGuardDecision,
  StreamFoundationSecurityRequest,
  StreamFoundationSecurityRouteContract,
} from "./streamFoundationSecurityGuardTypes";

export const STREAM_FOUNDATION_RATE_LIMIT_POLICIES: readonly StreamFoundationRateLimitPolicy[] = [
  { bucket: "stream_mobile_preview", maxRequests: 90, windowMs: 60_000, appliesToRouteKinds: ["mobile_preview", "mobile_read"], blockCode: "STREAM_RATE_LIMITED" },
  { bucket: "stream_mobile_write", maxRequests: 30, windowMs: 60_000, appliesToRouteKinds: ["mobile_write", "monetization_write"], blockCode: "STREAM_RATE_LIMITED" },
  { bucket: "stream_admin_read", maxRequests: 120, windowMs: 60_000, appliesToRouteKinds: ["admin_read"], blockCode: "STREAM_RATE_LIMITED" },
  { bucket: "stream_admin_write", maxRequests: 20, windowMs: 60_000, appliesToRouteKinds: ["admin_write", "monthly_payout_write"], blockCode: "STREAM_RATE_LIMITED" },
] as const;

function decision(
  status: StreamFoundationSecurityGuardDecision["status"],
  safeCode: StreamFoundationSecurityBlockCode,
  safeMessageKey: string,
  requiredBeforeExecution: readonly string[],
): StreamFoundationSecurityGuardDecision {
  return {
    guardId: "rate_limit",
    status,
    safeCode,
    safeMessageKey,
    requiredBeforeExecution,
    rawSecretReturned: false,
    databaseWriteNow: false,
    providerCallNow: false,
    moneyMovementNow: false,
  };
}

export function getStreamFoundationRateLimitPolicy(route: StreamFoundationSecurityRouteContract): StreamFoundationRateLimitPolicy {
  return STREAM_FOUNDATION_RATE_LIMIT_POLICIES.find((policy) => policy.appliesToRouteKinds.includes(route.routeKind))
    ?? STREAM_FOUNDATION_RATE_LIMIT_POLICIES[0];
}

export function evaluateStreamFoundationRateLimitGuard(
  route: StreamFoundationSecurityRouteContract | undefined,
  request: StreamFoundationSecurityRequest,
): StreamFoundationSecurityGuardDecision {
  if (!route) {
    return decision("blocked", "STREAM_ROUTE_NOT_MOUNTED", "stream.foundation.security.rate_limit.route_unknown", ["known route contract"]);
  }

  const policy = getStreamFoundationRateLimitPolicy(route);
  const actorStableKey = request.actorId ?? request.clientIpHash ?? request.sessionId;
  if (!actorStableKey) {
    return decision("review_required", "STREAM_RATE_LIMITED", "stream.foundation.security.rate_limit.identity_key_required", ["actor id", "session id", "hashed client ip"]);
  }

  return decision("passed", "STREAM_SECURITY_PASSED", "stream.foundation.security.rate_limit.passed", [
    `bucket:${policy.bucket}`,
    `max:${policy.maxRequests}`,
    `windowMs:${policy.windowMs}`,
  ]);
}
