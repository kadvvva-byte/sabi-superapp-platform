import { getStreamFoundation144GEvidenceCapturePostVerificationHandoffSnapshot } from "./streamFoundation144GEvidenceCapturePostVerificationHandoff";

export function getStreamFoundation144GEvidenceCapturePostVerificationHandoffReadiness() {
  const snapshot = getStreamFoundation144GEvidenceCapturePostVerificationHandoffSnapshot();

  const verificationReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-144F" &&
    snapshot.verificationEvidence144F.ok === true &&
    snapshot.verificationEvidence144F.scopeLimitedToStreamFoundation === true &&
    snapshot.verificationEvidence144F.targetReferenceVerificationOk === true &&
    snapshot.verificationEvidence144F.contractContentPassed === 5 &&
    snapshot.verificationEvidence144F.contractContentFailed === 0 &&
    snapshot.verificationEvidence144F.safetyFragmentVerificationOk === true &&
    snapshot.verificationEvidence144F.migrationVerificationOk === true &&
    snapshot.verificationEvidence144F.tscExitCode === 0 &&
    snapshot.verificationEvidence144F.sourceModificationPerformed === 0 &&
    snapshot.verificationEvidence144F.backendRestartPerformed === 0 &&
    snapshot.verificationEvidence144F.runtimePostPerformed === 0 &&
    snapshot.verificationEvidence144F.runtimeMountPerformed === 0 &&
    snapshot.verificationEvidence144F.routeBehaviorChangePerformed === 0 &&
    snapshot.verificationEvidence144F.targetRouteWritePerformed === 0 &&
    snapshot.verificationEvidence144F.fakeSuccessAllowed === false;

  const closedArtifactsReady =
    snapshot.closedEvidenceCapturePlanningArtifacts.length === 2 &&
    snapshot.closedEvidenceCapturePlanningArtifacts.every((artifact) => artifact.status === "closed_clean") &&
    snapshot.closedEvidenceCapturePlanningArtifacts.every((artifact) => artifact.scopeLimitedToStreamFoundation === true) &&
    snapshot.closedEvidenceCapturePlanningArtifacts.every((artifact) => artifact.targetRouteWritePerformed === 0) &&
    snapshot.closedEvidenceCapturePlanningArtifacts.every((artifact) => artifact.runtimeMountPerformed === 0) &&
    snapshot.closedEvidenceCapturePlanningArtifacts.every((artifact) => artifact.fakeSuccessAllowed === false);

  const handoffReady =
    snapshot.handoffDecision.targetPatchDraftPreviewEvidenceCapturePlanningClosed === true &&
    snapshot.handoffDecision.evidenceCaptureRunnerApprovalPackageAllowedNext === true &&
    snapshot.handoffDecision.actualRunnerPackageCreatedNow === false &&
    snapshot.handoffDecision.actualEvidenceCapturedNow === false &&
    snapshot.handoffDecision.actualTargetPatchAllowedNow === false &&
    snapshot.handoffDecision.targetFileReadAllowedNow === false &&
    snapshot.handoffDecision.sourceTargetWriteAllowedNow === false &&
    snapshot.handoffDecision.targetRouteWriteAllowedNow === false &&
    snapshot.handoffDecision.runtimeMountAllowedNow === false &&
    snapshot.handoffDecision.routeBehaviorChangeAllowedNow === false &&
    snapshot.handoffDecision.rollbackExecutionAllowedNow === false &&
    snapshot.handoffDecision.postMountSmokeAllowedNow === false &&
    snapshot.handoffDecision.liveWriteRoutesMustRemain423Blocked === true &&
    snapshot.runnerApprovalPlanningItems.length === 10 &&
    snapshot.runnerApprovalPlanningItems.every((item) => item.sourceOnlyNow === true) &&
    snapshot.runnerApprovalPlanningItems.every((item) => item.runnerPackageCreatedNow === false) &&
    snapshot.runnerApprovalPlanningItems.every((item) => item.evidenceCapturedNow === false) &&
    snapshot.runnerApprovalPlanningItems.every((item) => item.targetFileReadAllowedNow === false) &&
    snapshot.runnerApprovalPlanningItems.every((item) => item.targetRouteWriteAllowedNow === false) &&
    snapshot.runnerApprovalPlanningItems.every((item) => item.runtimeMountAllowedNow === false) &&
    snapshot.runnerApprovalPlanningItems.every((item) => item.fakeSuccessAllowedNow === false);

  const nextApprovalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore144H === true &&
    snapshot.nextApprovalPolicy.nextStageIsEvidenceCaptureRunnerApprovalPackage === true &&
    snapshot.nextApprovalPolicy.sourceScopeMustStayUnderStreamFoundation === true &&
    snapshot.nextApprovalPolicy.runnerPackageBuildAllowedFor144H === false &&
    snapshot.nextApprovalPolicy.targetFileReadAllowedFor144H === false &&
    snapshot.nextApprovalPolicy.sourceTargetWriteAllowedFor144H === false &&
    snapshot.nextApprovalPolicy.targetPatchAllowedFor144H === false &&
    snapshot.nextApprovalPolicy.targetRouteWriteAllowedFor144H === false &&
    snapshot.nextApprovalPolicy.runtimeMountAllowedFor144H === false &&
    snapshot.nextApprovalPolicy.routeBehaviorChangeAllowedFor144H === false &&
    snapshot.nextApprovalPolicy.fakeSuccessAllowedFor144H === false &&
    snapshot.requiredExactApprovalTextFor144H.includes("BACKEND-STREAM-FOUNDATION-144H") &&
    snapshot.requiredExactApprovalTextFor144H.includes("evidence capture runner approval package") &&
    snapshot.requiredExactApprovalTextFor144H.includes("without source target writes") &&
    snapshot.requiredExactApprovalTextFor144H.includes("without fake success");

  const safetyReady =
    snapshot.safety.sourceOnly144G === true &&
    snapshot.safety.targetWriteBy144G === false &&
    snapshot.safety.appTsChangeBy144G === false &&
    snapshot.safety.serverTsChangeBy144G === false &&
    snapshot.safety.streamIndexChangeBy144G === false &&
    snapshot.safety.prismaSchemaChangeBy144G === false &&
    snapshot.safety.migrationCreatedBy144G === false &&
    snapshot.safety.routeBehaviorChangeBy144G === false &&
    snapshot.safety.backendRestartBy144G === false &&
    snapshot.safety.runtimePostBy144G === false &&
    snapshot.safety.providerCallBy144G === false &&
    snapshot.safety.runtimeMountBy144G === false &&
    snapshot.safety.targetRouteWriteBy144G === false &&
    snapshot.safety.targetFileReadBy144G === false &&
    snapshot.safety.targetHashCapturedBy144G === false &&
    snapshot.safety.targetExcerptCapturedBy144G === false &&
    snapshot.safety.fakeSuccessBy144G === false;

  const ready = verificationReady && closedArtifactsReady && handoffReady && nextApprovalReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "runtime_mount_target_patch_draft_preview_evidence_capture_closed_runner_approval_package_ready" : "runtime_mount_target_patch_draft_preview_evidence_capture_post_verification_handoff_blocked",
    closedEvidenceCapturePlanningArtifacts: snapshot.closedEvidenceCapturePlanningArtifacts.length,
    runnerApprovalPlanningItems: snapshot.runnerApprovalPlanningItems.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-144H controlled runtime mount target patch draft preview evidence capture runner approval package source-only after exact approval",
  } as const;
}
