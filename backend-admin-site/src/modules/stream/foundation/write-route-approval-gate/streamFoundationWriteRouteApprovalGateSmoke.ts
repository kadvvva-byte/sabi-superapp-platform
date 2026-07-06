import { getStreamFoundationWriteRouteApprovalGateSnapshot } from "./streamFoundationWriteRouteApprovalGate";
import { getStreamFoundationWriteRouteApprovalGateReadiness } from "./streamFoundationWriteRouteApprovalGateReadiness";

export function runStreamFoundationWriteRouteApprovalGateSmoke() {
  const snapshot = getStreamFoundationWriteRouteApprovalGateSnapshot();
  const readiness = getStreamFoundationWriteRouteApprovalGateReadiness();

  const assertions = [
    {
      id: "previous_read_only_get_runner_passed",
      passed: snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-140V" && snapshot.readOnlyRoutesVerified === true,
      evidence: `${snapshot.previousStage}:${snapshot.readOnlyRoutesVerified}`,
    },
    {
      id: "all_write_routes_unmounted_and_blocked",
      passed:
        snapshot.writeRoutes.every((route) => route.mountedNow === false) &&
        snapshot.writeRoutes.every((route) => route.runtimeWriteAllowedNow === false),
      evidence: JSON.stringify(snapshot.writeRoutes),
    },
    {
      id: "wallet_and_payout_money_routes_blocked",
      passed:
        snapshot.writeRoutes.some((route) => route.kind === "gift_wallet_boundary_write" && route.approvalStatus === "blocked_until_provider_wallet_ledger_ready") &&
        snapshot.writeRoutes.some((route) => route.kind === "monthly_payout_boundary_write" && route.approvalStatus === "blocked_until_provider_wallet_ledger_ready"),
      evidence: JSON.stringify(snapshot.writeRoutes.filter((route) => route.kind.includes("wallet") || route.kind.includes("payout"))),
    },
    {
      id: "no_db_provider_wallet_money_flags",
      passed:
        snapshot.totals.databaseWriteAllowedNow === 0 &&
        snapshot.totals.providerCallAllowedNow === 0 &&
        snapshot.totals.walletMutationAllowedNow === 0 &&
        snapshot.totals.paymentAuthorizationAllowedNow === 0 &&
        snapshot.totals.monthlyPayoutAllowedNow === 0 &&
        snapshot.totals.moneyMovementAllowedNow === 0 &&
        snapshot.totals.fakeSuccessAllowed === 0,
      evidence: JSON.stringify(snapshot.totals),
    },
    {
      id: "safety_no_runtime_mutation",
      passed:
        snapshot.safety.routeMountNow === false &&
        snapshot.safety.backendRestart === false &&
        snapshot.safety.runtimeHttpBy140W === false &&
        snapshot.safety.postPutPatchDeleteBy140W === false &&
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
    stage: "write_route_approval_gate_source_only_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "write_route_approval_gate_smoke_passed" : "write_route_approval_gate_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
