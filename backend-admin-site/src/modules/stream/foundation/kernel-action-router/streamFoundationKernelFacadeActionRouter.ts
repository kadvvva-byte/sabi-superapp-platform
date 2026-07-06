import { createStreamFoundationKernelFacadeConnectionDecision, getStreamFoundationKernelFacadeConnectionSnapshot } from "../kernel-facade/streamFoundationKernelFacadeConnectionPolicy";
import type { StreamFoundationKernelFacadeConnectionRequest } from "../kernel-facade/streamFoundationKernelFacadeConnectionContracts";
import {
  STREAM_FOUNDATION_137Y_KERNEL_FACADE_ACTION_ROUTER_VERSION,
  type StreamFoundationKernelFacadeActionRoute,
  type StreamFoundationKernelFacadeActionRouterAction,
  type StreamFoundationKernelFacadeActionRouterDecision,
  type StreamFoundationKernelFacadeActionRouterRequest,
  type StreamFoundationKernelFacadeActionRouterSnapshot,
  type StreamFoundationKernelFacadeActionRouterStatus,
  type StreamFoundationKernelFacadeActionRouterSurface,
} from "./streamFoundationKernelFacadeActionRouterContracts";

const route = <T extends StreamFoundationKernelFacadeActionRoute>(value: T): T => value;

export const STREAM_FOUNDATION_137Y_KERNEL_FACADE_ACTION_ROUTES: readonly StreamFoundationKernelFacadeActionRoute[] = [
  route({
    routerSurface: "live_room",
    routerAction: "live.start.request",
    lane: "live_lifecycle_kernel",
    facadeSurface: "mobile_live",
    facadeIntent: "open_live_start_gate",
    actorRequired: true,
    targetRequired: false,
    idempotencyRequired: true,
    amountRequired: false,
    adminOnly: false,
    monthlyPayoutOnly: false,
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountAllowedNow: false,
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
  route({
    routerSurface: "live_room",
    routerAction: "live.stop.request",
    lane: "live_lifecycle_kernel",
    facadeSurface: "mobile_live",
    facadeIntent: "open_live_stop_gate",
    actorRequired: true,
    targetRequired: false,
    idempotencyRequired: true,
    amountRequired: false,
    adminOnly: false,
    monthlyPayoutOnly: false,
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountAllowedNow: false,
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
  route({
    routerSurface: "live_room",
    routerAction: "live.heartbeat.send",
    lane: "live_lifecycle_kernel",
    facadeSurface: "mobile_live",
    facadeIntent: "send_live_heartbeat",
    actorRequired: true,
    targetRequired: false,
    idempotencyRequired: false,
    amountRequired: false,
    adminOnly: false,
    monthlyPayoutOnly: false,
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountAllowedNow: false,
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
  route({
    routerSurface: "shorts_creator",
    routerAction: "short.publish.request",
    lane: "shorts_kernel",
    facadeSurface: "mobile_shorts",
    facadeIntent: "publish_short_gate",
    actorRequired: true,
    targetRequired: false,
    idempotencyRequired: true,
    amountRequired: false,
    adminOnly: false,
    monthlyPayoutOnly: false,
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountAllowedNow: false,
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
  route({
    routerSurface: "shorts_feed",
    routerAction: "short.feed.read",
    lane: "shorts_kernel",
    facadeSurface: "mobile_shorts",
    facadeIntent: "read_short_feed",
    actorRequired: false,
    targetRequired: false,
    idempotencyRequired: false,
    amountRequired: false,
    adminOnly: false,
    monthlyPayoutOnly: false,
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountAllowedNow: false,
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
  route({
    routerSurface: "business_stream",
    routerAction: "business.product.attach.request",
    lane: "business_stream_kernel",
    facadeSurface: "mobile_business_stream",
    facadeIntent: "attach_business_product_gate",
    actorRequired: true,
    targetRequired: false,
    idempotencyRequired: true,
    amountRequired: false,
    adminOnly: false,
    monthlyPayoutOnly: false,
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountAllowedNow: false,
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
  route({
    routerSurface: "creator_profile",
    routerAction: "creator.verification.request",
    lane: "creator_profile_kernel",
    facadeSurface: "mobile_creator_profile",
    facadeIntent: "request_creator_verification_gate",
    actorRequired: true,
    targetRequired: false,
    idempotencyRequired: true,
    amountRequired: false,
    adminOnly: false,
    monthlyPayoutOnly: false,
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountAllowedNow: false,
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
  route({
    routerSurface: "moderation",
    routerAction: "content.report.request",
    lane: "moderation_kernel",
    facadeSurface: "admin_moderation",
    facadeIntent: "report_content_gate",
    actorRequired: true,
    targetRequired: false,
    idempotencyRequired: true,
    amountRequired: false,
    adminOnly: false,
    monthlyPayoutOnly: false,
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountAllowedNow: false,
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
  route({
    routerSurface: "analytics",
    routerAction: "analytics.snapshot.read",
    lane: "analytics_kernel",
    facadeSurface: "analytics_dashboard",
    facadeIntent: "read_analytics_snapshot",
    actorRequired: true,
    targetRequired: false,
    idempotencyRequired: false,
    amountRequired: false,
    adminOnly: true,
    monthlyPayoutOnly: false,
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountAllowedNow: false,
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
  route({
    routerSurface: "gift_purchase",
    routerAction: "gift.purchase.request",
    lane: "gift_payment_kernel",
    facadeSurface: "mobile_gifts",
    facadeIntent: "purchase_gift_gate",
    actorRequired: true,
    targetRequired: true,
    idempotencyRequired: true,
    amountRequired: true,
    adminOnly: false,
    monthlyPayoutOnly: false,
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountAllowedNow: false,
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
  route({
    routerSurface: "admin_monetization",
    routerAction: "admin.monetization.config.save",
    lane: "admin_monetization_kernel",
    facadeSurface: "admin_monetization",
    facadeIntent: "save_admin_monetization_config_gate",
    actorRequired: true,
    targetRequired: false,
    idempotencyRequired: true,
    amountRequired: false,
    adminOnly: true,
    monthlyPayoutOnly: false,
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountAllowedNow: false,
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
  route({
    routerSurface: "monthly_payout",
    routerAction: "payout.monthly.batch.prepare",
    lane: "monthly_payout_kernel",
    facadeSurface: "admin_monthly_payout",
    facadeIntent: "prepare_monthly_payout_batch_gate",
    actorRequired: true,
    targetRequired: false,
    idempotencyRequired: true,
    amountRequired: false,
    adminOnly: true,
    monthlyPayoutOnly: true,
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountAllowedNow: false,
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
] as const;

function findRoute(
  surface: StreamFoundationKernelFacadeActionRouterSurface,
  action: StreamFoundationKernelFacadeActionRouterAction,
): StreamFoundationKernelFacadeActionRoute | undefined {
  return STREAM_FOUNDATION_137Y_KERNEL_FACADE_ACTION_ROUTES.find((item) => item.routerSurface === surface && item.routerAction === action);
}

function blockedDecision(
  request: StreamFoundationKernelFacadeActionRouterRequest,
  status: StreamFoundationKernelFacadeActionRouterStatus,
  safeCode: string,
  safeMessageKey: string,
  blockedReasons: readonly string[],
): StreamFoundationKernelFacadeActionRouterDecision {
  return {
    version: STREAM_FOUNDATION_137Y_KERNEL_FACADE_ACTION_ROUTER_VERSION,
    requestId: request.requestId,
    status,
    acceptedByRouter: false,
    safeCode,
    safeMessageKey,
    blockedReasons,
    nextKernelStep: "Keep the Stream action inside the foundation action router until all required gates are satisfied.",
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountAllowedNow: false,
    rawSecretsReturned: false,
    mobileProviderKeysAllowed: false,
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  };
}

function validateRouterRequest(routeItem: StreamFoundationKernelFacadeActionRoute, request: StreamFoundationKernelFacadeActionRouterRequest): readonly string[] {
  return [
    routeItem.actorRequired && !request.actorUserId ? "actorUserId is required before routing this Stream action." : null,
    routeItem.targetRequired && !request.targetUserId ? "targetUserId is required before routing this Stream action." : null,
    routeItem.idempotencyRequired && !request.idempotencyKey ? "idempotencyKey is required before routing write/payment/admin actions." : null,
    routeItem.amountRequired && (!Number.isFinite(request.amountMinor) || (request.amountMinor ?? 0) <= 0) ? "amountMinor must be positive before routing gift/payment actions." : null,
    request.currency && request.currency.length > 8 ? "currency must stay a short safe code." : null,
  ].filter((reason): reason is string => Boolean(reason));
}

function createFacadeRequest(
  routeItem: StreamFoundationKernelFacadeActionRoute,
  request: StreamFoundationKernelFacadeActionRouterRequest,
): StreamFoundationKernelFacadeConnectionRequest {
  return {
    requestId: request.requestId,
    surface: routeItem.facadeSurface,
    intent: routeItem.facadeIntent,
    actorUserId: request.actorUserId,
    targetUserId: request.targetUserId,
    idempotencyKey: request.idempotencyKey,
    amountMinor: request.amountMinor,
    currency: request.currency,
    metadata: {
      ...request.metadata,
      routerSurface: request.surface,
      routerAction: request.action,
      routerLane: routeItem.lane,
      adminOnly: routeItem.adminOnly,
      monthlyPayoutOnly: routeItem.monthlyPayoutOnly,
    },
  };
}

export function routeStreamFoundationKernelFacadeAction(
  request: StreamFoundationKernelFacadeActionRouterRequest,
): StreamFoundationKernelFacadeActionRouterDecision {
  const routeItem = findRoute(request.surface, request.action);
  if (!routeItem) {
    return blockedDecision(
      request,
      "blocked_unknown_action",
      "STREAM_KERNEL_ACTION_ROUTER_UNKNOWN_ACTION",
      "stream.kernelActionRouter.unknownAction",
      ["No foundation kernel action route exists for this surface/action pair."],
    );
  }

  const validationErrors = validateRouterRequest(routeItem, request);
  if (validationErrors.length > 0) {
    return blockedDecision(
      request,
      "blocked_validation",
      "STREAM_KERNEL_ACTION_ROUTER_VALIDATION_BLOCKED",
      "stream.kernelActionRouter.validationBlocked",
      validationErrors,
    );
  }

  const facadeRequest = createFacadeRequest(routeItem, request);
  const facadeDecision = createStreamFoundationKernelFacadeConnectionDecision(facadeRequest);
  const acceptedByRouter = facadeDecision.acceptedByFacade;

  return {
    version: STREAM_FOUNDATION_137Y_KERNEL_FACADE_ACTION_ROUTER_VERSION,
    requestId: request.requestId,
    status: acceptedByRouter ? "routed_to_kernel_facade" : "blocked_kernel_facade",
    acceptedByRouter,
    safeCode: acceptedByRouter ? "STREAM_KERNEL_ACTION_ROUTED" : "STREAM_KERNEL_ACTION_FACADE_BLOCKED",
    safeMessageKey: acceptedByRouter ? "stream.kernelActionRouter.routed" : "stream.kernelActionRouter.facadeBlocked",
    route: routeItem,
    facadeRequest,
    facadeDecision,
    blockedReasons: facadeDecision.blockedReasons,
    nextKernelStep: acceptedByRouter
      ? "Continue through the Stream kernel facade connection and downstream bridge gates."
      : "Keep the request blocked until facade/bridge/provider/Wallet/Admin/route/database gates are satisfied.",
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountAllowedNow: false,
    rawSecretsReturned: false,
    mobileProviderKeysAllowed: false,
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  };
}

export function getStreamFoundationKernelFacadeActionRouterSnapshot(): StreamFoundationKernelFacadeActionRouterSnapshot {
  const facade = getStreamFoundationKernelFacadeConnectionSnapshot();
  const missingFacadeConnections = STREAM_FOUNDATION_137Y_KERNEL_FACADE_ACTION_ROUTES
    .filter((routeItem) => !facade.rules.some((ruleItem) => ruleItem.surface === routeItem.facadeSurface && ruleItem.intent === routeItem.facadeIntent))
    .map((routeItem) => `${routeItem.routerSurface}:${routeItem.routerAction}->${routeItem.facadeSurface}:${routeItem.facadeIntent}`);

  const directBindingViolations = STREAM_FOUNDATION_137Y_KERNEL_FACADE_ACTION_ROUTES.filter((item) => (
    item.directDbAccessAllowed || item.directProviderCallAllowed || item.directWalletMutationAllowed || item.directRealtimeBroadcastAllowed || item.routeMountAllowedNow
  )).length;
  const fakeSuccessViolations = STREAM_FOUNDATION_137Y_KERNEL_FACADE_ACTION_ROUTES.filter((item) => item.fakeSuccessAllowed).length;

  return {
    version: STREAM_FOUNDATION_137Y_KERNEL_FACADE_ACTION_ROUTER_VERSION,
    routes: STREAM_FOUNDATION_137Y_KERNEL_FACADE_ACTION_ROUTES,
    totalRoutes: STREAM_FOUNDATION_137Y_KERNEL_FACADE_ACTION_ROUTES.length,
    directBindingViolations,
    fakeSuccessViolations,
    missingFacadeConnections,
    streamIndexPatchIncluded: false,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
  };
}
