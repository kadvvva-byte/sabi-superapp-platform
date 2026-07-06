import { getStreamFoundationRuntimeMountImplementationPlanningApprovalPackageSnapshot } from "./streamFoundationRuntimeMountImplementationPlanningApprovalPackage";
import { getStreamFoundationRuntimeMountImplementationPlanningApprovalPackageReadiness } from "./streamFoundationRuntimeMountImplementationPlanningApprovalPackageReadiness";

export function runStreamFoundationRuntimeMountImplementationPlanningApprovalPackageSmoke() {
  const snapshot = getStreamFoundationRuntimeMountImplementationPlanningApprovalPackageSnapshot();
  const readiness = getStreamFoundationRuntimeMountImplementationPlanningApprovalPackageReadiness();

  const assertions = [
    {
      id: "seven_gates_reviewed",
      passed: snapshot.reviewedGates.length === 7 && snapshot.totals.reviewedGates === 7,
      evidence: JSON.stringify(snapshot.reviewedGates.map((gate) => gate.id)),
    },
    {
      id: "exact_approval_for_141v_present",
      passed:
        snapshot.requiredExactApprovalTextFor141V.includes("BACKEND-STREAM-FOUNDATION-141V") &&
        snapshot.requiredExactApprovalTextFor141V.includes("source-only only") &&
        snapshot.requiredExactApprovalTextFor141V.includes("do not write src/app.ts") &&
        snapshot.requiredExactApprovalTextFor141V.includes("no runtime POST") &&
        snapshot.requiredExactApprovalTextFor141V.includes("no DB write") &&
        snapshot.requiredExactApprovalTextFor141V.includes("no provider call") &&
        snapshot.requiredExactApprovalTextFor141V.includes("no Wallet mutation") &&
        snapshot.requiredExactApprovalTextFor141V.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor141V,
    },
    {
      id: "routes_remain_blocked_423",
      passed:
        snapshot.approvalPolicy.blockedRoutesMustRemain423Now === true &&
        snapshot.approvalPolicy.routesStayBlockedNow === true &&
        snapshot.approvalPolicy.expectedCurrentStatusCode === 423 &&
        snapshot.totals.runtimeSuccessAllowedNow === 0 &&
        snapshot.totals.fakeSuccessAllowedNow === 0,
      evidence: JSON.stringify(snapshot.approvalPolicy),
    },
    {
      id: "no_implementation_or_target_write_now",
      passed:
        snapshot.approvalPolicy.implementationAllowedBy141U === false &&
        snapshot.approvalPolicy.targetSourceWriteAllowedBy141U === false &&
        snapshot.totals.implementationAllowedNow === 0 &&
        snapshot.totals.targetSourceWriteAllowedNow === 0,
      evidence: JSON.stringify(snapshot.totals),
    },
    {
      id: "no_db_provider_wallet_money",
      passed:
        snapshot.totals.databaseWriteAllowedNow === 0 &&
        snapshot.totals.providerCallAllowedNow === 0 &&
        snapshot.totals.walletMutationAllowedNow === 0 &&
        snapshot.totals.moneyMovementAllowedNow === 0,
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
    stage: "runtime_mount_implementation_planning_approval_package_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "runtime_mount_implementation_planning_approval_package_smoke_passed" : "runtime_mount_implementation_planning_approval_package_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
