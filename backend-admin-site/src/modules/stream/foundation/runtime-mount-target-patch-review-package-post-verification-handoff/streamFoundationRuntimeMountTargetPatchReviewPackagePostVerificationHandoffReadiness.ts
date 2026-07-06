import { getStreamFoundationRuntimeMountTargetPatchReviewPackagePostVerificationHandoffSnapshot } from "./streamFoundationRuntimeMountTargetPatchReviewPackagePostVerificationHandoff";

export function getStreamFoundationRuntimeMountTargetPatchReviewPackagePostVerificationHandoffReadiness() {
  const snapshot = getStreamFoundationRuntimeMountTargetPatchReviewPackagePostVerificationHandoffSnapshot();

  const verificationReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-143W" &&
    snapshot.verificationEvidence143W.ok === true &&
    snapshot.verificationEvidence143W.scopeLimitedToStreamFoundation === true &&
    snapshot.verificationEvidence143W.targetReferenceVerificationOk === true &&
    snapshot.verificationEvidence143W.contractContentPassed === 5 &&
    snapshot.verificationEvidence143W.contractContentFailed === 0 &&
    snapshot.verificationEvidence143W.safetyFragmentVerificationOk === true &&
    snapshot.verificationEvidence143W.migrationVerificationOk === true &&
    snapshot.verificationEvidence143W.tscExitCode === 0 &&
    snapshot.verificationEvidence143W.sourceModificationPerformed === 0 &&
    snapshot.verificationEvidence143W.backendRestartPerformed === 0 &&
    snapshot.verificationEvidence143W.runtimePostPerformed === 0 &&
    snapshot.verificationEvidence143W.runtimeMountPerformed === 0 &&
    snapshot.verificationEvidence143W.routeBehaviorChangePerformed === 0 &&
    snapshot.verificationEvidence143W.targetRouteWritePerformed === 0 &&
    snapshot.verificationEvidence143W.fakeSuccessAllowed === false;

  const closedArtifactsReady =
    snapshot.closedPatchReviewArtifacts.length === 2 &&
    snapshot.closedPatchReviewArtifacts.every((artifact) => artifact.status === "closed_clean") &&
    snapshot.closedPatchReviewArtifacts.every((artifact) => artifact.scopeLimitedToStreamFoundation === true) &&
    snapshot.closedPatchReviewArtifacts.every((artifact) => artifact.targetRouteWritePerformed === 0) &&
    snapshot.closedPatchReviewArtifacts.every((artifact) => artifact.runtimeMountPerformed === 0) &&
    snapshot.closedPatchReviewArtifacts.every((artifact) => artifact.fakeSuccessAllowed === false);

  const handoffReady =
    snapshot.handoffDecision.targetPatchReviewPackagePlanningClosed === true &&
    snapshot.handoffDecision.targetPatchPackageDraftPlanningAllowedNext === true &&
    snapshot.handoffDecision.actualDraftPackageCreatedNow === false &&
    snapshot.handoffDecision.actualTargetPatchAllowedNow === false &&
    snapshot.handoffDecision.sourceTargetWriteAllowedNow === false &&
    snapshot.handoffDecision.targetRouteWriteAllowedNow === false &&
    snapshot.handoffDecision.runtimeMountAllowedNow === false &&
    snapshot.handoffDecision.routeBehaviorChangeAllowedNow === false &&
    snapshot.handoffDecision.rollbackExecutionAllowedNow === false &&
    snapshot.handoffDecision.postMountSmokeAllowedNow === false &&
    snapshot.handoffDecision.liveWriteRoutesMustRemain423Blocked === true &&
    snapshot.targetPatchPackageDraftPlanningItems.length === 10 &&
    snapshot.targetPatchPackageDraftPlanningItems.every((item) => item.sourceOnlyNow === true) &&
    snapshot.targetPatchPackageDraftPlanningItems.every((item) => item.draftPackageCreatedNow === false) &&
    snapshot.targetPatchPackageDraftPlanningItems.every((item) => item.sourceTargetWriteAllowedNow === false) &&
    snapshot.targetPatchPackageDraftPlanningItems.every((item) => item.targetPatchAllowedNow === false) &&
    snapshot.targetPatchPackageDraftPlanningItems.every((item) => item.targetRouteWriteAllowedNow === false) &&
    snapshot.targetPatchPackageDraftPlanningItems.every((item) => item.runtimeMountAllowedNow === false) &&
    snapshot.targetPatchPackageDraftPlanningItems.every((item) => item.fakeSuccessAllowedNow === false);

  const nextApprovalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore143Y === true &&
    snapshot.nextApprovalPolicy.nextStageIsTargetPatchPackageDraftPlanning === true &&
    snapshot.nextApprovalPolicy.sourceScopeMustStayUnderStreamFoundation === true &&
    snapshot.nextApprovalPolicy.sourceTargetWriteAllowedFor143Y === false &&
    snapshot.nextApprovalPolicy.targetPatchAllowedFor143Y === false &&
    snapshot.nextApprovalPolicy.targetRouteWriteAllowedFor143Y === false &&
    snapshot.nextApprovalPolicy.runtimeMountAllowedFor143Y === false &&
    snapshot.nextApprovalPolicy.routeBehaviorChangeAllowedFor143Y === false &&
    snapshot.nextApprovalPolicy.fakeSuccessAllowedFor143Y === false &&
    snapshot.requiredExactApprovalTextFor143Y.includes("BACKEND-STREAM-FOUNDATION-143Y") &&
    snapshot.requiredExactApprovalTextFor143Y.includes("target patch package draft") &&
    snapshot.requiredExactApprovalTextFor143Y.includes("do not write src/app.ts") &&
    snapshot.requiredExactApprovalTextFor143Y.includes("no fake success");

  const safetyReady =
    snapshot.safety.sourceOnly143X === true &&
    snapshot.safety.targetWriteBy143X === false &&
    snapshot.safety.appTsChangeBy143X === false &&
    snapshot.safety.serverTsChangeBy143X === false &&
    snapshot.safety.streamIndexChangeBy143X === false &&
    snapshot.safety.prismaSchemaChangeBy143X === false &&
    snapshot.safety.migrationCreatedBy143X === false &&
    snapshot.safety.routeBehaviorChangeBy143X === false &&
    snapshot.safety.backendRestartBy143X === false &&
    snapshot.safety.runtimePostBy143X === false &&
    snapshot.safety.providerCallBy143X === false &&
    snapshot.safety.runtimeMountBy143X === false &&
    snapshot.safety.targetRouteWriteBy143X === false &&
    snapshot.safety.fakeSuccessBy143X === false;

  const ready = verificationReady && closedArtifactsReady && handoffReady && nextApprovalReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "runtime_mount_target_patch_review_package_closed_draft_planning_ready" : "runtime_mount_target_patch_review_package_post_verification_handoff_blocked",
    closedPatchReviewArtifacts: snapshot.closedPatchReviewArtifacts.length,
    targetPatchPackageDraftPlanningItems: snapshot.targetPatchPackageDraftPlanningItems.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-143Y controlled runtime mount target patch package draft planning source-only after exact approval",
  } as const;
}
