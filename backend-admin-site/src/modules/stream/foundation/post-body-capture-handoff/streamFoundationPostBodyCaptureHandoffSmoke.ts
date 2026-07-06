import { getStreamFoundationPostBodyCaptureHandoffSnapshot } from "./streamFoundationPostBodyCaptureHandoff";
import { getStreamFoundationPostBodyCaptureHandoffReadiness } from "./streamFoundationPostBodyCaptureHandoffReadiness";

export function runStreamFoundationPostBodyCaptureHandoffSmoke() {
  const snapshot = getStreamFoundationPostBodyCaptureHandoffSnapshot();
  const readiness = getStreamFoundationPostBodyCaptureHandoffReadiness();

  const assertions = [
    {
      id: "142v_fix2_body_capture_passed",
      passed:
        snapshot.bodyCapture142VFix2.ok === true &&
        snapshot.bodyCapture142VFix2.jsonBlockedEnvelopeRoutes === 3 &&
        snapshot.bodyCapture142VFix2.emptyBodyRoutes === 0 &&
        snapshot.bodyCapture142VFix2.conclusion === "all_routes_return_json_blocked_envelopes" &&
        snapshot.bodyCapture142VFix2.tscExitCode === 0,
      evidence: JSON.stringify(snapshot.bodyCapture142VFix2),
    },
    {
      id: "no_envelope_body_patch_needed",
      passed:
        snapshot.handoffDecision.blockedEnvelopeBodyPatchNeeded === false &&
        snapshot.handoffDecision.targetPatchForEnvelopeBodyNeeded === false &&
        snapshot.handoffDecision.responseBodyCaptureCorrect === true,
      evidence: JSON.stringify(snapshot.handoffDecision),
    },
    {
      id: "all_routes_have_json_blocked_envelope",
      passed:
        snapshot.routeResults.length === 3 &&
        snapshot.routeResults.every((route) => route.jsonBlockedEnvelopePresent === true) &&
        snapshot.routeResults.every((route) => route.jsonSafetyFlagsOk === true) &&
        snapshot.routeResults.every((route) => route.forbiddenSuccessFragmentsOk === true),
      evidence: JSON.stringify(snapshot.routeResults),
    },
    {
      id: "exact_approval_for_142x_present",
      passed:
        snapshot.requiredExactApprovalTextFor142X.includes("BACKEND-STREAM-FOUNDATION-142X") &&
        snapshot.requiredExactApprovalTextFor142X.includes("source-only") &&
        snapshot.requiredExactApprovalTextFor142X.includes("no runtime POST") &&
        snapshot.requiredExactApprovalTextFor142X.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor142X,
    },
    {
      id: "142w_does_not_run_runtime_or_write_targets",
      passed:
        snapshot.safety.targetWriteBy142W === false &&
        snapshot.safety.runtimePostBy142W === false &&
        snapshot.safety.databaseWriteBy142W === false &&
        snapshot.safety.providerCallBy142W === false &&
        snapshot.safety.walletMutationBy142W === false &&
        snapshot.safety.moneyMovementBy142W === false,
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
    stage: "post_body_capture_handoff_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "post_body_capture_handoff_smoke_passed" : "post_body_capture_handoff_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
