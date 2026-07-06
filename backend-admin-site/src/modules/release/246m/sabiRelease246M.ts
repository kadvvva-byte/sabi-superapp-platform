import type { SabiRelease246MReport } from './sabiRelease246M.types';

export const sabiRelease246MReport: SabiRelease246MReport = {
  "version": "SABI-RELEASE-246M-FIRST-LIVE-FIREBASE-PHONE-AUTH-SMS-TEST-MASKED",
  "status": "failed",
  "createdAt": "2026-06-23T05:52:59.329Z",
  "approval": "Owner provided real test phone number for RELEASE-246M after approving first live Firebase Phone Auth SMS test, accepting Firebase SMS charges, no Firebase user deletion, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout.",
  "firebaseProjectId": "sabi-official-prod-37629",
  "officialSiteProjectId": "sabi-official-prod",
  "scope": "first_live_firebase_phone_auth_sms_test_masked_no_user_deletion_no_wallet",
  "phone": {
    "e164Valid": true,
    "masked": "+998****6767",
    "fullPhonePrintedInReport": false
  },
  "apiKeyInfo": {
    "ok": true,
    "source": "../superapp-mobile/google-services.json",
    "projectId": "sabi-official-prod-37629",
    "apiKeyPresent": true,
    "apiKeyPrinted": false
  },
  "configSummary": {
    "source": ".data/release/246l-fix1/246l-fix1-report.json",
    "phoneProviderEnabled": true,
    "smsPolicyMode": "allowByDefault",
    "billingKnownReady": true,
    "mobileKnownReady": true
  },
  "smsRequest": {
    "skipped": false,
    "ok": false,
    "statusCode": 400,
    "textPreview": "{\n  \"error\": {\n    \"code\": 400,\n    \"message\": \"MISSING_CLIENT_IDENTIFIER\",\n    \"errors\": [\n      {\n        \"message\": \"MISSING_CLIENT_IDENTIFIER\",\n        \"domain\": \"global\",\n        \"reason\": \"invalid\"\n      }\n    ]\n  }\n}\n",
    "sessionInfoReturned": false,
    "sessionInfoPrinted": false,
    "appVerifierBlocked": true
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
    }
  },
  "readiness": {
    "realPhoneNumberReadiness": 100,
    "firebaseProjectVisibleReadiness": 100,
    "billingEnabledReadiness": 100,
    "identityToolkitApiEnabledReadiness": 100,
    "apiKeyReadiness": 100,
    "previousPhoneProviderReadiness": 100,
    "previousGlobalSmsPolicyReadiness": 100,
    "firstLiveSmsRequestReadiness": 0,
    "appVerifierReadiness": 0,
    "officialWebsiteReadiness": 100,
    "noFullPhonePrintReadiness": 100,
    "noSecretOrApiKeyPrintReadiness": 100,
    "release246MReadiness": 0,
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
    "fullPhoneNumberMaskedInReport": true,
    "sessionInfoNotPrinted": true,
    "apiKeyValueNotPrinted": true,
    "noFirebaseUserDeletionNow": true,
    "noDnsMutationNow": true,
    "noGooglePayOrBillingNow": true,
    "noWalletPaymentPayoutNow": true,
    "noDbMutationNow": true,
    "noSecretManagerReadWriteNow": true,
    "noEnvReadWriteNow": true
  },
  "checksPassed": 17,
  "checksTotal": 19,
  "checks": [
    {
      "name": "246m_real_phone_number_e164_valid",
      "passed": true,
      "details": {
        "phoneMasked": "+998****6767"
      }
    },
    {
      "name": "246m_firebase_project_visible",
      "passed": true,
      "details": {
        "firebaseProjectId": "sabi-official-prod-37629"
      }
    },
    {
      "name": "246m_billing_enabled",
      "passed": true,
      "details": {
        "firebaseProjectId": "sabi-official-prod-37629"
      }
    },
    {
      "name": "246m_identitytoolkit_api_enabled",
      "passed": true,
      "details": {
        "list": "projects/970072647981/services/identitytoolkit.googleapis.com"
      }
    },
    {
      "name": "246m_api_key_available_without_printing_value",
      "passed": true,
      "details": {
        "source": "../superapp-mobile/google-services.json",
        "projectId": "sabi-official-prod-37629",
        "apiKeyPresent": true,
        "apiKeyPrinted": false
      }
    },
    {
      "name": "246m_previous_phone_provider_ready",
      "passed": true,
      "details": {
        "source": ".data/release/246l-fix1/246l-fix1-report.json",
        "phoneProviderEnabled": true,
        "smsPolicyMode": "allowByDefault",
        "billingKnownReady": true,
        "mobileKnownReady": true
      }
    },
    {
      "name": "246m_previous_global_sms_policy_ready",
      "passed": true,
      "details": {
        "source": ".data/release/246l-fix1/246l-fix1-report.json",
        "phoneProviderEnabled": true,
        "smsPolicyMode": "allowByDefault",
        "billingKnownReady": true,
        "mobileKnownReady": true
      }
    },
    {
      "name": "246m_first_live_sms_request_returned_session_info",
      "passed": false,
      "details": {
        "skipped": false,
        "ok": false,
        "statusCode": 400,
        "textPreview": "{\n  \"error\": {\n    \"code\": 400,\n    \"message\": \"MISSING_CLIENT_IDENTIFIER\",\n    \"errors\": [\n      {\n        \"message\": \"MISSING_CLIENT_IDENTIFIER\",\n        \"domain\": \"global\",\n        \"reason\": \"invalid\"\n      }\n    ]\n  }\n}\n",
        "sessionInfoReturned": false,
        "sessionInfoPrinted": false,
        "appVerifierBlocked": true
      }
    },
    {
      "name": "246m_app_verifier_not_blocking",
      "passed": false,
      "details": {
        "appVerifierBlocked": true
      }
    },
    {
      "name": "246m_official_site_still_live",
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
      "name": "246m_no_full_phone_number_printed_in_report",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_no_api_key_or_session_info_printed_in_report",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_no_firebase_user_deletion_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246m_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [
    "246m_first_live_sms_request_returned_session_info",
    "246m_app_verifier_not_blocking"
  ],
  "warnings": [
    "firebase_blocked_live_sms_request_by_app_verifier_recaptcha_or_play_integrity_required",
    "sms_not_confirmed_sent_no_session_info_returned",
    "do_not_share_sms_code_in_chat"
  ],
  "nextStep": "246M_FIX1_run_live_sms_through_mobile_or_web_recaptcha_app_verifier_flow",
  "exactApprovalForNext": "I approve RELEASE-246M-FIX1 configure app verifier flow for Firebase Phone Auth live SMS test only, no Firebase user deletion, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease246MReport;
