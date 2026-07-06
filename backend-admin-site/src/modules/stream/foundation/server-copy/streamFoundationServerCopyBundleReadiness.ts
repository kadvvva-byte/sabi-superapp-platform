import { getStreamFoundationServerCopyBundleSnapshot } from "./streamFoundationServerCopyBundleManifest";

export function getStreamFoundationServerCopyBundleReadiness() {
  const snapshot = getStreamFoundationServerCopyBundleSnapshot();
  return {
    stage: snapshot.stage,
    status: snapshot.status,
    readyForManualServerCopyReview: snapshot.summary.readyForManualServerCopyReview,
    readyForAutomaticServerCopyNow: snapshot.summary.readyForAutomaticServerCopyNow,
    readyForRouteMountNow: snapshot.summary.readyForRouteMountNow,
    readyForLiveMoneyNow: snapshot.summary.readyForLiveMoneyNow,
    totalItems: snapshot.summary.totalItems,
    reviewRequiredItems: snapshot.summary.reviewRequiredItems,
    blockedItems: snapshot.summary.blockedItems,
    safety: snapshot.safety,
    rules: snapshot.serverCopyRules,
  } as const;
}
