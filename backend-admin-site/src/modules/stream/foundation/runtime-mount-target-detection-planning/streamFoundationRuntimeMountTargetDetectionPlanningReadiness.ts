import { getStreamFoundationRuntimeMountTargetDetectionPlanningSnapshot } from "./streamFoundationRuntimeMountTargetDetectionPlanning";

export function getStreamFoundationRuntimeMountTargetDetectionPlanningReadiness() {
  const snapshot = getStreamFoundationRuntimeMountTargetDetectionPlanningSnapshot();

  const previousEvidenceReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-143L" &&
    snapshot.postVerificationHandoffEvidence143L.runtimeMountPrerequisiteContractsClosed === true &&
    snapshot.postVerificationHandoffEvidence143L.closedPrerequisiteArtifacts === 3 &&
    snapshot.postVerificationHandoffEvidence143L.targetDetectionPlanningItems === 8 &&
    snapshot.postVerificationHandoffEvidence143L.compilePassed === true &&
    snapshot.postVerificationHandoffEvidence143L.scopeLimitedToStreamFoundation === true &&
    snapshot.postVerificationHandoffEvidence143L.migrationClean === true &&
    snapshot.postVerificationHandoffEvidence143L.runtimePostPerformed === 0 &&
    snapshot.postVerificationHandoffEvidence143L.runtimeDbReadPerformed === 0 &&
    snapshot.postVerificationHandoffEvidence143L.runtimeDbWritePerformed === 0 &&
    snapshot.postVerificationHandoffEvidence143L.providerCallPerformed === 0 &&
    snapshot.postVerificationHandoffEvidence143L.providerSecretReadPerformed === 0 &&
    snapshot.postVerificationHandoffEvidence143L.realtimeSocketOpenPerformed === 0 &&
    snapshot.postVerificationHandoffEvidence143L.realtimeBroadcastPerformed === 0 &&
    snapshot.postVerificationHandoffEvidence143L.moderationBypassPerformed === 0 &&
    snapshot.postVerificationHandoffEvidence143L.runtimeMountPerformed === 0 &&
    snapshot.postVerificationHandoffEvidence143L.routeBehaviorChangePerformed === 0 &&
    snapshot.postVerificationHandoffEvidence143L.fakeSuccessAllowed === false;

  const planningReady =
    snapshot.detectionDecision.targetDetectionPlanningAllowed === true &&
    snapshot.detectionDecision.targetDetectionContractsScaffoldAllowedNext === true &&
    snapshot.detectionDecision.actualTargetScanPerformedNow === false &&
    snapshot.detectionDecision.targetFileWriteAllowedNow === false &&
    snapshot.detectionDecision.markerWriteAllowedNow === false &&
    snapshot.detectionDecision.runtimeMountAllowedNow === false &&
    snapshot.detectionDecision.routeBehaviorChangeAllowedNow === false &&
    snapshot.detectionDecision.liveWriteRoutesMustRemain423Blocked === true &&
    snapshot.candidateTargets.length === 5 &&
    snapshot.candidateTargets.every((target) => target.writeAllowedNow === false) &&
    snapshot.candidateTargets.every((target) => target.runtimeMountAllowedNow === false) &&
    snapshot.candidateTargets.every((target) => target.routeBehaviorChangeAllowedNow === false) &&
    snapshot.mountMarkers.length === 6 &&
    snapshot.mountMarkers.every((marker) => marker.sourceOnlyNow === true) &&
    snapshot.mountMarkers.every((marker) => marker.markerWriteAllowedNow === false) &&
    snapshot.mountMarkers.every((marker) => marker.targetWriteAllowedNow === false) &&
    snapshot.mountMarkers.every((marker) => marker.fakeSuccessAllowedNow === false) &&
    snapshot.detectionPlanningItems.length === 8 &&
    snapshot.detectionPlanningItems.every((item) => item.sourceOnlyNow === true) &&
    snapshot.detectionPlanningItems.every((item) => item.targetFileWriteAllowedNow === false) &&
    snapshot.detectionPlanningItems.every((item) => item.runtimePostAllowedNow === false) &&
    snapshot.detectionPlanningItems.every((item) => item.runtimeMountAllowedNow === false) &&
    snapshot.detectionPlanningItems.every((item) => item.routeBehaviorChangeAllowedNow === false) &&
    snapshot.detectionPlanningItems.every((item) => item.targetRouteWriteAllowedNow === false) &&
    snapshot.detectionPlanningItems.every((item) => item.fakeSuccessAllowedNow === false);

  const nextApprovalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore143N === true &&
    snapshot.nextApprovalPolicy.nextStageIsRuntimeMountTargetDetectionContractsScaffold === true &&
    snapshot.nextApprovalPolicy.sourceScopeMustStayUnderStreamFoundation === true &&
    snapshot.nextApprovalPolicy.targetWriteAllowedFor143N === false &&
    snapshot.nextApprovalPolicy.appTsWriteAllowedFor143N === false &&
    snapshot.nextApprovalPolicy.serverTsWriteAllowedFor143N === false &&
    snapshot.nextApprovalPolicy.streamIndexWriteAllowedFor143N === false &&
    snapshot.nextApprovalPolicy.runtimeMountAllowedFor143N === false &&
    snapshot.nextApprovalPolicy.routeBehaviorChangeAllowedFor143N === false &&
    snapshot.nextApprovalPolicy.targetRouteWriteAllowedFor143N === false &&
    snapshot.nextApprovalPolicy.fakeSuccessAllowedFor143N === false &&
    snapshot.requiredExactApprovalTextFor143N.includes("BACKEND-STREAM-FOUNDATION-143N") &&
    snapshot.requiredExactApprovalTextFor143N.includes("target detection contracts") &&
    snapshot.requiredExactApprovalTextFor143N.includes("no target route write") &&
    snapshot.requiredExactApprovalTextFor143N.includes("no fake success");

  const safetyReady =
    snapshot.safety.sourceOnly143M === true &&
    snapshot.safety.targetWriteBy143M === false &&
    snapshot.safety.appTsChangeBy143M === false &&
    snapshot.safety.serverTsChangeBy143M === false &&
    snapshot.safety.streamIndexChangeBy143M === false &&
    snapshot.safety.prismaSchemaChangeBy143M === false &&
    snapshot.safety.migrationCreatedBy143M === false &&
    snapshot.safety.routeBehaviorChangeBy143M === false &&
    snapshot.safety.backendRestartBy143M === false &&
    snapshot.safety.runtimePostBy143M === false &&
    snapshot.safety.providerCallBy143M === false &&
    snapshot.safety.runtimeMountBy143M === false &&
    snapshot.safety.targetRouteWriteBy143M === false &&
    snapshot.safety.fakeSuccessBy143M === false;

  const ready = previousEvidenceReady && planningReady && nextApprovalReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "runtime_mount_target_detection_planning_ready" : "runtime_mount_target_detection_planning_blocked",
    candidateTargets: snapshot.candidateTargets.length,
    mountMarkers: snapshot.mountMarkers.length,
    detectionPlanningItems: snapshot.detectionPlanningItems.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-143N controlled runtime mount target detection contracts scaffold source-only after exact approval",
  } as const;
}
