import { getStreamFoundationRuntimeHandlerDraftHandoffBindingApprovalPackageSnapshot } from "./streamFoundationRuntimeHandlerDraftHandoffBindingApprovalPackage";
import { getStreamFoundationRuntimeHandlerDraftHandoffBindingApprovalPackageReadiness } from "./streamFoundationRuntimeHandlerDraftHandoffBindingApprovalPackageReadiness";

export function runStreamFoundationRuntimeHandlerDraftHandoffBindingApprovalPackageSmoke() {
  const snapshot = getStreamFoundationRuntimeHandlerDraftHandoffBindingApprovalPackageSnapshot();
  const readiness = getStreamFoundationRuntimeHandlerDraftHandoffBindingApprovalPackageReadiness();

  const assertions = [
    {
      id: "142d_fix1_verification_passed",
      passed:
        snapshot.verification142DFix1.ok === true &&
        snapshot.verification142DFix1.expectedChecksPassed === 6 &&
        snapshot.verification142DFix1.expectedChecksFailed === 0 &&
        snapshot.verification142DFix1.targetBindingSafetyOk === true &&
        snapshot.verification142DFix1.handlerSourceSafetyOk === true &&
        snapshot.verification142DFix1.manifestSafetyOk === true &&
        snapshot.verification142DFix1.tscExitCode === 0,
      evidence: JSON.stringify(snapshot.verification142DFix1),
    },
    {
      id: "handoff_items_ready",
      passed:
        snapshot.handoffItems.length === 6 &&
        snapshot.handoffItems.every((item) => item.routesRemainBlocked === true) &&
        snapshot.handoffItems.every((item) => item.bindingAllowedNow === false) &&
        snapshot.handoffItems.every((item) => item.runtimeSuccessAllowedNow === false),
      evidence: JSON.stringify(snapshot.handoffItems.map((item) => item.id)),
    },
    {
      id: "exact_approval_for_142f_present",
      passed:
        snapshot.requiredExactApprovalTextFor142F.includes("BACKEND-STREAM-FOUNDATION-142F") &&
        snapshot.requiredExactApprovalTextFor142F.includes("controlled binding plan source-only only") &&
        snapshot.requiredExactApprovalTextFor142F.includes("do not write src/app.ts") &&
        snapshot.requiredExactApprovalTextFor142F.includes("no runtime POST") &&
        snapshot.requiredExactApprovalTextFor142F.includes("no DB write") &&
        snapshot.requiredExactApprovalTextFor142F.includes("no provider call") &&
        snapshot.requiredExactApprovalTextFor142F.includes("no Wallet mutation") &&
        snapshot.requiredExactApprovalTextFor142F.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor142F,
    },
    {
      id: "routes_remain_blocked_423",
      passed:
        snapshot.nextApprovalPolicy.nextStageMustKeepRoutesBlocked === true &&
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
    stage: "runtime_handler_draft_handoff_and_controlled_binding_approval_package_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "runtime_handler_handoff_approval_package_smoke_passed" : "runtime_handler_handoff_approval_package_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
