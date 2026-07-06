import type { SabiRelease246MFix2Report } from './sabiRelease246MFix2.types';

export const sabiRelease246MFix2Report: SabiRelease246MFix2Report = {
  "version": "SABI-RELEASE-246M-FIX2-FETCH-WEB-CONFIG-RECAPTCHA-LIVE-SMS-MASKED",
  "status": "failed",
  "createdAt": "2026-06-23T06:20:38.692Z",
  "approval": "I approve RELEASE-246M-FIX2 fetch or reconstruct Firebase Web SDK config for project sabi-official-prod-37629, rerun local Web reCAPTCHA Phone Auth live SMS test page only, phone number entered locally and masked, no Firebase user deletion, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "firebaseProjectId": "sabi-official-prod-37629",
  "officialSiteProjectId": "sabi-official-prod",
  "scope": "fetch_or_reconstruct_web_sdk_config_rerun_local_recaptcha_phone_auth_live_sms_masked",
  "authSummary": {
    "name": "projects/970072647981/config",
    "phoneNumberEnabled": true,
    "authorizedDomains": [
      "sabi-official-prod-37629.firebaseapp.com",
      "sabi-official-prod-37629.web.app",
      "localhost",
      "127.0.0.1"
    ],
    "smsRegionPolicyMode": "allowByDefault",
    "disallowedRegions": [],
    "clientApiKeyPresentButNotPrinted": true
  },
  "webConfig": {
    "ok": true,
    "method": "local_file",
    "source": "../superapp-mobile/firebase-web-config.official.sabi.js",
    "projectId": "sabi-official-prod-37629",
    "authDomain": "sabi-official-prod-37629.firebaseapp.com",
    "apiKeyPresent": true,
    "apiKeyPrinted": false,
    "attempts": [
      {
        "method": "local_file",
        "ok": true,
        "source": "../superapp-mobile/firebase-web-config.official.sabi.js",
        "apiKeyPresent": true
      }
    ]
  },
  "localTest": {
    "started": true,
    "localUrl": "http://localhost:45147/",
    "pagePath": ".data/release/246m-fix2/246m-fix2-web-recaptcha-test.html",
    "smsRequestedSuccess": false,
    "smsRequestedFailed": true,
    "timeout": false,
    "terminalEvent": {
      "type": "sms_requested_failed",
      "at": "2026-06-23T06:20:38.568Z",
      "phoneMasked": "+998****6767",
      "errorCode": "auth/invalid-app-credential",
      "errorMessage": "Firebase: Error (auth/invalid-app-credential)."
    },
    "eventCount": 2,
    "eventsPreview": [
      {
        "type": "recaptcha_rendered",
        "at": "2026-06-23T06:20:05.849Z"
      },
      {
        "type": "sms_requested_failed",
        "at": "2026-06-23T06:20:38.568Z",
        "phoneMasked": "+998****6767",
        "errorCode": "auth/invalid-app-credential",
        "errorMessage": "Firebase: Error (auth/invalid-app-credential)."
      }
    ]
  },
  "observations": {
    "gcloudProject": {
      "name": "gcloud_project",
      "command": "gcloud config get-value project 2>$null",
      "status": 0,
      "stdout": "sabi-official-prod",
      "stderr": "",
      "ok": true
    },
    "gcloudAccount": {
      "name": "gcloud_active_account",
      "command": "gcloud auth list --filter=status:ACTIVE --format=\"value(account)\" 2>$null",
      "status": 0,
      "stdout": "admin@sabiai.app",
      "stderr": "",
      "ok": true
    },
    "firebaseProjectsList": {
      "name": "firebase_projects_list_readonly",
      "command": "firebase projects:list --json 2>$null",
      "status": 0,
      "stdout": "{\n  \"status\": \"success\",\n  \"result\": [\n    {\n      \"projectId\": \"sabi-official-prod-37629\",\n      \"projectNumber\": \"970072647981\",\n      \"displayName\": \"sabi-official-prod\",\n      \"name\": \"projects/sabi-official-prod-37629\",\n      \"resources\": {\n        \"hostingSite\": \"sabi-official-prod-37629\"\n      },\n      \"state\": \"ACTIVE\",\n      \"etag\": \"1_7f7958fa-fd44-47e7-8cf9-39e7f6dfe010\"\n    }\n  ]\n}",
      "stderr": "",
      "ok": true
    },
    "billingDescribe": {
      "name": "firebase_project_billing_describe_readonly",
      "command": "gcloud beta billing projects describe sabi-official-prod-37629 --format=json 2>$null",
      "status": 0,
      "stdout": "{\r\n  \"billingAccountName\": \"billingAccounts/015B16-5B0B15-52C323\",\r\n  \"billingEnabled\": true,\r\n  \"name\": \"projects/sabi-official-prod-37629/billingInfo\",\r\n  \"projectId\": \"sabi-official-prod-37629\"\r\n}",
      "stderr": "",
      "ok": true
    },
    "identityToolkitApiList": {
      "name": "identitytoolkit_api_enabled_check",
      "command": "gcloud services list --enabled --project=sabi-official-prod-37629 --filter=\"name:identitytoolkit.googleapis.com\" --format=\"value(name)\" 2>$null",
      "status": 0,
      "stdout": "projects/970072647981/services/identitytoolkit.googleapis.com",
      "stderr": "",
      "ok": true
    },
    "liveRoot": {
      "name": "live_https_root_readonly",
      "command": "$u=\"https://sabiai.app/\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "STATUS=200",
      "stderr": "",
      "ok": true
    },
    "accessToken": {
      "ok": true,
      "status": 0,
      "tokenPresent": true,
      "tokenValuePrinted": false
    }
  },
  "readiness": {
    "firebaseProjectVisibleReadiness": 100,
    "billingEnabledReadiness": 100,
    "identityToolkitApiEnabledReadiness": 100,
    "accessTokenReadiness": 100,
    "phoneProviderReadiness": 100,
    "globalSmsPolicyReadiness": 100,
    "localhostAuthorizedReadiness": 100,
    "loopbackIpAuthorizedReadiness": 100,
    "webFirebaseConfigReadiness": 100,
    "localTestPageReadiness": 100,
    "localServerReadiness": 100,
    "webRecaptchaLiveSmsRequestReadiness": 0,
    "officialWebsiteReadiness": 100,
    "noFullPhonePrintReadiness": 100,
    "noSecretOrApiKeyPrintReadiness": 100,
    "release246MFix2Readiness": 0,
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
    "ownerApprovalCaptured": true,
    "ownerAcceptedFirebaseSmsCharges": true,
    "firebaseWebRecaptchaFlowUsed": true,
    "phoneNumberEnteredLocallyInBrowser": true,
    "fullPhoneNumberNotPrinted": true,
    "verificationIdNotPrinted": true,
    "apiKeyValueNotPrinted": true,
    "noFirebaseUserDeletionNow": true,
    "noDnsMutationNow": true,
    "noGooglePayOrBillingNow": true,
    "noWalletPaymentPayoutNow": true,
    "noDbMutationNow": true,
    "noSecretManagerReadWriteNow": true,
    "noEnvReadWriteNow": true,
    "doNotShareSmsCodeInChat": true
  },
  "checksPassed": 22,
  "checksTotal": 23,
  "checks": [
    {
      "name": "246m_fix2_firebase_project_visible",
      "passed": true,
      "details": {
        "firebaseProjectId": "sabi-official-prod-37629"
      }
    },
    {
      "name": "246m_fix2_billing_enabled",
      "passed": true,
      "details": {
        "firebaseProjectId": "sabi-official-prod-37629"
      }
    },
    {
      "name": "246m_fix2_identitytoolkit_api_enabled",
      "passed": true,
      "details": {
        "list": "projects/970072647981/services/identitytoolkit.googleapis.com"
      }
    },
    {
      "name": "246m_fix2_access_token_obtained_without_printing_value",
      "passed": true,
      "details": {
        "ok": true,
        "status": 0,
        "tokenPresent": true,
        "tokenValuePrinted": false
      }
    },
    {
      "name": "246m_fix2_phone_provider_enabled",
      "passed": true,
      "details": {
        "name": "projects/970072647981/config",
        "phoneNumberEnabled": true,
        "authorizedDomains": [
          "sabi-official-prod-37629.firebaseapp.com",
          "sabi-official-prod-37629.web.app",
          "localhost",
          "127.0.0.1"
        ],
        "smsRegionPolicyMode": "allowByDefault",
        "disallowedRegions": [],
        "clientApiKeyPresentButNotPrinted": true
      }
    },
    {
      "name": "246m_fix2_global_sms_policy_ready",
      "passed": true,
      "details": {
        "name": "projects/970072647981/config",
        "phoneNumberEnabled": true,
        "authorizedDomains": [
          "sabi-official-prod-37629.firebaseapp.com",
          "sabi-official-prod-37629.web.app",
          "localhost",
          "127.0.0.1"
        ],
        "smsRegionPolicyMode": "allowByDefault",
        "disallowedRegions": [],
        "clientApiKeyPresentButNotPrinted": true
      }
    },
    {
      "name": "246m_fix2_localhost_authorized_domain_ready",
      "passed": true,
      "details": {
        "authorizedDomains": [
          "sabi-official-prod-37629.firebaseapp.com",
          "sabi-official-prod-37629.web.app",
          "localhost",
          "127.0.0.1"
        ]
      }
    },
    {
      "name": "246m_fix2_loopback_ip_authorized",
      "passed": true,
      "details": {
        "authorizedDomains": [
          "sabi-official-prod-37629.firebaseapp.com",
          "sabi-official-prod-37629.web.app",
          "localhost",
          "127.0.0.1"
        ]
      }
    },
    {
      "name": "246m_fix2_web_firebase_config_resolved",
      "passed": true,
      "details": {
        "ok": true,
        "method": "local_file",
        "source": "../superapp-mobile/firebase-web-config.official.sabi.js",
        "projectId": "sabi-official-prod-37629",
        "authDomain": "sabi-official-prod-37629.firebaseapp.com",
        "apiKeyPresent": true,
        "apiKeyPrinted": false,
        "attempts": [
          {
            "method": "local_file",
            "ok": true,
            "source": "../superapp-mobile/firebase-web-config.official.sabi.js",
            "apiKeyPresent": true
          }
        ]
      }
    },
    {
      "name": "246m_fix2_web_firebase_config_api_key_not_printed",
      "passed": true,
      "details": {
        "ok": true,
        "method": "local_file",
        "source": "../superapp-mobile/firebase-web-config.official.sabi.js",
        "projectId": "sabi-official-prod-37629",
        "authDomain": "sabi-official-prod-37629.firebaseapp.com",
        "apiKeyPresent": true,
        "apiKeyPrinted": false,
        "attempts": [
          {
            "method": "local_file",
            "ok": true,
            "source": "../superapp-mobile/firebase-web-config.official.sabi.js",
            "apiKeyPresent": true
          }
        ]
      }
    },
    {
      "name": "246m_fix2_local_test_page_created",
      "passed": true,
      "details": {
        "pagePath": ".data/release/246m-fix2/246m-fix2-web-recaptcha-test.html"
      }
    },
    {
      "name": "246m_fix2_local_server_started",
      "passed": true,
      "details": {
        "localUrl": "http://localhost:45147/"
      }
    },
    {
      "name": "246m_fix2_live_sms_requested_by_web_recaptcha_flow",
      "passed": false,
      "details": {
        "started": true,
        "localUrl": "http://localhost:45147/",
        "pagePath": ".data/release/246m-fix2/246m-fix2-web-recaptcha-test.html",
        "smsRequestedSuccess": false,
        "smsRequestedFailed": true,
        "timeout": false,
        "terminalEvent": {
          "type": "sms_requested_failed",
          "at": "2026-06-23T06:20:38.568Z",
          "phoneMasked": "+998****6767",
          "errorCode": "auth/invalid-app-credential",
          "errorMessage": "Firebase: Error (auth/invalid-app-credential)."
        },
        "eventCount": 2,
        "eventsPreview": [
          {
            "type": "recaptcha_rendered",
            "at": "2026-06-23T06:20:05.849Z"
          },
          {
            "type": "sms_requested_failed",
            "at": "2026-06-23T06:20:38.568Z",
            "phoneMasked": "+998****6767",
            "errorCode": "auth/invalid-app-credential",
            "errorMessage": "Firebase: Error (auth/invalid-app-credential)."
          }
        ]
      }
    },
    {
      "name": "246m_fix2_no_full_phone_number_printed_in_report",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix2_no_api_key_or_verification_id_printed_in_report",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix2_official_site_still_live",
      "passed": true,
      "details": {
        "name": "live_https_root_readonly",
        "command": "$u=\"https://sabiai.app/\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "STATUS=200",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246m_fix2_no_firebase_user_deletion_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix2_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix2_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix2_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix2_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix2_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix2_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [
    "246m_fix2_live_sms_requested_by_web_recaptcha_flow"
  ],
  "warnings": [
    "firebase_auth_sms_project_is_suffix_project_while_cloud_run_site_project_is_sabi_official_prod",
    "sms_not_confirmed_requested_by_web_recaptcha_flow",
    "do_not_share_sms_code_in_chat"
  ],
  "nextStep": "246M_FIX3_review_web_recaptcha_sms_failure_or_browser_error",
  "exactApprovalForNext": "I approve RELEASE-246M-FIX3 review Firebase Web reCAPTCHA Phone Auth live SMS failure and fix only, no Firebase user deletion, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease246MFix2Report;
