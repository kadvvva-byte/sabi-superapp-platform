import type { SabiRelease246HReport } from './sabiRelease246H.types';

export const sabiRelease246HReport: SabiRelease246HReport = {
  "version": "SABI-RELEASE-246H-REGISTER-OFFICIAL-FIREBASE-APPS-NO-CONFIG-DOWNLOAD-NO-LIVE-SMS",
  "status": "passed",
  "createdAt": "2026-06-23T04:12:43.486Z",
  "approval": "I approve RELEASE-246H register official Firebase apps in Firebase project sabi-official-prod-37629 with Android package app.sabiai.superapp, iOS bundle app.sabiai.superapp, and Web app for sabiai.app only, no live SMS, no Firebase user creation, no phone auth live test, no secret or API key value print, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "firebaseProjectId": "sabi-official-prod-37629",
  "officialSiteProjectId": "sabi-official-prod",
  "scope": "register_android_ios_web_firebase_apps_only_no_config_download_no_live_sms",
  "appTargets": {
    "androidPackageName": "app.sabiai.superapp",
    "iosBundleId": "app.sabiai.superapp",
    "webDisplayName": "Sabi SuperApp Web Official",
    "androidDisplayName": "Sabi SuperApp Android Official",
    "iosDisplayName": "Sabi SuperApp iOS Official"
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
      "stdout": "{\n  \"status\": \"success\",\n  \"result\": [\n    {\n      \"projectId\": \"sabi-official-prod-37629\",\n      \"projectNumber\": \"970072647981\",\n      \"displayName\": \"sabi-official-prod\",\n      \"name\": \"projects/sabi-official-prod-37629\",\n      \"resources\": {\n        \"hostingSite\": \"sabi-official-prod-37629\"\n      },\n      \"state\": \"ACTIVE\",\n      \"etag\": \"1_03035e88-2e8f-4354-b0e9-1dd285eca243\"\n    }\n  ]\n}",
      "stderr": "",
      "ok": true
    },
    "beforeApps": {
      "android": {
        "name": "firebase_apps_android_list",
        "command": "firebase apps:list ANDROID --project=sabi-official-prod-37629 --json 2>$null",
        "status": 0,
        "stdout": "{\n  \"status\": \"success\",\n  \"result\": []\n}",
        "stderr": "",
        "ok": true
      },
      "ios": {
        "name": "firebase_apps_ios_list",
        "command": "firebase apps:list IOS --project=sabi-official-prod-37629 --json 2>$null",
        "status": 0,
        "stdout": "{\n  \"status\": \"success\",\n  \"result\": []\n}",
        "stderr": "",
        "ok": true
      },
      "web": {
        "name": "firebase_apps_web_list",
        "command": "firebase apps:list WEB --project=sabi-official-prod-37629 --json 2>$null",
        "status": 0,
        "stdout": "{\n  \"status\": \"success\",\n  \"result\": []\n}",
        "stderr": "",
        "ok": true
      }
    },
    "liveRoot": {
      "name": "live_https_root_readonly",
      "command": "$u=\"https://sabiai.app/\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "STATUS=200",
      "stderr": "",
      "ok": true
    },
    "createAndroid": {
      "name": "firebase_create_android_app",
      "command": "firebase apps:create android \"Sabi SuperApp Android Official\" --package-name=app.sabiai.superapp --project=sabi-official-prod-37629 --json",
      "status": 0,
      "stdout": "{\n  \"status\": \"success\",\n  \"result\": {\n    \"@type\": \"type.googleapis.com/google.firebase.service.v1beta1.AndroidApp\",\n    \"name\": \"projects/sabi-official-prod-37629/androidApps/1:970072647981:android:4161866ad2f57460fb4ba4\",\n    \"appId\": \"1:970072647981:android:4161866ad2f57460fb4ba4\",\n    \"displayName\": \"Sabi SuperApp Android Official\",\n    \"projectId\": \"sabi-official-prod-37629\",\n    \"packageName\": \"app.sabiai.superapp\",\n    \"apiKeyId\": \"24f0e35b-aae3-4649-84ab-ef79c1de015b\",\n    \"state\": \"ACTIVE\",\n    \"expireTime\": \"1970-01-01T00:00:00Z\",\n    \"etag\": \"1_01efd6e7-3eae-4dee-a136-d5a5d4ca2409\"\n  }\n}",
      "stderr": "- Creating your Android app\n✔ Creating your Android app",
      "ok": true
    },
    "createIos": {
      "name": "firebase_create_ios_app",
      "command": "firebase apps:create ios \"Sabi SuperApp iOS Official\" --bundle-id=app.sabiai.superapp --project=sabi-official-prod-37629 --json",
      "status": 0,
      "stdout": "{\n  \"status\": \"success\",\n  \"result\": {\n    \"@type\": \"type.googleapis.com/google.firebase.service.v1beta1.IosApp\",\n    \"name\": \"projects/sabi-official-prod-37629/iosApps/1:970072647981:ios:e365ee723a7ad0a3fb4ba4\",\n    \"appId\": \"1:970072647981:ios:e365ee723a7ad0a3fb4ba4\",\n    \"displayName\": \"Sabi SuperApp iOS Official\",\n    \"projectId\": \"sabi-official-prod-37629\",\n    \"bundleId\": \"app.sabiai.superapp\",\n    \"apiKeyId\": \"c64be1ff-b164-4e32-ac96-45297f1b803f\",\n    \"state\": \"ACTIVE\",\n    \"expireTime\": \"1970-01-01T00:00:00Z\",\n    \"etag\": \"1_4c460412-ad8e-4b41-9321-77aa56be1383\"\n  }\n}",
      "stderr": "- Creating your iOS app\n✔ Creating your iOS app",
      "ok": true
    },
    "createWeb": {
      "name": "firebase_create_web_app",
      "command": "firebase apps:create web \"Sabi SuperApp Web Official\" --project=sabi-official-prod-37629 --json",
      "status": 0,
      "stdout": "{\n  \"status\": \"success\",\n  \"result\": {\n    \"@type\": \"type.googleapis.com/google.firebase.service.v1beta1.WebApp\",\n    \"name\": \"projects/sabi-official-prod-37629/webApps/1:970072647981:web:8ffb8324c268c54dfb4ba4\",\n    \"appId\": \"1:970072647981:web:8ffb8324c268c54dfb4ba4\",\n    \"displayName\": \"Sabi SuperApp Web Official\",\n    \"projectId\": \"sabi-official-prod-37629\",\n    \"webId\": \"NjhmNzA5ZTctMjI0NC00YzU0LThhOTAtY2Q2MWMwM2EzNWFj\",\n    \"apiKeyId\": \"393e0b27-7688-41ca-abc3-5d17d71d03bf\",\n    \"state\": \"ACTIVE\",\n    \"expireTime\": \"1970-01-01T00:00:00Z\",\n    \"etag\": \"1_77ac929e-84ce-416a-95de-b3592a41eac7\"\n  }\n}",
      "stderr": "- Creating your Web app\n✔ Creating your Web app",
      "ok": true
    },
    "afterApps": {
      "android": {
        "name": "firebase_apps_android_list",
        "command": "firebase apps:list ANDROID --project=sabi-official-prod-37629 --json 2>$null",
        "status": 0,
        "stdout": "{\n  \"status\": \"success\",\n  \"result\": [\n    {\n      \"name\": \"projects/sabi-official-prod-37629/androidApps/1:970072647981:android:4161866ad2f57460fb4ba4\",\n      \"appId\": \"1:970072647981:android:4161866ad2f57460fb4ba4\",\n      \"displayName\": \"Sabi SuperApp Android Official\",\n      \"projectId\": \"sabi-official-prod-37629\",\n      \"packageName\": \"app.sabiai.superapp\",\n      \"apiKeyId\": \"24f0e35b-aae3-4649-84ab-ef79c1de015b\",\n      \"state\": \"ACTIVE\",\n      \"expireTime\": \"1970-01-01T00:00:00Z\",\n      \"etag\": \"1_01efd6e7-3eae-4dee-a136-d5a5d4ca2409\",\n      \"platform\": \"ANDROID\"\n    }\n  ]\n}",
        "stderr": "",
        "ok": true
      },
      "ios": {
        "name": "firebase_apps_ios_list",
        "command": "firebase apps:list IOS --project=sabi-official-prod-37629 --json 2>$null",
        "status": 0,
        "stdout": "{\n  \"status\": \"success\",\n  \"result\": [\n    {\n      \"name\": \"projects/sabi-official-prod-37629/iosApps/1:970072647981:ios:e365ee723a7ad0a3fb4ba4\",\n      \"appId\": \"1:970072647981:ios:e365ee723a7ad0a3fb4ba4\",\n      \"displayName\": \"Sabi SuperApp iOS Official\",\n      \"projectId\": \"sabi-official-prod-37629\",\n      \"bundleId\": \"app.sabiai.superapp\",\n      \"apiKeyId\": \"c64be1ff-b164-4e32-ac96-45297f1b803f\",\n      \"state\": \"ACTIVE\",\n      \"expireTime\": \"1970-01-01T00:00:00Z\",\n      \"etag\": \"1_4c460412-ad8e-4b41-9321-77aa56be1383\",\n      \"platform\": \"IOS\"\n    }\n  ]\n}",
        "stderr": "",
        "ok": true
      },
      "web": {
        "name": "firebase_apps_web_list",
        "command": "firebase apps:list WEB --project=sabi-official-prod-37629 --json 2>$null",
        "status": 0,
        "stdout": "{\n  \"status\": \"success\",\n  \"result\": [\n    {\n      \"name\": \"projects/sabi-official-prod-37629/webApps/1:970072647981:web:8ffb8324c268c54dfb4ba4\",\n      \"appId\": \"1:970072647981:web:8ffb8324c268c54dfb4ba4\",\n      \"displayName\": \"Sabi SuperApp Web Official\",\n      \"projectId\": \"sabi-official-prod-37629\",\n      \"webId\": \"NjhmNzA5ZTctMjI0NC00YzU0LThhOTAtY2Q2MWMwM2EzNWFj\",\n      \"apiKeyId\": \"393e0b27-7688-41ca-abc3-5d17d71d03bf\",\n      \"state\": \"ACTIVE\",\n      \"expireTime\": \"1970-01-01T00:00:00Z\",\n      \"etag\": \"1_77ac929e-84ce-416a-95de-b3592a41eac7\",\n      \"platform\": \"WEB\"\n    }\n  ]\n}",
        "stderr": "",
        "ok": true
      }
    }
  },
  "createSummary": {
    "android": {
      "commandOk": true,
      "acceptedAsOk": true,
      "alreadyExists": false,
      "status": 0,
      "appIdPresent": true,
      "appIdValuePrinted": false,
      "rawPreview": "{\n  \"status\": \"success\",\n  \"result\": {\n    \"@type\": \"type.googleapis.com/google.firebase.service.v1beta1.AndroidApp\",\n    \"name\": \"projects/sabi-official-prod-37629/androidApps/1:970072647981:android:4161866ad2f57460fb4ba4\",\n    \"appId\": \"1:970072647981:android:4161866ad2f57460fb4ba4\",\n    \"displayName\": \"Sabi SuperApp Android Official\",\n    \"projectId\": \"sabi-official-prod-37629\",\n    \"packageName\": \"app.sabiai.superapp\",\n    \"apiKeyId\": \"24f0e35b-aae3-4649-84ab-ef79c1de015b\",\n    \"state\": \"ACTIVE\",\n    \"expireTime\": \"1970-01-01T00:00:00Z\",\n    \"etag\": \"1_01efd6e7-3eae-4dee-a136-d5a5d4ca2409\"\n  }\n}\n- Creating your Android app\n✔ Creating your Android app"
    },
    "ios": {
      "commandOk": true,
      "acceptedAsOk": true,
      "alreadyExists": false,
      "status": 0,
      "appIdPresent": true,
      "appIdValuePrinted": false,
      "rawPreview": "{\n  \"status\": \"success\",\n  \"result\": {\n    \"@type\": \"type.googleapis.com/google.firebase.service.v1beta1.IosApp\",\n    \"name\": \"projects/sabi-official-prod-37629/iosApps/1:970072647981:ios:e365ee723a7ad0a3fb4ba4\",\n    \"appId\": \"1:970072647981:ios:e365ee723a7ad0a3fb4ba4\",\n    \"displayName\": \"Sabi SuperApp iOS Official\",\n    \"projectId\": \"sabi-official-prod-37629\",\n    \"bundleId\": \"app.sabiai.superapp\",\n    \"apiKeyId\": \"c64be1ff-b164-4e32-ac96-45297f1b803f\",\n    \"state\": \"ACTIVE\",\n    \"expireTime\": \"1970-01-01T00:00:00Z\",\n    \"etag\": \"1_4c460412-ad8e-4b41-9321-77aa56be1383\"\n  }\n}\n- Creating your iOS app\n✔ Creating your iOS app"
    },
    "web": {
      "commandOk": true,
      "acceptedAsOk": true,
      "alreadyExists": false,
      "status": 0,
      "appIdPresent": true,
      "appIdValuePrinted": false,
      "rawPreview": "{\n  \"status\": \"success\",\n  \"result\": {\n    \"@type\": \"type.googleapis.com/google.firebase.service.v1beta1.WebApp\",\n    \"name\": \"projects/sabi-official-prod-37629/webApps/1:970072647981:web:8ffb8324c268c54dfb4ba4\",\n    \"appId\": \"1:970072647981:web:8ffb8324c268c54dfb4ba4\",\n    \"displayName\": \"Sabi SuperApp Web Official\",\n    \"projectId\": \"sabi-official-prod-37629\",\n    \"webId\": \"NjhmNzA5ZTctMjI0NC00YzU0LThhOTAtY2Q2MWMwM2EzNWFj\",\n    \"apiKeyId\": \"393e0b27-7688-41ca-abc3-5d17d71d03bf\",\n    \"state\": \"ACTIVE\",\n    \"expireTime\": \"1970-01-01T00:00:00Z\",\n    \"etag\": \"1_77ac929e-84ce-416a-95de-b3592a41eac7\"\n  }\n}\n- Creating your Web app\n✔ Creating your Web app"
    }
  },
  "beforeInventory": {
    "android": {
      "parseOk": true,
      "status": "success",
      "itemCount": 0,
      "items": []
    },
    "ios": {
      "parseOk": true,
      "status": "success",
      "itemCount": 0,
      "items": []
    },
    "web": {
      "parseOk": true,
      "status": "success",
      "itemCount": 0,
      "items": []
    }
  },
  "afterInventory": {
    "android": {
      "parseOk": true,
      "status": "success",
      "itemCount": 1,
      "items": [
        {
          "displayName": "Sabi SuperApp Android Official",
          "platform": "ANDROID",
          "appIdPresent": true,
          "appIdValuePrinted": false,
          "packageName": "app.sabiai.superapp",
          "bundleId": null,
          "state": "ACTIVE"
        }
      ]
    },
    "ios": {
      "parseOk": true,
      "status": "success",
      "itemCount": 1,
      "items": [
        {
          "displayName": "Sabi SuperApp iOS Official",
          "platform": "IOS",
          "appIdPresent": true,
          "appIdValuePrinted": false,
          "packageName": null,
          "bundleId": "app.sabiai.superapp",
          "state": "ACTIVE"
        }
      ]
    },
    "web": {
      "parseOk": true,
      "status": "success",
      "itemCount": 1,
      "items": [
        {
          "displayName": "Sabi SuperApp Web Official",
          "platform": "WEB",
          "appIdPresent": true,
          "appIdValuePrinted": false,
          "packageName": null,
          "bundleId": null,
          "state": "ACTIVE"
        }
      ]
    }
  },
  "readiness": {
    "firebaseProjectVisibleReadiness": 100,
    "officialWebsiteReadiness": 100,
    "androidAppCreateReadiness": 100,
    "iosAppCreateReadiness": 100,
    "webAppCreateReadiness": 100,
    "androidAppVisibleReadiness": 100,
    "iosAppVisibleReadiness": 100,
    "webAppVisibleReadiness": 100,
    "allFirebaseAppsRegisteredReadiness": 100,
    "noSecretOrApiKeyPrintReadiness": 100,
    "release246HReadiness": 100,
    "firebaseConfigDownloadNow": 0,
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
    "firebaseAppsRegistrationOnly": true,
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
    "exactOwnerApprovalRequiredBeforeConfigDownloadOrSms": true
  },
  "checksPassed": 21,
  "checksTotal": 21,
  "checks": [
    {
      "name": "246h_firebase_project_visible_suffix_project",
      "passed": true,
      "details": {
        "firebaseProjectId": "sabi-official-prod-37629"
      }
    },
    {
      "name": "246h_official_site_still_live_on_original_project",
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
      "name": "246h_firebase_cli_available",
      "passed": true,
      "details": {
        "name": "firebase_cli_version",
        "command": "firebase --version 2>$null",
        "status": 0,
        "stdout": "15.22.1",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246h_firebase_login_available",
      "passed": true,
      "details": {
        "name": "firebase_login_list_readonly",
        "command": "firebase login:list --json 2>$null",
        "status": 0,
        "stdout": "{\n  \"status\": \"success\",\n  \"result\": [\n    {\n      \"user\": {\n        \"iss\": \"accounts.google.com\",\n        \"azp\": \"563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com\",\n        \"aud\": \"563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com\",\n        \"sub\": \"103206826275308495794\",\n        \"hd\": \"sabiai.app\",\n        \"email\": \"admin@sabiai.app\",\n        \"email_verified\": true,\n        \"at_hash\": \"ZiKQ3skDXknwsCxSr_YUhw\",\n        \"iat\": 1782184536,\n        \"exp\": 1782188136\n      },\n      \"tokens\": {\n        \"expires_at\": 1782190926096,\n        \"refresh_token\":\"[REDACTED]\",\n        \"scopes\": [],\n        \"access_token\":\"[REDACTED]\",\n        \"expires_in\": 3599,\n        \"scope\": \"https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/cloudplatformprojects.readonly https://www.googleapis.com/auth/firebase openid https://www.googleapis.com/auth/cloud-platform\",\n        \"token_type\": \"Bearer\",\n        \"id_token\":\"[REDACTED]\"\n      }\n    }\n  ]\n}",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246h_android_app_create_ok_or_already_exists",
      "passed": true,
      "details": {
        "commandOk": true,
        "acceptedAsOk": true,
        "alreadyExists": false,
        "status": 0,
        "appIdPresent": true,
        "appIdValuePrinted": false,
        "rawPreview": "{\n  \"status\": \"success\",\n  \"result\": {\n    \"@type\": \"type.googleapis.com/google.firebase.service.v1beta1.AndroidApp\",\n    \"name\": \"projects/sabi-official-prod-37629/androidApps/1:970072647981:android:4161866ad2f57460fb4ba4\",\n    \"appId\": \"1:970072647981:android:4161866ad2f57460fb4ba4\",\n    \"displayName\": \"Sabi SuperApp Android Official\",\n    \"projectId\": \"sabi-official-prod-37629\",\n    \"packageName\": \"app.sabiai.superapp\",\n    \"apiKeyId\": \"24f0e35b-aae3-4649-84ab-ef79c1de015b\",\n    \"state\": \"ACTIVE\",\n    \"expireTime\": \"1970-01-01T00:00:00Z\",\n    \"etag\": \"1_01efd6e7-3eae-4dee-a136-d5a5d4ca2409\"\n  }\n}\n- Creating your Android app\n✔ Creating your Android app"
      }
    },
    {
      "name": "246h_ios_app_create_ok_or_already_exists",
      "passed": true,
      "details": {
        "commandOk": true,
        "acceptedAsOk": true,
        "alreadyExists": false,
        "status": 0,
        "appIdPresent": true,
        "appIdValuePrinted": false,
        "rawPreview": "{\n  \"status\": \"success\",\n  \"result\": {\n    \"@type\": \"type.googleapis.com/google.firebase.service.v1beta1.IosApp\",\n    \"name\": \"projects/sabi-official-prod-37629/iosApps/1:970072647981:ios:e365ee723a7ad0a3fb4ba4\",\n    \"appId\": \"1:970072647981:ios:e365ee723a7ad0a3fb4ba4\",\n    \"displayName\": \"Sabi SuperApp iOS Official\",\n    \"projectId\": \"sabi-official-prod-37629\",\n    \"bundleId\": \"app.sabiai.superapp\",\n    \"apiKeyId\": \"c64be1ff-b164-4e32-ac96-45297f1b803f\",\n    \"state\": \"ACTIVE\",\n    \"expireTime\": \"1970-01-01T00:00:00Z\",\n    \"etag\": \"1_4c460412-ad8e-4b41-9321-77aa56be1383\"\n  }\n}\n- Creating your iOS app\n✔ Creating your iOS app"
      }
    },
    {
      "name": "246h_web_app_create_ok_or_already_exists",
      "passed": true,
      "details": {
        "commandOk": true,
        "acceptedAsOk": true,
        "alreadyExists": false,
        "status": 0,
        "appIdPresent": true,
        "appIdValuePrinted": false,
        "rawPreview": "{\n  \"status\": \"success\",\n  \"result\": {\n    \"@type\": \"type.googleapis.com/google.firebase.service.v1beta1.WebApp\",\n    \"name\": \"projects/sabi-official-prod-37629/webApps/1:970072647981:web:8ffb8324c268c54dfb4ba4\",\n    \"appId\": \"1:970072647981:web:8ffb8324c268c54dfb4ba4\",\n    \"displayName\": \"Sabi SuperApp Web Official\",\n    \"projectId\": \"sabi-official-prod-37629\",\n    \"webId\": \"NjhmNzA5ZTctMjI0NC00YzU0LThhOTAtY2Q2MWMwM2EzNWFj\",\n    \"apiKeyId\": \"393e0b27-7688-41ca-abc3-5d17d71d03bf\",\n    \"state\": \"ACTIVE\",\n    \"expireTime\": \"1970-01-01T00:00:00Z\",\n    \"etag\": \"1_77ac929e-84ce-416a-95de-b3592a41eac7\"\n  }\n}\n- Creating your Web app\n✔ Creating your Web app"
      }
    },
    {
      "name": "246h_android_app_visible_after",
      "passed": true,
      "details": {
        "parseOk": true,
        "status": "success",
        "itemCount": 1,
        "items": [
          {
            "displayName": "Sabi SuperApp Android Official",
            "platform": "ANDROID",
            "appIdPresent": true,
            "appIdValuePrinted": false,
            "packageName": "app.sabiai.superapp",
            "bundleId": null,
            "state": "ACTIVE"
          }
        ]
      }
    },
    {
      "name": "246h_ios_app_visible_after",
      "passed": true,
      "details": {
        "parseOk": true,
        "status": "success",
        "itemCount": 1,
        "items": [
          {
            "displayName": "Sabi SuperApp iOS Official",
            "platform": "IOS",
            "appIdPresent": true,
            "appIdValuePrinted": false,
            "packageName": null,
            "bundleId": "app.sabiai.superapp",
            "state": "ACTIVE"
          }
        ]
      }
    },
    {
      "name": "246h_web_app_visible_after",
      "passed": true,
      "details": {
        "parseOk": true,
        "status": "success",
        "itemCount": 1,
        "items": [
          {
            "displayName": "Sabi SuperApp Web Official",
            "platform": "WEB",
            "appIdPresent": true,
            "appIdValuePrinted": false,
            "packageName": null,
            "bundleId": null,
            "state": "ACTIVE"
          }
        ]
      }
    },
    {
      "name": "246h_no_secret_or_api_key_value_printed",
      "passed": true,
      "details": {}
    },
    {
      "name": "246h_no_config_download_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246h_no_live_sms_sent_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246h_no_firebase_user_creation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246h_no_phone_auth_live_test_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246h_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246h_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246h_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246h_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246h_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246h_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [],
  "warnings": [
    "firebase_project_is_suffix_project_while_cloud_run_site_project_is_sabi_official_prod"
  ],
  "nextStep": "246I_download_firebase_app_configs_requires_exact_owner_approval_no_live_sms",
  "exactApprovalForNext": "I approve RELEASE-246I download Firebase app configs from project sabi-official-prod-37629 for Android/iOS/Web only and store them locally with API key values never printed, no live SMS, no Firebase user creation, no phone auth live test, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease246HReport;
