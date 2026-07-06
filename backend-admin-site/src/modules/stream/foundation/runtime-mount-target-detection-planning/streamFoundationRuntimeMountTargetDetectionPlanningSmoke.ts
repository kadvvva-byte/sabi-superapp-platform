import { getStreamFoundationRuntimeMountTargetDetectionPlanningSnapshot } from "./streamFoundationRuntimeMountTargetDetectionPlanning";
import { getStreamFoundationRuntimeMountTargetDetectionPlanningReadiness } from "./streamFoundationRuntimeMountTargetDetectionPlanningReadiness";

export function runStreamFoundationRuntimeMountTargetDetectionPlanningSmoke() {
  const snapshot = getStreamFoundationRuntimeMountTargetDetectionPlanningSnapshot();
  const readiness = getStreamFoundationRuntimeMountTargetDetectionPlanningReadiness();

  const assertions = [
    {
      id: "143l_handoff_evidence_preserved",
      passed:
        snapshot.postVerificationHandoffEvidence143L.runtimeMountPrerequisiteContractsClosed === true &&
        snapshot.postVerificationHandoffEvidence143L.runtimeMountPerformed === 0 &&
        snapshot.postVerificationHandoffEvidence143L.routeBehaviorChangePerformed === 0 &&
        snapshot.postVerificationHandoffEvidence143L.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.postVerificationHandoffEvidence143L),
    },
    {
      id: "candidate_targets_and_markers_planned",
      passed:
        snapshot.candidateTargets.length === 5 &&
        snapshot.mountMarkers.length === 6 &&
        snapshot.detectionPlanningItems.length === 8 &&
        snapshot.candidateTargets.some((target) => target.id === "src_app_ts") &&
        snapshot.mountMarkers.some((marker) => marker.id === "live_write_route_mount_marker") &&
        snapshot.detectionPlanningItems.some((item) => item.area === "blocked_live_write_route_preservation"),
      evidence: JSON.stringify({
        targets: snapshot.candidateTargets.map((target) => target.id),
        markers: snapshot.mountMarkers.map((marker) => marker.id),
      }),
    },
    {
      id: "target_detection_actions_blocked_now",
      passed:
        snapshot.detectionDecision.actualTargetScanPerformedNow === false &&
        snapshot.detectionDecision.targetFileWriteAllowedNow === false &&
        snapshot.detectionDecision.markerWriteAllowedNow === false &&
        snapshot.detectionDecision.runtimeMountAllowedNow === false &&
        snapshot.detectionDecision.routeBehaviorChangeAllowedNow === false &&
        snapshot.detectionDecision.liveWriteRoutesMustRemain423Blocked === true &&
        snapshot.detectionPlanningItems.every((item) => item.fakeSuccessAllowedNow === false),
      evidence: JSON.stringify(snapshot.detectionDecision),
    },
    {
      id: "next_143n_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor143N.includes("BACKEND-STREAM-FOUNDATION-143N") &&
        snapshot.requiredExactApprovalTextFor143N.includes("target detection contracts") &&
        snapshot.requiredExactApprovalTextFor143N.includes("no target route write") &&
        snapshot.requiredExactApprovalTextFor143N.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor143N,
    },
    {
      id: "143m_safety_clean",
      passed:
        snapshot.safety.targetWriteBy143M === false &&
        snapshot.safety.appTsChangeBy143M === false &&
        snapshot.safety.serverTsChangeBy143M === false &&
        snapshot.safety.streamIndexChangeBy143M === false &&
        snapshot.safety.runtimeMountBy143M === false &&
        snapshot.safety.targetRouteWriteBy143M === false &&
        snapshot.safety.fakeSuccessBy143M === false,
      evidence: JSON.stringify(snapshot.safety),
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
    stage: "runtime_mount_target_detection_planning_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "runtime_mount_target_detection_planning_smoke_passed" : "runtime_mount_target_detection_planning_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
