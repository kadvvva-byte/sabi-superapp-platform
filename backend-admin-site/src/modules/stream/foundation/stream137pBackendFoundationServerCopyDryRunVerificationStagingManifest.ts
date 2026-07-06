import { getStreamFoundationServerCopyDryRunVerificationSnapshot } from "./server-copy-dry-run";

export const STREAM_FOUNDATION_137P_SERVER_COPY_DRY_RUN_VERIFICATION_VERSION =
  "BACKEND-STREAM-FOUNDATION-137P" as const;

export function getStreamFoundation137PServerCopyDryRunVerificationManifest() {
  const snapshot = getStreamFoundationServerCopyDryRunVerificationSnapshot();
  return {
    version: STREAM_FOUNDATION_137P_SERVER_COPY_DRY_RUN_VERIFICATION_VERSION,
    stage: snapshot.stage,
    status: snapshot.status,
    dependsOn: snapshot.dependsOn,
    readyForOwnerServerCopyReview: snapshot.summary.readyForOwnerServerCopyReview,
    readyForAutomaticServerCopyNow: snapshot.summary.readyForAutomaticServerCopyNow,
    readyForRouteMountNow: snapshot.summary.readyForRouteMountNow,
    readyForLiveMoneyMovementNow: snapshot.summary.readyForLiveMoneyMovementNow,
    summary: snapshot.summary,
    lockedRules: snapshot.lockedRules,
    safety: snapshot.safety,
    nextStage: "BACKEND-STREAM-FOUNDATION-137Q server-copy source-only approval package",
  } as const;
}
