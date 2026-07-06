import { getStreamFoundationRuntimeMountTargetPatchPackageDraftPostVerificationHandoffSnapshot } from "./streamFoundationRuntimeMountTargetPatchPackageDraftPostVerificationHandoff";

export function getStreamFoundationRuntimeMountTargetPatchPackageDraftPostVerificationHandoffReadiness() {
  const snapshot = getStreamFoundationRuntimeMountTargetPatchPackageDraftPostVerificationHandoffSnapshot();

  const verificationReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-143Z" &&
    snapshot.verificationEvidence143Z.ok === true &&
    snapshot.verificationEvidence143Z.scopeLimitedToStreamFoundation === true &&
    snapshot.verificationEvidence143Z.targetReferenceVerificationOk === true &&
    snapshot.verificationEvidence143Z.contractContentPassed === 5 &&
    snapshot.verificationEvidence143Z.contractContentFailed === 0 &&
    snapshot.verificationEvidence143Z.safetyFragmentVerificationOk === true &&
    snapshot.verificationEvidence143Z.migrationVerificationOk === true &&
    snapshot.verificationEvidence143Z.tscExitCode === 0 &&
    snapshot.verificationEvidence143Z.sourceModificationPerformed === 0 &&
    snapshot.verificationEvidence143Z.backendRestartPerformed === 0 &&
    snapshot.verificationEvidence143Z.runtimePostPerformed === 0 &&
    snapshot.verificationEvidence143Z.runtimeMountPerformed === 0 &&
    snapshot.verificationEvidence143Z.routeBehaviorChangePerformed === 0 &&
    snapshot.verificationEvidence143Z.targetRouteWritePerformed === 0 &&
    snapshot.verificationEvidence143Z.fakeSuccessAllowed === false;

  const closedArtifactsReady =
    snapshot.closedDraftPlanningArtifacts.length === 2 &&
    snapshot.closedDraftPlanningArtifacts.every((artifact) => artifact.status === "closed_clean") &&
    snapshot.closedDraftPlanningArtifacts.every((artifact) => artifact.scopeLimitedToStreamFoundation === true) &&
    snapshot.closedDraftPlanningArtifacts.every((artifact) => artifact.targetRouteWritePerformed === 0) &&
    snapshot.closedDraftPlanningArtifacts.every((artifact) => artifact.runtimeMountPerformed === 0) &&
    snapshot.closedDraftPlanningArtifacts.every((artifact) => artifact.fakeSuccessAllowed === false);

  const handoffReady =
    snapshot.handoffDecision.targetPatchPackageDraftPlanningClosed === true &&
    snapshot.handoffDecision.targetPatchDraftPreviewPackagePlanningAllowedNext === true &&
    snapshot.handoffDecision.actualPreviewPackageCreatedNow === false &&
    snapshot.handoffDecision.actualTargetPatchAllowedNow === false &&
    snapshot.handoffDecision.sourceTargetWriteAllowedNow === false &&
    snapshot.handoffDecision.targetRouteWriteAllowedNow === false &&
    snapshot.handoffDecision.runtimeMountAllowedNow === false &&
    snapshot.handoffDecision.routeBehaviorChangeAllowedNow === false &&
    snapshot.handoffDecision.rollbackExecutionAllowedNow === false &&
    snapshot.handoffDecision.postMountSmokeAllowedNow === false &&
    snapshot.handoffDecision.liveWriteRoutesMustRemain423Blocked === true &&
    snapshot.draftPreviewPackagePlanningItems.length === 10 &&
    snapshot.draftPreviewPackagePlanningItems.every((item) => item.sourceOnlyNow === true) &&
    snapshot.draftPreviewPackagePlanningItems.every((item) => item.previewPackageCreatedNow === false) &&
    snapshot.draftPreviewPackagePlanningItems.every((item) => item.sourceTargetWriteAllowedNow === false) &&
    snapshot.draftPreviewPackagePlanningItems.every((item) => item.targetPatchAllowedNow === false) &&
    snapshot.draftPreviewPackagePlanningItems.every((item) => item.targetRouteWriteAllowedNow === false) &&
    snapshot.draftPreviewPackagePlanningItems.every((item) => item.runtimeMountAllowedNow === false) &&
    snapshot.draftPreviewPackagePlanningItems.every((item) => item.fakeSuccessAllowedNow === false);

  const nextApprovalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore144B === true &&
    snapshot.nextApprovalPolicy.nextStageIsTargetPatchDraftPreviewPackagePlanning === true &&
    snapshot.nextApprovalPolicy.sourceScopeMustStayUnderStreamFoundation === true &&
    snapshot.nextApprovalPolicy.sourceTargetWriteAllowedFor144B === false &&
    snapshot.nextApprovalPolicy.targetPatchAllowedFor144B === false &&
    snapshot.nextApprovalPolicy.targetRouteWriteAllowedFor144B === false &&
    snapshot.nextApprovalPolicy.runtimeMountAllowedFor144B === false &&
    snapshot.nextApprovalPolicy.routeBehaviorChangeAllowedFor144B === false &&
    snapshot.nextApprovalPolicy.fakeSuccessAllowedFor144B === false &&
    snapshot.requiredExactApprovalTextFor144B.includes("BACKEND-STREAM-FOUNDATION-144B") &&
    snapshot.requiredExactApprovalTextFor144B.includes("target patch draft preview package") &&
    snapshot.requiredExactApprovalTextFor144B.includes("do not write src/app.ts") &&
    snapshot.requiredExactApprovalTextFor144B.includes("no fake success");

  const safetyReady =
    snapshot.safety.sourceOnly144A === true &&
    snapshot.safety.targetWriteBy144A === false &&
    snapshot.safety.appTsChangeBy144A === false &&
    snapshot.safety.serverTsChangeBy144A === false &&
    snapshot.safety.streamIndexChangeBy144A === false &&
    snapshot.safety.prismaSchemaChangeBy144A === false &&
    snapshot.safety.migrationCreatedBy144A === false &&
    snapshot.safety.routeBehaviorChangeBy144A === false &&
    snapshot.safety.backendRestartBy144A === false &&
    snapshot.safety.runtimePostBy144A === false &&
    snapshot.safety.providerCallBy144A === false &&
    snapshot.safety.runtimeMountBy144A === false &&
    snapshot.safety.targetRouteWriteBy144A === false &&
    snapshot.safety.fakeSuccessBy144A === false;

  const ready = verificationReady && closedArtifactsReady && handoffReady && nextApprovalReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "runtime_mount_target_patch_package_draft_closed_preview_package_planning_ready" : "runtime_mount_target_patch_package_draft_post_verification_handoff_blocked",
    closedDraftPlanningArtifacts: snapshot.closedDraftPlanningArtifacts.length,
    draftPreviewPackagePlanningItems: snapshot.draftPreviewPackagePlanningItems.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-144B controlled runtime mount target patch draft preview package planning source-only after exact approval",
  } as const;
}
