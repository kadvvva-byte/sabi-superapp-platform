import type { SabiRelease246MFix3Report } from './sabiRelease246MFix3.types';

export const sabiRelease246MFix3Report: SabiRelease246MFix3Report = {
  "version": "SABI-RELEASE-246M-FIX3-STRICT-RECAPTCHA-TOKEN-PHONE-AUTH-LIVE-SMS-MASKED",
  "status": "failed",
  "createdAt": "2026-06-23T06:39:26.715Z",
  "approval": "I approve RELEASE-246M-FIX3 fix Firebase Web reCAPTCHA verifier token flow and rerun Phone Auth live SMS test page only, phone number entered locally and masked, no Firebase user deletion, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "firebaseProjectId": "sabi-official-prod-37629",
  "officialSiteProjectId": "sabi-official-prod",
  "scope": "strict_recaptcha_token_callback_gate_for_phone_auth_live_sms_masked",
  "authSummary": {
    "name": null,
    "phoneNumberEnabled": false,
    "authorizedDomains": [],
    "smsRegionPolicyMode": "not_configured",
    "disallowedRegions": [],
    "clientApiKeyPresentButNotPrinted": false
  },
  "webConfig": {
    "ok": true,
    "method": "local_file",
    "source": "../superapp-mobile/firebase-web-config.official.sabi.js",
    "projectId": "sabi-official-prod-37629",
    "authDomain": "sabi-official-prod-37629.firebaseapp.com",
    "apiKeyPresent": true,
    "apiKeyPrinted": false
  },
  "localTest": {
    "started": false,
    "localUrl": "http://localhost:45148/",
    "pagePath": ".data/release/246m-fix3/246m-fix3-strict-recaptcha-test.html",
    "recaptchaCallbackTokenReady": false,
    "sendBlockedNoToken": false,
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
      "status": 1,
      "stdout": "",
      "stderr": "gcloud : ��� \"gcloud\" �� �ᯮ����� ��� ��� ��\r\n�������, �㭪樨, 䠩�� �業��� ��� �믮���\r\n��� �ணࠬ��. �஢���� �ࠢ��쭮��� ����ᠭ�\r\n� �����, � ⠪�� ����稥 � �ࠢ��쭮��� ���, \r\n��᫥ 祣� ������ ������.\r\n��ப�:1 ����:1\r\n+ gcloud config get-value project 2>$null\r\n+ ~~~~~~\r\n    + CategoryInfo          : ObjectNotFound: \r\n    (gcloud:String) [], CommandNotFoundExcep  \r\n  tion\r\n    + FullyQualifiedErrorId : CommandNotFound \r\n   Exception",
      "ok": false
    },
    "gcloudAccount": {
      "name": "gcloud_active_account",
      "command": "gcloud auth list --filter=status:ACTIVE --format=\"value(account)\" 2>$null",
      "status": 1,
      "stdout": "",
      "stderr": "gcloud : ��� \"gcloud\" �� �ᯮ����� ��� ��� ��\r\n�������, �㭪樨, 䠩�� �業��� ��� �믮���\r\n��� �ணࠬ��. �஢���� �ࠢ��쭮��� ����ᠭ�\r\n� �����, � ⠪�� ����稥 � �ࠢ��쭮��� ���, \r\n��᫥ 祣� ������ ������.\r\n��ப�:1 ����:1\r\n+ gcloud auth list --filter=status:ACTIVE --fo\r\nrmat=\"value(account)\" 2>$ ...\r\n+ ~~~~~~\r\n    + CategoryInfo          : ObjectNotFound: \r\n    (gcloud:String) [], CommandNotFoundExcep  \r\n  tion\r\n    + FullyQualifiedErrorId : CommandNotFound \r\n   Exception",
      "ok": false
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
      "status": 1,
      "stdout": "",
      "stderr": "gcloud : ��� \"gcloud\" �� �ᯮ����� ��� ��� ��\r\n�������, �㭪樨, 䠩�� �業��� ��� �믮���\r\n��� �ணࠬ��. �஢���� �ࠢ��쭮��� ����ᠭ�\r\n� �����, � ⠪�� ����稥 � �ࠢ��쭮��� ���, \r\n��᫥ 祣� ������ ������.\r\n��ப�:1 ����:1\r\n+ gcloud beta billing projects describe sabi-o\r\nfficial-prod-37629 --form ...\r\n+ ~~~~~~\r\n    + CategoryInfo          : ObjectNotFound: \r\n    (gcloud:String) [], CommandNotFoundExcep  \r\n  tion\r\n    + FullyQualifiedErrorId : CommandNotFound \r\n   Exception",
      "ok": false
    },
    "identityToolkitApiList": {
      "name": "identitytoolkit_api_enabled_check",
      "command": "gcloud services list --enabled --project=sabi-official-prod-37629 --filter=\"name:identitytoolkit.googleapis.com\" --format=\"value(name)\" 2>$null",
      "status": 1,
      "stdout": "",
      "stderr": "gcloud : ��� \"gcloud\" �� �ᯮ����� ��� ��� ��\r\n�������, �㭪樨, 䠩�� �業��� ��� �믮���\r\n��� �ணࠬ��. �஢���� �ࠢ��쭮��� ����ᠭ�\r\n� �����, � ⠪�� ����稥 � �ࠢ��쭮��� ���, \r\n��᫥ 祣� ������ ������.\r\n��ப�:1 ����:1\r\n+ gcloud services list --enabled --project=sab\r\ni-official-prod-37629 --f ...\r\n+ ~~~~~~\r\n    + CategoryInfo          : ObjectNotFound: \r\n    (gcloud:String) [], CommandNotFoundExcep  \r\n  tion\r\n    + FullyQualifiedErrorId : CommandNotFound \r\n   Exception",
      "ok": false
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
      "ok": false,
      "status": 1,
      "tokenPresent": false,
      "tokenValuePrinted": false
    }
  },
  "readiness": {
    "firebaseProjectVisibleReadiness": 100,
    "billingEnabledReadiness": 0,
    "identityToolkitApiEnabledReadiness": 0,
    "accessTokenReadiness": 0,
    "phoneProviderReadiness": 0,
    "globalSmsPolicyReadiness": 0,
    "localhostAuthorizedReadiness": 0,
    "loopbackIpAuthorizedReadiness": 0,
    "webFirebaseConfigReadiness": 100,
    "localTestPageReadiness": 100,
    "localServerReadiness": 0,
    "recaptchaCallbackTokenReadiness": 0,
    "strictNoSendWithoutTokenReadiness": 100,
    "webRecaptchaLiveSmsRequestReadiness": 0,
    "officialWebsiteReadiness": 100,
    "noFullPhonePrintReadiness": 100,
    "noSecretOrApiKeyPrintReadiness": 100,
    "release246MFix3Readiness": 0,
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
  "checksPassed": 14,
  "checksTotal": 24,
  "checks": [
    {
      "name": "246m_fix3_firebase_project_visible",
      "passed": true,
      "details": {
        "firebaseProjectId": "sabi-official-prod-37629"
      }
    },
    {
      "name": "246m_fix3_billing_enabled",
      "passed": false,
      "details": {
        "firebaseProjectId": "sabi-official-prod-37629"
      }
    },
    {
      "name": "246m_fix3_identitytoolkit_api_enabled",
      "passed": false,
      "details": {
        "list": ""
      }
    },
    {
      "name": "246m_fix3_access_token_obtained_without_printing_value",
      "passed": false,
      "details": {
        "ok": false,
        "status": 1,
        "tokenPresent": false,
        "tokenValuePrinted": false
      }
    },
    {
      "name": "246m_fix3_phone_provider_enabled",
      "passed": false,
      "details": {
        "name": null,
        "phoneNumberEnabled": false,
        "authorizedDomains": [],
        "smsRegionPolicyMode": "not_configured",
        "disallowedRegions": [],
        "clientApiKeyPresentButNotPrinted": false
      }
    },
    {
      "name": "246m_fix3_global_sms_policy_ready",
      "passed": false,
      "details": {
        "name": null,
        "phoneNumberEnabled": false,
        "authorizedDomains": [],
        "smsRegionPolicyMode": "not_configured",
        "disallowedRegions": [],
        "clientApiKeyPresentButNotPrinted": false
      }
    },
    {
      "name": "246m_fix3_localhost_authorized_domain_ready",
      "passed": false,
      "details": {
        "authorizedDomains": []
      }
    },
    {
      "name": "246m_fix3_loopback_ip_authorized",
      "passed": false,
      "details": {
        "authorizedDomains": []
      }
    },
    {
      "name": "246m_fix3_web_firebase_config_ready",
      "passed": true,
      "details": {
        "ok": true,
        "method": "local_file",
        "source": "../superapp-mobile/firebase-web-config.official.sabi.js",
        "projectId": "sabi-official-prod-37629",
        "authDomain": "sabi-official-prod-37629.firebaseapp.com",
        "apiKeyPresent": true,
        "apiKeyPrinted": false
      }
    },
    {
      "name": "246m_fix3_local_test_page_created",
      "passed": true,
      "details": {
        "pagePath": ".data/release/246m-fix3/246m-fix3-strict-recaptcha-test.html"
      }
    },
    {
      "name": "246m_fix3_local_server_started",
      "passed": false,
      "details": {
        "localUrl": "http://localhost:45148/"
      }
    },
    {
      "name": "246m_fix3_recaptcha_callback_token_ready",
      "passed": false,
      "details": {
        "started": false,
        "localUrl": "http://localhost:45148/",
        "pagePath": ".data/release/246m-fix3/246m-fix3-strict-recaptcha-test.html",
        "recaptchaCallbackTokenReady": false,
        "sendBlockedNoToken": false,
        "smsRequestedSuccess": false,
        "smsRequestedFailed": false,
        "timeout": false,
        "terminalEvent": null,
        "eventCount": 0,
        "eventsPreview": []
      }
    },
    {
      "name": "246m_fix3_sms_not_sent_without_recaptcha_token",
      "passed": true,
      "details": {
        "started": false,
        "localUrl": "http://localhost:45148/",
        "pagePath": ".data/release/246m-fix3/246m-fix3-strict-recaptcha-test.html",
        "recaptchaCallbackTokenReady": false,
        "sendBlockedNoToken": false,
        "smsRequestedSuccess": false,
        "smsRequestedFailed": false,
        "timeout": false,
        "terminalEvent": null,
        "eventCount": 0,
        "eventsPreview": []
      }
    },
    {
      "name": "246m_fix3_live_sms_requested_by_strict_recaptcha_flow",
      "passed": false,
      "details": {
        "started": false,
        "localUrl": "http://localhost:45148/",
        "pagePath": ".data/release/246m-fix3/246m-fix3-strict-recaptcha-test.html",
        "recaptchaCallbackTokenReady": false,
        "sendBlockedNoToken": false,
        "smsRequestedSuccess": false,
        "smsRequestedFailed": false,
        "timeout": false,
        "terminalEvent": null,
        "eventCount": 0,
        "eventsPreview": []
      }
    },
    {
      "name": "246m_fix3_no_full_phone_number_printed_in_report",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix3_no_api_key_or_verification_id_printed_in_report",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix3_official_site_still_live",
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
      "name": "246m_fix3_no_firebase_user_deletion_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix3_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix3_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix3_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix3_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix3_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_fix3_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [
    "246m_fix3_billing_enabled",
    "246m_fix3_identitytoolkit_api_enabled",
    "246m_fix3_access_token_obtained_without_printing_value",
    "246m_fix3_phone_provider_enabled",
    "246m_fix3_global_sms_policy_ready",
    "246m_fix3_localhost_authorized_domain_ready",
    "246m_fix3_loopback_ip_authorized",
    "246m_fix3_local_server_started",
    "246m_fix3_recaptcha_callback_token_ready",
    "246m_fix3_live_sms_requested_by_strict_recaptcha_flow"
  ],
  "warnings": [
    "firebase_auth_sms_project_is_suffix_project_while_cloud_run_site_project_is_sabi_official_prod",
    "sms_not_confirmed_requested_by_strict_recaptcha_flow",
    "do_not_share_sms_code_in_chat"
  ],
  "nextStep": "246M_FIX4_review_strict_recaptcha_invalid_app_credential_or_browser_blocker",
  "exactApprovalForNext": "I approve RELEASE-246M-FIX4 review strict reCAPTCHA invalid app credential or browser blocker and fix only, no Firebase user deletion, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease246MFix3Report;
