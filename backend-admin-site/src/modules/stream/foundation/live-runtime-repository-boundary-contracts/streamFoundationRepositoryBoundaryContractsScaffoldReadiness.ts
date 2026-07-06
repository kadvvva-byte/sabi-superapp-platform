import { getStreamFoundationRepositoryBoundaryContractsScaffoldSnapshot } from "./streamFoundationRepositoryBoundaryContractsScaffold";

export function getStreamFoundationRepositoryBoundaryContractsScaffoldReadiness() {
  const snapshot = getStreamFoundationRepositoryBoundaryContractsScaffoldSnapshot();

  const previousPlanningReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-143A" &&
    snapshot.previousPlanningEvidence.repositoryBoundaryPlanningReady === true &&
    snapshot.previousPlanningEvidence.planItems === 8 &&
    snapshot.previousPlanningEvidence.schemaPatchAllowedNow === false &&
    snapshot.previousPlanningEvidence.migrationAllowedNow === false &&
    snapshot.previousPlanningEvidence.runtimeRepositoryImplementationAllowedNow === false &&
    snapshot.previousPlanningEvidence.databaseRuntimeAccessAllowedNow === false &&
    snapshot.previousPlanningEvidence.routeBehaviorChangeAllowedNow === false;

  const contractsReady =
    snapshot.idempotencyContracts.length >= 2 &&
    snapshot.transactionBoundaryContracts.length >= 3 &&
    snapshot.idempotencyContracts.every((contract) => contract.sourceOnlyContract === true) &&
    snapshot.idempotencyContracts.every((contract) => contract.runtimeIdempotencyReadAllowedNow === false) &&
    snapshot.idempotencyContracts.every((contract) => contract.runtimeIdempotencyWriteAllowedNow === false) &&
    snapshot.idempotencyContracts.every((contract) => contract.databaseReadAllowedNow === false) &&
    snapshot.idempotencyContracts.every((contract) => contract.databaseWriteAllowedNow === false) &&
    snapshot.idempotencyContracts.every((contract) => contract.fakeReplayAllowedNow === false) &&
    snapshot.transactionBoundaryContracts.every((contract) => contract.transactionOpenAllowedNow === false) &&
    snapshot.transactionBoundaryContracts.every((contract) => contract.databaseReadAllowedNow === false) &&
    snapshot.transactionBoundaryContracts.every((contract) => contract.databaseWriteAllowedNow === false) &&
    snapshot.transactionBoundaryContracts.every((contract) => contract.providerCallAllowedNow === false) &&
    snapshot.transactionBoundaryContracts.every((contract) => contract.walletMutationAllowedNow === false) &&
    snapshot.transactionBoundaryContracts.every((contract) => contract.moneyMovementAllowedNow === false) &&
    snapshot.transactionBoundaryContracts.every((contract) => contract.fakeSuccessAllowedNow === false);

  const safetyEnvelopeReady =
    snapshot.persistenceSafetyEnvelope.statusCode === 423 &&
    snapshot.persistenceSafetyEnvelope.schemaWriteAllowedNow === false &&
    snapshot.persistenceSafetyEnvelope.migrationAllowedNow === false &&
    snapshot.persistenceSafetyEnvelope.repositoryImplementationAllowedNow === false &&
    snapshot.persistenceSafetyEnvelope.repositoryMountAllowedNow === false &&
    snapshot.persistenceSafetyEnvelope.transactionOpenAllowedNow === false &&
    snapshot.persistenceSafetyEnvelope.runtimeDbReadAllowedNow === false &&
    snapshot.persistenceSafetyEnvelope.runtimeDbWriteAllowedNow === false &&
    snapshot.persistenceSafetyEnvelope.providerCallAllowedNow === false &&
    snapshot.persistenceSafetyEnvelope.walletMutationAllowedNow === false &&
    snapshot.persistenceSafetyEnvelope.moneyMovementAllowedNow === false &&
    snapshot.persistenceSafetyEnvelope.fakeSuccessAllowedNow === false &&
    snapshot.liveSessionRepositoryContract.repositoryMountedNow === false &&
    snapshot.participantRepositoryContract.repositoryMountedNow === false &&
    snapshot.heartbeatRepositoryContract.repositoryMountedNow === false &&
    snapshot.eventAuditRepositoryContract.repositoryMountedNow === false;

  const nextApprovalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore143C === true &&
    snapshot.nextApprovalPolicy.nextStageIsOpsOnlyCompileAndSafetyVerification === true &&
    snapshot.nextApprovalPolicy.sourceModificationAllowedFor143C === false &&
    snapshot.nextApprovalPolicy.prismaSchemaWriteAllowedFor143C === false &&
    snapshot.nextApprovalPolicy.migrationAllowedFor143C === false &&
    snapshot.nextApprovalPolicy.runtimeDbReadAllowedFor143C === false &&
    snapshot.nextApprovalPolicy.runtimeDbWriteAllowedFor143C === false &&
    snapshot.nextApprovalPolicy.providerCallAllowedFor143C === false &&
    snapshot.nextApprovalPolicy.walletMutationAllowedFor143C === false &&
    snapshot.nextApprovalPolicy.fakeSuccessAllowedFor143C === false &&
    snapshot.requiredExactApprovalTextFor143C.includes("BACKEND-STREAM-FOUNDATION-143C") &&
    snapshot.requiredExactApprovalTextFor143C.includes("ops-only") &&
    snapshot.requiredExactApprovalTextFor143C.includes("do not modify source") &&
    snapshot.requiredExactApprovalTextFor143C.includes("no runtime DB read/write") &&
    snapshot.requiredExactApprovalTextFor143C.includes("no fake success");

  const safetyReady =
    snapshot.safety.sourceOnly143B === true &&
    snapshot.safety.changedScopeUnderStreamFoundationOnly === true &&
    snapshot.safety.targetWriteBy143B === false &&
    snapshot.safety.appTsChangeBy143B === false &&
    snapshot.safety.serverTsChangeBy143B === false &&
    snapshot.safety.streamIndexChangeBy143B === false &&
    snapshot.safety.prismaSchemaChangeBy143B === false &&
    snapshot.safety.migrationCreatedBy143B === false &&
    snapshot.safety.routeBehaviorChangeBy143B === false &&
    snapshot.safety.backendRestartBy143B === false &&
    snapshot.safety.runtimePostBy143B === false &&
    snapshot.safety.databaseReadBy143B === false &&
    snapshot.safety.databaseWriteBy143B === false &&
    snapshot.safety.providerCallBy143B === false &&
    snapshot.safety.walletMutationBy143B === false &&
    snapshot.safety.moneyMovementBy143B === false &&
    snapshot.safety.fakeSuccessBy143B === false;

  const ready = previousPlanningReady && contractsReady && safetyEnvelopeReady && nextApprovalReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "repository_boundary_contracts_scaffold_ready" : "repository_boundary_contracts_scaffold_blocked",
    idempotencyContracts: snapshot.idempotencyContracts.length,
    transactionBoundaryContracts: snapshot.transactionBoundaryContracts.length,
    repositoryContracts: 4,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-143C controlled live runtime repository boundary contracts compile and safety verification ops-only after exact approval",
  } as const;
}
