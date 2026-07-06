import type { SabiRelease246MFix3AReport } from './sabiRelease246MFix3A.types';

export const sabiRelease246MFix3AReport: SabiRelease246MFix3AReport = {
  "version": "SABI-RELEASE-246M-FIX3A-NO-GCLOUD-STRICT-RECAPTCHA-LIVE-SMS-MASKED",
  "status": "failed",
  "createdAt": "2026-06-23T06:50:01.654Z",
  "firebaseProjectId": "sabi-official-prod-37629",
  "officialSiteProjectId": "sabi-official-prod",
  "scope": "no_gcloud_strict_recaptcha_token_callback_gate_for_phone_auth_live_sms_masked",
  "knownAuth": {
    "ok": true,
    "source": ".data/release/246m-fix2/246m-fix2-report.json",
    "phoneProviderReady": true,
    "globalSmsReady": true,
    "localhostReady": true,
    "loopbackReady": true,
    "domains": [
      "sabi-official-prod-37629.firebaseapp.com",
      "sabi-official-prod-37629.web.app",
      "localhost",
      "127.0.0.1"
    ]
  },
  "webConfig": {
    "ok": true,
    "source": "../superapp-mobile/firebase-web-config.official.sabi.js",
    "projectId": "sabi-official-prod-37629",
    "authDomain": "sabi-official-prod-37629.firebaseapp.com",
    "apiKeyPresent": true,
    "apiKeyPrinted": false
  },
  "localTest": {
    "started": true,
    "localUrl": "http://localhost:45149/",
    "pagePath": ".data/release/246m-fix3a/246m-fix3a-strict-recaptcha-test.html",
    "recaptchaCallbackTokenReady": true,
    "sendBlockedNoToken": false,
    "smsRequestedSuccess": false,
    "smsRequestedFailed": true,
    "timeout": false,
    "terminalEvent": {
      "type": "sms_requested_failed",
      "at": "2026-06-23T06:50:01.383Z",
      "phoneMasked": "+998****6767",
      "errorCode": "auth/invalid-app-credential",
      "errorMessage": "Firebase: The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired. (auth/invalid-app-credential).",
      "tokenReady": true,
      "browserTokenPresent": true
    },
    "eventCount": 3,
    "eventsPreview": [
      {
        "type": "recaptcha_rendered",
        "at": "2026-06-23T06:49:36.707Z",
        "widgetIdPresent": true
      },
      {
        "type": "recaptcha_callback_token_ready",
        "at": "2026-06-23T06:49:59.258Z",
        "tokenPresent": true,
        "tokenLengthBucket": "gt100"
      },
      {
        "type": "sms_requested_failed",
        "at": "2026-06-23T06:50:01.383Z",
        "phoneMasked": "+998****6767",
        "errorCode": "auth/invalid-app-credential",
        "errorMessage": "Firebase: The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired. (auth/invalid-app-credential).",
        "tokenReady": true,
        "browserTokenPresent": true
      }
    ]
  },
  "readiness": {
    "knownAuthReadiness": 100,
    "phoneProviderKnownReadiness": 100,
    "globalSmsPolicyKnownReadiness": 100,
    "localhostKnownAuthorizedReadiness": 100,
    "loopbackKnownAuthorizedReadiness": 100,
    "webFirebaseConfigReadiness": 100,
    "localTestPageReadiness": 100,
    "localServerReadiness": 100,
    "recaptchaCallbackTokenReadiness": 100,
    "strictNoSendWithoutTokenReadiness": 100,
    "webRecaptchaLiveSmsRequestReadiness": 0,
    "noFullPhonePrintReadiness": 100,
    "noSecretOrApiKeyPrintReadiness": 100,
    "release246MFix3AReadiness": 0,
    "liveSmsSentNow": 0,
    "firebaseUserDeletionNow": 0,
    "dnsMutationNow": 0,
    "googlePayBillingNow": 0,
    "walletPaymentPayoutNow": 0,
    "dbMutationNow": 0,
    "secretManagerReadWriteNow": 0,
    "envReadWriteNow": 0
  },
  "safety": {
    "noGcloudDependency": true,
    "previousAuthReportUsed": true,
    "strictRecaptchaTokenGateUsed": true,
    "sendButtonDisabledUntilRecaptchaCallback": true,
    "phoneNumberEnteredLocallyInBrowser": true,
    "fullPhoneNumberNotPrinted": true,
    "verificationIdNotPrinted": true,
    "apiKeyValueNotPrinted": true,
    "recaptchaTokenNotPrinted": true,
    "noFirebaseUserDeletionNow": true,
    "noDnsMutationNow": true,
    "noGooglePayOrBillingNow": true,
    "noWalletPaymentPayoutNow": true,
    "noDbMutationNow": true,
    "noSecretManagerReadWriteNow": true,
    "noEnvReadWriteNow": true,
    "doNotShareSmsCodeInChat": true
  },
  "checksPassed": 19,
  "checksTotal": 20,
  "checks": [
    {
      "name": "246m_fix3a_known_auth_from_previous_report_ready",
      "passed": true,
      "details": {
        "ok": true,
        "source": ".data/release/246m-fix2/246m-fix2-report.json",
        "phoneProviderReady": true,
        "globalSmsReady": true,
        "localhostReady": true,
        "loopbackReady": true,
        "domains": [
          "sabi-official-prod-37629.firebaseapp.com",
          "sabi-official-prod-37629.web.app",
          "localhost",
          "127.0.0.1"
        ]
      }
    },
    {
      "name": "246m_fix3a_phone_provider_known_ready",
      "passed": true,
      "details": {
        "ok": true,
        "source": ".data/release/246m-fix2/246m-fix2-report.json",
        "phoneProviderReady": true,
        "globalSmsReady": true,
        "localhostReady": true,
        "loopbackReady": true,
        "domains": [
          "sabi-official-prod-37629.firebaseapp.com",
          "sabi-official-prod-37629.web.app",
          "localhost",
          "127.0.0.1"
        ]
      }
    },
    {
      "name": "246m_fix3a_global_sms_policy_known_ready",
      "passed": true,
      "details": {
        "ok": true,
        "source": ".data/release/246m-fix2/246m-fix2-report.json",
        "phoneProviderReady": true,
        "globalSmsReady": true,
        "localhostReady": true,
        "loopbackReady": true,
        "domains": [
          "sabi-official-prod-37629.firebaseapp.com",
          "sabi-official-prod-37629.web.app",
          "localhost",
          "127.0.0.1"
        ]
      }
    },
    {
      "name": "246m_fix3a_localhost_known_authorized",
      "passed": true,
      "details": {
        "ok": true,
        "source": ".data/release/246m-fix2/246m-fix2-report.json",
        "phoneProviderReady": true,
        "globalSmsReady": true,
        "localhostReady": true,
        "loopbackReady": true,
        "domains": [
          "sabi-official-prod-37629.firebaseapp.com",
          "sabi-official-prod-37629.web.app",
          "localhost",
          "127.0.0.1"
        ]
      }
    },
    {
      "name": "246m_fix3a_loopback_known_authorized",
      "passed": true,
      "details": {
        "ok": true,
        "source": ".data/release/246m-fix2/246m-fix2-report.json",
        "phoneProviderReady": true,
        "globalSmsReady": true,
        "localhostReady": true,
        "loopbackReady": true,
        "domains": [
          "sabi-official-prod-37629.firebaseapp.com",
          "sabi-official-prod-37629.web.app",
          "localhost",
          "127.0.0.1"
        ]
      }
    },
    {
      "name": "246m_fix3a_web_firebase_config_ready",
      "passed": true,
      "details": {
        "ok": true,
        "source": "../superapp-mobile/firebase-web-config.official.sabi.js",
        "projectId": "sabi-official-prod-37629",
        "authDomain": "sabi-official-prod-37629.firebaseapp.com",
        "apiKeyPresent": true,
        "apiKeyPrinted": false
      }
    },
    {
      "name": "246m_fix3a_local_test_page_created",
      "passed": true,
      "details": {
        "pagePath": ".data/release/246m-fix3a/246m-fix3a-strict-recaptcha-test.html"
      }
    },
    {
      "name": "246m_fix3a_local_server_started",
      "passed": true,
      "details": {
        "localUrl": "http://localhost:45149/"
      }
    },
    {
      "name": "246m_fix3a_recaptcha_callback_token_ready",
      "passed": true,
      "details": {
        "started": true,
        "localUrl": "http://localhost:45149/",
        "pagePath": ".data/release/246m-fix3a/246m-fix3a-strict-recaptcha-test.html",
        "recaptchaCallbackTokenReady": true,
        "sendBlockedNoToken": false,
        "smsRequestedSuccess": false,
        "smsRequestedFailed": true,
        "timeout": false,
        "terminalEvent": {
          "type": "sms_requested_failed",
          "at": "2026-06-23T06:50:01.383Z",
          "phoneMasked": "+998****6767",
          "errorCode": "auth/invalid-app-credential",
          "errorMessage": "Firebase: The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired. (auth/invalid-app-credential).",
          "tokenReady": true,
          "browserTokenPresent": true
        },
        "eventCount": 3,
        "eventsPreview": [
          {
            "type": "recaptcha_rendered",
            "at": "2026-06-23T06:49:36.707Z",
            "widgetIdPresent": true
          },
          {
            "type": "recaptcha_callback_token_ready",
            "at": "2026-06-23T06:49:59.258Z",
            "tokenPresent": true,
            "tokenLengthBucket": "gt100"
          },
          {
            "type": "sms_requested_failed",
            "at": "2026-06-23T06:50:01.383Z",
            "phoneMasked": "+998****6767",
            "errorCode": "auth/invalid-app-credential",
            "errorMessage": "Firebase: The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired. (auth/invalid-app-credential).",
            "tokenReady": true,
            "browserTokenPresent": true
          }
        ]
      }
    },
    {
      "name": "246m_fix3a_sms_not_sent_without_recaptcha_token",
      "passed": true,
      "details": {
        "started": true,
        "localUrl": "http://localhost:45149/",
        "pagePath": ".data/release/246m-fix3a/246m-fix3a-strict-recaptcha-test.html",
        "recaptchaCallbackTokenReady": true,
        "sendBlockedNoToken": false,
        "smsRequestedSuccess": false,
        "smsRequestedFailed": true,
        "timeout": false,
        "terminalEvent": {
          "type": "sms_requested_failed",
          "at": "2026-06-23T06:50:01.383Z",
          "phoneMasked": "+998****6767",
          "errorCode": "auth/invalid-app-credential",
          "errorMessage": "Firebase: The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired. (auth/invalid-app-credential).",
          "tokenReady": true,
          "browserTokenPresent": true
        },
        "eventCount": 3,
        "eventsPreview": [
          {
            "type": "recaptcha_rendered",
            "at": "2026-06-23T06:49:36.707Z",
            "widgetIdPresent": true
          },
          {
            "type": "recaptcha_callback_token_ready",
            "at": "2026-06-23T06:49:59.258Z",
            "tokenPresent": true,
            "tokenLengthBucket": "gt100"
          },
          {
            "type": "sms_requested_failed",
            "at": "2026-06-23T06:50:01.383Z",
            "phoneMasked": "+998****6767",
            "errorCode": "auth/invalid-app-credential",
            "errorMessage": "Firebase: The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired. (auth/invalid-app-credential).",
            "tokenReady": true,
            "browserTokenPresent": true
          }
        ]
      }
    },
    {
      "name": "246m_fix3a_live_sms_requested_by_strict_recaptcha_flow",
      "passed": false,
      "details": {
        "started": true,
        "localUrl": "http://localhost:45149/",
        "pagePath": ".data/release/246m-fix3a/246m-fix3a-strict-recaptcha-test.html",
        "recaptchaCallbackTokenReady": true,
        "sendBlockedNoToken": false,
        "smsRequestedSuccess": false,
        "smsRequestedFailed": true,
        "timeout": false,
        "terminalEvent": {
          "type": "sms_requested_failed",
          "at": "2026-06-23T06:50:01.383Z",
          "phoneMasked": "+998****6767",
          "errorCode": "auth/invalid-app-credential",
          "errorMessage": "Firebase: The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired. (auth/invalid-app-credential).",
          "tokenReady": true,
          "browserTokenPresent": true
        },
        "eventCount": 3,
        "eventsPreview": [
          {
            "type": "recaptcha_rendered",
            "at": "2026-06-23T06:49:36.707Z",
            "widgetIdPresent": true
          },
          {
            "type": "recaptcha_callback_token_ready",
            "at": "2026-06-23T06:49:59.258Z",
            "tokenPresent": true,
            "tokenLengthBucket": "gt100"
          },
          {
            "type": "sms_requested_failed",
            "at": "2026-06-23T06:50:01.383Z",
            "phoneMasked": "+998****6767",
            "errorCode": "auth/invalid-app-credential",
            "errorMessage": "Firebase: The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired. (auth/invalid-app-credential).",
            "tokenReady": true,
            "browserTokenPresent": true
          }
        ]
      }
    },
    {
      "name": "246m_fix3a_no_full_phone_number_printed_in_report",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix3a_no_api_key_or_verification_id_printed_in_report",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix3a_no_firebase_user_deletion_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix3a_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix3a_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix3a_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix3a_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix3a_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix3a_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [
    "246m_fix3a_live_sms_requested_by_strict_recaptcha_flow"
  ],
  "warnings": [
    "sms_not_confirmed_requested_by_strict_recaptcha_flow",
    "firebase_returned_sms_request_error_check_terminal_event",
    "do_not_share_sms_code_in_chat"
  ],
  "nextStep": "246M_FIX4_review_strict_recaptcha_invalid_app_credential_or_browser_blocker",
  "exactApprovalForNext": "I approve RELEASE-246M-FIX4 review strict reCAPTCHA invalid app credential or browser blocker and fix only, no Firebase user deletion, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease246MFix3AReport;
