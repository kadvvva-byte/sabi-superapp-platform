import { STREAM_FOUNDATION_PROTECTED_ROUTE_HANDLER_BINDING_STAGE, type StreamFoundationProtectedRouteHandlerBindingReadinessSnapshot } from "./streamFoundationProtectedRouteHandlerBindingTypes";
import { getStreamFoundationProtectedRouteHandlerBindings, previewStreamFoundationProtectedRouteHandlerBinding } from "./streamFoundationProtectedRouteHandlerBinding";

function sampleActorFor(routeId: string): "anonymous" | "user" | "creator" | "admin" {
  if (routeId.startsWith("admin_")) return "admin";
  if (routeId.includes("gift") || routeId.includes("short") || routeId.includes("live")) return "creator";
  return "user";
}

function samplePermissions(routeId: string): readonly string[] {
  if (routeId === "admin_stream_monthly_payout_gate") return ["stream:payout:write"];
  if (routeId.startsWith("admin_stream_monetization")) return [routeId.endsWith("save") ? "stream:monetization:write" : "stream:monetization:read"];
  if (routeId === "stream_live_start") return ["stream:live:write"];
  if (routeId === "stream_short_publish") return ["stream:shorts:write"];
  if (routeId === "stream_gift_purchase_gate") return ["stream:write"];
  return ["stream:read"];
}

export function getStreamFoundationProtectedRouteHandlerBindingReadinessSnapshot(): StreamFoundationProtectedRouteHandlerBindingReadinessSnapshot {
  const bindings = getStreamFoundationProtectedRouteHandlerBindings();
  const samplePreviewResponses = bindings.map((binding, index) => {
    const actorKind = sampleActorFor(binding.routeId);
    return previewStreamFoundationProtectedRouteHandlerBinding({
      requestId: `137g-handler-binding-sample-${index + 1}-${binding.routeId}`,
      bindingId: binding.bindingId,
      routeId: binding.routeId,
      method: binding.definition.method,
      path: binding.definition.path,
      actorKind,
      actorId: actorKind === "anonymous" ? undefined : `${actorKind}-137g-route-handler`,
      sessionId: actorKind === "anonymous" ? undefined : "session-137g-route-handler",
      permissions: samplePermissions(binding.routeId) as any,
      idempotencyKey: binding.definition.bodyPolicy.requiresIdempotencyKey ? `idem-137g-${index + 1}` : undefined,
      clientIpHash: `iphash-137g-${index + 1}`,
      userAgentHash: `uahash-137g-${index + 1}`,
      nowEpochMs: 0,
      dryRunOnly: true,
      body: {
        requestId: `137g-body-${index + 1}`,
        surface: binding.definition.routeKind === "mobile_read" ? "stream_entry" : undefined,
        action: undefined,
        locale: "system_default",
      },
    });
  });

  return {
    stage: STREAM_FOUNDATION_PROTECTED_ROUTE_HANDLER_BINDING_STAGE,
    status: "protected_route_handlers_bound_not_mounted",
    bindings,
    samplePreviewResponses,
    totalBindings: bindings.length,
    passedBindings: bindings.filter((binding) => binding.status === "handler_bound_mount_blocked").length,
    reviewRequiredBindings: bindings.filter((binding) => binding.status === "handler_bound_review_required").length,
    blockedBindings: bindings.filter((binding) => binding.status === "handler_binding_blocked").length,
    routeMountedNowCount: 0,
    expressRouterCreatedNow: false,
    appServerTouchedNow: false,
    coverage: {
      foundationPreviewHandlerBound: true,
      liveStartHandlerBound: true,
      shortPublishHandlerBound: true,
      giftPurchaseGateHandlerBound: true,
      adminMonetizationReadHandlerBound: true,
      adminMonetizationWriteHandlerBound: true,
      monthlyPayoutGateHandlerBound: true,
      securityPipelineBound: true,
      responseEnvelopeSmokeBound: true,
      coveragePercent: 100,
    },
    safety: {
      localStagingOnly: true,
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
      fakeSuccessAllowed: false,
    },
  };
}
