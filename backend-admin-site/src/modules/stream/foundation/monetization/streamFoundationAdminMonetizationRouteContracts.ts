import type {
  StreamFoundationAdminMonetizationApiActor,
  StreamFoundationAdminMonetizationApiOperation,
  StreamFoundationAdminMonetizationApiPolicyInput,
  StreamFoundationAdminMonetizationApiProviderConfigInput,
  StreamFoundationAdminMonetizationApiResponse,
  StreamFoundationAdminMonetizationApiSafeConfigSnapshot,
} from "./streamFoundationAdminSecureMonetizationApiContracts";
import type { StreamFoundationAdminMonetizationConfigInput } from "./streamFoundationAdminMonetizationConfigContracts";

export const STREAM_FOUNDATION_ADMIN_MONETIZATION_ROUTE_STAGE = "BACKEND_STREAM_FOUNDATION_136W_ADMIN_MONETIZATION_ROUTE_STAGING" as const;

export type StreamFoundationAdminMonetizationRouteStage = typeof STREAM_FOUNDATION_ADMIN_MONETIZATION_ROUTE_STAGE;

export type StreamFoundationAdminMonetizationRoutePath =
  | "/api/admin/stream/monetization/config/snapshot"
  | "/api/admin/stream/monetization/config/validate"
  | "/api/admin/stream/monetization/config/provider-ref"
  | "/api/admin/stream/monetization/config/monthly-payout-policy"
  | "/api/admin/stream/monetization/config/provider-live-test-gate"
  | "/api/admin/stream/monetization/config/disable-provider"
  | "/api/admin/stream/monetization/config/rotate-provider-secret-ref"
  | "/api/admin/stream/monetization/config/readiness";

export type StreamFoundationAdminMonetizationRouteMethod = "GET" | "POST";

export type StreamFoundationAdminMonetizationRouteBody = Readonly<{
  operation?: StreamFoundationAdminMonetizationApiOperation;
  draftConfig?: StreamFoundationAdminMonetizationConfigInput;
  providerConfig?: StreamFoundationAdminMonetizationApiProviderConfigInput;
  policy?: StreamFoundationAdminMonetizationApiPolicyInput;
  clientCreatedAt?: string;
}>;

export type StreamFoundationAdminMonetizationRouteRequest = Readonly<{
  requestId: string;
  idempotencyKey: string;
  method: StreamFoundationAdminMonetizationRouteMethod;
  path: StreamFoundationAdminMonetizationRoutePath;
  actor: StreamFoundationAdminMonetizationApiActor;
  body?: StreamFoundationAdminMonetizationRouteBody;
}>;

export type StreamFoundationAdminMonetizationRouteDecisionCode =
  | "admin_monetization_route_snapshot_ready"
  | "admin_monetization_route_validation_ready"
  | "admin_monetization_route_in_memory_provider_ref_saved"
  | "admin_monetization_route_in_memory_policy_saved"
  | "admin_monetization_route_in_memory_provider_disabled"
  | "admin_monetization_route_secret_rotation_ref_checked"
  | "admin_monetization_route_readiness_ready"
  | "admin_monetization_route_blocked_invalid_method"
  | "admin_monetization_route_blocked_invalid_request"
  | "admin_monetization_route_blocked_permission_required"
  | "admin_monetization_route_blocked_raw_secret_forbidden"
  | "admin_monetization_route_blocked_provider_call_required"
  | "admin_monetization_route_blocked_route_mount_required";

export type StreamFoundationAdminMonetizationRouteAuditDraft = Readonly<{
  auditId: string;
  requestId: string;
  operation: StreamFoundationAdminMonetizationApiOperation;
  adminUserId: string;
  safeAction: string;
  inMemoryOnly: true;
  persistedNow: false;
  auditPersistRequiredLater: true;
  rawSecretCaptured: false;
  providerCallExecuted: false;
  moneyMovementExecuted: false;
}>;

export type StreamFoundationAdminMonetizationRouteStateSnapshot = Readonly<{
  stage: StreamFoundationAdminMonetizationRouteStage;
  safeConfigSnapshot: StreamFoundationAdminMonetizationApiSafeConfigSnapshot;
  inMemoryProviderRefUpdates: number;
  inMemoryPolicyUpdates: number;
  inMemoryDisableUpdates: number;
  inMemorySecretRotationChecks: number;
  auditDrafts: readonly StreamFoundationAdminMonetizationRouteAuditDraft[];
  redactedResponsesOnly: true;
  rawSecretValuesReturned: false;
  mobileProviderKeysReturned: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
}>;

export type StreamFoundationAdminMonetizationRouteResponse = Readonly<{
  stage: StreamFoundationAdminMonetizationRouteStage;
  status: 200 | 202 | 400 | 403 | 405 | 409 | 422;
  ok: boolean;
  decisionCode: StreamFoundationAdminMonetizationRouteDecisionCode;
  safeMessageKey: string;
  path: StreamFoundationAdminMonetizationRoutePath;
  method: StreamFoundationAdminMonetizationRouteMethod;
  apiPreview: StreamFoundationAdminMonetizationApiResponse;
  stateSnapshot: StreamFoundationAdminMonetizationRouteStateSnapshot;
  auditDraft?: StreamFoundationAdminMonetizationRouteAuditDraft;
  routeMountAllowedNow: false;
  routeMountedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
  rawSecretValuesReturned: false;
  mobileProviderKeysReturned: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
}>;

export const STREAM_FOUNDATION_ADMIN_MONETIZATION_ROUTE_ALLOWED_PATHS: readonly StreamFoundationAdminMonetizationRoutePath[] = [
  "/api/admin/stream/monetization/config/snapshot",
  "/api/admin/stream/monetization/config/validate",
  "/api/admin/stream/monetization/config/provider-ref",
  "/api/admin/stream/monetization/config/monthly-payout-policy",
  "/api/admin/stream/monetization/config/provider-live-test-gate",
  "/api/admin/stream/monetization/config/disable-provider",
  "/api/admin/stream/monetization/config/rotate-provider-secret-ref",
  "/api/admin/stream/monetization/config/readiness",
] as const;
