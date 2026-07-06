import type {
  FirebasePhoneAuthProviderReadiness239H,
  FirebasePhoneAuthStartInput239H,
  FirebasePhoneAuthVerifyInput239H,
} from './firebasePhoneAuthProviderAdapter239H.types';

const REQUIRED_BEFORE_LIVE_SMS_239H = Object.freeze([
  '<SMS_VERIFY_SERVICE_ID>',
  '<SMS_SENDER_ID>',
  '<SMS_WEBHOOK_SECRET>',
  '<OWNER_APPROVAL_REFERENCE>',
  '<FIREBASE_PROJECT_ID>',
  '<FIREBASE_APP_ID>',
  '<FIREBASE_AUTH_DOMAIN>',
  '<FIREBASE_API_KEY_REFERENCE>',
] as const);

export function getFirebasePhoneAuthReadiness239H(): FirebasePhoneAuthProviderReadiness239H {
  return Object.freeze({
    stage: '239H',
    provider: 'FirebasePhone Auth',
    status: 'disabled_by_default',
    liveSmsEnabled: false,
    firebaseApiCallEnabled: false,
    smsProviderCallEnabled: false,
    smsSendEnabled: false,
    envReadEnabled: false,
    dbWriteEnabled: false,
    requiredBeforeLiveSms: REQUIRED_BEFORE_LIVE_SMS_239H,
  });
}

export function createFirebasePhoneAuthStartCandidate239H(input: FirebasePhoneAuthStartInput239H) {
  return Object.freeze({
    stage: '239H',
    action: 'start_candidate_only',
    input,
    blocked: true,
    reason: 'disabled_by_default_no_live_sms_no_firebase_api_call',
  });
}

export function createFirebasePhoneAuthVerifyCandidate239H(input: FirebasePhoneAuthVerifyInput239H) {
  return Object.freeze({
    stage: '239H',
    action: 'verify_candidate_only',
    input,
    blocked: true,
    reason: 'disabled_by_default_no_live_sms_no_firebase_api_call',
  });
}

// 239I-FIX1 source marker block: static only, no runtime provider connection.
export type FirebasePhoneAuthProviderAdapter239H = Readonly<{
  runtimeMode: 'disabled_by_default';
  provider: 'Firebase Phone Auth';
  smsSentNow: false;
  firebaseApiCallNow: false;
  envReadNow: false;
  dbSessionTokenWriteNow: false;
}>;

export const firebasePhoneAuthProviderAdapterStub239H: FirebasePhoneAuthProviderAdapter239H = Object.freeze({
  runtimeMode: 'disabled_by_default',
  provider: 'Firebase Phone Auth',
  smsSentNow: false,
  firebaseApiCallNow: false,
  envReadNow: false,
  dbSessionTokenWriteNow: false,
});

export const firebasePhoneAuthProviderAdapterAuditMarkers239H = Object.freeze({
  startAttempt: 'startAttempt',
  verifyAttempt: 'verifyAttempt',
  resendAttempt: 'resendAttempt',
  maskedPhoneLogs: 'maskedPhoneLogs',
});
