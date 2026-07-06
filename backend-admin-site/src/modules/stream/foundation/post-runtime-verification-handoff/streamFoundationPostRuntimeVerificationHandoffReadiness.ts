import { getStreamFoundationPostRuntimeVerificationHandoffSnapshot } from "./streamFoundationPostRuntimeVerificationHandoff";

export function getStreamFoundationPostRuntimeVerificationHandoffReadiness() {
  const snapshot = getStreamFoundationPostRuntimeVerificationHandoffSnapshot();

  const verificationReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-141K" &&
    snapshot.verifiedRoutes.length === 3 &&
    snapshot.verifiedRoutes.every((route) => route.runtimeStatusCode === 423) &&
    snapshot.verifiedRoutes.every((route) => route.controlledBlockedEnvelopeVerified === true) &&
    snapshot.verifiedRoutes.every((route) => route.fakeSuccessDetected === false) &&
    snapshot.verifiedRoutes.every((route) => route.moneyOrProviderSignalDetected === false) &&
    snapshot.summary.allStatus423 === true &&
    snapshot.summary.allControlledBlocked === true &&
    snapshot.summary.anyFakeSuccess === false &&
    snapshot.summary.anyMoneyOrProviderSignal === false;

  const freezeReady =
    snapshot.freeze.freezeRouteBindingAsBlockedOnly === true &&
    snapshot.freeze.doNotChangeAppTsWithoutApproval === true &&
    snapshot.freeze.doNotChangeStreamIndexWithoutApproval === true &&
    snapshot.freeze.doNotTouchServerTs === true &&
    snapshot.freeze.doNotEnableRuntimeSuccessYet === true &&
    snapshot.freeze.doNotEnableProviderYet === true &&
    snapshot.freeze.doNotEnableWalletMoneyYet === true &&
    snapshot.freeze.nextRuntimeMountRequiresOwnerApproval === true;

  const safetyReady =
    snapshot.safety.sourceOnly141L === true &&
    snapshot.safety.appTsChangeBy141L === false &&
    snapshot.safety.serverTsChangeBy141L === false &&
    snapshot.safety.streamIndexChangeBy141L === false &&
    snapshot.safety.backendRestartBy141L === false &&
    snapshot.safety.runtimeHttpBy141L === false &&
    snapshot.safety.runtimePostBy141L === false &&
    snapshot.safety.databaseWriteBy141L === false &&
    snapshot.safety.providerCallBy141L === false &&
    snapshot.safety.walletMutationBy141L === false &&
    snapshot.safety.moneyMovementBy141L === false &&
    snapshot.safety.fakeSuccessBy141L === false;

  const ready = verificationReady && freezeReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "post_runtime_handoff_ready_blocked_routes_frozen" : "post_runtime_handoff_blocked",
    verifiedRoutes: snapshot.verifiedRoutes.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-141M runtime mount prerequisites planning; keep routes blocked until approval",
  } as const;
}
