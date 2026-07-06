import { getStreamFoundationRuntimeMountTargetInspectionPostRunHandoffSnapshot } from "./streamFoundationRuntimeMountTargetInspectionPostRunHandoff";
import { getStreamFoundationRuntimeMountTargetInspectionPostRunHandoffReadiness } from "./streamFoundationRuntimeMountTargetInspectionPostRunHandoffReadiness";

export function runStreamFoundationRuntimeMountTargetInspectionPostRunHandoffSmoke() {
  const snapshot = getStreamFoundationRuntimeMountTargetInspectionPostRunHandoffSnapshot();
  const readiness = getStreamFoundationRuntimeMountTargetInspectionPostRunHandoffReadiness();

  const assertions = [
    {
      id: "143q_inspection_evidence_preserved",
      passed:
        snapshot.inspectionEvidence143Q.ok === true &&
        snapshot.inspectionEvidence143Q.targetReferenceVerificationOk === true &&
        snapshot.inspectionEvidence143Q.migrationVerificationOk === true &&
        snapshot.inspectionEvidence143Q.tscExitCode === 0 &&
        snapshot.inspectionEvidence143Q.runtimeMountPerformed === 0 &&
        snapshot.inspectionEvidence143Q.routeBehaviorChangePerformed === 0 &&
        snapshot.inspectionEvidence143Q.targetRouteWritePerformed === 0 &&
        snapshot.inspectionEvidence143Q.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.inspectionEvidence143Q),
    },
    {
      id: "read_only_inspection_evidence_closed",
      passed:
        snapshot.readOnlyInspectionEvidence.length === 8 &&
        snapshot.readOnlyInspectionEvidence.every((evidence) => evidence.status === "inspection_clean") &&
        snapshot.readOnlyInspectionEvidence.every((evidence) => evidence.targetRouteWritePerformed === 0) &&
        snapshot.readOnlyInspectionEvidence.every((evidence) => evidence.fakeSuccessAllowed === false),
      evidence: JSON.stringify(snapshot.readOnlyInspectionEvidence.map((evidence) => evidence.area)),
    },
    {
      id: "target_diff_review_planning_ready_but_blocked",
      passed:
        snapshot.targetDiffReviewPlanningItems.length === 8 &&
        snapshot.targetDiffReviewPlanningItems.some((item) => item.area === "target_diff_review") &&
        snapshot.targetDiffReviewPlanningItems.some((item) => item.area === "auth_boundary_preservation") &&
        snapshot.targetDiffReviewPlanningItems.some((item) => item.area === "blocked_route_preservation") &&
        snapshot.targetDiffReviewPlanningItems.every((item) => item.sourceTargetWriteAllowedNow === false) &&
        snapshot.targetDiffReviewPlanningItems.every((item) => item.targetRouteWriteAllowedNow === false) &&
        snapshot.targetDiffReviewPlanningItems.every((item) => item.fakeSuccessAllowedNow === false),
      evidence: JSON.stringify(snapshot.targetDiffReviewPlanningItems.map((item) => item.area)),
    },
    {
      id: "next_143s_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor143S.includes("BACKEND-STREAM-FOUNDATION-143S") &&
        snapshot.requiredExactApprovalTextFor143S.includes("target diff review") &&
        snapshot.requiredExactApprovalTextFor143S.includes("do not write src/app.ts") &&
        snapshot.requiredExactApprovalTextFor143S.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor143S,
    },
    {
      id: "143r_safety_clean",
      passed:
        snapshot.safety.targetWriteBy143R === false &&
        snapshot.safety.streamIndexChangeBy143R === false &&
        snapshot.safety.runtimeMountBy143R === false &&
        snapshot.safety.targetRouteWriteBy143R === false &&
        snapshot.safety.fakeSuccessBy143R === false,
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
    stage: "runtime_mount_target_inspection_post_run_handoff_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "runtime_mount_target_inspection_post_run_handoff_smoke_passed" : "runtime_mount_target_inspection_post_run_handoff_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
