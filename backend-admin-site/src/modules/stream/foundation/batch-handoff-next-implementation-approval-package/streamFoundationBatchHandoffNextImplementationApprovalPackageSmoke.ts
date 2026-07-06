import { getStreamFoundationBatchHandoffNextImplementationApprovalPackageSnapshot } from "./streamFoundationBatchHandoffNextImplementationApprovalPackage";
import { getStreamFoundationBatchHandoffNextImplementationApprovalPackageReadiness } from "./streamFoundationBatchHandoffNextImplementationApprovalPackageReadiness";

export function runStreamFoundationBatchHandoffNextImplementationApprovalPackageSmoke() {
  const snapshot = getStreamFoundationBatchHandoffNextImplementationApprovalPackageSnapshot();
  const readiness = getStreamFoundationBatchHandoffNextImplementationApprovalPackageReadiness();

  const assertions = [
    {
      id: "142a_verification_passed",
      passed:
        snapshot.verification142A.ok === true &&
        snapshot.verification142A.expectedChecksPassed === 20 &&
        snapshot.verification142A.expectedChecksFailed === 0 &&
        snapshot.verification142A.targetSafetyOk === true &&
        snapshot.verification142A.stageSourceSafetyOk === true &&
        snapshot.verification142A.tscExitCode === 0,
      evidence: JSON.stringify(snapshot.verification142A),
    },
    {
      id: "handoff_stages_ready",
      passed:
        snapshot.handoffStages.length === 11 &&
        snapshot.handoffStages.every((stage) => stage.routesRemainBlocked === true) &&
        snapshot.handoffStages.every((stage) => stage.runtimeSuccessAllowedNow === false),
      evidence: JSON.stringify(snapshot.handoffStages.map((stage) => stage.id)),
    },
    {
      id: "exact_approval_for_142c_present",
      passed:
        snapshot.requiredExactApprovalTextFor142C.includes("BACKEND-STREAM-FOUNDATION-142C") &&
        snapshot.requiredExactApprovalTextFor142C.includes("source-only runtime handler draft") &&
        snapshot.requiredExactApprovalTextFor142C.includes("do not write src/app.ts") &&
        snapshot.requiredExactApprovalTextFor142C.includes("no runtime POST") &&
        snapshot.requiredExactApprovalTextFor142C.includes("no DB write") &&
        snapshot.requiredExactApprovalTextFor142C.includes("no provider call") &&
        snapshot.requiredExactApprovalTextFor142C.includes("no Wallet mutation") &&
        snapshot.requiredExactApprovalTextFor142C.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor142C,
    },
    {
      id: "routes_remain_blocked_423",
      passed:
        snapshot.nextApprovalPolicy.nextStageMustKeepRoutesBlocked === true &&
        snapshot.nextApprovalPolicy.expectedCurrentStatusCode === 423 &&
        snapshot.nextApprovalPolicy.runtimeSuccessAllowedNow === false &&
        snapshot.totals.fakeSuccessAllowedNow === 0,
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
    stage: "source_only_batch_handoff_and_next_controlled_implementation_approval_package_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "batch_handoff_approval_package_smoke_passed" : "batch_handoff_approval_package_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
