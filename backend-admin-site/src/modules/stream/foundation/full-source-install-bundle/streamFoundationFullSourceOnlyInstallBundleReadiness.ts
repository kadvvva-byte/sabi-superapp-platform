import { getStreamFoundationFullSourceOnlyInstallBundleSnapshot } from "./streamFoundationFullSourceOnlyInstallBundle";

export function getStreamFoundation137UFullSourceOnlyInstallBundleReadiness() {
  const snapshot = getStreamFoundationFullSourceOnlyInstallBundleSnapshot();

  return {
    stage: snapshot.stage,
    status: snapshot.status,
    totalItems: snapshot.summary.totalItems,
    passedItems: snapshot.summary.passedItems,
    reviewRequiredItems: snapshot.summary.reviewRequiredItems,
    blockedItems: snapshot.summary.blockedItems,
    coveragePercent: snapshot.summary.coveragePercent,
    readyForOwnerReview: snapshot.summary.readyForOwnerReview,
    readyForAutomaticServerCopyNow: snapshot.summary.readyForAutomaticServerCopyNow,
    readyForBackendRestartNow: snapshot.summary.readyForBackendRestartNow,
    readyForRouteMountNow: snapshot.summary.readyForRouteMountNow,
    readyForDatabaseBindingNow: snapshot.summary.readyForDatabaseBindingNow,
    readyForProviderBindingNow: snapshot.summary.readyForProviderBindingNow,
    readyForWalletLedgerLiveBindingNow: snapshot.summary.readyForWalletLedgerLiveBindingNow,
    readyForLiveMoneyMovementNow: snapshot.summary.readyForLiveMoneyMovementNow,
    includedSourceScopes: snapshot.includedSourceScopes,
    excludedSourceScopes: snapshot.excludedSourceScopes,
    ownerApprovalPhrase: snapshot.ownerApprovalPhrase,
    nextManualStep: snapshot.nextManualStep,
    safety: snapshot.safety,
    frozenRules: snapshot.frozenRules,
  } as const;
}
