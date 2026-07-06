import { getStreamFoundationModerationPolicyGateContractPlanningSnapshot } from "./streamFoundationModerationPolicyGateContractPlanning";

export function getStreamFoundationModerationPolicyGateContractPlanningReadiness() {
  const snapshot = getStreamFoundationModerationPolicyGateContractPlanningSnapshot();

  const contractReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-141O" &&
    snapshot.moderationRules.length === 8 &&
    snapshot.moderationRules.every((rule) => rule.requiredBeforeRuntimeMount === true) &&
    snapshot.policySummary.ageGateRequiredBeforeRuntime === true &&
    snapshot.policySummary.adultContentPolicyRequiredBeforeRuntime === true &&
    snapshot.policySummary.profanityAndAbuseControlRequiredBeforeRuntime === true &&
    snapshot.policySummary.reportEvidenceRequiredBeforeRuntime === true &&
    snapshot.policySummary.adminReviewRequiredBeforeRuntime === true &&
    snapshot.policySummary.safeI18nMessageKeyRequiredBeforeRuntime === true &&
    snapshot.policySummary.noDecorativeStarPolicyPreserved === true;

  const blockedNow =
    snapshot.policySummary.routesStayBlockedNow === true &&
    snapshot.policySummary.expectedCurrentStatusCode === 423 &&
    snapshot.moderationRules.every((rule) => rule.runtimeSuccessAllowedNow === false) &&
    snapshot.totals.readyForRuntimeMountNow === 0 &&
    snapshot.totals.runtimeSuccessAllowedNow === 0 &&
    snapshot.totals.databaseWriteAllowedNow === 0 &&
    snapshot.totals.providerCallAllowedNow === 0 &&
    snapshot.totals.walletMutationAllowedNow === 0 &&
    snapshot.totals.moneyMovementAllowedNow === 0 &&
    snapshot.totals.fakeSuccessAllowedNow === 0;

  const safetyReady =
    snapshot.safety.sourceOnly141P === true &&
    snapshot.safety.appTsChangeBy141P === false &&
    snapshot.safety.serverTsChangeBy141P === false &&
    snapshot.safety.streamIndexChangeBy141P === false &&
    snapshot.safety.backendRestartBy141P === false &&
    snapshot.safety.runtimeHttpBy141P === false &&
    snapshot.safety.runtimePostBy141P === false &&
    snapshot.safety.databaseWriteBy141P === false &&
    snapshot.safety.providerCallBy141P === false &&
    snapshot.safety.walletMutationBy141P === false &&
    snapshot.safety.moneyMovementBy141P === false &&
    snapshot.safety.fakeSuccessBy141P === false;

  const ready = contractReady && blockedNow && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "moderation_policy_gate_contract_ready_routes_remain_blocked" : "moderation_policy_gate_contract_blocked",
    moderationRules: snapshot.moderationRules.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-141Q repository gate source-only contract planning",
  } as const;
}
