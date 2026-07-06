import type { SabiRelease246GFix2Report } from './sabiRelease246GFix2.types';

export const sabiRelease246GFix2Report: SabiRelease246GFix2Report = {
  "version": "SABI-RELEASE-246G-FIX2-PERMISSION-DIAGNOSIS-CLI-ADDFIREBASE-NO-APP-REG-NO-CONFIG-NO-LIVE-SMS",
  "status": "failed",
  "createdAt": "2026-06-23T03:34:38.663Z",
  "approvalInherited": "Inherited from RELEASE-246G owner approval: add Firebase resources to existing Google Cloud project sabi-official-prod only; no Firebase app registration, no config download, no live SMS, no Firebase user creation, no phone auth live test, no secret/API key value print, no DNS, no Google Pay/Billing, no wallet/payment/payout.",
  "officialDomain": "sabiai.app",
  "companyName": "SABI AI TECHNOLOGIES LIMITED",
  "projectId": "sabi-official-prod",
  "scope": "permission_diagnosis_and_cli_addfirebase_attempt_only_no_app_registration_no_config_download_no_live_sms",
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
    "enabledApis": {
      "name": "enabled_google_cloud_apis_readonly",
      "command": "gcloud services list --enabled --project=sabi-official-prod --format=\"value(config.name)\" 2>$null",
      "status": 0,
      "stdout": "analyticshub.googleapis.com\r\nartifactregistry.googleapis.com\r\nbigquery.googleapis.com\r\nbigqueryconnection.googleapis.com\r\nbigquerydatapolicy.googleapis.com\r\nbigquerydatatransfer.googleapis.com\r\nbigquerymigration.googleapis.com\r\nbigqueryreservation.googleapis.com\r\nbigquerystorage.googleapis.com\r\ncloudapis.googleapis.com\r\ncloudbuild.googleapis.com\r\ncloudtrace.googleapis.com\r\ncontainerregistry.googleapis.com\r\ndataform.googleapis.com\r\ndataplex.googleapis.com\r\ndatastore.googleapis.com\r\nfirebase.googleapis.com\r\niam.googleapis.com\r\niamcredentials.googleapis.com\r\nidentitytoolkit.googleapis.com\r\nlogging.googleapis.com\r\nmonitoring.googleapis.com\r\npubsub.googleapis.com\r\nrun.googleapis.com\r\nservicemanagement.googleapis.com\r\nserviceusage.googleapis.com\r\nsql-component.googleapis.com\r\nstorage-api.googleapis.com\r\nstorage-component.googleapis.com\r\nstorage.googleapis.com\r\ntelemetry.googleapis.com",
      "stderr": "",
      "ok": true
    },
    "iamPolicyBefore": {
      "name": "project_iam_policy_readonly_before",
      "command": "gcloud projects get-iam-policy sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "{\r\n  \"bindings\": [\r\n    {\r\n      \"members\": [\r\n        \"serviceAccount:service-1047545881519@gcp-sa-artifactregistry.iam.gserviceaccount.com\"\r\n      ],\r\n      \"role\": \"roles/artifactregistry.serviceAgent\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"serviceAccount:1047545881519@cloudbuild.gserviceaccount.com\"\r\n      ],\r\n      \"role\": \"roles/cloudbuild.builds.builder\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"serviceAccount:service-1047545881519@gcp-sa-cloudbuild.iam.gserviceaccount.com\"\r\n      ],\r\n      \"role\": \"roles/cloudbuild.serviceAgent\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"serviceAccount:service-1047545881519@containerregistry.iam.gserviceaccount.com\"\r\n      ],\r\n      \"role\": \"roles/containerregistry.ServiceAgent\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"serviceAccount:service-1047545881519@gcp-sa-firebase.iam.gserviceaccount.com\"\r\n      ],\r\n      \"role\": \"roles/firebase.managementServiceAgent\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"user:admin@sabiai.app\"\r\n      ],\r\n      \"role\": \"roles/owner\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"serviceAccount:service-1047545881519@gcp-sa-pubsub.iam.gserviceaccount.com\"\r\n      ],\r\n      \"role\": \"roles/pubsub.serviceAgent\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"serviceAccount:service-1047545881519@serverless-robot-prod.iam.gserviceaccount.com\"\r\n      ],\r\n      \"role\": \"roles/run.serviceAgent\"\r\n    }\r\n  ],\r\n  \"etag\": \"BwZU4zhthPE=\",\r\n  \"version\": 1\r\n}",
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
    "addFirebaseCli": {
      "name": "firebase_projects_addfirebase_cli_attempt",
      "command": "firebase projects:addfirebase sabi-official-prod --json",
      "status": 1,
      "stdout": "{\n  \"status\": \"error\",\n  \"error\": \"Failed to add Firebase to Google Cloud Platform project. See firebase-debug.log for more info.\"\n}",
      "stderr": "- Adding Firebase resources to Google Cloud Platform project\n✖ Adding Firebase resources to Google Cloud Platform project",
      "ok": false
    },
    "firebaseProjectsListAfter": {
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
  "iamDiagnosis": {
    "account": "admin@sabiai.app",
    "rolesBefore": [
      "roles/owner"
    ],
    "roleCoverage": {
      "hasOwner": true,
      "hasEditor": false,
      "hasFirebaseAdmin": false,
      "hasServiceUsageAdmin": false,
      "hasBrowser": false,
      "hasProjectIamAdmin": false
    },
    "requiredFirebaseAddPermissions": [
      "firebase.projects.update",
      "resourcemanager.projects.get",
      "serviceusage.services.enable",
      "serviceusage.services.get"
    ],
    "missingPermissionConclusion": false,
    "noSecretOrApiKeyValuePrinted": true
  },
  "cliAddFirebase": {
    "attempted": true,
    "ok": false,
    "cliLooksSuccessful": false,
    "cliPermissionDenied": false,
    "projectVisibleAfter": false
  },
  "readiness": {
    "officialWebsiteReadiness": 100,
    "firebaseCliToolingReadiness": 100,
    "iamPolicyReadiness": 100,
    "ownerOrEditorOrFirebaseAdminRoleReadiness": 100,
    "addFirebaseCliAttemptReadiness": 100,
    "addFirebaseCliSuccessReadiness": 0,
    "firebaseProjectCliVisibleReadiness": 0,
    "permissionDiagnosisReadiness": 0,
    "noSecretOrApiKeyPrintReadiness": 100,
    "release246GFix2Readiness": 0,
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
    "exactOwnerApprovalRequiredBeforeIamMutation": true
  },
  "checksPassed": 18,
  "checksTotal": 19,
  "checks": [
    {
      "name": "246g_fix2_gcloud_project_is_official",
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
      "name": "246g_fix2_active_gcloud_account_is_official_admin",
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
      "name": "246g_fix2_firebase_cli_available",
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
      "name": "246g_fix2_official_site_still_live",
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
      "name": "246g_fix2_iam_policy_readable",
      "passed": true,
      "details": {
        "rolesBefore": [
          "roles/owner"
        ],
        "roleCoverage": {
          "hasOwner": true,
          "hasEditor": false,
          "hasFirebaseAdmin": false,
          "hasServiceUsageAdmin": false,
          "hasBrowser": false,
          "hasProjectIamAdmin": false
        }
      }
    },
    {
      "name": "246g_fix2_addfirebase_cli_attempted",
      "passed": true,
      "details": {
        "name": "firebase_projects_addfirebase_cli_attempt",
        "command": "firebase projects:addfirebase sabi-official-prod --json",
        "status": 1,
        "stdout": "{\n  \"status\": \"error\",\n  \"error\": \"Failed to add Firebase to Google Cloud Platform project. See firebase-debug.log for more info.\"\n}",
        "stderr": "- Adding Firebase resources to Google Cloud Platform project\n✖ Adding Firebase resources to Google Cloud Platform project",
        "ok": false
      }
    },
    {
      "name": "246g_fix2_addfirebase_cli_succeeded_or_confirmed_permission_blocker",
      "passed": false,
      "details": {
        "cliLooksSuccessful": false,
        "cliPermissionDenied": false
      }
    },
    {
      "name": "246g_fix2_no_secret_or_api_key_value_printed",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_fix2_no_firebase_app_registration_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_fix2_no_firebase_config_download_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_fix2_no_live_sms_sent",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_fix2_no_firebase_user_creation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_fix2_no_phone_auth_live_test_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_fix2_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_fix2_no_google_pay_or_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_fix2_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_fix2_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_fix2_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_fix2_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [
    "246g_fix2_addfirebase_cli_succeeded_or_confirmed_permission_blocker"
  ],
  "warnings": [
    "sabi_official_prod_still_not_visible_as_firebase_project"
  ],
  "nextStep": "246G_FIX3_grant_required_firebase_add_permissions_requires_exact_owner_approval",
  "exactApprovalForNext": "I approve RELEASE-246G-FIX3 grant required IAM roles to admin@sabiai.app for adding Firebase resources to project sabi-official-prod only, then retry addFirebase, no Firebase app registration, no config download, no live SMS, no Firebase user creation, no phone auth live test, no secret or API key value print, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease246GFix2Report;
