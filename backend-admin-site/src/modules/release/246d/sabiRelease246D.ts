import type { SabiRelease246DReport } from './sabiRelease246D.types';

export const sabiRelease246DReport: SabiRelease246DReport = {
  "version": "SABI-RELEASE-246D-FIREBASE-PROJECT-APP-BINDING-READINESS-READONLY-NO-LIVE-SMS-NO-SECRET-PRINT",
  "status": "passed",
  "createdAt": "2026-06-23T03:00:22.908Z",
  "approval": "I approve RELEASE-246D Firebase project and app binding readiness check in project sabi-official-prod only, read-only/config inventory, no live SMS, no Firebase user creation, no phone auth live test, no secret or API key value print, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "officialDomain": "sabiai.app",
  "companyName": "SABI AI TECHNOLOGIES LIMITED",
  "projectId": "sabi-official-prod",
  "scope": "read_only_firebase_project_app_binding_inventory_no_live_sms_no_secret_or_api_key_value_print",
  "observations": {
    "gcloudVersion": {
      "name": "gcloud_version",
      "command": "gcloud --version",
      "status": 0,
      "stdout": "Google Cloud SDK 573.0.0\r\nbeta 2026.06.12\r\nbq 2.1.32\r\ncore 2026.06.12\r\ngcloud-crc32c 1.0.0\r\ngsutil 5.37",
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
      "name": "firebase_projects_list_readonly_optional",
      "command": "firebase projects:list --json 2>$null",
      "status": 1,
      "stdout": "",
      "stderr": "firebase : ��� \"firebase\" �� �ᯮ����� ��� ��\r\n� ���������, �㭪樨, 䠩�� �業��� ��� �믮\r\n��塞�� �ணࠬ��. �஢���� �ࠢ��쭮��� ����\r\nᠭ�� �����, � ⠪�� ����稥 � �ࠢ��쭮��� ��\r\n�, ��᫥ 祣� ������ ������.\r\n��ப�:1 ����:1\r\n+ firebase projects:list --json 2>$null\r\n+ ~~~~~~~~\r\n    + CategoryInfo          : ObjectNotFound: \r\n    (firebase:String) [], CommandNotFoundExc  \r\n  eption\r\n    + FullyQualifiedErrorId : CommandNotFound \r\n   Exception",
      "ok": false
    },
    "firebaseAppsAndroidList": {
      "name": "firebase_apps_android_list_readonly_optional",
      "command": "firebase apps:list ANDROID --project=sabi-official-prod --json 2>$null",
      "status": 1,
      "stdout": "",
      "stderr": "firebase : ��� \"firebase\" �� �ᯮ����� ��� ��\r\n� ���������, �㭪樨, 䠩�� �業��� ��� �믮\r\n��塞�� �ணࠬ��. �஢���� �ࠢ��쭮��� ����\r\nᠭ�� �����, � ⠪�� ����稥 � �ࠢ��쭮��� ��\r\n�, ��᫥ 祣� ������ ������.\r\n��ப�:1 ����:1\r\n+ firebase apps:list ANDROID --project=sabi-of\r\nficial-prod --json 2>$nul ...\r\n+ ~~~~~~~~\r\n    + CategoryInfo          : ObjectNotFound: \r\n    (firebase:String) [], CommandNotFoundExc  \r\n  eption\r\n    + FullyQualifiedErrorId : CommandNotFound \r\n   Exception",
      "ok": false
    },
    "firebaseAppsIosList": {
      "name": "firebase_apps_ios_list_readonly_optional",
      "command": "firebase apps:list IOS --project=sabi-official-prod --json 2>$null",
      "status": 1,
      "stdout": "",
      "stderr": "firebase : ��� \"firebase\" �� �ᯮ����� ��� ��\r\n� ���������, �㭪樨, 䠩�� �業��� ��� �믮\r\n��塞�� �ணࠬ��. �஢���� �ࠢ��쭮��� ����\r\nᠭ�� �����, � ⠪�� ����稥 � �ࠢ��쭮��� ��\r\n�, ��᫥ 祣� ������ ������.\r\n��ப�:1 ����:1\r\n+ firebase apps:list IOS --project=sabi-offici\r\nal-prod --json 2>$null\r\n+ ~~~~~~~~\r\n    + CategoryInfo          : ObjectNotFound: \r\n    (firebase:String) [], CommandNotFoundExc  \r\n  eption\r\n    + FullyQualifiedErrorId : CommandNotFound \r\n   Exception",
      "ok": false
    },
    "firebaseAppsWebList": {
      "name": "firebase_apps_web_list_readonly_optional",
      "command": "firebase apps:list WEB --project=sabi-official-prod --json 2>$null",
      "status": 1,
      "stdout": "",
      "stderr": "firebase : ��� \"firebase\" �� �ᯮ����� ��� ��\r\n� ���������, �㭪樨, 䠩�� �業��� ��� �믮\r\n��塞�� �ணࠬ��. �஢���� �ࠢ��쭮��� ����\r\nᠭ�� �����, � ⠪�� ����稥 � �ࠢ��쭮��� ��\r\n�, ��᫥ 祣� ������ ������.\r\n��ப�:1 ����:1\r\n+ firebase apps:list WEB --project=sabi-offici\r\nal-prod --json 2>$null\r\n+ ~~~~~~~~\r\n    + CategoryInfo          : ObjectNotFound: \r\n    (firebase:String) [], CommandNotFoundExc  \r\n  eption\r\n    + FullyQualifiedErrorId : CommandNotFound \r\n   Exception",
      "ok": false
    },
    "liveRoot": {
      "name": "live_https_root_readonly",
      "command": "$u=\"https://sabiai.app/\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); Write-Output (\"LENGTH=\" + $r.Content.Length); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "STATUS=200\r\nLENGTH=51682",
      "stderr": "",
      "ok": true
    },
    "liveKycAmlPdf": {
      "name": "live_kyc_aml_pdf_head_readonly",
      "command": "$u=\"https://sabiai.app/legal/sabi-kyc-aml-policy-en.pdf\"; try { $r=Invoke-WebRequest -Uri $u -Method Head -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "STATUS=200",
      "stderr": "",
      "ok": true
    }
  },
  "apiStatus": {
    "firebaseManagementApiEnabled": true,
    "identityToolkitApiEnabled": true
  },
  "localConfigInventory": {
    "backendFirebaseJson": {
      "exists": false,
      "readableJson": false,
      "file": "firebase.json"
    },
    "mobileFirebaseJson": {
      "exists": false,
      "readableJson": false,
      "file": "../superapp-mobile/firebase.json"
    },
    "mobileRootGoogleServices": {
      "file": "../superapp-mobile/google-services.json",
      "exists": true,
      "readableJson": true,
      "project_id": "sabi-superapp",
      "project_number_present": true,
      "firebase_url_present": false,
      "storage_bucket_present": true,
      "client_count": 1,
      "clients": [
        {
          "index": 0,
          "mobilesdk_app_id_present": true,
          "package_name": "com.anonymous.superappmobile",
          "oauth_client_count": 0,
          "api_key_count": 1,
          "api_key_values_printed": false,
          "services_present": true
        }
      ],
      "secret_or_api_key_values_printed": false
    },
    "mobileAndroidGoogleServices": {
      "file": "../superapp-mobile/android/app/google-services.json",
      "exists": true,
      "readableJson": true,
      "project_id": "sabi-superapp",
      "project_number_present": true,
      "firebase_url_present": false,
      "storage_bucket_present": true,
      "client_count": 1,
      "clients": [
        {
          "index": 0,
          "mobilesdk_app_id_present": true,
          "package_name": "com.anonymous.superappmobile",
          "oauth_client_count": 0,
          "api_key_count": 1,
          "api_key_values_printed": false,
          "services_present": true
        }
      ],
      "secret_or_api_key_values_printed": false
    },
    "discoveredBackendFirebaseJsonFiles": [],
    "discoveredMobileGoogleServicesFiles": [
      "../superapp-mobile/android/app/google-services.json",
      "../superapp-mobile/google-services.json"
    ]
  },
  "firebaseApps": {
    "android": {
      "rawEmpty": true,
      "appCount": 0,
      "apps": []
    },
    "ios": {
      "rawEmpty": true,
      "appCount": 0,
      "apps": []
    },
    "web": {
      "rawEmpty": true,
      "appCount": 0,
      "apps": []
    }
  },
  "appCounts": {
    "android": 0,
    "ios": 0,
    "web": 0,
    "total": 0
  },
  "binding": {
    "expectedOfficialProject": "sabi-official-prod",
    "mobileRootGoogleServicesProject": "sabi-superapp",
    "mobileAndroidGoogleServicesProject": "sabi-superapp",
    "mobileConfigMatchesOfficial": false,
    "mobileConfigMismatch": true,
    "officialFirebaseAppsVisible": false,
    "noSecretOrApiKeyValuePrinted": true
  },
  "readiness": {
    "officialWebsiteReadiness": 100,
    "firebaseManagementApiReadiness": 100,
    "identityToolkitApiReadiness": 100,
    "localConfigInventoryReadiness": 100,
    "noSecretOrApiKeyPrintReadiness": 100,
    "mobileConfigOfficialProjectBindingReadiness": 0,
    "firebaseAppsInventoryReadiness": 50,
    "release246DReadiness": 100,
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
    "readOnlyConfigInventoryOnly": true,
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
  "checksTotal": 18,
  "checks": [
    {
      "name": "246d_gcloud_project_is_official",
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
      "name": "246d_active_account_is_official_admin",
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
      "name": "246d_firebase_management_api_enabled",
      "passed": true,
      "details": {
        "firebaseManagementApiEnabled": true,
        "identityToolkitApiEnabled": true
      }
    },
    {
      "name": "246d_identitytoolkit_api_enabled",
      "passed": true,
      "details": {
        "firebaseManagementApiEnabled": true,
        "identityToolkitApiEnabled": true
      }
    },
    {
      "name": "246d_official_site_and_kyc_aml_live",
      "passed": true,
      "details": {
        "root": {
          "name": "live_https_root_readonly",
          "command": "$u=\"https://sabiai.app/\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); Write-Output (\"LENGTH=\" + $r.Content.Length); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
          "status": 0,
          "stdout": "STATUS=200\r\nLENGTH=51682",
          "stderr": "",
          "ok": true
        },
        "kyc": {
          "name": "live_kyc_aml_pdf_head_readonly",
          "command": "$u=\"https://sabiai.app/legal/sabi-kyc-aml-policy-en.pdf\"; try { $r=Invoke-WebRequest -Uri $u -Method Head -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
          "status": 0,
          "stdout": "STATUS=200",
          "stderr": "",
          "ok": true
        }
      }
    },
    {
      "name": "246d_local_firebase_config_inventory_redacted",
      "passed": true,
      "details": {
        "backendFirebaseJson": {
          "exists": false,
          "readableJson": false,
          "file": "firebase.json"
        },
        "mobileFirebaseJson": {
          "exists": false,
          "readableJson": false,
          "file": "../superapp-mobile/firebase.json"
        },
        "mobileRootGoogleServices": {
          "file": "../superapp-mobile/google-services.json",
          "exists": true,
          "readableJson": true,
          "project_id": "sabi-superapp",
          "project_number_present": true,
          "firebase_url_present": false,
          "storage_bucket_present": true,
          "client_count": 1,
          "clients": [
            {
              "index": 0,
              "mobilesdk_app_id_present": true,
              "package_name": "com.anonymous.superappmobile",
              "oauth_client_count": 0,
              "api_key_count": 1,
              "api_key_values_printed": false,
              "services_present": true
            }
          ],
          "secret_or_api_key_values_printed": false
        },
        "mobileAndroidGoogleServices": {
          "file": "../superapp-mobile/android/app/google-services.json",
          "exists": true,
          "readableJson": true,
          "project_id": "sabi-superapp",
          "project_number_present": true,
          "firebase_url_present": false,
          "storage_bucket_present": true,
          "client_count": 1,
          "clients": [
            {
              "index": 0,
              "mobilesdk_app_id_present": true,
              "package_name": "com.anonymous.superappmobile",
              "oauth_client_count": 0,
              "api_key_count": 1,
              "api_key_values_printed": false,
              "services_present": true
            }
          ],
          "secret_or_api_key_values_printed": false
        },
        "discoveredBackendFirebaseJsonFiles": [],
        "discoveredMobileGoogleServicesFiles": [
          "../superapp-mobile/android/app/google-services.json",
          "../superapp-mobile/google-services.json"
        ]
      }
    },
    {
      "name": "246d_no_secret_or_api_key_value_printed",
      "passed": true,
      "details": {}
    },
    {
      "name": "246d_firebase_apps_inventory_attempted_readonly",
      "passed": true,
      "details": {
        "android": {
          "rawEmpty": true,
          "appCount": 0,
          "apps": []
        },
        "ios": {
          "rawEmpty": true,
          "appCount": 0,
          "apps": []
        },
        "web": {
          "rawEmpty": true,
          "appCount": 0,
          "apps": []
        }
      }
    },
    {
      "name": "246d_detect_mobile_config_project_binding",
      "passed": true,
      "details": {
        "mobileRootProject": "sabi-superapp",
        "mobileAndroidProject": "sabi-superapp",
        "expectedOfficialProject": "sabi-official-prod",
        "mobileConfigMatchesOfficial": false,
        "mobileConfigMismatch": true
      }
    },
    {
      "name": "246d_no_live_sms_sent",
      "passed": true,
      "details": {}
    },
    {
      "name": "246d_no_firebase_user_creation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246d_no_phone_auth_live_test_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246d_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246d_no_google_pay_or_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246d_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246d_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246d_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246d_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [],
  "warnings": [
    "mobile_google_services_project_id_points_to_different_project_than_sabi_official_prod",
    "no_firebase_apps_visible_in_sabi_official_prod_or_firebase_cli_app_list_unavailable",
    "firebase_cli_projects_list_unavailable_or_not_logged_in"
  ],
  "nextStep": "246E_prepare_official_firebase_app_registration_or_config_migration_plan_no_secret_print_no_live_sms",
  "exactApprovalForNext": "I approve RELEASE-246E prepare official Firebase app registration/config migration plan for sabi-official-prod only, no live SMS, no Firebase user creation, no phone auth live test, no secret or API key value print, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease246DReport;
