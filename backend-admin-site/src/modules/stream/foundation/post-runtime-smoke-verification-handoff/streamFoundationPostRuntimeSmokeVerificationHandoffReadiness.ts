import { getStreamFoundationPostRuntimeSmokeVerificationHandoffSnapshot } from "./streamFoundationPostRuntimeSmokeVerificationHandoff";

export function getStreamFoundationPostRuntimeSmokeVerificationHandoffReadiness() {
  const snapshot = getStreamFoundationPostRuntimeSmokeVerificationHandoffSnapshot();

  const smokeVerified =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-142Q" &&
    snapshot.runtimeSmoke142Q.ok === true &&
    snapshot.runtimeSmoke142Q.status === "controlled_blocked_route_runtime_post_smoke_passed" &&
    snapshot.runtimeSmoke142Q.runtimeHandlerReadinessPassed === 2 &&
    snapshot.runtimeSmoke142Q.runtimeHandlerReadinessFailed === 0 &&
    snapshot.runtimeSmoke142Q.expectedRoutes === 3 &&
    snapshot.runtimeSmoke142Q.attemptedRoutes === 3 &&
    snapshot.runtimeSmoke142Q.passedRoutes === 3 &&
    snapshot.runtimeSmoke142Q.failedRoutes === 0 &&
    snapshot.runtimeSmoke142Q.tscExitCode === 0 &&
    snapshot.runtimeSmokeRoutes.length === 3 &&
    snapshot.runtimeSmokeRoutes.every((route) => route.actualStatusCode === 423) &&
    snapshot.runtimeSmokeRoutes.every((route) => route.statusCodeOk === true) &&
    snapshot.runtimeSmokeRoutes.every((route) => route.forbiddenSuccessFragmentsOk === true) &&
    snapshot.runtimeSmokeRoutes.every((route) => route.ok === true);

  const foundationSafe =
    snapshot.verifiedFoundationState.appRoutesBoundToRuntimeHandlerDraft === true &&
    snapshot.verifiedFoundationState.allThreeLiveWriteRoutesReturn423 === true &&
    snapshot.verifiedFoundationState.noFakeSuccessObserved === true &&
    snapshot.verifiedFoundationState.noProviderCallObserved === true &&
    snapshot.verifiedFoundationState.noWalletMutationObserved === true &&
    snapshot.verifiedFoundationState.noMoneyMovementObserved === true &&
    snapshot.verifiedFoundationState.responseBodiesWereEmptyIn142Q === true &&
    snapshot.verifiedFoundationState.emptyBodyIsFollowUpRequired === true &&
    snapshot.verifiedFoundationState.emptyBodyDoesNotIndicateSuccess === true;

  const nextApprovalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore142S === true &&
    snapshot.nextApprovalPolicy.nextStageIsSourceOnlyPlanning === true &&
    snapshot.nextApprovalPolicy.nextStageMayInspectEnvelopeIssue === true &&
    snapshot.nextApprovalPolicy.nextStageMustPreserve423BlockedStatus === true &&
    snapshot.requiredExactApprovalTextFor142S.includes("BACKEND-STREAM-FOUNDATION-142S") &&
    snapshot.requiredExactApprovalTextFor142S.includes("blocked-response envelope inspection") &&
    snapshot.requiredExactApprovalTextFor142S.includes("HTTP 423 with empty response bodies") &&
    snapshot.requiredExactApprovalTextFor142S.includes("do not write src/app.ts") &&
    snapshot.requiredExactApprovalTextFor142S.includes("no runtime POST") &&
    snapshot.requiredExactApprovalTextFor142S.includes("no DB write") &&
    snapshot.requiredExactApprovalTextFor142S.includes("no fake success");

  const safetyReady =
    snapshot.safety.sourceOnly142R === true &&
    snapshot.safety.targetWriteBy142R === false &&
    snapshot.safety.backendRestartBy142R === false &&
    snapshot.safety.runtimeHttpBy142R === false &&
    snapshot.safety.runtimePostBy142R === false &&
    snapshot.safety.databaseReadBy142R === false &&
    snapshot.safety.databaseWriteBy142R === false &&
    snapshot.safety.providerCallBy142R === false &&
    snapshot.safety.providerSecretReadBy142R === false &&
    snapshot.safety.walletMutationBy142R === false &&
    snapshot.safety.moneyMovementBy142R === false &&
    snapshot.safety.fakeSuccessBy142R === false;

  const ready = smokeVerified && foundationSafe && nextApprovalReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "post_runtime_smoke_handoff_ready" : "post_runtime_smoke_handoff_blocked",
    passedRuntimeRoutes: snapshot.runtimeSmoke142Q.passedRoutes,
    emptyBodyFollowUpRequired: snapshot.verifiedFoundationState.emptyBodyIsFollowUpRequired,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-142S controlled blocked-response envelope inspection and normalization planning after exact approval",
  } as const;
}
