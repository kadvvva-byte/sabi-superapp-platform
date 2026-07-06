import type { SabiRelease246EReport } from './sabiRelease246E.types';

export const sabiRelease246EReport: SabiRelease246EReport = {
  "version": "SABI-RELEASE-246E-OFFICIAL-FIREBASE-APP-REGISTRATION-CONFIG-MIGRATION-PLAN-NO-LIVE-SMS-NO-SECRET-PRINT",
  "status": "passed",
  "createdAt": "2026-06-23T03:04:54.838Z",
  "approval": "I approve RELEASE-246E prepare official Firebase app registration/config migration plan for sabi-official-prod only, no live SMS, no Firebase user creation, no phone auth live test, no secret or API key value print, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "officialDomain": "sabiai.app",
  "companyName": "SABI AI TECHNOLOGIES LIMITED",
  "projectId": "sabi-official-prod",
  "scope": "prepare_official_firebase_app_registration_and_config_migration_plan_only_no_live_sms_no_secret_or_api_key_print",
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
    },
    "tooling": {
      "firebase": {
        "name": "firebase_cli_version_optional",
        "command": "firebase --version 2>$null",
        "status": 1,
        "stdout": "",
        "stderr": "firebase : ��� \"firebase\" �� �ᯮ����� ��� ��\r\n� ���������, �㭪樨, 䠩�� �業��� ��� �믮\r\n��塞�� �ணࠬ��. �஢���� �ࠢ��쭮��� ����\r\nᠭ�� �����, � ⠪�� ����稥 � �ࠢ��쭮��� ��\r\n�, ��᫥ 祣� ������ ������.\r\n��ப�:1 ����:1\r\n+ firebase --version 2>$null\r\n+ ~~~~~~~~\r\n    + CategoryInfo          : ObjectNotFound: \r\n    (firebase:String) [], CommandNotFoundExc  \r\n  eption\r\n    + FullyQualifiedErrorId : CommandNotFound \r\n   Exception",
        "ok": false
      },
      "npm": {
        "name": "npm_version_optional",
        "command": "npm --version 2>$null",
        "status": 0,
        "stdout": "11.9.0",
        "stderr": "",
        "ok": true
      },
      "node": {
        "name": "node_version_optional",
        "command": "node --version 2>$null",
        "status": 0,
        "stdout": "v24.14.0",
        "stderr": "",
        "ok": true
      }
    }
  },
  "apiStatus": {
    "firebaseManagementApiEnabled": true,
    "identityToolkitApiEnabled": true,
    "serviceUsageApiEnabled": true
  },
  "localFirebaseConfigInventory": {
    "mobileRootGoogleServices": {
      "file": "../superapp-mobile/google-services.json",
      "exists": true,
      "readableJson": true,
      "project_id": "sabi-superapp",
      "project_number_present": true,
      "storage_bucket_present": true,
      "client_count": 1,
      "clients": [
        {
          "index": 0,
          "mobilesdk_app_id_present": true,
          "package_name": "com.anonymous.superappmobile",
          "api_key_count": 1,
          "api_key_values_printed": false,
          "oauth_client_count": 0
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
      "storage_bucket_present": true,
      "client_count": 1,
      "clients": [
        {
          "index": 0,
          "mobilesdk_app_id_present": true,
          "package_name": "com.anonymous.superappmobile",
          "api_key_count": 1,
          "api_key_values_printed": false,
          "oauth_client_count": 0
        }
      ],
      "secret_or_api_key_values_printed": false
    },
    "backendFirebaseJsonExists": false,
    "mobileFirebaseJsonExists": false
  },
  "mobileIdentifiers": [
    {
      "source": "../superapp-mobile/app.json",
      "expoName": "superapp-mobile",
      "expoSlug": "superapp-mobile",
      "androidPackage": "com.sabi.superapp",
      "iosBundleIdentifier": null
    },
    {
      "source": "../superapp-mobile/android/app/build.gradle",
      "androidPackage": "com.anonymous.superappmobile"
    },
    {
      "source": "../superapp-mobile/android/app/src/main/AndroidManifest.xml",
      "androidPackage": null
    }
  ],
  "currentBinding": {
    "officialProjectId": "sabi-official-prod",
    "mobileRootGoogleServicesProjectId": "sabi-superapp",
    "mobileAndroidGoogleServicesProjectId": "sabi-superapp",
    "mobileConfigMismatch": true,
    "discoveredAndroidPackages": [
      "com.sabi.superapp",
      "com.anonymous.superappmobile"
    ],
    "discoveredIosBundles": [],
    "currentAnonymousPackageDetected": true,
    "noSecretOrApiKeyValuePrinted": true
  },
  "recommendedOfficialIdentifiers": {
    "firebaseProjectId": "sabi-official-prod",
    "androidPackageName": "app.sabiai.superapp",
    "iosBundleIdentifier": "app.sabiai.superapp",
    "webAppNickname": "Sabi SuperApp Web Official",
    "androidAppNickname": "Sabi SuperApp Android Official",
    "iosAppNickname": "Sabi SuperApp iOS Official",
    "authDomain": "sabiai.app",
    "supportEmail": "support@sabiai.app",
    "legalEmail": "legal@sabiai.app",
    "ownerAdminEmail": "admin@sabiai.app",
    "oldProjectDetected": "sabi-superapp",
    "oldAndroidPackageDetected": "com.anonymous.superappmobile"
  },
  "migrationPlan": [
    {
      "step": "246F",
      "title": "Install/restore Firebase CLI or use approved Firebase Console flow",
      "type": "local tooling / admin console preparation",
      "requiresExactOwnerApprovalBeforeMutation": true,
      "reason": "246D showed firebase command is not available in PowerShell.",
      "allowedAfterApproval": [
        "npm install -g firebase-tools",
        "firebase login",
        "firebase projects:list --json"
      ],
      "prohibited": [
        "no live SMS",
        "no Firebase user creation",
        "no API key value printing",
        "no phone auth live test"
      ]
    },
    {
      "step": "246G",
      "title": "Register official Firebase apps in sabi-official-prod",
      "type": "Firebase app registration",
      "requiresExactOwnerApprovalBeforeMutation": true,
      "plannedApps": [
        {
          "platform": "ANDROID",
          "displayName": "Sabi SuperApp Android Official",
          "packageName": "app.sabiai.superapp"
        },
        {
          "platform": "IOS",
          "displayName": "Sabi SuperApp iOS Official",
          "bundleIdentifier": "app.sabiai.superapp"
        },
        {
          "platform": "WEB",
          "displayName": "Sabi SuperApp Web Official",
          "authDomain": "sabiai.app"
        }
      ],
      "prohibited": [
        "no live SMS",
        "no Firebase user creation",
        "no Phone Auth live test",
        "no secret/API key values printed in reports"
      ]
    },
    {
      "step": "246H",
      "title": "Download/apply official config safely",
      "type": "mobile config migration",
      "requiresExactOwnerApprovalBeforeMutation": true,
      "actions": [
        "Backup existing ../superapp-mobile/google-services.json and ../superapp-mobile/android/app/google-services.json.",
        "Replace mobile Firebase config with official sabi-official-prod config.",
        "Do not print api_key.current_key values in logs.",
        "Verify project_id is sabi-official-prod after replacement.",
        "Verify Android package name matches official identifier."
      ]
    },
    {
      "step": "246I",
      "title": "Update mobile app identifiers if Owner chooses official package migration",
      "type": "mobile identifier migration",
      "requiresExactOwnerApprovalBeforeMutation": true,
      "actions": [
        "Replace com.anonymous.superappmobile with app.sabiai.superapp only after approval.",
        "Review app.json/app.config/build.gradle/AndroidManifest references.",
        "Run TypeScript/build checks after patch.",
        "Do not touch backend DB, wallet, payments, payouts."
      ]
    },
    {
      "step": "246J",
      "title": "Phone Auth provider configuration plan",
      "type": "Firebase Auth setup",
      "requiresExactOwnerApprovalBeforeMutation": true,
      "actions": [
        "Prepare Phone Auth provider settings.",
        "Prepare test phone number policy.",
        "No live SMS until separate explicit approval.",
        "No production Firebase user creation."
      ]
    }
  ],
  "readiness": {
    "officialWebsiteReadiness": 100,
    "firebaseManagementApiReadiness": 100,
    "identityToolkitApiReadiness": 100,
    "localConfigInventoryReadiness": 100,
    "mismatchDetectionReadiness": 100,
    "officialIdentifierRecommendationReadiness": 100,
    "migrationPlanReadiness": 100,
    "firebaseCliToolingReadiness": 0,
    "npmToolingReadiness": 100,
    "nodeToolingReadiness": 100,
    "release246EReadiness": 100,
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
    "planOnly": true,
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
  "checksPassed": 19,
  "checksTotal": 19,
  "checks": [
    {
      "name": "246e_gcloud_project_is_official",
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
      "name": "246e_active_account_is_official_admin",
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
      "name": "246e_firebase_management_api_enabled",
      "passed": true,
      "details": {
        "firebaseManagementApiEnabled": true,
        "identityToolkitApiEnabled": true,
        "serviceUsageApiEnabled": true
      }
    },
    {
      "name": "246e_identitytoolkit_api_enabled",
      "passed": true,
      "details": {
        "firebaseManagementApiEnabled": true,
        "identityToolkitApiEnabled": true,
        "serviceUsageApiEnabled": true
      }
    },
    {
      "name": "246e_official_site_and_kyc_aml_live",
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
      "name": "246e_local_firebase_config_inventory_redacted",
      "passed": true,
      "details": {
        "mobileRootGoogleServices": {
          "file": "../superapp-mobile/google-services.json",
          "exists": true,
          "readableJson": true,
          "project_id": "sabi-superapp",
          "project_number_present": true,
          "storage_bucket_present": true,
          "client_count": 1,
          "clients": [
            {
              "index": 0,
              "mobilesdk_app_id_present": true,
              "package_name": "com.anonymous.superappmobile",
              "api_key_count": 1,
              "api_key_values_printed": false,
              "oauth_client_count": 0
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
          "storage_bucket_present": true,
          "client_count": 1,
          "clients": [
            {
              "index": 0,
              "mobilesdk_app_id_present": true,
              "package_name": "com.anonymous.superappmobile",
              "api_key_count": 1,
              "api_key_values_printed": false,
              "oauth_client_count": 0
            }
          ],
          "secret_or_api_key_values_printed": false
        },
        "backendFirebaseJsonExists": false,
        "mobileFirebaseJsonExists": false
      }
    },
    {
      "name": "246e_mobile_config_mismatch_detected",
      "passed": true,
      "details": {
        "officialProjectId": "sabi-official-prod",
        "mobileRootGoogleServicesProjectId": "sabi-superapp",
        "mobileAndroidGoogleServicesProjectId": "sabi-superapp",
        "mobileConfigMismatch": true,
        "discoveredAndroidPackages": [
          "com.sabi.superapp",
          "com.anonymous.superappmobile"
        ],
        "discoveredIosBundles": [],
        "currentAnonymousPackageDetected": true,
        "noSecretOrApiKeyValuePrinted": true
      }
    },
    {
      "name": "246e_official_identifier_recommendation_ready",
      "passed": true,
      "details": {
        "firebaseProjectId": "sabi-official-prod",
        "androidPackageName": "app.sabiai.superapp",
        "iosBundleIdentifier": "app.sabiai.superapp",
        "webAppNickname": "Sabi SuperApp Web Official",
        "androidAppNickname": "Sabi SuperApp Android Official",
        "iosAppNickname": "Sabi SuperApp iOS Official",
        "authDomain": "sabiai.app",
        "supportEmail": "support@sabiai.app",
        "legalEmail": "legal@sabiai.app",
        "ownerAdminEmail": "admin@sabiai.app",
        "oldProjectDetected": "sabi-superapp",
        "oldAndroidPackageDetected": "com.anonymous.superappmobile"
      }
    },
    {
      "name": "246e_migration_plan_ready",
      "passed": true,
      "details": [
        {
          "step": "246F",
          "title": "Install/restore Firebase CLI or use approved Firebase Console flow",
          "type": "local tooling / admin console preparation",
          "requiresExactOwnerApprovalBeforeMutation": true,
          "reason": "246D showed firebase command is not available in PowerShell.",
          "allowedAfterApproval": [
            "npm install -g firebase-tools",
            "firebase login",
            "firebase projects:list --json"
          ],
          "prohibited": [
            "no live SMS",
            "no Firebase user creation",
            "no API key value printing",
            "no phone auth live test"
          ]
        },
        {
          "step": "246G",
          "title": "Register official Firebase apps in sabi-official-prod",
          "type": "Firebase app registration",
          "requiresExactOwnerApprovalBeforeMutation": true,
          "plannedApps": [
            {
              "platform": "ANDROID",
              "displayName": "Sabi SuperApp Android Official",
              "packageName": "app.sabiai.superapp"
            },
            {
              "platform": "IOS",
              "displayName": "Sabi SuperApp iOS Official",
              "bundleIdentifier": "app.sabiai.superapp"
            },
            {
              "platform": "WEB",
              "displayName": "Sabi SuperApp Web Official",
              "authDomain": "sabiai.app"
            }
          ],
          "prohibited": [
            "no live SMS",
            "no Firebase user creation",
            "no Phone Auth live test",
            "no secret/API key values printed in reports"
          ]
        },
        {
          "step": "246H",
          "title": "Download/apply official config safely",
          "type": "mobile config migration",
          "requiresExactOwnerApprovalBeforeMutation": true,
          "actions": [
            "Backup existing ../superapp-mobile/google-services.json and ../superapp-mobile/android/app/google-services.json.",
            "Replace mobile Firebase config with official sabi-official-prod config.",
            "Do not print api_key.current_key values in logs.",
            "Verify project_id is sabi-official-prod after replacement.",
            "Verify Android package name matches official identifier."
          ]
        },
        {
          "step": "246I",
          "title": "Update mobile app identifiers if Owner chooses official package migration",
          "type": "mobile identifier migration",
          "requiresExactOwnerApprovalBeforeMutation": true,
          "actions": [
            "Replace com.anonymous.superappmobile with app.sabiai.superapp only after approval.",
            "Review app.json/app.config/build.gradle/AndroidManifest references.",
            "Run TypeScript/build checks after patch.",
            "Do not touch backend DB, wallet, payments, payouts."
          ]
        },
        {
          "step": "246J",
          "title": "Phone Auth provider configuration plan",
          "type": "Firebase Auth setup",
          "requiresExactOwnerApprovalBeforeMutation": true,
          "actions": [
            "Prepare Phone Auth provider settings.",
            "Prepare test phone number policy.",
            "No live SMS until separate explicit approval.",
            "No production Firebase user creation."
          ]
        }
      ]
    },
    {
      "name": "246e_no_secret_or_api_key_value_printed",
      "passed": true,
      "details": {}
    },
    {
      "name": "246e_no_live_sms_sent",
      "passed": true,
      "details": {}
    },
    {
      "name": "246e_no_firebase_user_creation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246e_no_phone_auth_live_test_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246e_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246e_no_google_pay_or_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246e_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246e_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246e_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246e_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [],
  "warnings": [
    "firebase_cli_not_available_in_powershell",
    "mobile_google_services_points_to_sabi-superapp_not_sabi-official-prod",
    "current_android_package_is_anonymous_and_not_official_brand_package"
  ],
  "nextStep": "246F_install_firebase_cli_then_verify_project_app_inventory_requires_exact_owner_approval",
  "exactApprovalForNext": "I approve RELEASE-246F install Firebase CLI tooling and verify Firebase project/app inventory for sabi-official-prod only, no live SMS, no Firebase user creation, no phone auth live test, no secret or API key value print, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease246EReport;
