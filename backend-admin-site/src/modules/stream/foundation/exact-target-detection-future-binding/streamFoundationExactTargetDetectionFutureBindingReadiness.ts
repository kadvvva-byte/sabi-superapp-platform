import { getStreamFoundationExactTargetDetectionFutureBindingSnapshot } from "./streamFoundationExactTargetDetectionFutureBinding";

export function getStreamFoundationExactTargetDetectionFutureBindingReadiness() {
  const snapshot = getStreamFoundationExactTargetDetectionFutureBindingSnapshot();

  const detectionReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-141D" &&
    snapshot.targetDetectionItems.length === 3 &&
    snapshot.selectedFuturePatchTargets.includes("src/app.ts") &&
    snapshot.selectedFuturePatchTargets.includes("src/modules/stream/index.ts") &&
    snapshot.forbiddenRuntimeTargets.includes("src/server.ts");

  const noWritesNow =
    snapshot.targetDetectionItems.every((item) => item.writeAllowedNow === false) &&
    snapshot.targetDetectionItems.every((item) => item.mountAllowedNow === false) &&
    snapshot.targetDetectionItems.every((item) => item.runtimePostAllowedNow === false) &&
    snapshot.targetDetectionItems.every((item) => item.backendRestartAllowedNow === false) &&
    snapshot.totals.actualWritesNow === 0 &&
    snapshot.totals.routeMountNow === 0 &&
    snapshot.totals.runtimePostNow === 0 &&
    snapshot.totals.backendRestartNow === 0;

  const noMoneyOrProvider =
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
    snapshot.safety.runtimeHttpBy141E === false &&
    snapshot.safety.runtimePostBy141E === false &&
    snapshot.safety.backendRestart === false &&
    snapshot.safety.databaseWrite === false &&
    snapshot.safety.providerCall === false &&
    snapshot.safety.walletMutation === false &&
    snapshot.safety.moneyMovement === false &&
    snapshot.safety.fakeSuccess === false;

  const ready = detectionReady && noWritesNow && noMoneyOrProvider && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "exact_target_detection_ready_no_write_no_mount" : "exact_target_detection_blocked",
    selectedFuturePatchTargets: snapshot.selectedFuturePatchTargets,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-141F controlled target patch review package",
  } as const;
}
