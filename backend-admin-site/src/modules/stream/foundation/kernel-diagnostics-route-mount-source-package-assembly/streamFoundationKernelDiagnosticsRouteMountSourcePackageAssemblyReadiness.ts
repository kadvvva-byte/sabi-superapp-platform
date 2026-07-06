import { getStreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblySnapshot } from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageAssembly";
import type { StreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblyStatus } from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblyContracts";

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblyReadiness {
  readonly version: "BACKEND-STREAM-FOUNDATION-139F";
  readonly status: StreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblyStatus;
  readonly ready: boolean;
  readonly readyForFutureWritePlan: boolean;
  readonly totalArtifacts: number;
  readonly includedArtifactsInThisPatch: 0;
  readonly sourceTextReturnedArtifacts: 0;
  readonly totalChecks: number;
  readonly passedChecks: number;
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

export function getStreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblyReadiness(): StreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblyReadiness {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblySnapshot();
  return {
    version: snapshot.version,
    status: snapshot.status,
    ready: snapshot.status === "route_mount_source_package_assembly_ready" && snapshot.blockingChecks === 0,
    readyForFutureWritePlan: snapshot.decision.readyForFutureWritePlan,
    totalArtifacts: snapshot.totalArtifacts,
    includedArtifactsInThisPatch: 0,
    sourceTextReturnedArtifacts: 0,
    totalChecks: snapshot.totalChecks,
    passedChecks: snapshot.passedChecks,
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
