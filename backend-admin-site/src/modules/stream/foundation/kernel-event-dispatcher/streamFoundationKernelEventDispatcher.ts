import {
  getStreamFoundationKernelStateMachineSnapshot,
  transitionStreamFoundationKernelState,
} from "../kernel-state-machine/streamFoundationKernelStateMachine";
import type { StreamFoundationKernelStateMachineRequiredGate, StreamFoundationKernelStateMachineTransition } from "../kernel-state-machine/streamFoundationKernelStateMachineContracts";
import {
  STREAM_FOUNDATION_138B_KERNEL_EVENT_DISPATCHER_VERSION,
  type StreamFoundationKernelEventDispatcherChannel,
  type StreamFoundationKernelEventDispatcherDecision,
  type StreamFoundationKernelEventDispatcherDeliveryMode,
  type StreamFoundationKernelEventDispatcherEnvelope,
  type StreamFoundationKernelEventDispatcherEventKind,
  type StreamFoundationKernelEventDispatcherRequest,
  type StreamFoundationKernelEventDispatcherSnapshot,
} from "./streamFoundationKernelEventDispatcherContracts";

function unique<T>(items: readonly T[]): readonly T[] {
  return Array.from(new Set(items));
}

function eventKindForGate(gate: StreamFoundationKernelStateMachineRequiredGate | "state_transition" | "safe_ui_state"): StreamFoundationKernelEventDispatcherEventKind {
  if (gate === "state_transition") return "kernel_state_transition_recorded";
  if (gate === "safe_ui_state") return "safe_ui_state_requested";
  if (gate === "route_mount_gate") return "route_mount_gate_required";
  if (gate === "database_persistence_gate") return "database_persistence_gate_required";
  if (gate === "provider_config_gate") return "provider_config_gate_required";
  if (gate === "wallet_ledger_gate") return "wallet_ledger_gate_required";
  if (gate === "real_payment_authorization_gate") return "real_payment_authorization_required";
  if (gate === "recipient_pending_earning_gate") return "recipient_pending_earning_required";
  if (gate === "monthly_payout_batch_gate") return "monthly_payout_batch_required";
  if (gate === "admin_permission_gate") return "admin_permission_gate_required";
  if (gate === "creator_kyc_gate") return "creator_kyc_gate_required";
  if (gate === "audit_persistence_gate") return "audit_persistence_required";
  if (gate === "media_storage_gate") return "media_storage_gate_required";
  if (gate === "realtime_session_gate") return "realtime_session_gate_required";
  if (gate === "kernel_bridge_gate") return "kernel_bridge_gate_required";
  return "kernel_facade_gate_required";
}

function channelForEventKind(kind: StreamFoundationKernelEventDispatcherEventKind): StreamFoundationKernelEventDispatcherChannel {
  if (kind === "kernel_state_transition_recorded" || kind === "audit_persistence_required") return "kernel_internal_audit_channel";
  if (kind === "safe_ui_state_requested") return "kernel_safe_ui_channel";
  if (kind === "route_mount_gate_required") return "kernel_route_mount_gate_channel";
  if (kind === "database_persistence_gate_required") return "kernel_persistence_gate_channel";
  if (kind === "provider_config_gate_required") return "kernel_provider_gate_channel";
  if (kind === "wallet_ledger_gate_required") return "kernel_wallet_ledger_gate_channel";
  if (kind === "real_payment_authorization_required") return "kernel_payment_authorization_gate_channel";
  if (kind === "recipient_pending_earning_required") return "kernel_pending_earning_gate_channel";
  if (kind === "monthly_payout_batch_required") return "kernel_monthly_payout_gate_channel";
  if (kind === "admin_permission_gate_required") return "kernel_admin_gate_channel";
  if (kind === "creator_kyc_gate_required") return "kernel_creator_gate_channel";
  if (kind === "media_storage_gate_required") return "kernel_media_gate_channel";
  if (kind === "realtime_session_gate_required") return "kernel_realtime_gate_channel";
  return "kernel_bridge_facade_gate_channel";
}

function deliveryModeForEventKind(kind: StreamFoundationKernelEventDispatcherEventKind): StreamFoundationKernelEventDispatcherDeliveryMode {
  if (kind === "kernel_state_transition_recorded" || kind === "safe_ui_state_requested" || kind === "kernel_bridge_gate_required" || kind === "kernel_facade_gate_required") return "dry_run_only";
  if (kind === "route_mount_gate_required") return "blocked_until_route_mount_approved";
  if (kind === "database_persistence_gate_required" || kind === "audit_persistence_required") return "blocked_until_persistence_adapter_bound";
  if (kind === "provider_config_gate_required" || kind === "real_payment_authorization_required") return "blocked_until_provider_adapter_bound";
  if (kind === "wallet_ledger_gate_required" || kind === "recipient_pending_earning_required" || kind === "monthly_payout_batch_required") return "blocked_until_wallet_ledger_adapter_bound";
  return "blocked_until_kernel_adapter_bound";
}

function buildEvent(
  transition: StreamFoundationKernelStateMachineTransition,
  gate: StreamFoundationKernelStateMachineRequiredGate | "state_transition" | "safe_ui_state",
  index: number,
): StreamFoundationKernelEventDispatcherEnvelope {
  const eventKind = eventKindForGate(gate);
  return {
    eventId: `${transition.requestId}:138b:${index}:${eventKind}`,
    version: STREAM_FOUNDATION_138B_KERNEL_EVENT_DISPATCHER_VERSION,
    requestId: transition.requestId,
    eventKind,
    channel: channelForEventKind(eventKind),
    deliveryMode: deliveryModeForEventKind(eventKind),
    transition,
    payload: {
      requestId: transition.requestId,
      safeCode: transition.safeCode,
      safeMessageKey: transition.safeMessageKey,
      toState: transition.toState,
      requiredGate: gate,
      redacted: true,
      rawSecretsReturned: false,
      mobileProviderKeysAllowed: false,
      containsProviderSecretValue: false,
      containsPersonalPaymentData: false,
    },
    dispatchExecutedNow: false,
    eventBusPublishAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    realtimeBroadcastAllowedNow: false,
    mediaStorageWriteAllowedNow: false,
    moneyMovementAllowedNow: false,
    routeMountAllowedNow: false,
    rawSecretsReturned: false,
    mobileProviderKeysAllowed: false,
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  };
}

export function buildStreamFoundationKernelEventsFromTransition(
  transition: StreamFoundationKernelStateMachineTransition,
): readonly StreamFoundationKernelEventDispatcherEnvelope[] {
  const gates: readonly (StreamFoundationKernelStateMachineRequiredGate | "state_transition" | "safe_ui_state")[] = unique([
    "state_transition",
    "safe_ui_state",
    ...transition.requiredGates,
  ]);
  return gates.map((gate, index) => buildEvent(transition, gate, index));
}

export function dispatchStreamFoundationKernelEvents(
  request: StreamFoundationKernelEventDispatcherRequest,
): StreamFoundationKernelEventDispatcherDecision {
  const stateMachineDecision = transitionStreamFoundationKernelState(request);
  const events = buildStreamFoundationKernelEventsFromTransition(stateMachineDecision.transition);
  return {
    version: STREAM_FOUNDATION_138B_KERNEL_EVENT_DISPATCHER_VERSION,
    requestId: request.requestId,
    dispatcherAccepted: true,
    stateMachineDecision,
    eventCount: events.length,
    events,
    dispatchExecutedNow: false,
    eventBusPublishAllowedNow: false,
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
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

export function getStreamFoundationKernelEventDispatcherSnapshot(): StreamFoundationKernelEventDispatcherSnapshot {
  const stateMachineSnapshot = getStreamFoundationKernelStateMachineSnapshot();
  const allEvents = stateMachineSnapshot.transitions.flatMap(buildStreamFoundationKernelEventsFromTransition);
  const directBindingViolations = allEvents.filter((item) => item.eventBusPublishAllowedNow || item.routeMountAllowedNow || item.databaseWriteAllowedNow || item.providerCallAllowedNow || item.walletMutationAllowedNow || item.realtimeBroadcastAllowedNow || item.mediaStorageWriteAllowedNow).length;
  const fakeSuccessViolations = allEvents.filter((item) => item.fakeSuccessAllowed).length;
  const moneyMovementViolations = allEvents.filter((item) => item.moneyMovementAllowedNow).length;
  const secretLeakViolations = allEvents.filter((item) => item.rawSecretsReturned || item.mobileProviderKeysAllowed || item.payload.containsProviderSecretValue || item.payload.containsPersonalPaymentData).length;

  return {
    version: STREAM_FOUNDATION_138B_KERNEL_EVENT_DISPATCHER_VERSION,
    totalStateTransitions: stateMachineSnapshot.totalTransitions,
    totalPreparedEvents: allEvents.length,
    coveredEventKinds: unique(allEvents.map((item) => item.eventKind)),
    dispatchExecutedNow: false,
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
