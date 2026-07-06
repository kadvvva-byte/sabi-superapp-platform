import { getStreamFoundationPostRuntimeVerificationHandoffSnapshot } from "./streamFoundationPostRuntimeVerificationHandoff";
import { getStreamFoundationPostRuntimeVerificationHandoffReadiness } from "./streamFoundationPostRuntimeVerificationHandoffReadiness";

export function runStreamFoundationPostRuntimeVerificationHandoffSmoke() {
  const snapshot = getStreamFoundationPostRuntimeVerificationHandoffSnapshot();
  const readiness = getStreamFoundationPostRuntimeVerificationHandoffReadiness();

  const assertions = [
    {
      id: "three_blocked_routes_verified",
      passed:
        snapshot.verifiedRoutes.length === 3 &&
        snapshot.verifiedRoutes.every((route) => route.runtimeStatusCode === 423) &&
        snapshot.verifiedRoutes.every((route) => route.controlledBlockedEnvelopeVerified === true),
      evidence: JSON.stringify(snapshot.verifiedRoutes),
    },
    {
      id: "no_fake_success_or_money_signal",
      passed:
        snapshot.summary.anyFakeSuccess === false &&
        snapshot.summary.anyMoneyOrProviderSignal === false &&
        snapshot.verifiedRoutes.every((route) => route.fakeSuccessDetected === false) &&
        snapshot.verifiedRoutes.every((route) => route.moneyOrProviderSignalDetected === false),
      evidence: JSON.stringify(snapshot.summary),
    },
    {
      id: "source_safety_freeze_ready",
      passed:
        snapshot.freeze.freezeRouteBindingAsBlockedOnly === true &&
        snapshot.freeze.doNotTouchServerTs === true &&
        snapshot.freeze.nextRuntimeMountRequiresOwnerApproval === true,
      evidence: JSON.stringify(snapshot.freeze),
    },
    {
      id: "no_141l_runtime_or_write_actions",
      passed:
        snapshot.safety.appTsChangeBy141L === false &&
        snapshot.safety.serverTsChangeBy141L === false &&
        snapshot.safety.streamIndexChangeBy141L === false &&
        snapshot.safety.runtimeHttpBy141L === false &&
        snapshot.safety.runtimePostBy141L === false &&
        snapshot.safety.databaseWriteBy141L === false &&
        snapshot.safety.providerCallBy141L === false &&
        snapshot.safety.walletMutationBy141L === false &&
        snapshot.safety.moneyMovementBy141L === false,
      evidence: JSON.stringify(snapshot.safety),
    },
    {
      id: "readiness_true",
      passed: readiness.ready === true,
      evidence: readiness.status,
    },
  ];

  const failedAssertions = assertions.filter((assertion) => !assertion.passed);

  return {
    version: snapshot.version,
    stage: "post_runtime_verification_handoff_and_source_safety_freeze_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "post_runtime_handoff_smoke_passed" : "post_runtime_handoff_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
