import { getStreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblySnapshot } from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageAssembly";
import { getStreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblyReadiness } from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblyReadiness";

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblySmokeReport {
  readonly version: "BACKEND-STREAM-FOUNDATION-139F";
  readonly status: "route_mount_source_package_assembly_smoke_ready" | "route_mount_source_package_assembly_smoke_blocked";
  readonly snapshotReady: boolean;
  readonly readinessReady: boolean;
  readonly readyForFutureWritePlan: boolean;
  readonly foundationScopeOnly: boolean;
  readonly metadataOnlyArtifacts: boolean;
  readonly streamIndexPatchIncluded: false;
  readonly appServerPatchIncluded: false;
  readonly sourcePatchExecuted: false;
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

export function getStreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblySmokeReport(): StreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblySmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblySnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblyReadiness();
  const snapshotReady = snapshot.status === "route_mount_source_package_assembly_ready" && snapshot.blockingChecks === 0;
  const readinessReady = readiness.ready === true && readiness.blockingChecks === 0;
  const readyForFutureWritePlan = snapshot.decision.readyForFutureWritePlan === true && readiness.readyForFutureWritePlan === true;
  const metadataOnlyArtifacts = snapshot.includedArtifactsInThisPatch === 0 && snapshot.sourceTextReturnedArtifacts === 0 && snapshot.artifacts.every((artifact) => artifact.includedInThisPatch === false && artifact.sourceTextReturned === false);

  return {
    version: snapshot.version,
    status: snapshotReady && readinessReady && readyForFutureWritePlan && metadataOnlyArtifacts ? "route_mount_source_package_assembly_smoke_ready" : "route_mount_source_package_assembly_smoke_blocked",
    snapshotReady,
    readinessReady,
    readyForFutureWritePlan,
    foundationScopeOnly: snapshot.patchScope === "src/modules/stream/foundation/** only",
    metadataOnlyArtifacts,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    sourcePatchExecuted: false,
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
