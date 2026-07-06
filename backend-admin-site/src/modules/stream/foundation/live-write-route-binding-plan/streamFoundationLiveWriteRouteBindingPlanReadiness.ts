import { getStreamFoundationLiveWriteRouteBindingPlanSnapshot } from "./streamFoundationLiveWriteRouteBindingPlan";

export function getStreamFoundationLiveWriteRouteBindingPlanReadiness() {
  const snapshot = getStreamFoundationLiveWriteRouteBindingPlanSnapshot();

  const plansReady =
    snapshot.bindingPlans.length === 3 &&
    snapshot.bindingPlans.every((plan) => plan.sourceOnlyRegistryReady === true) &&
    snapshot.bindingPlans.every((plan) => plan.exactApprovalRequiredBeforeRuntimeMount === true) &&
    snapshot.bindingPlans.every((plan) => plan.safeExpectedRuntimeResponseBeforeApproval.statusCode === 423) &&
    snapshot.bindingPlans.every((plan) => plan.safeExpectedRuntimeResponseBeforeApproval.ok === false);

  const runtimeBlocked =
    snapshot.bindingPlans.every((plan) => plan.appTsMountNow === false) &&
    snapshot.bindingPlans.every((plan) => plan.serverTsMountNow === false) &&
    snapshot.bindingPlans.every((plan) => plan.streamIndexExportNow === false) &&
    snapshot.bindingPlans.every((plan) => plan.runtimePostAllowedNow === false) &&
    snapshot.bindingPlans.every((plan) => plan.runtimeSmokeAllowedNow === false) &&
    snapshot.bindingPlans.every((plan) => plan.backendRestartAllowedNow === false) &&
    snapshot.bindingPlans.every((plan) => plan.databaseWriteAllowedNow === false) &&
    snapshot.bindingPlans.every((plan) => plan.providerCallAllowedNow === false) &&
    snapshot.bindingPlans.every((plan) => plan.walletMutationAllowedNow === false) &&
    snapshot.bindingPlans.every((plan) => plan.moneyMovementAllowedNow === false) &&
    snapshot.bindingPlans.every((plan) => plan.fakeSuccessAllowed === false);

  const safetyReady =
    snapshot.safety.sourceOnly === true &&
    snapshot.safety.appTsChange === false &&
    snapshot.safety.serverTsChange === false &&
    snapshot.safety.streamIndexChange === false &&
    snapshot.safety.routeMountNow === false &&
    snapshot.safety.runtimeHttpBy141A === false &&
    snapshot.safety.runtimePostBy141A === false &&
    snapshot.safety.databaseWrite === false &&
    snapshot.safety.providerCall === false &&
    snapshot.safety.walletMutation === false &&
    snapshot.safety.moneyMovement === false &&
    snapshot.safety.fakeSuccess === false;

  const ready = plansReady && runtimeBlocked && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "live_write_route_binding_plan_ready_runtime_mount_blocked" : "live_write_route_binding_plan_blocked",
    bindingPlans: snapshot.totals.bindingPlans,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-141B source-only binding registry verification",
  } as const;
}
