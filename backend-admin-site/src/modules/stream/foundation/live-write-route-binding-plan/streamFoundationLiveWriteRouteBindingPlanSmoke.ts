import { getStreamFoundationLiveWriteRouteBindingPlanSnapshot } from "./streamFoundationLiveWriteRouteBindingPlan";
import { getStreamFoundationLiveWriteRouteBindingPlanReadiness } from "./streamFoundationLiveWriteRouteBindingPlanReadiness";

export function runStreamFoundationLiveWriteRouteBindingPlanSmoke() {
  const snapshot = getStreamFoundationLiveWriteRouteBindingPlanSnapshot();
  const readiness = getStreamFoundationLiveWriteRouteBindingPlanReadiness();

  const assertions = [
    {
      id: "three_live_route_binding_plans_ready",
      passed: snapshot.bindingPlans.length === 3,
      evidence: JSON.stringify(snapshot.bindingPlans.map((plan) => plan.routeId)),
    },
    {
      id: "no_mount_or_runtime_post_allowed",
      passed:
        snapshot.bindingPlans.every((plan) => plan.appTsMountNow === false) &&
        snapshot.bindingPlans.every((plan) => plan.serverTsMountNow === false) &&
        snapshot.bindingPlans.every((plan) => plan.streamIndexExportNow === false) &&
        snapshot.bindingPlans.every((plan) => plan.runtimePostAllowedNow === false),
      evidence: JSON.stringify(snapshot.bindingPlans),
    },
    {
      id: "no_db_provider_wallet_money",
      passed:
        snapshot.totals.databaseWriteAllowedNow === 0 &&
        snapshot.totals.providerCallAllowedNow === 0 &&
        snapshot.totals.walletMutationAllowedNow === 0 &&
        snapshot.totals.moneyMovementAllowedNow === 0 &&
        snapshot.totals.fakeSuccessAllowed === 0,
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
    stage: "controlled_source_only_route_binding_plan_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "live_write_route_binding_plan_smoke_passed" : "live_write_route_binding_plan_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
