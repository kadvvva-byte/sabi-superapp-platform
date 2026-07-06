import { getStreamFoundationRuntimeMountPrerequisitesPlanningSnapshot } from "./streamFoundationRuntimeMountPrerequisitesPlanning";
import { getStreamFoundationRuntimeMountPrerequisitesPlanningReadiness } from "./streamFoundationRuntimeMountPrerequisitesPlanningReadiness";

export function runStreamFoundationRuntimeMountPrerequisitesPlanningSmoke() {
  const snapshot = getStreamFoundationRuntimeMountPrerequisitesPlanningSnapshot();
  const readiness = getStreamFoundationRuntimeMountPrerequisitesPlanningReadiness();

  const assertions = [
    {
      id: "seven_prerequisites_planned",
      passed: snapshot.prerequisites.length === 7 && snapshot.totals.prerequisites === 7,
      evidence: JSON.stringify(snapshot.prerequisites.map((item) => item.id)),
    },
    {
      id: "routes_remain_blocked_423",
      passed:
        snapshot.currentRouteFreeze.startStopHeartbeatRoutesStayBlocked === true &&
        snapshot.currentRouteFreeze.expectedCurrentStatusCode === 423 &&
        snapshot.currentRouteFreeze.runtimeSuccessAllowedNow === false &&
        snapshot.currentRouteFreeze.fakeSuccessAllowedNow === false,
      evidence: JSON.stringify(snapshot.currentRouteFreeze),
    },
    {
      id: "no_provider_wallet_money_or_success",
      passed:
        snapshot.totals.runtimeSuccessAllowedNow === 0 &&
        snapshot.totals.providerCallAllowedNow === 0 &&
        snapshot.totals.walletMutationAllowedNow === 0 &&
        snapshot.totals.moneyMovementAllowedNow === 0 &&
        snapshot.totals.fakeSuccessAllowedNow === 0,
      evidence: JSON.stringify(snapshot.totals),
    },
    {
      id: "no_141m_runtime_or_write_actions",
      passed:
        snapshot.safety.appTsChangeBy141M === false &&
        snapshot.safety.serverTsChangeBy141M === false &&
        snapshot.safety.streamIndexChangeBy141M === false &&
        snapshot.safety.backendRestartBy141M === false &&
        snapshot.safety.runtimeHttpBy141M === false &&
        snapshot.safety.runtimePostBy141M === false &&
        snapshot.safety.databaseWriteBy141M === false &&
        snapshot.safety.providerCallBy141M === false &&
        snapshot.safety.walletMutationBy141M === false &&
        snapshot.safety.moneyMovementBy141M === false,
      evidence: JSON.stringify(snapshot.safety),
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
    stage: "runtime_mount_prerequisites_planning_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "runtime_mount_prerequisites_planning_smoke_passed" : "runtime_mount_prerequisites_planning_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
