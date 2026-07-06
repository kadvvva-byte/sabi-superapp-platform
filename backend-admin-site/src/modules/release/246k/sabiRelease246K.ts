import type { SabiRelease246KReport } from './sabiRelease246K.types';

export const sabiRelease246KReport: SabiRelease246KReport = {
  "version": "SABI-RELEASE-246K-ENABLE-VERIFY-FIREBASE-AUTH-PHONE-PROVIDER-NO-LIVE-SMS",
  "status": "failed",
  "createdAt": "2026-06-23T05:02:56.537Z",
  "approval": "I approve RELEASE-246K enable and verify Firebase Authentication Phone provider readiness in project sabi-official-prod-37629 only, no live SMS, no Firebase user creation, no phone auth live test, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "firebaseProjectId": "sabi-official-prod-37629",
  "officialSiteProjectId": "sabi-official-prod",
  "scope": "enable_verify_firebase_auth_phone_provider_readiness_no_live_sms_no_user_creation_no_phone_test",
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
    "skipped": true,
    "statusCode": null,
    "textPreview": ""
  },
  "updateConfig": {
    "ok": false,
    "statusCode": 403,
    "textPreview": "{\n  \"error\": {\n    \"code\": 403,\n    \"message\": \"Your application is authenticating by using local Application Default Credentials. The identitytoolkit.googleapis.com API requires a quota project, which is not set by default. To learn how to set your quota project, see https://cloud.google.com/docs/authentication/adc-troubleshooting/user-creds .\",\n    \"status\": \"PERMISSION_DENIED\",\n    \"details\": [\n      {\n        \"@type\": \"type.googleapis.com/google.rpc.ErrorInfo\",\n        \"reason\": \"SERVICE_DISABLED\",\n        \"domain\": \"googleapis.com\",\n        \"metadata\": {\n          \"service\": \"identitytoolkit.googleapis.com\",\n          \"consumer\": \"projects/32555940559\"\n        }\n      },\n      {\n        \"@type\": \"type.googleapis.com/google.rpc.LocalizedMessage\",\n        \"locale\": \"en-US\",\n        \"message\": \"Your application is authenticating by using local Application Default Credentials. The identitytoolkit.googleapis.com API requires a quota project, which is not set by default. To learn how to"
  },
  "updateFallback": {
    "ok": false,
    "skipped": false,
    "statusCode": 403,
    "textPreview": "{\n  \"error\": {\n    \"code\": 403,\n    \"message\": \"Your application is authenticating by using local Application Default Credentials. The identitytoolkit.googleapis.com API requires a quota project, which is not set by default. To learn how to set your quota project, see https://cloud.google.com/docs/authentication/adc-troubleshooting/user-creds .\",\n    \"status\": \"PERMISSION_DENIED\",\n    \"details\": [\n      {\n        \"@type\": \"type.googleapis.com/google.rpc.ErrorInfo\",\n        \"reason\": \"SERVICE_DISABLED\",\n        \"domain\": \"googleapis.com\",\n        \"metadata\": {\n          \"consumer\": \"projects/32555940559\",\n          \"service\": \"identitytoolkit.googleapis.com\"\n        }\n      },\n      {\n        \"@type\": \"type.googleapis.com/google.rpc.LocalizedMessage\",\n        \"locale\": \"en-US\",\n        \"message\": \"Your application is authenticating by using local Application Default Credentials. The identitytoolkit.googleapis.com API requires a quota project, which is not set by default. To learn how to"
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
    "identityToolkitApiEnable": {
      "name": "enable_identitytoolkit_api_for_firebase_project",
      "command": "gcloud services enable identitytoolkit.googleapis.com --project=sabi-official-prod-37629 --quiet",
      "status": 0,
      "stdout": "",
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
    "identityToolkitApiEnabledReadiness": 100,
    "accessTokenReadiness": 100,
    "authConfigReadableReadiness": 0,
    "phoneProviderUpdateReadiness": 0,
    "phoneProviderEnabledReadiness": 0,
    "officialWebsiteReadiness": 100,
    "noSecretOrApiKeyPrintReadiness": 100,
    "release246KReadiness": 0,
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
    "ownerApprovalCaptured": true,
    "phoneProviderActivationOnly": true,
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
    "configMayContainApiKeyButValueNotPrinted": true,
    "exactOwnerApprovalRequiredBeforeFirstLiveSms": true
  },
  "checksPassed": 14,
  "checksTotal": 17,
  "checks": [
    {
      "name": "246k_firebase_project_visible",
      "passed": true,
      "details": {
        "firebaseProjectId": "sabi-official-prod-37629"
      }
    },
    {
      "name": "246k_identitytoolkit_api_enabled",
      "passed": true,
      "details": {
        "enableOk": true,
        "list": "projects/970072647981/services/identitytoolkit.googleapis.com"
      }
    },
    {
      "name": "246k_access_token_obtained_without_printing_value",
      "passed": true,
      "details": {
        "ok": true,
        "status": 0,
        "tokenPresent": true,
        "tokenValuePrinted": false
      }
    },
    {
      "name": "246k_auth_config_readable_after",
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
      "name": "246k_phone_provider_update_ok_or_already_enabled",
      "passed": false,
      "details": {
        "primaryUpdateOk": false,
        "fallbackUpdateOk": false,
        "phoneProviderEnabled": false
      }
    },
    {
      "name": "246k_phone_provider_enabled_after",
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
      "name": "246k_official_site_still_live",
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
      "name": "246k_no_api_key_or_secret_value_printed_in_report",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_no_live_sms_sent_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_no_firebase_user_creation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_no_phone_auth_live_test_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [
    "246k_auth_config_readable_after",
    "246k_phone_provider_update_ok_or_already_enabled",
    "246k_phone_provider_enabled_after"
  ],
  "warnings": [
    "firebase_auth_sms_project_is_suffix_project_while_cloud_run_site_project_is_sabi_official_prod",
    "sms_region_policy_not_configured_yet_next_step_should_lock_regions_before_live_sms"
  ],
  "nextStep": "246K_FIX1_review_phone_provider_activation_failure",
  "exactApprovalForNext": "I approve RELEASE-246L configure Firebase Auth SMS region policy for project sabi-official-prod-37629 and verify no-live-SMS runtime readiness only, no live SMS, no Firebase user creation, no phone auth live test, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease246KReport;
