import type { SabiRelease246BReport } from './sabiRelease246B.types';

export const sabiRelease246BReport: SabiRelease246BReport = {
  "version": "SABI-RELEASE-246B-SMS-FIREBASE-ENABLE-PLAN-NO-LIVE-SMS-NO-WALLET",
  "status": "passed",
  "createdAt": "2026-06-23T02:53:22.764Z",
  "officialDomain": "sabiai.app",
  "companyName": "SABI AI TECHNOLOGIES LIMITED",
  "projectId": "sabi-official-prod",
  "scope": "prepare_sms_firebase_enable_plan_only_no_api_enable_no_live_sms_no_wallet_payment_payout",
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
      "stdout": "analyticshub.googleapis.com\r\nartifactregistry.googleapis.com\r\nbigquery.googleapis.com\r\nbigqueryconnection.googleapis.com\r\nbigquerydatapolicy.googleapis.com\r\nbigquerydatatransfer.googleapis.com\r\nbigquerymigration.googleapis.com\r\nbigqueryreservation.googleapis.com\r\nbigquerystorage.googleapis.com\r\ncloudapis.googleapis.com\r\ncloudbuild.googleapis.com\r\ncloudtrace.googleapis.com\r\ncontainerregistry.googleapis.com\r\ndataform.googleapis.com\r\ndataplex.googleapis.com\r\ndatastore.googleapis.com\r\niam.googleapis.com\r\niamcredentials.googleapis.com\r\nlogging.googleapis.com\r\nmonitoring.googleapis.com\r\npubsub.googleapis.com\r\nrun.googleapis.com\r\nservicemanagement.googleapis.com\r\nserviceusage.googleapis.com\r\nsql-component.googleapis.com\r\nstorage-api.googleapis.com\r\nstorage-component.googleapis.com\r\nstorage.googleapis.com\r\ntelemetry.googleapis.com",
      "stderr": "",
      "ok": true
    },
    "liveRoot": {
      "name": "live_https_root",
      "command": "$u=\"https://sabiai.app/\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); Write-Output (\"LENGTH=\" + $r.Content.Length); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "STATUS=200\r\nLENGTH=51682",
      "stderr": "",
      "ok": true
    },
    "liveKycAmlPdf": {
      "name": "live_kyc_aml_pdf_head",
      "command": "$u=\"https://sabiai.app/legal/sabi-kyc-aml-policy-en.pdf\"; try { $r=Invoke-WebRequest -Uri $u -Method Head -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "STATUS=200",
      "stderr": "",
      "ok": true
    },
    "liveTermsPdf": {
      "name": "live_terms_pdf_head",
      "command": "$u=\"https://sabiai.app/legal/sabi-terms-of-service-en.pdf\"; try { $r=Invoke-WebRequest -Uri $u -Method Head -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "STATUS=200",
      "stderr": "",
      "ok": true
    },
    "livePrivacyPdf": {
      "name": "live_privacy_pdf_head",
      "command": "$u=\"https://sabiai.app/legal/sabi-privacy-policy-uk-gdpr-en.pdf\"; try { $r=Invoke-WebRequest -Uri $u -Method Head -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "STATUS=200",
      "stderr": "",
      "ok": true
    }
  },
  "apiStatus": {
    "firebaseManagementApiEnabled": false,
    "identityToolkitApiEnabled": false,
    "firebaseRulesApiEnabled": false,
    "firebaseHostingApiEnabled": false,
    "firebaseCloudMessagingApiEnabled": false,
    "cloudRunApiEnabled": true,
    "cloudBuildApiEnabled": true,
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
      "has_android_client_info": true,
      "has_api_key": true,
      "api_key_values_printed": false
    },
    "mobileAndroidGoogleServices": {
      "file": "../superapp-mobile/android/app/google-services.json",
      "exists": true,
      "readableJson": true,
      "project_id": "sabi-superapp",
      "project_number_present": true,
      "storage_bucket_present": true,
      "client_count": 1,
      "has_android_client_info": true,
      "has_api_key": true,
      "api_key_values_printed": false
    },
    "backendFirebaseJsonExists": false,
    "mobileFirebaseJsonExists": false
  },
  "enablePlan": [
    {
      "step": "246C",
      "title": "Enable Firebase/Identity Toolkit APIs only if not already enabled",
      "requiresExactOwnerApproval": true,
      "mutation": "Google Cloud API enable only",
      "allowedCommandsAfterApproval": [
        "gcloud services enable firebase.googleapis.com identitytoolkit.googleapis.com --project=sabi-official-prod"
      ],
      "prohibited": [
        "no live SMS",
        "no Firebase user creation",
        "no phone auth live test",
        "no DB mutation",
        "no secrets/env read or write",
        "no wallet/payment/payout"
      ]
    },
    {
      "step": "246D",
      "title": "Firebase project/app binding readiness",
      "requiresExactOwnerApproval": true,
      "mutation": "configuration verification only or controlled config binding",
      "notes": [
        "Confirm Firebase project belongs to official company project.",
        "Confirm Android/iOS/web app identifiers match Sabi official release identifiers.",
        "Do not print API key values in reports."
      ]
    },
    {
      "step": "246E",
      "title": "Phone Auth provider configuration plan",
      "requiresExactOwnerApproval": true,
      "mutation": "Firebase Auth provider setting only if approved",
      "notes": [
        "Enable phone provider only after legal/KYC/AML site policy is live.",
        "Configure allowed domains and app restrictions.",
        "Keep test phone numbers separate from live SMS."
      ]
    },
    {
      "step": "246F",
      "title": "Test-number-only smoke",
      "requiresExactOwnerApproval": true,
      "mutation": "test-only auth smoke without real SMS",
      "notes": [
        "Use Firebase test phone numbers only.",
        "No real SMS to any phone number.",
        "No production user activation."
      ]
    },
    {
      "step": "246G",
      "title": "Live SMS approval request",
      "requiresExactOwnerApproval": true,
      "mutation": "first live SMS only after explicit Owner approval",
      "notes": [
        "One controlled number only.",
        "Full evidence report required.",
        "Rollback/disable plan required before live test."
      ]
    }
  ],
  "exactApprovalFor246C": "I approve RELEASE-246C enable Firebase and Identity Toolkit APIs in project sabi-official-prod only, no live SMS, no Firebase user creation, no phone auth live test, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "readiness": {
    "officialWebsiteReadiness": 100,
    "kycAmlPublicPolicyReadiness": 100,
    "enabledApisInventoryReadiness": 100,
    "firebaseManagementApiEnabledNow": 0,
    "identityToolkitApiEnabledNow": 0,
    "firebaseConfigInventoryReadiness": 100,
    "smsFirebaseEnablePlanReadiness": 100,
    "liveSmsSentNow": 0,
    "firebaseApiMutationNow": 0,
    "firebaseUserCreationNow": 0,
    "googlePayBillingNow": 0,
    "walletPaymentPayoutNow": 0,
    "dbMutationNow": 0,
    "secretManagerReadWriteNow": 0,
    "envReadWriteNow": 0
  },
  "safety": {
    "planOnly": true,
    "noGoogleCloudApiEnableNow": true,
    "noLiveSmsSentNow": true,
    "noFirebaseApiMutationNow": true,
    "noFirebaseUserCreationNow": true,
    "noGooglePayOrBillingNow": true,
    "noWalletPaymentPayoutNow": true,
    "noDbMutationNow": true,
    "noSecretManagerReadWriteNow": true,
    "noEnvReadWriteNow": true,
    "exactOwnerApprovalRequiredBefore246C": true
  },
  "checksPassed": 15,
  "checksTotal": 15,
  "checks": [
    {
      "name": "246b_gcloud_project_is_official",
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
      "name": "246b_active_account_is_official_admin",
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
      "name": "246b_official_site_live",
      "passed": true,
      "details": {
        "name": "live_https_root",
        "command": "$u=\"https://sabiai.app/\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); Write-Output (\"LENGTH=\" + $r.Content.Length); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "STATUS=200\r\nLENGTH=51682",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246b_kyc_aml_pdf_live",
      "passed": true,
      "details": {
        "name": "live_kyc_aml_pdf_head",
        "command": "$u=\"https://sabiai.app/legal/sabi-kyc-aml-policy-en.pdf\"; try { $r=Invoke-WebRequest -Uri $u -Method Head -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "STATUS=200",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246b_terms_privacy_live",
      "passed": true,
      "details": {
        "terms": {
          "name": "live_terms_pdf_head",
          "command": "$u=\"https://sabiai.app/legal/sabi-terms-of-service-en.pdf\"; try { $r=Invoke-WebRequest -Uri $u -Method Head -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
          "status": 0,
          "stdout": "STATUS=200",
          "stderr": "",
          "ok": true
        },
        "privacy": {
          "name": "live_privacy_pdf_head",
          "command": "$u=\"https://sabiai.app/legal/sabi-privacy-policy-uk-gdpr-en.pdf\"; try { $r=Invoke-WebRequest -Uri $u -Method Head -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
          "status": 0,
          "stdout": "STATUS=200",
          "stderr": "",
          "ok": true
        }
      }
    },
    {
      "name": "246b_enabled_apis_inventory_read",
      "passed": true,
      "details": {
        "name": "enabled_google_cloud_apis_readonly",
        "command": "gcloud services list --enabled --project=sabi-official-prod --format=\"value(config.name)\" 2>$null",
        "status": 0,
        "stdout": "analyticshub.googleapis.com\r\nartifactregistry.googleapis.com\r\nbigquery.googleapis.com\r\nbigqueryconnection.googleapis.com\r\nbigquerydatapolicy.googleapis.com\r\nbigquerydatatransfer.googleapis.com\r\nbigquerymigration.googleapis.com\r\nbigqueryreservation.googleapis.com\r\nbigquerystorage.googleapis.com\r\ncloudapis.googleapis.com\r\ncloudbuild.googleapis.com\r\ncloudtrace.googleapis.com\r\ncontainerregistry.googleapis.com\r\ndataform.googleapis.com\r\ndataplex.googleapis.com\r\ndatastore.googleapis.com\r\niam.googleapis.com\r\niamcredentials.googleapis.com\r\nlogging.googleapis.com\r\nmonitoring.googleapis.com\r\npubsub.googleapis.com\r\nrun.googleapis.com\r\nservicemanagement.googleapis.com\r\nserviceusage.googleapis.com\r\nsql-component.googleapis.com\r\nstorage-api.googleapis.com\r\nstorage-component.googleapis.com\r\nstorage.googleapis.com\r\ntelemetry.googleapis.com",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246b_firebase_config_inventory_redacted",
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
          "has_android_client_info": true,
          "has_api_key": true,
          "api_key_values_printed": false
        },
        "mobileAndroidGoogleServices": {
          "file": "../superapp-mobile/android/app/google-services.json",
          "exists": true,
          "readableJson": true,
          "project_id": "sabi-superapp",
          "project_number_present": true,
          "storage_bucket_present": true,
          "client_count": 1,
          "has_android_client_info": true,
          "has_api_key": true,
          "api_key_values_printed": false
        },
        "backendFirebaseJsonExists": false,
        "mobileFirebaseJsonExists": false
      }
    },
    {
      "name": "246b_enable_plan_ready",
      "passed": true,
      "details": [
        {
          "step": "246C",
          "title": "Enable Firebase/Identity Toolkit APIs only if not already enabled",
          "requiresExactOwnerApproval": true,
          "mutation": "Google Cloud API enable only",
          "allowedCommandsAfterApproval": [
            "gcloud services enable firebase.googleapis.com identitytoolkit.googleapis.com --project=sabi-official-prod"
          ],
          "prohibited": [
            "no live SMS",
            "no Firebase user creation",
            "no phone auth live test",
            "no DB mutation",
            "no secrets/env read or write",
            "no wallet/payment/payout"
          ]
        },
        {
          "step": "246D",
          "title": "Firebase project/app binding readiness",
          "requiresExactOwnerApproval": true,
          "mutation": "configuration verification only or controlled config binding",
          "notes": [
            "Confirm Firebase project belongs to official company project.",
            "Confirm Android/iOS/web app identifiers match Sabi official release identifiers.",
            "Do not print API key values in reports."
          ]
        },
        {
          "step": "246E",
          "title": "Phone Auth provider configuration plan",
          "requiresExactOwnerApproval": true,
          "mutation": "Firebase Auth provider setting only if approved",
          "notes": [
            "Enable phone provider only after legal/KYC/AML site policy is live.",
            "Configure allowed domains and app restrictions.",
            "Keep test phone numbers separate from live SMS."
          ]
        },
        {
          "step": "246F",
          "title": "Test-number-only smoke",
          "requiresExactOwnerApproval": true,
          "mutation": "test-only auth smoke without real SMS",
          "notes": [
            "Use Firebase test phone numbers only.",
            "No real SMS to any phone number.",
            "No production user activation."
          ]
        },
        {
          "step": "246G",
          "title": "Live SMS approval request",
          "requiresExactOwnerApproval": true,
          "mutation": "first live SMS only after explicit Owner approval",
          "notes": [
            "One controlled number only.",
            "Full evidence report required.",
            "Rollback/disable plan required before live test."
          ]
        }
      ]
    },
    {
      "name": "246b_no_live_sms_sent",
      "passed": true,
      "details": {}
    },
    {
      "name": "246b_no_firebase_api_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246b_no_google_pay_or_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246b_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246b_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246b_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246b_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [],
  "nextStep": "246C_enable_firebase_identitytoolkit_apis_requires_exact_owner_approval_no_live_sms",
  "artifacts": {}
} as unknown as SabiRelease246BReport;
