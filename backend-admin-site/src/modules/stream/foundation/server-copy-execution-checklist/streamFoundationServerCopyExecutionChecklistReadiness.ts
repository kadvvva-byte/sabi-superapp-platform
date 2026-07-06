import { getStreamFoundationServerCopyExecutionChecklistSnapshot } from "./streamFoundationServerCopyExecutionChecklist";

export function getStreamFoundation137SServerCopyExecutionChecklistReadiness() {
  const snapshot = getStreamFoundationServerCopyExecutionChecklistSnapshot();
  return {
    stage: snapshot.stage,
    status: snapshot.status,
    items: snapshot.summary.totalItems,
    passed: snapshot.summary.passedItems,
    reviewRequired: snapshot.summary.reviewRequiredItems,
    blocked: snapshot.summary.blockedItems,
    requiredBeforeManualCopyItems: snapshot.summary.requiredBeforeManualCopyItems,
    readyForOwnerManualExecutionReview: snapshot.summary.readyForOwnerManualExecutionReview,
    readyForAutomaticServerCopyNow: snapshot.summary.readyForAutomaticServerCopyNow,
    readyForBackendRestartNow: snapshot.summary.readyForBackendRestartNow,
    readyForRouteMountNow: snapshot.summary.readyForRouteMountNow,
    readyForDatabaseBindingNow: snapshot.summary.readyForDatabaseBindingNow,
    readyForProviderBindingNow: snapshot.summary.readyForProviderBindingNow,
    readyForLiveMoneyMovementNow: snapshot.summary.readyForLiveMoneyMovementNow,
    ownerApprovalPhrase: snapshot.ownerApprovalPhrase,
    safety: snapshot.safety,
    manualExecutionBoundary: snapshot.manualExecutionBoundary,
  } as const;
}
