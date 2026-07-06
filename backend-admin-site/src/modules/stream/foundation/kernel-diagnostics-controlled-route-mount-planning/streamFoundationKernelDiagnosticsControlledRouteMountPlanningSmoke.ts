import { getStreamFoundationKernelDiagnosticsControlledRouteMountPlanningSnapshot } from "./streamFoundationKernelDiagnosticsControlledRouteMountPlanning";
import { getStreamFoundationKernelDiagnosticsControlledRouteMountPlanningReadiness } from "./streamFoundationKernelDiagnosticsControlledRouteMountPlanningReadiness";

export interface StreamFoundationKernelDiagnosticsControlledRouteMountPlanningSmokeReport {
  readonly version: "BACKEND-STREAM-FOUNDATION-139M";
  readonly status: "controlled_route_mount_planning_smoke_ready" | "controlled_route_mount_planning_smoke_blocked";
  readonly snapshotReady: boolean;
  readonly readinessReady: boolean;
  readonly planningStepsReady: boolean;
  readonly noExecutableStepsNow: boolean;
  readonly noBlockingChecks: boolean;
  readonly foundationScopeOnly: boolean;
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
  readonly fakeSuccessAllowed: false;
}

export function getStreamFoundationKernelDiagnosticsControlledRouteMountPlanningSmokeReport(): StreamFoundationKernelDiagnosticsControlledRouteMountPlanningSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledRouteMountPlanningSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsControlledRouteMountPlanningReadiness();
  const snapshotReady = snapshot.status === "controlled_route_mount_planning_ready";
  const readinessReady = readiness.ready === true && readiness.readyForControlledRouteMountSourcePatchPackage === true;
  const planningStepsReady = snapshot.totalSteps === 8 && snapshot.planningSteps.every((step) => step.executedNow === false);
  const noExecutableStepsNow = snapshot.executableStepsNow === 0;
  const noBlockingChecks = snapshot.blockingChecks === 0;
  const foundationScopeOnly = snapshot.patchScope === "src/modules/stream/foundation/** only";
  const safe = snapshotReady && readinessReady && planningStepsReady && noExecutableStepsNow && noBlockingChecks && foundationScopeOnly;

  return {
    version: snapshot.version,
    status: safe ? "controlled_route_mount_planning_smoke_ready" : "controlled_route_mount_planning_smoke_blocked",
    snapshotReady,
    readinessReady,
    planningStepsReady,
    noExecutableStepsNow,
    noBlockingChecks,
    foundationScopeOnly,
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
    fakeSuccessAllowed: false,
  };
}
