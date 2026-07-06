import { getPlayReady10Readiness } from "./play-ready-10-ugc-report-block-patch-review";

export const PLAY_READY_10_UGC_REPORT_BLOCK_PATCH_REVIEW_STAGING_MANIFEST = {
  version: "PLAY-READY-10",
  stage: "controlled_ugc_report_and_block_gate_target_patch_review_source_only",
  sourceOnly: true,
  changedScope: "src/modules/play-ready/foundation/play-ready-10-ugc-report-block-patch-review/**",
  targetReviewCovers: [
    "Stream live/shorts report content",
    "report user",
    "block user",
    "comment/report moderation",
    "18+ gate evidence",
    "admin moderation queue/reviewer evidence",
    "provider_not_configured states",
    "no fake moderation success",
  ],
  targetFilesModifiedNow: false,
  backendRestartNow: false,
  runtimeDbWriteNow: false,
  providerCallsNow: false,
  walletMutationNow: false,
  paymentAuthorizationNow: false,
  moneyMovementNow: false,
  noFakeSuccess: true,
  noFakeModerationSuccess: true,
  nextStage: "PLAY-READY-11",
  readiness: getPlayReady10Readiness(),
} as const;
