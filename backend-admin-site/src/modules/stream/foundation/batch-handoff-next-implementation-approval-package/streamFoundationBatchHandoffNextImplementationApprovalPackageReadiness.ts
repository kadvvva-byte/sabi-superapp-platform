import { getStreamFoundationBatchHandoffNextImplementationApprovalPackageSnapshot } from "./streamFoundationBatchHandoffNextImplementationApprovalPackage";

export function getStreamFoundationBatchHandoffNextImplementationApprovalPackageReadiness() {
  const snapshot = getStreamFoundationBatchHandoffNextImplementationApprovalPackageSnapshot();

  const handoffReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-142A" &&
    snapshot.verification142A.ok === true &&
    snapshot.verification142A.expectedChecksPassed === 20 &&
    snapshot.verification142A.expectedChecksFailed === 0 &&
    snapshot.verification142A.targetSafetyOk === true &&
    snapshot.verification142A.stageSourceSafetyOk === true &&
    snapshot.verification142A.tscExitCode === 0 &&
    snapshot.handoffStages.length === 11 &&
    snapshot.handoffStages.every((stage) => stage.routesRemainBlocked === true) &&
    snapshot.handoffStages.every((stage) => stage.runtimeSuccessAllowedNow === false);

  const approvalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore142C === true &&
    snapshot.nextApprovalPolicy.nextStageMayCreateSourceOnlyRuntimeHandlerDraft === true &&
    snapshot.nextApprovalPolicy.nextStageMustKeepRoutesBlocked === true &&
    snapshot.requiredExactApprovalTextFor142C.includes("BACKEND-STREAM-FOUNDATION-142C") &&
    snapshot.requiredExactApprovalTextFor142C.includes("source-only runtime handler draft") &&
    snapshot.requiredExactApprovalTextFor142C.includes("keep live routes blocked now") &&
    snapshot.requiredExactApprovalTextFor142C.includes("do not write src/app.ts") &&
    snapshot.requiredExactApprovalTextFor142C.includes("no DB write") &&
    snapshot.requiredExactApprovalTextFor142C.includes("no provider call") &&
    snapshot.requiredExactApprovalTextFor142C.includes("no Wallet mutation") &&
    snapshot.requiredExactApprovalTextFor142C.includes("no fake success");

  const blockedNow =
    snapshot.nextApprovalPolicy.appTsWriteAllowedNow === false &&
    snapshot.nextApprovalPolicy.serverTsWriteAllowedNow === false &&
    snapshot.nextApprovalPolicy.streamIndexWriteAllowedNow === false &&
    snapshot.nextApprovalPolicy.liveRouteBehaviorChangeAllowedNow === false &&
    snapshot.nextApprovalPolicy.runtimePostAllowedNow === false &&
    snapshot.nextApprovalPolicy.runtimeSuccessAllowedNow === false &&
    snapshot.nextApprovalPolicy.databaseWriteAllowedNow === false &&
    snapshot.nextApprovalPolicy.providerCallAllowedNow === false &&
    snapshot.nextApprovalPolicy.walletMutationAllowedNow === false &&
    snapshot.nextApprovalPolicy.moneyMovementAllowedNow === false &&
    snapshot.nextApprovalPolicy.fakeSuccessAllowedNow === false &&
    snapshot.nextApprovalPolicy.expectedCurrentStatusCode === 423 &&
    snapshot.totals.targetSourceWriteAllowedNow === 0 &&
    snapshot.totals.routeBehaviorChangeAllowedNow === 0 &&
    snapshot.totals.runtimePostAllowedNow === 0 &&
    snapshot.totals.runtimeSuccessAllowedNow === 0 &&
    snapshot.totals.databaseWriteAllowedNow === 0 &&
    snapshot.totals.providerCallAllowedNow === 0 &&
    snapshot.totals.walletMutationAllowedNow === 0 &&
    snapshot.totals.moneyMovementAllowedNow === 0 &&
    snapshot.totals.fakeSuccessAllowedNow === 0;

  const safetyReady =
    snapshot.safety.sourceOnly142B === true &&
    snapshot.safety.appTsChangeBy142B === false &&
    snapshot.safety.serverTsChangeBy142B === false &&
    snapshot.safety.streamIndexChangeBy142B === false &&
    snapshot.safety.liveWriteHandlerChangeBy142B === false &&
    snapshot.safety.schemaMigrationBy142B === false &&
    snapshot.safety.backendRestartBy142B === false &&
    snapshot.safety.runtimeHttpBy142B === false &&
    snapshot.safety.runtimePostBy142B === false &&
    snapshot.safety.databaseReadBy142B === false &&
    snapshot.safety.databaseWriteBy142B === false &&
    snapshot.safety.providerCallBy142B === false &&
    snapshot.safety.providerSecretReadBy142B === false &&
    snapshot.safety.walletMutationBy142B === false &&
    snapshot.safety.moneyMovementBy142B === false &&
    snapshot.safety.fakeSuccessBy142B === false;

  const ready = handoffReady && approvalReady && blockedNow && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "batch_handoff_ready_next_exact_approval_required" : "batch_handoff_blocked",
    handoffStages: snapshot.handoffStages.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-142C controlled source-only runtime handler draft package after exact approval",
  } as const;
}
