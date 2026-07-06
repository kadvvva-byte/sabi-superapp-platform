import type {
  SmsReadinessOwnerApprovalMatrixRow239P,
  SmsReadinessOwnerApprovalMatrixStatus239P,
  SmsReadinessOwnerApprovalSafetyLocks239P,
} from './smsReadinessOwnerApprovalMatrix239P.types';

export const smsReadinessOwnerApprovalMatrixStage239P = '239P' as const;
export const smsReadinessOwnerApprovalMatrixMarker239P = 'smsReadinessOwnerApprovalMatrix239P' as const;
export const smsReadinessOwnerApprovalMatrixMode239P = 'owner_approval_matrix_only_no_live_sms' as const;
export const smsReadinessOwnerApprovalMatrixLastConfirmedStage239P = '239O' as const;
export const smsReadinessOwnerApprovalRequiredBeforeAnyLiveAction239P = true as const;
export const smsReadinessOwnerApprovalSabiMessengerOnly239P = true as const;

const lockedRow239P = (
  action: SmsReadinessOwnerApprovalMatrixRow239P['action'],
  title: string,
  status: SmsReadinessOwnerApprovalMatrixRow239P['status'] = 'locked_not_requested',
): SmsReadinessOwnerApprovalMatrixRow239P => ({
  action,
  title,
  status,
  ownerFinalApprovalRequired: true,
  delegatedApprovalAllowed: false,
  sabiAiCanApprove: false,
  sabiAiRole: 'report_only',
  adminCanApproveLiveAction: false,
  exactOwnerCommandRequired: true,
  liveSmsEnabledNow: false,
  firebaseApiCallEnabledNow: false,
  smsProviderCallEnabledNow: false,
  routeRuntimeMountEnabledNow: false,
  adminRuntimeMountEnabledNow: false,
  googleCloudDeployEnabledNow: false,
  productionLaunchEnabledNow: false,
  auditRequiredBeforeNextStep: true,
});

export const smsReadinessOwnerApprovalMatrixRows239P: readonly SmsReadinessOwnerApprovalMatrixRow239P[] = [
  lockedRow239P('firebase_exact_values_intake', 'Owner exact Firebase values intake gate', 'waiting_owner_exact_approval'),
  lockedRow239P('firebase_admin_backend_contract_enablement', 'Owner Firebase Admin/backend contract enablement gate'),
  lockedRow239P('sms_provider_exact_values_intake', 'Owner exact SMS provider values intake gate'),
  lockedRow239P('secret_manager_storage_approval', 'Owner Secret Manager storage approval gate'),
  lockedRow239P('backend_route_runtime_mount_approval', 'Owner backend route runtime mount approval gate'),
  lockedRow239P('admin_runtime_mount_approval', 'Owner Admin runtime mount approval gate'),
  lockedRow239P('live_sms_canary_approval', 'Owner live SMS canary approval gate'),
  lockedRow239P('google_cloud_deploy_approval', 'Owner Google Cloud deploy approval gate'),
  lockedRow239P('production_public_launch_approval', 'Owner production public launch approval gate'),
] as const;

export const smsReadinessOwnerApprovalSafetyLocks239P: SmsReadinessOwnerApprovalSafetyLocks239P = {
  noLiveSms: true,
  noFirebaseApiCall: true,
  noSmsProviderCall: true,
  noSmsSent: true,
  noEnvOrSecrets: true,
  noDbSessionTokenWrites: true,
  noAdminUiRuntimeMount: true,
  noBackendRouteRuntimeMount: true,
  noGoogleCloudDeploy: true,
  noWalletPaymentPayoutCrypto: true,
  ownerFinalApprovalRequiredBeforeLiveAction: true,
};

export const smsReadinessOwnerApprovalMatrixStatus239P: SmsReadinessOwnerApprovalMatrixStatus239P = {
  stage: '239P',
  mode: smsReadinessOwnerApprovalMatrixMode239P,
  lastConfirmedStage: '239O',
  firebaseExactValuesProvided: false,
  realFirebaseProviderConnected: false,
  realSmsProviderConnected: false,
  realSmsSent: false,
  realRouteRuntimeMounted: false,
  realAdminRuntimeMounted: false,
  realGoogleCloudDeploy: false,
  productionPublicLaunch: false,
  liveAuthEnabledNow: false,
  ownerFinalAuthority: true,
  ownerSabiAiReportOnly: true,
  useSabiMessengerOnly: true,
  noExternalMessengerAlias: true,
  noDonationsOrInvestments: true,
  selfFundedProgramsOnly: true,
  rows: smsReadinessOwnerApprovalMatrixRows239P,
};

export const smsReadinessOwnerApprovalMatrixContinuity239P = {
  stage: '239P_sms_readiness_owner_approval_matrix_contract_only',
  marker: smsReadinessOwnerApprovalMatrixMarker239P,
  baseline: 'FIX75_stable_public_site_plus_239O_admin_sms_readiness_panel_placement_static_check',
  selectedProviderForValidation: 'Firebase Phone Auth',
  providerSelectedForValidationOnly: true,
  readinessEndpoint: 'GET /api/admin/auth/sms/readiness',
  startEndpoint: 'POST /api/auth/phone/start',
  verifyEndpoint: 'POST /api/auth/phone/verify',
  resendEndpoint: 'POST /api/auth/phone/resend',
  visibleOwnerChannel: 'Sabi Messenger',
  noExternalMessengerAlias: true,
  ownerFinalAuthority: true,
  ownerSabiAiRole: 'report_only',
  disabledByDefault: 'disabled_by_default',
  requiredBeforeLiveSms: [
    '<OWNER_APPROVAL_REFERENCE>',
    '<FIREBASE_PROJECT_ID>',
    '<FIREBASE_APP_ID>',
    '<FIREBASE_AUTH_DOMAIN>',
    '<FIREBASE_API_KEY_REFERENCE>',
    '<SMS_VERIFY_SERVICE_ID>',
    '<SMS_SENDER_ID>',
    '<SMS_WEBHOOK_SECRET>',
  ],
  safetyLocks: smsReadinessOwnerApprovalSafetyLocks239P,
  nextAllowedStep: 'Owner may provide exact non-secret values/approval references for validation only; live SMS remains locked.',
} as const;
