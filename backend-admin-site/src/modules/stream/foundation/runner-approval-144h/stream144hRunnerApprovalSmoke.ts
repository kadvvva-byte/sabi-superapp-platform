import { getStreamFoundation144HRunnerApprovalPackageSnapshot } from "./stream144hRunnerApproval";
import { getStreamFoundation144HRunnerApprovalReadiness } from "./stream144hRunnerApprovalReadiness";

export function runStreamFoundation144HRunnerApprovalSmoke() {
  const snapshot = getStreamFoundation144HRunnerApprovalPackageSnapshot();
  const readiness = getStreamFoundation144HRunnerApprovalReadiness();

  const assertions = [
    {
      id: "144g_handoff_evidence_preserved",
      passed:
        snapshot.postVerificationHandoffEvidence144G.targetPatchDraftPreviewEvidenceCapturePlanningClosed === true &&
        snapshot.postVerificationHandoffEvidence144G.tscExitCode === 0 &&
        snapshot.postVerificationHandoffEvidence144G.targetFileReadPerformed === 0 &&
        snapshot.postVerificationHandoffEvidence144G.runtimeMountPerformed === 0 &&
        snapshot.postVerificationHandoffEvidence144G.targetRouteWritePerformed === 0 &&
        snapshot.postVerificationHandoffEvidence144G.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.postVerificationHandoffEvidence144G),
    },
    {
      id: "runner_approval_contracts_present",
      passed:
        snapshot.opsOnlyEvidenceCaptureRunnerPackage.sourceOnlyContract === true &&
        snapshot.futureTargetHashCapture.targetReadScopes.length === 6 &&
        snapshot.futureTargetExcerptCapture.sourceOnlyContract === true &&
        snapshot.futureRouteAnchorInspection.sourceOnlyContract === true &&
        snapshot.futureAuthBoundaryInspection.sourceOnlyContract === true &&
        snapshot.futureBlockedRouteInspection.sourceOnlyContract === true &&
        snapshot.futureDuplicateMountInventory.sourceOnlyContract === true &&
        snapshot.futureReportOutput.sourceOnlyContract === true &&
        snapshot.compileGate.sourceOnlyContract === true &&
        snapshot.ownerApprovalGate.sourceOnlyContract === true,
      evidence: JSON.stringify(snapshot.futureTargetHashCapture.targetReadScopes.map((item) => item.path)),
    },
    {
      id: "future_runner_read_scope_allowed_only_after_separate_approval",
      passed:
        snapshot.futureTargetHashCapture.targetReadScopes.every((item) => item.futureRunnerMayReadHashAfterSeparateApproval === true) &&
        snapshot.futureTargetHashCapture.targetReadScopes.every((item) => item.futureRunnerMayReadExcerptAfterSeparateApproval === true) &&
        snapshot.futureTargetHashCapture.targetReadScopes.every((item) => item.actualReadNowBy144H === false) &&
        snapshot.futureTargetHashCapture.targetReadScopes.every((item) => item.sourceTargetWriteAllowedNow === false) &&
        snapshot.futureTargetHashCapture.targetReadScopes.every((item) => item.targetRouteWriteAllowedNow === false),
      evidence: JSON.stringify(snapshot.futureTargetHashCapture.targetReadScopes.map((item) => item.id)),
    },
    {
      id: "144h_actions_blocked_now",
      passed:
        snapshot.opsOnlyEvidenceCaptureRunnerPackage.runnerPackageCreatedNow === false &&
        snapshot.opsOnlyEvidenceCaptureRunnerPackage.runnerExecutionAllowedNow === false &&
        snapshot.futureTargetHashCapture.hashCapturedNowBy144H === false &&
        snapshot.futureTargetExcerptCapture.excerptCapturedNowBy144H === false &&
        snapshot.futureRouteAnchorInspection.routeAnchorsInspectedNowBy144H === false &&
        snapshot.futureBlockedRouteInspection.blockedRoutesInspectedNowBy144H === false &&
        snapshot.ownerApprovalGate.evidenceCaptureRunnerBuildAllowedNow === false &&
        snapshot.ownerApprovalGate.evidenceCaptureRunnerExecutionAllowedNow === false &&
        snapshot.safety.fakeSuccessBy144H === false,
      evidence: JSON.stringify(snapshot.safety),
    },
    {
      id: "next_144i_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor144I.includes("BACKEND-STREAM-FOUNDATION-144I") &&
        snapshot.requiredExactApprovalTextFor144I.includes("compile and safety verification") &&
        snapshot.requiredExactApprovalTextFor144I.includes("no target route write") &&
        snapshot.requiredExactApprovalTextFor144I.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor144I,
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
    stage: "evidence_capture_runner_approval_package_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "evidence_capture_runner_approval_package_smoke_passed" : "evidence_capture_runner_approval_package_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
