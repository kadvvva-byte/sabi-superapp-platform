import type {
  StreamFoundationProtectedRouteFactoryHandlerKind,
  StreamFoundationProtectedRouteFactoryMethod,
  StreamFoundationProtectedRouteFactoryResponse,
} from "../route-factory";
import type { StreamFoundationSecurityPermission, StreamFoundationSecurityRouteKind } from "../security";

export const STREAM_FOUNDATION_PROTECTED_ROUTE_DEFINITIONS_STAGE = "BACKEND_STREAM_FOUNDATION_137D_PROTECTED_ROUTE_DEFINITIONS_STAGING" as const;

export type StreamFoundationProtectedRouteDefinitionGroup =
  | "mobile_foundation"
  | "mobile_live"
  | "mobile_shorts"
  | "mobile_gifts"
  | "admin_monetization"
  | "admin_payout";

export type StreamFoundationProtectedRouteDefinitionStatus =
  | "definition_ready_mount_blocked"
  | "definition_blocked_until_provider_wallet_ledger"
  | "definition_blocked_until_admin_owner_approval";

export type StreamFoundationProtectedRouteBodyPolicy = Readonly<{
  acceptsJsonBody: boolean;
  requiresIdempotencyKey: boolean;
  acceptsProviderSecrets: false;
  acceptsRawCardData: false;
  acceptsRawWalletMutation: false;
  acceptsDirectMoneyMovement: false;
}>;

export type StreamFoundationProtectedRouteResponsePolicy = Readonly<{
  returnsRedactedEnvelopeOnly: true;
  returnsRawSecrets: false;
  returnsMobileProviderKeys: false;
  returnsFakePaymentSuccess: false;
  returnsFakeGiftSuccess: false;
  returnsFakePayoutSuccess: false;
}>;

export type StreamFoundationProtectedRouteDefinition = Readonly<{
  routeId: string;
  group: StreamFoundationProtectedRouteDefinitionGroup;
  routeKind: StreamFoundationSecurityRouteKind;
  method: StreamFoundationProtectedRouteFactoryMethod;
  path: string;
  handlerKind: StreamFoundationProtectedRouteFactoryHandlerKind;
  status: StreamFoundationProtectedRouteDefinitionStatus;
  requiredPermissions: readonly StreamFoundationSecurityPermission[];
  bodyPolicy: StreamFoundationProtectedRouteBodyPolicy;
  responsePolicy: StreamFoundationProtectedRouteResponsePolicy;
  mountedNow: false;
  appServerTouchedNow: false;
  databaseReadAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  realtimePublishAllowedNow: false;
  mediaStorageWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  messengerMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
}>;

export type StreamFoundationProtectedRouteDefinitionPreview = Readonly<{
  routeId: string;
  method: StreamFoundationProtectedRouteFactoryMethod;
  path: string;
  handlerKind: StreamFoundationProtectedRouteFactoryHandlerKind;
  protectedPreviewResponse: StreamFoundationProtectedRouteFactoryResponse;
  protectedBySecurityPipeline: true;
  mountedNow: false;
  runtimeExecutionAllowedNow: false;
}>;

export type StreamFoundationProtectedRouteDefinitionsReadinessSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_PROTECTED_ROUTE_DEFINITIONS_STAGE;
  status: "protected_route_definitions_ready_for_review_not_mounted";
  definitions: readonly StreamFoundationProtectedRouteDefinition[];
  previews: readonly StreamFoundationProtectedRouteDefinitionPreview[];
  totalDefinitions: number;
  mountedDefinitionsNow: 0;
  protectedDefinitions: number;
  unprotectedDefinitions: 0;
  monetizationDefinitions: number;
  adminDefinitions: number;
  blockedUntilProviderWalletLedger: number;
  coverage: Readonly<{
    routeFactoryBound: true;
    securityPipelineBound: true;
    liveRoutesDefined: true;
    shortsRoutesDefined: true;
    giftRoutesDefined: true;
    adminMonetizationRoutesDefined: true;
    monthlyPayoutRoutesDefined: true;
    routeMountStillBlocked: true;
    moneyMovementStillBlocked: true;
    coveragePercent: 100;
  }>;
  safety: Readonly<{
    localStagingOnly: true;
    routeMountAllowedNow: false;
    appServerEntryTouched: false;
    databaseReadAllowedNow: false;
    databaseWriteAllowedNow: false;
    providerCallAllowedNow: false;
    realtimePublishAllowedNow: false;
    mediaStorageWriteAllowedNow: false;
    walletRuntimeMutationAllowedNow: false;
    messengerRuntimeMutationAllowedNow: false;
    moneyMovementAllowedNow: false;
    rawSecretsReturned: false;
    mobileProviderKeysAllowed: false;
    fakeSuccessAllowed: false;
  }>;
}>;
