import { getStreamFoundationControlledRouteBindingApprovalPackageSnapshot } from "./streamFoundationControlledRouteBindingApprovalPackage";
import { getStreamFoundationControlledRouteBindingApprovalPackageReadiness } from "./streamFoundationControlledRouteBindingApprovalPackageReadiness";

export function runStreamFoundationControlledRouteBindingApprovalPackageSmoke() {
  const snapshot = getStreamFoundationControlledRouteBindingApprovalPackageSnapshot();
  const readiness = getStreamFoundationControlledRouteBindingApprovalPackageReadiness();

  const assertions = [
    {
      id: "three_exact_approval_items_ready",
      passed: snapshot.approvalItems.length === 3 && snapshot.totals.exactApprovalRequired === 3,
      evidence: JSON.stringify(snapshot.approvalItems.map((item) => item.routeId)),
    },
    {
      id: "no_route_mount_or_runtime_post_by_141c",
      passed:
        snapshot.totals.appTsPatchAllowedBy141C === 0 &&
        snapshot.totals.serverTsPatchAllowedBy141C === 0 &&
        snapshot.totals.streamIndexPatchAllowedBy141C === 0 &&
        snapshot.totals.routeMountAllowedBy141C === 0 &&
        snapshot.totals.runtimePostAllowedBy141C === 0 &&
        snapshot.totals.runtimeSmokeAllowedBy141C === 0,
      evidence: JSON.stringify(snapshot.totals),
    },
    {
      id: "no_db_provider_wallet_money",
      passed:
        snapshot.totals.databaseWriteAllowedBy141C === 0 &&
        snapshot.totals.providerCallAllowedBy141C === 0 &&
        snapshot.totals.walletMutationAllowedBy141C === 0 &&
        snapshot.totals.moneyMovementAllowedBy141C === 0 &&
        snapshot.totals.fakeSuccessAllowedBy141C === 0,
      evidence: JSON.stringify(snapshot.totals),
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
    stage: "controlled_route_binding_source_only_approval_package_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "route_binding_approval_package_smoke_passed" : "route_binding_approval_package_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
