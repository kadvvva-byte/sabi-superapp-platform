import type {
  StreamFoundationAuditDraft,
  StreamFoundationSecurityBlockCode,
  StreamFoundationSecurityGuardDecision,
  StreamFoundationSecurityRequest,
  StreamFoundationSecurityRouteContract,
} from "./streamFoundationSecurityGuardTypes";

function decision(
  status: StreamFoundationSecurityGuardDecision["status"],
  safeCode: StreamFoundationSecurityBlockCode,
  safeMessageKey: string,
  requiredBeforeExecution: readonly string[],
): StreamFoundationSecurityGuardDecision {
  return {
    guardId: "audit",
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

function redactActorId(actorId: string | undefined): string {
  if (!actorId) return "missing_actor_id";
  if (actorId.length <= 8) return "actor_redacted";
  return `${actorId.slice(0, 4)}…${actorId.slice(-4)}`;
}

export function createStreamFoundationAuditDraft(
  route: StreamFoundationSecurityRouteContract,
  request: StreamFoundationSecurityRequest,
): StreamFoundationAuditDraft {
  return {
    auditId: `stream-audit-draft-${request.requestId}`,
    requestId: request.requestId,
    routeId: route.routeId,
    actorKind: request.actorKind,
    actorIdRedacted: redactActorId(request.actorId),
    actionSummaryKey: `stream.foundation.audit.${route.routeId}`,
    idempotencyKeyPresent: Boolean(request.idempotencyKey),
    persistedNow: false,
    externalAuditSinkCalledNow: false,
    rawSecretStoredNow: false,
  };
}

export function evaluateStreamFoundationAuditGuard(
  route: StreamFoundationSecurityRouteContract | undefined,
  request: StreamFoundationSecurityRequest,
): StreamFoundationSecurityGuardDecision {
  if (!route) {
    return decision("blocked", "STREAM_ROUTE_NOT_MOUNTED", "stream.foundation.security.audit.route_unknown", ["known route contract"]);
  }

  if (!route.auditRequired) {
    return decision("review_required", "STREAM_AUDIT_REQUIRED", "stream.foundation.security.audit.must_stay_required", ["audit draft required for every Stream route"]);
  }

  if (!request.requestId) {
    return decision("blocked", "STREAM_AUDIT_REQUIRED", "stream.foundation.security.audit.request_id_required", ["requestId", "correlation id"]);
  }

  return decision("passed", "STREAM_SECURITY_PASSED", "stream.foundation.security.audit.passed", ["audit draft", "redacted actor", "no raw secrets"]);
}
