import { getStreamFoundationRouteInventoryContractMatrixSnapshot } from "./streamFoundationRouteInventoryContractMatrix";
import { getStreamFoundationRouteInventoryContractMatrixReadiness } from "./streamFoundationRouteInventoryContractMatrixReadiness";

export function runStreamFoundationRouteInventoryContractMatrixSmoke() {
  const snapshot = getStreamFoundationRouteInventoryContractMatrixSnapshot();
  const readiness = getStreamFoundationRouteInventoryContractMatrixReadiness();

  const assertions = [
    {
      id: "diagnostics_routes_passed_locked",
      passed: snapshot.totals.authenticatedGetPassed === 2 && snapshot.authenticatedDiagnosticsReady === true,
      evidence: JSON.stringify(snapshot.totals),
    },
    {
      id: "read_only_preview_route_source_only",
      passed: snapshot.routeInventory.some((route) => route.routeId === "stream_foundation_preview" && route.runtimeStatus === "source_only_ready_unmounted" && route.allowedNow === false),
      evidence: JSON.stringify(snapshot.routeInventory.filter((route) => route.routeId === "stream_foundation_preview")),
    },
    {
      id: "write_routes_not_mounted",
      passed: snapshot.routeInventory
        .filter((route) => route.method === "POST")
        .every((route) => route.allowedNow === false && route.mountedNow === false && route.sourceOnly === true),
      evidence: JSON.stringify(snapshot.routeInventory.filter((route) => route.method === "POST")),
    },
    {
      id: "wallet_gift_boundary_blocked",
      passed: snapshot.routeInventory.some((route) => route.routeId === "stream_gift_purchase_gate" && route.runtimeStatus === "blocked_until_provider_wallet_ledger_ready"),
      evidence: JSON.stringify(snapshot.routeInventory.filter((route) => route.routeId === "stream_gift_purchase_gate")),
    },
    {
      id: "safety_no_runtime_money_provider_wallet",
      passed:
        snapshot.safety.backendRestart === false &&
        snapshot.safety.runtimeHttpBy140T === false &&
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
    stage: "route_inventory_contract_matrix_source_only_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "route_inventory_contract_matrix_smoke_passed" : "route_inventory_contract_matrix_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
