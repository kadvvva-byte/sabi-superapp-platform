import { getStreamFoundationRuntimeMountTargetDetectionContractsScaffoldSnapshot } from "./streamFoundationRuntimeMountTargetDetectionContractsScaffold";
import { getStreamFoundationRuntimeMountTargetDetectionContractsScaffoldReadiness } from "./streamFoundationRuntimeMountTargetDetectionContractsScaffoldReadiness";

export function runStreamFoundationRuntimeMountTargetDetectionContractsScaffoldSmoke() {
  const snapshot = getStreamFoundationRuntimeMountTargetDetectionContractsScaffoldSnapshot();
  const readiness = getStreamFoundationRuntimeMountTargetDetectionContractsScaffoldReadiness();

  const assertions = [
    {
      id: "143m_planning_evidence_preserved",
      passed:
        snapshot.previousPlanningEvidence.runtimeMountTargetDetectionPlanningReady === true &&
        snapshot.previousPlanningEvidence.candidateTargetsPlanned === 5 &&
        snapshot.previousPlanningEvidence.mountMarkersPlanned === 6 &&
        snapshot.previousPlanningEvidence.actualTargetScanPerformedNow === false &&
        snapshot.previousPlanningEvidence.fakeSuccessAllowedNow === false,
      evidence: JSON.stringify(snapshot.previousPlanningEvidence),
    },
    {
      id: "candidate_marker_boundary_contracts_present",
      passed:
        snapshot.candidateTargetFileInventory.candidates.length === 5 &&
        snapshot.routeMountMarkerInventory.markers.length === 6 &&
        snapshot.boundaryContracts.length === 6 &&
        snapshot.candidateTargetFileInventory.candidates.some((candidate) => candidate.id === "src_app_ts") &&
        snapshot.routeMountMarkerInventory.markers.some((marker) => marker.id === "live_write_route_mount_marker"),
      evidence: JSON.stringify({
        candidates: snapshot.candidateTargetFileInventory.candidates.map((candidate) => candidate.id),
        markers: snapshot.routeMountMarkerInventory.markers.map((marker) => marker.id),
      }),
    },
    {
      id: "target_detection_actions_blocked_now",
      passed:
        snapshot.candidateTargetFileInventory.actualTargetScanAllowedNow === false &&
        snapshot.candidateTargetFileInventory.targetFileWriteAllowedNow === false &&
        snapshot.routeMountMarkerInventory.markerWriteAllowedNow === false &&
        snapshot.blockedLiveWriteRoutePreservation.runtimeMountAllowedNow === false &&
        snapshot.futureDiffTargetReview.targetRouteWriteAllowedNow === false &&
        snapshot.rollbackTargetHashSnapshot.rollbackExecutionAllowedNow === false &&
        snapshot.postDetectionCompileGate.compileRunByThisStageNow === false &&
        snapshot.blockedCodes.includes("STREAM_FAKE_SUCCESS_FORBIDDEN"),
      evidence: JSON.stringify({
        candidate: snapshot.candidateTargetFileInventory,
        markers: snapshot.routeMountMarkerInventory,
        blocked: snapshot.blockedCodes,
      }),
    },
    {
      id: "next_143o_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor143O.includes("BACKEND-STREAM-FOUNDATION-143O") &&
        snapshot.requiredExactApprovalTextFor143O.includes("ops-only") &&
        snapshot.requiredExactApprovalTextFor143O.includes("no target route write") &&
        snapshot.requiredExactApprovalTextFor143O.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor143O,
    },
    {
      id: "143n_safety_clean",
      passed:
        snapshot.safety.targetWriteBy143N === false &&
        snapshot.safety.appTsChangeBy143N === false &&
        snapshot.safety.serverTsChangeBy143N === false &&
        snapshot.safety.streamIndexChangeBy143N === false &&
        snapshot.safety.runtimeMountBy143N === false &&
        snapshot.safety.targetRouteWriteBy143N === false &&
        snapshot.safety.fakeSuccessBy143N === false,
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
    stage: "runtime_mount_target_detection_contracts_scaffold_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "runtime_mount_target_detection_contracts_scaffold_smoke_passed" : "runtime_mount_target_detection_contracts_scaffold_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
