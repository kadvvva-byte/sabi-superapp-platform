import type { SabiRelease246LFix1Report } from './sabiRelease246LFix1.types';

export const sabiRelease246LFix1Report: SabiRelease246LFix1Report = {
  "version": "SABI-RELEASE-246L-FIX1-GLOBAL-SMS-REGION-POLICY-NO-LIVE-SMS",
  "status": "passed",
  "createdAt": "2026-06-23T05:39:16.709Z",
  "approval": "I approve RELEASE-246L-FIX1 change Firebase Auth SMS region policy for project sabi-official-prod-37629 to global allowByDefault with empty denylist, I accept global SMS abuse/cost risk, no live SMS, no Firebase user creation, no phone auth live test, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "firebaseProjectId": "sabi-official-prod-37629",
  "officialSiteProjectId": "sabi-official-prod",
  "scope": "change_sms_region_policy_to_global_allow_by_default_empty_denylist_no_live_sms",
  "approvedSmsRegionPolicy": {
    "mode": "allowByDefault",
    "disallowedRegions": [],
    "global": true,
    "riskAcceptedByOwner": true
  },
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
    "smsRegionPolicyMode": "allowlistOnly",
    "allowedRegions": [
      "GB",
      "UZ"
    ],
    "disallowedRegions": [],
    "clientApiKeyPresentButNotPrinted": true
  },
  "updateSmsRegionConfig": {
    "ok": true,
    "statusCode": 200,
    "textPreview": "{\n  \"name\": \"projects/970072647981/config\",\n  \"signIn\": {\n    \"phoneNumber\": {\n      \"enabled\": true\n    },\n    \"hashConfig\": {\n      \"algorithm\": \"SCRYPT\",\n      \"signerKey\":\"[REDACTED]\",\n      \"saltSeparator\":\"[REDACTED]\",\n      \"rounds\": 8,\n      \"memoryCost\": 14\n    }\n  },\n  \"notification\": {\n    \"sendEmail\": {\n      \"method\": \"DEFAULT\",\n      \"callbackUri\": \"https://sabi-official-prod-37629.firebaseapp.com/__/auth/action\",\n      \"dnsInfo\": {\n        \"customDomainState\": \"NOT_STARTED\",\n        \"domainVerificationRequestTime\": \"1970-01-01T00:00:00Z\"\n      }\n    },\n    \"sendSms\": {\n      \"smsTemplate\": {\n        \"content\": \"%LOGIN_CODE% is your verification code for %APP_NAME%.\"\n      }\n    },\n    \"defaultLocale\": \"en\"\n  },\n  \"quota\": {},\n  \"monitoring\": {\n    \"requestLogging\": {}\n  },\n  \"multiTenant\": {},\n  \"authorizedDomains\": [\n    \"sabi-official-prod-37629.firebaseapp.com\",\n    \"sabi-official-prod-37629.web.app\"\n  ],\n  \"subtype\": \"IDENTITY_PLATFORM\",\n  \"client\": {\n    \"apiKey\":\"[REDACTED]\",\n    \"permissions\": {},\n    \"firebaseSubdomain\": \"sabi-official-prod-37629\"\n  },\n  \"mfa\": {\n    \"state\": \"DISABLED\"\n  },\n  \"blockingFunctions\": {},\n  \"smsRegionConfig\": {\n    \"allowByDefaul"
  },
  "updateSmsRegionFallback": {
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
    "smsRegionPolicyMode": "allowByDefault",
    "allowedRegions": [],
    "disallowedRegions": [],
    "clientApiKeyPresentButNotPrinted": true
  },
  "mobileInspection": {
    "mobileRootExists": true,
    "appJson": {
      "exists": true,
      "parseOk": true,
      "androidPackage": "app.sabiai.superapp",
      "androidPackageMatches": true,
      "iosBundleIdentifier": "app.sabiai.superapp",
      "iosBundleMatches": true
    },
    "files": {
      "rootAndroidConfigExists": true,
      "nativeAndroidConfigExists": true,
      "rootIosConfigExists": true,
      "rootWebConfigExists": true,
      "srcWebConfigExists": true
    },
    "hashes": {
      "rootAndroid": "cdec165560778e1e69db5dbdb3cf9d84929fa724ce81dd52f9220bdb9a15c575",
      "nativeAndroid": "cdec165560778e1e69db5dbdb3cf9d84929fa724ce81dd52f9220bdb9a15c575",
      "rootIos": "c06f867a34da760b5e7d081893cb8db1d50289e6e87e13e929cfd3f4f88632e6",
      "rootWeb": "68fd3f25e72dd1f394cdf0c16959ec63d5b27e6d4f83023ee6d54c6a76c228cc",
      "srcWeb": "68fd3f25e72dd1f394cdf0c16959ec63d5b27e6d4f83023ee6d54c6a76c228cc"
    }
  },
  "noLiveRuntimeInspection": {
    "checksOnly": true,
    "signInWithPhoneNumberExecuted": false,
    "verifyPhoneNumberExecuted": false,
    "confirmationResultCreated": false,
    "firebaseUserCreationExecuted": false,
    "smsSendEndpointCalled": false,
    "realPhoneNumberUsed": false,
    "mobileConfigPresenceChecked": true
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
    "phoneProviderStillEnabledReadiness": 100,
    "globalSmsPolicyUpdateReadiness": 100,
    "globalSmsPolicyLockedReadiness": 100,
    "mobileFirebaseConfigsReadiness": 100,
    "noLiveSmsRuntimeReadiness": 100,
    "officialWebsiteReadiness": 100,
    "noSecretOrApiKeyPrintReadiness": 100,
    "release246LFix1Readiness": 100,
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
    "globalSmsRegionPolicyMutationApproved": true,
    "ownerAcceptedGlobalSmsAbuseCostRisk": true,
    "allowByDefaultPolicy": true,
    "emptyDenylist": true,
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
    "exactOwnerApprovalRequiredBeforeFirstLiveSms": true,
    "realPhoneNumberRequiredBeforeFirstLiveSms": true
  },
  "checksPassed": 21,
  "checksTotal": 21,
  "checks": [
    {
      "name": "246l_fix1_firebase_project_visible",
      "passed": true,
      "details": {
        "firebaseProjectId": "sabi-official-prod-37629"
      }
    },
    {
      "name": "246l_fix1_billing_enabled",
      "passed": true,
      "details": {
        "billingProject": "sabi-official-prod-37629"
      }
    },
    {
      "name": "246l_fix1_identitytoolkit_api_enabled",
      "passed": true,
      "details": {
        "list": "projects/970072647981/services/identitytoolkit.googleapis.com"
      }
    },
    {
      "name": "246l_fix1_access_token_obtained_without_printing_value",
      "passed": true,
      "details": {
        "ok": true,
        "status": 0,
        "tokenPresent": true,
        "tokenValuePrinted": false
      }
    },
    {
      "name": "246l_fix1_auth_config_readable_after",
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
        "smsRegionPolicyMode": "allowByDefault",
        "allowedRegions": [],
        "disallowedRegions": [],
        "clientApiKeyPresentButNotPrinted": true
      }
    },
    {
      "name": "246l_fix1_phone_provider_still_enabled",
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
        "smsRegionPolicyMode": "allowByDefault",
        "allowedRegions": [],
        "disallowedRegions": [],
        "clientApiKeyPresentButNotPrinted": true
      }
    },
    {
      "name": "246l_fix1_global_sms_policy_update_ok_or_already_locked",
      "passed": true,
      "details": {
        "primaryUpdateOk": true,
        "fallbackUpdateOk": false,
        "afterMode": "allowByDefault",
        "disallowedRegions": []
      }
    },
    {
      "name": "246l_fix1_global_sms_policy_allow_by_default_empty_denylist_locked",
      "passed": true,
      "details": {
        "mode": "allowByDefault",
        "disallowedRegions": []
      }
    },
    {
      "name": "246l_fix1_mobile_firebase_configs_ready",
      "passed": true,
      "details": {
        "mobileRootExists": true,
        "appJson": {
          "exists": true,
          "parseOk": true,
          "androidPackage": "app.sabiai.superapp",
          "androidPackageMatches": true,
          "iosBundleIdentifier": "app.sabiai.superapp",
          "iosBundleMatches": true
        },
        "files": {
          "rootAndroidConfigExists": true,
          "nativeAndroidConfigExists": true,
          "rootIosConfigExists": true,
          "rootWebConfigExists": true,
          "srcWebConfigExists": true
        },
        "hashes": {
          "rootAndroid": "cdec165560778e1e69db5dbdb3cf9d84929fa724ce81dd52f9220bdb9a15c575",
          "nativeAndroid": "cdec165560778e1e69db5dbdb3cf9d84929fa724ce81dd52f9220bdb9a15c575",
          "rootIos": "c06f867a34da760b5e7d081893cb8db1d50289e6e87e13e929cfd3f4f88632e6",
          "rootWeb": "68fd3f25e72dd1f394cdf0c16959ec63d5b27e6d4f83023ee6d54c6a76c228cc",
          "srcWeb": "68fd3f25e72dd1f394cdf0c16959ec63d5b27e6d4f83023ee6d54c6a76c228cc"
        }
      }
    },
    {
      "name": "246l_fix1_no_live_sms_runtime_readiness",
      "passed": true,
      "details": {
        "checksOnly": true,
        "signInWithPhoneNumberExecuted": false,
        "verifyPhoneNumberExecuted": false,
        "confirmationResultCreated": false,
        "firebaseUserCreationExecuted": false,
        "smsSendEndpointCalled": false,
        "realPhoneNumberUsed": false,
        "mobileConfigPresenceChecked": true
      }
    },
    {
      "name": "246l_fix1_official_site_still_live",
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
      "name": "246l_fix1_no_api_key_or_secret_value_printed_in_report",
      "passed": true,
      "details": {}
    },
    {
      "name": "246l_fix1_no_live_sms_sent_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246l_fix1_no_firebase_user_creation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246l_fix1_no_phone_auth_live_test_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246l_fix1_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246l_fix1_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246l_fix1_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246l_fix1_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246l_fix1_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246l_fix1_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [],
  "warnings": [
    "firebase_auth_sms_project_is_suffix_project_while_cloud_run_site_project_is_sabi_official_prod",
    "global_sms_policy_increases_sms_abuse_and_cost_risk",
    "first_live_sms_requires_real_test_number_not_placeholder"
  ],
  "nextStep": "246M_first_live_sms_test_requires_exact_owner_approval_real_test_phone_number_and_cost_acceptance",
  "exactApprovalForNext": "I approve RELEASE-246M first live Firebase Phone Auth SMS test in project sabi-official-prod-37629 to my provided real test phone number +<REAL_NUMBER> only, I accept Firebase SMS charges, no Firebase user deletion, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease246LFix1Report;
