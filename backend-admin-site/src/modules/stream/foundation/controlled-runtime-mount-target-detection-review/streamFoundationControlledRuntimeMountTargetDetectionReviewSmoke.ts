import { getStreamFoundationControlledRuntimeMountTargetDetectionReviewSnapshot } from "./streamFoundationControlledRuntimeMountTargetDetectionReview";
import { getStreamFoundationControlledRuntimeMountTargetDetectionReviewReadiness } from "./streamFoundationControlledRuntimeMountTargetDetectionReviewReadiness";

export function runStreamFoundationControlledRuntimeMountTargetDetectionReviewSmoke() {
  const snapshot = getStreamFoundationControlledRuntimeMountTargetDetectionReviewSnapshot();
  const readiness = getStreamFoundationControlledRuntimeMountTargetDetectionReviewReadiness();

  const assertions = [
    {
      id: "target_detection_items_reviewed",
      passed: snapshot.targetDetectionItems.length === 12 && snapshot.totals.targetDetectionItems === 12,
      evidence: JSON.stringify(snapshot.targetDetectionItems.map((item) => item.id)),
    },
    {
      id: "forbidden_targets_blocked_now",
      passed:
        snapshot.patchReviewPolicy.appTsWriteAllowedNow === false &&
        snapshot.patchReviewPolicy.serverTsWriteAllowedNow === false &&
        snapshot.patchReviewPolicy.streamIndexWriteAllowedNow === false &&
        snapshot.patchReviewPolicy.prismaSchemaWriteAllowedNow === false,
      evidence: JSON.stringify(snapshot.patchReviewPolicy),
    },
    {
      id: "no_target_write_or_runtime_mount",
      passed:
        snapshot.targetDetectionItems.every((item) => item.mayBeWrittenBy141W === false) &&
        snapshot.targetDetectionItems.every((item) => item.mayBeRuntimeMountedBy141W === false) &&
        snapshot.totals.targetWriteAllowedNow === 0 &&
        snapshot.totals.runtimeMountAllowedNow === 0,
      evidence: JSON.stringify(snapshot.totals),
    },
    {
      id: "routes_remain_blocked_423",
      passed:
        snapshot.patchReviewPolicy.routesStayBlockedNow === true &&
        snapshot.patchReviewPolicy.expectedCurrentStatusCode === 423 &&
        snapshot.patchReviewPolicy.runtimeSuccessAllowedNow === false &&
        snapshot.totals.fakeSuccessAllowedNow === 0,
      evidence: JSON.stringify(snapshot.patchReviewPolicy),
    },
    {
      id: "no_db_provider_wallet_money",
      passed:
        snapshot.totals.databaseWriteAllowedNow === 0 &&
        snapshot.totals.providerCallAllowedNow === 0 &&
        snapshot.totals.walletMutationAllowedNow === 0 &&
        snapshot.totals.moneyMovementAllowedNow === 0,
      evidence: JSON.stringify(snapshot.totals),
    },
    {
      id: "readiness_true",
      passed: readiness.ready === true,
      evidence: readiness.status,
    },
  ];

  const failedAssertions = assertions.filter((assertion) => !assertion.passed);

  return {
    version: snapshot.version,
    stage: "controlled_runtime_mount_target_detection_and_source_patch_review_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "controlled_runtime_mount_target_review_smoke_passed" : "controlled_runtime_mount_target_review_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
