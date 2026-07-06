import { getStreamFoundationModerationPolicyGateContractPlanningSnapshot } from "./moderation-policy-gate-contract-planning";

export const STREAM_141P_MODERATION_POLICY_GATE_CONTRACT_PLANNING_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-141P",
  stage: "moderation_policy_gate_source_only_contract_planning",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousStage: "BACKEND-STREAM-FOUNDATION-141O",
  currentRouteFreeze: {
    routesStayBlocked: true,
    expectedCurrentStatusCode: 423,
    runtimeSuccessAllowedNow: false,
    fakeSuccessAllowedNow: false,
  },
  forbidden: {
    appTsChangeBy141P: false,
    serverTsChangeBy141P: false,
    streamIndexChangeBy141P: false,
    backendRestartBy141P: false,
    runtimeHttpBy141P: false,
    runtimePostBy141P: false,
    databaseWriteBy141P: false,
    providerCallBy141P: false,
    walletMutationBy141P: false,
    paymentAuthorizationBy141P: false,
    monthlyPayoutBy141P: false,
    moneyMovementBy141P: false,
    fakeSuccessBy141P: false,
  },
  snapshot: getStreamFoundationModerationPolicyGateContractPlanningSnapshot(),
} as const;
