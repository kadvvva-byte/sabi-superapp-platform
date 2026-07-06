import {
  TAXI_ADMIN_APPROVAL_DECISION_STATES,
  TAXI_ADMIN_APPROVAL_GATE_CONTRACTS,
  TAXI_ADMIN_APPROVAL_GATES_VERSION,
  TAXI_ADMIN_DAILY_REPORT_FINALIZE_RULES,
  taxiAdminApprovalGateRouteDescriptors,
} from './taxiAdminApprovalGates.constants';
import type {
  TaxiAdminApprovalGatesDecision,
  TaxiAdminApprovalGatesInput,
  TaxiAdminApprovalGatesSnapshot,
} from './taxiAdminApprovalGates.types';

export function getTaxiAdminApprovalGatesSnapshot(): TaxiAdminApprovalGatesSnapshot {
  return {
    version: TAXI_ADMIN_APPROVAL_GATES_VERSION,
    module: 'taxi',
    status: 'admin_approval_gates_ready_safe_disabled',
    adminApprovalGatesRequired: true,
    dailyReportCloseGateRequired: true,
    sabiAiCompletionGateRequired: true,
    allComplaintsCheckedBeforeClose: true,
    participantExplanationBeforeHardBlock: true,
    supervisorApprovalBeforeHeavyAction: true,
    legalFinanceReviewBeforeRewardRelease: true,
    clientBoundaryPublishAfterAdminLockOnly: true,
    rawEvidenceAdminFoundationOnly: true,
    clientAppMustUseKernel: true,
    gates: TAXI_ADMIN_APPROVAL_GATE_CONTRACTS,
    decisionStates: TAXI_ADMIN_APPROVAL_DECISION_STATES,
    finalizeRules: TAXI_ADMIN_DAILY_REPORT_FINALIZE_RULES,
    routeDescriptors: taxiAdminApprovalGateRouteDescriptors,
    approvalRuntimeMountedNow: false,
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

export function evaluateTaxiAdminApprovalGates(input: TaxiAdminApprovalGatesInput): TaxiAdminApprovalGatesDecision {
  const blockedReasons: string[] = [];

  if (!input.hasAdminPermission) {
    blockedReasons.push('admin_permission_required');
  }
  if (input.wantsCloseDailyReport && !input.allComplaintsChecked) {
    blockedReasons.push('all_complaints_must_be_checked_before_daily_report_close');
  }
  if (input.wantsCloseDailyReport && !input.sabiAiEvidenceBundleReady) {
    blockedReasons.push('sabi_ai_evidence_bundle_required_before_daily_report_close');
  }
  if (input.wantsHardBlock && !input.participantExplanationSatisfied) {
    blockedReasons.push('participant_explanation_required_before_hard_block');
  }
  if ((input.wantsHardBlock || input.wantsRewardRelease) && !input.supervisorApprovalPresent) {
    blockedReasons.push('admin_supervisor_approval_required_for_heavy_action');
  }
  if (input.wantsRewardRelease && !input.legalFinanceReviewPresent) {
    blockedReasons.push('legal_or_finance_review_required_before_reward_release');
  }
  if (input.wantsPublishMobileSummary && !input.allComplaintsChecked) {
    blockedReasons.push('client_boundary_summary_requires_checked_country_day_report');
  }
  if (input.wantsRuntimeExecution) {
    blockedReasons.push('approval_runtime_safe_disabled');
  }
  if (input.wantsDbReadOrWrite) {
    blockedReasons.push('db_read_write_requires_separate_exact_approval');
  }
  if (input.wantsWalletProviderPaymentPayout) {
    blockedReasons.push('wallet_provider_payment_payout_locked');
  }
  if (!input.hasExactApproval) {
    blockedReasons.push('exact_approval_required_for_future_runtime');
  }

  return {
    canRenderApprovalGates: input.hasAdminPermission,
    canCloseDailyReportNow: false,
    canExecuteHeavyActionNow: false,
    canReleaseRewardNow: false,
    canPublishClientBoundarySummaryNow: false,
    blockedReasons: Array.from(new Set(blockedReasons)),
    requiresExactApprovalForRuntime: true,
    fakeSuccessBlocked: true,
  };
}
