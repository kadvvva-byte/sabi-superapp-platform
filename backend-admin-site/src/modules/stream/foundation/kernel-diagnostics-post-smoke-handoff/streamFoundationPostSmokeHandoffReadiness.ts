import { getStreamFoundationPostSmokeHandoffSnapshot } from "./streamFoundationPostSmokeHandoff";

export function getStreamFoundationPostSmokeHandoffReadiness() {
  const snapshot = getStreamFoundationPostSmokeHandoffSnapshot();

  const evidenceReady =
    snapshot.evidence.previousStage === "BACKEND-STREAM-FOUNDATION-140R" &&
    snapshot.evidence.typescriptExitCode === 0 &&
    snapshot.evidence.readinessAuthenticatedGetStatus === 200 &&
    snapshot.evidence.previewAuthenticatedGetStatus === 200 &&
    snapshot.evidence.sourceChecksPassed === true &&
    snapshot.evidence.appRouteId === "stream_kernel_diagnostics_snapshot" &&
    snapshot.evidence.mapperDefaultScopes.includes("admin:stream:read") &&
    snapshot.evidence.mapperDefaultScopes.includes("admin:stream:diagnostics:read");

  const safetyReady =
    snapshot.safety.backendRestartPerformed === 0 &&
    snapshot.safety.sourceMutationPerformedBy140S === 0 &&
    snapshot.safety.runtimeHttpPerformedBy140S === 0 &&
    snapshot.safety.databaseWritePerformed === 0 &&
    snapshot.safety.providerCallPerformed === 0 &&
    snapshot.safety.walletMutationPerformed === 0 &&
    snapshot.safety.paymentAuthorizationPerformed === 0 &&
    snapshot.safety.monthlyPayoutPerformed === 0 &&
    snapshot.safety.moneyMovementPerformed === 0 &&
    snapshot.safety.rawTokenStored === 0 &&
    snapshot.safety.fakeSuccessAllowed === false;

  const nextBatchReady =
    snapshot.readyForNextBatch === true &&
    snapshot.nextBatch.length === 4 &&
    snapshot.nextBatch.every((item) => item.status === "ready_next");

  const ready = evidenceReady && safetyReady && nextBatchReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "post_smoke_handoff_ready_next_batch_unblocked" : "post_smoke_handoff_blocked",
    nextBatchCount: snapshot.nextBatch.length,
    readyForProductionBackend: snapshot.readyForProductionBackend,
  } as const;
}
