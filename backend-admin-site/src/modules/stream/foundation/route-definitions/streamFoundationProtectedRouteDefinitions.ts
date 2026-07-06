import {
  getStreamFoundationProtectedRouteFactoryDescriptors,
  handleStreamFoundationProtectedRoutePreview,
  type StreamFoundationProtectedRouteFactoryDescriptor,
  type StreamFoundationProtectedRouteFactoryHandlerKind,
} from "../route-factory";
import type { StreamFoundationSecurityRouteKind } from "../security";
import {
  STREAM_FOUNDATION_PROTECTED_ROUTE_DEFINITIONS_STAGE,
  type StreamFoundationProtectedRouteDefinition,
  type StreamFoundationProtectedRouteDefinitionGroup,
  type StreamFoundationProtectedRouteDefinitionPreview,
  type StreamFoundationProtectedRouteDefinitionStatus,
  type StreamFoundationProtectedRouteResponsePolicy,
} from "./streamFoundationProtectedRouteDefinitionsTypes";

const SAFE_RESPONSE_POLICY: StreamFoundationProtectedRouteResponsePolicy = {
  returnsRedactedEnvelopeOnly: true,
  returnsRawSecrets: false,
  returnsMobileProviderKeys: false,
  returnsFakePaymentSuccess: false,
  returnsFakeGiftSuccess: false,
  returnsFakePayoutSuccess: false,
};

function groupFor(handlerKind: StreamFoundationProtectedRouteFactoryHandlerKind): StreamFoundationProtectedRouteDefinitionGroup {
  if (handlerKind === "foundation_preview" || handlerKind === "foundation_readiness" || handlerKind === "foundation_safety") return "mobile_foundation";
  if (handlerKind === "live_write_gate") return "mobile_live";
  if (handlerKind === "shorts_write_gate") return "mobile_shorts";
  if (handlerKind === "gift_purchase_gate") return "mobile_gifts";
  if (handlerKind === "monthly_payout_gate") return "admin_payout";
  return "admin_monetization";
}

function statusFor(routeKind: StreamFoundationSecurityRouteKind): StreamFoundationProtectedRouteDefinitionStatus {
  if (routeKind === "monetization_write" || routeKind === "monthly_payout_write") return "definition_blocked_until_provider_wallet_ledger";
  if (routeKind === "admin_read" || routeKind === "admin_write") return "definition_blocked_until_admin_owner_approval";
  return "definition_ready_mount_blocked";
}

function actorFor(descriptor: StreamFoundationProtectedRouteFactoryDescriptor): "anonymous" | "creator" | "admin" | "user" {
  if (descriptor.contract.requiredActorKinds.includes("admin")) return "admin";
  if (descriptor.contract.requiredActorKinds.includes("creator")) return "creator";
  if (descriptor.contract.requiredActorKinds.includes("user")) return "user";
  return "anonymous";
}

function permissionsFor(descriptor: StreamFoundationProtectedRouteFactoryDescriptor): readonly string[] {
  if (descriptor.contract.requiredPermissions.length > 0) return descriptor.contract.requiredPermissions;
  return [];
}

export function getStreamFoundationProtectedRouteDefinitions(): readonly StreamFoundationProtectedRouteDefinition[] {
  return getStreamFoundationProtectedRouteFactoryDescriptors().map((descriptor) => ({
    routeId: descriptor.routeId,
    group: groupFor(descriptor.handlerKind),
    routeKind: descriptor.contract.routeKind,
    method: descriptor.contract.method,
    path: descriptor.contract.path,
    handlerKind: descriptor.handlerKind,
    status: statusFor(descriptor.contract.routeKind),
    requiredPermissions: descriptor.contract.requiredPermissions,
    bodyPolicy: {
      acceptsJsonBody: descriptor.contract.method === "POST",
      requiresIdempotencyKey: descriptor.contract.idempotencyRequired,
      acceptsProviderSecrets: false,
      acceptsRawCardData: false,
      acceptsRawWalletMutation: false,
      acceptsDirectMoneyMovement: false,
    },
    responsePolicy: SAFE_RESPONSE_POLICY,
    mountedNow: false,
    appServerTouchedNow: false,
    databaseReadAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    realtimePublishAllowedNow: false,
    mediaStorageWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    messengerMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
  }));
}

export function previewStreamFoundationProtectedRouteDefinitions(): readonly StreamFoundationProtectedRouteDefinitionPreview[] {
  return getStreamFoundationProtectedRouteFactoryDescriptors().map((descriptor, index) => {
    const actorKind = actorFor(descriptor);
    const response = handleStreamFoundationProtectedRoutePreview({
      requestId: `137d-route-definition-${index + 1}-${descriptor.routeId}`,
      routeId: descriptor.routeId,
      method: descriptor.contract.method,
      path: descriptor.contract.path,
      actorKind,
      actorId: actorKind === "anonymous" ? undefined : `${actorKind}-137d-route-definition`,
      sessionId: actorKind === "anonymous" ? undefined : "session-137d-route-definition",
      permissions: permissionsFor(descriptor) as any,
      idempotencyKey: descriptor.contract.idempotencyRequired ? `idem-137d-${index + 1}` : undefined,
      clientIpHash: `iphash-137d-${index + 1}`,
      userAgentHash: `uahash-137d-${index + 1}`,
      nowEpochMs: 0,
      body: {
        requestId: `137d-body-${index + 1}`,
        surface: descriptor.contract.surface ?? "stream_entry",
        action: descriptor.contract.action ?? "open_surface",
        locale: "system_default",
      },
    });

    return {
      routeId: descriptor.routeId,
      method: descriptor.contract.method,
      path: descriptor.contract.path,
      handlerKind: descriptor.handlerKind,
      protectedPreviewResponse: response,
      protectedBySecurityPipeline: true,
      mountedNow: false,
      runtimeExecutionAllowedNow: false,
    };
  });
}

export function getStreamFoundationProtectedRouteDefinitionsStage(): typeof STREAM_FOUNDATION_PROTECTED_ROUTE_DEFINITIONS_STAGE {
  return STREAM_FOUNDATION_PROTECTED_ROUTE_DEFINITIONS_STAGE;
}
