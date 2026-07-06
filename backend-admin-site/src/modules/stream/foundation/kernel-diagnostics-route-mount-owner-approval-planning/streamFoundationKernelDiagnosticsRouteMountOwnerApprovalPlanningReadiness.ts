import { getStreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningSnapshot } from "./streamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanning";
import type { StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningStatus } from "./streamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningContracts";

export interface StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningReadiness {
  readonly version: "BACKEND-STREAM-FOUNDATION-139B";
  readonly status: StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningStatus;
  readonly ready: boolean;
  readonly readyForFutureOwnerReview: boolean;
  readonly requiresFutureExplicitOwnerApproval: true;
  readonly ownerApprovalCapturedNow: false;
  readonly totalRequirements: number;
  readonly readyRequirements: number;
  readonly blockingChecks: number;
  readonly routeMountAllowedNow: false;
  readonly runtimeActivationAllowedNow: false;
  readonly sourceWriteAllowedNow: false;
  readonly serverCopyAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowed: false;
}

export function getStreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningReadiness(): StreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningReadiness {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteMountOwnerApprovalPlanningSnapshot();
  return {
    version: snapshot.version,
    status: snapshot.status,
    ready: snapshot.status === "route_mount_owner_approval_planning_ready" && snapshot.blockingChecks === 0,
    readyForFutureOwnerReview: snapshot.decision.readyForFutureOwnerReview,
    requiresFutureExplicitOwnerApproval: true,
    ownerApprovalCapturedNow: false,
    totalRequirements: snapshot.totalRequirements,
    readyRequirements: snapshot.readyRequirements,
    blockingChecks: snapshot.blockingChecks,
    routeMountAllowedNow: false,
    runtimeActivationAllowedNow: false,
    sourceWriteAllowedNow: false,
    serverCopyAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
  };
}
