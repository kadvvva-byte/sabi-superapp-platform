import { createStreamFoundationKernelBridgeDecision } from "../kernel-bridge/streamFoundationKernelBridgePolicy";
import type { StreamFoundationKernelBridgeRequest } from "../kernel-bridge/streamFoundationKernelBridgeContracts";
import type {
  StreamFoundationKernelFacadeConnectionDecision,
  StreamFoundationKernelFacadeConnectionRequest,
  StreamFoundationKernelFacadeConnectionRule,
  StreamFoundationKernelFacadeConnectionSnapshot,
  StreamFoundationKernelFacadeConnectionStatus,
  StreamFoundationKernelFacadeIntent,
  StreamFoundationKernelFacadeSurface,
} from "./streamFoundationKernelFacadeConnectionContracts";
import { STREAM_FOUNDATION_137X_KERNEL_FACADE_CONNECTION_VERSION } from "./streamFoundationKernelFacadeConnectionContracts";

const rule = <T extends StreamFoundationKernelFacadeConnectionRule>(value: T): T => value;

export const STREAM_FOUNDATION_137X_KERNEL_FACADE_CONNECTION_RULES: readonly StreamFoundationKernelFacadeConnectionRule[] = [
  rule({
    surface: "mobile_live",
    intent: "open_live_start_gate",
    channel: "stream_mobile_ui",
    bridgeSurface: "live",
    bridgeAction: "live_start",
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
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
  rule({
    surface: "mobile_live",
    intent: "open_live_stop_gate",
    channel: "stream_mobile_ui",
    bridgeSurface: "live",
    bridgeAction: "live_stop",
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
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
  rule({
    surface: "mobile_live",
    intent: "send_live_heartbeat",
    channel: "stream_mobile_ui",
    bridgeSurface: "live",
    bridgeAction: "live_heartbeat",
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
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
  rule({
    surface: "mobile_shorts",
    intent: "publish_short_gate",
    channel: "stream_mobile_ui",
    bridgeSurface: "shorts",
    bridgeAction: "short_publish",
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
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
  rule({
    surface: "mobile_shorts",
    intent: "read_short_feed",
    channel: "stream_mobile_ui",
    bridgeSurface: "shorts",
    bridgeAction: "short_feed_read",
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
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
  rule({
    surface: "mobile_business_stream",
    intent: "attach_business_product_gate",
    channel: "stream_mobile_ui",
    bridgeSurface: "business_stream",
    bridgeAction: "business_product_attach",
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
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
  rule({
    surface: "mobile_creator_profile",
    intent: "request_creator_verification_gate",
    channel: "stream_mobile_ui",
    bridgeSurface: "creator_profile",
    bridgeAction: "creator_verification_request",
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
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
  rule({
    surface: "admin_moderation",
    intent: "report_content_gate",
    channel: "stream_mobile_ui",
    bridgeSurface: "moderation",
    bridgeAction: "content_report",
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
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
  rule({
    surface: "analytics_dashboard",
    intent: "read_analytics_snapshot",
    channel: "stream_admin_ui",
    bridgeSurface: "analytics",
    bridgeAction: "analytics_snapshot_read",
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
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
  rule({
    surface: "mobile_gifts",
    intent: "purchase_gift_gate",
    channel: "stream_mobile_ui",
    bridgeSurface: "gifts",
    bridgeAction: "gift_purchase_request",
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
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
  rule({
    surface: "admin_monetization",
    intent: "save_admin_monetization_config_gate",
    channel: "stream_admin_ui",
    bridgeSurface: "monetization_admin",
    bridgeAction: "admin_monetization_config_save",
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
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
  rule({
    surface: "admin_monthly_payout",
    intent: "prepare_monthly_payout_batch_gate",
    channel: "stream_admin_ui",
    bridgeSurface: "monthly_payout",
    bridgeAction: "monthly_payout_batch_prepare",
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
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  }),
] as const;

function findRule(surface: StreamFoundationKernelFacadeSurface, intent: StreamFoundationKernelFacadeIntent): StreamFoundationKernelFacadeConnectionRule | undefined {
  return STREAM_FOUNDATION_137X_KERNEL_FACADE_CONNECTION_RULES.find((item) => item.surface === surface && item.intent === intent);
}

function blockedDecision(
  request: StreamFoundationKernelFacadeConnectionRequest,
  status: StreamFoundationKernelFacadeConnectionStatus,
  safeCode: string,
  safeMessageKey: string,
  blockedReasons: readonly string[],
): StreamFoundationKernelFacadeConnectionDecision {
  return {
    version: STREAM_FOUNDATION_137X_KERNEL_FACADE_CONNECTION_VERSION,
    requestId: request.requestId,
    status,
    acceptedByFacade: false,
    safeCode,
    safeMessageKey,
    blockedReasons,
    nextKernelStep: "Keep the request inside the kernel facade until all required guards are satisfied.",
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    rawSecretsReturned: false,
    mobileProviderKeysAllowed: false,
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  };
}

function validateRequest(ruleItem: StreamFoundationKernelFacadeConnectionRule, request: StreamFoundationKernelFacadeConnectionRequest): readonly string[] {
  return [
    ruleItem.actorRequired && !request.actorUserId ? "actorUserId is required before this request can enter the Stream kernel facade." : null,
    ruleItem.targetRequired && !request.targetUserId ? "targetUserId is required for this Stream kernel facade request." : null,
    ruleItem.idempotencyRequired && !request.idempotencyKey ? "idempotencyKey is required before any write/payment/gift/admin operation." : null,
    ruleItem.amountRequired && (!Number.isFinite(request.amountMinor) || (request.amountMinor ?? 0) <= 0) ? "amountMinor must be a positive minor-unit amount for gift/payment gates." : null,
    request.currency && request.currency.length > 8 ? "currency value must be a safe ISO-like short code." : null,
  ].filter((reason): reason is string => Boolean(reason));
}

function createBridgeRequest(
  ruleItem: StreamFoundationKernelFacadeConnectionRule,
  request: StreamFoundationKernelFacadeConnectionRequest,
): StreamFoundationKernelBridgeRequest {
  return {
    requestId: request.requestId,
    surface: ruleItem.bridgeSurface,
    action: ruleItem.bridgeAction,
    actorUserId: request.actorUserId,
    targetUserId: request.targetUserId,
    idempotencyKey: request.idempotencyKey,
    amountMinor: request.amountMinor,
    currency: request.currency,
    metadata: {
      ...request.metadata,
      facadeSurface: request.surface,
      facadeIntent: request.intent,
      facadeChannel: ruleItem.channel,
      adminOnly: ruleItem.adminOnly,
      monthlyPayoutOnly: ruleItem.monthlyPayoutOnly,
    },
  };
}

export function createStreamFoundationKernelFacadeConnectionDecision(
  request: StreamFoundationKernelFacadeConnectionRequest,
): StreamFoundationKernelFacadeConnectionDecision {
  const ruleItem = findRule(request.surface, request.intent);
  if (!ruleItem) {
    return blockedDecision(
      request,
      "blocked_unknown_intent",
      "STREAM_KERNEL_FACADE_INTENT_UNKNOWN",
      "stream.kernelFacade.intentUnknown",
      ["No kernel facade connection rule exists for this surface/intent pair."],
    );
  }

  const validationErrors = validateRequest(ruleItem, request);
  if (validationErrors.length > 0) {
    const status = validationErrors.some((reason) => reason.includes("actorUserId"))
      ? "blocked_missing_actor"
      : validationErrors.some((reason) => reason.includes("idempotencyKey"))
        ? "blocked_missing_idempotency_key"
        : validationErrors.some((reason) => reason.includes("amountMinor"))
          ? "blocked_invalid_amount"
          : "blocked_kernel_bridge";
    return blockedDecision(
      request,
      status,
      "STREAM_KERNEL_FACADE_VALIDATION_BLOCKED",
      "stream.kernelFacade.validationBlocked",
      validationErrors,
    );
  }

  const bridgeRequest = createBridgeRequest(ruleItem, request);
  const bridgeDecision = createStreamFoundationKernelBridgeDecision(bridgeRequest);
  const acceptedByFacade = bridgeDecision.acceptedByKernel;

  return {
    version: STREAM_FOUNDATION_137X_KERNEL_FACADE_CONNECTION_VERSION,
    requestId: request.requestId,
    status: acceptedByFacade ? "connected_to_kernel_bridge" : "blocked_kernel_bridge",
    acceptedByFacade,
    safeCode: acceptedByFacade ? "STREAM_KERNEL_FACADE_CONNECTED" : "STREAM_KERNEL_FACADE_BRIDGE_BLOCKED",
    safeMessageKey: acceptedByFacade ? "stream.kernelFacade.connected" : "stream.kernelFacade.bridgeBlocked",
    bridgeRequest,
    bridgeDecision,
    blockedReasons: bridgeDecision.blockedReasons,
    nextKernelStep: acceptedByFacade
      ? "Continue through the Stream backend foundation kernel facade."
      : "Keep request blocked until bridge/provider/Wallet/Admin/route/database gates are satisfied.",
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    rawSecretsReturned: false,
    mobileProviderKeysAllowed: false,
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  };
}

export function getStreamFoundationKernelFacadeConnectionSnapshot(): StreamFoundationKernelFacadeConnectionSnapshot {
  const directBindingViolations = STREAM_FOUNDATION_137X_KERNEL_FACADE_CONNECTION_RULES.filter((item) => (
    item.directDbAccessAllowed || item.directProviderCallAllowed || item.directWalletMutationAllowed || item.directRealtimeBroadcastAllowed
  )).length;
  const fakeSuccessViolations = STREAM_FOUNDATION_137X_KERNEL_FACADE_CONNECTION_RULES.filter((item) => item.fakeSuccessAllowed).length;

  return {
    version: STREAM_FOUNDATION_137X_KERNEL_FACADE_CONNECTION_VERSION,
    rules: STREAM_FOUNDATION_137X_KERNEL_FACADE_CONNECTION_RULES,
    totalRules: STREAM_FOUNDATION_137X_KERNEL_FACADE_CONNECTION_RULES.length,
    directBindingViolations,
    fakeSuccessViolations,
    streamIndexPatchIncluded: false,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
  };
}
