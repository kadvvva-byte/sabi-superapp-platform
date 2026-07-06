import type {
  StreamFoundationKernelActionReducedState,
  StreamFoundationKernelActionReducerDecision,
  StreamFoundationKernelActionReducerRequest,
  StreamFoundationKernelActionReducerStage,
} from "../kernel-action-reducer/streamFoundationKernelActionReducerContracts";

export const STREAM_FOUNDATION_138A_KERNEL_STATE_MACHINE_VERSION = "BACKEND-STREAM-FOUNDATION-138A" as const;

export type StreamFoundationKernelStateMachineState =
  | "idle_preview"
  | "validation_blocked"
  | "unknown_action_blocked"
  | "live_blocked_until_persistence_and_route_mount"
  | "shorts_blocked_until_media_persistence_and_route_mount"
  | "business_blocked_until_admin_and_persistence"
  | "creator_blocked_until_verification_persistence"
  | "moderation_blocked_until_admin_and_persistence"
  | "analytics_blocked_until_read_model_persistence"
  | "gift_blocked_until_payment_authorization_and_wallet_ledger"
  | "admin_monetization_blocked_until_secure_config_and_audit"
  | "monthly_payout_blocked_until_monthly_cycle_and_provider_gate"
  | "general_review_required";

export type StreamFoundationKernelStateMachineTransitionKind =
  | "preview_only_transition"
  | "blocked_validation_transition"
  | "blocked_unknown_action_transition"
  | "blocked_execution_gate_transition"
  | "blocked_payment_ledger_transition"
  | "blocked_admin_config_transition"
  | "blocked_monthly_payout_transition";

export type StreamFoundationKernelStateMachineRequiredGate =
  | "kernel_bridge_gate"
  | "kernel_facade_gate"
  | "route_mount_gate"
  | "database_persistence_gate"
  | "admin_permission_gate"
  | "provider_config_gate"
  | "wallet_ledger_gate"
  | "real_payment_authorization_gate"
  | "recipient_pending_earning_gate"
  | "monthly_payout_batch_gate"
  | "creator_kyc_gate"
  | "audit_persistence_gate"
  | "media_storage_gate"
  | "realtime_session_gate";

export interface StreamFoundationKernelStateMachineTransition {
  readonly transitionKey: string;
  readonly requestId: string;
  readonly fromState: "foundation_safe_start" | StreamFoundationKernelStateMachineState;
  readonly toState: StreamFoundationKernelStateMachineState;
  readonly transitionKind: StreamFoundationKernelStateMachineTransitionKind;
  readonly reducerStage: StreamFoundationKernelActionReducerStage;
  readonly requiredGates: readonly StreamFoundationKernelStateMachineRequiredGate[];
  readonly reducedState: StreamFoundationKernelActionReducedState;
  readonly safeCode: string;
  readonly safeMessageKey: string;
  readonly nextKernelStep: string;
  readonly committedNow: false;
  readonly executionAllowedNow: false;
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

export interface StreamFoundationKernelStateMachineDecision {
  readonly version: typeof STREAM_FOUNDATION_138A_KERNEL_STATE_MACHINE_VERSION;
  readonly requestId: string;
  readonly acceptedByStateMachine: true;
  readonly reducerDecision: StreamFoundationKernelActionReducerDecision;
  readonly transition: StreamFoundationKernelStateMachineTransition;
  readonly executionAllowedNow: false;
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

export interface StreamFoundationKernelStateMachineSnapshot {
  readonly version: typeof STREAM_FOUNDATION_138A_KERNEL_STATE_MACHINE_VERSION;
  readonly totalTransitions: number;
  readonly stateCoverage: readonly StreamFoundationKernelStateMachineState[];
  readonly transitions: readonly StreamFoundationKernelStateMachineTransition[];
  readonly directBindingViolations: number;
  readonly fakeSuccessViolations: number;
  readonly moneyMovementViolations: number;
  readonly streamIndexPatchIncluded: false;
  readonly routeMountAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
}

export type StreamFoundationKernelStateMachineRequest = StreamFoundationKernelActionReducerRequest;
