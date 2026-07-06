import type {
  StreamFoundationKernelBridgeAction,
  StreamFoundationKernelBridgeDecision,
  StreamFoundationKernelBridgeRequest,
  StreamFoundationKernelBridgeSurface,
} from "../kernel-bridge/streamFoundationKernelBridgeContracts";

export const STREAM_FOUNDATION_137X_KERNEL_FACADE_CONNECTION_VERSION = "BACKEND-STREAM-FOUNDATION-137X" as const;

export type StreamFoundationKernelFacadeSurface =
  | "mobile_live"
  | "mobile_shorts"
  | "mobile_business_stream"
  | "mobile_creator_profile"
  | "mobile_gifts"
  | "admin_monetization"
  | "admin_monthly_payout"
  | "admin_moderation"
  | "analytics_dashboard";

export type StreamFoundationKernelFacadeIntent =
  | "open_live_start_gate"
  | "open_live_stop_gate"
  | "send_live_heartbeat"
  | "publish_short_gate"
  | "read_short_feed"
  | "attach_business_product_gate"
  | "request_creator_verification_gate"
  | "report_content_gate"
  | "read_analytics_snapshot"
  | "purchase_gift_gate"
  | "save_admin_monetization_config_gate"
  | "prepare_monthly_payout_batch_gate";

export type StreamFoundationKernelFacadeConnectionStatus =
  | "connected_to_kernel_bridge"
  | "blocked_missing_actor"
  | "blocked_missing_idempotency_key"
  | "blocked_invalid_amount"
  | "blocked_kernel_bridge"
  | "blocked_unknown_intent";

export type StreamFoundationKernelFacadeChannel =
  | "stream_mobile_ui"
  | "stream_admin_ui"
  | "stream_backend_service"
  | "wallet_ledger_kernel"
  | "payment_provider_kernel"
  | "payout_provider_kernel";

export interface StreamFoundationKernelFacadeConnectionRule {
  readonly surface: StreamFoundationKernelFacadeSurface;
  readonly intent: StreamFoundationKernelFacadeIntent;
  readonly channel: StreamFoundationKernelFacadeChannel;
  readonly bridgeSurface: StreamFoundationKernelBridgeSurface;
  readonly bridgeAction: StreamFoundationKernelBridgeAction;
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
  readonly streamIndexPatchIncluded: false;
  readonly fakeSuccessAllowed: false;
}

export interface StreamFoundationKernelFacadeConnectionRequest {
  readonly requestId: string;
  readonly surface: StreamFoundationKernelFacadeSurface;
  readonly intent: StreamFoundationKernelFacadeIntent;
  readonly actorUserId?: string;
  readonly targetUserId?: string;
  readonly idempotencyKey?: string;
  readonly amountMinor?: number;
  readonly currency?: string;
  readonly metadata?: Readonly<Record<string, string | number | boolean | null>>;
}

export interface StreamFoundationKernelFacadeConnectionDecision {
  readonly version: typeof STREAM_FOUNDATION_137X_KERNEL_FACADE_CONNECTION_VERSION;
  readonly requestId: string;
  readonly status: StreamFoundationKernelFacadeConnectionStatus;
  readonly acceptedByFacade: boolean;
  readonly safeCode: string;
  readonly safeMessageKey: string;
  readonly bridgeRequest?: StreamFoundationKernelBridgeRequest;
  readonly bridgeDecision?: StreamFoundationKernelBridgeDecision;
  readonly blockedReasons: readonly string[];
  readonly nextKernelStep: string;
  readonly directDbAccessAllowed: false;
  readonly directProviderCallAllowed: false;
  readonly directWalletMutationAllowed: false;
  readonly directRealtimeBroadcastAllowed: false;
  readonly rawSecretsReturned: false;
  readonly mobileProviderKeysAllowed: false;
  readonly streamIndexPatchIncluded: false;
  readonly fakeSuccessAllowed: false;
}

export interface StreamFoundationKernelFacadeConnectionSnapshot {
  readonly version: typeof STREAM_FOUNDATION_137X_KERNEL_FACADE_CONNECTION_VERSION;
  readonly rules: readonly StreamFoundationKernelFacadeConnectionRule[];
  readonly totalRules: number;
  readonly directBindingViolations: number;
  readonly fakeSuccessViolations: number;
  readonly streamIndexPatchIncluded: false;
  readonly routeMountAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
}
