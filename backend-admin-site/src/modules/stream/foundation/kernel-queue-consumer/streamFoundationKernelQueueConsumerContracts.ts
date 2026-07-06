import type {
  StreamFoundationKernelEventQueueDecision,
  StreamFoundationKernelEventQueueItem,
  StreamFoundationKernelEventQueuePriority,
  StreamFoundationKernelEventQueueStatus,
} from "../kernel-event-queue/streamFoundationKernelEventQueueContracts";

export const STREAM_FOUNDATION_138D_KERNEL_QUEUE_CONSUMER_VERSION = "BACKEND-STREAM-FOUNDATION-138D" as const;

export type StreamFoundationKernelQueueConsumerAdapterKind =
  | "audit_trace_adapter"
  | "safe_ui_preview_adapter"
  | "route_mount_adapter"
  | "database_persistence_adapter"
  | "provider_config_adapter"
  | "wallet_ledger_adapter"
  | "payment_authorization_adapter"
  | "recipient_earning_adapter"
  | "monthly_payout_adapter"
  | "media_realtime_adapter"
  | "admin_creator_adapter";

export type StreamFoundationKernelQueueConsumerStatus =
  | "dry_run_consumer_preview_only"
  | "blocked_until_consumer_adapter_bound"
  | "blocked_until_route_mount_approved"
  | "blocked_until_persistence_adapter_bound"
  | "blocked_until_provider_adapter_bound"
  | "blocked_until_wallet_ledger_adapter_bound"
  | "blocked_until_payment_provider_authorized"
  | "blocked_until_monthly_payout_batch";

export type StreamFoundationKernelQueueConsumerSideEffectClass =
  | "none_preview_only"
  | "audit_required_later"
  | "route_mount_required_later"
  | "database_write_required_later"
  | "provider_call_required_later"
  | "wallet_ledger_write_required_later"
  | "payment_authorization_required_later"
  | "recipient_pending_earning_required_later"
  | "monthly_payout_batch_required_later"
  | "media_realtime_required_later"
  | "admin_review_required_later";

export interface StreamFoundationKernelQueueConsumerGuardResult {
  readonly idempotencyKeyRequired: true;
  readonly requestIdRequired: true;
  readonly userIdRequiredForLiveShortsGift: true;
  readonly adminPermissionRequiredForAdminRoutes: true;
  readonly creatorApprovalRequiredForMonetization: true;
  readonly routeMountAllowedNow: false;
  readonly queueReadExecutedNow: false;
  readonly queueAckExecutedNow: false;
  readonly eventBusPublishAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly realtimeBroadcastAllowedNow: false;
  readonly mediaStorageWriteAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly rawSecretsReturned: false;
  readonly mobileProviderKeysAllowed: false;
  readonly fakeSuccessAllowed: false;
}

export interface StreamFoundationKernelQueueConsumerWorkItem {
  readonly consumerWorkId: string;
  readonly version: typeof STREAM_FOUNDATION_138D_KERNEL_QUEUE_CONSUMER_VERSION;
  readonly queueItem: StreamFoundationKernelEventQueueItem;
  readonly adapterKind: StreamFoundationKernelQueueConsumerAdapterKind;
  readonly consumerStatus: StreamFoundationKernelQueueConsumerStatus;
  readonly sideEffectClass: StreamFoundationKernelQueueConsumerSideEffectClass;
  readonly originalPriority: StreamFoundationKernelEventQueuePriority;
  readonly originalStatus: StreamFoundationKernelEventQueueStatus;
  readonly safeForDryRunPreview: boolean;
  readonly guardResult: StreamFoundationKernelQueueConsumerGuardResult;
  readonly streamIndexPatchIncluded: false;
}

export interface StreamFoundationKernelQueueConsumerPlan {
  readonly version: typeof STREAM_FOUNDATION_138D_KERNEL_QUEUE_CONSUMER_VERSION;
  readonly requestId: string;
  readonly queueDecision: StreamFoundationKernelEventQueueDecision;
  readonly consumerPlanned: true;
  readonly consumerStartedNow: false;
  readonly queueReadExecutedNow: false;
  readonly queueAckExecutedNow: false;
  readonly workItemCount: number;
  readonly workItems: readonly StreamFoundationKernelQueueConsumerWorkItem[];
  readonly directDbAccessAllowed: false;
  readonly directProviderCallAllowed: false;
  readonly directWalletMutationAllowed: false;
  readonly directRealtimeBroadcastAllowed: false;
  readonly directMoneyMovementAllowed: false;
  readonly routeMountAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly realtimeBroadcastAllowedNow: false;
  readonly mediaStorageWriteAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly rawSecretsReturned: false;
  readonly mobileProviderKeysAllowed: false;
  readonly streamIndexPatchIncluded: false;
  readonly fakeSuccessAllowed: false;
}

export interface StreamFoundationKernelQueueConsumerSnapshot {
  readonly version: typeof STREAM_FOUNDATION_138D_KERNEL_QUEUE_CONSUMER_VERSION;
  readonly totalQueuePrioritiesCovered: number;
  readonly totalConsumerAdaptersCovered: number;
  readonly totalSideEffectClassesCovered: number;
  readonly consumerStartedNow: false;
  readonly queueReadExecutedNow: false;
  readonly queueAckExecutedNow: false;
  readonly directBindingViolations: number;
  readonly fakeSuccessViolations: number;
  readonly moneyMovementViolations: number;
  readonly secretLeakViolations: number;
  readonly streamIndexPatchIncluded: false;
  readonly routeMountAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
}
