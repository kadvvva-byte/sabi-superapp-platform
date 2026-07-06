import { getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanSnapshot } from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlan";
import { getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanReadiness } from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanReadiness";

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanSmokeReport {
  readonly version: "BACKEND-STREAM-FOUNDATION-139G";
  readonly status: "route_mount_source_package_write_plan_smoke_ready" | "route_mount_source_package_write_plan_smoke_blocked";
  readonly snapshotReady: boolean;
  readonly readinessReady: boolean;
  readonly readyForFutureOwnerReview: boolean;
  readonly foundationScopeOnly: boolean;
  readonly metadataOnlyTargets: boolean;
  readonly nonExecutableCommands: boolean;
  readonly streamIndexPatchIncluded: false;
  readonly appServerPatchIncluded: false;
  readonly sourcePackageWriteAllowed: false;
  readonly sourcePackageWriteExecuted: false;
  readonly sourceFilesWritten: false;
  readonly sourceTextReturned: false;
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

export function getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanSmokeReport(): StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanReadiness();
  const snapshotReady = snapshot.status === "route_mount_source_package_write_plan_ready" && snapshot.blockingChecks === 0;
  const readinessReady = readiness.ready === true && readiness.blockingChecks === 0;
  const readyForFutureOwnerReview = snapshot.decision.readyForFutureOwnerReview === true && readiness.readyForFutureOwnerReview === true;
  const metadataOnlyTargets = snapshot.writeAllowedTargets === 0 && snapshot.includedTargetsInThisPatch === 0 && snapshot.sourceTextReturnedTargets === 0;
  const nonExecutableCommands = snapshot.executableCommands === 0 && snapshot.commandsWritingFilesNow === 0 && snapshot.commandsMountingRouteNow === 0;
  const safe = snapshotReady && readinessReady && readyForFutureOwnerReview && metadataOnlyTargets && nonExecutableCommands;

  return {
    version: snapshot.version,
    status: safe ? "route_mount_source_package_write_plan_smoke_ready" : "route_mount_source_package_write_plan_smoke_blocked",
    snapshotReady,
    readinessReady,
    readyForFutureOwnerReview,
    foundationScopeOnly: snapshot.patchScope === "src/modules/stream/foundation/** only",
    metadataOnlyTargets,
    nonExecutableCommands,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    sourcePackageWriteAllowed: false,
    sourcePackageWriteExecuted: false,
    sourceFilesWritten: false,
    sourceTextReturned: false,
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
