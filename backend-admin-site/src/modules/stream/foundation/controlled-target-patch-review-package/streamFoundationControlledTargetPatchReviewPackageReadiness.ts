import { getStreamFoundationControlledTargetPatchReviewPackageSnapshot } from "./streamFoundationControlledTargetPatchReviewPackage";

export function getStreamFoundationControlledTargetPatchReviewPackageReadiness() {
  const snapshot = getStreamFoundationControlledTargetPatchReviewPackageSnapshot();

  const targetsReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-141E" &&
    snapshot.futureSelectedTargets.includes("src/app.ts") &&
    snapshot.futureSelectedTargets.includes("src/modules/stream/index.ts") &&
    snapshot.forbiddenTargets.includes("src/server.ts") &&
    snapshot.reviewItems.length === 3;

  const noWritesNow =
    snapshot.reviewItems.every((item) => item.writeAllowedBy141F === false) &&
    snapshot.reviewItems.every((item) => item.routeMountAllowedBy141F === false) &&
    snapshot.reviewItems.every((item) => item.runtimePostAllowedBy141F === false) &&
    snapshot.reviewItems.every((item) => item.backendRestartAllowedBy141F === false) &&
    snapshot.totals.actualWritesNow === 0 &&
    snapshot.totals.routeMountNow === 0 &&
    snapshot.totals.runtimePostNow === 0 &&
    snapshot.totals.backendRestartNow === 0;

  const noProviderWalletMoney =
    snapshot.reviewItems.every((item) => item.databaseWriteAllowedBy141F === false) &&
    snapshot.reviewItems.every((item) => item.providerCallAllowedBy141F === false) &&
    snapshot.reviewItems.every((item) => item.walletMutationAllowedBy141F === false) &&
    snapshot.reviewItems.every((item) => item.moneyMovementAllowedBy141F === false) &&
    snapshot.reviewItems.every((item) => item.fakeSuccessAllowedBy141F === false) &&
    snapshot.totals.databaseWriteNow === 0 &&
    snapshot.totals.providerCallNow === 0 &&
    snapshot.totals.walletMutationNow === 0 &&
    snapshot.totals.moneyMovementNow === 0 &&
    snapshot.totals.fakeSuccessNow === 0;

  const safetyReady =
    snapshot.safety.sourceOnly === true &&
    snapshot.safety.appTsChange === false &&
    snapshot.safety.serverTsChange === false &&
    snapshot.safety.streamIndexChange === false &&
    snapshot.safety.routeMountNow === false &&
    snapshot.safety.runtimeHttpBy141F === false &&
    snapshot.safety.runtimePostBy141F === false &&
    snapshot.safety.backendRestart === false &&
    snapshot.safety.databaseWrite === false &&
    snapshot.safety.providerCall === false &&
    snapshot.safety.walletMutation === false &&
    snapshot.safety.moneyMovement === false &&
    snapshot.safety.fakeSuccess === false;

  const ready = targetsReady && noWritesNow && noProviderWalletMoney && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "controlled_target_patch_review_ready_no_write_no_mount" : "controlled_target_patch_review_blocked",
    futureSelectedTargets: snapshot.futureSelectedTargets,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-141G controlled source-only target patch approval package",
  } as const;
}
