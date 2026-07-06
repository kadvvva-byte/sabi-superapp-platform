import { getStreamFoundationModerationPolicyGateContractPlanningSnapshot } from "./streamFoundationModerationPolicyGateContractPlanning";
import { getStreamFoundationModerationPolicyGateContractPlanningReadiness } from "./streamFoundationModerationPolicyGateContractPlanningReadiness";

export function runStreamFoundationModerationPolicyGateContractPlanningSmoke() {
  const snapshot = getStreamFoundationModerationPolicyGateContractPlanningSnapshot();
  const readiness = getStreamFoundationModerationPolicyGateContractPlanningReadiness();

  const assertions = [
    {
      id: "moderation_rules_planned",
      passed: snapshot.moderationRules.length === 8 && snapshot.totals.moderationRules === 8,
      evidence: JSON.stringify(snapshot.moderationRules.map((rule) => rule.id)),
    },
    {
      id: "age_adult_abuse_report_admin_policy_locked",
      passed:
        snapshot.policySummary.ageGateRequiredBeforeRuntime === true &&
        snapshot.policySummary.adultContentPolicyRequiredBeforeRuntime === true &&
        snapshot.policySummary.profanityAndAbuseControlRequiredBeforeRuntime === true &&
        snapshot.policySummary.reportEvidenceRequiredBeforeRuntime === true &&
        snapshot.policySummary.adminReviewRequiredBeforeRuntime === true,
      evidence: JSON.stringify(snapshot.policySummary),
    },
    {
      id: "routes_remain_blocked_423",
      passed:
        snapshot.policySummary.routesStayBlockedNow === true &&
        snapshot.policySummary.expectedCurrentStatusCode === 423 &&
        snapshot.totals.runtimeSuccessAllowedNow === 0 &&
        snapshot.totals.fakeSuccessAllowedNow === 0,
      evidence: JSON.stringify(snapshot.totals),
    },
    {
      id: "no_runtime_write_provider_wallet_money",
      passed:
        snapshot.totals.readyForRuntimeMountNow === 0 &&
        snapshot.totals.databaseWriteAllowedNow === 0 &&
        snapshot.totals.providerCallAllowedNow === 0 &&
        snapshot.totals.walletMutationAllowedNow === 0 &&
        snapshot.totals.moneyMovementAllowedNow === 0,
      evidence: JSON.stringify(snapshot.totals),
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
    stage: "moderation_policy_gate_source_only_contract_planning_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "moderation_policy_gate_contract_smoke_passed" : "moderation_policy_gate_contract_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
