import { getStreamFoundationLiveWriteHandlerSourceOnlyDraftSnapshot } from "./streamFoundationLiveWriteHandlerSourceOnlyDraft";

export function getStreamFoundationLiveWriteHandlerSourceOnlyDraftReadiness() {
  const snapshot = getStreamFoundationLiveWriteHandlerSourceOnlyDraftSnapshot();

  const handlersReady =
    snapshot.handlersReady === true &&
    snapshot.handlerCount === 3 &&
    snapshot.sampleEnvelopes.length === 3 &&
    snapshot.sampleEnvelopes.every((envelope) => envelope.ok === false) &&
    snapshot.sampleEnvelopes.every((envelope) => envelope.sourceOnly === true) &&
    snapshot.sampleEnvelopes.every((envelope) => envelope.runtimeMountedNow === false) &&
    snapshot.sampleEnvelopes.every((envelope) => envelope.runtimePostAllowedNow === false) &&
    snapshot.sampleEnvelopes.every((envelope) => envelope.statusCode === 423);

  const safetyReady =
    snapshot.sampleEnvelopes.every((envelope) => envelope.fakeSuccessAllowed === false) &&
    snapshot.sampleEnvelopes.every((envelope) => envelope.databaseWritePerformed === 0) &&
    snapshot.sampleEnvelopes.every((envelope) => envelope.providerCallPerformed === 0) &&
    snapshot.sampleEnvelopes.every((envelope) => envelope.walletMutationPerformed === 0) &&
    snapshot.sampleEnvelopes.every((envelope) => envelope.paymentAuthorizationPerformed === 0) &&
    snapshot.sampleEnvelopes.every((envelope) => envelope.monthlyPayoutPerformed === 0) &&
    snapshot.sampleEnvelopes.every((envelope) => envelope.moneyMovementPerformed === 0) &&
    snapshot.safety.sourceOnly === true &&
    snapshot.safety.appTsChange === false &&
    snapshot.safety.serverTsChange === false &&
    snapshot.safety.streamIndexChange === false &&
    snapshot.safety.routeMountNow === false &&
    snapshot.safety.runtimeHttpBy140Y === false &&
    snapshot.safety.runtimePostBy140Y === false &&
    snapshot.safety.databaseWrite === false &&
    snapshot.safety.providerCall === false &&
    snapshot.safety.walletMutation === false &&
    snapshot.safety.paymentAuthorization === false &&
    snapshot.safety.monthlyPayout === false &&
    snapshot.safety.moneyMovement === false &&
    snapshot.safety.fakeSuccess === false;

  const ready = handlersReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "live_write_handler_source_only_draft_ready_blocked_envelopes" : "live_write_handler_source_only_draft_blocked",
    handlerCount: snapshot.handlerCount,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-140Z live write handler source-only verification and route binding approval package",
  } as const;
}
