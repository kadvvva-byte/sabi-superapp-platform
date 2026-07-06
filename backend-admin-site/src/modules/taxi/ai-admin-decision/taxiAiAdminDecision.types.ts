import type {
  TaxiComplaintEscalationCode,
  TaxiCountryCode,
  TaxiParticipantRole,
  TaxiTrustStatus,
  TaxiViolationCode,
} from '../foundation';
import type { TaxiKernelBoundaryReason } from '../kernel';

export type TaxiAiAdminDecisionVersion = 'TAXI-BACKEND-FOUNDATION-001F';

export type TaxiAiAdminDecisionStatus =
  | 'decision_lifecycle_contract_ready'
  | 'daily_report_completeness_contract_ready'
  | 'appeal_sla_contract_ready'
  | 'safe_disabled_exact_approval_required';

export type TaxiAiAdminDecisionStageId =
  | 'daily_report_created'
  | 'all_complaints_collected'
  | 'sabi_ai_precheck_completed'
  | 'evidence_bundle_normalized'
  | 'admin_review_started'
  | 'admin_decision_drafted'
  | 'appeal_window_opened'
  | 'final_admin_decision_waiting_exact_approval'
  | 'client_boundary_summary_published';

export type TaxiAiAdminDecisionActionId =
  | 'no_action_clear'
  | 'warning_candidate'
  | 'points_penalty_candidate'
  | 'one_hour_cooldown_candidate'
  | 'three_hour_cooldown_candidate'
  | 'block_pending_explanation_candidate'
  | 'false_complaint_penalty_candidate'
  | 'restore_points_candidate'
  | 'freeze_reward_candidate'
  | 'release_reward_candidate';

export type TaxiAiAdminDecisionEvidenceId =
  | 'verified_trip_state'
  | 'complaint_text_and_metadata'
  | 'chat_call_safety_context'
  | 'route_cancel_after_cancel_context'
  | 'star_rating_conflict_context'
  | 'device_account_country_context'
  | 'driver_balance_dispatch_context'
  | 'league_points_and_reward_context'
  | 'appeal_explanation_context';

export type TaxiAiAdminDecisionSlaId =
  | 'daily_report_same_country_day'
  | 'complaint_precheck_daily'
  | 'critical_block_review_priority'
  | 'appeal_explanation_required_before_hard_action'
  | 'reward_release_after_clean_admin_decision_only';

export interface TaxiAiAdminDecisionStageContract {
  readonly stageId: TaxiAiAdminDecisionStageId;
  readonly order: number;
  readonly title: string;
  readonly description: string;
  readonly requiredForEveryDailyCountryReport: boolean;
  readonly requiredBeforeHeavyAction: boolean;
  readonly adminVisible: true;
  readonly mobileVisibleThroughKernelSummaryOnly: boolean;
  readonly runtimeMountedNow: false;
  readonly fakeDecisionBlocked: true;
}

export interface TaxiAiAdminDecisionActionContract {
  readonly actionId: TaxiAiAdminDecisionActionId;
  readonly label: string;
  readonly mapsEscalation?: TaxiComplaintEscalationCode;
  readonly targetTrustStatus: TaxiTrustStatus;
  readonly appliesToRoles: readonly TaxiParticipantRole[];
  readonly requiresDailyAiReport: true;
  readonly requiresEvidenceBundle: true;
  readonly requiresAdminDecision: true;
  readonly requiresAppealWindowForHeavyAction: boolean;
  readonly executionAllowedNow: false;
  readonly fakePenaltyOrRewardBlocked: true;
}

export interface TaxiAiAdminDecisionEvidenceContract {
  readonly evidenceId: TaxiAiAdminDecisionEvidenceId;
  readonly label: string;
  readonly description: string;
  readonly adminRawAccessOnly: true;
  readonly mobileSummaryAllowed: boolean;
  readonly mayContainPrivateData: boolean;
  readonly requiredForFinalDecision: boolean;
  readonly dbRuntimeAllowedNow: false;
}

export interface TaxiAiAdminDecisionSlaContract {
  readonly slaId: TaxiAiAdminDecisionSlaId;
  readonly label: string;
  readonly description: string;
  readonly countryScoped: true;
  readonly dailyScoped: true;
  readonly adminVisible: true;
  readonly runtimeSchedulerMountedNow: false;
  readonly exactApprovalRequiredForAutomation: true;
}

export interface TaxiDailyReportCompletenessContract {
  readonly fieldId: string;
  readonly label: string;
  readonly requiredEveryDay: true;
  readonly countryScoped: true;
  readonly dailyScoped: true;
  readonly checksDrivers: boolean;
  readonly checksRiders: boolean;
  readonly adminVisible: true;
  readonly mobileRawAccessAllowed: false;
}

export interface TaxiAiAdminDecisionSnapshot {
  readonly version: TaxiAiAdminDecisionVersion;
  readonly module: 'taxi';
  readonly status: TaxiAiAdminDecisionStatus;
  readonly adminAddedWithFoundation: true;
  readonly maximumCompatibilityMode: true;
  readonly fullDailyReportRequiredEveryDay: true;
  readonly sabiAiMustCheckEveryComplaintEveryDay: true;
  readonly complaintReviewBeforeAnyPenalty: true;
  readonly appealExplanationBeforeHardBlock: true;
  readonly adminDecisionRequiredForHeavyAction: true;
  readonly clientAppMustUseKernelSummaryOnly: true;
  readonly adminUiUsesFoundationContracts: true;
  readonly schedulerRuntimeMountedNow: false;
  readonly routeRuntimeMountedNow: false;
  readonly dbReadEnabled: false;
  readonly dbWriteEnabled: false;
  readonly walletMutationEnabled: false;
  readonly providerRuntimeEnabled: false;
  readonly paymentRuntimeEnabled: false;
  readonly payoutRuntimeEnabled: false;
  readonly fakeAiDecisionBlocked: true;
  readonly fakePenaltyExecutionBlocked: true;
  readonly fakeRewardReleaseBlocked: true;
  readonly decisionStages: readonly TaxiAiAdminDecisionStageContract[];
  readonly decisionActions: readonly TaxiAiAdminDecisionActionContract[];
  readonly evidenceContracts: readonly TaxiAiAdminDecisionEvidenceContract[];
  readonly slaContracts: readonly TaxiAiAdminDecisionSlaContract[];
  readonly dailyReportCompletenessContracts: readonly TaxiDailyReportCompletenessContract[];
  readonly boundaryReasons: readonly TaxiKernelBoundaryReason[];
}

export interface TaxiAiAdminDecisionPreviewInput {
  readonly countryCode: TaxiCountryCode;
  readonly localDate: string;
  readonly role: TaxiParticipantRole;
  readonly verifiedComplaintsInOneDay: number;
  readonly violationsDetected: readonly TaxiViolationCode[];
  readonly hasSabiAiDailyReport: boolean;
  readonly hasEvidenceBundle: boolean;
  readonly hasAdminDecision: boolean;
  readonly appealWindowOpened: boolean;
  readonly wantsPenaltyExecution: boolean;
  readonly wantsRewardRelease: boolean;
  readonly wantsDbWrite: boolean;
  readonly hasExactApproval: boolean;
}

export interface TaxiAiAdminDecisionPreviewDecision {
  readonly countryCode: TaxiCountryCode;
  readonly localDate: string;
  readonly role: TaxiParticipantRole;
  readonly normalizedVerifiedComplaintsInOneDay: 0 | 1 | 2 | 3 | 4;
  readonly recommendedAction: TaxiAiAdminDecisionActionId;
  readonly trustStatusPreview: TaxiTrustStatus;
  readonly canRenderInAdmin: true;
  readonly canPublishClientBoundarySummary: true;
  readonly canExecutePenaltyNow: false;
  readonly canReleaseRewardNow: false;
  readonly requiresSabiAiDailyReport: true;
  readonly requiresEvidenceBundle: true;
  readonly requiresAdminDecision: true;
  readonly requiresAppealWindowForHardBlock: boolean;
  readonly blockedReasons: readonly string[];
  readonly fakeDecisionBlocked: true;
}

export interface TaxiDailyReportCompletenessPreviewInput {
  readonly countryCode: TaxiCountryCode;
  readonly localDate: string;
  readonly includedFieldIds: readonly string[];
  readonly wantsRuntimeScheduler: boolean;
  readonly wantsDbReadOrWrite: boolean;
  readonly hasExactApproval: boolean;
}

export interface TaxiDailyReportCompletenessPreviewDecision {
  readonly countryCode: TaxiCountryCode;
  readonly localDate: string;
  readonly completeForAdminShell: boolean;
  readonly missingRequiredFieldIds: readonly string[];
  readonly canRunSchedulerNow: false;
  readonly canReadOrWriteDbNow: false;
  readonly blockedReasons: readonly string[];
  readonly fakeReportCompletionBlocked: true;
}
