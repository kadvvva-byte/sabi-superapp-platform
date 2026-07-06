import {
  TAXI_ADMIN_ACTION_INBOX_ITEMS,
  TAXI_ADMIN_DAILY_REPORT_LIFECYCLE,
  TAXI_ADMIN_NOTIFICATION_SURFACES,
  TAXI_ADMIN_NOTIFICATIONS_VERSION,
  taxiAdminNotificationRouteDescriptors,
} from './taxiAdminNotifications.constants';
import type {
  TaxiAdminNotificationReadinessDecision,
  TaxiAdminNotificationReadinessInput,
  TaxiAdminNotificationReadinessSnapshot,
} from './taxiAdminNotifications.types';

export function getTaxiAdminNotificationReadinessSnapshot(): TaxiAdminNotificationReadinessSnapshot {
  return {
    version: TAXI_ADMIN_NOTIFICATIONS_VERSION,
    module: 'taxi',
    status: 'admin_notification_contracts_ready_safe_disabled',
    adminAddedWithFoundation: true,
    maximumCompatibilityMode: true,
    adminNotificationContractsRequired: true,
    adminActionInboxRequired: true,
    dailyReportStatusLifecycleRequired: true,
    sabiAiMustCheckAllComplaintsEveryDay: true,
    fullReportRequiredEveryDay: true,
    complaintReviewBeforeAnyPenalty: true,
    appealExplanationBeforeHardBlock: true,
    rawEvidenceAdminFoundationOnly: true,
    clientAppMustUseKernel: true,
    clientReceivesKernelSafeStatusOnly: true,
    surfaces: TAXI_ADMIN_NOTIFICATION_SURFACES,
    lifecycle: TAXI_ADMIN_DAILY_REPORT_LIFECYCLE,
    actionInbox: TAXI_ADMIN_ACTION_INBOX_ITEMS,
    routeDescriptors: taxiAdminNotificationRouteDescriptors,
    notificationRuntimeMountedNow: false,
    schedulerRuntimeMountedNow: false,
    dbReadEnabled: false,
    dbWriteEnabled: false,
    walletMutationEnabled: false,
    paymentEnabled: false,
    payoutEnabled: false,
    providerEnabled: false,
    fakeSuccessBlocked: true,
  };
}

export function evaluateTaxiAdminNotificationReadiness(
  input: TaxiAdminNotificationReadinessInput,
): TaxiAdminNotificationReadinessDecision {
  const blockedReasons: string[] = [];

  if (!input.hasAdminPermission) {
    blockedReasons.push('admin_permission_required');
  }
  if (input.wantsRuntimePush) {
    blockedReasons.push('notification_push_runtime_safe_disabled');
  }
  if (input.wantsSchedulerRuntime) {
    blockedReasons.push('scheduler_runtime_safe_disabled');
  }
  if (input.wantsDbReadOrWrite) {
    blockedReasons.push('db_read_write_requires_separate_exact_approval');
  }
  if (input.wantsRawEvidenceInMobile) {
    blockedReasons.push('raw_evidence_mobile_blocked_kernel_summary_only');
  }
  if (input.wantsRealPenaltyOrReward) {
    blockedReasons.push('real_penalty_or_reward_release_safe_disabled');
  }
  if (!input.hasExactApproval) {
    blockedReasons.push('exact_approval_required_for_notification_runtime');
  }

  return {
    canRenderNotificationContracts: input.hasAdminPermission,
    canRunNotificationRuntimeNow: false,
    canRunSchedulerRuntimeNow: false,
    canSendRawEvidenceToMobile: false,
    blockedReasons: Array.from(new Set(blockedReasons)),
    requiresExactApprovalForRuntime: true,
    fakeSuccessBlocked: true,
  };
}
