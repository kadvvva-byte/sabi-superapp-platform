import { getStreamFoundationKernelDiagnosticsControlledRuntimeSmokeApprovalPackageReadiness } from "./streamFoundationKernelDiagnosticsControlledRuntimeSmokeApprovalPackageReadiness";
import { getStreamFoundationKernelDiagnosticsControlledRuntimeSmokeApprovalPackageSnapshot } from "./streamFoundationKernelDiagnosticsControlledRuntimeSmokeApprovalPackage";

export interface StreamFoundation140JRuntimeSmokeApprovalSmokeResult {
  readonly ok: boolean;
  readonly status: "controlled_runtime_smoke_approval_package_smoke_passed" | "controlled_runtime_smoke_approval_package_smoke_blocked";
  readonly assertions: readonly string[];
  readonly failedAssertions: readonly string[];
}

export function runStreamFoundationKernelDiagnosticsControlledRuntimeSmokeApprovalPackageSmoke(): StreamFoundation140JRuntimeSmokeApprovalSmokeResult {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledRuntimeSmokeApprovalPackageSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsControlledRuntimeSmokeApprovalPackageReadiness();

  const assertionMap: readonly [string, boolean][] = [
    ["readiness is true", readiness.ready],
    ["source-only allowed path is foundation-only", snapshot.allowedPatchPaths.length === 1 && snapshot.allowedPatchPaths[0] === "src/modules/stream/foundation/**"],
    ["runtime HTTP smoke was not performed by 140J", snapshot.safetyLocks.runtimeHttpSmokePerformedByThisPackage === 0],
    ["backend restart was not performed", snapshot.safetyLocks.backendRestartPerformed === 0],
    ["database write was not performed", snapshot.safetyLocks.databaseWritePerformed === 0],
    ["provider call was not performed", snapshot.safetyLocks.providerCallPerformed === 0],
    ["Wallet mutation was not performed", snapshot.safetyLocks.walletMutationPerformed === 0],
    ["money movement was not performed", snapshot.safetyLocks.moneyMovementPerformed === 0],
    ["fake success is not allowed", snapshot.safetyLocks.fakeSuccessAllowed === false],
    ["next smoke targets are present", snapshot.nextRuntimeSmokeTargets.length === 3],
    ["all next smoke targets are GET", snapshot.nextRuntimeSmokeTargets.every((target) => target.method === "GET")],
    ["exact next approval phrase is present", snapshot.requiredNextApprovalPhrase.includes("BACKEND-STREAM-FOUNDATION-140K")],
  ];

  const failedAssertions = assertionMap.filter(([, passed]) => !passed).map(([label]) => label);

  return {
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0
      ? "controlled_runtime_smoke_approval_package_smoke_passed"
      : "controlled_runtime_smoke_approval_package_smoke_blocked",
    assertions: assertionMap.map(([label]) => label),
    failedAssertions,
  };
}
