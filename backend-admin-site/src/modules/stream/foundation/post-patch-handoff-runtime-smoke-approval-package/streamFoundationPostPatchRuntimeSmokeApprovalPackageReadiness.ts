import { getStreamFoundationPostPatchRuntimeSmokeApprovalPackageSnapshot } from "./streamFoundationPostPatchRuntimeSmokeApprovalPackage";

export function getStreamFoundationPostPatchRuntimeSmokeApprovalPackageReadiness() {
  const snapshot = getStreamFoundationPostPatchRuntimeSmokeApprovalPackageSnapshot();

  const previousVerificationReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-142O-FIX2" &&
    snapshot.verification142OFix2.ok === true &&
    snapshot.verification142OFix2.routeBindingPassed === 3 &&
    snapshot.verification142OFix2.routeBindingFailed === 0 &&
    snapshot.verification142OFix2.runtimeImportOk === true &&
    snapshot.verification142OFix2.runtimeHandlerReadinessPassed === 3 &&
    snapshot.verification142OFix2.runtimeHandlerReadinessFailed === 0 &&
    snapshot.verification142OFix2.routePatchContextSafetyOk === true &&
    snapshot.verification142OFix2.tscExitCode === 0 &&
    snapshot.verification142OFix2.runtimePostPerformed === 0 &&
    snapshot.verification142OFix2.databaseWritePerformed === 0 &&
    snapshot.verification142OFix2.providerCallPerformed === 0 &&
    snapshot.verification142OFix2.walletMutationPerformed === 0 &&
    snapshot.verification142OFix2.moneyMovementPerformed === 0 &&
    snapshot.verification142OFix2.fakeSuccessAllowed === false;

  const approvalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore142Q === true &&
    snapshot.nextApprovalPolicy.nextStageMayRunRuntimePostSmoke === true &&
    snapshot.nextApprovalPolicy.nextStageMustUseLocalBackendOnly === true &&
    snapshot.nextApprovalPolicy.nextStageMustExpect423Blocked === true &&
    snapshot.requiredExactApprovalTextFor142Q.includes("BACKEND-STREAM-FOUNDATION-142Q") &&
    snapshot.requiredExactApprovalTextFor142Q.includes("controlled blocked-route runtime POST smoke only") &&
    snapshot.requiredExactApprovalTextFor142Q.includes("/api/stream/live/start") &&
    snapshot.requiredExactApprovalTextFor142Q.includes("/api/stream/live/stop") &&
    snapshot.requiredExactApprovalTextFor142Q.includes("/api/stream/live/heartbeat") &&
    snapshot.requiredExactApprovalTextFor142Q.includes("423 blocked") &&
    snapshot.requiredExactApprovalTextFor142Q.includes("no DB write") &&
    snapshot.requiredExactApprovalTextFor142Q.includes("no provider call") &&
    snapshot.requiredExactApprovalTextFor142Q.includes("no Wallet mutation") &&
    snapshot.requiredExactApprovalTextFor142Q.includes("no fake success");

  const routeScopeReady =
    snapshot.runtimeSmokeApprovalRoutes.length === 3 &&
    snapshot.runtimeSmokeApprovalRoutes.every((route) => route.method === "POST") &&
    snapshot.runtimeSmokeApprovalRoutes.every((route) => route.expectedStatusCode === 423) &&
    snapshot.runtimeSmokeApprovalRoutes.every((route) => route.expectedBlockedBehavior === true) &&
    snapshot.runtimeSmokeApprovalRoutes.every((route) => route.databaseWriteAllowed === false) &&
    snapshot.runtimeSmokeApprovalRoutes.every((route) => route.providerCallAllowed === false) &&
    snapshot.runtimeSmokeApprovalRoutes.every((route) => route.walletMutationAllowed === false) &&
    snapshot.runtimeSmokeApprovalRoutes.every((route) => route.moneyMovementAllowed === false) &&
    snapshot.runtimeSmokeApprovalRoutes.every((route) => route.fakeSuccessAllowed === false);

  const safetyReady =
    snapshot.safety.sourceOnly142P === true &&
    snapshot.safety.targetWriteBy142P === false &&
    snapshot.safety.backendRestartBy142P === false &&
    snapshot.safety.runtimeHttpBy142P === false &&
    snapshot.safety.runtimePostBy142P === false &&
    snapshot.safety.databaseReadBy142P === false &&
    snapshot.safety.databaseWriteBy142P === false &&
    snapshot.safety.providerCallBy142P === false &&
    snapshot.safety.providerSecretReadBy142P === false &&
    snapshot.safety.walletMutationBy142P === false &&
    snapshot.safety.moneyMovementBy142P === false &&
    snapshot.safety.fakeSuccessBy142P === false &&
    snapshot.totals.runtimePostAllowedBy142P === 0 &&
    snapshot.totals.backendRestartAllowedFor142Q === 0 &&
    snapshot.totals.databaseWriteAllowedFor142Q === 0 &&
    snapshot.totals.providerCallAllowedFor142Q === 0 &&
    snapshot.totals.walletMutationAllowedFor142Q === 0 &&
    snapshot.totals.moneyMovementAllowedFor142Q === 0 &&
    snapshot.totals.fakeSuccessAllowedFor142Q === 0;

  const ready = previousVerificationReady && approvalReady && routeScopeReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "post_patch_runtime_smoke_approval_ready_next_exact_approval_required" : "post_patch_runtime_smoke_approval_blocked",
    approvalRoutes: snapshot.runtimeSmokeApprovalRoutes.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-142Q controlled blocked-route runtime POST smoke after exact approval",
  } as const;
}
