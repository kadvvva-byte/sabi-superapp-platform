import { getStreamFoundationIdentitySessionGateContractPlanningSnapshot } from "./streamFoundationIdentitySessionGateContractPlanning";

export function getStreamFoundationIdentitySessionGateContractPlanningReadiness() {
  const snapshot = getStreamFoundationIdentitySessionGateContractPlanningSnapshot();

  const identityContractReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-141M" &&
    snapshot.identityRules.length === 8 &&
    snapshot.commandContracts.length === 3 &&
    snapshot.identityRules.every((rule) => rule.requiredBeforeRuntimeMount === true) &&
    snapshot.commandContracts.every((contract) => contract.unifiedUserIdRequiredBeforeRuntime === true) &&
    snapshot.commandContracts.every((contract) => contract.deviceSessionRequiredBeforeRuntime === true) &&
    snapshot.commandContracts.every((contract) => contract.authenticatedActorRequiredBeforeRuntime === true) &&
    snapshot.unifiedIdentityPolicy.unifiedUserIdRequired === true &&
    snapshot.unifiedIdentityPolicy.messengerAndStreamUserIdMustMatchBeforeRuntime === true &&
    snapshot.unifiedIdentityPolicy.displayNameIsNotPrimaryIdentity === true;

  const blockedNow =
    snapshot.currentRouteFreeze.routesStayBlocked === true &&
    snapshot.currentRouteFreeze.expectedCurrentStatusCode === 423 &&
    snapshot.currentRouteFreeze.runtimeSuccessAllowedNow === false &&
    snapshot.currentRouteFreeze.fakeSuccessAllowedNow === false &&
    snapshot.commandContracts.every((contract) => contract.runtimeSuccessAllowedNow === false) &&
    snapshot.commandContracts.every((contract) => contract.anonymousRuntimeAllowedNow === false) &&
    snapshot.commandContracts.every((contract) => contract.mismatchedModuleUserIdAllowedNow === false) &&
    snapshot.totals.readyForRuntimeMountNow === 0 &&
    snapshot.totals.runtimeSuccessAllowedNow === 0 &&
    snapshot.totals.databaseWriteAllowedNow === 0 &&
    snapshot.totals.providerCallAllowedNow === 0 &&
    snapshot.totals.walletMutationAllowedNow === 0 &&
    snapshot.totals.moneyMovementAllowedNow === 0 &&
    snapshot.totals.fakeSuccessAllowedNow === 0;

  const safetyReady =
    snapshot.safety.sourceOnly141N === true &&
    snapshot.safety.appTsChangeBy141N === false &&
    snapshot.safety.serverTsChangeBy141N === false &&
    snapshot.safety.streamIndexChangeBy141N === false &&
    snapshot.safety.backendRestartBy141N === false &&
    snapshot.safety.runtimeHttpBy141N === false &&
    snapshot.safety.runtimePostBy141N === false &&
    snapshot.safety.databaseWriteBy141N === false &&
    snapshot.safety.providerCallBy141N === false &&
    snapshot.safety.walletMutationBy141N === false &&
    snapshot.safety.moneyMovementBy141N === false &&
    snapshot.safety.fakeSuccessBy141N === false;

  const ready = identityContractReady && blockedNow && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "identity_session_gate_contract_ready_routes_remain_blocked" : "identity_session_gate_contract_blocked",
    identityRules: snapshot.identityRules.length,
    commandContracts: snapshot.commandContracts.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-141O rate-limit gate source-only contract planning",
  } as const;
}
