import { getPlayReady8Readiness } from "./play-ready-8-privacy-account-deletion-patch-review";

export const PLAY_READY_8_PRIVACY_ACCOUNT_DELETION_PATCH_REVIEW_STAGING_MANIFEST = {
  version: "PLAY-READY-8",
  stage: "controlled_privacy_policy_link_and_account_deletion_target_patch_review_source_only",
  sourceOnly: true,
  changedScope: "src/modules/play-ready/foundation/play-ready-8-privacy-account-deletion-patch-review/**",
  targetReviewCovers: [
    "privacy policy URL wiring",
    "in-app account deletion path",
    "web account deletion URL placeholder/config",
    "retention exception copy",
    "reviewer evidence references",
  ],
  targetFilesModifiedNow: false,
  backendRestartNow: false,
  runtimeDbWriteNow: false,
  providerCallsNow: false,
  walletMutationNow: false,
  paymentAuthorizationNow: false,
  moneyMovementNow: false,
  noFakeSuccess: true,
  nextStage: "PLAY-READY-9",
  readiness: getPlayReady8Readiness(),
} as const;
