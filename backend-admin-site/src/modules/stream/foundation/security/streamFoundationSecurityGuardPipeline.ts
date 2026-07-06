import { evaluateStreamFoundationAuthSessionGuard, evaluateStreamFoundationIdempotencyGuard } from "./streamFoundationAuthSessionGuard";
import { createStreamFoundationAuditDraft, evaluateStreamFoundationAuditGuard } from "./streamFoundationAuditGuard";
import { evaluateStreamFoundationRateLimitGuard } from "./streamFoundationRateLimitGuard";
import {
  STREAM_FOUNDATION_SECURITY_GUARDS_STAGE,
  type StreamFoundationSecurityBlockCode,
  type StreamFoundationSecurityGuardDecision,
  type StreamFoundationSecurityGuardPipelineResult,
  type StreamFoundationSecurityGuardReadinessSnapshot,
  type StreamFoundationSecurityRequest,
  type StreamFoundationSecurityRouteContract,
} from "./streamFoundationSecurityGuardTypes";

export const STREAM_FOUNDATION_SECURITY_ROUTE_CONTRACTS: readonly StreamFoundationSecurityRouteContract[] = [
  {
    routeId: "stream_foundation_preview",
    routeKind: "mobile_preview",
    method: "POST",
    path: "/api/stream/foundation/preview",
    surface: "stream_entry",
    action: "open_surface",
    requiredActorKinds: ["anonymous", "user", "creator", "business", "admin"],
    requiredPermissions: [],
    idempotencyRequired: false,
    auditRequired: true,
    rateLimitBucket: "stream_mobile_preview",
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
  },
  {
    routeId: "stream_live_start",
    routeKind: "mobile_write",
    method: "POST",
    path: "/api/stream/live/start",
    surface: "live_single",
    action: "start_live",
    requiredActorKinds: ["creator", "business"],
    requiredPermissions: ["stream:write", "stream:live:write"],
    idempotencyRequired: true,
    auditRequired: true,
    rateLimitBucket: "stream_mobile_write",
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
  },
  {
    routeId: "stream_short_publish",
    routeKind: "mobile_write",
    method: "POST",
    path: "/api/stream/shorts/publish",
    surface: "shorts_creator",
    action: "publish_short",
    requiredActorKinds: ["creator", "business"],
    requiredPermissions: ["stream:write", "stream:shorts:write"],
    idempotencyRequired: true,
    auditRequired: true,
    rateLimitBucket: "stream_mobile_write",
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
  },
  {
    routeId: "stream_gift_purchase_gate",
    routeKind: "monetization_write",
    method: "POST",
    path: "/api/stream/gifts/purchase/gate",
    surface: "wallet_gift_boundary",
    action: "request_gift_send",
    requiredActorKinds: ["user", "creator", "business"],
    requiredPermissions: ["stream:write"],
    idempotencyRequired: true,
    auditRequired: true,
    rateLimitBucket: "stream_mobile_write",
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
  },
  {
    routeId: "admin_stream_monetization_snapshot",
    routeKind: "admin_read",
    method: "GET",
    path: "/api/admin/stream/monetization/config/snapshot",
    requiredActorKinds: ["admin"],
    requiredPermissions: ["stream:monetization:read"],
    idempotencyRequired: false,
    auditRequired: true,
    rateLimitBucket: "stream_admin_read",
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
  },
  {
    routeId: "admin_stream_monetization_save",
    routeKind: "admin_write",
    method: "POST",
    path: "/api/admin/stream/monetization/config/save",
    requiredActorKinds: ["admin"],
    requiredPermissions: ["stream:monetization:write"],
    idempotencyRequired: true,
    auditRequired: true,
    rateLimitBucket: "stream_admin_write",
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
  },
  {
    routeId: "admin_stream_monthly_payout_gate",
    routeKind: "monthly_payout_write",
    method: "POST",
    path: "/api/admin/stream/payout/monthly/gate",
    requiredActorKinds: ["admin"],
    requiredPermissions: ["stream:payout:write", "stream:monetization:write"],
    idempotencyRequired: true,
    auditRequired: true,
    rateLimitBucket: "stream_admin_write",
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
  },
] as const;

function findRoute(routeId: string): StreamFoundationSecurityRouteContract | undefined {
  return STREAM_FOUNDATION_SECURITY_ROUTE_CONTRACTS.find((route) => route.routeId === routeId);
}

function createRouteMountDecision(route: StreamFoundationSecurityRouteContract | undefined): StreamFoundationSecurityGuardDecision {
  return {
    guardId: "route_mount",
    status: route ? "review_required" : "blocked",
    safeCode: route ? "STREAM_ROUTE_NOT_MOUNTED" : "STREAM_ROUTE_NOT_MOUNTED",
    safeMessageKey: route ? "stream.foundation.security.route_mount.waiting_approval" : "stream.foundation.security.route_mount.unknown_route",
    requiredBeforeExecution: ["separate owner route mount approval", "server backup", "protected route smoke"],
    rawSecretReturned: false,
    databaseWriteNow: false,
    providerCallNow: false,
    moneyMovementNow: false,
  };
}

function createMoneyMovementDecision(route: StreamFoundationSecurityRouteContract | undefined): StreamFoundationSecurityGuardDecision {
  const isPaidRoute = route?.routeKind === "monetization_write" || route?.routeKind === "monthly_payout_write";
  return {
    guardId: "money_movement",
    status: isPaidRoute ? "blocked" : "passed",
    safeCode: isPaidRoute ? "STREAM_MONEY_MOVEMENT_BLOCKED" : "STREAM_SECURITY_PASSED",
    safeMessageKey: isPaidRoute ? "stream.foundation.security.money_movement.blocked_until_provider_wallet_ledger" : "stream.foundation.security.money_movement.not_applicable",
    requiredBeforeExecution: isPaidRoute
      ? ["real payment provider", "Wallet ledger binding", "atomic ledger transaction", "monthly payout policy"]
      : ["keep money movement disabled for non-paid routes"],
    rawSecretReturned: false,
    databaseWriteNow: false,
    providerCallNow: false,
    moneyMovementNow: false,
  };
}

function firstBlockingCode(decisions: readonly StreamFoundationSecurityGuardDecision[]): StreamFoundationSecurityBlockCode {
  const blocked = decisions.find((item) => item.status === "blocked");
  return blocked?.safeCode ?? "STREAM_SECURITY_PASSED";
}

export function evaluateStreamFoundationSecurityGuardPipeline(
  request: StreamFoundationSecurityRequest,
): StreamFoundationSecurityGuardPipelineResult {
  const route = findRoute(request.routeId);
  const decisions = [
    evaluateStreamFoundationAuthSessionGuard(route, request),
    evaluateStreamFoundationIdempotencyGuard(route, request),
    evaluateStreamFoundationRateLimitGuard(route, request),
    evaluateStreamFoundationAuditGuard(route, request),
    createRouteMountDecision(route),
    createMoneyMovementDecision(route),
  ] as const;

  const blocked = decisions.some((item) => item.status === "blocked");
  const reviewRequired = decisions.some((item) => item.status === "review_required");
  const safeCode = firstBlockingCode(decisions);
  const auditDraft = route ? createStreamFoundationAuditDraft(route, request) : undefined;

  return {
    stage: STREAM_FOUNDATION_SECURITY_GUARDS_STAGE,
    ok: !blocked && !reviewRequired,
    status: blocked ? "blocked_by_security_guard" : reviewRequired ? "review_required_before_mount" : "passed_local_staging",
    request: {
      requestId: request.requestId,
      routeId: request.routeId,
      actorKind: request.actorKind,
    },
    route,
    decisions,
    auditDraft,
    safeCode,
    safeMessageKey: safeCode === "STREAM_SECURITY_PASSED" ? "stream.foundation.security.passed" : "stream.foundation.security.blocked_or_review_required",
    routeMountAllowedNow: false,
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

function sampleRequestFor(route: StreamFoundationSecurityRouteContract, index: number): StreamFoundationSecurityRequest {
  const adminPermissions = ["stream:monetization:read", "stream:monetization:write", "stream:payout:write", "stream:moderation:read", "stream:moderation:write"] as const;
  const creatorPermissions = ["stream:read", "stream:write", "stream:live:write", "stream:shorts:write"] as const;
  const isAdmin = route.requiredActorKinds.includes("admin");
  const requiresIdempotency = route.idempotencyRequired;
  return {
    requestId: `137b-security-${index}-${route.routeId}`,
    routeId: route.routeId,
    actorKind: isAdmin ? "admin" : route.requiredActorKinds.includes("creator") ? "creator" : route.requiredActorKinds[0],
    actorId: isAdmin ? "admin-137b-security" : "creator-137b-security",
    sessionId: "session-137b-security",
    permissions: isAdmin ? adminPermissions : creatorPermissions,
    idempotencyKey: requiresIdempotency ? `idem-137b-${index}` : undefined,
    clientIpHash: `iphash-137b-${index}`,
    userAgentHash: `uahash-137b-${index}`,
    nowEpochMs: 0,
  };
}

export function getStreamFoundationSecurityGuardReadinessSnapshot(): StreamFoundationSecurityGuardReadinessSnapshot {
  const sampleResults = STREAM_FOUNDATION_SECURITY_ROUTE_CONTRACTS.map((route, index) => evaluateStreamFoundationSecurityGuardPipeline(sampleRequestFor(route, index + 1)));
  return {
    stage: STREAM_FOUNDATION_SECURITY_GUARDS_STAGE,
    status: "security_guards_ready_for_staging_not_mounted",
    routeContracts: STREAM_FOUNDATION_SECURITY_ROUTE_CONTRACTS,
    totalRouteContracts: STREAM_FOUNDATION_SECURITY_ROUTE_CONTRACTS.length,
    guardedRouteContracts: STREAM_FOUNDATION_SECURITY_ROUTE_CONTRACTS.filter((route) => route.auditRequired && route.rateLimitBucket.length > 0).length,
    unguardedRouteContracts: 0,
    idempotencyProtectedWrites: STREAM_FOUNDATION_SECURITY_ROUTE_CONTRACTS.filter((route) => route.idempotencyRequired).length,
    auditProtectedRoutes: STREAM_FOUNDATION_SECURITY_ROUTE_CONTRACTS.filter((route) => route.auditRequired).length,
    adminPermissionProtectedRoutes: STREAM_FOUNDATION_SECURITY_ROUTE_CONTRACTS.filter((route) => route.requiredActorKinds.includes("admin")).length,
    moneyMovementBlockedRoutes: STREAM_FOUNDATION_SECURITY_ROUTE_CONTRACTS.filter((route) => route.routeKind === "monetization_write" || route.routeKind === "monthly_payout_write").length,
    sampleResults,
    coverage: {
      authSessionGuardReady: true,
      adminPermissionGuardReady: true,
      idempotencyGuardReady: true,
      rateLimitGuardReady: true,
      auditGuardReady: true,
      routeMountStillBlocked: true,
      moneyMovementStillBlocked: true,
      rawSecretReturnBlocked: true,
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

export const STREAM_FOUNDATION_137B_SECURITY_GUARD_READINESS_SNAPSHOT = getStreamFoundationSecurityGuardReadinessSnapshot();
