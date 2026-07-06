import { getStreamFoundationRuntimeMountTargetInspectionPostRunHandoffSnapshot } from "./streamFoundationRuntimeMountTargetInspectionPostRunHandoff";

export function getStreamFoundationRuntimeMountTargetInspectionPostRunHandoffReadiness() {
  const snapshot = getStreamFoundationRuntimeMountTargetInspectionPostRunHandoffSnapshot();

  const inspectionEvidenceReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-143Q" &&
    snapshot.inspectionEvidence143Q.ok === true &&
    snapshot.inspectionEvidence143Q.targetReferenceVerificationOk === true &&
    snapshot.inspectionEvidence143Q.migrationVerificationOk === true &&
    snapshot.inspectionEvidence143Q.tscExitCode === 0 &&
    snapshot.inspectionEvidence143Q.candidateTargetInspectionCompleted === true &&
    snapshot.inspectionEvidence143Q.mountMarkerInspectionCompleted === true &&
    snapshot.inspectionEvidence143Q.authBoundaryInspectionCompleted === true &&
    snapshot.inspectionEvidence143Q.streamRouteFactoryInspectionCompleted === true &&
    snapshot.inspectionEvidence143Q.blockedLiveWriteRoutePreservationInspectionCompleted === true &&
    snapshot.inspectionEvidence143Q.rollbackHashPreviewCompleted === true &&
    snapshot.inspectionEvidence143Q.targetDiffPreviewPlanCompleted === true &&
    snapshot.inspectionEvidence143Q.compileGatePlanningCompleted === true &&
    snapshot.inspectionEvidence143Q.sourceModificationPerformed === 0 &&
    snapshot.inspectionEvidence143Q.sourceTargetWritePerformed === 0 &&
    snapshot.inspectionEvidence143Q.runtimePostPerformed === 0 &&
    snapshot.inspectionEvidence143Q.runtimeMountPerformed === 0 &&
    snapshot.inspectionEvidence143Q.routeBehaviorChangePerformed === 0 &&
    snapshot.inspectionEvidence143Q.targetRouteWritePerformed === 0 &&
    snapshot.inspectionEvidence143Q.fakeSuccessAllowed === false;

  const readOnlyEvidenceReady =
    snapshot.readOnlyInspectionEvidence.length === 8 &&
    snapshot.readOnlyInspectionEvidence.every((evidence) => evidence.status === "inspection_clean") &&
    snapshot.readOnlyInspectionEvidence.every((evidence) => evidence.readOnlyOps === true) &&
    snapshot.readOnlyInspectionEvidence.every((evidence) => evidence.sourceModificationPerformed === 0) &&
    snapshot.readOnlyInspectionEvidence.every((evidence) => evidence.sourceTargetWritePerformed === 0) &&
    snapshot.readOnlyInspectionEvidence.every((evidence) => evidence.targetRouteWritePerformed === 0) &&
    snapshot.readOnlyInspectionEvidence.every((evidence) => evidence.runtimeMountPerformed === 0) &&
    snapshot.readOnlyInspectionEvidence.every((evidence) => evidence.routeBehaviorChangePerformed === 0) &&
    snapshot.readOnlyInspectionEvidence.every((evidence) => evidence.fakeSuccessAllowed === false);

  const handoffReady =
    snapshot.handoffDecision.targetInspectionClosed === true &&
    snapshot.handoffDecision.targetDiffReviewPlanningAllowedNext === true &&
    snapshot.handoffDecision.actualTargetPatchAllowedNow === false &&
    snapshot.handoffDecision.sourceTargetWriteAllowedNow === false &&
    snapshot.handoffDecision.runtimeMountAllowedNow === false &&
    snapshot.handoffDecision.routeBehaviorChangeAllowedNow === false &&
    snapshot.handoffDecision.targetRouteWriteAllowedNow === false &&
    snapshot.handoffDecision.rollbackExecutionAllowedNow === false &&
    snapshot.handoffDecision.postMountSmokeAllowedNow === false &&
    snapshot.handoffDecision.liveWriteRoutesMustRemain423Blocked === true &&
    snapshot.targetDiffReviewPlanningItems.length === 8 &&
    snapshot.targetDiffReviewPlanningItems.every((item) => item.sourceOnlyNow === true) &&
    snapshot.targetDiffReviewPlanningItems.every((item) => item.sourceTargetWriteAllowedNow === false) &&
    snapshot.targetDiffReviewPlanningItems.every((item) => item.runtimeHttpAllowedNow === false) &&
    snapshot.targetDiffReviewPlanningItems.every((item) => item.runtimePostAllowedNow === false) &&
    snapshot.targetDiffReviewPlanningItems.every((item) => item.runtimeMountAllowedNow === false) &&
    snapshot.targetDiffReviewPlanningItems.every((item) => item.routeBehaviorChangeAllowedNow === false) &&
    snapshot.targetDiffReviewPlanningItems.every((item) => item.targetRouteWriteAllowedNow === false) &&
    snapshot.targetDiffReviewPlanningItems.every((item) => item.fakeSuccessAllowedNow === false);

  const nextApprovalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore143S === true &&
    snapshot.nextApprovalPolicy.nextStageIsRuntimeMountTargetDiffReviewPlanning === true &&
    snapshot.nextApprovalPolicy.sourceScopeMustStayUnderStreamFoundation === true &&
    snapshot.nextApprovalPolicy.sourceTargetWriteAllowedFor143S === false &&
    snapshot.nextApprovalPolicy.runtimeHttpAllowedFor143S === false &&
    snapshot.nextApprovalPolicy.runtimePostAllowedFor143S === false &&
    snapshot.nextApprovalPolicy.runtimeMountAllowedFor143S === false &&
    snapshot.nextApprovalPolicy.routeBehaviorChangeAllowedFor143S === false &&
    snapshot.nextApprovalPolicy.targetRouteWriteAllowedFor143S === false &&
    snapshot.nextApprovalPolicy.fakeSuccessAllowedFor143S === false &&
    snapshot.requiredExactApprovalTextFor143S.includes("BACKEND-STREAM-FOUNDATION-143S") &&
    snapshot.requiredExactApprovalTextFor143S.includes("target diff review") &&
    snapshot.requiredExactApprovalTextFor143S.includes("do not write src/app.ts") &&
    snapshot.requiredExactApprovalTextFor143S.includes("no fake success");

  const safetyReady =
    snapshot.safety.sourceOnly143R === true &&
    snapshot.safety.targetWriteBy143R === false &&
    snapshot.safety.appTsChangeBy143R === false &&
    snapshot.safety.serverTsChangeBy143R === false &&
    snapshot.safety.streamIndexChangeBy143R === false &&
    snapshot.safety.prismaSchemaChangeBy143R === false &&
    snapshot.safety.migrationCreatedBy143R === false &&
    snapshot.safety.routeBehaviorChangeBy143R === false &&
    snapshot.safety.backendRestartBy143R === false &&
    snapshot.safety.runtimePostBy143R === false &&
    snapshot.safety.providerCallBy143R === false &&
    snapshot.safety.runtimeMountBy143R === false &&
    snapshot.safety.targetRouteWriteBy143R === false &&
    snapshot.safety.fakeSuccessBy143R === false;

  const ready = inspectionEvidenceReady && readOnlyEvidenceReady && handoffReady && nextApprovalReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "runtime_mount_target_inspection_closed_target_diff_review_planning_ready" : "runtime_mount_target_inspection_post_run_handoff_blocked",
    readOnlyInspectionEvidence: snapshot.readOnlyInspectionEvidence.length,
    targetDiffReviewPlanningItems: snapshot.targetDiffReviewPlanningItems.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-143S controlled runtime mount target diff review planning source-only after exact approval",
  } as const;
}
