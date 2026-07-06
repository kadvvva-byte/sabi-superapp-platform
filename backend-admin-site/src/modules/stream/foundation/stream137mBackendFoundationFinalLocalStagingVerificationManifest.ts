import { getStreamFoundationFinalLocalStagingVerificationSnapshot } from "./final-verification";

export const STREAM_FOUNDATION_137M_FINAL_LOCAL_STAGING_VERIFICATION_MANIFEST_VERSION =
  "BACKEND-STREAM-FOUNDATION-137M" as const;

export function getStreamFoundation137MFinalLocalStagingVerificationManifest() {
  const verification = getStreamFoundationFinalLocalStagingVerificationSnapshot();
  return {
    version: STREAM_FOUNDATION_137M_FINAL_LOCAL_STAGING_VERIFICATION_MANIFEST_VERSION,
    stage: verification.stage,
    status: verification.status,
    localStagingOnly: true,
    patchZipOnly: true,
    readyForServerCopyReview: verification.summary.readyForServerCopyReview,
    readyForRouteMountNow: verification.summary.readyForRouteMountNow,
    readyForLiveMoneyNow: verification.summary.readyForLiveMoneyNow,
    summary: verification.summary,
    finalRules: verification.finalRules,
    safety: verification.safety,
  } as const;
}
