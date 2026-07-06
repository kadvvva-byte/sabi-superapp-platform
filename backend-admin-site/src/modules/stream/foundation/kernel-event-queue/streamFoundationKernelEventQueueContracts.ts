import type {
  StreamFoundationKernelEventDispatcherDecision,
  StreamFoundationKernelEventDispatcherEnvelope,
  StreamFoundationKernelEventDispatcherRequest,
} from "../kernel-event-dispatcher/streamFoundationKernelEventDispatcherContracts";

export const STREAM_FOUNDATION_138C_KERNEL_EVENT_QUEUE_VERSION = "BACKEND-STREAM-FOUNDATION-138C" as const;

export type StreamFoundationKernelEventQueuePriority =
  | "safe_ui_preview_first"
  | "kernel_audit_trace"
  | "route_mount_gate"
  | "database_persistence_gate"
  | "provider_config_gate"
  | "wallet_ledger_gate"
  | "payment_authorization_gate"
  | "recipient_pending_earning_gate"
  | "monthly_payout_batch_gate"
  | "media_realtime_gate"
  | "admin_creator_gate";

export type StreamFoundationKernelEventQueueStatus =
  | "queued_dry_run_only"
  | "blocked_until_kernel_adapter_bound"
  | "blocked_until_route_mount_approved"
  | "blocked_until_persistence_adapter_bound"
  | "blocked_until_provider_adapter_bound"
  | "blocked_until_wallet_ledger_adapter_bound"
  | "blocked_until_payment_provider_authorized"
  | "blocked_until_monthly_payout_batch";

export type StreamFoundationKernelEventQueueVisibility = "internal_foundation_only" | "safe_ui_preview_only";

export interface StreamFoundationKernelEventQueueRetryPolicy {
  readonly retryAllowedNow: false;
  readonly retryRequiresIdempotencyKey: true;
  readonly maxAttemptsAfterAdapterBinding: number;
  readonly backoffPolicy: "adapter_controlled_later";
}

export interface StreamFoundationKernelEventQueueItem {
  readonly queueId: string;
  readonly version: typeof STREAM_FOUNDATION_138C_KERNEL_EVENT_QUEUE_VERSION;
  readonly requestId: string;
  readonly sourceEvent: StreamFoundationKernelEventDispatcherEnvelope;
  readonly priority: StreamFoundationKernelEventQueuePriority;
  readonly status: StreamFoundationKernelEventQueueStatus;
  readonly visibility: StreamFoundationKernelEventQueueVisibility;
  readonly deduplicationKey: string;
  readonly retryPolicy: StreamFoundationKernelEventQueueRetryPolicy;
  readonly queueWriteExecutedNow: false;
  readonly queueConsumerStartedNow: false;
  readonly eventBusPublishAllowedNow: false;
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

export interface StreamFoundationKernelEventQueueDecision {
  readonly version: typeof STREAM_FOUNDATION_138C_KERNEL_EVENT_QUEUE_VERSION;
  readonly requestId: string;
  readonly dispatcherDecision: StreamFoundationKernelEventDispatcherDecision;
  readonly queueAccepted: true;
  readonly queuedItemCount: number;
  readonly queuedItems: readonly StreamFoundationKernelEventQueueItem[];
  readonly queueWriteExecutedNow: false;
  readonly queueConsumerStartedNow: false;
  readonly directEventBusPublishAllowed: false;
  readonly directDbAccessAllowed: false;
  readonly directProviderCallAllowed: false;
  readonly directWalletMutationAllowed: false;
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

export interface StreamFoundationKernelEventQueueSnapshot {
  readonly version: typeof STREAM_FOUNDATION_138C_KERNEL_EVENT_QUEUE_VERSION;
  readonly totalPreparedEvents: number;
  readonly totalQueuedItems: number;
  readonly coveredPriorities: readonly StreamFoundationKernelEventQueuePriority[];
  readonly coveredStatuses: readonly StreamFoundationKernelEventQueueStatus[];
  readonly queueWriteExecutedNow: false;
  readonly queueConsumerStartedNow: false;
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

export type StreamFoundationKernelEventQueueRequest = StreamFoundationKernelEventDispatcherRequest;
