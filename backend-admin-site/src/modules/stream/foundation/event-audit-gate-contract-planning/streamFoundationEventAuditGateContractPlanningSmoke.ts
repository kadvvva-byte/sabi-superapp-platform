import { getStreamFoundationEventAuditGateContractPlanningSnapshot } from "./streamFoundationEventAuditGateContractPlanning";
import { getStreamFoundationEventAuditGateContractPlanningReadiness } from "./streamFoundationEventAuditGateContractPlanningReadiness";

export function runStreamFoundationEventAuditGateContractPlanningSmoke() {
  const snapshot = getStreamFoundationEventAuditGateContractPlanningSnapshot();
  const readiness = getStreamFoundationEventAuditGateContractPlanningReadiness();

  const assertions = [
    {
      id: "audit_events_planned",
      passed: snapshot.auditEvents.length === 10 && snapshot.totals.auditEvents === 10,
      evidence: JSON.stringify(snapshot.auditEvents.map((event) => event.id)),
    },
    {
      id: "audit_privacy_policy_locked",
      passed:
        snapshot.auditPolicy.rawPiiAllowedNow === false &&
        snapshot.auditPolicy.rawSecretAllowedNow === false &&
        snapshot.auditPolicy.rawProviderPayloadAllowedNow === false &&
        snapshot.auditEvents.every((event) => event.piiAllowedInAuditNow === false) &&
        snapshot.auditEvents.every((event) => event.rawSecretAllowedInAuditNow === false),
      evidence: JSON.stringify(snapshot.auditPolicy),
    },
    {
      id: "audit_append_not_enabled_now",
      passed:
        snapshot.auditPolicy.auditAppendAllowedNow === false &&
        snapshot.auditEvents.every((event) => event.appendAllowedNow === false) &&
        snapshot.totals.auditAppendAllowedNow === 0 &&
        snapshot.totals.databaseWriteAllowedNow === 0,
      evidence: JSON.stringify(snapshot.totals),
    },
    {
      id: "routes_remain_blocked_423",
      passed:
        snapshot.auditPolicy.routesStayBlockedNow === true &&
        snapshot.auditPolicy.expectedCurrentStatusCode === 423 &&
        snapshot.totals.fakeSuccessAllowedNow === 0,
      evidence: JSON.stringify(snapshot.auditPolicy),
    },
    {
      id: "no_provider_wallet_money",
      passed:
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
    stage: "event_audit_gate_source_only_contract_planning_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "event_audit_gate_contract_smoke_passed" : "event_audit_gate_contract_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
