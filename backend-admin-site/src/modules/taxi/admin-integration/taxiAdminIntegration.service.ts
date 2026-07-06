import {
  TAXI_ADMIN_DAILY_AUDIT_FIELDS,
  TAXI_ADMIN_INTEGRATION_BOUNDARY_REASONS,
  TAXI_ADMIN_INTEGRATION_VERSION,
  TAXI_AI_DAILY_PIPELINE_STAGES,
  TAXI_COMPLAINT_REVIEW_QUEUES,
  TAXI_CLIENT_BOUNDARY_ADMIN_COMPATIBILITY_RULES,
  taxiAdminIntegrationRouteDescriptors,
} from './taxiAdminIntegration.constants';
import type {
  TaxiAdminDailyPipelinePreviewDecision,
  TaxiAdminDailyPipelinePreviewInput,
  TaxiAdminIntegrationSnapshot,
  TaxiComplaintReviewQueuePreviewDecision,
  TaxiComplaintReviewQueuePreviewInput,
} from './taxiAdminIntegration.types';

export function getTaxiAdminIntegrationSnapshot(): TaxiAdminIntegrationSnapshot {
  return {
    version: TAXI_ADMIN_INTEGRATION_VERSION,
    module: 'taxi',
    status: 'admin_integrated_foundation_contract_ready',
    adminAddedWithFoundation: true,
    maximumCompatibilityMode: true,
    fullDailyReportRequiredEveryDay: true,
    sabiAiChecksAllComplaintsEveryDay: true,
    dailyCountryAuditSnapshotsRequired: true,
    complaintReviewQueueRequired: true,
    driverAndRiderRulesAreSymmetric: true,
    clientAppMustUseKernel: true,
    adminUiUsesSameFoundationContracts: true,
    schedulerRuntimeMountedNow: false,
    mountedRuntimeRoutesNow: false,
    dbReadEnabled: false,
    dbWriteEnabled: false,
    walletMutationEnabled: false,
    providerRuntimeEnabled: false,
    paymentRuntimeEnabled: false,
    payoutRuntimeEnabled: false,
    fakeAiReportBlocked: true,
    fakeComplaintDecisionBlocked: true,
    fakePenaltyExecutionBlocked: true,
    fakeRewardPayoutBlocked: true,
    pipelineStages: TAXI_AI_DAILY_PIPELINE_STAGES,
    auditFields: TAXI_ADMIN_DAILY_AUDIT_FIELDS,
    complaintQueues: TAXI_COMPLAINT_REVIEW_QUEUES,
    clientBoundaryCompatibilityRules: TAXI_CLIENT_BOUNDARY_ADMIN_COMPATIBILITY_RULES,
    routeDescriptors: taxiAdminIntegrationRouteDescriptors,
    boundaryReasons: TAXI_ADMIN_INTEGRATION_BOUNDARY_REASONS,
  };
}

export function previewTaxiAdminDailyPipelineRequest(
  input: TaxiAdminDailyPipelinePreviewInput,
): TaxiAdminDailyPipelinePreviewDecision {
  const blockedReasons: string[] = [];

  if (input.wantsSchedulerRuntime) {
    blockedReasons.push('daily_scheduler_runtime_not_mounted');
  }
  if (input.wantsDbReadOrWrite) {
    blockedReasons.push('db_runtime_not_enabled');
  }
  if (input.wantsRealPenaltyExecution) {
    blockedReasons.push('penalty_execution_locked');
  }
  if (input.wantsRewardPayoutOrPrizeRelease) {
    blockedReasons.push('reward_or_prize_release_locked');
  }
  if (!input.hasExactApproval) {
    blockedReasons.push('exact_approval_required');
  }
  blockedReasons.push('provider_payment_payout_runtime_disabled');

  return {
    countryCode: input.countryCode,
    localDate: input.localDate,
    canRenderAdminPipeline: true,
    canRunRuntimePipelineNow: false,
    fullDailyReportRequiredEveryDay: true,
    complaintReviewQueueVisible: true,
    blockedReasons: Array.from(new Set(blockedReasons)),
    fakeSuccessBlocked: true,
  };
}

export function previewTaxiComplaintReviewQueueRequest(
  input: TaxiComplaintReviewQueuePreviewInput,
): TaxiComplaintReviewQueuePreviewDecision {
  const blockedReasons: string[] = [];

  if (!input.hasAdminPermission) {
    blockedReasons.push('admin_permission_required');
  }
  if (input.wantsRawPrivateEvidenceInMobile) {
    blockedReasons.push('raw_private_evidence_admin_only_mobile_summary_only');
  }
  if (input.wantsPenaltyExecution) {
    blockedReasons.push('penalty_execution_locked');
  }
  if (input.wantsDbWrite) {
    blockedReasons.push('db_write_locked');
  }
  if (!input.hasExactApproval) {
    blockedReasons.push('exact_approval_required');
  }

  return {
    countryCode: input.countryCode,
    localDate: input.localDate,
    role: input.role,
    canRenderQueueInAdmin: input.hasAdminPermission,
    mobileRawEvidenceAllowed: false,
    executionAllowedNow: false,
    requiresSabiAiReview: true,
    requiresAdminDecision: true,
    blockedReasons: Array.from(new Set(blockedReasons)),
    fakePenaltyBlocked: true,
  };
}
