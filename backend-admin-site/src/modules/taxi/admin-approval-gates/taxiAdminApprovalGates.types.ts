import type { TaxiRouteDescriptor } from '../foundation';

export type TaxiAdminApprovalGatesVersion = 'TAXI-BACKEND-FOUNDATION-001J';

export type TaxiAdminApprovalGatesStatus = 'admin_approval_gates_ready_safe_disabled';

export type TaxiAdminApprovalGateId =
  | 'daily_report_close_gate'
  | 'sabi_ai_completion_gate'
  | 'complaint_penalty_gate'
  | 'hard_block_gate'
  | 'reward_freeze_gate'
  | 'reward_release_gate'
  | 'restore_points_gate'
  | 'client_boundary_publish_gate';

export type TaxiAdminApprovalActor =
  | 'sabi_ai'
  | 'admin_reviewer'
  | 'admin_supervisor'
  | 'legal_review'
  | 'finance_review'
  | 'foundation_kernel';

export type TaxiAdminApprovalDecisionState =
  | 'not_started'
  | 'ai_review_required'
  | 'admin_review_required'
  | 'participant_explanation_required'
  | 'approval_required'
  | 'approved_for_future_runtime'
  | 'rejected'
  | 'safe_disabled_locked';

export interface TaxiAdminApprovalGateContract {
  readonly gateId: TaxiAdminApprovalGateId;
  readonly title: string;
  readonly requiredActors: readonly TaxiAdminApprovalActor[];
  readonly requiresCountryDayScope: true;
  readonly requiresFullDailyReport: true;
  readonly requiresAllComplaintsChecked: boolean;
  readonly requiresSabiAiEvidenceBundle: boolean;
  readonly requiresParticipantExplanation: boolean;
  readonly requiresSupervisorApproval: boolean;
  readonly requiresLegalOrFinanceReview: boolean;
  readonly canExecuteRuntimeNow: false;
  readonly fakeDecisionBlocked: true;
}

export interface TaxiAdminApprovalDecisionContract {
  readonly state: TaxiAdminApprovalDecisionState;
  readonly title: string;
  readonly visibleInAdmin: true;
  readonly visibleInClientBoundarySummary: boolean;
  readonly rawEvidenceVisibleToMobile: false;
  readonly blocksRealPenaltyUntilApproved: true;
  readonly blocksRewardReleaseUntilApproved: true;
  readonly canMutateDbNow: false;
  readonly canMutateWalletNow: false;
  readonly canCallProviderNow: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiAdminDailyReportFinalizeRule {
  readonly ruleId:
    | 'all_complaints_checked_before_close'
    | 'open_appeals_block_close'
    | 'reward_freeze_review_required'
    | 'raw_evidence_admin_only'
    | 'kernel_summary_after_admin_lock';
  readonly title: string;
  readonly requiredForEveryCountryDay: true;
  readonly adminMayCloseOnlyAfterSatisfied: true;
  readonly mobileMayReceiveOnlySafeSummary: true;
  readonly runtimeEnabledNow: false;
  readonly fakeCloseBlocked: true;
}

export interface TaxiAdminApprovalGatesSnapshot {
  readonly version: TaxiAdminApprovalGatesVersion;
  readonly module: 'taxi';
  readonly status: TaxiAdminApprovalGatesStatus;
  readonly adminApprovalGatesRequired: true;
  readonly dailyReportCloseGateRequired: true;
  readonly sabiAiCompletionGateRequired: true;
  readonly allComplaintsCheckedBeforeClose: true;
  readonly participantExplanationBeforeHardBlock: true;
  readonly supervisorApprovalBeforeHeavyAction: true;
  readonly legalFinanceReviewBeforeRewardRelease: true;
  readonly clientBoundaryPublishAfterAdminLockOnly: true;
  readonly rawEvidenceAdminFoundationOnly: true;
  readonly clientAppMustUseKernel: true;
  readonly gates: readonly TaxiAdminApprovalGateContract[];
  readonly decisionStates: readonly TaxiAdminApprovalDecisionContract[];
  readonly finalizeRules: readonly TaxiAdminDailyReportFinalizeRule[];
  readonly routeDescriptors: readonly TaxiRouteDescriptor[];
  readonly approvalRuntimeMountedNow: false;
  readonly schedulerRuntimeMountedNow: false;
  readonly dbReadEnabled: false;
  readonly dbWriteEnabled: false;
  readonly walletMutationEnabled: false;
  readonly paymentEnabled: false;
  readonly payoutEnabled: false;
  readonly providerEnabled: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiAdminApprovalGatesInput {
  readonly hasAdminPermission: boolean;
  readonly wantsCloseDailyReport: boolean;
  readonly wantsHardBlock: boolean;
  readonly wantsRewardRelease: boolean;
  readonly wantsPublishMobileSummary: boolean;
  readonly wantsRuntimeExecution: boolean;
  readonly wantsDbReadOrWrite: boolean;
  readonly wantsWalletProviderPaymentPayout: boolean;
  readonly allComplaintsChecked: boolean;
  readonly sabiAiEvidenceBundleReady: boolean;
  readonly participantExplanationSatisfied: boolean;
  readonly supervisorApprovalPresent: boolean;
  readonly legalFinanceReviewPresent: boolean;
  readonly hasExactApproval: boolean;
}

export interface TaxiAdminApprovalGatesDecision {
  readonly canRenderApprovalGates: boolean;
  readonly canCloseDailyReportNow: false;
  readonly canExecuteHeavyActionNow: false;
  readonly canReleaseRewardNow: false;
  readonly canPublishClientBoundarySummaryNow: false;
  readonly blockedReasons: readonly string[];
  readonly requiresExactApprovalForRuntime: true;
  readonly fakeSuccessBlocked: true;
}
