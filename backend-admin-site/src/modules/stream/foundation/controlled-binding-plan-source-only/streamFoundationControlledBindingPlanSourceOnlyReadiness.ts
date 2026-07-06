import { getStreamFoundationControlledBindingPlanSourceOnlySnapshot } from "./streamFoundationControlledBindingPlanSourceOnly";

export function getStreamFoundationControlledBindingPlanSourceOnlyReadiness() {
  const snapshot = getStreamFoundationControlledBindingPlanSourceOnlySnapshot();

  const planReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-142E" &&
    snapshot.ownerApprovalAccepted === true &&
    snapshot.ownerApprovalText.includes("BACKEND-STREAM-FOUNDATION-142F") &&
    snapshot.bindingPlanItems.length === 3 &&
    snapshot.bindingPlanItems.every((item) => item.status === "planned_source_only") &&
    snapshot.bindingPlanItems.every((item) => item.currentHandlerSource === "src/modules/stream/foundation/live-write-handler-source-only-draft") &&
    snapshot.bindingPlanItems.every((item) => item.futureHandlerSource === "src/modules/stream/foundation/live-write-runtime-handler");

  const blockedNow =
    snapshot.bindingPolicy.currentRoutesRemainBoundToBlockedHandlersNow === true &&
    snapshot.bindingPolicy.futureBindingPlanOnly === true &&
    snapshot.bindingPolicy.futureBindingMustKeep423UntilLaterSmoke === true &&
    snapshot.bindingPolicy.expectedCurrentStatusCode === 423 &&
    snapshot.bindingPolicy.appTsWriteAllowedNow === false &&
    snapshot.bindingPolicy.serverTsWriteAllowedNow === false &&
    snapshot.bindingPolicy.streamIndexWriteAllowedNow === false &&
    snapshot.bindingPolicy.routeBehaviorChangeAllowedNow === false &&
    snapshot.bindingPolicy.runtimePostAllowedNow === false &&
    snapshot.bindingPolicy.runtimeSuccessAllowedNow === false &&
    snapshot.bindingPolicy.databaseWriteAllowedNow === false &&
    snapshot.bindingPolicy.providerCallAllowedNow === false &&
    snapshot.bindingPolicy.walletMutationAllowedNow === false &&
    snapshot.bindingPolicy.moneyMovementAllowedNow === false &&
    snapshot.bindingPolicy.fakeSuccessAllowedNow === false &&
    snapshot.bindingPlanItems.every((item) => item.targetFileWriteAllowedNow === false) &&
    snapshot.bindingPlanItems.every((item) => item.routeBehaviorChangeAllowedNow === false) &&
    snapshot.bindingPlanItems.every((item) => item.runtimeSuccessAllowedNow === false) &&
    snapshot.totals.targetFileWriteAllowedNow === 0 &&
    snapshot.totals.routeBehaviorChangeAllowedNow === 0 &&
    snapshot.totals.runtimePostAllowedNow === 0 &&
    snapshot.totals.runtimeSuccessAllowedNow === 0 &&
    snapshot.totals.databaseWriteAllowedNow === 0 &&
    snapshot.totals.providerCallAllowedNow === 0 &&
    snapshot.totals.walletMutationAllowedNow === 0 &&
    snapshot.totals.moneyMovementAllowedNow === 0 &&
    snapshot.totals.fakeSuccessAllowedNow === 0;

  const safetyReady =
    snapshot.safety.sourceOnly142F === true &&
    snapshot.safety.appTsChangeBy142F === false &&
    snapshot.safety.serverTsChangeBy142F === false &&
    snapshot.safety.streamIndexChangeBy142F === false &&
    snapshot.safety.liveWriteHandlerChangeBy142F === false &&
    snapshot.safety.schemaMigrationBy142F === false &&
    snapshot.safety.backendRestartBy142F === false &&
    snapshot.safety.runtimeHttpBy142F === false &&
    snapshot.safety.runtimePostBy142F === false &&
    snapshot.safety.databaseReadBy142F === false &&
    snapshot.safety.databaseWriteBy142F === false &&
    snapshot.safety.providerCallBy142F === false &&
    snapshot.safety.providerSecretReadBy142F === false &&
    snapshot.safety.walletMutationBy142F === false &&
    snapshot.safety.moneyMovementBy142F === false &&
    snapshot.safety.fakeSuccessBy142F === false;

  const ready = planReady && blockedNow && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "controlled_binding_plan_source_only_ready_no_target_write" : "controlled_binding_plan_source_only_blocked",
    bindingPlanItems: snapshot.bindingPlanItems.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-142G controlled binding plan compile and no-target-write verification",
  } as const;
}
