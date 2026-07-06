export type FirebasePhoneAuthProviderAdapterStatus239H = 'disabled_by_default';

export interface FirebasePhoneAuthProviderReadiness239H {
  readonly stage: '239H';
  readonly provider: 'FirebasePhone Auth';
  readonly status: FirebasePhoneAuthProviderAdapterStatus239H;
  readonly liveSmsEnabled: false;
  readonly firebaseApiCallEnabled: false;
  readonly smsProviderCallEnabled: false;
  readonly smsSendEnabled: false;
  readonly envReadEnabled: false;
  readonly dbWriteEnabled: false;
  readonly requiredBeforeLiveSms: readonly string[];
}

export interface FirebasePhoneAuthStartInput239H {
  readonly phoneE164Masked: string;
  readonly countryIso2: string;
  readonly deviceRiskRef: string;
}

export interface FirebasePhoneAuthVerifyInput239H {
  readonly verificationAttemptRef: string;
  readonly otpMasked: string;
}
