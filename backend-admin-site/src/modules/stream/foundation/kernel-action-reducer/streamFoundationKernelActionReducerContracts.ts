import type {
  StreamFoundationKernelFacadeActionRouterDecision,
  StreamFoundationKernelFacadeActionRouterRequest,
  StreamFoundationKernelFacadeActionRouterAction,
  StreamFoundationKernelFacadeActionRouterSurface,
} from "../kernel-action-router/streamFoundationKernelFacadeActionRouterContracts";

export const STREAM_FOUNDATION_137Z_KERNEL_ACTION_REDUCER_VERSION = "BACKEND-STREAM-FOUNDATION-137Z" as const;

export type StreamFoundationKernelActionReducerStage =
  | "safe_preview_state"
  | "blocked_validation_state"
  | "blocked_unknown_action_state"
  | "blocked_facade_gate_state"
  | "blocked_payment_gate_state"
  | "blocked_admin_gate_state"
  | "blocked_monthly_payout_gate_state"
  | "blocked_route_mount_state";

export type StreamFoundationKernelActionReducerEffect =
  | "show_safe_blocked_state"
  | "show_validation_error_state"
  | "show_unknown_action_state"
  | "require_kernel_facade_gate"
  | "require_admin_permission_gate"
  | "require_provider_config_gate"
  | "require_wallet_ledger_gate"
  | "require_real_payment_authorization_gate"
  | "require_recipient_pending_earning_gate"
  | "require_monthly_payout_batch_gate"
  | "require_route_mount_gate"
  | "require_database_persistence_gate"
  | "write_audit_draft_only";

export type StreamFoundationKernelActionReducerLedgerState =
  | "not_money_related"
  | "payment_provider_required"
  | "wallet_ledger_required"
  | "pending_earning_required"
  | "monthly_payout_required";

export interface StreamFoundationKernelActionReducedState {
  readonly stateKey: string;
  readonly requestId: string;
  readonly surface: StreamFoundationKernelFacadeActionRouterSurface;
  readonly action: StreamFoundationKernelFacadeActionRouterAction;
  readonly stage: StreamFoundationKernelActionReducerStage;
  readonly uiState: "blocked" | "review_required" | "preview_only";
  readonly adminState: "not_required" | "required" | "review_required";
  readonly ledgerState: StreamFoundationKernelActionReducerLedgerState;
  readonly payoutCycle: "not_applicable" | "monthly_only";
  readonly safeCode: string;
  readonly safeMessageKey: string;
  readonly blockedReasons: readonly string[];
  readonly effects: readonly StreamFoundationKernelActionReducerEffect[];
  readonly nextKernelStep: string;
  readonly directDbAccessAllowed: false;
  readonly directProviderCallAllowed: false;
  readonly directWalletMutationAllowed: false;
  readonly directRealtimeBroadcastAllowed: false;
  readonly routeMountAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly rawSecretsReturned: false;
  readonly mobileProviderKeysAllowed: false;
  readonly streamIndexPatchIncluded: false;
  readonly fakeSuccessAllowed: false;
}

export interface StreamFoundationKernelActionReducerDecision {
  readonly version: typeof STREAM_FOUNDATION_137Z_KERNEL_ACTION_REDUCER_VERSION;
  readonly requestId: string;
  readonly reducerAccepted: true;
  readonly executionAllowedNow: false;
  readonly routerDecision: StreamFoundationKernelFacadeActionRouterDecision;
  readonly reducedState: StreamFoundationKernelActionReducedState;
  readonly directDbAccessAllowed: false;
  readonly directProviderCallAllowed: false;
  readonly directWalletMutationAllowed: false;
  readonly directRealtimeBroadcastAllowed: false;
  readonly routeMountAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly rawSecretsReturned: false;
  readonly mobileProviderKeysAllowed: false;
  readonly streamIndexPatchIncluded: false;
  readonly fakeSuccessAllowed: false;
}

export interface StreamFoundationKernelActionReducerSnapshot {
  readonly version: typeof STREAM_FOUNDATION_137Z_KERNEL_ACTION_REDUCER_VERSION;
  readonly totalReducerCases: number;
  readonly coveredActions: readonly StreamFoundationKernelFacadeActionRouterAction[];
  readonly uncoveredActions: readonly string[];
  readonly reducerStates: readonly StreamFoundationKernelActionReducedState[];
  readonly directBindingViolations: number;
  readonly fakeSuccessViolations: number;
  readonly streamIndexPatchIncluded: false;
  readonly routeMountAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
}

export type StreamFoundationKernelActionReducerRequest = StreamFoundationKernelFacadeActionRouterRequest;
