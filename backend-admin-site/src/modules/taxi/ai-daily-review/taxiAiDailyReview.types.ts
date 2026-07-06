import type {
  TaxiComplaintEscalationCode,
  TaxiCountryCode,
  TaxiParticipantRole,
  TaxiTrustStatus,
  TaxiViolationCode,
} from '../foundation';
import type { TaxiKernelBoundaryReason } from '../kernel';

export type TaxiAiDailyReviewVersion = 'TAXI-BACKEND-FOUNDATION-001E';

export type TaxiAiDailyReviewStatus =
  | 'safe_disabled_contract_ready'
  | 'daily_report_contract_ready'
  | 'admin_review_required'
  | 'exact_approval_required_for_runtime';

export type TaxiAiDailyReportSectionId =
  | 'country_summary'
  | 'driver_complaints'
  | 'rider_complaints'
  | 'verified_complaints'
  | 'false_complaints'
  | 'contractual_cancellations'
  | 'trip_after_cancellation'
  | 'star_quality_conflicts'
  | 'cooldowns_and_blocks'
  | 'appeals_and_explanations'
  | 'reward_freeze_queue'
  | 'leaderboard_integrity'
  | 'admin_action_queue';

export type TaxiAiEvidenceSignalId =
  | 'complaint_text_signal'
  | 'trip_state_signal'
  | 'route_repeat_signal'
  | 'cancel_then_off_platform_signal'
  | 'star_vs_complaint_conflict_signal'
  | 'chat_call_safety_signal'
  | 'device_account_country_signal'
  | 'driver_balance_dispatch_signal'
  | 'leaderboard_reward_abuse_signal';

export type TaxiAiDailyAdminActionId =
  | 'review_verified_complaint'
  | 'review_false_complaint'
  | 'review_one_hour_cooldown'
  | 'review_three_hour_cooldown'
  | 'review_block_until_explanation'
  | 'review_reward_freeze'
  | 'review_points_restore'
  | 'review_participant_appeal';

export interface TaxiAiDailyReviewWindow {
  readonly countryCode: TaxiCountryCode;
  readonly localDate: string;
  readonly timezonePolicy: 'country_local_calendar_day';
  readonly resetRule: 'daily_counts_reset_next_country_day';
  readonly repeatRiskCarryover: 'repeat_daily_violations_feed_long_term_sabi_ai_risk';
}

export interface TaxiAiDailyComplaintTierPolicy {
  readonly verifiedComplaintsInOneDay: 0 | 1 | 2 | 3 | 4;
  readonly appliesToRoles: readonly TaxiParticipantRole[];
  readonly escalation: TaxiComplaintEscalationCode;
  readonly trustStatus: TaxiTrustStatus;
  readonly pointsPenaltyPreviewRequired: boolean;
  readonly cooldownMinutes: 0 | 60 | 180;
  readonly blockUntilExplanation: boolean;
  readonly adminReviewRequired: boolean;
  readonly uiMayExecutePenalty: false;
  readonly backendVerificationRequired: true;
  readonly reason: string;
}

export interface TaxiAiEvidenceSignalRule {
  readonly signalId: TaxiAiEvidenceSignalId;
  readonly label: string;
  readonly description: string;
  readonly appliesToRoles: readonly TaxiParticipantRole[];
  readonly mayUseForDailyReport: true;
  readonly mayUseForHeavyActionOnlyAfterAdminReview: true;
  readonly fakeDecisionBlocked: true;
}

export interface TaxiAiDailyReportSection {
  readonly sectionId: TaxiAiDailyReportSectionId;
  readonly title: string;
  readonly description: string;
  readonly includedInFullDailyReport: true;
  readonly adminVisible: true;
  readonly mobileVisibleAsSummaryOnly: boolean;
}

export interface TaxiAiDailyReportMetricContract {
  readonly id: string;
  readonly label: string;
  readonly role: TaxiParticipantRole | 'both';
  readonly countryScoped: true;
  readonly dailyScoped: true;
  readonly backendVerifiedOnly: true;
  readonly description: string;
}

export interface TaxiAiDailyAdminActionContract {
  readonly actionId: TaxiAiDailyAdminActionId;
  readonly label: string;
  readonly description: string;
  readonly requiresBackendEvidence: true;
  readonly requiresSabiAiSignal: true;
  readonly requiresAdminDecision: true;
  readonly paymentOrPayoutRuntimeAllowedNow: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiAiDailyReportSnapshot {
  readonly version: TaxiAiDailyReviewVersion;
  readonly module: 'taxi';
  readonly status: TaxiAiDailyReviewStatus;
  readonly reportCadence: 'daily';
  readonly reportScope: 'per_country_per_calendar_day';
  readonly fullReportRequiredEveryDay: true;
  readonly complaintsCheckedEveryDay: true;
  readonly sabiAiMustCheckAllComplaints: true;
  readonly driverAndRiderRulesAreSymmetric: true;
  readonly adminCompatibleFromFoundation: true;
  readonly runtimeSchedulerMountedNow: false;
  readonly dbWriteEnabled: false;
  readonly walletMutationEnabled: false;
  readonly paymentRuntimeEnabled: false;
  readonly payoutRuntimeEnabled: false;
  readonly providerRuntimeEnabled: false;
  readonly fakeComplaintDecisionBlocked: true;
  readonly fakePenaltyExecutionBlocked: true;
  readonly fakeRewardPayoutBlocked: true;
  readonly dailyComplaintTierPolicies: readonly TaxiAiDailyComplaintTierPolicy[];
  readonly evidenceSignals: readonly TaxiAiEvidenceSignalRule[];
  readonly reportSections: readonly TaxiAiDailyReportSection[];
  readonly reportMetrics: readonly TaxiAiDailyReportMetricContract[];
  readonly adminActionContracts: readonly TaxiAiDailyAdminActionContract[];
  readonly boundaryReasons: readonly TaxiKernelBoundaryReason[];
}

export interface TaxiAiDailyReportRequestPreviewInput {
  readonly countryCode: TaxiCountryCode;
  readonly localDate: string;
  readonly requestedBy: 'admin_ui' | 'backend_foundation' | 'sabi_ai_contract';
  readonly wantsRuntimeScheduler: boolean;
  readonly wantsDbReadOrWrite: boolean;
  readonly wantsPenaltyExecution: boolean;
  readonly wantsRewardPayout: boolean;
  readonly hasExactApproval: boolean;
}

export interface TaxiAiDailyReportRequestPreviewDecision {
  readonly countryCode: TaxiCountryCode;
  readonly localDate: string;
  readonly previewAllowed: true;
  readonly runtimeAllowedNow: false;
  readonly fullReportRequiredEveryDay: true;
  readonly adminCanOpenReportShell: true;
  readonly blockedReasons: readonly (TaxiKernelBoundaryReason | 'daily_scheduler_runtime_not_mounted' | 'db_runtime_not_enabled' | 'penalty_execution_locked' | 'reward_payout_locked')[];
  readonly fakeSuccessBlocked: true;
}

export interface TaxiAiComplaintCasePolicyInput {
  readonly role: TaxiParticipantRole;
  readonly countryCode: TaxiCountryCode;
  readonly localDate: string;
  readonly verifiedComplaintsInOneDay: number;
  readonly hasCancellationThenTripAfterCancelSignal: boolean;
  readonly hasFalseComplaintSignal: boolean;
  readonly hasOpenAppeal: boolean;
}

export interface TaxiAiComplaintCasePolicyDecision {
  readonly role: TaxiParticipantRole;
  readonly countryCode: TaxiCountryCode;
  readonly localDate: string;
  readonly normalizedVerifiedComplaintsInOneDay: 0 | 1 | 2 | 3 | 4;
  readonly escalation: TaxiComplaintEscalationCode;
  readonly trustStatus: TaxiTrustStatus;
  readonly cooldownMinutes: 0 | 60 | 180;
  readonly blockUntilExplanation: boolean;
  readonly violationsToReview: readonly TaxiViolationCode[];
  readonly adminReviewRequired: boolean;
  readonly backendVerificationRequired: true;
  readonly uiMayExecutePenalty: false;
}
