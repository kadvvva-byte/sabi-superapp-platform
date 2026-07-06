import { getStreamFoundationOwnerRuntimeMountApprovalGatePlanningSnapshot } from "./streamFoundationOwnerRuntimeMountApprovalGatePlanning";
import { getStreamFoundationOwnerRuntimeMountApprovalGatePlanningReadiness } from "./streamFoundationOwnerRuntimeMountApprovalGatePlanningReadiness";

export function runStreamFoundationOwnerRuntimeMountApprovalGatePlanningSmoke() {
  const snapshot = getStreamFoundationOwnerRuntimeMountApprovalGatePlanningSnapshot();
  const readiness = getStreamFoundationOwnerRuntimeMountApprovalGatePlanningReadiness();

  const assertions = [
    {
      id: "approval_boundaries_planned",
      passed: snapshot.approvalBoundaries.length === 8 && snapshot.totals.approvalBoundaries === 8,
      evidence: JSON.stringify(snapshot.approvalBoundaries.map((boundary) => boundary.id)),
    },
    {
      id: "exact_approval_text_present",
      passed:
        snapshot.requiredExactApprovalTextForNextPlanning.includes("BACKEND-STREAM-FOUNDATION") &&
        snapshot.requiredExactApprovalTextForNextPlanning.includes("no DB write") &&
        snapshot.requiredExactApprovalTextForNextPlanning.includes("no provider call") &&
        snapshot.requiredExactApprovalTextForNextPlanning.includes("no Wallet mutation") &&
        snapshot.requiredExactApprovalTextForNextPlanning.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextForNextPlanning,
    },
    {
      id: "routes_remain_blocked_423",
      passed:
        snapshot.ownerApprovalPolicy.blockedRoutesMustRemain423Now === true &&
        snapshot.ownerApprovalPolicy.routesStayBlockedNow === true &&
        snapshot.ownerApprovalPolicy.expectedCurrentStatusCode === 423 &&
        snapshot.totals.runtimeSuccessAllowedNow === 0 &&
        snapshot.totals.fakeSuccessAllowedNow === 0,
      evidence: JSON.stringify(snapshot.ownerApprovalPolicy),
    },
    {
      id: "implementation_not_allowed_now",
      passed:
        snapshot.totals.readyForRuntimeMountNow === 0 &&
        snapshot.totals.implementationAllowedNow === 0 &&
        snapshot.approvalBoundaries.every((boundary) => boundary.implementationAllowedNow === false),
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
    stage: "owner_runtime_mount_approval_gate_source_only_planning_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "owner_runtime_mount_approval_gate_smoke_passed" : "owner_runtime_mount_approval_gate_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
