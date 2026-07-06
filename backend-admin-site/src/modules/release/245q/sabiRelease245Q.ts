import type { SabiRelease245QReport } from './sabiRelease245Q.types';

export const sabiRelease245QReport: SabiRelease245QReport = {
  "version": "SABI-RELEASE-245Q-ENABLE-REQUIRED-GOOGLE-CLOUD-APIS-CLOUD-RUN-PREP-ONLY-NO-DEPLOY-NO-DNS-NO-SMS-NO-WALLET",
  "status": "passed",
  "approvalFlagRequired": "--i-approve-release-245q-enable-required-google-cloud-apis-cloud-run-prep-only-no-deploy-no-dns-no-sms-no-wallet",
  "approvalFlagProvided": true,
  "ownerApprovalExactPhraseAccepted": "I approve RELEASE-245Q enable required Google Cloud APIs for official Sabi site Cloud Run preparation only, no deploy, no DNS mutation, no SMS, no Firebase call, no wallet, no payment, no payout",
  "scope": "245Q_enable_required_google_cloud_apis_only_no_deploy_no_dns_no_sms_no_firebase_no_wallet_payment_payout",
  "createdAt": "2026-06-22T23:10:06.967Z",
  "officialDomain": "sabiai.app",
  "companyName": "SABI AI TECHNOLOGIES LIMITED",
  "projectId": "sabi-official-prod",
  "regionForNextStep": "europe-west1",
  "plannedCloudRunServiceNameForNextStep": "sabi-official-site",
  "requiredApis": [
    "run.googleapis.com",
    "cloudbuild.googleapis.com",
    "artifactregistry.googleapis.com",
    "iam.googleapis.com",
    "serviceusage.googleapis.com"
  ],
  "beforeApiStatus": {
    "run.googleapis.com": true,
    "cloudbuild.googleapis.com": true,
    "artifactregistry.googleapis.com": true,
    "iam.googleapis.com": true,
    "serviceusage.googleapis.com": true
  },
  "afterApiStatus": {
    "run.googleapis.com": true,
    "cloudbuild.googleapis.com": true,
    "artifactregistry.googleapis.com": true,
    "iam.googleapis.com": true,
    "serviceusage.googleapis.com": true
  },
  "observationsBefore": {
    "gcloudVersion": {
      "name": "gcloud_version_before",
      "command": "gcloud --version",
      "status": 0,
      "stdout": "Google Cloud SDK 573.0.0\r\nbq 2.1.32\r\ncore 2026.06.12\r\ngcloud-crc32c 1.0.0\r\ngsutil 5.37",
      "stderr": "",
      "ok": true
    },
    "gcloudProject": {
      "name": "gcloud_project_before",
      "command": "gcloud config get-value project 2>$null",
      "status": 0,
      "stdout": "sabi-official-prod",
      "stderr": "",
      "ok": true
    },
    "gcloudAccount": {
      "name": "gcloud_active_account_before",
      "command": "gcloud auth list --filter=status:ACTIVE --format=\"value(account)\" 2>$null",
      "status": 0,
      "stdout": "admin@sabiai.app",
      "stderr": "",
      "ok": true
    },
    "enabledServices": {
      "name": "enabled_services_before",
      "command": "gcloud services list --enabled --project sabi-official-prod --format=\"value(config.name)\" 2>$null",
      "status": 0,
      "stdout": "analyticshub.googleapis.com\r\nartifactregistry.googleapis.com\r\nbigquery.googleapis.com\r\nbigqueryconnection.googleapis.com\r\nbigquerydatapolicy.googleapis.com\r\nbigquerydatatransfer.googleapis.com\r\nbigquerymigration.googleapis.com\r\nbigqueryreservation.googleapis.com\r\nbigquerystorage.googleapis.com\r\ncloudapis.googleapis.com\r\ncloudbuild.googleapis.com\r\ncloudtrace.googleapis.com\r\ncontainerregistry.googleapis.com\r\ndataform.googleapis.com\r\ndataplex.googleapis.com\r\ndatastore.googleapis.com\r\niam.googleapis.com\r\niamcredentials.googleapis.com\r\nlogging.googleapis.com\r\nmonitoring.googleapis.com\r\npubsub.googleapis.com\r\nrun.googleapis.com\r\nservicemanagement.googleapis.com\r\nserviceusage.googleapis.com\r\nsql-component.googleapis.com\r\nstorage-api.googleapis.com\r\nstorage-component.googleapis.com\r\nstorage.googleapis.com\r\ntelemetry.googleapis.com",
      "stderr": "",
      "ok": true
    }
  },
  "enableResult": {
    "name": "enable_required_apis",
    "command": "gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com iam.googleapis.com serviceusage.googleapis.com --project sabi-official-prod",
    "status": 0,
    "stdout": "",
    "stderr": "Operation \"operations/acat.p2-1047545881519-051a71ca-d955-44a2-b929-7dfb5e90ac5d\" finished successfully.",
    "ok": true
  },
  "observationsAfter": {
    "enabledServices": {
      "name": "enabled_services_after",
      "command": "gcloud services list --enabled --project sabi-official-prod --format=\"value(config.name)\" 2>$null",
      "status": 0,
      "stdout": "analyticshub.googleapis.com\r\nartifactregistry.googleapis.com\r\nbigquery.googleapis.com\r\nbigqueryconnection.googleapis.com\r\nbigquerydatapolicy.googleapis.com\r\nbigquerydatatransfer.googleapis.com\r\nbigquerymigration.googleapis.com\r\nbigqueryreservation.googleapis.com\r\nbigquerystorage.googleapis.com\r\ncloudapis.googleapis.com\r\ncloudbuild.googleapis.com\r\ncloudtrace.googleapis.com\r\ncontainerregistry.googleapis.com\r\ndataform.googleapis.com\r\ndataplex.googleapis.com\r\ndatastore.googleapis.com\r\niam.googleapis.com\r\niamcredentials.googleapis.com\r\nlogging.googleapis.com\r\nmonitoring.googleapis.com\r\npubsub.googleapis.com\r\nrun.googleapis.com\r\nservicemanagement.googleapis.com\r\nserviceusage.googleapis.com\r\nsql-component.googleapis.com\r\nstorage-api.googleapis.com\r\nstorage-component.googleapis.com\r\nstorage.googleapis.com\r\ntelemetry.googleapis.com",
      "stderr": "",
      "ok": true
    },
    "cloudRunServicesReadOnly": {
      "name": "cloud_run_services_read_only_after_api_enablement",
      "command": "gcloud run services list --platform=managed --region=europe-west1 --project sabi-official-prod --format=json --limit=20 2>$null",
      "status": 0,
      "stdout": "[]",
      "stderr": "",
      "ok": true
    }
  },
  "readiness": {
    "release245QReadiness": 100,
    "previous245PFix2Readiness": 100,
    "googleCloudCliReadiness": 100,
    "googleCloudProjectReadiness": 100,
    "requiredApisEnabledReadiness": 100,
    "officialWebsiteServerExecutionReadiness": 0,
    "googleCloudDeployExecutedNow": 0,
    "cloudRunServiceCreatedNow": 0,
    "liveDomainDnsChangedNow": 0,
    "smsLiveReadiness": 0,
    "liveSmsSentNow": 0,
    "firebaseCallNow": 0,
    "walletPaymentPayoutNow": 0,
    "realProductionLaunchNow": 0
  },
  "safety": {
    "apiEnablementExecutedNow": true,
    "noLiveGoogleCloudDeployNow": true,
    "noCloudRunServiceCreateNow": true,
    "noDomainDnsMutationNow": true,
    "noLiveEmailDnsMutationNow": true,
    "noLiveSmsSendNow": true,
    "noFirebaseApiCallNow": true,
    "noSmsProviderCallNow": true,
    "noWalletPaymentPayoutNow": true,
    "noSecretManagerReadWriteNow": true,
    "noEnvReadWriteNow": true,
    "noDbMutationNow": true,
    "noRuntimeMountNow": true,
    "noPublicLaunchClaimNow": true,
    "ownerExactApprovalRequiredBeforeNextLiveAction": true,
    "noPivotWithoutOwnerApproval": true
  },
  "blockers": [
    "cloud_run_deploy_requires_separate_exact_owner_approval",
    "domain_mapping_dns_requires_separate_exact_owner_approval",
    "sms_live_still_locked",
    "firebase_call_still_locked",
    "wallet_payment_payout_still_locked"
  ],
  "nextStep": "245R_cloud_run_official_site_deploy_requires_separate_exact_owner_approval_no_dns_no_sms_no_wallet"
} as unknown as SabiRelease245QReport;
