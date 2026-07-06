import { getStreamFoundationRateLimitGateContractPlanningSnapshot } from "./streamFoundationRateLimitGateContractPlanning";
import { getStreamFoundationRateLimitGateContractPlanningReadiness } from "./streamFoundationRateLimitGateContractPlanningReadiness";

export function runStreamFoundationRateLimitGateContractPlanningSmoke() {
  const snapshot = getStreamFoundationRateLimitGateContractPlanningSnapshot();
  const readiness = getStreamFoundationRateLimitGateContractPlanningReadiness();

  const assertions = [
    {
      id: "rate_limit_rules_planned",
      passed: snapshot.rateLimitRules.length === 6 && snapshot.totals.rateLimitRules === 6,
      evidence: JSON.stringify(snapshot.rateLimitRules.map((rule) => rule.id)),
    },
    {
      id: "anti_abuse_policy_locked",
      passed:
        snapshot.antiAbusePolicy.startStopHeartbeatMustBeThrottledBeforeRuntime === true &&
        snapshot.antiAbusePolicy.perUserAndDeviceScopesRequiredBeforeRuntime === true &&
        snapshot.antiAbusePolicy.rawIpStorageAllowedNow === false &&
        snapshot.antiAbusePolicy.runtimeEnforcementEnabledNow === false,
      evidence: JSON.stringify(snapshot.antiAbusePolicy),
    },
    {
      id: "routes_remain_blocked_423",
      passed:
        snapshot.antiAbusePolicy.routesStayBlockedNow === true &&
        snapshot.antiAbusePolicy.expectedCurrentStatusCode === 423 &&
        snapshot.totals.runtimeSuccessAllowedNow === 0 &&
        snapshot.totals.fakeSuccessAllowedNow === 0,
      evidence: JSON.stringify(snapshot.totals),
    },
    {
      id: "no_runtime_write_provider_wallet_money",
      passed:
        snapshot.totals.readyForRuntimeMountNow === 0 &&
        snapshot.totals.runtimeEnforcementEnabledNow === 0 &&
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
    stage: "rate_limit_gate_source_only_contract_planning_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "rate_limit_gate_contract_smoke_passed" : "rate_limit_gate_contract_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
