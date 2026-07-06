import { getStreamFoundationBlockedResponseEnvelopeInspectionPlanningSnapshot } from "./streamFoundationBlockedResponseEnvelopeInspectionPlanning";
import { getStreamFoundationBlockedResponseEnvelopeInspectionPlanningReadiness } from "./streamFoundationBlockedResponseEnvelopeInspectionPlanningReadiness";

export function runStreamFoundationBlockedResponseEnvelopeInspectionPlanningSmoke() {
  const snapshot = getStreamFoundationBlockedResponseEnvelopeInspectionPlanningSnapshot();
  const readiness = getStreamFoundationBlockedResponseEnvelopeInspectionPlanningReadiness();

  const assertions = [
    {
      id: "142q_142r_evidence_preserved",
      passed:
        snapshot.evidenceFrom142QAnd142R.runtimeSmokePassed === true &&
        snapshot.evidenceFrom142QAnd142R.routesReturned423 === 3 &&
        snapshot.evidenceFrom142QAnd142R.responseBodiesEmpty === true &&
        snapshot.evidenceFrom142QAnd142R.noForbiddenSuccessFragments === true,
      evidence: JSON.stringify(snapshot.evidenceFrom142QAnd142R),
    },
    {
      id: "empty_body_not_success",
      passed:
        snapshot.planningDecision.emptyBodyIsNotSuccess === true &&
        snapshot.planningDecision.preserve423BlockedAsPrimarySafetyRequirement === true,
      evidence: JSON.stringify(snapshot.planningDecision),
    },
    {
      id: "planning_only_no_runtime_or_target_write",
      passed:
        snapshot.planningDecision.currentStageIsPlanningOnly === true &&
        snapshot.planningDecision.targetWriteAllowedNow === false &&
        snapshot.planningDecision.runtimePostAllowedNow === false &&
        snapshot.safety.appTsChangeBy142S === false &&
        snapshot.safety.runtimePostBy142S === false,
      evidence: JSON.stringify(snapshot.safety),
    },
    {
      id: "hypotheses_and_plan_steps_ready",
      passed:
        snapshot.emptyBodyHypotheses.length === 5 &&
        snapshot.normalizationPlanSteps.length === 5 &&
        snapshot.emptyBodyHypotheses.every((item) => item.allowFakeSuccess === false) &&
        snapshot.normalizationPlanSteps.every((step) => step.fakeSuccessAllowedNow === false),
      evidence: JSON.stringify({
        hypotheses: snapshot.emptyBodyHypotheses.map((item) => item.id),
        steps: snapshot.normalizationPlanSteps.map((step) => step.id),
      }),
    },
    {
      id: "exact_approval_for_142t_present",
      passed:
        snapshot.requiredExactApprovalTextFor142T.includes("BACKEND-STREAM-FOUNDATION-142T") &&
        snapshot.requiredExactApprovalTextFor142T.includes("source inspection ops-only") &&
        snapshot.requiredExactApprovalTextFor142T.includes("no runtime POST") &&
        snapshot.requiredExactApprovalTextFor142T.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor142T,
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
    stage: "blocked_response_envelope_inspection_planning_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "blocked_response_envelope_inspection_planning_smoke_passed" : "blocked_response_envelope_inspection_planning_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
