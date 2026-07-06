import { getStreamFoundationBlockedAdapterIntegrationReviewSnapshot } from "./streamFoundationBlockedAdapterIntegrationReview";

export function getStreamFoundationBlockedAdapterIntegrationReviewReadiness() {
  const snapshot = getStreamFoundationBlockedAdapterIntegrationReviewSnapshot();

  const reviewReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-141Y" &&
    snapshot.reviewItems.length === 9 &&
    snapshot.reviewItems.every((item) => item.writeAllowedBy141Z === false) &&
    snapshot.reviewItems.every((item) => item.runtimeBindingAllowedBy141Z === false) &&
    snapshot.reviewItems.every((item) => item.routeBehaviorChangeAllowedBy141Z === false) &&
    snapshot.integrationPolicy.existingBlockedHandlersStayPrimaryNow === true &&
    snapshot.integrationPolicy.adapterIntegrationPlannedOnly === true;

  const blockedNow =
    snapshot.integrationPolicy.routesStayBlockedNow === true &&
    snapshot.integrationPolicy.expectedCurrentStatusCode === 423 &&
    snapshot.integrationPolicy.appTsWriteAllowedNow === false &&
    snapshot.integrationPolicy.serverTsWriteAllowedNow === false &&
    snapshot.integrationPolicy.streamIndexWriteAllowedNow === false &&
    snapshot.integrationPolicy.blockedHandlerWriteAllowedNow === false &&
    snapshot.integrationPolicy.adapterBindingAllowedNow === false &&
    snapshot.integrationPolicy.runtimeSmokeAllowedNow === false &&
    snapshot.integrationPolicy.runtimeSuccessAllowedNow === false &&
    snapshot.integrationPolicy.fakeSuccessAllowedNow === false &&
    snapshot.totals.writeAllowedNow === 0 &&
    snapshot.totals.runtimeBindingAllowedNow === 0 &&
    snapshot.totals.routeBehaviorChangeAllowedNow === 0 &&
    snapshot.totals.runtimeSmokeAllowedNow === 0 &&
    snapshot.totals.runtimeSuccessAllowedNow === 0 &&
    snapshot.totals.databaseWriteAllowedNow === 0 &&
    snapshot.totals.providerCallAllowedNow === 0 &&
    snapshot.totals.walletMutationAllowedNow === 0 &&
    snapshot.totals.moneyMovementAllowedNow === 0 &&
    snapshot.totals.fakeSuccessAllowedNow === 0;

  const safetyReady =
    snapshot.safety.sourceOnly141Z === true &&
    snapshot.safety.appTsChangeBy141Z === false &&
    snapshot.safety.serverTsChangeBy141Z === false &&
    snapshot.safety.streamIndexChangeBy141Z === false &&
    snapshot.safety.liveWriteHandlerChangeBy141Z === false &&
    snapshot.safety.schemaMigrationBy141Z === false &&
    snapshot.safety.backendRestartBy141Z === false &&
    snapshot.safety.runtimeHttpBy141Z === false &&
    snapshot.safety.runtimePostBy141Z === false &&
    snapshot.safety.databaseReadBy141Z === false &&
    snapshot.safety.databaseWriteBy141Z === false &&
    snapshot.safety.providerCallBy141Z === false &&
    snapshot.safety.providerSecretReadBy141Z === false &&
    snapshot.safety.walletMutationBy141Z === false &&
    snapshot.safety.moneyMovementBy141Z === false &&
    snapshot.safety.fakeSuccessBy141Z === false;

  const ready = reviewReady && blockedNow && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "blocked_adapter_integration_review_ready_no_binding" : "blocked_adapter_integration_review_blocked",
    reviewItems: snapshot.reviewItems.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-142A foundation batch compile and safety verification",
  } as const;
}
