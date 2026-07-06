import { getStreamFoundation144KEvidenceCapturePostRunHandoffSnapshot } from "./stream144kEvidenceCapturePostRunHandoff";
import { getStreamFoundation144KEvidenceCapturePostRunHandoffReadiness } from "./stream144kEvidenceCapturePostRunHandoffReadiness";

export function runStreamFoundation144KEvidenceCapturePostRunHandoffSmoke() {
  const snapshot = getStreamFoundation144KEvidenceCapturePostRunHandoffSnapshot();
  const readiness = getStreamFoundation144KEvidenceCapturePostRunHandoffReadiness();

  const assertions = [
    {
      id: "144j_fix2_evidence_runner_closed_clean",
      passed:
        snapshot.evidenceRunner144JClosed.ok === true &&
        snapshot.evidenceRunner144JClosed.sourceModificationPerformed === 0 &&
        snapshot.evidenceRunner144JClosed.runtimeMountPerformed === 0 &&
        snapshot.evidenceRunner144JClosed.targetRouteWritePerformed === 0 &&
        snapshot.evidenceRunner144JClosed.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.evidenceRunner144JClosed),
    },
    {
      id: "target_hashes_and_missing_route_files_preserved",
      passed:
        snapshot.targetHashEvidence.length === 6 &&
        snapshot.missingRouteFiles.length === 2 &&
        snapshot.missingRouteFiles.every((item) => item.exists === false) &&
        snapshot.missingRouteFiles.every((item) => item.createFileAllowedNow === false),
      evidence: JSON.stringify({
        hashes: snapshot.targetHashEvidence.map((item) => ({ path: item.path, status: item.availabilityStatus })),
        missing: snapshot.missingRouteFiles.map((item) => item.path),
      }),
    },
    {
      id: "route_evidence_summary_preserved",
      passed:
        snapshot.routeEvidenceSummary.streamRoutesFileExists === false &&
        snapshot.routeEvidenceSummary.streamLiveRoutesFileExists === false &&
        snapshot.routeEvidenceSummary.adminRoutesContainsLiveAndBlockedEvidence === true &&
        snapshot.routeEvidenceSummary.appTsContainsStreamMountEvidence === true &&
        snapshot.routeEvidenceSummary.targetPatchDecisionMadeNow === false,
      evidence: JSON.stringify(snapshot.routeEvidenceSummary),
    },
    {
      id: "next_target_patch_planning_ready_but_blocked",
      passed:
        snapshot.nextTargetPatchPlanningItems.length === 10 &&
        snapshot.nextTargetPatchPlanningItems.every((item) => item.targetPatchDecisionMadeNow === false) &&
        snapshot.nextTargetPatchPlanningItems.every((item) => item.sourceTargetWriteAllowedNow === false) &&
        snapshot.nextTargetPatchPlanningItems.every((item) => item.targetRouteWriteAllowedNow === false) &&
        snapshot.nextTargetPatchPlanningItems.every((item) => item.fakeSuccessAllowedNow === false),
      evidence: JSON.stringify(snapshot.nextTargetPatchPlanningItems.map((item) => item.area)),
    },
    {
      id: "next_144l_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor144L.includes("BACKEND-STREAM-FOUNDATION-144L") &&
        snapshot.requiredExactApprovalTextFor144L.includes("missing src/modules/stream/infrastructure/routes/stream.routes.ts") &&
        snapshot.requiredExactApprovalTextFor144L.includes("without target route write") &&
        snapshot.requiredExactApprovalTextFor144L.includes("without fake success"),
      evidence: snapshot.requiredExactApprovalTextFor144L,
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
    stage: "ops_only_evidence_capture_post_run_handoff_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "ops_only_evidence_capture_post_run_handoff_smoke_passed" : "ops_only_evidence_capture_post_run_handoff_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
