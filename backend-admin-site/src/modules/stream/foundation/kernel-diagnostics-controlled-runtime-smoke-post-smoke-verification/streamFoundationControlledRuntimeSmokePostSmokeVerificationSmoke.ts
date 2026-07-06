import { getStreamFoundationControlledRuntimeSmokePostSmokeVerificationReadiness } from "./streamFoundationControlledRuntimeSmokePostSmokeVerificationReadiness";
import { getStreamFoundationControlledRuntimeSmokePostSmokeVerificationSnapshot } from "./streamFoundationControlledRuntimeSmokePostSmokeVerification";

export function runStreamFoundationControlledRuntimeSmokePostSmokeVerificationSmoke() {
  const snapshot = getStreamFoundationControlledRuntimeSmokePostSmokeVerificationSnapshot();
  const readiness = getStreamFoundationControlledRuntimeSmokePostSmokeVerificationReadiness();

  const assertions = [
    {
      id: "snapshot_version_140l",
      passed: snapshot.version === "BACKEND-STREAM-FOUNDATION-140L",
      evidence: snapshot.version,
    },
    {
      id: "smoke_fix1_verified",
      passed: snapshot.verifiedEvidence.runtimeSmokeVersion === "BACKEND-STREAM-FOUNDATION-140K-FIX1" && snapshot.verifiedEvidence.smokeOk === true,
      evidence: JSON.stringify(snapshot.verifiedEvidence),
    },
    {
      id: "health_marker_verified",
      passed: snapshot.verifiedEvidence.healthStatusCode === 200 && snapshot.verifiedEvidence.streamFoundationMarkerAccepted === true,
      evidence: "health=200 and marker accepted",
    },
    {
      id: "protected_admin_routes_verified",
      passed: snapshot.verifiedEvidence.adminRoutesProtectedWithoutToken === true && snapshot.verifiedEvidence.readinessProtectedStatus === 403 && snapshot.verifiedEvidence.previewProtectedStatus === 403,
      evidence: "readiness=403 preview=403 without admin token",
    },
    {
      id: "safety_zero_mutations",
      passed:
        snapshot.safety.backendRestartPerformed === 0 &&
        snapshot.safety.databaseWritePerformed === 0 &&
        snapshot.safety.providerCallPerformed === 0 &&
        snapshot.safety.walletMutationPerformed === 0 &&
        snapshot.safety.paymentAuthorizationPerformed === 0 &&
        snapshot.safety.monthlyPayoutPerformed === 0 &&
        snapshot.safety.moneyMovementPerformed === 0 &&
        snapshot.safety.fakeSuccessAllowed === false,
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
    stage: "post_runtime_smoke_verification_source_only_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "post_runtime_smoke_verification_smoke_passed" : "post_runtime_smoke_verification_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: snapshot.nextRecommendedStage,
  } as const;
}
