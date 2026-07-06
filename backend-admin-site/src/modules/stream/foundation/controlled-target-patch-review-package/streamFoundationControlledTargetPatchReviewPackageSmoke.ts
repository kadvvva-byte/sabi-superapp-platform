import { getStreamFoundationControlledTargetPatchReviewPackageSnapshot } from "./streamFoundationControlledTargetPatchReviewPackage";
import { getStreamFoundationControlledTargetPatchReviewPackageReadiness } from "./streamFoundationControlledTargetPatchReviewPackageReadiness";

export function runStreamFoundationControlledTargetPatchReviewPackageSmoke() {
  const snapshot = getStreamFoundationControlledTargetPatchReviewPackageSnapshot();
  const readiness = getStreamFoundationControlledTargetPatchReviewPackageReadiness();

  const assertions = [
    {
      id: "future_targets_reviewed",
      passed:
        snapshot.futureSelectedTargets.includes("src/app.ts") &&
        snapshot.futureSelectedTargets.includes("src/modules/stream/index.ts") &&
        snapshot.forbiddenTargets.includes("src/server.ts"),
      evidence: JSON.stringify({ selected: snapshot.futureSelectedTargets, forbidden: snapshot.forbiddenTargets }),
    },
    {
      id: "no_target_write_or_mount",
      passed:
        snapshot.totals.actualWritesNow === 0 &&
        snapshot.totals.routeMountNow === 0 &&
        snapshot.totals.runtimePostNow === 0 &&
        snapshot.totals.backendRestartNow === 0,
      evidence: JSON.stringify(snapshot.totals),
    },
    {
      id: "no_db_provider_wallet_money",
      passed:
        snapshot.totals.databaseWriteNow === 0 &&
        snapshot.totals.providerCallNow === 0 &&
        snapshot.totals.walletMutationNow === 0 &&
        snapshot.totals.moneyMovementNow === 0 &&
        snapshot.totals.fakeSuccessNow === 0,
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
    stage: "controlled_target_patch_review_package_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "controlled_target_patch_review_smoke_passed" : "controlled_target_patch_review_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
