import { getStreamFoundationControlledTargetPatchApprovalPackageSnapshot } from "./streamFoundationControlledTargetPatchApprovalPackage";
import { getStreamFoundationControlledTargetPatchApprovalPackageReadiness } from "./streamFoundationControlledTargetPatchApprovalPackageReadiness";

export function runStreamFoundationControlledTargetPatchApprovalPackageSmoke() {
  const snapshot = getStreamFoundationControlledTargetPatchApprovalPackageSnapshot();
  const readiness = getStreamFoundationControlledTargetPatchApprovalPackageReadiness();

  const assertions = [
    {
      id: "approval_targets_ready",
      passed:
        snapshot.approvalTargets.length === 2 &&
        snapshot.approvalTargets.some((target) => target.targetFile === "src/app.ts") &&
        snapshot.approvalTargets.some((target) => target.targetFile === "src/modules/stream/index.ts") &&
        snapshot.forbiddenTargets.includes("src/server.ts"),
      evidence: JSON.stringify({ approvalTargets: snapshot.approvalTargets.map((target) => target.targetFile), forbiddenTargets: snapshot.forbiddenTargets }),
    },
    {
      id: "no_write_mount_runtime_by_141g",
      passed:
        snapshot.totals.writeAllowedBy141G === 0 &&
        snapshot.totals.routeMountAllowedBy141G === 0 &&
        snapshot.totals.runtimePostAllowedBy141G === 0 &&
        snapshot.totals.runtimeSmokeAllowedBy141G === 0 &&
        snapshot.totals.backendRestartAllowedBy141G === 0,
      evidence: JSON.stringify(snapshot.totals),
    },
    {
      id: "no_db_provider_wallet_money",
      passed:
        snapshot.totals.databaseWriteAllowedBy141G === 0 &&
        snapshot.totals.providerCallAllowedBy141G === 0 &&
        snapshot.totals.walletMutationAllowedBy141G === 0 &&
        snapshot.totals.moneyMovementAllowedBy141G === 0 &&
        snapshot.totals.fakeSuccessAllowedBy141G === 0,
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
    stage: "controlled_source_only_target_patch_approval_package_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "controlled_target_patch_approval_smoke_passed" : "controlled_target_patch_approval_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
