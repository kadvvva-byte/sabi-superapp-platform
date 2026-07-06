import { getStreamFoundationRealtimeProviderReadinessGateContractPlanningSnapshot } from "./streamFoundationRealtimeProviderReadinessGateContractPlanning";

export function getStreamFoundationRealtimeProviderReadinessGateContractPlanningReadiness() {
  const snapshot = getStreamFoundationRealtimeProviderReadinessGateContractPlanningSnapshot();

  const contractReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-141Q" &&
    snapshot.providerContracts.length === 7 &&
    snapshot.providerContracts.every((contract) => contract.requiredBeforeRuntimeMount === true) &&
    snapshot.providerContracts.every((contract) => contract.serverSideOnly === true) &&
    snapshot.providerContracts.every((contract) => contract.mobileSecretAllowed === false) &&
    snapshot.providerPolicy.realtimeProviderRequiredBeforeRuntimeMount === true &&
    snapshot.providerPolicy.mediaSessionProviderRequiredBeforeRuntimeMount === true &&
    snapshot.providerPolicy.providerSecretsServerSideOnly === true &&
    snapshot.providerPolicy.mobileProviderSecretsAllowed === false &&
    snapshot.providerPolicy.fakeProviderFallbackAllowed === false;

  const blockedNow =
    snapshot.providerPolicy.routesStayBlockedNow === true &&
    snapshot.providerPolicy.expectedCurrentStatusCode === 423 &&
    snapshot.providerPolicy.providerLiveAllowedNow === false &&
    snapshot.providerPolicy.providerCallAllowedNow === false &&
    snapshot.providerContracts.every((contract) => contract.providerCallAllowedNow === false) &&
    snapshot.providerContracts.every((contract) => contract.providerLiveAllowedNow === false) &&
    snapshot.providerContracts.every((contract) => contract.fakeProviderSuccessAllowedNow === false) &&
    snapshot.providerContracts.every((contract) => contract.runtimeSuccessAllowedNow === false) &&
    snapshot.totals.readyForRuntimeMountNow === 0 &&
    snapshot.totals.providerConfiguredNow === 0 &&
    snapshot.totals.providerCallAllowedNow === 0 &&
    snapshot.totals.providerLiveAllowedNow === 0 &&
    snapshot.totals.fakeProviderSuccessAllowedNow === 0 &&
    snapshot.totals.runtimeSuccessAllowedNow === 0 &&
    snapshot.totals.databaseWriteAllowedNow === 0 &&
    snapshot.totals.walletMutationAllowedNow === 0 &&
    snapshot.totals.moneyMovementAllowedNow === 0 &&
    snapshot.totals.fakeSuccessAllowedNow === 0;

  const safetyReady =
    snapshot.safety.sourceOnly141R === true &&
    snapshot.safety.appTsChangeBy141R === false &&
    snapshot.safety.serverTsChangeBy141R === false &&
    snapshot.safety.streamIndexChangeBy141R === false &&
    snapshot.safety.backendRestartBy141R === false &&
    snapshot.safety.runtimeHttpBy141R === false &&
    snapshot.safety.runtimePostBy141R === false &&
    snapshot.safety.databaseWriteBy141R === false &&
    snapshot.safety.providerCallBy141R === false &&
    snapshot.safety.providerSecretReadBy141R === false &&
    snapshot.safety.walletMutationBy141R === false &&
    snapshot.safety.moneyMovementBy141R === false &&
    snapshot.safety.fakeSuccessBy141R === false;

  const ready = contractReady && blockedNow && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "realtime_provider_readiness_contract_ready_routes_remain_blocked" : "realtime_provider_readiness_contract_blocked",
    providerContracts: snapshot.providerContracts.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-141S event audit gate source-only contract planning",
  } as const;
}
