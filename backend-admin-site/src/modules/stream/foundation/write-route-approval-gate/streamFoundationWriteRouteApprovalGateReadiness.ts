import { getStreamFoundationWriteRouteApprovalGateSnapshot } from "./streamFoundationWriteRouteApprovalGate";

export function getStreamFoundationWriteRouteApprovalGateReadiness() {
  const snapshot = getStreamFoundationWriteRouteApprovalGateSnapshot();

  const routesLocked =
    snapshot.writeRoutes.length >= 7 &&
    snapshot.writeRoutes.every((route) => route.mountedNow === false) &&
    snapshot.writeRoutes.every((route) => route.runtimeWriteAllowedNow === false) &&
    snapshot.writeRoutes.every((route) => route.databaseWriteAllowedNow === false) &&
    snapshot.writeRoutes.every((route) => route.providerCallAllowedNow === false) &&
    snapshot.writeRoutes.every((route) => route.walletMutationAllowedNow === false) &&
    snapshot.writeRoutes.every((route) => route.paymentAuthorizationAllowedNow === false) &&
    snapshot.writeRoutes.every((route) => route.monthlyPayoutAllowedNow === false) &&
    snapshot.writeRoutes.every((route) => route.moneyMovementAllowedNow === false) &&
    snapshot.writeRoutes.every((route) => route.fakeSuccessAllowed === false);

  const blockedUntilApproval =
    snapshot.writeRoutes.some((route) => route.approvalStatus === "blocked_requires_owner_approval") &&
    snapshot.writeRoutes.some((route) => route.approvalStatus === "blocked_until_provider_wallet_ledger_ready") &&
    snapshot.writeRoutes.some((route) => route.approvalStatus === "blocked_until_moderation_policy_ready");

  const totalsReady =
    snapshot.totals.totalWriteRoutes === snapshot.writeRoutes.length &&
    snapshot.totals.mountedNow === 0 &&
    snapshot.totals.runtimeWriteAllowedNow === 0 &&
    snapshot.totals.databaseWriteAllowedNow === 0 &&
    snapshot.totals.providerCallAllowedNow === 0 &&
    snapshot.totals.walletMutationAllowedNow === 0 &&
    snapshot.totals.paymentAuthorizationAllowedNow === 0 &&
    snapshot.totals.monthlyPayoutAllowedNow === 0 &&
    snapshot.totals.moneyMovementAllowedNow === 0 &&
    snapshot.totals.fakeSuccessAllowed === 0;

  const safetyReady =
    snapshot.safety.sourceOnly === true &&
    snapshot.safety.appTsChange === false &&
    snapshot.safety.serverTsChange === false &&
    snapshot.safety.streamIndexChange === false &&
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
    snapshot.safety.fakeSuccess === false;

  const ready = snapshot.readOnlyRoutesVerified === true && routesLocked && blockedUntilApproval && totalsReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "write_route_approval_gate_ready_all_runtime_writes_blocked" : "write_route_approval_gate_blocked",
    totalWriteRoutes: snapshot.totals.totalWriteRoutes,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-140X live write handler source-only plan or read route mount approval package",
  } as const;
}
