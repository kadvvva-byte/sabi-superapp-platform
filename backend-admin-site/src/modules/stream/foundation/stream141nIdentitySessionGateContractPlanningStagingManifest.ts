import { getStreamFoundationIdentitySessionGateContractPlanningSnapshot } from "./identity-session-gate-contract-planning";

export const STREAM_141N_IDENTITY_SESSION_GATE_CONTRACT_PLANNING_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-141N",
  stage: "identity_session_gate_source_only_contract_planning",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousStage: "BACKEND-STREAM-FOUNDATION-141M",
  currentRouteFreeze: {
    routesStayBlocked: true,
    expectedCurrentStatusCode: 423,
    runtimeSuccessAllowedNow: false,
    fakeSuccessAllowedNow: false,
  },
  forbidden: {
    appTsChangeBy141N: false,
    serverTsChangeBy141N: false,
    streamIndexChangeBy141N: false,
    backendRestartBy141N: false,
    runtimeHttpBy141N: false,
    runtimePostBy141N: false,
    databaseWriteBy141N: false,
    providerCallBy141N: false,
    walletMutationBy141N: false,
    paymentAuthorizationBy141N: false,
    monthlyPayoutBy141N: false,
    moneyMovementBy141N: false,
    fakeSuccessBy141N: false,
  },
  snapshot: getStreamFoundationIdentitySessionGateContractPlanningSnapshot(),
} as const;
