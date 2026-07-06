import { getStreamFoundationControlledTargetPatchReviewPackageSnapshot } from "./controlled-target-patch-review-package";

export const STREAM_141F_CONTROLLED_TARGET_PATCH_REVIEW_PACKAGE_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-141F",
  stage: "controlled_target_patch_review_package",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousStage: "BACKEND-STREAM-FOUNDATION-141E",
  forbidden: {
    appTsChange: false,
    serverTsChange: false,
    streamIndexChange: false,
    routeMountNow: false,
    runtimeHttpBy141F: false,
    runtimePostBy141F: false,
    backendRestart: false,
    databaseWrite: false,
    providerCall: false,
    walletMutation: false,
    paymentAuthorization: false,
    monthlyPayout: false,
    moneyMovement: false,
    fakeSuccess: false,
  },
  snapshot: getStreamFoundationControlledTargetPatchReviewPackageSnapshot(),
} as const;
