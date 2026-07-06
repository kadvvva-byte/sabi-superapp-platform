export type AdminSmsReadinessPanelMode239L = 'contract_only_no_admin_runtime_mount';

export type AdminSmsReadinessPanelStatus239L = Readonly<{
  selectedProviderForValidation: 'Firebase Phone Auth';
  providerSelectedForValidationOnly: true;
  firebaseExactValuesProvided: false;
  realFirebaseProviderConnected: false;
  realSmsProviderConnected: false;
  realSmsSent: false;
  realRouteRuntimeMounted: false;
  liveAuthEnabledNow: false;
  mobileDirectProviderAccess: false;
  providerCredentialsStayBackendOnly: true;
  providerSecretsInSecretManager: true;
  routeMountMode: 'contract_only_no_runtime_mount';
  panelMode: AdminSmsReadinessPanelMode239L;
}>;

export type AdminSmsReadinessPanelAuditRow239L =
  | 'startAttempt'
  | 'verifyAttempt'
  | 'resendAttempt'
  | 'maskedPhoneLogs';
