import {
  TAXI_ADMIN_EXECUTION_READINESS_CHECKLIST,
  TAXI_ADMIN_EXECUTION_READINESS_GATES,
  TAXI_ADMIN_EXECUTION_READINESS_VERSION,
  taxiAdminExecutionReadinessRouteDescriptors,
} from './taxiAdminExecutionReadiness.constants';
import type {
  TaxiAdminExecutionReadinessDecision,
  TaxiAdminExecutionReadinessInput,
  TaxiAdminExecutionReadinessSnapshot,
} from './taxiAdminExecutionReadiness.types';

export function getTaxiAdminExecutionReadinessSnapshot(): TaxiAdminExecutionReadinessSnapshot {
  return {
    version: TAXI_ADMIN_EXECUTION_READINESS_VERSION,
    module: 'taxi',
    status: 'admin_execution_readiness_safe_disabled_ready',
    adminExecutionReadinessContractsRequired: true,
    adminAddedWithFoundation: true,
    maximumCompatibilityMode: true,
    clientAppMustUseKernel: true,
    adminUiUsesSameFoundationContracts: true,
    exactApprovalRequiredBeforeAnyRuntime: true,
    dailyAiReportMustBeCompleteBeforeRuntime: true,
    allComplaintsCheckedEveryDayBeforeClose: true,
    evidenceRedactionRequiredBeforeMobilePublish: true,
    gates: TAXI_ADMIN_EXECUTION_READINESS_GATES,
    checklist: TAXI_ADMIN_EXECUTION_READINESS_CHECKLIST,
    routeDescriptors: taxiAdminExecutionReadinessRouteDescriptors,
    routeRuntimeMounted: false,
    dashboardRuntimeMountedNow: false,
    schedulerRuntimeMountedNow: false,
    dbReadEnabled: false,
    dbWriteEnabled: false,
    walletMutationEnabled: false,
    paymentEnabled: false,
    payoutEnabled: false,
    providerEnabled: false,
    fakeSuccessBlocked: true,
  };
}

export function evaluateTaxiAdminExecutionReadiness(input: TaxiAdminExecutionReadinessInput): TaxiAdminExecutionReadinessDecision {
  const blockedReasons: string[] = [];

  if (!input.hasAdminPermission) {
    blockedReasons.push('admin_permission_required');
  }
  if (!input.hasExactOwnerApproval) {
    blockedReasons.push('exact_owner_approval_required_before_any_runtime');
  }
  if (!input.dailyAiReportComplete) {
    blockedReasons.push('daily_sabi_ai_report_must_be_complete');
  }
  if (!input.allComplaintsChecked) {
    blockedReasons.push('all_driver_and_rider_complaints_must_be_checked');
  }
  if (input.wantsClientBoundaryPublish && !input.evidenceRedacted) {
    blockedReasons.push('evidence_redaction_required_before_client_boundary_publish');
  }
  if (!input.rollbackPlanReady) {
    blockedReasons.push('rollback_plan_required_before_future_runtime');
  }
  if (input.wantsRuntimeRouteMount) {
    blockedReasons.push('runtime_route_mount_safe_disabled');
  }
  if (input.wantsSchedulerActivation) {
    blockedReasons.push('scheduler_cron_runtime_safe_disabled');
  }
  if (input.wantsDbReadOrWrite) {
    blockedReasons.push('db_read_write_requires_separate_exact_approval');
  }
  if (input.wantsWalletMutation) {
    blockedReasons.push('wallet_mutation_requires_separate_exact_approval');
  }
  if (input.wantsProviderActivation) {
    blockedReasons.push('provider_activation_requires_separate_exact_approval');
  }
  if (input.wantsPaymentOrPayout) {
    blockedReasons.push('payment_or_payout_requires_separate_exact_approval');
  }

  return {
    canRenderAdminExecutionReadiness: input.hasAdminPermission,
    canExecuteRuntimeNow: false,
    canMountRoutesNow: false,
    canActivateSchedulerNow: false,
    canReadOrWriteDbNow: false,
    canMutateWalletNow: false,
    canActivateProviderNow: false,
    canChargeOrPayoutNow: false,
    canPublishClientBoundarySummaryNow: false,
    blockedReasons: Array.from(new Set(blockedReasons)),
    requiresExactApprovalForRuntime: true,
    fakeSuccessBlocked: true,
  };
}
