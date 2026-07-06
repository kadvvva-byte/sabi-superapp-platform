import type {
  StreamFoundationKernelFacadeConnectionDecision,
  StreamFoundationKernelFacadeIntent,
  StreamFoundationKernelFacadeConnectionRequest,
  StreamFoundationKernelFacadeSurface,
} from "../kernel-facade/streamFoundationKernelFacadeConnectionContracts";

export const STREAM_FOUNDATION_137Y_KERNEL_FACADE_ACTION_ROUTER_VERSION = "BACKEND-STREAM-FOUNDATION-137Y" as const;

export type StreamFoundationKernelFacadeActionRouterSurface =
  | "live_room"
  | "shorts_creator"
  | "shorts_feed"
  | "business_stream"
  | "creator_profile"
  | "gift_purchase"
  | "admin_monetization"
  | "monthly_payout"
  | "moderation"
  | "analytics";

export type StreamFoundationKernelFacadeActionRouterAction =
  | "live.start.request"
  | "live.stop.request"
  | "live.heartbeat.send"
  | "short.publish.request"
  | "short.feed.read"
  | "business.product.attach.request"
  | "creator.verification.request"
  | "content.report.request"
  | "analytics.snapshot.read"
  | "gift.purchase.request"
  | "admin.monetization.config.save"
  | "payout.monthly.batch.prepare";

export type StreamFoundationKernelFacadeActionRouterLane =
  | "live_lifecycle_kernel"
  | "shorts_kernel"
  | "business_stream_kernel"
  | "creator_profile_kernel"
  | "moderation_kernel"
  | "analytics_kernel"
  | "gift_payment_kernel"
  | "admin_monetization_kernel"
  | "monthly_payout_kernel";

export type StreamFoundationKernelFacadeActionRouterStatus =
  | "routed_to_kernel_facade"
  | "blocked_unknown_action"
  | "blocked_validation"
  | "blocked_kernel_facade";

export interface StreamFoundationKernelFacadeActionRoute {
  readonly routerSurface: StreamFoundationKernelFacadeActionRouterSurface;
  readonly routerAction: StreamFoundationKernelFacadeActionRouterAction;
  readonly lane: StreamFoundationKernelFacadeActionRouterLane;
  readonly facadeSurface: StreamFoundationKernelFacadeSurface;
  readonly facadeIntent: StreamFoundationKernelFacadeIntent;
  readonly actorRequired: boolean;
  readonly targetRequired: boolean;
  readonly idempotencyRequired: boolean;
  readonly amountRequired: boolean;
  readonly adminOnly: boolean;
  readonly monthlyPayoutOnly: boolean;
  readonly directDbAccessAllowed: false;
  readonly directProviderCallAllowed: false;
  readonly directWalletMutationAllowed: false;
  readonly directRealtimeBroadcastAllowed: false;
  readonly routeMountAllowedNow: false;
  readonly streamIndexPatchIncluded: false;
  readonly fakeSuccessAllowed: false;
}

export interface StreamFoundationKernelFacadeActionRouterRequest {
  readonly requestId: string;
  readonly surface: StreamFoundationKernelFacadeActionRouterSurface;
  readonly action: StreamFoundationKernelFacadeActionRouterAction;
  readonly actorUserId?: string;
  readonly targetUserId?: string;
  readonly idempotencyKey?: string;
  readonly amountMinor?: number;
  readonly currency?: string;
  readonly metadata?: Readonly<Record<string, string | number | boolean | null>>;
}

export interface StreamFoundationKernelFacadeActionRouterDecision {
  readonly version: typeof STREAM_FOUNDATION_137Y_KERNEL_FACADE_ACTION_ROUTER_VERSION;
  readonly requestId: string;
  readonly status: StreamFoundationKernelFacadeActionRouterStatus;
  readonly acceptedByRouter: boolean;
  readonly safeCode: string;
  readonly safeMessageKey: string;
  readonly route?: StreamFoundationKernelFacadeActionRoute;
  readonly facadeRequest?: StreamFoundationKernelFacadeConnectionRequest;
  readonly facadeDecision?: StreamFoundationKernelFacadeConnectionDecision;
  readonly blockedReasons: readonly string[];
  readonly nextKernelStep: string;
  readonly directDbAccessAllowed: false;
  readonly directProviderCallAllowed: false;
  readonly directWalletMutationAllowed: false;
  readonly directRealtimeBroadcastAllowed: false;
  readonly routeMountAllowedNow: false;
  readonly rawSecretsReturned: false;
  readonly mobileProviderKeysAllowed: false;
  readonly streamIndexPatchIncluded: false;
  readonly fakeSuccessAllowed: false;
}

export interface StreamFoundationKernelFacadeActionRouterSnapshot {
  readonly version: typeof STREAM_FOUNDATION_137Y_KERNEL_FACADE_ACTION_ROUTER_VERSION;
  readonly routes: readonly StreamFoundationKernelFacadeActionRoute[];
  readonly totalRoutes: number;
  readonly directBindingViolations: number;
  readonly fakeSuccessViolations: number;
  readonly missingFacadeConnections: readonly string[];
  readonly streamIndexPatchIncluded: false;
  readonly routeMountAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
}
