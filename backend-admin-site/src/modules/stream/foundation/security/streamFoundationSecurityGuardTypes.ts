import type { StreamFoundationAction, StreamFoundationSurface } from "../core";

export const STREAM_FOUNDATION_SECURITY_GUARDS_STAGE = "BACKEND_STREAM_FOUNDATION_137B_SECURITY_GUARDS_STAGING" as const;

export type StreamFoundationSecurityRouteKind =
  | "mobile_preview"
  | "mobile_read"
  | "mobile_write"
  | "admin_read"
  | "admin_write"
  | "monetization_write"
  | "monthly_payout_write";

export type StreamFoundationSecurityActorKind = "anonymous" | "user" | "creator" | "business" | "admin" | "system";

export type StreamFoundationSecurityGuardStatus = "passed" | "blocked" | "review_required";

export type StreamFoundationSecurityBlockCode =
  | "STREAM_SECURITY_PASSED"
  | "STREAM_AUTH_REQUIRED"
  | "STREAM_ADMIN_PERMISSION_REQUIRED"
  | "STREAM_CREATOR_APPROVAL_REQUIRED"
  | "STREAM_IDEMPOTENCY_REQUIRED"
  | "STREAM_RATE_LIMITED"
  | "STREAM_AUDIT_REQUIRED"
  | "STREAM_ROUTE_NOT_MOUNTED"
  | "STREAM_MONEY_MOVEMENT_BLOCKED"
  | "STREAM_PROVIDER_NOT_CONFIGURED";

export type StreamFoundationSecurityPermission =
  | "stream:read"
  | "stream:write"
  | "stream:live:write"
  | "stream:shorts:write"
  | "stream:moderation:read"
  | "stream:moderation:write"
  | "stream:monetization:read"
  | "stream:monetization:write"
  | "stream:payout:write";

export type StreamFoundationSecurityRouteContract = Readonly<{
  routeId: string;
  routeKind: StreamFoundationSecurityRouteKind;
  method: "GET" | "POST";
  path: string;
  surface?: StreamFoundationSurface;
  action?: StreamFoundationAction;
  requiredActorKinds: readonly StreamFoundationSecurityActorKind[];
  requiredPermissions: readonly StreamFoundationSecurityPermission[];
  idempotencyRequired: boolean;
  auditRequired: boolean;
  rateLimitBucket: string;
  routeMountedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
}>;

export type StreamFoundationSecurityRequest = Readonly<{
  requestId: string;
  routeId: string;
  actorKind: StreamFoundationSecurityActorKind;
  actorId?: string;
  sessionId?: string;
  permissions?: readonly StreamFoundationSecurityPermission[];
  idempotencyKey?: string;
  clientIpHash?: string;
  userAgentHash?: string;
  nowEpochMs?: number;
  metadata?: Readonly<Record<string, string | number | boolean | null>>;
}>;

export type StreamFoundationSecurityGuardDecision = Readonly<{
  guardId: "auth_session" | "rate_limit" | "audit" | "route_mount" | "money_movement";
  status: StreamFoundationSecurityGuardStatus;
  safeCode: StreamFoundationSecurityBlockCode;
  safeMessageKey: string;
  requiredBeforeExecution: readonly string[];
  rawSecretReturned: false;
  databaseWriteNow: false;
  providerCallNow: false;
  moneyMovementNow: false;
}>;

export type StreamFoundationRateLimitPolicy = Readonly<{
  bucket: string;
  maxRequests: number;
  windowMs: number;
  appliesToRouteKinds: readonly StreamFoundationSecurityRouteKind[];
  blockCode: StreamFoundationSecurityBlockCode;
}>;

export type StreamFoundationAuditDraft = Readonly<{
  auditId: string;
  requestId: string;
  routeId: string;
  actorKind: StreamFoundationSecurityActorKind;
  actorIdRedacted: string;
  actionSummaryKey: string;
  idempotencyKeyPresent: boolean;
  persistedNow: false;
  externalAuditSinkCalledNow: false;
  rawSecretStoredNow: false;
}>;

export type StreamFoundationSecurityGuardPipelineResult = Readonly<{
  stage: typeof STREAM_FOUNDATION_SECURITY_GUARDS_STAGE;
  ok: boolean;
  status: "passed_local_staging" | "blocked_by_security_guard" | "review_required_before_mount";
  request: Readonly<{
    requestId: string;
    routeId: string;
    actorKind: StreamFoundationSecurityActorKind;
  }>;
  route?: StreamFoundationSecurityRouteContract;
  decisions: readonly StreamFoundationSecurityGuardDecision[];
  auditDraft?: StreamFoundationAuditDraft;
  safeCode: StreamFoundationSecurityBlockCode;
  safeMessageKey: string;
  routeMountAllowedNow: false;
  runtimeExecutionAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
  rawSecretsReturned: false;
  mobileProviderKeysAllowed: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
}>;

export type StreamFoundationSecurityGuardReadinessSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_SECURITY_GUARDS_STAGE;
  status: "security_guards_ready_for_staging_not_mounted";
  routeContracts: readonly StreamFoundationSecurityRouteContract[];
  totalRouteContracts: number;
  guardedRouteContracts: number;
  unguardedRouteContracts: number;
  idempotencyProtectedWrites: number;
  auditProtectedRoutes: number;
  adminPermissionProtectedRoutes: number;
  moneyMovementBlockedRoutes: number;
  sampleResults: readonly StreamFoundationSecurityGuardPipelineResult[];
  coverage: Readonly<{
    authSessionGuardReady: true;
    adminPermissionGuardReady: true;
    idempotencyGuardReady: true;
    rateLimitGuardReady: true;
    auditGuardReady: true;
    routeMountStillBlocked: true;
    moneyMovementStillBlocked: true;
    rawSecretReturnBlocked: true;
    coveragePercent: 100;
  }>;
  safety: Readonly<{
    localStagingOnly: true;
    routeMountAllowedNow: false;
    appServerEntryTouched: false;
    databaseWriteAllowedNow: false;
    providerCallAllowedNow: false;
    moneyMovementAllowedNow: false;
    walletRuntimeMutationAllowedNow: false;
    messengerRuntimeMutationAllowedNow: false;
    rawSecretsReturned: false;
    mobileProviderKeysAllowed: false;
    fakeSuccessAllowed: false;
  }>;
}>;
