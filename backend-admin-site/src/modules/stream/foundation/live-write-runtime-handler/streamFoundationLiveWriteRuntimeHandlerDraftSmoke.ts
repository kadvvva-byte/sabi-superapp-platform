import {
  createStreamFoundationLiveHeartbeatRuntimeHandlerDraftDecision,
  createStreamFoundationLiveStartRuntimeHandlerDraftDecision,
  createStreamFoundationLiveStopRuntimeHandlerDraftDecision,
} from "./streamFoundationLiveWriteRuntimeHandlerDraft";
import { getStreamFoundationLiveWriteRuntimeHandlerDraftReadiness } from "./streamFoundationLiveWriteRuntimeHandlerDraftReadiness";

export function runStreamFoundationLiveWriteRuntimeHandlerDraftSmoke() {
  const decisions = [
    createStreamFoundationLiveStartRuntimeHandlerDraftDecision({ actorUserId: "smoke-user", roomId: "smoke-room", locale: "ru" }),
    createStreamFoundationLiveStopRuntimeHandlerDraftDecision({ actorUserId: "smoke-user", roomId: "smoke-room", locale: "ru" }),
    createStreamFoundationLiveHeartbeatRuntimeHandlerDraftDecision({ actorUserId: "smoke-user", roomId: "smoke-room", locale: "ru" }),
  ] as const;

  const readiness = getStreamFoundationLiveWriteRuntimeHandlerDraftReadiness();

  const assertions = [
    {
      id: "all_runtime_handler_drafts_return_423_blocked",
      passed: decisions.every((decision) => decision.ok === false && decision.statusCode === 423),
      evidence: JSON.stringify(decisions.map((decision) => ({ handlerId: decision.handlerId, statusCode: decision.statusCode }))),
    },
    {
      id: "adapter_chain_remains_blocked",
      passed:
        decisions.every((decision) => decision.adapterDecision.version === "BACKEND-STREAM-FOUNDATION-141Y") &&
        decisions.every((decision) => decision.adapterDecision.ok === false) &&
        decisions.every((decision) => decision.adapterDecision.statusCode === 423) &&
        decisions.every((decision) => decision.adapterDecision.gateDecision.version === "BACKEND-STREAM-FOUNDATION-141X") &&
        decisions.every((decision) => decision.adapterDecision.gateDecision.statusCode === 423),
      evidence: JSON.stringify(decisions.map((decision) => decision.adapterDecision.gateDecision.blockingGateIds)),
    },
    {
      id: "no_route_binding_or_runtime_success",
      passed:
        decisions.every((decision) => decision.runtimeMountedNow === false) &&
        decisions.every((decision) => decision.routeBindingChangedNow === false) &&
        decisions.every((decision) => decision.runtimeSuccessAllowedNow === false) &&
        decisions.every((decision) => decision.fakeSuccessAllowedNow === false),
      evidence: JSON.stringify(decisions.map((decision) => decision.runtimeHandlerBlockedCode)),
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
      evidence: JSON.stringify(decisions.map((decision) => decision.adapterDecision.normalizedInput)),
    },
    {
      id: "readiness_true",
      passed: readiness.ready === true,
      evidence: readiness.status,
    },
  ];

  const failedAssertions = assertions.filter((assertion) => !assertion.passed);

  return {
    version: "BACKEND-STREAM-FOUNDATION-142C",
    stage: "controlled_source_only_runtime_handler_draft_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "runtime_handler_draft_source_only_smoke_passed" : "runtime_handler_draft_source_only_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
