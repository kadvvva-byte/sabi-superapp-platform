import { getStreamFoundationLiveWriteHandlerSourcePlanSnapshot } from "./streamFoundationLiveWriteHandlerSourcePlan";
import { getStreamFoundationLiveWriteHandlerSourcePlanReadiness } from "./streamFoundationLiveWriteHandlerSourcePlanReadiness";

export function runStreamFoundationLiveWriteHandlerSourcePlanSmoke() {
  const snapshot = getStreamFoundationLiveWriteHandlerSourcePlanSnapshot();
  const readiness = getStreamFoundationLiveWriteHandlerSourcePlanReadiness();

  const assertions = [
    {
      id: "previous_write_route_gate_passed",
      passed: snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-140W" && snapshot.writeRouteApprovalGatePassed === true,
      evidence: `${snapshot.previousStage}:${snapshot.writeRouteApprovalGatePassed}`,
    },
    {
      id: "three_live_write_handlers_planned",
      passed:
        snapshot.liveWriteHandlers.some((handler) => handler.commandId === "stream_start_live_session_command") &&
        snapshot.liveWriteHandlers.some((handler) => handler.commandId === "stream_stop_live_session_command") &&
        snapshot.liveWriteHandlers.some((handler) => handler.commandId === "stream_live_heartbeat_command"),
      evidence: JSON.stringify(snapshot.liveWriteHandlers.map((handler) => handler.commandId)),
    },
    {
      id: "all_runtime_write_flags_blocked",
      passed:
        snapshot.liveWriteHandlers.every((handler) => handler.runtimeMountedNow === false) &&
        snapshot.liveWriteHandlers.every((handler) => handler.runtimePostAllowedNow === false) &&
        snapshot.liveWriteHandlers.every((handler) => handler.databaseWriteAllowedNow === false) &&
        snapshot.liveWriteHandlers.every((handler) => handler.providerCallAllowedNow === false) &&
        snapshot.liveWriteHandlers.every((handler) => handler.walletMutationAllowedNow === false) &&
        snapshot.liveWriteHandlers.every((handler) => handler.moneyMovementAllowedNow === false) &&
        snapshot.liveWriteHandlers.every((handler) => handler.fakeSuccessAllowed === false),
      evidence: JSON.stringify(snapshot.totals),
    },
    {
      id: "required_gates_before_runtime_present",
      passed:
        snapshot.liveWriteHandlers.every((handler) => handler.requiredGatesBeforeRuntime.includes("identity_session_gate")) &&
        snapshot.liveWriteHandlers.every((handler) => handler.requiredGatesBeforeRuntime.includes("owner_runtime_mount_approval")),
      evidence: JSON.stringify(snapshot.liveWriteHandlers.map((handler) => handler.requiredGatesBeforeRuntime)),
    },
    {
      id: "safety_no_runtime_money_provider_wallet",
      passed:
        snapshot.safety.routeMountNow === false &&
        snapshot.safety.runtimePostBy140X === false &&
        snapshot.safety.backendRestart === false &&
        snapshot.safety.databaseWrite === false &&
        snapshot.safety.providerCall === false &&
        snapshot.safety.walletMutation === false &&
        snapshot.safety.paymentAuthorization === false &&
        snapshot.safety.monthlyPayout === false &&
        snapshot.safety.moneyMovement === false &&
        snapshot.safety.fakeSuccess === false,
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
    stage: "live_write_handler_source_plan_only_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "live_write_handler_source_plan_smoke_passed" : "live_write_handler_source_plan_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
