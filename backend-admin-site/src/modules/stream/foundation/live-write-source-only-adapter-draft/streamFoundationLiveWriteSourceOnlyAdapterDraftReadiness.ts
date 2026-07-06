import {
  createStreamFoundationLiveHeartbeatSourceOnlyAdapterDecision,
  createStreamFoundationLiveStartSourceOnlyAdapterDecision,
  createStreamFoundationLiveStopSourceOnlyAdapterDecision,
} from "./streamFoundationLiveWriteSourceOnlyAdapterDraft";

export function getStreamFoundationLiveWriteSourceOnlyAdapterDraftReadiness() {
  const decisions = [
    createStreamFoundationLiveStartSourceOnlyAdapterDecision({ actorUserId: "readiness-user", roomId: "readiness-room" }),
    createStreamFoundationLiveStopSourceOnlyAdapterDecision({ actorUserId: "readiness-user", roomId: "readiness-room" }),
    createStreamFoundationLiveHeartbeatSourceOnlyAdapterDecision({ actorUserId: "readiness-user", roomId: "readiness-room" }),
  ] as const;

  const ready =
    decisions.every((decision) => decision.version === "BACKEND-STREAM-FOUNDATION-141Y") &&
    decisions.every((decision) => decision.sourceOnly === true) &&
    decisions.every((decision) => decision.ok === false) &&
    decisions.every((decision) => decision.statusCode === 423) &&
    decisions.every((decision) => decision.gateDecision.ok === false) &&
    decisions.every((decision) => decision.gateDecision.statusCode === 423) &&
    decisions.every((decision) => decision.runtimeMountAllowedNow === false) &&
    decisions.every((decision) => decision.runtimeSuccessAllowedNow === false) &&
    decisions.every((decision) => decision.fakeSuccessAllowedNow === false) &&
    decisions.every((decision) => decision.databaseReadAllowedNow === false) &&
    decisions.every((decision) => decision.databaseWriteAllowedNow === false) &&
    decisions.every((decision) => decision.providerCallAllowedNow === false) &&
    decisions.every((decision) => decision.providerSecretReadAllowedNow === false) &&
    decisions.every((decision) => decision.walletMutationAllowedNow === false) &&
    decisions.every((decision) => decision.moneyMovementAllowedNow === false);

  return {
    version: "BACKEND-STREAM-FOUNDATION-141Y",
    ready,
    status: ready ? "live_write_source_only_adapter_ready_blocked_default" : "live_write_source_only_adapter_blocked",
    adapterDecisions: decisions.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-141Z blocked adapter integration review package",
  } as const;
}
