import { getStreamFoundationBlockedResponseEnvelopeFollowupApprovalPackageSnapshot } from "./streamFoundationBlockedResponseEnvelopeFollowupApprovalPackage";

export function getStreamFoundationBlockedResponseEnvelopeFollowupApprovalPackageReadiness() {
  const snapshot = getStreamFoundationBlockedResponseEnvelopeFollowupApprovalPackageSnapshot();

  const evidenceReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-142T-FIX2" &&
    snapshot.sourceInspection142TFix2.ok === true &&
    snapshot.sourceInspection142TFix2.routeInspectionPassedRoutes === 3 &&
    snapshot.sourceInspection142TFix2.runtimeHandlerPassedFactories === 3 &&
    snapshot.sourceInspection142TFix2.sharedBlockedDecisionHasStatusCode423 === true &&
    snapshot.sourceInspection142TFix2.sharedBlockedDecisionHasReturnObject === true &&
    snapshot.sourceInspection142TFix2.sharedBlockedDecisionHasFalseSafetyFlags === true &&
    snapshot.sourceInspection142TFix2.sourceInspectionConclusion === "source_shape_appears_correct_delegate_aware" &&
    snapshot.sourceInspection142TFix2.tscExitCode === 0 &&
    snapshot.sourceInspection142TFix2.runtimePostPerformed === 0 &&
    snapshot.sourceInspection142TFix2.databaseWritePerformed === 0 &&
    snapshot.sourceInspection142TFix2.providerCallPerformed === 0 &&
    snapshot.sourceInspection142TFix2.walletMutationPerformed === 0 &&
    snapshot.sourceInspection142TFix2.moneyMovementPerformed === 0 &&
    snapshot.sourceInspection142TFix2.fakeSuccessAllowed === false;

  const followupReady =
    snapshot.findings.length === 3 &&
    snapshot.findings.some((finding) => finding.id === "app_routes_use_status_json_envelope" && finding.severity === "passed") &&
    snapshot.findings.some((finding) => finding.id === "runtime_handler_delegated_423_envelope_verified" && finding.severity === "passed") &&
    snapshot.followupDecision.emptyBodyIsNotSuccess === true &&
    snapshot.followupDecision.sourceShapeAppearsCorrect === true &&
    snapshot.followupDecision.status423MustRemainPrimarySafety === true &&
    snapshot.followupDecision.nextStepShouldDiagnoseBodyCaptureBeforeTargetPatch === true &&
    snapshot.followupDecision.directTargetPatchNotApprovedNow === true &&
    snapshot.followupDecision.runtimeSmokeAllowedBy142U === false;

  const approvalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore142V === true &&
    snapshot.nextApprovalPolicy.nextStageIsOpsOnlyRuntimeBodyCaptureDiagnosis === true &&
    snapshot.nextApprovalPolicy.allowedRuntimePostRoutesFor142V.length === 3 &&
    snapshot.nextApprovalPolicy.expectedStatusCodeFor142V === 423 &&
    snapshot.requiredExactApprovalTextFor142V.includes("BACKEND-STREAM-FOUNDATION-142V") &&
    snapshot.requiredExactApprovalTextFor142V.includes("body capture diagnosis") &&
    snapshot.requiredExactApprovalTextFor142V.includes("/api/stream/live/start") &&
    snapshot.requiredExactApprovalTextFor142V.includes("do not restart backend") &&
    snapshot.requiredExactApprovalTextFor142V.includes("no DB write") &&
    snapshot.requiredExactApprovalTextFor142V.includes("no provider call") &&
    snapshot.requiredExactApprovalTextFor142V.includes("no Wallet mutation") &&
    snapshot.requiredExactApprovalTextFor142V.includes("no fake success");

  const safetyReady =
    snapshot.safety.sourceOnly142U === true &&
    snapshot.safety.targetWriteBy142U === false &&
    snapshot.safety.appTsChangeBy142U === false &&
    snapshot.safety.serverTsChangeBy142U === false &&
    snapshot.safety.streamIndexChangeBy142U === false &&
    snapshot.safety.backendRestartBy142U === false &&
    snapshot.safety.runtimeHttpBy142U === false &&
    snapshot.safety.runtimePostBy142U === false &&
    snapshot.safety.databaseReadBy142U === false &&
    snapshot.safety.databaseWriteBy142U === false &&
    snapshot.safety.providerCallBy142U === false &&
    snapshot.safety.providerSecretReadBy142U === false &&
    snapshot.safety.walletMutationBy142U === false &&
    snapshot.safety.moneyMovementBy142U === false &&
    snapshot.safety.fakeSuccessBy142U === false;

  const ready = evidenceReady && followupReady && approvalReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "blocked_response_envelope_followup_approval_ready" : "blocked_response_envelope_followup_approval_blocked",
    findings: snapshot.findings.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-142V controlled blocked-response body capture diagnosis runtime smoke ops-only after exact approval",
  } as const;
}
