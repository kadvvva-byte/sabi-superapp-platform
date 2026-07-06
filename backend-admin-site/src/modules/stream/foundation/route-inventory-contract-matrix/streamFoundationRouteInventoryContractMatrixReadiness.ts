import { getStreamFoundationRouteInventoryContractMatrixSnapshot } from "./streamFoundationRouteInventoryContractMatrix";

export function getStreamFoundationRouteInventoryContractMatrixReadiness() {
  const snapshot = getStreamFoundationRouteInventoryContractMatrixSnapshot();

  const diagnosticsReady =
    snapshot.authenticatedDiagnosticsReady === true &&
    snapshot.totals.authenticatedGetPassed === 2 &&
    snapshot.routeInventory.some((route) => route.path === "/api/admin/stream/foundation/diagnostics/readiness" && route.runtimeStatus === "authenticated_get_passed") &&
    snapshot.routeInventory.some((route) => route.path === "/api/admin/stream/foundation/diagnostics/preview" && route.runtimeStatus === "authenticated_get_passed");

  const inventoryReady =
    snapshot.totals.total === snapshot.routeInventory.length &&
    snapshot.totals.total >= 7 &&
    snapshot.routeInventory.every((route) => route.blockedActions.includes("money_movement")) &&
    snapshot.routeInventory.every((route) => route.blockedActions.includes("fake_success"));

  const safetyReady =
    snapshot.safety.sourceOnly === true &&
    snapshot.safety.appTsChange === false &&
    snapshot.safety.serverTsChange === false &&
    snapshot.safety.streamIndexChange === false &&
    snapshot.safety.backendRestart === false &&
    snapshot.safety.runtimeHttpBy140T === false &&
    snapshot.safety.databaseWrite === false &&
    snapshot.safety.providerCall === false &&
    snapshot.safety.walletMutation === false &&
    snapshot.safety.paymentAuthorization === false &&
    snapshot.safety.monthlyPayout === false &&
    snapshot.safety.moneyMovement === false &&
    snapshot.safety.fakeSuccess === false;

  const ready = diagnosticsReady && inventoryReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "route_inventory_contract_matrix_ready" : "route_inventory_contract_matrix_blocked",
    totals: snapshot.totals,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-140U read-only route handler envelope batch/source-only",
  } as const;
}
