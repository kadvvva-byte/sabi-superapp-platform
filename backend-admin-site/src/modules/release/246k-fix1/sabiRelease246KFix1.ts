import type { SabiRelease246KFix1Report } from './sabiRelease246KFix1.types';

export const sabiRelease246KFix1Report: SabiRelease246KFix1Report = {
  "version": "SABI-RELEASE-246K-FIX1-PHONE-PROVIDER-QUOTA-HEADER-NO-LIVE-SMS",
  "status": "failed",
  "createdAt": "2026-06-23T05:11:35.403Z",
  "approvalInherited": "Inherited from RELEASE-246K owner approval: enable and verify Firebase Authentication Phone provider readiness in project sabi-official-prod-37629 only, no live SMS, no Firebase user creation, no phone auth live test, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout.",
  "firebaseProjectId": "sabi-official-prod-37629",
  "officialSiteProjectId": "sabi-official-prod",
  "scope": "fix_identitytoolkit_quota_project_header_enable_verify_phone_provider_no_live_sms",
  "beforeSummary": {
    "name": null,
    "phoneNumberEnabled": false,
    "phoneNumberFieldPresent": false,
    "authorizedDomainsPresent": false,
    "authorizedDomains": [],
    "smsRegionConfigPresent": false,
    "smsRegionPolicyMode": "not_configured",
    "clientApiKeyPresentButNotPrinted": false
  },
  "initializeAuth": {
    "ok": false,
    "skipped": false,
    "statusCode": 400,
    "textPreview": "{\n  \"error\": {\n    \"code\": 400,\n    \"message\": \"BILLING_NOT_ENABLED : Identity Platform feature requires billing to be enabled.\",\n    \"status\": \"FAILED_PRECONDITION\"\n  }\n}\n"
  },
  "updateConfig": {
    "ok": false,
    "statusCode": 404,
    "textPreview": "{\n  \"error\": {\n    \"code\": 404,\n    \"message\": \"CONFIGURATION_NOT_FOUND\",\n    \"status\": \"NOT_FOUND\"\n  }\n}\n"
  },
  "updateFallback": {
    "ok": false,
    "skipped": false,
    "statusCode": 404,
    "textPreview": "{\n  \"error\": {\n    \"code\": 404,\n    \"message\": \"CONFIGURATION_NOT_FOUND\",\n    \"status\": \"NOT_FOUND\"\n  }\n}\n"
  },
  "afterSummary": {
    "name": null,
    "phoneNumberEnabled": false,
    "phoneNumberFieldPresent": false,
    "authorizedDomainsPresent": false,
    "authorizedDomains": [],
    "smsRegionConfigPresent": false,
    "smsRegionPolicyMode": "not_configured",
    "clientApiKeyPresentButNotPrinted": false
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
    "firebaseVersion": {
      "name": "firebase_cli_version",
      "command": "firebase --version 2>$null",
      "status": 0,
      "stdout": "15.22.1",
      "stderr": "",
      "ok": true
    },
    "firebaseProjectsList": {
      "name": "firebase_projects_list_readonly",
      "command": "firebase projects:list --json 2>$null",
      "status": 0,
      "stdout": "{\n  \"status\": \"success\",\n  \"result\": [\n    {\n      \"projectId\": \"sabi-official-prod-37629\",\n      \"projectNumber\": \"970072647981\",\n      \"displayName\": \"sabi-official-prod\",\n      \"name\": \"projects/sabi-official-prod-37629\",\n      \"resources\": {\n        \"hostingSite\": \"sabi-official-prod-37629\"\n      },\n      \"state\": \"ACTIVE\",\n      \"etag\": \"1_207a3deb-f255-447d-a049-929c85746b69\"\n    }\n  ]\n}",
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
    "adcQuotaProjectSetLocalOnly": {
      "name": "adc_quota_project_set_local_only",
      "command": "gcloud auth application-default set-quota-project sabi-official-prod-37629 --quiet 2>$null",
      "status": 1,
      "stdout": "",
      "stderr": "",
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
      "ok": true,
      "status": 0,
      "tokenPresent": true,
      "tokenValuePrinted": false
    }
  },
  "readiness": {
    "firebaseProjectVisibleReadiness": 100,
    "identityToolkitApiEnabledReadiness": 100,
    "accessTokenReadiness": 100,
    "quotaHeaderReadiness": 100,
    "authConfigReadableReadiness": 0,
    "phoneProviderUpdateReadiness": 0,
    "phoneProviderEnabledReadiness": 0,
    "officialWebsiteReadiness": 100,
    "noSecretOrApiKeyPrintReadiness": 100,
    "release246KFix1Readiness": 0,
    "liveSmsSentNow": 0,
    "firebaseUserCreationNow": 0,
    "phoneAuthLiveTestNow": 0,
    "dnsMutationNow": 0,
    "googlePayBillingNow": 0,
    "walletPaymentPayoutNow": 0,
    "dbMutationNow": 0,
    "secretManagerReadWriteNow": 0,
    "envReadWriteNow": 0
  },
  "safety": {
    "ownerApprovalCapturedFrom246K": true,
    "phoneProviderActivationOnly": true,
    "quotaHeaderUsed": true,
    "noLiveSmsSentNow": true,
    "noFirebaseUserCreationNow": true,
    "noPhoneAuthLiveTestNow": true,
    "noDnsMutationNow": true,
    "noGooglePayOrBillingNow": true,
    "noWalletPaymentPayoutNow": true,
    "noDbMutationNow": true,
    "noSecretManagerReadWriteNow": true,
    "noEnvReadWriteNow": true,
    "accessTokenValueNotPrinted": true,
    "apiKeyValueNotPrinted": true,
    "exactOwnerApprovalRequiredBeforeFirstLiveSms": true
  },
  "checksPassed": 15,
  "checksTotal": 18,
  "checks": [
    {
      "name": "246k_fix1_firebase_project_visible",
      "passed": true,
      "details": {
        "firebaseProjectId": "sabi-official-prod-37629"
      }
    },
    {
      "name": "246k_fix1_identitytoolkit_api_enabled",
      "passed": true,
      "details": {
        "list": "projects/970072647981/services/identitytoolkit.googleapis.com"
      }
    },
    {
      "name": "246k_fix1_access_token_obtained_without_printing_value",
      "passed": true,
      "details": {
        "ok": true,
        "status": 0,
        "tokenPresent": true,
        "tokenValuePrinted": false
      }
    },
    {
      "name": "246k_fix1_quota_header_used_for_identitytoolkit_requests",
      "passed": true,
      "details": {
        "header": "X-Goog-User-Project",
        "project": "sabi-official-prod-37629"
      }
    },
    {
      "name": "246k_fix1_auth_config_readable_after",
      "passed": false,
      "details": {
        "name": null,
        "phoneNumberEnabled": false,
        "phoneNumberFieldPresent": false,
        "authorizedDomainsPresent": false,
        "authorizedDomains": [],
        "smsRegionConfigPresent": false,
        "smsRegionPolicyMode": "not_configured",
        "clientApiKeyPresentButNotPrinted": false
      }
    },
    {
      "name": "246k_fix1_phone_provider_update_ok_or_already_enabled",
      "passed": false,
      "details": {
        "primaryUpdateOk": false,
        "fallbackUpdateOk": false,
        "phoneProviderEnabled": false
      }
    },
    {
      "name": "246k_fix1_phone_provider_enabled_after",
      "passed": false,
      "details": {
        "name": null,
        "phoneNumberEnabled": false,
        "phoneNumberFieldPresent": false,
        "authorizedDomainsPresent": false,
        "authorizedDomains": [],
        "smsRegionConfigPresent": false,
        "smsRegionPolicyMode": "not_configured",
        "clientApiKeyPresentButNotPrinted": false
      }
    },
    {
      "name": "246k_fix1_official_site_still_live",
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
      "name": "246k_fix1_no_api_key_or_secret_value_printed_in_report",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix1_no_live_sms_sent_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix1_no_firebase_user_creation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix1_no_phone_auth_live_test_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix1_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix1_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix1_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix1_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix1_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix1_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [
    "246k_fix1_auth_config_readable_after",
    "246k_fix1_phone_provider_update_ok_or_already_enabled",
    "246k_fix1_phone_provider_enabled_after"
  ],
  "warnings": [
    "firebase_auth_sms_project_is_suffix_project_while_cloud_run_site_project_is_sabi_official_prod",
    "sms_region_policy_not_configured_yet_next_step_should_lock_regions_before_live_sms"
  ],
  "nextStep": "246K_FIX2_manual_console_phone_provider_enable_or_billing_quota_review_required",
  "exactApprovalForNext": "I approve RELEASE-246L configure Firebase Auth SMS region policy for project sabi-official-prod-37629 and verify no-live-SMS runtime readiness only, no live SMS, no Firebase user creation, no phone auth live test, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease246KFix1Report;
