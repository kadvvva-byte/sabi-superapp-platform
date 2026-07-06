import { getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateSnapshot } from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGate";
import { getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateReadiness } from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateReadiness";

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateSmokeReport {
  readonly version: "BACKEND-STREAM-FOUNDATION-139I";
  readonly status: "route_mount_source_package_write_final_gate_smoke_ready" | "route_mount_source_package_write_final_gate_smoke_blocked";
  readonly snapshotReady: boolean;
  readonly readinessReady: boolean;
  readonly readyForFutureOwnerApprovedSourceOnlyWrite: boolean;
  readonly allGateItemsPassed: boolean;
  readonly foundationScopeOnly: boolean;
  readonly ownerApprovalStillRequired: true;
  readonly ownerApprovalCapturedNow: false;
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

export function getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateSmokeReport(): StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateReadiness();
  const snapshotReady = snapshot.status === "route_mount_source_package_write_final_gate_ready" && snapshot.blockingGateItems === 0;
  const readinessReady = readiness.ready === true && readiness.blockingGateItems === 0;
  const readyForFutureOwnerApprovedSourceOnlyWrite =
    snapshot.decision.readyForFutureOwnerApprovedSourceOnlyWrite === true && readiness.readyForFutureOwnerApprovedSourceOnlyWrite === true;
  const allGateItemsPassed = snapshot.totalGateItems > 0 && snapshot.passedGateItems === snapshot.totalGateItems;
  const foundationScopeOnly = snapshot.patchScope === "src/modules/stream/foundation/** only";
  const safe = snapshotReady && readinessReady && readyForFutureOwnerApprovedSourceOnlyWrite && allGateItemsPassed && foundationScopeOnly;

  return {
    version: snapshot.version,
    status: safe ? "route_mount_source_package_write_final_gate_smoke_ready" : "route_mount_source_package_write_final_gate_smoke_blocked",
    snapshotReady,
    readinessReady,
    readyForFutureOwnerApprovedSourceOnlyWrite,
    allGateItemsPassed,
    foundationScopeOnly,
    ownerApprovalStillRequired: true,
    ownerApprovalCapturedNow: false,
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
