import { dispatchStreamFoundationKernelEvents, getStreamFoundationKernelEventDispatcherSnapshot } from "../kernel-event-dispatcher/streamFoundationKernelEventDispatcher";
import type { StreamFoundationKernelEventDispatcherEnvelope } from "../kernel-event-dispatcher/streamFoundationKernelEventDispatcherContracts";
import {
  STREAM_FOUNDATION_138C_KERNEL_EVENT_QUEUE_VERSION,
  type StreamFoundationKernelEventQueueDecision,
  type StreamFoundationKernelEventQueueItem,
  type StreamFoundationKernelEventQueuePriority,
  type StreamFoundationKernelEventQueueRequest,
  type StreamFoundationKernelEventQueueSnapshot,
  type StreamFoundationKernelEventQueueStatus,
} from "./streamFoundationKernelEventQueueContracts";

function unique<T>(items: readonly T[]): readonly T[] {
  return Array.from(new Set(items));
}

function priorityForEvent(event: StreamFoundationKernelEventDispatcherEnvelope): StreamFoundationKernelEventQueuePriority {
  if (event.eventKind === "safe_ui_state_requested") return "safe_ui_preview_first";
  if (event.eventKind === "kernel_state_transition_recorded" || event.eventKind === "audit_persistence_required") return "kernel_audit_trace";
  if (event.eventKind === "route_mount_gate_required") return "route_mount_gate";
  if (event.eventKind === "database_persistence_gate_required") return "database_persistence_gate";
  if (event.eventKind === "provider_config_gate_required") return "provider_config_gate";
  if (event.eventKind === "real_payment_authorization_required") return "payment_authorization_gate";
  if (event.eventKind === "wallet_ledger_gate_required") return "wallet_ledger_gate";
  if (event.eventKind === "recipient_pending_earning_required") return "recipient_pending_earning_gate";
  if (event.eventKind === "monthly_payout_batch_required") return "monthly_payout_batch_gate";
  if (event.eventKind === "media_storage_gate_required" || event.eventKind === "realtime_session_gate_required") return "media_realtime_gate";
  return "admin_creator_gate";
}

function statusForEvent(event: StreamFoundationKernelEventDispatcherEnvelope): StreamFoundationKernelEventQueueStatus {
  if (event.deliveryMode === "dry_run_only") return "queued_dry_run_only";
  if (event.deliveryMode === "blocked_until_route_mount_approved") return "blocked_until_route_mount_approved";
  if (event.deliveryMode === "blocked_until_persistence_adapter_bound") return "blocked_until_persistence_adapter_bound";
  if (event.deliveryMode === "blocked_until_provider_adapter_bound") {
    return event.eventKind === "real_payment_authorization_required" ? "blocked_until_payment_provider_authorized" : "blocked_until_provider_adapter_bound";
  }
  if (event.deliveryMode === "blocked_until_wallet_ledger_adapter_bound") {
    return event.eventKind === "monthly_payout_batch_required" ? "blocked_until_monthly_payout_batch" : "blocked_until_wallet_ledger_adapter_bound";
  }
  return "blocked_until_kernel_adapter_bound";
}

export function buildStreamFoundationKernelEventQueueItem(
  event: StreamFoundationKernelEventDispatcherEnvelope,
  index: number,
): StreamFoundationKernelEventQueueItem {
  const priority = priorityForEvent(event);
  return {
    queueId: `${event.requestId}:138c:${index}:${priority}`,
    version: STREAM_FOUNDATION_138C_KERNEL_EVENT_QUEUE_VERSION,
    requestId: event.requestId,
    sourceEvent: event,
    priority,
    status: statusForEvent(event),
    visibility: event.eventKind === "safe_ui_state_requested" ? "safe_ui_preview_only" : "internal_foundation_only",
    deduplicationKey: `${event.requestId}:${event.eventKind}:${event.transition.toState}`,
    retryPolicy: {
      retryAllowedNow: false,
      retryRequiresIdempotencyKey: true,
      maxAttemptsAfterAdapterBinding: 3,
      backoffPolicy: "adapter_controlled_later",
    },
    queueWriteExecutedNow: false,
    queueConsumerStartedNow: false,
    eventBusPublishAllowedNow: false,
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

export function queueStreamFoundationKernelEvents(
  request: StreamFoundationKernelEventQueueRequest,
): StreamFoundationKernelEventQueueDecision {
  const dispatcherDecision = dispatchStreamFoundationKernelEvents(request);
  const queuedItems = dispatcherDecision.events.map(buildStreamFoundationKernelEventQueueItem);
  return {
    version: STREAM_FOUNDATION_138C_KERNEL_EVENT_QUEUE_VERSION,
    requestId: request.requestId,
    dispatcherDecision,
    queueAccepted: true,
    queuedItemCount: queuedItems.length,
    queuedItems,
    queueWriteExecutedNow: false,
    queueConsumerStartedNow: false,
    directEventBusPublishAllowed: false,
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
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

export function getStreamFoundationKernelEventQueueSnapshot(): StreamFoundationKernelEventQueueSnapshot {
  const dispatcherSnapshot = getStreamFoundationKernelEventDispatcherSnapshot();
  const syntheticItems = dispatcherSnapshot.coveredEventKinds.map((kind, index) => {
    const fakeEvent = {
      requestId: `snapshot-${index}`,
      eventKind: kind,
      deliveryMode: kind === "safe_ui_state_requested" || kind === "kernel_state_transition_recorded" ? "dry_run_only" : "blocked_until_kernel_adapter_bound",
      transition: { toState: "blocked_by_foundation_gate" },
      routeMountAllowedNow: false,
      databaseWriteAllowedNow: false,
      providerCallAllowedNow: false,
      walletMutationAllowedNow: false,
      realtimeBroadcastAllowedNow: false,
      mediaStorageWriteAllowedNow: false,
      moneyMovementAllowedNow: false,
      rawSecretsReturned: false,
      mobileProviderKeysAllowed: false,
      payload: { containsProviderSecretValue: false, containsPersonalPaymentData: false },
      fakeSuccessAllowed: false,
    } as unknown as StreamFoundationKernelEventDispatcherEnvelope;
    return buildStreamFoundationKernelEventQueueItem(fakeEvent, index);
  });

  const directBindingViolations = syntheticItems.filter((item) => item.eventBusPublishAllowedNow || item.routeMountAllowedNow || item.databaseWriteAllowedNow || item.providerCallAllowedNow || item.walletMutationAllowedNow || item.realtimeBroadcastAllowedNow || item.mediaStorageWriteAllowedNow).length;
  const fakeSuccessViolations = syntheticItems.filter((item) => item.fakeSuccessAllowed).length;
  const moneyMovementViolations = syntheticItems.filter((item) => item.moneyMovementAllowedNow).length;
  const secretLeakViolations = syntheticItems.filter((item) => item.rawSecretsReturned || item.mobileProviderKeysAllowed || item.sourceEvent.payload.containsProviderSecretValue || item.sourceEvent.payload.containsPersonalPaymentData).length;

  return {
    version: STREAM_FOUNDATION_138C_KERNEL_EVENT_QUEUE_VERSION,
    totalPreparedEvents: dispatcherSnapshot.totalPreparedEvents,
    totalQueuedItems: syntheticItems.length,
    coveredPriorities: unique(syntheticItems.map((item) => item.priority)),
    coveredStatuses: unique(syntheticItems.map((item) => item.status)),
    queueWriteExecutedNow: false,
    queueConsumerStartedNow: false,
    directBindingViolations,
    fakeSuccessViolations,
    moneyMovementViolations,
    secretLeakViolations,
    streamIndexPatchIncluded: false,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
  };
}
