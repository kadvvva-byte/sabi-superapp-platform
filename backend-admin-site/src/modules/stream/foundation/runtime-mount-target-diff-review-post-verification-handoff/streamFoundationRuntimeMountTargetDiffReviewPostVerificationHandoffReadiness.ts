import { getStreamFoundationRuntimeMountTargetDiffReviewPostVerificationHandoffSnapshot } from "./streamFoundationRuntimeMountTargetDiffReviewPostVerificationHandoff";

export function getStreamFoundationRuntimeMountTargetDiffReviewPostVerificationHandoffReadiness() {
  const snapshot = getStreamFoundationRuntimeMountTargetDiffReviewPostVerificationHandoffSnapshot();

  const verificationReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-143T" &&
    snapshot.verificationEvidence143T.ok === true &&
    snapshot.verificationEvidence143T.scopeLimitedToStreamFoundation === true &&
    snapshot.verificationEvidence143T.targetReferenceVerificationOk === true &&
    snapshot.verificationEvidence143T.contractContentPassed === 5 &&
    snapshot.verificationEvidence143T.contractContentFailed === 0 &&
    snapshot.verificationEvidence143T.safetyFragmentVerificationOk === true &&
    snapshot.verificationEvidence143T.migrationVerificationOk === true &&
    snapshot.verificationEvidence143T.tscExitCode === 0 &&
    snapshot.verificationEvidence143T.sourceModificationPerformed === 0 &&
    snapshot.verificationEvidence143T.backendRestartPerformed === 0 &&
    snapshot.verificationEvidence143T.runtimePostPerformed === 0 &&
    snapshot.verificationEvidence143T.runtimeMountPerformed === 0 &&
    snapshot.verificationEvidence143T.routeBehaviorChangePerformed === 0 &&
    snapshot.verificationEvidence143T.targetRouteWritePerformed === 0 &&
    snapshot.verificationEvidence143T.fakeSuccessAllowed === false;

  const closedArtifactsReady =
    snapshot.closedTargetDiffReviewArtifacts.length === 2 &&
    snapshot.closedTargetDiffReviewArtifacts.every((artifact) => artifact.status === "closed_clean") &&
    snapshot.closedTargetDiffReviewArtifacts.every((artifact) => artifact.scopeLimitedToStreamFoundation === true) &&
    snapshot.closedTargetDiffReviewArtifacts.every((artifact) => artifact.targetRouteWritePerformed === 0) &&
    snapshot.closedTargetDiffReviewArtifacts.every((artifact) => artifact.runtimeMountPerformed === 0) &&
    snapshot.closedTargetDiffReviewArtifacts.every((artifact) => artifact.fakeSuccessAllowed === false);

  const handoffReady =
    snapshot.handoffDecision.targetDiffReviewPlanningClosed === true &&
    snapshot.handoffDecision.targetPatchReviewPackagePlanningAllowedNext === true &&
    snapshot.handoffDecision.actualTargetPatchAllowedNow === false &&
    snapshot.handoffDecision.sourceTargetWriteAllowedNow === false &&
    snapshot.handoffDecision.targetRouteWriteAllowedNow === false &&
    snapshot.handoffDecision.runtimeMountAllowedNow === false &&
    snapshot.handoffDecision.routeBehaviorChangeAllowedNow === false &&
    snapshot.handoffDecision.rollbackExecutionAllowedNow === false &&
    snapshot.handoffDecision.postMountSmokeAllowedNow === false &&
    snapshot.handoffDecision.liveWriteRoutesMustRemain423Blocked === true &&
    snapshot.patchReviewPackagePlanningItems.length === 9 &&
    snapshot.patchReviewPackagePlanningItems.every((item) => item.sourceOnlyNow === true) &&
    snapshot.patchReviewPackagePlanningItems.every((item) => item.sourceTargetWriteAllowedNow === false) &&
    snapshot.patchReviewPackagePlanningItems.every((item) => item.targetPatchAllowedNow === false) &&
    snapshot.patchReviewPackagePlanningItems.every((item) => item.targetRouteWriteAllowedNow === false) &&
    snapshot.patchReviewPackagePlanningItems.every((item) => item.runtimeMountAllowedNow === false) &&
    snapshot.patchReviewPackagePlanningItems.every((item) => item.fakeSuccessAllowedNow === false);

  const nextApprovalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore143V === true &&
    snapshot.nextApprovalPolicy.nextStageIsTargetPatchReviewPackagePlanning === true &&
    snapshot.nextApprovalPolicy.sourceScopeMustStayUnderStreamFoundation === true &&
    snapshot.nextApprovalPolicy.sourceTargetWriteAllowedFor143V === false &&
    snapshot.nextApprovalPolicy.targetPatchAllowedFor143V === false &&
    snapshot.nextApprovalPolicy.targetRouteWriteAllowedFor143V === false &&
    snapshot.nextApprovalPolicy.runtimeMountAllowedFor143V === false &&
    snapshot.nextApprovalPolicy.routeBehaviorChangeAllowedFor143V === false &&
    snapshot.nextApprovalPolicy.fakeSuccessAllowedFor143V === false &&
    snapshot.requiredExactApprovalTextFor143V.includes("BACKEND-STREAM-FOUNDATION-143V") &&
    snapshot.requiredExactApprovalTextFor143V.includes("target patch review package") &&
    snapshot.requiredExactApprovalTextFor143V.includes("do not write src/app.ts") &&
    snapshot.requiredExactApprovalTextFor143V.includes("no fake success");

  const safetyReady =
    snapshot.safety.sourceOnly143U === true &&
    snapshot.safety.targetWriteBy143U === false &&
    snapshot.safety.appTsChangeBy143U === false &&
    snapshot.safety.serverTsChangeBy143U === false &&
    snapshot.safety.streamIndexChangeBy143U === false &&
    snapshot.safety.prismaSchemaChangeBy143U === false &&
    snapshot.safety.migrationCreatedBy143U === false &&
    snapshot.safety.routeBehaviorChangeBy143U === false &&
    snapshot.safety.backendRestartBy143U === false &&
    snapshot.safety.runtimePostBy143U === false &&
    snapshot.safety.providerCallBy143U === false &&
    snapshot.safety.runtimeMountBy143U === false &&
    snapshot.safety.targetRouteWriteBy143U === false &&
    snapshot.safety.fakeSuccessBy143U === false;

  const ready = verificationReady && closedArtifactsReady && handoffReady && nextApprovalReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "runtime_mount_target_diff_review_closed_patch_review_package_planning_ready" : "runtime_mount_target_diff_review_post_verification_handoff_blocked",
    closedTargetDiffReviewArtifacts: snapshot.closedTargetDiffReviewArtifacts.length,
    patchReviewPackagePlanningItems: snapshot.patchReviewPackagePlanningItems.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-143V controlled runtime mount target patch review package planning source-only after exact approval",
  } as const;
}
