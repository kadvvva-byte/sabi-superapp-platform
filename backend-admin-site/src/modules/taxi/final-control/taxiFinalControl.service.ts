import {
  TAXI_ANTI_ACCIDENTAL_RUNTIME_GUARDS,
  TAXI_FINAL_HANDOFF_MATRIX,
  TAXI_FINAL_READINESS_SCORE_ITEMS,
  TAXI_CLIENT_BOUNDARY_COMPATIBILITY_ASSERTIONS,
  taxiFinalControlRouteDescriptors,
} from './taxiFinalControl.constants';
import type {
  TaxiFinalControlReadinessDecision,
  TaxiFinalControlReadinessInput,
  TaxiFinalControlSnapshot,
} from './taxiFinalControl.types';

export function getTaxiFinalControlSnapshot(): TaxiFinalControlSnapshot {
  return {
    version: 'TAXI-BACKEND-FOUNDATION-001L',
    module: 'taxi',
    status: 'final_foundation_control_safe_disabled_ready',
    finalFoundationControlLayerReady: true,
    readinessScorePercent: 100,
    adminHandoffMatrixReady: true,
    antiAccidentalRuntimeGuardsReady: true,
    clientBoundaryCompatibilityAssertionsReady: true,
    dailyAiReportRequired: true,
    allComplaintsCheckedEveryDayRequired: true,
    adminAddedWithFoundation: true,
    maximumCompatibilityMode: true,
    clientAppMustUseKernel: true,
    rawEvidenceAdminFoundationOnly: true,
    readinessItems: TAXI_FINAL_READINESS_SCORE_ITEMS,
    handoffMatrix: TAXI_FINAL_HANDOFF_MATRIX,
    antiAccidentalRuntimeGuards: TAXI_ANTI_ACCIDENTAL_RUNTIME_GUARDS,
    clientBoundaryAssertions: TAXI_CLIENT_BOUNDARY_COMPATIBILITY_ASSERTIONS,
    routeDescriptors: taxiFinalControlRouteDescriptors,
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

export function evaluateTaxiFinalControlReadiness(input: TaxiFinalControlReadinessInput): TaxiFinalControlReadinessDecision {
  const blockedReasons: string[] = [];

  if (input.wantsRuntimeMount) {
    blockedReasons.push('runtime_route_mount_requires_exact_approval');
  }
  if (input.wantsSchedulerActivation) {
    blockedReasons.push('daily_ai_scheduler_requires_exact_approval');
  }
  if (input.wantsDbReadOrWrite) {
    blockedReasons.push('db_read_write_requires_schema_migration_approval');
  }
  if (input.wantsWalletPaymentPayout) {
    blockedReasons.push('wallet_payment_payout_requires_ledger_provider_legal_finance_approval');
  }
  if (input.wantsProviderDispatch) {
    blockedReasons.push('provider_dispatch_requires_reference_labels_and_exact_approval');
  }
  if (input.wantsClientBoundaryDirectProviderAccess) {
    blockedReasons.push('mobile_ui_must_use_kernel_no_direct_provider_access');
  }
  if (input.wantsRawEvidenceOnMobile) {
    blockedReasons.push('raw_evidence_admin_foundation_only');
  }
  if (!input.hasExactOwnerApproval) {
    blockedReasons.push('exact_owner_approval_required_before_any_runtime');
  }

  return {
    canProceedWithFoundationOnly: true,
    canEnableRuntimeNow: false,
    canMountRoutesNow: false,
    canActivateSchedulerNow: false,
    canReadOrWriteDbNow: false,
    canMutateWalletOrChargeOrPayoutNow: false,
    canCallProviderNow: false,
    canExposeRawEvidenceToMobileNow: false,
    blockedReasons: Array.from(new Set(blockedReasons)),
    exactApprovalRequiredBeforeRuntime: true,
    fakeSuccessBlocked: true,
  };
}
