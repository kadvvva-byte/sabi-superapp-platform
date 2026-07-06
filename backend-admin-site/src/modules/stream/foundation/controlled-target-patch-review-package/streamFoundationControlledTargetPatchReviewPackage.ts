import {
  STREAM_FOUNDATION_141F_CONTROLLED_TARGET_PATCH_REVIEW_VERSION,
  type StreamFoundation141FTargetFile,
  type StreamFoundation141FTargetPatchReviewItem,
  type StreamFoundation141FTargetPatchReviewSnapshot,
} from "./streamFoundationControlledTargetPatchReviewPackageContracts";

function reviewItem(
  targetFile: StreamFoundation141FTargetFile,
  exactTargetSelected: boolean,
  reviewStatus: StreamFoundation141FTargetPatchReviewItem["reviewStatus"],
  futurePatchPurpose: string,
): StreamFoundation141FTargetPatchReviewItem {
  return {
    targetFile,
    reviewStatus,
    futurePatchPurpose,
    exactTargetSelected,
    writeAllowedBy141F: false,
    routeMountAllowedBy141F: false,
    runtimePostAllowedBy141F: false,
    backendRestartAllowedBy141F: false,
    databaseWriteAllowedBy141F: false,
    providerCallAllowedBy141F: false,
    walletMutationAllowedBy141F: false,
    moneyMovementAllowedBy141F: false,
    fakeSuccessAllowedBy141F: false,
    reviewChecks: [
      "No write in 141F.",
      "Future patch must be separate and explicitly approved.",
      "Future handler must keep controlled blocked envelope until runtime approval.",
      "No provider, Wallet, payment, payout, money movement, or fake success.",
    ],
  };
}

const REVIEW_ITEMS: readonly StreamFoundation141FTargetPatchReviewItem[] = [
  reviewItem(
    "src/app.ts",
    true,
    "selected_for_future_patch",
    "Future route binding location review only; 141F does not change app source.",
  ),
  reviewItem(
    "src/modules/stream/index.ts",
    true,
    "selected_for_future_patch",
    "Future Stream export location review only; 141F does not change module index.",
  ),
  reviewItem(
    "src/server.ts",
    false,
    "forbidden_for_future_patch",
    "Server runtime entry remains forbidden for this controlled binding path.",
  ),
];

export function getStreamFoundationControlledTargetPatchReviewPackageSnapshot(): StreamFoundation141FTargetPatchReviewSnapshot {
  return {
    version: STREAM_FOUNDATION_141F_CONTROLLED_TARGET_PATCH_REVIEW_VERSION,
    stage: "controlled_target_patch_review_package",
    status: "target_patch_review_ready_no_write_no_mount",
    previousStage: "BACKEND-STREAM-FOUNDATION-141E",
    futureSelectedTargets: ["src/app.ts", "src/modules/stream/index.ts"],
    forbiddenTargets: ["src/server.ts"],
    reviewItems: REVIEW_ITEMS,
    totals: {
      reviewItems: 3,
      futureSelectedTargets: 2,
      forbiddenTargets: 1,
      actualWritesNow: 0,
      routeMountNow: 0,
      runtimePostNow: 0,
      backendRestartNow: 0,
      databaseWriteNow: 0,
      providerCallNow: 0,
      walletMutationNow: 0,
      moneyMovementNow: 0,
      fakeSuccessNow: 0,
    },
    safety: {
      sourceOnly: true,
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
  };
}
