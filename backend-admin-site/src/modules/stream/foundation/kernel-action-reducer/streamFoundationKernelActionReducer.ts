import {
  STREAM_FOUNDATION_137Y_KERNEL_FACADE_ACTION_ROUTES,
  routeStreamFoundationKernelFacadeAction,
} from "../kernel-action-router/streamFoundationKernelFacadeActionRouter";
import type {
  StreamFoundationKernelFacadeActionRoute,
  StreamFoundationKernelFacadeActionRouterAction,
  StreamFoundationKernelFacadeActionRouterDecision,
} from "../kernel-action-router/streamFoundationKernelFacadeActionRouterContracts";
import {
  STREAM_FOUNDATION_137Z_KERNEL_ACTION_REDUCER_VERSION,
  type StreamFoundationKernelActionReducedState,
  type StreamFoundationKernelActionReducerDecision,
  type StreamFoundationKernelActionReducerEffect,
  type StreamFoundationKernelActionReducerLedgerState,
  type StreamFoundationKernelActionReducerRequest,
  type StreamFoundationKernelActionReducerSnapshot,
  type StreamFoundationKernelActionReducerStage,
} from "./streamFoundationKernelActionReducerContracts";

function unique<T>(items: readonly T[]): readonly T[] {
  return Array.from(new Set(items));
}

function ledgerStateForRoute(routeItem?: StreamFoundationKernelFacadeActionRoute): StreamFoundationKernelActionReducerLedgerState {
  if (!routeItem) return "not_money_related";
  if (routeItem.routerAction === "gift.purchase.request") return "pending_earning_required";
  if (routeItem.routerAction === "payout.monthly.batch.prepare") return "monthly_payout_required";
  if (routeItem.routerAction === "admin.monetization.config.save") return "payment_provider_required";
  return "not_money_related";
}

function stageForDecision(
  routerDecision: StreamFoundationKernelFacadeActionRouterDecision,
): StreamFoundationKernelActionReducerStage {
  if (routerDecision.status === "blocked_unknown_action") return "blocked_unknown_action_state";
  if (routerDecision.status === "blocked_validation") return "blocked_validation_state";
  if (routerDecision.route?.routerAction === "gift.purchase.request") return "blocked_payment_gate_state";
  if (routerDecision.route?.routerAction === "admin.monetization.config.save") return "blocked_admin_gate_state";
  if (routerDecision.route?.routerAction === "payout.monthly.batch.prepare") return "blocked_monthly_payout_gate_state";
  if (routerDecision.status === "blocked_kernel_facade") return "blocked_facade_gate_state";
  return "safe_preview_state";
}

function effectsForDecision(
  routerDecision: StreamFoundationKernelFacadeActionRouterDecision,
): readonly StreamFoundationKernelActionReducerEffect[] {
  const routeItem = routerDecision.route;
  const base: StreamFoundationKernelActionReducerEffect[] = ["show_safe_blocked_state", "write_audit_draft_only", "require_route_mount_gate"];

  if (routerDecision.status === "blocked_unknown_action") {
    return ["show_unknown_action_state", "write_audit_draft_only"];
  }
  if (routerDecision.status === "blocked_validation") {
    return ["show_validation_error_state", "write_audit_draft_only"];
  }
  if (!routeItem) {
    return base;
  }

  if (routerDecision.status === "blocked_kernel_facade") {
    base.push("require_kernel_facade_gate");
  }
  if (routeItem.adminOnly) {
    base.push("require_admin_permission_gate");
  }
  if (routeItem.routerAction === "gift.purchase.request") {
    base.push(
      "require_provider_config_gate",
      "require_wallet_ledger_gate",
      "require_real_payment_authorization_gate",
      "require_recipient_pending_earning_gate",
      "require_database_persistence_gate",
    );
  }
  if (routeItem.routerAction === "admin.monetization.config.save") {
    base.push("require_provider_config_gate", "require_wallet_ledger_gate", "require_database_persistence_gate");
  }
  if (routeItem.routerAction === "payout.monthly.batch.prepare") {
    base.push("require_monthly_payout_batch_gate", "require_provider_config_gate", "require_wallet_ledger_gate", "require_database_persistence_gate");
  }
  if (routeItem.routerAction === "live.start.request" || routeItem.routerAction === "live.stop.request" || routeItem.routerAction === "live.heartbeat.send") {
    base.push("require_database_persistence_gate");
  }

  return unique(base);
}

function nextStepForDecision(routerDecision: StreamFoundationKernelFacadeActionRouterDecision): string {
  if (routerDecision.status === "blocked_unknown_action") {
    return "Add a kernel action route before the UI/backend can use this Stream action.";
  }
  if (routerDecision.status === "blocked_validation") {
    return "Fix required actor/idempotency/amount fields before passing the action deeper into the kernel.";
  }
  if (routerDecision.route?.routerAction === "gift.purchase.request") {
    return "Keep gift purchase blocked until real payment authorization, Wallet ledger commit, recipient pending earning, and audit persistence are bound through approved providers.";
  }
  if (routerDecision.route?.routerAction === "payout.monthly.batch.prepare") {
    return "Keep payout blocked until monthly payout cycle, KYC, provider payout config, Wallet ledger, and reconciliation gates are approved.";
  }
  if (routerDecision.route?.routerAction === "admin.monetization.config.save") {
    return "Keep Admin monetization config behind Admin permission, server-side secret storage, provider readiness, and audit persistence gates.";
  }
  return "Keep the action in safe reducer state until route mount, persistence, provider, realtime, media, and Admin gates are approved.";
}

export function reduceStreamFoundationKernelAction(
  request: StreamFoundationKernelActionReducerRequest,
): StreamFoundationKernelActionReducerDecision {
  const routerDecision = routeStreamFoundationKernelFacadeAction(request);
  const routeItem = routerDecision.route;
  const stage = stageForDecision(routerDecision);
  const effects = effectsForDecision(routerDecision);
  const ledgerState = ledgerStateForRoute(routeItem);
  const adminState = routeItem?.adminOnly ? "required" : routeItem?.routerAction === "gift.purchase.request" || routeItem?.routerAction === "payout.monthly.batch.prepare" ? "review_required" : "not_required";

  const reducedState: StreamFoundationKernelActionReducedState = {
    stateKey: `${request.surface}:${request.action}:${stage}`,
    requestId: request.requestId,
    surface: request.surface,
    action: request.action,
    stage,
    uiState: stage === "safe_preview_state" ? "preview_only" : stage === "blocked_validation_state" || stage === "blocked_unknown_action_state" ? "blocked" : "review_required",
    adminState,
    ledgerState,
    payoutCycle: routeItem?.routerAction === "payout.monthly.batch.prepare" || routeItem?.routerAction === "gift.purchase.request" ? "monthly_only" : "not_applicable",
    safeCode: routerDecision.safeCode,
    safeMessageKey: routerDecision.safeMessageKey,
    blockedReasons: routerDecision.blockedReasons,
    effects,
    nextKernelStep: nextStepForDecision(routerDecision),
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretsReturned: false,
    mobileProviderKeysAllowed: false,
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  };

  return {
    version: STREAM_FOUNDATION_137Z_KERNEL_ACTION_REDUCER_VERSION,
    requestId: request.requestId,
    reducerAccepted: true,
    executionAllowedNow: false,
    routerDecision,
    reducedState,
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretsReturned: false,
    mobileProviderKeysAllowed: false,
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
  };
}

function sampleRequestForRoute(routeItem: StreamFoundationKernelFacadeActionRoute, index: number): StreamFoundationKernelActionReducerRequest {
  return {
    requestId: `137z-snapshot-${index}`,
    surface: routeItem.routerSurface,
    action: routeItem.routerAction,
    actorUserId: routeItem.actorRequired ? "kernel-user" : undefined,
    targetUserId: routeItem.targetRequired ? "kernel-target" : undefined,
    idempotencyKey: routeItem.idempotencyRequired ? `idem-137z-${index}` : undefined,
    amountMinor: routeItem.amountRequired ? 5000 : undefined,
    currency: routeItem.amountRequired ? "UZS" : undefined,
  };
}

export function getStreamFoundationKernelActionReducerSnapshot(): StreamFoundationKernelActionReducerSnapshot {
  const reducerStates = STREAM_FOUNDATION_137Y_KERNEL_FACADE_ACTION_ROUTES.map((routeItem, index) => reduceStreamFoundationKernelAction(sampleRequestForRoute(routeItem, index)).reducedState);
  const coveredActions = reducerStates.map((item) => item.action);
  const directBindingViolations = reducerStates.filter((item) => (
    item.directDbAccessAllowed || item.directProviderCallAllowed || item.directWalletMutationAllowed || item.directRealtimeBroadcastAllowed || item.routeMountAllowedNow || item.databaseWriteAllowedNow || item.providerCallAllowedNow || item.walletMutationAllowedNow || item.moneyMovementAllowedNow
  )).length;
  const fakeSuccessViolations = reducerStates.filter((item) => item.fakeSuccessAllowed).length;

  return {
    version: STREAM_FOUNDATION_137Z_KERNEL_ACTION_REDUCER_VERSION,
    totalReducerCases: reducerStates.length,
    coveredActions: unique(coveredActions),
    uncoveredActions: [],
    reducerStates,
    directBindingViolations,
    fakeSuccessViolations,
    streamIndexPatchIncluded: false,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
  };
}
