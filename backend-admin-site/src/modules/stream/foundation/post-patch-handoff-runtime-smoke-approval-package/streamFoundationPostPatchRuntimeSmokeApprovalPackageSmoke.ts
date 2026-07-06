import { getStreamFoundationPostPatchRuntimeSmokeApprovalPackageSnapshot } from "./streamFoundationPostPatchRuntimeSmokeApprovalPackage";
import { getStreamFoundationPostPatchRuntimeSmokeApprovalPackageReadiness } from "./streamFoundationPostPatchRuntimeSmokeApprovalPackageReadiness";

export function runStreamFoundationPostPatchRuntimeSmokeApprovalPackageSmoke() {
  const snapshot = getStreamFoundationPostPatchRuntimeSmokeApprovalPackageSnapshot();
  const readiness = getStreamFoundationPostPatchRuntimeSmokeApprovalPackageReadiness();

  const assertions = [
    {
      id: "142o_fix2_verification_passed",
      passed:
        snapshot.verification142OFix2.ok === true &&
        snapshot.verification142OFix2.routeBindingPassed === 3 &&
        snapshot.verification142OFix2.runtimeImportOk === true &&
        snapshot.verification142OFix2.routePatchContextSafetyOk === true &&
        snapshot.verification142OFix2.tscExitCode === 0,
      evidence: JSON.stringify(snapshot.verification142OFix2),
    },
    {
      id: "runtime_smoke_routes_limited_to_three_live_write_routes",
      passed:
        snapshot.runtimeSmokeApprovalRoutes.length === 3 &&
        snapshot.runtimeSmokeApprovalRoutes.some((route) => route.path === "/api/stream/live/start") &&
        snapshot.runtimeSmokeApprovalRoutes.some((route) => route.path === "/api/stream/live/stop") &&
        snapshot.runtimeSmokeApprovalRoutes.some((route) => route.path === "/api/stream/live/heartbeat"),
      evidence: JSON.stringify(snapshot.runtimeSmokeApprovalRoutes.map((route) => route.path)),
    },
    {
      id: "all_runtime_smoke_routes_expect_423_blocked",
      passed:
        snapshot.runtimeSmokeApprovalRoutes.every((route) => route.expectedStatusCode === 423) &&
        snapshot.runtimeSmokeApprovalRoutes.every((route) => route.expectedBlockedBehavior === true),
      evidence: JSON.stringify(snapshot.runtimeSmokeApprovalRoutes),
    },
    {
      id: "exact_approval_for_142q_present",
      passed:
        snapshot.requiredExactApprovalTextFor142Q.includes("BACKEND-STREAM-FOUNDATION-142Q") &&
        snapshot.requiredExactApprovalTextFor142Q.includes("controlled blocked-route runtime POST smoke only") &&
        snapshot.requiredExactApprovalTextFor142Q.includes("423 blocked") &&
        snapshot.requiredExactApprovalTextFor142Q.includes("no DB write") &&
        snapshot.requiredExactApprovalTextFor142Q.includes("no provider call") &&
        snapshot.requiredExactApprovalTextFor142Q.includes("no Wallet mutation") &&
        snapshot.requiredExactApprovalTextFor142Q.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor142Q,
    },
    {
      id: "142p_does_not_run_runtime",
      passed:
        snapshot.safety.runtimeHttpBy142P === false &&
        snapshot.safety.runtimePostBy142P === false &&
        snapshot.safety.databaseWriteBy142P === false &&
        snapshot.safety.providerCallBy142P === false &&
        snapshot.safety.walletMutationBy142P === false &&
        snapshot.safety.moneyMovementBy142P === false,
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
    stage: "post_patch_handoff_and_controlled_blocked_route_runtime_smoke_approval_package_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "post_patch_runtime_smoke_approval_package_smoke_passed" : "post_patch_runtime_smoke_approval_package_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
