import { getStreamFoundationBindingPlanHandoffTargetPatchApprovalPackageSnapshot } from "./streamFoundationBindingPlanHandoffTargetPatchApprovalPackage";
import { getStreamFoundationBindingPlanHandoffTargetPatchApprovalPackageReadiness } from "./streamFoundationBindingPlanHandoffTargetPatchApprovalPackageReadiness";

export function runStreamFoundationBindingPlanHandoffTargetPatchApprovalPackageSmoke() {
  const snapshot = getStreamFoundationBindingPlanHandoffTargetPatchApprovalPackageSnapshot();
  const readiness = getStreamFoundationBindingPlanHandoffTargetPatchApprovalPackageReadiness();

  const assertions = [
    {
      id: "142g_verification_passed",
      passed:
        snapshot.verification142G.ok === true &&
        snapshot.verification142G.expectedChecksPassed === 6 &&
        snapshot.verification142G.expectedChecksFailed === 0 &&
        snapshot.verification142G.targetWriteSafetyOk === true &&
        snapshot.verification142G.bindingPlanSourceSafetyOk === true &&
        snapshot.verification142G.manifestSafetyOk === true &&
        snapshot.verification142G.tscExitCode === 0,
      evidence: JSON.stringify(snapshot.verification142G),
    },
    {
      id: "handoff_items_ready_no_target_patch",
      passed:
        snapshot.handoffItems.length === 6 &&
        snapshot.handoffItems.every((item) => item.routesRemainBlocked === true) &&
        snapshot.handoffItems.every((item) => item.targetPatchAllowedNow === false) &&
        snapshot.handoffItems.every((item) => item.routeBindingAllowedNow === false),
      evidence: JSON.stringify(snapshot.handoffItems.map((item) => item.id)),
    },
    {
      id: "exact_approval_for_142i_present",
      passed:
        snapshot.requiredExactApprovalTextFor142I.includes("BACKEND-STREAM-FOUNDATION-142I") &&
        snapshot.requiredExactApprovalTextFor142I.includes("controlled target patch draft review source-only only") &&
        snapshot.requiredExactApprovalTextFor142I.includes("do not write src/app.ts") &&
        snapshot.requiredExactApprovalTextFor142I.includes("no runtime POST") &&
        snapshot.requiredExactApprovalTextFor142I.includes("no DB write") &&
        snapshot.requiredExactApprovalTextFor142I.includes("no provider call") &&
        snapshot.requiredExactApprovalTextFor142I.includes("no Wallet mutation") &&
        snapshot.requiredExactApprovalTextFor142I.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor142I,
    },
    {
      id: "routes_remain_blocked_423",
      passed:
        snapshot.nextApprovalPolicy.nextStageMustKeepRoutesBlocked === true &&
        snapshot.nextApprovalPolicy.expectedCurrentStatusCode === 423 &&
        snapshot.nextApprovalPolicy.targetPatchAllowedNow === false &&
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
    stage: "binding_plan_handoff_and_controlled_target_patch_approval_package_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "binding_plan_handoff_target_patch_approval_package_smoke_passed" : "binding_plan_handoff_target_patch_approval_package_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
