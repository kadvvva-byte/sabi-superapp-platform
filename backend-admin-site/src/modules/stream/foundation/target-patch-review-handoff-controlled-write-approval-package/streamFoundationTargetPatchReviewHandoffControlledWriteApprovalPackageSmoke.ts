import { getStreamFoundationTargetPatchReviewHandoffControlledWriteApprovalPackageSnapshot } from "./streamFoundationTargetPatchReviewHandoffControlledWriteApprovalPackage";
import { getStreamFoundationTargetPatchReviewHandoffControlledWriteApprovalPackageReadiness } from "./streamFoundationTargetPatchReviewHandoffControlledWriteApprovalPackageReadiness";

export function runStreamFoundationTargetPatchReviewHandoffControlledWriteApprovalPackageSmoke() {
  const snapshot = getStreamFoundationTargetPatchReviewHandoffControlledWriteApprovalPackageSnapshot();
  const readiness = getStreamFoundationTargetPatchReviewHandoffControlledWriteApprovalPackageReadiness();

  const assertions = [
    {
      id: "142j_verification_passed",
      passed:
        snapshot.verification142J.ok === true &&
        snapshot.verification142J.expectedChecksPassed === 6 &&
        snapshot.verification142J.expectedChecksFailed === 0 &&
        snapshot.verification142J.targetUntouchedSafetyOk === true &&
        snapshot.verification142J.patchReviewSourceSafetyOk === true &&
        snapshot.verification142J.manifestSafetyOk === true &&
        snapshot.verification142J.tscExitCode === 0,
      evidence: JSON.stringify(snapshot.verification142J),
    },
    {
      id: "handoff_items_ready_no_target_write_now",
      passed:
        snapshot.handoffItems.length === 6 &&
        snapshot.handoffItems.every((item) => item.routesRemainBlocked === true) &&
        snapshot.handoffItems.every((item) => item.targetWriteAllowedNow === false) &&
        snapshot.handoffItems.every((item) => item.routeBindingAllowedNow === false),
      evidence: JSON.stringify(snapshot.handoffItems.map((item) => item.id)),
    },
    {
      id: "exact_approval_for_142l_present",
      passed:
        snapshot.requiredExactApprovalTextFor142L.includes("BACKEND-STREAM-FOUNDATION-142L") &&
        snapshot.requiredExactApprovalTextFor142L.includes("controlled target write preflight and patch draft only") &&
        snapshot.requiredExactApprovalTextFor142L.includes("preserving 423 blocked behavior") &&
        snapshot.requiredExactApprovalTextFor142L.includes("no runtime POST") &&
        snapshot.requiredExactApprovalTextFor142L.includes("no DB write") &&
        snapshot.requiredExactApprovalTextFor142L.includes("no provider call") &&
        snapshot.requiredExactApprovalTextFor142L.includes("no Wallet mutation") &&
        snapshot.requiredExactApprovalTextFor142L.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor142L,
    },
    {
      id: "routes_remain_blocked_423",
      passed:
        snapshot.nextApprovalPolicy.nextStageMustPreserveBlocked423Behavior === true &&
        snapshot.nextApprovalPolicy.expectedCurrentStatusCode === 423 &&
        snapshot.nextApprovalPolicy.routeBindingAllowedNow === false &&
        snapshot.nextApprovalPolicy.runtimeSuccessAllowedNow === false,
      evidence: JSON.stringify(snapshot.nextApprovalPolicy),
    },
    {
      id: "no_runtime_or_money_actions",
      passed:
        snapshot.totals.runtimePostAllowedNow === 0 &&
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
    stage: "target_patch_review_handoff_and_controlled_target_write_approval_package_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "target_patch_review_handoff_controlled_write_approval_package_smoke_passed" : "target_patch_review_handoff_controlled_write_approval_package_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
