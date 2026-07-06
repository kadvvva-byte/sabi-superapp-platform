import { getStreamFoundationEventAuditGateContractPlanningSnapshot } from "./event-audit-gate-contract-planning";

export const STREAM_141S_EVENT_AUDIT_GATE_CONTRACT_PLANNING_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-141S",
  stage: "event_audit_gate_source_only_contract_planning",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousStage: "BACKEND-STREAM-FOUNDATION-141R",
  currentRouteFreeze: {
    routesStayBlocked: true,
    expectedCurrentStatusCode: 423,
    runtimeSuccessAllowedNow: false,
    fakeSuccessAllowedNow: false,
  },
  forbidden: {
    appTsChangeBy141S: false,
    serverTsChangeBy141S: false,
    streamIndexChangeBy141S: false,
    schemaMigrationBy141S: false,
    backendRestartBy141S: false,
    runtimeHttpBy141S: false,
    runtimePostBy141S: false,
    databaseReadBy141S: false,
    databaseWriteBy141S: false,
    providerCallBy141S: false,
    providerSecretReadBy141S: false,
    walletMutationBy141S: false,
    paymentAuthorizationBy141S: false,
    monthlyPayoutBy141S: false,
    moneyMovementBy141S: false,
    fakeSuccessBy141S: false,
  },
  snapshot: getStreamFoundationEventAuditGateContractPlanningSnapshot(),
} as const;
