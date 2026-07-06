import { getStreamFoundationRuntimeMountImplementationPlanningSourceOnlySnapshot } from "./streamFoundationRuntimeMountImplementationPlanningSourceOnly";

export function getStreamFoundationRuntimeMountImplementationPlanningSourceOnlyReadiness() {
  const snapshot = getStreamFoundationRuntimeMountImplementationPlanningSourceOnlySnapshot();

  const planReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-141U" &&
    snapshot.ownerApprovalAccepted === true &&
    snapshot.futureSourceChanges.length === 9 &&
    snapshot.futureSourceChanges.every((target) => target.sourceWriteAllowedNow === false) &&
    snapshot.futureSourceChanges.every((target) => target.appTsWriteAllowedNow === false) &&
    snapshot.futureSourceChanges.every((target) => target.serverTsWriteAllowedNow === false) &&
    snapshot.futureSourceChanges.every((target) => target.streamIndexWriteAllowedNow === false) &&
    snapshot.futureSourceChanges.every((target) => target.runtimeMountAllowedNow === false) &&
    snapshot.implementationPolicy.futureRuntimeMountMustRemainControlled === true &&
    snapshot.implementationPolicy.defaultRuntimeBehaviorMustRemainBlockedUntilLaterApproval === true;

  const blockedNow =
    snapshot.implementationPolicy.currentRoutesStayBlockedNow === true &&
    snapshot.implementationPolicy.expectedCurrentStatusCode === 423 &&
    snapshot.implementationPolicy.appTsWriteAllowedNow === false &&
    snapshot.implementationPolicy.serverTsWriteAllowedNow === false &&
    snapshot.implementationPolicy.streamIndexWriteAllowedNow === false &&
    snapshot.implementationPolicy.targetSourceWriteAllowedNow === false &&
    snapshot.implementationPolicy.runtimeMountAllowedNow === false &&
    snapshot.implementationPolicy.runtimeSuccessAllowedNow === false &&
    snapshot.implementationPolicy.fakeSuccessAllowedNow === false &&
    snapshot.implementationPolicy.databaseWriteAllowedNow === false &&
    snapshot.implementationPolicy.providerCallAllowedNow === false &&
    snapshot.implementationPolicy.walletMutationAllowedNow === false &&
    snapshot.implementationPolicy.moneyMovementAllowedNow === false &&
    snapshot.totals.targetSourceWriteAllowedNow === 0 &&
    snapshot.totals.runtimeMountAllowedNow === 0 &&
    snapshot.totals.runtimeSuccessAllowedNow === 0 &&
    snapshot.totals.databaseWriteAllowedNow === 0 &&
    snapshot.totals.providerCallAllowedNow === 0 &&
    snapshot.totals.walletMutationAllowedNow === 0 &&
    snapshot.totals.moneyMovementAllowedNow === 0 &&
    snapshot.totals.fakeSuccessAllowedNow === 0;

  const safetyReady =
    snapshot.safety.sourceOnly141V === true &&
    snapshot.safety.appTsChangeBy141V === false &&
    snapshot.safety.serverTsChangeBy141V === false &&
    snapshot.safety.streamIndexChangeBy141V === false &&
    snapshot.safety.schemaMigrationBy141V === false &&
    snapshot.safety.backendRestartBy141V === false &&
    snapshot.safety.runtimeHttpBy141V === false &&
    snapshot.safety.runtimePostBy141V === false &&
    snapshot.safety.databaseReadBy141V === false &&
    snapshot.safety.databaseWriteBy141V === false &&
    snapshot.safety.providerCallBy141V === false &&
    snapshot.safety.providerSecretReadBy141V === false &&
    snapshot.safety.walletMutationBy141V === false &&
    snapshot.safety.moneyMovementBy141V === false &&
    snapshot.safety.fakeSuccessBy141V === false;

  const ready = planReady && blockedNow && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "runtime_mount_implementation_plan_ready_routes_remain_blocked" : "runtime_mount_implementation_plan_blocked",
    futureSourceChanges: snapshot.futureSourceChanges.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-141W controlled runtime mount target detection and source patch review package",
  } as const;
}
