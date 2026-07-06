import { getStreamFoundationBlockedResponseEnvelopeInspectionPlanningSnapshot } from "./streamFoundationBlockedResponseEnvelopeInspectionPlanning";

export function getStreamFoundationBlockedResponseEnvelopeInspectionPlanningReadiness() {
  const snapshot = getStreamFoundationBlockedResponseEnvelopeInspectionPlanningSnapshot();

  const evidenceReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-142R" &&
    snapshot.evidenceFrom142QAnd142R.runtimeSmokePassed === true &&
    snapshot.evidenceFrom142QAnd142R.routesAttempted === 3 &&
    snapshot.evidenceFrom142QAnd142R.routesReturned423 === 3 &&
    snapshot.evidenceFrom142QAnd142R.responseBodiesEmpty === true &&
    snapshot.evidenceFrom142QAnd142R.noForbiddenSuccessFragments === true &&
    snapshot.evidenceFrom142QAnd142R.tscExitCode === 0 &&
    snapshot.evidenceFrom142QAnd142R.databaseWritePerformed === 0 &&
    snapshot.evidenceFrom142QAnd142R.providerCallPerformed === 0 &&
    snapshot.evidenceFrom142QAnd142R.walletMutationPerformed === 0 &&
    snapshot.evidenceFrom142QAnd142R.moneyMovementPerformed === 0 &&
    snapshot.evidenceFrom142QAnd142R.fakeSuccessAllowed === false;

  const planReady =
    snapshot.planningDecision.emptyBodyIsNotSuccess === true &&
    snapshot.planningDecision.preserve423BlockedAsPrimarySafetyRequirement === true &&
    snapshot.planningDecision.currentStageIsPlanningOnly === true &&
    snapshot.planningDecision.targetWriteAllowedNow === false &&
    snapshot.planningDecision.runtimePostAllowedNow === false &&
    snapshot.emptyBodyHypotheses.length === 5 &&
    snapshot.emptyBodyHypotheses.every((item) => item.preserveStatusCode423 === true) &&
    snapshot.emptyBodyHypotheses.every((item) => item.allowRuntimePostIn142S === false) &&
    snapshot.emptyBodyHypotheses.every((item) => item.allowTargetWriteIn142S === false) &&
    snapshot.emptyBodyHypotheses.every((item) => item.allowFakeSuccess === false) &&
    snapshot.normalizationPlanSteps.length === 5 &&
    snapshot.normalizationPlanSteps.every((step) => step.currentStageAction === "plan_only") &&
    snapshot.normalizationPlanSteps.every((step) => step.preserveStatusCode423 === true) &&
    snapshot.normalizationPlanSteps.every((step) => step.sourceWriteAllowedNow === false) &&
    snapshot.normalizationPlanSteps.every((step) => step.runtimePostAllowedNow === false);

  const approvalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore142T === true &&
    snapshot.nextApprovalPolicy.nextStageIsOpsOnlySourceInspection === true &&
    snapshot.nextApprovalPolicy.nextStageMustNotWriteTargets === true &&
    snapshot.nextApprovalPolicy.nextStageMustNotRuntimePost === true &&
    snapshot.requiredExactApprovalTextFor142T.includes("BACKEND-STREAM-FOUNDATION-142T") &&
    snapshot.requiredExactApprovalTextFor142T.includes("source inspection ops-only") &&
    snapshot.requiredExactApprovalTextFor142T.includes("do not write src/app.ts") &&
    snapshot.requiredExactApprovalTextFor142T.includes("no runtime POST") &&
    snapshot.requiredExactApprovalTextFor142T.includes("no DB write") &&
    snapshot.requiredExactApprovalTextFor142T.includes("no provider call") &&
    snapshot.requiredExactApprovalTextFor142T.includes("no Wallet mutation") &&
    snapshot.requiredExactApprovalTextFor142T.includes("no fake success");

  const safetyReady =
    snapshot.safety.sourceOnly142S === true &&
    snapshot.safety.targetWriteBy142S === false &&
    snapshot.safety.appTsChangeBy142S === false &&
    snapshot.safety.serverTsChangeBy142S === false &&
    snapshot.safety.streamIndexChangeBy142S === false &&
    snapshot.safety.backendRestartBy142S === false &&
    snapshot.safety.runtimeHttpBy142S === false &&
    snapshot.safety.runtimePostBy142S === false &&
    snapshot.safety.databaseReadBy142S === false &&
    snapshot.safety.databaseWriteBy142S === false &&
    snapshot.safety.providerCallBy142S === false &&
    snapshot.safety.walletMutationBy142S === false &&
    snapshot.safety.moneyMovementBy142S === false &&
    snapshot.safety.fakeSuccessBy142S === false;

  const ready = evidenceReady && planReady && approvalReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "blocked_response_envelope_planning_ready" : "blocked_response_envelope_planning_blocked",
    hypotheses: snapshot.emptyBodyHypotheses.length,
    planSteps: snapshot.normalizationPlanSteps.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-142T controlled blocked-response envelope source inspection ops-only after exact approval",
  } as const;
}
