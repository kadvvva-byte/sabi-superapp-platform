import type { StreamFoundationKernelFacadeActionRouterRequest } from "./streamFoundationKernelFacadeActionRouterContracts";
import { STREAM_FOUNDATION_137Y_KERNEL_FACADE_ACTION_ROUTER_VERSION } from "./streamFoundationKernelFacadeActionRouterContracts";
import { routeStreamFoundationKernelFacadeAction } from "./streamFoundationKernelFacadeActionRouter";
import { getStreamFoundationKernelFacadeActionRouterReadiness } from "./streamFoundationKernelFacadeActionRouterReadiness";

export interface StreamFoundationKernelFacadeActionRouterSmokeCase {
  readonly name: string;
  readonly request: StreamFoundationKernelFacadeActionRouterRequest;
  readonly expectedAcceptedByRouter: boolean;
  readonly expectedFakeSuccessAllowed: false;
}

export interface StreamFoundationKernelFacadeActionRouterSmokeResult {
  readonly name: string;
  readonly passed: boolean;
  readonly status: string;
  readonly safeCode: string;
  readonly acceptedByRouter: boolean;
  readonly fakeSuccessAllowed: false;
  readonly streamIndexPatchIncluded: false;
}

export interface StreamFoundationKernelFacadeActionRouterSmokeSnapshot {
  readonly version: typeof STREAM_FOUNDATION_137Y_KERNEL_FACADE_ACTION_ROUTER_VERSION;
  readonly readinessPassed: boolean;
  readonly totalCases: number;
  readonly passedCases: number;
  readonly failedCases: number;
  readonly results: readonly StreamFoundationKernelFacadeActionRouterSmokeResult[];
  readonly routeMountAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowed: false;
}

const smokeCases: readonly StreamFoundationKernelFacadeActionRouterSmokeCase[] = [
  {
    name: "live start routes only through facade and remains gated",
    request: { requestId: "137y-live-start", surface: "live_room", action: "live.start.request", actorUserId: "u1", idempotencyKey: "idem-live" },
    expectedAcceptedByRouter: false,
    expectedFakeSuccessAllowed: false,
  },
  {
    name: "short publish routes only through facade and remains gated",
    request: { requestId: "137y-short-publish", surface: "shorts_creator", action: "short.publish.request", actorUserId: "u1", idempotencyKey: "idem-short" },
    expectedAcceptedByRouter: false,
    expectedFakeSuccessAllowed: false,
  },
  {
    name: "short feed read has no direct DB binding",
    request: { requestId: "137y-short-feed", surface: "shorts_feed", action: "short.feed.read" },
    expectedAcceptedByRouter: false,
    expectedFakeSuccessAllowed: false,
  },
  {
    name: "gift purchase routes to payment kernel but never fake succeeds",
    request: { requestId: "137y-gift", surface: "gift_purchase", action: "gift.purchase.request", actorUserId: "sender", targetUserId: "creator", idempotencyKey: "idem-gift", amountMinor: 5000, currency: "UZS" },
    expectedAcceptedByRouter: false,
    expectedFakeSuccessAllowed: false,
  },
  {
    name: "gift purchase missing amount is blocked before facade",
    request: { requestId: "137y-gift-no-amount", surface: "gift_purchase", action: "gift.purchase.request", actorUserId: "sender", targetUserId: "creator", idempotencyKey: "idem-gift-no-amount" },
    expectedAcceptedByRouter: false,
    expectedFakeSuccessAllowed: false,
  },
  {
    name: "admin monetization save is server-side only",
    request: { requestId: "137y-admin-config", surface: "admin_monetization", action: "admin.monetization.config.save", actorUserId: "admin", idempotencyKey: "idem-admin" },
    expectedAcceptedByRouter: false,
    expectedFakeSuccessAllowed: false,
  },
  {
    name: "monthly payout batch stays monthly and gated",
    request: { requestId: "137y-payout", surface: "monthly_payout", action: "payout.monthly.batch.prepare", actorUserId: "admin", idempotencyKey: "idem-payout" },
    expectedAcceptedByRouter: false,
    expectedFakeSuccessAllowed: false,
  },
];

export function getStreamFoundationKernelFacadeActionRouterSmokeSnapshot(): StreamFoundationKernelFacadeActionRouterSmokeSnapshot {
  const readiness = getStreamFoundationKernelFacadeActionRouterReadiness();
  const results = smokeCases.map((test): StreamFoundationKernelFacadeActionRouterSmokeResult => {
    const decision = routeStreamFoundationKernelFacadeAction(test.request);
    const passed = decision.acceptedByRouter === test.expectedAcceptedByRouter && decision.fakeSuccessAllowed === test.expectedFakeSuccessAllowed;
    return {
      name: test.name,
      passed,
      status: decision.status,
      safeCode: decision.safeCode,
      acceptedByRouter: decision.acceptedByRouter,
      fakeSuccessAllowed: decision.fakeSuccessAllowed,
      streamIndexPatchIncluded: decision.streamIndexPatchIncluded,
    };
  });
  const failedCases = results.filter((item) => !item.passed).length;

  return {
    version: STREAM_FOUNDATION_137Y_KERNEL_FACADE_ACTION_ROUTER_VERSION,
    readinessPassed: readiness.readyForKernelActionRouting,
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
