import {
  createStreamFoundation141XDefaultGateInputs,
  evaluateStreamFoundationLiveWriteRuntimeGatesSourceOnly,
} from "./streamFoundationRuntimeGateEvaluator";
import { getStreamFoundationRuntimeGateEvaluatorReadiness } from "./streamFoundationRuntimeGateEvaluatorReadiness";

export function runStreamFoundationRuntimeGateEvaluatorSourceOnlySmoke() {
  const startDecision = evaluateStreamFoundationLiveWriteRuntimeGatesSourceOnly({
    commandId: "stream_start_live_session_command",
    routeId: "stream_live_start",
    gates: createStreamFoundation141XDefaultGateInputs(),
  });

  const stopDecision = evaluateStreamFoundationLiveWriteRuntimeGatesSourceOnly({
    commandId: "stream_stop_live_session_command",
    routeId: "stream_live_stop",
    gates: createStreamFoundation141XDefaultGateInputs(),
  });

  const heartbeatDecision = evaluateStreamFoundationLiveWriteRuntimeGatesSourceOnly({
    commandId: "stream_live_heartbeat_command",
    routeId: "stream_live_heartbeat",
    gates: createStreamFoundation141XDefaultGateInputs(),
  });

  const readiness = getStreamFoundationRuntimeGateEvaluatorReadiness();
  const decisions = [startDecision, stopDecision, heartbeatDecision] as const;

  const assertions = [
    {
      id: "all_commands_return_423_blocked",
      passed: decisions.every((decision) => decision.ok === false && decision.statusCode === 423),
      evidence: JSON.stringify(decisions.map((decision) => ({ routeId: decision.routeId, statusCode: decision.statusCode }))),
    },
    {
      id: "source_only_no_runtime_success",
      passed:
        decisions.every((decision) => decision.sourceOnly === true) &&
        decisions.every((decision) => decision.runtimeMountAllowedNow === false) &&
        decisions.every((decision) => decision.runtimeSuccessAllowedNow === false) &&
        decisions.every((decision) => decision.fakeSuccessAllowedNow === false),
      evidence: JSON.stringify(decisions.map((decision) => decision.blockedCode)),
    },
    {
      id: "no_db_provider_wallet_money",
      passed:
        decisions.every((decision) => decision.databaseReadAllowedNow === false) &&
        decisions.every((decision) => decision.databaseWriteAllowedNow === false) &&
        decisions.every((decision) => decision.providerCallAllowedNow === false) &&
        decisions.every((decision) => decision.providerSecretReadAllowedNow === false) &&
        decisions.every((decision) => decision.walletMutationAllowedNow === false) &&
        decisions.every((decision) => decision.moneyMovementAllowedNow === false),
      evidence: JSON.stringify(decisions.map((decision) => decision.blockingGateIds)),
    },
    {
      id: "all_required_gates_checked",
      passed: decisions.every((decision) => decision.gatesChecked === 7 && decision.blockingGateIds.length >= 1),
      evidence: JSON.stringify(decisions.map((decision) => decision.gatesChecked)),
    },
    {
      id: "readiness_true",
      passed: readiness.ready === true,
      evidence: readiness.status,
    },
  ];

  const failedAssertions = assertions.filter((assertion) => !assertion.passed);

  return {
    version: startDecision.version,
    stage: "controlled_source_only_runtime_gate_evaluator_draft_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "runtime_gate_evaluator_source_only_smoke_passed" : "runtime_gate_evaluator_source_only_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
