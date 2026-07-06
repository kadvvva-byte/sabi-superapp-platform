import {
  STREAM_FOUNDATION_141L_POST_RUNTIME_HANDOFF_VERSION,
  type StreamFoundation141LPostRuntimeHandoffSnapshot,
  type StreamFoundation141LVerifiedRoute,
} from "./streamFoundationPostRuntimeVerificationHandoffContracts";

const VERIFIED_ROUTES: readonly StreamFoundation141LVerifiedRoute[] = [
  {
    routeId: "stream_live_start",
    method: "POST",
    path: "/api/stream/live/start",
    runtimeStatusCode: 423,
    controlledBlockedEnvelopeVerified: true,
    fakeSuccessDetected: false,
    moneyOrProviderSignalDetected: false,
  },
  {
    routeId: "stream_live_stop",
    method: "POST",
    path: "/api/stream/live/stop",
    runtimeStatusCode: 423,
    controlledBlockedEnvelopeVerified: true,
    fakeSuccessDetected: false,
    moneyOrProviderSignalDetected: false,
  },
  {
    routeId: "stream_live_heartbeat",
    method: "POST",
    path: "/api/stream/live/heartbeat",
    runtimeStatusCode: 423,
    controlledBlockedEnvelopeVerified: true,
    fakeSuccessDetected: false,
    moneyOrProviderSignalDetected: false,
  },
];

export function getStreamFoundationPostRuntimeVerificationHandoffSnapshot(): StreamFoundation141LPostRuntimeHandoffSnapshot {
  return {
    version: STREAM_FOUNDATION_141L_POST_RUNTIME_HANDOFF_VERSION,
    stage: "post_runtime_verification_handoff_and_source_safety_freeze",
    status: "blocked_routes_verified_and_frozen",
    previousStage: "BACKEND-STREAM-FOUNDATION-141K",
    baseUrlVerified: "http://127.0.0.1:4001",
    verifiedRoutes: VERIFIED_ROUTES,
    summary: {
      totalRoutesChecked: 3,
      allStatus423: true,
      allControlledBlocked: true,
      anyFakeSuccess: false,
      anyMoneyOrProviderSignal: false,
    },
    freeze: {
      freezeRouteBindingAsBlockedOnly: true,
      doNotChangeAppTsWithoutApproval: true,
      doNotChangeStreamIndexWithoutApproval: true,
      doNotTouchServerTs: true,
      doNotEnableRuntimeSuccessYet: true,
      doNotEnableProviderYet: true,
      doNotEnableWalletMoneyYet: true,
      nextRuntimeMountRequiresOwnerApproval: true,
    },
    safety: {
      sourceOnly141L: true,
      appTsChangeBy141L: false,
      serverTsChangeBy141L: false,
      streamIndexChangeBy141L: false,
      backendRestartBy141L: false,
      runtimeHttpBy141L: false,
      runtimePostBy141L: false,
      databaseWriteBy141L: false,
      providerCallBy141L: false,
      walletMutationBy141L: false,
      paymentAuthorizationBy141L: false,
      monthlyPayoutBy141L: false,
      moneyMovementBy141L: false,
      fakeSuccessBy141L: false,
    },
  };
}
