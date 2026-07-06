import { getStreamFoundationPostBodyCaptureHandoffSnapshot } from "./streamFoundationPostBodyCaptureHandoff";

export function getStreamFoundationPostBodyCaptureHandoffReadiness() {
  const snapshot = getStreamFoundationPostBodyCaptureHandoffSnapshot();

  const bodyCaptureReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-142V-FIX2" &&
    snapshot.bodyCapture142VFix2.ok === true &&
    snapshot.bodyCapture142VFix2.passedRoutes === 3 &&
    snapshot.bodyCapture142VFix2.failedRoutes === 0 &&
    snapshot.bodyCapture142VFix2.jsonBlockedEnvelopeRoutes === 3 &&
    snapshot.bodyCapture142VFix2.emptyBodyRoutes === 0 &&
    snapshot.bodyCapture142VFix2.allRoutesReturned423 === true &&
    snapshot.bodyCapture142VFix2.allRoutesNoFakeSuccess === true &&
    snapshot.bodyCapture142VFix2.conclusion === "all_routes_return_json_blocked_envelopes" &&
    snapshot.bodyCapture142VFix2.tscExitCode === 0 &&
    snapshot.bodyCapture142VFix2.databaseWritePerformed === 0 &&
    snapshot.bodyCapture142VFix2.providerCallPerformed === 0 &&
    snapshot.bodyCapture142VFix2.walletMutationPerformed === 0 &&
    snapshot.bodyCapture142VFix2.moneyMovementPerformed === 0 &&
    snapshot.bodyCapture142VFix2.fakeSuccessAllowed === false &&
    snapshot.routeResults.length === 3 &&
    snapshot.routeResults.every((route) => route.actualStatusCode === 423) &&
    snapshot.routeResults.every((route) => route.bodyIsEmpty === false) &&
    snapshot.routeResults.every((route) => route.jsonBlockedEnvelopePresent === true) &&
    snapshot.routeResults.every((route) => route.jsonSafetyFlagsOk === true);

  const handoffReady =
    snapshot.handoffDecision.blockedEnvelopeBodyPatchNeeded === false &&
    snapshot.handoffDecision.targetPatchForEnvelopeBodyNeeded === false &&
    snapshot.handoffDecision.continueFoundationWork === true &&
    snapshot.handoffDecision.preserve423BlockedUntilRuntimeMountApproval === true &&
    snapshot.handoffDecision.sourceShapeCorrect === true &&
    snapshot.handoffDecision.responseBodyCaptureCorrect === true &&
    snapshot.handoffDecision.noFakeSuccessObserved === true &&
    snapshot.handoffDecision.noProviderOrWalletObserved === true &&
    snapshot.handoffDecision.noMoneyMovementObserved === true;

  const approvalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore142X === true &&
    snapshot.nextApprovalPolicy.nextStageIsSourceOnlyPlanning === true &&
    snapshot.nextApprovalPolicy.nextStageMayPlanNextLiveRuntimeFoundationBatch === true &&
    snapshot.nextApprovalPolicy.targetWriteAllowedFor142X === false &&
    snapshot.nextApprovalPolicy.routeBehaviorChangeAllowedFor142X === false &&
    snapshot.requiredExactApprovalTextFor142X.includes("BACKEND-STREAM-FOUNDATION-142X") &&
    snapshot.requiredExactApprovalTextFor142X.includes("source-only") &&
    snapshot.requiredExactApprovalTextFor142X.includes("do not write src/app.ts") &&
    snapshot.requiredExactApprovalTextFor142X.includes("no runtime POST") &&
    snapshot.requiredExactApprovalTextFor142X.includes("no DB write") &&
    snapshot.requiredExactApprovalTextFor142X.includes("no provider call") &&
    snapshot.requiredExactApprovalTextFor142X.includes("no Wallet mutation") &&
    snapshot.requiredExactApprovalTextFor142X.includes("no fake success");

  const safetyReady =
    snapshot.safety.sourceOnly142W === true &&
    snapshot.safety.targetWriteBy142W === false &&
    snapshot.safety.appTsChangeBy142W === false &&
    snapshot.safety.serverTsChangeBy142W === false &&
    snapshot.safety.streamIndexChangeBy142W === false &&
    snapshot.safety.backendRestartBy142W === false &&
    snapshot.safety.runtimeHttpBy142W === false &&
    snapshot.safety.runtimePostBy142W === false &&
    snapshot.safety.databaseReadBy142W === false &&
    snapshot.safety.databaseWriteBy142W === false &&
    snapshot.safety.providerCallBy142W === false &&
    snapshot.safety.walletMutationBy142W === false &&
    snapshot.safety.moneyMovementBy142W === false &&
    snapshot.safety.fakeSuccessBy142W === false;

  const ready = bodyCaptureReady && handoffReady && approvalReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "post_body_capture_handoff_ready" : "post_body_capture_handoff_blocked",
    blockedJsonEnvelopeRoutes: snapshot.bodyCapture142VFix2.jsonBlockedEnvelopeRoutes,
    envelopePatchNeeded: snapshot.handoffDecision.targetPatchForEnvelopeBodyNeeded,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-142X controlled next live-runtime foundation planning package source-only after exact approval",
  } as const;
}
