import type {
  StreamFoundationProtectedRouteDefinition,
  StreamFoundationProtectedRouteDefinitionPreview,
} from "../route-definitions";
import type {
  StreamFoundationProtectedRouteFactoryHandlerKind,
  StreamFoundationProtectedRouteFactoryRequest,
  StreamFoundationProtectedRouteFactoryResponse,
} from "../route-factory";
import type { StreamFoundationProtectedRouteResponseEnvelopeSmokeCase } from "../route-response-smoke";

export const STREAM_FOUNDATION_PROTECTED_ROUTE_HANDLER_BINDING_STAGE = "BACKEND_STREAM_FOUNDATION_137G_PROTECTED_ROUTE_HANDLER_BINDING_STAGING" as const;

export type StreamFoundationProtectedRouteHandlerBindingStatus =
  | "handler_bound_mount_blocked"
  | "handler_bound_review_required"
  | "handler_binding_blocked";

export type StreamFoundationProtectedRouteHandlerRuntimeMode =
  | "local_preview_only"
  | "admin_redacted_preview_only"
  | "money_movement_gate_only";

export type StreamFoundationProtectedRouteHandlerSafetyPolicy = Readonly<{
  protectedBySecurityPipeline: true;
  routeMountedNow: false;
  appServerTouchedNow: false;
  expressRouterCreatedNow: false;
  runtimeExecutionAllowedNow: false;
  databaseReadAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  realtimePublishAllowedNow: false;
  mediaStorageWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  messengerMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  rawSecretsReturned: false;
  mobileProviderKeysAllowed: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
}>;

export type StreamFoundationProtectedRouteHandlerBinding = Readonly<{
  bindingId: string;
  routeId: string;
  method: string;
  path: string;
  handlerKind: StreamFoundationProtectedRouteFactoryHandlerKind;
  runtimeMode: StreamFoundationProtectedRouteHandlerRuntimeMode;
  status: StreamFoundationProtectedRouteHandlerBindingStatus;
  requiredBeforeExecution: readonly string[];
  definition: StreamFoundationProtectedRouteDefinition;
  preview: StreamFoundationProtectedRouteDefinitionPreview;
  responseSmoke: StreamFoundationProtectedRouteResponseEnvelopeSmokeCase;
  safety: StreamFoundationProtectedRouteHandlerSafetyPolicy;
}>;

export type StreamFoundationProtectedRouteHandlerBindingPreviewRequest = StreamFoundationProtectedRouteFactoryRequest &
  Readonly<{
    bindingId?: string;
    dryRunOnly?: boolean;
  }>;

export type StreamFoundationProtectedRouteHandlerBindingPreviewResponse = Readonly<{
  stage: typeof STREAM_FOUNDATION_PROTECTED_ROUTE_HANDLER_BINDING_STAGE;
  ok: false;
  status: 400 | 403 | 409 | 423;
  bindingStatus: StreamFoundationProtectedRouteHandlerBindingStatus | "binding_not_found";
  binding?: StreamFoundationProtectedRouteHandlerBinding;
  protectedResponse?: StreamFoundationProtectedRouteFactoryResponse;
  safeCode:
    | "STREAM_ROUTE_HANDLER_BOUND_MOUNT_BLOCKED"
    | "STREAM_ROUTE_HANDLER_REVIEW_REQUIRED"
    | "STREAM_ROUTE_HANDLER_BINDING_BLOCKED"
    | "STREAM_ROUTE_HANDLER_BINDING_NOT_FOUND";
  safeMessageKey: string;
  requiredBeforeLiveMount: readonly string[];
  safety: StreamFoundationProtectedRouteHandlerSafetyPolicy;
}>;

export type StreamFoundationProtectedRouteHandlerBindingReadinessSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_PROTECTED_ROUTE_HANDLER_BINDING_STAGE;
  status: "protected_route_handlers_bound_not_mounted";
  bindings: readonly StreamFoundationProtectedRouteHandlerBinding[];
  samplePreviewResponses: readonly StreamFoundationProtectedRouteHandlerBindingPreviewResponse[];
  totalBindings: number;
  passedBindings: number;
  reviewRequiredBindings: number;
  blockedBindings: number;
  routeMountedNowCount: 0;
  expressRouterCreatedNow: false;
  appServerTouchedNow: false;
  coverage: Readonly<{
    foundationPreviewHandlerBound: true;
    liveStartHandlerBound: true;
    shortPublishHandlerBound: true;
    giftPurchaseGateHandlerBound: true;
    adminMonetizationReadHandlerBound: true;
    adminMonetizationWriteHandlerBound: true;
    monthlyPayoutGateHandlerBound: true;
    securityPipelineBound: true;
    responseEnvelopeSmokeBound: true;
    coveragePercent: 100;
  }>;
  safety: StreamFoundationProtectedRouteHandlerSafetyPolicy &
    Readonly<{
      localStagingOnly: true;
      fakeSuccessAllowed: false;
    }>;
}>;
