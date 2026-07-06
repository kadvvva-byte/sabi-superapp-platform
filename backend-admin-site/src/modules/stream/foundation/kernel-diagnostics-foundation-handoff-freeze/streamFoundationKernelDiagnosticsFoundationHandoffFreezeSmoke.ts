import { getStreamFoundationKernelDiagnosticsFoundationHandoffFreezeReadiness } from "./streamFoundationKernelDiagnosticsFoundationHandoffFreezeReadiness";
import { getStreamFoundationKernelDiagnosticsFoundationHandoffFreezeSnapshot } from "./streamFoundationKernelDiagnosticsFoundationHandoffFreeze";

export interface StreamFoundationKernelDiagnosticsFoundationHandoffFreezeSmokeReport {
  readonly version: "BACKEND-STREAM-FOUNDATION-139A";
  readonly status: "diagnostics_foundation_handoff_freeze_smoke_ready" | "diagnostics_foundation_handoff_freeze_smoke_blocked";
  readonly snapshotReady: boolean;
  readonly readinessReady: boolean;
  readonly diagnosticsFoundationFrozen: boolean;
  readonly foundationScopeOnly: boolean;
  readonly streamIndexPatchIncluded: false;
  readonly appServerPatchIncluded: false;
  readonly routeMountPerformed: false;
  readonly runtimeHttpRequestPerformed: false;
  readonly databaseWritePerformed: false;
  readonly providerCallPerformed: false;
  readonly walletMutationPerformed: false;
  readonly paymentAuthorizationPerformed: false;
  readonly monthlyPayoutPerformed: false;
  readonly moneyMovementPerformed: false;
  readonly rawSecretsReturned: false;
  readonly mobileProviderKeysAllowed: false;
  readonly fakeSuccessAllowed: false;
}

export function getStreamFoundationKernelDiagnosticsFoundationHandoffFreezeSmokeReport(): StreamFoundationKernelDiagnosticsFoundationHandoffFreezeSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsFoundationHandoffFreezeSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsFoundationHandoffFreezeReadiness();
  const snapshotReady = snapshot.status === "diagnostics_foundation_handoff_freeze_ready" && snapshot.blockingChecks === 0;
  const readinessReady = readiness.ready === true && readiness.blockingChecks === 0;
  const diagnosticsFoundationFrozen = snapshot.decision.diagnosticsFoundationFrozen === true && readiness.diagnosticsFoundationFrozen === true;

  return {
    version: snapshot.version,
    status: snapshotReady && readinessReady && diagnosticsFoundationFrozen ? "diagnostics_foundation_handoff_freeze_smoke_ready" : "diagnostics_foundation_handoff_freeze_smoke_blocked",
    snapshotReady,
    readinessReady,
    diagnosticsFoundationFrozen,
    foundationScopeOnly: snapshot.patchScope === "src/modules/stream/foundation/** only",
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    routeMountPerformed: false,
    runtimeHttpRequestPerformed: false,
    databaseWritePerformed: false,
    providerCallPerformed: false,
    walletMutationPerformed: false,
    paymentAuthorizationPerformed: false,
    monthlyPayoutPerformed: false,
    moneyMovementPerformed: false,
    rawSecretsReturned: false,
    mobileProviderKeysAllowed: false,
    fakeSuccessAllowed: false,
  };
}
