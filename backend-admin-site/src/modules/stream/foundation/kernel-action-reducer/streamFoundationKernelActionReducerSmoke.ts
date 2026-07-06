import type { StreamFoundationKernelActionReducerRequest } from "./streamFoundationKernelActionReducerContracts";
import { STREAM_FOUNDATION_137Z_KERNEL_ACTION_REDUCER_VERSION } from "./streamFoundationKernelActionReducerContracts";
import { reduceStreamFoundationKernelAction } from "./streamFoundationKernelActionReducer";
import { getStreamFoundationKernelActionReducerReadiness } from "./streamFoundationKernelActionReducerReadiness";

export interface StreamFoundationKernelActionReducerSmokeCase {
  readonly name: string;
  readonly request: StreamFoundationKernelActionReducerRequest;
  readonly expectedExecutionAllowedNow: false;
  readonly expectedFakeSuccessAllowed: false;
  readonly expectedStreamIndexPatchIncluded: false;
}

export interface StreamFoundationKernelActionReducerSmokeResult {
  readonly name: string;
  readonly passed: boolean;
  readonly stage: string;
  readonly safeCode: string;
  readonly executionAllowedNow: false;
  readonly fakeSuccessAllowed: false;
  readonly streamIndexPatchIncluded: false;
  readonly moneyMovementAllowedNow: false;
}

export interface StreamFoundationKernelActionReducerSmokeSnapshot {
  readonly version: typeof STREAM_FOUNDATION_137Z_KERNEL_ACTION_REDUCER_VERSION;
  readonly readinessPassed: boolean;
  readonly totalCases: number;
  readonly passedCases: number;
  readonly failedCases: number;
  readonly results: readonly StreamFoundationKernelActionReducerSmokeResult[];
  readonly routeMountAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowed: false;
}

const smokeCases: readonly StreamFoundationKernelActionReducerSmokeCase[] = [
  {
    name: "live start reduces to safe gated state",
    request: { requestId: "137z-live-start", surface: "live_room", action: "live.start.request", actorUserId: "u1", idempotencyKey: "idem-live" },
    expectedExecutionAllowedNow: false,
    expectedFakeSuccessAllowed: false,
    expectedStreamIndexPatchIncluded: false,
  },
  {
    name: "short publish reduces without direct media/provider write",
    request: { requestId: "137z-short-publish", surface: "shorts_creator", action: "short.publish.request", actorUserId: "u1", idempotencyKey: "idem-short" },
    expectedExecutionAllowedNow: false,
    expectedFakeSuccessAllowed: false,
    expectedStreamIndexPatchIncluded: false,
  },
  {
    name: "gift purchase reduces to payment and Wallet ledger gates",
    request: { requestId: "137z-gift", surface: "gift_purchase", action: "gift.purchase.request", actorUserId: "sender", targetUserId: "creator", idempotencyKey: "idem-gift", amountMinor: 5000, currency: "UZS" },
    expectedExecutionAllowedNow: false,
    expectedFakeSuccessAllowed: false,
    expectedStreamIndexPatchIncluded: false,
  },
  {
    name: "gift purchase missing amount is validation blocked",
    request: { requestId: "137z-gift-no-amount", surface: "gift_purchase", action: "gift.purchase.request", actorUserId: "sender", targetUserId: "creator", idempotencyKey: "idem-gift-no-amount" },
    expectedExecutionAllowedNow: false,
    expectedFakeSuccessAllowed: false,
    expectedStreamIndexPatchIncluded: false,
  },
  {
    name: "Admin monetization config reduce keeps secrets server-side only",
    request: { requestId: "137z-admin-config", surface: "admin_monetization", action: "admin.monetization.config.save", actorUserId: "admin", idempotencyKey: "idem-admin" },
    expectedExecutionAllowedNow: false,
    expectedFakeSuccessAllowed: false,
    expectedStreamIndexPatchIncluded: false,
  },
  {
    name: "monthly payout reduce keeps payout monthly and gated",
    request: { requestId: "137z-payout", surface: "monthly_payout", action: "payout.monthly.batch.prepare", actorUserId: "admin", idempotencyKey: "idem-payout" },
    expectedExecutionAllowedNow: false,
    expectedFakeSuccessAllowed: false,
    expectedStreamIndexPatchIncluded: false,
  },
];

export function getStreamFoundationKernelActionReducerSmokeSnapshot(): StreamFoundationKernelActionReducerSmokeSnapshot {
  const readiness = getStreamFoundationKernelActionReducerReadiness();
  const results = smokeCases.map((test): StreamFoundationKernelActionReducerSmokeResult => {
    const decision = reduceStreamFoundationKernelAction(test.request);
    const passed = decision.executionAllowedNow === test.expectedExecutionAllowedNow && decision.fakeSuccessAllowed === test.expectedFakeSuccessAllowed && decision.streamIndexPatchIncluded === test.expectedStreamIndexPatchIncluded && decision.moneyMovementAllowedNow === false;
    return {
      name: test.name,
      passed,
      stage: decision.reducedState.stage,
      safeCode: decision.reducedState.safeCode,
      executionAllowedNow: decision.executionAllowedNow,
      fakeSuccessAllowed: decision.fakeSuccessAllowed,
      streamIndexPatchIncluded: decision.streamIndexPatchIncluded,
      moneyMovementAllowedNow: decision.moneyMovementAllowedNow,
    };
  });
  const failedCases = results.filter((item) => !item.passed).length;

  return {
    version: STREAM_FOUNDATION_137Z_KERNEL_ACTION_REDUCER_VERSION,
    readinessPassed: readiness.readyForKernelReducer,
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
