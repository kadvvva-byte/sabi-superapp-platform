import { getStreamFoundationRuntimeHandlerDraftHandoffBindingApprovalPackageSnapshot } from "./streamFoundationRuntimeHandlerDraftHandoffBindingApprovalPackage";

export function getStreamFoundationRuntimeHandlerDraftHandoffBindingApprovalPackageReadiness() {
  const snapshot = getStreamFoundationRuntimeHandlerDraftHandoffBindingApprovalPackageSnapshot();

  const handoffReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-142D-FIX1" &&
    snapshot.verification142DFix1.ok === true &&
    snapshot.verification142DFix1.expectedChecksPassed === 6 &&
    snapshot.verification142DFix1.expectedChecksFailed === 0 &&
    snapshot.verification142DFix1.targetBindingSafetyOk === true &&
    snapshot.verification142DFix1.handlerSourceSafetyOk === true &&
    snapshot.verification142DFix1.manifestSafetyOk === true &&
    snapshot.verification142DFix1.tscExitCode === 0 &&
    snapshot.handoffItems.length === 6 &&
    snapshot.handoffItems.every((item) => item.routesRemainBlocked === true) &&
    snapshot.handoffItems.every((item) => item.bindingAllowedNow === false) &&
    snapshot.handoffItems.every((item) => item.runtimeSuccessAllowedNow === false);

  const approvalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore142F === true &&
    snapshot.nextApprovalPolicy.nextStageMayPlanBindingOnly === true &&
    snapshot.nextApprovalPolicy.nextStageMustKeepRoutesBlocked === true &&
    snapshot.requiredExactApprovalTextFor142F.includes("BACKEND-STREAM-FOUNDATION-142F") &&
    snapshot.requiredExactApprovalTextFor142F.includes("controlled binding plan source-only only") &&
    snapshot.requiredExactApprovalTextFor142F.includes("do not write src/app.ts") &&
    snapshot.requiredExactApprovalTextFor142F.includes("no runtime POST") &&
    snapshot.requiredExactApprovalTextFor142F.includes("no DB write") &&
    snapshot.requiredExactApprovalTextFor142F.includes("no provider call") &&
    snapshot.requiredExactApprovalTextFor142F.includes("no Wallet mutation") &&
    snapshot.requiredExactApprovalTextFor142F.includes("no fake success");

  const blockedNow =
    snapshot.nextApprovalPolicy.appTsWriteAllowedNow === false &&
    snapshot.nextApprovalPolicy.serverTsWriteAllowedNow === false &&
    snapshot.nextApprovalPolicy.streamIndexWriteAllowedNow === false &&
    snapshot.nextApprovalPolicy.routeBindingAllowedNow === false &&
    snapshot.nextApprovalPolicy.liveRouteBehaviorChangeAllowedNow === false &&
    snapshot.nextApprovalPolicy.runtimePostAllowedNow === false &&
    snapshot.nextApprovalPolicy.runtimeSuccessAllowedNow === false &&
    snapshot.nextApprovalPolicy.databaseWriteAllowedNow === false &&
    snapshot.nextApprovalPolicy.providerCallAllowedNow === false &&
    snapshot.nextApprovalPolicy.walletMutationAllowedNow === false &&
    snapshot.nextApprovalPolicy.moneyMovementAllowedNow === false &&
    snapshot.nextApprovalPolicy.fakeSuccessAllowedNow === false &&
    snapshot.nextApprovalPolicy.expectedCurrentStatusCode === 423 &&
    snapshot.totals.bindingAllowedNow === 0 &&
    snapshot.totals.routeBehaviorChangeAllowedNow === 0 &&
    snapshot.totals.runtimePostAllowedNow === 0 &&
    snapshot.totals.runtimeSuccessAllowedNow === 0 &&
    snapshot.totals.databaseWriteAllowedNow === 0 &&
    snapshot.totals.providerCallAllowedNow === 0 &&
    snapshot.totals.walletMutationAllowedNow === 0 &&
    snapshot.totals.moneyMovementAllowedNow === 0 &&
    snapshot.totals.fakeSuccessAllowedNow === 0;

  const safetyReady =
    snapshot.safety.sourceOnly142E === true &&
    snapshot.safety.appTsChangeBy142E === false &&
    snapshot.safety.serverTsChangeBy142E === false &&
    snapshot.safety.streamIndexChangeBy142E === false &&
    snapshot.safety.liveWriteHandlerChangeBy142E === false &&
    snapshot.safety.schemaMigrationBy142E === false &&
    snapshot.safety.backendRestartBy142E === false &&
    snapshot.safety.runtimeHttpBy142E === false &&
    snapshot.safety.runtimePostBy142E === false &&
    snapshot.safety.databaseReadBy142E === false &&
    snapshot.safety.databaseWriteBy142E === false &&
    snapshot.safety.providerCallBy142E === false &&
    snapshot.safety.providerSecretReadBy142E === false &&
    snapshot.safety.walletMutationBy142E === false &&
    snapshot.safety.moneyMovementBy142E === false &&
    snapshot.safety.fakeSuccessBy142E === false;

  const ready = handoffReady && approvalReady && blockedNow && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "runtime_handler_handoff_ready_next_exact_approval_required" : "runtime_handler_handoff_blocked",
    handoffItems: snapshot.handoffItems.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-142F controlled binding plan source-only after exact approval",
  } as const;
}
