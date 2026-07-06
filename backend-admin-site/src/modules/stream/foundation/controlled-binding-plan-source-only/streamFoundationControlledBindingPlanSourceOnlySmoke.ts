import { getStreamFoundationControlledBindingPlanSourceOnlySnapshot } from "./streamFoundationControlledBindingPlanSourceOnly";
import { getStreamFoundationControlledBindingPlanSourceOnlyReadiness } from "./streamFoundationControlledBindingPlanSourceOnlyReadiness";

export function runStreamFoundationControlledBindingPlanSourceOnlySmoke() {
  const snapshot = getStreamFoundationControlledBindingPlanSourceOnlySnapshot();
  const readiness = getStreamFoundationControlledBindingPlanSourceOnlyReadiness();

  const assertions = [
    {
      id: "owner_approval_accepted_for_142f",
      passed:
        snapshot.ownerApprovalAccepted === true &&
        snapshot.ownerApprovalText.includes("BACKEND-STREAM-FOUNDATION-142F") &&
        snapshot.ownerApprovalText.includes("controlled binding plan source-only only"),
      evidence: snapshot.ownerApprovalText,
    },
    {
      id: "three_live_write_routes_planned",
      passed:
        snapshot.bindingPlanItems.length === 3 &&
        snapshot.bindingPlanItems.some((item) => item.routeId === "stream_live_start") &&
        snapshot.bindingPlanItems.some((item) => item.routeId === "stream_live_stop") &&
        snapshot.bindingPlanItems.some((item) => item.routeId === "stream_live_heartbeat"),
      evidence: JSON.stringify(snapshot.bindingPlanItems.map((item) => ({ routeId: item.routeId, futureHandlerId: item.futureHandlerId }))),
    },
    {
      id: "no_target_write_or_route_behavior_change",
      passed:
        snapshot.bindingPolicy.appTsWriteAllowedNow === false &&
        snapshot.bindingPolicy.serverTsWriteAllowedNow === false &&
        snapshot.bindingPolicy.streamIndexWriteAllowedNow === false &&
        snapshot.bindingPolicy.routeBehaviorChangeAllowedNow === false &&
        snapshot.totals.targetFileWriteAllowedNow === 0 &&
        snapshot.totals.routeBehaviorChangeAllowedNow === 0,
      evidence: JSON.stringify(snapshot.bindingPolicy),
    },
    {
      id: "routes_remain_blocked_423",
      passed:
        snapshot.bindingPolicy.currentRoutesRemainBoundToBlockedHandlersNow === true &&
        snapshot.bindingPolicy.expectedCurrentStatusCode === 423 &&
        snapshot.bindingPolicy.runtimeSuccessAllowedNow === false &&
        snapshot.bindingPolicy.fakeSuccessAllowedNow === false,
      evidence: JSON.stringify(snapshot.bindingPolicy),
    },
    {
      id: "no_runtime_db_provider_wallet_money",
      passed:
        snapshot.totals.runtimePostAllowedNow === 0 &&
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
    stage: "controlled_binding_plan_source_only_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "controlled_binding_plan_source_only_smoke_passed" : "controlled_binding_plan_source_only_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
