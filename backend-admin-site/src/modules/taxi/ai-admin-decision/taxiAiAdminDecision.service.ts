import {
  TAXI_AI_ADMIN_DECISION_ACTIONS,
  TAXI_AI_ADMIN_DECISION_BOUNDARY_REASONS,
  TAXI_AI_ADMIN_DECISION_EVIDENCE,
  TAXI_AI_ADMIN_DECISION_SLAS,
  TAXI_AI_ADMIN_DECISION_STAGES,
  TAXI_AI_ADMIN_DECISION_VERSION,
  TAXI_DAILY_REPORT_COMPLETENESS_FIELDS,
} from './taxiAiAdminDecision.constants';
import type {
  TaxiAiAdminDecisionActionId,
  TaxiAiAdminDecisionPreviewDecision,
  TaxiAiAdminDecisionPreviewInput,
  TaxiAiAdminDecisionSnapshot,
  TaxiDailyReportCompletenessPreviewDecision,
  TaxiDailyReportCompletenessPreviewInput,
} from './taxiAiAdminDecision.types';

export function getTaxiAiAdminDecisionSnapshot(): TaxiAiAdminDecisionSnapshot {
  return {
    version: TAXI_AI_ADMIN_DECISION_VERSION,
    module: 'taxi',
    status: 'decision_lifecycle_contract_ready',
    adminAddedWithFoundation: true,
    maximumCompatibilityMode: true,
    fullDailyReportRequiredEveryDay: true,
    sabiAiMustCheckEveryComplaintEveryDay: true,
    complaintReviewBeforeAnyPenalty: true,
    appealExplanationBeforeHardBlock: true,
    adminDecisionRequiredForHeavyAction: true,
    clientAppMustUseKernelSummaryOnly: true,
    adminUiUsesFoundationContracts: true,
    schedulerRuntimeMountedNow: false,
    routeRuntimeMountedNow: false,
    dbReadEnabled: false,
    dbWriteEnabled: false,
    walletMutationEnabled: false,
    providerRuntimeEnabled: false,
    paymentRuntimeEnabled: false,
    payoutRuntimeEnabled: false,
    fakeAiDecisionBlocked: true,
    fakePenaltyExecutionBlocked: true,
    fakeRewardReleaseBlocked: true,
    decisionStages: TAXI_AI_ADMIN_DECISION_STAGES,
    decisionActions: TAXI_AI_ADMIN_DECISION_ACTIONS,
    evidenceContracts: TAXI_AI_ADMIN_DECISION_EVIDENCE,
    slaContracts: TAXI_AI_ADMIN_DECISION_SLAS,
    dailyReportCompletenessContracts: TAXI_DAILY_REPORT_COMPLETENESS_FIELDS,
    boundaryReasons: TAXI_AI_ADMIN_DECISION_BOUNDARY_REASONS,
  };
}

function normalizeComplaintCount(count: number): 0 | 1 | 2 | 3 | 4 {
  if (!Number.isFinite(count) || count <= 0) return 0;
  if (count === 1) return 1;
  if (count === 2) return 2;
  if (count === 3) return 3;
  return 4;
}

function actionForInput(input: TaxiAiAdminDecisionPreviewInput): TaxiAiAdminDecisionActionId {
  if (input.violationsDetected.includes('false_complaint')) return 'false_complaint_penalty_candidate';
  if (input.violationsDetected.includes('reward_abuse_attempt')) return 'freeze_reward_candidate';

  const normalized = normalizeComplaintCount(input.verifiedComplaintsInOneDay);
  if (normalized === 0) return 'no_action_clear';
  if (normalized === 1) return 'points_penalty_candidate';
  if (normalized === 2) return 'one_hour_cooldown_candidate';
  if (normalized === 3) return 'three_hour_cooldown_candidate';
  return 'block_pending_explanation_candidate';
}

export function previewTaxiAiAdminDecision(input: TaxiAiAdminDecisionPreviewInput): TaxiAiAdminDecisionPreviewDecision {
  const blockedReasons: string[] = [];
  const normalized = normalizeComplaintCount(input.verifiedComplaintsInOneDay);
  const recommendedAction = actionForInput(input);
  const requiresAppealWindowForHardBlock = recommendedAction === 'block_pending_explanation_candidate' || recommendedAction === 'freeze_reward_candidate';

  if (!input.hasSabiAiDailyReport) blockedReasons.push('daily_sabi_ai_report_required');
  if (!input.hasEvidenceBundle) blockedReasons.push('evidence_bundle_required');
  if (!input.hasAdminDecision) blockedReasons.push('admin_decision_required');
  if (requiresAppealWindowForHardBlock && !input.appealWindowOpened) blockedReasons.push('appeal_or_explanation_window_required');
  if (input.wantsPenaltyExecution) blockedReasons.push('penalty_execution_locked');
  if (input.wantsRewardRelease) blockedReasons.push('reward_release_locked');
  if (input.wantsDbWrite) blockedReasons.push('db_write_locked');
  if (!input.hasExactApproval) blockedReasons.push('exact_approval_required');
  blockedReasons.push('runtime_provider_payment_payout_disabled');

  return {
    countryCode: input.countryCode,
    localDate: input.localDate,
    role: input.role,
    normalizedVerifiedComplaintsInOneDay: normalized,
    recommendedAction,
    trustStatusPreview:
      recommendedAction === 'no_action_clear'
        ? 'clear'
        : recommendedAction === 'block_pending_explanation_candidate'
          ? 'blocked_pending_review'
          : recommendedAction === 'one_hour_cooldown_candidate' || recommendedAction === 'three_hour_cooldown_candidate'
            ? 'cooldown'
            : recommendedAction === 'restore_points_candidate' || recommendedAction === 'release_reward_candidate'
              ? 'restored'
              : 'warning',
    canRenderInAdmin: true,
    canPublishClientBoundarySummary: true,
    canExecutePenaltyNow: false,
    canReleaseRewardNow: false,
    requiresSabiAiDailyReport: true,
    requiresEvidenceBundle: true,
    requiresAdminDecision: true,
    requiresAppealWindowForHardBlock,
    blockedReasons: Array.from(new Set(blockedReasons)),
    fakeDecisionBlocked: true,
  };
}

export function previewTaxiDailyReportCompleteness(
  input: TaxiDailyReportCompletenessPreviewInput,
): TaxiDailyReportCompletenessPreviewDecision {
  const requiredIds = TAXI_DAILY_REPORT_COMPLETENESS_FIELDS.map((field) => field.fieldId);
  const included = new Set(input.includedFieldIds);
  const missingRequiredFieldIds = requiredIds.filter((fieldId) => !included.has(fieldId));
  const blockedReasons: string[] = [];

  if (missingRequiredFieldIds.length > 0) blockedReasons.push('full_daily_report_incomplete');
  if (input.wantsRuntimeScheduler) blockedReasons.push('daily_scheduler_runtime_not_mounted');
  if (input.wantsDbReadOrWrite) blockedReasons.push('db_runtime_not_enabled');
  if (!input.hasExactApproval) blockedReasons.push('exact_approval_required');

  return {
    countryCode: input.countryCode,
    localDate: input.localDate,
    completeForAdminShell: missingRequiredFieldIds.length === 0,
    missingRequiredFieldIds,
    canRunSchedulerNow: false,
    canReadOrWriteDbNow: false,
    blockedReasons: Array.from(new Set(blockedReasons)),
    fakeReportCompletionBlocked: true,
  };
}
