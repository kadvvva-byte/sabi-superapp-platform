import { getStreamFoundationRepositoryGateContractPlanningSnapshot } from "./repository-gate-contract-planning";

export const STREAM_141Q_REPOSITORY_GATE_CONTRACT_PLANNING_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-141Q",
  stage: "repository_gate_source_only_contract_planning",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousStage: "BACKEND-STREAM-FOUNDATION-141P",
  currentRouteFreeze: {
    routesStayBlocked: true,
    expectedCurrentStatusCode: 423,
    runtimeSuccessAllowedNow: false,
    fakeSuccessAllowedNow: false,
  },
  forbidden: {
    appTsChangeBy141Q: false,
    serverTsChangeBy141Q: false,
    streamIndexChangeBy141Q: false,
    schemaMigrationBy141Q: false,
    backendRestartBy141Q: false,
    runtimeHttpBy141Q: false,
    runtimePostBy141Q: false,
    databaseReadBy141Q: false,
    databaseWriteBy141Q: false,
    providerCallBy141Q: false,
    walletMutationBy141Q: false,
    paymentAuthorizationBy141Q: false,
    monthlyPayoutBy141Q: false,
    moneyMovementBy141Q: false,
    fakeSuccessBy141Q: false,
  },
  snapshot: getStreamFoundationRepositoryGateContractPlanningSnapshot(),
} as const;
