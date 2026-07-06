import {
  TAXI_ADMIN_DASHBOARD_ACTION_STATES,
  TAXI_ADMIN_DASHBOARD_FILTERS,
  TAXI_ADMIN_DASHBOARD_PANELS,
  TAXI_ADMIN_DASHBOARD_VERSION,
  taxiAdminDashboardRouteDescriptors,
} from './taxiAdminDashboard.constants';
import type {
  TaxiAdminDashboardReadinessDecision,
  TaxiAdminDashboardReadinessInput,
  TaxiAdminDashboardReadinessSnapshot,
} from './taxiAdminDashboard.types';

export function getTaxiAdminDashboardReadinessSnapshot(): TaxiAdminDashboardReadinessSnapshot {
  return {
    version: TAXI_ADMIN_DASHBOARD_VERSION,
    module: 'taxi',
    status: 'admin_dashboard_contract_ready_safe_disabled',
    adminAddedWithFoundation: true,
    maximumCompatibilityMode: true,
    dashboardContractsReady: true,
    dailyReportDashboardRequired: true,
    complaintFiltersRequired: true,
    actionStateBoardRequired: true,
    countryDayRoleFiltersRequired: true,
    clientAppMustUseKernel: true,
    adminUiUsesSameFoundationContracts: true,
    rawEvidenceAdminFoundationOnly: true,
    filters: TAXI_ADMIN_DASHBOARD_FILTERS,
    actionStates: TAXI_ADMIN_DASHBOARD_ACTION_STATES,
    panels: TAXI_ADMIN_DASHBOARD_PANELS,
    routeDescriptors: taxiAdminDashboardRouteDescriptors,
    routeRuntimeMountedNow: false,
    dashboardRuntimeMountedNow: false,
    dbReadEnabled: false,
    dbWriteEnabled: false,
    walletMutationEnabled: false,
    paymentEnabled: false,
    payoutEnabled: false,
    providerEnabled: false,
    fakeSuccessBlocked: true,
  };
}

export function evaluateTaxiAdminDashboardReadiness(input: TaxiAdminDashboardReadinessInput): TaxiAdminDashboardReadinessDecision {
  const blockedReasons: string[] = [];

  if (!input.hasAdminPermission) {
    blockedReasons.push('admin_permission_required');
  }
  if (input.wantsRuntimeDashboard) {
    blockedReasons.push('runtime_dashboard_safe_disabled');
  }
  if (input.wantsDbReadOrWrite) {
    blockedReasons.push('db_read_write_requires_separate_exact_approval');
  }
  if (input.wantsRawEvidenceInMobile) {
    blockedReasons.push('raw_evidence_mobile_blocked_kernel_summary_only');
  }
  if (!input.hasExactApproval) {
    blockedReasons.push('exact_approval_required_for_runtime_dashboard');
  }

  return {
    canRenderContractDashboard: input.hasAdminPermission,
    canRunRuntimeDashboardNow: false,
    canSendRawEvidenceToMobile: false,
    blockedReasons: Array.from(new Set(blockedReasons)),
    requiresExactApprovalForRuntime: true,
    fakeSuccessBlocked: true,
  };
}
