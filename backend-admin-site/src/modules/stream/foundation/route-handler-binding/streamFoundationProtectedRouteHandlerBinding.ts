import {
  getStreamFoundationProtectedRouteDefinitions,
  previewStreamFoundationProtectedRouteDefinitions,
} from "../route-definitions";
import {
  handleStreamFoundationProtectedRoutePreview,
  type StreamFoundationProtectedRouteFactoryHandlerKind,
} from "../route-factory";
import { getStreamFoundationProtectedRouteResponseEnvelopeSmokeCases } from "../route-response-smoke";
import {
  STREAM_FOUNDATION_PROTECTED_ROUTE_HANDLER_BINDING_STAGE,
  type StreamFoundationProtectedRouteHandlerBinding,
  type StreamFoundationProtectedRouteHandlerBindingPreviewRequest,
  type StreamFoundationProtectedRouteHandlerBindingPreviewResponse,
  type StreamFoundationProtectedRouteHandlerBindingStatus,
  type StreamFoundationProtectedRouteHandlerRuntimeMode,
  type StreamFoundationProtectedRouteHandlerSafetyPolicy,
} from "./streamFoundationProtectedRouteHandlerBindingTypes";

const SAFE_HANDLER_POLICY: StreamFoundationProtectedRouteHandlerSafetyPolicy = {
  protectedBySecurityPipeline: true,
  routeMountedNow: false,
  appServerTouchedNow: false,
  expressRouterCreatedNow: false,
  runtimeExecutionAllowedNow: false,
  databaseReadAllowedNow: false,
  databaseWriteAllowedNow: false,
  providerCallAllowedNow: false,
  realtimePublishAllowedNow: false,
  mediaStorageWriteAllowedNow: false,
  walletMutationAllowedNow: false,
  messengerMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  rawSecretsReturned: false,
  mobileProviderKeysAllowed: false,
  fakePaymentSuccessAllowed: false,
  fakeGiftSuccessAllowed: false,
  fakePayoutSuccessAllowed: false,
};

const REQUIRED_BEFORE_EXECUTION = [
  "explicit owner approval for route mount",
  "real backend install on /opt/sabi/backend",
  "auth middleware mounted through admin/user session source",
  "persistent audit sink configured",
  "database repositories bound in a separate DB stage",
  "provider and Wallet/COIN ledger gates configured before gifts or payouts",
] as const;

function runtimeModeFor(handlerKind: StreamFoundationProtectedRouteFactoryHandlerKind): StreamFoundationProtectedRouteHandlerRuntimeMode {
  if (handlerKind === "admin_monetization_read" || handlerKind === "admin_monetization_write") return "admin_redacted_preview_only";
  if (handlerKind === "gift_purchase_gate" || handlerKind === "monthly_payout_gate") return "money_movement_gate_only";
  return "local_preview_only";
}

function statusFor(handlerKind: StreamFoundationProtectedRouteFactoryHandlerKind, responseSmokeStatus: string): StreamFoundationProtectedRouteHandlerBindingStatus {
  if (responseSmokeStatus === "blocked") return "handler_binding_blocked";
  if (handlerKind === "gift_purchase_gate" || handlerKind === "admin_monetization_write" || handlerKind === "monthly_payout_gate") return "handler_bound_review_required";
  return "handler_bound_mount_blocked";
}

function bindingIdFor(routeId: string): string {
  return `137g-handler-binding-${routeId}`;
}

function isBindingSafe(binding: StreamFoundationProtectedRouteHandlerBinding): boolean {
  return (
    binding.safety.protectedBySecurityPipeline &&
    !binding.safety.routeMountedNow &&
    !binding.safety.appServerTouchedNow &&
    !binding.safety.expressRouterCreatedNow &&
    !binding.safety.runtimeExecutionAllowedNow &&
    !binding.safety.databaseReadAllowedNow &&
    !binding.safety.databaseWriteAllowedNow &&
    !binding.safety.providerCallAllowedNow &&
    !binding.safety.realtimePublishAllowedNow &&
    !binding.safety.mediaStorageWriteAllowedNow &&
    !binding.safety.walletMutationAllowedNow &&
    !binding.safety.messengerMutationAllowedNow &&
    !binding.safety.moneyMovementAllowedNow &&
    !binding.safety.rawSecretsReturned &&
    !binding.safety.mobileProviderKeysAllowed &&
    !binding.safety.fakePaymentSuccessAllowed &&
    !binding.safety.fakeGiftSuccessAllowed &&
    !binding.safety.fakePayoutSuccessAllowed &&
    binding.preview.protectedBySecurityPipeline &&
    binding.responseSmoke.observation.redactedResponseOnly &&
    binding.responseSmoke.observation.safeCodePresent &&
    binding.responseSmoke.observation.safeMessageKeyPresent
  );
}

export function getStreamFoundationProtectedRouteHandlerBindings(): readonly StreamFoundationProtectedRouteHandlerBinding[] {
  const definitions = getStreamFoundationProtectedRouteDefinitions();
  const previews = previewStreamFoundationProtectedRouteDefinitions();
  const responseSmokes = getStreamFoundationProtectedRouteResponseEnvelopeSmokeCases();

  return definitions.map((definition) => {
    const preview = previews.find((candidate) => candidate.routeId === definition.routeId);
    const responseSmoke = responseSmokes.find((candidate) => candidate.routeId === definition.routeId);

    if (!preview || !responseSmoke) {
      throw new Error(`Stream protected route handler binding missing preview/smoke for ${definition.routeId}`);
    }

    return {
      bindingId: bindingIdFor(definition.routeId),
      routeId: definition.routeId,
      method: definition.method,
      path: definition.path,
      handlerKind: definition.handlerKind,
      runtimeMode: runtimeModeFor(definition.handlerKind),
      status: statusFor(definition.handlerKind, responseSmoke.status),
      requiredBeforeExecution: REQUIRED_BEFORE_EXECUTION,
      definition,
      preview,
      responseSmoke,
      safety: SAFE_HANDLER_POLICY,
    } as const;
  });
}

function safeCodeFor(status: StreamFoundationProtectedRouteHandlerBindingPreviewResponse["bindingStatus"]): StreamFoundationProtectedRouteHandlerBindingPreviewResponse["safeCode"] {
  if (status === "binding_not_found") return "STREAM_ROUTE_HANDLER_BINDING_NOT_FOUND";
  if (status === "handler_binding_blocked") return "STREAM_ROUTE_HANDLER_BINDING_BLOCKED";
  if (status === "handler_bound_review_required") return "STREAM_ROUTE_HANDLER_REVIEW_REQUIRED";
  return "STREAM_ROUTE_HANDLER_BOUND_MOUNT_BLOCKED";
}

function safeMessageKeyFor(status: StreamFoundationProtectedRouteHandlerBindingPreviewResponse["bindingStatus"]): string {
  if (status === "binding_not_found") return "stream.foundation.route_handler.binding_not_found";
  if (status === "handler_binding_blocked") return "stream.foundation.route_handler.binding_blocked_safety_expectation_failed";
  if (status === "handler_bound_review_required") return "stream.foundation.route_handler.bound_review_required_before_mount";
  return "stream.foundation.route_handler.bound_route_mount_blocked";
}

function statusCodeFor(status: StreamFoundationProtectedRouteHandlerBindingPreviewResponse["bindingStatus"]): StreamFoundationProtectedRouteHandlerBindingPreviewResponse["status"] {
  if (status === "binding_not_found") return 400;
  if (status === "handler_binding_blocked") return 409;
  return 423;
}

export function previewStreamFoundationProtectedRouteHandlerBinding(
  request: StreamFoundationProtectedRouteHandlerBindingPreviewRequest,
): StreamFoundationProtectedRouteHandlerBindingPreviewResponse {
  const binding = getStreamFoundationProtectedRouteHandlerBindings().find(
    (candidate) => candidate.routeId === request.routeId || candidate.bindingId === request.bindingId,
  );

  if (!binding) {
    return {
      stage: STREAM_FOUNDATION_PROTECTED_ROUTE_HANDLER_BINDING_STAGE,
      ok: false,
      status: 400,
      bindingStatus: "binding_not_found",
      safeCode: "STREAM_ROUTE_HANDLER_BINDING_NOT_FOUND",
      safeMessageKey: "stream.foundation.route_handler.binding_not_found",
      requiredBeforeLiveMount: REQUIRED_BEFORE_EXECUTION,
      safety: SAFE_HANDLER_POLICY,
    };
  }

  const protectedResponse = handleStreamFoundationProtectedRoutePreview({
    ...request,
    method: binding.definition.method,
    path: binding.definition.path,
    routeId: binding.routeId,
    body: {
      requestId: request.body?.requestId ?? request.requestId,
      surface: request.body?.surface,
      action: request.body?.action,
      locale: request.body?.locale ?? "system_default",
      ...request.body,
    },
  } as any);
  const safeBinding = isBindingSafe(binding);
  const bindingStatus = safeBinding ? binding.status : "handler_binding_blocked";

  return {
    stage: STREAM_FOUNDATION_PROTECTED_ROUTE_HANDLER_BINDING_STAGE,
    ok: false,
    status: statusCodeFor(bindingStatus),
    bindingStatus,
    binding,
    protectedResponse,
    safeCode: safeCodeFor(bindingStatus),
    safeMessageKey: safeMessageKeyFor(bindingStatus),
    requiredBeforeLiveMount: REQUIRED_BEFORE_EXECUTION,
    safety: SAFE_HANDLER_POLICY,
  };
}

export function getStreamFoundationProtectedRouteHandlerBindingStage(): typeof STREAM_FOUNDATION_PROTECTED_ROUTE_HANDLER_BINDING_STAGE {
  return STREAM_FOUNDATION_PROTECTED_ROUTE_HANDLER_BINDING_STAGE;
}
