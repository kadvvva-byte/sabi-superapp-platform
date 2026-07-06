import { getStreamFoundationKernelDiagnosticsFoundationHandoffFreezeSnapshot } from "./streamFoundationKernelDiagnosticsFoundationHandoffFreeze";
import type { StreamFoundationKernelDiagnosticsFoundationHandoffFreezeStatus } from "./streamFoundationKernelDiagnosticsFoundationHandoffFreezeContracts";

export interface StreamFoundationKernelDiagnosticsFoundationHandoffFreezeReadiness {
  readonly version: "BACKEND-STREAM-FOUNDATION-139A";
  readonly status: StreamFoundationKernelDiagnosticsFoundationHandoffFreezeStatus;
  readonly ready: boolean;
  readonly diagnosticsFoundationFrozen: boolean;
  readonly readyForRouteMountPlanningAfterOwnerApproval: boolean;
  readonly blockingChecks: number;
  readonly routeMountAllowedNow: false;
  readonly runtimeActivationAllowedNow: false;
  readonly sourceWriteAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowed: false;
}

export function getStreamFoundationKernelDiagnosticsFoundationHandoffFreezeReadiness(): StreamFoundationKernelDiagnosticsFoundationHandoffFreezeReadiness {
  const snapshot = getStreamFoundationKernelDiagnosticsFoundationHandoffFreezeSnapshot();
  return {
    version: snapshot.version,
    status: snapshot.status,
    ready: snapshot.status === "diagnostics_foundation_handoff_freeze_ready" && snapshot.blockingChecks === 0,
    diagnosticsFoundationFrozen: snapshot.decision.diagnosticsFoundationFrozen,
    readyForRouteMountPlanningAfterOwnerApproval: snapshot.decision.readyForRouteMountPlanningAfterOwnerApproval,
    blockingChecks: snapshot.blockingChecks,
    routeMountAllowedNow: false,
    runtimeActivationAllowedNow: false,
    sourceWriteAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
  };
}
