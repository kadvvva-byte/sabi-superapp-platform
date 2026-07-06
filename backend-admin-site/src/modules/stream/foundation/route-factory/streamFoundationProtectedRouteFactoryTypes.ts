import type { StreamFoundationApiDraftResponse, StreamFoundationApiPreviewBody } from "../api";
import type {
  StreamFoundationSecurityGuardPipelineResult,
  StreamFoundationSecurityPermission,
  StreamFoundationSecurityRequest,
  StreamFoundationSecurityRouteContract,
} from "../security";

export const STREAM_FOUNDATION_PROTECTED_ROUTE_FACTORY_STAGE = "BACKEND_STREAM_FOUNDATION_137C_PROTECTED_ROUTE_FACTORY_STAGING" as const;

export type StreamFoundationProtectedRouteFactoryMethod = "GET" | "POST";

export type StreamFoundationProtectedRouteFactoryHandlerKind =
  | "foundation_preview"
  | "foundation_readiness"
  | "foundation_safety"
  | "live_write_gate"
  | "shorts_write_gate"
  | "gift_purchase_gate"
  | "admin_monetization_read"
  | "admin_monetization_write"
  | "monthly_payout_gate";

export type StreamFoundationProtectedRouteFactoryStatus =
  | "ready_for_protected_mount_later"
  | "blocked_by_security_guard"
  | "blocked_route_not_mounted"
  | "blocked_unknown_route";

export type StreamFoundationProtectedRouteFactoryBody = StreamFoundationApiPreviewBody &
  Readonly<{
    idempotencyKey?: string;
    adminAction?: string;
    amountMinor?: number;
    currency?: string;
  }>;

export type StreamFoundationProtectedRouteFactoryRequest = Readonly<{
  requestId: string;
  routeId: string;
  method: StreamFoundationProtectedRouteFactoryMethod;
  path: string;
  actorKind: StreamFoundationSecurityRequest["actorKind"];
  actorId?: string;
  sessionId?: string;
  permissions?: readonly StreamFoundationSecurityPermission[];
  idempotencyKey?: string;
  clientIpHash?: string;
  userAgentHash?: string;
  nowEpochMs?: number;
  body?: Partial<StreamFoundationProtectedRouteFactoryBody>;
  query?: Readonly<Record<string, string | number | boolean | null>>;
}>;

export type StreamFoundationProtectedRouteFactoryResponse = Readonly<{
  stage: typeof STREAM_FOUNDATION_PROTECTED_ROUTE_FACTORY_STAGE;
  ok: boolean;
  status: 200 | 400 | 403 | 409 | 423;
  routeId: string;
  path: string;
  method: StreamFoundationProtectedRouteFactoryMethod;
  factoryStatus: StreamFoundationProtectedRouteFactoryStatus;
  handlerKind?: StreamFoundationProtectedRouteFactoryHandlerKind;
  securityResult: StreamFoundationSecurityGuardPipelineResult;
  apiPreview?: StreamFoundationApiDraftResponse;
  safeCode: string;
  safeMessageKey: string;
  requiredBeforeLiveMount: readonly string[];
  redactedResponseOnly: true;
  routeMountedNow: false;
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

export type StreamFoundationProtectedRouteFactoryDescriptor = Readonly<{
  routeId: string;
  handlerKind: StreamFoundationProtectedRouteFactoryHandlerKind;
  contract: StreamFoundationSecurityRouteContract;
  securityGuardRequired: true;
  idempotencyGuardRequired: boolean;
  auditGuardRequired: true;
  rateLimitGuardRequired: true;
  returnsRedactedEnvelope: true;
  routeMountedNow: false;
  appServerTouchedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
}>;

export type StreamFoundationProtectedRouteFactoryReadinessSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_PROTECTED_ROUTE_FACTORY_STAGE;
  status: "protected_route_factory_ready_for_later_mount_not_mounted";
  descriptors: readonly StreamFoundationProtectedRouteFactoryDescriptor[];
  totalDescriptors: number;
  protectedDescriptors: number;
  unprotectedDescriptors: 0;
  routeMountedNowCount: 0;
  appServerTouchedNow: false;
  guardedPreviewResponses: readonly StreamFoundationProtectedRouteFactoryResponse[];
  coverage: Readonly<{
    routeContractsMapped: true;
    securityPipelineBound: true;
    routeFactorySafeHandlerReady: true;
    redactedResponsesOnly: true;
    moneyMovementStillBlocked: true;
    routeMountStillBlocked: true;
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
