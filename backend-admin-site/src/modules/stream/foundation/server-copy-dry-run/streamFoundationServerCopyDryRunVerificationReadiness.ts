import { getStreamFoundationServerCopyDryRunVerificationSnapshot } from "./streamFoundationServerCopyDryRunVerificationPackage";

export function getStreamFoundation137PServerCopyDryRunReadiness() {
  const snapshot = getStreamFoundationServerCopyDryRunVerificationSnapshot();
  return {
    stage: snapshot.stage,
    status: snapshot.status,
    checks: snapshot.summary.totalChecks,
    passed: snapshot.summary.passedChecks,
    reviewRequired: snapshot.summary.reviewRequiredChecks,
    blocked: snapshot.summary.blockedChecks,
    readyForOwnerServerCopyReview: snapshot.summary.readyForOwnerServerCopyReview,
    readyForAutomaticServerCopyNow: snapshot.summary.readyForAutomaticServerCopyNow,
    readyForRouteMountNow: snapshot.summary.readyForRouteMountNow,
    readyForLiveMoneyMovementNow: snapshot.summary.readyForLiveMoneyMovementNow,
    safety: snapshot.safety,
    lockedRules: snapshot.lockedRules,
  } as const;
}
