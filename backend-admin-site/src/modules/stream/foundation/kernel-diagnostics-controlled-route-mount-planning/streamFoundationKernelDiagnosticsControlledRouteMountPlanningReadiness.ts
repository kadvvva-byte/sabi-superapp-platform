import { getStreamFoundationKernelDiagnosticsControlledRouteMountPlanningSnapshot } from "./streamFoundationKernelDiagnosticsControlledRouteMountPlanning";
import type { StreamFoundationKernelDiagnosticsControlledRouteMountPlanningStatus } from "./streamFoundationKernelDiagnosticsControlledRouteMountPlanningContracts";

export interface StreamFoundationKernelDiagnosticsControlledRouteMountPlanningReadiness {
  readonly version: "BACKEND-STREAM-FOUNDATION-139M";
  readonly status: StreamFoundationKernelDiagnosticsControlledRouteMountPlanningStatus;
  readonly ready: boolean;
  readonly readyForControlledRouteMountSourcePatchPackage: boolean;
  readonly readyForProductionRouteMount: false;
  readonly ownerApprovalRequiredBeforeRouteMount: true;
  readonly totalSteps: number;
  readonly executableStepsNow: 0;
  readonly totalChecks: number;
  readonly passedChecks: number;
  readonly blockingChecks: number;
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

export function getStreamFoundationKernelDiagnosticsControlledRouteMountPlanningReadiness(): StreamFoundationKernelDiagnosticsControlledRouteMountPlanningReadiness {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledRouteMountPlanningSnapshot();
  const ready = snapshot.status === "controlled_route_mount_planning_ready" && snapshot.blockingChecks === 0;
  return {
    version: snapshot.version,
    status: snapshot.status,
    ready,
    readyForControlledRouteMountSourcePatchPackage: snapshot.readyForControlledRouteMountSourcePatchPackage,
    readyForProductionRouteMount: false,
    ownerApprovalRequiredBeforeRouteMount: true,
    totalSteps: snapshot.totalSteps,
    executableStepsNow: 0,
    totalChecks: snapshot.totalChecks,
    passedChecks: snapshot.passedChecks,
    blockingChecks: snapshot.blockingChecks,
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
