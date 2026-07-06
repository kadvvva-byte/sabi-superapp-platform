import { getStreamFoundationBlockedResponseEnvelopeFollowupApprovalPackageSnapshot } from "./streamFoundationBlockedResponseEnvelopeFollowupApprovalPackage";
import { getStreamFoundationBlockedResponseEnvelopeFollowupApprovalPackageReadiness } from "./streamFoundationBlockedResponseEnvelopeFollowupApprovalPackageReadiness";

export function runStreamFoundationBlockedResponseEnvelopeFollowupApprovalPackageSmoke() {
  const snapshot = getStreamFoundationBlockedResponseEnvelopeFollowupApprovalPackageSnapshot();
  const readiness = getStreamFoundationBlockedResponseEnvelopeFollowupApprovalPackageReadiness();

  const assertions = [
    {
      id: "142t_fix2_source_inspection_passed",
      passed:
        snapshot.sourceInspection142TFix2.ok === true &&
        snapshot.sourceInspection142TFix2.routeInspectionPassedRoutes === 3 &&
        snapshot.sourceInspection142TFix2.runtimeHandlerPassedFactories === 3 &&
        snapshot.sourceInspection142TFix2.sharedBlockedDecisionHasStatusCode423 === true &&
        snapshot.sourceInspection142TFix2.tscExitCode === 0,
      evidence: JSON.stringify(snapshot.sourceInspection142TFix2),
    },
    {
      id: "followup_prefers_diagnosis_before_patch",
      passed:
        snapshot.followupDecision.emptyBodyIsNotSuccess === true &&
        snapshot.followupDecision.sourceShapeAppearsCorrect === true &&
        snapshot.followupDecision.nextStepShouldDiagnoseBodyCaptureBeforeTargetPatch === true &&
        snapshot.followupDecision.directTargetPatchNotApprovedNow === true,
      evidence: JSON.stringify(snapshot.followupDecision),
    },
    {
      id: "exact_approval_for_142v_present",
      passed:
        snapshot.requiredExactApprovalTextFor142V.includes("BACKEND-STREAM-FOUNDATION-142V") &&
        snapshot.requiredExactApprovalTextFor142V.includes("body-capture diagnostics") &&
        snapshot.requiredExactApprovalTextFor142V.includes("HTTP 423") &&
        snapshot.requiredExactApprovalTextFor142V.includes("no DB write") &&
        snapshot.requiredExactApprovalTextFor142V.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor142V,
    },
    {
      id: "142u_does_not_run_runtime_or_write_targets",
      passed:
        snapshot.safety.targetWriteBy142U === false &&
        snapshot.safety.runtimePostBy142U === false &&
        snapshot.safety.databaseWriteBy142U === false &&
        snapshot.safety.providerCallBy142U === false &&
        snapshot.safety.walletMutationBy142U === false &&
        snapshot.safety.moneyMovementBy142U === false,
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
    stage: "blocked_response_envelope_followup_approval_package_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "blocked_response_envelope_followup_approval_package_smoke_passed" : "blocked_response_envelope_followup_approval_package_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
