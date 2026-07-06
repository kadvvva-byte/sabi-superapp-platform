import { getStreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningSnapshot } from "./streamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanning";
import { getStreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningReadiness } from "./streamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningReadiness";

export interface StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningSmokeReport {
  readonly version: "BACKEND-STREAM-FOUNDATION-139B";
  readonly status: "route_mount_owner_approval_planning_smoke_ready" | "route_mount_owner_approval_planning_smoke_blocked";
  readonly snapshotReady: boolean;
  readonly readinessReady: boolean;
  readonly readyForFutureOwnerReview: boolean;
  readonly requiresFutureExplicitOwnerApproval: true;
  readonly ownerApprovalCapturedNow: false;
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
  readonly mobileProviderKeysAllowed: false;
  readonly fakeSuccessAllowed: false;
}

export function getStreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningSmokeReport(): StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningReadiness();
  const snapshotReady = snapshot.status === "route_mount_owner_approval_planning_ready" && snapshot.blockingChecks === 0;
  const readinessReady = readiness.ready === true && readiness.blockingChecks === 0;
  const readyForFutureOwnerReview = snapshot.decision.readyForFutureOwnerReview === true && readiness.readyForFutureOwnerReview === true;

  return {
    version: snapshot.version,
    status: snapshotReady && readinessReady && readyForFutureOwnerReview ? "route_mount_owner_approval_planning_smoke_ready" : "route_mount_owner_approval_planning_smoke_blocked",
    snapshotReady,
    readinessReady,
    readyForFutureOwnerReview,
    requiresFutureExplicitOwnerApproval: true,
    ownerApprovalCapturedNow: false,
    foundationScopeOnly: snapshot.patchScope === "src/modules/stream/foundation/** only",
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
