import { getStreamFoundationLiveWriteHandlerSourceOnlyDraftSnapshot } from "./streamFoundationLiveWriteHandlerSourceOnlyDraft";
import { getStreamFoundationLiveWriteHandlerSourceOnlyDraftReadiness } from "./streamFoundationLiveWriteHandlerSourceOnlyDraftReadiness";

export function runStreamFoundationLiveWriteHandlerSourceOnlyDraftSmoke() {
  const snapshot = getStreamFoundationLiveWriteHandlerSourceOnlyDraftSnapshot();
  const readiness = getStreamFoundationLiveWriteHandlerSourceOnlyDraftReadiness();

  const assertions = [
    {
      id: "three_handlers_return_blocked_envelopes",
      passed:
        snapshot.sampleEnvelopes.length === 3 &&
        snapshot.sampleEnvelopes.every((envelope) => envelope.ok === false) &&
        snapshot.sampleEnvelopes.every((envelope) => envelope.statusCode === 423),
      evidence: JSON.stringify(snapshot.sampleEnvelopes.map((envelope) => ({ routeId: envelope.routeId, statusCode: envelope.statusCode, blockedCode: envelope.blockedCode }))),
    },
    {
      id: "runtime_mount_and_post_blocked",
      passed:
        snapshot.routeMountNow === false &&
        snapshot.runtimePostNow === false &&
        snapshot.sampleEnvelopes.every((envelope) => envelope.runtimeMountedNow === false) &&
        snapshot.sampleEnvelopes.every((envelope) => envelope.runtimePostAllowedNow === false),
      evidence: JSON.stringify(snapshot.sampleEnvelopes.map((envelope) => ({ routeId: envelope.routeId, runtimeMountedNow: envelope.runtimeMountedNow, runtimePostAllowedNow: envelope.runtimePostAllowedNow }))),
    },
    {
      id: "no_db_provider_wallet_money",
      passed:
        snapshot.sampleEnvelopes.every((envelope) => envelope.databaseWritePerformed === 0) &&
        snapshot.sampleEnvelopes.every((envelope) => envelope.providerCallPerformed === 0) &&
        snapshot.sampleEnvelopes.every((envelope) => envelope.walletMutationPerformed === 0) &&
        snapshot.sampleEnvelopes.every((envelope) => envelope.paymentAuthorizationPerformed === 0) &&
        snapshot.sampleEnvelopes.every((envelope) => envelope.monthlyPayoutPerformed === 0) &&
        snapshot.sampleEnvelopes.every((envelope) => envelope.moneyMovementPerformed === 0) &&
        snapshot.sampleEnvelopes.every((envelope) => envelope.fakeSuccessAllowed === false),
      evidence: JSON.stringify(snapshot.sampleEnvelopes),
    },
    {
      id: "owner_approval_required",
      passed: snapshot.sampleEnvelopes.every((envelope) => envelope.requiredBeforeRuntimeMount.includes("owner_runtime_mount_approval")),
      evidence: JSON.stringify(snapshot.sampleEnvelopes.map((envelope) => envelope.requiredBeforeRuntimeMount)),
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
    stage: "live_write_handler_source_only_implementation_draft_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "live_write_handler_source_only_draft_smoke_passed" : "live_write_handler_source_only_draft_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
