import { getStreamFoundationKernelDiagnosticsAdminRuntimeRouteSmokeReport } from "../kernel-diagnostics-admin-runtime-route";
import { getStreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionSnapshot } from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecution";
import { getStreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionReadiness } from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionReadiness";

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionSmokeReport {
  readonly version: "BACKEND-STREAM-FOUNDATION-139K";
  readonly status: "route_mount_source_package_source_only_execution_smoke_ready" | "route_mount_source_package_source_only_execution_smoke_blocked";
  readonly snapshotReady: boolean;
  readonly readinessReady: boolean;
  readonly runtimeRouteSmokeReady: boolean;
  readonly readyForPostWriteVerification: boolean;
  readonly allGateItemsPassed: boolean;
  readonly writtenFilesReady: boolean;
  readonly foundationScopeOnly: boolean;
  readonly sourcePackageSourceOnlyExecutedNow: true;
  readonly sourceFilesWrittenNow: true;
  readonly sourceTextReturned: false;
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

export function getStreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionSmokeReport(): StreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageSourceOnlyExecutionReadiness();
  const runtimeRouteSmoke = getStreamFoundationKernelDiagnosticsAdminRuntimeRouteSmokeReport();
  const snapshotReady = snapshot.status === "route_mount_source_package_source_only_execution_ready" && snapshot.blockingGateItems === 0;
  const readinessReady = readiness.ready === true && readiness.blockingGateItems === 0;
  const runtimeRouteSmokeReady = runtimeRouteSmoke.status === "runtime_route_source_smoke_ready_unmounted";
  const readyForPostWriteVerification = snapshot.readyForPostWriteVerification === true && readiness.readyForPostWriteVerification === true;
  const allGateItemsPassed = snapshot.totalGateItems > 0 && snapshot.passedGateItems === snapshot.totalGateItems;
  const writtenFilesReady = snapshot.writtenFileCount === 6 && snapshot.writtenFiles.every((file) => file.writtenNow === true && file.mountedNow === false);
  const foundationScopeOnly = snapshot.patchScope === "src/modules/stream/foundation/** only";
  const safe = snapshotReady && readinessReady && runtimeRouteSmokeReady && readyForPostWriteVerification && allGateItemsPassed && writtenFilesReady && foundationScopeOnly;

  return {
    version: snapshot.version,
    status: safe
      ? "route_mount_source_package_source_only_execution_smoke_ready"
      : "route_mount_source_package_source_only_execution_smoke_blocked",
    snapshotReady,
    readinessReady,
    runtimeRouteSmokeReady,
    readyForPostWriteVerification,
    allGateItemsPassed,
    writtenFilesReady,
    foundationScopeOnly,
    sourcePackageSourceOnlyExecutedNow: true,
    sourceFilesWrittenNow: true,
    sourceTextReturned: false,
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
