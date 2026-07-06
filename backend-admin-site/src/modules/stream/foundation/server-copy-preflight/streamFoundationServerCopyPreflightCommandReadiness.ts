import { getStreamFoundationServerCopyPreflightSnapshot } from "./streamFoundationServerCopyPreflightCommandPackage";

export function getStreamFoundationServerCopyPreflightReadiness() {
  const snapshot = getStreamFoundationServerCopyPreflightSnapshot();
  return {
    stage: snapshot.stage,
    status: snapshot.status,
    totalCommands: snapshot.summary.totalCommands,
    checklistItems: snapshot.summary.checklistItems,
    checklistReviewRequired: snapshot.summary.checklistReviewRequired,
    checklistBlocked: snapshot.summary.checklistBlocked,
    readyForManualServerCopyPreflight: snapshot.summary.readyForManualServerCopyPreflight,
    readyForAutomaticServerCopyNow: snapshot.summary.readyForAutomaticServerCopyNow,
    readyForRouteMountNow: snapshot.summary.readyForRouteMountNow,
    readyForLiveMoneyNow: snapshot.summary.readyForLiveMoneyNow,
    safety: snapshot.safety,
    lockedRules: snapshot.lockedRules,
  } as const;
}
