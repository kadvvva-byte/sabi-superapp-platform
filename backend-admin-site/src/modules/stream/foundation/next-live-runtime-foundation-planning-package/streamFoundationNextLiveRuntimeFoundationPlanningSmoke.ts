import { getStreamFoundationNextLiveRuntimeFoundationPlanningSnapshot } from "./streamFoundationNextLiveRuntimeFoundationPlanning";
import { getStreamFoundationNextLiveRuntimeFoundationPlanningReadiness } from "./streamFoundationNextLiveRuntimeFoundationPlanningReadiness";

export function runStreamFoundationNextLiveRuntimeFoundationPlanningSmoke() {
  const snapshot = getStreamFoundationNextLiveRuntimeFoundationPlanningSnapshot();
  const readiness = getStreamFoundationNextLiveRuntimeFoundationPlanningReadiness();

  const assertions = [
    {
      id: "142v_fix2_blocked_json_envelopes_verified",
      passed:
        snapshot.verifiedBlockedEnvelopeEvidence.routesReturned423 === 3 &&
        snapshot.verifiedBlockedEnvelopeEvidence.jsonBlockedEnvelopeRoutes === 3 &&
        snapshot.verifiedBlockedEnvelopeEvidence.emptyBodyRoutes === 0 &&
        snapshot.verifiedBlockedEnvelopeEvidence.targetPatchForEnvelopeBodyNeeded === false,
      evidence: JSON.stringify(snapshot.verifiedBlockedEnvelopeEvidence),
    },
    {
      id: "live_runtime_foundation_batch_planned",
      passed:
        snapshot.plannedBatchItems.length === 7 &&
        snapshot.planningDecision.continueLiveRuntimeFoundationBatch === true &&
        snapshot.planningDecision.keepLiveWriteRoutesBlocked423UntilRuntimeMountApproval === true,
      evidence: JSON.stringify(snapshot.plannedBatchItems.map((item) => item.id)),
    },
    {
      id: "planned_batch_items_are_blocked_now",
      passed:
        snapshot.plannedBatchItems.every((item) => item.runtimeMountAllowedNow === false) &&
        snapshot.plannedBatchItems.every((item) => item.runtimePostAllowedNow === false) &&
        snapshot.plannedBatchItems.every((item) => item.databaseWriteAllowedNow === false) &&
        snapshot.plannedBatchItems.every((item) => item.providerCallAllowedNow === false) &&
        snapshot.plannedBatchItems.every((item) => item.walletMutationAllowedNow === false) &&
        snapshot.plannedBatchItems.every((item) => item.fakeSuccessAllowedNow === false),
      evidence: JSON.stringify(snapshot.plannedBatchItems),
    },
    {
      id: "exact_approval_for_142y_present",
      passed:
        snapshot.requiredExactApprovalTextFor142Y.includes("BACKEND-STREAM-FOUNDATION-142Y") &&
        snapshot.requiredExactApprovalTextFor142Y.includes("source-only contracts") &&
        snapshot.requiredExactApprovalTextFor142Y.includes("no runtime POST") &&
        snapshot.requiredExactApprovalTextFor142Y.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor142Y,
    },
    {
      id: "142x_does_not_run_runtime_or_write_targets",
      passed:
        snapshot.safety.targetWriteBy142X === false &&
        snapshot.safety.routeBehaviorChangeBy142X === false &&
        snapshot.safety.runtimePostBy142X === false &&
        snapshot.safety.databaseWriteBy142X === false &&
        snapshot.safety.providerCallBy142X === false &&
        snapshot.safety.walletMutationBy142X === false &&
        snapshot.safety.moneyMovementBy142X === false,
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
    stage: "next_live_runtime_foundation_planning_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "next_live_runtime_foundation_planning_smoke_passed" : "next_live_runtime_foundation_planning_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
