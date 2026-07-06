import {
  TAXI_AI_DAILY_ADMIN_ACTION_CONTRACTS,
  TAXI_AI_DAILY_BOUNDARY_REASONS,
  TAXI_AI_DAILY_COMPLAINT_TIER_POLICIES,
  TAXI_AI_DAILY_REPORT_METRICS,
  TAXI_AI_DAILY_REPORT_SECTIONS,
  TAXI_AI_DAILY_REVIEW_VERSION,
  TAXI_AI_EVIDENCE_SIGNAL_RULES,
} from './taxiAiDailyReview.constants';
import type {
  TaxiAiComplaintCasePolicyDecision,
  TaxiAiComplaintCasePolicyInput,
  TaxiAiDailyReportRequestPreviewDecision,
  TaxiAiDailyReportRequestPreviewInput,
  TaxiAiDailyReportSnapshot,
} from './taxiAiDailyReview.types';
import type { TaxiViolationCode } from '../foundation';

export function getTaxiAiDailyReportSnapshot(): TaxiAiDailyReportSnapshot {
  return {
    version: TAXI_AI_DAILY_REVIEW_VERSION,
    module: 'taxi',
    status: 'daily_report_contract_ready',
    reportCadence: 'daily',
    reportScope: 'per_country_per_calendar_day',
    fullReportRequiredEveryDay: true,
    complaintsCheckedEveryDay: true,
    sabiAiMustCheckAllComplaints: true,
    driverAndRiderRulesAreSymmetric: true,
    adminCompatibleFromFoundation: true,
    runtimeSchedulerMountedNow: false,
    dbWriteEnabled: false,
    walletMutationEnabled: false,
    paymentRuntimeEnabled: false,
    payoutRuntimeEnabled: false,
    providerRuntimeEnabled: false,
    fakeComplaintDecisionBlocked: true,
    fakePenaltyExecutionBlocked: true,
    fakeRewardPayoutBlocked: true,
    dailyComplaintTierPolicies: TAXI_AI_DAILY_COMPLAINT_TIER_POLICIES,
    evidenceSignals: TAXI_AI_EVIDENCE_SIGNAL_RULES,
    reportSections: TAXI_AI_DAILY_REPORT_SECTIONS,
    reportMetrics: TAXI_AI_DAILY_REPORT_METRICS,
    adminActionContracts: TAXI_AI_DAILY_ADMIN_ACTION_CONTRACTS,
    boundaryReasons: TAXI_AI_DAILY_BOUNDARY_REASONS,
  };
}

export function previewTaxiAiDailyReportRequest(
  input: TaxiAiDailyReportRequestPreviewInput,
): TaxiAiDailyReportRequestPreviewDecision {
  const blockedReasons: TaxiAiDailyReportRequestPreviewDecision['blockedReasons'][number][] = [];

  if (input.wantsRuntimeScheduler) {
    blockedReasons.push('daily_scheduler_runtime_not_mounted');
  }
  if (input.wantsDbReadOrWrite) {
    blockedReasons.push('db_runtime_not_enabled');
  }
  if (input.wantsPenaltyExecution) {
    blockedReasons.push('penalty_execution_locked');
  }
  if (input.wantsRewardPayout) {
    blockedReasons.push('reward_payout_locked');
  }
  if (!input.hasExactApproval) {
    blockedReasons.push('exact_approval_required');
  }
  blockedReasons.push('backend_runtime_not_mounted');

  return {
    countryCode: input.countryCode,
    localDate: input.localDate,
    previewAllowed: true,
    runtimeAllowedNow: false,
    fullReportRequiredEveryDay: true,
    adminCanOpenReportShell: true,
    blockedReasons: Array.from(new Set(blockedReasons)),
    fakeSuccessBlocked: true,
  };
}

export function evaluateTaxiAiDailyComplaintCase(
  input: TaxiAiComplaintCasePolicyInput,
): TaxiAiComplaintCasePolicyDecision {
  const normalized = normalizeComplaintCount(input.verifiedComplaintsInOneDay);
  const policy = TAXI_AI_DAILY_COMPLAINT_TIER_POLICIES.find((item) => item.verifiedComplaintsInOneDay === normalized);
  const violationsToReview: TaxiViolationCode[] = [];

  if (input.verifiedComplaintsInOneDay > 0) {
    violationsToReview.push('verified_complaint');
  }
  if (input.hasCancellationThenTripAfterCancelSignal) {
    violationsToReview.push('contractual_cancellation', 'trip_after_cancellation');
  }
  if (input.hasFalseComplaintSignal) {
    violationsToReview.push('false_complaint');
  }

  return {
    role: input.role,
    countryCode: input.countryCode,
    localDate: input.localDate,
    normalizedVerifiedComplaintsInOneDay: normalized,
    escalation: policy?.escalation ?? 'more_than_three_verified_complaints_blocked_pending_review',
    trustStatus: input.hasOpenAppeal ? 'appeal_pending' : policy?.trustStatus ?? 'blocked_pending_review',
    cooldownMinutes: policy?.cooldownMinutes ?? 180,
    blockUntilExplanation: Boolean(policy?.blockUntilExplanation),
    violationsToReview: Array.from(new Set(violationsToReview)),
    adminReviewRequired: Boolean(policy?.adminReviewRequired || violationsToReview.length > 0 || input.hasOpenAppeal),
    backendVerificationRequired: true,
    uiMayExecutePenalty: false,
  };
}

function normalizeComplaintCount(count: number): 0 | 1 | 2 | 3 | 4 {
  if (!Number.isFinite(count) || count <= 0) {
    return 0;
  }
  if (count === 1) {
    return 1;
  }
  if (count === 2) {
    return 2;
  }
  if (count === 3) {
    return 3;
  }
  return 4;
}
