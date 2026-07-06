import type { TaxiRouteDescriptor } from '../foundation';

export type TaxiAdminNotificationsVersion = 'TAXI-BACKEND-FOUNDATION-001I';

export type TaxiAdminNotificationsStatus = 'admin_notification_contracts_ready_safe_disabled';

export type TaxiAdminNotificationSurface =
  | 'daily_report_status_banner'
  | 'admin_action_inbox'
  | 'reviewer_assignment_queue'
  | 'appeal_sla_timer'
  | 'reward_freeze_alert'
  | 'country_day_escalation_badge'
  | 'kernel_safe_mobile_status';

export type TaxiAdminDailyReportLifecycleStatus =
  | 'contract_scheduled_not_running'
  | 'sabi_ai_review_required'
  | 'sabi_ai_review_completed'
  | 'admin_review_required'
  | 'participant_explanation_required'
  | 'appeal_sla_open'
  | 'final_decision_locked'
  | 'clean_day_closed';

export type TaxiAdminActionInboxItemKind =
  | 'review_driver_complaint'
  | 'review_rider_complaint'
  | 'verify_false_complaint_signal'
  | 'review_arranged_cancellation'
  | 'review_trip_after_cancellation'
  | 'review_stars_vs_complaint_conflict'
  | 'request_participant_explanation'
  | 'review_cooldown_candidate'
  | 'review_hard_block_candidate'
  | 'review_reward_freeze_candidate'
  | 'review_restore_candidate';

export interface TaxiAdminNotificationSurfaceContract {
  readonly surfaceId: TaxiAdminNotificationSurface;
  readonly title: string;
  readonly adminVisible: true;
  readonly mobileVisible: boolean;
  readonly rawEvidenceVisibleToMobile: false;
  readonly usesFoundationContracts: true;
  readonly usesClientBoundarySafeSummary: boolean;
  readonly runtimePushEnabledNow: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiAdminDailyReportLifecycleContract {
  readonly statusId: TaxiAdminDailyReportLifecycleStatus;
  readonly title: string;
  readonly requiresCountryDayScope: true;
  readonly requiresAllComplaintsChecked: boolean;
  readonly requiresSabiAiReview: boolean;
  readonly requiresAdminReview: boolean;
  readonly requiresParticipantExplanation: boolean;
  readonly visibleInAdminActionInbox: boolean;
  readonly canExecuteRuntimeNow: false;
  readonly fakePenaltyBlocked: true;
  readonly fakeRewardBlocked: true;
}

export interface TaxiAdminActionInboxContract {
  readonly itemKind: TaxiAdminActionInboxItemKind;
  readonly title: string;
  readonly appliesToDrivers: true;
  readonly appliesToRiders: true;
  readonly requiresDailyCountryReport: true;
  readonly requiresSabiAiEvidenceBundle: true;
  readonly requiresAdminDecisionBeforeRealAction: true;
  readonly requiresAppealBeforeHeavyAction: boolean;
  readonly actionRuntimeEnabledNow: false;
  readonly fakeSanctionBlocked: true;
  readonly fakeRewardBlocked: true;
}

export interface TaxiAdminNotificationReadinessSnapshot {
  readonly version: TaxiAdminNotificationsVersion;
  readonly module: 'taxi';
  readonly status: TaxiAdminNotificationsStatus;
  readonly adminAddedWithFoundation: true;
  readonly maximumCompatibilityMode: true;
  readonly adminNotificationContractsRequired: true;
  readonly adminActionInboxRequired: true;
  readonly dailyReportStatusLifecycleRequired: true;
  readonly sabiAiMustCheckAllComplaintsEveryDay: true;
  readonly fullReportRequiredEveryDay: true;
  readonly complaintReviewBeforeAnyPenalty: true;
  readonly appealExplanationBeforeHardBlock: true;
  readonly rawEvidenceAdminFoundationOnly: true;
  readonly clientAppMustUseKernel: true;
  readonly clientReceivesKernelSafeStatusOnly: true;
  readonly surfaces: readonly TaxiAdminNotificationSurfaceContract[];
  readonly lifecycle: readonly TaxiAdminDailyReportLifecycleContract[];
  readonly actionInbox: readonly TaxiAdminActionInboxContract[];
  readonly routeDescriptors: readonly TaxiRouteDescriptor[];
  readonly notificationRuntimeMountedNow: false;
  readonly schedulerRuntimeMountedNow: false;
  readonly dbReadEnabled: false;
  readonly dbWriteEnabled: false;
  readonly walletMutationEnabled: false;
  readonly paymentEnabled: false;
  readonly payoutEnabled: false;
  readonly providerEnabled: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiAdminNotificationReadinessInput {
  readonly hasAdminPermission: boolean;
  readonly wantsRuntimePush: boolean;
  readonly wantsSchedulerRuntime: boolean;
  readonly wantsDbReadOrWrite: boolean;
  readonly wantsRawEvidenceInMobile: boolean;
  readonly wantsRealPenaltyOrReward: boolean;
  readonly hasExactApproval: boolean;
}

export interface TaxiAdminNotificationReadinessDecision {
  readonly canRenderNotificationContracts: boolean;
  readonly canRunNotificationRuntimeNow: false;
  readonly canRunSchedulerRuntimeNow: false;
  readonly canSendRawEvidenceToMobile: false;
  readonly blockedReasons: readonly string[];
  readonly requiresExactApprovalForRuntime: true;
  readonly fakeSuccessBlocked: true;
}
