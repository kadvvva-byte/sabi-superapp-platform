import { getStreamFoundationIdentitySessionGateContractPlanningSnapshot } from "./streamFoundationIdentitySessionGateContractPlanning";
import { getStreamFoundationIdentitySessionGateContractPlanningReadiness } from "./streamFoundationIdentitySessionGateContractPlanningReadiness";

export function runStreamFoundationIdentitySessionGateContractPlanningSmoke() {
  const snapshot = getStreamFoundationIdentitySessionGateContractPlanningSnapshot();
  const readiness = getStreamFoundationIdentitySessionGateContractPlanningReadiness();

  const assertions = [
    {
      id: "identity_rules_and_commands_planned",
      passed: snapshot.identityRules.length === 8 && snapshot.commandContracts.length === 3,
      evidence: JSON.stringify({
        rules: snapshot.identityRules.map((rule) => rule.id),
        commands: snapshot.commandContracts.map((contract) => contract.commandId),
      }),
    },
    {
      id: "unified_user_id_policy_locked",
      passed:
        snapshot.unifiedIdentityPolicy.unifiedUserIdRequired === true &&
        snapshot.unifiedIdentityPolicy.messengerAndStreamUserIdMustMatchBeforeRuntime === true &&
        snapshot.unifiedIdentityPolicy.displayNameIsNotPrimaryIdentity === true &&
        snapshot.unifiedIdentityPolicy.anonymousLiveRuntimeAllowedNow === false &&
        snapshot.unifiedIdentityPolicy.mismatchedIdentityAllowedNow === false,
      evidence: JSON.stringify(snapshot.unifiedIdentityPolicy),
    },
    {
      id: "routes_remain_blocked_423",
      passed:
        snapshot.currentRouteFreeze.routesStayBlocked === true &&
        snapshot.currentRouteFreeze.expectedCurrentStatusCode === 423 &&
        snapshot.currentRouteFreeze.runtimeSuccessAllowedNow === false &&
        snapshot.currentRouteFreeze.fakeSuccessAllowedNow === false,
      evidence: JSON.stringify(snapshot.currentRouteFreeze),
    },
    {
      id: "no_runtime_write_provider_wallet_money",
      passed:
        snapshot.totals.readyForRuntimeMountNow === 0 &&
        snapshot.totals.runtimeSuccessAllowedNow === 0 &&
        snapshot.totals.databaseWriteAllowedNow === 0 &&
        snapshot.totals.providerCallAllowedNow === 0 &&
        snapshot.totals.walletMutationAllowedNow === 0 &&
        snapshot.totals.moneyMovementAllowedNow === 0 &&
        snapshot.totals.fakeSuccessAllowedNow === 0,
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
    stage: "identity_session_gate_source_only_contract_planning_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "identity_session_gate_contract_smoke_passed" : "identity_session_gate_contract_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
