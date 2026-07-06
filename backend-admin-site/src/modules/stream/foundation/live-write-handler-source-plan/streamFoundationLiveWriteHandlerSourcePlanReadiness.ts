import { getStreamFoundationLiveWriteHandlerSourcePlanSnapshot } from "./streamFoundationLiveWriteHandlerSourcePlan";

export function getStreamFoundationLiveWriteHandlerSourcePlanReadiness() {
  const snapshot = getStreamFoundationLiveWriteHandlerSourcePlanSnapshot();

  const handlersReady =
    snapshot.writeRouteApprovalGatePassed === true &&
    snapshot.liveWriteHandlers.length === 3 &&
    snapshot.liveWriteHandlers.every((handler) => handler.sourcePlanReady === true) &&
    snapshot.liveWriteHandlers.every((handler) => handler.runtimeMountedNow === false) &&
    snapshot.liveWriteHandlers.every((handler) => handler.runtimePostAllowedNow === false) &&
    snapshot.liveWriteHandlers.every((handler) => handler.databaseWriteAllowedNow === false) &&
    snapshot.liveWriteHandlers.every((handler) => handler.providerCallAllowedNow === false) &&
    snapshot.liveWriteHandlers.every((handler) => handler.walletMutationAllowedNow === false) &&
    snapshot.liveWriteHandlers.every((handler) => handler.paymentAuthorizationAllowedNow === false) &&
    snapshot.liveWriteHandlers.every((handler) => handler.monthlyPayoutAllowedNow === false) &&
    snapshot.liveWriteHandlers.every((handler) => handler.moneyMovementAllowedNow === false) &&
    snapshot.liveWriteHandlers.every((handler) => handler.fakeSuccessAllowed === false);

  const requiredGatesReady =
    snapshot.liveWriteHandlers.every((handler) => handler.requiredGatesBeforeRuntime.includes("identity_session_gate")) &&
    snapshot.liveWriteHandlers.every((handler) => handler.requiredGatesBeforeRuntime.includes("owner_runtime_mount_approval")) &&
    snapshot.liveWriteHandlers.every((handler) => handler.safeFailureCodes.includes("STREAM_OWNER_RUNTIME_APPROVAL_REQUIRED"));

  const totalsReady =
    snapshot.totals.totalLiveWriteHandlers === snapshot.liveWriteHandlers.length &&
    snapshot.totals.runtimeMountedNow === 0 &&
    snapshot.totals.runtimePostAllowedNow === 0 &&
    snapshot.totals.databaseWriteAllowedNow === 0 &&
    snapshot.totals.providerCallAllowedNow === 0 &&
    snapshot.totals.walletMutationAllowedNow === 0 &&
    snapshot.totals.moneyMovementAllowedNow === 0 &&
    snapshot.totals.fakeSuccessAllowed === 0;

  const safetyReady =
    snapshot.safety.sourceOnly === true &&
    snapshot.safety.appTsChange === false &&
    snapshot.safety.serverTsChange === false &&
    snapshot.safety.streamIndexChange === false &&
    snapshot.safety.routeMountNow === false &&
    snapshot.safety.runtimePostBy140X === false &&
    snapshot.safety.backendRestart === false &&
    snapshot.safety.databaseWrite === false &&
    snapshot.safety.providerCall === false &&
    snapshot.safety.walletMutation === false &&
    snapshot.safety.paymentAuthorization === false &&
    snapshot.safety.monthlyPayout === false &&
    snapshot.safety.moneyMovement === false &&
    snapshot.safety.fakeSuccess === false;

  const ready = handlersReady && requiredGatesReady && totalsReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "live_write_handler_source_plan_ready_runtime_blocked" : "live_write_handler_source_plan_blocked",
    totalLiveWriteHandlers: snapshot.totals.totalLiveWriteHandlers,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-140Y live write handler source-only implementation draft",
  } as const;
}
