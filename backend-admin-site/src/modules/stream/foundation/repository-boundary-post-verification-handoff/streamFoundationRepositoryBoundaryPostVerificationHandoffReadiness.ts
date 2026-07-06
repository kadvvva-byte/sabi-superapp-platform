import { getStreamFoundationRepositoryBoundaryPostVerificationHandoffSnapshot } from "./streamFoundationRepositoryBoundaryPostVerificationHandoff";

export function getStreamFoundationRepositoryBoundaryPostVerificationHandoffReadiness() {
  const snapshot = getStreamFoundationRepositoryBoundaryPostVerificationHandoffSnapshot();

  const verificationReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-143C" &&
    snapshot.verificationEvidence143C.ok === true &&
    snapshot.verificationEvidence143C.scopeLimitedToStreamFoundation === true &&
    snapshot.verificationEvidence143C.targetReferenceVerificationOk === true &&
    snapshot.verificationEvidence143C.contractContentPassed === 5 &&
    snapshot.verificationEvidence143C.contractContentFailed === 0 &&
    snapshot.verificationEvidence143C.safetyFragmentVerificationOk === true &&
    snapshot.verificationEvidence143C.migrationVerificationOk === true &&
    snapshot.verificationEvidence143C.tscExitCode === 0 &&
    snapshot.verificationEvidence143C.sourceModificationPerformed === 0 &&
    snapshot.verificationEvidence143C.backendRestartPerformed === 0 &&
    snapshot.verificationEvidence143C.runtimePostPerformed === 0 &&
    snapshot.verificationEvidence143C.runtimeDbReadPerformed === 0 &&
    snapshot.verificationEvidence143C.runtimeDbWritePerformed === 0 &&
    snapshot.verificationEvidence143C.providerCallPerformed === 0 &&
    snapshot.verificationEvidence143C.walletMutationPerformed === 0 &&
    snapshot.verificationEvidence143C.moneyMovementPerformed === 0 &&
    snapshot.verificationEvidence143C.fakeSuccessAllowed === false;

  const closedArtifactsReady =
    snapshot.closedArtifacts.length === 3 &&
    snapshot.closedArtifacts.every((artifact) => artifact.status === "closed_clean") &&
    snapshot.closedArtifacts.every((artifact) => artifact.scopeLimitedToStreamFoundation === true) &&
    snapshot.closedArtifacts.every((artifact) => artifact.prismaSchemaClean === true) &&
    snapshot.closedArtifacts.every((artifact) => artifact.migrationClean === true) &&
    snapshot.closedArtifacts.every((artifact) => artifact.runtimeDbAccessPerformed === 0) &&
    snapshot.closedArtifacts.every((artifact) => artifact.providerCallPerformed === 0) &&
    snapshot.closedArtifacts.every((artifact) => artifact.walletMutationPerformed === 0) &&
    snapshot.closedArtifacts.every((artifact) => artifact.moneyMovementPerformed === 0) &&
    snapshot.closedArtifacts.every((artifact) => artifact.fakeSuccessAllowed === false);

  const handoffReady =
    snapshot.handoffDecision.repositoryBoundaryContractsClosed === true &&
    snapshot.handoffDecision.repositoryRuntimeImplementationAllowedNow === false &&
    snapshot.handoffDecision.prismaSchemaPatchAllowedNow === false &&
    snapshot.handoffDecision.migrationAllowedNow === false &&
    snapshot.handoffDecision.routeBehaviorChangeAllowedNow === false &&
    snapshot.handoffDecision.runtimeMountAllowedNow === false &&
    snapshot.handoffDecision.continueWithProviderRealtimeModerationPlanning === true &&
    snapshot.handoffDecision.liveWriteRoutesMustRemain423Blocked === true &&
    snapshot.nextBatchPlan.length === 6 &&
    snapshot.nextBatchPlan.every((item) => item.sourceOnlyNow === true) &&
    snapshot.nextBatchPlan.every((item) => item.targetWriteAllowedNow === false) &&
    snapshot.nextBatchPlan.every((item) => item.prismaSchemaWriteAllowedNow === false) &&
    snapshot.nextBatchPlan.every((item) => item.migrationAllowedNow === false) &&
    snapshot.nextBatchPlan.every((item) => item.runtimePostAllowedNow === false) &&
    snapshot.nextBatchPlan.every((item) => item.runtimeDbReadAllowedNow === false) &&
    snapshot.nextBatchPlan.every((item) => item.runtimeDbWriteAllowedNow === false) &&
    snapshot.nextBatchPlan.every((item) => item.providerCallAllowedNow === false) &&
    snapshot.nextBatchPlan.every((item) => item.walletMutationAllowedNow === false) &&
    snapshot.nextBatchPlan.every((item) => item.moneyMovementAllowedNow === false) &&
    snapshot.nextBatchPlan.every((item) => item.fakeSuccessAllowedNow === false);

  const nextApprovalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore143E === true &&
    snapshot.nextApprovalPolicy.nextStageIsProviderRealtimeModerationGatePlanning === true &&
    snapshot.nextApprovalPolicy.sourceScopeMustStayUnderStreamFoundation === true &&
    snapshot.nextApprovalPolicy.targetWriteAllowedFor143E === false &&
    snapshot.nextApprovalPolicy.prismaSchemaWriteAllowedFor143E === false &&
    snapshot.nextApprovalPolicy.migrationAllowedFor143E === false &&
    snapshot.nextApprovalPolicy.runtimePostAllowedFor143E === false &&
    snapshot.nextApprovalPolicy.runtimeDbReadAllowedFor143E === false &&
    snapshot.nextApprovalPolicy.runtimeDbWriteAllowedFor143E === false &&
    snapshot.nextApprovalPolicy.providerCallAllowedFor143E === false &&
    snapshot.nextApprovalPolicy.walletMutationAllowedFor143E === false &&
    snapshot.nextApprovalPolicy.moneyMovementAllowedFor143E === false &&
    snapshot.nextApprovalPolicy.fakeSuccessAllowedFor143E === false &&
    snapshot.requiredExactApprovalTextFor143E.includes("BACKEND-STREAM-FOUNDATION-143E") &&
    snapshot.requiredExactApprovalTextFor143E.includes("provider realtime moderation gate planning") &&
    snapshot.requiredExactApprovalTextFor143E.includes("no runtime DB read/write") &&
    snapshot.requiredExactApprovalTextFor143E.includes("no provider call") &&
    snapshot.requiredExactApprovalTextFor143E.includes("no fake success");

  const safetyReady =
    snapshot.safety.sourceOnly143D === true &&
    snapshot.safety.targetWriteBy143D === false &&
    snapshot.safety.appTsChangeBy143D === false &&
    snapshot.safety.serverTsChangeBy143D === false &&
    snapshot.safety.streamIndexChangeBy143D === false &&
    snapshot.safety.prismaSchemaChangeBy143D === false &&
    snapshot.safety.migrationCreatedBy143D === false &&
    snapshot.safety.routeBehaviorChangeBy143D === false &&
    snapshot.safety.backendRestartBy143D === false &&
    snapshot.safety.runtimePostBy143D === false &&
    snapshot.safety.runtimeDbReadBy143D === false &&
    snapshot.safety.runtimeDbWriteBy143D === false &&
    snapshot.safety.providerCallBy143D === false &&
    snapshot.safety.walletMutationBy143D === false &&
    snapshot.safety.moneyMovementBy143D === false &&
    snapshot.safety.fakeSuccessBy143D === false;

  const ready = verificationReady && closedArtifactsReady && handoffReady && nextApprovalReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "repository_boundary_closed_next_batch_ready" : "repository_boundary_post_verification_handoff_blocked",
    closedArtifacts: snapshot.closedArtifacts.length,
    nextBatchPlanItems: snapshot.nextBatchPlan.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-143E controlled live runtime provider realtime moderation gate planning source-only after exact approval",
  } as const;
}
