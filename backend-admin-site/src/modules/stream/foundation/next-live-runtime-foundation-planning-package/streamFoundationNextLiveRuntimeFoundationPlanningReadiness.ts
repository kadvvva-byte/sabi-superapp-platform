import { getStreamFoundationNextLiveRuntimeFoundationPlanningSnapshot } from "./streamFoundationNextLiveRuntimeFoundationPlanning";

export function getStreamFoundationNextLiveRuntimeFoundationPlanningReadiness() {
  const snapshot = getStreamFoundationNextLiveRuntimeFoundationPlanningSnapshot();

  const evidenceReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-142W" &&
    snapshot.verifiedBlockedEnvelopeEvidence.sourceStage === "BACKEND-STREAM-FOUNDATION-142V-FIX2" &&
    snapshot.verifiedBlockedEnvelopeEvidence.routesChecked === 3 &&
    snapshot.verifiedBlockedEnvelopeEvidence.routesReturned423 === 3 &&
    snapshot.verifiedBlockedEnvelopeEvidence.jsonBlockedEnvelopeRoutes === 3 &&
    snapshot.verifiedBlockedEnvelopeEvidence.emptyBodyRoutes === 0 &&
    snapshot.verifiedBlockedEnvelopeEvidence.bodyPatchNeeded === false &&
    snapshot.verifiedBlockedEnvelopeEvidence.targetPatchForEnvelopeBodyNeeded === false &&
    snapshot.verifiedBlockedEnvelopeEvidence.allRoutesNoFakeSuccess === true &&
    snapshot.verifiedBlockedEnvelopeEvidence.tscExitCode === 0 &&
    snapshot.verifiedBlockedEnvelopeEvidence.databaseWritePerformed === 0 &&
    snapshot.verifiedBlockedEnvelopeEvidence.providerCallPerformed === 0 &&
    snapshot.verifiedBlockedEnvelopeEvidence.walletMutationPerformed === 0 &&
    snapshot.verifiedBlockedEnvelopeEvidence.moneyMovementPerformed === 0 &&
    snapshot.verifiedBlockedEnvelopeEvidence.fakeSuccessAllowed === false;

  const planningReady =
    snapshot.planningDecision.routeEnvelopeBodyIssueClosed === true &&
    snapshot.planningDecision.continueLiveRuntimeFoundationBatch === true &&
    snapshot.planningDecision.keepLiveWriteRoutesBlocked423UntilRuntimeMountApproval === true &&
    snapshot.planningDecision.doNotPatchEnvelopeBodyNow === true &&
    snapshot.planningDecision.doNotMountRuntimeNow === true &&
    snapshot.planningDecision.doNotConnectProviderNow === true &&
    snapshot.planningDecision.doNotCreateDbRuntimeRowsNow === true &&
    snapshot.planningDecision.doNotConnectWalletOrMoneyNow === true &&
    snapshot.plannedBatchItems.length === 7 &&
    snapshot.plannedBatchItems.every((item) => item.routeBehaviorChangeAllowedNow === false) &&
    snapshot.plannedBatchItems.every((item) => item.runtimeMountAllowedNow === false) &&
    snapshot.plannedBatchItems.every((item) => item.runtimePostAllowedNow === false) &&
    snapshot.plannedBatchItems.every((item) => item.databaseWriteAllowedNow === false) &&
    snapshot.plannedBatchItems.every((item) => item.providerCallAllowedNow === false) &&
    snapshot.plannedBatchItems.every((item) => item.walletMutationAllowedNow === false) &&
    snapshot.plannedBatchItems.every((item) => item.moneyMovementAllowedNow === false) &&
    snapshot.plannedBatchItems.every((item) => item.fakeSuccessAllowedNow === false);

  const approvalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore142Y === true &&
    snapshot.nextApprovalPolicy.nextStageIsSourceOnlyContractsDraft === true &&
    snapshot.nextApprovalPolicy.nextStageMayCreateFoundationContractsOnly === true &&
    snapshot.nextApprovalPolicy.targetWriteAllowedFor142Y === false &&
    snapshot.nextApprovalPolicy.routeBehaviorChangeAllowedFor142Y === false &&
    snapshot.nextApprovalPolicy.runtimePostAllowedFor142Y === false &&
    snapshot.requiredExactApprovalTextFor142Y.includes("BACKEND-STREAM-FOUNDATION-142Y") &&
    snapshot.requiredExactApprovalTextFor142Y.includes("source-only contracts") &&
    snapshot.requiredExactApprovalTextFor142Y.includes("do not write src/app.ts") &&
    snapshot.requiredExactApprovalTextFor142Y.includes("no runtime POST") &&
    snapshot.requiredExactApprovalTextFor142Y.includes("no DB write") &&
    snapshot.requiredExactApprovalTextFor142Y.includes("no provider call") &&
    snapshot.requiredExactApprovalTextFor142Y.includes("no Wallet mutation") &&
    snapshot.requiredExactApprovalTextFor142Y.includes("no fake success");

  const safetyReady =
    snapshot.safety.sourceOnly142X === true &&
    snapshot.safety.targetWriteBy142X === false &&
    snapshot.safety.appTsChangeBy142X === false &&
    snapshot.safety.serverTsChangeBy142X === false &&
    snapshot.safety.streamIndexChangeBy142X === false &&
    snapshot.safety.routeBehaviorChangeBy142X === false &&
    snapshot.safety.backendRestartBy142X === false &&
    snapshot.safety.runtimeHttpBy142X === false &&
    snapshot.safety.runtimePostBy142X === false &&
    snapshot.safety.databaseReadBy142X === false &&
    snapshot.safety.databaseWriteBy142X === false &&
    snapshot.safety.providerCallBy142X === false &&
    snapshot.safety.walletMutationBy142X === false &&
    snapshot.safety.moneyMovementBy142X === false &&
    snapshot.safety.fakeSuccessBy142X === false;

  const ready = evidenceReady && planningReady && approvalReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "next_live_runtime_foundation_planning_ready" : "next_live_runtime_foundation_planning_blocked",
    plannedBatchItems: snapshot.plannedBatchItems.length,
    routeEnvelopeBodyIssueClosed: snapshot.planningDecision.routeEnvelopeBodyIssueClosed,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-142Y controlled live runtime foundation contracts draft source-only after exact approval",
  } as const;
}
