import { getStreamFoundationExactTargetDetectionFutureBindingSnapshot } from "./streamFoundationExactTargetDetectionFutureBinding";
import { getStreamFoundationExactTargetDetectionFutureBindingReadiness } from "./streamFoundationExactTargetDetectionFutureBindingReadiness";

export function runStreamFoundationExactTargetDetectionFutureBindingSmoke() {
  const snapshot = getStreamFoundationExactTargetDetectionFutureBindingSnapshot();
  const readiness = getStreamFoundationExactTargetDetectionFutureBindingReadiness();

  const assertions = [
    {
      id: "future_targets_detected",
      passed:
        snapshot.selectedFuturePatchTargets.includes("src/app.ts") &&
        snapshot.selectedFuturePatchTargets.includes("src/modules/stream/index.ts") &&
        snapshot.forbiddenRuntimeTargets.includes("src/server.ts"),
      evidence: JSON.stringify({ selected: snapshot.selectedFuturePatchTargets, forbidden: snapshot.forbiddenRuntimeTargets }),
    },
    {
      id: "no_actual_target_write_or_mount",
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
    stage: "exact_target_detection_for_future_binding_patch_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "exact_target_detection_smoke_passed" : "exact_target_detection_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
