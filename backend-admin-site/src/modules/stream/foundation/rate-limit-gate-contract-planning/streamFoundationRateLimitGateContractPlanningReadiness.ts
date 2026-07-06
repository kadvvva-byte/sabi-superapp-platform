import { getStreamFoundationRateLimitGateContractPlanningSnapshot } from "./streamFoundationRateLimitGateContractPlanning";

export function getStreamFoundationRateLimitGateContractPlanningReadiness() {
  const snapshot = getStreamFoundationRateLimitGateContractPlanningSnapshot();

  const contractReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-141N" &&
    snapshot.rateLimitRules.length === 6 &&
    snapshot.rateLimitRules.every((rule) => rule.requiredBeforeRuntimeMount === true) &&
    snapshot.rateLimitRules.every((rule) => rule.proposedWindowSeconds > 0) &&
    snapshot.rateLimitRules.every((rule) => rule.proposedMaxAttempts > 0) &&
    snapshot.antiAbusePolicy.startStopHeartbeatMustBeThrottledBeforeRuntime === true &&
    snapshot.antiAbusePolicy.perUserAndDeviceScopesRequiredBeforeRuntime === true &&
    snapshot.antiAbusePolicy.rawIpStorageAllowedNow === false;

  const blockedNow =
    snapshot.antiAbusePolicy.routesStayBlockedNow === true &&
    snapshot.antiAbusePolicy.expectedCurrentStatusCode === 423 &&
    snapshot.antiAbusePolicy.runtimeEnforcementEnabledNow === false &&
    snapshot.rateLimitRules.every((rule) => rule.runtimeEnforcementEnabledNow === false) &&
    snapshot.rateLimitRules.every((rule) => rule.runtimeSuccessAllowedNow === false) &&
    snapshot.totals.readyForRuntimeMountNow === 0 &&
    snapshot.totals.runtimeEnforcementEnabledNow === 0 &&
    snapshot.totals.runtimeSuccessAllowedNow === 0 &&
    snapshot.totals.databaseWriteAllowedNow === 0 &&
    snapshot.totals.providerCallAllowedNow === 0 &&
    snapshot.totals.walletMutationAllowedNow === 0 &&
    snapshot.totals.moneyMovementAllowedNow === 0 &&
    snapshot.totals.fakeSuccessAllowedNow === 0;

  const safetyReady =
    snapshot.safety.sourceOnly141O === true &&
    snapshot.safety.appTsChangeBy141O === false &&
    snapshot.safety.serverTsChangeBy141O === false &&
    snapshot.safety.streamIndexChangeBy141O === false &&
    snapshot.safety.backendRestartBy141O === false &&
    snapshot.safety.runtimeHttpBy141O === false &&
    snapshot.safety.runtimePostBy141O === false &&
    snapshot.safety.databaseWriteBy141O === false &&
    snapshot.safety.providerCallBy141O === false &&
    snapshot.safety.walletMutationBy141O === false &&
    snapshot.safety.moneyMovementBy141O === false &&
    snapshot.safety.fakeSuccessBy141O === false;

  const ready = contractReady && blockedNow && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "rate_limit_gate_contract_ready_routes_remain_blocked" : "rate_limit_gate_contract_blocked",
    rateLimitRules: snapshot.rateLimitRules.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-141P moderation policy gate source-only contract planning",
  } as const;
}
