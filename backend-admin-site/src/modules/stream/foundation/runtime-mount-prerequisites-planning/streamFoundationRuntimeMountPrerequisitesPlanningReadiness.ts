import { getStreamFoundationRuntimeMountPrerequisitesPlanningSnapshot } from "./streamFoundationRuntimeMountPrerequisitesPlanning";

export function getStreamFoundationRuntimeMountPrerequisitesPlanningReadiness() {
  const snapshot = getStreamFoundationRuntimeMountPrerequisitesPlanningSnapshot();

  const prerequisitesPlanned =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-141L" &&
    snapshot.prerequisites.length === 7 &&
    snapshot.prerequisites.every((item) => item.requiredBeforeRuntimeMount === true) &&
    snapshot.prerequisites.every((item) => item.runtimeSuccessAllowedNow === false) &&
    snapshot.currentRouteFreeze.startStopHeartbeatRoutesStayBlocked === true &&
    snapshot.currentRouteFreeze.expectedCurrentStatusCode === 423;

  const blockedNow =
    snapshot.totals.readyForRuntimeMountNow === 0 &&
    snapshot.totals.runtimeSuccessAllowedNow === 0 &&
    snapshot.totals.databaseWriteAllowedNow === 0 &&
    snapshot.totals.providerCallAllowedNow === 0 &&
    snapshot.totals.walletMutationAllowedNow === 0 &&
    snapshot.totals.moneyMovementAllowedNow === 0 &&
    snapshot.totals.fakeSuccessAllowedNow === 0 &&
    snapshot.currentRouteFreeze.runtimeSuccessAllowedNow === false &&
    snapshot.currentRouteFreeze.fakeSuccessAllowedNow === false &&
    snapshot.currentRouteFreeze.providerLiveAllowedNow === false &&
    snapshot.currentRouteFreeze.walletMoneyAllowedNow === false;

  const safetyReady =
    snapshot.safety.sourceOnly141M === true &&
    snapshot.safety.appTsChangeBy141M === false &&
    snapshot.safety.serverTsChangeBy141M === false &&
    snapshot.safety.streamIndexChangeBy141M === false &&
    snapshot.safety.backendRestartBy141M === false &&
    snapshot.safety.runtimeHttpBy141M === false &&
    snapshot.safety.runtimePostBy141M === false &&
    snapshot.safety.databaseWriteBy141M === false &&
    snapshot.safety.providerCallBy141M === false &&
    snapshot.safety.walletMutationBy141M === false &&
    snapshot.safety.moneyMovementBy141M === false &&
    snapshot.safety.fakeSuccessBy141M === false;

  const ready = prerequisitesPlanned && blockedNow && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "runtime_mount_prerequisites_planning_ready_routes_remain_blocked" : "runtime_mount_prerequisites_planning_blocked",
    prerequisites: snapshot.prerequisites.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-141N identity/session gate source-only contract planning",
  } as const;
}
