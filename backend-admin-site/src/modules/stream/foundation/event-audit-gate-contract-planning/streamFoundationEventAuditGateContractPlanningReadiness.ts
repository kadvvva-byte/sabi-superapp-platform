import { getStreamFoundationEventAuditGateContractPlanningSnapshot } from "./streamFoundationEventAuditGateContractPlanning";

export function getStreamFoundationEventAuditGateContractPlanningReadiness() {
  const snapshot = getStreamFoundationEventAuditGateContractPlanningSnapshot();

  const contractReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-141R" &&
    snapshot.auditEvents.length === 10 &&
    snapshot.auditEvents.every((event) => event.requiredBeforeRuntimeMount === true) &&
    snapshot.auditEvents.every((event) => event.piiAllowedInAuditNow === false) &&
    snapshot.auditEvents.every((event) => event.rawSecretAllowedInAuditNow === false) &&
    snapshot.auditPolicy.eventAuditRequiredBeforeRuntimeMount === true &&
    snapshot.auditPolicy.immutableAppendRequiredBeforeRuntimeSuccess === true &&
    snapshot.auditPolicy.rawPiiAllowedNow === false &&
    snapshot.auditPolicy.rawSecretAllowedNow === false &&
    snapshot.auditPolicy.rawProviderPayloadAllowedNow === false;

  const blockedNow =
    snapshot.auditPolicy.routesStayBlockedNow === true &&
    snapshot.auditPolicy.expectedCurrentStatusCode === 423 &&
    snapshot.auditPolicy.auditAppendAllowedNow === false &&
    snapshot.auditEvents.every((event) => event.appendAllowedNow === false) &&
    snapshot.auditEvents.every((event) => event.databaseWriteAllowedNow === false) &&
    snapshot.auditEvents.every((event) => event.providerCallAllowedNow === false) &&
    snapshot.auditEvents.every((event) => event.walletMutationAllowedNow === false) &&
    snapshot.auditEvents.every((event) => event.moneyMovementAllowedNow === false) &&
    snapshot.totals.readyForRuntimeMountNow === 0 &&
    snapshot.totals.auditAppendAllowedNow === 0 &&
    snapshot.totals.databaseWriteAllowedNow === 0 &&
    snapshot.totals.providerCallAllowedNow === 0 &&
    snapshot.totals.walletMutationAllowedNow === 0 &&
    snapshot.totals.moneyMovementAllowedNow === 0 &&
    snapshot.totals.fakeSuccessAllowedNow === 0;

  const safetyReady =
    snapshot.safety.sourceOnly141S === true &&
    snapshot.safety.appTsChangeBy141S === false &&
    snapshot.safety.serverTsChangeBy141S === false &&
    snapshot.safety.streamIndexChangeBy141S === false &&
    snapshot.safety.schemaMigrationBy141S === false &&
    snapshot.safety.backendRestartBy141S === false &&
    snapshot.safety.runtimeHttpBy141S === false &&
    snapshot.safety.runtimePostBy141S === false &&
    snapshot.safety.databaseReadBy141S === false &&
    snapshot.safety.databaseWriteBy141S === false &&
    snapshot.safety.providerCallBy141S === false &&
    snapshot.safety.providerSecretReadBy141S === false &&
    snapshot.safety.walletMutationBy141S === false &&
    snapshot.safety.moneyMovementBy141S === false &&
    snapshot.safety.fakeSuccessBy141S === false;

  const ready = contractReady && blockedNow && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "event_audit_gate_contract_ready_routes_remain_blocked" : "event_audit_gate_contract_blocked",
    auditEvents: snapshot.auditEvents.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-141T owner runtime mount approval gate planning",
  } as const;
}
