import { getStreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationSnapshot } from "./streamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerification";
import type { StreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationStatus } from "./streamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationContracts";

export interface StreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationReadiness {
  readonly version: "BACKEND-STREAM-FOUNDATION-139L";
  readonly status: StreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationStatus;
  readonly ready: boolean;
  readonly readyForControlledRouteMountPlanning: boolean;
  readonly verifiedFileCount: number;
  readonly totalChecks: number;
  readonly passedChecks: number;
  readonly blockingChecks: number;
  readonly routeSourceOnlyPostWriteVerifiedNow: boolean;
  readonly sourceFilesVerifiedNow: boolean;
  readonly routeMountAllowedNow: false;
  readonly routeMountPerformedNow: false;
  readonly runtimeActivationAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly rawSecretsReturned: false;
  readonly fakeSuccessAllowed: false;
}

export function getStreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationReadiness(): StreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationReadiness {
  const snapshot = getStreamFoundationKernelDiagnosticsRuntimeRouteSourceOnlyPostWriteVerificationSnapshot();
  const ready = snapshot.status === "runtime_route_source_only_post_write_verified" && snapshot.blockingChecks === 0;
  return {
    version: snapshot.version,
    status: snapshot.status,
    ready,
    readyForControlledRouteMountPlanning: snapshot.readyForControlledRouteMountPlanning,
    verifiedFileCount: snapshot.verifiedFileCount,
    totalChecks: snapshot.totalChecks,
    passedChecks: snapshot.passedChecks,
    blockingChecks: snapshot.blockingChecks,
    routeSourceOnlyPostWriteVerifiedNow: snapshot.routeSourceOnlyPostWriteVerifiedNow,
    sourceFilesVerifiedNow: snapshot.sourceFilesVerifiedNow,
    routeMountAllowedNow: false,
    routeMountPerformedNow: false,
    runtimeActivationAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretsReturned: false,
    fakeSuccessAllowed: false,
  };
}
