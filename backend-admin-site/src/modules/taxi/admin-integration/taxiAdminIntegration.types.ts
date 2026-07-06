import type { TaxiRouteDescriptor, TaxiCountryCode, TaxiParticipantRole } from '../foundation';
import type { TaxiKernelBoundaryReason } from '../kernel';

export type TaxiAdminIntegrationVersion = 'TAXI-BACKEND-FOUNDATION-001E';

export type TaxiAiDailyPipelineStageId =
  | 'country_day_window_opened'
  | 'complaint_case_collection'
  | 'trip_state_evidence_normalization'
  | 'sabi_ai_signal_classification'
  | 'daily_complaint_tier_mapping'
  | 'false_complaint_and_abuse_review'
  | 'leaderboard_reward_freeze_review'
  | 'appeal_explanation_queue'
  | 'admin_action_queue_build'
  | 'full_daily_report_publish_preview'
  | 'client_boundary_summary_sync_preview';

export type TaxiAdminDailyAuditFieldId =
  | 'country_code'
  | 'local_date'
  | 'role'
  | 'participant_id_reference'
  | 'verified_trip_reference_count'
  | 'verified_complaint_count'
  | 'false_complaint_count'
  | 'contractual_cancellation_signal_count'
  | 'trip_after_cancellation_signal_count'
  | 'star_quality_conflict_count'
  | 'cooldown_candidate_count'
  | 'block_pending_explanation_count'
  | 'reward_freeze_candidate_count'
  | 'appeal_pending_count'
  | 'admin_action_required_count';

export type TaxiComplaintReviewQueueStatus =
  | 'queue_shell_ready'
  | 'evidence_waiting'
  | 'sabi_ai_review_required'
  | 'admin_decision_required'
  | 'exact_approval_required_for_execution';

export type TaxiAdminIntegrationPermission =
  | 'taxi:ai-report:read'
  | 'taxi:ai-report:review'
  | 'taxi:complaint:review'
  | 'taxi:audit:read'
  | 'taxi:client-boundary:read'
  | 'taxi:runtime:approve';

export interface TaxiAiDailyPipelineStageContract {
  readonly stageId: TaxiAiDailyPipelineStageId;
  readonly order: number;
  readonly title: string;
  readonly description: string;
  readonly requiredEveryCountryDay: true;
  readonly checksDrivers: boolean;
  readonly checksRiders: boolean;
  readonly adminVisible: true;
  readonly mobileVisibleThroughKernelSummaryOnly: boolean;
  readonly runtimeMountedNow: false;
  readonly dbReadOrWriteAllowedNow: false;
  readonly fakeDecisionBlocked: true;
}

export interface TaxiAdminDailyAuditFieldContract {
  readonly fieldId: TaxiAdminDailyAuditFieldId;
  readonly label: string;
  readonly description: string;
  readonly countryScoped: true;
  readonly dailyScoped: true;
  readonly backendVerifiedOnly: true;
  readonly adminVisible: true;
  readonly mobileRawAccessAllowed: false;
}

export interface TaxiComplaintReviewQueueContract {
  readonly queueId: string;
  readonly title: string;
  readonly role: TaxiParticipantRole | 'both';
  readonly status: TaxiComplaintReviewQueueStatus;
  readonly countryScoped: true;
  readonly dailyScoped: true;
  readonly requiresSabiAiReview: true;
  readonly requiresAdminDecision: true;
  readonly executionAllowedNow: false;
  readonly fakePenaltyBlocked: true;
}

export interface TaxiClientBoundaryAdminCompatibilityRule {
  readonly ruleId: string;
  readonly title: string;
  readonly description: string;
  readonly mobileUiMayCallDirectBackend: false;
  readonly clientAppMustUseKernelFacade: true;
  readonly adminMayRenderSameContract: true;
  readonly providerRuntimeAllowedNow: false;
  readonly paymentOrPayoutAllowedNow: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiAdminIntegrationSnapshot {
  readonly version: TaxiAdminIntegrationVersion;
  readonly module: 'taxi';
  readonly status: 'admin_integrated_foundation_contract_ready';
  readonly adminAddedWithFoundation: true;
  readonly maximumCompatibilityMode: true;
  readonly fullDailyReportRequiredEveryDay: true;
  readonly sabiAiChecksAllComplaintsEveryDay: true;
  readonly dailyCountryAuditSnapshotsRequired: true;
  readonly complaintReviewQueueRequired: true;
  readonly driverAndRiderRulesAreSymmetric: true;
  readonly clientAppMustUseKernel: true;
  readonly adminUiUsesSameFoundationContracts: true;
  readonly schedulerRuntimeMountedNow: false;
  readonly mountedRuntimeRoutesNow: false;
  readonly dbReadEnabled: false;
  readonly dbWriteEnabled: false;
  readonly walletMutationEnabled: false;
  readonly providerRuntimeEnabled: false;
  readonly paymentRuntimeEnabled: false;
  readonly payoutRuntimeEnabled: false;
  readonly fakeAiReportBlocked: true;
  readonly fakeComplaintDecisionBlocked: true;
  readonly fakePenaltyExecutionBlocked: true;
  readonly fakeRewardPayoutBlocked: true;
  readonly pipelineStages: readonly TaxiAiDailyPipelineStageContract[];
  readonly auditFields: readonly TaxiAdminDailyAuditFieldContract[];
  readonly complaintQueues: readonly TaxiComplaintReviewQueueContract[];
  readonly clientBoundaryCompatibilityRules: readonly TaxiClientBoundaryAdminCompatibilityRule[];
  readonly routeDescriptors: readonly TaxiRouteDescriptor[];
  readonly boundaryReasons: readonly TaxiKernelBoundaryReason[];
}

export interface TaxiAdminDailyPipelinePreviewInput {
  readonly countryCode: TaxiCountryCode;
  readonly localDate: string;
  readonly requestedBy: 'admin_ui' | 'sabi_ai_daily_review' | 'foundation_check';
  readonly wantsSchedulerRuntime: boolean;
  readonly wantsDbReadOrWrite: boolean;
  readonly wantsRealPenaltyExecution: boolean;
  readonly wantsRewardPayoutOrPrizeRelease: boolean;
  readonly hasExactApproval: boolean;
}

export interface TaxiAdminDailyPipelinePreviewDecision {
  readonly countryCode: TaxiCountryCode;
  readonly localDate: string;
  readonly canRenderAdminPipeline: true;
  readonly canRunRuntimePipelineNow: false;
  readonly fullDailyReportRequiredEveryDay: true;
  readonly complaintReviewQueueVisible: true;
  readonly blockedReasons: readonly string[];
  readonly fakeSuccessBlocked: true;
}

export interface TaxiComplaintReviewQueuePreviewInput {
  readonly countryCode: TaxiCountryCode;
  readonly localDate: string;
  readonly role: TaxiParticipantRole | 'both';
  readonly wantsRawPrivateEvidenceInMobile: boolean;
  readonly wantsPenaltyExecution: boolean;
  readonly wantsDbWrite: boolean;
  readonly hasAdminPermission: boolean;
  readonly hasExactApproval: boolean;
}

export interface TaxiComplaintReviewQueuePreviewDecision {
  readonly countryCode: TaxiCountryCode;
  readonly localDate: string;
  readonly role: TaxiParticipantRole | 'both';
  readonly canRenderQueueInAdmin: boolean;
  readonly mobileRawEvidenceAllowed: false;
  readonly executionAllowedNow: false;
  readonly requiresSabiAiReview: true;
  readonly requiresAdminDecision: true;
  readonly blockedReasons: readonly string[];
  readonly fakePenaltyBlocked: true;
}
