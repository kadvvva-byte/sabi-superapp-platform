import type {
  StreamFoundationKernelStateMachineDecision,
  StreamFoundationKernelStateMachineRequiredGate,
  StreamFoundationKernelStateMachineState,
  StreamFoundationKernelStateMachineTransition,
  StreamFoundationKernelStateMachineRequest,
} from "../kernel-state-machine/streamFoundationKernelStateMachineContracts";

export const STREAM_FOUNDATION_138B_KERNEL_EVENT_DISPATCHER_VERSION = "BACKEND-STREAM-FOUNDATION-138B" as const;

export type StreamFoundationKernelEventDispatcherEventKind =
  | "kernel_state_transition_recorded"
  | "safe_ui_state_requested"
  | "route_mount_gate_required"
  | "database_persistence_gate_required"
  | "provider_config_gate_required"
  | "wallet_ledger_gate_required"
  | "real_payment_authorization_required"
  | "recipient_pending_earning_required"
  | "monthly_payout_batch_required"
  | "admin_permission_gate_required"
  | "creator_kyc_gate_required"
  | "audit_persistence_required"
  | "media_storage_gate_required"
  | "realtime_session_gate_required"
  | "kernel_bridge_gate_required"
  | "kernel_facade_gate_required";

export type StreamFoundationKernelEventDispatcherChannel =
  | "kernel_internal_audit_channel"
  | "kernel_safe_ui_channel"
  | "kernel_route_mount_gate_channel"
  | "kernel_persistence_gate_channel"
  | "kernel_provider_gate_channel"
  | "kernel_wallet_ledger_gate_channel"
  | "kernel_payment_authorization_gate_channel"
  | "kernel_pending_earning_gate_channel"
  | "kernel_monthly_payout_gate_channel"
  | "kernel_admin_gate_channel"
  | "kernel_creator_gate_channel"
  | "kernel_media_gate_channel"
  | "kernel_realtime_gate_channel"
  | "kernel_bridge_facade_gate_channel";

export type StreamFoundationKernelEventDispatcherDeliveryMode =
  | "dry_run_only"
  | "blocked_until_kernel_adapter_bound"
  | "blocked_until_persistence_adapter_bound"
  | "blocked_until_provider_adapter_bound"
  | "blocked_until_wallet_ledger_adapter_bound"
  | "blocked_until_route_mount_approved";

export interface StreamFoundationKernelEventDispatcherPayload {
  readonly requestId: string;
  readonly safeCode: string;
  readonly safeMessageKey: string;
  readonly toState: StreamFoundationKernelStateMachineState;
  readonly requiredGate: StreamFoundationKernelStateMachineRequiredGate | "state_transition" | "safe_ui_state";
  readonly redacted: true;
  readonly rawSecretsReturned: false;
  readonly mobileProviderKeysAllowed: false;
  readonly containsProviderSecretValue: false;
  readonly containsPersonalPaymentData: false;
}

export interface StreamFoundationKernelEventDispatcherEnvelope {
  readonly eventId: string;
  readonly version: typeof STREAM_FOUNDATION_138B_KERNEL_EVENT_DISPATCHER_VERSION;
  readonly requestId: string;
  readonly eventKind: StreamFoundationKernelEventDispatcherEventKind;
  readonly channel: StreamFoundationKernelEventDispatcherChannel;
  readonly deliveryMode: StreamFoundationKernelEventDispatcherDeliveryMode;
  readonly transition: StreamFoundationKernelStateMachineTransition;
  readonly payload: StreamFoundationKernelEventDispatcherPayload;
  readonly dispatchExecutedNow: false;
  readonly eventBusPublishAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly realtimeBroadcastAllowedNow: false;
  readonly mediaStorageWriteAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly routeMountAllowedNow: false;
  readonly rawSecretsReturned: false;
  readonly mobileProviderKeysAllowed: false;
  readonly streamIndexPatchIncluded: false;
  readonly fakeSuccessAllowed: false;
}

export interface StreamFoundationKernelEventDispatcherDecision {
  readonly version: typeof STREAM_FOUNDATION_138B_KERNEL_EVENT_DISPATCHER_VERSION;
  readonly requestId: string;
  readonly dispatcherAccepted: true;
  readonly stateMachineDecision: StreamFoundationKernelStateMachineDecision;
  readonly eventCount: number;
  readonly events: readonly StreamFoundationKernelEventDispatcherEnvelope[];
  readonly dispatchExecutedNow: false;
  readonly eventBusPublishAllowedNow: false;
  readonly directDbAccessAllowed: false;
  readonly directProviderCallAllowed: false;
  readonly directWalletMutationAllowed: false;
  readonly directRealtimeBroadcastAllowed: false;
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

export interface StreamFoundationKernelEventDispatcherSnapshot {
  readonly version: typeof STREAM_FOUNDATION_138B_KERNEL_EVENT_DISPATCHER_VERSION;
  readonly totalStateTransitions: number;
  readonly totalPreparedEvents: number;
  readonly coveredEventKinds: readonly StreamFoundationKernelEventDispatcherEventKind[];
  readonly dispatchExecutedNow: false;
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

export type StreamFoundationKernelEventDispatcherRequest = StreamFoundationKernelStateMachineRequest;
