import type { SabiRelease246KFix2Report } from './sabiRelease246KFix2.types';

export const sabiRelease246KFix2Report: SabiRelease246KFix2Report = {
  "version": "SABI-RELEASE-246K-FIX2-CLOUD-BILLING-READINESS-INVENTORY-NO-MUTATION-NO-LIVE-SMS",
  "status": "failed",
  "createdAt": "2026-06-23T05:15:03.014Z",
  "firebaseProjectId": "sabi-official-prod-37629",
  "officialSiteProjectId": "sabi-official-prod",
  "scope": "cloud_billing_readiness_inventory_only_no_mutation_no_live_sms",
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
    "officialSiteProjectBillingDescribe": {
      "name": "official_site_project_billing_describe_readonly",
      "command": "gcloud beta billing projects describe sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "{\r\n  \"billingAccountName\": \"billingAccounts/015B16-5B0B15-52C323\",\r\n  \"billingEnabled\": true,\r\n  \"name\": \"projects/sabi-official-prod/billingInfo\",\r\n  \"projectId\": \"sabi-official-prod\"\r\n}",
      "stderr": "",
      "ok": true
    },
    "firebaseProjectBillingDescribe": {
      "name": "firebase_project_billing_describe_readonly",
      "command": "gcloud beta billing projects describe sabi-official-prod-37629 --format=json 2>$null",
      "status": 0,
      "stdout": "{\r\n  \"billingAccountName\": \"\",\r\n  \"billingEnabled\": false,\r\n  \"name\": \"projects/sabi-official-prod-37629/billingInfo\",\r\n  \"projectId\": \"sabi-official-prod-37629\"\r\n}",
      "stderr": "",
      "ok": true
    },
    "billingAccountsList": {
      "name": "billing_accounts_list_readonly",
      "command": "gcloud beta billing accounts list --format=json 2>$null",
      "status": 0,
      "stdout": "[\r\n  {\r\n    \"currencyCode\": \"GBP\",\r\n    \"displayName\": \"My Billing Account\",\r\n    \"masterBillingAccount\": \"\",\r\n    \"name\": \"billingAccounts/015B16-5B0B15-52C323\",\r\n    \"open\": true,\r\n    \"parent\": \"organizations/817196539415\"\r\n  }\r\n]",
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
  "firebaseBillingSummary": {
    "parseOk": true,
    "billingEnabled": false,
    "billingAccountNamePresent": false,
    "billingAccountName": null,
    "projectId": "sabi-official-prod-37629"
  },
  "officialSiteBillingSummary": {
    "parseOk": true,
    "billingEnabled": true,
    "billingAccountNamePresent": true,
    "billingAccountName": "billingAccounts/015B16-5B0B15-52C323",
    "projectId": "sabi-official-prod"
  },
  "availableBillingAccounts": [
    {
      "name": "billingAccounts/015B16-5B0B15-52C323",
      "displayName": "My Billing Account",
      "open": true,
      "masterBillingAccountPresent": false
    }
  ],
  "selectedBillingAccountForNextStep": "billingAccounts/015B16-5B0B15-52C323",
  "readiness": {
    "firebaseProjectVisibleReadiness": 100,
    "identityToolkitApiEnabledReadiness": 100,
    "billingInventoryReadiness": 100,
    "openBillingAccountAvailableReadiness": 100,
    "firebaseProjectBillingEnabledReadiness": 0,
    "officialWebsiteReadiness": 100,
    "noSecretOrApiKeyPrintReadiness": 100,
    "release246KFix2Readiness": 0,
    "billingLinkMutationNow": 0,
    "phoneProviderMutationNow": 0,
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
    "inventoryOnly": true,
    "noBillingLinkMutationNow": true,
    "noPhoneProviderMutationNow": true,
    "noLiveSmsSentNow": true,
    "noFirebaseUserCreationNow": true,
    "noPhoneAuthLiveTestNow": true,
    "noDnsMutationNow": true,
    "noGooglePayOrBillingNow": true,
    "noWalletPaymentPayoutNow": true,
    "noDbMutationNow": true,
    "noSecretManagerReadWriteNow": true,
    "noEnvReadWriteNow": true,
    "exactOwnerApprovalRequiredBeforeBillingLink": true,
    "exactOwnerApprovalRequiredBeforeFirstLiveSms": true
  },
  "checksPassed": 17,
  "checksTotal": 18,
  "checks": [
    {
      "name": "246k_fix2_firebase_project_exists",
      "passed": true,
      "details": {
        "firebaseProjectId": "sabi-official-prod-37629"
      }
    },
    {
      "name": "246k_fix2_identitytoolkit_api_enabled",
      "passed": true,
      "details": {
        "list": "projects/970072647981/services/identitytoolkit.googleapis.com"
      }
    },
    {
      "name": "246k_fix2_billing_project_describe_readable",
      "passed": true,
      "details": {
        "parseOk": true,
        "billingEnabled": false,
        "billingAccountNamePresent": false,
        "billingAccountName": null,
        "projectId": "sabi-official-prod-37629"
      }
    },
    {
      "name": "246k_fix2_open_billing_account_available",
      "passed": true,
      "details": {
        "openBillingAccounts": [
          {
            "name": "billingAccounts/015B16-5B0B15-52C323",
            "displayName": "My Billing Account",
            "open": true,
            "masterBillingAccountPresent": false
          }
        ]
      }
    },
    {
      "name": "246k_fix2_firebase_project_billing_enabled",
      "passed": false,
      "details": {
        "parseOk": true,
        "billingEnabled": false,
        "billingAccountNamePresent": false,
        "billingAccountName": null,
        "projectId": "sabi-official-prod-37629"
      }
    },
    {
      "name": "246k_fix2_official_site_still_live",
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
      "name": "246k_fix2_no_secret_or_api_key_printed",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix2_no_billing_link_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix2_no_phone_provider_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix2_no_live_sms_sent_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix2_no_firebase_user_creation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix2_no_phone_auth_live_test_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix2_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix2_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix2_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix2_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix2_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246k_fix2_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [
    "246k_fix2_firebase_project_billing_enabled"
  ],
  "warnings": [
    "firebase_project_billing_not_enabled_identity_platform_phone_provider_blocked"
  ],
  "nextStep": "246K_FIX3_link_cloud_billing_to_firebase_project_requires_exact_owner_approval",
  "exactApprovalForNext": "I approve RELEASE-246K-FIX3 link Cloud Billing account billingAccounts/015B16-5B0B15-52C323 to Firebase project sabi-official-prod-37629 only, then retry Firebase Authentication Phone provider enable, no live SMS, no Firebase user creation, no phone auth live test, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease246KFix2Report;
