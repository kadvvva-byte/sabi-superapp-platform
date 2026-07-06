export const STREAM_FOUNDATION_137W_KERNEL_BRIDGE_CONTRACTS_VERSION = "BACKEND-STREAM-FOUNDATION-137W" as const;

export type StreamFoundationKernelBridgeSurface =
  | "live"
  | "shorts"
  | "business_stream"
  | "creator_profile"
  | "moderation"
  | "analytics"
  | "gifts"
  | "monetization_admin"
  | "monthly_payout";

export type StreamFoundationKernelBridgeAction =
  | "live_start"
  | "live_stop"
  | "live_heartbeat"
  | "short_publish"
  | "short_feed_read"
  | "business_product_attach"
  | "creator_verification_request"
  | "content_report"
  | "analytics_snapshot_read"
  | "gift_purchase_request"
  | "admin_monetization_config_save"
  | "monthly_payout_batch_prepare";

export type StreamFoundationKernelBridgeTarget =
  | "stream_mobile_kernel"
  | "stream_backend_foundation_kernel"
  | "stream_admin_kernel"
  | "wallet_ledger_kernel"
  | "payment_provider_gateway_kernel"
  | "payout_provider_gateway_kernel"
  | "realtime_media_kernel"
  | "moderation_admin_kernel"
  | "analytics_kernel";

export type StreamFoundationKernelBridgeStatus =
  | "kernel_ready"
  | "blocked_kernel_gate_missing"
  | "blocked_provider_not_configured"
  | "blocked_wallet_ledger_not_configured"
  | "blocked_admin_approval_required"
  | "blocked_route_mount_required_later"
  | "blocked_db_binding_required_later";

export interface StreamFoundationKernelBridgeRequest {
  readonly requestId: string;
  readonly surface: StreamFoundationKernelBridgeSurface;
  readonly action: StreamFoundationKernelBridgeAction;
  readonly actorUserId?: string;
  readonly targetUserId?: string;
  readonly idempotencyKey?: string;
  readonly amountMinor?: number;
  readonly currency?: string;
  readonly metadata?: Readonly<Record<string, string | number | boolean | null>>;
}

export interface StreamFoundationKernelBridgePolicyItem {
  readonly surface: StreamFoundationKernelBridgeSurface;
  readonly action: StreamFoundationKernelBridgeAction;
  readonly requiredTargets: readonly StreamFoundationKernelBridgeTarget[];
  readonly directDbAccessAllowed: false;
  readonly directProviderCallAllowed: false;
  readonly directWalletMutationAllowed: false;
  readonly directRealtimeBroadcastAllowed: false;
  readonly routeMountRequiredLater: boolean;
  readonly dbBindingRequiredLater: boolean;
  readonly providerConfigRequiredLater: boolean;
  readonly walletLedgerRequiredLater: boolean;
  readonly adminApprovalRequiredLater: boolean;
  readonly fakeSuccessAllowed: false;
  readonly monthlyPayoutOnly?: boolean;
}

export interface StreamFoundationKernelBridgeDecision {
  readonly version: typeof STREAM_FOUNDATION_137W_KERNEL_BRIDGE_CONTRACTS_VERSION;
  readonly requestId: string;
  readonly acceptedByKernel: boolean;
  readonly status: StreamFoundationKernelBridgeStatus;
  readonly safeCode: string;
  readonly safeMessageKey: string;
  readonly requiredTargets: readonly StreamFoundationKernelBridgeTarget[];
  readonly blockedReasons: readonly string[];
  readonly nextKernelStep: string;
  readonly directDbAccessAllowed: false;
  readonly directProviderCallAllowed: false;
  readonly directWalletMutationAllowed: false;
  readonly directRealtimeBroadcastAllowed: false;
  readonly rawSecretsReturned: false;
  readonly mobileProviderKeysAllowed: false;
  readonly fakeSuccessAllowed: false;
}

export interface StreamFoundationKernelBridgeSnapshot {
  readonly version: typeof STREAM_FOUNDATION_137W_KERNEL_BRIDGE_CONTRACTS_VERSION;
  readonly policyItems: readonly StreamFoundationKernelBridgePolicyItem[];
  readonly totalPolicyItems: number;
  readonly directBindingViolations: number;
  readonly fakeSuccessViolations: number;
  readonly routeMountAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly streamIndexPatchIncluded: false;
}
