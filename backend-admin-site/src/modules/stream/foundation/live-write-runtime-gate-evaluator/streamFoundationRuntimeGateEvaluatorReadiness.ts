import {
  createStreamFoundation141XDefaultGateInputs,
  evaluateStreamFoundationLiveWriteRuntimeGatesSourceOnly,
} from "./streamFoundationRuntimeGateEvaluator";

export function getStreamFoundationRuntimeGateEvaluatorReadiness() {
  const decision = evaluateStreamFoundationLiveWriteRuntimeGatesSourceOnly({
    commandId: "stream_start_live_session_command",
    routeId: "stream_live_start",
    actorUserId: "source-only-readiness",
    roomId: "source-only-room",
    deviceSessionId: "source-only-device",
    clientRequestId: "source-only-request",
    locale: "ru",
    gates: createStreamFoundation141XDefaultGateInputs(),
  });

  const ready =
    decision.version === "BACKEND-STREAM-FOUNDATION-141X" &&
    decision.sourceOnly === true &&
    decision.ok === false &&
    decision.statusCode === 423 &&
    decision.runtimeMountAllowedNow === false &&
    decision.runtimeSuccessAllowedNow === false &&
    decision.fakeSuccessAllowedNow === false &&
    decision.databaseReadAllowedNow === false &&
    decision.databaseWriteAllowedNow === false &&
    decision.providerCallAllowedNow === false &&
    decision.providerSecretReadAllowedNow === false &&
    decision.walletMutationAllowedNow === false &&
    decision.moneyMovementAllowedNow === false &&
    decision.gatesChecked === 7 &&
    decision.blockingGateIds.length >= 1;

  return {
    version: decision.version,
    ready,
    status: ready ? "runtime_gate_evaluator_source_only_ready_blocked_default" : "runtime_gate_evaluator_source_only_blocked",
    gatesChecked: decision.gatesChecked,
    blockingGateIds: decision.blockingGateIds,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-141Y controlled source-only live write adapter draft package",
  } as const;
}
