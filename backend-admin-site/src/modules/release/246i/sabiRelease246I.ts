import type { SabiRelease246IReport } from './sabiRelease246I.types';

export const sabiRelease246IReport: SabiRelease246IReport = {
  "version": "SABI-RELEASE-246I-DOWNLOAD-FIREBASE-APP-CONFIGS-NO-LIVE-SMS-NO-SECRET-PRINT",
  "firebaseProjectId": "sabi-official-prod-37629",
  "officialSiteProjectId": "sabi-official-prod",
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
    "firebaseLoginList": {
      "name": "firebase_login_list_readonly",
      "command": "firebase login:list --json 2>$null",
      "status": 0,
      "stdout": "{\n  \"status\": \"success\",\n  \"result\": [\n    {\n      \"user\": {\n        \"iss\": \"accounts.google.com\",\n        \"azp\": \"563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com\",\n        \"aud\": \"563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com\",\n        \"sub\": \"103206826275308495794\",\n        \"hd\": \"sabiai.app\",\n        \"email\": \"admin@sabiai.app\",\n        \"email_verified\": true,\n        \"at_hash\": \"ZiKQ3skDXknwsCxSr_YUhw\",\n        \"iat\": 1782184536,\n        \"exp\": 1782188136\n      },\n      \"tokens\": {\n        \"expires_at\": 1782190926096,\n        \"refresh_token\":\"[REDACTED]\",\n        \"scopes\": [],\n        \"access_token\":\"[REDACTED]\",\n        \"expires_in\": 3599,\n        \"scope\": \"https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/cloudplatformprojects.readonly https://www.googleapis.com/auth/firebase openid https://www.googleapis.com/auth/cloud-platform\",\n        \"token_type\": \"Bearer\",\n        \"id_token\":\"[REDACTED]\"\n      }\n    }\n  ]\n}",
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
    "androidAppsList": {
      "name": "firebase_apps_android_list_readonly",
      "command": "firebase apps:list ANDROID --project=sabi-official-prod-37629 --json 2>$null",
      "status": 0,
      "stdout": "{\n  \"status\": \"success\",\n  \"result\": [\n    {\n      \"name\": \"projects/sabi-official-prod-37629/androidApps/1:970072647981:android:4161866ad2f57460fb4ba4\",\n      \"appId\": \"1:970072647981:android:4161866ad2f57460fb4ba4\",\n      \"displayName\": \"Sabi SuperApp Android Official\",\n      \"projectId\": \"sabi-official-prod-37629\",\n      \"packageName\": \"app.sabiai.superapp\",\n      \"apiKeyId\": \"24f0e35b-aae3-4649-84ab-ef79c1de015b\",\n      \"state\": \"ACTIVE\",\n      \"expireTime\": \"1970-01-01T00:00:00Z\",\n      \"etag\": \"1_01efd6e7-3eae-4dee-a136-d5a5d4ca2409\",\n      \"platform\": \"ANDROID\"\n    }\n  ]\n}",
      "stderr": "",
      "ok": true
    },
    "iosAppsList": {
      "name": "firebase_apps_ios_list_readonly",
      "command": "firebase apps:list IOS --project=sabi-official-prod-37629 --json 2>$null",
      "status": 1,
      "stdout": "{\n  \"status\": \"success\",\n  \"result\": [\n    {\n      \"name\": \"projects/sabi-official-prod-37629/iosApps/1:970072647981:ios:e365ee723a7ad0a3fb4ba4\",\n      \"appId\": \"1:970072647981:ios:e365ee723a7ad0a3fb4ba4\",\n      \"displayName\": \"Sabi SuperApp iOS Official\",\n      \"projectId\": \"sabi-official-prod-37629\",\n      \"bundleId\": \"app.sabiai.superapp\",\n      \"apiKeyId\": \"c64be1ff-b164-4e32-ac96-45297f1b803f\",\n      \"state\": \"ACTIVE\",\n      \"expireTime\": \"1970-01-01T00:00:00Z\",\n      \"etag\": \"1_4c460412-ad8e-4b41-9321-77aa56be1383\",\n      \"platform\": \"IOS\"\n    }\n  ]\n}{\n  \"status\": \"error\",\n  \"error\": \"Timed out.\"\n}",
      "stderr": "",
      "ok": false
    },
    "webAppsList": {
      "name": "firebase_apps_web_list_readonly",
      "command": "firebase apps:list WEB --project=sabi-official-prod-37629 --json 2>$null",
      "status": 1,
      "stdout": "{\n  \"status\": \"success\",\n  \"result\": [\n    {\n      \"name\": \"projects/sabi-official-prod-37629/webApps/1:970072647981:web:8ffb8324c268c54dfb4ba4\",\n      \"appId\": \"1:970072647981:web:8ffb8324c268c54dfb4ba4\",\n      \"displayName\": \"Sabi SuperApp Web Official\",\n      \"projectId\": \"sabi-official-prod-37629\",\n      \"webId\": \"NjhmNzA5ZTctMjI0NC00YzU0LThhOTAtY2Q2MWMwM2EzNWFj\",\n      \"apiKeyId\": \"393e0b27-7688-41ca-abc3-5d17d71d03bf\",\n      \"state\": \"ACTIVE\",\n      \"expireTime\": \"1970-01-01T00:00:00Z\",\n      \"etag\": \"1_77ac929e-84ce-416a-95de-b3592a41eac7\",\n      \"platform\": \"WEB\"\n    }\n  ]\n}{\n  \"status\": \"error\",\n  \"error\": \"Timed out.\"\n}",
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
    }
  },
  "androidInventory": {
    "parseOk": true,
    "itemCount": 1,
    "items": [
      {
        "displayName": "Sabi SuperApp Android Official",
        "platform": "ANDROID",
        "appIdPresent": true,
        "appIdValuePrintedInReport": false,
        "packageName": "app.sabiai.superapp",
        "state": "ACTIVE"
      }
    ]
  },
  "iosInventory": {
    "parseOk": false,
    "itemCount": 0,
    "items": []
  },
  "webInventory": {
    "parseOk": false,
    "itemCount": 0,
    "items": []
  },
  "downloads": {
    "android": {
      "method": "sdkconfig_out",
      "ok": true,
      "fileExists": true,
      "sizeBytes": 697
    },
    "ios": {
      "method": null,
      "ok": false,
      "fileExists": false,
      "sizeBytes": 0
    },
    "web": {
      "method": null,
      "ok": false,
      "fileExists": false,
      "sizeBytes": 0
    }
  },
  "configInspection": {
    "android": {
      "exists": true,
      "file": ".data/release/246i/configs/google-services.official.sabi.json",
      "sizeBytes": 697,
      "sha256": "cdec165560778e1e69db5dbdb3cf9d84929fa724ce81dd52f9220bdb9a15c575",
      "readableJson": true,
      "projectId": "sabi-official-prod-37629",
      "packageNames": [
        "app.sabiai.superapp"
      ],
      "packageMatchesOfficial": true,
      "apiKeyValuePresentInConfigFile": true,
      "apiKeyValuePrintedInReport": false,
      "apiKeyCount": 1
    },
    "ios": {
      "exists": false
    },
    "web": {
      "exists": false
    }
  },
  "status": "failed",
  "createdAt": "2026-06-23T04:18:53.880Z",
  "approval": "I approve RELEASE-246I download Firebase app configs from project sabi-official-prod-37629 for Android/iOS/Web only and store them locally with API key values never printed, no live SMS, no Firebase user creation, no phone auth live test, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "scope": "download_android_ios_web_firebase_configs_store_locally_no_api_key_value_print_no_live_sms",
  "readiness": {
    "firebaseProjectVisibleReadiness": 100,
    "officialWebsiteReadiness": 100,
    "androidAppFoundReadiness": 100,
    "iosAppFoundReadiness": 0,
    "webAppFoundReadiness": 0,
    "androidConfigDownloadReadiness": 100,
    "iosConfigDownloadReadiness": 0,
    "webConfigDownloadReadiness": 0,
    "allFirebaseConfigsDownloadedReadiness": 0,
    "noSecretOrApiKeyPrintReadiness": 100,
    "release246IReadiness": 0,
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
    "configDownloadOnly": true,
    "configFilesContainApiKeysByFirebaseDesignButValuesNotPrinted": true,
    "noLiveSmsSentNow": true,
    "noFirebaseUserCreationNow": true,
    "noPhoneAuthLiveTestNow": true,
    "noDnsMutationNow": true,
    "noGooglePayOrBillingNow": true,
    "noWalletPaymentPayoutNow": true,
    "noDbMutationNow": true,
    "noSecretManagerReadWriteNow": true,
    "noEnvReadWriteNow": true,
    "exactOwnerApprovalRequiredBeforeApplyingConfigsOrSms": true
  },
  "checksPassed": 14,
  "checksTotal": 18,
  "checks": [
    {
      "name": "246i_firebase_project_visible",
      "passed": true,
      "details": {
        "firebaseProjectId": "sabi-official-prod-37629"
      }
    },
    {
      "name": "246i_official_site_still_live",
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
      "name": "246i_android_app_found",
      "passed": true,
      "details": {
        "found": true,
        "packageName": "app.sabiai.superapp"
      }
    },
    {
      "name": "246i_ios_app_found",
      "passed": false,
      "details": {
        "found": false,
        "bundleId": "app.sabiai.superapp"
      }
    },
    {
      "name": "246i_web_app_found",
      "passed": false,
      "details": {
        "found": false
      }
    },
    {
      "name": "246i_android_config_downloaded",
      "passed": true,
      "details": {
        "exists": true,
        "file": ".data/release/246i/configs/google-services.official.sabi.json",
        "sizeBytes": 697,
        "sha256": "cdec165560778e1e69db5dbdb3cf9d84929fa724ce81dd52f9220bdb9a15c575",
        "readableJson": true,
        "projectId": "sabi-official-prod-37629",
        "packageNames": [
          "app.sabiai.superapp"
        ],
        "packageMatchesOfficial": true,
        "apiKeyValuePresentInConfigFile": true,
        "apiKeyValuePrintedInReport": false,
        "apiKeyCount": 1
      }
    },
    {
      "name": "246i_ios_config_downloaded",
      "passed": false,
      "details": {
        "exists": false
      }
    },
    {
      "name": "246i_web_config_downloaded",
      "passed": false,
      "details": {
        "exists": false
      }
    },
    {
      "name": "246i_no_api_key_or_secret_value_printed_in_report",
      "passed": true,
      "details": {}
    },
    {
      "name": "246i_no_live_sms_sent_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246i_no_firebase_user_creation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246i_no_phone_auth_live_test_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246i_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246i_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246i_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246i_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246i_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246i_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [
    "246i_ios_app_found",
    "246i_web_app_found",
    "246i_ios_config_downloaded",
    "246i_web_config_downloaded"
  ],
  "warnings": [
    "firebase_auth_sms_project_is_suffix_project_while_cloud_run_site_project_is_sabi_official_prod",
    "mobile_android_package_must_be_aligned_to_app.sabiai.superapp_before_real_auth_runtime"
  ],
  "nextStep": "246I_FIX1_review_failed_config_download",
  "exactApprovalForNext": "I approve RELEASE-246J apply downloaded Firebase configs from project sabi-official-prod-37629 to superapp-mobile and align Android package/iOS bundle to app.sabiai.superapp only, no live SMS, no Firebase user creation, no phone auth live test, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease246IReport;
