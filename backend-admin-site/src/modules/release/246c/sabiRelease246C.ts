import type { SabiRelease246CReport } from './sabiRelease246C.types';

export const sabiRelease246CReport: SabiRelease246CReport = {
  "version": "SABI-RELEASE-246C-ENABLE-FIREBASE-IDENTITYTOOLKIT-APIS-NO-LIVE-SMS-NO-WALLET",
  "status": "passed",
  "createdAt": "2026-06-23T02:57:24.055Z",
  "approval": "I approve RELEASE-246C enable Firebase and Identity Toolkit APIs in project sabi-official-prod only, no live SMS, no Firebase user creation, no phone auth live test, no DNS mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "officialDomain": "sabiai.app",
  "companyName": "SABI AI TECHNOLOGIES LIMITED",
  "projectId": "sabi-official-prod",
  "scope": "enable_firebase_and_identitytoolkit_apis_only_no_live_sms_no_firebase_user_creation_no_wallet_payment_payout",
  "apiStatusBefore": {
    "firebaseManagementApiEnabled": false,
    "identityToolkitApiEnabled": false
  },
  "apiStatusAfter": {
    "firebaseManagementApiEnabled": true,
    "identityToolkitApiEnabled": true
  },
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
    "enabledApisBefore": {
      "name": "enabled_google_cloud_apis_readonly",
      "command": "gcloud services list --enabled --project=sabi-official-prod --format=\"value(config.name)\" 2>$null",
      "status": 0,
      "stdout": "analyticshub.googleapis.com\r\nartifactregistry.googleapis.com\r\nbigquery.googleapis.com\r\nbigqueryconnection.googleapis.com\r\nbigquerydatapolicy.googleapis.com\r\nbigquerydatatransfer.googleapis.com\r\nbigquerymigration.googleapis.com\r\nbigqueryreservation.googleapis.com\r\nbigquerystorage.googleapis.com\r\ncloudapis.googleapis.com\r\ncloudbuild.googleapis.com\r\ncloudtrace.googleapis.com\r\ncontainerregistry.googleapis.com\r\ndataform.googleapis.com\r\ndataplex.googleapis.com\r\ndatastore.googleapis.com\r\niam.googleapis.com\r\niamcredentials.googleapis.com\r\nlogging.googleapis.com\r\nmonitoring.googleapis.com\r\npubsub.googleapis.com\r\nrun.googleapis.com\r\nservicemanagement.googleapis.com\r\nserviceusage.googleapis.com\r\nsql-component.googleapis.com\r\nstorage-api.googleapis.com\r\nstorage-component.googleapis.com\r\nstorage.googleapis.com\r\ntelemetry.googleapis.com",
      "stderr": "",
      "ok": true
    },
    "enableResult": {
      "name": "enable_firebase_identitytoolkit_apis",
      "command": "gcloud services enable firebase.googleapis.com identitytoolkit.googleapis.com --project=sabi-official-prod --quiet",
      "status": 0,
      "stdout": "",
      "stderr": "Operation \"operations/acat.p2-1047545881519-70006371-6c6e-4266-b19a-8df82662cbde\" finished successfully.",
      "ok": true
    },
    "enabledApisAfter": {
      "name": "enabled_google_cloud_apis_readonly",
      "command": "gcloud services list --enabled --project=sabi-official-prod --format=\"value(config.name)\" 2>$null",
      "status": 0,
      "stdout": "analyticshub.googleapis.com\r\nartifactregistry.googleapis.com\r\nbigquery.googleapis.com\r\nbigqueryconnection.googleapis.com\r\nbigquerydatapolicy.googleapis.com\r\nbigquerydatatransfer.googleapis.com\r\nbigquerymigration.googleapis.com\r\nbigqueryreservation.googleapis.com\r\nbigquerystorage.googleapis.com\r\ncloudapis.googleapis.com\r\ncloudbuild.googleapis.com\r\ncloudtrace.googleapis.com\r\ncontainerregistry.googleapis.com\r\ndataform.googleapis.com\r\ndataplex.googleapis.com\r\ndatastore.googleapis.com\r\nfirebase.googleapis.com\r\niam.googleapis.com\r\niamcredentials.googleapis.com\r\nidentitytoolkit.googleapis.com\r\nlogging.googleapis.com\r\nmonitoring.googleapis.com\r\npubsub.googleapis.com\r\nrun.googleapis.com\r\nservicemanagement.googleapis.com\r\nserviceusage.googleapis.com\r\nsql-component.googleapis.com\r\nstorage-api.googleapis.com\r\nstorage-component.googleapis.com\r\nstorage.googleapis.com\r\ntelemetry.googleapis.com",
      "stderr": "",
      "ok": true
    }
  },
  "readiness": {
    "officialWebsiteReadiness": 100,
    "kycAmlPublicPolicyReadiness": 100,
    "firebaseManagementApiEnabledReadiness": 100,
    "identityToolkitApiEnabledReadiness": 100,
    "apiEnableCommandReadiness": 100,
    "release246CReadiness": 100,
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
    "googleCloudApiEnableOnly": true,
    "enabledOnlyFirebaseAndIdentityToolkitApis": true,
    "noLiveSmsSentNow": true,
    "noFirebaseUserCreationNow": true,
    "noPhoneAuthLiveTestNow": true,
    "noDnsMutationNow": true,
    "noGooglePayOrBillingNow": true,
    "noWalletPaymentPayoutNow": true,
    "noDbMutationNow": true,
    "noSecretManagerReadWriteNow": true,
    "noEnvReadWriteNow": true,
    "exactOwnerApprovalRequiredBefore246D": true
  },
  "checksPassed": 16,
  "checksTotal": 16,
  "checks": [
    {
      "name": "246c_gcloud_project_is_official",
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
      "name": "246c_active_account_is_official_admin",
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
      "name": "246c_official_site_still_live",
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
      "name": "246c_kyc_aml_policy_still_live",
      "passed": true,
      "details": {
        "name": "live_kyc_aml_pdf_head_readonly",
        "command": "$u=\"https://sabiai.app/legal/sabi-kyc-aml-policy-en.pdf\"; try { $r=Invoke-WebRequest -Uri $u -Method Head -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "STATUS=200",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246c_firebase_api_enable_command_succeeded",
      "passed": true,
      "details": {
        "name": "enable_firebase_identitytoolkit_apis",
        "command": "gcloud services enable firebase.googleapis.com identitytoolkit.googleapis.com --project=sabi-official-prod --quiet",
        "status": 0,
        "stdout": "",
        "stderr": "Operation \"operations/acat.p2-1047545881519-70006371-6c6e-4266-b19a-8df82662cbde\" finished successfully.",
        "ok": true
      }
    },
    {
      "name": "246c_firebase_management_api_enabled_after",
      "passed": true,
      "details": {
        "before": false,
        "after": true
      }
    },
    {
      "name": "246c_identitytoolkit_api_enabled_after",
      "passed": true,
      "details": {
        "before": false,
        "after": true
      }
    },
    {
      "name": "246c_no_live_sms_sent",
      "passed": true,
      "details": {}
    },
    {
      "name": "246c_no_firebase_user_creation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246c_no_phone_auth_live_test_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246c_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246c_no_google_pay_or_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246c_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246c_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246c_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246c_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [],
  "nextStep": "246D_firebase_project_app_binding_readiness_no_live_sms_no_secret_print",
  "artifacts": {}
} as unknown as SabiRelease246CReport;
