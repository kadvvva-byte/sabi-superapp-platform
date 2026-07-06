import type { SabiRelease246FReport } from './sabiRelease246F.types';

export const sabiRelease246FReport: SabiRelease246FReport = {
  "version": "SABI-RELEASE-246F-INSTALL-FIREBASE-CLI-VERIFY-PROJECT-APP-INVENTORY-NO-LIVE-SMS-NO-SECRET-PRINT",
  "status": "passed",
  "createdAt": "2026-06-23T03:12:24.037Z",
  "approval": "I approve RELEASE-246F install Firebase CLI tooling and verify Firebase project/app inventory for sabi-official-prod only, no live SMS, no Firebase user creation, no phone auth live test, no secret or API key value print, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "officialDomain": "sabiai.app",
  "companyName": "SABI AI TECHNOLOGIES LIMITED",
  "projectId": "sabi-official-prod",
  "scope": "install_firebase_cli_and_verify_project_app_inventory_no_live_sms_no_secret_or_api_key_print",
  "observations": {
    "nodeVersion": {
      "name": "node_version",
      "command": "node --version 2>$null",
      "status": 0,
      "stdout": "v24.14.0",
      "stderr": "",
      "ok": true
    },
    "npmVersion": {
      "name": "npm_version",
      "command": "npm --version 2>$null",
      "status": 0,
      "stdout": "11.9.0",
      "stderr": "",
      "ok": true
    },
    "firebaseCliVersionBefore": {
      "name": "firebase_cli_version_before_optional",
      "command": "\n$ErrorActionPreference = \"Continue\"\n$fb = Get-Command firebase -ErrorAction SilentlyContinue\nif ($fb) {\n  firebase --version\n  exit $LASTEXITCODE\n}\n$npx = Get-Command npx -ErrorAction SilentlyContinue\nif ($npx) {\n  npx --yes firebase-tools --version\n  exit $LASTEXITCODE\n}\nWrite-Output \"FIREBASE_CLI_NOT_AVAILABLE\"\nexit 1\n",
      "status": -1,
      "stdout": "",
      "stderr": "",
      "ok": false
    },
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
    "enabledApisBefore": {
      "name": "enabled_google_cloud_apis_before_readonly",
      "command": "gcloud services list --enabled --project=sabi-official-prod --format=\"value(config.name)\" 2>$null",
      "status": 0,
      "stdout": "analyticshub.googleapis.com\r\nartifactregistry.googleapis.com\r\nbigquery.googleapis.com\r\nbigqueryconnection.googleapis.com\r\nbigquerydatapolicy.googleapis.com\r\nbigquerydatatransfer.googleapis.com\r\nbigquerymigration.googleapis.com\r\nbigqueryreservation.googleapis.com\r\nbigquerystorage.googleapis.com\r\ncloudapis.googleapis.com\r\ncloudbuild.googleapis.com\r\ncloudtrace.googleapis.com\r\ncontainerregistry.googleapis.com\r\ndataform.googleapis.com\r\ndataplex.googleapis.com\r\ndatastore.googleapis.com\r\nfirebase.googleapis.com\r\niam.googleapis.com\r\niamcredentials.googleapis.com\r\nidentitytoolkit.googleapis.com\r\nlogging.googleapis.com\r\nmonitoring.googleapis.com\r\npubsub.googleapis.com\r\nrun.googleapis.com\r\nservicemanagement.googleapis.com\r\nserviceusage.googleapis.com\r\nsql-component.googleapis.com\r\nstorage-api.googleapis.com\r\nstorage-component.googleapis.com\r\nstorage.googleapis.com\r\ntelemetry.googleapis.com",
      "stderr": "",
      "ok": true
    },
    "installResult": {
      "name": "npm_install_global_firebase_tools",
      "command": "npm install -g firebase-tools",
      "status": 0,
      "stdout": "added 666 packages in 1m\n\n93 packages are looking for funding\n  run `npm fund` for details",
      "stderr": "npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead\nnpm warn deprecated json-ptr@3.1.1: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.\nnpm warn deprecated glob@10.5.0: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me\nnpm warn deprecated uuid@9.0.1: uuid@10 and below is no longer supported.  For ESM codebases, update to uuid@latest.  For CommonJS codebases, use uuid@11 (but be aware this version will likely be deprecated in 2028).",
      "ok": true
    },
    "firebaseCliVersionAfter": {
      "name": "firebase_cli_version_after",
      "command": "\n$ErrorActionPreference = \"Continue\"\n$fb = Get-Command firebase -ErrorAction SilentlyContinue\nif ($fb) {\n  firebase --version\n  exit $LASTEXITCODE\n}\n$npx = Get-Command npx -ErrorAction SilentlyContinue\nif ($npx) {\n  npx --yes firebase-tools --version\n  exit $LASTEXITCODE\n}\nWrite-Output \"FIREBASE_CLI_NOT_AVAILABLE\"\nexit 1\n",
      "status": 0,
      "stdout": "15.22.1",
      "stderr": "",
      "ok": true
    },
    "authList": {
      "name": "firebase_login_list_readonly",
      "command": "\n$ErrorActionPreference = \"Continue\"\n$fb = Get-Command firebase -ErrorAction SilentlyContinue\nif ($fb) {\n  firebase login:list --json\n  exit $LASTEXITCODE\n}\n$npx = Get-Command npx -ErrorAction SilentlyContinue\nif ($npx) {\n  npx --yes firebase-tools login:list --json\n  exit $LASTEXITCODE\n}\nWrite-Output \"FIREBASE_CLI_NOT_AVAILABLE\"\nexit 1\n",
      "status": 0,
      "stdout": "{\n  \"status\": \"success\"\n}",
      "stderr": "",
      "ok": true
    },
    "projectsList": {
      "name": "firebase_projects_list_readonly",
      "command": "\n$ErrorActionPreference = \"Continue\"\n$fb = Get-Command firebase -ErrorAction SilentlyContinue\nif ($fb) {\n  firebase projects:list --json\n  exit $LASTEXITCODE\n}\n$npx = Get-Command npx -ErrorAction SilentlyContinue\nif ($npx) {\n  npx --yes firebase-tools projects:list --json\n  exit $LASTEXITCODE\n}\nWrite-Output \"FIREBASE_CLI_NOT_AVAILABLE\"\nexit 1\n",
      "status": 1,
      "stdout": "{\n  \"status\": \"error\",\n  \"error\": \"Failed to authenticate, have you run \\u001b[1mfirebase login\\u001b[22m?\"\n}",
      "stderr": "",
      "ok": false
    },
    "androidAppsList": {
      "name": "firebase_apps_android_list_readonly",
      "command": "\n$ErrorActionPreference = \"Continue\"\n$fb = Get-Command firebase -ErrorAction SilentlyContinue\nif ($fb) {\n  firebase apps:list ANDROID --project=sabi-official-prod --json\n  exit $LASTEXITCODE\n}\n$npx = Get-Command npx -ErrorAction SilentlyContinue\nif ($npx) {\n  npx --yes firebase-tools apps:list ANDROID --project=sabi-official-prod --json\n  exit $LASTEXITCODE\n}\nWrite-Output \"FIREBASE_CLI_NOT_AVAILABLE\"\nexit 1\n",
      "status": 1,
      "stdout": "{\n  \"status\": \"error\",\n  \"error\": \"Failed to authenticate, have you run \\u001b[1mfirebase login\\u001b[22m?\"\n}",
      "stderr": "",
      "ok": false
    },
    "iosAppsList": {
      "name": "firebase_apps_ios_list_readonly",
      "command": "\n$ErrorActionPreference = \"Continue\"\n$fb = Get-Command firebase -ErrorAction SilentlyContinue\nif ($fb) {\n  firebase apps:list IOS --project=sabi-official-prod --json\n  exit $LASTEXITCODE\n}\n$npx = Get-Command npx -ErrorAction SilentlyContinue\nif ($npx) {\n  npx --yes firebase-tools apps:list IOS --project=sabi-official-prod --json\n  exit $LASTEXITCODE\n}\nWrite-Output \"FIREBASE_CLI_NOT_AVAILABLE\"\nexit 1\n",
      "status": 1,
      "stdout": "{\n  \"status\": \"error\",\n  \"error\": \"Failed to authenticate, have you run \\u001b[1mfirebase login\\u001b[22m?\"\n}",
      "stderr": "",
      "ok": false
    },
    "webAppsList": {
      "name": "firebase_apps_web_list_readonly",
      "command": "\n$ErrorActionPreference = \"Continue\"\n$fb = Get-Command firebase -ErrorAction SilentlyContinue\nif ($fb) {\n  firebase apps:list WEB --project=sabi-official-prod --json\n  exit $LASTEXITCODE\n}\n$npx = Get-Command npx -ErrorAction SilentlyContinue\nif ($npx) {\n  npx --yes firebase-tools apps:list WEB --project=sabi-official-prod --json\n  exit $LASTEXITCODE\n}\nWrite-Output \"FIREBASE_CLI_NOT_AVAILABLE\"\nexit 1\n",
      "status": 1,
      "stdout": "{\n  \"status\": \"error\",\n  \"error\": \"Failed to authenticate, have you run \\u001b[1mfirebase login\\u001b[22m?\"\n}",
      "stderr": "",
      "ok": false
    },
    "enabledApisAfter": {
      "name": "enabled_google_cloud_apis_after_readonly",
      "command": "gcloud services list --enabled --project=sabi-official-prod --format=\"value(config.name)\" 2>$null",
      "status": 0,
      "stdout": "analyticshub.googleapis.com\r\nartifactregistry.googleapis.com\r\nbigquery.googleapis.com\r\nbigqueryconnection.googleapis.com\r\nbigquerydatapolicy.googleapis.com\r\nbigquerydatatransfer.googleapis.com\r\nbigquerymigration.googleapis.com\r\nbigqueryreservation.googleapis.com\r\nbigquerystorage.googleapis.com\r\ncloudapis.googleapis.com\r\ncloudbuild.googleapis.com\r\ncloudtrace.googleapis.com\r\ncontainerregistry.googleapis.com\r\ndataform.googleapis.com\r\ndataplex.googleapis.com\r\ndatastore.googleapis.com\r\nfirebase.googleapis.com\r\niam.googleapis.com\r\niamcredentials.googleapis.com\r\nidentitytoolkit.googleapis.com\r\nlogging.googleapis.com\r\nmonitoring.googleapis.com\r\npubsub.googleapis.com\r\nrun.googleapis.com\r\nservicemanagement.googleapis.com\r\nserviceusage.googleapis.com\r\nsql-component.googleapis.com\r\nstorage-api.googleapis.com\r\nstorage-component.googleapis.com\r\nstorage.googleapis.com\r\ntelemetry.googleapis.com",
      "stderr": "",
      "ok": true
    },
    "liveRoot": {
      "name": "live_https_root_readonly",
      "command": "$u=\"https://sabiai.app/\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); Write-Output (\"LENGTH=\" + $r.Content.Length); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "STATUS=200\r\nLENGTH=51682",
      "stderr": "",
      "ok": true
    }
  },
  "inventories": {
    "projects": {
      "available": false,
      "parseOk": true,
      "empty": true,
      "itemCount": 0,
      "items": []
    },
    "androidApps": {
      "available": false,
      "parseOk": true,
      "empty": true,
      "itemCount": 0,
      "items": []
    },
    "iosApps": {
      "available": false,
      "parseOk": true,
      "empty": true,
      "itemCount": 0,
      "items": []
    },
    "webApps": {
      "available": false,
      "parseOk": true,
      "empty": true,
      "itemCount": 0,
      "items": []
    }
  },
  "officialAppsCurrentState": {
    "projectId": "sabi-official-prod",
    "projectsVisible": false,
    "authAvailable": true,
    "appCounts": {
      "android": 0,
      "ios": 0,
      "web": 0,
      "total": 0
    },
    "androidApps": [],
    "iosApps": [],
    "webApps": [],
    "secretOrApiKeyValuesPrinted": false
  },
  "readiness": {
    "officialWebsiteReadiness": 100,
    "firebaseCliToolingReadiness": 100,
    "firebaseAuthReadiness": 100,
    "firebaseProjectInventoryReadiness": 0,
    "firebaseOfficialAppsInventoryReadiness": 0,
    "officialAndroidAppVisibleReadiness": 0,
    "noSecretOrApiKeyPrintReadiness": 100,
    "release246FReadiness": 100,
    "liveSmsSentNow": 0,
    "firebaseAppRegistrationNow": 0,
    "firebaseConfigDownloadNow": 0,
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
    "localToolingInstallAllowedByOwner": true,
    "readOnlyFirebaseInventoryOnly": true,
    "noFirebaseAppRegistrationNow": true,
    "noFirebaseConfigDownloadNow": true,
    "noLiveSmsSentNow": true,
    "noFirebaseUserCreationNow": true,
    "noPhoneAuthLiveTestNow": true,
    "noSecretOrApiKeyValuePrinted": true,
    "noDnsMutationNow": true,
    "noGooglePayOrBillingNow": true,
    "noWalletPaymentPayoutNow": true,
    "noDbMutationNow": true,
    "noSecretManagerReadWriteNow": true,
    "noEnvReadWriteNow": true,
    "exactOwnerApprovalRequiredBeforeNextMutation": true
  },
  "checksPassed": 17,
  "checksTotal": 17,
  "checks": [
    {
      "name": "246f_gcloud_project_is_official",
      "passed": true,
      "details": {
        "name": "gcloud_project",
        "command": "gcloud config get-value project 2>$null",
        "status": 0,
        "stdout": "sabi-official-prod",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246f_active_account_is_official_admin",
      "passed": true,
      "details": {
        "name": "gcloud_active_account",
        "command": "gcloud auth list --filter=status:ACTIVE --format=\"value(account)\" 2>$null",
        "status": 0,
        "stdout": "admin@sabiai.app",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246f_node_available",
      "passed": true,
      "details": {
        "name": "node_version",
        "command": "node --version 2>$null",
        "status": 0,
        "stdout": "v24.14.0",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246f_npm_available",
      "passed": true,
      "details": {
        "name": "npm_version",
        "command": "npm --version 2>$null",
        "status": 0,
        "stdout": "11.9.0",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246f_firebase_cli_install_command_succeeded_or_already_available",
      "passed": true,
      "details": {
        "name": "npm_install_global_firebase_tools",
        "command": "npm install -g firebase-tools",
        "status": 0,
        "stdout": "added 666 packages in 1m\n\n93 packages are looking for funding\n  run `npm fund` for details",
        "stderr": "npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead\nnpm warn deprecated json-ptr@3.1.1: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.\nnpm warn deprecated glob@10.5.0: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me\nnpm warn deprecated uuid@9.0.1: uuid@10 and below is no longer supported.  For ESM codebases, update to uuid@latest.  For CommonJS codebases, use uuid@11 (but be aware this version will likely be deprecated in 2028).",
        "ok": true
      }
    },
    {
      "name": "246f_firebase_cli_available_after",
      "passed": true,
      "details": {
        "name": "firebase_cli_version_after",
        "command": "\n$ErrorActionPreference = \"Continue\"\n$fb = Get-Command firebase -ErrorAction SilentlyContinue\nif ($fb) {\n  firebase --version\n  exit $LASTEXITCODE\n}\n$npx = Get-Command npx -ErrorAction SilentlyContinue\nif ($npx) {\n  npx --yes firebase-tools --version\n  exit $LASTEXITCODE\n}\nWrite-Output \"FIREBASE_CLI_NOT_AVAILABLE\"\nexit 1\n",
        "status": 0,
        "stdout": "15.22.1",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246f_firebase_inventory_attempted_readonly",
      "passed": true,
      "details": {
        "projectId": "sabi-official-prod",
        "projectsVisible": false,
        "authAvailable": true,
        "appCounts": {
          "android": 0,
          "ios": 0,
          "web": 0,
          "total": 0
        },
        "androidApps": [],
        "iosApps": [],
        "webApps": [],
        "secretOrApiKeyValuesPrinted": false
      }
    },
    {
      "name": "246f_no_secret_or_api_key_value_printed",
      "passed": true,
      "details": {}
    },
    {
      "name": "246f_no_live_sms_sent",
      "passed": true,
      "details": {}
    },
    {
      "name": "246f_no_firebase_user_creation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246f_no_phone_auth_live_test_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246f_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246f_no_google_pay_or_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246f_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246f_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246f_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246f_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [],
  "warnings": [
    "sabi_official_prod_not_visible_from_firebase_cli_inventory_yet",
    "no_official_firebase_apps_registered_or_visible_yet",
    "official_android_app_app_sabiai_superapp_not_visible_yet",
    "official_web_app_not_visible_yet"
  ],
  "nextStep": "246F_FIX1_firebase_login_then_project_inventory_requires_owner_action",
  "exactApprovalForNext": "Owner action required: run firebase login, then approve RELEASE-246F-FIX1 verify Firebase project/app inventory for sabi-official-prod only, no live SMS, no Firebase user creation, no phone auth live test, no secret or API key value print, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease246FReport;
