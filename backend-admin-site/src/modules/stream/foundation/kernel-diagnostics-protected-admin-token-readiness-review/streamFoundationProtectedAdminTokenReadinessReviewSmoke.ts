import { getStreamFoundationProtectedAdminTokenReadinessReviewSnapshot } from "./streamFoundationProtectedAdminTokenReadinessReview";
import { getStreamFoundationProtectedAdminTokenReadinessReviewReadiness } from "./streamFoundationProtectedAdminTokenReadinessReviewReadiness";

export function runStreamFoundationProtectedAdminTokenReadinessReviewSmoke() {
  const snapshot = getStreamFoundationProtectedAdminTokenReadinessReviewSnapshot();
  const readiness = getStreamFoundationProtectedAdminTokenReadinessReviewReadiness();

  const assertions = [
    {
      id: "version_140m",
      passed: snapshot.version === "BACKEND-STREAM-FOUNDATION-140M",
      evidence: snapshot.version,
    },
    {
      id: "previous_evidence_locked",
      passed:
        snapshot.previousEvidence.runtimeSmokeStage === "BACKEND-STREAM-FOUNDATION-140K-FIX1" &&
        snapshot.previousEvidence.postRuntimeSmokeStage === "BACKEND-STREAM-FOUNDATION-140L" &&
        snapshot.previousEvidence.healthStatusCode === 200,
      evidence: JSON.stringify(snapshot.previousEvidence),
    },
    {
      id: "targets_are_protected_get",
      passed:
        snapshot.adminReadinessTargets.length === 2 &&
        snapshot.adminReadinessTargets.every((target) => target.method === "GET" && target.authRequired === true),
      evidence: JSON.stringify(snapshot.adminReadinessTargets),
    },
    {
      id: "token_not_stored",
      passed: snapshot.safety.tokenValueStored === false && snapshot.safety.rawTokenReturned === false,
      evidence: JSON.stringify({ tokenValueStored: snapshot.safety.tokenValueStored, rawTokenReturned: snapshot.safety.rawTokenReturned }),
    },
    {
      id: "no_runtime_or_money_actions",
      passed:
        snapshot.safety.backendRestartPerformed === 0 &&
        snapshot.safety.runtimeHttpSmokePerformedByThisStage === 0 &&
        snapshot.safety.authenticatedHttpSmokePerformedByThisStage === 0 &&
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
    stage: "protected_admin_token_readiness_review_source_only_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "protected_admin_token_readiness_review_smoke_passed" : "protected_admin_token_readiness_review_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: snapshot.nextRecommendedStage,
  } as const;
}
