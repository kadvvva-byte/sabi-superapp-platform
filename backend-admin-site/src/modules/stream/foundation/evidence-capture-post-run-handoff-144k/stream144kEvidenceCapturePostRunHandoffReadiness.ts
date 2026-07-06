import { getStreamFoundation144KEvidenceCapturePostRunHandoffSnapshot } from "./stream144kEvidenceCapturePostRunHandoff";

export function getStreamFoundation144KEvidenceCapturePostRunHandoffReadiness() {
  const snapshot = getStreamFoundation144KEvidenceCapturePostRunHandoffSnapshot();

  const evidenceClosed =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-144J-FIX2" &&
    snapshot.evidenceRunner144JClosed.ok === true &&
    snapshot.evidenceRunner144JClosed.status === "ops_only_evidence_capture_runner_completed" &&
    snapshot.evidenceRunner144JClosed.sourceModificationPerformed === 0 &&
    snapshot.evidenceRunner144JClosed.runtimePostPerformed === 0 &&
    snapshot.evidenceRunner144JClosed.runtimeMountPerformed === 0 &&
    snapshot.evidenceRunner144JClosed.routeBehaviorChangePerformed === 0 &&
    snapshot.evidenceRunner144JClosed.targetRouteWritePerformed === 0 &&
    snapshot.evidenceRunner144JClosed.fakeSuccessAllowed === false;

  const targetEvidenceReady =
    snapshot.targetHashEvidence.length === 6 &&
    snapshot.targetHashEvidence.some((item) => item.path === "src/app.ts" && item.availabilityStatus === "exists_with_hash") &&
    snapshot.targetHashEvidence.some((item) => item.path === "src/server.ts" && item.availabilityStatus === "exists_with_hash") &&
    snapshot.targetHashEvidence.some((item) => item.path === "src/modules/stream/index.ts" && item.availabilityStatus === "exists_with_hash") &&
    snapshot.targetHashEvidence.some((item) => item.path === "src/modules/admin/admin.routes.ts" && item.availabilityStatus === "exists_with_hash") &&
    snapshot.targetHashEvidence.some((item) => item.path === "src/modules/stream/infrastructure/routes/stream.routes.ts" && item.availabilityStatus === "missing_currently") &&
    snapshot.targetHashEvidence.some((item) => item.path === "src/modules/stream/infrastructure/routes/stream-live.routes.ts" && item.availabilityStatus === "missing_currently") &&
    snapshot.targetHashEvidence.every((item) => item.evidenceCapturedBy144J === true) &&
    snapshot.targetHashEvidence.every((item) => item.sourceTargetWriteAllowedNow === false) &&
    snapshot.targetHashEvidence.every((item) => item.targetRouteWriteAllowedNow === false);

  const routeEvidenceReady =
    snapshot.missingRouteFiles.length === 2 &&
    snapshot.missingRouteFiles.every((item) => item.exists === false) &&
    snapshot.missingRouteFiles.every((item) => item.createFileAllowedNow === false) &&
    snapshot.missingRouteFiles.every((item) => item.targetRouteWriteAllowedNow === false) &&
    snapshot.routeEvidenceSummary.streamRoutesFileExists === false &&
    snapshot.routeEvidenceSummary.streamLiveRoutesFileExists === false &&
    snapshot.routeEvidenceSummary.adminRoutesContainsLiveAndBlockedEvidence === true &&
    snapshot.routeEvidenceSummary.appTsContainsStreamMountEvidence === true &&
    snapshot.routeEvidenceSummary.routePatchTargetNotSelectedNow === true &&
    snapshot.routeEvidenceSummary.targetPatchDecisionMadeNow === false;

  const nextPlanningReady =
    snapshot.nextTargetPatchPlanningItems.length === 10 &&
    snapshot.nextTargetPatchPlanningItems.every((item) => item.sourceOnlyNow === true) &&
    snapshot.nextTargetPatchPlanningItems.every((item) => item.targetPatchDecisionMadeNow === false) &&
    snapshot.nextTargetPatchPlanningItems.every((item) => item.sourceTargetWriteAllowedNow === false) &&
    snapshot.nextTargetPatchPlanningItems.every((item) => item.createMissingRouteFileAllowedNow === false) &&
    snapshot.nextTargetPatchPlanningItems.every((item) => item.targetRouteWriteAllowedNow === false) &&
    snapshot.nextTargetPatchPlanningItems.every((item) => item.runtimeMountAllowedNow === false) &&
    snapshot.nextTargetPatchPlanningItems.every((item) => item.routeBehaviorChangeAllowedNow === false) &&
    snapshot.nextTargetPatchPlanningItems.every((item) => item.fakeSuccessAllowedNow === false);

  const approvalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore144L === true &&
    snapshot.nextApprovalPolicy.nextStageIsTargetPatchPlanningBatchSourceOnly === true &&
    snapshot.nextApprovalPolicy.sourceTargetWriteAllowedFor144L === false &&
    snapshot.nextApprovalPolicy.createMissingRouteFileAllowedFor144L === false &&
    snapshot.nextApprovalPolicy.targetRouteWriteAllowedFor144L === false &&
    snapshot.nextApprovalPolicy.runtimeMountAllowedFor144L === false &&
    snapshot.nextApprovalPolicy.routeBehaviorChangeAllowedFor144L === false &&
    snapshot.nextApprovalPolicy.fakeSuccessAllowedFor144L === false &&
    snapshot.requiredExactApprovalTextFor144L.includes("BACKEND-STREAM-FOUNDATION-144L") &&
    snapshot.requiredExactApprovalTextFor144L.includes("missing src/modules/stream/infrastructure/routes/stream.routes.ts") &&
    snapshot.requiredExactApprovalTextFor144L.includes("without target route write") &&
    snapshot.requiredExactApprovalTextFor144L.includes("without fake success");

  const safetyReady =
    snapshot.safety.sourceOnly144K === true &&
    snapshot.safety.targetWriteBy144K === false &&
    snapshot.safety.appTsChangeBy144K === false &&
    snapshot.safety.streamIndexChangeBy144K === false &&
    snapshot.safety.adminRoutesChangeBy144K === false &&
    snapshot.safety.missingRouteFileCreateBy144K === false &&
    snapshot.safety.runtimeMountBy144K === false &&
    snapshot.safety.targetRouteWriteBy144K === false &&
    snapshot.safety.fakeSuccessBy144K === false;

  const ready = evidenceClosed && targetEvidenceReady && routeEvidenceReady && nextPlanningReady && approvalReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "ops_only_evidence_capture_closed_next_target_patch_planning_ready" : "ops_only_evidence_capture_post_run_handoff_blocked",
    targetHashEvidenceCount: snapshot.targetHashEvidence.length,
    missingRouteFilesCount: snapshot.missingRouteFiles.length,
    nextPlanningItems: snapshot.nextTargetPatchPlanningItems.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-144L controlled target patch planning batch source-only after exact approval",
  } as const;
}
