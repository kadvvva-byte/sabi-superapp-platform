import { getStreamFoundationServerCopyApprovalSnapshot } from "./streamFoundationServerCopyApprovalPackage";

export function getStreamFoundation137QServerCopyApprovalReadiness() {
  const snapshot = getStreamFoundationServerCopyApprovalSnapshot();
  return {
    stage: snapshot.stage,
    status: snapshot.status,
    checks: snapshot.summary.totalChecks,
    passed: snapshot.summary.passedChecks,
    reviewRequired: snapshot.summary.reviewRequiredChecks,
    blocked: snapshot.summary.blockedChecks,
    ownerDecisionRequiredChecks: snapshot.summary.ownerDecisionRequiredChecks,
    readyForSourceOnlyServerCopyApproval: snapshot.summary.readyForSourceOnlyServerCopyApproval,
    readyForAutomaticServerCopyNow: snapshot.summary.readyForAutomaticServerCopyNow,
    readyForRouteMountNow: snapshot.summary.readyForRouteMountNow,
    readyForDatabaseBindingNow: snapshot.summary.readyForDatabaseBindingNow,
    readyForProviderBindingNow: snapshot.summary.readyForProviderBindingNow,
    readyForLiveMoneyMovementNow: snapshot.summary.readyForLiveMoneyMovementNow,
    ownerApprovalPhrase: snapshot.ownerApprovalPhrase,
    allowedCopyScope: snapshot.allowedCopyScope,
    forbiddenCopyScope: snapshot.forbiddenCopyScope,
    safety: snapshot.safety,
    lockedRules: snapshot.lockedRules,
  } as const;
}
