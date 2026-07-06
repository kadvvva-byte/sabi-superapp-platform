import { getStreamFoundationReadOnlyRouteHandlerEnvelopeBatchSnapshot } from "./streamFoundationReadOnlyRouteHandlerEnvelopeBatch";

export function getStreamFoundationReadOnlyRouteHandlerEnvelopeBatchReadiness() {
  const snapshot = getStreamFoundationReadOnlyRouteHandlerEnvelopeBatchSnapshot();

  const envelopeReady =
    snapshot.envelopes.length >= 9 &&
    snapshot.totals.total === snapshot.envelopes.length &&
    snapshot.totals.diagnosticsLive === 2 &&
    snapshot.totals.sourceOnlyUnmounted === snapshot.envelopes.length - 2 &&
    snapshot.totals.fakeDataRoutes === 0 &&
    snapshot.totals.routesRequiringDatabaseNow === 0 &&
    snapshot.totals.routesRequiringProviderNow === 0 &&
    snapshot.totals.routesRequiringWalletNow === 0;

  const noFakeData =
    snapshot.envelopes.every((envelope) => envelope.returnsFakeData === false) &&
    snapshot.envelopes.every((envelope) => envelope.requiresDatabaseReadNow === false) &&
    snapshot.envelopes.every((envelope) => envelope.requiresProviderCallNow === false) &&
    snapshot.envelopes.every((envelope) => envelope.requiresWalletReadNow === false);

  const safetyReady =
    snapshot.safety.sourceOnly === true &&
    snapshot.safety.appTsChange === false &&
    snapshot.safety.serverTsChange === false &&
    snapshot.safety.streamIndexChange === false &&
    snapshot.safety.routeMountNow === false &&
    snapshot.safety.backendRestart === false &&
    snapshot.safety.runtimeHttpBy140U === false &&
    snapshot.safety.databaseWrite === false &&
    snapshot.safety.providerCall === false &&
    snapshot.safety.walletMutation === false &&
    snapshot.safety.paymentAuthorization === false &&
    snapshot.safety.monthlyPayout === false &&
    snapshot.safety.moneyMovement === false &&
    snapshot.safety.fakeSuccess === false;

  const ready = envelopeReady && noFakeData && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "read_only_route_handler_envelope_batch_ready" : "read_only_route_handler_envelope_batch_blocked",
    totals: snapshot.totals,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-140V controlled authenticated GET runner for read-only routes/ops-only",
  } as const;
}
