import { reduceStreamFoundationKernelAction, getStreamFoundationKernelActionReducerSnapshot } from "../kernel-action-reducer/streamFoundationKernelActionReducer";
import type { StreamFoundationKernelActionReducedState } from "../kernel-action-reducer/streamFoundationKernelActionReducerContracts";
import {
  STREAM_FOUNDATION_138A_KERNEL_STATE_MACHINE_VERSION,
  type StreamFoundationKernelStateMachineDecision,
  type StreamFoundationKernelStateMachineRequest,
  type StreamFoundationKernelStateMachineRequiredGate,
  type StreamFoundationKernelStateMachineSnapshot,
  type StreamFoundationKernelStateMachineState,
  type StreamFoundationKernelStateMachineTransition,
  type StreamFoundationKernelStateMachineTransitionKind,
} from "./streamFoundationKernelStateMachineContracts";

function unique<T>(items: readonly T[]): readonly T[] {
  return Array.from(new Set(items));
}

function stateForReducedState(reduced: StreamFoundationKernelActionReducedState): StreamFoundationKernelStateMachineState {
  if (reduced.stage === "blocked_validation_state") return "validation_blocked";
  if (reduced.stage === "blocked_unknown_action_state") return "unknown_action_blocked";
  if (reduced.action === "gift.purchase.request") return "gift_blocked_until_payment_authorization_and_wallet_ledger";
  if (reduced.action === "admin.monetization.config.save") return "admin_monetization_blocked_until_secure_config_and_audit";
  if (reduced.action === "payout.monthly.batch.prepare") return "monthly_payout_blocked_until_monthly_cycle_and_provider_gate";
  if (reduced.action === "live.start.request" || reduced.action === "live.stop.request" || reduced.action === "live.heartbeat.send") return "live_blocked_until_persistence_and_route_mount";
  if (reduced.action === "short.publish.request" || reduced.surface === "shorts_creator" || reduced.surface === "shorts_feed") return "shorts_blocked_until_media_persistence_and_route_mount";
  if (reduced.surface === "business_stream") return "business_blocked_until_admin_and_persistence";
  if (reduced.surface === "creator_profile") return "creator_blocked_until_verification_persistence";
  if (reduced.surface === "moderation" || reduced.action === "content.report.request") return "moderation_blocked_until_admin_and_persistence";
  if (reduced.surface === "analytics") return "analytics_blocked_until_read_model_persistence";
  if (reduced.stage === "safe_preview_state") return "idle_preview";
  return "general_review_required";
}

function transitionKindForState(state: StreamFoundationKernelStateMachineState): StreamFoundationKernelStateMachineTransitionKind {
  if (state === "validation_blocked") return "blocked_validation_transition";
  if (state === "unknown_action_blocked") return "blocked_unknown_action_transition";
  if (state === "gift_blocked_until_payment_authorization_and_wallet_ledger") return "blocked_payment_ledger_transition";
  if (state === "admin_monetization_blocked_until_secure_config_and_audit") return "blocked_admin_config_transition";
  if (state === "monthly_payout_blocked_until_monthly_cycle_and_provider_gate") return "blocked_monthly_payout_transition";
  if (state === "idle_preview") return "preview_only_transition";
  return "blocked_execution_gate_transition";
}

function gatesForState(state: StreamFoundationKernelStateMachineState, reduced: StreamFoundationKernelActionReducedState): readonly StreamFoundationKernelStateMachineRequiredGate[] {
  const gates: StreamFoundationKernelStateMachineRequiredGate[] = ["kernel_bridge_gate", "kernel_facade_gate", "route_mount_gate", "audit_persistence_gate"];

  if (state === "validation_blocked" || state === "unknown_action_blocked") return ["kernel_bridge_gate", "kernel_facade_gate", "audit_persistence_gate"];
  if (state === "live_blocked_until_persistence_and_route_mount") gates.push("database_persistence_gate", "realtime_session_gate");
  if (state === "shorts_blocked_until_media_persistence_and_route_mount") gates.push("database_persistence_gate", "media_storage_gate");
  if (state === "business_blocked_until_admin_and_persistence") gates.push("admin_permission_gate", "database_persistence_gate");
  if (state === "creator_blocked_until_verification_persistence") gates.push("creator_kyc_gate", "database_persistence_gate");
  if (state === "moderation_blocked_until_admin_and_persistence") gates.push("admin_permission_gate", "database_persistence_gate");
  if (state === "analytics_blocked_until_read_model_persistence") gates.push("database_persistence_gate");
  if (state === "admin_monetization_blocked_until_secure_config_and_audit") gates.push("admin_permission_gate", "provider_config_gate", "wallet_ledger_gate", "database_persistence_gate");
  if (state === "gift_blocked_until_payment_authorization_and_wallet_ledger") gates.push("provider_config_gate", "wallet_ledger_gate", "real_payment_authorization_gate", "recipient_pending_earning_gate", "database_persistence_gate");
  if (state === "monthly_payout_blocked_until_monthly_cycle_and_provider_gate") gates.push("monthly_payout_batch_gate", "creator_kyc_gate", "provider_config_gate", "wallet_ledger_gate", "database_persistence_gate");
  if (reduced.adminState === "required") gates.push("admin_permission_gate");
  return unique(gates);
}

function transitionFromReducedState(reduced: StreamFoundationKernelActionReducedState): StreamFoundationKernelStateMachineTransition {
  const toState = stateForReducedState(reduced);
  return {
    transitionKey: `${reduced.requestId}:${reduced.surface}:${reduced.action}:${toState}`,
    requestId: reduced.requestId,
    fromState: "foundation_safe_start",
    toState,
    transitionKind: transitionKindForState(toState),
    reducerStage: reduced.stage,
    requiredGates: gatesForState(toState, reduced),
    reducedState: reduced,
    safeCode: reduced.safeCode,
    safeMessageKey: reduced.safeMessageKey,
    nextKernelStep: reduced.nextKernelStep,
    committedNow: false,
    executionAllowedNow: false,
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

export function transitionStreamFoundationKernelState(
  request: StreamFoundationKernelStateMachineRequest,
): StreamFoundationKernelStateMachineDecision {
  const reducerDecision = reduceStreamFoundationKernelAction(request);
  const transition = transitionFromReducedState(reducerDecision.reducedState);

  return {
    version: STREAM_FOUNDATION_138A_KERNEL_STATE_MACHINE_VERSION,
    requestId: request.requestId,
    acceptedByStateMachine: true,
    reducerDecision,
    transition,
    executionAllowedNow: false,
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

export function getStreamFoundationKernelStateMachineSnapshot(): StreamFoundationKernelStateMachineSnapshot {
  const reducerSnapshot = getStreamFoundationKernelActionReducerSnapshot();
  const transitions = reducerSnapshot.reducerStates.map(transitionFromReducedState);
  const directBindingViolations = transitions.filter((item) => item.routeMountAllowedNow || item.databaseWriteAllowedNow || item.providerCallAllowedNow || item.walletMutationAllowedNow || item.realtimeBroadcastAllowedNow || item.mediaStorageWriteAllowedNow).length;
  const fakeSuccessViolations = transitions.filter((item) => item.fakeSuccessAllowed).length;
  const moneyMovementViolations = transitions.filter((item) => item.moneyMovementAllowedNow).length;

  return {
    version: STREAM_FOUNDATION_138A_KERNEL_STATE_MACHINE_VERSION,
    totalTransitions: transitions.length,
    stateCoverage: unique(transitions.map((item) => item.toState)),
    transitions,
    directBindingViolations,
    fakeSuccessViolations,
    moneyMovementViolations,
    streamIndexPatchIncluded: false,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
  };
}
