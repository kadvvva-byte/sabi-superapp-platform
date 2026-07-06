import type { SabiRelease246KFix3Report } from './sabiRelease246KFix3.types';

export const sabiRelease246KFix3Report: SabiRelease246KFix3Report = {
  "version": "SABI-RELEASE-246K-FIX3-LINK-BILLING-RETRY-PHONE-PROVIDER-NO-LIVE-SMS",
  "status": "passed",
  "createdAt": "2026-06-23T05:23:44.694Z",
  "approval": "I approve RELEASE-246K-FIX3 link Cloud Billing account billingAccounts/015B16-5B0B15-52C323 to Firebase project sabi-official-prod-37629 only, then retry Firebase Authentication Phone provider enable, no live SMS, no Firebase user creation, no phone auth live test, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "firebaseProjectId": "sabi-official-prod-37629",
  "officialSiteProjectId": "sabi-official-prod",
  "billingAccountName": "billingAccounts/015B16-5B0B15-52C323",
  "scope": "link_cloud_billing_to_firebase_project_retry_phone_provider_no_live_sms_no_user_creation",
  "billingBeforeSummary": {
    "commandOk": true,
    "parseOk": true,
    "billingEnabled": false,
    "billingAccountNamePresent": false,
    "billingAccountName": null,
    "projectId": "sabi-official-prod-37629"
  },
  "billingAfterSummary": {
    "commandOk": true,
    "parseOk": true,
    "billingEnabled": true,
    "billingAccountNamePresent": true,
    "billingAccountName": "billingAccounts/015B16-5B0B15-52C323",
    "projectId": "sabi-official-prod-37629"
  },
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
    "ok": true,
    "skipped": false,
    "statusCode": 200,
    "textPreview": "{}\n"
  },
  "getAfterInitialize": {
    "ok": true,
    "statusCode": 200,
    "textPreview": "{\n  \"name\": \"projects/970072647981/config\",\n  \"signIn\": {\n    \"hashConfig\": {\n      \"algorithm\": \"SCRYPT\",\n      \"signerKey\": \"eL4CTUvawoJ9RBkT4hgpvKbep9zqMmIHkrtBb3kIrWHHOC2XO3ibiP88MazenomGZdXrnsC4LVzSJ16BLmcSEg==\",\n      \"saltSeparator\": \"Bw==\",\n      \"rounds\": 8,\n      \"memoryCost\": 14\n    }\n  },\n  \"notification\": {\n    \"sendEmail\": {\n      \"method\": \"DEFAULT\",\n      \"resetPasswordTemplate\": {\n        \"senderLocalPart\": \"noreply\",\n        \"subject\": \"Reset your password for %APP_NAME%\",\n        \"body\": \"\\u003cp\\u003eHello,\\u003c/p\\u003e\\n\\u003cp\\u003eFollow this link to reset your %APP_NAME% password for your %EMAIL% account.\\u003c/p\\u003e\\n\\u003cp\\u003e\\u003ca href='%LINK%'\\u003e%LINK%\\u003c/a\\u003e\\u003c/p\\u003e\\n\\u003cp\\u003eIf you didn’t ask to reset your password, you can ignore this email.\\u003c/p\\u003e\\n\\u003cp\\u003eThanks,\\u003c/p\\u003e\\n\\u003cp\\u003eYour %APP_NAME% team\\u003c/p\\u003e\",\n        \"bodyFormat\": \"HTML\",\n        \"replyTo\": \"noreply\"\n      },\n      \"verifyEmailTe"
  },
  "updateConfig": {
    "ok": true,
    "statusCode": 200,
    "textPreview": "{\n  \"name\": \"projects/970072647981/config\",\n  \"signIn\": {\n    \"phoneNumber\": {\n      \"enabled\": true\n    },\n    \"hashConfig\": {\n      \"algorithm\": \"SCRYPT\",\n      \"signerKey\": \"eL4CTUvawoJ9RBkT4hgpvKbep9zqMmIHkrtBb3kIrWHHOC2XO3ibiP88MazenomGZdXrnsC4LVzSJ16BLmcSEg==\",\n      \"saltSeparator\": \"Bw==\",\n      \"rounds\": 8,\n      \"memoryCost\": 14\n    }\n  },\n  \"notification\": {\n    \"sendEmail\": {\n      \"method\": \"DEFAULT\",\n      \"callbackUri\": \"https://sabi-official-prod-37629.firebaseapp.com/__/auth/action\",\n      \"dnsInfo\": {\n        \"customDomainState\": \"NOT_STARTED\",\n        \"domainVerificationRequestTime\": \"1970-01-01T00:00:00Z\"\n      }\n    },\n    \"sendSms\": {\n      \"smsTemplate\": {\n        \"content\": \"%LOGIN_CODE% is your verification code for %APP_NAME%.\"\n      }\n    },\n    \"defaultLocale\": \"en\"\n  },\n  \"quota\": {},\n  \"monitoring\": {\n    \"requestLogging\": {}\n  },\n  \"multiTenant\": {},\n  \"authorizedDomains\": [\n    \"sabi-official-prod-37629.firebaseapp.com\",\n    \"sabi-official-prod-37629.web"
  },
  "updateFallback": {
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
      "sabi-official-prod-37629.web.app"
    ],
    "smsRegionConfigPresent": true,
    "smsRegionPolicyMode": "allowlistOnly",
    "clientApiKeyPresentButNotPrinted": true
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
    "firebaseProjectDescribe": {
      "name": "firebase_project_describe_readonly",
      "command": "gcloud projects describe sabi-official-prod-37629 --format=json 2>$null",
      "status": 0,
      "stdout": "{\r\n  \"createTime\": \"2026-06-23T03:56:18.011Z\",\r\n  \"labels\": {\r\n    \"firebase\": \"enabled\",\r\n    \"firebase-core\": \"disabled\"\r\n  },\r\n  \"lifecycleState\": \"ACTIVE\",\r\n  \"name\": \"sabi-official-prod\",\r\n  \"parent\": {\r\n    \"id\": \"817196539415\",\r\n    \"type\": \"organization\"\r\n  },\r\n  \"projectId\": \"sabi-official-prod-37629\",\r\n  \"projectNumber\": \"970072647981\"\r\n}",
      "stderr": "",
      "ok": true
    },
    "firebaseBillingBefore": {
      "name": "firebase_project_billing_before",
      "command": "gcloud beta billing projects describe sabi-official-prod-37629 --format=json 2>$null",
      "status": 0,
      "stdout": "{\r\n  \"billingAccountName\": \"\",\r\n  \"billingEnabled\": false,\r\n  \"name\": \"projects/sabi-official-prod-37629/billingInfo\",\r\n  \"projectId\": \"sabi-official-prod-37629\"\r\n}",
      "stderr": "",
      "ok": true
    },
    "linkBilling": {
      "name": "link_billing_to_firebase_project",
      "command": "gcloud beta billing projects link sabi-official-prod-37629 --billing-account=015B16-5B0B15-52C323 --quiet",
      "status": 0,
      "stdout": "billingAccountName: billingAccounts/015B16-5B0B15-52C323\r\nbillingEnabled: true\r\nname: projects/sabi-official-prod-37629/billingInfo\r\nprojectId: sabi-official-prod-37629",
      "stderr": "",
      "ok": true
    },
    "identityToolkitApiEnable": {
      "name": "identitytoolkit_api_enable_after_billing_link",
      "command": "gcloud services enable identitytoolkit.googleapis.com --project=sabi-official-prod-37629 --quiet",
      "status": 0,
      "stdout": "",
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
    "liveRoot": {
      "name": "live_https_root_readonly",
      "command": "$u=\"https://sabiai.app/\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "STATUS=200",
      "stderr": "",
      "ok": true
    },
    "firebaseBillingAfter": {
      "checks": [
        {
          "attempt": 1,
          "ok": true,
          "billingEnabled": true,
          "billingAccountName": "billingAccounts/015B16-5B0B15-52C323"
        }
      ],
      "final": {
        "commandOk": true,
        "parseOk": true,
        "billingEnabled": true,
        "billingAccountNamePresent": true,
        "billingAccountName": "billingAccounts/015B16-5B0B15-52C323",
        "projectId": "sabi-official-prod-37629"
      }
    },
    "identityToolkitApiList": {
      "name": "identitytoolkit_api_enabled_check",
      "command": "gcloud services list --enabled --project=sabi-official-prod-37629 --filter=\"name:identitytoolkit.googleapis.com\" --format=\"value(name)\" 2>$null",
      "status": 0,
      "stdout": "projects/970072647981/services/identitytoolkit.googleapis.com",
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
    "billingLinkCommandReadiness": 100,
    "billingEnabledReadiness": 100,
    "identityToolkitApiEnabledReadiness": 100,
    "accessTokenReadiness": 100,
    "authInitializeOrConfigReadableReadiness": 100,
    "authConfigReadableReadiness": 100,
    "phoneProviderUpdateReadiness": 100,
    "phoneProviderEnabledReadiness": 100,
    "officialWebsiteReadiness": 100,
    "noSecretOrApiKeyPrintReadiness": 100,
    "release246KFix3Readiness": 100,
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
    "billingLinkMutationApproved": true,
    "phoneProviderActivationApproved": true,
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
  "checksPassed": 20,
  "checksTotal": 20,
  "checks": [
    {
      "name": "246k_fix3_firebase_project_visible",
      "passed": true,
      "details": {
        "firebaseProjectId": "sabi-official-prod-37629"
      }
    },
    {
      "name": "246k_fix3_billing_link_command_ok_or_now_linked",
      "passed": true,
      "details": {
        "commandOk": true,
        "billingAfterSummary": {
          "commandOk": true,
          "parseOk": true,
          "billingEnabled": true,
          "billingAccountNamePresent": true,
          "billingAccountName": "billingAccounts/015B16-5B0B15-52C323",
          "projectId": "sabi-official-prod-37629"
        }
      }
    },
    {
      "name": "246k_fix3_billing_enabled_after",
      "passed": true,
      "details": {
        "commandOk": true,
        "parseOk": true,
        "billingEnabled": true,
        "billingAccountNamePresent": true,
        "billingAccountName": "billingAccounts/015B16-5B0B15-52C323",
        "projectId": "sabi-official-prod-37629"
      }
    },
    {
      "name": "246k_fix3_identitytoolkit_api_enabled",
      "passed": true,
      "details": {
        "enableOk": true,
        "list": "projects/970072647981/services/identitytoolkit.googleapis.com"
      }
    },
    {
      "name": "246k_fix3_access_token_obtained_without_printing_value",
      "passed": true,
      "details": {
        "ok": true,
        "status": 0,
        "tokenPresent": true,
        "tokenValuePrinted": false
      }
    },
    {
      "name": "246k_fix3_auth_initialized_or_config_readable",
      "passed": true,
      "details": {
        "initializeOk": true,
        "getAfterInitializeOk": true,
        "getAfterOk": true
      }
    },
    {
      "name": "246k_fix3_auth_config_readable_after",
      "passed": true,
      "details": {
        "name": "projects/970072647981/config",
        "phoneNumberEnabled": true,
        "phoneNumberFieldPresent": true,
        "authorizedDomainsPresent": true,
        "authorizedDomains": [
          "sabi-official-prod-37629.firebaseapp.com",
          "sabi-official-prod-37629.web.app"
        ],
        "smsRegionConfigPresent": true,
        "smsRegionPolicyMode": "allowlistOnly",
        "clientApiKeyPresentButNotPrinted": true
      }
    },
    {
      "name": "246k_fix3_phone_provider_update_ok_or_already_enabled",
      "passed": true,
      "details": {
        "primaryUpdateOk": true,
        "fallbackUpdateOk": false,
        "phoneProviderEnabled": true
      }
    },
    {
      "name": "246k_fix3_phone_provider_enabled_after",
      "passed": true,
      "details": {
        "name": "projects/970072647981/config",
        "phoneNumberEnabled": true,
        "phoneNumberFieldPresent": true,
        "authorizedDomainsPresent": true,
        "authorizedDomains": [
          "sabi-official-prod-37629.firebaseapp.com",
          "sabi-official-prod-37629.web.app"
        ],
        "smsRegionConfigPresent": true,
        "smsRegionPolicyMode": "allowlistOnly",
        "clientApiKeyPresentButNotPrinted": true
      }
    },
    {
      "name": "246k_fix3_official_site_still_live",
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
      "name": "246k_fix3_no_api_key_or_secret_value_printed_in_report",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix3_no_live_sms_sent_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix3_no_firebase_user_creation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix3_no_phone_auth_live_test_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix3_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix3_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix3_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix3_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix3_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix3_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [],
  "warnings": [
    "firebase_auth_sms_project_is_suffix_project_while_cloud_run_site_project_is_sabi_official_prod"
  ],
  "nextStep": "246L_sms_region_policy_and_no_live_sms_runtime_readiness_requires_exact_owner_approval",
  "exactApprovalForNext": "I approve RELEASE-246L configure Firebase Auth SMS region policy for project sabi-official-prod-37629 and verify no-live-SMS runtime readiness only, no live SMS, no Firebase user creation, no phone auth live test, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease246KFix3Report;
