import { getStreamFoundation144LTargetPatchPlanningSnapshot } from "./stream144lTargetPatchPlanning";

export function getStreamFoundation144LTargetPatchPlanningReadiness() {
  const snapshot = getStreamFoundation144LTargetPatchPlanningSnapshot();

  const evidenceReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-144K" &&
    snapshot.evidenceInputs144K.evidenceRunnerClosed === true &&
    snapshot.evidenceInputs144K.appTsContainsStreamMountEvidence === true &&
    snapshot.evidenceInputs144K.adminRoutesContainsLiveAndBlockedEvidence === true &&
    snapshot.evidenceInputs144K.streamIndexExistsWithHash === true &&
    snapshot.evidenceInputs144K.streamRoutesFileExists === false &&
    snapshot.evidenceInputs144K.streamLiveRoutesFileExists === false &&
    snapshot.evidenceInputs144K.targetPatchDecisionMadeNow === false &&
    snapshot.evidenceInputs144K.targetRouteWritePerformed === 0 &&
    snapshot.evidenceInputs144K.runtimeMountPerformed === 0 &&
    snapshot.evidenceInputs144K.fakeSuccessAllowed === false;

  const missingRouteStrategyReady =
    snapshot.missingRouteFileStrategy.streamRoutesExistsNow === false &&
    snapshot.missingRouteFileStrategy.streamLiveRoutesExistsNow === false &&
    snapshot.missingRouteFileStrategy.createFilesNow === false &&
    snapshot.missingRouteFileStrategy.sourceTargetWriteAllowedNow === false &&
    snapshot.missingRouteFileStrategy.targetRouteWriteAllowedNow === false &&
    snapshot.missingRouteFileStrategy.runtimeMountAllowedNow === false &&
    snapshot.missingRouteFileStrategy.routeBehaviorChangeAllowedNow === false;

  const candidateComparisonReady =
    snapshot.candidateTargetComparison.length === 7 &&
    snapshot.candidateTargetComparison.some((item) => item.id === "src_app_ts" && item.existsNow === true) &&
    snapshot.candidateTargetComparison.some((item) => item.id === "src_server_ts" && item.existsNow === true) &&
    snapshot.candidateTargetComparison.some((item) => item.id === "stream_index_ts" && item.existsNow === true) &&
    snapshot.candidateTargetComparison.some((item) => item.id === "admin_routes_ts" && item.existsNow === true) &&
    snapshot.candidateTargetComparison.some((item) => item.id === "dedicated_stream_routes_option" && item.existsNow === false) &&
    snapshot.candidateTargetComparison.some((item) => item.id === "dedicated_stream_live_routes_option" && item.existsNow === false) &&
    snapshot.candidateTargetComparison.every((item) => item.selectedNow === false) &&
    snapshot.candidateTargetComparison.every((item) => item.patchDecisionMadeNow === false) &&
    snapshot.candidateTargetComparison.every((item) => item.targetRouteWriteAllowedNow === false) &&
    snapshot.candidateTargetComparison.every((item) => item.runtimeMountAllowedNow === false);

  const directionReady =
    snapshot.preferredDirectionPlan.decision === "prefer_dedicated_stream_route_boundary_later" &&
    snapshot.preferredDirectionPlan.targetPatchDecisionMadeNow === false &&
    snapshot.preferredDirectionPlan.sourceTargetWriteAllowedNow === false &&
    snapshot.preferredDirectionPlan.targetRouteWriteAllowedNow === false &&
    snapshot.preferredDirectionPlan.routeBehaviorChangeAllowedNow === false &&
    snapshot.preferredDirectionPlan.runtimeMountAllowedNow === false;

  const planningReady =
    snapshot.planningItems.length === 10 &&
    snapshot.planningItems.every((item) => item.sourceOnlyNow === true) &&
    snapshot.planningItems.every((item) => item.targetPatchDecisionMadeNow === false) &&
    snapshot.planningItems.every((item) => item.sourceTargetWriteAllowedNow === false) &&
    snapshot.planningItems.every((item) => item.createMissingRouteFileAllowedNow === false) &&
    snapshot.planningItems.every((item) => item.targetRouteWriteAllowedNow === false) &&
    snapshot.planningItems.every((item) => item.runtimeMountAllowedNow === false) &&
    snapshot.planningItems.every((item) => item.routeBehaviorChangeAllowedNow === false) &&
    snapshot.planningItems.every((item) => item.fakeSuccessAllowedNow === false);

  const approvalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore144M === true &&
    snapshot.nextApprovalPolicy.nextStageIsCompileAndSafetyVerificationOpsOnly === true &&
    snapshot.nextApprovalPolicy.sourceModificationAllowedFor144M === false &&
    snapshot.nextApprovalPolicy.targetRouteWriteAllowedFor144M === false &&
    snapshot.nextApprovalPolicy.runtimeMountAllowedFor144M === false &&
    snapshot.nextApprovalPolicy.routeBehaviorChangeAllowedFor144M === false &&
    snapshot.nextApprovalPolicy.fakeSuccessAllowedFor144M === false &&
    snapshot.requiredExactApprovalTextFor144M.includes("BACKEND-STREAM-FOUNDATION-144M") &&
    snapshot.requiredExactApprovalTextFor144M.includes("compile and safety verification") &&
    snapshot.requiredExactApprovalTextFor144M.includes("no target route write") &&
    snapshot.requiredExactApprovalTextFor144M.includes("no fake success");

  const safetyReady =
    snapshot.safety.sourceOnly144L === true &&
    snapshot.safety.targetWriteBy144L === false &&
    snapshot.safety.appTsChangeBy144L === false &&
    snapshot.safety.serverTsChangeBy144L === false &&
    snapshot.safety.streamIndexChangeBy144L === false &&
    snapshot.safety.adminRoutesChangeBy144L === false &&
    snapshot.safety.missingRouteFileCreateBy144L === false &&
    snapshot.safety.runtimeMountBy144L === false &&
    snapshot.safety.targetRouteWriteBy144L === false &&
    snapshot.safety.fakeSuccessBy144L === false;

  const ready =
    evidenceReady &&
    missingRouteStrategyReady &&
    candidateComparisonReady &&
    directionReady &&
    planningReady &&
    approvalReady &&
    safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "target_patch_planning_batch_ready_for_compile_verification" : "target_patch_planning_batch_blocked",
    candidatesCompared: snapshot.candidateTargetComparison.length,
    planningItems: snapshot.planningItems.length,
    preferredDirection: snapshot.preferredDirectionPlan.decision,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-144M controlled target patch planning batch compile and safety verification ops-only after exact approval",
  } as const;
}
