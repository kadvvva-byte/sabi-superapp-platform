import { getStreamFoundationControlledRuntimeMountTargetDetectionReviewSnapshot } from "./streamFoundationControlledRuntimeMountTargetDetectionReview";

export function getStreamFoundationControlledRuntimeMountTargetDetectionReviewReadiness() {
  const snapshot = getStreamFoundationControlledRuntimeMountTargetDetectionReviewSnapshot();

  const reviewReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-141V" &&
    snapshot.targetDetectionItems.length === 12 &&
    snapshot.targetDetectionItems.every((item) => item.mayBeWrittenBy141W === false) &&
    snapshot.targetDetectionItems.every((item) => item.mayBeRuntimeMountedBy141W === false) &&
    snapshot.targetDetectionItems.every((item) => item.mayEnableSuccessBy141W === false) &&
    snapshot.patchReviewPolicy.futurePatchMayOnlyUseFoundationFolders === true &&
    snapshot.patchReviewPolicy.defaultBlockedHandlerMustRemain === true;

  const blockedNow =
    snapshot.patchReviewPolicy.routesStayBlockedNow === true &&
    snapshot.patchReviewPolicy.expectedCurrentStatusCode === 423 &&
    snapshot.patchReviewPolicy.appTsWriteAllowedNow === false &&
    snapshot.patchReviewPolicy.serverTsWriteAllowedNow === false &&
    snapshot.patchReviewPolicy.streamIndexWriteAllowedNow === false &&
    snapshot.patchReviewPolicy.prismaSchemaWriteAllowedNow === false &&
    snapshot.patchReviewPolicy.runtimeMountAllowedNow === false &&
    snapshot.patchReviewPolicy.runtimeSuccessAllowedNow === false &&
    snapshot.totals.targetWriteAllowedNow === 0 &&
    snapshot.totals.runtimeMountAllowedNow === 0 &&
    snapshot.totals.runtimeSuccessAllowedNow === 0 &&
    snapshot.totals.databaseWriteAllowedNow === 0 &&
    snapshot.totals.providerCallAllowedNow === 0 &&
    snapshot.totals.walletMutationAllowedNow === 0 &&
    snapshot.totals.moneyMovementAllowedNow === 0 &&
    snapshot.totals.fakeSuccessAllowedNow === 0;

  const safetyReady =
    snapshot.safety.sourceOnly141W === true &&
    snapshot.safety.appTsChangeBy141W === false &&
    snapshot.safety.serverTsChangeBy141W === false &&
    snapshot.safety.streamIndexChangeBy141W === false &&
    snapshot.safety.schemaMigrationBy141W === false &&
    snapshot.safety.backendRestartBy141W === false &&
    snapshot.safety.runtimeHttpBy141W === false &&
    snapshot.safety.runtimePostBy141W === false &&
    snapshot.safety.databaseReadBy141W === false &&
    snapshot.safety.databaseWriteBy141W === false &&
    snapshot.safety.providerCallBy141W === false &&
    snapshot.safety.providerSecretReadBy141W === false &&
    snapshot.safety.walletMutationBy141W === false &&
    snapshot.safety.moneyMovementBy141W === false &&
    snapshot.safety.fakeSuccessBy141W === false;

  const ready = reviewReady && blockedNow && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "controlled_runtime_mount_target_review_ready_no_target_write" : "controlled_runtime_mount_target_review_blocked",
    targetDetectionItems: snapshot.targetDetectionItems.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-141X controlled source-only runtime gate evaluator draft package",
  } as const;
}
