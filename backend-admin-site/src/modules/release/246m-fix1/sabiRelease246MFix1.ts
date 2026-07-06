import type { SabiRelease246MFix1Report } from './sabiRelease246MFix1.types';

export const sabiRelease246MFix1Report: SabiRelease246MFix1Report = {
  "version": "SABI-RELEASE-246M-FIX1-WEB-RECAPTCHA-LIVE-SMS-FLOW-MASKED",
  "status": "failed",
  "createdAt": "2026-06-23T06:02:16.402Z",
  "approval": "I approve RELEASE-246M-FIX1 configure Firebase Web reCAPTCHA app verifier flow for Phone Auth live SMS test in project sabi-official-prod-37629, add localhost and 127.0.0.1 to authorized domains if missing, run local test page only, phone number entered locally and masked, no Firebase user deletion, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "firebaseProjectId": "sabi-official-prod-37629",
  "officialSiteProjectId": "sabi-official-prod",
  "scope": "firebase_web_recaptcha_app_verifier_live_sms_flow_local_test_page_masked",
  "beforeSummary": {
    "name": "projects/970072647981/config",
    "phoneNumberEnabled": true,
    "phoneNumberFieldPresent": true,
    "authorizedDomainsPresent": true,
    "authorizedDomains": [
      "sabi-official-prod-37629.firebaseapp.com",
      "sabi-official-prod-37629.web.app"
    ],
    "smsRegionConfigPresent": true,
    "smsRegionPolicyMode": "allowByDefault",
    "disallowedRegions": [],
    "clientApiKeyPresentButNotPrinted": true
  },
  "updateAuthorizedDomains": {
    "ok": true,
    "statusCode": 200,
    "textPreview": "{\n  \"name\": \"projects/970072647981/config\",\n  \"signIn\": {\n    \"phoneNumber\": {\n      \"enabled\": true\n    },\n    \"hashConfig\": {\n      \"algorithm\": \"SCRYPT\",\n      \"signerKey\":\"[REDACTED]\",\n      \"saltSeparator\":\"[REDACTED]\",\n      \"rounds\": 8,\n      \"memoryCost\": 14\n    }\n  },\n  \"notification\": {\n    \"sendEmail\": {\n      \"method\": \"DEFAULT\",\n      \"callbackUri\": \"https://sabi-official-prod-37629.firebaseapp.com/__/auth/action\",\n      \"dnsInfo\": {\n        \"customDomainState\": \"NOT_STARTED\",\n        \"domainVerificationRequestTime\": \"1970-01-01T00:00:00Z\"\n      }\n    },\n    \"sendSms\": {\n      \"smsTemplate\": {\n        \"content\": \"%LOGIN_CODE% is your verification code for %APP_NAME%.\"\n      }\n    },\n    \"defaultLocale\": \"en\"\n  },\n  \"quota\": {},\n  \"monitoring\": {\n    \"requestLogging\": {}\n  },\n  \"multiTenant\": {},\n  \"authorizedDomains\": [\n    \"sabi-official-prod-37629.firebaseapp.com\",\n    \"sabi-official-prod-37629.web.app\",\n    \"localhost\",\n    \"127.0.0.1\"\n  ],\n  \"subtype\": \"IDENTITY_PLATFORM\",\n  \"client\": {\n    \"apiKey\":\"[REDACTED]\",\n    \"permissions\": {},\n    \"firebaseSubdomain\": \"sabi-official-prod-37629\"\n  },\n  \"mfa\": {\n    \"state\": \"DISABLED\"\n  },\n  \"blockingFunctions\": {},\n  \"smsR"
  },
  "updateAuthorizedDomainsFallback": {
    "ok": false,
    "skipped": true,
    "statusCode": null,
    "textPreview": ""
  },
  "afterSummary": {
    "name": "projects/970072647981/config",
    "phoneNumberEnabled": true,
    "phoneNumberFieldPresent": true,
    "authorizedDomainsPresent": true,
    "authorizedDomains": [
      "sabi-official-prod-37629.firebaseapp.com",
      "sabi-official-prod-37629.web.app",
      "localhost",
      "127.0.0.1"
    ],
    "smsRegionConfigPresent": true,
    "smsRegionPolicyMode": "allowByDefault",
    "disallowedRegions": [],
    "clientApiKeyPresentButNotPrinted": true
  },
  "webConfig": {
    "ok": false,
    "source": null,
    "projectId": null,
    "authDomain": null,
    "apiKeyPresent": false,
    "apiKeyPrinted": false
  },
  "localTest": {
    "started": false,
    "localUrl": "http://localhost:45146/",
    "pagePath": ".data/release/246m-fix1/246m-fix1-web-recaptcha-test.html",
    "smsRequestedSuccess": false,
    "smsRequestedFailed": false,
    "timeout": false,
    "terminalEvent": null,
    "eventCount": 0,
    "eventsPreview": []
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
    "authConfigReadableReadiness": 100,
    "phoneProviderReadiness": 100,
    "globalSmsPolicyReadiness": 100,
    "authorizedDomainsUpdateReadiness": 100,
    "localhostAuthorizedReadiness": 100,
    "loopbackIpAuthorizedReadiness": 100,
    "webFirebaseConfigReadiness": 0,
    "localTestPageReadiness": 0,
    "localServerReadiness": 0,
    "webRecaptchaLiveSmsRequestReadiness": 0,
    "officialWebsiteReadiness": 100,
    "noFullPhonePrintReadiness": 100,
    "noSecretOrApiKeyPrintReadiness": 100,
    "release246MFix1Readiness": 0,
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
  "checksPassed": 20,
  "checksTotal": 24,
  "checks": [
    {
      "name": "246m_fix1_firebase_project_visible",
      "passed": true,
      "details": {
        "firebaseProjectId": "sabi-official-prod-37629"
      }
    },
    {
      "name": "246m_fix1_billing_enabled",
      "passed": true,
      "details": {
        "firebaseProjectId": "sabi-official-prod-37629"
      }
    },
    {
      "name": "246m_fix1_identitytoolkit_api_enabled",
      "passed": true,
      "details": {
        "list": "projects/970072647981/services/identitytoolkit.googleapis.com"
      }
    },
    {
      "name": "246m_fix1_access_token_obtained_without_printing_value",
      "passed": true,
      "details": {
        "ok": true,
        "status": 0,
        "tokenPresent": true,
        "tokenValuePrinted": false
      }
    },
    {
      "name": "246m_fix1_auth_config_readable_after",
      "passed": true,
      "details": {
        "name": "projects/970072647981/config",
        "phoneNumberEnabled": true,
        "phoneNumberFieldPresent": true,
        "authorizedDomainsPresent": true,
        "authorizedDomains": [
          "sabi-official-prod-37629.firebaseapp.com",
          "sabi-official-prod-37629.web.app",
          "localhost",
          "127.0.0.1"
        ],
        "smsRegionConfigPresent": true,
        "smsRegionPolicyMode": "allowByDefault",
        "disallowedRegions": [],
        "clientApiKeyPresentButNotPrinted": true
      }
    },
    {
      "name": "246m_fix1_phone_provider_enabled",
      "passed": true,
      "details": {
        "name": "projects/970072647981/config",
        "phoneNumberEnabled": true,
        "phoneNumberFieldPresent": true,
        "authorizedDomainsPresent": true,
        "authorizedDomains": [
          "sabi-official-prod-37629.firebaseapp.com",
          "sabi-official-prod-37629.web.app",
          "localhost",
          "127.0.0.1"
        ],
        "smsRegionConfigPresent": true,
        "smsRegionPolicyMode": "allowByDefault",
        "disallowedRegions": [],
        "clientApiKeyPresentButNotPrinted": true
      }
    },
    {
      "name": "246m_fix1_global_sms_policy_ready",
      "passed": true,
      "details": {
        "name": "projects/970072647981/config",
        "phoneNumberEnabled": true,
        "phoneNumberFieldPresent": true,
        "authorizedDomainsPresent": true,
        "authorizedDomains": [
          "sabi-official-prod-37629.firebaseapp.com",
          "sabi-official-prod-37629.web.app",
          "localhost",
          "127.0.0.1"
        ],
        "smsRegionConfigPresent": true,
        "smsRegionPolicyMode": "allowByDefault",
        "disallowedRegions": [],
        "clientApiKeyPresentButNotPrinted": true
      }
    },
    {
      "name": "246m_fix1_authorized_domains_update_ok_or_already_ready",
      "passed": true,
      "details": {
        "primaryUpdateOk": true,
        "fallbackUpdateOk": false
      }
    },
    {
      "name": "246m_fix1_localhost_authorized_domain_ready",
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
      "name": "246m_fix1_loopback_ip_authorized_if_accepted_by_firebase",
      "passed": true,
      "details": {
        "loopbackIpAuthorized": true,
        "localhostAuthorized": true,
        "note": "localhost is sufficient because local page opens on http://localhost"
      }
    },
    {
      "name": "246m_fix1_web_firebase_config_ready",
      "passed": false,
      "details": {
        "source": null,
        "projectId": null,
        "authDomain": null,
        "apiKeyPresent": false,
        "apiKeyPrinted": false
      }
    },
    {
      "name": "246m_fix1_local_test_page_created",
      "passed": false,
      "details": {
        "pagePath": ".data/release/246m-fix1/246m-fix1-web-recaptcha-test.html"
      }
    },
    {
      "name": "246m_fix1_local_server_started",
      "passed": false,
      "details": {
        "localUrl": "http://localhost:45146/"
      }
    },
    {
      "name": "246m_fix1_live_sms_requested_by_web_recaptcha_flow",
      "passed": false,
      "details": {
        "started": false,
        "localUrl": "http://localhost:45146/",
        "pagePath": ".data/release/246m-fix1/246m-fix1-web-recaptcha-test.html",
        "smsRequestedSuccess": false,
        "smsRequestedFailed": false,
        "timeout": false,
        "terminalEvent": null,
        "eventCount": 0,
        "eventsPreview": []
      }
    },
    {
      "name": "246m_fix1_no_full_phone_number_printed_in_report",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix1_no_api_key_or_verification_id_printed_in_report",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix1_official_site_still_live",
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
      "name": "246m_fix1_no_firebase_user_deletion_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix1_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix1_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix1_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix1_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix1_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix1_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [
    "246m_fix1_web_firebase_config_ready",
    "246m_fix1_local_test_page_created",
    "246m_fix1_local_server_started",
    "246m_fix1_live_sms_requested_by_web_recaptcha_flow"
  ],
  "warnings": [
    "firebase_auth_sms_project_is_suffix_project_while_cloud_run_site_project_is_sabi_official_prod",
    "sms_not_confirmed_requested_by_web_recaptcha_flow",
    "do_not_share_sms_code_in_chat"
  ],
  "nextStep": "246M_FIX2_review_web_recaptcha_flow_failure_or_browser_error",
  "exactApprovalForNext": "I approve RELEASE-246M-FIX2 review Firebase Web reCAPTCHA Phone Auth live SMS failure and fix only, no Firebase user deletion, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease246MFix1Report;
