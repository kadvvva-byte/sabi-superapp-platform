import { getStreamFoundationRepositoryBoundaryPlanningSnapshot } from "./streamFoundationRepositoryBoundaryPlanning";

export function getStreamFoundationRepositoryBoundaryPlanningReadiness() {
  const snapshot = getStreamFoundationRepositoryBoundaryPlanningSnapshot();

  const previousEvidenceReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-142Z-FIX1" &&
    snapshot.verificationEvidence142ZFix1.compilePassed === true &&
    snapshot.verificationEvidence142ZFix1.scopeLimitedToStreamFoundation === true &&
    snapshot.verificationEvidence142ZFix1.targetReferenceClean === true &&
    snapshot.verificationEvidence142ZFix1.contractContentPassed === 5 &&
    snapshot.verificationEvidence142ZFix1.contractContentFailed === 0 &&
    snapshot.verificationEvidence142ZFix1.safetyFragmentsClean === true &&
    snapshot.verificationEvidence142ZFix1.tscExitCode === 0 &&
    snapshot.verificationEvidence142ZFix1.sourceModificationPerformed === 0 &&
    snapshot.verificationEvidence142ZFix1.backendRestartPerformed === 0 &&
    snapshot.verificationEvidence142ZFix1.runtimePostPerformed === 0 &&
    snapshot.verificationEvidence142ZFix1.databaseReadPerformed === 0 &&
    snapshot.verificationEvidence142ZFix1.databaseWritePerformed === 0 &&
    snapshot.verificationEvidence142ZFix1.providerCallPerformed === 0 &&
    snapshot.verificationEvidence142ZFix1.walletMutationPerformed === 0 &&
    snapshot.verificationEvidence142ZFix1.moneyMovementPerformed === 0 &&
    snapshot.verificationEvidence142ZFix1.fakeSuccessAllowed === false;

  const planningReady =
    snapshot.repositoryBoundaryDecision.schemaPatchAllowedNow === false &&
    snapshot.repositoryBoundaryDecision.migrationAllowedNow === false &&
    snapshot.repositoryBoundaryDecision.runtimeRepositoryImplementationAllowedNow === false &&
    snapshot.repositoryBoundaryDecision.databaseRuntimeAccessAllowedNow === false &&
    snapshot.repositoryBoundaryDecision.routeBehaviorChangeAllowedNow === false &&
    snapshot.repositoryBoundaryDecision.continueWithSourceOnlyContractsNext === true &&
    snapshot.repositoryBoundaryDecision.nextContractsMustBeInterfacesOnly === true &&
    snapshot.repositoryBoundaryDecision.futureRuntimeMountRequiresOwnerApproval === true &&
    snapshot.planItems.length === 8 &&
    snapshot.planItems.every((item) => item.sourceOnlyNow === true) &&
    snapshot.planItems.every((item) => item.schemaWriteAllowedNow === false) &&
    snapshot.planItems.every((item) => item.migrationAllowedNow === false) &&
    snapshot.planItems.every((item) => item.runtimeDbReadAllowedNow === false) &&
    snapshot.planItems.every((item) => item.runtimeDbWriteAllowedNow === false) &&
    snapshot.planItems.every((item) => item.repositoryMountAllowedNow === false) &&
    snapshot.planItems.every((item) => item.routeBehaviorChangeAllowedNow === false) &&
    snapshot.planItems.every((item) => item.providerCallAllowedNow === false) &&
    snapshot.planItems.every((item) => item.walletMutationAllowedNow === false) &&
    snapshot.planItems.every((item) => item.moneyMovementAllowedNow === false) &&
    snapshot.planItems.every((item) => item.fakeSuccessAllowedNow === false);

  const nextApprovalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore143B === true &&
    snapshot.nextApprovalPolicy.nextStageIsSourceOnlyRepositoryContractsScaffold === true &&
    snapshot.nextApprovalPolicy.sourceScopeMustStayUnderStreamFoundation === true &&
    snapshot.nextApprovalPolicy.prismaSchemaWriteAllowedFor143B === false &&
    snapshot.nextApprovalPolicy.migrationAllowedFor143B === false &&
    snapshot.nextApprovalPolicy.runtimeDbReadAllowedFor143B === false &&
    snapshot.nextApprovalPolicy.runtimeDbWriteAllowedFor143B === false &&
    snapshot.nextApprovalPolicy.providerCallAllowedFor143B === false &&
    snapshot.nextApprovalPolicy.walletMutationAllowedFor143B === false &&
    snapshot.nextApprovalPolicy.moneyMovementAllowedFor143B === false &&
    snapshot.nextApprovalPolicy.fakeSuccessAllowedFor143B === false &&
    snapshot.requiredExactApprovalTextFor143B.includes("BACKEND-STREAM-FOUNDATION-143B") &&
    snapshot.requiredExactApprovalTextFor143B.includes("source-only repository interface contracts") &&
    snapshot.requiredExactApprovalTextFor143B.includes("do not write prisma/schema.prisma") &&
    snapshot.requiredExactApprovalTextFor143B.includes("no runtime DB read/write") &&
    snapshot.requiredExactApprovalTextFor143B.includes("no fake success");

  const safetyReady =
    snapshot.safety.sourceOnly143A === true &&
    snapshot.safety.targetWriteBy143A === false &&
    snapshot.safety.appTsChangeBy143A === false &&
    snapshot.safety.serverTsChangeBy143A === false &&
    snapshot.safety.streamIndexChangeBy143A === false &&
    snapshot.safety.prismaSchemaChangeBy143A === false &&
    snapshot.safety.migrationCreatedBy143A === false &&
    snapshot.safety.routeBehaviorChangeBy143A === false &&
    snapshot.safety.backendRestartBy143A === false &&
    snapshot.safety.runtimeHttpBy143A === false &&
    snapshot.safety.runtimePostBy143A === false &&
    snapshot.safety.databaseReadBy143A === false &&
    snapshot.safety.databaseWriteBy143A === false &&
    snapshot.safety.providerCallBy143A === false &&
    snapshot.safety.walletMutationBy143A === false &&
    snapshot.safety.moneyMovementBy143A === false &&
    snapshot.safety.fakeSuccessBy143A === false;

  const ready = previousEvidenceReady && planningReady && nextApprovalReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "repository_boundary_planning_ready" : "repository_boundary_planning_blocked",
    planItems: snapshot.planItems.length,
    schemaAndMigrationBlocked: snapshot.repositoryBoundaryDecision.schemaPatchAllowedNow === false && snapshot.repositoryBoundaryDecision.migrationAllowedNow === false,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-143B controlled live runtime repository boundary contracts scaffold source-only after exact approval",
  } as const;
}
