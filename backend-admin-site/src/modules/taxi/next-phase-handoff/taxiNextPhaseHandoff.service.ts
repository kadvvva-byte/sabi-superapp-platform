import {
  TAXI_ADMIN_PANEL_PLAN,
  TAXI_DB_SCHEMA_PLAN,
  TAXI_NEXT_PHASE_HANDOFF_ITEMS,
  TAXI_ROUTE_PLAN,
  taxiNextPhaseHandoffRouteDescriptors,
} from './taxiNextPhaseHandoff.constants';
import type {
  TaxiNextPhaseHandoffSnapshot,
  TaxiNextPhaseReadinessDecision,
  TaxiNextPhaseReadinessInput,
} from './taxiNextPhaseHandoff.types';

export function getTaxiNextPhaseHandoffSnapshot(): TaxiNextPhaseHandoffSnapshot {
  return {
    version: 'TAXI-BACKEND-FOUNDATION-001M',
    module: 'taxi',
    status: 'next_admin_db_handoff_safe_disabled_ready',
    adminDbHandoffReady: true,
    adminUiAddedWithFoundation: true,
    adminUiUsesSameFoundationContracts: true,
    dbSchemaPlanReady: true,
    dbSchemaWriteEnabledNow: false,
    routePlanReady: true,
    routeRuntimeMountedNow: false,
    schedulerRuntimeMountedNow: false,
    maximumCompatibilityMode: true,
    clientAppMustUseKernel: true,
    rawEvidenceAdminFoundationOnly: true,
    fullDailyAiReportRequired: true,
    allComplaintsCheckedEveryDayRequired: true,
    handoffItems: TAXI_NEXT_PHASE_HANDOFF_ITEMS,
    dbSchemaPlan: TAXI_DB_SCHEMA_PLAN,
    routePlan: TAXI_ROUTE_PLAN,
    adminPanelPlan: TAXI_ADMIN_PANEL_PLAN,
    routeDescriptors: taxiNextPhaseHandoffRouteDescriptors,
    dbReadEnabled: false,
    dbWriteEnabled: false,
    walletMutationEnabled: false,
    paymentEnabled: false,
    payoutEnabled: false,
    providerEnabled: false,
    fakeSuccessBlocked: true,
  };
}

export function evaluateTaxiNextPhaseReadiness(input: TaxiNextPhaseReadinessInput): TaxiNextPhaseReadinessDecision {
  const blockedReasons: string[] = [];

  if (input.wantsDbSchemaWrite) {
    blockedReasons.push('db_schema_write_requires_separate_exact_schema_approval');
  }
  if (input.wantsPrismaGenerateOrMigration) {
    blockedReasons.push('prisma_generate_or_migration_requires_exact_approval_and_rollback_plan');
  }
  if (input.wantsRouteMountRuntime) {
    blockedReasons.push('route_mount_runtime_requires_exact_approval_security_smoke_and_rollback_plan');
  }
  if (input.wantsSchedulerActivation) {
    blockedReasons.push('daily_ai_scheduler_activation_requires_runtime_and_db_approval');
  }
  if (input.wantsProviderWalletPaymentPayout) {
    blockedReasons.push('provider_wallet_payment_payout_requires_provider_ledger_legal_finance_approval');
  }
  if (input.wantsMobileDirectBackendProviderConnection) {
    blockedReasons.push('mobile_ui_must_use_taxi_kernel_no_direct_backend_provider_connection');
  }
  if (!input.hasExactOwnerApproval) {
    blockedReasons.push('exact_owner_approval_required_before_execution');
  }

  return {
    canProceedWithAdminUiReviewOnly: input.wantsAdminUiPanelSourceWrite && !input.wantsDbSchemaWrite && !input.wantsRouteMountRuntime,
    canWriteDbSchemaNow: false,
    canRunPrismaNow: false,
    canMountRuntimeRoutesNow: false,
    canActivateSchedulerNow: false,
    canEnableProviderWalletPaymentPayoutNow: false,
    canConnectMobileDirectlyNow: false,
    blockedReasons: Array.from(new Set(blockedReasons)),
    exactApprovalRequiredBeforeExecution: true,
    clientAppMustUseKernel: true,
    fakeSuccessBlocked: true,
  };
}
