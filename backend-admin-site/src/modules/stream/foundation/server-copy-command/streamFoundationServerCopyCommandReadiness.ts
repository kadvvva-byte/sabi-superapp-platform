import { getStreamFoundationServerCopyCommandDraftSnapshot } from "./streamFoundationServerCopyCommandDraft";

export function getStreamFoundation137RServerCopyCommandReadiness() {
  const snapshot = getStreamFoundationServerCopyCommandDraftSnapshot();
  return {
    stage: snapshot.stage,
    status: snapshot.status,
    commands: snapshot.summary.totalCommands,
    passed: snapshot.summary.passedCommands,
    reviewRequired: snapshot.summary.reviewRequiredCommands,
    blocked: snapshot.summary.blockedCommands,
    ownerApprovalRequiredCommands: snapshot.summary.ownerApprovalRequiredCommands,
    readyForManualSourceCopyCommandReview: snapshot.summary.readyForManualSourceCopyCommandReview,
    readyForAutomaticServerCopyNow: snapshot.summary.readyForAutomaticServerCopyNow,
    readyForRouteMountNow: snapshot.summary.readyForRouteMountNow,
    readyForDatabaseBindingNow: snapshot.summary.readyForDatabaseBindingNow,
    readyForProviderBindingNow: snapshot.summary.readyForProviderBindingNow,
    readyForLiveMoneyMovementNow: snapshot.summary.readyForLiveMoneyMovementNow,
    ownerApprovalPhrase: snapshot.ownerApprovalPhrase,
    safety: snapshot.safety,
    lockedRules: snapshot.lockedRules,
  } as const;
}
