import type { StreamFoundationKernelBridgeRequest } from "./streamFoundationKernelBridgeContracts";
import { STREAM_FOUNDATION_137W_KERNEL_BRIDGE_CONTRACTS_VERSION } from "./streamFoundationKernelBridgeContracts";
import { createStreamFoundationKernelBridgeDecision, getStreamFoundationKernelBridgeSnapshot } from "./streamFoundationKernelBridgePolicy";

export interface StreamFoundation137WKernelBridgeSmokeCase {
  readonly name: string;
  readonly request: StreamFoundationKernelBridgeRequest;
  readonly expectedFakeSuccessAllowed: false;
  readonly expectedDirectProviderCallAllowed: false;
  readonly expectedDirectWalletMutationAllowed: false;
}

export interface StreamFoundation137WKernelBridgeSmokeResult {
  readonly version: typeof STREAM_FOUNDATION_137W_KERNEL_BRIDGE_CONTRACTS_VERSION;
  readonly totalCases: number;
  readonly passedCases: number;
  readonly failedCases: number;
  readonly directBindingViolations: number;
  readonly fakeSuccessViolations: number;
  readonly streamIndexPatchIncluded: false;
}

export const STREAM_FOUNDATION_137W_KERNEL_BRIDGE_SMOKE_CASES: readonly StreamFoundation137WKernelBridgeSmokeCase[] = [
  {
    name: "live start blocked until protected route/realtime/db binding",
    request: { requestId: "137w-live-start", surface: "live", action: "live_start", actorUserId: "user-a", idempotencyKey: "idem-live-start" },
    expectedFakeSuccessAllowed: false,
    expectedDirectProviderCallAllowed: false,
    expectedDirectWalletMutationAllowed: false,
  },
  {
    name: "short publish blocked until provider/admin/db gates",
    request: { requestId: "137w-short-publish", surface: "shorts", action: "short_publish", actorUserId: "user-a", idempotencyKey: "idem-short-publish" },
    expectedFakeSuccessAllowed: false,
    expectedDirectProviderCallAllowed: false,
    expectedDirectWalletMutationAllowed: false,
  },
  {
    name: "gift purchase blocked until payment provider and wallet ledger gates",
    request: { requestId: "137w-gift", surface: "gifts", action: "gift_purchase_request", actorUserId: "sender", targetUserId: "receiver", amountMinor: 500, currency: "COIN", idempotencyKey: "idem-gift" },
    expectedFakeSuccessAllowed: false,
    expectedDirectProviderCallAllowed: false,
    expectedDirectWalletMutationAllowed: false,
  },
  {
    name: "monthly payout blocked until monthly batch/provider/wallet gates",
    request: { requestId: "137w-payout", surface: "monthly_payout", action: "monthly_payout_batch_prepare", actorUserId: "admin", idempotencyKey: "idem-payout" },
    expectedFakeSuccessAllowed: false,
    expectedDirectProviderCallAllowed: false,
    expectedDirectWalletMutationAllowed: false,
  },
];

export function runStreamFoundation137WKernelBridgeSmoke(): StreamFoundation137WKernelBridgeSmokeResult {
  const snapshot = getStreamFoundationKernelBridgeSnapshot();
  const failedCases = STREAM_FOUNDATION_137W_KERNEL_BRIDGE_SMOKE_CASES.filter((testCase) => {
    const decision = createStreamFoundationKernelBridgeDecision(testCase.request);
    return decision.fakeSuccessAllowed !== testCase.expectedFakeSuccessAllowed
      || decision.directProviderCallAllowed !== testCase.expectedDirectProviderCallAllowed
      || decision.directWalletMutationAllowed !== testCase.expectedDirectWalletMutationAllowed
      || decision.rawSecretsReturned !== false
      || decision.mobileProviderKeysAllowed !== false;
  }).length;

  return {
    version: STREAM_FOUNDATION_137W_KERNEL_BRIDGE_CONTRACTS_VERSION,
    totalCases: STREAM_FOUNDATION_137W_KERNEL_BRIDGE_SMOKE_CASES.length,
    passedCases: STREAM_FOUNDATION_137W_KERNEL_BRIDGE_SMOKE_CASES.length - failedCases,
    failedCases,
    directBindingViolations: snapshot.directBindingViolations,
    fakeSuccessViolations: snapshot.fakeSuccessViolations,
    streamIndexPatchIncluded: false,
  };
}
