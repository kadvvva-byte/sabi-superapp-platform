import { getStreamFoundationRuntimeMountTargetPatchPackageDraftPlanningSnapshot } from "./streamFoundationRuntimeMountTargetPatchPackageDraftPlanning";

export function getStreamFoundationRuntimeMountTargetPatchPackageDraftPlanningReadiness() {
  const snapshot = getStreamFoundationRuntimeMountTargetPatchPackageDraftPlanningSnapshot();

  const previousReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-143X" &&
    snapshot.postVerificationHandoffEvidence143X.targetPatchReviewPackagePlanningClosed === true &&
    snapshot.postVerificationHandoffEvidence143X.closedPatchReviewArtifacts === 2 &&
    snapshot.postVerificationHandoffEvidence143X.targetPatchPackageDraftPlanningAllowedNext === true &&
    snapshot.postVerificationHandoffEvidence143X.tscExitCode === 0 &&
    snapshot.postVerificationHandoffEvidence143X.sourceModificationPerformed === 0 &&
    snapshot.postVerificationHandoffEvidence143X.sourceTargetWritePerformed === 0 &&
    snapshot.postVerificationHandoffEvidence143X.runtimePostPerformed === 0 &&
    snapshot.postVerificationHandoffEvidence143X.runtimeMountPerformed === 0 &&
    snapshot.postVerificationHandoffEvidence143X.routeBehaviorChangePerformed === 0 &&
    snapshot.postVerificationHandoffEvidence143X.targetRouteWritePerformed === 0 &&
    snapshot.postVerificationHandoffEvidence143X.fakeSuccessAllowed === false;

  const draftReady =
    snapshot.draftPreview.sourceOnlyContract === true &&
    snapshot.draftPreview.draftSections.length === 9 &&
    snapshot.draftPreview.draftPackageCreatedNow === false &&
    snapshot.draftPreview.proposedDiffRenderedNow === false &&
    snapshot.draftPreview.proposedDiffAppliedNow === false &&
    snapshot.draftPreview.sourceTargetWriteAllowedNow === false &&
    snapshot.draftPreview.targetPatchAllowedNow === false &&
    snapshot.draftPreview.targetRouteWriteAllowedNow === false &&
    snapshot.draftPreview.runtimeMountAllowedNow === false &&
    snapshot.draftPreview.fakeSuccessAllowedNow === false;

  const proposalReady =
    snapshot.selectedTargetCandidateProposal.sourceOnlyContract === true &&
    snapshot.selectedTargetCandidateProposal.candidates.length === 6 &&
    snapshot.selectedTargetCandidateProposal.proposalOnly === true &&
    snapshot.selectedTargetCandidateProposal.finalSelectedTargetNow === null &&
    snapshot.selectedTargetCandidateProposal.targetPatchAllowedNow === false &&
    snapshot.selectedTargetCandidateProposal.targetRouteWriteAllowedNow === false &&
    snapshot.selectedTargetCandidateProposal.runtimeMountAllowedNow === false &&
    snapshot.selectedTargetCandidateProposal.candidates.every((candidate) => candidate.selectedForWriteNow === false) &&
    snapshot.selectedTargetCandidateProposal.candidates.every((candidate) => candidate.targetPatchAllowedNow === false) &&
    snapshot.selectedTargetCandidateProposal.candidates.every((candidate) => candidate.targetRouteWriteAllowedNow === false);

  const gatesReady =
    snapshot.proposedDiffPreviewPlan.diffPreviewRenderedNow === false &&
    snapshot.proposedDiffPreviewPlan.proposedDiffAppliedNow === false &&
    snapshot.insertionMarkerConfirmationPlan.markerConfirmedNow === false &&
    snapshot.insertionMarkerConfirmationPlan.markerWriteAllowedNow === false &&
    snapshot.duplicateMountRiskEvidencePlan.duplicateMountRiskDecisionNow === "not_evaluated_in_143y" &&
    snapshot.duplicateMountRiskEvidencePlan.duplicateMountAllowedNow === false &&
    snapshot.authBoundaryPreservationPlan.authBoundaryChangeAllowedNow === false &&
    snapshot.authBoundaryPreservationPlan.authBypassAllowedNow === false &&
    snapshot.blockedRoutePreservationPlan.expectedStatusCodeBeforeRuntimeMount === 423 &&
    snapshot.blockedRoutePreservationPlan.liveWriteRoutesMustRemain423Blocked === true &&
    snapshot.blockedRoutePreservationPlan.liveSuccessAllowedNow === false &&
    snapshot.blockedRoutePreservationPlan.fakeSuccessAllowedNow === false &&
    snapshot.rollbackPreviewPlan.rollbackPreviewCreatedNow === false &&
    snapshot.rollbackPreviewPlan.rollbackExecutionAllowedNow === false &&
    snapshot.compileGate.compileRunBy143YNow === false &&
    snapshot.compileGate.sourceModificationAllowedNow === false &&
    snapshot.ownerApprovalGate.exactOwnerApprovalRequiredBeforeDraftPackageBuild === true &&
    snapshot.ownerApprovalGate.exactOwnerApprovalRequiredBeforeTargetPatchWrite === true &&
    snapshot.ownerApprovalGate.exactOwnerApprovalRequiredBeforeRuntimeMount === true &&
    snapshot.ownerApprovalGate.exactOwnerApprovalRequiredBeforePostMountSmoke === true &&
    snapshot.ownerApprovalGate.draftPackageBuildAllowedNow === false &&
    snapshot.ownerApprovalGate.targetPatchAllowedNow === false &&
    snapshot.ownerApprovalGate.runtimeMountAllowedNow === false;

  const nextApprovalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore143Z === true &&
    snapshot.nextApprovalPolicy.nextStageIsOpsOnlyCompileAndSafetyVerification === true &&
    snapshot.nextApprovalPolicy.sourceModificationAllowedFor143Z === false &&
    snapshot.nextApprovalPolicy.runtimePostAllowedFor143Z === false &&
    snapshot.nextApprovalPolicy.runtimeMountAllowedFor143Z === false &&
    snapshot.nextApprovalPolicy.routeBehaviorChangeAllowedFor143Z === false &&
    snapshot.nextApprovalPolicy.targetRouteWriteAllowedFor143Z === false &&
    snapshot.nextApprovalPolicy.fakeSuccessAllowedFor143Z === false &&
    snapshot.requiredExactApprovalTextFor143Z.includes("BACKEND-STREAM-FOUNDATION-143Z") &&
    snapshot.requiredExactApprovalTextFor143Z.includes("compile and safety verification") &&
    snapshot.requiredExactApprovalTextFor143Z.includes("no target route write") &&
    snapshot.requiredExactApprovalTextFor143Z.includes("no fake success");

  const safetyReady =
    snapshot.safety.sourceOnly143Y === true &&
    snapshot.safety.targetWriteBy143Y === false &&
    snapshot.safety.appTsChangeBy143Y === false &&
    snapshot.safety.serverTsChangeBy143Y === false &&
    snapshot.safety.streamIndexChangeBy143Y === false &&
    snapshot.safety.prismaSchemaChangeBy143Y === false &&
    snapshot.safety.migrationCreatedBy143Y === false &&
    snapshot.safety.routeBehaviorChangeBy143Y === false &&
    snapshot.safety.backendRestartBy143Y === false &&
    snapshot.safety.runtimePostBy143Y === false &&
    snapshot.safety.providerCallBy143Y === false &&
    snapshot.safety.runtimeMountBy143Y === false &&
    snapshot.safety.targetRouteWriteBy143Y === false &&
    snapshot.safety.fakeSuccessBy143Y === false;

  const ready = previousReady && draftReady && proposalReady && gatesReady && nextApprovalReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "runtime_mount_target_patch_package_draft_planning_ready" : "runtime_mount_target_patch_package_draft_planning_blocked",
    candidateProposals: snapshot.selectedTargetCandidateProposal.candidates.length,
    draftSections: snapshot.draftPreview.draftSections.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-143Z controlled runtime mount target patch package draft planning compile and safety verification ops-only after exact approval",
  } as const;
}
