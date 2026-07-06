import type { StreamFoundationKernelEventDispatcherEventKind, StreamFoundationKernelEventDispatcherRequest } from "./streamFoundationKernelEventDispatcherContracts";
import { STREAM_FOUNDATION_138B_KERNEL_EVENT_DISPATCHER_VERSION } from "./streamFoundationKernelEventDispatcherContracts";
import { dispatchStreamFoundationKernelEvents } from "./streamFoundationKernelEventDispatcher";
import { getStreamFoundationKernelEventDispatcherReadiness } from "./streamFoundationKernelEventDispatcherReadiness";

export interface StreamFoundationKernelEventDispatcherSmokeCase {
  readonly name: string;
  readonly request: StreamFoundationKernelEventDispatcherRequest;
  readonly requiredEventKinds: readonly StreamFoundationKernelEventDispatcherEventKind[];
}

export interface StreamFoundationKernelEventDispatcherSmokeResult {
  readonly name: string;
  readonly passed: boolean;
  readonly eventCount: number;
  readonly eventKinds: readonly StreamFoundationKernelEventDispatcherEventKind[];
  readonly dispatchExecutedNow: false;
  readonly eventBusPublishAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowed: false;
  readonly streamIndexPatchIncluded: false;
}

export interface StreamFoundationKernelEventDispatcherSmokeSnapshot {
  readonly version: typeof STREAM_FOUNDATION_138B_KERNEL_EVENT_DISPATCHER_VERSION;
  readonly readinessPassed: boolean;
  readonly totalCases: number;
  readonly passedCases: number;
  readonly failedCases: number;
  readonly results: readonly StreamFoundationKernelEventDispatcherSmokeResult[];
  readonly dispatchExecutedNow: false;
  readonly eventBusPublishAllowedNow: false;
  readonly routeMountAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowed: false;
}

const smokeCases: readonly StreamFoundationKernelEventDispatcherSmokeCase[] = [
  {
    name: "live start produces route, persistence, realtime, audit, and safe UI events",
    request: { requestId: "138b-live-start", surface: "live_room", action: "live.start.request", actorUserId: "u1", idempotencyKey: "idem-live" },
    requiredEventKinds: ["kernel_state_transition_recorded", "safe_ui_state_requested", "route_mount_gate_required", "database_persistence_gate_required", "realtime_session_gate_required", "audit_persistence_required"],
  },
  {
    name: "gift purchase produces provider, Wallet ledger, real authorization, pending earning, and audit events",
    request: { requestId: "138b-gift", surface: "gift_purchase", action: "gift.purchase.request", actorUserId: "sender", targetUserId: "creator", idempotencyKey: "idem-gift", amountMinor: 5000, currency: "UZS" },
    requiredEventKinds: ["provider_config_gate_required", "wallet_ledger_gate_required", "real_payment_authorization_required", "recipient_pending_earning_required", "audit_persistence_required"],
  },
  {
    name: "Admin monetization config produces admin, provider, Wallet ledger, persistence, and audit events",
    request: { requestId: "138b-admin-config", surface: "admin_monetization", action: "admin.monetization.config.save", actorUserId: "admin", idempotencyKey: "idem-admin" },
    requiredEventKinds: ["admin_permission_gate_required", "provider_config_gate_required", "wallet_ledger_gate_required", "database_persistence_gate_required", "audit_persistence_required"],
  },
  {
    name: "monthly payout produces monthly batch, creator KYC, provider, Wallet ledger, and audit events",
    request: { requestId: "138b-payout", surface: "monthly_payout", action: "payout.monthly.batch.prepare", actorUserId: "admin", idempotencyKey: "idem-payout" },
    requiredEventKinds: ["monthly_payout_batch_required", "creator_kyc_gate_required", "provider_config_gate_required", "wallet_ledger_gate_required", "audit_persistence_required"],
  },
];

function includesAll(actual: readonly StreamFoundationKernelEventDispatcherEventKind[], required: readonly StreamFoundationKernelEventDispatcherEventKind[]): boolean {
  return required.every((item) => actual.includes(item));
}

export function getStreamFoundationKernelEventDispatcherSmokeSnapshot(): StreamFoundationKernelEventDispatcherSmokeSnapshot {
  const readiness = getStreamFoundationKernelEventDispatcherReadiness();
  const results = smokeCases.map((test): StreamFoundationKernelEventDispatcherSmokeResult => {
    const decision = dispatchStreamFoundationKernelEvents(test.request);
    const eventKinds = decision.events.map((item) => item.eventKind);
    const passed = includesAll(eventKinds, test.requiredEventKinds) && decision.dispatchExecutedNow === false && decision.eventBusPublishAllowedNow === false && decision.moneyMovementAllowedNow === false && decision.fakeSuccessAllowed === false && decision.streamIndexPatchIncluded === false;
    return {
      name: test.name,
      passed,
      eventCount: decision.eventCount,
      eventKinds,
      dispatchExecutedNow: decision.dispatchExecutedNow,
      eventBusPublishAllowedNow: decision.eventBusPublishAllowedNow,
      moneyMovementAllowedNow: decision.moneyMovementAllowedNow,
      fakeSuccessAllowed: decision.fakeSuccessAllowed,
      streamIndexPatchIncluded: decision.streamIndexPatchIncluded,
    };
  });
  const failedCases = results.filter((item) => !item.passed).length;

  return {
    version: STREAM_FOUNDATION_138B_KERNEL_EVENT_DISPATCHER_VERSION,
    readinessPassed: readiness.readyForKernelEventDispatcher,
    totalCases: results.length,
    passedCases: results.length - failedCases,
    failedCases,
    results,
    dispatchExecutedNow: false,
    eventBusPublishAllowedNow: false,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
  };
}
