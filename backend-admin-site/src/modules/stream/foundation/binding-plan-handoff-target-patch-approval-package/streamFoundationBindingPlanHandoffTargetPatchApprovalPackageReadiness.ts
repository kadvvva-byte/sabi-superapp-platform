import { getStreamFoundationBindingPlanHandoffTargetPatchApprovalPackageSnapshot } from "./streamFoundationBindingPlanHandoffTargetPatchApprovalPackage";

export function getStreamFoundationBindingPlanHandoffTargetPatchApprovalPackageReadiness() {
  const snapshot = getStreamFoundationBindingPlanHandoffTargetPatchApprovalPackageSnapshot();

  const handoffReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-142G" &&
    snapshot.verification142G.ok === true &&
    snapshot.verification142G.expectedChecksPassed === 6 &&
    snapshot.verification142G.expectedChecksFailed === 0 &&
    snapshot.verification142G.targetWriteSafetyOk === true &&
    snapshot.verification142G.bindingPlanSourceSafetyOk === true &&
    snapshot.verification142G.manifestSafetyOk === true &&
    snapshot.verification142G.tscExitCode === 0 &&
    snapshot.handoffItems.length === 6 &&
    snapshot.handoffItems.every((item) => item.routesRemainBlocked === true) &&
    snapshot.handoffItems.every((item) => item.targetPatchAllowedNow === false) &&
    snapshot.handoffItems.every((item) => item.routeBindingAllowedNow === false) &&
    snapshot.handoffItems.every((item) => item.runtimeSuccessAllowedNow === false);

  const approvalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore142I === true &&
    snapshot.nextApprovalPolicy.nextStageMayPrepareTargetPatchReviewOnly === true &&
    snapshot.nextApprovalPolicy.nextStageMustKeepRoutesBlocked === true &&
    snapshot.requiredExactApprovalTextFor142I.includes("BACKEND-STREAM-FOUNDATION-142I") &&
    snapshot.requiredExactApprovalTextFor142I.includes("controlled target patch draft review source-only only") &&
    snapshot.requiredExactApprovalTextFor142I.includes("do not write src/app.ts") &&
    snapshot.requiredExactApprovalTextFor142I.includes("no runtime POST") &&
    snapshot.requiredExactApprovalTextFor142I.includes("no DB write") &&
    snapshot.requiredExactApprovalTextFor142I.includes("no provider call") &&
    snapshot.requiredExactApprovalTextFor142I.includes("no Wallet mutation") &&
    snapshot.requiredExactApprovalTextFor142I.includes("no fake success");

  const blockedNow =
    snapshot.nextApprovalPolicy.appTsWriteAllowedNow === false &&
    snapshot.nextApprovalPolicy.serverTsWriteAllowedNow === false &&
    snapshot.nextApprovalPolicy.streamIndexWriteAllowedNow === false &&
    snapshot.nextApprovalPolicy.targetPatchAllowedNow === false &&
    snapshot.nextApprovalPolicy.routeBindingAllowedNow === false &&
    snapshot.nextApprovalPolicy.routeBehaviorChangeAllowedNow === false &&
    snapshot.nextApprovalPolicy.runtimePostAllowedNow === false &&
    snapshot.nextApprovalPolicy.runtimeSuccessAllowedNow === false &&
    snapshot.nextApprovalPolicy.databaseWriteAllowedNow === false &&
    snapshot.nextApprovalPolicy.providerCallAllowedNow === false &&
    snapshot.nextApprovalPolicy.walletMutationAllowedNow === false &&
    snapshot.nextApprovalPolicy.moneyMovementAllowedNow === false &&
    snapshot.nextApprovalPolicy.fakeSuccessAllowedNow === false &&
    snapshot.nextApprovalPolicy.expectedCurrentStatusCode === 423 &&
    snapshot.totals.targetPatchAllowedNow === 0 &&
    snapshot.totals.routeBindingAllowedNow === 0 &&
    snapshot.totals.routeBehaviorChangeAllowedNow === 0 &&
    snapshot.totals.runtimePostAllowedNow === 0 &&
    snapshot.totals.runtimeSuccessAllowedNow === 0 &&
    snapshot.totals.databaseWriteAllowedNow === 0 &&
    snapshot.totals.providerCallAllowedNow === 0 &&
    snapshot.totals.walletMutationAllowedNow === 0 &&
    snapshot.totals.moneyMovementAllowedNow === 0 &&
    snapshot.totals.fakeSuccessAllowedNow === 0;

  const safetyReady =
    snapshot.safety.sourceOnly142H === true &&
    snapshot.safety.appTsChangeBy142H === false &&
    snapshot.safety.serverTsChangeBy142H === false &&
    snapshot.safety.streamIndexChangeBy142H === false &&
    snapshot.safety.liveWriteHandlerChangeBy142H === false &&
    snapshot.safety.schemaMigrationBy142H === false &&
    snapshot.safety.backendRestartBy142H === false &&
    snapshot.safety.runtimeHttpBy142H === false &&
    snapshot.safety.runtimePostBy142H === false &&
    snapshot.safety.databaseReadBy142H === false &&
    snapshot.safety.databaseWriteBy142H === false &&
    snapshot.safety.providerCallBy142H === false &&
    snapshot.safety.providerSecretReadBy142H === false &&
    snapshot.safety.walletMutationBy142H === false &&
    snapshot.safety.moneyMovementBy142H === false &&
    snapshot.safety.fakeSuccessBy142H === false;

  const ready = handoffReady && approvalReady && blockedNow && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "binding_plan_handoff_ready_next_exact_approval_required" : "binding_plan_handoff_blocked",
    handoffItems: snapshot.handoffItems.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-142I controlled target patch draft review source-only after exact approval",
  } as const;
}
