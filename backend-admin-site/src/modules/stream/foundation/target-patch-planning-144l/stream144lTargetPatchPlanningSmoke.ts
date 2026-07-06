import { getStreamFoundation144LTargetPatchPlanningSnapshot } from "./stream144lTargetPatchPlanning";
import { getStreamFoundation144LTargetPatchPlanningReadiness } from "./stream144lTargetPatchPlanningReadiness";

export function runStreamFoundation144LTargetPatchPlanningSmoke() {
  const snapshot = getStreamFoundation144LTargetPatchPlanningSnapshot();
  const readiness = getStreamFoundation144LTargetPatchPlanningReadiness();

  const assertions = [
    {
      id: "144k_evidence_inputs_preserved",
      passed:
        snapshot.evidenceInputs144K.evidenceRunnerClosed === true &&
        snapshot.evidenceInputs144K.streamRoutesFileExists === false &&
        snapshot.evidenceInputs144K.streamLiveRoutesFileExists === false &&
        snapshot.evidenceInputs144K.targetPatchDecisionMadeNow === false &&
        snapshot.evidenceInputs144K.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.evidenceInputs144K),
    },
    {
      id: "candidate_targets_compared_without_selection",
      passed:
        snapshot.candidateTargetComparison.length === 7 &&
        snapshot.candidateTargetComparison.every((item) => item.selectedNow === false) &&
        snapshot.candidateTargetComparison.every((item) => item.targetRouteWriteAllowedNow === false) &&
        snapshot.candidateTargetComparison.every((item) => item.runtimeMountAllowedNow === false),
      evidence: JSON.stringify(snapshot.candidateTargetComparison.map((item) => ({ id: item.id, fit: item.fitForRuntimeMount }))),
    },
    {
      id: "missing_stream_route_files_documented",
      passed:
        snapshot.missingRouteFileStrategy.streamRoutesExistsNow === false &&
        snapshot.missingRouteFileStrategy.streamLiveRoutesExistsNow === false &&
        snapshot.missingRouteFileStrategy.createFilesNow === false &&
        snapshot.missingRouteFileStrategy.targetRouteWriteAllowedNow === false,
      evidence: JSON.stringify(snapshot.missingRouteFileStrategy),
    },
    {
      id: "preferred_direction_is_dedicated_boundary_later",
      passed:
        snapshot.preferredDirectionPlan.decision === "prefer_dedicated_stream_route_boundary_later" &&
        snapshot.preferredDirectionPlan.targetPatchDecisionMadeNow === false &&
        snapshot.preferredDirectionPlan.runtimeMountAllowedNow === false,
      evidence: JSON.stringify(snapshot.preferredDirectionPlan),
    },
    {
      id: "next_144m_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor144M.includes("BACKEND-STREAM-FOUNDATION-144M") &&
        snapshot.requiredExactApprovalTextFor144M.includes("compile and safety verification") &&
        snapshot.requiredExactApprovalTextFor144M.includes("no target route write") &&
        snapshot.requiredExactApprovalTextFor144M.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor144M,
    },
    {
      id: "readiness_true",
      passed: readiness.ready === true,
      evidence: readiness.status,
    },
  ];

  const failedAssertions = assertions.filter((assertion) => !assertion.passed);

  return {
    version: snapshot.version,
    stage: "target_patch_planning_batch_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "target_patch_planning_batch_smoke_passed" : "target_patch_planning_batch_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
