import { getStreamFoundationRuntimeMountTargetPatchDraftPreviewPackagePostVerificationHandoffSnapshot } from "./streamFoundationRuntimeMountTargetPatchDraftPreviewPackagePostVerificationHandoff";

export function getStreamFoundationRuntimeMountTargetPatchDraftPreviewPackagePostVerificationHandoffReadiness() {
  const snapshot = getStreamFoundationRuntimeMountTargetPatchDraftPreviewPackagePostVerificationHandoffSnapshot();

  const verificationReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-144C" &&
    snapshot.verificationEvidence144C.ok === true &&
    snapshot.verificationEvidence144C.scopeLimitedToStreamFoundation === true &&
    snapshot.verificationEvidence144C.targetReferenceVerificationOk === true &&
    snapshot.verificationEvidence144C.contractContentPassed === 5 &&
    snapshot.verificationEvidence144C.contractContentFailed === 0 &&
    snapshot.verificationEvidence144C.safetyFragmentVerificationOk === true &&
    snapshot.verificationEvidence144C.migrationVerificationOk === true &&
    snapshot.verificationEvidence144C.tscExitCode === 0 &&
    snapshot.verificationEvidence144C.sourceModificationPerformed === 0 &&
    snapshot.verificationEvidence144C.backendRestartPerformed === 0 &&
    snapshot.verificationEvidence144C.runtimePostPerformed === 0 &&
    snapshot.verificationEvidence144C.runtimeMountPerformed === 0 &&
    snapshot.verificationEvidence144C.routeBehaviorChangePerformed === 0 &&
    snapshot.verificationEvidence144C.targetRouteWritePerformed === 0 &&
    snapshot.verificationEvidence144C.fakeSuccessAllowed === false;

  const closedArtifactsReady =
    snapshot.closedPreviewPackagePlanningArtifacts.length === 2 &&
    snapshot.closedPreviewPackagePlanningArtifacts.every((artifact) => artifact.status === "closed_clean") &&
    snapshot.closedPreviewPackagePlanningArtifacts.every((artifact) => artifact.scopeLimitedToStreamFoundation === true) &&
    snapshot.closedPreviewPackagePlanningArtifacts.every((artifact) => artifact.targetRouteWritePerformed === 0) &&
    snapshot.closedPreviewPackagePlanningArtifacts.every((artifact) => artifact.runtimeMountPerformed === 0) &&
    snapshot.closedPreviewPackagePlanningArtifacts.every((artifact) => artifact.fakeSuccessAllowed === false);

  const handoffReady =
    snapshot.handoffDecision.targetPatchDraftPreviewPackagePlanningClosed === true &&
    snapshot.handoffDecision.targetPatchDraftPreviewEvidenceCapturePlanningAllowedNext === true &&
    snapshot.handoffDecision.actualEvidenceCapturedNow === false &&
    snapshot.handoffDecision.actualTargetPatchAllowedNow === false &&
    snapshot.handoffDecision.sourceTargetWriteAllowedNow === false &&
    snapshot.handoffDecision.targetRouteWriteAllowedNow === false &&
    snapshot.handoffDecision.runtimeMountAllowedNow === false &&
    snapshot.handoffDecision.routeBehaviorChangeAllowedNow === false &&
    snapshot.handoffDecision.rollbackExecutionAllowedNow === false &&
    snapshot.handoffDecision.postMountSmokeAllowedNow === false &&
    snapshot.handoffDecision.liveWriteRoutesMustRemain423Blocked === true &&
    snapshot.evidenceCapturePlanningItems.length === 10 &&
    snapshot.evidenceCapturePlanningItems.every((item) => item.sourceOnlyNow === true) &&
    snapshot.evidenceCapturePlanningItems.every((item) => item.evidenceCapturedNow === false) &&
    snapshot.evidenceCapturePlanningItems.every((item) => item.sourceTargetWriteAllowedNow === false) &&
    snapshot.evidenceCapturePlanningItems.every((item) => item.targetPatchAllowedNow === false) &&
    snapshot.evidenceCapturePlanningItems.every((item) => item.targetRouteWriteAllowedNow === false) &&
    snapshot.evidenceCapturePlanningItems.every((item) => item.runtimeMountAllowedNow === false) &&
    snapshot.evidenceCapturePlanningItems.every((item) => item.fakeSuccessAllowedNow === false);

  const nextApprovalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore144E === true &&
    snapshot.nextApprovalPolicy.nextStageIsTargetPatchDraftPreviewEvidenceCapturePlanning === true &&
    snapshot.nextApprovalPolicy.sourceScopeMustStayUnderStreamFoundation === true &&
    snapshot.nextApprovalPolicy.sourceTargetWriteAllowedFor144E === false &&
    snapshot.nextApprovalPolicy.targetPatchAllowedFor144E === false &&
    snapshot.nextApprovalPolicy.targetRouteWriteAllowedFor144E === false &&
    snapshot.nextApprovalPolicy.runtimeMountAllowedFor144E === false &&
    snapshot.nextApprovalPolicy.routeBehaviorChangeAllowedFor144E === false &&
    snapshot.nextApprovalPolicy.fakeSuccessAllowedFor144E === false &&
    snapshot.requiredExactApprovalTextFor144E.includes("BACKEND-STREAM-FOUNDATION-144E") &&
    snapshot.requiredExactApprovalTextFor144E.includes("evidence capture planning") &&
    snapshot.requiredExactApprovalTextFor144E.includes("do not write src/app.ts") &&
    snapshot.requiredExactApprovalTextFor144E.includes("no fake success");

  const safetyReady =
    snapshot.safety.sourceOnly144D === true &&
    snapshot.safety.targetWriteBy144D === false &&
    snapshot.safety.appTsChangeBy144D === false &&
    snapshot.safety.serverTsChangeBy144D === false &&
    snapshot.safety.streamIndexChangeBy144D === false &&
    snapshot.safety.prismaSchemaChangeBy144D === false &&
    snapshot.safety.migrationCreatedBy144D === false &&
    snapshot.safety.routeBehaviorChangeBy144D === false &&
    snapshot.safety.backendRestartBy144D === false &&
    snapshot.safety.runtimePostBy144D === false &&
    snapshot.safety.providerCallBy144D === false &&
    snapshot.safety.runtimeMountBy144D === false &&
    snapshot.safety.targetRouteWriteBy144D === false &&
    snapshot.safety.fakeSuccessBy144D === false;

  const ready = verificationReady && closedArtifactsReady && handoffReady && nextApprovalReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "runtime_mount_target_patch_draft_preview_package_closed_evidence_capture_planning_ready" : "runtime_mount_target_patch_draft_preview_package_post_verification_handoff_blocked",
    closedPreviewPackagePlanningArtifacts: snapshot.closedPreviewPackagePlanningArtifacts.length,
    evidenceCapturePlanningItems: snapshot.evidenceCapturePlanningItems.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-144E controlled runtime mount target patch draft preview evidence capture planning source-only after exact approval",
  } as const;
}
