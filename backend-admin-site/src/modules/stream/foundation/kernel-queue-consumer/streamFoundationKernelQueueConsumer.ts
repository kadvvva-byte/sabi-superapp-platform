import { getStreamFoundationKernelEventQueueSnapshot, queueStreamFoundationKernelEvents } from "../kernel-event-queue/streamFoundationKernelEventQueue";
import type {
  StreamFoundationKernelEventQueueDecision,
  StreamFoundationKernelEventQueueItem,
  StreamFoundationKernelEventQueuePriority,
  StreamFoundationKernelEventQueueRequest,
} from "../kernel-event-queue/streamFoundationKernelEventQueueContracts";
import {
  STREAM_FOUNDATION_138D_KERNEL_QUEUE_CONSUMER_VERSION,
  type StreamFoundationKernelQueueConsumerAdapterKind,
  type StreamFoundationKernelQueueConsumerPlan,
  type StreamFoundationKernelQueueConsumerSideEffectClass,
  type StreamFoundationKernelQueueConsumerSnapshot,
  type StreamFoundationKernelQueueConsumerStatus,
  type StreamFoundationKernelQueueConsumerWorkItem,
} from "./streamFoundationKernelQueueConsumerContracts";

function unique<T>(items: readonly T[]): readonly T[] {
  return Array.from(new Set(items));
}

function adapterKindForPriority(priority: StreamFoundationKernelEventQueuePriority): StreamFoundationKernelQueueConsumerAdapterKind {
  if (priority === "safe_ui_preview_first") return "safe_ui_preview_adapter";
  if (priority === "kernel_audit_trace") return "audit_trace_adapter";
  if (priority === "route_mount_gate") return "route_mount_adapter";
  if (priority === "database_persistence_gate") return "database_persistence_adapter";
  if (priority === "provider_config_gate") return "provider_config_adapter";
  if (priority === "wallet_ledger_gate") return "wallet_ledger_adapter";
  if (priority === "payment_authorization_gate") return "payment_authorization_adapter";
  if (priority === "recipient_pending_earning_gate") return "recipient_earning_adapter";
  if (priority === "monthly_payout_batch_gate") return "monthly_payout_adapter";
  if (priority === "media_realtime_gate") return "media_realtime_adapter";
  return "admin_creator_adapter";
}

function sideEffectClassForPriority(priority: StreamFoundationKernelEventQueuePriority): StreamFoundationKernelQueueConsumerSideEffectClass {
  if (priority === "safe_ui_preview_first") return "none_preview_only";
  if (priority === "kernel_audit_trace") return "audit_required_later";
  if (priority === "route_mount_gate") return "route_mount_required_later";
  if (priority === "database_persistence_gate") return "database_write_required_later";
  if (priority === "provider_config_gate") return "provider_call_required_later";
  if (priority === "wallet_ledger_gate") return "wallet_ledger_write_required_later";
  if (priority === "payment_authorization_gate") return "payment_authorization_required_later";
  if (priority === "recipient_pending_earning_gate") return "recipient_pending_earning_required_later";
  if (priority === "monthly_payout_batch_gate") return "monthly_payout_batch_required_later";
  if (priority === "media_realtime_gate") return "media_realtime_required_later";
  return "admin_review_required_later";
}

function consumerStatusForItem(item: StreamFoundationKernelEventQueueItem): StreamFoundationKernelQueueConsumerStatus {
  if (item.status === "queued_dry_run_only") return "dry_run_consumer_preview_only";
  if (item.status === "blocked_until_route_mount_approved") return "blocked_until_route_mount_approved";
  if (item.status === "blocked_until_persistence_adapter_bound") return "blocked_until_persistence_adapter_bound";
  if (item.status === "blocked_until_provider_adapter_bound") return "blocked_until_provider_adapter_bound";
  if (item.status === "blocked_until_wallet_ledger_adapter_bound") return "blocked_until_wallet_ledger_adapter_bound";
  if (item.status === "blocked_until_payment_provider_authorized") return "blocked_until_payment_provider_authorized";
  if (item.status === "blocked_until_monthly_payout_batch") return "blocked_until_monthly_payout_batch";
  return "blocked_until_consumer_adapter_bound";
}

export function buildStreamFoundationKernelQueueConsumerWorkItem(
  item: StreamFoundationKernelEventQueueItem,
  index: number,
): StreamFoundationKernelQueueConsumerWorkItem {
  return {
    consumerWorkId: `${item.queueId}:138d:${index}`,
    version: STREAM_FOUNDATION_138D_KERNEL_QUEUE_CONSUMER_VERSION,
    queueItem: item,
    adapterKind: adapterKindForPriority(item.priority),
    consumerStatus: consumerStatusForItem(item),
    sideEffectClass: sideEffectClassForPriority(item.priority),
    originalPriority: item.priority,
    originalStatus: item.status,
    safeForDryRunPreview: item.visibility === "safe_ui_preview_only" || item.status === "queued_dry_run_only",
    guardResult: {
      idempotencyKeyRequired: true,
      requestIdRequired: true,
      userIdRequiredForLiveShortsGift: true,
      adminPermissionRequiredForAdminRoutes: true,
      creatorApprovalRequiredForMonetization: true,
      routeMountAllowedNow: false,
      queueReadExecutedNow: false,
      queueAckExecutedNow: false,
      eventBusPublishAllowedNow: false,
      databaseWriteAllowedNow: false,
      providerCallAllowedNow: false,
      walletMutationAllowedNow: false,
      realtimeBroadcastAllowedNow: false,
      mediaStorageWriteAllowedNow: false,
      moneyMovementAllowedNow: false,
      rawSecretsReturned: false,
      mobileProviderKeysAllowed: false,
      fakeSuccessAllowed: false,
    },
    streamIndexPatchIncluded: false,
  };
}

export function buildStreamFoundationKernelQueueConsumerPlan(
  queueDecision: StreamFoundationKernelEventQueueDecision,
): StreamFoundationKernelQueueConsumerPlan {
  const workItems = queueDecision.queuedItems.map(buildStreamFoundationKernelQueueConsumerWorkItem);
  return {
    version: STREAM_FOUNDATION_138D_KERNEL_QUEUE_CONSUMER_VERSION,
    requestId: queueDecision.requestId,
    queueDecision,
    consumerPlanned: true,
    consumerStartedNow: false,
    queueReadExecutedNow: false,
    queueAckExecutedNow: false,
    workItemCount: workItems.length,
    workItems,
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    directMoneyMovementAllowed: false,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    realtimeBroadcastAllowedNow: false,
    mediaStorageWriteAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretsReturned: false,
    mobileProviderKeysAllowed: false,
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  };
}

export function planStreamFoundationKernelQueueConsumerFromRequest(
  request: StreamFoundationKernelEventQueueRequest,
): StreamFoundationKernelQueueConsumerPlan {
  return buildStreamFoundationKernelQueueConsumerPlan(queueStreamFoundationKernelEvents(request));
}

export function getStreamFoundationKernelQueueConsumerSnapshot(): StreamFoundationKernelQueueConsumerSnapshot {
  const queueSnapshot = getStreamFoundationKernelEventQueueSnapshot();
  const priorities = queueSnapshot.coveredPriorities;
  const adapters = unique(priorities.map(adapterKindForPriority));
  const sideEffects = unique(priorities.map(sideEffectClassForPriority));

  return {
    version: STREAM_FOUNDATION_138D_KERNEL_QUEUE_CONSUMER_VERSION,
    totalQueuePrioritiesCovered: priorities.length,
    totalConsumerAdaptersCovered: adapters.length,
    totalSideEffectClassesCovered: sideEffects.length,
    consumerStartedNow: false,
    queueReadExecutedNow: false,
    queueAckExecutedNow: false,
    directBindingViolations: queueSnapshot.directBindingViolations,
    fakeSuccessViolations: queueSnapshot.fakeSuccessViolations,
    moneyMovementViolations: queueSnapshot.moneyMovementViolations,
    secretLeakViolations: queueSnapshot.secretLeakViolations,
    streamIndexPatchIncluded: false,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
  };
}
