import { buildTaxiRouteControllerImplementation002L } from '../route-controller-implementation-002l';
import {
  TAXI_ROUTE_MOUNT_APPROVAL_GATES_002M,
  TAXI_ROUTE_MOUNT_APPROVAL_SAFETY_002M,
  TAXI_ROUTE_MOUNT_APPROVAL_VERSION_002M,
  TAXI_ROUTE_MOUNT_BASE_PATH_002M,
  TAXI_ROUTE_MOUNT_PLAN_STEPS_002M,
  TAXI_ROUTE_MOUNT_TARGET_APP_FILE_002M,
} from './constants';
import type { TaxiRouteMountApproval002M, TaxiRouteMountApprovalEvaluation002M } from './types';

export const buildTaxiRouteMountApproval002M = (): TaxiRouteMountApproval002M => {
  const routeController002L = buildTaxiRouteControllerImplementation002L();

  return {
    version: TAXI_ROUTE_MOUNT_APPROVAL_VERSION_002M,
    status: 'approval_pack_ready',
    mountBasePath: TAXI_ROUTE_MOUNT_BASE_PATH_002M,
    targetAppFile: TAXI_ROUTE_MOUNT_TARGET_APP_FILE_002M,
    routeController002L,
    routeContractCount: routeController002L.routeContractCount,
    controllerGroupCount: routeController002L.controllerGroupCount,
    adminRouteContractCount: routeController002L.adminRouteContractCount,
    idempotentWriteRouteCount: routeController002L.idempotentWriteRouteCount,
    walletBoundaryRouteCount: routeController002L.walletBoundaryRouteCount,
    providerReadinessRouteCount: routeController002L.providerReadinessRouteCount,
    approvalGateCount: TAXI_ROUTE_MOUNT_APPROVAL_GATES_002M.length,
    mountPlanStepCount: TAXI_ROUTE_MOUNT_PLAN_STEPS_002M.length,
    approvalGates: TAXI_ROUTE_MOUNT_APPROVAL_GATES_002M,
    mountPlanSteps: TAXI_ROUTE_MOUNT_PLAN_STEPS_002M,
    requiresSeparateExactOwnerApproval: true,
    routeMountApprovedNow: false,
    appMountApprovedNow: false,
    dbRuntimeExecutionApprovedNow: false,
    providerRuntimeApprovedNow: false,
    walletRuntimeApprovedNow: false,
    nextStep: '002N controlled app route mount patch',
    safety: TAXI_ROUTE_MOUNT_APPROVAL_SAFETY_002M,
  };
};

export const evaluateTaxiRouteMountApproval002M = (): TaxiRouteMountApprovalEvaluation002M => {
  const approval = buildTaxiRouteMountApproval002M();

  return {
    version: approval.version,
    status: approval.status,
    routeContractCountReady: approval.routeContractCount >= 58,
    controllerGroupCountReady: approval.controllerGroupCount >= 12,
    adminRouteContractCountReady: approval.adminRouteContractCount >= 18,
    idempotentWriteRouteCountReady: approval.idempotentWriteRouteCount >= 40,
    approvalGateCountReady: approval.approvalGateCount >= 14,
    mountPlanStepCountReady: approval.mountPlanStepCount >= 10,
    requiresSeparateExactOwnerApproval: approval.requiresSeparateExactOwnerApproval,
    routeMountApprovedNow: approval.routeMountApprovedNow,
    appMountApprovedNow: approval.appMountApprovedNow,
    dbRuntimeExecutionApprovedNow: approval.dbRuntimeExecutionApprovedNow,
    providerRuntimeApprovedNow: approval.providerRuntimeApprovedNow,
    walletRuntimeApprovedNow: approval.walletRuntimeApprovedNow,
    safety: approval.safety,
  };
};
