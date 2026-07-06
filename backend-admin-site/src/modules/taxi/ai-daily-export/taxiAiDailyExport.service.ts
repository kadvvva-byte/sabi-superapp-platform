import {
  TAXI_AI_DAILY_ESCALATION_MATRIX,
  TAXI_AI_DAILY_EXPORT_CONTRACTS,
  TAXI_AI_DAILY_EXPORT_VERSION,
  TAXI_AI_DAILY_KERNEL_SUMMARIES,
  TAXI_AI_DAILY_REDACTION_RULES,
  TAXI_AI_DAILY_RETENTION_CONTRACTS,
  taxiAiDailyExportRouteDescriptors,
} from './taxiAiDailyExport.constants';
import type {
  TaxiAiDailyExportReadinessDecision,
  TaxiAiDailyExportReadinessInput,
  TaxiAiDailyExportSnapshot,
} from './taxiAiDailyExport.types';

export function getTaxiAiDailyExportSnapshot(): TaxiAiDailyExportSnapshot {
  return {
    version: TAXI_AI_DAILY_EXPORT_VERSION,
    module: 'taxi',
    status: 'daily_export_retention_contract_ready',
    adminAddedWithFoundation: true,
    maximumCompatibilityMode: true,
    fullReportRequiredEveryDay: true,
    sabiAiMustCheckAllComplaintsEveryDay: true,
    reportExportRequiredForAdmin: true,
    reportRetentionContractRequired: true,
    evidenceRedactionRequired: true,
    escalationMatrixRequired: true,
    clientAppMustUseKernelSummaryOnly: true,
    rawEvidenceAdminFoundationOnly: true,
    exports: TAXI_AI_DAILY_EXPORT_CONTRACTS,
    retention: TAXI_AI_DAILY_RETENTION_CONTRACTS,
    redaction: TAXI_AI_DAILY_REDACTION_RULES,
    escalationMatrix: TAXI_AI_DAILY_ESCALATION_MATRIX,
    kernelSummaries: TAXI_AI_DAILY_KERNEL_SUMMARIES,
    routeDescriptors: taxiAiDailyExportRouteDescriptors,
    schedulerRuntimeMountedNow: false,
    routeRuntimeMountedNow: false,
    dbReadEnabled: false,
    dbWriteEnabled: false,
    walletMutationEnabled: false,
    paymentEnabled: false,
    payoutEnabled: false,
    providerEnabled: false,
    fakeSuccessBlocked: true,
  };
}

export function evaluateTaxiAiDailyExportReadiness(
  input: TaxiAiDailyExportReadinessInput,
): TaxiAiDailyExportReadinessDecision {
  const blockedReasons: string[] = [];

  if (!input.countryIso2.trim()) {
    blockedReasons.push('country_required');
  }
  if (!input.calendarDay.trim()) {
    blockedReasons.push('calendar_day_required');
  }
  if (!input.hasAdminPermission) {
    blockedReasons.push('admin_permission_required');
  }
  if (input.wantsRuntimeExport) {
    blockedReasons.push('runtime_export_safe_disabled');
  }
  if (input.wantsRawEvidenceForMobile) {
    blockedReasons.push('raw_evidence_blocked_from_client_boundary');
  }
  if (!input.hasExactApproval) {
    blockedReasons.push('exact_approval_required_for_runtime_export_or_storage');
  }

  return {
    canPreviewAdminReportContract: input.hasAdminPermission,
    canExportRuntimeNow: false,
    canSendRawEvidenceToMobile: false,
    blockedReasons: Array.from(new Set(blockedReasons)),
    requiresExactApprovalForRuntime: true,
    fakeReportBlocked: true,
  };
}

export function getTaxiAiDailyExportCompletenessMarkers(): readonly string[] {
  return [
    'admin_country_day_full_json',
    'admin_country_day_csv_summary',
    'client_boundary_redacted_status_summary',
    'raw_chat_call_route_admin_only',
    'complaint_identity_blocked_from_mobile',
    'mobile_sees_safe_status_only',
    'more_than_three_verified_complaints_hard_block_review',
  ] as const;
}
