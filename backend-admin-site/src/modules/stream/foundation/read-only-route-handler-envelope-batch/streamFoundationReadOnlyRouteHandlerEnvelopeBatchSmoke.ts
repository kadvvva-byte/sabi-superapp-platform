import { getStreamFoundationReadOnlyRouteHandlerEnvelopeBatchSnapshot } from "./streamFoundationReadOnlyRouteHandlerEnvelopeBatch";
import { getStreamFoundationReadOnlyRouteHandlerEnvelopeBatchReadiness } from "./streamFoundationReadOnlyRouteHandlerEnvelopeBatchReadiness";

export function runStreamFoundationReadOnlyRouteHandlerEnvelopeBatchSmoke() {
  const snapshot = getStreamFoundationReadOnlyRouteHandlerEnvelopeBatchSnapshot();
  const readiness = getStreamFoundationReadOnlyRouteHandlerEnvelopeBatchReadiness();

  const assertions = [
    {
      id: "diagnostics_live_envelopes_locked",
      passed: snapshot.totals.diagnosticsLive === 2 && snapshot.diagnosticsRoutesAlreadyLive.length === 2,
      evidence: JSON.stringify(snapshot.totals),
    },
    {
      id: "source_only_envelopes_unmounted",
      passed: snapshot.envelopes.filter((envelope) => envelope.runtimeStatus === "source_only_unmounted").every((envelope) => envelope.mountedNow === false && envelope.allowedBeforeMount === false),
      evidence: JSON.stringify(snapshot.envelopes.filter((envelope) => envelope.runtimeStatus === "source_only_unmounted")),
    },
    {
      id: "no_fake_data_or_provider_wallet_reads",
      passed:
        snapshot.totals.fakeDataRoutes === 0 &&
        snapshot.totals.routesRequiringDatabaseNow === 0 &&
        snapshot.totals.routesRequiringProviderNow === 0 &&
        snapshot.totals.routesRequiringWalletNow === 0,
      evidence: JSON.stringify(snapshot.totals),
    },
    {
      id: "safety_no_runtime_money_provider_wallet",
      passed:
        snapshot.safety.routeMountNow === false &&
        snapshot.safety.backendRestart === false &&
        snapshot.safety.runtimeHttpBy140U === false &&
        snapshot.safety.databaseWrite === false &&
        snapshot.safety.providerCall === false &&
        snapshot.safety.walletMutation === false &&
        snapshot.safety.paymentAuthorization === false &&
        snapshot.safety.monthlyPayout === false &&
        snapshot.safety.moneyMovement === false &&
        snapshot.safety.fakeSuccess === false,
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
    stage: "read_only_route_handler_envelope_batch_source_only_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "read_only_envelope_batch_smoke_passed" : "read_only_envelope_batch_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
