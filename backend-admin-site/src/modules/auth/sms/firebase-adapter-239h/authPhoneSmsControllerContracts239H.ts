export const authPhoneSmsControllerContracts239H = Object.freeze({
  stage: '239H',
  enabledNow: false,
  endpoints: Object.freeze([
    'POST /api/auth/phone/start',
    'POST /api/auth/phone/verify',
    'POST /api/auth/phone/resend',
    'GET /api/admin/auth/sms/readiness',
  ]),
  runtimeLocks: Object.freeze({
    liveAuthEnabled: false,
    firebaseApiCallEnabled: false,
    smsProviderCallEnabled: false,
    smsSendEnabled: false,
    envReadEnabled: false,
    dbSessionTokenWriteEnabled: false,
  }),
  antiAbuse: Object.freeze([
    'Per-phone cooldown',
    'Per-device limit',
    'Per-IP limit',
    'Per-country risk threshold',
    'Max resend count',
    'No enumeration',
  ]),
  audit: Object.freeze([
    'startAttempt',
    'verifyAttempt',
    'resendAttempt',
    'maskedPhoneLogs',
  ]),
});
