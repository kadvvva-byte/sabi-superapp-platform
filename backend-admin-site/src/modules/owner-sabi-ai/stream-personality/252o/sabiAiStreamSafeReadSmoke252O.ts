import type {
  SabiAiStreamSafeReadSmokeInput252O,
  SabiAiStreamSafeReadSmokeResult252O,
  SabiAiStreamSafetyLocks252O,
} from './sabiAiStreamSafeReadSmoke252O.types';

const expectedZeroFields252O = [
  'liveBroadcastReadinessNow',
  'runtimeGenerationReadinessNow',
  'runtimePostReadinessNow',
  'providerCallNow',
  'networkCallNow',
  'dbReadNow',
  'dbMutationNow',
  'protectedConfigReadWriteNow',
  'schedulerNow',
  'notificationSendNow',
  'paymentNow',
] as const;

const expectedLocks252O = [
  'no_live_broadcast_now',
  'no_runtime_generation_now',
  'no_runtime_post_now',
  'no_provider_call_now',
  'no_network_call_now',
  'no_db_read_now',
  'no_db_mutation_now',
  'no_scheduler_now',
  'no_notification_send_now',
  'no_payment_now',
] as const;

export function validateSabiAiStreamSafeReadSmoke252O(
  input: SabiAiStreamSafeReadSmokeInput252O,
  sourceReportPath: string,
  sourcePassed: boolean,
): SabiAiStreamSafeReadSmokeResult252O {
  const findings: string[] = [];

  if (sourcePassed !== true) findings.push('source_not_passed');
  if (input.ok !== true) findings.push('payload_ok_not_true');
  if (input.ownerPrivateOnly !== true) findings.push('owner_private_only_not_true');
  if (input.trainingModeReadiness !== 100) findings.push('training_mode_not_100');
  if (input.streamCreativeFoundationReadiness !== 100) findings.push('stream_creative_foundation_not_100');
  if (!Array.isArray(input.blockers) || input.blockers.length !== 0) findings.push('blockers_not_empty');

  for (const field of expectedZeroFields252O) {
    if (input[field] !== 0) findings.push(`field_${field}_not_zero`);
  }

  if (!Array.isArray(input.locks)) {
    findings.push('locks_not_array');
  } else {
    for (const lock of expectedLocks252O) {
      if (!input.locks.includes(lock)) findings.push(`missing_lock_${lock}`);
    }
  }

  return {
    smokeId: '252o-local-safe-read-smoke',
    sourceReportPath,
    sourcePassed,
    candidatePayloadAvailable: true,
    smokePassed: findings.length === 0,
    findings,
    serverStartedNow: false,
    routeMountedNow: false,
    realHttpRequestNow: false,
    dbReadNow: false,
    dbMutationNow: false,
    providerCallNow: false,
    networkCallNow: false,
    schedulerNow: false,
    notificationSendNow: false,
    generationNow: false,
    postNow: false,
    liveBroadcastNow: false,
  } as const;
}

export const sabiAiStreamSafetyLocks252O: SabiAiStreamSafetyLocks252O = {
  localCodeArtifactOnly: true,
  noServerStartNow: true,
  noRealHttpRequestNow: true,
  noLiveBroadcastNow: true,
  noRuntimeMountNow: true,
  noAdminRouteConnectionNow: true,
  noApiRouteConnectionNow: true,
  noRuntimeGenerationNow: true,
  noRuntimePostNow: true,
  noProviderCallNow: true,
  noNetworkCallNow: true,
  noProtectedConfigReadWriteNow: true,
  noDbReadNow: true,
  noDbMutationNow: true,
  noRealSchedulerNow: true,
  noRealNotificationSendNow: true,
  noEmailSendNow: true,
  noMessengerSendNow: true,
  noPaymentNow: true,
  noRestrictedLiveActionNow: true,
  finalActionsExecutedNow: false,
  ownerApprovalRequiredForFutureRouteMount: true,
  ownerApprovalRequiredForFutureRuntimeHandler: true,
  ownerApprovalRequiredForFutureDbRead: true,
  ownerApprovalRequiredForFutureDelivery: true,
  ownerApprovalRequiredForFutureGeneration: true,
  ownerApprovalRequiredForPublicPost: true,
  ownerApprovalRequiredForLiveBroadcast: true,
} as const;
