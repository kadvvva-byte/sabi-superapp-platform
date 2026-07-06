import { getStreamFoundationPostSmokeHandoffSnapshot } from "./streamFoundationPostSmokeHandoff";
import { getStreamFoundationPostSmokeHandoffReadiness } from "./streamFoundationPostSmokeHandoffReadiness";

export function runStreamFoundationPostSmokeHandoffSmoke() {
  const snapshot = getStreamFoundationPostSmokeHandoffSnapshot();
  const readiness = getStreamFoundationPostSmokeHandoffReadiness();

  const assertions = [
    {
      id: "previous_140r_passed",
      passed:
        snapshot.evidence.previousStage === "BACKEND-STREAM-FOUNDATION-140R" &&
        snapshot.evidence.typescriptExitCode === 0 &&
        snapshot.evidence.readinessAuthenticatedGetStatus === 200 &&
        snapshot.evidence.previewAuthenticatedGetStatus === 200,
      evidence: JSON.stringify(snapshot.evidence),
    },
    {
      id: "diagnostics_routeid_and_scopes_locked",
      passed:
        snapshot.evidence.appRouteId === "stream_kernel_diagnostics_snapshot" &&
        snapshot.evidence.mapperDefaultScopes.includes("admin:stream:read") &&
        snapshot.evidence.mapperDefaultScopes.includes("admin:stream:diagnostics:read"),
      evidence: JSON.stringify(snapshot.evidence),
    },
    {
      id: "no_runtime_or_money_actions_by_140s",
      passed:
        snapshot.safety.backendRestartPerformed === 0 &&
        snapshot.safety.runtimeHttpPerformedBy140S === 0 &&
        snapshot.safety.databaseWritePerformed === 0 &&
        snapshot.safety.providerCallPerformed === 0 &&
        snapshot.safety.walletMutationPerformed === 0 &&
        snapshot.safety.paymentAuthorizationPerformed === 0 &&
        snapshot.safety.monthlyPayoutPerformed === 0 &&
        snapshot.safety.moneyMovementPerformed === 0 &&
        snapshot.safety.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.safety),
    },
    {
      id: "next_batch_ready",
      passed: snapshot.readyForNextBatch === true && snapshot.nextBatch.length === 4,
      evidence: JSON.stringify(snapshot.nextBatch),
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
    stage: "post_smoke_handoff_and_next_backend_route_foundation_batch_source_only_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "post_smoke_handoff_smoke_passed" : "post_smoke_handoff_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-140T route inventory contract matrix/source-only",
  } as const;
}
