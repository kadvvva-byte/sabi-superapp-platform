import { getStreamFoundationLiveWriteBindingRegistryVerificationSnapshot } from "./streamFoundationLiveWriteBindingRegistryVerification";

export function getStreamFoundationLiveWriteBindingRegistryVerificationReadiness() {
  const snapshot = getStreamFoundationLiveWriteBindingRegistryVerificationSnapshot();

  const verified =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-141A" &&
    snapshot.verificationItems.length === 3 &&
    snapshot.verificationItems.every((item) => item.sourceOnlyBindingPlanPresent === true) &&
    snapshot.verificationItems.every((item) => item.draftHandlerPresent === true) &&
    snapshot.verificationItems.every((item) => item.exactApprovalRequired === true) &&
    snapshot.verificationItems.every((item) => item.expectedBlockedStatusCode === 423);

  const runtimeBlocked =
    snapshot.verificationItems.every((item) => item.appTsMountNow === false) &&
    snapshot.verificationItems.every((item) => item.serverTsMountNow === false) &&
    snapshot.verificationItems.every((item) => item.streamIndexExportNow === false) &&
    snapshot.verificationItems.every((item) => item.runtimePostAllowedNow === false) &&
    snapshot.verificationItems.every((item) => item.runtimeSmokeAllowedNow === false) &&
    snapshot.verificationItems.every((item) => item.backendRestartAllowedNow === false) &&
    snapshot.verificationItems.every((item) => item.databaseWriteAllowedNow === false) &&
    snapshot.verificationItems.every((item) => item.providerCallAllowedNow === false) &&
    snapshot.verificationItems.every((item) => item.walletMutationAllowedNow === false) &&
    snapshot.verificationItems.every((item) => item.moneyMovementAllowedNow === false) &&
    snapshot.verificationItems.every((item) => item.fakeSuccessAllowed === false);

  const safetyReady =
    snapshot.safety.sourceOnly === true &&
    snapshot.safety.appTsChange === false &&
    snapshot.safety.serverTsChange === false &&
    snapshot.safety.streamIndexChange === false &&
    snapshot.safety.routeMountNow === false &&
    snapshot.safety.runtimeHttpBy141B === false &&
    snapshot.safety.runtimePostBy141B === false &&
    snapshot.safety.backendRestart === false &&
    snapshot.safety.databaseWrite === false &&
    snapshot.safety.providerCall === false &&
    snapshot.safety.walletMutation === false &&
    snapshot.safety.moneyMovement === false &&
    snapshot.safety.fakeSuccess === false;

  const ready = verified && runtimeBlocked && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "binding_registry_verification_ready_runtime_mount_blocked" : "binding_registry_verification_blocked",
    verifiedBindings: snapshot.totals.verifiedBindings,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-141C controlled route binding source-only approval package",
  } as const;
}
