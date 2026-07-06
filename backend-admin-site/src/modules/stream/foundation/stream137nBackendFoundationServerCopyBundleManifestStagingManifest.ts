import { getStreamFoundationServerCopyBundleSnapshot } from "./server-copy";

export const STREAM_FOUNDATION_137N_SERVER_COPY_BUNDLE_MANIFEST_VERSION =
  "BACKEND-STREAM-FOUNDATION-137N" as const;

export function getStreamFoundation137NServerCopyBundleManifest() {
  const bundle = getStreamFoundationServerCopyBundleSnapshot();
  return {
    version: STREAM_FOUNDATION_137N_SERVER_COPY_BUNDLE_MANIFEST_VERSION,
    stage: bundle.stage,
    status: bundle.status,
    localStagingOnly: true,
    patchZipOnly: true,
    serverCopyManifestOnly: true,
    performsServerCopyNow: bundle.safety.performsServerCopyNow,
    readyForManualServerCopyReview: bundle.summary.readyForManualServerCopyReview,
    readyForAutomaticServerCopyNow: bundle.summary.readyForAutomaticServerCopyNow,
    readyForRouteMountNow: bundle.summary.readyForRouteMountNow,
    readyForLiveMoneyNow: bundle.summary.readyForLiveMoneyNow,
    summary: bundle.summary,
    installRoot: bundle.installRoot,
    serverCopyRules: bundle.serverCopyRules,
    safety: bundle.safety,
  } as const;
}
