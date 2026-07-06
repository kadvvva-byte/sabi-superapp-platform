import { getStreamFoundationServerCopyFinalOwnerHandoffSnapshot } from "./streamFoundationServerCopyFinalOwnerHandoff";

export function getStreamFoundation137TServerCopyFinalOwnerHandoffReadiness() {
  const snapshot = getStreamFoundationServerCopyFinalOwnerHandoffSnapshot();

  return {
    stage: snapshot.stage,
    status: snapshot.status,
    items: snapshot.summary.totalItems,
    passed: snapshot.summary.passedItems,
    reviewRequired: snapshot.summary.reviewRequiredItems,
    blocked: snapshot.summary.blockedItems,
    requiredForManualServerCopyItems: snapshot.summary.requiredForManualServerCopyItems,
    readyForOwnerManualServerCopyReview: snapshot.summary.readyForOwnerManualServerCopyReview,
    readyForAutomaticServerCopyNow: snapshot.summary.readyForAutomaticServerCopyNow,
    readyForBackendRestartNow: snapshot.summary.readyForBackendRestartNow,
    readyForRouteMountNow: snapshot.summary.readyForRouteMountNow,
    readyForDatabaseBindingNow: snapshot.summary.readyForDatabaseBindingNow,
    readyForProviderBindingNow: snapshot.summary.readyForProviderBindingNow,
    readyForWalletLedgerLiveBindingNow: snapshot.summary.readyForWalletLedgerLiveBindingNow,
    readyForLiveMoneyMovementNow: snapshot.summary.readyForLiveMoneyMovementNow,
    ownerApprovalPhrase: snapshot.ownerApprovalPhrase,
    nextManualStep: snapshot.nextManualStep,
    safety: snapshot.safety,
    frozenRules: snapshot.frozenRules,
  } as const;
}
