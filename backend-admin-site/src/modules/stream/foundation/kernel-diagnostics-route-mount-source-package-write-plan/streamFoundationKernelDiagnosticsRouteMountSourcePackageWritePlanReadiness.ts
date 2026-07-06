import { getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanSnapshot } from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlan";
import type { StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanStatus } from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanContracts";

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanReadiness {
  readonly version: "BACKEND-STREAM-FOUNDATION-139G";
  readonly status: StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanStatus;
  readonly ready: boolean;
  readonly readyForFutureOwnerReview: boolean;
  readonly totalTargets: number;
  readonly writeAllowedTargets: 0;
  readonly includedTargetsInThisPatch: 0;
  readonly sourceTextReturnedTargets: 0;
  readonly totalCommands: number;
  readonly executableCommands: 0;
  readonly commandsWritingFilesNow: 0;
  readonly commandsMountingRouteNow: 0;
  readonly totalChecks: number;
  readonly passedChecks: number;
  readonly blockingChecks: number;
  readonly sourcePackageWriteAllowedNow: false;
  readonly sourcePackageWriteExecutedNow: false;
  readonly sourceFilesWrittenNow: false;
  readonly routeMountAllowedNow: false;
  readonly runtimeActivationAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowed: false;
}

export function getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanReadiness(): StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanReadiness {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanSnapshot();
  return {
    version: snapshot.version,
    status: snapshot.status,
    ready: snapshot.status === "route_mount_source_package_write_plan_ready" && snapshot.blockingChecks === 0,
    readyForFutureOwnerReview: snapshot.decision.readyForFutureOwnerReview,
    totalTargets: snapshot.totalTargets,
    writeAllowedTargets: 0,
    includedTargetsInThisPatch: 0,
    sourceTextReturnedTargets: 0,
    totalCommands: snapshot.totalCommands,
    executableCommands: 0,
    commandsWritingFilesNow: 0,
    commandsMountingRouteNow: 0,
    totalChecks: snapshot.totalChecks,
    passedChecks: snapshot.passedChecks,
    blockingChecks: snapshot.blockingChecks,
    sourcePackageWriteAllowedNow: false,
    sourcePackageWriteExecutedNow: false,
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
