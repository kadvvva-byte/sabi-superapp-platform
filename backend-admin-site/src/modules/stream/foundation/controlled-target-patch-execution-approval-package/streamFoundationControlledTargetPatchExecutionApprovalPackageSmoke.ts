import { getStreamFoundationControlledTargetPatchExecutionApprovalPackageSnapshot } from "./streamFoundationControlledTargetPatchExecutionApprovalPackage";
import { getStreamFoundationControlledTargetPatchExecutionApprovalPackageReadiness } from "./streamFoundationControlledTargetPatchExecutionApprovalPackageReadiness";

export function runStreamFoundationControlledTargetPatchExecutionApprovalPackageSmoke() {
  const snapshot = getStreamFoundationControlledTargetPatchExecutionApprovalPackageSnapshot();
  const readiness = getStreamFoundationControlledTargetPatchExecutionApprovalPackageReadiness();

  const assertions = [
    {
      id: "142l_detection_passed",
      passed:
        snapshot.detection142L.ok === true &&
        snapshot.detection142L.exactTargetDetected === true &&
        snapshot.detection142L.primaryTargetFile === "src/app.ts" &&
        snapshot.detection142L.routeContextsFound === 3 &&
        snapshot.detection142L.tscExitCode === 0,
      evidence: JSON.stringify(snapshot.detection142L),
    },
    {
      id: "only_src_app_ts_allowed_for_142n",
      passed:
        snapshot.approvedPatchScopeForNextStage.onlyTargetFileAllowedFor142N === "src/app.ts" &&
        snapshot.approvedPatchScopeForNextStage.serverTsWriteAllowedFor142N === false &&
        snapshot.approvedPatchScopeForNextStage.streamIndexWriteAllowedFor142N === false &&
        snapshot.routePatchApprovalItems.every((item) => item.targetFile === "src/app.ts"),
      evidence: JSON.stringify(snapshot.approvedPatchScopeForNextStage),
    },
    {
      id: "exact_approval_for_142n_present",
      passed:
        snapshot.requiredExactApprovalTextFor142N.includes("BACKEND-STREAM-FOUNDATION-142N") &&
        snapshot.requiredExactApprovalTextFor142N.includes("modify only src/app.ts") &&
        snapshot.requiredExactApprovalTextFor142N.includes("preserving 423 blocked behavior") &&
        snapshot.requiredExactApprovalTextFor142N.includes("no runtime POST") &&
        snapshot.requiredExactApprovalTextFor142N.includes("no DB write") &&
        snapshot.requiredExactApprovalTextFor142N.includes("no provider call") &&
        snapshot.requiredExactApprovalTextFor142N.includes("no Wallet mutation") &&
        snapshot.requiredExactApprovalTextFor142N.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor142N,
    },
    {
      id: "routes_must_remain_blocked",
      passed:
        snapshot.routePatchApprovalItems.length === 3 &&
        snapshot.routePatchApprovalItems.every((item) => item.mustPreserveStatusCode === 423) &&
        snapshot.routePatchApprovalItems.every((item) => item.routeBehaviorMustRemainBlocked === true),
      evidence: JSON.stringify(snapshot.routePatchApprovalItems),
    },
    {
      id: "no_runtime_or_money_actions_by_142m",
      passed:
        snapshot.safety.targetWriteBy142M === false &&
        snapshot.safety.runtimePostBy142M === false &&
        snapshot.safety.databaseWriteBy142M === false &&
        snapshot.safety.providerCallBy142M === false &&
        snapshot.safety.walletMutationBy142M === false &&
        snapshot.safety.moneyMovementBy142M === false,
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
    stage: "controlled_target_patch_execution_approval_package_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "target_patch_execution_approval_package_smoke_passed" : "target_patch_execution_approval_package_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
