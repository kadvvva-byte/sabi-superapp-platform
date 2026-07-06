import { getStreamFoundationProtectedAdminTokenReadinessReviewSnapshot } from "./streamFoundationProtectedAdminTokenReadinessReview";

export function getStreamFoundationProtectedAdminTokenReadinessReviewReadiness() {
  const snapshot = getStreamFoundationProtectedAdminTokenReadinessReviewSnapshot();
  const allTargetsAreProtectedGet =
    snapshot.adminReadinessTargets.length === 2 &&
    snapshot.adminReadinessTargets.every((target) => target.method === "GET" && target.authRequired === true && target.bodyMustStayReadOnly === true);

  const ready =
    snapshot.status === "protected_admin_token_readiness_review_ready" &&
    snapshot.previousEvidence.healthStatusCode === 200 &&
    snapshot.previousEvidence.streamFoundationMarkerAccepted === true &&
    snapshot.previousEvidence.adminRoutesProtectedWithoutToken === true &&
    allTargetsAreProtectedGet &&
    snapshot.blockingItems.length === 0 &&
    snapshot.safety.backendRestartPerformed === 0 &&
    snapshot.safety.runtimeHttpSmokePerformedByThisStage === 0 &&
    snapshot.safety.authenticatedHttpSmokePerformedByThisStage === 0 &&
    snapshot.safety.tokenValueStored === false &&
    snapshot.safety.rawTokenReturned === false &&
    snapshot.safety.databaseWritePerformed === 0 &&
    snapshot.safety.providerCallPerformed === 0 &&
    snapshot.safety.walletMutationPerformed === 0 &&
    snapshot.safety.moneyMovementPerformed === 0 &&
    snapshot.safety.fakeSuccessAllowed === false;

  return {
    version: snapshot.version,
    stage: snapshot.stage,
    ready,
    status: ready ? "protected_admin_token_readiness_review_ready" : "protected_admin_token_readiness_review_blocked",
    targetCount: snapshot.adminReadinessTargets.length,
    blockingItems: snapshot.blockingItems,
    nextRecommendedStage: snapshot.nextRecommendedStage,
  } as const;
}
