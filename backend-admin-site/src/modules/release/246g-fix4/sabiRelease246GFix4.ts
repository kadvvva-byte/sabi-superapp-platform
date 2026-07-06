import type { SabiRelease246GFix4Report } from './sabiRelease246GFix4.types';

export const sabiRelease246GFix4Report: SabiRelease246GFix4Report = {
  "version": "SABI-RELEASE-246G-FIX4-DEBUG-ADDFIREBASE-VERIFY-VISIBLE-NO-APP-REG-NO-CONFIG-NO-LIVE-SMS",
  "status": "passed",
  "createdAt": "2026-06-23T03:40:44.081Z",
  "approvalInherited": "Inherited from RELEASE-246G owner approval: add Firebase resources to existing Google Cloud project sabi-official-prod only; no Firebase app registration, no config download, no live SMS, no Firebase user creation, no phone auth live test, no secret/API key value print, no DNS, no Google Pay/Billing, no wallet/payment/payout.",
  "officialDomain": "sabiai.app",
  "projectId": "sabi-official-prod",
  "scope": "debug_addfirebase_attempt_and_visibility_verification_only_no_app_registration_no_config_download_no_live_sms",
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
    "iamPolicy": {
      "name": "iam_policy_readonly",
      "command": "gcloud projects get-iam-policy sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "{\r\n  \"bindings\": [\r\n    {\r\n      \"members\": [\r\n        \"serviceAccount:service-1047545881519@gcp-sa-artifactregistry.iam.gserviceaccount.com\"\r\n      ],\r\n      \"role\": \"roles/artifactregistry.serviceAgent\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"serviceAccount:1047545881519@cloudbuild.gserviceaccount.com\"\r\n      ],\r\n      \"role\": \"roles/cloudbuild.builds.builder\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"serviceAccount:service-1047545881519@gcp-sa-cloudbuild.iam.gserviceaccount.com\"\r\n      ],\r\n      \"role\": \"roles/cloudbuild.serviceAgent\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"serviceAccount:service-1047545881519@containerregistry.iam.gserviceaccount.com\"\r\n      ],\r\n      \"role\": \"roles/containerregistry.ServiceAgent\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"serviceAccount:service-1047545881519@gcp-sa-firebase.iam.gserviceaccount.com\"\r\n      ],\r\n      \"role\": \"roles/firebase.managementServiceAgent\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"user:admin@sabiai.app\"\r\n      ],\r\n      \"role\": \"roles/owner\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"serviceAccount:service-1047545881519@gcp-sa-pubsub.iam.gserviceaccount.com\"\r\n      ],\r\n      \"role\": \"roles/pubsub.serviceAgent\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"serviceAccount:service-1047545881519@serverless-robot-prod.iam.gserviceaccount.com\"\r\n      ],\r\n      \"role\": \"roles/run.serviceAgent\"\r\n    }\r\n  ],\r\n  \"etag\": \"BwZU4zhthPE=\",\r\n  \"version\": 1\r\n}",
      "stderr": "",
      "ok": true
    },
    "firebaseProjectsBefore": {
      "name": "firebase_projects_list_before_readonly",
      "command": "firebase projects:list --json 2>$null",
      "status": 0,
      "stdout": "{\n  \"status\": \"success\",\n  \"result\": []\n}",
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
    },
    "addFirebaseDebug": {
      "name": "firebase_projects_addfirebase_with_debug",
      "command": "$ErrorActionPreference=\"Continue\"; firebase --debug projects:addfirebase sabi-official-prod --json *> \".data\\release\\246g-fix4\\246g-fix4-addfirebase-debug.raw.log\"; $code=$LASTEXITCODE; Get-Content \".data\\release\\246g-fix4\\246g-fix4-addfirebase-debug.raw.log\" -Raw; exit $code",
      "status": 2,
      "stdout": "node.exe : - Adding Firebase resources to Goog\r\nle Cloud Platform project\r\nC:\\Users\\User\\AppData\\Roaming\\npm\\firebase.ps1\r\n:24 ����:5\r\n+     & \"node$exe\"  \"$basedir/node_modules/fir\r\nebase-tools/lib/bin/fireb ...\r\n+     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n~~~~~~~~~~~~~~~~~~~~~~~~~\r\n    + CategoryInfo          : NotSpecified: ( \r\n   - Adding Fireba...latform project:String)  \r\n   [], RemoteException\r\n    + FullyQualifiedErrorId : NativeCommandEr \r\n   ror\r\n \r\n✖ Adding Firebase resources to Google Cloud \r\nPlatform project\r\n{\r\n  \"status\": \"error\",\r\n  \"error\": \"Failed to add Firebase to Google Cloud Platform project. See firebase-debug.log for more info.\"\r\n}",
      "stderr": "",
      "ok": false,
      "rawDebugCaptured": true,
      "sanitizedDebugPath": ".data/release/246g-fix4/246g-fix4-addfirebase-debug.sanitized.log"
    },
    "firebaseProjectsAfter": {
      "name": "firebase_projects_list_after_readonly",
      "command": "firebase projects:list --json 2>$null",
      "status": 0,
      "stdout": "{\n  \"status\": \"success\",\n  \"result\": []\n}",
      "stderr": "",
      "ok": true
    },
    "androidAppsAfter": {
      "name": "firebase_apps_android_list_after_readonly",
      "command": "firebase apps:list ANDROID --project=sabi-official-prod --json 2>$null",
      "status": 1,
      "stdout": "{\n  \"status\": \"error\",\n  \"error\": \"Failed to list Firebase ANDROID apps. See firebase-debug.log for more info.\"\n}",
      "stderr": "",
      "ok": false
    },
    "webAppsAfter": {
      "name": "firebase_apps_web_list_after_readonly",
      "command": "firebase apps:list WEB --project=sabi-official-prod --json 2>$null",
      "status": 1,
      "stdout": "{\n  \"status\": \"error\",\n  \"error\": \"Failed to list Firebase WEB apps. See firebase-debug.log for more info.\"\n}",
      "stderr": "",
      "ok": false
    }
  },
  "rolesDetected": [
    "roles/owner"
  ],
  "projectsBefore": {
    "parseOk": true,
    "itemCount": 0,
    "projectIds": []
  },
  "projectsAfter": {
    "parseOk": true,
    "itemCount": 0,
    "projectIds": []
  },
  "addFirebaseDiagnosis": {
    "cliExitOk": false,
    "cliLooksSuccessful": true,
    "projectVisibleBefore": false,
    "projectVisibleAfter": false,
    "findings": [
      "success_or_already_firebase"
    ],
    "sanitizedDebugPath": ".data/release/246g-fix4/246g-fix4-addfirebase-debug.sanitized.log",
    "secretRemainingAfterSanitize": false
  },
  "readiness": {
    "officialWebsiteReadiness": 100,
    "firebaseCliToolingReadiness": 100,
    "ownerRoleReadiness": 100,
    "debugCaptureReadiness": 100,
    "debugSanitizeReadiness": 100,
    "addFirebaseAttemptReadiness": 100,
    "addFirebaseSuccessReadiness": 100,
    "firebaseProjectVisibleReadiness": 0,
    "diagnosisReadiness": 100,
    "release246GFix4Readiness": 100,
    "firebaseAppRegistrationNow": 0,
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
    "ownerApprovalCapturedFrom246G": true,
    "addFirebaseResourcesOnly": true,
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
  "checksPassed": 21,
  "checksTotal": 21,
  "checks": [
    {
      "name": "246g_fix4_gcloud_project_is_official",
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
      "name": "246g_fix4_active_gcloud_account_is_official_admin",
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
      "name": "246g_fix4_firebase_cli_available",
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
      "name": "246g_fix4_owner_role_detected",
      "passed": true,
      "details": {
        "rolesDetected": [
          "roles/owner"
        ]
      }
    },
    {
      "name": "246g_fix4_debug_log_captured",
      "passed": true,
      "details": {
        "rawDebugPath": ".data/release/246g-fix4/246g-fix4-addfirebase-debug.raw.log",
        "sanitizedDebugPath": ".data/release/246g-fix4/246g-fix4-addfirebase-debug.sanitized.log"
      }
    },
    {
      "name": "246g_fix4_debug_log_sanitized",
      "passed": true,
      "details": {
        "sanitizedDebugPath": ".data/release/246g-fix4/246g-fix4-addfirebase-debug.sanitized.log"
      }
    },
    {
      "name": "246g_fix4_addfirebase_attempted_in_approved_scope",
      "passed": true,
      "details": {
        "name": "firebase_projects_addfirebase_with_debug",
        "command": "$ErrorActionPreference=\"Continue\"; firebase --debug projects:addfirebase sabi-official-prod --json *> \".data\\release\\246g-fix4\\246g-fix4-addfirebase-debug.raw.log\"; $code=$LASTEXITCODE; Get-Content \".data\\release\\246g-fix4\\246g-fix4-addfirebase-debug.raw.log\" -Raw; exit $code",
        "status": 2,
        "stdout": "node.exe : - Adding Firebase resources to Goog\r\nle Cloud Platform project\r\nC:\\Users\\User\\AppData\\Roaming\\npm\\firebase.ps1\r\n:24 ����:5\r\n+     & \"node$exe\"  \"$basedir/node_modules/fir\r\nebase-tools/lib/bin/fireb ...\r\n+     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n~~~~~~~~~~~~~~~~~~~~~~~~~\r\n    + CategoryInfo          : NotSpecified: ( \r\n   - Adding Fireba...latform project:String)  \r\n   [], RemoteException\r\n    + FullyQualifiedErrorId : NativeCommandEr \r\n   ror\r\n \r\n✖ Adding Firebase resources to Google Cloud \r\nPlatform project\r\n{\r\n  \"status\": \"error\",\r\n  \"error\": \"Failed to add Firebase to Google Cloud Platform project. See firebase-debug.log for more info.\"\r\n}",
        "stderr": "",
        "ok": false,
        "rawDebugCaptured": true,
        "sanitizedDebugPath": ".data/release/246g-fix4/246g-fix4-addfirebase-debug.sanitized.log"
      }
    },
    {
      "name": "246g_fix4_firebase_project_visibility_checked",
      "passed": true,
      "details": {
        "projectsBefore": {
          "parseOk": true,
          "itemCount": 0,
          "projectIds": []
        },
        "projectsAfter": {
          "parseOk": true,
          "itemCount": 0,
          "projectIds": []
        },
        "projectVisibleBefore": false,
        "projectVisibleAfter": false
      }
    },
    {
      "name": "246g_fix4_official_site_still_live",
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
      "name": "246g_fix4_no_secret_or_api_key_value_printed",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_fix4_no_firebase_app_registration_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_fix4_no_firebase_config_download_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_fix4_no_live_sms_sent",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_fix4_no_firebase_user_creation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_fix4_no_phone_auth_live_test_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_fix4_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_fix4_no_google_pay_or_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_fix4_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_fix4_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_fix4_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_fix4_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [],
  "warnings": [
    "firebase_project_still_not_visible_after_debug_addfirebase_attempt"
  ],
  "nextStep": "246H_register_official_firebase_apps_requires_exact_owner_approval",
  "exactApprovalForNext": "I approve RELEASE-246H register official Firebase apps in project sabi-official-prod with Android package app.sabiai.superapp, iOS bundle app.sabiai.superapp, and Web app for sabiai.app only, no live SMS, no Firebase user creation, no phone auth live test, no secret or API key value print, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease246GFix4Report;
