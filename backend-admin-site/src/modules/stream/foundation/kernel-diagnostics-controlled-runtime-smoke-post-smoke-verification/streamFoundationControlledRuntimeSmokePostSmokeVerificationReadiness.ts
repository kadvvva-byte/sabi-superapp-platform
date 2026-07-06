import { getStreamFoundationControlledRuntimeSmokePostSmokeVerificationSnapshot } from "./streamFoundationControlledRuntimeSmokePostSmokeVerification";

export function getStreamFoundationControlledRuntimeSmokePostSmokeVerificationReadiness() {
  const snapshot = getStreamFoundationControlledRuntimeSmokePostSmokeVerificationSnapshot();
  const ready =
    snapshot.status === "controlled_runtime_smoke_verified_source_only_handoff_ready" &&
    snapshot.verifiedEvidence.smokeOk === true &&
    snapshot.verifiedEvidence.healthStatusCode === 200 &&
    snapshot.verifiedEvidence.streamFoundationMarkerAccepted === true &&
    snapshot.verifiedEvidence.adminRoutesProtectedWithoutToken === true &&
    snapshot.blockingAssertions.length === 0 &&
    snapshot.safety.backendRestartPerformed === 0 &&
    snapshot.safety.databaseWritePerformed === 0 &&
    snapshot.safety.providerCallPerformed === 0 &&
    snapshot.safety.walletMutationPerformed === 0 &&
    snapshot.safety.moneyMovementPerformed === 0 &&
    snapshot.safety.fakeSuccessAllowed === false;

  return {
    version: snapshot.version,
    stage: snapshot.stage,
    ready,
    status: ready ? "post_runtime_smoke_verification_ready" : "post_runtime_smoke_verification_blocked",
    blockingAssertions: snapshot.blockingAssertions,
    nextRecommendedStage: snapshot.nextRecommendedStage,
  } as const;
}
