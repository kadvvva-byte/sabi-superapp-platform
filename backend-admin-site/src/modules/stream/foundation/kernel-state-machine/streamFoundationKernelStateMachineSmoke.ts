import type { StreamFoundationKernelStateMachineRequest, StreamFoundationKernelStateMachineState } from "./streamFoundationKernelStateMachineContracts";
import { STREAM_FOUNDATION_138A_KERNEL_STATE_MACHINE_VERSION } from "./streamFoundationKernelStateMachineContracts";
import { transitionStreamFoundationKernelState } from "./streamFoundationKernelStateMachine";
import { getStreamFoundationKernelStateMachineReadiness } from "./streamFoundationKernelStateMachineReadiness";

export interface StreamFoundationKernelStateMachineSmokeCase {
  readonly name: string;
  readonly request: StreamFoundationKernelStateMachineRequest;
  readonly expectedState: StreamFoundationKernelStateMachineState;
}

export interface StreamFoundationKernelStateMachineSmokeResult {
  readonly name: string;
  readonly passed: boolean;
  readonly toState: StreamFoundationKernelStateMachineState;
  readonly committedNow: false;
  readonly executionAllowedNow: false;
  readonly fakeSuccessAllowed: false;
  readonly moneyMovementAllowedNow: false;
  readonly streamIndexPatchIncluded: false;
}

export interface StreamFoundationKernelStateMachineSmokeSnapshot {
  readonly version: typeof STREAM_FOUNDATION_138A_KERNEL_STATE_MACHINE_VERSION;
  readonly readinessPassed: boolean;
  readonly totalCases: number;
  readonly passedCases: number;
  readonly failedCases: number;
  readonly results: readonly StreamFoundationKernelStateMachineSmokeResult[];
  readonly routeMountAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowed: false;
}

const smokeCases: readonly StreamFoundationKernelStateMachineSmokeCase[] = [
  {
    name: "live start transitions to persistence and route mount gate",
    request: { requestId: "138a-live-start", surface: "live_room", action: "live.start.request", actorUserId: "u1", idempotencyKey: "idem-live" },
    expectedState: "live_blocked_until_persistence_and_route_mount",
  },
  {
    name: "short publish transitions to media persistence gate",
    request: { requestId: "138a-short-publish", surface: "shorts_creator", action: "short.publish.request", actorUserId: "u1", idempotencyKey: "idem-short" },
    expectedState: "shorts_blocked_until_media_persistence_and_route_mount",
  },
  {
    name: "gift purchase transitions to real payment and Wallet ledger gate",
    request: { requestId: "138a-gift", surface: "gift_purchase", action: "gift.purchase.request", actorUserId: "sender", targetUserId: "creator", idempotencyKey: "idem-gift", amountMinor: 5000, currency: "UZS" },
    expectedState: "gift_blocked_until_payment_authorization_and_wallet_ledger",
  },
  {
    name: "gift purchase without amount transitions to validation blocked",
    request: { requestId: "138a-gift-no-amount", surface: "gift_purchase", action: "gift.purchase.request", actorUserId: "sender", targetUserId: "creator", idempotencyKey: "idem-gift-no-amount" },
    expectedState: "validation_blocked",
  },
  {
    name: "Admin monetization config transitions to secure config and audit gate",
    request: { requestId: "138a-admin-config", surface: "admin_monetization", action: "admin.monetization.config.save", actorUserId: "admin", idempotencyKey: "idem-admin" },
    expectedState: "admin_monetization_blocked_until_secure_config_and_audit",
  },
  {
    name: "monthly payout transitions to monthly cycle and provider gate",
    request: { requestId: "138a-payout", surface: "monthly_payout", action: "payout.monthly.batch.prepare", actorUserId: "admin", idempotencyKey: "idem-payout" },
    expectedState: "monthly_payout_blocked_until_monthly_cycle_and_provider_gate",
  },
];

export function getStreamFoundationKernelStateMachineSmokeSnapshot(): StreamFoundationKernelStateMachineSmokeSnapshot {
  const readiness = getStreamFoundationKernelStateMachineReadiness();
  const results = smokeCases.map((test): StreamFoundationKernelStateMachineSmokeResult => {
    const decision = transitionStreamFoundationKernelState(test.request);
    const passed = decision.transition.toState === test.expectedState && decision.transition.committedNow === false && decision.executionAllowedNow === false && decision.fakeSuccessAllowed === false && decision.moneyMovementAllowedNow === false && decision.streamIndexPatchIncluded === false;
    return {
      name: test.name,
      passed,
      toState: decision.transition.toState,
      committedNow: decision.transition.committedNow,
      executionAllowedNow: decision.executionAllowedNow,
      fakeSuccessAllowed: decision.fakeSuccessAllowed,
      moneyMovementAllowedNow: decision.moneyMovementAllowedNow,
      streamIndexPatchIncluded: decision.streamIndexPatchIncluded,
    };
  });
  const failedCases = results.filter((item) => !item.passed).length;

  return {
    version: STREAM_FOUNDATION_138A_KERNEL_STATE_MACHINE_VERSION,
    readinessPassed: readiness.readyForKernelStateMachine,
    totalCases: results.length,
    passedCases: results.length - failedCases,
    failedCases,
    results,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
  };
}
