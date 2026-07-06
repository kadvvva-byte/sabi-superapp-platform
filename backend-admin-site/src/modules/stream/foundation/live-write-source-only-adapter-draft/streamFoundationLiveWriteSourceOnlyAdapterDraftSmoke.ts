import {
  createStreamFoundationLiveHeartbeatSourceOnlyAdapterDecision,
  createStreamFoundationLiveStartSourceOnlyAdapterDecision,
  createStreamFoundationLiveStopSourceOnlyAdapterDecision,
} from "./streamFoundationLiveWriteSourceOnlyAdapterDraft";
import { getStreamFoundationLiveWriteSourceOnlyAdapterDraftReadiness } from "./streamFoundationLiveWriteSourceOnlyAdapterDraftReadiness";

export function runStreamFoundationLiveWriteSourceOnlyAdapterDraftSmoke() {
  const decisions = [
    createStreamFoundationLiveStartSourceOnlyAdapterDecision({ actorUserId: "smoke-user", roomId: "smoke-room", locale: "ru" }),
    createStreamFoundationLiveStopSourceOnlyAdapterDecision({ actorUserId: "smoke-user", roomId: "smoke-room", locale: "ru" }),
    createStreamFoundationLiveHeartbeatSourceOnlyAdapterDecision({ actorUserId: "smoke-user", roomId: "smoke-room", locale: "ru" }),
  ] as const;

  const readiness = getStreamFoundationLiveWriteSourceOnlyAdapterDraftReadiness();

  const assertions = [
    {
      id: "all_adapter_commands_return_423_blocked",
      passed: decisions.every((decision) => decision.ok === false && decision.statusCode === 423),
      evidence: JSON.stringify(decisions.map((decision) => ({ routeId: decision.routeId, statusCode: decision.statusCode }))),
    },
    {
      id: "gate_evaluator_is_called_and_blocked",
      passed:
        decisions.every((decision) => decision.gateDecision.version === "BACKEND-STREAM-FOUNDATION-141X") &&
        decisions.every((decision) => decision.gateDecision.ok === false) &&
        decisions.every((decision) => decision.gateDecision.statusCode === 423) &&
        decisions.every((decision) => decision.gateDecision.blockingGateIds.length >= 1),
      evidence: JSON.stringify(decisions.map((decision) => decision.gateDecision.blockingGateIds)),
    },
    {
      id: "source_only_no_runtime_success",
      passed:
        decisions.every((decision) => decision.sourceOnly === true) &&
        decisions.every((decision) => decision.runtimeMountAllowedNow === false) &&
        decisions.every((decision) => decision.runtimeSuccessAllowedNow === false) &&
        decisions.every((decision) => decision.fakeSuccessAllowedNow === false),
      evidence: JSON.stringify(decisions.map((decision) => decision.adapterBlockedCode)),
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
      evidence: JSON.stringify(decisions.map((decision) => decision.normalizedInput)),
    },
    {
      id: "readiness_true",
      passed: readiness.ready === true,
      evidence: readiness.status,
    },
  ];

  const failedAssertions = assertions.filter((assertion) => !assertion.passed);

  return {
    version: "BACKEND-STREAM-FOUNDATION-141Y",
    stage: "controlled_source_only_live_write_adapter_draft_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "live_write_source_only_adapter_smoke_passed" : "live_write_source_only_adapter_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
