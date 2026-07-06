import type { TaxiRouteDescriptor } from '../foundation';

export type TaxiAiDailyExportVersion = 'TAXI-BACKEND-FOUNDATION-001G';

export type TaxiAiDailyExportStatus = 'daily_export_retention_contract_ready';

export type TaxiAiDailyExportFormat = 'admin_json' | 'admin_csv_summary' | 'redacted_client_boundary_summary';

export type TaxiAiDailyExportRetentionClass =
  | 'country_day_report'
  | 'complaint_evidence_bundle'
  | 'admin_decision_audit'
  | 'appeal_explanation'
  | 'reward_freeze_release_audit'
  | 'client_boundary_summary';

export type TaxiAiDailyRedactionScope =
  | 'admin_full_evidence_only'
  | 'admin_redacted_summary'
  | 'client_boundary_safe_summary'
  | 'blocked_from_mobile';

export type TaxiAiEscalationSeverity = 'none' | 'low' | 'medium' | 'high' | 'hard_block_candidate';

export interface TaxiAiDailyExportContract {
  readonly exportId: string;
  readonly title: string;
  readonly format: TaxiAiDailyExportFormat;
  readonly includesEveryCountryDay: true;
  readonly includesDriversAndRiders: true;
  readonly includesAllComplaints: true;
  readonly includesFalseComplaintSignals: true;
  readonly includesCancellationAbuseSignals: true;
  readonly includesTripAfterCancelSignals: true;
  readonly includesStarsComplaintConflict: true;
  readonly includesRewardFreezeQueue: true;
  readonly adminVisible: true;
  readonly mobileVisibleThroughKernelSummaryOnly: boolean;
  readonly runtimeExportEnabledNow: false;
  readonly fakeReportBlocked: true;
}

export interface TaxiAiDailyRetentionContract {
  readonly retentionClass: TaxiAiDailyExportRetentionClass;
  readonly title: string;
  readonly adminPurpose: string;
  readonly redactBeforeMobile: true;
  readonly rawEvidenceLeavesFoundation: false;
  readonly requiresAdminPermission: true;
  readonly requiresExactApprovalForRuntimeAccess: true;
  readonly runtimeStorageEnabledNow: false;
}

export interface TaxiAiDailyEvidenceRedactionRule {
  readonly ruleId: string;
  readonly title: string;
  readonly rawEvidenceScope: TaxiAiDailyRedactionScope;
  readonly mobileAllowed: false | 'safe_status_only';
  readonly adminAllowed: true;
  readonly protectsDriversAndRiders: true;
  readonly preventsPublicShaming: true;
  readonly fakeEvidenceBlocked: true;
}

export interface TaxiAiDailyEscalationMatrixRule {
  readonly ruleId: string;
  readonly countryDayComplaintCount: 0 | 1 | 2 | 3 | 4;
  readonly severity: TaxiAiEscalationSeverity;
  readonly driverActionCandidate: string;
  readonly riderActionCandidate: string;
  readonly requiresSabiAiReview: true;
  readonly requiresAdminDecision: boolean;
  readonly requiresAppealBeforeHardAction: boolean;
  readonly executionEnabledNow: false;
  readonly fakePenaltyBlocked: true;
}

export interface TaxiAiDailyKernelSummaryContract {
  readonly summaryId: string;
  readonly title: string;
  readonly clientAppMustUseKernel: true;
  readonly containsRawEvidence: false;
  readonly containsPersonalComplaintDetails: false;
  readonly showsDailyStatusOnly: true;
  readonly showsAppealStatusOnly: true;
  readonly showsRewardFreezeStatusOnly: true;
  readonly runtimePushEnabledNow: false;
}

export interface TaxiAiDailyExportSnapshot {
  readonly version: TaxiAiDailyExportVersion;
  readonly module: 'taxi';
  readonly status: TaxiAiDailyExportStatus;
  readonly adminAddedWithFoundation: true;
  readonly maximumCompatibilityMode: true;
  readonly fullReportRequiredEveryDay: true;
  readonly sabiAiMustCheckAllComplaintsEveryDay: true;
  readonly reportExportRequiredForAdmin: true;
  readonly reportRetentionContractRequired: true;
  readonly evidenceRedactionRequired: true;
  readonly escalationMatrixRequired: true;
  readonly clientAppMustUseKernelSummaryOnly: true;
  readonly rawEvidenceAdminFoundationOnly: true;
  readonly exports: readonly TaxiAiDailyExportContract[];
  readonly retention: readonly TaxiAiDailyRetentionContract[];
  readonly redaction: readonly TaxiAiDailyEvidenceRedactionRule[];
  readonly escalationMatrix: readonly TaxiAiDailyEscalationMatrixRule[];
  readonly kernelSummaries: readonly TaxiAiDailyKernelSummaryContract[];
  readonly routeDescriptors: readonly TaxiRouteDescriptor[];
  readonly schedulerRuntimeMountedNow: false;
  readonly routeRuntimeMountedNow: false;
  readonly dbReadEnabled: false;
  readonly dbWriteEnabled: false;
  readonly walletMutationEnabled: false;
  readonly paymentEnabled: false;
  readonly payoutEnabled: false;
  readonly providerEnabled: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiAiDailyExportReadinessInput {
  readonly countryIso2: string;
  readonly calendarDay: string;
  readonly wantsRuntimeExport: boolean;
  readonly wantsRawEvidenceForMobile: boolean;
  readonly hasAdminPermission: boolean;
  readonly hasExactApproval: boolean;
}

export interface TaxiAiDailyExportReadinessDecision {
  readonly canPreviewAdminReportContract: boolean;
  readonly canExportRuntimeNow: false;
  readonly canSendRawEvidenceToMobile: false;
  readonly blockedReasons: readonly string[];
  readonly requiresExactApprovalForRuntime: true;
  readonly fakeReportBlocked: true;
}
