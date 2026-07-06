import type { StreamFoundationKernelFacadeConnectionRequest } from "./streamFoundationKernelFacadeConnectionContracts";
import { STREAM_FOUNDATION_137X_KERNEL_FACADE_CONNECTION_VERSION } from "./streamFoundationKernelFacadeConnectionContracts";
import { createStreamFoundationKernelFacadeConnectionDecision } from "./streamFoundationKernelFacadeConnectionPolicy";
import { getStreamFoundationKernelFacadeConnectionReadiness } from "./streamFoundationKernelFacadeConnectionReadiness";

export interface StreamFoundationKernelFacadeConnectionSmokeCase {
  readonly name: string;
  readonly request: StreamFoundationKernelFacadeConnectionRequest;
  readonly expectedAcceptedByFacade: boolean;
  readonly expectedFakeSuccessAllowed: false;
}

export interface StreamFoundationKernelFacadeConnectionSmokeResult {
  readonly name: string;
  readonly passed: boolean;
  readonly status: string;
  readonly safeCode: string;
  readonly acceptedByFacade: boolean;
  readonly fakeSuccessAllowed: false;
  readonly streamIndexPatchIncluded: false;
}

export interface StreamFoundationKernelFacadeConnectionSmokeSnapshot {
  readonly version: typeof STREAM_FOUNDATION_137X_KERNEL_FACADE_CONNECTION_VERSION;
  readonly readinessPassed: boolean;
  readonly totalCases: number;
  readonly passedCases: number;
  readonly failedCases: number;
  readonly results: readonly StreamFoundationKernelFacadeConnectionSmokeResult[];
  readonly routeMountAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowed: false;
}

const smokeCases: readonly StreamFoundationKernelFacadeConnectionSmokeCase[] = [
  {
    name: "live start stays behind bridge gates",
    request: { requestId: "137x-live-start", surface: "mobile_live", intent: "open_live_start_gate", actorUserId: "u1", idempotencyKey: "idem-live" },
    expectedAcceptedByFacade: false,
    expectedFakeSuccessAllowed: false,
  },
  {
    name: "short publish requires bridge/provider/moderation gates",
    request: { requestId: "137x-short-publish", surface: "mobile_shorts", intent: "publish_short_gate", actorUserId: "u1", idempotencyKey: "idem-short" },
    expectedAcceptedByFacade: false,
    expectedFakeSuccessAllowed: false,
  },
  {
    name: "gift purchase requires real payment wallet and admin gates",
    request: { requestId: "137x-gift", surface: "mobile_gifts", intent: "purchase_gift_gate", actorUserId: "sender", targetUserId: "creator", idempotencyKey: "idem-gift", amountMinor: 5000, currency: "UZS" },
    expectedAcceptedByFacade: false,
    expectedFakeSuccessAllowed: false,
  },
  {
    name: "gift purchase without amount is blocked before bridge",
    request: { requestId: "137x-gift-no-amount", surface: "mobile_gifts", intent: "purchase_gift_gate", actorUserId: "sender", targetUserId: "creator", idempotencyKey: "idem-gift-no-amount" },
    expectedAcceptedByFacade: false,
    expectedFakeSuccessAllowed: false,
  },
  {
    name: "admin monetization config save stays server-side only",
    request: { requestId: "137x-admin-config", surface: "admin_monetization", intent: "save_admin_monetization_config_gate", actorUserId: "admin", idempotencyKey: "idem-admin" },
    expectedAcceptedByFacade: false,
    expectedFakeSuccessAllowed: false,
  },
  {
    name: "monthly payout stays monthly only and gated",
    request: { requestId: "137x-payout", surface: "admin_monthly_payout", intent: "prepare_monthly_payout_batch_gate", actorUserId: "admin", idempotencyKey: "idem-payout" },
    expectedAcceptedByFacade: false,
    expectedFakeSuccessAllowed: false,
  },
];

export function getStreamFoundationKernelFacadeConnectionSmokeSnapshot(): StreamFoundationKernelFacadeConnectionSmokeSnapshot {
  const readiness = getStreamFoundationKernelFacadeConnectionReadiness();
  const results = smokeCases.map((test): StreamFoundationKernelFacadeConnectionSmokeResult => {
    const decision = createStreamFoundationKernelFacadeConnectionDecision(test.request);
    const passed = decision.acceptedByFacade === test.expectedAcceptedByFacade && decision.fakeSuccessAllowed === test.expectedFakeSuccessAllowed;
    return {
      name: test.name,
      passed,
      status: decision.status,
      safeCode: decision.safeCode,
      acceptedByFacade: decision.acceptedByFacade,
      fakeSuccessAllowed: decision.fakeSuccessAllowed,
      streamIndexPatchIncluded: decision.streamIndexPatchIncluded,
    };
  });
  const failedCases = results.filter((item) => !item.passed).length;
  return {
    version: STREAM_FOUNDATION_137X_KERNEL_FACADE_CONNECTION_VERSION,
    readinessPassed: readiness.readyForKernelOnlyConnection,
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
