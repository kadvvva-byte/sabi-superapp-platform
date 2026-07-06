import { getStreamFoundationPostRuntimeSmokeVerificationHandoffSnapshot } from "./streamFoundationPostRuntimeSmokeVerificationHandoff";
import { getStreamFoundationPostRuntimeSmokeVerificationHandoffReadiness } from "./streamFoundationPostRuntimeSmokeVerificationHandoffReadiness";

export function runStreamFoundationPostRuntimeSmokeVerificationHandoffSmoke() {
  const snapshot = getStreamFoundationPostRuntimeSmokeVerificationHandoffSnapshot();
  const readiness = getStreamFoundationPostRuntimeSmokeVerificationHandoffReadiness();

  const assertions = [
    {
      id: "142q_runtime_smoke_passed",
      passed:
        snapshot.runtimeSmoke142Q.ok === true &&
        snapshot.runtimeSmoke142Q.passedRoutes === 3 &&
        snapshot.runtimeSmoke142Q.failedRoutes === 0 &&
        snapshot.runtimeSmoke142Q.tscExitCode === 0,
      evidence: JSON.stringify(snapshot.runtimeSmoke142Q),
    },
    {
      id: "all_three_routes_returned_423",
      passed:
        snapshot.runtimeSmokeRoutes.length === 3 &&
        snapshot.runtimeSmokeRoutes.every((route) => route.actualStatusCode === 423) &&
        snapshot.runtimeSmokeRoutes.every((route) => route.ok === true),
      evidence: JSON.stringify(snapshot.runtimeSmokeRoutes),
    },
    {
      id: "no_money_or_provider_observed",
      passed:
        snapshot.runtimeSmoke142Q.databaseWritePerformed === 0 &&
        snapshot.runtimeSmoke142Q.providerCallPerformed === 0 &&
        snapshot.runtimeSmoke142Q.walletMutationPerformed === 0 &&
        snapshot.runtimeSmoke142Q.moneyMovementPerformed === 0 &&
        snapshot.runtimeSmoke142Q.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.runtimeSmoke142Q),
    },
    {
      id: "empty_body_follow_up_recorded_without_success",
      passed:
        snapshot.verifiedFoundationState.responseBodiesWereEmptyIn142Q === true &&
        snapshot.verifiedFoundationState.emptyBodyIsFollowUpRequired === true &&
        snapshot.verifiedFoundationState.emptyBodyDoesNotIndicateSuccess === true,
      evidence: JSON.stringify(snapshot.verifiedFoundationState),
    },
    {
      id: "exact_approval_for_142s_present",
      passed:
        snapshot.requiredExactApprovalTextFor142S.includes("BACKEND-STREAM-FOUNDATION-142S") &&
        snapshot.requiredExactApprovalTextFor142S.includes("HTTP 423 with empty response bodies") &&
        snapshot.requiredExactApprovalTextFor142S.includes("do not write src/app.ts") &&
        snapshot.requiredExactApprovalTextFor142S.includes("no runtime POST") &&
        snapshot.requiredExactApprovalTextFor142S.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor142S,
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
    stage: "post_runtime_smoke_verification_handoff_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "post_runtime_smoke_verification_handoff_smoke_passed" : "post_runtime_smoke_verification_handoff_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
