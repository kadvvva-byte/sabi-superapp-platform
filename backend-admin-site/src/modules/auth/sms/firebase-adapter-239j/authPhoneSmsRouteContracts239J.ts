export type AuthPhoneSmsRouteMethod239J = 'POST' | 'GET';

export type AuthPhoneSmsRouteContract239J = Readonly<{
  method: AuthPhoneSmsRouteMethod239J;
  path: string;
  purpose: string;
  enabled: false;
  disabledReason: 'disabled_by_default';
  auditMarker: 'startAttempt' | 'verifyAttempt' | 'resendAttempt' | 'maskedPhoneLogs';
}>;

export const authPhoneSmsRouteContracts239J: readonly AuthPhoneSmsRouteContract239J[] = [
  {
    method: 'POST',
    path: '/api/auth/phone/start',
    purpose: 'Create a future phone verification start attempt contract without sending SMS.',
    enabled: false,
    disabledReason: 'disabled_by_default',
    auditMarker: 'startAttempt',
  },
  {
    method: 'POST',
    path: '/api/auth/phone/verify',
    purpose: 'Create a future phone verification check attempt contract without enabling live auth.',
    enabled: false,
    disabledReason: 'disabled_by_default',
    auditMarker: 'verifyAttempt',
  },
  {
    method: 'POST',
    path: '/api/auth/phone/resend',
    purpose: 'Create a future resend attempt contract without sending SMS.',
    enabled: false,
    disabledReason: 'disabled_by_default',
    auditMarker: 'resendAttempt',
  },
];
