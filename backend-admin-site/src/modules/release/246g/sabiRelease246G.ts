import type { SabiRelease246GReport } from './sabiRelease246G.types';

export const sabiRelease246GReport: SabiRelease246GReport = {
  "version": "SABI-RELEASE-246G-ADD-FIREBASE-RESOURCES-TO-EXISTING-GCP-PROJECT-NO-APP-REG-NO-CONFIG-NO-LIVE-SMS",
  "status": "failed",
  "createdAt": "2026-06-23T03:26:20.536Z",
  "approval": "I approve RELEASE-246G add Firebase resources to existing Google Cloud project sabi-official-prod only, no Firebase app registration, no config download, no live SMS, no Firebase user creation, no phone auth live test, no secret or API key value print, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "officialDomain": "sabiai.app",
  "companyName": "SABI AI TECHNOLOGIES LIMITED",
  "projectId": "sabi-official-prod",
  "scope": "add_firebase_resources_to_existing_google_cloud_project_only_no_app_registration_no_config_download_no_live_sms",
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
    "enabledApisBefore": {
      "name": "enabled_google_cloud_apis_before_readonly",
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
    },
    "accessTokenSummary": {
      "name": "gcloud_auth_print_access_token",
      "command": "gcloud auth print-access-token 2>$null",
      "status": 0,
      "tokenPresent": true,
      "tokenValuePrinted": false,
      "stderr": ""
    },
    "enabledApisAfter": {
      "name": "enabled_google_cloud_apis_after_readonly",
      "command": "gcloud services list --enabled --project=sabi-official-prod --format=\"value(config.name)\" 2>$null",
      "status": 0,
      "stdout": "analyticshub.googleapis.com\r\nartifactregistry.googleapis.com\r\nbigquery.googleapis.com\r\nbigqueryconnection.googleapis.com\r\nbigquerydatapolicy.googleapis.com\r\nbigquerydatatransfer.googleapis.com\r\nbigquerymigration.googleapis.com\r\nbigqueryreservation.googleapis.com\r\nbigquerystorage.googleapis.com\r\ncloudapis.googleapis.com\r\ncloudbuild.googleapis.com\r\ncloudtrace.googleapis.com\r\ncontainerregistry.googleapis.com\r\ndataform.googleapis.com\r\ndataplex.googleapis.com\r\ndatastore.googleapis.com\r\nfirebase.googleapis.com\r\niam.googleapis.com\r\niamcredentials.googleapis.com\r\nidentitytoolkit.googleapis.com\r\nlogging.googleapis.com\r\nmonitoring.googleapis.com\r\npubsub.googleapis.com\r\nrun.googleapis.com\r\nservicemanagement.googleapis.com\r\nserviceusage.googleapis.com\r\nsql-component.googleapis.com\r\nstorage-api.googleapis.com\r\nstorage-component.googleapis.com\r\nstorage.googleapis.com\r\ntelemetry.googleapis.com",
      "stderr": "",
      "ok": true
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
  "firebaseRest": {
    "getBefore": {
      "ok": false,
      "statusCode": 403,
      "projectId": null,
      "name": null,
      "displayName": null,
      "projectNumberPresent": false,
      "resourcesPresent": false,
      "hostingSitePresent": false,
      "realtimeDatabaseInstancePresent": false,
      "rawPreview": "{\n  \"error\": {\n    \"code\": 403,\n    \"message\": \"Your application is authenticating by using local Application Default Credentials. The firebase.googleapis.com API requires a quota project, which is not set by default. To learn how to set your quota project, see https://cloud.google.com/docs/authentication/adc-troubleshooting/user-creds .\",\n    \"status\": \"PERMISSION_DENIED\",\n    \"details\": [\n      {\n        \"@type\": \"type.googleapis.com/google.rpc.ErrorInfo\",\n        \"reason\": \"SERVICE_DISABLED\",\n        \"domain\": \"googleapis.com\",\n        \"metadata\": {\n          \"consumer\": \"projects/32555940559\",\n          \"service\": \"firebase.googleapis.com\"\n        }\n      },\n      {\n        \"@type\": \"type.googleapis.com/google.rpc.LocalizedMessage\",\n        \"locale\": \"en-US\",\n        \"message\": \"Your application is authenticating by using local Application Default Credentials. The firebase.googleapis.com API requires a quota project, which is not set by default. To learn how to set your quota project, see https://cloud.google.com/docs/authentication/adc-troubleshooting/user-creds .\"\n      }\n    ]\n  }\n}\n"
    },
    "addFirebase": {
      "ok": false,
      "statusCode": 403,
      "name": null,
      "done": false,
      "responseType": null,
      "responseProjectId": null,
      "errorCode": 403,
      "errorMessage": "Your application is authenticating by using local Application Default Credentials. The firebase.googleapis.com API requires a quota project, which is not set by default. To learn how to set your quota project, see https://cloud.google.com/docs/authentication/adc-troubleshooting/user-creds .",
      "rawPreview": "{\n  \"error\": {\n    \"code\": 403,\n    \"message\": \"Your application is authenticating by using local Application Default Credentials. The firebase.googleapis.com API requires a quota project, which is not set by default. To learn how to set your quota project, see https://cloud.google.com/docs/authentication/adc-troubleshooting/user-creds .\",\n    \"status\": \"PERMISSION_DENIED\",\n    \"details\": [\n      {\n        \"@type\": \"type.googleapis.com/google.rpc.ErrorInfo\",\n        \"reason\": \"SERVICE_DISABLED\",\n        \"domain\": \"googleapis.com\",\n        \"metadata\": {\n          \"consumer\": \"projects/32555940559\",\n          \"service\": \"firebase.googleapis.com\"\n        }\n      },\n      {\n        \"@type\": \"type.googleapis.com/google.rpc.LocalizedMessage\",\n        \"locale\": \"en-US\",\n        \"message\": \"Your application is authenticating by using local Application Default Credentials. The firebase.googleapis.com API requires a quota project, which is not set by default. To learn how to set your quota project, see https://cloud.google.com/docs/authentication/adc-troubleshooting/user-creds .\"\n      }\n    ]\n  }\n}\n"
    },
    "operationChecks": [],
    "getAfter": {
      "ok": false,
      "statusCode": 403,
      "projectId": null,
      "name": null,
      "displayName": null,
      "projectNumberPresent": false,
      "resourcesPresent": false,
      "hostingSitePresent": false,
      "realtimeDatabaseInstancePresent": false,
      "rawPreview": "{\n  \"error\": {\n    \"code\": 403,\n    \"message\": \"Your application is authenticating by using local Application Default Credentials. The firebase.googleapis.com API requires a quota project, which is not set by default. To learn how to set your quota project, see https://cloud.google.com/docs/authentication/adc-troubleshooting/user-creds .\",\n    \"status\": \"PERMISSION_DENIED\",\n    \"details\": [\n      {\n        \"@type\": \"type.googleapis.com/google.rpc.ErrorInfo\",\n        \"reason\": \"SERVICE_DISABLED\",\n        \"domain\": \"googleapis.com\",\n        \"metadata\": {\n          \"service\": \"firebase.googleapis.com\",\n          \"consumer\": \"projects/32555940559\"\n        }\n      },\n      {\n        \"@type\": \"type.googleapis.com/google.rpc.LocalizedMessage\",\n        \"locale\": \"en-US\",\n        \"message\": \"Your application is authenticating by using local Application Default Credentials. The firebase.googleapis.com API requires a quota project, which is not set by default. To learn how to set your quota project, see https://cloud.google.com/docs/authentication/adc-troubleshooting/user-creds .\"\n      }\n    ]\n  }\n}\n"
    },
    "tokenValuePrinted": false
  },
  "readiness": {
    "officialWebsiteReadiness": 100,
    "firebaseCliToolingReadiness": 100,
    "firebaseAccessTokenNoPrintReadiness": 100,
    "addFirebaseCallReadiness": 0,
    "addFirebaseOperationReadiness": 0,
    "firebaseProjectRestVisibleReadiness": 0,
    "firebaseProjectCliVisibleReadiness": 0,
    "noSecretOrApiKeyPrintReadiness": 100,
    "release246GReadiness": 0,
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
    "ownerApprovalCaptured": true,
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
  "checksPassed": 18,
  "checksTotal": 20,
  "checks": [
    {
      "name": "246g_gcloud_project_is_official",
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
      "name": "246g_active_gcloud_account_is_official_admin",
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
      "name": "246g_firebase_cli_available",
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
      "name": "246g_official_site_still_live",
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
      "name": "246g_access_token_obtained_without_printing_value",
      "passed": true,
      "details": {
        "name": "gcloud_auth_print_access_token",
        "command": "gcloud auth print-access-token 2>$null",
        "status": 0,
        "tokenPresent": true,
        "tokenValuePrinted": false,
        "stderr": ""
      }
    },
    {
      "name": "246g_addfirebase_call_attempted",
      "passed": true,
      "details": {
        "ok": false,
        "statusCode": 403,
        "name": null,
        "done": false,
        "responseType": null,
        "responseProjectId": null,
        "errorCode": 403,
        "errorMessage": "Your application is authenticating by using local Application Default Credentials. The firebase.googleapis.com API requires a quota project, which is not set by default. To learn how to set your quota project, see https://cloud.google.com/docs/authentication/adc-troubleshooting/user-creds .",
        "rawPreview": "{\n  \"error\": {\n    \"code\": 403,\n    \"message\": \"Your application is authenticating by using local Application Default Credentials. The firebase.googleapis.com API requires a quota project, which is not set by default. To learn how to set your quota project, see https://cloud.google.com/docs/authentication/adc-troubleshooting/user-creds .\",\n    \"status\": \"PERMISSION_DENIED\",\n    \"details\": [\n      {\n        \"@type\": \"type.googleapis.com/google.rpc.ErrorInfo\",\n        \"reason\": \"SERVICE_DISABLED\",\n        \"domain\": \"googleapis.com\",\n        \"metadata\": {\n          \"consumer\": \"projects/32555940559\",\n          \"service\": \"firebase.googleapis.com\"\n        }\n      },\n      {\n        \"@type\": \"type.googleapis.com/google.rpc.LocalizedMessage\",\n        \"locale\": \"en-US\",\n        \"message\": \"Your application is authenticating by using local Application Default Credentials. The firebase.googleapis.com API requires a quota project, which is not set by default. To learn how to set your quota project, see https://cloud.google.com/docs/authentication/adc-troubleshooting/user-creds .\"\n      }\n    ]\n  }\n}\n"
      }
    },
    {
      "name": "246g_addfirebase_operation_done_or_project_already_firebase",
      "passed": false,
      "details": {
        "operationChecks": [],
        "getAfterSummary": {
          "ok": false,
          "statusCode": 403,
          "projectId": null,
          "name": null,
          "displayName": null,
          "projectNumberPresent": false,
          "resourcesPresent": false,
          "hostingSitePresent": false,
          "realtimeDatabaseInstancePresent": false,
          "rawPreview": "{\n  \"error\": {\n    \"code\": 403,\n    \"message\": \"Your application is authenticating by using local Application Default Credentials. The firebase.googleapis.com API requires a quota project, which is not set by default. To learn how to set your quota project, see https://cloud.google.com/docs/authentication/adc-troubleshooting/user-creds .\",\n    \"status\": \"PERMISSION_DENIED\",\n    \"details\": [\n      {\n        \"@type\": \"type.googleapis.com/google.rpc.ErrorInfo\",\n        \"reason\": \"SERVICE_DISABLED\",\n        \"domain\": \"googleapis.com\",\n        \"metadata\": {\n          \"service\": \"firebase.googleapis.com\",\n          \"consumer\": \"projects/32555940559\"\n        }\n      },\n      {\n        \"@type\": \"type.googleapis.com/google.rpc.LocalizedMessage\",\n        \"locale\": \"en-US\",\n        \"message\": \"Your application is authenticating by using local Application Default Credentials. The firebase.googleapis.com API requires a quota project, which is not set by default. To learn how to set your quota project, see https://cloud.google.com/docs/authentication/adc-troubleshooting/user-creds .\"\n      }\n    ]\n  }\n}\n"
        }
      }
    },
    {
      "name": "246g_firebase_project_visible_after_rest_get",
      "passed": false,
      "details": {
        "ok": false,
        "statusCode": 403,
        "projectId": null,
        "name": null,
        "displayName": null,
        "projectNumberPresent": false,
        "resourcesPresent": false,
        "hostingSitePresent": false,
        "realtimeDatabaseInstancePresent": false,
        "rawPreview": "{\n  \"error\": {\n    \"code\": 403,\n    \"message\": \"Your application is authenticating by using local Application Default Credentials. The firebase.googleapis.com API requires a quota project, which is not set by default. To learn how to set your quota project, see https://cloud.google.com/docs/authentication/adc-troubleshooting/user-creds .\",\n    \"status\": \"PERMISSION_DENIED\",\n    \"details\": [\n      {\n        \"@type\": \"type.googleapis.com/google.rpc.ErrorInfo\",\n        \"reason\": \"SERVICE_DISABLED\",\n        \"domain\": \"googleapis.com\",\n        \"metadata\": {\n          \"service\": \"firebase.googleapis.com\",\n          \"consumer\": \"projects/32555940559\"\n        }\n      },\n      {\n        \"@type\": \"type.googleapis.com/google.rpc.LocalizedMessage\",\n        \"locale\": \"en-US\",\n        \"message\": \"Your application is authenticating by using local Application Default Credentials. The firebase.googleapis.com API requires a quota project, which is not set by default. To learn how to set your quota project, see https://cloud.google.com/docs/authentication/adc-troubleshooting/user-creds .\"\n      }\n    ]\n  }\n}\n"
      }
    },
    {
      "name": "246g_no_secret_or_api_key_value_printed",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_no_firebase_app_registration_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_no_firebase_config_download_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_no_live_sms_sent",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_no_firebase_user_creation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_no_phone_auth_live_test_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_no_google_pay_or_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246g_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [
    "246g_addfirebase_operation_done_or_project_already_firebase",
    "246g_firebase_project_visible_after_rest_get"
  ],
  "warnings": [
    "firebase_projects_list_cli_does_not_show_project_yet_but_rest_get_may_be_source_of_truth",
    "android_apps_list_not_ready_until_official_android_app_registration",
    "web_apps_list_not_ready_until_official_web_app_registration"
  ],
  "nextStep": "246G_FIX1_review_addfirebase_failure_or_permissions",
  "exactApprovalForNext": "I approve RELEASE-246H register official Firebase apps in project sabi-official-prod with Android package app.sabiai.superapp, iOS bundle app.sabiai.superapp, and Web app for sabiai.app only, no live SMS, no Firebase user creation, no phone auth live test, no secret or API key value print, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease246GReport;
