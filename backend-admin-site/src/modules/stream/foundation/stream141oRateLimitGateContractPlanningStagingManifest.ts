import { getStreamFoundationRateLimitGateContractPlanningSnapshot } from "./rate-limit-gate-contract-planning";

export const STREAM_141O_RATE_LIMIT_GATE_CONTRACT_PLANNING_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-141O",
  stage: "rate_limit_gate_source_only_contract_planning",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousStage: "BACKEND-STREAM-FOUNDATION-141N",
  currentRouteFreeze: {
    routesStayBlocked: true,
    expectedCurrentStatusCode: 423,
    runtimeSuccessAllowedNow: false,
    fakeSuccessAllowedNow: false,
  },
  forbidden: {
    appTsChangeBy141O: false,
    serverTsChangeBy141O: false,
    streamIndexChangeBy141O: false,
    backendRestartBy141O: false,
    runtimeHttpBy141O: false,
    runtimePostBy141O: false,
    databaseWriteBy141O: false,
    providerCallBy141O: false,
    walletMutationBy141O: false,
    paymentAuthorizationBy141O: false,
    monthlyPayoutBy141O: false,
    moneyMovementBy141O: false,
    fakeSuccessBy141O: false,
  },
  snapshot: getStreamFoundationRateLimitGateContractPlanningSnapshot(),
} as const;
