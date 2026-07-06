import { getStreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionSnapshot } from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecution";
import type { StreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionStatus } from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionContracts";

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionReadiness {
  readonly version: "BACKEND-STREAM-FOUNDATION-139K";
  readonly status: StreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionStatus;
  readonly ready: boolean;
  readonly readyForPostWriteVerification: boolean;
  readonly writtenFileCount: number;
  readonly totalGateItems: number;
  readonly passedGateItems: number;
  readonly blockingGateItems: number;
  readonly sourcePackageSourceOnlyExecutedNow: true;
  readonly sourceFilesWrittenNow: true;
  readonly sourceTextReturned: false;
  readonly routeMountAllowedNow: false;
  readonly routeMountPerformedNow: false;
  readonly runtimeActivationAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowed: false;
}

export function getStreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionReadiness(): StreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionReadiness {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionSnapshot();
  return {
    version: snapshot.version,
    status: snapshot.status,
    ready: snapshot.status === "route_mount_source_package_source_only_execution_ready" && snapshot.blockingGateItems === 0,
    readyForPostWriteVerification: snapshot.readyForPostWriteVerification,
    writtenFileCount: snapshot.writtenFileCount,
    totalGateItems: snapshot.totalGateItems,
    passedGateItems: snapshot.passedGateItems,
    blockingGateItems: snapshot.blockingGateItems,
    sourcePackageSourceOnlyExecutedNow: true,
    sourceFilesWrittenNow: true,
    sourceTextReturned: false,
    routeMountAllowedNow: false,
    routeMountPerformedNow: false,
    runtimeActivationAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
  };
}
