import type { SabiRelease246JReport } from './sabiRelease246J.types';

export const sabiRelease246JReport: SabiRelease246JReport = {
  "version": "SABI-RELEASE-246J-APPLY-FIREBASE-CONFIGS-ALIGN-MOBILE-PACKAGE-NO-LIVE-SMS",
  "status": "passed",
  "createdAt": "2026-06-23T04:57:17.509Z",
  "approval": "I approve RELEASE-246J apply downloaded Firebase configs from project sabi-official-prod-37629 to superapp-mobile and align Android package/iOS bundle to app.sabiai.superapp only, no live SMS, no Firebase user creation, no phone auth live test, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "firebaseProjectId": "sabi-official-prod-37629",
  "officialSiteProjectId": "sabi-official-prod",
  "mobileRoot": "C:\\Users\\User\\Desktop\\superapp-mobile",
  "scope": "apply_firebase_configs_to_superapp_mobile_align_android_package_ios_bundle_no_live_sms",
  "changes": [
    {
      "type": "copy_config",
      "source": ".data/release/246i/configs/google-services.official.sabi.json",
      "dest": "google-services.json",
      "backup": ".data/release/246j/backup/2026-06-23T04-57-05-162Z/superapp-mobile/google-services.json",
      "sizeBytes": 697,
      "sha256": "cdec165560778e1e69db5dbdb3cf9d84929fa724ce81dd52f9220bdb9a15c575"
    },
    {
      "type": "copy_config",
      "source": ".data/release/246i/configs/google-services.official.sabi.json",
      "dest": "android/app/google-services.json",
      "backup": ".data/release/246j/backup/2026-06-23T04-57-05-162Z/superapp-mobile/android/app/google-services.json",
      "sizeBytes": 697,
      "sha256": "cdec165560778e1e69db5dbdb3cf9d84929fa724ce81dd52f9220bdb9a15c575"
    },
    {
      "type": "copy_config",
      "source": ".data/release/246i/configs/GoogleService-Info.official.sabi.plist",
      "dest": "GoogleService-Info.plist",
      "backup": null,
      "sizeBytes": 899,
      "sha256": "c06f867a34da760b5e7d081893cb8db1d50289e6e87e13e929cfd3f4f88632e6"
    },
    {
      "type": "copy_config",
      "source": ".data/release/246i/configs/firebase-web-config.official.sabi.js",
      "dest": "firebase-web-config.official.sabi.js",
      "backup": null,
      "sizeBytes": 410,
      "sha256": "68fd3f25e72dd1f394cdf0c16959ec63d5b27e6d4f83023ee6d54c6a76c228cc"
    },
    {
      "type": "copy_config",
      "source": ".data/release/246i/configs/firebase-web-config.official.sabi.js",
      "dest": "src/config/firebase-web-config.official.sabi.js",
      "backup": null,
      "sizeBytes": 410,
      "sha256": "68fd3f25e72dd1f394cdf0c16959ec63d5b27e6d4f83023ee6d54c6a76c228cc"
    },
    {
      "type": "patch_app_json",
      "file": "app.json",
      "backup": ".data/release/246j/backup/2026-06-23T04-57-05-162Z/superapp-mobile/app.json",
      "before": {
        "androidPackage": "com.sabi.superapp",
        "androidGoogleServicesFile": "./google-services.json",
        "iosBundleIdentifier": null,
        "iosGoogleServicesFile": null
      },
      "after": {
        "androidPackage": "app.sabiai.superapp",
        "androidGoogleServicesFile": "./google-services.json",
        "iosBundleIdentifier": "app.sabiai.superapp",
        "iosGoogleServicesFile": "./GoogleService-Info.plist"
      }
    },
    {
      "type": "patch_text",
      "label": "android_package_alignment",
      "file": "android/app/build.gradle",
      "backup": ".data/release/246j/backup/2026-06-23T04-57-05-162Z/superapp-mobile/android/app/build.gradle"
    },
    {
      "type": "patch_text",
      "label": "android_package_alignment",
      "file": "android/app/src/main/AndroidManifest.xml",
      "backup": ".data/release/246j/backup/2026-06-23T04-57-05-162Z/superapp-mobile/android/app/src/main/AndroidManifest.xml"
    },
    {
      "type": "patch_text",
      "label": "android_package_alignment",
      "file": "android/app/src/main/java/com/anonymous/superappmobile/MainActivity.kt",
      "backup": ".data/release/246j/backup/2026-06-23T04-57-05-162Z/superapp-mobile/android/app/src/main/java/com/anonymous/superappmobile/MainActivity.kt"
    },
    {
      "type": "patch_text",
      "label": "android_package_alignment",
      "file": "android/app/src/main/java/com/anonymous/superappmobile/MainApplication.kt",
      "backup": ".data/release/246j/backup/2026-06-23T04-57-05-162Z/superapp-mobile/android/app/src/main/java/com/anonymous/superappmobile/MainApplication.kt"
    },
    {
      "type": "patch_text",
      "label": "android_package_alignment",
      "file": "android/app/src/main/java/com/anonymous/superappmobile/presentation/SabiPresentationNativeModule.kt",
      "backup": ".data/release/246j/backup/2026-06-23T04-57-05-162Z/superapp-mobile/android/app/src/main/java/com/anonymous/superappmobile/presentation/SabiPresentationNativeModule.kt"
    },
    {
      "type": "patch_text",
      "label": "android_package_alignment",
      "file": "android/app/src/main/java/com/anonymous/superappmobile/presentation/SabiPresentationPackage.kt",
      "backup": ".data/release/246j/backup/2026-06-23T04-57-05-162Z/superapp-mobile/android/app/src/main/java/com/anonymous/superappmobile/presentation/SabiPresentationPackage.kt"
    },
    {
      "type": "patch_text",
      "label": "android_package_alignment",
      "file": "android/app/src/main/java/com/anonymous/superappmobile/calls/SabiCallActionReceiver.kt",
      "backup": ".data/release/246j/backup/2026-06-23T04-57-05-162Z/superapp-mobile/android/app/src/main/java/com/anonymous/superappmobile/calls/SabiCallActionReceiver.kt"
    },
    {
      "type": "patch_text",
      "label": "android_package_alignment",
      "file": "android/app/src/main/java/com/anonymous/superappmobile/calls/SabiCallActionReporter.kt",
      "backup": ".data/release/246j/backup/2026-06-23T04-57-05-162Z/superapp-mobile/android/app/src/main/java/com/anonymous/superappmobile/calls/SabiCallActionReporter.kt"
    },
    {
      "type": "patch_text",
      "label": "android_package_alignment",
      "file": "android/app/src/main/java/com/anonymous/superappmobile/calls/SabiCallAppVisibility.kt",
      "backup": ".data/release/246j/backup/2026-06-23T04-57-05-162Z/superapp-mobile/android/app/src/main/java/com/anonymous/superappmobile/calls/SabiCallAppVisibility.kt"
    },
    {
      "type": "patch_text",
      "label": "android_package_alignment",
      "file": "android/app/src/main/java/com/anonymous/superappmobile/calls/SabiCallForegroundService.kt",
      "backup": ".data/release/246j/backup/2026-06-23T04-57-05-162Z/superapp-mobile/android/app/src/main/java/com/anonymous/superappmobile/calls/SabiCallForegroundService.kt"
    },
    {
      "type": "patch_text",
      "label": "android_package_alignment",
      "file": "android/app/src/main/java/com/anonymous/superappmobile/calls/SabiCallNativeModule.kt",
      "backup": ".data/release/246j/backup/2026-06-23T04-57-05-162Z/superapp-mobile/android/app/src/main/java/com/anonymous/superappmobile/calls/SabiCallNativeModule.kt"
    },
    {
      "type": "patch_text",
      "label": "android_package_alignment",
      "file": "android/app/src/main/java/com/anonymous/superappmobile/calls/SabiCallNotificationService.kt",
      "backup": ".data/release/246j/backup/2026-06-23T04-57-05-162Z/superapp-mobile/android/app/src/main/java/com/anonymous/superappmobile/calls/SabiCallNotificationService.kt"
    },
    {
      "type": "patch_text",
      "label": "android_package_alignment",
      "file": "android/app/src/main/java/com/anonymous/superappmobile/calls/SabiCallPackage.kt",
      "backup": ".data/release/246j/backup/2026-06-23T04-57-05-162Z/superapp-mobile/android/app/src/main/java/com/anonymous/superappmobile/calls/SabiCallPackage.kt"
    },
    {
      "type": "patch_text",
      "label": "android_package_alignment",
      "file": "android/app/src/main/java/com/anonymous/superappmobile/calls/SabiCallPayload.kt",
      "backup": ".data/release/246j/backup/2026-06-23T04-57-05-162Z/superapp-mobile/android/app/src/main/java/com/anonymous/superappmobile/calls/SabiCallPayload.kt"
    },
    {
      "type": "patch_text",
      "label": "android_package_alignment",
      "file": "android/app/src/main/java/com/anonymous/superappmobile/calls/SabiFirebaseMessagingService.kt",
      "backup": ".data/release/246j/backup/2026-06-23T04-57-05-162Z/superapp-mobile/android/app/src/main/java/com/anonymous/superappmobile/calls/SabiFirebaseMessagingService.kt"
    }
  ],
  "inspections": {
    "appJson": {
      "exists": true,
      "parseOk": true,
      "androidPackage": "app.sabiai.superapp",
      "androidPackageMatchesOfficial": true,
      "androidGoogleServicesFile": "./google-services.json",
      "iosBundleIdentifier": "app.sabiai.superapp",
      "iosBundleMatchesOfficial": true,
      "iosGoogleServicesFile": "./GoogleService-Info.plist"
    },
    "rootAndroidConfig": {
      "exists": true,
      "file": "google-services.json",
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
    "nativeAndroidConfig": {
      "exists": true,
      "file": "android/app/google-services.json",
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
    "rootIosConfig": {
      "exists": true,
      "file": "GoogleService-Info.plist",
      "sizeBytes": 899,
      "sha256": "c06f867a34da760b5e7d081893cb8db1d50289e6e87e13e929cfd3f4f88632e6",
      "plistLike": true,
      "projectIdPresent": true,
      "bundleIdPresent": true,
      "appIdPresent": true,
      "apiKeyValuePresentInConfigFile": true,
      "apiKeyValuePrintedInReport": false
    },
    "rootWebConfig": {
      "exists": true,
      "file": "firebase-web-config.official.sabi.js",
      "sizeBytes": 410,
      "sha256": "68fd3f25e72dd1f394cdf0c16959ec63d5b27e6d4f83023ee6d54c6a76c228cc",
      "projectIdPresent": true,
      "appIdPresent": true,
      "apiKeyValuePresentInConfigFile": true,
      "apiKeyValuePrintedInReport": false
    },
    "srcWebConfig": {
      "exists": true,
      "file": "src/config/firebase-web-config.official.sabi.js",
      "sizeBytes": 410,
      "sha256": "68fd3f25e72dd1f394cdf0c16959ec63d5b27e6d4f83023ee6d54c6a76c228cc",
      "projectIdPresent": true,
      "appIdPresent": true,
      "apiKeyValuePresentInConfigFile": true,
      "apiKeyValuePrintedInReport": false
    },
    "androidPatch": {
      "androidDirExists": true,
      "scannedFiles": 30,
      "patchedFiles": 15
    },
    "iosPatch": {
      "iosDirExists": true,
      "scannedFiles": 1,
      "patchedFiles": 0
    }
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
    "firebaseVersion": {
      "name": "firebase_cli_version",
      "command": "firebase --version 2>$null",
      "status": 0,
      "stdout": "15.22.1",
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
  "readiness": {
    "mobileRootReadiness": 100,
    "officialWebsiteReadiness": 100,
    "androidConfigAppliedReadiness": 100,
    "iosConfigAppliedReadiness": 100,
    "webConfigAppliedReadiness": 100,
    "appJsonPackageBundleAlignmentReadiness": 100,
    "androidNativePatchReadiness": 100,
    "iosNativePatchReadiness": 100,
    "allMobileFirebaseConfigAlignmentReadiness": 100,
    "noSecretOrApiKeyPrintReadiness": 100,
    "release246JReadiness": 100,
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
    "mobileConfigPackageAlignmentOnly": true,
    "configFilesContainApiKeysByFirebaseDesignButValuesNotPrinted": true,
    "backupCreatedBeforeOverwritingFiles": true,
    "noLiveSmsSentNow": true,
    "noFirebaseUserCreationNow": true,
    "noPhoneAuthLiveTestNow": true,
    "noDnsMutationNow": true,
    "noGooglePayOrBillingNow": true,
    "noWalletPaymentPayoutNow": true,
    "noDbMutationNow": true,
    "noSecretManagerReadWriteNow": true,
    "noEnvReadWriteNow": true,
    "exactOwnerApprovalRequiredBeforePhoneAuthProviderActivationOrSms": true
  },
  "checksPassed": 19,
  "checksTotal": 19,
  "checks": [
    {
      "name": "246j_mobile_root_exists",
      "passed": true,
      "details": {
        "mobileRoot": "C:\\Users\\User\\Desktop\\superapp-mobile"
      }
    },
    {
      "name": "246j_official_site_still_live",
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
      "name": "246j_source_android_config_exists",
      "passed": true,
      "details": {
        "file": ".data/release/246i/configs/google-services.official.sabi.json"
      }
    },
    {
      "name": "246j_source_ios_config_exists",
      "passed": true,
      "details": {
        "file": ".data/release/246i/configs/GoogleService-Info.official.sabi.plist"
      }
    },
    {
      "name": "246j_source_web_config_exists",
      "passed": true,
      "details": {
        "file": ".data/release/246i/configs/firebase-web-config.official.sabi.js"
      }
    },
    {
      "name": "246j_android_config_applied",
      "passed": true,
      "details": {
        "exists": true,
        "file": "google-services.json",
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
      "name": "246j_ios_config_applied",
      "passed": true,
      "details": {
        "exists": true,
        "file": "GoogleService-Info.plist",
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
      "name": "246j_web_config_applied",
      "passed": true,
      "details": {
        "exists": true,
        "file": "firebase-web-config.official.sabi.js",
        "sizeBytes": 410,
        "sha256": "68fd3f25e72dd1f394cdf0c16959ec63d5b27e6d4f83023ee6d54c6a76c228cc",
        "projectIdPresent": true,
        "appIdPresent": true,
        "apiKeyValuePresentInConfigFile": true,
        "apiKeyValuePrintedInReport": false
      }
    },
    {
      "name": "246j_app_json_package_bundle_aligned",
      "passed": true,
      "details": {
        "exists": true,
        "parseOk": true,
        "androidPackage": "app.sabiai.superapp",
        "androidPackageMatchesOfficial": true,
        "androidGoogleServicesFile": "./google-services.json",
        "iosBundleIdentifier": "app.sabiai.superapp",
        "iosBundleMatchesOfficial": true,
        "iosGoogleServicesFile": "./GoogleService-Info.plist"
      }
    },
    {
      "name": "246j_no_api_key_or_secret_value_printed_in_report",
      "passed": true,
      "details": {}
    },
    {
      "name": "246j_no_live_sms_sent_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246j_no_firebase_user_creation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246j_no_phone_auth_live_test_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246j_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246j_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246j_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246j_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246j_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246j_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [],
  "warnings": [
    "firebase_auth_sms_project_is_suffix_project_while_cloud_run_site_project_is_sabi_official_prod"
  ],
  "nextStep": "246K_phone_auth_sms_provider_activation_readiness_requires_exact_owner_approval_no_live_sms",
  "exactApprovalForNext": "I approve RELEASE-246K enable and verify Firebase Authentication Phone provider readiness in project sabi-official-prod-37629 only, no live SMS, no Firebase user creation, no phone auth live test, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease246JReport;
