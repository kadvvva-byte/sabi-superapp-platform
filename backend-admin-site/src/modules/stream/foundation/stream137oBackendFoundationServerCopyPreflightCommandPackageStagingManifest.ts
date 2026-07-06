import { getStreamFoundationServerCopyPreflightSnapshot } from "./server-copy-preflight";

export const STREAM_FOUNDATION_137O_SERVER_COPY_PREFLIGHT_COMMAND_PACKAGE_VERSION =
  "BACKEND-STREAM-FOUNDATION-137O" as const;

export function getStreamFoundation137OServerCopyPreflightCommandPackageStagingManifest() {
  const snapshot = getStreamFoundationServerCopyPreflightSnapshot();
  return {
    version: STREAM_FOUNDATION_137O_SERVER_COPY_PREFLIGHT_COMMAND_PACKAGE_VERSION,
    stage: snapshot.stage,
    status: snapshot.status,
    localStagingOnly: true,
    patchZipOnly: true,
    commandPackageOnly: true,
    performsServerCopyNow: snapshot.safety.performsServerCopyNow,
    restartsBackendNow: snapshot.safety.restartsBackendNow,
    mountsRoutesNow: snapshot.safety.mountsRoutesNow,
    movesMoneyNow: snapshot.safety.movesMoneyNow,
    readyForManualServerCopyPreflight: snapshot.summary.readyForManualServerCopyPreflight,
    readyForAutomaticServerCopyNow: snapshot.summary.readyForAutomaticServerCopyNow,
    readyForRouteMountNow: snapshot.summary.readyForRouteMountNow,
    readyForLiveMoneyNow: snapshot.summary.readyForLiveMoneyNow,
    summary: snapshot.summary,
    lockedRules: snapshot.lockedRules,
    safety: snapshot.safety,
  } as const;
}
