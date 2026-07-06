import type {
  StreamFoundationSecurityBlockCode,
  StreamFoundationSecurityGuardDecision,
  StreamFoundationSecurityPermission,
  StreamFoundationSecurityRequest,
  StreamFoundationSecurityRouteContract,
} from "./streamFoundationSecurityGuardTypes";

function includesPermission(owned: readonly StreamFoundationSecurityPermission[] | undefined, required: StreamFoundationSecurityPermission): boolean {
  return Array.isArray(owned) && owned.includes(required);
}

function decision(
  status: StreamFoundationSecurityGuardDecision["status"],
  safeCode: StreamFoundationSecurityBlockCode,
  safeMessageKey: string,
  requiredBeforeExecution: readonly string[],
): StreamFoundationSecurityGuardDecision {
  return {
    guardId: "auth_session",
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

export function evaluateStreamFoundationAuthSessionGuard(
  route: StreamFoundationSecurityRouteContract | undefined,
  request: StreamFoundationSecurityRequest,
): StreamFoundationSecurityGuardDecision {
  if (!route) {
    return decision("blocked", "STREAM_ROUTE_NOT_MOUNTED", "stream.foundation.security.route.unknown", ["known route contract"]);
  }

  if (!route.requiredActorKinds.includes(request.actorKind)) {
    return decision("blocked", "STREAM_AUTH_REQUIRED", "stream.foundation.security.auth.actor_required", ["valid authenticated actor", "session validation"]);
  }

  const requiresNonAnonymous = route.requiredActorKinds.some((kind) => kind !== "anonymous");
  if (requiresNonAnonymous && (!request.actorId || !request.sessionId)) {
    return decision("blocked", "STREAM_AUTH_REQUIRED", "stream.foundation.security.auth.session_required", ["actorId", "sessionId", "server session verification"]);
  }

  const missingPermission = route.requiredPermissions.find((permission) => !includesPermission(request.permissions, permission));
  if (missingPermission) {
    return decision(
      "blocked",
      missingPermission.startsWith("stream:monetization") || missingPermission.startsWith("stream:payout")
        ? "STREAM_ADMIN_PERMISSION_REQUIRED"
        : "STREAM_AUTH_REQUIRED",
      "stream.foundation.security.auth.permission_required",
      [`permission:${missingPermission}`, "admin RBAC matrix", "audit trail"],
    );
  }

  return decision("passed", "STREAM_SECURITY_PASSED", "stream.foundation.security.auth.passed", ["keep session verification enabled"]);
}

export function evaluateStreamFoundationIdempotencyGuard(
  route: StreamFoundationSecurityRouteContract | undefined,
  request: StreamFoundationSecurityRequest,
): StreamFoundationSecurityGuardDecision {
  if (!route) {
    return decision("blocked", "STREAM_ROUTE_NOT_MOUNTED", "stream.foundation.security.idempotency.route_unknown", ["known route contract"]);
  }

  if (route.idempotencyRequired && !request.idempotencyKey) {
    return decision("blocked", "STREAM_IDEMPOTENCY_REQUIRED", "stream.foundation.security.idempotency.required", ["idempotency key", "replay protection", "audit correlation"]);
  }

  return decision("passed", "STREAM_SECURITY_PASSED", "stream.foundation.security.idempotency.passed", ["keep idempotency guard enabled"]);
}
