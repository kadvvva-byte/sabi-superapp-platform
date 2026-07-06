export type AdminSmsReadinessRouteContract239J = Readonly<{
  method: 'GET';
  path: '/api/admin/auth/sms/readiness';
  enabled: false;
  disabledReason: 'disabled_by_default';
  providerSelectedForValidation: 'Firebase Phone Auth';
  firebaseApiCallNow: false;
  smsProviderCallNow: false;
  smsSentNow: false;
  liveAuthEnabledNow: false;
  auditMarker: 'maskedPhoneLogs';
}>;

export const adminSmsReadinessRouteContract239J: AdminSmsReadinessRouteContract239J = {
  method: 'GET',
  path: '/api/admin/auth/sms/readiness',
  enabled: false,
  disabledReason: 'disabled_by_default',
  providerSelectedForValidation: 'Firebase Phone Auth',
  firebaseApiCallNow: false,
  smsProviderCallNow: false,
  smsSentNow: false,
  liveAuthEnabledNow: false,
  auditMarker: 'maskedPhoneLogs',
};
