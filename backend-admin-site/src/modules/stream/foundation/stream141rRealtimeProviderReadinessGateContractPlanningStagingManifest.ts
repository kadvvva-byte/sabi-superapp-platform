import { getStreamFoundationRealtimeProviderReadinessGateContractPlanningSnapshot } from "./realtime-provider-readiness-gate-contract-planning";

export const STREAM_141R_REALTIME_PROVIDER_READINESS_GATE_CONTRACT_PLANNING_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-141R",
  stage: "realtime_provider_readiness_gate_source_only_contract_planning",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousStage: "BACKEND-STREAM-FOUNDATION-141Q",
  currentRouteFreeze: {
    routesStayBlocked: true,
    expectedCurrentStatusCode: 423,
    runtimeSuccessAllowedNow: false,
    fakeSuccessAllowedNow: false,
  },
  forbidden: {
    appTsChangeBy141R: false,
    serverTsChangeBy141R: false,
    streamIndexChangeBy141R: false,
    backendRestartBy141R: false,
    runtimeHttpBy141R: false,
    runtimePostBy141R: false,
    databaseWriteBy141R: false,
    providerCallBy141R: false,
    providerSecretReadBy141R: false,
    walletMutationBy141R: false,
    paymentAuthorizationBy141R: false,
    monthlyPayoutBy141R: false,
    moneyMovementBy141R: false,
    fakeSuccessBy141R: false,
  },
  snapshot: getStreamFoundationRealtimeProviderReadinessGateContractPlanningSnapshot(),
} as const;
