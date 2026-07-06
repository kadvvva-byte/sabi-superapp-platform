import {
  TAXI_ADMIN_FOUNDATION_COMPLETION_GATES,
  TAXI_ADMIN_FOUNDATION_COMPLETION_ITEMS,
  TAXI_ADMIN_FOUNDATION_COMPLETION_VERSION,
  taxiAdminFoundationCompletionRouteDescriptors,
} from './taxiAdminFoundationCompletion.constants';
import type {
  TaxiAdminFoundationCompletionDecision,
  TaxiAdminFoundationCompletionDecisionInput,
  TaxiAdminFoundationCompletionSnapshot,
} from './taxiAdminFoundationCompletion.types';

export function getTaxiAdminFoundationCompletionSnapshot(): TaxiAdminFoundationCompletionSnapshot {
  return {
    version: TAXI_ADMIN_FOUNDATION_COMPLETION_VERSION,
    module: 'taxi',
    status: 'admin_foundation_100_percent_contract_readiness_safe_disabled',
    foundationAndAdminPreparedAt100PercentContractLevel: true,
    clientUiReturnBlockedUntilRealFoundationAdmin100: true,
    adminAddedWithFoundation: true,
    maximumCompatibilityMode: true,
    adminUiUsesSameFoundationContracts: true,
    clientAppMustUseKernel: true,
    clientReceivesKernelSafeStatusOnly: true,
    rawEvidenceAdminFoundationOnly: true,
    allComplaintsCheckedEveryDayRequired: true,
    fullDailyAiReportRequired: true,
    sabiAiMustCheckAllComplaintsEveryDay: true,
    adminDashboardContractsComplete: true,
    adminNotificationContractsComplete: true,
    adminApprovalGatesComplete: true,
    schemaPlanningContractsComplete: true,
    routePlanningContractsComplete: true,
    schedulerPlanningContractsComplete: true,
    runtimeExactApprovalRequired: true,
    dbExactApprovalRequired: true,
    providerPaymentPayoutExactApprovalRequired: true,
    completionItems: TAXI_ADMIN_FOUNDATION_COMPLETION_ITEMS,
    completionGates: TAXI_ADMIN_FOUNDATION_COMPLETION_GATES,
    routeDescriptors: taxiAdminFoundationCompletionRouteDescriptors,
    routeRuntimeMountedNow: false,
    adminUiRuntimeMountedNow: false,
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

export function evaluateTaxiAdminFoundationCompletionRequest(
  input: TaxiAdminFoundationCompletionDecisionInput,
): TaxiAdminFoundationCompletionDecision {
  const blockedReasons: string[] = [];

  if (input.wantsAdminUiRuntime) {
    blockedReasons.push('admin_ui_runtime_blocked_until_exact_approval');
  }
  if (input.wantsRouteMount) {
    blockedReasons.push('route_mount_blocked_until_runtime_exact_approval');
  }
  if (input.wantsSchedulerRuntime) {
    blockedReasons.push('scheduler_runtime_blocked_until_exact_approval');
  }
  if (input.wantsPrismaSchemaWrite) {
    blockedReasons.push('prisma_schema_write_blocked_until_schema_diff_and_exact_approval');
  }
  if (input.wantsPrismaGenerateOrMigration) {
    blockedReasons.push('prisma_generate_or_migration_blocked_until_schema_approved_and_rollback_ready');
  }
  if (input.wantsDbReadOrWrite) {
    blockedReasons.push('db_access_blocked_until_db_exact_approval');
  }
  if (input.wantsWalletPaymentPayout) {
    blockedReasons.push('wallet_payment_payout_blocked_until_finance_exact_approval');
  }
  if (input.wantsProviderDispatch) {
    blockedReasons.push('provider_dispatch_blocked_until_provider_exact_approval');
  }
  if (!input.hasExactOwnerApproval) {
    blockedReasons.push('exact_owner_approval_required_before_any_execution');
  }

  return {
    canProceedToClientUiUxNow: false,
    canExecuteRuntimeNow: false,
    canWriteSchemaNow: false,
    canRunDbNow: false,
    blockedReasons: Array.from(new Set(blockedReasons)),
    foundationAdminPreparedAtContractLevel: true,
    exactApprovalRequiredBeforeExecution: true,
    fakeSuccessBlocked: true,
  };
}
