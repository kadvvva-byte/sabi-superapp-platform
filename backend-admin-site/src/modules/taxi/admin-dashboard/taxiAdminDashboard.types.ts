import type { TaxiRouteDescriptor } from '../foundation';

export type TaxiAdminDashboardVersion = 'TAXI-BACKEND-FOUNDATION-001H-FIX1';

export type TaxiAdminDashboardStatus = 'admin_dashboard_contract_ready_safe_disabled';

export type TaxiAdminDashboardFilterKey =
  | 'country_iso2'
  | 'calendar_day'
  | 'participant_role'
  | 'complaint_tier'
  | 'ai_confidence'
  | 'review_status'
  | 'appeal_status'
  | 'reward_freeze_status';

export type TaxiAdminDashboardParticipantRole = 'driver' | 'rider' | 'all_roles';

export type TaxiAdminDashboardActionState =
  | 'needs_sabi_ai_review'
  | 'needs_admin_review'
  | 'needs_participant_explanation'
  | 'cooldown_candidate'
  | 'hard_block_candidate'
  | 'reward_freeze_candidate'
  | 'restore_candidate'
  | 'no_action_clean_day';

export interface TaxiAdminDashboardFilterContract {
  readonly filterId: string;
  readonly title: string;
  readonly filterKey: TaxiAdminDashboardFilterKey;
  readonly requiredForDailyReport: boolean;
  readonly requiredForComplaintReview: boolean;
  readonly requiredForLeagueFairness: boolean;
  readonly adminVisible: true;
  readonly mobileVisible: false;
  readonly runtimeQueryEnabledNow: false;
}

export interface TaxiAdminDashboardActionStateContract {
  readonly stateId: TaxiAdminDashboardActionState;
  readonly title: string;
  readonly appliesToDrivers: true;
  readonly appliesToRiders: true;
  readonly requiresCountryDayScope: true;
  readonly requiresSabiAiEvidence: boolean;
  readonly requiresAdminDecision: boolean;
  readonly requiresAppealWindow: boolean;
  readonly canExecuteNow: false;
  readonly fakePenaltyBlocked: true;
  readonly fakeRewardBlocked: true;
}

export interface TaxiAdminDashboardPanelContract {
  readonly panelId: string;
  readonly title: string;
  readonly purpose: string;
  readonly usesFoundationContracts: true;
  readonly compatibleWithClientBoundarySummary: true;
  readonly containsRawEvidenceForMobile: false;
  readonly adminOnlyRawEvidence: boolean;
  readonly runtimeMountedNow: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiAdminDashboardReadinessSnapshot {
  readonly version: TaxiAdminDashboardVersion;
  readonly module: 'taxi';
  readonly status: TaxiAdminDashboardStatus;
  readonly adminAddedWithFoundation: true;
  readonly maximumCompatibilityMode: true;
  readonly dashboardContractsReady: true;
  readonly dailyReportDashboardRequired: true;
  readonly complaintFiltersRequired: true;
  readonly actionStateBoardRequired: true;
  readonly countryDayRoleFiltersRequired: true;
  readonly clientAppMustUseKernel: true;
  readonly adminUiUsesSameFoundationContracts: true;
  readonly rawEvidenceAdminFoundationOnly: true;
  readonly filters: readonly TaxiAdminDashboardFilterContract[];
  readonly actionStates: readonly TaxiAdminDashboardActionStateContract[];
  readonly panels: readonly TaxiAdminDashboardPanelContract[];
  readonly routeDescriptors: readonly TaxiRouteDescriptor[];
  readonly routeRuntimeMountedNow: false;
  readonly dashboardRuntimeMountedNow: false;
  readonly dbReadEnabled: false;
  readonly dbWriteEnabled: false;
  readonly walletMutationEnabled: false;
  readonly paymentEnabled: false;
  readonly payoutEnabled: false;
  readonly providerEnabled: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiAdminDashboardReadinessInput {
  readonly hasAdminPermission: boolean;
  readonly wantsRuntimeDashboard: boolean;
  readonly wantsDbReadOrWrite: boolean;
  readonly wantsRawEvidenceInMobile: boolean;
  readonly hasExactApproval: boolean;
}

export interface TaxiAdminDashboardReadinessDecision {
  readonly canRenderContractDashboard: boolean;
  readonly canRunRuntimeDashboardNow: false;
  readonly canSendRawEvidenceToMobile: false;
  readonly blockedReasons: readonly string[];
  readonly requiresExactApprovalForRuntime: true;
  readonly fakeSuccessBlocked: true;
}
