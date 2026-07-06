import { getStreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageSnapshot } from "./streamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackage";
import type { StreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageStatus } from "./streamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageContracts";

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageReadiness {
  readonly version: "BACKEND-STREAM-FOUNDATION-139D";
  readonly status: StreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageStatus;
  readonly ready: boolean;
  readonly readyForFutureFinalReview: boolean;
  readonly totalTargetFiles: number;
  readonly targetFilesReady: number;
  readonly totalSteps: number;
  readonly readySteps: number;
  readonly blockingChecks: number;
  readonly sourcePatchAllowedNow: false;
  readonly sourcePatchExecutedNow: false;
  readonly sourceFilesWrittenNow: false;
  readonly routeMountAllowedNow: false;
  readonly runtimeActivationAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowed: false;
}

export function getStreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageReadiness(): StreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageReadiness {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageSnapshot();
  return {
    version: snapshot.version,
    status: snapshot.status,
    ready: snapshot.status === "route_mount_source_patch_draft_package_ready" && snapshot.blockingChecks === 0,
    readyForFutureFinalReview: snapshot.decision.readyForFutureFinalReview,
    totalTargetFiles: snapshot.totalTargetFiles,
    targetFilesReady: snapshot.targetFilesReady,
    totalSteps: snapshot.totalSteps,
    readySteps: snapshot.readySteps,
    blockingChecks: snapshot.blockingChecks,
    sourcePatchAllowedNow: false,
    sourcePatchExecutedNow: false,
    sourceFilesWrittenNow: false,
    routeMountAllowedNow: false,
    runtimeActivationAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
  };
}
