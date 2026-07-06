import type { AdminSmsReadinessPanelAuditRow239L, AdminSmsReadinessPanelStatus239L } from './adminSmsReadinessPanelContract239L.types';

export const adminSmsReadinessPanelContract239LMode = 'contract_only_no_admin_runtime_mount' as const;
export const adminSmsReadinessPanelContractCandidate239L = 'adminSmsReadinessPanelContractCandidate239L' as const;
export const backendSmsReadinessPanelContract239L = 'backendSmsReadinessPanelContract239L' as const;
export const disabledByDefault239L = 'disabled_by_default' as const;

export const adminSmsReadinessPanelStatus239L: AdminSmsReadinessPanelStatus239L = {
  selectedProviderForValidation: 'Firebase Phone Auth',
  providerSelectedForValidationOnly: true,
  firebaseExactValuesProvided: false,
  realFirebaseProviderConnected: false,
  realSmsProviderConnected: false,
  realSmsSent: false,
  realRouteRuntimeMounted: false,
  liveAuthEnabledNow: false,
  mobileDirectProviderAccess: false,
  providerCredentialsStayBackendOnly: true,
  providerSecretsInSecretManager: true,
  routeMountMode: 'contract_only_no_runtime_mount',
  panelMode: 'contract_only_no_admin_runtime_mount',
};

export const adminSmsReadinessPanelAuditRows239L: ReadonlyArray<AdminSmsReadinessPanelAuditRow239L> = [
  'startAttempt',
  'verifyAttempt',
  'resendAttempt',
  'maskedPhoneLogs',
];

export const adminSmsReadinessEndpoint239L = 'GET /api/admin/auth/sms/readiness' as const;
export const authPhoneStartEndpoint239L = 'POST /api/auth/phone/start' as const;
export const authPhoneVerifyEndpoint239L = 'POST /api/auth/phone/verify' as const;
export const authPhoneResendEndpoint239L = 'POST /api/auth/phone/resend' as const;
