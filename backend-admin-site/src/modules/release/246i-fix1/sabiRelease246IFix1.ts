import type { SabiRelease246IFix1Report } from './sabiRelease246IFix1.types';

export const sabiRelease246IFix1Report: SabiRelease246IFix1Report = {
  "version": "SABI-RELEASE-246I-FIX1-DOWNLOAD-IOS-WEB-CONFIGS-DIRECT-APPIDS-NO-LIVE-SMS-NO-SECRET-PRINT",
  "status": "passed",
  "createdAt": "2026-06-23T04:33:04.961Z",
  "approvalInherited": "Inherited from RELEASE-246I owner approval: download Firebase app configs from project sabi-official-prod-37629 for Android/iOS/Web only and store them locally with API key values never printed, no live SMS, no Firebase user creation, no phone auth live test, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout.",
  "firebaseProjectId": "sabi-official-prod-37629",
  "officialSiteProjectId": "sabi-official-prod",
  "scope": "download_missing_ios_web_configs_direct_appids_preserve_android_no_live_sms_no_api_key_print",
  "appIds": {
    "androidAppIdPresent": true,
    "iosAppIdPresent": true,
    "webAppIdPresent": true,
    "appIdValuesPrintedInReport": false
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
      "status": 0,
      "stdout": "{\n  \"status\": \"success\",\n  \"result\": [\n    {\n      \"name\": \"projects/sabi-official-prod-37629/iosApps/1:970072647981:ios:e365ee723a7ad0a3fb4ba4\",\n      \"appId\": \"1:970072647981:ios:e365ee723a7ad0a3fb4ba4\",\n      \"displayName\": \"Sabi SuperApp iOS Official\",\n      \"projectId\": \"sabi-official-prod-37629\",\n      \"bundleId\": \"app.sabiai.superapp\",\n      \"apiKeyId\": \"c64be1ff-b164-4e32-ac96-45297f1b803f\",\n      \"state\": \"ACTIVE\",\n      \"expireTime\": \"1970-01-01T00:00:00Z\",\n      \"etag\": \"1_4c460412-ad8e-4b41-9321-77aa56be1383\",\n      \"platform\": \"IOS\"\n    }\n  ]\n}",
      "stderr": "",
      "ok": true
    },
    "webAppsList": {
      "name": "firebase_apps_web_list_readonly",
      "command": "firebase apps:list WEB --project=sabi-official-prod-37629 --json 2>$null",
      "status": 0,
      "stdout": "{\n  \"status\": \"success\",\n  \"result\": [\n    {\n      \"name\": \"projects/sabi-official-prod-37629/webApps/1:970072647981:web:8ffb8324c268c54dfb4ba4\",\n      \"appId\": \"1:970072647981:web:8ffb8324c268c54dfb4ba4\",\n      \"displayName\": \"Sabi SuperApp Web Official\",\n      \"projectId\": \"sabi-official-prod-37629\",\n      \"webId\": \"NjhmNzA5ZTctMjI0NC00YzU0LThhOTAtY2Q2MWMwM2EzNWFj\",\n      \"apiKeyId\": \"393e0b27-7688-41ca-abc3-5d17d71d03bf\",\n      \"state\": \"ACTIVE\",\n      \"expireTime\": \"1970-01-01T00:00:00Z\",\n      \"etag\": \"1_77ac929e-84ce-416a-95de-b3592a41eac7\",\n      \"platform\": \"WEB\"\n    }\n  ]\n}",
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
    "downloadIos": {
      "method": "sdkconfig_out",
      "commandOk": true,
      "fileExists": true,
      "sizeBytes": 899,
      "stdoutPreview": "App configuration is written in C:\\Users\\User\\Desktop\\superapp\\.data\\release\\246i\\configs\\GoogleService-Info.official.sabi.plist",
      "stderrPreview": "��n\u0000o\u0000d\u0000e\u0000.\u0000e\u0000x\u0000e\u0000 \u0000:\u0000 \u0000-\u0000 \u0000D\u0000o\u0000w\u0000n\u0000l\u0000o\u0000a\u0000d\u0000i\u0000n\u0000g\u0000 \u0000c\u0000o\u0000n\u0000f\u0000i\u0000g\u0000u\u0000r\u0000a\u0000t\u0000i\u0000o\u0000n\u0000 \u0000d\u0000a\u0000t\u0000a\u0000 \u0000o\u0000f\u0000\r\u0000\n\u0000 \u0000y\u0000o\u0000u\u0000r\u0000 \u0000F\u0000i\u0000r\u0000e\u0000b\u0000a\u0000s\u0000e\u0000 \u0000I\u0000O\u0000S\u0000 \u0000a\u0000p\u0000p\u0000\r\u0000\n\u0000C\u0000:\u0000\\\u0000U\u0000s\u0000e\u0000r\u0000s\u0000\\\u0000U\u0000s\u0000e\u0000r\u0000\\\u0000A\u0000p\u0000p\u0000D\u0000a\u0000t\u0000a\u0000\\\u0000R\u0000o\u0000a\u0000m\u0000i\u0000n\u0000g\u0000\\\u0000n\u0000p\u0000m\u0000\\\u0000f\u0000i\u0000r\u0000e\u0000b\u0000a\u0000s\u0000e\u0000.\u0000p\u0000s\u00001\u0000\r\u0000\n\u0000:\u00002\u00004\u0000 \u00007\u0004=\u00040\u0004:\u0004:\u00005\u0000\r\u0000\n\u0000+\u0000 \u0000 \u0000 \u0000 \u0000 \u0000&\u0000 \u0000\"\u0000n\u0000o\u0000d\u0000e\u0000$\u0000e\u0000x\u0000e\u0000\"\u0000 \u0000 \u0000\"\u0000$\u0000b\u0000a\u0000s\u0000e\u0000d\u0000i\u0000r\u0000/\u0000n\u0000o\u0000d\u0000e\u0000_\u0000m\u0000o\u0000d\u0000u\u0000l\u0000e\u0000s\u0000/\u0000f\u0000i\u0000r\u0000\r\u0000\n\u0000e\u0000b\u0000a\u0000s\u0000e\u0000-\u0000t\u0000o\u0000o\u0000l\u0000s\u0000/\u0000l\u0000i\u0000b\u0000/\u0000b\u0000i\u0000n\u0000/\u0000f\u0000i\u0000r\u0000e\u0000b\u0000 \u0000.\u0000.\u0000.\u0000\r\u0000\n\u0000+\u0000 \u0000 \u0000 \u0000 \u0000 \u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000\r\u0000\n\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000\r\u0000\n\u0000 \u0000 \u0000 \u0000 \u0000+\u0000 \u0000C\u0000a\u0000t\u0000e\u0000g\u0000o\u0000r\u0000y\u0000I\u0000n\u0000f\u0000o\u0000 \u0000 \u0000 \u0000 \u0000 \u0000 \u0000 \u0000 \u0000 \u0000 \u0000:\u0000 \u0000N\u0000o\u0000t\u0000S\u0000p\u0000e\u0000c\u0000i\u0000f\u0000i\u0000e\u0000d\u0000:\u0000 \u0000(\u0000 \u0000\r\u0000\n\u0000 \u0000 \u0000 \u0000-\u0000 \u0000D\u0000o\u0000w\u0000n\u0000l\u0000o\u0000a\u0000d\u0000i\u0000n\u0000g\u0000 \u0000c\u0000.\u0000.\u0000.\u0000i\u0000r\u0000e\u0000b\u0000a\u0000s\u0000e\u0000 \u0000I\u0000O\u0000S\u0000 \u0000a\u0000p\u0000p\u0000:\u0000S\u0000t\u0000r\u0000i\u0000n\u0000g\u0000)\u0000 \u0000 \u0000\r\u0000\n\u0000 \u0000 \u0000 \u0000[\u0000]\u0000,\u0000 \u0000R\u0000e\u0000m\u0000o\u0000t\u0000e\u0000E\u0000x\u0000c\u0000e\u0000p\u0000t\u0000i\u0000o\u0000n\u0000\r\u0000\n\u0000 \u0000 \u0000 \u0000 \u0000+\u0000 \u0000F\u0000u\u0000l\u0000l\u0000y\u0000Q\u0000u\u0000a\u0000l\u0000i\u0000f\u0000i\u0000e\u0000d\u0000E\u0000r\u0000r\u0000o\u0000r\u0000I\u0000d\u0000 \u0000:\u0000 \u0000N\u0000a\u0000t\u0000i\u0000v\u0000e\u0000C\u0000o\u0000m\u0000m\u0000a\u0000n\u0000d\u0000E\u0000r\u0000 \u0000\r\u0000\n\u0000 \u0000 \u0000 \u0000r\u0000o\u0000r\u0000\r\u0000\n\u0000 \u0000\r\u0000\n\u0000B\u0004,\u0004$\u0004 \u0000D\u0000o\u0000w\u0000n\u0000l\u0000o\u0000a\u0000d\u0000i\u0000n\u0000g\u0000 \u0000c\u0000o\u0000n\u0000f\u0000i\u0000g\u0000u\u0000r\u0000a\u0000t\u0000i\u0000o\u0000n\u0000 \u0000d\u0000a\u0000t\u0000a\u0000"
    },
    "downloadWeb": {
      "method": "sdkconfig_out",
      "commandOk": true,
      "fileExists": true,
      "sizeBytes": 410,
      "stdoutPreview": "App configuration is written in C:\\Users\\User\\Desktop\\superapp\\.data\\release\\246i\\configs\\firebase-web-config.official.sabi.js",
      "stderrPreview": "��n\u0000o\u0000d\u0000e\u0000.\u0000e\u0000x\u0000e\u0000 \u0000:\u0000 \u0000-\u0000 \u0000D\u0000o\u0000w\u0000n\u0000l\u0000o\u0000a\u0000d\u0000i\u0000n\u0000g\u0000 \u0000c\u0000o\u0000n\u0000f\u0000i\u0000g\u0000u\u0000r\u0000a\u0000t\u0000i\u0000o\u0000n\u0000 \u0000d\u0000a\u0000t\u0000a\u0000 \u0000o\u0000f\u0000\r\u0000\n\u0000 \u0000y\u0000o\u0000u\u0000r\u0000 \u0000F\u0000i\u0000r\u0000e\u0000b\u0000a\u0000s\u0000e\u0000 \u0000W\u0000E\u0000B\u0000 \u0000a\u0000p\u0000p\u0000\r\u0000\n\u0000C\u0000:\u0000\\\u0000U\u0000s\u0000e\u0000r\u0000s\u0000\\\u0000U\u0000s\u0000e\u0000r\u0000\\\u0000A\u0000p\u0000p\u0000D\u0000a\u0000t\u0000a\u0000\\\u0000R\u0000o\u0000a\u0000m\u0000i\u0000n\u0000g\u0000\\\u0000n\u0000p\u0000m\u0000\\\u0000f\u0000i\u0000r\u0000e\u0000b\u0000a\u0000s\u0000e\u0000.\u0000p\u0000s\u00001\u0000\r\u0000\n\u0000:\u00002\u00004\u0000 \u00007\u0004=\u00040\u0004:\u0004:\u00005\u0000\r\u0000\n\u0000+\u0000 \u0000 \u0000 \u0000 \u0000 \u0000&\u0000 \u0000\"\u0000n\u0000o\u0000d\u0000e\u0000$\u0000e\u0000x\u0000e\u0000\"\u0000 \u0000 \u0000\"\u0000$\u0000b\u0000a\u0000s\u0000e\u0000d\u0000i\u0000r\u0000/\u0000n\u0000o\u0000d\u0000e\u0000_\u0000m\u0000o\u0000d\u0000u\u0000l\u0000e\u0000s\u0000/\u0000f\u0000i\u0000r\u0000\r\u0000\n\u0000e\u0000b\u0000a\u0000s\u0000e\u0000-\u0000t\u0000o\u0000o\u0000l\u0000s\u0000/\u0000l\u0000i\u0000b\u0000/\u0000b\u0000i\u0000n\u0000/\u0000f\u0000i\u0000r\u0000e\u0000b\u0000 \u0000.\u0000.\u0000.\u0000\r\u0000\n\u0000+\u0000 \u0000 \u0000 \u0000 \u0000 \u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000\r\u0000\n\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000~\u0000\r\u0000\n\u0000 \u0000 \u0000 \u0000 \u0000+\u0000 \u0000C\u0000a\u0000t\u0000e\u0000g\u0000o\u0000r\u0000y\u0000I\u0000n\u0000f\u0000o\u0000 \u0000 \u0000 \u0000 \u0000 \u0000 \u0000 \u0000 \u0000 \u0000 \u0000:\u0000 \u0000N\u0000o\u0000t\u0000S\u0000p\u0000e\u0000c\u0000i\u0000f\u0000i\u0000e\u0000d\u0000:\u0000 \u0000(\u0000 \u0000\r\u0000\n\u0000 \u0000 \u0000 \u0000-\u0000 \u0000D\u0000o\u0000w\u0000n\u0000l\u0000o\u0000a\u0000d\u0000i\u0000n\u0000g\u0000 \u0000c\u0000.\u0000.\u0000.\u0000i\u0000r\u0000e\u0000b\u0000a\u0000s\u0000e\u0000 \u0000W\u0000E\u0000B\u0000 \u0000a\u0000p\u0000p\u0000:\u0000S\u0000t\u0000r\u0000i\u0000n\u0000g\u0000)\u0000 \u0000 \u0000\r\u0000\n\u0000 \u0000 \u0000 \u0000[\u0000]\u0000,\u0000 \u0000R\u0000e\u0000m\u0000o\u0000t\u0000e\u0000E\u0000x\u0000c\u0000e\u0000p\u0000t\u0000i\u0000o\u0000n\u0000\r\u0000\n\u0000 \u0000 \u0000 \u0000 \u0000+\u0000 \u0000F\u0000u\u0000l\u0000l\u0000y\u0000Q\u0000u\u0000a\u0000l\u0000i\u0000f\u0000i\u0000e\u0000d\u0000E\u0000r\u0000r\u0000o\u0000r\u0000I\u0000d\u0000 \u0000:\u0000 \u0000N\u0000a\u0000t\u0000i\u0000v\u0000e\u0000C\u0000o\u0000m\u0000m\u0000a\u0000n\u0000d\u0000E\u0000r\u0000 \u0000\r\u0000\n\u0000 \u0000 \u0000 \u0000r\u0000o\u0000r\u0000\r\u0000\n\u0000 \u0000\r\u0000\n\u0000B\u0004,\u0004$\u0004 \u0000D\u0000o\u0000w\u0000n\u0000l\u0000o\u0000a\u0000d\u0000i\u0000n\u0000g\u0000 \u0000c\u0000o\u0000n\u0000f\u0000i\u0000g\u0000u\u0000r\u0000a\u0000t\u0000i\u0000o\u0000n\u0000 \u0000d\u0000a\u0000t\u0000a\u0000"
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
      "apiKeyValuePrintedInReport": false
    },
    "ios": {
      "exists": true,
      "file": ".data/release/246i/configs/GoogleService-Info.official.sabi.plist",
      "sizeBytes": 899,
      "sha256": "c06f867a34da760b5e7d081893cb8db1d50289e6e87e13e929cfd3f4f88632e6",
      "plistLike": true,
      "projectIdPresent": true,
      "bundleIdPresent": true,
      "appIdPresent": true,
      "apiKeyValuePresentInConfigFile": true,
      "apiKeyValuePrintedInReport": false
    },
    "web": {
      "exists": true,
      "file": ".data/release/246i/configs/firebase-web-config.official.sabi.js",
      "sizeBytes": 410,
      "sha256": "68fd3f25e72dd1f394cdf0c16959ec63d5b27e6d4f83023ee6d54c6a76c228cc",
      "projectIdPresent": true,
      "appIdPresent": true,
      "apiKeyValuePresentInConfigFile": true,
      "apiKeyValuePrintedInReport": false
    }
  },
  "readiness": {
    "firebaseProjectVisibleReadiness": 100,
    "officialWebsiteReadiness": 100,
    "androidConfigReadiness": 100,
    "iosConfigDownloadReadiness": 100,
    "webConfigDownloadReadiness": 100,
    "allFirebaseConfigsDownloadedReadiness": 100,
    "noSecretOrApiKeyPrintReadiness": 100,
    "release246IFix1Readiness": 100,
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
    "ownerApprovalCapturedFrom246I": true,
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
  "checksPassed": 15,
  "checksTotal": 15,
  "checks": [
    {
      "name": "246i_fix1_firebase_project_visible",
      "passed": true,
      "details": {
        "firebaseProjectId": "sabi-official-prod-37629"
      }
    },
    {
      "name": "246i_fix1_official_site_still_live",
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
      "name": "246i_fix1_android_config_still_ready",
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
        "apiKeyValuePrintedInReport": false
      }
    },
    {
      "name": "246i_fix1_ios_config_downloaded",
      "passed": true,
      "details": {
        "exists": true,
        "file": ".data/release/246i/configs/GoogleService-Info.official.sabi.plist",
        "sizeBytes": 899,
        "sha256": "c06f867a34da760b5e7d081893cb8db1d50289e6e87e13e929cfd3f4f88632e6",
        "plistLike": true,
        "projectIdPresent": true,
        "bundleIdPresent": true,
        "appIdPresent": true,
        "apiKeyValuePresentInConfigFile": true,
        "apiKeyValuePrintedInReport": false
      }
    },
    {
      "name": "246i_fix1_web_config_downloaded",
      "passed": true,
      "details": {
        "exists": true,
        "file": ".data/release/246i/configs/firebase-web-config.official.sabi.js",
        "sizeBytes": 410,
        "sha256": "68fd3f25e72dd1f394cdf0c16959ec63d5b27e6d4f83023ee6d54c6a76c228cc",
        "projectIdPresent": true,
        "appIdPresent": true,
        "apiKeyValuePresentInConfigFile": true,
        "apiKeyValuePrintedInReport": false
      }
    },
    {
      "name": "246i_fix1_no_api_key_or_secret_value_printed_in_report",
      "passed": true,
      "details": {}
    },
    {
      "name": "246i_fix1_no_live_sms_sent_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246i_fix1_no_firebase_user_creation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246i_fix1_no_phone_auth_live_test_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246i_fix1_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246i_fix1_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246i_fix1_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246i_fix1_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246i_fix1_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246i_fix1_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [],
  "warnings": [
    "firebase_auth_sms_project_is_suffix_project_while_cloud_run_site_project_is_sabi_official_prod",
    "mobile_android_package_must_be_aligned_to_app.sabiai.superapp_before_real_auth_runtime"
  ],
  "nextStep": "246J_apply_firebase_configs_to_mobile_and_align_package_bundle_requires_exact_owner_approval_no_live_sms",
  "exactApprovalForNext": "I approve RELEASE-246J apply downloaded Firebase configs from project sabi-official-prod-37629 to superapp-mobile and align Android package/iOS bundle to app.sabiai.superapp only, no live SMS, no Firebase user creation, no phone auth live test, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease246IFix1Report;
