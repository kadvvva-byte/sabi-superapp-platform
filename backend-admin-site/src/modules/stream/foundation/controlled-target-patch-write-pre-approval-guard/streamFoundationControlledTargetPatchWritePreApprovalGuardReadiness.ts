import { getStreamFoundationControlledTargetPatchWritePreApprovalGuardSnapshot } from "./streamFoundationControlledTargetPatchWritePreApprovalGuard";

export function getStreamFoundationControlledTargetPatchWritePreApprovalGuardReadiness() {
  const snapshot = getStreamFoundationControlledTargetPatchWritePreApprovalGuardSnapshot();

  const guardReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-141G" &&
    snapshot.requestedNextStage === "BACKEND-STREAM-FOUNDATION-141H" &&
    snapshot.userInputAcceptedAsApproval === false &&
    snapshot.requiredExactApprovalText.includes("I approve BACKEND-STREAM-FOUNDATION-141H") &&
    snapshot.requiredExactApprovalText.includes("write src/app.ts and src/modules/stream/index.ts exactly as reviewed") &&
    snapshot.requiredExactApprovalText.includes("no src/server.ts change");

  const allWritesBlocked =
    snapshot.targetWriteAllowedNow === false &&
    snapshot.appTsWriteAllowedNow === false &&
    snapshot.streamIndexWriteAllowedNow === false &&
    snapshot.serverTsWriteAllowedNow === false &&
    snapshot.routeMountAllowedNow === false &&
    snapshot.runtimePostAllowedNow === false &&
    snapshot.runtimeSmokeAllowedNow === false &&
    snapshot.backendRestartAllowedNow === false &&
    snapshot.databaseWriteAllowedNow === false &&
    snapshot.providerCallAllowedNow === false &&
    snapshot.walletMutationAllowedNow === false &&
    snapshot.paymentAuthorizationAllowedNow === false &&
    snapshot.monthlyPayoutAllowedNow === false &&
    snapshot.moneyMovementAllowedNow === false &&
    snapshot.fakeSuccessAllowedNow === false;

  const safetyReady =
    snapshot.safety.sourceOnly === true &&
    snapshot.safety.appTsChange === false &&
    snapshot.safety.serverTsChange === false &&
    snapshot.safety.streamIndexChange === false &&
    snapshot.safety.routeMountNow === false &&
    snapshot.safety.runtimeHttpBy141HPre === false &&
    snapshot.safety.runtimePostBy141HPre === false &&
    snapshot.safety.backendRestart === false &&
    snapshot.safety.databaseWrite === false &&
    snapshot.safety.providerCall === false &&
    snapshot.safety.walletMutation === false &&
    snapshot.safety.moneyMovement === false &&
    snapshot.safety.fakeSuccess === false;

  const ready = guardReady && allWritesBlocked && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "pre_approval_guard_ready_exact_approval_required" : "pre_approval_guard_blocked",
    targetWriteAllowedNow: snapshot.targetWriteAllowedNow,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-141H controlled target patch write package after exact approval",
  } as const;
}
