import { getStreamFoundationLiveWriteHandlerBindingApprovalSnapshot } from "./streamFoundationLiveWriteHandlerBindingApproval";

export function getStreamFoundationLiveWriteHandlerBindingApprovalReadiness() {
  const snapshot = getStreamFoundationLiveWriteHandlerBindingApprovalSnapshot();

  const verificationReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-140Y" &&
    snapshot.handlerDraftsVerified === true &&
    snapshot.verificationItems.length === 3 &&
    snapshot.verificationItems.every((item) => item.expectedBlockedStatusCode === 423) &&
    snapshot.verificationItems.every((item) => item.expectedOk === false) &&
    snapshot.verificationItems.every((item) => item.runtimeMountedNow === false) &&
    snapshot.verificationItems.every((item) => item.runtimePostAllowedNow === false) &&
    snapshot.verificationItems.every((item) => item.databaseWritePerformed === 0) &&
    snapshot.verificationItems.every((item) => item.providerCallPerformed === 0) &&
    snapshot.verificationItems.every((item) => item.walletMutationPerformed === 0) &&
    snapshot.verificationItems.every((item) => item.moneyMovementPerformed === 0) &&
    snapshot.verificationItems.every((item) => item.fakeSuccessAllowed === false);

  const bindingApprovalReady =
    snapshot.bindingApprovalItems.length === 3 &&
    snapshot.bindingApprovalItems.every((item) => item.bindingSourceReady === true) &&
    snapshot.bindingApprovalItems.every((item) => item.appRouteMountAllowedNow === false) &&
    snapshot.bindingApprovalItems.every((item) => item.serverRouteMountAllowedNow === false) &&
    snapshot.bindingApprovalItems.every((item) => item.streamIndexExportAllowedNow === false) &&
    snapshot.bindingApprovalItems.every((item) => item.runtimeSmokeAllowedNow === false) &&
    snapshot.bindingApprovalItems.every((item) => item.requiresExactOwnerApprovalBeforeMount === true);

  const totalsReady =
    snapshot.totals.verifiedHandlers === 3 &&
    snapshot.totals.bindingPlans === 3 &&
    snapshot.totals.runtimeMountAllowedNow === 0 &&
    snapshot.totals.runtimePostAllowedNow === 0 &&
    snapshot.totals.databaseWritePerformed === 0 &&
    snapshot.totals.providerCallPerformed === 0 &&
    snapshot.totals.walletMutationPerformed === 0 &&
    snapshot.totals.moneyMovementPerformed === 0 &&
    snapshot.totals.fakeSuccessAllowed === 0;

  const safetyReady =
    snapshot.safety.sourceOnly === true &&
    snapshot.safety.appTsChange === false &&
    snapshot.safety.serverTsChange === false &&
    snapshot.safety.streamIndexChange === false &&
    snapshot.safety.routeMountNow === false &&
    snapshot.safety.runtimeHttpBy140Z === false &&
    snapshot.safety.runtimePostBy140Z === false &&
    snapshot.safety.backendRestart === false &&
    snapshot.safety.databaseWrite === false &&
    snapshot.safety.providerCall === false &&
    snapshot.safety.walletMutation === false &&
    snapshot.safety.paymentAuthorization === false &&
    snapshot.safety.monthlyPayout === false &&
    snapshot.safety.moneyMovement === false &&
    snapshot.safety.fakeSuccess === false;

  const ready = verificationReady && bindingApprovalReady && totalsReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "live_write_handler_binding_approval_ready_runtime_mount_blocked" : "live_write_handler_binding_approval_blocked",
    verifiedHandlers: snapshot.totals.verifiedHandlers,
    bindingPlans: snapshot.totals.bindingPlans,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-141A controlled source-only route binding plan",
  } as const;
}
