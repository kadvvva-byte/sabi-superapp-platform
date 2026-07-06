import { getStreamFoundationRealtimeProviderReadinessGateContractPlanningSnapshot } from "./streamFoundationRealtimeProviderReadinessGateContractPlanning";
import { getStreamFoundationRealtimeProviderReadinessGateContractPlanningReadiness } from "./streamFoundationRealtimeProviderReadinessGateContractPlanningReadiness";

export function runStreamFoundationRealtimeProviderReadinessGateContractPlanningSmoke() {
  const snapshot = getStreamFoundationRealtimeProviderReadinessGateContractPlanningSnapshot();
  const readiness = getStreamFoundationRealtimeProviderReadinessGateContractPlanningReadiness();

  const assertions = [
    {
      id: "provider_contracts_planned",
      passed: snapshot.providerContracts.length === 7 && snapshot.totals.providerContracts === 7,
      evidence: JSON.stringify(snapshot.providerContracts.map((contract) => contract.id)),
    },
    {
      id: "server_side_secret_policy_locked",
      passed:
        snapshot.providerPolicy.providerSecretsServerSideOnly === true &&
        snapshot.providerPolicy.mobileProviderSecretsAllowed === false &&
        snapshot.providerContracts.every((contract) => contract.serverSideOnly === true) &&
        snapshot.providerContracts.every((contract) => contract.mobileSecretAllowed === false),
      evidence: JSON.stringify(snapshot.providerPolicy),
    },
    {
      id: "provider_not_live_and_no_fake_fallback",
      passed:
        snapshot.providerPolicy.providerLiveAllowedNow === false &&
        snapshot.providerPolicy.providerCallAllowedNow === false &&
        snapshot.providerPolicy.fakeProviderFallbackAllowed === false &&
        snapshot.totals.providerCallAllowedNow === 0 &&
        snapshot.totals.providerLiveAllowedNow === 0 &&
        snapshot.totals.fakeProviderSuccessAllowedNow === 0,
      evidence: JSON.stringify(snapshot.totals),
    },
    {
      id: "routes_remain_blocked_423",
      passed:
        snapshot.providerPolicy.routesStayBlockedNow === true &&
        snapshot.providerPolicy.expectedCurrentStatusCode === 423 &&
        snapshot.totals.runtimeSuccessAllowedNow === 0 &&
        snapshot.totals.fakeSuccessAllowedNow === 0,
      evidence: JSON.stringify(snapshot.providerPolicy),
    },
    {
      id: "no_db_wallet_money_or_secret_read",
      passed:
        snapshot.totals.databaseWriteAllowedNow === 0 &&
        snapshot.totals.walletMutationAllowedNow === 0 &&
        snapshot.totals.moneyMovementAllowedNow === 0 &&
        snapshot.safety.providerSecretReadBy141R === false,
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
    stage: "realtime_provider_readiness_gate_source_only_contract_planning_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "realtime_provider_readiness_contract_smoke_passed" : "realtime_provider_readiness_contract_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
