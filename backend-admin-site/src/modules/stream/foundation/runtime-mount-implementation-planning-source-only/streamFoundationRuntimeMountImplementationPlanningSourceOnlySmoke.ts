import { getStreamFoundationRuntimeMountImplementationPlanningSourceOnlySnapshot } from "./streamFoundationRuntimeMountImplementationPlanningSourceOnly";
import { getStreamFoundationRuntimeMountImplementationPlanningSourceOnlyReadiness } from "./streamFoundationRuntimeMountImplementationPlanningSourceOnlyReadiness";

export function runStreamFoundationRuntimeMountImplementationPlanningSourceOnlySmoke() {
  const snapshot = getStreamFoundationRuntimeMountImplementationPlanningSourceOnlySnapshot();
  const readiness = getStreamFoundationRuntimeMountImplementationPlanningSourceOnlyReadiness();

  const assertions = [
    {
      id: "owner_approval_accepted_for_planning_only",
      passed:
        snapshot.ownerApprovalAccepted === true &&
        snapshot.ownerApprovalText.includes("BACKEND-STREAM-FOUNDATION-141V") &&
        snapshot.ownerApprovalText.includes("source-only only"),
      evidence: snapshot.ownerApprovalText,
    },
    {
      id: "future_source_changes_planned",
      passed: snapshot.futureSourceChanges.length === 9 && snapshot.totals.futureSourceChanges === 9,
      evidence: JSON.stringify(snapshot.futureSourceChanges.map((target) => target.id)),
    },
    {
      id: "no_target_source_write_now",
      passed:
        snapshot.implementationPolicy.targetSourceWriteAllowedNow === false &&
        snapshot.implementationPolicy.appTsWriteAllowedNow === false &&
        snapshot.implementationPolicy.serverTsWriteAllowedNow === false &&
        snapshot.implementationPolicy.streamIndexWriteAllowedNow === false &&
        snapshot.totals.targetSourceWriteAllowedNow === 0,
      evidence: JSON.stringify(snapshot.implementationPolicy),
    },
    {
      id: "routes_remain_blocked_423",
      passed:
        snapshot.implementationPolicy.currentRoutesStayBlockedNow === true &&
        snapshot.implementationPolicy.expectedCurrentStatusCode === 423 &&
        snapshot.implementationPolicy.runtimeMountAllowedNow === false &&
        snapshot.implementationPolicy.runtimeSuccessAllowedNow === false &&
        snapshot.implementationPolicy.fakeSuccessAllowedNow === false,
      evidence: JSON.stringify(snapshot.implementationPolicy),
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
    stage: "runtime_mount_implementation_planning_source_only_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "runtime_mount_implementation_plan_smoke_passed" : "runtime_mount_implementation_plan_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
