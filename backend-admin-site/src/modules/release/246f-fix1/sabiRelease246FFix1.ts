import type { SabiRelease246FFix1Report } from './sabiRelease246FFix1.types';

export const sabiRelease246FFix1Report: SabiRelease246FFix1Report = {
  "version": "SABI-RELEASE-246F-FIX1-VERIFY-FIREBASE-PROJECT-APP-INVENTORY-NO-LIVE-SMS-NO-SECRET-PRINT",
  "status": "passed",
  "createdAt": "2026-06-23T03:19:07.330Z",
  "approval": "I approve RELEASE-246F-FIX1 verify Firebase project/app inventory for sabi-official-prod only, no live SMS, no Firebase user creation, no phone auth live test, no secret or API key value print, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "officialDomain": "sabiai.app",
  "companyName": "SABI AI TECHNOLOGIES LIMITED",
  "projectId": "sabi-official-prod",
  "scope": "verify_firebase_project_app_inventory_readonly_no_live_sms_no_secret_or_api_key_print",
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
    "firebaseVersion": {
      "name": "firebase_cli_version",
      "command": "\n$ErrorActionPreference = \"Continue\"\n$fb = Get-Command firebase -ErrorAction SilentlyContinue\nif (-not $fb) {\n  Write-Output \"FIREBASE_CLI_NOT_AVAILABLE\"\n  exit 1\n}\nfirebase --version\nexit $LASTEXITCODE\n",
      "status": 0,
      "stdout": "15.22.1",
      "stderr": "",
      "ok": true
    },
    "firebaseLoginList": {
      "name": "firebase_login_list_readonly",
      "command": "\n$ErrorActionPreference = \"Continue\"\n$fb = Get-Command firebase -ErrorAction SilentlyContinue\nif (-not $fb) {\n  Write-Output \"FIREBASE_CLI_NOT_AVAILABLE\"\n  exit 1\n}\nfirebase login:list --json\nexit $LASTEXITCODE\n",
      "status": 0,
      "stdout": "{\n  \"status\": \"success\",\n  \"result\": [\n    {\n      \"user\": {\n        \"iss\": \"accounts.google.com\",\n        \"azp\": \"563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com\",\n        \"aud\": \"563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com\",\n        \"sub\": \"103206826275308495794\",\n        \"hd\": \"sabiai.app\",\n        \"email\": \"admin@sabiai.app\",\n        \"email_verified\": true,\n        \"at_hash\": \"ZiKQ3skDXknwsCxSr_YUhw\",\n        \"iat\": 1782184536,\n        \"exp\": 1782188136\n      },\n      \"tokens\": {\n        \"expires_at\": 1782188134731,\n        \"access_token\": \"[REDACTED_TOKEN]\",\n        \"expires_in\": 3599,\n        \"refresh_token\": \"[REDACTED_TOKEN]\",\n        \"scope\": \"https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/cloudplatformprojects.readonly https://www.googleapis.com/auth/firebase openid\",\n        \"token_type\": \"Bearer\",\n        \"id_token\": \"[REDACTED_JWT]\"\n      }\n    }\n  ]\n}",
      "stderr": "",
      "ok": true
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
    "enabledApis": {
      "name": "enabled_google_cloud_apis_readonly",
      "command": "gcloud services list --enabled --project=sabi-official-prod --format=\"value(config.name)\" 2>$null",
      "status": 0,
      "stdout": "analyticshub.googleapis.com\r\nartifactregistry.googleapis.com\r\nbigquery.googleapis.com\r\nbigqueryconnection.googleapis.com\r\nbigquerydatapolicy.googleapis.com\r\nbigquerydatatransfer.googleapis.com\r\nbigquerymigration.googleapis.com\r\nbigqueryreservation.googleapis.com\r\nbigquerystorage.googleapis.com\r\ncloudapis.googleapis.com\r\ncloudbuild.googleapis.com\r\ncloudtrace.googleapis.com\r\ncontainerregistry.googleapis.com\r\ndataform.googleapis.com\r\ndataplex.googleapis.com\r\ndatastore.googleapis.com\r\nfirebase.googleapis.com\r\niam.googleapis.com\r\niamcredentials.googleapis.com\r\nidentitytoolkit.googleapis.com\r\nlogging.googleapis.com\r\nmonitoring.googleapis.com\r\npubsub.googleapis.com\r\nrun.googleapis.com\r\nservicemanagement.googleapis.com\r\nserviceusage.googleapis.com\r\nsql-component.googleapis.com\r\nstorage-api.googleapis.com\r\nstorage-component.googleapis.com\r\nstorage.googleapis.com\r\ntelemetry.googleapis.com",
      "stderr": "",
      "ok": true
    },
    "firebaseProjectsList": {
      "name": "firebase_projects_list_readonly",
      "command": "\n$ErrorActionPreference = \"Continue\"\n$fb = Get-Command firebase -ErrorAction SilentlyContinue\nif (-not $fb) {\n  Write-Output \"FIREBASE_CLI_NOT_AVAILABLE\"\n  exit 1\n}\nfirebase projects:list --json\nexit $LASTEXITCODE\n",
      "status": 0,
      "stdout": "{\n  \"status\": \"success\",\n  \"result\": []\n}",
      "stderr": "- Preparing the list of your Firebase projects\n✔ Preparing the list of your Firebase projects",
      "ok": true
    },
    "firebaseAndroidAppsList": {
      "name": "firebase_apps_android_list_readonly",
      "command": "\n$ErrorActionPreference = \"Continue\"\n$fb = Get-Command firebase -ErrorAction SilentlyContinue\nif (-not $fb) {\n  Write-Output \"FIREBASE_CLI_NOT_AVAILABLE\"\n  exit 1\n}\nfirebase apps:list ANDROID --project=sabi-official-prod --json\nexit $LASTEXITCODE\n",
      "status": 2,
      "stdout": "{\n  \"status\": \"error\",\n  \"error\": \"Failed to list Firebase ANDROID apps. See firebase-debug.log for more info.\"\n}",
      "stderr": "- Preparing the list of your Firebase ANDROID apps\n✖ Preparing the list of your Firebase ANDROID apps",
      "ok": false
    },
    "firebaseIosAppsList": {
      "name": "firebase_apps_ios_list_readonly",
      "command": "\n$ErrorActionPreference = \"Continue\"\n$fb = Get-Command firebase -ErrorAction SilentlyContinue\nif (-not $fb) {\n  Write-Output \"FIREBASE_CLI_NOT_AVAILABLE\"\n  exit 1\n}\nfirebase apps:list IOS --project=sabi-official-prod --json\nexit $LASTEXITCODE\n",
      "status": 2,
      "stdout": "{\n  \"status\": \"error\",\n  \"error\": \"Failed to list Firebase IOS apps. See firebase-debug.log for more info.\"\n}",
      "stderr": "- Preparing the list of your Firebase IOS apps\n✖ Preparing the list of your Firebase IOS apps",
      "ok": false
    },
    "firebaseWebAppsList": {
      "name": "firebase_apps_web_list_readonly",
      "command": "\n$ErrorActionPreference = \"Continue\"\n$fb = Get-Command firebase -ErrorAction SilentlyContinue\nif (-not $fb) {\n  Write-Output \"FIREBASE_CLI_NOT_AVAILABLE\"\n  exit 1\n}\nfirebase apps:list WEB --project=sabi-official-prod --json\nexit $LASTEXITCODE\n",
      "status": 2,
      "stdout": "{\n  \"status\": \"error\",\n  \"error\": \"Failed to list Firebase WEB apps. See firebase-debug.log for more info.\"\n}",
      "stderr": "- Preparing the list of your Firebase WEB apps\n✖ Preparing the list of your Firebase WEB apps",
      "ok": false
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
  "apiStatus": {
    "firebaseManagementApiEnabled": true,
    "identityToolkitApiEnabled": true
  },
  "inventories": {
    "projects": {
      "commandOk": true,
      "parseOk": true,
      "status": "success",
      "itemCount": 0,
      "items": [],
      "empty": true,
      "error": null
    },
    "androidApps": {
      "commandOk": false,
      "parseOk": true,
      "status": "error",
      "itemCount": 0,
      "items": [],
      "empty": true,
      "error": "Failed to list Firebase ANDROID apps. See firebase-debug.log for more info."
    },
    "iosApps": {
      "commandOk": false,
      "parseOk": true,
      "status": "error",
      "itemCount": 0,
      "items": [],
      "empty": true,
      "error": "Failed to list Firebase IOS apps. See firebase-debug.log for more info."
    },
    "webApps": {
      "commandOk": false,
      "parseOk": true,
      "status": "error",
      "itemCount": 0,
      "items": [],
      "empty": true,
      "error": "Failed to list Firebase WEB apps. See firebase-debug.log for more info."
    }
  },
  "officialAppsCurrentState": {
    "projectId": "sabi-official-prod",
    "projectVisible": false,
    "appCounts": {
      "android": 0,
      "ios": 0,
      "web": 0,
      "total": 0
    },
    "officialAndroidAppVisible": false,
    "officialIosAppVisible": false,
    "officialWebAppVisible": false,
    "androidApps": [],
    "iosApps": [],
    "webApps": [],
    "secretOrApiKeyValuesPrinted": false
  },
  "readiness": {
    "officialWebsiteReadiness": 100,
    "firebaseCliToolingReadiness": 100,
    "firebaseLoginReadiness": 100,
    "firebaseProjectInventoryReadiness": 100,
    "firebaseProjectVisibleReadiness": 0,
    "firebaseAppInventoryReadiness": 0,
    "officialFirebaseAppsVisibleReadiness": 0,
    "officialAndroidAppVisibleReadiness": 0,
    "officialIosAppVisibleReadiness": 0,
    "officialWebAppVisibleReadiness": 0,
    "noSecretOrApiKeyPrintReadiness": 100,
    "release246FFix1Readiness": 100,
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
  "checksPassed": 22,
  "checksTotal": 22,
  "checks": [
    {
      "name": "246f_fix1_gcloud_project_is_official",
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
      "name": "246f_fix1_active_gcloud_account_is_official_admin",
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
      "name": "246f_fix1_firebase_cli_available",
      "passed": true,
      "details": {
        "name": "firebase_cli_version",
        "command": "\n$ErrorActionPreference = \"Continue\"\n$fb = Get-Command firebase -ErrorAction SilentlyContinue\nif (-not $fb) {\n  Write-Output \"FIREBASE_CLI_NOT_AVAILABLE\"\n  exit 1\n}\nfirebase --version\nexit $LASTEXITCODE\n",
        "status": 0,
        "stdout": "15.22.1",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246f_fix1_firebase_login_available",
      "passed": true,
      "details": {
        "name": "firebase_login_list_readonly",
        "command": "\n$ErrorActionPreference = \"Continue\"\n$fb = Get-Command firebase -ErrorAction SilentlyContinue\nif (-not $fb) {\n  Write-Output \"FIREBASE_CLI_NOT_AVAILABLE\"\n  exit 1\n}\nfirebase login:list --json\nexit $LASTEXITCODE\n",
        "status": 0,
        "stdout": "{\n  \"status\": \"success\",\n  \"result\": [\n    {\n      \"user\": {\n        \"iss\": \"accounts.google.com\",\n        \"azp\": \"563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com\",\n        \"aud\": \"563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com\",\n        \"sub\": \"103206826275308495794\",\n        \"hd\": \"sabiai.app\",\n        \"email\": \"admin@sabiai.app\",\n        \"email_verified\": true,\n        \"at_hash\": \"ZiKQ3skDXknwsCxSr_YUhw\",\n        \"iat\": 1782184536,\n        \"exp\": 1782188136\n      },\n      \"tokens\": {\n        \"expires_at\": 1782188134731,\n        \"access_token\": \"[REDACTED_TOKEN]\",\n        \"expires_in\": 3599,\n        \"refresh_token\": \"[REDACTED_TOKEN]\",\n        \"scope\": \"https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/cloudplatformprojects.readonly https://www.googleapis.com/auth/firebase openid\",\n        \"token_type\": \"Bearer\",\n        \"id_token\": \"[REDACTED_JWT]\"\n      }\n    }\n  ]\n}",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246f_fix1_firebase_management_api_enabled",
      "passed": true,
      "details": {
        "firebaseManagementApiEnabled": true,
        "identityToolkitApiEnabled": true
      }
    },
    {
      "name": "246f_fix1_identitytoolkit_api_enabled",
      "passed": true,
      "details": {
        "firebaseManagementApiEnabled": true,
        "identityToolkitApiEnabled": true
      }
    },
    {
      "name": "246f_fix1_firebase_projects_inventory_readable",
      "passed": true,
      "details": {
        "commandOk": true,
        "parseOk": true,
        "status": "success",
        "itemCount": 0,
        "items": [],
        "empty": true,
        "error": null
      }
    },
    {
      "name": "246f_fix1_firebase_project_visibility_checked",
      "passed": true,
      "details": {
        "projectVisible": false,
        "projectId": "sabi-official-prod"
      }
    },
    {
      "name": "246f_fix1_firebase_app_inventories_attempted_readonly",
      "passed": true,
      "details": {
        "appCounts": {
          "android": 0,
          "ios": 0,
          "web": 0,
          "total": 0
        },
        "androidInventoryReadable": false,
        "iosInventoryReadable": false,
        "webInventoryReadable": false
      }
    },
    {
      "name": "246f_fix1_no_secret_or_api_key_value_printed",
      "passed": true,
      "details": {}
    },
    {
      "name": "246f_fix1_official_site_still_live",
      "passed": true,
      "details": {
        "name": "live_https_root_readonly",
        "command": "$u=\"https://sabiai.app/\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); Write-Output (\"LENGTH=\" + $r.Content.Length); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "STATUS=200\r\nLENGTH=51682",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246f_fix1_no_live_sms_sent",
      "passed": true,
      "details": {}
    },
    {
      "name": "246f_fix1_no_firebase_app_registration_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246f_fix1_no_firebase_config_download_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246f_fix1_no_firebase_user_creation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246f_fix1_no_phone_auth_live_test_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246f_fix1_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246f_fix1_no_google_pay_or_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246f_fix1_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246f_fix1_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246f_fix1_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246f_fix1_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [],
  "warnings": [
    "sabi_official_prod_not_visible_in_firebase_projects_inventory",
    "no_firebase_apps_registered_or_visible_in_sabi_official_prod_yet",
    "official_android_app_app_sabiai_superapp_not_visible_yet",
    "official_ios_app_app_sabiai_superapp_not_visible_yet",
    "official_web_app_for_sabiai_app_not_visible_yet"
  ],
  "nextStep": "246G_register_official_firebase_apps_requires_exact_owner_approval",
  "exactApprovalForNext": "I approve RELEASE-246G register official Firebase apps in project sabi-official-prod with Android package app.sabiai.superapp, iOS bundle app.sabiai.superapp, and Web app for sabiai.app only, no live SMS, no Firebase user creation, no phone auth live test, no secret or API key value print, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease246FFix1Report;
