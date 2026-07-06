import { getStreamFoundationRuntimeMountTargetPatchDraftPreviewPackagePlanningSnapshot } from "./streamFoundationRuntimeMountTargetPatchDraftPreviewPackagePlanning";

export function getStreamFoundationRuntimeMountTargetPatchDraftPreviewPackagePlanningReadiness() {
  const snapshot = getStreamFoundationRuntimeMountTargetPatchDraftPreviewPackagePlanningSnapshot();

  const previousReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-144A" &&
    snapshot.postVerificationHandoffEvidence144A.targetPatchPackageDraftPlanningClosed === true &&
    snapshot.postVerificationHandoffEvidence144A.closedDraftPlanningArtifacts === 2 &&
    snapshot.postVerificationHandoffEvidence144A.targetPatchDraftPreviewPackagePlanningAllowedNext === true &&
    snapshot.postVerificationHandoffEvidence144A.tscExitCode === 0 &&
    snapshot.postVerificationHandoffEvidence144A.sourceModificationPerformed === 0 &&
    snapshot.postVerificationHandoffEvidence144A.sourceTargetWritePerformed === 0 &&
    snapshot.postVerificationHandoffEvidence144A.runtimePostPerformed === 0 &&
    snapshot.postVerificationHandoffEvidence144A.runtimeMountPerformed === 0 &&
    snapshot.postVerificationHandoffEvidence144A.routeBehaviorChangePerformed === 0 &&
    snapshot.postVerificationHandoffEvidence144A.targetRouteWritePerformed === 0 &&
    snapshot.postVerificationHandoffEvidence144A.fakeSuccessAllowed === false;

  const previewReady =
    snapshot.previewPackage.sourceOnlyContract === true &&
    snapshot.previewPackage.previewPackageSections.length === 9 &&
    snapshot.previewPackage.previewPackageCreatedNow === false &&
    snapshot.previewPackage.previewPackageRenderedNow === false &&
    snapshot.previewPackage.proposedDiffAppliedNow === false &&
    snapshot.previewPackage.sourceTargetWriteAllowedNow === false &&
    snapshot.previewPackage.targetPatchAllowedNow === false &&
    snapshot.previewPackage.targetRouteWriteAllowedNow === false &&
    snapshot.previewPackage.runtimeMountAllowedNow === false &&
    snapshot.previewPackage.fakeSuccessAllowedNow === false;

  const snapshotReady =
    snapshot.proposedTargetFileSnapshot.sourceOnlyContract === true &&
    snapshot.proposedTargetFileSnapshot.snapshotItems.length === 6 &&
    snapshot.proposedTargetFileSnapshot.targetSnapshotReadNow === false &&
    snapshot.proposedTargetFileSnapshot.finalSelectedTargetNow === null &&
    snapshot.proposedTargetFileSnapshot.targetPatchAllowedNow === false &&
    snapshot.proposedTargetFileSnapshot.targetRouteWriteAllowedNow === false &&
    snapshot.proposedTargetFileSnapshot.runtimeMountAllowedNow === false &&
    snapshot.proposedTargetFileSnapshot.snapshotItems.every((item) => item.targetFileReadNow === false) &&
    snapshot.proposedTargetFileSnapshot.snapshotItems.every((item) => item.selectedForPatchNow === false) &&
    snapshot.proposedTargetFileSnapshot.snapshotItems.every((item) => item.sourceTargetWriteAllowedNow === false);

  const gatesReady =
    snapshot.proposedDiffPreviewText.diffPreviewTextGeneratedNow === false &&
    snapshot.proposedDiffPreviewText.proposedDiffAppliedNow === false &&
    snapshot.insertionMarkerEvidence.insertionMarkerEvidenceCapturedNow === false &&
    snapshot.insertionMarkerEvidence.markerWriteAllowedNow === false &&
    snapshot.duplicateMountEvidence.duplicateMountEvidenceCapturedNow === false &&
    snapshot.duplicateMountEvidence.duplicateMountAllowedNow === false &&
    snapshot.authBoundaryEvidence.authBoundaryEvidenceCapturedNow === false &&
    snapshot.authBoundaryEvidence.authBypassAllowedNow === false &&
    snapshot.blockedRouteEvidence.expectedStatusCodeBeforeRuntimeMount === 423 &&
    snapshot.blockedRouteEvidence.liveWriteRoutesMustRemain423Blocked === true &&
    snapshot.blockedRouteEvidence.liveSuccessAllowedNow === false &&
    snapshot.blockedRouteEvidence.fakeSuccessAllowedNow === false &&
    snapshot.rollbackPreview.rollbackPreviewTextGeneratedNow === false &&
    snapshot.rollbackPreview.rollbackExecutionAllowedNow === false &&
    snapshot.compileGate.compileRunBy144BNow === false &&
    snapshot.compileGate.sourceModificationAllowedNow === false &&
    snapshot.ownerApprovalGate.exactOwnerApprovalRequiredBeforePreviewPackageBuild === true &&
    snapshot.ownerApprovalGate.exactOwnerApprovalRequiredBeforeTargetPatchWrite === true &&
    snapshot.ownerApprovalGate.exactOwnerApprovalRequiredBeforeRuntimeMount === true &&
    snapshot.ownerApprovalGate.exactOwnerApprovalRequiredBeforePostMountSmoke === true &&
    snapshot.ownerApprovalGate.previewPackageBuildAllowedNow === false &&
    snapshot.ownerApprovalGate.targetPatchAllowedNow === false &&
    snapshot.ownerApprovalGate.runtimeMountAllowedNow === false;

  const nextApprovalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore144C === true &&
    snapshot.nextApprovalPolicy.nextStageIsOpsOnlyCompileAndSafetyVerification === true &&
    snapshot.nextApprovalPolicy.sourceModificationAllowedFor144C === false &&
    snapshot.nextApprovalPolicy.runtimePostAllowedFor144C === false &&
    snapshot.nextApprovalPolicy.runtimeMountAllowedFor144C === false &&
    snapshot.nextApprovalPolicy.routeBehaviorChangeAllowedFor144C === false &&
    snapshot.nextApprovalPolicy.targetRouteWriteAllowedFor144C === false &&
    snapshot.nextApprovalPolicy.fakeSuccessAllowedFor144C === false &&
    snapshot.requiredExactApprovalTextFor144C.includes("BACKEND-STREAM-FOUNDATION-144C") &&
    snapshot.requiredExactApprovalTextFor144C.includes("compile and safety verification") &&
    snapshot.requiredExactApprovalTextFor144C.includes("no target route write") &&
    snapshot.requiredExactApprovalTextFor144C.includes("no fake success");

  const safetyReady =
    snapshot.safety.sourceOnly144B === true &&
    snapshot.safety.targetWriteBy144B === false &&
    snapshot.safety.appTsChangeBy144B === false &&
    snapshot.safety.serverTsChangeBy144B === false &&
    snapshot.safety.streamIndexChangeBy144B === false &&
    snapshot.safety.prismaSchemaChangeBy144B === false &&
    snapshot.safety.migrationCreatedBy144B === false &&
    snapshot.safety.routeBehaviorChangeBy144B === false &&
    snapshot.safety.backendRestartBy144B === false &&
    snapshot.safety.runtimePostBy144B === false &&
    snapshot.safety.providerCallBy144B === false &&
    snapshot.safety.runtimeMountBy144B === false &&
    snapshot.safety.targetRouteWriteBy144B === false &&
    snapshot.safety.fakeSuccessBy144B === false;

  const ready = previousReady && previewReady && snapshotReady && gatesReady && nextApprovalReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "runtime_mount_target_patch_draft_preview_package_planning_ready" : "runtime_mount_target_patch_draft_preview_package_planning_blocked",
    snapshotItems: snapshot.proposedTargetFileSnapshot.snapshotItems.length,
    previewPackageSections: snapshot.previewPackage.previewPackageSections.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-144C controlled runtime mount target patch draft preview package planning compile and safety verification ops-only after exact approval",
  } as const;
}
